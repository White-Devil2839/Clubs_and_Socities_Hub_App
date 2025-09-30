import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadow, typography } from '../theme';

const CLUBS = [
	{
		id: '1',
		name: 'Tech Innovators Club',
		description: 'Workshops and hackathons focused on AI, web, and mobile dev.',
		events: [
			{ id: 'e1', title: 'AI Study Jam', date: '2025-10-10', location: 'Lab A', description: 'Hands-on AI models and tooling.' },
			{ id: 'e2', title: 'React Native Bootcamp', date: '2025-10-18', location: 'Auditorium', description: 'Build RN apps in a day.' },
			{ id: 'e3', title: 'Open Source Sprint', date: '2025-10-25', location: 'Innovation Hub', description: 'Contribute to OSS together.' },
		],
	},
	{
		id: '2',
		name: 'Photography Society',
		description: 'Explore creativity through lenses, weekly photo walks and edits.',
		events: [
			{ id: 'e4', title: 'Golden Hour Walk', date: '2025-11-02', location: 'City Park', description: 'Capture the best light.' },
			{ id: 'e5', title: 'Lightroom Basics', date: '2025-11-09', location: 'Room 204', description: 'Editing essentials for beginners.' },
			{ id: 'e6', title: 'Portraits 101', date: '2025-11-16', location: 'Studio B', description: 'Lighting and posing tips.' },
		],
	},
	{
		id: '3',
		name: 'Literary Circle',
		description: 'Book discussions, poetry slams, and creative writing sessions.',
		events: [
			{ id: 'e7', title: 'Poetry Night', date: '2025-10-28', location: 'Library Hall', description: 'Open mic and spoken word.' },
			{ id: 'e8', title: 'Microfiction Contest', date: '2025-11-05', location: 'Online', description: '100-word story challenge.' },
			{ id: 'e9', title: 'Author AMA', date: '2025-11-20', location: 'Seminar Room', description: 'Q&A with a guest author.' },
		],
	},
	{
		id: '4',
		name: 'Entrepreneurship Cell',
		description: 'Idea to startup: mentoring, pitch practice, and networking.',
		events: [
			{ id: 'e10', title: 'Pitch Day', date: '2025-10-30', location: 'Startup Lab', description: 'Pitch to mentors and peers.' },
			{ id: 'e11', title: 'Lean Canvas Workshop', date: '2025-11-07', location: 'Room 101', description: 'Map your startup idea.' },
			{ id: 'e12', title: 'Founder Fireside', date: '2025-11-21', location: 'Auditorium', description: 'Stories from founders.' },
		],
	},
];

export default function ClubsScreen() {
	const navigation = useNavigation();
	const [query, setQuery] = useState('');
	const [favorites, setFavorites] = useState(new Set());

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return CLUBS;
		return CLUBS.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
	}, [query]);
	const toggleFav = (id) => {
		setFavorites((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id); else next.add(id);
			return next;
		});
	};

	const renderItem = ({ item, index }) => (
		<Animated.View
			entering={FadeInDown.delay(index * 80).duration(300).easing(Easing.out(Easing.cubic))}
			style={[styles.card, shadow.light]}
		>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle}>{item.name}</Text>
				<TouchableOpacity onPress={() => toggleFav(item.id)}>
					<Ionicons name={favorites.has(item.id) ? 'star' : 'star-outline'} size={20} color={favorites.has(item.id) ? '#f59e0b' : '#9ca3af'} />
				</TouchableOpacity>
			</View>
			<Text style={styles.cardDesc}>{item.description}</Text>
			<View style={styles.tags}>
				{item.events.map((ev) => (
					<View key={ev.id} style={styles.tag}><Text style={styles.tagText}>{ev.title}</Text></View>
				))}
			</View>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClubDetails', { club: item })}>
				<Text style={styles.buttonText}>View Details</Text>
			</TouchableOpacity>
		</Animated.View>
	);

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<View style={styles.searchRow}>
				<TextInput
					style={[styles.search, shadow.light]}
					placeholder="Search clubs..."
					placeholderTextColor={colors.muted}
					value={query}
					onChangeText={setQuery}
					returnKeyType="search"
				/>
			</View>
			<FlatList
				contentContainerStyle={styles.list}
				data={filtered}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	searchRow: {
		paddingHorizontal: spacing.md,
		paddingTop: spacing.md,
		backgroundColor: colors.background,
	},
	search: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		fontSize: 15,
		color: colors.text,
	},
	list: {
		padding: spacing.md,
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.md,
		marginBottom: 12,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardTitle: {
		...typography.cardTitle,
	},
	cardDesc: {
		marginTop: 6,
		color: colors.muted,
		lineHeight: 20,
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginTop: 12,
		marginBottom: 8,
	},
	tag: {
		backgroundColor: '#eef2ff',
		borderRadius: radius.pill,
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	tagText: {
		color: '#3730a3',
		fontWeight: '600',
		fontSize: 12,
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


