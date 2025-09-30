import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { events as seedEvents, clubs as seedClubs } from '../data';

export const DataContext = createContext({
	events: [],
	clubs: [],
	addEvent: (event) => {},
	deleteEvent: (id) => {},
	addClub: (club) => {},
	deleteClub: (id) => {},
	updateEvent: (id, partial) => {},
	updateClub: (id, partial) => {},
	addEventToClub: (clubId, event) => {},
	deleteEventFromClub: (clubId, eventId) => {},
});

const EVENTS_KEY = 'clubs_hub_events_v1';
const CLUBS_KEY = 'clubs_hub_clubs_v1';

export function DataProvider({ children }) {
	const [events, setEvents] = useState([]);
	const [clubs, setClubs] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const [eRaw, cRaw] = await Promise.all([
					AsyncStorage.getItem(EVENTS_KEY),
					AsyncStorage.getItem(CLUBS_KEY),
				]);
				setEvents(eRaw ? JSON.parse(eRaw) : seedEvents);
				setClubs(cRaw ? JSON.parse(cRaw) : seedClubs);
			} catch (_) {
				setEvents(seedEvents);
				setClubs(seedClubs);
			}
		})();
	}, []);

	useEffect(() => {
		AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events)).catch(() => {});
	}, [events]);

	useEffect(() => {
		AsyncStorage.setItem(CLUBS_KEY, JSON.stringify(clubs)).catch(() => {});
	}, [clubs]);

	const addEvent = useCallback((event) => {
		setEvents((prev) => [{ id: String(Date.now()), ...event }, ...prev]);
	}, []);

	const deleteEvent = useCallback((id) => {
		setEvents((prev) => prev.filter((e) => String(e.id) !== String(id)));
	}, []);

	const updateEvent = useCallback((id, partial) => {
		setEvents((prev) => prev.map((e) => (String(e.id) === String(id) ? { ...e, ...partial } : e)));
	}, []);

	const addClub = useCallback((club) => {
		setClubs((prev) => [{ id: String(Date.now()), ...club, events: club.events || [] }, ...prev]);
	}, []);

	const deleteClub = useCallback((id) => {
		setClubs((prev) => prev.filter((c) => String(c.id) !== String(id)));
	}, []);

	const updateClub = useCallback((id, partial) => {
		setClubs((prev) => prev.map((c) => (String(c.id) === String(id) ? { ...c, ...partial } : c)));
	}, []);

	const addEventToClub = useCallback((clubId, event) => {
		setClubs((prev) => prev.map((c) => {
			if (String(c.id) !== String(clubId)) return c;
			const newEvent = { id: String(Date.now()), ...event };
			return { ...c, events: [newEvent, ...(c.events || [])] };
		}));
	}, []);

	const deleteEventFromClub = useCallback((clubId, eventId) => {
		setClubs((prev) => prev.map((c) => {
			if (String(c.id) !== String(clubId)) return c;
			return { ...c, events: (c.events || []).filter((e) => String(e.id) !== String(eventId)) };
		}));
	}, []);

	const value = useMemo(
		() => ({
			events,
			clubs,
			addEvent,
			deleteEvent,
			updateEvent,
			addClub,
			deleteClub,
			updateClub,
			addEventToClub,
			deleteEventFromClub,
		}),
		[events, clubs, addEvent, deleteEvent, updateEvent, addClub, deleteClub, updateClub, addEventToClub, deleteEventFromClub]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}


