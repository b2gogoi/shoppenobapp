import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';

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
  },
  merchantDetails: {
    flexBasis: '80%',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerText: {
    color: '#AFA7A7',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  logo: {
    resizeMode: 'contain',
    height: 80,
  },
});

const MerchantCard = ({merchant}) => {
  const {name, location, offer, logoUrl} = merchant;

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
          <Text style={styles.offerText}>{offer}</Text>
        </View>
      </View>
    </View>
  );
};

export default MerchantCard;
