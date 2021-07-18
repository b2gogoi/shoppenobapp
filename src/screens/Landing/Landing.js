import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';

import ScanInputBar from './components/ScanInputBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const Landing = ({navigation, route}) => {
  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <ScanInputBar scan={() => navigation.navigate('Scan')} />
        {/* <Divider /> */}
        <ScanInputBar scan={() => navigation.navigate('Scan')} />
<ScanInputBar scan={() => navigation.navigate('Scan')} />
<ScanInputBar scan={() => navigation.navigate('Scan')} />
        {/* <View>
          <Button
            title="Estaa Sweets"
            onPress={() =>
              navigation.navigate('MerchantCoupons', {merchant: 'Estaa Sweets'})
            }
          />
        </View>

        <View>
          <Button
            title="Thirdwave"
            onPress={() =>
              navigation.navigate('MerchantCoupons', {merchant: 'Thirdwave'})
            }
          />
        </View>

        <View>
          <Button
            title="Tony"
            onPress={() =>
              navigation.navigate('MerchantCoupons', {merchant: 'Tony'})
            }
          />
        </View> */}
      </Layout>
    </SafeAreaView>
  );
};

export default Landing;
