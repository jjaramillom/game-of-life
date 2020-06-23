import React from 'react';
import Button from '../../UI/Button/Button';

import { connect } from 'react-redux';

import classes from './Menu.module.css';
import actions from '../../../store/actions/index';

type Props = {
	children?: any;
	generation?: number;
	onTick: Function;
};

const Menu = (props: Props) => {
	const onClickHandler = () => {
		props.onTick();
	};

	return (
		<div>
			<Button clicked={onClickHandler}>next</Button>
			<p className={classes.label}>{props.generation}</p>
		</div>
	);
};

const mapStateToProps = (state: State) => {
	return {
		generation: state.game.generation,
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		onTick: () => dispatch(actions.nextTick()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
