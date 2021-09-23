import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Button, Layout, Spinner} from '@ui-kitten/components';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 15,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 160,
  },
  contentLoading: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 216,
  },
  footerContainer: {
    height: 50,
  },
  footerControl: {
    margin: 10,
  },
  hintText: {fontStyle: 'italic', fontWeight: '400'},
  codeText: {justifyContent: 'center', flexDirection: 'row'},
  confirmText: {fontSize: 24, fontWeight: '300'},
  rowCenter: {justifyContent: 'center', flexDirection: 'row'},
  rowEnd: {justifyContent: 'flex-end', flexDirection: 'row'},
});

const Footer = props => {
  return (
    <View {...props} style={[props.style, styles.footerContainer]}>
      {!props.isRedeeming && (
        <View style={styles.rowEnd}>
          <Button
            style={styles.footerControl}
            size="small"
            status="basic"
            appearance="outline"
            onPress={props.cancel}>
            CANCEL
          </Button>
          <Button
            style={styles.footerControl}
            size="small"
            onPress={props.redeemCoupon}>
            YES
          </Button>
        </View>
      )}
      {props.isRedeeming && (
        <View style={styles.rowCenter}>
          <Spinner size="medium" />
        </View>
      )}
    </View>
  );
};

const RedeemConfirm = props => {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const redeemCoupon = () => {
    setIsRedeeming(true);
    props.redeem(props.coupon);
  };

  return (
    <Card
      style={styles.card}
      disabled={true}
      footer={() => Footer({...props, redeemCoupon, isRedeeming})}
      name="ok">
      <Layout style={styles.content}>
        <View>
          <Text category="s1" style={styles.confirmText}>
            Are you sure you want to redeem this NOB?
          </Text>
        </View>
        <View style={styles.codeText}>
          <Text category="h4">{props.coupon.code}</Text>
        </View>
        <View style={{width: 280}}>
          <Text category="s2" appearance="hint" style={styles.hintText}>
            {isRedeeming
              ? 'Redeeming NOB ...'
              : 'Please ensure that you made the purchase'}
          </Text>
        </View>
      </Layout>
    </Card>
  );
};

export default RedeemConfirm;
