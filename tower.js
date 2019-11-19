var e_tower_state = { idle:0, reloading:1};


//function tower(ctx, tilemap, index, image, ms_reload, range, damage, ms_fire_speed) {
function tower(ctx, tilemap, index, tower_descriptor) {
	this.tilemap = tilemap;
	this.index = index; /* position in tilemap */
	//this.image = images[tower_descriptor.image];
	this.animation = new animation(ctx, images[tower_descriptor.image],
			tower_descriptor.frames, tower_descriptor.delay);

	this.state = e_tower_state.idle;
	this.ctx = ctx;

	this.name = tower_descriptor.name;
	this.ms_reload = shots[ tower_descriptor.shot ].reload;
	this.range = shots[ tower_descriptor.shot ].range;
	this.fire_time = 0;
	this.num_targets = tower_descriptor.num_targets;

	this.projectile = shots[ tower_descriptor.shot ];
	this.damage = shots[ tower_descriptor.shot ].damage;
	this.ms_fire_speed = shots[ tower_descriptor.shot ].speed; /* projectile speed */

	var pos = tile_index_to_xy(tilemap, index);
	this.x = pos[0];
	this.y = pos[1];

	/* target info */
	this.target = "";
	//this.dx = pos[0];
	//this.dy = pos[1];

	return this;
}

tower.prototype.draw = function() {
	//return;
	//this.ctx.drawImage(this.image, this.x, this.y);
	this.animation.dx = this.x;
	this.animation.dy = this.y;
	this.animation.draw_frame();
}

tower.prototype.draw_arc = function() {
	console.log("x y radius start end %d %d %d %f %f", this.x + td_global.cell_width/2, this.y + td_global.cell_height/2, this.range, 0, 2*Math.PI);
	var ctx = l.sublayers['arcs'];
	ctx.globalAlpha = 0.15;
	ctx.fillStyle = "yellow";
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(this.x + td_global.cell_width/2, this.y + td_global.cell_height/2, this.range, 0, 2*Math.PI, true);
	ctx.fill();
}

tower.prototype.undraw_arc = function() {
	//this.ctx.drawarc(this.x + this.tilemap.cell_w/2, this.y + this.tilemap.cell_h/2, 0, 2*Math.PI, true);
}

tower.prototype.think = function() {
	this.animation.animate();

	switch(this.state) {
	case e_tower_state.reloading:
		var elapsed = new Date().getTime() - this.fire_time;
		if (this.ms_reload <= elapsed) {
			this.state = e_tower_state.idle;
			//this.x--;
		}
		//javascript_abort("e " + elapsed + " r " + this.ms_reload);
		break;

	case e_tower_state.idle:
		/* acquire target */
		var targets_in_range = [];
		for (var key in td_current_level.enemies) {
			if(td_current_level.enemies.hasOwnProperty(key)) {
				e = td_current_level.enemies[key];
				var distance = get_distance(this.x, this.y, e.x, e.y);
				if (this.range >= distance) {
					targets_in_range.push( { dist : distance, target : e } );
				}
			}
		}
		//console.log(" %d targets in range", targets_in_range.length);
		targets_in_range.sort(targets_in_range_sort);

		var shots = 0;

		//if (targets_in_range.length > 0) {
		while (shots < this.num_targets && targets_in_range.length > shots) {
			this.fire(targets_in_range[shots].target);
			shots++;
		}

		delete targets_in_range;
		break;

	}
}

function targets_in_range_sort(a, b) {
	return a.dist - b.dist;
}

tower.prototype.fire = function(enemy) {
	/* add proejctile */
//	var p = new projectile(this.ctx, this.tilemap, this.index, enemy, shot1, this.ms_fire_speed /* speed */, this.damage /* damage */);
	var p = new projectile(l.sublayers['shots'], td_current_level.tilemap, this.index, enemy, this.projectile);
	td_current_level.projectiles.push(p);

	this.animation.repeat = 1;
	this.animation.running = true;

	this.state = e_tower_state.reloading;
	this.fire_time = new Date().getTime();
	//this.x++;
	//javascript_abort("fire!");
}

