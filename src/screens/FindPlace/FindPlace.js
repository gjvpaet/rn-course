import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);

        this.itemSelectedHandler = this.itemSelectedHandler.bind(this);
    }

    itemSelectedHandler(key) {
        const selPlace = this.props.places.find(place => place.key === key);

        this.props.navigator.push({
            screen: 'awesome-places.PlaceDetailScreen',
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace 
            }
        });
    }

    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);