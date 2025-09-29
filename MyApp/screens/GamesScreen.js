import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  SectionList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { JoinedGamesContext } from './HomeScreen';

const sportAccents = {
  Basketball: '#FF9900',
  Soccer: '#00FF66',
  'Flag Football': '#FF3333',
};
const secondaryAccent = '#A020F0';

const mockGames = [
  {
    id: '1',
    sport: 'Basketball',
    location: 'Court 2',
    dateTime: 'Today 6:00 PM',
    roster: [
      { id: 'u1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 'u2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    ],
  },
  {
    id: '2',
    sport: 'Soccer',
    location: 'Central Turf',
    dateTime: 'Tomorrow 4:00 PM',
    roster: [
      { id: 'u3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ],
  },
  {
    id: '3',
    sport: 'Flag Football',
    location: 'Field 1',
    dateTime: 'Sat 2:00 PM',
    roster: [],
  },
  {
    id: 'c1',
    sport: 'Basketball',
    location: 'Main Gym',
    dateTime: 'Tomorrow 8:00 PM',
    roster: [
      { id: 'u4', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    ],
    createdBy: 'me',
  },
];

function GameCard({ item, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  // Safe guard for rosterPreview
  const rosterPreview = Array.isArray(item.roster) ? item.roster.slice(0, 3) : [];
  console.log('GameCard rosterPreview:', rosterPreview);

  return (
    <Animated.View
      style={[styles.card, { opacity: fade, transform: [{ scale }] }]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
        style={{ flexDirection: 'column', alignItems: 'stretch' }}
      >
        <View style={{ position: 'relative' }}>
          {/* Top and bottom gradient overlays in grey */}
          <LinearGradient
            colors={["#222", "#333", "#222"]}
            start={{ x: 0.1, y: 0.7 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientOverlay}
          />
          {/* Roster preview avatars */}
          <View style={styles.rosterPreview}>
            {(rosterPreview || []).map((user, i) => (
              <Image
                key={user.id}
                source={{ uri: user.avatar }}
                style={[styles.avatar, { left: i * 18, zIndex: 3 - i }]}
              />
            ))}
            {(!rosterPreview || rosterPreview.length === 0) && (
              <Text style={{ color: '#aaa', fontSize: 12 }}>No roster</Text>
            )}
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.sport}</Text>
          <Text style={[styles.sportTag, { backgroundColor: sportAccents[item.sport] || secondaryAccent }]}>{item.sport}</Text>
          <Text style={styles.info}>{item.location} · {item.dateTime}</Text>
        </View>
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinText}>View Game</Text>
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}

export default function App() {
  // Safe guard for joinedGames and createdGames
  const { joinedGames: rawJoinedGames } = useContext(JoinedGamesContext);
  const joinedGames = Array.isArray(rawJoinedGames) ? rawJoinedGames : [];
  const createdGames = Array.isArray(mockGames) ? mockGames.filter((g) => g.createdBy === 'me') : [];
  console.log('GamesScreen joinedGames:', joinedGames);
  console.log('GamesScreen createdGames:', createdGames);

  // Safe guard for sports
  const userSports = Array.isArray(joinedGames) && Array.isArray(createdGames)
    ? Array.from(new Set([...joinedGames, ...createdGames].map(g => g.sport)))
    : [];
  const sports = userSports.length > 0 ? userSports : ['Basketball', 'Soccer', 'Flag Football'];
  const [selectedSport, setSelectedSport] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  React.useEffect(() => {
    if (!selectedSport && sports.length > 0) setSelectedSport(sports[0]);
  }, [sports, selectedSport]);

  // filter by sport
  const filterBySport = (games) =>
    selectedSport ? games.filter((g) => g.sport === selectedSport) : games;

  // Safe guard for SectionList data
  const sections = [
    { title: 'Joined Games', data: Array.isArray(joinedGames) ? filterBySport(joinedGames) : [] },
    { title: 'Created Games', data: Array.isArray(createdGames) ? filterBySport(createdGames) : [] },
  ];
  console.log('GamesScreen sections:', sections);

  const handleGamePress = (gameId) => {
    alert('Go to Game Detail for game ' + gameId);
  };

  const handleCreateGame = () => {
    alert('Open Create Game form');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSlab}></View>
      {/* Removed My Games and WhoGotNext text as requested */}

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownBtn}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownBtnText}>{selectedSport}</Text>
        </TouchableOpacity>
        <Modal visible={dropdownVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownModal}>
              {sports.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedSport(sport);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownOptionText}>{sport}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* SectionList for both joined + created */}
      <SectionList
        sections={Array.isArray(sections) ? sections : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          item ? <GameCard item={item} onPress={() => handleGamePress(item.id)} /> : <Text style={{ color: '#aaa', fontSize: 12 }}>No game data</Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No games available.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={handleCreateGame}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 8,
    paddingVertical: 8,
  },
  header: {
    color: '#00FFFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    letterSpacing: 1,
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: '#111',
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  subheader: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: 'Poppins',
  },
  sectionHeader: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginLeft: 24,
    marginBottom: 8,
    marginTop: 8,
  },
  dropdownContainer: {
    marginBottom: 12,
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignItems: 'flex-start',
  },
  dropdownBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00FFFF',
    minWidth: 120,
  },
  dropdownBtnText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    minWidth: 180,
    elevation: 8,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownOptionText: {
    color: '#00FFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  rosterPreview: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: '#222',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  sportTag: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: -4,
  },
  info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  joinBtn: {
    backgroundColor: '#00FFFF',
    borderRadius: 32,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 0,
    width: '100%',
    shadowColor: secondaryAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  joinText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
    fontFamily: 'Poppins',
    textShadowColor: secondaryAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#00FFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: secondaryAccent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 10,
  },
  fabText: {
    color: '#111111',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Poppins',
  },
});