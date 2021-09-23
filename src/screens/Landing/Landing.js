import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Modal, Layout, Text, Divider} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';

import ScanInputBar from './components/ScanInputBar';
import MerchantCard from './components/MerchantCard';
import ActivatedCoupon from './components/ActivatedCoupon';
import {getCouponsSummary, loadCoupon} from '../../api/couponService';
import {sortByCol} from '../../utils';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  scrollView: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 140,
    marginBottom: 100,
  },
  text: {
    color: '#AFA7A7',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginHorizontal: 10,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const Landing = ({navigation, route}) => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState();
  const [visible, setVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [couponData, setCouponData] = useState();

  const loadOffers = () => {
    setShowSpinner(true);
    getCouponsSummary().then(data => {
      console.log('Got data', data);
      setCoupons(sortByCol(data, 'expiryDate'));
      setShowSpinner(false);
      setCouponData();
    });
  };

  const clear = () => {
    console.log('clear called');
    setShowSpinner(false);
    setCode('');
  };

  const showMerchantCoupons = merchantId => {
    navigation.navigate('MerchantCoupons', {
      merchantId,
    });
  };

  const go = useCallback(nobcode => {
    console.log('Code: ', nobcode);
    setShowSpinner(true);
    loadCoupon(nobcode)
      .then(data => {
        setCouponData(data);
        setVisible(true);
        // setIsCouponLoading(false);
      })
      .catch(err => {
        // setIsCouponLoading(false);
        Alert.alert('NOB activation failed!', err, [
          {
            text: 'Ok',
            onPress: () => {
              // setIsCouponLoading(false);
            },
            style: 'cancel',
          },
        ]);
      })
      .finally(() => {
        // setIsCouponLoading(false);
        clear();
      });
  }, []);

  useEffect(() => {
    loadOffers();
  }, []);

  useEffect(() => {
    if (route.params) {
      console.log('Got route.params ', route.params);
      let {scannedCode} = route.params;
      if (scannedCode) {
        console.log('Got scanned code: ', scannedCode);
        go(scannedCode);
      }
    }
  }, [go, route.params]);
  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <ActivatedCoupon
            data={couponData}
            cancel={() => {
              setVisible(false);
              clear();
              loadOffers();
            }}
          />
        </Modal>
        <ScanInputBar
          scan={() => navigation.navigate('Scan')}
          go={go}
          code={code}
          loading={isCouponLoading}
        />
        <Divider />
        <Text style={styles.text}>Your offers:</Text>
        <Spinner
          visible={showSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {/* {showSpinner && (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        )} */}
        {/* {!showSpinner && ( */}
        <ScrollView style={styles.scrollView}>
          {coupons.map(merchant => (
            <TouchableOpacity
              key={merchant.merchantId}
              onPress={e => showMerchantCoupons(merchant.merchantId)}>
              <MerchantCard merchant={merchant} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* )} */}
      </Layout>
    </SafeAreaView>
  );
};

export default Landing;
