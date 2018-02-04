import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';

class PickLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedLocation: {
                latitude: 14.4319759,
                longitude: 120.9955398,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            },
            locationChosen: false
        };

        [
            'getLocationHandler',
            'pickLocationHandler'
        ].map(fn => this[fn] = this[fn].bind(this));
    }

    pickLocationHandler(event) {
        const coords = event.nativeEvent.coordinate;

        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
    }

    getLocationHandler() {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };

            this.pickLocationHandler(coordsEvent);
        }, err => {
            console.log(err);
            alert('Fetching the Position failed, please pick one manually.');
        })
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }

        return (
            <View style={styles.container}>
                <MapView 
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate Me!" onPress={this.getLocationHandler} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    },
    container: {
        width: '100%',
        alignItems: 'center'
    }
});

export default PickLocation;