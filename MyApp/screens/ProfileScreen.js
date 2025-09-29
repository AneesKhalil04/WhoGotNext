// ...existing code...
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const primaryAccent = '#00FFFF';
const secondaryAccent = '#A020F0';
const fontFamily = 'Poppins';

const user = {
  name: 'Saim Siddique',
  username: '@saim',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Ball is life. Always down for pickup games.',
  stats: {
    played: 12,
    hosted: 4,
    friends: 20,
  },
  badges: ['Shooter', 'Playmaker'],
  xp: 65,
};

const upcomingGames = [
  {
    id: 'g1',
    sport: 'Basketball',
    location: 'Court 2',
    dateTime: 'Today 6:00 PM',
  },
  {
    id: 'g2',
    sport: 'Soccer',
    location: 'Central Turf',
    dateTime: 'Tomorrow 4:00 PM',
  },
];

const friends = [
  { id: 'f1', name: 'name', avatar: '' },
  { id: 'f2', name: 'name', avatar: '' },
  { id: 'f3', name: 'name', avatar: '' },
  { id: 'f4', name: 'name', avatar: '' },
];

function Badge({ label }) {
  return (
    <View style={styles.badgePill}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function XPBar({ percent }) {
  return (
    <View style={styles.xpBarContainer}>
      <Text style={styles.xpLabel}>XP</Text>
      <View style={styles.xpBarBg}>
        <LinearGradient
          colors={[primaryAccent, secondaryAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.xpBarFill, { width: `${percent}%` }]}
        />
      </View>
    </View>
  );
}

function GameCardSmall({ item }) {
  return (
    <View style={styles.gameCardSmall}>
      <Text style={styles.gameCardTitle}>{item.sport}</Text>
      <Text style={styles.gameCardInfo}>{item.location} · {item.dateTime}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Ionicons name="create-outline" size={28} color={primaryAccent} />
        </TouchableOpacity>
      </View>

      {/* Top Profile Section */}
      <View style={styles.profileTopSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarImg} />
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileUsername}>{user.username}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{user.stats.played}</Text>
            <Text style={styles.statLabel}>Games Played</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{user.stats.hosted}</Text>
            <Text style={styles.statLabel}>Games Hosted</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{user.stats.friends}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
        </View>

        {/* Badges & XP */}
        <View style={styles.badgesRow}>
          {user.badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </View>
        <XPBar percent={user.xp} />
      </View>

      {/* About Me */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <View style={styles.bioBox}>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>
      </View>

      {/* Upcoming Games */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Upcoming Games</Text>
        <FlatList
          data={upcomingGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCardSmall item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>

      {/* Friends */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.friendCol}>
              <View style={styles.friendAvatar} />
              <Text style={styles.friendName}>{item.name}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>

      {/* Floating Settings Button */}
      <TouchableOpacity style={styles.settingsBtn}>
        <Ionicons name="settings-outline" size={28} color={secondaryAccent} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily,
  },
  headerIconBtn: {
    padding: 6,
    borderRadius: 20,
  },
  profileTopSection: {
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: 20,
    backgroundColor: '#222',
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarWrapper: {
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: primaryAccent,
    padding: 2,
    backgroundColor: '#222',
    shadowColor: secondaryAccent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
  },
  profileName: {
    color: primaryAccent,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily,
    marginBottom: 2,
  },
  profileUsername: {
    color: '#aaa',
    fontSize: 14,
    fontFamily,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    fontFamily,
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  badgePill: {
    borderWidth: 1.5,
    borderColor: secondaryAccent,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginHorizontal: 4,
    backgroundColor: '#111',
  },
  badgeText: {
    color: primaryAccent,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily,
  },
  xpBarContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 8,
  },
  xpLabel: {
    color: primaryAccent,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily,
    marginBottom: 2,
    marginLeft: 2,
  },
  xpBarBg: {
    width: '100%',
    height: 14,
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: secondaryAccent,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 8,
    shadowColor: secondaryAccent,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionBlock: {
    marginHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: primaryAccent,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily,
    marginBottom: 8,
  },
  bioBox: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  bioText: {
    color: '#fff',
    fontSize: 15,
    fontFamily,
  },
  gameCardSmall: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
    marginRight: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  gameCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily,
    marginBottom: 2,
  },
  gameCardInfo: {
    color: '#aaa',
    fontSize: 12,
    fontFamily,
  },
  friendCol: {
    alignItems: 'center',
    marginRight: 4,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: secondaryAccent,
    marginBottom: 4,
  },
  friendName: {
    color: '#fff',
    fontSize: 13,
    fontFamily,
  },
  settingsBtn: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#222',
    borderRadius: 24,
    padding: 10,
    shadowColor: secondaryAccent,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
