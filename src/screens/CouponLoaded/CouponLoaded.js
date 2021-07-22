import React from 'react';
import {SafeAreaView, View, Button, Text} from 'react-native';

const CouponLoaded = ({navigation, route}) => {
  const {code} = route.params;
  return (
    <SafeAreaView>
      <View>
        <Text>Coupon is loaded successfully: {code}</Text>
        <Button title="OK" onPress={() => navigation.navigate('Landing')} />
      </View>
    </SafeAreaView>
  );
};

export default CouponLoaded;
