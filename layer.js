


function layer(container_div_id, width, height, parent_div_id) {
	this.container_div_id = container_div_id;
	this.width = width;
	this.height = height;

	var use_parent = document.getElementById(parent_div_id);
	if (null === use_parent) {
		javascript_abort("cant get parent with");
	}

	/* create container div */
	this.container_div = creatediv(container_div_id, "", width, height, 0, 0, use_parent);

	/* store canvas elements (test) */
	this.canvases = [];

	/* init sublayers */
	this.sublayers = [];
	this.sublayers_count = 0;

}

/**
 * @brief clear all sublayers
 */
layer.prototype.clearall = function() {
	if (null == this) {
		return;
	}

	for (var key in this.sublayers) {
		if(this.sublayers.hasOwnProperty(key)) {
			this.clear(key);
			console.log("cleared %s", key);
		}
	}
}

/**
 * @brief clear sublayer (canvas)
 */
layer.prototype.clear= function(canvas) {
	if (null === canvas || null === this.sublayers[canvas]) {
		return;
	}

	this.sublayers[canvas].clearRect(0, 0, this.width, this.height);
}

/**
 * @brief create sublayer(canvas)
 *
 * @param id
 * @param class
 * @param width
 * @param height
 * @param top
 * @param bottom
 *
 * @return sublayer (canvas) element
 */
//layer.prototype.sublayer = function(id, use_class, width, height, left, top) {
layer.prototype.sublayer = function(id, use_class) {
	var ret;

	this.sublayers_count++;

	var width = this.width;
	var height = this.height;
	var top = 0;
	var left = 0; //200 * this.sublayers_count; //0;

	ret = create_canvas(id, use_class, width, height, 
			this.container_div.left + left, this.container_div.top + top,
		 	//document.body, this.sublayers_count);
		 	this.container_div, this.sublayers_count);

	//ret.style.position = "absolute"; /* ne raboti otvytre ? */

	/* !? fixes scaling problem */
	//ret.getContext('2d').scale(1, 0.5);

	this.canvases[id] = ret;
	this.sublayers[id] = ret.getContext('2d');
	return ret;
}
