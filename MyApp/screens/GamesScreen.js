

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.card, { opacity: fade, transform: [{ scale }] }]}> 
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={styles.emoji}>{sportEmojis[item.sport] || '🎲'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sport}>{item.sport}</Text>
          <Text style={styles.info}>{item.location} · {item.dateTime}</Text>
        </View>
        <View style={styles.avatars}>
          {item.roster.map(user => (
            <Image key={user.id} source={{ uri: user.avatar }} style={styles.avatar} />
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function GamesScreen() {
  const [selectedSport, setSelectedSport] = useState('All');

  const handleGamePress = (gameId) => {
    // TODO: navigate to GameDetailScreen with gameId
    alert('Go to Game Detail for game ' + gameId);
  };

  const handleCreateGame = () => {
    // TODO: open game creation form
    alert('Open Create Game form');
  };

  const filteredGames = selectedSport === 'All'
    ? mockGames
    : mockGames.filter(game => game.sport === selectedSport);

  return (
    <View style={styles.container}>
      {/* Top dark grey slab for Dynamic Island area */}
      <View style={styles.topSlab}></View>
      {/* Spacer to push content below the top slab */}
      <View style={{ height: 64 }} />
      {/* All content below the top slab */}
      <Text style={styles.header}>My Games</Text>
      <Text style={styles.subheader}>Quick access to games you’ve joined or created</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedSport}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSport(itemValue)}
          dropdownIconColor="#00FFFF"
        >
          {sports.map(sport => (
            <Picker.Item label={sport} value={sport} key={sport} />
          ))}
        </Picker>
      </View>
      {/* Sections for Joined and Created Games (placeholder) */}
      <Text style={styles.sectionHeader}>Joined Games</Text>
      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id}
        renderItem={props => {
          if (!props || !props.item) return null;
          return <GameCard item={props.item} onPress={() => handleGamePress(props.item.id)} />;
        }}
        ListEmptyComponent={<Text style={styles.empty}>No games available.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <Text style={styles.sectionHeader}>Created Games</Text>
      {/* TODO: Add FlatList for created games */}
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
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  topSlab: {
    backgroundColor: '#222',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    marginBottom: 12,
    shadowColor: '#222831',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
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
  },
  picker: {
    color: '#00FFFF',
    fontSize: 16,
    height: 40,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingTop: 40,
    paddingHorizontal: 16,
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
    marginTop: 40,
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
