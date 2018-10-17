import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Appointment from './Screen/Appointment.js';
import Add from './Screen/Add.js';
import Setting from './Screen/Setting.js';

const Navigator = createStackNavigator(
                                {
                                    Appointment: Appointment,
                                    Add: Add,
                                    Setting: Setting,
                                },
                                  
                                {
                                initialRouteName: 'Setting',
                                }
                            );

export default class App extends React.Component {
    render() {
        return <Navigator/>;
    }
}
