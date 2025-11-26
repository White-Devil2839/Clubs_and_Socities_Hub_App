import React, { useContext, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MembershipContext } from '../context/MembershipContext';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { colors, spacing, radius, typography, shadow } from '../theme';

export default function MembersScreen() {
	const { members, pendingMembers, approveMember, rejectMember } = useContext(MembershipContext);
	const { user } = useContext(AuthContext);
	const { clubs } = useContext(DataContext);
	const [search, setSearch] = useState('');

	const currentMember = useMemo(
		() => members.find((m) => m.id === user?.id),
		[members, user?.id]
	);

	const leaderPending = useMemo(() => {
		if (!currentMember || currentMember.role !== 'leader' || !currentMember.clubId) return [];
		return pendingMembers.filter((m) => m.requestedClubId === currentMember.clubId);
	}, [pendingMembers, currentMember]);

	const filteredMembers = useMemo(() => {
		const term = search.trim().toLowerCase();
		const approved = members.filter((m) => m.status === 'approved');
		if (!term) return approved;
		return approved.filter(
			(m) =>
				m.username.toLowerCase().includes(term) ||
				m.name?.toLowerCase().includes(term) ||
				m.email?.toLowerCase().includes(term)
		);
	}, [members, search]);

	const findClubName = (clubId) => clubs.find((c) => c.id === clubId)?.name || '—';

	if (!user) {
		return (
			<View style={styles.centerBox}>
				<Text style={styles.denied}>Please log in to view membership details.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={[styles.card, shadow.light]}>
				<Text style={typography.cardTitle}>Your Membership</Text>
				<Text style={styles.subtitle}>{currentMember?.name || user.username}</Text>
				<Text style={styles.meta}>Role: {currentMember?.role || 'member'}</Text>
				<Text style={styles.meta}>Club: {findClubName(currentMember?.clubId)}</Text>
				<Text style={styles.meta}>Status: {currentMember?.status || 'pending'}</Text>
			</View>

			{currentMember?.role === 'leader' ? (
				<View style={[styles.card, shadow.light]}>
					<Text style={typography.cardTitle}>Pending requests for your club</Text>
					{leaderPending.length === 0 ? (
						<Text style={styles.meta}>No pending requests.</Text>
					) : (
						leaderPending.map((member) => (
							<View key={member.id} style={styles.row}>
								<View>
									<Text style={styles.rowTitle}>{member.name}</Text>
									<Text style={styles.meta}>{member.email}</Text>
								</View>
								<View style={styles.ctaRow}>
									<TouchableOpacity
										style={[styles.smallBtn, styles.approveBtn]}
										onPress={() => approveMember(member.id, { clubId: currentMember.clubId })}
									>
										<Text style={styles.smallBtnText}>Approve</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.smallBtn, styles.rejectBtn]}
										onPress={() => rejectMember(member.id)}
									>
										<Text style={styles.smallBtnText}>Reject</Text>
									</TouchableOpacity>
								</View>
							</View>
						))
					)}
				</View>
			) : null}

			<View style={[styles.card, shadow.light, { flex: 1 }]}>
				<Text style={typography.cardTitle}>Members Directory</Text>
				<TextInput
					style={styles.input}
					placeholder="Search members..."
					placeholderTextColor={colors.muted}
					value={search}
					onChangeText={setSearch}
				/>
				<FlatList
					data={filteredMembers}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ paddingTop: spacing.sm }}
					ItemSeparatorComponent={() => <View style={{ height: spacing.xs }} />}
					renderItem={({ item }) => (
						<View style={styles.row}>
							<View>
								<Text style={styles.rowTitle}>{item.name || item.username}</Text>
								<Text style={styles.meta}>
									{item.role} • {findClubName(item.clubId)}
								</Text>
							</View>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacing.md,
		gap: spacing.md,
		backgroundColor: colors.background,
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	centerBox: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.background,
		padding: spacing.md,
	},
	denied: { color: colors.text, fontSize: 16, textAlign: 'center' },
	subtitle: { ...typography.cardSubtitle, marginTop: spacing.xs },
	meta: { color: colors.muted, fontSize: 13, marginTop: 2 },
	row: {
		backgroundColor: '#EEF2F7',
		borderRadius: radius.md,
		padding: spacing.sm,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	rowTitle: {
		fontWeight: '600',
		color: colors.text,
	},
	input: {
		backgroundColor: '#EEF2F7',
		borderRadius: radius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		marginTop: spacing.sm,
		color: colors.text,
	},
	ctaRow: { flexDirection: 'row', gap: spacing.xs },
	smallBtn: {
		borderRadius: radius.md,
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.sm,
	},
	approveBtn: { backgroundColor: colors.accent },
	rejectBtn: { backgroundColor: '#EF4444' },
	smallBtnText: { color: colors.white, fontWeight: '700', fontSize: 12 },
});

