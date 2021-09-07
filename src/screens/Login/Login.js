import React, {useState, useEffect} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import PhoneInputCard from './components/PhoneInputCard';
import {getData} from '../../storage/storageService';
import {verifyOTP} from '../../api/authService';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
  },
});

const Login = ({navigation, route}) => {
  const [state, setState] = useState();
  const enter = otp => {
    console.log('Verifying : OTP: ', otp);
    verifyOTP(otp)
      .then(success => {
        console.log('OTP verified successfully', success.message);
        navigation.navigate('Landing');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('OTP verification failed', err);
      });
  };

  const inputPhone = async () => {
    setState('phone');
  };

  useEffect(() => {
    getData().then(data => {
      console.warn(data);
      inputPhone();
    });
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout>
        {/* <ImageBackground
          resizeMode="cover"
          style={styles.image}
          // width="300"
          // height="600"
          source={require('../../../assets/ECX9PP.jpg')}> */}
        <View>
          {state && <PhoneInputCard verify={enter} />}
          {!state && (
            <Button onPress={inputPhone} appearance="outline">
              Signup / Login
            </Button>
          )}
        </View>
        {/* </ImageBackground> */}
      </Layout>
    </SafeAreaView>
  );
};

export default Login;
