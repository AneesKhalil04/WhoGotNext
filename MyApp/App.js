import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

// ----- GameCard Component -----
function GameCard({ title, sport, location, time, players, status }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{sport} · {title}</Text>
      <Text style={styles.detail}>📍 {location}</Text>
      <Text style={styles.detail}>⏰ {time}</Text>
      <Text style={styles.detail}>👥 Players: {players}</Text>
      <Text style={[styles.status, 
        status === "Open" && { color: "green" },
        status === "Full" && { color: "red" },
        status === "In-Progress" && { color: "orange" }
      ]}>
        {status}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Join Game</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----- Mock Data -----
const games = [
  {
    id: "1",
    title: "5v5 at Patterson Park",
    sport: "🏀 Basketball",
    location: "Court 2",
    time: "Today 6:00 PM",
    players: "7/10",
    status: "Open",
  },
  {
    id: "2",
    title: "Pickup Soccer",
    sport: "⚽ Soccer",
    location: "Central Turf Field",
    time: "Tomorrow 4:00 PM",
    players: "14/14",
    status: "Full",
  },
  {
    id: "3",
    title: "Morning Volleyball",
    sport: "🏐 Volleyball",
    location: "Community Gym",
    time: "Sat 10:00 AM",
    players: "4/8",
    status: "In-Progress",
  },
];

// ----- Main App -----
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WhoGotNext 🏀</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            title={item.title}
            sport={item.sport}
            location={item.location}
            time={item.time}
            players={item.players}
            status={item.status}
          />
        )}
      />
    </View>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
