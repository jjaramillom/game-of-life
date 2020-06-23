import React from 'react';
import classes from './Button.module.css';

type Props = {
	children?: any;
	clicked: Function;
};

const Button = (props: Props) => {
	return <button onClick={() => props.clicked()}>{props.children}</button>;
};

export default Button;
