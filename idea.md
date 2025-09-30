Clubs & Societies Hub
1. Project Title

Clubs & Societies Hub – A Mobile App for College Clubs & Events


2.Divyansh –20204-B-02112006A


3. Problem Statement

College students often struggle to stay updated about upcoming events, available clubs, and society activities.

Information is usually scattered across posters, WhatsApp groups, or word of mouth, which makes it easy to miss opportunities. 

There is no centralized platform where students can explore clubs, register for events, or check details in an organized way.

4. Proposed Solution / Idea:-

A mobile application where students can:

Discover all clubs and societies in one place.

Stay updated with upcoming events.

View details of any club or event (only after login).

Provide admins with a simple dashboard for managing clubs and events.
This ensures that both students and organizers have a seamless, centralized, and accessible platform.


5. Key Features

Home page with basic overview (total clubs, events).

Upcoming Events list with event details.

Clubs Directory with club details and descriptions.

Login system (using AuthContext, frontend-only for now).

Protected access: Only logged-in users can view details.

Admin dashboard (only for admin login).



6. Target Users / Audience

College students (to discover and register for clubs/events).

Club admins (to manage events and club details).

College societies (to reach wider student audiences).


7. Technology Stack

Frontend: React Native (Expo), React Navigation, React Context API

UI Components: React Native Paper / NativeBase

Data: Dummy JSON arrays (for clubs & events, since no backend for now)



8. Expected Outcome

A functional mobile app with:

A clean Home page showing overview & navigation.

A tabbed interface for Home, Events, Clubs, and Admin.

Authentication using AuthContext.

Event and Club details accessible only after login.

Admin-only dashboard visible after admin login.


9. Timeline (4 Months with Backend)

Month 1 – Research & Setup

Finalize requirements, features, and UI/UX designs.

Set up React Native (Expo) frontend project.

Set up backend (Node.js/Express + MongoDB/MySQL).

Create GitHub repo structure (frontend + backend).

Month 2 – Core Frontend + Backend Foundations

Implement navigation (Home, Events, Clubs, Login).

Create dummy data models (Users, Events, Clubs) in backend.

Build API endpoints for authentication, events, and clubs.

Connect frontend with backend APIs.

Month 3 – Authentication & Admin Features

Implement JWT authentication in backend.

Add AuthContext in frontend to handle login/logout.

Role-based access (Admin vs Student).

Build Admin Dashboard (manage clubs & events).

Add protected routes for event/club details.

Month 4 – Final Integration & Testing

Polish UI with React Native Paper / NativeBase.

Add advanced features:

Event registration system.

Club membership enrollment.

Test frontend-backend integration.

Optimize performance, fix bugs, and finalize documentation.

Deploy backend (e.g., on Railway/Render) and prepare APK for submission.

10. Additional Notes (Optional)

Future versions may add:

Push notifications for new events.

Offline caching of clubs & events.

QR code check-in for events.

Backend integration (Node.js/Express + DB) can be added later for real data and authentication.
