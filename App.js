/**
 * ShoppeNOB React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
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
import CouponLoaded from './src/screens/CouponLoaded/CouponLoaded';
import MerchantCoupons from './src/screens/MerchantCoupons/MerchantCoupons';

const Stack = createStackNavigator();

const Dummy = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (route.params?.user) {
      setMessage(`${route.params.user} has logged out`);
    }
  }, [route.params?.user]);
  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Details', {user: 'Bhaskar'})}
        />
        <Button
          title="Login Push"
          onPress={() => navigation.push('Details', {user: 'Manish'})}
        />
        <Text>{message}</Text>
      </View>
    </SafeAreaView>
  );
};

function DetailsScreen({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Landing Screen : {user}</Text>
      <Button
        title="Push to Coupons"
        onPress={() => navigation.push('Coupons')}
      />
      <Button
        title="Logout"
        onPress={() =>
          navigation.navigate({
            name: 'Login',
            merge: true,
            params: {user},
          })
        }
      />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function CouponsScreen({route, navigation}) {
  const {count} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Coupons {count} </Text>
      <Button title="Home" onPress={() => navigation.popToTop()} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const image = {uri: 'https://reactjs.org/logo-og.png'};

export default () => {
  /* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */

  return (
    <>
      <IconRegistry icons={[AntDesignIconsPack, EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MerchantCoupons">
            {/* <Stack.Screen name="Login" component={Dummy} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="CouponLoaded" component={CouponLoaded} />
            <Stack.Screen
              name="MerchantCoupons"
              component={MerchantCoupons}
              initialParams={{merchantId: 10}}
            />
            {/* <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="Coupons"
            component={CouponsScreen}
            initialParams={{count: 10}}
          /> */}
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
