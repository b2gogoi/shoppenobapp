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
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

import {Button, Icon} from '@ui-kitten/components';

import Login from './src/screens/Login/Login';
import Landing from './src/screens/Landing/Landing';
import Scan from './src/screens/Scan/Scan';
import MerchantCoupons from './src/screens/MerchantCoupons/MerchantCoupons';
import Settings from './src/screens/Settings/Settings';
import {clearData} from './src/storage/storageService';

const Stack = createStackNavigator();

const {width} = Dimensions.get('window');

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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width,
    paddingHorizontal: 10,
  },
  logo: {
    height: 28,
    width: 37,
    resizeMode: 'cover',
  },
  icon: {width: 22, height: 22, tintColor: '#fff', marginRight: 10},
  buttonLogout: {
    // padding: 0,
    // color: '#FCFACE',
    // backgroundColor: '#FCFACE',
  },
});

export const SettingsIcon = props => (
  <Icon name="settings-2-outline" size="small" {...props} pack="eva" />
);

export const LogoutIcon = props => (
  <Icon
    name="log-out-outline"
    size="small"
    {...props}
    pack="eva"
    // style={{marginLeft: -10}}
  />
);

function LogoTitle() {
  return (
    <View style={styles.headerRow}>
      <Image style={styles.logo} source={require('./assets/ShoppeNOB.png')} />
    </View>
  );
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
            initialRouteName="Login"
            screenOptions={{
              cardStyle: {backgroundColor: '#fff'},
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={({navigation}) => ({
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerTitle: props => <LogoTitle {...props} />,
                headerLeft: () => {
                  return null;
                },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}>
                    <SettingsIcon
                      fill="white"
                      height="28"
                      width="28"
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Scan"
              component={Scan}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerLeft: () => {
                  return null;
                },
                headerTitle: 'Scan',
              }}
            />
            <Stack.Screen
              name="MerchantCoupons"
              component={MerchantCoupons}
              initialParams={{
                merchantId: 'd577ee15-70ab-44cd-acc0-46b516e874bf',
              }}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={({navigation}) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#00b29e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerRight: () => (
                  <Button
                    style={styles.buttonLogout}
                    onPress={() => clearData(navigation)}
                    size="large"
                    status="warning"
                    appearance="ghost">
                    Logout
                  </Button>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
