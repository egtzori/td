
//var e_projectile_state = { none:0, moving:1, arrived:2, destroy:10};


function projectile(ctx, tilemap, start_index, target, projectile_descriptor) {
	this.tilemap = tilemap;
	this.start_index = start_index;
	this.image = projectile_descriptor.image;
	this.speed = projectile_descriptor.speed;
	this.state = e_state.moving;
	this.ctx = ctx;

	this.projectile_descriptor = projectile_descriptor;
	this.damage = projectile_descriptor.damage;

	var pos = tile_index_to_xy(tilemap, start_index);
	this.x = pos[0] + tilemap.cell_w/2;
	this.y = pos[1] + tilemap.cell_h/2;

	/* target coordinates */
	this.target = target;
	this.dx = this.target.x + this.tilemap.cell_w/2;
	this.dy = this.target.y + this.tilemap.cell_h/2;

	var a = Math.abs(this.x - this.dx);
	var b = Math.abs(this.y - this.dy);
	var c = Math.sqrt(a*a + b*b);
	var steps = c / this.speed;
	this.speedx = a/steps;
	this.speedy = b/steps;


	return this;
}

projectile.prototype.draw = function() {
	this.ctx.drawImage(this.image, this.x, this.y);
}

projectile.prototype.undraw = function() {
	this.ctx.clearRect(this.x - 2, this.y - 2, this.image.width + 2, this.image.height + 2);
}

projectile.prototype.think = function() {
	//javascript_abort("think old = " + this.x + "/" + this.y + " dest = " + this.dx + " " + this.dy);
	switch(this.state) {
	case e_state.idle:
		javascript_abort("unreachable");
		break;

	case e_state.moving:
		this.undraw();

		if (Math.abs(this.x - this.dx) <= this.speed && Math.abs(this.y - this.dy) <= this.speed) {
			/* arrived */
			this.state = e_state.arrived;
			break;
		}

		if (0) {/* update target coords */
			this.dx = this.target.x + this.tilemap.cell_w/2;
			this.dy = this.target.y + this.tilemap.cell_h/2
		}

		if (this.x < this.dx)
			this.x+=this.speedx
		if (this.x > this.dx)
			this.x-=this.speedx
		if (this.y < this.dy)
			this.y+=this.speedy
		if (this.y > this.dy)
			this.y-=this.speedy

		/* move */
		/*
		if (this.x < this.dx)
			this.x+=this.speed
		if (this.x > this.dx)
			this.x-=this.speed
		if (this.y < this.dy)
			this.y+=this.speed
		if (this.y > this.dy)
			this.y-=this.speed
		*/

		//javascript_abort("projectile moved, new = " + this.x + "/" + this.y + " dest = " + this.dx + " " + this.dy);


		break;

	case e_state.arrived:
		/* target reached, some animation and destroy */
		this.target.hp -= this.projectile_descriptor.damage;

		/* explode */
		//console.log("projectile arrived");
		//var e = anim_explosion;
		//var e = new animation(this.ctx, images['explosion1'], 10, 16);
		
		var e = new animation(this.ctx,
				images[this.projectile_descriptor.explosion.image],
				this.projectile_descriptor.explosion.frames,
				this.projectile_descriptor.explosion.delay);

		e.ctx = l.sublayers['explosions'];
		e.restart();
		e.destroy_on_stop = true;
		e.dx = this.x - e.frame_w/2;
		e.dy = this.y - e.frame_h/2;
		td_current_level.explosions.push(e);

		this.state = e_state.destroy;
		break;
	}



}
