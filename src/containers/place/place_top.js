import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaceFilter from '../../components/place/place_filter';
import PlaceList from '../../components/place/place_list';
import {
  Row,
  Col,
  Collapse} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { loadPlaces, setPlaceFilter, resetPlaceFilter } from '../../actions';
import { makeGetPlacesByFilter } from '../../filters/places_filter';

import FilterMenu from "../../components/ui/menu/filter_menu";

class PlaceTop extends React.Component {
  constructor(props){
    super(props);
		this.onChangeFilterVisibility = this.onChangeFilterVisibility.bind(this);
		this.onFilterReset = this.onFilterReset.bind(this);
		this.addPlace = this.addPlace.bind(this);
    this.state = {
      isFilterShown: true
    }
  }

  componentDidMount() {
    this.props.loadPlaces();
  }

	onChangeFilterVisibility = () => this.setState({ isFilterShown: !this.state.isFilterShown });

	onFilterReset = () => this.props.resetPlaceFilter();

	addPlace = () => this.props.history.push(`/places/edit`);

  render = () => {
    const { places, filter, setPlaceFilter } = this.props;
    const { isFilterShown } = this.state;

    return (
      <React.Fragment>
        <BorderCol sm={12}>
          <FilterMenu
              onShow={this.onChangeFilterVisibility}
              onReset={this.onFilterReset}
              onAdd={this.addPlace}
          />
          <Collapse isOpen={isFilterShown}>
            <PlaceFilter
              filter={filter}
              markers={places}
              onPlaceFilterChanged={setPlaceFilter}
            />
          </Collapse>
        </BorderCol>
        <PlaceList places ={places} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ places }) => {
  const getPlacesByFilter = makeGetPlacesByFilter();
  return {
    isLoading: places.isLoading,
    places : getPlacesByFilter(places),
    filter : places.filter
  }
};

export default compose(
  withRouter,
  connect(
    mapStateToProps, {
      loadPlaces,
      setPlaceFilter,
      resetPlaceFilter,
    }),
) (PlaceTop);