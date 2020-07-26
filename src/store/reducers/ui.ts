import { uiActionTypes } from '../actions/actionTypes';

type Action = {
  type: uiActionTypes;
  board: Board;
  boardSize: BoardSize;
  coordinate: Coordinate;
  color: string;
};

/**
 * TODO Include a color palette to allow selecting the color of the living cells
 */

const initialState: UIState = {
  clicked: false,
  color: '#2ccce4',
};

export default (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case uiActionTypes.MOUSE_DOWN:
      return { ...state, clicked: true };

    case uiActionTypes.MOUSE_UP:
      return { ...state, clicked: false };

    case uiActionTypes.UPDATE_COLOR:
      return { ...state, color: action.color };

    default:
      return state;
  }
};
