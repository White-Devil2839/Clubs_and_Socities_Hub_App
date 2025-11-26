import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { members as seedMembers } from '../data';

export const MembershipContext = createContext({
	members: [],
	pendingMembers: [],
	approvedMembers: [],
	registerMember: async () => {},
	approveMember: async () => {},
	rejectMember: async () => {},
	assignRole: async () => {},
	resetPassword: async () => {},
	updateMember: async () => {},
	getMemberByUsername: () => null,
	getMemberById: () => null,
});

const MEMBERS_KEY = 'clubs_hub_members_v1';

const sanitizeString = (value = '') => value.trim();

export function MembershipProvider({ children }) {
	const [members, setMembers] = useState([]);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const raw = await AsyncStorage.getItem(MEMBERS_KEY);
				setMembers(raw ? JSON.parse(raw) : seedMembers);
			} catch (_) {
				setMembers(seedMembers);
			} finally {
				setHydrated(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(members)).catch(() => {});
	}, [members, hydrated]);

	const getMemberByUsername = useCallback(
		(username) => {
			const handle = sanitizeString(username).toLowerCase();
			return members.find((m) => m.username.toLowerCase() === handle) || null;
		},
		[members]
	);

	const getMemberById = useCallback(
		(id) => members.find((m) => String(m.id) === String(id)) || null,
		[members]
	);

	const registerMember = useCallback(
		async ({ name, username, email, password, clubId, requestedRole }) => {
			const cleanUsername = sanitizeString(username).toLowerCase();
			const cleanEmail = sanitizeString(email).toLowerCase();
			if (!cleanUsername || !cleanEmail || !password || !name) {
				throw new Error('All fields are required');
			}
			if (members.some((m) => m.username.toLowerCase() === cleanUsername)) {
				throw new Error('Username already exists');
			}
			if (members.some((m) => m.email.toLowerCase() === cleanEmail)) {
				throw new Error('Email already registered');
			}
			const newMember = {
				id: `m-${Date.now()}`,
				name: sanitizeString(name),
				username: cleanUsername,
				email: cleanEmail,
				password: password.trim(),
				role: 'member',
				status: 'pending',
				clubId: null,
				requestedClubId: clubId || null,
				requestedRole: requestedRole || 'member',
				createdAt: Date.now(),
			};
			setMembers((prev) => [newMember, ...prev]);
			return newMember;
		},
		[members]
	);

	const updateMember = useCallback(async (id, partial) => {
		setMembers((prev) => prev.map((m) => (String(m.id) === String(id) ? { ...m, ...partial } : m)));
	}, []);

	const approveMember = useCallback(async (id, overrides = {}) => {
		setMembers((prev) =>
			prev.map((m) => {
				if (String(m.id) !== String(id)) return m;
				return {
					...m,
					status: 'approved',
					role: overrides.role || m.requestedRole || m.role || 'member',
					clubId: overrides.clubId ?? m.requestedClubId ?? m.clubId ?? null,
					requestedRole: null,
					requestedClubId: null,
				};
			})
		);
	}, []);

	const rejectMember = useCallback(async (id) => {
		setMembers((prev) =>
			prev.map((m) => (String(m.id) === String(id) ? { ...m, status: 'rejected' } : m))
		);
	}, []);

	const assignRole = useCallback(async (id, role) => {
		setMembers((prev) => prev.map((m) => (String(m.id) === String(id) ? { ...m, role } : m)));
	}, []);

	const resetPassword = useCallback(async (id, newPassword) => {
		if (!newPassword?.trim()) {
			throw new Error('Password cannot be empty');
		}
		setMembers((prev) =>
			prev.map((m) => (String(m.id) === String(id) ? { ...m, password: newPassword.trim() } : m))
		);
	}, []);

	const pendingMembers = useMemo(() => members.filter((m) => m.status === 'pending'), [members]);
	const approvedMembers = useMemo(() => members.filter((m) => m.status === 'approved'), [members]);

	const value = useMemo(
		() => ({
			members,
			pendingMembers,
			approvedMembers,
			registerMember,
			approveMember,
			rejectMember,
			assignRole,
			resetPassword,
			updateMember,
			getMemberByUsername,
			getMemberById,
		}),
		[
			members,
			pendingMembers,
			approvedMembers,
			registerMember,
			approveMember,
			rejectMember,
			assignRole,
			resetPassword,
			updateMember,
			getMemberByUsername,
			getMemberById,
		]
	);

	return <MembershipContext.Provider value={value}>{children}</MembershipContext.Provider>;
}

