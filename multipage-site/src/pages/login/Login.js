import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// styles
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const authentication = getAuth();
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      if (res.user) {
        navigate('/');
      }
      console.log(res.user.displayName);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2 className={styles['form-title']}>Login</h2>
      <div className={styles['form-group']}>
        <label htmlFor="email" className={styles['form-label']}>
          <span>Email:</span>
        </label>
        <input
          id="email"
          type="email"
          className={styles['form-input']}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="password" className={styles['form-label']}>
          <span>Password:</span>
        </label>
        <input
          id="password"
          type="password"
          className={styles['form-input']}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      {isPending ? (
        <button className={styles['btn']} disabled>
          Loading...
        </button>
      ) : (
        <button className={styles['btn']}>Login</button>
      )}
      {error && <p className={styles['error-message']}>{error}</p>}
    </form>
  );
}