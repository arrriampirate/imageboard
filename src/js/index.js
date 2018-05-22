import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

import '../css/style.styl';

function App() {
    return (<Board />);
}

ReactDOM.render(<App />, document.getElementById('app'));