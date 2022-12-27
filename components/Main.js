import React, {Component} from 'react';
import {FlatList, LogBox, StyleSheet, Vibration, View} from 'react-native';
import CustomButton from "./buttons/CustomButton";
import ListItem from "./ListItem";
import Database from "./Database";
import TimeSetScreen from "./TimeSetScreen";
import {Audio} from 'expo-av';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarms: [],
            interval: null,
            sound: null
        }
    }

    async componentDidMount() {
        let alarms = (await Database.getAll()).rows._array.sort().reverse();
        let na = this.state.alarms;
        alarms.forEach((a) => {
            na.push(a)
        })

        this.setState({alarms: na})

        let interval = setInterval(async () => {
            let alarms = (await Database.getAll()).rows._array.sort().reverse();
            let date = new Date();

            let shouldPlay = false;
            alarms.forEach((a) => {
                let h = parseInt(a.time.split(':')[0])
                let m = parseInt(a.time.split(':')[1])

                if (h === date.getHours() && date.getMinutes() === m && a.state === "true") {
                    if (a.vibration === "true") {
                        Vibration.vibrate()
                    }

                    if (a.music === "true") {
                        shouldPlay = true;
                    }
                }
            })

            if (shouldPlay) {
                await this.state.sound.playAsync()
            } else {
                await this.state.sound.pauseAsync();
            }
        }, 1000)
        this.setState({interval: interval})

        let sound = await Audio.Sound.createAsync(require('./resources/sovietAthem.mp3'), true)
        this.setState({sound: sound.sound})
        await sound.sound.playAsync();
        await sound.sound.pauseAsync();
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.alarms}
                    key={this.state.alarms}
                    renderItem={(item) => {
                        return (<ListItem alarm={item}
                                          delete={() => this.onDelete(item.item.id)}
                                          setTime={() => this.props.navigation.navigate("Time Set Screen", {
                                              time: item.item.time.split(':'),
                                              onGoBack: async (hour, minute) => {
                                                  await this.addAlarm(hour, minute, item.item.id);
                                                  Vibration.vibrate()
                                              }
                                          })}></ListItem>)
                    }}/>
                <CustomButton style={styles.button} text={'+'} onclick={() => this.addAlarm(0, 0, null)}></CustomButton>
            </View>
        )
    }

    async addAlarm(hour, minute, id) {
        if (id !== null) {
            let newTime = this.formatTime(hour, minute)
            let na = this.state.alarms;
            for (let i = 0; i < na.length; i++) {
                if (na[i].id === id) {
                    na[i].time = newTime;
                }
            }
            this.setState({alarms: na})
            await Database.updateTime(id, newTime)
        } else {
            this.props.navigation.navigate("Time Set Screen", {
                time: "00:00",
                onGoBack: async (hour, minute) => {
                    Vibration.vibrate()

                    let alarms = this.state.alarms;
                    let id = Math.round(Math.random() * 10000);
                    let time = this.formatTime(hour, minute);
                    alarms.push({id: id, time: time, days: "0-0-0-0-0", state: false})
                    this.setState({alarms: alarms.sort().reverse()})
                    await Database.add(id, time, '0-0-0-0-0', false, false, false);
                }
            })
        }
    }

    formatTime(hour, minute) {
        return TimeSetScreen.formatNumber(hour) + ':' + TimeSetScreen.formatNumber(minute);
    }

    async onDelete(id) {
        let alarms = this.state.alarms;

        let rId = -1;
        for (let i = 0; i < alarms.length; i++) {
            if (alarms[i].id === id) {
                rId = id;
            }
        }

        if (rId > -1) {
            Database.remove(rId)
            alarms = (await Database.getAll()).rows._array
        }

        this.setState({alarms: alarms})
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'flex-end'},
    scroll: {},
    button: {flex: 1},
    list: {flex: 1}
});

export default Main;