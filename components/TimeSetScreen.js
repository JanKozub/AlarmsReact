import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BigTimeButton from "./buttons/BigTimeButton";
import CustomButton from "./buttons/CustomButton";

class TimeSetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: true,
            hour: parseInt(this.props.route.params.time[0]),
            minute: parseInt(this.props.route.params.time[1]),
            lastPressed: 0
        }
    }

    render() {
        let hourButtons = []
        let counter = 0
        let key = 0;
        for (let i = -120; i <= 240; i++) {
            if (i % 30 === 0) {
                let x = 165 + (150 * Math.cos(i / 57.3));
                let y = 400 + (150 * Math.sin(i / 57.3));
                hourButtons.push(<BigTimeButton key={key} left={x} top={y} size={60} br={25} ts={20} text={counter} onclick={
                    () => this.setState({hour: (i / 30) + 4})
                }></BigTimeButton>)
                counter++;
                key++;
            }
        }

        counter = 11;
        for (let i = -120; i <= 240; i++) {
            if (i % 30 === 0) {
                let x = 175 + (90 * Math.cos(i / 57.3));
                let y = 410 + (90 * Math.sin(i / 57.3));
                let hour = (i / 30) + 15;

                let text = ''
                if (counter === 12) {
                    text = '0'
                    hour = 0;
                } else {
                    text = counter
                }
                hourButtons.push(<BigTimeButton key={key} left={x} top={y} size={40} br={15} ts={16} text={text} onclick={
                    () => this.setState({hour: hour})
                }></BigTimeButton>)
                counter++;
                key++;
            }
        }

        let minuteButtons = []
        counter = -5
        for (let i = -120; i <= 240; i++) {
            if (i % 30 === 0) {
                let x = 165 + (150 * Math.cos(i / 57.3));
                let y = 400 + (150 * Math.sin(i / 57.3));
                minuteButtons.push(<BigTimeButton key={key} left={x} top={y} size={60} br={25} ts={20} text={counter} onclick={() => {
                        let num = ((i / 30) + 3) * 5;
                        let minute = num;
                        if (num === this.state.lastPressed) {
                            minute = this.state.minute + 1;
                        }
                        this.setState({minute: minute, lastPressed: num})
                    }
                }></BigTimeButton>)
                counter = counter + 5;
                key++;
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.hour}>
                    <TouchableOpacity onPress={() => this.setState({buttons: true})}>
                        <Text style={{
                            fontSize: 100,
                            color: !this.state.buttons ? 'black' : 'gray'
                        }}>{TimeSetScreen.formatNumber(this.state.hour)}</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 100,
                        color: 'black'
                    }}>:</Text>
                    <TouchableOpacity onPress={() => this.setState({buttons: false})}>
                        <Text style={{
                            fontSize: 100,
                            color: this.state.buttons ? 'black' : 'gray'
                        }}>{TimeSetScreen.formatNumber(this.state.minute)}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.buttons ? hourButtons : minuteButtons}
                <View style={styles.button}>
                    <CustomButton text={'+'} onclick={() => {
                        this.props.route.params.onGoBack(this.state.hour, this.state.minute);
                        this.props.navigation.goBack();
                    }}></CustomButton>
                </View>
            </View>
        );
    }

    static formatNumber(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hour: {
        marginTop: 70,
        justifyContent: "center",
        flexDirection: "row"
    },
    button: {
        width: "100%",
        position: "absolute",
        bottom: 0
    }
});

export default TimeSetScreen;