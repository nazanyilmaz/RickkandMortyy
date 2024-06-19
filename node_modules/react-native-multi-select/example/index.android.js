import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LocationDropDown from './LocationDropDown';

class App extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LocationDropDown/>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent('dropdown', () => App);
