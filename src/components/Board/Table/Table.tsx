import React, { useEffect } from 'react';

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
};

const Table = (props: Props) => {
	EventEmitter.subscribe('tick', (data: any) => {
		console.log(data);
	});
	props.onInit({ columns: props.columns, rows: props.rows });


	const table = new Array(props.rows).fill(null).map((_, row_i) => {
		const cells = new Array(props.columns)
			.fill(null)
			.map((_, col_i) => (
				<Cell key={`${row_i}${col_i}`} coordinate={{ x: row_i, y: col_i }} />
			));

		return <Row key={row_i}>{cells}</Row>;
	});

	return <div className={classes.table}>{table}</div>;
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		onInit: (board: BoardSize) => dispatch(actions.init(board)),
	};
};

export default connect(null, mapDispatchToProps)(Table);
