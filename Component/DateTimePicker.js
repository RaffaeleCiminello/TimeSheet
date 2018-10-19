import React, { Component } from 'react';
import {View, AppRegistry, StyleSheet, Text, TouchableOpacity, DatePickerIOS, Dimensions, AsyncStorage} from 'react-native';
import {Button, Icon, Footer, FooterTab } from 'native-base';
import Modal from 'react-native-modal';
import {moment} from 'moment';

class DateTimePicker extends Component {
    constructor(props){
        super(props);
        this.state={
            navigation:props.navigation,
            mode:props.mode,
            label:props.label,
            placeHolder:props.placeHolder,
            save:props.save,
            value:props.value,
            chosenDate:new Date,
            modalVisible:false,
        };
        this.onClose=this.onClose.bind(this);
        this.setDate=this.setDate.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
    }
        
    /*Aggiorna le Props*/
    componentDidUpdate(prevProps) {
        if (this.props.modalVisible !== prevProps.modalVisible) {
            this.setState({
                          modalVisible: this.props.modalVisible
                          });
        }
        if (this.props.value !== prevProps.value) {
            this.setState({
                          value: this.props.value
                          });
        }
    }
    
    /*Apre il Modal*/
    setModalVisible() {
        this.setState({
                      chosenDate:new Date,
                      modalVisible:true,
                      });
    }
    
    /*Permette di cambiare la data del Picker*/
    setDate(newDate)  {
        this.setState({
                      chosenDate: newDate,
                      });
    }
    
    /*Chiude il Modal e richiama il save*/
    onClose(){
        this.props.save(this.state.chosenDate);
        this.setState({
                      modalVisible:false,
                      });
    }
    
    render(){
        return(
               <View>
                   <View style={styles.row}>
                       <Text style={styles.txtmargin}>{this.state.label}:</Text>
                       <TouchableOpacity onPress={() => {this.setModalVisible()}}>
                       {this.state.value===null?
                            <Text style={styles.placeHolder}>{this.state.placeHolder}</Text>
                       :
                            <Text style={styles.txt}>{this.state.value}</Text>}
                       </TouchableOpacity>
                   </View>
                   <Modal style={styles.bottomModal}
                       animationType="slide"
                       transparent={true}
                       visible={this.state.modalVisible}
                       onBackdropPress={() => {this.setState({modalVisible: false})}}>
                       <View style={styles.modalContent}>
                           <DatePickerIOS
                               date={this.state.chosenDate}
                               onDateChange={this.setDate}
                               mode={this.state.mode}/>
                           <Button block light style={styles.button} onPress={this.onClose}>
                                <Text style={styles.ButtonText}>Save</Text>
                           </Button>
                        </View>
                   </Modal>
                   <View style={styles.space}/>
               </View>
               );
    }
}

const styles=StyleSheet.create({
                                   row:{
                                    flexDirection: 'row',
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
                                    margin:3,
                                   },
                                   txtmargin:{
                                    fontSize: 20,
                                    fontWeight: '200',
                                    color: 'black',
                                    marginLeft:5,
                                    marginRight:3,
                                    marginTop:3,
                                    marginBottom:3,
                                   },
                                   placeHolder:{
                                    fontSize: 20,
                                    fontWeight: '200',
                                    color: '#a6a6a6',
                                    margin:3,
                                   },
                                   modalContent: {
                                    marginTop:10,
                                    marginBottom:10,
                                    marginRight:20,
                                    marginLeft:20,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                   },
                                   bottomModal: {
                                    justifyContent: 'flex-end',
                                    margin: 0,
                                   },
                                   ButtonText:{
                                    fontSize: 20,
                                    fontWeight: '300',
                                    color: '#2874F0',
                                   },
                                   space:{
                                    marginTop:15,
                                   },
                               })
export default DateTimePicker

