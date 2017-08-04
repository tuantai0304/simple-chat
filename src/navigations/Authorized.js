import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
import Setting from './Setting';
import Login from '../screens/unauthorized/Login';
import DrawerContent from '../components/DrawerContent';
import { connect } from 'react-redux';
import { logout } from '../actions/Authenticate';

const Authorized = DrawerNavigator({
    Home: { screen: Home },
    Profile: { screen: Profile },
    Setting: { screen: Setting },
    Logout: { screen: Login },
}
// , {
//         contentComponent: (props) => <DrawerContent {...props} />
//     }
);

export default Authorized;
