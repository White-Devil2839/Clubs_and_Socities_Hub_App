import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { events, clubs } from '../data';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';

export default function HomeScreen({ navigation }) {
	const { user } = useContext(AuthContext);

	const stats = [
		{ key: 'clubs', label: 'Total Clubs', value: clubs.length, icon: 'albums' },
		{ key: 'events', label: 'Upcoming Events', value: events.length, icon: 'calendar' },
	];

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: spacing.md }}>
			<Text style={[typography.title, { marginBottom: spacing.sm }]}>Welcome to Clubs & Societies Hub</Text>
			<Text style={[typography.subtitle, { marginBottom: spacing.md }]}>Hello {user?.username || 'Guest'}</Text>

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: spacing.sm }}
				data={stats}
				keyExtractor={(i) => i.key}
				renderItem={({ item }) => (
					<View style={[styles.statCard, shadow.light]}>
						<Ionicons name={item.icon} size={22} color={colors.accent} />
						<Text style={styles.statNum}>{item.value}</Text>
						<Text style={styles.statLabel}>{item.label}</Text>
					</View>
				)}
			/>

			<View style={{ height: spacing.md }} />

			<TouchableOpacity style={[styles.ctaPrimary, shadow.light]} onPress={() => navigation.navigate('Main', { screen: 'Events' })}>
				<Text style={styles.ctaPrimaryText}>Browse Upcoming Events</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.ctaSecondary, shadow.light]} onPress={() => navigation.navigate('Main', { screen: 'Clubs' })}>
				<Text style={styles.ctaSecondaryText}>Explore Available Clubs</Text>
			</TouchableOpacity>

			{user?.role === 'admin' ? (
				<TouchableOpacity style={[styles.ctaSecondary, shadow.light]} onPress={() => navigation.navigate('Main', { screen: 'Admin' })}>
					<Text style={styles.ctaSecondaryText}>Go to Admin Dashboard</Text>
				</TouchableOpacity>
			) : null}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	statCard: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.md,
		marginRight: spacing.md,
		alignItems: 'flex-start',
		gap: spacing.xs,
		minWidth: 160,
	},
	statNum: {
		fontWeight: '800',
		fontSize: 20,
		color: colors.text,
	},
	statLabel: {
		color: colors.muted,
		fontSize: 12,
		fontWeight: '600',
	},
	ctaPrimary: {
		backgroundColor: colors.accent,
		borderRadius: radius.lg,
		paddingVertical: spacing.md,
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	ctaPrimaryText: {
		...typography.button,
	},
	ctaSecondary: {
		backgroundColor: colors.text,
		borderRadius: radius.lg,
		paddingVertical: spacing.md,
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	ctaSecondaryText: {
		color: colors.white,
		fontWeight: '700',
		fontSize: 16,
	},
});


