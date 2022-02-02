// resources/js/components/HelloReact.js

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <h1>Hello World!</h1>
    );
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}


export default App; 
