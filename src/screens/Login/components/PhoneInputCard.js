import React, {useState, useEffect} from 'react';
import {Alert, TextInput, View, StyleSheet} from 'react-native';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {storeData, getData} from '../../../storage/storageService';

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
});

const PhoneInputCard = ({verify}) => {
  const [phone, setPhone] = useState('init');
  const [otpSent, setOtpSent] = useState(false);

  const validatePhone = text => {
    if (text.length === 10) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getData().then(data => {
      console.warn(data);
      setPhone(data);
    });
  }, []);

  return (
    <>
      <View>
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
          size="large "
          style={{
            height: 40,
            width: 200,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        {/* <TextInput
          dataDetectorTypes="phoneNumber"
          

          onChangeText={text => {
            if (validatePhone(text)) {
              setPhone(text);
            } else {
              setPhone();
            }
          }}
          
          value={phone}
          
          placeholder="Enter your mobile number"
        /> */}
        {/* <Button title="Verify" /> */}
        {!otpSent && (
          <Button
            disabled={!phone}
            color="#f194ff"
            onPress={() => {
              setOtpSent(true);
              storeData(phone);
            }}>
            Submit
          </Button>
        )}
      </View>
      {otpSent && (
        <View>
          <OTPInputView
            style={{width: '80%', height: 200}}
            pinCount={4}
            code="2213"
            autoFocusOnLoad={true}
            // codeInputFieldStyle={styles.borderStyleBase}
            // codeInputHighlightStyle={styles.borderStyleHighLighted}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          {/* <TextInput
            style={{
              height: 40,
              width: 20,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            keyboardType="numeric"
          /> */}
          {/* <TextInput
            style={{
              height: 40,
              width: 20,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={{
              height: 40,
              width: 20,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={{
              height: 40,
              width: 20,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            keyboardType="numeric"
          /> */}

          <Button onPress={() => verify()}>Verify</Button>
        </View>
      )}
    </>
  );
};

export default PhoneInputCard;
