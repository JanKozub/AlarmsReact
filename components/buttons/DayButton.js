import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class DayButton extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled: this.props.state}
    }

    render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: "center",
                    backgroundColor: this.state.enabled ? 'black' : 'white',
                    borderRadius: 5,
                    borderColor: 'black',
                    borderWidth: 2
                }} onPress={() => {
                    this.props.onchange(!this.state.enabled)
                    this.setState({enabled: !this.state.enabled})
                }}>
                    <Text style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: this.state.enabled ? 'white' : 'black'
                    }}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        margin: 2,
        height: 50
    }
});

export default DayButton;