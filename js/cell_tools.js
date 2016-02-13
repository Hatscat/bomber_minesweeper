"use strict"

function cell_val (b_hidden, b_flag, b_bomb, b_boss, i_threat)
{
	return (i_threat << 4) | (b_boss ? 8 : 0) | (b_bomb ? 4 : 0) | (b_flag ? 2 : 0) | (b_hidden ? 1 : 0);
}

function is_cell_hidden (i)
{
	return (game.cells[i] & 1) != 0;
}

function is_cell_flag (i)
{
	return (game.cells[i] & 2) != 0;
}

function is_cell_bomb (i)
{
	return (game.cells[i] & 4) != 0;
}

function is_cell_boss (i)
{
	return (game.cells[i] & 8) != 0;
}

/*function get_cell_threat (i) // pour une map statique...
{
	return game.cells[i] >> 4;
}*/

function get_cell_threat (i)
{
	return get_cells_around(i).reduce(function (p, c, i) {
		return p + (is_cell_boss(c) || is_cell_bomb(c) ? 1 : 0);
	}, 0);
}

function toggle_cell_hidden (i)
{
	game.cells[i] ^= 1;
}

function toggle_cell_flag (i)
{
	game.cells[i] ^= 2;
}

function toggle_cell_bomb (i)
{
	game.cells[i] ^= 4;
}

function toggle_cell_boss (i)
{
	game.cells[i] ^= 8;
}

function add_cell_threat (i, threat)
{
	game.cells[i] += (threat << 4);
}

function set_cell_threat (i, threat)
{
	game.cells[i] &= 0xf;
	game.cells[i] |= (threat << 4);
}

function get_cells_around (i)
{
	var cells = [];

	var not_left = i % game.cols_nb != 0;
	var not_right = (i + 1) % game.cols_nb != 0;
	var not_top = i > game.cols_nb;
	var not_bot = i +  game.cols_nb < game.cells.length;
	
	if (not_left)
	{
		cells[cells.length] = i - 1; // left

		if (not_top)
			cells[cells.length] = i - 1 - game.cols_nb; // left-top
		if (not_bot)
			cells[cells.length] = i - 1 + game.cols_nb; // left-down
	}
	if (not_right)
	{
		cells[cells.length] = i + 1; // right

		if (not_top)
			cells[cells.length] = i + 1 - game.cols_nb; // right-top
		if (not_bot)
			cells[cells.length] = i + 1 + game.cols_nb; // right-down
	}
	if (not_top)
		cells[cells.length] = i - game.cols_nb; // top
	if (not_bot)
		cells[cells.length] = i + game.cols_nb; // down

	return cells;
}

