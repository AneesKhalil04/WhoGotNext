import React, { useRef, useState } from 'react';
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

const sportEmojis = {
  Basketball: '🏀',
  Soccer: '⚽',
  'Flag Football': '🏈',
};

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

const sports = ['All', 'Basketball', 'Soccer', 'Flag Football'];

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
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={styles.emoji}>{sportEmojis[item.sport] || '🎲'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sport}>{item.sport}</Text>
          <Text style={styles.info}>
            {item.location} · {item.dateTime}
          </Text>
        </View>
        <View style={styles.avatars}>
          {item.roster.map((user) => (
            <Image
              key={user.id}
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function App() {
  const [selectedSport, setSelectedSport] = useState('All');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleGamePress = (gameId) => {
    alert('Go to Game Detail for game ' + gameId);
  };

  const handleCreateGame = () => {
    alert('Open Create Game form');
  };

  const joinedGames = mockGames.filter((g) => !g.createdBy);
  const createdGames = mockGames.filter((g) => g.createdBy === 'me');

  // filter by sport if not "All"
  const filterBySport = (games) =>
    selectedSport === 'All' ? games : games.filter((g) => g.sport === selectedSport);

  const sections = [
    { title: 'Joined Games', data: filterBySport(joinedGames) },
    { title: 'Created Games', data: filterBySport(createdGames) },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSlab}></View>
      <View style={{ height: 64 }} />

      <Text style={styles.header}>My Games</Text>
      <Text style={styles.subheader}>
        Quick access to games you’ve joined or created
      </Text>

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
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard item={item} onPress={() => handleGamePress(item.id)} />
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
    backgroundColor: '#111111',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  topSlab: {
    backgroundColor: '#222',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    shadowColor: '#222831',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  header: {
    color: '#00FFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subheader: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
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
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#00FFFF',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 36,
    marginRight: 16,
  },
  sport: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 2,
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#111',
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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
    shadowColor: '#00FFFF',
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
  },
});
