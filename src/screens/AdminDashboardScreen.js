import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, radius, shadow, typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { DataContext } from '../context/DataContext';

export default function AdminDashboardScreen() {
	const { user } = useContext(AuthContext);
    const { events, clubs, addEvent, deleteEvent, addClub, deleteClub, addEventToClub, deleteEventFromClub } = useContext(DataContext);
	if (user?.role !== 'admin') {
		return (
			<View style={styles.containerDenied}>
				<Text style={styles.denied}>Access Denied</Text>
				<Text style={styles.subtitle}>Admin only area.</Text>
			</View>
		);
	}

    const [activeSection, setActiveSection] = useState('events');
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventError, setEventError] = useState('');
    const [showClubModal, setShowClubModal] = useState(false);
    const [clubName, setClubName] = useState('');
    const [clubDesc, setClubDesc] = useState('');
    const [clubError, setClubError] = useState('');
    const [subEventTitle, setSubEventTitle] = useState('');
    const [subEventDate, setSubEventDate] = useState('');
    const [showSubEventModal, setShowSubEventModal] = useState(false);
    const [subEventError, setSubEventError] = useState('');
    const [currentClubId, setCurrentClubId] = useState('');

    return (
        <View style={styles.container}>
            {/* Section toggles */}
            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[styles.toggleBtn, activeSection === 'events' && styles.toggleBtnActive]}
                    onPress={() => setActiveSection('events')}
                >
                    <Text style={[styles.toggleText, activeSection === 'events' && styles.toggleTextActive]}>Manage Events</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleBtn, activeSection === 'clubs' && styles.toggleBtnActive]}
                    onPress={() => setActiveSection('clubs')}
                >
                    <Text style={[styles.toggleText, activeSection === 'clubs' && styles.toggleTextActive]}>Manage Clubs</Text>
                </TouchableOpacity>
            </View>

            {/* Manage Events container */}
            {activeSection === 'events' ? (
            <View style={[styles.section, shadow.light]}>
                <View style={styles.sectionHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                        <Ionicons name="calendar" size={20} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Manage Events</Text>
                    </View>
                    <TouchableOpacity style={styles.primaryCta} onPress={() => setShowEventModal(true)}>
                        <Ionicons name="add-circle" size={18} color={colors.white} />
                        <Text style={styles.primaryCtaText}>Add Event</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    contentContainerStyle={{ paddingTop: spacing.sm }}
                    data={events}
                    keyExtractor={(e) => e.id}
                    renderItem={({ item }) => (
                        <View style={[styles.row, shadow.light]}>
                            <Text style={styles.rowText}>{item.title} · {item.date}</Text>
                            <TouchableOpacity onPress={() => deleteEvent(item.id)}>
                                <Ionicons name="trash" size={20} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            ) : null}

            {/* Manage Clubs container */}
            {activeSection === 'clubs' ? (
            <View style={[styles.section, shadow.light]}>
                <View style={styles.sectionHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                        <Ionicons name="albums" size={20} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Manage Clubs</Text>
                    </View>
                    <TouchableOpacity style={styles.primaryCta} onPress={() => setShowClubModal(true)}>
                        <Ionicons name="add-circle" size={18} color={colors.white} />
                        <Text style={styles.primaryCtaText}>Add Club</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: spacing.xl }}
                    data={clubs}
                    keyExtractor={(c) => c.id}
                    renderItem={({ item }) => (
                        <View style={[styles.row, shadow.light]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.rowText}>{item.name}</Text>
                                <Text style={{ color: colors.muted, fontSize: 12 }}>{(item.events || []).length} events</Text>
                                {(item.events || []).map((ev) => (
                                    <View key={ev.id} style={[styles.row, { marginTop: spacing.xs }]}>
                                        <Text style={styles.rowText}>{ev.title} · {ev.date}</Text>
                                        <TouchableOpacity onPress={() => deleteEventFromClub(item.id, ev.id)}>
                                            <Ionicons name="trash" size={18} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <View style={{ gap: spacing.xs, alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => deleteClub(item.id)}>
                                    <Ionicons name="trash" size={20} color="#EF4444" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setCurrentClubId(item.id); setShowSubEventModal(true); }}>
                                    <Ionicons name={'add'} size={22} color={colors.accent} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            ) : null}

            {/* Add Event To Club Modal */}
            <Modal transparent visible={showSubEventModal} animationType="fade" onRequestClose={() => setShowSubEventModal(false)}>
                <Pressable style={styles.backdrop} onPress={() => setShowSubEventModal(false)} />
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Add Event To Club</Text>
                    <TextInput placeholder="Event Title" placeholderTextColor={colors.muted} style={styles.input} value={subEventTitle} onChangeText={(t) => { setSubEventTitle(t); setSubEventError(''); }} />
                    <TextInput placeholder="Event Date" placeholderTextColor={colors.muted} style={styles.input} value={subEventDate} onChangeText={(t) => { setSubEventDate(t); setSubEventError(''); }} />
                    {subEventError ? <Text style={styles.error}>{subEventError}</Text> : null}
                    <View style={styles.modalActions}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#6B7280' }]} onPress={() => setShowSubEventModal(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (!subEventTitle) { setSubEventError('Please enter event title'); return; }
                            if (!currentClubId) { setSubEventError('No club selected'); return; }
                            addEventToClub(currentClubId, { title: subEventTitle, date: subEventDate, description: '' });
                            setSubEventTitle(''); setSubEventDate(''); setShowSubEventModal(false);
                        }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Add Event Modal */}
            <Modal transparent visible={showEventModal} animationType="fade" onRequestClose={() => setShowEventModal(false)}>
                <Pressable style={styles.backdrop} onPress={() => setShowEventModal(false)} />
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Create Event</Text>
                    <TextInput placeholder="Title" placeholderTextColor={colors.muted} style={styles.input} value={eventTitle} onChangeText={(t) => { setEventTitle(t); setEventError(''); }} />
                    <TextInput placeholder="Date (YYYY-MM-DD)" placeholderTextColor={colors.muted} style={styles.input} value={eventDate} onChangeText={(t) => { setEventDate(t); setEventError(''); }} />
                    {eventError ? <Text style={styles.error}>{eventError}</Text> : null}
                    <View style={styles.modalActions}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#6B7280' }]} onPress={() => setShowEventModal(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (!eventTitle || !eventDate) { setEventError('Please fill all fields'); return; }
                            addEvent({ title: eventTitle, date: eventDate, desc: '' });
                            setEventTitle(''); setEventDate(''); setShowEventModal(false);
                        }}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Add Club Modal */}
            <Modal transparent visible={showClubModal} animationType="fade" onRequestClose={() => setShowClubModal(false)}>
                <Pressable style={styles.backdrop} onPress={() => setShowClubModal(false)} />
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Create Club</Text>
                    <TextInput placeholder="Name" placeholderTextColor={colors.muted} style={styles.input} value={clubName} onChangeText={(t) => { setClubName(t); setClubError(''); }} />
                    <TextInput placeholder="Description" placeholderTextColor={colors.muted} style={styles.input} value={clubDesc} onChangeText={(t) => { setClubDesc(t); setClubError(''); }} />
                    {clubError ? <Text style={styles.error}>{clubError}</Text> : null}
                    <View style={styles.modalActions}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#6B7280' }]} onPress={() => setShowClubModal(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (!clubName) { setClubError('Please enter club name'); return; }
                            addClub({ name: clubName, desc: clubDesc });
                            setClubName(''); setClubDesc(''); setShowClubModal(false);
                        }}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
    containerDenied: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
    grid: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    panel: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    panelHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm },
    panelTitle: { ...typography.cardTitle },
    input: {
        backgroundColor: '#EEF2F7',
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    button: {
        backgroundColor: colors.accent,
        borderRadius: radius.md,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: { ...typography.button },
    row: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowText: { color: colors.text, fontWeight: '600' },
    cardTitle: { ...typography.cardTitle, marginTop: spacing.sm },
    subtitle: { ...typography.cardSubtitle },
    denied: { fontSize: 20, fontWeight: '700', color: '#EF4444', marginBottom: spacing.xs },
    // Modal styles
    backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
    modalCard: {
        position: 'absolute', left: spacing.md, right: spacing.md, top: '25%',
        backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
    },
    modalTitle: { ...typography.cardTitle, marginBottom: spacing.sm },
    modalActions: { marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm },
    error: { color: '#EF4444', marginTop: spacing.xs, fontSize: 13 },
    // Toggle styles
    toggleRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
    toggleBtn: { flex: 1, backgroundColor: colors.card, borderRadius: radius.lg, paddingVertical: spacing.sm, alignItems: 'center' },
    toggleBtnActive: { backgroundColor: colors.accent },
    toggleText: { color: colors.text, fontWeight: '700' },
    toggleTextActive: { color: colors.white },
    primaryCta: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.accent, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.lg },
    primaryCtaText: { ...typography.button },
});


