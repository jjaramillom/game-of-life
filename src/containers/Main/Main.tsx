import React from 'react';
import Menu from '../../components/Controls/Menu/Menu';
import Table from '../../components/Board/Table/Table';
import { Container, Grid } from '@material-ui/core';

import classes from './Main.module.css';

const COLUMNS = 50;
const ROWS = 50;

export default function Main() {
	return (
		<Container className={classes.container} maxWidth='md'>
			<Grid alignContent='center' direction='row' container justify='center' spacing={2}>
				<Menu />
				<Table columns={COLUMNS} rows={ROWS}></Table>
			</Grid>
		</Container>
	);
}
