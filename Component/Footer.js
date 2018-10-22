import React, { Component } from 'react';
import {View, AppRegistry, StyleSheet, Text} from 'react-native';
import {Button, Icon, Footer, FooterTab } from 'native-base';

class Foter extends Component {
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
            page:props.page,
        }
    }
    
    render() {
        return (
                <Footer>
                    <FooterTab>
                    {this.state.page==='Appointment' ?
                        <Button onPress={()=>this.props.navigation.navigate('Appointment')}>
                            <Icon style={{color:'blue'}} name="bookmarks" />
                            <Text style={{color:'blue'}}>Appointment</Text>
                        </Button>
                    :
                        <Button>
                            <Icon name="bookmarks" />
                            <Text>Appointment</Text>
                        </Button>
                    }
                    {this.state.page==='Add' ?
                        <Button onPress={()=>this.props.navigation.navigate('Add')}>
                            <Icon style={{color:'blue'}} name="add" />
                            <Text style={{color:'blue'}}>Add</Text>
                        </Button>
                    :
                        <Button onPress={()=>this.props.navigation.navigate('Add')}>
                            <Icon name="add" />
                            <Text>Add</Text>
                        </Button>
                    }
                    {this.state.page==='Setting' ?
                        <Button onPress={()=>{this.state.navigation.navigate('Setting')}} >
                            <Icon style={{color:'blue'}} name="settings" />
                            <Text style={{color:'blue'}}>Setting</Text>
                        </Button>
                    :
                        <Button onPress={()=>{this.state.navigation.navigate('Setting')}} >
                            <Icon name="settings" />
                            <Text>Setting</Text>
                        </Button>
                    }
                    </FooterTab>
                </Footer>
                
                );
    }
}
export default Foter
