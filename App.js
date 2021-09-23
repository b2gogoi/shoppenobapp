/**
 * ShoppeNOB React Native App
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AntDesignIconsPack} from './src/icons/ant-design-icons';

import * as eva from '@eva-design/eva';
import {default as theme} from './custom-theme.json';

import Login from './src/screens/Login/Login';
import Landing from './src/screens/Landing/Landing';
import Scan from './src/screens/Scan/Scan';
import MerchantCoupons from './src/screens/MerchantCoupons/MerchantCoupons';

const Stack = createStackNavigator();

export default () => {
  /* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */

  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <IconRegistry icons={[AntDesignIconsPack, EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen
              name="MerchantCoupons"
              component={MerchantCoupons}
              initialParams={{merchantId: 10}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
