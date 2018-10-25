import React, {Component} from 'react';
import {Alert, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import {Picker, Item, Icon, Input } from 'native-base';
import Foter from '../Component/Footer.js';
import DateTimePicker from '../Component/DateTimePicker.js';
var moment = require('moment');

export default class Add extends Component {
    
    /*Costruttore SuperProps*/
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
            selected:null,
            dataSource: [],
            modalVisible:false,
            fullDate:null,
            StartHours:null,
            SBHours:null,
            EBHours:null,
            EndHours:null,
            comment:null,
            date:new Date(),
            valid:false,
            }
        this.onSaveData = this.onSaveData.bind(this);
        this.onSaveStartHour = this.onSaveStartHour.bind(this);
        this.onSaveEndHour = this.onSaveEndHour.bind(this);
        this.onSaveSBHour = this.onSaveSBHour.bind(this);
        this.onSaveEBHour = this.onSaveEBHour.bind(this);
    }
    
    /*Impostazione Elementi Navigator*/
    static navigationOptions=({navigation})=>{
        const {params={}}=navigation.state;
        return {
        headerTitle:'Add Appointment',
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
            navigation.getParam('clear')===false ?
                null
            :
                (
                 <TouchableOpacity style={styles.buttonHeader} onPress={navigation.getParam('onClear')}>
                    <Text style={styles.txt}>Clear All</Text>
                 </TouchableOpacity>
                 ),
        }
    }
    
    /*Chiamata al Json*/
    componentDidMount= async () => {
        const DefStartHours= await AsyncStorage.getItem('MemDefStartHours');
        const DefSBHours= await AsyncStorage.getItem('MemDefSBHours');
        const DefEBHours= await AsyncStorage.getItem('MemDefEBHours');
        const DefEndHours= await AsyncStorage.getItem('MemDefEndHours');
        return fetch('https://mysterious-forest-84539.herokuapp.com/dati.json')
        .then((response) => response.json())
        .then((responseJson)=>{
              this.setState({
                            dataSource: responseJson.dati,
                            StartHours: DefStartHours,
                            SBHours: DefSBHours,
                            EBHours: DefEBHours,
                            EndHours: DefEndHours,
                            });
              })
        if(this.state.StartHours!==null || this.state.EBHours!==null || this.state.SBHours!==null || this.state.EndHours!==null) {
            this.props.navigation.setParams({
                                            clear:true,
                                            });
            }
        }
    
    /*Setta un Param nel navigator per far funzionare onClear e onSave*/
    componentWillMount(){
        this.props.navigation.setParams({
                                        save:false,
                                        clear:false,
                                        onSave: this.onSave,
                                        onClear: this.onClear,
                                        });
    }
    
    /*Svuota la pagina all'uscita*/
    componentWillUnmount(){
        if(this.state.StartHours!==null || this.state.EBHours!==null || this.state.SBHours!==null || this.state.EndHours!==null){
            this.setState({
                          StartHours: null,
                          SBHours: null,
                          EBHours: null,
                          EndHours: null,
                          });
        }
        this.props.navigation.setParams({
                                        save:false,
                                        clear:true,
                                        });
    }
    
    /*Imposta i Valori Default al picker*/
    onValueChange(value: string) {
        
        this.setState({
                      selected: value
                      },
                      ()=>{
                            if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                            {
                                this.props.navigation.setParams({
                                                                save:true,
                                                                });
                            }
                      });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }
    
    /*Setta i valori del Picket dal Json*/
    renderData() {
        return this.state.dataSource.map(dataSource =>
                                         (
                                          <Picker.Item key={dataSource.id} value={dataSource.Project} label={dataSource.Project}/>
                                          )
                                         )
    }
    
    /*Salva la Data del Picker*/
    onSaveData(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                        ()=>{
                            this.setState({
                                    fullDate:moment(this.state.chosenDate).format('L')
                                    },
                                          ()=>{
                                                //controlla che tutti i valori nella pagina siano settati per mostrare il pulsante Save
                                                if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                                                {
                                                this.props.navigation.setParams({
                                                                                save:true,
                                                                                });
                                                }
                                          });
                        });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }
    
    /*Salva l'ora di inizio del Picker*/
    onSaveStartHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      intS:newDate
                      },
                      ()=>{
                      this.setState({
                                    StartHours:moment(this.state.chosenDate).format('LT')
                                    },
                                        ()=>{
                                            //controlla che tutti i valori nella pagina siano settati per mostrare il pulsante Save
                                            if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                                            {
                                                this.props.navigation.setParams({
                                                                                save:true,
                                                                                });
                                            }
                                        });
                      });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }

    /*Salva l'ora di inizio della pausa del Picker*/
    onSaveSBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      intSB:newDate,
                      },
                      ()=>{
                      this.setState({
                                    SBHours:moment(this.state.chosenDate).format('LT')
                                    },
                                        ()=>{
                                            //controlla che tutti i valori nella pagina siano settati per mostrare il pulsante Save
                                            if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                                            {
                                                this.props.navigation.setParams({
                                                                                save:true,
                                                                                });
                                            }
                                        });
                      });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }
    
    /*Salva l'ora di fine della pausa del Picker*/
    onSaveEBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      intEB:newDate,
                      },
                      ()=>{
                      this.setState({
                                    EBHours:moment(this.state.chosenDate).format('LT')
                                    },
                                        ()=>{
                                            //controlla che tutti i valori nella pagina siano settati per mostrare il pulsante Save
                                            if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                                            {
                                                this.props.navigation.setParams({
                                                                                save:true,
                                                                                });
                                            }
                                        });
                      });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }

    /*Salva l'ora di fine del Picker*/
    onSaveEndHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      intE:newDate,
                      },
                      ()=>{
                      this.setState({
                                    EndHours:moment(this.state.chosenDate).format('LT')
                                    },
                                        ()=>{
                                            //controlla che tutti i valori nella pagina siano settati per mostrare il pulsante Save
                                           if(this.state.selected!==null && this.state.fullDate!==null && this.state.StartHours!==null && this.state.SBHours!==null && this.state.EBHours!==null && this.state.EndHours!==null)
                                            {
                                                this.props.navigation.setParams({
                                                                                save:true,
                                                                                });
                                            }
                                        });
                      });
        this.props.navigation.setParams({
                                        clear:true,
                                        });
    }
    
    /*Salva i valori impostati*/
    onSave= () => {
                if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intS))>0)//confronta StartHours
                {
                    if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0)//confronta SBHours
                    {
                         if(moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta EBHours
                         {
                             if(moment(this.state.intE).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta EndHours
                             {
                                 this.setState({
                                               valid:true,
                                               })
                             }
                            
                         }
                        
                    }
                    
                }
        if(this.state.valid===true)
        {
            Alert.alert('Salvataggio Effettuato', 'I dati inseriti sono stati salvati con successo',
                        [
                         {text: 'OK', onPress: () => this.props.navigation.navigate('Appointment')},
                         ],
                        { cancelable: false }
                        )
            this.setState({
                          selected:null,
                          fullDate:null,
                          StartHours:null,
                          SBHours:null,
                          EBHours:null,
                          EndHours:null,
                          comment:null,
                          DefStartHours: null,
                          DefSBHours: null,
                          DefEBHours: null,
                          DefEndHours: null,
                          });
            this.props.navigation.setParams({
                                            save:false,
                                            clear:false,
                                            });
        }
        else
        {
            Alert.alert('Salvataggio Fallito', 'I dati inseriti non sono validi')
            this.props.navigation.setParams({
                                            save:false,
                                            });
        }
        
        
    }

    /*Resetta i valori impostati*/
    onClear= () => {
        this.setState({
                      selected:null,
                      fullDate:null,
                      StartHours:null,
                      SBHours:null,
                      EBHours:null,
                      EndHours:null,
                      comment:null,
                      DefStartHours: null,
                      DefEndHours: null,
                      DefSBHours: null,
                      DefEBHours: null,
                      
                      });
        this.props.navigation.setParams({
                                        save:false,
                                        clear:false,
                                        });
    };
    
    render(){
        var {height, width} = Dimensions.get('window');
        let view=
            {
                height:height-119,
            }
        
        return(
               <View>
                    <View style={view}>
                        <View style={styles.row}>
                            <View style={{justifyContent:'center'}}>
                                <Text style={styles.txt}>Select your Project:</Text>
                            </View>
                            <Picker
                               mode="dropdown"
                               iosHeader="Select Project:"
                               selectedValue={this.state.selected}
                               onValueChange={this.onValueChange.bind(this)}
                               textStyle={styles.txt}
                               placeholder="Select Project"
                               placeholderStyle={styles.placeholder}>
                               {this.renderData()}
                            </Picker>
                        </View>
                        <DateTimePicker
                            mode='date'
                            label='Insert Date'
                            placeHolder='Insert Date'
                            value={this.state.fullDate}
                            save={(newDate)=>{this.onSaveData(newDate)}}
                            maxDate={this.state.date}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Start Hour'
                           placeHolder='Insert Hour'
                           value={this.state.StartHours}
                           save={(newDate)=>{this.onSaveStartHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Start Break Hour'
                           placeHolder='Insert Hour'
                           value={this.state.SBHours}
                           save={(newDate)=>{this.onSaveSBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Break Hour'
                           placeHolder='Insert Hour'
                           value={this.state.EBHours}
                           save={(newDate)=>{this.onSaveEBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Hour'
                           placeHolder='Insert Hour'
                           value={this.state.EndHours}
                           save={(newDate)=>{this.onSaveEndHour(newDate)}}/>
                       <Item>
                            <Input
                               placeholder='Insert Comment'
                               onChangeText={(comment)=>this.setState({comment})} 
                               value={this.state.comment}/>
                       </Item>
                    </View>
                    <Foter navigation={this.state.navigation} page='Add'/>
               </View>
               )
    }
}

const styles = StyleSheet.create({
                                     headericon:{
                                         fontWeight: '100',
                                         fontSize: 25,
                                         color: 'black',
                                     },
                                     row:{
                                         flexDirection: 'row',
                                         margin:5,
                                     },
                                     button:{
                                         margin:5,
                                         backgroundColor: 'white',
                                         justifyContent: 'center',
                                         borderRadius: 20,
                                     },
                                     txt:{
                                         fontSize: 20,
                                         fontWeight: '200',
                                         color: 'black',
                                         paddingTop:3,
                                     },
                                     placeholder:{
                                         fontSize: 20,
                                         fontWeight: '200',
                                         color: '#a6a6a6',
                                         justifyContent:'center',
                                         paddingLeft:0,
                                         marginLeft:5,
                                     },
                                     buttonHeader:{
                                         margin:5,
                                     },
                                 })

