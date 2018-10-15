import React, { Component } from 'react';
import { View, AppRegistry, StyleSheet, Text} from 'react-native';
import {Button, Icon, Footer, FooterTab } from 'native-base';

class Foter extends Component {
    constructor(props){
        super(props);
        this.state={
        navigation:props.navigation,
        }
    }
    
    render() {
        return (
                
                
                <Footer>
                    <FooterTab>
                        <Button  onPress={()=> this.props.navigation.navigate('Appointment')}>
                            <Icon name="bookmarks" />
                            <Text>Appointment</Text>
                        </Button>
                        <Button onPress={() =>{this.state.navigation.navigate('Add')}}>
                            <Icon name="add" />
                            <Text>Add</Text>
                        </Button>
                        <Button onPress={() => {this.state.navigation.navigate('Setting')}} >
                            <Icon name="settings" />
                            <Text>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
                
                );
    }
}
export default Foter
