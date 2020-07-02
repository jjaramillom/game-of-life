import { Action } from '../reducers/game';

export const randomizeShouldLive = (aliveRandomness: number = 0.5): boolean => {
	return Math.random() > aliveRandomness;
};

export const shouldLive = (coord: Coordinate, board: Board): boolean => {
	// if cell is alive
	const aliveNeighbors = getAliveNeighbors(coord, board);
	if (board[coord.x][coord.y]) {
		return aliveNeighbors === 2 || aliveNeighbors === 3;
	}
	return aliveNeighbors === 3;
};

const getAliveNeighbors = (coord: Coordinate, board: Board): number => {
	const aliveNeighbors = new Array<Boolean>();

	let minX: number = coord.x - 1;
	let maxX: number = coord.x + 1;

	let minY: number = coord.y - 1;
	let maxY: number = coord.y + 1;

	// if is in the far right end
	if (coord.x === board.length - 1) {
		minX = coord.x - 1;
		maxX = coord.x;
	} else if (coord.x === 0) {
		//if it is in the far left end
		minX = coord.x;
		maxX = coord.x + 1;
	}

	//if it is in the top
	if (coord.y === board[0].length - 1) {
		minY = coord.y - 1;
		maxY = coord.y;
	} else if (coord.y === 0) {
		//if it is in the bottom
		minY = coord.y;
		maxY = coord.y + 1;
	}

	for (let i = minX; i <= maxX; i++) {
		for (let j = minY; j <= maxY; j++) {
			if (i === coord.x && j === coord.y) continue;
			aliveNeighbors.push(board[i][j]);
		}
	}
	return aliveNeighbors.filter((ng) => ng).length;
};

export const setAlive = (state: GameState, { coordinate }: Action) => {
	let newBoard = Array.from(state.board);
	newBoard[coordinate.x][coordinate.y] = !newBoard[coordinate.x][coordinate.y];
	return { ...state, board: newBoard };
};

export const createBoard = (boardSize: BoardSize) => {
	return new Array(boardSize.rows)
		.fill(null)
		.map((_) => new Array(boardSize.columns).fill(false));
};
