//var e_enemy_state = { none:0, moving:1, arrived:2, destroy:10, despawn:11};

var e_enemy_orientation = { right:0, down:1, left:2, up:3 };


function enemy(ctx, tilemap, start, end, foe_descriptor) {
	this.tilemap = tilemap;
	this.start = start;
	this.end = start;

	//this.image = images[foe_descriptor.image];
	//this.animation = foe_descriptor.animation;
	this.animation = new animation(ctx, images[foe_descriptor.image], foe_descriptor.frames, foe_descriptor.delay);
	this.animation.ctx = ctx;
	this.animation.restart();
	this.animation.repeat = -1;

	this.speed = foe_descriptor.speed;
	this.state = e_state.idle;
	this.ctx = ctx;
	this.name = foe_descriptor.name;
	this.prize = foe_descriptor.prize;

	this.corpse_img = images[foe_descriptor.corpse];

	this.hp_total = foe_descriptor.hp;
	this.hp = this.hp_total;

	var pos = tile_index_to_xy(tilemap, start);
	this.x = pos[0];
	this.y = pos[1];

	this.path = []; /* path to end */ /* ne mi triabva za vseki */
	this.path_index = 0; /* path[path_index] = me; */

	/* target coordinates */
	this.dx = pos[0];
	this.dy = pos[1];

	this.orientation = e_enemy_orientation.down;

	return this;
}

/**
 * @brief add %hp to each wave
 * @param wave
 */
enemy.prototype.update_wave_hp = function(wave, add_float_percent) {
	var add = this.hp_total * (wave * add_float_percent);
	this.hp+= add;
	this.hp_total += add;
	console.log("wave %d added %d hp to %s", wave, add, this.name);
}

enemy.prototype.transform = function(ctx) {
	ctx.save();
	ctx.translate(this.x + this.animation.frame_w/2, this.y + this.animation.frame_h/2);
	ctx.rotate(90*(Math.PI/180) * this.orientation);
}

enemy.prototype.draw = function() {
	//this.ctx.translate(this.x, this.y);
	//this.animation.dx = this.x - this.animation.frame_w/2;
	//this.animation.dy = this.y - this.animation.frame_h/2;
	this.transform(this.animation.ctx);
	this.animation.draw_frame_at(-this.animation.frame_w/2, -this.animation.frame_h/2);
	this.animation.ctx.restore();
	//this.ctx.translate(-this.x, -this.y);
	//this.ctx.drawImage(this.image, this.x, this.y);
	rect(this.ctx, this.x, this.y - 2, this.tilemap.cell_w * (this.hp / this.hp_total), 5, "#00bb00");
}

enemy.prototype.undraw = function() {
	this.ctx.clearRect(this.x, this.y - 2, this.animation.frame_w, this.animation.frame_h + 2 );
}

enemy.prototype.die = function() {
	this.undraw();
	this.state = e_state.destroy;
	this.transform(l.sublayers['corpses']);
	l.sublayers['corpses'].drawImage(this.corpse_img, -this.corpse_img.width/2, -this.corpse_img.height/2);
	l.sublayers['corpses'].restore();
	this.hp = 0;
	td_money_add(this.prize);
}

enemy.prototype.think = function() {
	this.animation.animate();
	if (this.hp <= 0) {
		/* dead */
		this.die();
		return;
	}

	switch(this.state) {
	case e_state.idle:
		this.state = e_state.moving;
		break;

	case e_state.moving:
		/* here ? */
		this.undraw();

		//this.x ++;
		/* move */
		if (this.x < this.dx) {
			this.x += Math.min(this.speed, Math.abs(this.x - this.dx));
			this.orientation = e_enemy_orientation.right;
		}
		if (this.x > this.dx) {
			this.x -= Math.min(this.speed, Math.abs(this.x - this.dx));
			this.orientation = e_enemy_orientation.left;
		}
		if (this.y < this.dy) {
			this.y += Math.min(this.speed, Math.abs(this.y - this.dy));
			this.orientation = e_enemy_orientation.down;
		}
		if (this.y > this.dy) {
			this.y -= Math.min(this.speed, Math.abs(this.y - this.dy));
			this.orientation = e_enemy_orientation.up;
		}
		//log2("moved, new = " + this.x + "/" + this.y);

		if (this.x == this.dx && this.y == this.dy) {
			/* arrived */
			this.state = e_state.arrived;
			break;
		}


		break;

	case e_state.arrived:
		/* move to next tile */
		this.path_index++;
		this.state = e_state.moving;

		if (this.path_index == this.path.length) {
			this.state = e_state.despawn;

			td_lives_take();

			//alert("game over ?");
			//javascript_abort("arrived index = " + this.path_index + " len = " + this.path.length);
			break;
		}


		/* new dest x/y */
		var pos = tile_index_to_xy(this.tilemap, this.path[this.path_index]);
		this.dx = pos[0];
		this.dy = pos[1];

		//log2("arrived, next index " + this.path_index + " = tileindex " + this.path[this.path_index]);
		//log2("next dx/dy " + this.dx + "/" + this.dy);

		/* think again :( */
		this.think();
		break;
	}



}
