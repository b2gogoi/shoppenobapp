import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInputCard from './components/PhoneInputCard';
import {getData, getToken, storeToken} from '../../storage/storageService';
import {verifyOTP} from '../../api/authService';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  imageContainer: {
    flexBasis: 200,
    marginTop: 100,
    marginBottom: 50,
    padding: 20,
  },
  phoneContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    flexBasis: 400,
  },
  btn: {
    width: 150,
  },
  logo: {
    resizeMode: 'contain',
    height: IMAGE_HEIGHT,
    width: '100%',
  },
});

const Login = ({navigation, route}) => {
  const [state, setState] = useState();

  const inputPhone = () => {
    console.log('clicked');
    setState('phone');
  };

  const enter = otp => {
    console.log('Verifying : OTP: ', otp);
    verifyOTP(otp)
      .then(success => {
        console.log(success);
        console.log('OTP verified successfully', success);
        storeToken(success.token);
        navigation.reset({
          index: 0,
          routes: [{name: 'Landing'}],
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert('OTP verification failed', err);
      });
  };

  useEffect(() => {
    getToken().then(token => {
      console.log('Got token: ', token);
      if (token) {
        storeToken(token);
        navigation.reset({
          index: 0,
          routes: [{name: 'Landing'}],
        });
      } else {
        getData().then(data => {
          if (data) {
            inputPhone();
          }
        });
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Layout>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/nob-logo.png')}
              />
            </View>
            <View style={styles.phoneContainer}>
              {state && <PhoneInputCard verify={enter} />}
              {!state && (
                <Button
                  onPress={inputPhone}
                  appearance="outline"
                  style={styles.btn}>
                  Signup / Login
                </Button>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default Login;
