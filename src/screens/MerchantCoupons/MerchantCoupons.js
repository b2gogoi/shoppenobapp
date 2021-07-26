import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import {Button, Layout, Modal, Card, Text} from '@ui-kitten/components';
import Coupon from './components/Coupon';

import data from '../../data/data';
import RedeemConfirm from './components/RedeemConfirm';

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flexBasis: '35%',
  },
  merchantDetails: {
    flexBasis: '65%',
    padding: 8,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 140,
    marginBottom: 100,
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
  },
  merchantHeader: {
    color: '#655A5A',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const getMerchantCoupons = merchantId => {
  return data.merchantCoupons[merchantId];
};

function MerchantCoupons({route, navigation}) {
  const {merchantId} = route.params;
  const {name, logoUrl, coupons} = getMerchantCoupons(merchantId);
  const [visible, setVisible] = useState(false);
  const [coupon, setCoupon] = useState();
  const [loadedCoupons, setLoadedCoupons] = useState(coupons);

  const redeemConfirm = selectedCoupon => {
    setCoupon(selectedCoupon);
    setVisible(true);
  };

  const redeem = coupon => {
    setTimeout(() => {
      // error('Coupon already used');
      setVisible(false);
      let clone = [...loadedCoupons];
      let selectedIndex = clone.findIndex(c => c.couponId === coupon.couponId);
      const updated = {...coupon, status: 'redeemed'};
      clone.splice(selectedIndex, 1, updated);
      setLoadedCoupons(clone);
    }, 1000);
  };

  const error = message => {
    setVisible(false);
    Alert.alert('Redeem Coupon Failed', message);
  };

  return (
    <SafeAreaView>
      <Layout>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          {coupon && (
            <RedeemConfirm
              coupon={coupon}
              redeem={redeem}
              cancel={() => {
                setVisible(false);
                setCoupon();
              }}
            />
          )}
        </Modal>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: logoUrl,
              }}
            />
          </View>
          <View style={styles.merchantDetails}>
            <Text category="h4" style={styles.merchantHeader} status="primary">
              {name}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {loadedCoupons.map(coupon => (
            <Coupon
              data={coupon}
              key={coupon.couponId}
              confirm={redeemConfirm}
            />
          ))}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

export default MerchantCoupons;
