import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import PhoneInputCard from './components/PhoneInputCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const Login = ({navigation, route}) => {
  const [state, setState] = useState();
  const enter = () => {
    navigation.navigate('Landing');
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout>
        {/* <Text category="h1">HOME</Text> */}
        <View>
          {state && <PhoneInputCard verify={enter} />}
          {!state && (
            <Button onPress={() => setState('phone')} appearance="outline">
              Signup / Login
            </Button>
          )}
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Login;
