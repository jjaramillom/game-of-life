import { uiActionTypes } from './actionTypes';

export const mouseDown = () => {
  return {
    type: uiActionTypes.MOUSE_DOWN,
  };
};

export const mouseUp = () => {
  return {
    type: uiActionTypes.MOUSE_UP,
  };
};

export const updateColor = (color: string) => {
  return {
    type: uiActionTypes.UPDATE_COLOR,
    color,
  };
};
