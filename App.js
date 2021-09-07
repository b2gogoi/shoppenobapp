/**
 * ShoppeNOB React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AntDesignIconsPack} from './src/icons/ant-design-icons';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ImageBackground,
  View,
  Button,
} from 'react-native';

import * as eva from '@eva-design/eva';
import {default as theme} from './custom-theme.json';

import Login from './src/screens/Login/Login';
import Landing from './src/screens/Landing/Landing';
import Scan from './src/screens/Scan/Scan';
import MerchantCoupons from './src/screens/MerchantCoupons/MerchantCoupons';

const Stack = createStackNavigator();

const image = {uri: 'https://reactjs.org/logo-og.png'};

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
            <Stack.Screen name="Login" component={Login} />
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bg: {
    flex: 1,
    backgroundColor: '#9FA8DA',
    // flex: 0.3,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
