import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen, { JoinedGamesContext } from './screens/HomeScreen';
import GamesScreen from './screens/GamesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [joinedGames, setJoinedGames] = React.useState([]);
  return (
    <JoinedGamesContext.Provider value={{ joinedGames, setJoinedGames }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#222' },
            headerTintColor: '#fff',
            tabBarStyle: { backgroundColor: '#222', borderTopColor: '#222' },
            tabBarActiveTintColor: '#00FFFF',
            tabBarInactiveTintColor: '#aaa',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Games" component={GamesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </JoinedGamesContext.Provider>
  );
}

// If navigation fails, fallback to a simple view
// export default function App() {
//   return <View><Text>App Loaded</Text></View>;
// }
