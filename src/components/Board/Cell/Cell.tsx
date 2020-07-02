import React, { useState, useEffect } from 'react';

import classes from './Cell.module.css';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../store/actions';

type Props = {
	alive?: boolean;
	coordinate: Coordinate;
	shouldBeAlive?: boolean;
};

const Square = (props: Props) => {
	const [filled, setFilled] = useState(props.alive || false);
	const style = [classes.cell];

	const dispatch = useDispatch();
	const onSetAlive = (coordinate: Coordinate) => dispatch(actions.setAlive(coordinate));

	const shouldBeAlive = useSelector(
		(state: State) => state.game.board[props.coordinate.x][props.coordinate.y]
	);
	const clickedDown = useSelector((state: State) => state.ui.clicked);

	useEffect(() => {
		setFilled(shouldBeAlive as boolean);
	}, [shouldBeAlive]);

	const onMouseMoveHandler = () => {
		if (clickedDown && !filled) {
			setFilled(true);
			onSetAlive(props.coordinate);
		}
	};

	const onclickHandler = () => {
		setFilled(!filled);
		onSetAlive(props.coordinate);
	};

	if (filled) style.push(classes.filled);

	return (
		<div
			onMouseMove={onMouseMoveHandler}
			onClick={onclickHandler}
			className={style.join(' ')}></div>
	);
};

export default React.memo(Square);
