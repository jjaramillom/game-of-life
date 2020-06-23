import { actionTypes } from './actionTypes';

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
