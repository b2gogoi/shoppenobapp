import React, {useState, useEffect, useRef} from 'react';
import {Alert, TextInput, View, StyleSheet} from 'react-native';
import {Layout, Text, Input, Button, Spinner} from '@ui-kitten/components';
import OTPTextView from 'react-native-otp-textinput';

import {storeData, getData} from '../../../storage/storageService';
import {requestOTP} from '../../../api/authService';

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  otpBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInputContainer: {
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

const PhoneInputCard = ({verify}) => {
  const [phone, setPhone] = useState('init');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpPin, setOtpPin] = useState('2312');
  let otpInput = useRef(null);

  const validatePhone = text => {
    if (text.length === 10) {
      return true;
    }
    return false;
  };

  const showError = message => {
    Alert.alert('OTP generation failed', message);
  };

  const generate = phoneNumber => {
    setIsLoading(true);
    requestOTP(phoneNumber)
      .then(success => {
        setOtpSent(true);
        console.log('OTP sent successfully', success.message);
        storeData(phone);
        setIsLoading(false);
      })
      .catch(err => {
        setOtpSent(false);
        console.log(err);
        showError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData().then(data => {
      console.warn(data);
      setPhone(data);
    });
  }, []);

  return (
    <View>
      <View style={{marginBottom: 40}}>
        <Input
          placeholder="Enter your mobile number"
          value={phone}
          onChangeText={text => {
            // if (validatePhone(text)) {
            setPhone(text);
            // } else {
            // setPhone('');
            // }
            console.log('text', text);
          }}
          keyboardType="numeric"
          maxLength={10}
          editable={!otpSent}
          disabled={otpSent}
          textStyle={{fontSize: 33}}
          size="large"
          style={{
            height: 40,
            width: 240,
            borderColor: 'gray',
            // borderWidth: 1,
          }}
        />
        {!otpSent && !isLoading && (
          <View style={styles.otpBtn}>
            <Button
              disabled={!phone}
              color="#f194ff"
              onPress={() => {
                generate(phone);
              }}>
              Submit
            </Button>
          </View>
        )}

        {isLoading && (
          <View style={styles.otpBtn}>
            <Spinner size="medium" />
          </View>
        )}
      </View>
      {otpSent && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <OTPTextView
            ref={e => (otpInput = e)}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            handleTextChange={text => {
              setOtpPin(text);
            }}
            inputCount={4}
            keyboardType="numeric"
          />
          <Button
            size="giant"
            disabled={otpPin.length < 4}
            onPress={() => verify(otpPin)}
            style={{width: 120}}>
            Verify
          </Button>
        </View>
      )}
    </View>
  );
};

export default PhoneInputCard;
