"use strict"

function draw ()
{
	// ---- clear ---- //
	
	game.buffer_ctx.clearRect(0, 0, game.W, game.H);

	// ---- map ---- //
	
	for (var i = game.cells.length; i--;)
	{
		var x = game.map_coord.x + (i % game.cols_nb) * game.cell_size;
		var y = game.map_coord.y + Math.floor(i / game.cols_nb) * game.cell_size;

		if (is_cell_hidden(i))
		{
			if (is_cell_flag(i))
			{
				game.buffer_ctx.fillStyle = "#80f";
			}
			else
			{
				game.buffer_ctx.fillStyle = "#48f";
			}
			game.buffer_ctx.fillRect(x, y, game.cell_size, game.cell_size);
		}
		else
		{
			if (is_cell_boss(i))
			{
				game.buffer_ctx.fillStyle = "#fb0";
				game.buffer_ctx.fillRect(x, y, game.cell_size, game.cell_size);
			}
			else if (is_cell_bomb(i))
			{
				game.buffer_ctx.fillStyle = "#f00";
				game.buffer_ctx.fillRect(x, y, game.cell_size, game.cell_size);
			}
			else
			{
				game.buffer_ctx.fillStyle = "#000";
				game.buffer_ctx.fillText(get_cell_threat(i) || '', x + game.cell_size / 2, y + game.cell_size / 2);
			}
		}
			
		game.buffer_ctx.strokeStyle = "#000";
		game.buffer_ctx.strokeRect(x, y, game.cell_size, game.cell_size);
	}

	// ---- draw buffer ---- //

	game.visible_ctx.clearRect(0, 0, game.W, game.H);
	game.visible_ctx.drawImage(game.buffer_canvas, 0, 0);
}

