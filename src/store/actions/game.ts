import { actionTypes } from './actionTypes';

import EventEmitter from '../../common/EventEmitter';

let updateInterval: NodeJS.Timeout | null;

export const nextTick = () => {
	EventEmitter.dispatch('tick', '');

	return {
		type: actionTypes.TICK,
	};
};

export const setAlive = (coord: Coordinate) => {
	return {
		type: actionTypes.SET_ALIVE,
		coordinate: coord,
	};
};

export const init = (boardSize: BoardSize) => {
	return {
		type: actionTypes.CREATE_BOARD,
		boardSize: boardSize,
	};
};

export const clearBoard = () => {
	return {
		type: actionTypes.CLEAR_BOARD,
	};
};

export const pauseGame = () => {
	clearInterval();
	return {
		type: actionTypes.PAUSE_GAME,
	};
};

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
		type: actionTypes.START_GAME,
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
