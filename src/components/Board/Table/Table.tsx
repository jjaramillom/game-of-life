import React from 'react';

import Card from 'react-bootstrap/Card';

import classes from './Table.module.css';
import Row from '../Row/Row';
import Cell from '../Cell/Cell';

// import EventEmitter from '../../../common/EventEmitter';
import { useDispatch } from 'react-redux';

import actions from '../../../store/actions';
import Col from 'react-bootstrap/Col';

type Props = {
	rows: number;
	columns: number;
};

const Table = (props: Props) => {
	// EventEmitter.subscribe('reDraw', (data: any) => {});
	const dispatch = useDispatch();

	const onInit = (board: BoardSize) => dispatch(actions.init(board));
	const onMouseDown = () => dispatch(actions.mouseDown());
	const onMouseUp = () => dispatch(actions.mouseUp());

	onInit({ columns: props.columns, rows: props.rows });
	
	const table = new Array(props.rows).fill(null).map((_, row_i) => {
		const cells = new Array(props.columns)
			.fill(null)
			.map((_, col_i) => (
				<Cell key={`${row_i}${col_i}`} coordinate={{ x: row_i, y: col_i }} />
			));

		return <Row key={row_i}>{cells}</Row>;
	});

	return (
		<Card className={classes.card}>
			<Row className='justify-content-center'>
				<Col>
					<div
						onMouseDownCapture={onMouseDown}
						onMouseUpCapture={onMouseUp}
						className={classes.table}>
						{table}
					</div>
				</Col>
			</Row>
		</Card>
	);
};

export default React.memo(Table);
