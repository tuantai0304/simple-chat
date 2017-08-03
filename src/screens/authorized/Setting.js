import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DrawerButton } from '../../components';

class Setting extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Setting',
        headerLeft: <DrawerButton navigation={navigation} />,
    });

    render() {
        return (
            <View>
                <Text>Setting</Text>
            </View>
        );
    }
}

export default Setting;
