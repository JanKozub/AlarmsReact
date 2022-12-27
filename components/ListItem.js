import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import Database from "./Database";
import DayButton from "./buttons/DayButton";

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: new Animated.Value(0),
            expanded: false,
            days: [false, false, false, false, false],
            enabled: this.props.alarm.item.state === "true",
            music: this.props.alarm.item.music === "true",
            vibration: this.props.alarm.item.vibration === "true"
        };

        let days = this.props.alarm.item.days.split('-');
        for (let i = 0; i < 5; i++) {
            this.state.days[i] = days[i] === "1"
        }

        this.toValue = 0
    }

    toggle() {
        if (!this.state.expanded) this.toValue = 120
        else this.toValue = 0

        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();

        this.setState({expanded: !this.state.expanded})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => this.props.setTime()}>
                            <Text style={styles.text}>{this.props.alarm.item.time}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <Switch style={styles.switch} value={this.state.enabled} onValueChange={() => {
                            Database.updateState(this.props.alarm.item.id, !this.state.enabled)
                            this.setState({enabled: !this.state.enabled})
                        }}></Switch>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => this.toggle()}>
                            <Image style={styles.gear} source={require('./resources/gear.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={{
                    height: this.state.height
                }}>
                    {this.state.expanded ?
                        <View style={styles.settings}>
                            <View style={styles.options}>
                                <View style={styles.row}>
                                    <Image style={{width: 30, height: 30}} source={require('./resources/vibration.png')}></Image>
                                    <Switch style={styles.switchOptions} value={this.state.vibration} onValueChange={() => {
                                        Database.updateVibration(this.props.alarm.item.id, !this.state.vibration)
                                        this.setState({vibration: !this.state.vibration})
                                    }}></Switch>
                                </View>
                                <View style={styles.row}>
                                    <Image style={{width: 30, height: 30}} source={require('./resources/music.png')}></Image>
                                    <Switch style={styles.switchOptions} value={this.state.music} onValueChange={() => {
                                        Database.updateMusic(this.props.alarm.item.id, !this.state.music)
                                        this.setState({music: !this.state.music})
                                    }}></Switch>
                                </View>
                                <TouchableOpacity onPress={() => this.props.delete()}>
                                    <Image style={styles.image} source={require('./resources/garbage.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttons}>
                                <DayButton state={this.state.days[0]} onchange={(s) => this.setDay(0, s)}
                                           text={'Mon'}></DayButton>
                                <DayButton state={this.state.days[1]} onchange={(s) => this.setDay(1, s)}
                                           text={'Tue'}></DayButton>
                                <DayButton state={this.state.days[2]} onchange={(s) => this.setDay(2, s)}
                                           text={'Wed'}></DayButton>
                                <DayButton state={this.state.days[3]} onchange={(s) => this.setDay(3, s)}
                                           text={'Thu'}></DayButton>
                                <DayButton state={this.state.days[4]} onchange={(s) => this.setDay(4, s)}
                                           text={'Fri'}></DayButton>
                            </View>
                        </View>
                         : null}
                </Animated.View>
            </View>
        );
    }

    async setDay(idx, state) {
        this.state.days[idx] = state;
        this.setState({days: this.state.days})

        let days = ''
        for (let i = 0; i < 5; i++) {
            if (this.state.days[i]) {
                days = days + '1-'
            } else {
                days = days + '0-'
            }
        }
        await Database.updateDays(this.props.alarm.item.id, days)
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderColor: 'black',
        overflow: "hidden"
    },
    content: {
        flex: 1,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    column: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    row: {
        position: "relative",
        top: 12,
        height: 50,
        flexDirection: "row"
    },
    text: {
        fontSize: 50,
        position: "relative",
        left: 20
    },
    gear: {
        width: 50,
        height: 50
    },
    switch: {
        position: "relative",
        left: 50,
        transform: [{scaleX: 1.25}, {scaleY: 1.25}]
    },
    switchOptions: {
        position: "relative",
        left: 15,
        transform: [{scaleX: 1.25}, {scaleY: 1.25}]
    },
    settings: {

    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        height: 100
    },
    image: {
        width: 50,
        height: 50
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    }
});

export default ListItem;