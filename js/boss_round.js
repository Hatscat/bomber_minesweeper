"use strict"

function boss_round ()
{
	var rnd = Math.floor(Math.random() * 5);

	// choose action
	switch (rnd)
	{
		case 0: // bomb if possible
			if (!is_cell_bomb(game.boss_cell))
			{
				toggle_cell_bomb(game.boss_cell);
			}
			else
			{
				boss_move();
			}
		break;
		case 1: // recover discovered cells if possible
		case 2:
			var cells = get_cells_around(game.boss_cell).filter(c => !is_cell_hidden(c));

			if (cells.length > 0)
			{
				cells.forEach(toggle_cell_hidden);
			}
			else
			{
				boss_move();
			}
		break;
		default:
			boss_move();
		break;
	}
}

function boss_move ()
{
	var cells = get_cells_around(game.boss_cell).filter(is_cell_hidden);
	
	if (cells.length > 0)
	{
		toggle_cell_boss(game.boss_cell);
		game.boss_cell = cells[Math.floor(Math.random() * cells.length)];
		toggle_cell_boss(game.boss_cell);
	}
	else
	{
		console.log("boss cannot moves");
	}
}

