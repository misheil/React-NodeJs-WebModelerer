import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {App} from './components/app';

// import {EntityStore} from './stores/entitystore';
import {useStrict} from 'mobx';

useStrict(true);
   
// Misheil comment the hard coded date 
// const DEMO_DATA = [
//   {
//     id: 1,
//     name: "Order",
//     x: 160,
//     y: 100
//   },
//   {
//     id: 2,
//     name: "OrderLine ",
//     x: 200,
//     y: 300
//   }
// ];


// Misheil Removed EntityStore to app.jsx 
// const entityStore = new EntityStore();
// entityStore.loadJson(DEMO_DATA);


render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').App;

    render(
      <AppContainer>
          <App />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
