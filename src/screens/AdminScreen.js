import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function AdminScreen() {
	const { user } = useContext(AuthContext);

	if (user?.role !== 'admin') {
		return (
			<View style={styles.containerDenied}>
				<Text style={styles.denied}>Access Denied</Text>
				<Text style={styles.subtitle}>You do not have admin privileges.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Admin Dashboard</Text>
			<Text style={styles.subtitle}>Manage clubs, events, and users.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f6f7fb',
	},
	containerDenied: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f6f7fb',
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: '#4b5563',
	},
	denied: {
		fontSize: 20,
		fontWeight: '700',
		color: '#ef4444',
		marginBottom: 6,
	},
});


