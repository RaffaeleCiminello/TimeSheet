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
            valid:null,
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
        const MemDefSBHours= await AsyncStorage.getItem('MemDefSBHours');
        const MemDefEBHours= await AsyncStorage.getItem('MemDefEBHours');
        const MemDefEndHours= await AsyncStorage.getItem('MemDefEndHours');
              this.setState({
                            DefStartHours: MemDefStartHours,
                            DefSBHours: MemDefSBHours,
                            DefEBHours: MemDefEBHours,
                            DefEndHours: MemDefEndHours,
                            });
        if(MemDefStartHours!==null || MemDefSBHours!==null || MemDefEBHours!==null || MemDefEndHours!==null ) {
            this.props.navigation.setParams({
                                            reset:true,
                                            });
        }
    }
    
    /*Salva l'ora di inizio default*/
    onSaveDefStartHour(newDate){
        this.props.navigation.setParams({
                                        reset:true,
                                        save:true,
                                        });
        this.setState({
                      chosenDate:newDate,
                      intS:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefStartHours:moment(this.state.chosenDate).format('LT')
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
                      intSB:newDate,
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
                      intEB:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEBHours:moment(this.state.chosenDate).format('LT')
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
                      intE:newDate,
                      },
                      ()=>{
                      this.setState({
                                    DefEndHours:moment(this.state.chosenDate).format('LT')
                                    });
                      });
    }
    
    /*Salva i dati in memoria e nel json*/
    onSave = async () => {
        if(this.state.DefStartHours!==null) //controlla che DefStartHours sia settato
        {
            if(this.state.DefSBHours!==null && this.state.DefEBHours!==null && this.state.DefEndHours!==null)//controlla che tutti gli altri orari siano settati
            {
                if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intS))>0)//confronta con tutti gli orari
                {
                    await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                    this.setState({
                                  valid:true,
                    })
                }
                else
                {
                    this.setState({
                                  valid:false,
                                  })
                }
            }
            else //se uno dei 3 orari non è settato confronta DefSBHours e DefEBHours per vedere che siano settati
            {
                if(this.state.DefSBHours!==null && this.state.DefEBHours!==null)//controlla che DefSBHours e DefEBHours siano settati
                {
                    if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intS))>0) //confronta con gli orari settati
                    {
                        await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                        this.setState({
                                      valid:true,
                                      })
                    }
                    else
                    {
                        this.setState({
                                      valid:false,
                                      })
                    }
                }
                else //se è falso DefSBHours o DefEBHours non è settato
                {
                    if(this.state.DefEBHours!==null && this.state.DefEndHours!==null)//controlla che DefEBHours e DefEndHours siano settati se è vero DefSBHours non è settato
                    {
                        if(moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intS))>0)//confronta con gli orari settati
                        {
                            await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                            this.setState({
                                          valid:true,
                                          })
                        }
                        else{
                            this.setState({
                                          valid:false,
                                          })
                        }
                    }
                    else //se è falso  DefEBHours o DefEndHours non è settato
                    {
                        if(this.state.DefSBHours!==null && this.state.DefEndHours!==null)//controlla che DefSBHours e DefEndHours siano settati se è vero DefEBHours non è settato
                        {
                            if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intS))>0)//confronta con  gli orari settati
                            {
                                await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                                this.setState({
                                              valid:true,
                                              })
                            }
                            else
                            {
                                this.setState({
                                              valid:false,
                                              })
                            }
                        }
                        else // se è falso 2 orari non sono settati e li controlla singolarmente
                        {
                            if(this.state.DefSBHours!==null)
                            {
                                if(moment(this.state.intSB).diff(moment(this.state.intS))>0)
                                {
                                    await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                                    this.setState({
                                                  valid:true,
                                                  })
                                }
                                else
                                {
                                    this.setState({
                                                  valid:false,
                                                  })
                                }
                            }
                            else
                            {
                                if(this.state.DefEBHours!==null)
                                {
                                    if(moment(this.state.intEB).diff(moment(this.state.intS))>0)
                                    {
                                        await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                    else
                                    {
                                        this.setState({
                                                      valid:false,
                                                      })
                                    }
                                }
                                else
                                {
                                    if(this.state.DefEndHours!==null)
                                    {
                                        if(moment(this.state.intE).diff(moment(this.state.intS))>0)
                                        {
                                            await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                                            this.setState({
                                                          valid:true,
                                                          })
                                        }
                                        else
                                        {
                                            this.setState({
                                                          valid:false,
                                                          })
                                        }
                                    }
                                    else // se anche questo è falso allora DefStartHours è l'unico settato
                                    {
                                         await AsyncStorage.setItem('MemDefStartHours', this.state.DefStartHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(this.state.DefSBHours!==null) //controlla che DefSBHours sia settato
        {
            if(this.state.DefStartHours!==null && this.state.DefEBHours!==null && this.state.DefEndHours!==null) //controlla che tutti gli altri orari siano settati
            {
                if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0) //confronta con tutti gli orari
                {
                    await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                    this.setState({
                                  valid:true,
                                  })
                }
                else
                {
                    this.setState({
                                  valid:false,
                                  })
                }
            }
            else //se uno dei 3 orari non è settato confronta DefStartHours e DefEBHours per vedere che siano settati
            {
                if(this.state.DefStartHours!==null && this.state.DefEBHours!==null) //controlla che DefStartHours e DefEBHours siano settati
                {
                    if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0) //confronta con  gli orari settati
                    {
                        await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                        this.setState({
                                      valid:true,
                                      })
                    }
                    else
                    {
                        this.setState({
                                      valid:false,
                                      })
                    }
                }
                else //se è falso DefEBHours o DefEndHours non è settato
                {
                    if(this.state.DefEBHours!==null && this.state.DefEndHours!==null) //controlla che DefEBHours e DefEndHours siano settati
                    {
                        if(moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0) //confronta con  gli orari settati
                        {
                             await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                            this.setState({
                                          valid:true,
                                          })
                        }
                        else{
                            this.setState({
                                          valid:false,
                                          })
                        }
                    }
                    else //se è falso DefStartHours o DefEndHours non è settato
                    {
                        if(this.state.DefStartHours!==null && this.state.DefEndHours!==null)//controlla che DefStartHours e DefEndHours siano settati se è vero DefEBHours non è settato
                        {
                            if(moment(this.state.intSB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0)//confronta con  gli orari settati
                            {
                                await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                                this.setState({
                                              valid:true,
                                              })
                            }
                            else
                            {
                                this.setState({
                                              valid:false,
                                              })
                            }
                        }
                        else // se è falso 2 orari non sono settati e li controlla singolarmente
                        {
                            if(this.state.DefStartHours!==null)
                            {
                                if(moment(this.state.intSB).diff(moment(this.state.intS))>0)
                                {
                                    await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                                    this.setState({
                                                  valid:true,
                                                  })
                                }
                                else
                                {
                                    this.setState({
                                                  valid:false,
                                                  })
                                }
                            }
                            else
                            {
                                if(this.state.DefEBHours!==null)
                                {
                                    if(moment(this.state.intEB).diff(moment(this.state.intS))>0)
                                    {
                                        await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                    else
                                    {
                                        this.setState({
                                                      valid:false,
                                                      })
                                    }
                                }
                                else
                                {
                                    if(this.state.DefEndHours!==null)
                                    {
                                        if(moment(this.state.intE).diff(moment(this.state.intS))>0)
                                        {
                                            await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                                            this.setState({
                                                          valid:true,
                                                          })
                                        }
                                        else
                                        {
                                            this.setState({
                                                          valid:false,
                                                          })
                                        }
                                    }
                                    else // se anche questo è falso allora DefSBHours è l'unico settato
                                    {
                                        await AsyncStorage.setItem('MemDefSBHours', this.state.DefSBHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(this.state.DefEBHours!==null)//controlla che DefEBHours sia settato
        {
            if(this.state.DefStartHours!==null && this.state.DefSBHours!==null && this.state.DefEBHours!==null) //controlla che tutti gli altri orari siano settati
            {
                if(moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0) //confronta con tutti gli orari

                {
                    await AsyncStorage.setItem('MemDefEBHours', this.state.DefEndHours);
                    this.setState({
                                  valid:true,
                                  })
                }
                else
                {
                    this.setState({
                                  valid:false,
                                  })
                }
            }
            else //se uno dei 3 orari non è settato confronta DefStartHours e DefSBHours per vedere che siano settati
            {
                if(this.state.DefStartHours!==null && this.state.DefSBHours!==null)//controlla che DefStartHours e DefSBHours siano settati
                {
                    if(moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intEB).diff(moment(this.state.intSB))>0) //confronta con gli orari settati
                    {
                        await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                        this.setState({
                                      valid:true,
                                      })
                    }
                    else
                    {
                        this.setState({
                                      valid:false,
                                      })
                    }
                }
                else //se è falso DefStartHours o DefSBHours non è settato

                {
                    if(this.state.DefSBHours!==null && this.state.DefEndHours!==null)//controlla che DefSBHours e DefEndHours siano settati se è vero DefStartHours non è settato
                    {
                        if(moment(this.state.intEB).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta con gli orari settati
                        {
                            await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                            this.setState({
                                          valid:true,
                                          })
                        }
                        else
                        {
                            this.setState({
                                          valid:false,
                                          })
                        }
                    }
                    else//se è falso  DefStartHours o DefEndHours non è settato
                    {
                        if(this.state.DefStartHours!==null && this.state.DefEndHours!==null)//controlla che DefStartHours e DefEndHours siano settati se è vero DefSBHours non è settato
                        {
                            if(moment(this.state.intEB).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta con  gli orari settati
                            {
                                await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                                this.setState({
                                              valid:true,
                                              })
                            }
                            else
                            {
                                this.setState({
                                              valid:false,
                                              })
                            }
                        }
                        else// se è falso 2 orari non sono settati e li controlla singolarmente

                        {
                            if(this.state.DefStartHours!==null)
                            {
                                if(moment(this.state.intEB).diff(moment(this.state.intS))>0)
                                {
                                    await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                                    this.setState({
                                                  valid:true,
                                                  })
                                }
                                else
                                {
                                    this.setState({
                                                  valid:false,
                                                  })
                                }
                            }
                            else
                            {
                                if(this.state.DefSBHours!==null)
                                {
                                    if(moment(this.state.intEB).diff(moment(this.state.intSB))>0)
                                    {
                                        await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                    else
                                    {
                                        this.setState({
                                                      valid:false,
                                                      })
                                    }
                                }
                                else
                                {
                                    if(this.state.DefEndHours!==null)
                                    {
                                        if(moment(this.state.intE).diff(moment(this.state.intEB))>0)
                                        {
                                            await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                                            this.setState({
                                                          valid:true,
                                                          })
                                        }
                                        else
                                        {
                                            this.setState({
                                                          valid:false,
                                                          })
                                        }
                                    }
                                    else// se anche questo è falso allora DefEBHours è l'unico settato
                                    {
                                        await AsyncStorage.setItem('MemDefEBHours', this.state.DefEBHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(this.state.DefEndHours!==null)//controlla che DefEndHours sia settato
        {
            if(this.state.DefStartHours!==null && this.state.DefEBHours!==null && this.state.DefEndHours!==null)//controlla che tutti gli altri orari siano settati
            {
                if(moment(this.state.intE).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta con tutti gli orari
                {
                    await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                    this.setState({
                                  valid:true,
                                  })
                }
                else
                {
                    this.setState({
                                  valid:false,
                                  })
                }
            }
            else//se uno dei 3 orari non è settato confronta DefStartHours e DefSBHours per vedere che siano settati
            {
                if(this.state.DefStartHours!==null && this.state.DefSBHours!==null)//controlla che DefStartHours e DefSBHours siano settati
                {
                    if(moment(this.state.intE).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intSB))>0)//confronta con gli orari settati
                    {
                        await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                        this.setState({
                                      valid:true,
                                      })
                    }
                    else
                    {
                        this.setState({
                                      valid:false,
                                      })
                    }
                }
                else//se è falso DefStartHours o DefSBHours non è settato
                {
                    if(this.state.DefSBHours!==null && this.state.DefEBHours!==null)//controlla che DefSBHours e DefEBHours siano settati se è vero DefStartHours non è settato
                    {
                        if(moment(this.state.intE).diff(moment(this.state.intSB))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta con gli orari settati
                        {
                            await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                            this.setState({
                                          valid:true,
                                          })
                        }
                        else{
                            this.setState({
                                          valid:false,
                                          })
                        }
                    }
                    else//se è falso  DefSBHours o DefEBHours non è settato
                    {
                        if(this.state.DefStartHours!==null && this.state.DefEBHours!==null)//controlla che DefStartHours e DefEBHours siano settati se è vero DefSBHours non è settato
                        {
                            if(moment(this.state.intE).diff(moment(this.state.intS))>0 && moment(this.state.intE).diff(moment(this.state.intEB))>0)//confronta con  gli orari settati
                            {
                                await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                                this.setState({
                                              valid:true,
                                              })
                            }
                            else
                            {
                                this.setState({
                                              valid:false,
                                              })
                            }
                        }
                        else// se è falso 2 orari non sono settati e li controlla singolarmente
                        {
                            if(this.state.DefStartHours!==null)
                            {
                                if(moment(this.state.intE).diff(moment(this.state.intS))>0)
                                {
                                    await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                                    this.setState({
                                                  valid:true,
                                                  })
                                }
                                else
                                {
                                    this.setState({
                                                  valid:false,
                                                  })
                                }
                            }
                            else
                            {
                                if(this.state.DefSBHours!==null)
                                {
                                    if(moment(this.state.intE).diff(moment(this.state.intSB))>0)
                                    {
                                        await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                    else
                                    {
                                        this.setState({
                                                      valid:false,
                                                      })
                                    }
                                }
                                else
                                {
                                    if(this.state.DefEBHours!==null)
                                    {
                                        if(moment(this.state.intE).diff(moment(this.state.intEB))>0)
                                        {
                                            await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                                            this.setState({
                                                          valid:true,
                                                          })
                                        }
                                        else
                                        {
                                            this.setState({
                                                          valid:false,
                                                          })
                                        }
                                    }
                                    else// se anche questo è falso allora DefEndHours è l'unico settato
                                    {
                                        await AsyncStorage.setItem('MemDefEndHours', this.state.DefEndHours);
                                        this.setState({
                                                      valid:true,
                                                      })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(this.state.valid===true)
        {
            Alert.alert('Salvataggio Effettuato', 'I dati inseriti sono stati salvati con successo')
            this.setState({
                          valid:null,
            })
        }
        else
        {
            Alert.alert('Salvataggio Fallito', 'I dati inseriti non sono validi')
            this.setState({
                          valid:null,
                          })
        }
        this.props.navigation.setParams({
                                        save:false,
                                        reset:true,
                                        });
    }
    
    /*Cancella orari di default in memoria*/
    onReset = async() => {
            await AsyncStorage.removeItem('MemDefStartHours');
            await AsyncStorage.removeItem('MemDefSBHours');
            await AsyncStorage.removeItem('MemDefEBHours');
            await AsyncStorage.removeItem('MemDefEndHours');
        this.setState({
                      MemDefStartHours: null,
                      MemDefEndHours: null,
                      MemDefSBHours: null,
                      MemDefEBHours: null,
                      DefStartHours:null,
                      DefEndHours:null,
                      DefSBHours:null,
                      DefEBHours:null,
                      valid:null,
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
                           value={this.state.DefStartHours}
                           save={(newDate)=>{this.onSaveDefStartHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Start Break Default Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefSBHours}
                           save={(newDate)=>{this.onSaveDefSBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert End Break Default Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefEBHours}
                           save={(newDate)=>{this.onSaveDefEBHour(newDate)}}/>
                       <DateTimePicker
                           mode='time'
                           label='Insert Default End Hour'
                           placeHolder='Insert Hour'
                           value={this.state.DefEndHours}
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
