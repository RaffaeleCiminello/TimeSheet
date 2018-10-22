import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import Foter from '../Component/Footer.js';
import DateTimePicker from '../Component/DateTimePicker.js';
var moment = require('moment');

export default class Setting extends Component {
    
    /*Costruttore SuperProps*/
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
            DefStartHours:null,
            DefEndHours:null,
            DefSBHours:null,
            DefEBHours:null,
            chosenDate: new Date(),
            MemDefStartHours: null,
            MemDefEndHours: null,
            MemDefSBHours: null,
            MemDefEBHours: null,
            }
        this.onSaveDefStartHour = this.onSaveDefStartHour.bind(this);
        this.onSaveDefEndHour = this.onSaveDefEndHour.bind(this);
        this.onSaveDefSBHour = this.onSaveDefSBHour.bind(this);
        this.onSaveDefEBHour = this.onSaveDefEBHour.bind(this);
    }
    
    /*Impostazione Elementi Navigator*/
    static navigationOptions=({navigation})=>{
        const {params={}}=navigation.state;
        return {
        headerTitle:'Setting',
        headerRight:
            navigation.getParam('save')===false ?
                null
            :
                (
                <TouchableOpacity style={styles.buttonHeader} onPress={navigation.getParam('onSave')}>
                    <Text style={styles.txt}>Save</Text>
                </TouchableOpacity>
                 ),
        headerLeft:
            navigation.getParam('reset')===false ?
                null
            :
                (
                 <TouchableOpacity style={styles.buttonHeader} onPress={navigation.getParam('onReset')}>
                    <Text style={styles.txt}>Reset</Text>
                 </TouchableOpacity>
                 ),
        }
    }
    
    /*Prende orari di default in memoria e nasconde i tasti dell'header*/
    componentDidMount= async () => {
        this.props.navigation.setParams({
                                        save:false,
                                        onSave: this.onSave,
                                        reset:false,
                                        onReset: this.onReset,
                                        });
        const MemDefStartHours= await AsyncStorage.getItem('MemDefStartHours');
        const MemDefEndHours= await AsyncStorage.getItem('MemDefEndHours');
        const MemDefSBHours= await AsyncStorage.getItem('MemDefSBHours');
        const MemDefEBHours= await AsyncStorage.getItem('MemDefEBHours');
              this.setState({
                            MemDefStartHours: MemDefStartHours,
                            MemDefEndHours: MemDefEndHours,
                            MemDefSBHours: MemDefSBHours,
                            MemDefEBHours: MemDefEBHours,
                            });
        if(MemDefStartHours!==null || MemDefEndHours!==null || MemDefSBHours!==null || MemDefEBHours!==null) {
            this.props.navigation.setParams({
                                            reset:true,
                                            });
        }
    }
    
    /*svuota la pagina all'uscita*/
    componentWillUnmount(){
        if(MemDefStartHours===null || MemDefEndHours===null || MemDefSBHours===null || MemDefEBHours===null){
        this.setState({
                      DefStartHours: null,
                      DefEndHours: null,
                      DefSBHours: null,
                      DefEBHours: null,
                      MemDefStartHours: null,
                      MemDefEndHours: null,
                      MemDefSBHours: null,
                      MemDefEBHours: null,
                      });
        }
        this.props.navigation.setParams({
                                        save:false,
                                        clear:true,
                                        });
    }
    
    /*Salva l'ora di inizio default*/
    onSaveDefStartHour(newDate){
        this.props.navigation.setParams({
                                        reset:true,
                                        save:true,
                                        });
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefStartHours:moment(this.state.chosenDate).format('LT')
                                    });
                      });
    }
    
    /*Salva l'ora di fine default*/
    onSaveDefEndHour(newDate){
        this.props.navigation.setParams({
                                       reset:true,
                                       save:true,
                                       });
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEndHours:moment(this.state.chosenDate).format('LT')
                                    });
                      });
    }
    
    /*Salva l'ora di inizio default della pausa */
    onSaveDefSBHour(newDate){
        this.props.navigation.setParams({
                                        reset:true,
                                        save:true,
                                        });
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefSBHours:moment(this.state.chosenDate).format('LT')
                                    });
                      });
    }
    
    /*Salva l'ora di fine default della pausa */
    onSaveDefEBHour(newDate){
        this.props.navigation.setParams({
                                        reset:true,
                                        save:true,
                                        });
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEBHours:moment(this.state.chosenDate).format('LT')
                                    });
                      });
    }
    
    /*Salva i dati in memoria e nel json*/
    onSave = async () => {
        if(this.state.DefStartHours!==null){
            await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
        }
        if(this.state.DefEndHours!==null){
            await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
        }
        if(this.state.DefSBHours!==null){
            await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
        }
        if(this.state.DefEBHours!==null){
            await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
        }
        this.props.navigation.setParams({
                                        save:false,
                                        reset:true,
                                        });
    }
    
    /*Cancella orari di default in memoria*/
    onReset = async() => {
        if(this.state.DefStartHours!==null){
            await AsyncStorage.removeItem('MemDefStartHours');
        }
        if(this.state.DefEndHours!==null){
            await AsyncStorage.removeItem('MemDefEndHours');
        }
        if(this.state.DefSBHours!==null){
            await AsyncStorage.removeItem('MemDefSBHours');
        }
        if(this.state.DefEBHours!==null){
            await AsyncStorage.removeItem('MemDefEBHours');
        }
        this.setState({
                      MemDefStartHours: null,
                      MemDefEndHours: null,
                      MemDefSBHours: null,
                      MemDefEBHours: null,
                      DefStartHours:null,
                      DefEndHours:null,
                      DefSBHours:null,
                      DefEBHours:null,
                      });
        this.props.navigation.setParams({
                                        reset:false,
                                        save:false,
                                        });
    }
    
    render(){
        
        var {height, width} = Dimensions.get('window');
        let view=
            {
                height:height-119,
                paddingTop:15,
            }
        
        return(
               <View>
                   <View style={view}>
                       <DateTimePicker
                           mode='time'
                           label='Insert Default Start Hour'
                           placeHolder='Insert Hour'
                           value={(this.state.DefStartHours===null) ? this.state.MemDefStartHours : this.state.DefStartHours}
                           save={(newDate)=>{this.onSaveDefStartHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Start Break Default Hour'
                           placeHolder='Insert Hour'
                           value={(this.state.DefSBHours===null) ? this.state.MemDefSBHours : this.state.DefSBHours}
                           save={(newDate)=>{this.onSaveDefSBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Breack Default Hour'
                           placeHolder='Insert Hour'
                           value={(this.state.DefEBHours===null) ? this.state.MemDefEBHours : this.state.DefEBHours}
                           save={(newDate)=>{this.onSaveDefEBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Default End Hour'
                           placeHolder='Insert Hour'
                           value={(this.state.DefEndHours===null) ? this.state.MemDefEndHours : this.state.DefEndHours}
                           save={(newDate)=>{this.onSaveDefEndHour(newDate)}}/>
                   </View>
                   <Foter navigation={this.state.navigation} page='Setting'/>
               </View>
        );
    }
}

const styles = StyleSheet.create({
                                    txt:{
                                        fontSize: 20,
                                        fontWeight: '200',
                                        color: 'black',
                                        paddingTop:3,
                                    },
                                    buttonHeader:{
                                        margin:5,
                                    },
                                 })
