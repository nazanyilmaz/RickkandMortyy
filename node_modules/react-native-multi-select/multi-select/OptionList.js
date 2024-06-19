import React, {Component, PropTypes, Children} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import isArray from 'lodash/isArray';

export default class OptionList extends Component {
    static propTypes = {
        items: PropTypes.array,
        display: PropTypes.bool,
        view: PropTypes.object,
        scrollView: PropTypes.object
    };

    filter(children, items, text) {
        if (!isArray(children))
            children = [];

        if (items.length === 0)
            return items;

        return items.map((item, index) => {
            let regulated = item.match(new RegExp(text, "i"));
            if (isArray(regulated))
                return children[index];
        });
    }

    mapThroughOptions(items) {
        return items.map((item, index) => {
            return <Text key={index}>{item}</Text>;
        });
    }

    mayHide() {
        return this.props.display ? {} : {height: 0};
    }

    render() {
        let {children, text, items, view, scrollView} = this.props;

        return (
            <View {...view} style={[styles.view, view.style, this.mayHide()]}>
                <ScrollView {...scrollView} style={[styles.scrollView, scrollView.style]}
                            keyboardShouldPersistTaps={true}>
                    {text.length > 0 ?
                        this.filter(children, items, text) : children}
                </ScrollView>
            </View>
        );
    }
}

OptionList.defaultProps = {
    view: {},
    scrollView: {},
    display: false
};

const styles = StyleSheet.create({
    view: {},
    scrollView: {
        backgroundColor: '#6A85B1',
        height: 300,
    }
});
