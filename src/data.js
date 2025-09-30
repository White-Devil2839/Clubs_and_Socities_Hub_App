export const events = [
	{ id: '1', title: 'Tech Talk', date: '2025-09-21', desc: 'Trends in AI and mobile.' },
	{ id: '2', title: 'Hackathon', date: '2025-10-05', desc: 'Build fast, learn faster.' },
	{ id: '3', title: 'Design Sprint', date: '2025-10-12', desc: 'Rapid prototyping workshop.' },
];

export const clubs = [
	{ id: '1', name: 'AI Club', desc: 'Exploring ML and AI with projects.' },
	{ id: '2', name: 'Photography Club', desc: 'Capturing stories with light.' },
	{ id: '3', name: 'Literary Society', desc: 'Writing, readings, and meetups.' },
];

export function getEventById(id) {
	return events.find((e) => e.id === String(id));
}

export function getClubById(id) {
	return clubs.find((c) => c.id === String(id));
}


