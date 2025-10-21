import axios from 'axios';
import ProtectedRoute from './shared/ProtectedRoute';

import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';

import Layout from './components/pages/Layout';
import MainPage from './components/pages/MainPage';
import CardPage from './components/pages/CardPage';
import SignupPage from './components/pages/SignupPage';
import SigninPage from './components/pages/SigninPage';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('/api/auth/refresh').then(({ data }) => setUser(data.user));
  }, []);

  return (
    <Routes>
      <Route element={<Layout user={user} setUser={setUser} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/cards" element={<CardPage />} />

        <Route element={<ProtectedRoute isAllowed={!!user} redirectTo="/signup" />} />

        <Route
          path="/signup"
          element={
            <ProtectedRoute isAllowed={!user} redirectTo="/">
              <SignupPage setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <ProtectedRoute isAllowed={!user} redirectTo="/">
              <SigninPage setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
