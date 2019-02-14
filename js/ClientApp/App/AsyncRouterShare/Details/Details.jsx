
import {string,func,shape} from 'prop-types'
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Shared/Header/Header';
import Spinner from './Spinner/Spinner';
import { getAPIDetails } from '../../../../redux/actionCreators';

class Details extends React.Component {
  componentDidMount() {
    if (!this.props.rating) {
      this.props.getAPIData();
    }
  }

  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    let rating;
    if (this.props.rating) {
      rating = <h3>{this.props.rating}</h3>;
    } else {
      rating = <Spinner />;
    }
    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
          <img src={`/public/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe
            title="YouTube Video Frame"
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {};
  return {
    rating: apiData.rating
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAPIData() {
    dispatch(getAPIDetails(ownProps.show.imdbID));
  }
});

Details.propTypes={
    rating: string,
    getAPIData: func,
    show: shape
}

Details.defaultProps = {
  show: {},
  getAPIData:func,
  rating:""
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
