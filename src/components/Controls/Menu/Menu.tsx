import React, { useState } from 'react';
// import Button, { ButtonClass } from '../../UI/Button/Button';
import {
	Button,
	Slider,
	Typography,
	Grid,
	TextField,
} from '@material-ui/core';
// import { Slider } from '@material-ui/core';

import { connect } from 'react-redux';

import classes from './Menu.module.css';
import actions from '../../../store/actions/index';

type Props = {
	children?: any;
	generation?: number;
	running?: boolean;
	onTick: Function;
	onClearBoard: Function;
	onStart: Function;
	onPause: Function;
};

const INITIAL_SPEED = 1;

const Menu = (props: Props) => {
	const [speed, setSpeed] = useState(INITIAL_SPEED);

	const onNextHandler = () => {
		props.onTick();
	};

	const onPlayPauseHandler = () => {
		if (!props.running) return props.onStart(speed);
		return props.onPause();
	};

	const onUpdateSliderValue = (value: any) => {
		setSpeed(value);
	};

	const onClearBoard = () => {
		props.onClearBoard();
	};

	const onSliderChange = (value: any) => {
		setSpeed(value);
		if (props.running) {
			props.onStart(speed);
		}
	};

	const buttons = (
		<Grid className={classes.row} container justify='center' direction='row'>
			<Grid item sm={4}>
				<Button size='small' variant='contained' onClick={onPlayPauseHandler}>
					{props.running ? 'pause' : 'start'}
				</Button>
			</Grid>
			<Grid item sm={4}>
				<Button size='small' variant='contained' onClick={onNextHandler}>
					next
				</Button>
			</Grid>
			<Grid item sm={4}>
				<Button size='small' variant='contained' onClick={onClearBoard}>
					clear
				</Button>
			</Grid>
		</Grid>
	);

	const text = (
		<Grid className={classes.row} container justify='space-evenly' direction='column'>
			<Grid item sm={3}>
				<TextField size='small' id='outlined-basic' label='Rows' variant='outlined' />
			</Grid>
			<Grid item sm={3}>
				<TextField size='small' id='outlined-basic' label='Columns' variant='outlined' />
			</Grid>
		</Grid>
	);

	const slider = (
		<Grid className={classes.row} container justify='center' direction='row'>
			<Grid item sm={6}>
				<Typography id='discrete-slider' gutterBottom>
					Speed (steps/sec) <strong>{speed}</strong>
				</Typography>
				<Slider
					defaultValue={INITIAL_SPEED}
					value={speed}
					onChange={(_e, value) => onUpdateSliderValue(value)}
					onChangeCommitted={(_e, value) => onSliderChange(value)}
					valueLabelDisplay='off'
					step={1}
					marks
					min={1}
					max={20}
				/>
			</Grid>
			<Grid item sm={6}>
				<p className={classes.label}>
					<strong>Current generation:</strong> {props.generation}
				</p>
			</Grid>
		</Grid>
	);

	return (
		<Grid item sm={6}>
			<Grid container justify='center' direction='column'>
				{buttons}
				{text}
				{slider}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state: State) => {
	return {
		generation: state.game.generation,
		running: state.game.running,
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		onTick: () => dispatch(actions.nextTick()),
		onClearBoard: () => dispatch(actions.clearBoard()),
		onStart: (speed: number) => dispatch(actions.startGame(speed)),
		onPause: () => dispatch(actions.pauseGame()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
