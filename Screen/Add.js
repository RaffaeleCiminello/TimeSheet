import React, {Component} from 'react';
import {Alert, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import {Picker, Item, Icon, Input } from 'native-base';
import Foter from '../Component/Footer.js';
import DateTimePicker from '../Component/DateTimePicker.js';

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
            EndHours:null,
            SBHours:null,
            EBHours:null,
            comment:null,
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
            <TouchableOpacity style={styles.buttonHeader}>
                <Text style={styles.txt}>Save</Text>
            </TouchableOpacity>,
        headerLeft:
            <TouchableOpacity style={styles.buttonHeader} onPress={navigation.getParam('onClear')}>
                <Text style={styles.txt}>Clear All</Text>
            </TouchableOpacity>,
        }
    }
    
    /*Chiamata al Json*/
    componentDidMount() {
        return fetch('https://mysterious-forest-84539.herokuapp.com/dati.json')
        .then((response) => response.json())
        .then((responseJson)=>{
              this.setState({
                            dataSource: responseJson.dati,
                            });
              })
    }
    
    /*Setta un Param nel navigator per far funzionare onClear*/
    componentWillMount() {
        this.props.navigation.setParams({
                                        onClear: this.onClear
                                        });
    }
    
    /*Imposta i Valori Default al picker*/
    onValueChange(value: string) {
        this.setState({
                      selected: value
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
                                    fullDate:this.state.chosenDate.getDate()+'/'+(this.state.chosenDate.getMonth()+1)+'/'+this.state.chosenDate.getFullYear()
                                    });
                      });
    }
    
    /*Salva l'ora di inizio del Picker*/
    onSaveStartHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    StartHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di fine del Picker*/
    onSaveEndHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    EndHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di inizio della pausa del Picker*/
    onSaveSBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    SBHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Salva l'ora di fine della pausa del Picker*/
    onSaveEBHour(newDate){
        this.setState({
                      chosenDate:newDate,
                      },
                      ()=>{
                      this.setState({
                                    EBHours:this.state.chosenDate.getHours()+':'+this.state.chosenDate.getMinutes()
                                    });
                      });
    }
    
    /*Resetta i valori impostati*/
    onClear= () => {
        this.setState({
                      selected:null,
                      fullDate:null,
                      StartHours:null,
                      EndHours:null,
                      SBHours:null,
                      EBHours:null,
                      comment:null,
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
                            save={(newDate)=>{this.onSaveData(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Start Hour'
                           placeHolder='Insert Hour'
                           value={this.state.StartHours}
                           save={(newDate)=>{this.onSaveStartHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Hour'
                           placeHolder='Insert Hour'
                           value={this.state.EndHours}
                           save={(newDate)=>{this.onSaveEndHour(newDate)}}/>
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
                       <Item>
                            <Input
                               placeholder='Insert Comment'
                               onChangeText={(comment)=>this.setState({comment})} v
                               value={this.state.comment}/>
                       </Item>
                    </View>
                    <Foter navigation={this.state.navigation}/>
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

