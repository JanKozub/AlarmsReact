import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class BigTimeButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                width: this.props.size,
                height: this.props.size,
                position: "absolute",
                left: this.props.left,
                top: this.props.top,
                borderRadius: this.props.br,
                backgroundColor: "black"
            }}>
                <TouchableOpacity style={styles.touch} onPress={this.props.onclick}>
                    <Text style={{
                        fontSize: this.props.ts,
                        textAlign: "center",
                        color: 'white'
                    }}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    touch: {flex: 1, justifyContent: "center"}
});

export default BigTimeButton;