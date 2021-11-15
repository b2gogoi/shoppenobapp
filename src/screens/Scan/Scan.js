import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  icon: {width: 44, height: 44, tintColor: 'grey'},
});

export const BackIcon = props => (
  <Icon
    name="arrow-circle-left-outline"
    {...props}
    pack="eva"
    style={styles.icon}
  />
);

const Scan = ({navigation, route}) => {
  const onSuccess = e => {
    navigation.navigate('Landing', {
      scannedCode: e.data,
    });
  };

  const cancel = e => {
    navigation.navigate('Landing');
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>Scan the QR code on your NOB.</Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable} onPress={cancel}>
          <Button
            status={'basic'}
            size="giant"
            appearance="ghost"
            onPress={() => cancel()}
            accessoryLeft={BackIcon}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default Scan;
