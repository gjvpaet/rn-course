import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
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

    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      };
    });
  }

  render() {
    const placesOutput = this.state.places.map((place, index) => <ListItem key={index} placeName={place} /> );

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
            placeholder="An awesome place"
            style={styles.placeInput}
          />
          <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
        </View>
        <View style={styles.listContainer}>
          {placesOutput}
        </View>
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
  },
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
  listContainer: {
    width: '100%'
  }
});
