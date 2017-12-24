import React from 'react';
import { StyleSheet, View } from 'react-native';

import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };

    this.placeAddedHandler = this.placeAddedHandler.bind(this);
  }

  placeAddedHandler(placeName) {
    this.setState(prevState => {
      return {
        places: prevState.places.concat(placeName)
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
