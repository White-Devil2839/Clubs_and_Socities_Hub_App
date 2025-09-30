import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { colors, spacing, radius, shadow, typography } from '../theme';

export default function EventsScreen() {
	const navigation = useNavigation();
	const { user } = useContext(AuthContext);
	const { events, deleteEvent } = useContext(DataContext);

	const handlePress = (id) => {
		if (!user) {
			navigation.navigate('Login', { message: 'Please login to view details' });
			return;
		}
		navigation.navigate('EventDetails', { id });
	};

	return (
		<FlatList
			contentContainerStyle={styles.list}
			data={events}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<View style={[styles.card, shadow.light]}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.meta}>{item.date}</Text>
					<Text style={styles.desc}>{item.desc}</Text>
					<TouchableOpacity style={styles.button} onPress={() => handlePress(item.id)}>
						<Text style={styles.buttonText}>View Details</Text>
					</TouchableOpacity>
					{user?.role === 'admin' ? (
						<TouchableOpacity style={[styles.button, { backgroundColor: '#EF4444', marginTop: spacing.xs }]} onPress={() => deleteEvent(item.id)}>
							<Text style={styles.buttonText}>Delete</Text>
						</TouchableOpacity>
					) : null}
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		padding: spacing.md,
		backgroundColor: colors.background,
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.md,
		marginBottom: 12,
	},
	title: {
		...typography.cardTitle,
	},
	meta: {
		color: colors.muted,
		marginTop: 4,
	},
	desc: {
		marginTop: 6,
		color: colors.muted,
		lineHeight: 20,
	},
	button: {
		marginTop: spacing.sm,
		backgroundColor: colors.accent,
		borderRadius: radius.md,
		paddingVertical: 8,
		alignItems: 'center',
	},
	buttonText: {
		fontWeight: '700',
		color: colors.white,
	},
});


