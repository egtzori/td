
function tilemap(context, sx, sy, cw, ch) {
	this.size_x = sx; this.size_y = sy;
	this.cell_w = cw; this.cell_h = ch;

	this.ctx = context;

	/* tile descriptor */
	this.tiles = [];
	this.tileimages = [];

	/* init tiles, 0 = background/default */
	for (i=0; i<sx*sy; i++) {
		this.tiles[i] = 0;
	}

	return this;
}

/* ne, tilemap neznae nishto */
tilemap.prototype.get_position = function() {
	javascript_abort("trap");
}

tilemap.prototype.set_tile_image = function(index, img) {
	this.tileimages[index] = img;
}

tilemap.prototype.draw = function() {
	//alert("drawing..");

	for (i=0; i<this.size_x; i++) {
		for (j=0; j<this.size_y; j++) {
			//this.ctx.drawImage(this.tileimages[ this.tiles[i + j*this.size_y] ], i*this.cell_w, j*this.cell_h, this.cell_w, this.cell_h);
			//console.log("tile %d image %s", i + j*this.size_y, this.tiles[i + j*this.size_y]);
			this.ctx.drawImage( td_map_image_idx( this.tiles[i + j*this.size_y] ), i*this.cell_w, j*this.cell_h, this.cell_w, this.cell_h);
		}
	}

}

/**
 * @brief get tile neighbours
 *
 * @param tile index (0..M*N-1)
 *
 * @return  Array()
 */
function get_neighbours(index, tile) {
	var ret = new Array();
	var x = index % tile.size_x;
	var y = Math.floor(index / tile.size_y);

	//log2("add index " + index + " x/y " + x + "/" + y);

	/* top */
	if (y > 0) {
		ret.push(index - tile.size_y);
		//log2("add top " + ret[ret.length-1]);
	}

	/* bottom */
	if (y < (tile.size_y-1)) {
		ret.push(index + tile.size_y);
		//log2("add bottom " + ret[ret.length-1]);
	}

	/* left */
	if (x > 0) {
		ret.push(index - 1);
		//log2("add left " + ret[ret.length-1]);
	}

	/* right */
	if (x < (tile.size_x-1)) {
		ret.push(index + 1)
		//log2("add right " + ret[ret.length-1]);
	}

	/* top left */
	if (y > 0 && x > 0) {
		ret.push(index - tile.size_y - 1);
		//log2("add TL " + ret[ret.length-1]);
	}

	/* bottom left */
	if (y < (tile.size_y-1) && x > 0) {
		ret.push(index + tile.size_y - 1);
		//log2("add BL " + ret[ret.length-1]);
	}

	/* top right */
	if (y > 0 && x < (tile.size_x-1)) {
		ret.push(index - tile.size_y + 1);
		//log2("add TR " + ret[ret.length-1]);
	}

	/* bottom right */
	if (y < (tile.size_y-1) && x < (tile.size_x-1)) {
		ret.push(index + tile.size_y + 1);
		//log2("add BR " + ret[ret.length-1]);
	}

	return ret;
}

/**
 * @brief gen path between tile indexes
 * no path crossing allowed
 *
 * @param start
 * @param end
 *
 * @return array
 */
function generate_path(start, end, tile, road) {
	var ret = new Array();
	var last_index = -1;
	var this_index = start;
	var next_road; /* cound found neighbouring roads */
	var steps = 0;

	ret.push(start);

	while (1) {
		n = get_neighbours(this_index, tile);
		//log2("do " + this_index + " neighbours = " + n.length);

		next_road = 0;
		/* find neighbouring road */
		for (i=0; i<n.length; i++) {
			if (last_index != n[i] && tile.tiles[ n[i] ] == road) {
				//log2("found road at " + i + " index " + n[i] + " last index " + last_index);
				ret.push(n[i]);
				next_road++;
				last_index = this_index;
				this_index = n[i];
				break;
			}
		}

		/* no neighbours = error */
		if (0 == next_road) {
			javascript_abort("no neighbors! this = " + this_index + " tested cells = " + n.length);
		}

		steps++;

		if (end == this_index) {
			//log2("reached end at " + this_index + ", steps = " + steps);
			break;
		}

		if (100 == steps) {
			javascript_abort("max steps reached = " + steps);
		}


	}

	return ret;
}

/**
 * @brief convert tile index to x/y
 * @param index
 * @return Array(2)
 */
function tile_index_to_xy(tilemap, index) {
	var ret = new Array();
	ret.push( td_global.cell_width * (index % 10)); /* !! hardcoced 10 */
	ret.push( td_global.cell_height * Math.floor(index / 10));

	log2("tile index for " + index + " return " + ret[0] + "/" + ret[1]);
	return ret;
}
