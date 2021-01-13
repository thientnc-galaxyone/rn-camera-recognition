import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {Header, Left, Body, Text, Right} from 'native-base';
import {Icon} from '@root/components';
import {Routes} from './Routes';

const Stack = createStackNavigator();

const AppHeader = ({scene, previous, navigation}: StackHeaderProps) => {
  const title = scene.route.name;
  return (
    <Header style={{backgroundColor: 'white'}}>
      <Left>
        {previous ? (
          <Icon name="chevron-left" onPress={navigation.goBack} />
        ) : null}
      </Left>
      <Body>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      </Body>
      <Right />
    </Header>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{header: AppHeader}}>
      <Stack.Screen component={Routes.home.component} name={Routes.home.name} />
      <Stack.Screen
        component={Routes.registerFace.component}
        name={Routes.registerFace.name}
      />
      <Stack.Screen
        component={Routes.checkinFace.component}
        name={Routes.checkinFace.name}
      />
      <Stack.Screen
        component={Routes.inputPhone.component}
        name={Routes.inputPhone.name}
      />
      <Stack.Screen
        component={Routes.inputOTP.component}
        name={Routes.inputOTP.name}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
