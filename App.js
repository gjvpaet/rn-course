import React from 'react';
import { StyleSheet, View } from 'react-native';

import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      selectedPlace: null
    };

    [
      "placeAddedHandler",
      "modalClosedHandler",
      "placeDeletedHandler",
      "placeSelectedHandler"
    ].map(fn => this[fn] = this[fn].bind(this));
  }

  placeAddedHandler(placeName) {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri: "http://i0.kym-cdn.com/entries/icons/original/000/021/065/gudetama.png"
          }
        })
      };
    });
  }

  placeSelectedHandler(key) {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => place.key === key)
      };
    });
  }

  placeDeletedHandler() {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => place.key !== prevState.selectedPlace.key),
        selectedPlace: null
      }
    });
  }

  modalClosedHandler() {
    this.setState({ selectedPlace: null });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler} />
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
