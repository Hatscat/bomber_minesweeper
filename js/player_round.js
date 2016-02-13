"use strict"

function player_round ()
{
	if (game.mouse.buttons & 1) // left click
	{
		discover_cell(game.mouse.cell);

		if (is_cell_boss(game.mouse.cell))
		{
			if (confirm("YOU WIN!"))
				init_game();
		}
		else if (is_cell_bomb(game.mouse.cell))
		{
			if (confirm("YOU LOSE..."))
				init_game();
		}
	}
	else if (game.mouse.buttons & 2) // right click
	{
		if (is_cell_hidden(game.mouse.cell))
		{
			toggle_cell_flag(game.mouse.cell);
		}
	}
}

function discover_cell (i)
{
	if (!is_cell_hidden(i))
		return;

	toggle_cell_hidden(i);

	if (get_cell_threat(i) != 0)
		return;

	get_cells_around(i).forEach(discover_cell);
}

