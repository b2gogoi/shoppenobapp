import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import {
  Button,
  Layout,
  Modal,
  Card,
  Text,
  Spinner,
} from '@ui-kitten/components';
import Coupon from './components/Coupon';

import data from '../../data/data';
import RedeemConfirm from './components/RedeemConfirm';
import {getMerchantCoupons, redeemCoupon} from '../../api/couponService';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flexBasis: '35%',
    marginTop: 20,
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
    height: 70,
    // width: 80,
    // borderRadius: 10,
    // resizeMode: 'cover',
    // height: 60,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: '#AFA7A7',
    borderRadius: 6,
  },
  merchantHeader: {
    color: '#655A5A',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.5,
    justifyContent: 'center',
  },
});

function MerchantCoupons({route, navigation}) {
  const {merchantId} = route.params;
  // const {name, logoUrl, coupons} = getMerchantCoupons(merchantId);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [coupon, setCoupon] = useState();
  const [loadedCoupons, setLoadedCoupons] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const loadMerchant = merchantId => {
    setShowSpinner(true);
    getMerchantCoupons(merchantId).then(data => {
      console.log('Got coupons of merchant', data);
      setShowSpinner(false);
      setLoadedCoupons(data.coupons);
      setName(data.name);
      setLogoUrl(data.logoUrl);
    });
  };

  const redeemConfirm = selectedCoupon => {
    setCoupon(selectedCoupon);
    setVisible(true);
  };

  const redeem = coupon => {
    redeemCoupon(coupon.code)
      .then(success => {
        setVisible(false);
        console.log('NOB successfully redeemed', success);
        loadMerchant(merchantId);
      })
      .catch(err => {
        console.log(err);
        showError(err);
      });
  };

  const showError = message => {
    setVisible(false);
    Alert.alert('NOB Redemption Failed', message);
  };

  useEffect(() => {
    console.log('Got param merchantId: ', merchantId);
    if (merchantId) {
      loadMerchant(merchantId);
    }
  }, [merchantId]);

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
        {showSpinner && (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        )}
        {!showSpinner && (
          <>
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
                <Text
                  category="h4"
                  style={styles.merchantHeader}
                  status="primary">
                  {name}
                </Text>
              </View>
            </View>
            <ScrollView style={styles.scrollView}>
              {loadedCoupons.map(coupon => (
                <Coupon
                  data={coupon}
                  key={coupon.code}
                  confirm={redeemConfirm}
                />
              ))}
            </ScrollView>
          </>
        )}
      </Layout>
    </SafeAreaView>
  );
}

export default MerchantCoupons;
