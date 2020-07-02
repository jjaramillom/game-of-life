import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { FiRefreshCw } from 'react-icons/fi';

import { connect } from 'react-redux';

import classes from './Menu.module.css';
import actions from '../../../store/actions/index';

type Props = {
	children?: any;
	generation?: number;
	running?: boolean;
	boardSize: BoardSize;
	onTick: Function;
	onClearBoard: Function;
	onStart: Function;
	onPause: Function;
	onBoardSizeChanged: Function;
	onRandomize: Function;
};

const INITIAL_SPEED = 1;

const Menu = (props: Props) => {
	const [speed, setSpeed] = useState(INITIAL_SPEED);
	const [boardSize, setBoardSize] = useState(props.boardSize);

	const updateBoardSize = () => {
		if (
			boardSize.columns !== props.boardSize.columns ||
			boardSize.rows !== props.boardSize.rows
		) {
			props.onBoardSizeChanged(boardSize);
		}
	};

	const onUpdateBoardSize = (value: object) => {
		setBoardSize({ ...boardSize, ...value });
	};

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

	const onRandomizeBoard = () => {
		props.onRandomize();
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
		<React.Fragment>
			<Button
				className='mr-3'
				variant={props.running ? 'warning' : 'success'}
				onClick={onPlayPauseHandler}>
				{props.running ? 'pause' : 'start'}
			</Button>
			<Button className='mr-3' variant='secondary' onClick={onNextHandler}>
				next
			</Button>
			<Button className='mr-3' variant='secondary' onClick={onRandomizeBoard}>
				randomize
			</Button>
			<Button className='mr-3' variant='secondary' onClick={onClearBoard}>
				clear
			</Button>
		</React.Fragment>
	);

	const text = (
		<InputGroup className='mb-3'>
			<InputGroup.Prepend>
				<InputGroup.Text>Rows</InputGroup.Text>
			</InputGroup.Prepend>

			<FormControl
				type='number'
				value={boardSize.rows}
				onChange={(event: any) => onUpdateBoardSize({ rows: Number(event.target.value) })}
			/>
			<InputGroup.Prepend>
				<InputGroup.Text>Columns</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				type='number'
				value={boardSize.columns}
				onChange={(event: any) => onUpdateBoardSize({ columns: Number(event.target.value) })}
			/>
			<InputGroup.Append>
				<Button onClick={(event: any) => updateBoardSize()} variant='secondary'>
					<FiRefreshCw />
				</Button>
			</InputGroup.Append>
		</InputGroup>
	);

	const slider = (
		<Form.Group>
			<Form.Label>(steps/sec) {speed}</Form.Label>
			<Form.Control
				min={1}
				max={20}
				onChange={(evt: any) => onUpdateSliderValue(evt.target.value)}
				onMouseUp={(evt: any) => onSliderChange(evt.target.value)}
				value={speed}
				type='range'
			/>
		</Form.Group>
	);

	return (
		<Card className={classes.card}>
			<br />

			<Row className='justify-content-start'>
				<Col /* xs={8} sm={6} lg={4} */>{buttons}</Col>
			</Row>
			<br />
			<Row className='justify-content-center'>
				<Col>{text}</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col>{slider}</Col>
			</Row>
		</Card>
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
		onRandomize: () => dispatch(actions.randomizeBoard()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
