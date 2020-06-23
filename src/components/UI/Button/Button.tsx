import React from 'react';
import classes from './Button.module.css';

export enum ButtonClass {
	success = 'Success',
	danger = 'Danger',
}

type Props = {
	children?: any;
	clicked: Function;
	class?: ButtonClass;
	color?: string;
};

const Button = (props: Props) => {
	const styles = [classes.Button];

	if (props.class) styles.push(classes[props.class]);
	console.log(styles);

	return (
		<button className={styles.join(' ')} onClick={() => props.clicked()}>
			{props.children}
		</button>
	);
};

export default Button;
