import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
    Platform
} from 'react-native';

const buttonWithBackground = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }]}>
            <Text>{props.children}</Text>
        </View>
    );

    switch (Platform.OS) {
        case 'android':
            return (
                <TouchableNativeFeedback onPress={props.onPress}>
                    {content}
                </TouchableNativeFeedback>
            );
            break;
        case 'ios':
            return (
                <TouchableOpacity onPress={props.onPress}>
                    {content}
                </TouchableOpacity>
            ); 
        default:
            break;
    }
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black'
    }
});

export default buttonWithBackground;