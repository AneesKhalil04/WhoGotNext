import React, { useState, useContext, createContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // expo install @expo/vector-icons
import { LinearGradient } from 'expo-linear-gradient'; // expo install expo-linear-gradient

const mockGames = [
  {
    id: "1",
    title: "5v5 at Patterson Park",
    sport: "Basketball",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?fit=crop&w=800&q=80",
    organizer: "WhoGotNext",
    level: "Intermediate",
    time: "Today 6:00 PM",
    format: "5v5",
    price: "Free",
    status: "Open",
    spots: "2 Spots left",
  },
  {
    id: "2",
    title: "Pickup Soccer Central Turf",
    sport: "Soccer",
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?fit=crop&w=800&q=80",
    organizer: "Local FC",
    level: "High",
    time: "Tomorrow 4:00 PM",
    format: "7v7",
    price: "$10",
    status: "Confirmed",
    spots: "1 Spot left",
  },
];

const sportAccents = {
  Basketball: '#FF9900', // orange
  Soccer: '#00FF66', // green
  'Flag Football': '#FF3333', // red
};
const secondaryAccent = '#A020F0'; // electric purple

const filterChips = [
  { label: 'Competitive', key: 'competitive' },
  { label: 'Casual', key: 'casual' },
  { label: 'Free', key: 'free' },
];

// Create context for joined games
export const JoinedGamesContext = createContext();

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const { joinedGames, setJoinedGames } = useContext(JoinedGamesContext);
  const [activeFilters, setActiveFilters] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  const [streak, setStreak] = useState(3); // fake streak

  // Filter logic (mock)
  const filteredGames = mockGames.filter(game => {
    let pass = true;
    if (activeFilters.includes('free')) pass = pass && game.price === 'Free';
    if (activeFilters.includes('competitive')) pass = pass && game.level === 'High';
    if (activeFilters.includes('casual')) pass = pass && game.level === 'Intermediate';
    // Starting soon: within 2 hours (mock logic)
    if (activeFilters.includes('soon')) pass = pass && game.time.includes('Today');
    return pass;
  });

  const toggleFilter = key => {
    setActiveFilters(f => f.includes(key) ? f.filter(x => x !== key) : [...f, key]);
  };

  const handleJoinGame = (game) => {
    if (!joinedGames.some(g => g.id === game.id)) {
      setJoinedGames([...joinedGames, game]);
    }
  };

  const renderGameCard = ({ item }) => {
    // Fake XP progress
    const xpProgress = Math.random() * 0.7 + 0.2;
    // Fake friends
    const friends = item.friends || [];
    // Roster preview
    const rosterPreview = item.roster ? item.roster.slice(0, 3) : [];
    return (
      <View style={styles.card}>
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          {/* Roster preview avatars */}
          <View style={styles.rosterPreview}>
            {rosterPreview.map((user, i) => (
              <Image
                key={user.id}
                source={{ uri: user.avatar }}
                style={[styles.avatar, { left: i * 18, zIndex: 3 - i }]}
              />
            ))}
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={[styles.sportTag, { backgroundColor: sportAccents[item.sport] || secondaryAccent }]}>{item.sport}</Text>
          <Text style={styles.organizer}>by {item.organizer}</Text>
          <Text style={styles.tag}>{item.level}</Text>
          <Text style={styles.details}>
            {item.time} • {item.format}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.spots}>{item.spots}</Text>
          </View>
          {/* Social preview */}
          {friends.length > 0 && (
            <View style={styles.socialRow}>
              <Text style={styles.socialText}>{friends.length} friends are playing</Text>
              <View style={styles.socialAvatars}>
                {friends.slice(0, 3).map((f, i) => (
                  <Image key={f.id} source={{ uri: f.avatar }} style={[styles.avatarSmall, { left: i * 14 }]} />
                ))}
              </View>
            </View>
          )}
          {/* XP bar */}
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBar, { width: `${xpProgress * 100}%` }]} />
            <Text style={styles.xpText}>XP</Text>
          </View>
          {/* Badge placeholder */}
          <View style={styles.badgeRow}>
            <View style={styles.badgePlaceholder}><Text style={styles.badgeText}>Shooter</Text></View>
            <View style={styles.badgePlaceholder}><Text style={styles.badgeText}>Playmaker</Text></View>
          </View>
        </View>
        <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoinGame(item)}>
          <Text style={styles.joinText}>Join Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>WhoGotNext</Text>
        <Ionicons name="notifications-outline" size={24} color="#00FFFF" />
      </View>
      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#00FFFF" style={{ marginLeft: 8 }} />
        <TextInput
          placeholder="Search games"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons
          name="options-outline"
          size={22}
          color="#00FFFF"
          style={{ marginRight: 8 }}
        />
      </View>
      {/* Date row: calendar icon left, selected date right */}
      <View style={styles.dateRow}>
        <TouchableOpacity style={styles.calendarBtn}>
          <Ionicons name="calendar-outline" size={28} color="#00FFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 12 }}>
          <Text style={styles.selectedDateText}>Sept 26, 2025</Text>
        </View>
      </View>
      {/* Filter chips */}
      <View style={styles.filterChipRow}>
        {filterChips.map(chip => (
          <TouchableOpacity
            key={chip.key}
            style={[styles.filterChip, activeFilters.includes(chip.key) && styles.filterChipActive]}
            onPress={() => toggleFilter(chip.key)}
          >
            <Text style={[styles.filterChipText, activeFilters.includes(chip.key) && styles.filterChipTextActive]}>{chip.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Games list */}
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        renderItem={renderGameCard}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 2,
    marginTop: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    letterSpacing: 1,
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
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    fontFamily: 'Poppins',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  selectedDateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginLeft: 4,
  },
  filterChipRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#222',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterChipActive: {
    backgroundColor: secondaryAccent,
    borderColor: '#00FFFF',
  },
  filterChipText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  filterChipTextActive: {
    color: '#00FFFF',
    fontWeight: 'bold',
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
  cardImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  organizer: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  tag: {
    color: secondaryAccent,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  details: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  spots: {
    color: '#00FFFF',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialText: {
    color: '#fff',
    fontSize: 13,
    marginRight: 8,
    fontFamily: 'Poppins',
  },
  socialAvatars: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    position: 'relative',
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: '#222',
  },
  xpBarContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  xpBar: {
    height: 8,
    backgroundColor: '#00FFFF',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  xpText: {
    position: 'absolute',
    right: 8,
    top: -18,
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Poppins',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  badgePlaceholder: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: secondaryAccent,
  },
  badgeText: {
    color: secondaryAccent,
    fontSize: 12,
    fontWeight: 'bold',
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
});
