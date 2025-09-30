import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboardScreen() {
	const { user } = useContext(AuthContext);
	if (user?.role !== 'admin') {
		return (
			<View style={styles.containerDenied}>
				<Text style={styles.denied}>Access Denied</Text>
				<Text style={styles.subtitle}>Admin only area.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={[styles.grid, shadow.light]}>
				<Ionicons name="calendar" size={28} color={colors.accent} />
				<Text style={styles.cardTitle}>Manage Events</Text>
			</View>
			<View style={[styles.grid, shadow.light]}>
				<Ionicons name="albums" size={28} color={colors.accent} />
				<Text style={styles.cardTitle}>Manage Clubs</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
	containerDenied: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
	grid: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.xl,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: spacing.md,
	},
	cardTitle: { ...typography.cardTitle, marginTop: spacing.sm },
	subtitle: { ...typography.cardSubtitle },
	denied: { fontSize: 20, fontWeight: '700', color: '#EF4444', marginBottom: spacing.xs },
});


