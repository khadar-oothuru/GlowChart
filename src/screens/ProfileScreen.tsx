import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../context/AppContext';

interface ProfileItemProps {
  iconName: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  isLast?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  iconName,
  title,
  subtitle,
  onPress,
  showArrow = true,
  isLast = false,
}) => (
  <TouchableOpacity
    style={[
      styles.profileItem,
      isLast && styles.profileItemLast,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.profileItemLeft}>
      <MaterialIcon
        name={iconName}
        size={24}
        color={iconName === 'logout' ? '#888' : '#888'}
        style={styles.profileItemIcon}
      />
      <View style={styles.profileItemText}>
        <Text style={[styles.profileItemTitle, title === 'Log Out' && {color: '#FF6B6B'}]}>{title}</Text>
        {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {showArrow && (
      <MaterialIcon name="chevron-right" size={28} color="#000" />
    )}
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const {dispatch} = useAppContext();
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.moreIconContainer} activeOpacity={0.7} onPress={() => {}}>
          <MaterialIcon name="dots-horizontal" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.userInfoCard}>
          <View style={styles.userInfoLeft}>
            <View style={styles.avatarContainer}>
                    <Image
                      source={{uri: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=2417&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                      style={styles.avatar}
                      // onError handler removed: not applicable in functional component
                    />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Olivia</Text>
              <Text style={styles.userEmail}>Olivia@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialIcon name="square-edit-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* First Menu Card: Address to Notifications */}
        <View style={styles.menuContainer}>
                <ProfileItem
                  iconName="map-marker-outline"
                  title="Address"
                  subtitle="Manage your saved address"
                  onPress={() => showComingSoon('Address Management')}
                />
                <ProfileItem
                  iconName="package-variant-closed"
                  title="Order History"
                  subtitle="View your past orders"
                  onPress={() => showComingSoon('Order History')}
                />
          <ProfileItem
            iconName="web"
            title="Language"
            onPress={() => showComingSoon('Language Settings')}
          />
          <ProfileItem
            iconName="bell-outline"
            title="Notifications"
            onPress={() => showComingSoon('Notification Settings')}
            isLast={true}
          />
        </View>

        {/* Second Menu Card: Contact Us to Terms and Conditions */}
        <View style={styles.menuContainer}>
          <ProfileItem
            iconName="phone-outline"
            title="Contact Us"
            onPress={() => showComingSoon('Contact Support')}
          />
          <ProfileItem
            iconName="help-circle-outline"
            title="Get Help"
            onPress={() => showComingSoon('Help Center')}
          />
          <ProfileItem
            iconName="shield-outline"
            title="Privacy Policy"
            onPress={() => showComingSoon('Privacy Policy')}
          />
        <ProfileItem
          iconName="file-document-outline"
          title="Terms and Conditions"
          onPress={() => showComingSoon('Terms & Conditions')}
        />
        <ProfileItem
          iconName="logout"
          title="Log Out"
          onPress={handleLogout}
          showArrow={false}
          isLast={true}
        />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FFEDE8',
  },
  moreIconContainer: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 10, // reduced from 20
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // No shadow or elevation for flat look
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16, // reduced from 30
    // No shadow or elevation for flat look
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  profileItemLast: {
    borderBottomWidth: 0,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemIcon: {
    marginRight: 16,
  },
  profileItemText: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
  },
});

export default ProfileScreen;
