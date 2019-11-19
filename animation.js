
var animation = function(ctx, image, frames, ms_delay) {
	this.ctx = ctx;
	this.image = image;
	this.frames = frames;
	this.current_frame = 0;
	this.ms_delay = ms_delay;
	this.image_w = image.width;
	this.image_h = image.height;
	this.frame_w = image.width / this.frames;
	this.frame_h = image.height;
	this.repeat = 0;
	this.running = false;
	this.last_draw = new Date().getTime() - this.ms_delay;
	this.destroy_on_stop = false; /* true  & this.running == false -> destroy */
	this.destroy = false; /* ne se polzva */
	this.state = e_state.none;

	/* init these */
	this.dx = 0;
	this.dy = 0;
};

animation.prototype = {

animate: function() {
	if (false == this.running) {
		return;
	}

	var now = new Date().getTime();
	//console.log("draw , elapsed = %d", now - this.last_draw);

	if(now - this.last_draw > this.ms_delay) {
	//console.log("draw e, f=%d run=%d rep=%d die=%d", this.current_frame, this.running, this.repeat, this.destroy_on_stop);

		/* next framw */
		this.current_frame++;
		if(this.frames == this.current_frame) {
			/* last frame, decrement repeat */
			if (this.repeat > 0) {
				this.repeat--;
			}

			this.current_frame = 0;
			if (0 == this.repeat) {
				/* stop at framw0 */
				this.running = false;
				if (true == this.destroy_on_stop) {
					//console.log("destroy me");
					this.destroy = true; /* ne se polzva */
					this.state = e_state.destroy;
				}
			}
		}

		this.last_draw += this.ms_delay;

	}
	},

draw_frame: function() {
	var x = this.current_frame * (this.image_w / this.frames);
	//console.log("draw image frame=%d, repeat = %d, %d %d %d %d %d %d %d %d ", this.current_frame, this.repeat, x, 0, this.frame_w, this.image_h, 0, 0, this.frame_w, this.image_h);
	this.ctx.drawImage(this.image, x, 0, this.frame_w, this.frame_h, this.dx, this.dy, this.frame_w, this.frame_h);
},

draw_frame_here: function() {
	var x = this.current_frame * (this.image_w / this.frames);
	this.ctx.drawImage(this.image, x, 0, this.frame_w, this.frame_h, 0, 0, this.frame_w, this.frame_h);
},
draw_frame_at: function(dx, dy) {
	var x = this.current_frame * (this.image_w / this.frames);
	this.ctx.drawImage(this.image, x, 0, this.frame_w, this.frame_h, dx, dy, this.frame_w, this.frame_h);
},

undraw_frame: function() {
	//var x = (this.image_w / this.frames);
	//console.log("draw image frame=%d, %d %d %d %d %d %d %d %d ", this.current_frame, x, 0, w, this.image_h, 0, 0, w, this.image_h);
	this.ctx.clearRect(this.dx, this.dy, this.frame_w, this.frame_h);
},

restart: function() {
	this.current_frame = 0;
	this.repeat = 1;
	this.running = true;
	this.last_draw = new Date().getTime() - this.ms_delay;
}

};
