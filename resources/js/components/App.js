
import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './Footer';
import Uploader from './Uploader';


const App = () => {
    return (
        <div className="container align-items-center">

            <Uploader />
            <Footer />
        </div>
    );
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}


export default App; 
