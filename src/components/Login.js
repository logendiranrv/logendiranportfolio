import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaLock, FaEnvelope, FaChevronLeft } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={styles.container}>
      {/* Background glow effects to match the hero style */}
      <div className="hero-glow-1" style={{ zIndex: 0 }}></div>
      <div className="hero-glow-2" style={{ zIndex: 0 }}></div>

      <button onClick={() => navigate('/')} style={styles.backButton}>
        <FaChevronLeft style={{ marginRight: '8px' }} /> Back to Portfolio
      </button>

      <div className="login-card" style={styles.card}>
        <h2 style={styles.title}>Admin Portal</h2>
        <p style={styles.subtitle}>Sign in to manage your portfolio</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
  },
  backButton: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    zIndex: 10,
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(30, 30, 30, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#a3a3a3',
    marginBottom: '30px',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '20px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '16px',
    color: '#a3a3a3',
    fontSize: '1.1rem',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 45px',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
    color: '#111111',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
    marginTop: '10px',
  },
};

export default Login;
