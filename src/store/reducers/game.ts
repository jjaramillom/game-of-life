import { gameActionTypes } from '../actions/actionTypes';
import { createBoard, shouldLive, setAlive, randomizeShouldLive } from '../helpers/game';

export type Action = {
	type: gameActionTypes;
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

const initBoard = (state: GameState, { boardSize }: Action) => {
	return { ...state, board: createBoard(boardSize), boardSize: boardSize };
};

const updateBoard = (state: GameState, rule: Function = shouldLive): Board => {
	return state.board.map((col, i_x) => {
		return col.map((_, i_y) => rule({ x: i_x, y: i_y }, state.board));
	});
};

const clearBoard = (state: GameState) => {
	return { ...state, board: createBoard(state.boardSize), generation: 0 };
};

const startGame = (state: GameState) => {
	return {
		...state,
		running: true,
		generation: state.generation + 1,
		board: updateBoard(state),
	};
};

const tick = (state: GameState) => {
	return { ...state, generation: state.generation + 1, board: updateBoard(state) };
};

const pauseGame = (state: GameState) => {
	return {
		...state,
		running: false,
	};
};

const randomizeBoard = (state: GameState) => {
	return { ...state, board: updateBoard(state, () => randomizeShouldLive(0.5)) };
};

const reducerMap = {
	TICK: (state: GameState, action: Action): GameState => tick(state),
	INIT_BOARD: (state: GameState, action: Action): GameState => initBoard(state, action),
	CLEAR_BOARD: (state: GameState, action: Action): GameState => clearBoard(state),
	SET_ALIVE: (state: GameState, action: Action): GameState => setAlive(state, action),
	START_GAME: (state: GameState, action: Action): GameState => startGame(state),
	PAUSE_GAME: (state: GameState, action: Action): GameState => pauseGame(state),
	RANDOMIZE_BOARD: (state: GameState, action: Action): GameState => randomizeBoard(state),
};

export default (state: GameState = initialState, action: Action): GameState => {
	if (reducerMap[action.type]) return reducerMap[action.type](state, action);
	// console.log(`Not implemented action: ${action.type}`);
	return state;
};
