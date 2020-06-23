import React, { useState, useEffect } from 'react';

import classes from './Cell.module.css';
import { connect } from 'react-redux';
import actions from '../../../store/actions';

type Props = {
	alive?: boolean;
	coordinate: Coordinate;
	shouldBeAlive?: boolean;
	clickedDown: boolean;
	onSetAlive: Function;
};

const Square = (props: Props) => {
	const [filled, setFilled] = useState(props.alive || false);

	const style = [classes.cell];

	useEffect(() => {
		setFilled(props.shouldBeAlive as boolean);
	}, [props]);

	const onMouseMoveHandler = () => {
		if (props.clickedDown && !filled) {
			setFilled(true);
			props.onSetAlive(props.coordinate);
		}
	};

	const onclickHandler = () => {
		setFilled(!filled);
		props.onSetAlive(props.coordinate);
	};

	if (filled) style.push(classes.filled);

	return (
		<div
			onMouseMove={onMouseMoveHandler}
			onClick={onclickHandler}
			className={style.join(' ')}></div>
	);
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		onSetAlive: (coordinate: Coordinate) => dispatch(actions.setAlive(coordinate)),
	};
};

const mapStateToProps = (state: State, ownProps: any) => {
	const { coordinate } = ownProps;
	const alive = state.game.board[coordinate.x][coordinate.y];
	return { shouldBeAlive: alive, clickedDown: state.ui.clicked };
};

export default connect(mapStateToProps, mapDispatchToProps)(Square);
