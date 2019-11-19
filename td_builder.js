/* 
 * tower builder
 */

td_lives = {
	div : null,
	text : null,
	lives: 10,
};
td_lives_div_id = "lives";

td_money = {
	div : null,
	text : null,
	money: 10,
};
td_money_div_id = "money";

td_builder = {
	tower_selected : null,
	div : null,
};

td_builder_div_id = "builder";

/* level builder */
td_levelbuilder_items = [];

/*----------------------------------------------*/ 

/**
 * @brief build tower
 *
 * @param tilemap index 
 * @param tower name
 *
 * @return  1 = ok
 */
function build_tower(index, name) {
	/* sanity */
	if (null == td_current_level ||
			null == td_current_level.tilemap )
 	{
		return -1;
	}


	if (null != td_current_level.towers[index]) {
		return -1;
	}

	if (null == towers[name]) {
		return -2;
	}

	/* check tile under cursor */
	var grass = images.key_to_index('grass');
	if (grass != td_current_level.tilemap.tiles[index]) {
		console.log(" tile(%d) != grass(%d)", td_current_level.tilemap.tiles[index], grass);
		return -1;
	}
	
	td_current_level.towers[index] = new tower(l.sublayers['towers'], td_current_level.tilemap, index, towers[name]);

	/* ne, mozhe da stroi po niakolko */
	//td_builder.tower_selected = null;
	
	return 1;
}

/**
 * @brief cell clicked
 *
 * @param cell
 */
function builder_click_wrap(cell) {
	if (null == td_builder.tower_selected) {
		console.log("no tower selected");
		return;
	}

	var tower_name = towers.index_to_key(td_builder.tower_selected - 1);

	console.log("try tower %s at %d", towers[tower_name].name, cell);
	var tower_price = towers[tower_name].price;
	if (true == td_money_canbuy(tower_price)) {
		if (1 == build_tower(cell, towers[ tower_name ].name)) {
			td_money_add(-tower_price);
		} else {
			console.log("cant afford tower, money = %d, price = %d", td_money.money, tower_price);
		}
	}
}

last_preview_cell = null;
/**
 * @brief risuva izbranata kula pod mishkata
 */
function td_builder_preview() {
	var ctx = l.sublayers['builder'];
	var w = td_global.cell_width;
	var h = td_global.cell_height;

	/* pyrvo iztrii starata */
	if (null != last_preview_cell) {
		console.log("clear last cell %d", last_preview_cell);
		var pos = tile_index_to_xy(td_current_level.tilemap, last_preview_cell);
		ctx.clearRect(pos[0], pos[1], w, h);
		last_preview_cell = null; /* ! */
	}

	if (-1 == mouse_cell || null == td_builder.tower_selected) {
		return;
	}

	var tower_name = towers.index_to_key(td_builder.tower_selected - 1);
	var image = images[ towers[tower_name].image ];

	var pos = tile_index_to_xy(td_current_level.tilemap, mouse_cell);
	console.log("preview cell %d %d/%d", mouse_cell, pos[0], pos[1]);

	ctx.drawImage(image, 0, 0, w, h, pos[0], pos[1], w, h);

	/* ako nee vyrhu treva */
	var grass = images.key_to_index('grass');

	if (grass != td_current_level.tilemap.tiles[mouse_cell] ||
			null != td_current_level.towers[mouse_cell]
			) 
	{
		/* 50% red over tower */
		ctx.fillStyle = "red"; ctx.fillRect(pos[0], pos[1], w, h);
	}	

	last_preview_cell = mouse_cell;
}

/* init div */
function builder_init() {
	var html = "";
	var towers_len = towers.length;
	var index = 1;

	var use_parent = document.getElementById("td_rightpanel");
	
	/* attach money div */
	td_money.div = creatediv(td_money_div_id, "", 180, 30, 0, 0, use_parent);
	td_money.div.className = "money";
	var st = creatediv(td_money_div_id, "", 30, 30, 0, 0, td_money.div);
	st.className = "money_stotinka";

	/* money text placeholder */
	td_money.text = document.createElement("span");
	td_money.text.id = "txt_money";
	td_money.text.innerHTML = td_money.money;
	td_money.text.style.fontSize = "170%";
	td_money.text.style.fontWeight = "bold";
	td_money.text.style.textShadow = "text-shadow: 2px 0 4px #600, -2px 0 4px #006;";

	td_money.div.appendChild(td_money.text);

	/* lives div */
	td_lives.div = creatediv(td_lives_div_id, "", 180, 30, 0, 0, use_parent);
	td_lives.div.className = "lives";
	var heart = creatediv(td_lives_div_id + "_heart", "", 30, 30, 0, 0, td_lives.div);
	heart.className = "lives_heart";

	/* lives text placeholder */
	td_lives.text = document.createElement("span");
	td_lives.text.id = "txt_lives";
	td_lives.text.innerHTML = td_lives.lives;
	td_lives.text.style.fontSize = "170%";
	td_lives.text.style.fontWeight = "bold";
	td_lives.text.style.color = "yellow";
	td_lives.text.style.textShadow = "text-shadow: 2px 0 4px #600, -2px 0 4px #006;";
	td_lives.div.appendChild(td_lives.text);

	td_builder.div = creatediv(td_builder_div_id, "", 180, 100, 0, 0, use_parent);
	td_builder.div.style.float = "left";

	//html += "<table><tr>";
	for (var key in towers) {
		if(towers.hasOwnProperty(key)) {
			/* add tower */
			html += button_buytower( towers[key], index);
			index++;
		}
	}

	//html += "</tr></table>";

	//td_builder.div.innerHTML = html;
	td_builder.div.innerHTML = html;
	document.getElementById(td_builder_div_id).innerHTML = html;
}

function button_buytower(tower, index) {
	var r = "";
	var divid = "bbs"+index;
	var shorcuts = "1234567890-=";
	var name = tower.name;
	var image = tower.image;
	var price = tower.price;
	var url = '" ' + images[ image ].src + '"';
	var shot = shots[tower.shot];

	/* container */
	r += "<div id = " + divid + " class='builder_buy' >";

	/* image */
	r += "<div style=' background-image:url(" +  url +  "); width:50px; height:50px; float:left; font-weight:bold; text-shadow: #ffffff 1px 1px 1px; ' onclick=builder_select_w(" + index + "); > " + shorcuts[index - 1] + "</div>";
		

	/* tower txt */
	r += "<div style='float:left; font-weight:bold; font-size:70%; color:#444444; '>";
	r += name;
	r += "</div>";

	/* tower price */
	r += "<div style='float:right; font-weight:bold; font-size:70%; color:#FFFF00 '>";
	r += price;
	r += "</div>";

	/* dps */
	r += "<div style='float:left; font-weight:bold; font-size:65%; color:#444444; '>";
	r += "dps: ";
	if (1 != tower.num_targets) {
		r += tower.num_targets + "x";
	}
	var dps = 1000/shot.reload * shot.damage;
	r += dps.toFixed(0); /* .toPrecision(2) = 1.22 */
	r += "</div>";

	/* damage per gold */
	var dpg = dps / price;
	console.log("tower %s tar %d dpg %d (%d)", name, tower.num_targets, dpg.toPrecision(2), tower.num_targets * shot.range * dpg.toPrecision(2));

	/* range */
	r += "<div style='float:left; font-weight:bold; font-size:65%; color:#444444; '>";
	r += "range: " + shot.range;
	r += "</div>";

	r += "</div>";
	return r;
}

/* select tower click/keypress */
function builder_select_w(index) {
	//console.log("%d clicked", index);

	/* sanity */

	builder_select(index);
}

/* selected */
function builder_select(index) {
	var divid = "bbs"+index;
	var div = document.getElementById(divid);
	if (null == div) {
		javascript_abort("div name err");
	}

	/* ne raboti */
	div.style.background = "#33";
	div.style.backgroundColor = "#33";

	td_builder.tower_selected = index;

	console.log("%d selected", index);
}

function builder_unselect() {
	if (null != td_builder.tower_selected) {
		var div = document.getElementById("bbs" + td_builder.tower_selected);
		if (null == div) {
			javascript_abort("div name err");
		}
		/* ne raboti */
		div.style.background = "#33";
		div.style.backgroundColor = "#33";
	}

	td_builder.tower_selected = null;

	console.log("_unselect()");
}

/* money stuff */

/**
 * @brief earned money
 *
 * @param amount
 */
function td_money_add(amount) {
	td_money.money += amount;
	td_money_update();
}

/**
 * @brief check if i can spend amount
 *
 * @param amount
 *
 * @return true = can buy that
 */
function td_money_canbuy(amount) {
	if (td_money.money >= amount) {
		return true;
	}
	return false;
}


/**
 * @brief update money span
 */
function td_money_update() {
	td_money.text.innerHTML = td_money.money;
}

/**
 * @brief set lives
 */
function td_lives_set(lives) {
	td_lives.lives = lives;
	td_lives_update();
}

/**
 * @brief update lives
 */
function td_lives_update() {
	if (null == td_lives.text) {
		return;
	}

	td_lives.text.innerHTML = td_lives.lives;
}

function td_lives_take() {
	td_lives.lives --;
	td_lives_update();
	if (0 == td_lives.lives) {
		/* lost */
		td_game_over();
	}
}

/* level builder */

function builder_init_levelbuilder() {
	var html = "";
	var towers_len = towers.length;
	var index = 1;

	var use_parent = document.getElementById("td_td");
	
	td_builder.div = creatediv(td_builder_div_id, "", 180, 100, 0, 0, use_parent);
	td_builder.div.style.float = "left";

	/* init levelbuilder items */
	var i = 0;
	td_levelbuilder_items[i++] = { name:"grass", image: 'grass' };
	td_levelbuilder_items[i++] = { name:"road", image: 'road' };
	td_levelbuilder_items[i++] = { name:"tree1", image: 'tree1' };
	td_levelbuilder_items[i++] = { name:"tree2", image: 'tree2' };
	td_levelbuilder_items[i++] = { name:"house1", image: 'house1' };
	td_levelbuilder_items[i++] = { name:"house2_1", image: 'house2_1' };
	td_levelbuilder_items[i++] = { name:"house2_2", image: 'house2_2' };
	td_levelbuilder_items[i++] = { name:"house2_3", image: 'house2_3' };
	td_levelbuilder_items[i++] = { name:"house2_4", image: 'house2_4' };

	/* fix image indexes */
	for (var j = 0; j < i; j ++) {
		td_levelbuilder_items[j].imageindex =  images.key_to_index(td_levelbuilder_items[j].image);
	}

	for (var j = 0; j < i; j ++) {
		html += button_levelbuilder( td_levelbuilder_items[j], j);
	}

	td_builder.div.innerHTML = html;
	document.getElementById(td_builder_div_id).innerHTML = html;

	/* tilemap code */
	var div_code = creatediv("td_levelbuilder_code", "", 180, 300, 0, 0, document.body);
	div_code.style.float = "left";
}

function button_levelbuilder(item, index) {
	var r = "";
	var divid = "bbs"+index;
	var shorcuts = "1234567890-=";
	var name = item.name;
	var image = item.image;
	var url = '" ' + images[ image ].src + '"';
	var shot = shots[tower.shot];

	/* container */
	r += "<div id = " + divid + " class='builder_buy' >";

	/* image */
	r += "<div style=' background-image:url(" +  url +  "); width:50px; height:50px; float:left; font-weight:bold; text-shadow: #ffffff 1px 1px 1px; ' onclick=builder_select_w(" + index + "); > " + shorcuts[index] + "</div>";
		

	/* tower txt */
	r += "<div style='float:left; font-weight:bold; font-size:70%; color:#444444; '>";
	r += name;
	r += "</div>";


	r += "</div>";
	return r;
}

/**
 * @brief change terrain under cursor
 *
 * @param item = rd_levelbuilder_items index
 */
function levelbuilder_place_under_cursor(item) {
	if (-1 == mouse_cell) {
		return;
	}

	item--;
	if (undefined === td_levelbuilder_items[item]) {
		return;
	}

	td_current_level.tilemap.tiles[mouse_cell] = td_levelbuilder_items[item].imageindex;

	td_draw_terrain();
	td_levelbuilder_update_code();
}

/**
 * @brief print tilemap code
 */
function td_levelbuilder_update_code() {
	var div = document.getElementById("td_levelbuilder_code");
	if (null == div) {
		console.log("cant find levelbuilder code div");
		return;
	}

	var r = "";

	r += "var tiles = [\n";
	for (var i = 0; i < td_current_level.M * td_current_level.N; i++) {
		r += td_current_level.tilemap.tiles[i];
		if (i < td_current_level.M * td_current_level.N - 1) r += ",";
		if (i>0 && 9 == ((i) % 10)) r += "\n";
	}
	r += "\n;]\n";

	div.innerHTML = r;
}

function td_levelbuilder_keydown(e) {
	var e=window.event || e;
	//console.log("keydown value: %d ", e.keyCode);
	//if (65 == e.keyCode) {
	//	td_global.draw_arcs = true;
	//}

	switch (e.keyCode) {
		/* case 1..9 */
	case 49:
	case 50:
	case 51:
	case 52:
	case 53:
	case 54:
	case 55:
	case 56:
	case 57:
		levelbuilder_place_under_cursor(e.keyCode - 48);
		break;
	case 48:
		levelbuilder_place_under_cursor(10);
		break;
	case 189: /* - */
		levelbuilder_place_under_cursor(11);
		break;
	case 187: /* + */
		levelbuilder_place_under_cursor(12);
		break;
	}
}
