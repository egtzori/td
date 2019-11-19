mouse_x = 0;
mouse_y = 0;
mouse_cell = 0;

/* shots */

function td_data_init() {

/* explosion descriptors */

explosion1 = {
		name : 'explosion1',
		image : 'explosion1',
		frames : 10,
		delay : 16,
};

explosion3 = {
		name : 'explosion3',
		image : 'explosion3',
		frames : 8,
		delay : 16,
};

explosion5 = {
		name : 'explosion5',
		image : 'explosion5',
		frames : 8,
		delay : 16,
};

explosion6 = {
		name : 'explosion6',
		image : 'explosion6',
		frames : 8,
		delay : 16,
};

explosion6_1 = {
		name : 'explosion6_1',
		image : 'explosion6.1',
		frames : 8,
		delay : 16,
};

explosion6_2 = {
		name : 'explosion6_2',
		image : 'explosion6.2',
		frames : 8,
		delay : 16,
};

explosions = [];
explosions[ explosion1.name ] = explosion1;
explosions[ explosion3.name ] = explosion3;
explosions[ explosion5.name ] = explosion5;
explosions[ explosion6.name ] = explosion6;
explosions[ explosion6_1.name ] = explosion6_1;
explosions[ explosion6_2.name ] = explosion6_2;


/* proejctile descriptor */

shot1 = {
	name : 'shot1',
	image : images['shot'],
	speed : 6,
	damage : 5,
	range : 110,
	reload : 320,
	explosion : explosion1,
};

shot2 = {
	name : 'shot2',
	image : images['shot2'],
	speed : 6,
	damage : 11,
	range : 120,
	reload : 450,
	explosion : explosion5,
};

shot3 = {
	name : 'shot3',
	image : images['shot2'],
	speed : 6,
	damage : 9,
	range : 190,
	reload : 390,
	explosion : explosion3,
};

shot4 = {
	name : 'shot4',
	image : images['shot2'],
	speed : 6,
	damage : 35,
	range : 250,
	reload : 700,
	explosion : explosion5,
};

shot5 = {
	name : 'shot5',
	image : images['shot2'],
	speed : 6,
	damage : 13,
	range : 185,
	reload : 140,
	explosion : explosion1,
};

shot6 = {
	name : 'shot6',
	image : images['shot'],
	speed : 8,
	damage : 10,
	range : 150,
	reload : 130,
	explosion : explosion6,
};

shot7 = {
	name : 'shot7',
	image : images['shot2'],
	speed : 6,
	damage : 30,
	range : 160,
	reload : 400,
	explosion : explosion1,
};

shot8 = {
	name : 'shot8',
	image : images['shot2'],
	speed : 8,
	damage : 65,
	range : 210,
	reload : 250,
	explosion : explosion1,
};

shot_mrezha = {
	name : 'mrezha',
	image : images['mrezha1'],
	speed : 9,
	damage : 16,
	range : 210,
	reload : 440,
	explosion : explosion5,
};

/* global shots array */
shots = [];

shots[ shot1.name ] = shot1;
shots[ shot2.name ] = shot2;
shots[ shot3.name ] = shot3;
shots[ shot4.name ] = shot4;
shots[ shot5.name ] = shot5;
shots[ shot6.name ] = shot6;
shots[ shot7.name ] = shot7;
shots[ shot8.name ] = shot8;
shots[ shot_mrezha.name ] = shot_mrezha;

/*----------------------------------------------*/ 

/* animations */
//animation_tower1 = new animation(undefined, images['tower3'], 2, 100);
//animation_tower2 = new animation(undefined, images['tower3'], 2, 100);
//animation_tower3 = new animation(undefined, images['tower3'], 2, 100);

/* towers */
tower_yellow = {
	name : 'yellow', shot : 'shot1', num_targets : 1,
	image: 'yellow', frames: 2, delay : 100,
	price : 2,
};
tower_red2 = {
	name : 'red2', shot : 'shot2', num_targets : 1,
	image: 'red2', frames: 2, delay : 100,
	price : 3,
};

tower_white = {
	name : 'white', shot : 'shot1', num_targets : 2,
	image: 'white', frames: 2, delay : 100,
	price : 4,
};

tower_purple = {
	name : 'purple', shot : 'mrezha', num_targets : 1,
	image: 'purple', frames: 2, delay : 100,
	price : 6,
};

tower_blue = {
	name : 'blue', shot : 'shot3', num_targets : 2,
	image: 'blue', frames: 2, delay : 100,
	price : 6,
};

tower_gerbera = {
	name : 'gerb', shot : 'shot4', num_targets : 1,
	image: 'gerbera', frames: 2, delay : 100,
	price : 8,
};

tower_nymphaea = {
	name : 'nymph', shot : 'mrezha', num_targets : 2,
	image: 'nymphaea', frames: 2, delay : 100,
	price : 9,
};

tower_orange = {
	name : 'orange', shot : 'shot5', num_targets : 1,
	image: 'orange', frames: 2, delay : 100,
	price : 10,
};

tower_orchid = {
	name : 'orchid', shot : 'shot6', num_targets : 2,
	image: 'orchid', frames: 2, delay : 100,
	price : 12,
};

tower_red1 = {
	name : 'red1', shot : 'shot4', num_targets : 3,
	image: 'red1', frames: 2, delay : 100,
	price : 17,
};

tower_rose = {
	name : 'rose', shot : 'shot7', num_targets : 3,
	image: 'rose', frames: 2, delay : 100,
	price : 15,
};

tower_sunflower = {
	name : 'sunf', shot : 'shot8', num_targets : 1,
	image: 'sunflower', frames: 2, delay : 100,
	price : 20,
};


towers = [];


towers[ tower_yellow.name ] = tower_yellow;
towers[ tower_red2.name ] = tower_red2;
towers[ tower_white.name ] = tower_white;
towers[ tower_purple.name ] = tower_purple;
towers[ tower_blue.name ] = tower_blue;
towers[ tower_gerbera.name ] = tower_gerbera;
towers[ tower_nymphaea.name ] = tower_nymphaea;
towers[ tower_orange.name ] = tower_orange;
towers[ tower_orchid.name ] = tower_orchid;
towers[ tower_red1.name ] = tower_red1;
towers[ tower_rose.name ] = tower_rose;
towers[ tower_sunflower.name ] = tower_sunflower;

/*----------------------------------------------*/

/* global, explosion */
/* ne se polzva, opravi me v projectiles.js fire() */
anim_explosion = new animation(undefined, images['explosion1'], 10, 33);

/* */

/*
var anim_ant = new animation(undefined, images['ant'], 2, 100);
var anim_bug = new animation(undefined, images['bug'], 2, 100);
var anim_ladybug = new animation(undefined, images['ladybug'], 2, 100);
*/
/* foes */
foe_ant = {
	name:'ant', speed:5, image: 'ant', frames:2, delay:100, hp: 100,
	corpse : 'ant_corpse', prize : 2,
};

foe_bug = {
	name : 'bug', speed : 2, image: 'bug', frames:2, delay:100, hp:450,
	corpse : 'bug_corpse', prize : 3,
};

foe_ladybug = {
	name : 'ladybug', speed : 1, image: 'ladybug', frames:2, delay:100, hp:1200,
	corpse : 'ladybug_corpse', prize : 5,
};

foe_caterpillar = {
	name : 'caterpillar', speed : 2, image: 'caterpillar', frames:2, delay:100, hp:500,
	corpse : 'caterpillar_corpse', prize : 4,
};

foe_scutigera = {
	name : 'scutigera', speed : 2, image: 'scutigera', frames:2, delay:100, hp:350,
	corpse : 'scutigera_corpse', prize : 3,
};

foe_spider = {
	name : 'spider', speed : 4, image: 'spider', frames:2, delay:100, hp:150,
	corpse : 'spider_corpse', prize : 1,
};

foe_purple_beetle = {
	name : 'purple_beetle', speed : 3, image: 'purple_beetle', frames:2, delay:100, hp:250,
	corpse : 'purple_beetle_corpse', prize : 2,
};

foe_box_elder_bug = {
	name : 'box_elder_bug', speed : 2, image: 'box_elder_bug', frames:2, delay:100, hp:400,
	corpse : 'box_elder_bug_corpse', prize : 3,
};

foe_black_beetle = {
	name : 'black_beetle', speed : 2, image: 'black_beetle', frames:2, delay:100, hp:300,
	corpse : 'black_beetle_corpse', prize : 2,
};

foe_yellow_beetle = {
	name : 'yellow_beetle', speed : 2, image: 'yellow_beetle', frames:2, delay:100, hp:200,
	corpse : 'yellow_beetle_corpse', prize : 2,
};



foes = [];

foes[ foe_ant.name ] = foe_ant;
foes[ foe_bug.name ] = foe_bug;
foes[ foe_ladybug.name ] = foe_ladybug;
foes[ foe_scutigera.name ] = foe_scutigera;
foes[ foe_spider.name ] = foe_spider;
foes[ foe_purple_beetle.name ] = foe_purple_beetle;
foes[ foe_box_elder_bug.name ] = foe_box_elder_bug;
foes[ foe_black_beetle.name ] = foe_black_beetle;
foes[ foe_yellow_beetle.name ] = foe_yellow_beetle;

/*----------------------------------------------*/
/* spawn times */
spawn_300 = 300;
spawn_500 = 500;
spawn_1000 = 1000;
spawn_1500 = 1500;
spawn_2000 = 2000;
spawn_3000 = 3000;
spawn_6000 = 6000;

/*----------------------------------------------*/ 

/* level1 */

var R = images.key_to_index('road');
var H = images.key_to_index('house1');

var a = images.key_to_index('house2_1');
var s = images.key_to_index('house2_2');
var z = images.key_to_index('house2_3');
var x = images.key_to_index('house2_4');


level1_tiles_array =
[
 R,0,0,0,0,0,R,R,R,0,
 R,R,0,0,0,0,R,0,R,0,
 0,R,R,R,R,0,R,0,R,0,
 0,0,0,0,R,1,R,0,R,0,
 R,R,R,R,R,1,R,1,R,0,
 R,0,0,0,0,0,R,1,R,0,
 R,R,R,R,R,R,R,0,R,0,
 0,0,0,0,0,a,s,0,R,0,
 0,0,H,0,0,z,x,0,R,0,
 0,0,0,0,0,0,0,0,R,R,
];


level1_waves_array =
[
	[spawn_2000, foe_yellow_beetle, foe_scutigera],
 	[spawn_6000, spawn_2000, foe_spider, foe_yellow_beetle, foe_scutigera],
	[spawn_6000, spawn_2000, foe_yellow_beetle, foe_black_beetle, foe_box_elder_bug, spawn_1000, foe_purple_beetle, foe_spider,
  foe_scutigera],
	[spawn_6000, spawn_1000, foe_spider, foe_scutigera, foe_bug, foe_ant],
 	[spawn_6000, spawn_2000, foe_ant, foe_ladybug, foe_caterpillar, foe_caterpillar],
	[spawn_6000, spawn_1000, foe_ladybug, foe_ant, foe_bug, foe_ant, foe_caterpillar],
	[spawn_6000, spawn_1500, foe_bug, foe_black_beetle, foe_black_beetle, foe_scutigera, foe_yellow_beetle,
	foe_bug, foe_black_beetle, foe_black_beetle, foe_scutigera, foe_yellow_beetle],
];

/* tile mapping */
/* mahni me, polzva se samo ot tilemap.js:30 */
var i=0;
tile_mapping_level1 = [];
tile_mapping_level1[i++] = 'grass';//0;//images['grass'];
tile_mapping_level1[i++] = 'tree1';//1;//images['shot'];
tile_mapping_level1[i++] = 'tree2';//2;//images['tower1'];
tile_mapping_level1[i++] = 'house1';//2;//images['tower1'];
tile_mapping_level1[i++] = 'yellow';//3;//images['tower2'];
tile_mapping_level1[i++] = 'red1';//4;//images['tower2'];
tile_mapping_level1[i++] = 'red2';//4;//images['tower2'];
tile_mapping_level1[i++] = 'white';//4;//images['tower2'];
tile_mapping_level1[i++] = 'purple';//4;//images['tower2'];
tile_mapping_level1[i++] = 'blue';//4;//images['tower2'];
tile_mapping_level1[i++] = 'gerbera';//4;//images['tower2'];
tile_mapping_level1[i++] = 'nymphaea';//4;//images['tower2'];
tile_mapping_level1[i++] = 'orange';//4;//images['tower2'];
tile_mapping_level1[i++] = 'orchid';//4;//images['tower2'];
tile_mapping_level1[i++] = 'rose';//4;//images['tower2'];
tile_mapping_level1[i++] = 'sunflower';//4;//images['tower2'];
tile_mapping_level1[i++] = 'road';//5;//images['road'];
tile_mapping_level1[i++] = 'road2';//5;//images['road'];
tile_mapping_level1[i++] = 'shot';//5;//images['road'];
tile_mapping_level1[i++] = 'shot2';//5;//images['road'];
tile_mapping_level1[i++] = 'mrezha1';//5;//images['road'];
tile_mapping_level1[i++] = 'ant';//5;//images['road'];
tile_mapping_level1[i++] = 'bug';//5;//images['road'];
tile_mapping_level1[i++] = 'ladybug';//5;//images['road'];
tile_mapping_level1[i++] = 'caterpillar';//5;//images['road'];
tile_mapping_level1[i++] = 'scutigera';//5;//images['road'];
tile_mapping_level1[i++] = 'roach5';//5;//images['road'];
tile_mapping_level1[i++] = 'anim';//5;//images['road'];
tile_mapping_level1[i++] = 'explosion1';//5;//images['road'];


//i=32;
i = images.key_to_index('house2_1');

tile_mapping_level1[i++] = 'house2_1';
tile_mapping_level1[i++] = 'house2_2';
tile_mapping_level1[i++] = 'house2_3';
tile_mapping_level1[i++] = 'house2_4';

//console.log(" tile mapping is " + tile_mapping_level1 );

/* empty level 10x10 */

level_empty_tiles_array =
[
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
];

td_level_empty10_10 = {
	M : 10, N : 10,
	tiles_array : level_empty_tiles_array,
	waves_array : null,
	money_start : 50,
	waves_spawn_time : 30,
	current_wave : -1,
	current_wave_subindex : -1,
	state : 0, /* ?? */
	predefined_towers : [ 
	],
	tile_image_mapping : tile_mapping_level1,
	start_position : 0, /* auto ? */
	end_position : 99,
	lives : 5,
	
};



/*----------------------------------------------*/ 
td_level1 = {
	M : 10, N : 10,
	tiles_array : level1_tiles_array,
	waves_array : level1_waves_array,
	money_start : 50,
	waves_spawn_time : 30,
	current_wave : -1,
	current_wave_subindex : -1,
	state : 0, /* ?? */
	predefined_towers : [ 
		{ name : 'yellow', index : 12},
	],
	tile_image_mapping : tile_mapping_level1,
	start_position : 0,
	end_position : 99,
	lives : 5,
	
};


/* level2 */


var a = images.key_to_index('house2_1');
var s = images.key_to_index('house2_2');
var z = images.key_to_index('house2_3');
var x = images.key_to_index('house2_4');

level2_tiles_array =
[
 R,1,0,0,0,0,0,0,0,0,
 R,R,R,R,0,R,R,R,R,R,
 0,0,0,R,0,R,0,0,0,R,
 0,R,R,R,0,R,0,R,R,R,
 0,R,0,0,0,R,0,R,0,0,
 0,R,R,R,R,R,0,R,0,0,
 a,s,2,2,0,0,0,R,0,0,
 z,x,R,R,R,R,0,R,R,0,
 R,R,R,0,0,R,0,0,R,0,
 0,0,0,0,0,R,R,R,R,0,
];




level2_waves_array =
[
	[spawn_1000, foe_scutigera, foe_ant, foe_spider],
	[spawn_6000, spawn_1000, foe_ant, foe_caterpillar],
	[spawn_6000, spawn_1000, foe_ant, foe_caterpillar, foe_ant, foe_yellow_beetle],
	[spawn_6000, spawn_1000, foe_ant, foe_purple_beetle, foe_yellow_beetle],
	[spawn_6000, spawn_1000, foe_ant, foe_bug, foe_ant, foe_caterpillar],
	[spawn_6000, spawn_1000, foe_black_beetle, foe_ant, foe_caterpillar, foe_bug, foe_ant, foe_ladybug, foe_caterpillar],
	/* again */
	[spawn_6000, spawn_1000, foe_bug, foe_ant, foe_ladybug, foe_purple_beetle, ],
	[spawn_6000, spawn_1000, foe_ladybug, foe_ant, foe_bug, foe_ant, foe_caterpillar],
	[spawn_6000, spawn_1000, foe_bug, foe_ant, foe_purple_beetle, foe_yellow_beetle, foe_ant, foe_ladybug, foe_caterpillar, foe_caterpillar],
	[spawn_6000, spawn_300, foe_ladybug, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant],
	/* again */
	[spawn_1000, foe_bug, foe_ant, foe_ladybug, foe_purple_beetle, foe_caterpillar],
	[spawn_1000, foe_ladybug, foe_ant, foe_bug, foe_ant],
	[spawn_1000, foe_bug, foe_ant, foe_ladybug, foe_purple_beetle, foe_yellow_beetle, foe_bug, foe_ant, foe_ladybug, foe_caterpillar],
	[spawn_300, foe_purple_beetle, foe_ladybug, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant],
	/* again */
	[spawn_1000, foe_bug, foe_ant, foe_ladybug, foe_caterpillar, foe_caterpillar],
	[spawn_1000, foe_purple_beetle, foe_ladybug, foe_ant, foe_bug, foe_ant, foe_caterpillar],
	[spawn_1000 ,foe_bug, foe_ant, foe_ladybug, foe_yellow_beetle, foe_caterpillar, foe_bug, foe_ant, foe_ladybug, foe_caterpillar, foe_caterpillar],
	[spawn_300, foe_ladybug, foe_ant, foe_ant, foe_ant, foe_yellow_beetle, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant, foe_ant],
];


td_level2 = {
	M : 10, N : 10,
	tiles_array : level2_tiles_array,
	waves_array : level2_waves_array,
	money_start : 50,
	waves_spawn_time : 30,
	current_wave : -1,
	current_wave_subindex : -1,
	state : 0, /* ?? */
	predefined_towers : [ 
		//{ name : 'yellow', index : 2},
		//{ name : 'red1', index : 3},
		//{ name : 'yellow', index : 4},
		//{ name : 'red2', index : 5},
		//{ name : 'white', index : 6},
		//{ name : 'purple', index : 7},
	],
	tile_image_mapping : tile_mapping_level1,
	start_position : 0,
	end_position : 80,
	lives : 7,
	
};

} /* td_data_init() */
