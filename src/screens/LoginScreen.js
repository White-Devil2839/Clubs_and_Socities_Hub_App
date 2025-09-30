import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';

export default function LoginScreen({ route }) {
	const { login } = useContext(AuthContext);
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const disabled = useMemo(() => !username || !password, [username, password]);

	const handleLogin = async () => {
		setError('');
		try {
			const userData = await login(username.trim(), password);
			// Show welcome popup
			Alert.alert(
				`Welcome ${userData.username}!`,
				`You are logged in as ${userData.role === 'admin' ? 'Administrator' : 'Member'}`,
				[
					{
						text: 'Continue',
						onPress: () => navigation.navigate('Main')
					}
				]
			);
		} catch (e) {
			setError(e?.message || 'Wrong username or password');
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<View style={[styles.card, shadow.light]}>
				<Text style={[typography.title, { textAlign: 'center', marginBottom: spacing.sm }]}>Clubs & Societies Hub 2</Text>
				<Text style={[typography.label, { marginBottom: spacing.xs }]}>Username</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter username"
					placeholderTextColor={colors.muted}
					autoCapitalize="none"
					value={username}
					onChangeText={setUsername}
					returnKeyType="next"
				/>
				<Text style={[typography.label, { marginTop: spacing.sm, marginBottom: spacing.xs }]}>Password</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					placeholderTextColor={colors.muted}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					returnKeyType="done"
				/>
				{route?.params?.message ? <Text style={styles.error}>{route.params.message}</Text> : null}
				{error ? <Text style={styles.error}>{error}</Text> : null}
				<TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled]} onPress={handleLogin} disabled={disabled}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableOpacity>
				<Text style={styles.link}>Forgot password?</Text>
				<Text style={styles.hint}>Admin: admin/admin · Members: any other username/password</Text>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: spacing.md,
		justifyContent: 'center',
	},
	card: {
		backgroundColor: colors.card,
		borderRadius: radius.xl,
		padding: spacing.xl,
	},
	input: {
		backgroundColor: '#EEF2F7',
		borderRadius: radius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm + 2,
		fontSize: 16,
		color: colors.text,
	},
	button: {
		backgroundColor: colors.accent,
		borderRadius: radius.md,
		paddingVertical: 10,
		alignItems: 'center',
		marginTop: spacing.md,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		...typography.button,
	},
	error: {
		color: '#EF4444',
		marginTop: spacing.xs,
		fontSize: 13,
	},
	link: {
		textAlign: 'center',
		marginTop: spacing.sm,
		color: colors.muted,
		fontSize: 13,
	},
	hint: {
		textAlign: 'center',
		marginTop: spacing.xs,
		color: colors.muted,
		fontSize: 12,
	},
});


