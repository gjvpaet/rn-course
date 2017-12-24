import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const listItem = (props) => {
    return (
        <View style={style.listItem}>
            <Text>{props.placeName}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        margin: 5
    }
});

export default listItem;