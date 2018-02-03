import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import imagePlaceholder from '../../assets/javascript-wallpaper.jpg';

import { addPlace } from '../../store/actions/index';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

import PickImage from '../../components/PickImage/PickImage';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'purple'
    };

    constructor(props) {
        super(props);

        this.state = { placeName: '' };

        [
            'placeAddedHandler',
            'navigatorEventHandler',
            'placeNameChangedHandler'
        ].map(fn => this[fn] = this[fn].bind(this));

        this.props.navigator.setOnNavigatorEvent(this.navigatorEventHandler);
    }

    navigatorEventHandler(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({ side: 'left' });
            }
        }
    }

    placeAddedHandler() {
        if (this.state.placeName.trim() !== '') {
            this.props.onAddPlace(this.state.placeName);   
        }
    }

    placeNameChangedHandler(value) {
        this.setState({ placeName: value });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput 
                        placeName={this.state.placeName} 
                        onChangeText={this.placeNameChangedHandler} 
                    />
                    <View style={styles.button}>
                        <Button title="Share the Place!" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        margin: 8
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);