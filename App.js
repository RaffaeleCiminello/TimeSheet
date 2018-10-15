import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Appointment from './Screen/Appointment.js';
import Add from './Screen/Add.js';

const Navigator = createStackNavigator(
                                {
                                Appointment: Appointment,
                                Add: Add,
                                },
                                  
                                {
                                initialRouteName: 'Add',
                                }
                            );

export default class App extends React.Component {
    render() {
        return <Navigator/>;
    }
}
