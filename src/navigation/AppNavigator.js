import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ClubsScreen from '../screens/ClubsScreen';
import AdminScreen from '../screens/AdminScreen';
import ClubDetailsScreen from '../screens/ClubDetailsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventsScreen from '../screens/EventsScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import { TouchableOpacity, Text } from 'react-native';
import { colors, shadow } from '../theme';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.background,
        card: colors.headerBg,
        text: colors.white,
        border: 'transparent',
        primary: colors.accent,
    },
};

export default function AppNavigator() {
	const { user, initializing, logout } = useContext(AuthContext);

	if (initializing) {
		return null;
	}

    const screenOptions = {
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerStyle: [{ backgroundColor: colors.headerBg }, shadow.head],
        headerTitleStyle: { color: colors.white, fontWeight: '800' },
        headerTintColor: colors.white,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    };

	function MainTabs() {
		return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.white,
                    tabBarInactiveTintColor: '#E5E7EB',
                    tabBarIndicatorStyle: { backgroundColor: colors.white, height: 3, borderRadius: 2 },
                    tabBarLabelStyle: { fontWeight: '700' },
                    tabBarStyle: [{ backgroundColor: colors.headerBg }, shadow.head],
                    lazy: true,
                }}
            >
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Events" component={EventsScreen} />
				<Tab.Screen name="Clubs" component={ClubsScreen} />
				{user?.role === 'admin' ? <Tab.Screen name="Admin" component={AdminDashboardScreen} /> : null}
			</Tab.Navigator>
		);
	}

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Main" component={MainTabs} options={({ navigation }) => ({
					title: 'Clubs & Societies Hub 2',
					headerRight: () => (
						<TouchableOpacity onPress={() => user ? logout() : navigation.navigate('Login')}>
							<Text style={{ color: '#2563eb', fontWeight: '700' }}>{user ? 'Logout' : 'Login'}</Text>
						</TouchableOpacity>
					),
				})} />
				<Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
				<Stack.Screen name="ClubDetails" component={ClubDetailsScreen} options={{ title: 'Club Details' }} />
				<Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


