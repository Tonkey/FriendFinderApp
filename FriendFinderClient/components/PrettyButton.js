import React, { Component } from 'react';
import { Text, TouchableHighlight, StyleSheet, Image } from 'react-native';

export default class PrettyButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableHighlight
                style={styles.submit}
                onPress={this.props.onPress}
                underlayColor='transparent'>
                <Text style={styles.submitText}>{this.props.title}</Text>
            </TouchableHighlight>


        )
    }
}

const styles = StyleSheet.create({
    submit:{
        flex : 1,
        marginRight:20,
        marginLeft:20,
        marginTop:10,
        marginBottom:20,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      submitText:{
          color:'#fff',
          textAlign:'center',
      }
})

