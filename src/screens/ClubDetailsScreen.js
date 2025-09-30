import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';

export default function ClubDetailsScreen({ route, navigation }) {
	const { user } = useContext(AuthContext);
	const { club } = route.params || {};

	useEffect(() => {
		if (!user) {
			navigation.replace('Login', { message: 'Please login to view details' });
		}
	}, [user, navigation]);

	if (!user) return null;
	if (!club) {
		return (
			<View style={styles.container}>
				<Text style={typography.title}>Club not found</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
		<Text style={[typography.title, { marginBottom: spacing.sm }]}>{club.name}</Text>
		<Text style={[typography.cardSubtitle, { marginBottom: spacing.md }]}>{club.description}</Text>
		<Text style={[typography.cardTitle, { marginBottom: spacing.sm }]}>Upcoming / Sample Events</Text>
			<FlatList
				data={club.events}
				keyExtractor={(e) => e.id}
				renderItem={({ item }) => (
					<TouchableOpacity style={[styles.eventRow, shadow.light]} onPress={() => navigation.navigate('EventDetails', { event: item, club })}>
						<View style={styles.bullet} />
						<View style={{ flex: 1 }}>
							<Text style={styles.eventText}>{item.title}</Text>
							<Text style={styles.eventMeta}>{item.date} · {item.location}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacing.md,
		backgroundColor: colors.background,
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 8,
	},
	desc: {
		fontSize: 14,
		color: '#4b5563',
		lineHeight: 20,
		marginBottom: 16,
	},
	section: {
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 8,
	},
	eventRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.card,
		paddingVertical: spacing.sm + 2,
		paddingHorizontal: spacing.sm + 2,
		borderRadius: radius.lg,
		marginBottom: spacing.sm,
	},
	bullet: {
		width: 8,
		height: 8,
		borderRadius: radius.pill,
		backgroundColor: colors.accent,
		marginRight: spacing.sm,
	},
	eventText: {
		fontSize: 14,
		color: colors.text,
		fontWeight: '700',
	},
	eventMeta: {
		fontSize: 12,
		color: colors.muted,
	},
});


