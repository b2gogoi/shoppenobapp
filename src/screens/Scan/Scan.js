import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

const Landing = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('CouponLoaded');
    }, 2000);
  }, [navigation]);
  return (
    <SafeAreaView>
      <View>
        <Text>Just scanning ...</Text>
      </View>
    </SafeAreaView>
  );
};

export default Landing;
