import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet,
    Animated
} from 'react-native';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'purple'
    };

    constructor(props) {
        super(props);

        this.state = {
            placesLoaded: false,
            removeAnim: new Animated.Value(1),
            placesAnim: new Animated.Value(0)
        };

        [
            'itemSelectedHandler',
            'placesSearchHandler',
            'placesLoadedHandler',
            'navigatorEventHandler',
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

    placesLoadedHandler() {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler() {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({ placesLoaded: true });
            this.placesLoadedHandler();
        });
    }

    render() {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [{
                    scale: this.state.removeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 1]
                    })
                }]
            }}>
                <TouchableNativeFeedback onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{ opacity: this.state.placesAnim }} >
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
                </Animated.View>
            );
        }

        return (
            <View style={[styles.container, this.state.placesLoaded ? null : styles.buttonContainerStyle]}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchButton: {
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'purple',
        fontWeight: 'bold',
        fontSize: 26
    },
    buttonContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);