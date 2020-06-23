import { actionTypes } from './actionTypes';

import EventEmitter from '../../common/EventEmitter';

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
