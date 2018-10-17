import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
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
        const {params={}}=navigation.state;
        return {
        headerTitle:'Setting',
        headerRight:
            navigation.getParam('correct')===false ?
            null
            :
            (
            <TouchableOpacity style={styles.buttonHeader} onPress={navigation.getParam('onSave')}>
                <Text style={styles.txt}>Save</Text>
            </TouchableOpacity>
             ),
        headerLeft: null,
        }
    }
    
    /*Setta un Param nel navigator per far funzionare onClear*/
    componentWillMount() {
        this.props.navigation.setParams({
                                        correct:false,
                                        onSave: this.onSave
                                        });
    }
    
    /*Salva l'ora di inizio default*/
    onSaveDefStartHour(newDate){
        this.props.navigation.setParams({
                                        correct:true,
                                        });
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
        this.props.navigation.setParams({
                                        correct:true,
                                        });
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
        this.props.navigation.setParams({
                                        correct:true,
                                        });
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
        this.props.navigation.setParams({
                                        correct:true,
                                        });
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEBHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva i dati in memoria e nel json*/
    onSave = async () => {
        if(this.state.DefStartHours!==null){
            await AsyncStorage.setItem('DefStartHours', this.state.DefStartHours);
        }
        if(this.state.DefEndHours!==null){
            await AsyncStorage.setItem('DefEndHours', this.state.DefEndHours);
        }
        if(this.state.DefSBHours!==null){
            await AsyncStorage.setItem('DefSBHours', this.state.DefSBHours);
        }
        if(this.state.DefEBHours!==null){
            await AsyncStorage.setItem('DefEBHours', this.state.DefEBHours);
        }
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
                           label='Insert Start Break Default Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefSBHours}
                           save={(newDate)=>{this.onSaveDefSBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Breack Default Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefEBHours}
                           save={(newDate)=>{this.onSaveDefEBHour(newDate)}}/>
                   </View>
                   <Foter navigation={this.state.navigation}/>
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
