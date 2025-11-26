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

export const members = [
	{
		id: 'm-admin',
		username: 'admin',
		name: 'System Admin',
		email: 'admin@campus.edu',
		password: 'admin',
		role: 'admin',
		status: 'approved',
		clubId: null,
		requestedClubId: null,
		requestedRole: 'admin',
	},
	{
		id: 'm-ailead',
		username: 'ailead',
		name: 'Alex Leader',
		email: 'leader@aiclub.edu',
		password: 'leader123',
		role: 'leader',
		status: 'approved',
		clubId: '1',
		requestedClubId: '1',
		requestedRole: 'leader',
	},
	{
		id: 'm-photofan',
		username: 'photofan',
		name: 'Jamie Photo',
		email: 'jamie@photo.edu',
		password: 'member123',
		role: 'member',
		status: 'approved',
		clubId: '2',
		requestedClubId: '2',
		requestedRole: 'member',
	},
];

export function getEventById(id) {
	return events.find((e) => e.id === String(id));
}

export function getClubById(id) {
	return clubs.find((c) => c.id === String(id));
}


