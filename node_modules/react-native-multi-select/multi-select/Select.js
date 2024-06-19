import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Select extends Component {
    static propTypes = {
    };

    state = {
        selectedItem: [],
        text: ""
    };

    render() {
        let {children, ...rest} = this.props;

        return (
            <View {...rest}>
                {children}
            </View>
        );
    }
}