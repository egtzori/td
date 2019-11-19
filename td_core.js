/* global */

/* 1 for all */
var e_state = { idle:0, moving:1, arrived:2, destroy:10, despawn:10};

var td_current_level = undefined;

var td_spawn_interval = undefined;
var td_spawn_time_last = undefined;
var td_spawn_time_wave = undefined;

var e_td_global_state = { welcome:0, playing:1, finish:2 };

var td_global = {
	cell_width : 50,
	cell_height : 50,
	state : e_td_global_state.welcome,
	draw_arcs : false,
	wave_add_float_percent_hp : 0.15,
};

var td_hard_road = 11;

/* global layer */
l = null;




/* */

/* image list */
var images_preload = [
	{name : "grass", url : "images/grass.gif" },
	{name : "tree1", url : "images/tree1.gif" },
	{name : "tree2", url : "images/tree2.gif" },
	{name : "house1", url : "images/2/ka6ta.png" },
	{name : "yellow", url : "images/2/cvete_02.png" },
	{name : "red1", url : "images/2/cvete_03.png" },
	{name : "red2", url : "images/1/cvete.png" },
	{name : "white", url : "images/2/margaritki.png" },
	{name : "purple", url : "images/2/temenuga.png" },
	{name : "blue", url : "images/blue.png" },
	{name : "gerbera", url : "images/gerbera.png" },
	{name : "nymphaea", url : "images/nymphaea.png" },
	{name : "orange", url : "images/orange.png" },
	{name : "orchid", url : "images/orchid.png" },
	{name : "rose", url : "images/rose.png" },
	{name : "sunflower", url : "images/sunflower.png" },
	{name : "road", url : "images/stone_05.jpg" },
	{name : "road1", url : "images/stone_02.jpg" },
	{name : "shot", url : "images/2/sachma.png" },
	{name : "shot2", url : "images/shot2.gif" },
	{name : "mrezha1", url : "images/mrezha1.png" },
	{name : "ant", url : "images/1/ants.png" },
	{name : "bug", url : "images/2/bug.png" },
	{name : "ladybug", url : "images/2/kalinki.png" },
	{name : "caterpillar", url : "images/caterpillar.png" },
	{name : "scutigera", url : "images/scutigera.png" },
	{name : "spider", url : "images/spider.png" },
	{name : "purple_beetle", url : "images/purple_beetle.png" },
	{name : "box_elder_bug", url : "images/box_elder_bug.png" },
	{name : "black_beetle", url : "images/black_beetle.png" },
	{name : "yellow_beetle", url : "images/yellow_beetle.png" },
	{name : "roach5", url : "images/roach.gif" },
	{name : "anim1", url : "images/anim1.png" },
	{name : "explosion1", url : "images/2/vzriv2.png" },
	{name : "explosion3", url : "images/vzriv3.png" },
	{name : "explosion5", url : "images/vzriv5.png" },
	{name : "explosion6", url : "images/vzriv6.png" },
	{name : "explosion6.1", url : "images/vzriv6.1.png" },
	{name : "explosion6.2", url : "images/vzriv6.2.png" },
	/* corpse */
	{name : "ladybug_corpse", url : "images/ladybug_corpse.png" },
	{name : "bug_corpse", url : "images/bug_corpse.png" },
	{name : "ant_corpse", url : "images/ant_corpse.png" },
	{name : "caterpillar_corpse", url : "images/caterpillar_corpse.png" },
	{name : "scutigera_corpse", url : "images/scutigera_corpse.png" },
	{name : "spider_corpse", url : "images/spider_corpse.png" },
	{name : "purple_beetle_corpse", url : "images/purple_beetle_corpse.png" },
	{name : "box_elder_bug_corpse", url : "images/box_elder_bug_corpse.png" },
	{name : "black_beetle_corpse", url : "images/black_beetle_corpse.png" },
	{name : "yellow_beetle_corpse", url : "images/yellow_beetle_corpse.png" },

	/* house 2x2 */
	{name : "house2_1", url : "images/ka6ta_01.png" },
	{name : "house2_2", url : "images/ka6ta_02.png" },
	{name : "house2_3", url : "images/ka6ta_03.png" },
	{name : "house2_4", url : "images/ka6ta_04.png" },

];

var images = new Array(); /* image objects, indexed by name */

function td_load_images() {
	for (var i=0; i<images_preload.length; i++) {
		if (undefined === images_preload[i]) continue;
		var this_image = images_preload[i];
		images[this_image.name] = new Image();
		images[this_image.name].src = this_image.url;
	}
}

function td_init() {

	l = new layer('container', 10 * td_global.cell_width, 10 * td_global.cell_height, "td_td" /* parent div */);

	l.sublayer('_background', '');
	l.sublayer('towers', '');
	l.sublayer('corpses', '');
	l.sublayer('enemies', '');
	l.sublayer('arcs', '');
	l.sublayer('shots', '');
	l.sublayer('explosions', '');
	l.sublayer('builder', '');

	l.sublayers['corpses'].globalAlpha = 0.60;
	l.sublayers['builder'].globalAlpha = 0.60;

	l.container_div.style.float = "left";
}

function td_load_level(level) {
	if (e_td_global_state.welcome != td_global.state) {
		javascript_abort("cannot load level in state " + td_global.state);
	}

	console.log("== load new level");

	l.clearall();

	/* load td_current_level */
	td_current_level = level;

	td_lives_set(td_current_level.lives);

	/* init spawn time */
	td_current_level.spawn_time = 1500;

	/* init towers array */
	td_current_level.towers = null;
	td_current_level.towers = new Array();

	/* init tilemap */
	td_current_level.tilemap = new tilemap(l.sublayers['_background'], td_current_level.M, td_current_level.N, td_global.cell_width, td_global.cell_height);  

	/* check if path exists */

	/* set tilemap's image array */
	//td_current_level.tilemap.tileimages = td_current_level.tile_image_mapping;
	td_current_level.tilemap.tileimages = images;

	/* set tiles */
	td_current_level.tilemap.tiles = td_current_level.tiles_array;

	/* put predefined towers */
	/* .towers[index] = tower object */
	for (var key in td_current_level.predefined_towers) {
		if(td_current_level.predefined_towers.hasOwnProperty(key)) {
			var index = td_current_level.predefined_towers[key].index;
			console.log( sprintf("key %s", td_current_level.predefined_towers[key].name));
			console.log( sprintf("index %s", index));

			if (1 != build_tower(index, td_current_level.predefined_towers[key].name)) {
				javascript_abort("error build tower");
			}

			//td_current_level.towers[index] = new tower(l.sublayers['towers'], td_current_level.tilemap, index, towers[td_current_level.predefined_towers[key].name]);
			//td_current_level.towers.push( new tower(l.sublayers['towers'], td_current_level.tilemap, index, towers[td_current_level.predefined_towers[key].name]) );
		}
	}

	/* init enemies */
	td_current_level.enemies = new Array();

	/* init projectiles */
	td_current_level.projectiles = new Array();

	/* explosions */
	td_current_level.explosions = new Array();
}

/**
 * @brief start spawning
 */
function td_start_level() {
	if (td_global.state != e_td_global_state.welcome) {
		console.log("cannot start game in state " + td_global.state);
		return;
	}

	if (undefined === td_current_level) {
		console.log("select level first");
		return;
	}

	/* start */
	td_global.state = e_td_global_state.playing;
	td_spawn_time_last = new Date().getTime() - 3000;

	td_spawn_interval = window.setInterval(td_spawn_interval_fn, 100);

	console.log("started");
}

function td_spawn_interval_fn() {
	var elapsed_wave = new Date().getTime() - td_spawn_time_wave;
	var elapsed_spawn = new Date().getTime() - td_spawn_time_last;

	//console.log( sprintf(" elapsed _last %d", elapsed_spawn) );
	if (td_current_level.spawn_time <= elapsed_spawn) {
		td_spawn_enemy();
	}

}


/* draw terrain tilemap */
function td_draw_terrain() {
	td_current_level.tilemap.draw();
}

function td_draw_towers() {
	for (var key in td_current_level.towers) {
		if(td_current_level.towers.hasOwnProperty(key)) {
			//console.log( sprintf( "draw tower key %s name %s", key, td_current_level.towers[key].name ) );
			td_current_level.towers[key].draw();

			/*
			console.log("gona draw arcs = %d", td_global.draw_arcs);
			if (true == td_global.draw_arcs) {
				td_current_level.towers[key].draw_arc();
			} else {
				td_current_level.towers[key].undraw_arc();
			}
			*/
		}
	}
}

/* check mousew arc */
function td_mouse_over_tower() {
	for (var key in td_current_level.towers) {
		if(td_current_level.towers.hasOwnProperty(key)) {
			var t = td_current_level.towers[key];
			if (mouse_x > t.x && mouse_x < t.x + t.animation.frame_w &&
					mouse_y > t.y && mouse_y < t.y + t.animation.frame_h) {
				return key;
			}
		}
	}
	return -1;
}

/* return -1 or cell */
function td_mouse_over_cell() {
	var td_pos = td_get_position();
	if (undefined === td_current_level || 
			mouse_gx < td_pos.x || mouse_gx > td_pos.w + td_pos.x ||
			mouse_gy < td_pos.y || mouse_gy > td_pos.h + td_pos.y) 
	{
		return -1;
	}

	var x = mouse_gx - td_pos.x;
	var y = mouse_gy - td_pos.y;

	return Math.floor(x / td_global.cell_width) + Math.floor( y / td_global.cell_height) * td_current_level.M;
}

function td_draw_enemies() {
	if (undefined === td_current_level.enemies) {
		return;
	}

	for (var i=0; i<td_current_level.enemies.length; i++) {
		td_current_level.enemies[i].undraw();
		if(e_state.destroy == td_current_level.enemies[i].state) {
			/* add money */
			td_current_level.enemies.splice(i, 1);
			i--;
		}
	}
	for (var i=0; i<td_current_level.enemies.length; i++) {
			td_current_level.enemies[i].draw();
	}
}

function td_draw_projectiles() {
	if (undefined === td_current_level.projectiles) {
		return;
	}

	for (var i=0; i<td_current_level.projectiles.length; i++) {
		td_current_level.projectiles[i].undraw();
		if(e_state.destroy == td_current_level.projectiles[i].state) {
			td_current_level.projectiles.splice(i, 1);
			i--;
			continue;
		} else {
			td_current_level.projectiles[i].draw();
		}
	}
}

function td_draw_explosions() {
	if (undefined === td_current_level.explosions) {
		return;
	}
	//console.log("draw %d explosions", td_current_level.explosions.length);
	/* undraw all */
	for (var i=0; i<td_current_level.explosions.length; i++) {
		td_current_level.explosions[i].undraw_frame();
		if(e_state.destroy == td_current_level.explosions[i].state) {
			td_current_level.explosions.splice(i, 1);
			i--;
		}
	}
	for (var i=0; i<td_current_level.explosions.length; i++) {
		td_current_level.explosions[i].animate();
		td_current_level.explosions[i].draw_frame();
	}
}

/**
 * @brief spawn time
 *
 * @return 
 */
function td_spawn_enemy() {
	if (-1 == td_current_level.current_wave) {
		console.log("first wave");
		td_current_level.current_wave = 0;
		td_current_level.current_wave_subindex = 0;
	}

	if (td_current_level.waves_array.length == td_current_level.current_wave) {
		//console.log("level finished");
		return;
	}

	if (0 == td_current_level.current_wave_subindex) {
		/* new wave spawned, record time */
		td_spawn_time_wave = new Date().getTime();
	}

	if (td_current_level.waves_array[td_current_level.current_wave].length == td_current_level.current_wave_subindex) {
		console.log("wave finished");
		td_current_level.current_wave_subindex = 0;
		td_current_level.current_wave++;
		return;
		/* pause ? next wave button ?*/
	}

	var this_foe = td_current_level.waves_array[td_current_level.current_wave][td_current_level.current_wave_subindex];

	switch (this_foe) {
	case spawn_300:
	case spawn_500:
	case spawn_1000:
	case spawn_1500:
	case spawn_2000:
	case spawn_3000:
	case spawn_6000:
		/* change spawn timer */
		td_current_level.spawn_time = this_foe;
		console.log("change spawn time to %d", td_current_level.spawn_time);
		break;

	default:
		/* enemy */

		console.log( sprintf("wave %d spawn %d [%s]", td_current_level.current_wave, td_current_level.current_wave_subindex, this_foe.name) );

		/* spawn here */
		var e = new enemy(l.sublayers['enemies'], td_current_level.tilemap, td_current_level.start_position, td_current_level.end_position, this_foe );
		e.path = generate_path(td_current_level.start_position, td_current_level.end_position, td_current_level.tilemap, images.key_to_index('road'));
		e.update_wave_hp(td_current_level.current_wave, td_global.wave_add_float_percent_hp);
		td_current_level.enemies.push(e);
	}

	/* record spawn time */
	td_spawn_time_last = new Date().getTime();

	td_current_level.current_wave_subindex++;
}

/**
 * @brief main loop
 *
 * @return 
 */
function td_think() {
	/* level not loaded */
	if (undefined === td_current_level) {
		return;
	}


	for (var key in td_current_level.towers) {
		if(td_current_level.towers.hasOwnProperty(key)) {
			//console.log( sprintf( "draw tower key %s name %s", key, td_current_level.towers[key].name ) );
			td_current_level.towers[key].think();
		}
	}


	for (var key in td_current_level.enemies) {
		if(td_current_level.enemies.hasOwnProperty(key)) {
			//console.log( sprintf( "draw enemy key %s name %s", key, td_current_level.enemies[key].name ) );
			td_current_level.enemies[key].think();
		}
	}
	for (var key in td_current_level.projectiles) {
		if(td_current_level.projectiles.hasOwnProperty(key)) {
			//console.log( sprintf( "draw enemy key %s name %s", key, td_current_level.enemies[key].name ) );
			td_current_level.projectiles[key].think();
		}
	}

}

function td_keydown(e) {
	var e=window.event || e;
	//console.log("keydown value: %d ", e.keyCode);
	//if (65 == e.keyCode) {
	//	td_global.draw_arcs = true;
	//}

	switch (e.keyCode) {
	case 65:
		td_global.draw_arcs = true;
		break;

	case 27: /* escape */
		td_builder.tower_selected = null;
		break;

		/* case 1..9 */
	//case (e.keyCode >= 49 && e.keyCode <= 57):
	case 49:
	case 50:
	case 51:
	case 52:
	case 53:
	case 54:
	case 55:
	case 56:
	case 57:
		builder_select_w(e.keyCode - 48);
		break;
	case 48:
		builder_select_w(10);
		break;
	case 189: /* - */
		builder_select_w(11);
		break;
	case 187: /* + */
		builder_select_w(12);
		break;

	}
}

function td_keyup(e) {
	var e=window.event || e;
	//console.log("keyup value: %d ", e.keyCode);
	if (65 == e.keyCode) {
		td_global.draw_arcs = false;
	}
}

function td_onmousemove(evt) {
	var e = (window.event) ? window.event : evt;
	//console.log("X/Y = %d/%d", e.clientX, e.clientY);
	mouse_x = e.clientX - l.container_div.offsetLeft;
	mouse_y = e.clientY - l.container_div.offsetTop;

	mouse_gx = e.clientX + window.pageXOffset;
	mouse_gy = e.clientY + window.pageYOffset;

	{
		mouse_cell = td_mouse_over_cell();
		if (-1 != mouse_cell) {
			//console.log(" cell %d", mouse_cell);
		}
	}
}

function td_onmouseclick(evt) {
	var e = (window.event) ? window.event : evt;
	//console.log("X/Y = %d/%d", e.clientX, e.clientY);
	mouse_x = e.clientX - l.container_div.offsetLeft;
	mouse_y = e.clientY - l.container_div.offsetTop;

	mouse_gx = e.clientX + window.pageXOffset;
	mouse_gy = e.clientY + window.pageYOffset;


	{
		var c = td_mouse_over_cell();
		if (-1 != c) {
			console.log(" clicked cell %d", c);
			builder_click_wrap(c);
		}

	}
}

/**
 * @brief hack index to image
 *
 * @param idx
 *
 * @return 
 */
function td_map_image_idx(idx) {
	//console.log( sprintf(" index %d is image %s", idx, td_current_level.tile_image_mapping[idx] ) );
	return images[ td_current_level.tile_image_mapping[idx] ];
}

/* return [x,y] td div position */
function td_get_position() {
	return get_position(l.container_div);
}

function td_game_over() {
	alert("game over");
	
	/* typo */
	clearInterval(interval);
}
