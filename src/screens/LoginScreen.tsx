import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

// Import the social login icons
import GoogleIcon from '../assets/google.png';
import AppleIcon from '../assets/apple.png';
import FacebookIcon from '../assets/facebook.png';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {useAppContext} from '../context/AppContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();
  const {dispatch} = useAppContext();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(async () => {
      setLoading(false);
      // Mock login - in real app, validate credentials
      const userData = {name: 'User', email: email};
      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      // Store user data in AsyncStorage
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } catch (e) {
        // handle error
      }
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCard}>
            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.subtitle}>Welcome back you've{'\n'}been missed.</Text>
            
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputInner}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email Id"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            <Icon name="email" size={24} color="#999" style={styles.iconRight} />
          </View>

          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputInner}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#999" style={styles.iconRight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>

          <Button
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
            size="large"
          />

          <View style={styles.socialContainer}>
            <View style={styles.orRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or Continue With</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButtonSquare}>
                <Image source={GoogleIcon} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButtonSquare}>
                <Image source={AppleIcon} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButtonSquare}>
                <Image source={FacebookIcon} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.registerText}>
              Not a Member?{' '}
              <Text style={styles.registerLink} onPress={handleRegister}>
                Register Now
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  content: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#F1b0b0',
    height: 230,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#B84953',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B84953',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 50,
  },
  inputCustom: {
    // unused, replaced by inputWithIcon/inputInner
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 64,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  inputInner: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 0,
    paddingHorizontal: 8,
    color: '#222',
    backgroundColor: 'transparent',
    height: 64,
  },
  iconRight: {
    marginLeft: 4,
    marginRight: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#B84953',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginBottom: 40,
    backgroundColor: '#B84953',
    borderRadius: 12,
    height: 56,
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 10,
    opacity: 0.5,
  },
  orText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 40,
  },
  socialButtonSquare: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffff',
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  bottomContainer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  registerLink: {
    color: '#B84953',
    fontWeight: '600',
    // Removed underline
  },
});

export default LoginScreen;
