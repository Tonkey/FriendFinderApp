import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ImageBackground, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal'
import MapView from 'react-native-maps'
import PrettyButton from './components/PrettyButton';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { name: '', distance: '', mapVisible: false, mapAnnotations: [], position: [], latLng: {} };
  }

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (curPosition) => {
        let coordArray = [curPosition.coords.longitude, curPosition.coords.latitude]
        let latLng = {latitude : coordArray[0], longitude : coordArray[1]}
        this.setState({ latLng }, () => {
          console.log("latLng: " + JSON.stringify(this.state.latLng))
        })
        const position = coordArray;
        this.setState({ position }, () => {
          console.log("state = " + this.state.position)
          this.login()
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000 }
    )
  }

  setAnnotations = (data) => {
    let annotations = []
    for (var i = 0; i < data.length; i++) {
      let userName = data[i].userName
      let latitude = data[i].loc.coordinates[0]
      let longitude = data[i].loc.coordinates[1]
      let marker = {
        title: userName,
        coordinates: {
          latitude: longitude,
          longitude: latitude
        }
      }
      annotations.push(marker)
    }
    this.setState({ mapAnnotations: annotations })
  }

  login = () => {
    console.log("Gargh: " + this.state.position)
    if (this.state.name != '' && this.state.distance != '') {
      let url = 'http://www.jonathanhenriksen.com/'
      let fetchData = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: this.state.name,
          coordinates: this.state.position,
          distance: this.state.distance
        })
      }
      // Good to go
      let that = this;
      fetch(url, fetchData)
        .then((responseData) => responseData.json())
        .then((responseData) => {
          that.setAnnotations(responseData)
          that.setState({ mapVisible: true })
        })
        .catch((error) => { console.log(error) });

    } else {
      Alert.alert('Error', 'You need to fill out all fields')
    }
  }

  render() {
    return (
      <ImageBackground style={styles.backgroundImage}
        source={require('./images/background.jpg')}>
        <View style={styles.main_container}>

          <View style={styles.container_row}>
            <Text style={styles.text}>
              Nickname
              </Text>
            <TextInput style={styles.inputField} placeholder="Enter your name"
              onChangeText={(name) => this.setState({ name })} >
            </TextInput>
          </View>

          <View style={styles.container_row}>
            <Text style={styles.text}>
              Distance
              </Text>
            <TextInput keyboardType='numeric' style={styles.inputField} placeholder="Units (Km)"
              onChangeText={(distance) => this.setState({ distance })} >
            </TextInput>
          </View>

          <View style={styles.container_row}>
            <PrettyButton title='Find Your Friends!'
              onPress={() => this.setCoordinates()} />
          </View>
        </View>

        <Modal
          visible={this.state.mapVisible}
          onRequestClose={() => { this.setState({ mapVisible: false }) }}
          backdropColor='black' a>

          <View style={styles.map_container}>
            <MapView
              style={{ flex: 1, overflow: 'hidden' }}
              showsUserLocation={true}>

              {this.state.mapAnnotations.map(marker => (
                <MapView.Marker
                  key={marker.title}
                  coordinate={marker.coordinates}
                  title={marker.title}
                />
              ))}

              <MapView.Circle
              center={this.state.latLng}
              radius={this.state.distance * 1000}/>

            </MapView>
          </View>

          <View flexDirection='row' style={{ backgroundColor: 'transparent' }}>

            <PrettyButton title='Back' style={{ flex: 1 }}
              onPress={() => this.setState({ mapVisible: false })} />

            <PrettyButton title='Update' style={{ flex: 1 }}
              onPress={() => this.login()} />
          </View>

        </Modal>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_row: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  map_container: {
    flex: 1,
    borderRadius: 10
  },
  inputField: {
    height: 70,
    width: 220,
    fontSize: 20
  },
  text: {
    flex: 1,
    fontSize: 20,
    padding: 20,
    opacity: 0.6
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }


});
