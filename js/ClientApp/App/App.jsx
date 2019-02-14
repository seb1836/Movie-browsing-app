import React from 'react';
import { shape } from 'prop-types'
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AsyncRoute from './AsyncRouterShare/AsyncRoute';
import store from '../../store/store';
import preload from './data.json';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Route exact path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./AsyncRouterShare/Landing/Landing')} />} />
      <Route
        path="/search"
        component={props => (
          <AsyncRoute loadingPromise={import('./AsyncRouterShare/Search/Search')} props={Object.assign({ shows: preload.shows }, props)} />
        )}
      />
      <Route
        path="/details/:id"
        component={(props) => {
          const selectedShow = preload.shows.find((show) => props.match.params.id === show.imdbID);
          return (
            <AsyncRoute
              loadingPromise={import('./AsyncRouterShare/Details/Details')}
              props={Object.assign({ show: selectedShow, match: {} }, props)}
            />
          );
        }}
      />
    </div>
  </Provider>
);


App.propTypes = {
  match: shape
}

App.defaultProps = {
  match: {}
}

export default App;
