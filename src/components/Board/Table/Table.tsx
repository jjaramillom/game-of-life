import React from 'react';

import classes from './Table.module.css';
import Row from '../Row/Row';
import Cell from '../Cell/Cell';

import EventEmitter from '../../../common/EventEmitter';
import { connect } from 'react-redux';
import actions from '../../../store/actions';

type Props = {
	rows: number;
	columns: number;
	onInit: Function;
	onMouseUp: Function;
	onMouseDown: Function;
};

const Table = (props: Props) => {
	EventEmitter.subscribe('tick', (data: any) => {
	});

	const onMouseDown = () => props.onMouseDown();
	const onMouseUp = () => props.onMouseUp();


	props.onInit({ columns: props.columns, rows: props.rows });

	const table = new Array(props.rows).fill(null).map((_, row_i) => {
		const cells = new Array(props.columns)
			.fill(null)
			.map((_, col_i) => (
				<Cell key={`${row_i}${col_i}`} coordinate={{ x: row_i, y: col_i }} />
			));

		return <Row key={row_i}>{cells}</Row>;
	});

	return (
		<div onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={classes.table}>
			{table}
		</div>
	);
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		onInit: (board: BoardSize) => dispatch(actions.init(board)),
		onMouseDown: () => dispatch(actions.mouseDown()),
		onMouseUp: () => dispatch(actions.mouseUp()),
	};
};

export default connect(null, mapDispatchToProps)(Table);
