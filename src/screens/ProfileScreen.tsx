import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {useAppContext} from '../context/AppContext';

interface ProfileItemProps {
  icon: string;
  title: string;
  onPress?: () => void;
}

const ProfileItem: React.FC<ProfileItemProps> = ({icon, title, onPress}) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemLeft}>
      <Text style={styles.profileItemIcon}>{icon}</Text>
      <Text style={styles.profileItemTitle}>{title}</Text>
    </View>
    <Text style={styles.profileItemArrow}>›</Text>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const {state, dispatch} = useAppContext();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch({type: 'LOGOUT'});
            navigation.navigate('Onboarding');
          },
        },
      ],
    );
  };

  const showComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} feature will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>{state.user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{state.user?.email || 'user@example.com'}</Text>
        </View>

        <View style={styles.menuSection}>
          <ProfileItem
            icon="📍"
            title="Address"
            onPress={() => showComingSoon('Address Management')}
          />
          <ProfileItem
            icon="📦"
            title="Order History"
            onPress={() => showComingSoon('Order History')}
          />
          <ProfileItem
            icon="🌐"
            title="Language"
            onPress={() => showComingSoon('Language Settings')}
          />
          <ProfileItem
            icon="🔔"
            title="Notifications"
            onPress={() => showComingSoon('Notification Settings')}
          />
        </View>

        <View style={styles.menuSection}>
          <ProfileItem
            icon="📞"
            title="Contact Us"
            onPress={() => showComingSoon('Contact Support')}
          />
          <ProfileItem
            icon="❓"
            title="Get Help"
            onPress={() => showComingSoon('Help Center')}
          />
          <ProfileItem
            icon="🔒"
            title="Privacy Policy"
            onPress={() => showComingSoon('Privacy Policy')}
          />
          <ProfileItem
            icon="📋"
            title="Terms & Conditions"
            onPress={() => showComingSoon('Terms & Conditions')}
          />
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  userInfoSection: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  profileItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profileItemArrow: {
    fontSize: 20,
    color: '#CCC',
    fontWeight: '300',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ProfileScreen;
