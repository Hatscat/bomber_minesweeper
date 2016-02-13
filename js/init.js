"use strict"

addEventListener("load", loaded, false);

function loaded ()
{
	window.game = {
		//canvas_y: visible_canvas.getBoundingClientRect().top,
		canvas_y: 30,
		mouse: {
			buttons: 0,
			x: 0,
			y: 0,
			cell: -1
		},
		cols_nb: 16,
		rows_nb: 16,
		bombs_nb: 20,
		map_coord: { x: 0, y: 0, w: 0, h: 0 }
	};
	
	visible_canvas.style.top = game.canvas_y + "px";
	game.W = visible_canvas.width = innerWidth;
	game.H = visible_canvas.height = innerHeight - game.canvas_y;
	game.visible_ctx = visible_canvas.getContext("2d");
	game.buffer_canvas = visible_canvas.cloneNode();
	game.buffer_ctx = game.buffer_canvas.getContext("2d");
	game.buffer_ctx.textAlign = "center";
	game.buffer_ctx.textBaseline = "middle";

	init_events();
	init_game();
}

function init_game ()
{
	var w = game.W / game.cols_nb;
	var h = game.H / game.rows_nb;

	game.cell_size = Math.floor(Math.min(w, h));
	game.map_coord.w = game.cell_size * game.cols_nb;
	game.map_coord.h = game.cell_size * game.rows_nb;
	game.map_coord.x = Math.floor((game.W - game.map_coord.w) / 2);
	game.map_coord.y = Math.floor((game.H - game.map_coord.h) / 2);

	game.buffer_ctx.font = (game.cell_size / 2) + "px Arial";

	game.cells = new Uint8ClampedArray(game.cols_nb * game.rows_nb);

	game.boss_cell = Math.floor(Math.random() * game.cells.length);

	init_cells();

	requestAnimationFrame(draw);
}

function init_cells ()
{
	// empty map
	for (var i = game.cells.length; i--;)
		game.cells[i] = cell_val(true, false, false, false, 0);

	// boss
	toggle_cell_boss(game.boss_cell);
	
	// bombs
	for (var i = game.bombs_nb; i--;)
	{
		var map_i = Math.floor(Math.random() * game.cells.length);

		while (is_cell_bomb(game.cells[map_i]))
			map_i = Math.floor(Math.random() * game.cells.length);

		toggle_cell_bomb(map_i);

		get_cells_around(map_i).forEach(function (cell) {
			add_cell_threat(cell, 1);
		});
	}
}

function init_events ()
{
	// ------------ prevent right click ------------ //

	addEventListener('contextmenu', function(e)
	{ 
		e.preventDefault();
	}, false);

	// ------------ mouse ------------ //

	addEventListener("mousemove", function (e)
	{
		game.mouse.x = e.clientX;
		game.mouse.y = e.clientY;

		var c = Math.floor((game.mouse.x - game.map_coord.x) / game.cell_size);
		var r = Math.floor((game.mouse.y - game.map_coord.y - game.canvas_y) / game.cell_size);

		game.mouse.cell = c + r * game.cols_nb;
	}, false);

	addEventListener("mousedown", function (e)
	{

		game.mouse.buttons = e.buttons;
		player_round();
		boss_round();
		requestAnimationFrame(draw);
	}, false);

	addEventListener("mouseup", function (e)
	{
		game.mouse.buttons = 0;
	}, false);

	// ------------ new map button ------------ //
	
	bt_map.addEventListener("click", function ()
	{
		game.cols_nb = Math.floor(in_cols.value);
		game.rows_nb = Math.floor(in_rows.value);
		game.bombs_nb = Math.floor(in_bombs.value);

		init_game();
	}, false);
}

