import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Input, Button, Layout} from '@ui-kitten/components';

const styles = StyleSheet.create({
  textCode: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    height: 60,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  goBtn: {
    borderRadius: 10,
    textTransform: 'uppercase',
    padding: 15,
  },
  couponCode: {
    flexBasis: '80asd%',
    marginEnd: 10,
  },
});

export const QRCodeIcon = props => <Icon name="scan1" {...props} />;
export const GiftIcon = props => <Icon name="tags" size="large" {...props} />;

const ScanInputBar = ({scan}) => {
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [coupon, setCoupon] = useState();

  return (
    <Layout
      style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={styles.textCode}>
        <Input
          accessoryLeft={GiftIcon}
          style={styles.couponCode}
          placeholder="Enter coupon code"
          value={coupon}
          onChangeText={text => {
            if (text) {
              setCoupon(text);
              setIsCodeEntered(true);
            } else {
              setCoupon(text);
              setIsCodeEntered(false);
            }
          }}
        />
        <Button size="small" style={styles.goBtn}>
          Go
        </Button>
      </View>

      <Button
        disabled={isCodeEntered}
        status={isCodeEntered ? 'basic' : 'primary'}
        size="giant"
        style={{height: 60, marginVertical: 10}}
        appearance="ghost"
        onPress={() => scan()}
        accessoryLeft={QRCodeIcon}
      />
    </Layout>
  );
};

export default ScanInputBar;
