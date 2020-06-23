import { actionTypes } from '../actions/actionTypes';

type Action = {
	type: actionTypes;
	board: Board;
	boardSize: BoardSize;
	coordinate: Coordinate;
};

const initialState: UIState = {
	clicked: false,
	color: '#28ed05',
};

export default (state: UIState = initialState, action: Action): UIState => {
	switch (action.type) {
		case actionTypes.MOUSE_DOWN:
			return { ...state, clicked: true };

		case actionTypes.MOUSE_UP:
			return { ...state, clicked: false };

		default:
			return state;
	}
};
