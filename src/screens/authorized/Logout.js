import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import { logout } from '../../actions/Authenticate'
import { DrawerButton } from '../../components';

class Logout extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Logout',
        headerLeft: <DrawerButton navigation={navigation} />,
    });

    render() {
        return (
            <View>
                <Text>Logout</Text>
                { this.props.logout() }
            </View>
        );
    }
}

export default connect((state => {return state;}), { logout })(Logout);
