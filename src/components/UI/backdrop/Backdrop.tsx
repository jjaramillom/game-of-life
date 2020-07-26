import React from 'react';

import classes from './Backdrop.module.css';

type Props = {
  children?: any;
  show?: boolean;
  clicked: Function;
};

const backdrop = (props: Props) =>
  props.show ? <div onClick={() => props.clicked()} className={classes.Backdrop}></div> : null;

export default backdrop;
