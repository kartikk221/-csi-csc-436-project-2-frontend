import React from 'react';
import store from './state/store.js';
import { Provider } from 'react-redux';

import Navigation from './Navigation.jsx';

export default function App() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}
