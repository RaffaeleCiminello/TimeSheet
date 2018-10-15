import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity,} from 'react-native';
import {Button} from 'native-base';
import Foter from '../Component/Footer.js';
import DateTimePicker from '../Component/DateTimePicker.js';

export default class Setting extends Component {
    
    /*Costruttore SuperProps*/
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
            modalVisible:false,
            DefStartHours:null,
            DefEndHours:null,
            DefSBHours:null,
            DefEBHours:null,
            chosenDate: new Date()
            }
        this.onSaveDefStartHour = this.onSaveDefStartHour.bind(this);
        this.onSaveDefEndHour = this.onSaveDefEndHour.bind(this);
        this.onSaveDefSBHour = this.onSaveDefSBHour.bind(this);
        this.onSaveDefEBHour = this.onSaveDefEBHour.bind(this);
    }
    
    /*Impostazione Elementi Navigator*/
    static navigationOptions=({navigation})=>{
        return {
        headerTitle:'Setting',
        headerRight: null,
        headerLeft: null,
        }
    }
    
    /*Salva l'ora di inizio default*/
    onSaveDefStartHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefStartHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di fine default*/
    onSaveDefEndHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEndHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di inizio default della pausa */
    onSaveDefSBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefSBHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di fine default della pausa */
    onSaveDefEBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEBHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    render(){
        
        var {height, width} = Dimensions.get('window');
        let view=
            {
            height:height-119,
            }
        
        return(
               <View>
                   <View style={view}>
                       <DateTimePicker
                           mode='time'
                           label='Insert Default Start Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefStartHours}
                           save={(newDate)=>{this.onSaveDefStartHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Default End Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefEndHours}
                           save={(newDate)=>{this.onSaveDefEndHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Break Default Start Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefSBHours}
                           save={(newDate)=>{this.onSaveDefSBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Breck Default End Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefEBHours}
                           save={(newDate)=>{this.onSaveDefEBHour(newDate)}}/>
                   </View>
                   <Foter navigation={this.state.navigation}/>
               </View>
        );
    }
}
