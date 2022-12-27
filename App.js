import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from "./components/Main";
import TimeSetScreen from "./components/TimeSetScreen";
import Database from "./components/Database";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Database.createTable();
  }

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{
              title: 'Alarms',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
              }
            }}/>
            <Stack.Screen name="Time Set Screen" component={TimeSetScreen} options={{
              title: 'Ustaw czas',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
              }
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}