import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, onAuthChanged, ADMIN_EMAIL } from '../firebase';
import { FaGoogle, FaChevronLeft, FaShieldAlt, FaLock } from 'react-icons/fa';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const unsubscribe = onAuthChanged((user) => {
      if (user && user.email === ADMIN_EMAIL) {
        navigate('/admin');
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Security check — only ADMIN_EMAIL allowed
      if (user.email !== ADMIN_EMAIL) {
        setError(
          `Access Denied. Only the authorized administrator can access this panel. (${user.email} is not permitted)`
        );
        // Sign out unauthorized user immediately
        const { logOut } = await import('../firebase');
        await logOut();
        setLoading(false);
        return;
      }

      navigate('/admin');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please try again.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingSpinner}>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Back button */}
      <button onClick={() => navigate('/')} style={styles.backButton}>
        <FaChevronLeft style={{ marginRight: '8px' }} /> Back to Portfolio
      </button>

      <div style={styles.card}>
        {/* Shield Icon */}
        <div style={styles.iconWrapper}>
          <FaShieldAlt style={styles.shieldIcon} />
        </div>

        <h2 style={styles.title}>Admin Portal</h2>
        <p style={styles.subtitle}>
          Secure access for portfolio management
        </p>

        {/* Security notice */}
        <div style={styles.securityBadge}>
          <FaLock style={{ fontSize: '0.75rem', marginRight: '6px' }} />
          Restricted Access — Authorized Personnel Only
        </div>

        {/* Error message */}
        {error && (
          <div style={styles.errorBox}>
            <span style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>
              ⛔ Access Denied
            </span>
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            ...styles.googleBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <div style={styles.btnSpinner}></div>
              Signing in...
            </>
          ) : (
            <>
              <FaGoogle style={styles.googleIcon} />
              Continue with Google
            </>
          )}
        </button>

        <p style={styles.footerNote}>
          Only the authorized Google account can access this panel.
        </p>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
    backgroundColor: '#0F172A',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(59, 130, 246, 0.15)',
    borderTop: '3px solid #3B82F6',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  backButton: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#94A3B8',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10,
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#1E293B',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '40px 36px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    zIndex: 1,
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  shieldIcon: {
    fontSize: '1.8rem',
    color: '#3B82F6',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  subtitle: {
    fontSize: '0.92rem',
    color: '#94A3B8',
    marginBottom: '20px',
  },
  securityBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(34, 197, 94, 0.08)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    color: '#22C55E',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.03em',
    marginBottom: '24px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    color: '#FCA5A5',
    padding: '14px 16px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '20px',
    textAlign: 'left',
    lineHeight: '1.5',
  },
  googleBtn: {
    width: '100%',
    padding: '14px',
    background: '#FFFFFF',
    color: '#111827',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
    fontFamily: "'Inter', sans-serif",
  },
  googleIcon: {
    fontSize: '1.1rem',
    color: '#EA4335',
  },
  btnSpinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(0,0,0,0.1)',
    borderTop: '2px solid #111827',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  footerNote: {
    fontSize: '0.78rem',
    color: '#475569',
    marginTop: '20px',
    lineHeight: '1.5',
  },
};

export default Login;
