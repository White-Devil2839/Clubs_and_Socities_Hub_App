import React, { useContext, useMemo, useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MembershipContext } from '../context/MembershipContext';
import { DataContext } from '../context/DataContext';
import { colors, spacing, radius, typography, shadow } from '../theme';

const roleOptions = [
	{ value: 'member', label: 'Member' },
	{ value: 'leader', label: 'Club Leader' },
];

export default function SignupScreen() {
	const navigation = useNavigation();
	const { registerMember } = useContext(MembershipContext);
	const { clubs } = useContext(DataContext);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [clubId, setClubId] = useState(null);
	const [requestedRole, setRequestedRole] = useState('member');
	const [error, setError] = useState('');
	const disabled = useMemo(
		() => !name || !username || !email || !password || !clubId,
		[name, username, email, password, clubId]
	);

	const handleSignup = async () => {
		setError('');
		if (!/\S+@\S+\.\S+/.test(email.trim())) {
			setError('Please enter a valid email address');
			return;
		}
		if (password.trim().length < 6) {
			setError('Password should be at least 6 characters');
			return;
		}
		try {
			await registerMember({ name, username, email, password, clubId, requestedRole });
			Alert.alert(
				'Request submitted',
				'Your membership request was sent to admins for approval.',
				[
					{
						text: 'Back to Login',
						onPress: () => navigation.navigate('Login', { message: 'Signup successful. Await approval.' }),
					},
				]
			);
		} catch (e) {
			setError(e?.message || 'Unable to sign up');
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: colors.background }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={[styles.card, shadow.light]}>
					<Text style={[typography.title, { marginBottom: spacing.sm }]}>Join a Club</Text>
					<Text style={[typography.label, styles.fieldLabel]}>Full Name</Text>
					<TextInput
						style={styles.input}
						placeholder="Your name"
						placeholderTextColor={colors.muted}
						value={name}
						onChangeText={setName}
					/>

					<Text style={[typography.label, styles.fieldLabel]}>Username</Text>
					<TextInput
						style={styles.input}
						placeholder="Unique username"
						autoCapitalize="none"
						placeholderTextColor={colors.muted}
						value={username}
						onChangeText={setUsername}
					/>

					<Text style={[typography.label, styles.fieldLabel]}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="you@campus.edu"
						autoCapitalize="none"
						keyboardType="email-address"
						placeholderTextColor={colors.muted}
						value={email}
						onChangeText={setEmail}
					/>

					<Text style={[typography.label, styles.fieldLabel]}>Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Minimum 6 characters"
						placeholderTextColor={colors.muted}
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>

					<Text style={[typography.label, styles.fieldLabel]}>Preferred Club</Text>
					<View style={styles.chipGroup}>
						{clubs.map((club) => (
							<TouchableOpacity
								key={club.id}
								style={[styles.chip, clubId === club.id && styles.chipActive]}
								onPress={() => setClubId(club.id)}
							>
								<Text style={[styles.chipText, clubId === club.id && styles.chipTextActive]}>{club.name}</Text>
							</TouchableOpacity>
						))}
					</View>

					<Text style={[typography.label, styles.fieldLabel]}>Role request</Text>
					<View style={styles.chipGroup}>
						{roleOptions.map((role) => (
							<TouchableOpacity
								key={role.value}
								style={[styles.chip, requestedRole === role.value && styles.chipActive]}
								onPress={() => setRequestedRole(role.value)}
							>
								<Text style={[styles.chipText, requestedRole === role.value && styles.chipTextActive]}>
									{role.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{error ? <Text style={styles.error}>{error}</Text> : null}
					<TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled]} disabled={disabled} onPress={handleSignup}>
						<Text style={styles.buttonText}>Submit Request</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={styles.backLink}>Back to Login</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.md,
		paddingBottom: spacing.xl * 2,
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.xl,
		padding: spacing.xl,
	},
	fieldLabel: {
		marginTop: spacing.sm,
		marginBottom: spacing.xs,
	},
	input: {
		backgroundColor: '#EEF2F7',
		borderRadius: radius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm + 2,
		color: colors.text,
	},
	chipGroup: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.xs,
		marginBottom: spacing.xs,
	},
	chip: {
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.sm,
		borderRadius: radius.lg,
		backgroundColor: '#E5E7EB',
	},
	chipActive: {
		backgroundColor: colors.accent,
	},
	chipText: {
		color: colors.text,
		fontWeight: '600',
	},
	chipTextActive: {
		color: colors.white,
	},
	button: {
		backgroundColor: colors.accent,
		borderRadius: radius.md,
		paddingVertical: 12,
		alignItems: 'center',
		marginTop: spacing.lg,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		...typography.button,
	},
	backLink: {
		color: colors.muted,
		textAlign: 'center',
		marginTop: spacing.sm,
		fontSize: 13,
	},
	error: {
		color: '#EF4444',
		marginTop: spacing.sm,
	},
});

