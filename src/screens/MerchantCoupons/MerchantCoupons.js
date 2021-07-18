import React from 'react';
import {SafeAreaView, View, Button, Text} from 'react-native';

function MerchantCoupons({route, navigation}) {
  const {merchant} = route.params;
  return (
    <SafeAreaView>
      <View>
        <Text>Coupons from : {merchant}</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

export default MerchantCoupons;
