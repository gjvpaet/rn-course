import { connect } from 'react-redux';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);

        this.placeDeletedHandler = this.placeDeletedHandler.bind(this);

        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    placeDeletedHandler() {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="md-trash" color="red" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    deleteButton: {
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);