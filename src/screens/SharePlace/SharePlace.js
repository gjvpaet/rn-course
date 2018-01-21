import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { addPlace } from '../../store/actions/index';

import PlaceInput from '../../components/PlaceInput/PlaceInput';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);

        this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
        this.placeAddedHandler = this.placeAddedHandler.bind(this);
        

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({ side: 'left' });
            }
        }
    } 

    placeAddedHandler(placeName) {
        this.props.onAddPlace(placeName);
    }

    render() {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);