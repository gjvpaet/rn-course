import { connect } from 'react-redux';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Image,
    Text,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);

        this.state = { viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape' };

        [
            'updateStyles',
            'placeDeletedHandler'
        ].map(fn => this[fn] = this[fn].bind(this));
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles(dims) {
        this.setState({ viewMode: dims.window.height > 500 ? 'portrait' : 'landscape' });
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
            <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.subContainer}>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        {Platform.OS === 'android' ?
                            <TouchableNativeFeedback onPress={this.placeDeletedHandler}>
                                <View style={styles.deleteButton}>
                                    <Icon size={30} name="md-trash" color="red" />
                                </View>
                            </TouchableNativeFeedback>
                            :
                            <TouchableOpacity onPress={this.placeDeletedHandler}>
                                <View style={styles.deleteButton}>
                                    <Icon size={30} name="ios-trash" color="red" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
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
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);