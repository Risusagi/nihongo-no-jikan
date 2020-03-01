import "core-js/stable";
import "regenerator-runtime/runtime";
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

(function() {
    const DEBUG = false;
    // disable console loging if DEBUG = false (to prevent console logs from responsivevoice)
    if (!DEBUG) {
        console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function () {};
    }

    // append Responsive Voice API before index.js
    const script = document.createElement('script');
    script.src = `https://code.responsivevoice.org/responsivevoice.js?key=${process.env.REACT_APP_RESPONSIVEVOICES_KEY}`;

    document.body.insertBefore(script, document.querySelector('script'));
})();

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

module.hot.accept();