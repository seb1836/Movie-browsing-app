

import React from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types'
import ShowCard from './ShowCard/ShowCard';
import Header from '../Shared/Header/Header';

const Search = (props) => (
  <div className="search">
    <Header showSearch />
    <div>
      {props.shows
        .filter(show => `${show.title} ${show.description}`.toUpperCase().indexOf(props.searchTerm.toUpperCase()) >= 0)
        .map((show, index) => <ShowCard {...show} key={show.imdbID} id={index} />)}
    </div>
  </div>
);

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

Search.propTypes = {
  shows: shape.isRequired
}

export const Unwrapped = Search;
export default connect(mapStateToProps)(Search);
