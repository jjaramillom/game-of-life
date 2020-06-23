import { actionTypes } from '../actions/actionTypes';

type Action = {
	type: actionTypes;
	board: Board;
	boardSize: BoardSize;
	coordinate: Coordinate;
};

const initialState: GameState = {
	boardSize: { columns: 0, rows: 0 },
	generation: 0,
	board: [],
	running: false,
};

const shouldLive = (coord: Coordinate, board: Board): boolean => {
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

const setAlive = (state: GameState, { coordinate }: Action) => {
	let newBoard = Array.from(state.board);
	newBoard[coordinate.x][coordinate.y] = !newBoard[coordinate.x][coordinate.y];
	return { ...state, board: newBoard };
};

const createBoard = (boardSize: BoardSize) => {
	return new Array(boardSize.rows)
		.fill(null)
		.map((_) => new Array(boardSize.rows).fill(false));
};

const updateBoard = (state: GameState): Board => {
	return state.board.map((col, i_x) => {
		return col.map((cell, i_y) => shouldLive({ x: i_x, y: i_y }, state.board));
	});
};

export default (state: GameState = initialState, action: Action): GameState => {
	switch (action.type) {
		case actionTypes.CLEAR_BOARD:
			return { ...state, board: createBoard(state.boardSize), generation: 0 };

		case actionTypes.CREATE_BOARD:
			return { ...state, board: createBoard(action.boardSize), boardSize: action.boardSize };

		case actionTypes.SET_ALIVE:
			return setAlive(state, action);

		case actionTypes.TICK:
			return { ...state, generation: state.generation + 1, board: updateBoard(state) };

		case actionTypes.START_GAME:
			return {
				...state,
				running: true,
				generation: state.generation + 1,
				board: updateBoard(state),
			};
		case actionTypes.PAUSE_GAME:
			return {
				...state,
				running: false,
			};
		default:
			return state;
	}
};
