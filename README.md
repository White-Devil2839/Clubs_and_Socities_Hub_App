# Clubs & Societies Hub App

## Description
**Clubs & Societies Hub** is a mobile application designed to bridge the gap between college students and the various clubs and societies available on campus. It serves as a centralized platform where students can discover clubs, stay updated on upcoming events, and access detailed information in an organized manner.

The app addresses the problem of scattered information (posters, WhatsApp groups) by providing a single source of truth for all student activities.

## Demo Link
[https://drive.google.com/file/d/1kE272cnPsihnb3Qdbq6Qap-2e0OjHA8n/view?usp=sharing ]

## Features
- **Discover Clubs:** Browse through a comprehensive directory of all college clubs and societies.
- **Upcoming Events:** Stay informed about scheduled events, workshops, and activities.
- **Detailed Information:** Access specific details about clubs and events (requires login).
- **Authentication System:** Secure login functionality using `AuthContext` to manage user sessions.
- **Protected Access:** Restricted access to detailed views ensures privacy and encourages user registration.
- **Admin Dashboard:** A dedicated interface for administrators to manage clubs and events (simulated/mocked).
- **Modern UI:** Built with React Native Paper for a clean and professional look.

## Tech Stack
- **Framework:** React Native (Expo)
- **Navigation:** React Navigation (Stack, Bottom Tabs, Material Top Tabs)
- **State Management:** React Context API (AuthContext)
- **UI Library:** React Native Paper, React Native Vector Icons
- **Data Source:** Local mock data (`data.js`) simulated for development.

## Folder Structure
The project is organized as follows:

```
Clubs_and_Socities_Hub_App/
├── assets/                 # Static assets like images and icons
├── src/                    # Main source code directory
│   ├── context/            # React Context for global state management (e.g., AuthContext)
│   ├── navigation/         # Navigation configuration (Stack/Tab navigators)
│   ├── screens/            # Application screens (Home, Events, Clubs, Login, Admin, etc.)
│   ├── data.js             # Mock data for clubs, events, and users
│   └── theme.js            # Global theme and style definitions
├── App.js                  # Application entry point
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation & Preview
Follow these steps to set up and run the project locally:

1.  **Install Dependencies**
    Open your terminal in the project root directory and run:
    ```bash
    npm i
    ```

2.  **Start the Application**
    Start the development server:
    ```bash
    npm start
    ```

    This will start the Expo development server. You can then:
    - Press `a` to open in an Android Emulator.
    - Press `i` to open in an iOS Simulator.
    - Press `w` to open in a web browser.
    - Scan the QR code with the **Expo Go** app on your physical device.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please feel free to submit a pull request.


## Credits
Developed by Divyansh Choudhary.
