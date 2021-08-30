import React, {useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import {format} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    height: 164,
    borderWidth: 1,
    borderColor: '#AFA7A7',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  offer: {
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // borderWidth: 1,
  },
  offerText: {
    color: '#AFA7A7',
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 28,
  },
  code: {
    flexBasis: '50%',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  codeText: {
    color: '#655A5A',
    fontWeight: 'bold',
  },
  conditionText: {
    color: '#655A5A',
    fontStyle: 'italic',
    fontWeight: '200',
    fontSize: 10,
  },
  validityText: {
    color: '#655A5A',
    fontWeight: '400',
    fontSize: 10,
  },
  location: {
    fontWeight: 'bold',
    flexBasis: '50%',
    backgroundColor: '#655A5A',
    borderTopRightRadius: 9,
    padding: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offerMicro: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 24,
    width: '100%',
    // borderWidth: 1,
  },
  btnRow: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    height: 44,
    width: '100%',
    // borderWidth: 1,
  },
  btn: {
    borderRadius: 4,
    padding: 9,
    width: 130,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
  },
  linkText: {
    color: '#0E2560',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  expiredChip: {
    backgroundColor: '#C4C4C4',
    borderRadius: 4,
    padding: 9,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  redeemedChip: {
    backgroundColor: '#77B6FB',
    borderRadius: 4,
    padding: 9,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const CheckIcon = props => (
  <Icon name="checkcircle" size="large" {...props} />
);

export const WhatsappIcon = props => (
  <Icon name="wechat" size="large" {...props} />
);

export const LinkIcon = props => (
  <Icon name="external-link-outline" size="small" {...props} pack="eva" />
);

export const PhoneIcon = props => <Icon name="phone" size="large" {...props} />;

const Coupon = ({data, confirm}) => {
  const {
    code,
    couponStatus,
    location,
    desc,
    online,
    phone,
    whatsapp,
    conditions,
    redemptionDate,
    validityStart,
    validity,
    weblink,
  } = data;
  const [currentStatus, setCurrentStatus] = useState(couponStatus);

  const isEarly = new Date().getTime() < new Date(validityStart).getTime();
  let days = 'from tommorrow';

  if (isEarly) {
    let diff = new Date(validityStart).getTime() - new Date().getTime();
    let n = Math.ceil(diff / (24 * 60 * 60 * 1000));
    if (n > 1) {
      days = `in ${n} days`;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.code}>
          <Text category="s2" style={styles.codeText}>
            {code}
          </Text>
        </View>
        <View style={styles.location}>
          <Text category="s2" appearance="alternative">
            {location}
          </Text>
          <View style={{flexDirection: 'row', marginTop: -6}}>
            <Button
              status="basic"
              size="tiny"
              accessoryLeft={PhoneIcon}
              appearance="ghost"
              onPress={() => Linking.openURL(`tel:${phone}`)}
            />
            {whatsapp && (
              <Button
                size="tiny"
                status="basic"
                accessoryLeft={WhatsappIcon}
                appearance="ghost"
                onPress={() =>
                  Linking.openURL(`whatsapp://send?phone=${whatsapp}`)
                }
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.offer}>
        <Text style={styles.offerText}>{desc}</Text>
        <View style={styles.offerMicro}>
          <Text category="s2" style={styles.conditionText}>
            {conditions}
          </Text>
          <Text category="s2" style={styles.validityText}>
            Validity:
            {validity
              .split(' to ')
              .map(dt => format(dt))
              .join(' to ')}
          </Text>
        </View>
      </View>
      <View style={styles.btnRow}>
        {couponStatus === 'ASSIGNED' && (
          <Button
            disabled={isEarly ? true : false}
            size="small"
            style={styles.btn}
            accessoryLeft={CheckIcon}
            onPress={() => confirm(data)}>
            <Text appearance="alternative" style={styles.btnText}>
              REDEEM
            </Text>
          </Button>
        )}

        {couponStatus === 'ASSIGNED' && isEarly && (
          <View style={{paddingTop: 10}}>
            <Text
              appearance="hint"
              status="danger"
              style={{fontStyle: 'italic', fontWeight: '300'}}>
              Offer starts {days}
            </Text>
          </View>
        )}

        {couponStatus === 'expired' && (
          <View style={styles.expiredChip}>
            <Text appearance="alternative" style={styles.btnText}>
              Expired
            </Text>
          </View>
        )}
        {couponStatus === 'REDEEMED' && (
          <View style={{paddingTop: 10}}>
            <Text appearance="alternative" status="success" category="s1">
              {couponStatus} on {format(redemptionDate)}
            </Text>
          </View>
        )}
        {online && (
          <Button
            size="small"
            appearance="ghost"
            accessoryRight={LinkIcon}
            onPress={() => Linking.openURL(`${weblink}${code}`)}>
            <Text style={styles.linkText}>Copy code & shop online</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Coupon;
