import { StatusBar } from 'expo-status-bar';
import React,{createContext, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {reducer, initState} from './reducers/reducerContext'
export const myContext = createContext()

import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'

const Stack = createStackNavigator();
const myOptions = {
  title: 'Home',
  headerTintColor:'white',
  headerStyle:{
    backgroundColor:'#006aff'
  }
}

function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options= {myOptions}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options= {{...myOptions, title:'Employee Profile'}} 
        />
        <Stack.Screen 
          name="Create" 
          component={CreateEmployee} 
          options= {{...myOptions, title:' Create Employee'}} 
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: Constants.statusBarHeight,
  },
});

export default () => {
  const [state, dispatch] = useReducer(reducer,initState)
  return(
    <myContext.Provider value={{state:state,dispatch:dispatch}}>
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    </myContext.Provider>
  )
}
