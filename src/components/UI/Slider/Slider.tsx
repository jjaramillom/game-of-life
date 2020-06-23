import React from 'react';
import classes from './Slider.module.css';

type Props = {
	min: number;
	max: number;
	value: number;
	onChange: Function;
};

const Slider = (props: Props) => {
	return (
		<div className={classes.slidecontainer}>
			<input
				onChange={(event) => {
					props.onChange(event);
				}}
				className={classes.slider}
				type='range'
			/>
		</div>
	);
};

export default Slider;
