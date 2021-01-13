import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppTheme} from '@root/colors';
import {Routes} from './Routes';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          component={Routes.Main.component}
          name={Routes.Main.name}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Routes.loading.component}
          name={Routes.loading.name}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
