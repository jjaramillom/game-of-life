import React, { useState } from 'react';
import Menu from '../../components/Controls/Menu/Menu';
import Table from '../../components/Board/Table/Table';

import classes from './Main.module.css';
import { Container } from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import EventEmitter from '../../common/EventEmitter';

const COLUMNS = 20;
const ROWS = 20;

export default function Main() {
	const [board, setBoard] = useState({ columns: COLUMNS, rows: ROWS });

	const onSizeChanged = (size: BoardSize) => {
		setBoard(size);
		// EventEmitter.dispatch('reDraw', size);
	};

	return (
		<div className={classes.container}>
			<Container>
				<Row>
					<Col>
						<Menu boardSize={board} onBoardSizeChanged={onSizeChanged} />
					</Col>
					<Col>
						<Table columns={board.columns} rows={board.rows}/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
