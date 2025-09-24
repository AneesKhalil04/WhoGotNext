import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';

const sportEmojis = {
  Basketball: '🏀',
  Soccer: '⚽',
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
    maxPlayers: 10,
    status: 'Open',
    mapPreview: '', // Placeholder for map image URL
  },
  {
    id: '2',
    sport: 'Soccer',
    location: 'Central Turf',
    dateTime: 'Tomorrow 4:00 PM',
    roster: [
      { id: 'u3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ],
    maxPlayers: 14,
    status: 'Full',
    mapPreview: '',
  },
];

export default function HomeScreen() {
  const userName = 'User'; // Replace with actual user name from profile later
  const userAvatar = 'https://randomuser.me/api/portraits/men/1.jpg';
  const upcomingCount = mockGames.length;

  return (
    <View style={styles.container}>
      {/* Top dark grey slab for Dynamic Island area */}
      <View style={styles.topSlab}>
      </View>
      {/* All content below the top slab */}
      <View style={styles.topRowBelow}>
        <Image source={{ uri: userAvatar }} style={styles.avatarLarge} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.welcome}>Welcome, {userName}!</Text>
          <Text style={styles.tagline}>Ready to run the court?</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.summary}>You have {upcomingCount} upcoming game{upcomingCount !== 1 ? 's' : ''}.</Text>
      {/* Filter Bar Placeholder */}
      <View style={styles.filterBar}>
        <Text style={styles.filterText}>Filter: Sport | Distance | Date/Time</Text>
        {/* TODO: Add Picker/Dropdowns for filters */}
        <TouchableOpacity style={styles.toggleBtn}><Text style={styles.toggleBtnText}>List View</Text></TouchableOpacity>
        {/* TODO: Add toggle logic for Map/List view */}
      </View>
      <Text style={styles.header}>Discover Games</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feed}>
        {mockGames.length === 0 ? (
          <View style={styles.emptyCard}><Text style={styles.empty}>No games found.</Text></View>
        ) : (
          mockGames.map(item => <GameCard key={item.id} item={item} />)
        )}
      </ScrollView>
      <TouchableOpacity style={styles.fab} activeOpacity={0.7}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function GameCard({ item }) {
  const fade = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <Animated.View style={[styles.card, { opacity: fade }]}> 
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.emoji}>{sportEmojis[item.sport] || '🎲'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sport}>{item.sport}</Text>
          <Text style={styles.info}>{item.location} · {item.dateTime}</Text>
          {/* Map Preview Placeholder */}
          <View style={styles.mapPreview}><Text style={styles.mapPreviewText}>[Map]</Text></View>
          <View style={styles.playersRow}>
            <Text style={styles.playersText}>{item.roster.length} / {item.maxPlayers} players</Text>
            <View style={[styles.statusBadge, item.status === 'Open' ? styles.statusOpen : item.status === 'Full' ? styles.statusFull : styles.statusInProgress]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.avatars}>
          {item.roster && item.roster.map(user => (
            <Image key={user.id} source={{ uri: user.avatar }} style={styles.avatar} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.joinBtn}><Text style={styles.joinBtnText}>Join Game</Text></TouchableOpacity>
    </Animated.View>
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
    marginTop: 0,
    height: 64,
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
    shadowColor: '#222831',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    zIndex: 10,
  },
  topRowBelow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  avatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#00FFFF',
    marginLeft: 4,
  },
  tagline: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
  },
  filterText: {
    color: '#00FFFF',
    fontSize: 15,
    flex: 1,
  },
  toggleBtn: {
    backgroundColor: '#00FFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  toggleBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    color: '#00FFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    marginTop: 2,
  },
  feed: {
    paddingHorizontal: 16,
    paddingBottom: 80,
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
  mapPreview: {
    backgroundColor: '#333',
    borderRadius: 10,
    height: 60,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewText: {
    color: '#888',
    fontSize: 13,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  playersText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  statusOpen: {
    backgroundColor: '#00FF99',
  },
  statusFull: {
    backgroundColor: '#FF0055',
  },
  statusInProgress: {
    backgroundColor: '#FFD600',
  },
  statusText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emoji: {
    fontSize: 32,
    marginRight: 14,
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
  joinBtn: {
    backgroundColor: '#00FFFF',
    borderRadius: 16,
    alignSelf: 'flex-end',
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 12,
  },
  joinBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#00FFFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  fabText: {
    color: '#111111',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  emptyCard: {
    backgroundColor: '#222',
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginBottom: 16,
  },
});
