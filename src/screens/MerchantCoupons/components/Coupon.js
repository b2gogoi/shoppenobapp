import React, {useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';

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
    padding: 10,
    width: 130,
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
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
  const {code, status, location, offer, online} = data;
  const [currentStatus, setCurrentStatus] = useState(status);

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
            {location.name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: -6}}>
            <Button
              status="basic"
              size="tiny"
              accessoryLeft={PhoneIcon}
              appearance="ghost"
              onPress={() => Linking.openURL(`tel:${location.phone}`)}
            />
            {location.whatsapp && (
              <Button
                size="tiny"
                status="basic"
                accessoryLeft={WhatsappIcon}
                appearance="ghost"
                onPress={() =>
                  Linking.openURL(`whatsapp://send?phone=${location.whatsapp}`)
                }
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.offer}>
        <Text style={styles.offerText}>{offer.text}</Text>
        <View style={styles.offerMicro}>
          <Text category="s2" style={styles.conditionText}>
            {offer.conditions}
          </Text>
          <Text category="s2" style={styles.validityText}>
            Validity: {offer.validity.from} to {offer.validity.to}
          </Text>
        </View>
      </View>
      <View style={styles.btnRow}>
        {status === 'active' && (
          <Button
            size="small"
            style={styles.btn}
            accessoryLeft={CheckIcon}
            onPress={() => confirm(data)}>
            <Text appearance="alternative" style={styles.btnText}>
              Redeem
            </Text>
          </Button>
        )}
        {status === 'expired' && (
          <View style={styles.expiredChip}>
            <Text appearance="alternative" style={styles.btnText}>
              Expired
            </Text>
          </View>
        )}
        {status === 'redeemed' && (
          <View style={styles.redeemedChip}>
            <Text appearance="alternative" style={styles.btnText}>
              Redeemed
            </Text>
          </View>
        )}
        {online && (
          <Button
            size="small"
            appearance="ghost"
            accessoryRight={LinkIcon}
            onPress={() => Linking.openURL(`${online.url}${code}`)}>
            <Text style={styles.linkText}>Copy code & shop online</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Coupon;
