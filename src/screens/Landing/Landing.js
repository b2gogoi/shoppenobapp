import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';

import ScanInputBar from './components/ScanInputBar';
import MerchantCard from './components/MerchantCard';
import {getCouponsSummary} from '../../api/couponService';
import {sortByCol} from '../../utils';

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
});

const Landing = ({navigation, route}) => {
  const [coupons, setCoupons] = useState([]);
  const go = code => {
    console.log('Code: ', code);
    navigation.navigate('CouponLoaded', {code});
  };
  /* const arry = [
    {
      name: 'Thirdwave Coffee',
      location: 'HSR Layout',
      offer: 'Flat 15% off on all orders',
      logoUrl:
        'https://cdn.shopify.com/s/files/1/1834/9395/files/TWLOGO_x100@2x.png?v=1620894734',
    },
    {
      name: 'The Sunway Manor Hotel',
      location: 'Pondicherry',
      offer: 'Deluxe rooms at flat rate of Rs 1000 for August 2021',
      logoUrl: 'https://thesunwaymanor.com/image/Sunwaylogo.png',
    },
  ]; */
  useEffect(() => {
    getCouponsSummary().then(data => {
      console.log('Got data', data);
      setCoupons(sortByCol(data, 'expiryDate'));
    });
  }, []);
  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <ScanInputBar scan={() => navigation.navigate('Scan')} go={go} />
        <Divider />

        <Text style={styles.text}>Your offers:</Text>

        <ScrollView style={styles.scrollView}>
          {coupons.map((merchant, i) => (
            <MerchantCard merchant={merchant} key={i} />
          ))}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default Landing;
