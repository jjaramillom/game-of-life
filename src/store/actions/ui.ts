import { actionTypes } from './actionTypes';

import EventEmitter from '../../common/EventEmitter';

export const mouseDown = () => {
	return {
		type: actionTypes.MOUSE_DOWN,
	};
};

export const mouseUp = () => {
	return {
		type: actionTypes.MOUSE_UP,
	};
};
