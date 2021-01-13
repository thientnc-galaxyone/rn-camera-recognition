import React, {useEffect} from 'react';
import {Root} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from '@root/navigators/RootNavigator';
import {stores, StoreContext} from '@root/stores';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Root>
      <StoreContext.Provider value={stores}>
        <RootNavigator />
      </StoreContext.Provider>
    </Root>
  );
};
