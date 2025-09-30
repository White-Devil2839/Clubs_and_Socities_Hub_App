import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
	user: null,
	initializing: true,
	login: async (username, password) => {},
	logout: async () => {},
});

const STORAGE_KEY = 'clubs_hub_user_v1';

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const raw = await AsyncStorage.getItem(STORAGE_KEY);
				if (raw) {
					setUser(JSON.parse(raw));
				}
			} catch (e) {
				// noop
			} finally {
				setInitializing(false);
			}
		})();
	}, []);

	const login = useCallback(async (username, password) => {
		const name = (username || '').trim();
		const pass = (password || '').trim();
		if (!name || !pass) {
			throw new Error('Please enter username and password');
		}
		if (name === 'admin' && pass === 'admin') {
			const userData = { username: 'admin', role: 'admin' };
			setUser(userData);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
			return userData;
		}
		// Accept any non-admin credentials as member, but validate incorrect combos if enforcing specific users
		if (name === 'admin' || pass === 'admin') {
			throw new Error('Wrong username or password');
		}
		const userData = { username: name, role: 'member' };
		setUser(userData);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
		return userData;
	}, []);

	const logout = useCallback(async () => {
		setUser(null);
		await AsyncStorage.removeItem(STORAGE_KEY);
	}, []);

	const value = useMemo(() => ({ user, initializing, login, logout }), [user, initializing, login, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


