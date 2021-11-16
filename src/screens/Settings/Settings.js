import React, {useState, useEffect} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {Layout, Icon, Text, Divider} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';
import {getSettings} from '../../api/generalService';
import {set} from 'date-fns';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  scrollView: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 140,
    marginBottom: 100,
  },
  text: {
    color: '#AFA7A7',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginHorizontal: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.5,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  logo: {
    marginHorizontal: 16,
  },
  setting: {
    padding: 16,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const OptionsIcon = props => (
  <Icon name="options-2-outline" size="small" {...props} pack="eva" />
);

const SettingRow = props => {
  const {style, hint, children, ...touchableOpacityProps} = props;

  return (
    <>
      <TouchableOpacity
        // activeOpacity={1.0}
        {...touchableOpacityProps}
        style={[styles.settingContainer, style]}>
        <Text category="s2">{hint}</Text>
        {children}
      </TouchableOpacity>
      <Divider />
    </>
  );
};

const Settings = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [settingsData, setSettingsData] = useState([]);

  useEffect(() => {
    getSettings().then(data => {
      console.log('Got data', data);
      setSettingsData(data);
      setShowSpinner(false);
    });
  }, []);
  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <Spinner
          visible={showSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {settingsData.length > 0 &&
          settingsData.map(setting => (
            <View key={setting.name}>
              <SettingRow
                style={styles.setting}
                hint={setting.name}
                onPress={() => Linking.openURL(setting.url)}
              />
              <Divider />
            </View>
          ))}
      </Layout>
    </SafeAreaView>
  );
};

export default Settings;
