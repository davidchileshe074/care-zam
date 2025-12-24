# ZamCare - Orphanage Support System

A comprehensive platform for supporting orphaned children and empowering communities, built with React, Firebase, and Appwrite.

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite
- **TailwindCSS 4** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Heroicons** for UI icons

### Backend Services
- **Firebase Authentication** - User authentication and authorization
- **Firestore** - NoSQL database for storing user data, volunteers, sponsors, and children profiles
- **Appwrite Storage** - Photo and media storage for child profiles and success stories

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd zamcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory with the following:

   ```env
   # Appwrite Configuration (for storage)
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_BUCKET_ID=photos

   # Firebase Configuration (for auth & database)
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
zamcare/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx    # App layout with conditional navbar/footer
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── Footer.tsx    # Footer component
│   ├── lib/              # Library configurations
│   │   ├── firebase.js   # Firebase initialization
│   │   └── appwrite.js   # Appwrite initialization
│   ├── pages/            # Page components
│   │   ├── Auth.jsx      # Login/Signup page
│   │   ├── Dashboard.jsx # Dashboard with latest entries
│   │   ├── HomePage.jsx  # Landing page
│   │   ├── Donate.jsx    # Donation page
│   │   ├── Volunteers.jsx # Volunteer signup
│   │   ├── Join.jsx      # Community join
│   │   ├── Children.jsx  # Children profiles
│   │   └── Stories.jsx   # Success stories
│   ├── services/         # Service layer
│   │   ├── authentication.js # Firebase Auth functions
│   │   ├── firestore.js     # Firestore CRUD operations
│   │   └── storage.js       # Appwrite Storage functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## 🎨 Features

### User Management
- **Authentication**: Firebase-based email/password authentication
- **Role-based Access**: Donor, Volunteer, and Admin roles
- **User Profiles**: Stored in Firestore with additional metadata

### Core Modules
1. **Orphanage Support System**
   - Child profiles with backgrounds, needs, and progress tracking
   - Donation system for monetary and material contributions
   - Volunteer opportunity management
   - Success stories showcase

2. **Community Empowerment**
   - Educational program information
   - Health and well-being resources
   - Job opportunities listing

3. **User Engagement**
   - Community networking features
   - Events and campaigns
   - Feedback and testimonials

4. **Transparency & Accountability**
   - Financial transparency reports
   - Impact tracking dashboard

### Media Storage
- **Appwrite Storage** for child photos and documents
- Secure file upload and retrieval
- Image preview and download functionality

## 🔐 Authentication Flow

1. User signs up with email, password, name, and role
2. Firebase creates an authentication account
3. User profile is stored in Firestore `users` collection
4. Upon login, Firebase session is created
5. Protected routes check authentication status

## 📊 Database Schema

### Firestore Collections

#### `users`
```javascript
{
  userId: string,
  name: string,
  email: string,
  role: "donor" | "volunteer" | "admin",
  createdAt: string (ISO)
}
```

#### `volunteers`
```javascript
{
  name: string,
  email: string,
  message: string,
  createdAt: string (ISO)
}
```

#### `sponsors`
```javascript
{
  name: string,
  email: string,
  company: string,
  createdAt: string (ISO)
}
```

#### `children`
```javascript
{
  name: string,
  age: number,
  needs: string[],
  photoId: string (Appwrite file ID),
  createdAt: string (ISO)
}
```

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

3. Ensure environment variables are set on your hosting platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

David Chileshe

---

**Note**: This project uses Firebase for authentication and Firestore for the database, while Appwrite is used exclusively for photo storage. Make sure to configure both services properly for full functionality.
