import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TextInput,
    DeviceEventEmitter,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class SelectTextBox extends Component {
    focusedTimeout;

    constructor(props) {
        super(props);
        DeviceEventEmitter.addListener('saveFocus', () => clearTimeout(this.focusedTimeout));
    }


    render() {
        let {onSelectTextBoxChanged, onTextInputFocus, onTextInputLoosFocus, selectedItem, onPressOut, ...rest} = this.props;

        return (
            <View refreshing={false} {...rest}>
                <TextInput
                    onEndEditing={() => {
                        this.focusedTimeout = setTimeout(onTextInputLoosFocus, 50);
                    }}
                    onFocus={onTextInputFocus}
                    onChange={onSelectTextBoxChanged}/>
                {
                    selectedItem.length > 0 ?

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            position: 'relative',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            bottom: 40,
                        }}>
                            {selectedItem.map((item, index) =>
                                <TouchableOpacity key={index} onPress={onPressOut.bind(null, item)}>
                                    <Text>{item}{selectedItem.length - 1 != index ? ", " : null}</Text>
                                </TouchableOpacity>
                            )}
                        </View> : null
                }
            </View>
        );
    }
}