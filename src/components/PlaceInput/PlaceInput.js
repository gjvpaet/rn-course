import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class PlaceInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeName: ''
        };

        [
            "placeSubmitHandler",
            "placeNameChangedHandler"
        ].map(fn => this[fn] = this[fn].bind(this));
    }

    placeNameChangedHandler(value) {
        this.setState({ placeName: value });
    }

    placeSubmitHandler() {
        if (this.state.placeName.trim() === '') {
            return;
        }

        this.props.onPlaceAdded(this.state.placeName);
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}
                    placeholder="An awesome place"
                    style={styles.placeInput}
                />
                <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    },
});

export default PlaceInput;