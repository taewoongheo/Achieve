import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

//pages
import Home from './mainTab/Home';
import History from './mainTab/History';
import Profile from './mainTab/Profile';
import { DateContextProvider } from '../context/DateContext';
import { initialize } from '../context/test';

const Main = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  initialize();

  return (
    <DateContextProvider>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
              tabBarStyle: { backgroundColor: '#212121', borderTopWidth: 0 },
              tabBarShowLabel: false,
            }}>
            <Tab.Screen name='History' component={History} />
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Profile' component={Profile} />
          </Tab.Navigator>
        </View>
      </BottomSheetModalProvider>
    </DateContextProvider>
  );
};

export default Main;
