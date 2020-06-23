import { gameActionTypes } from './actionTypes';

import EventEmitter from '../../common/EventEmitter';

let updateInterval: NodeJS.Timeout | null;

const startInterval = (ms: number) => {
	return (dispatch: Function) => {
		updateInterval = setInterval(() => {
			dispatch(nextTick());
		}, ms);
	};
};

const clearInterval = () => {
	if (updateInterval) {
		clearTimeout(updateInterval);
		updateInterval = null;
	}
};

const setStartGame = () => {
	return {
		type: gameActionTypes.START_GAME,
	};
};

export const nextTick = () => {
	EventEmitter.dispatch('tick', '');

	return {
		type: gameActionTypes.TICK,
	};
};

export const setAlive = (coord: Coordinate) => {
	return {
		type: gameActionTypes.SET_ALIVE,
		coordinate: coord,
	};
};

export const init = (boardSize: BoardSize) => {
	return {
		type: gameActionTypes.INIT_BOARD,
		boardSize: boardSize,
	};
};

export const clearBoard = () => {
	return {
		type: gameActionTypes.CLEAR_BOARD,
	};
};

export const pauseGame = () => {
	clearInterval();
	return {
		type: gameActionTypes.PAUSE_GAME,
	};
};

export const startGame = (speed: number) => {
	if (updateInterval) {
		clearInterval();
	}
	return (dispatch: Function) => {
		const ms = 1000 / speed;
		dispatch(setStartGame());
		dispatch(startInterval(ms));
	};
};
