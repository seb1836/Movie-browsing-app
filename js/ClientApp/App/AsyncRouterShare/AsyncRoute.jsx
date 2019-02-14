

import React from 'react';
import { shape, func} from 'prop-types'
import Spinner from './Details/Spinner/Spinner';

class AsyncRoute extends React.Component {
  state = {
    loaded: false
  };
  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }
  component = null;
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />;
    }
    return <Spinner />;
  }
}

AsyncRoute.propTypes = {
  loadingPromise: func.isRequired,
  props: shape.isRequired
}

export default AsyncRoute;
