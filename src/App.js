import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator';
import store from './store';
import Login from './screens/unauthorized/Login'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
                {/*<Login/>*/}
            </Provider>
            // <View>
            //     <Text>Hello</Text>
            // </View>
            // <Login/>
        );
    }
}

AppRegistry.registerComponent('facebook_login', () => App);
