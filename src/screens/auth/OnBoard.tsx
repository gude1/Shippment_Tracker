import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import colors from '../../constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../components/Button';
import {useContext, useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {ARROW_BACK_SVG} from '../../constants/svg';
import {showMessage} from 'react-native-flash-message';
import Input from '../../components/Input';
import {validateEmail, validateFilled, validateUrl} from '../../utils/validate';
import {logUserIn} from '../../api/login';
import {LoginResponse} from '../../types/login';
import {UserContext} from '../../context/UserContext';

type OnBoardScreenProps = NativeStackScreenProps<AuthStackParamList, 'OnBoard'>;

const OnBoard = ({navigation, route}: OnBoardScreenProps) => {
  const refRBSheet = useRef<any>(null);
  const [url, setUrl] = useState('');
  const [userTxt, setUserTxt] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const context = useContext(UserContext);

  const returnIsBtnDisabled = () => {
    return !userTxt || !url || !password;
  };

  const logIn = async () => {
    try {
      let urlerr = validateUrl(url);
      let userTxtErr = validateEmail(userTxt);
      let passerr = validateFilled(password);
      if (urlerr) {
        Alert.alert('Url Input is not valid');
        return;
      }
      if (userTxtErr) {
        Alert.alert('Email Input is not valid');
        return;
        return;
      }
      if (passerr) {
        Alert.alert('Password Input is not valid');
        return;
      }

      setProcessing(true);
      const result = await logUserIn({
        usr: userTxt,
        pwd: password,
      });

      if (result?.error) {
        Alert.alert(result?.error);
        return;
      }
      context?.setUser({full_name: result.full_name || ''});
    } catch (err) {
      Alert.alert('Request failed please try again');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <View style={styles.section}>
        <Image
          source={require('../../assets/images/logo-white.png')}
          style={styles.img}
        />
      </View>

      <View style={styles.section}>
        <Button
          onPress={() => {
            refRBSheet?.current?.open();
          }}
          containerStyle={styles.buttonCtn}
          style={styles.button}
          title="Login"
          titleStyle={styles.buttonTitle}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        onOpen={() => {}}
        draggable
        customStyles={{
          wrapper: styles.bottomSheetWraper,
          container: styles.bottomSheetCtn,
          draggableIcon: styles.bottomSheetDraggableIcon,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => refRBSheet?.current?.close()}>
          <View style={styles.bottomSheetBackBtn}>
            <SvgXml xml={ARROW_BACK_SVG} />
            <Text style={styles.bottomSheetBackBtnTxt}>Cancel</Text>
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{minHeight: '88%'}}>
            <Text style={styles.loginTxt}>Login</Text>
            <Text style={styles.descTxt}>
              Please enter your First, Last name and your phone number in order
              to register
            </Text>

            <Input
              label="URL"
              textContentType="URL"
              keyboardType="url"
              style={styles.inputCtn}
              value={url}
              onChangeText={txt => {
                setUrl(txt);
              }}
            />

            <Input
              label="Username/Email"
              style={styles.inputCtn}
              value={userTxt}
              onChangeText={txt => {
                setUserTxt(txt);
              }}
            />

            <Input
              label="Password"
              textContentType="password"
              style={styles.inputCtn}
              secureTextEntry
              value={password}
              onChangeText={txt => {
                setPassword(txt);
              }}
            />
          </View>

          <Button
            title="Login"
            onPress={logIn}
            containerStyle={{alignSelf: 'center'}}
            loadng={processing}
            disabled={returnIsBtnDisabled() || processing}
          />
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  section: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  img: {
    width: 207,
    height: 36,
  },
  buttonCtn: {
    marginBottom: 32,
  },
  button: {
    backgroundColor: 'white',
  },
  buttonTitle: {
    color: colors.primary,
  },
  bottomSheetWraper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheetCtn: {
    borderTopLeftRadius: 20,
    minHeight: 320,
    height: '95%',
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
  bottomSheetDraggableIcon: {
    backgroundColor: '#A7A3B3',
  },
  bottomSheetBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetBackBtnTxt: {
    color: colors.primary,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 17,
    marginLeft: 6,
    letterSpacing: -0.4,
    lineHeight: 22,
  },
  loginTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 34,
    color: 'black',
    marginTop: 8,
    lineHeight: 41,
  },
  descTxt: {
    color: '#757281',
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 17,
    marginTop: 10,
    letterSpacing: -0.14,
    lineHeight: 24,
  },
  inputCtn: {
    marginTop: 30,
  },
});
