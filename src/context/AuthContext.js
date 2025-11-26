import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MembershipContext } from './MembershipContext';

export const AuthContext = createContext({
	user: null,
	initializing: true,
	login: async (username, password) => {},
	logout: async () => {},
	refreshUser: async () => {},
});

const STORAGE_KEY = 'clubs_hub_user_v1';

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const { getMemberByUsername, getMemberById, members } = useContext(MembershipContext);

	useEffect(() => {
		(async () => {
			try {
				const raw = await AsyncStorage.getItem(STORAGE_KEY);
				if (raw) {
					const stored = JSON.parse(raw);
					if (stored?.id) {
						const fresh = getMemberById(stored.id);
						if (fresh && fresh.status === 'approved') {
							setUser({ id: fresh.id, username: fresh.username, role: fresh.role });
						} else {
							setUser(null);
						}
					} else {
						setUser(null);
					}
				}
			} catch (e) {
				// noop
			} finally {
				setInitializing(false);
			}
		})();
	}, [getMemberById]);

	useEffect(() => {
		if (!user?.id) return;
		const fresh = getMemberById(user.id);
		if (!fresh || fresh.status !== 'approved') {
			setUser(null);
			AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
			return;
		}
		if (fresh.role !== user.role || fresh.username !== user.username) {
			const normalized = { id: fresh.id, username: fresh.username, role: fresh.role };
			setUser(normalized);
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized)).catch(() => {});
		}
	}, [members, user, getMemberById]);

	const login = useCallback(
		async (username, password) => {
			const name = (username || '').trim();
			const pass = (password || '').trim();
			if (!name || !pass) {
				throw new Error('Please enter username and password');
			}
			const member = getMemberByUsername(name);
			if (!member) {
				throw new Error('Account not found. Please sign up first.');
			}
			if (member.status === 'pending') {
				throw new Error('Your account is awaiting approval.');
			}
			if (member.status === 'rejected') {
				throw new Error('Your signup was rejected. Contact admin.');
			}
			if (member.password !== pass) {
				throw new Error('Wrong username or password');
			}
			const userData = { id: member.id, username: member.username, role: member.role };
			setUser(userData);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
			return userData;
		},
		[getMemberByUsername]
	);

	const logout = useCallback(async () => {
		setUser(null);
		await AsyncStorage.removeItem(STORAGE_KEY);
	}, []);

	const refreshUser = useCallback(async () => {
		if (!user?.id) return null;
		const fresh = getMemberById(user.id);
		if (!fresh || fresh.status !== 'approved') {
			setUser(null);
			await AsyncStorage.removeItem(STORAGE_KEY);
			return null;
		}
		const normalized = { id: fresh.id, username: fresh.username, role: fresh.role };
		setUser(normalized);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
		return normalized;
	}, [user, getMemberById]);

	const value = useMemo(
		() => ({ user, initializing, login, logout, refreshUser }),
		[user, initializing, login, logout, refreshUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


