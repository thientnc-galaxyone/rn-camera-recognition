import MainNavigator from './MainNavigator';
import LoadingScreen from '@root/screens/Loading';
import Home from '@root/screens/Home';
import InputPhone from '@root/screens/InputPhone';
import InputOTP from '@root/screens/InputOTP';
import RegisterFace from '@root/screens/RegisterFace';
import CheckinFace from '@root/screens/CheckinFace';

export const Routes = {
  Main: {
    name: 'Main',
    component: MainNavigator,
  },
  loading: {
    name: 'Loading',
    component: LoadingScreen,
  },
  home: {
    name: 'Home',
    component: Home,
  },
  registerFace: {
    name: 'Register Face',
    component: RegisterFace,
  },
  checkinFace: {
    name: 'Check in Face',
    component: CheckinFace,
  },
  inputPhone: {
    name: 'Authentication',
    component: InputPhone,
  },
  inputOTP: {
    name: 'Input OTP',
    component: InputOTP,
  },
};
