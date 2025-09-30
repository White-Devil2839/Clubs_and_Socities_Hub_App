import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getEventById } from '../data';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';

export default function EventDetailsScreen({ route, navigation }) {
	const { id, event: eventParam } = route.params || {};
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) {
			navigation.replace('Login', { message: 'Please login to view details' });
		}
	}, [user, navigation]);

	if (!user) return null;

	const event = eventParam || getEventById(id);
	if (!event) {
		return (
			<View style={styles.container}>
				<Text style={typography.title}>Event not found</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={[typography.title, { marginBottom: spacing.sm }]}>{event.title}</Text>
			<View style={[styles.card, shadow.light]}>
				<Text style={[typography.cardSubtitle, { marginBottom: spacing.xs }]}>{event.date}</Text>
				<Text style={styles.desc}>{event.desc || event.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacing.md,
		backgroundColor: colors.background,
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	desc: {
		color: colors.muted,
		lineHeight: 22,
	},
});


