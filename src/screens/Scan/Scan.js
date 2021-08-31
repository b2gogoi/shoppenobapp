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
});

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
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>Scan the QR code on your coupon.</Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable} onPress={cancel}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Scan;
