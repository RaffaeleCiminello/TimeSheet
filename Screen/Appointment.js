import React, {Component} from 'react';
import {View, ScrollView, FlatList, Text, StyleSheet, Dimensions, } from 'react-native';
import Foter from '../Component/Footer.js';
import {Button, Icon, Footer, FooterTab } from 'native-base';

export default class Appointment extends Component {
    
    /*Costruttore SuperProps*/
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
        }
    }
    
    /*Impostazione Elementi Navigator*/
    static navigationOptions={
        headerTitle: 'Timesheet',
        headerLeft: null,
        headerBackTitle:null,
    }
    
    /*Chiamata al Json, che simula chiamata Server*/
    componentDidMount() {
        return fetch('https://mysterious-forest-84539.herokuapp.com/dati.json')
        .then((response) => response.json())
        .then((responseJson)=>{
              this.setState({
                            dataSource: responseJson.dati,
                            });
              })
        console.error(error);
    }
    
    render() {
        var {height, width} = Dimensions.get('window');
        let view=
            {
                height:height-119,
            }
        
        return (
                <View>
                    <ScrollView style={view}>
                        <View>
                            <FlatList data={this.state.dataSource} renderItem={({item})=>
                                <View style={styles.row}>
                                    <Text style={styles.txt}>{item.Project}</Text>
                                    <Text style={styles.txt}>{item.THour} H</Text>
                                </View>
                            }
                            keyExtractor={(item, index)=> item.id}/>
                        </View>
                    </ScrollView>
                    <Foter navigation={this.state.navigation}/>
                </View>
                )
    }
}

const styles = StyleSheet.create({
                                     row:{
                                         flexDirection: 'row',
                                         justifyContent: 'space-between',
                                     },
                                     txt:{
                                         fontSize: 20,
                                         fontWeight: '200',
                                         color: 'black',
                                         margin:5,
                                     },
                                });

