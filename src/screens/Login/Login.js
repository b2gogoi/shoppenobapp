import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import PhoneInputCard from './components/PhoneInputCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from '../../storage/storageService';
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
  const enter = () => {
    navigation.navigate('Landing');
  };

  const test = async () => {
    console.warn('Hello');
    setState('phone');
    await storeData('9686404229');
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout>
        {/* <ImageBackground
          resizeMode="cover"
          style={styles.image}
          width="300"
          height="600"
          source={require('../../../assets/ECX9PP.jpg')}> */}
        <View>
          {state && <PhoneInputCard verify={enter} />}
          {!state && (
            <Button onPress={test} appearance="outline">
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
