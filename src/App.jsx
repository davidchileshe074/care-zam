// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteers";
import Join from "./pages/Join";
import Children from "./pages/Children";
import Stories from "./pages/Stories";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AddChild from "./pages/AddChild";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/join" element={<Join />} />
          <Route path="/children" element={<Children />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-child"
            element={
              <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
                <AddChild />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
