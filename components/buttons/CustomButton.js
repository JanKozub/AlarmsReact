import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity style={styles.touch} onPress={this.props.onclick}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {margin: 20, marginBottom: 50},
    text: {fontSize: 20, textAlign: "center", color: 'white'},
    touch: {paddingHorizontal: 20, paddingVertical: 10, justifyContent: "center", backgroundColor: 'black', borderRadius: 20}
});

export default CustomButton;