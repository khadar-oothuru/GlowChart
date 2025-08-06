import React, {useState} from 'react';
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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {useAppContext} from '../context/AppContext';

const RegisterScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<any>();
  const {dispatch} = useAppContext();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock registration - in real app, create account
      dispatch({
        type: 'LOGIN',
        payload: {name: fullName, email: email},
      });
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Prompt moved below button */}
        <View style={styles.headerContainer}>
          <View style={styles.headerCard}>
            <Text style={styles.title}>Join The Glow!</Text>
          
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputInner}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
            <Icon name="account" size={24} color="#999" style={styles.iconRight} />
          </View>

          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputInner}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
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

          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputInner}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#999" style={styles.iconRight} />
            </TouchableOpacity>
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
            size="large"
          />
          {/* Already a Member prompt below button */}
          <View style={styles.topPromptContainer}>
            <Text style={styles.topPromptText}>
              Already a Member?{' '}
              <Text style={styles.topPromptLink} onPress={handleLogin}>
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topPromptContainer: {
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 150, // Increased margin for more space below button
  },
  topPromptText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  topPromptLink: {
    color: '#B84953',
    fontWeight: '600',
    // Removed underline
  },
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  content: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#F1b0b0',
    height: 170,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
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
  registerButton: {
    marginTop: 20,
    backgroundColor: '#B84953',
    borderRadius: 12,
    height: 56,
  },
  bottomContainer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  loginLink: {
    color: '#B84953',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
