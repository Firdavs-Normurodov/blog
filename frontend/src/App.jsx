import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Blogs from './components/Blogs';
import Contact from './components/Contact';

// Pages
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Show from './pages/Show';


// Protected Route Component - For authenticated users only
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-colorT border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// Guest Route Component - For non-authenticated users only
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-colorT border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/user/profile" replace />;
  }

  return children;
};

// Home komponenti
const Home = () => (
  <main className="pt-[72px]">
    <section id="home">
      <Hero />
    </section>
    <section id="about">
      <About />
    </section>
    <section id="blogs">
      <Blogs />
    </section>
    <section id="contact">
      <Contact />
    </section>
  </main>
);

const App = () => {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-colorT border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-brightBackground flex flex-col">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Guest Routes - Only accessible when not logged in */}
          <Route
            path="/auth/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        

          {/* Public Routes */}
          <Route path="/blogs/:id" element={<Show />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;