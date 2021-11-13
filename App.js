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

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import {
  Avatar,
  Modal,
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';

import Login from './src/screens/Login/Login';
import Landing from './src/screens/Landing/Landing';
import Scan from './src/screens/Scan/Scan';
import MerchantCoupons from './src/screens/MerchantCoupons/MerchantCoupons';

const Stack = createStackNavigator();

const {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export const OptionsIcon = props => (
  <Icon name="options-2-outline" size="small" {...props} pack="eva" />
);

function LogoTitle() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width,
        paddingHorizontal: 10,
        // borderWidth: 1,
      }}>
      <Image
        style={{
          height: 28,
          width: 37,
          // borderWidth: 1,
          resizeMode: 'cover',
        }}
        source={require('./assets/ShoppeNOB.png')}
      />

      <OptionsIcon fill="white" height="30" width="30" />
    </View>
  );
  /*  */
}

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
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              cardStyle: {backgroundColor: '#fff'},
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerTitle: props => <LogoTitle {...props} />,
              }}
            />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen
              name="MerchantCoupons"
              component={MerchantCoupons}
              initialParams={{merchantId: 10}}
              options={{
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerTitle: props => <LogoTitle {...props} />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
