import React from 'react';
import './App.css';
import Table from './components/Board/Table/Table'
import Menu from './components/Controls/Menu/Menu'

function App() {
	return <div className='App'>
    <Table columns={20} rows={20} ></Table>
    <Menu/>
  </div>;
}

export default App;
