import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';
import {format} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderWidth: 1,
    borderColor: '#AFA7A7',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    // borderWidth: 1,
    flexBasis: '20%',
    padding: 8,
  },
  merchantDetails: {
    flexBasis: '80%',
    padding: 8,
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offer: {
    // borderWidth: 1,
    // borderColor: '#AFA7A7',
    flexDirection: 'row',
    height: 36,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  offerText: {
    color: '#AFA7A7',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  logo: {
    resizeMode: 'cover',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: '#AFA7A7',
    borderRadius: 6,
  },
  more: {
    // borderWidth: 1,
    // borderColor: '#AFA7A7',
    flexDirection: 'row',
    height: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -4,
  },
  moreText: {
    color: '#1DA57F',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  expiresText: {
    color: '#CE2F2F',
    fontSize: 10,
    fontWeight: '300',
  },
});

const MerchantCard = ({merchant}) => {
  const {name, location, desc, logoUrl, count, expiryDate, merchantId} =
    merchant;

  return (
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
        <View style={styles.row}>
          <Text category="s1" style={{color: '#655A5A', fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text category="s2" style={{color: '#655A5A'}}>
            {location}
          </Text>
        </View>
        <View style={styles.offer}>
          <Text style={styles.offerText}>{desc}</Text>
        </View>
        <View style={styles.more}>
          <Text category="s2" style={styles.expiresText}>{`Expires: ${format(
            expiryDate,
          )}`}</Text>
          {count > 1 && (
            <Text category="label" style={styles.moreText} appearance="hint">
              {`+${count - 1} more coupon${count > 2 ? 's' : ''}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MerchantCard;
