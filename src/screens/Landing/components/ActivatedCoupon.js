import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Card, Text, Button, Layout, Spinner} from '@ui-kitten/components';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: height * 0.6,
    width: width * 0.8,
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
    // borderWidth: 1,
    borderColor: '#AFA7A7',
    borderRadius: 2,
  },
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  codeText: {
    marginTop: 10,
  },
  couponText: {
    marginVertical: 20,
  },
});

const ActivatedCoupon = ({data, cancel}) => {
  const {code, name, desc, logoUrl, location, validity, conditions} = data;
  return (
    <View style={styles.view}>
      <Text category="s1" status="success">
        Coupon is loaded successfully
      </Text>
      <Card>
        <Layout style={styles.layout}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: logoUrl,
              }}
            />
          </View>
          <View style={styles.codeText}>
            <Text category="h5" style={{color: '#655A5A', fontWeight: 'bold'}}>
              {name}
            </Text>
          </View>
          <View style={styles.location}>
            <Text category="s2">{location}</Text>
          </View>
          <View style={styles.codeText}>
            <Text
              category="s2"
              appearance="hint"
              style={{fontWeight: '400', fontSize: 18}}>
              {desc}
            </Text>
          </View>
          <View style={styles.couponText}>
            <Text category="s1">{code}</Text>
          </View>
          <View style={styles.codeText}>
            <Text category="s2" style={{color: '#655A5A', fontWeight: '500'}}>{validity}</Text>
          </View>
          <View>
            <Text category="s2" style={{color: '#655A5A', fontWeight: '300', fontStyle: 'italic'}}>{conditions}</Text>
          </View>
        </Layout>
      </Card>

      <Button onPress={cancel} appearance="outline">
        Ok
      </Button>
    </View>
  );
};

export default ActivatedCoupon;
