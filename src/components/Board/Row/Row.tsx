import React from 'react';

import classes from './Row.module.css';

const Row = (props: any) => {
	return <div className={classes.row}>{props.children}</div>;
};

export default Row;
