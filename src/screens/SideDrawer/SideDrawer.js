import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
    View, 
    Text, 
    Platform,
    StyleSheet, 
    TouchableNativeFeedback 
} from 'react-native';

class SideDrawer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback>
                    <View style={styles.drawerItem}>
                        <Icon name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

export default SideDrawer;