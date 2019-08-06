import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './containers/home/Home';
import 'babel-polyfill';
import Layout from './hoc/Layout';
import { store } from './store/configureStore';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" exact />
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root')
);
