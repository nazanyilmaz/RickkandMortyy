import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';

export default class Option extends Component {
    textStyle() {
        const {text} = this.props;
        if (text)
            return [styles.text, text.style];

        return styles.text;
    }


    render() {
        let {children, view, touchableOpacity, onPress, text} = this.props;
        return (
            <View refreshing={false} {...view} style={[styles.View, view.style]}>
                <TouchableOpacity
                    {...touchableOpacity}
                    style={[styles.touchableOpacity, touchableOpacity.style]}
                    onPress={() => {
                        onPress(children);
                        DeviceEventEmitter.emit('saveFocus');
                    }}>
                    <Text {...text} style={[styles.Text, text.style]}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

Option.defaultProps = {
    text: {},
    view: {},
    touchableOpacity: {
        onPress: () => {
        }
    }
};

const styles = StyleSheet.create({
    text: {},
    view: {},
    touchableOpacity: {
        height: 40
    }
});