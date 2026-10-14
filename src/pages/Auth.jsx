
import styles from './Auth.module.css';

import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/S_auth';
import { LuLogIn } from 'react-icons/lu';

// Centralized auth storage: validates JWT expiry, isolates localStorage,
// and fails safely on corrupted/missing data (CWE-798 / CWE-754 mitigation).
import { getSession } from '../lib/authStorage';

function Auth() {
  const [ formType, setformType ] = useState('login');
  const [ formData, setformData ] = useState({ email: '', password: '', fullname: '', confirmPassword: '' });
  const [ formError, setFormError ] = useState('');
  const { login, signup, authLoading } = authServices();

  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session) {
      // Token is valid → redirect to profile
      navigate('/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeFormType = () => {
    setFormError('');
    setformData({ email: '', password: '', fullname: '', confirmPassword: '' });
    if(formType === 'login') {
      setformType('signup');
    } else {
      setformType('login');
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormError('');

    const email = formData.email.trim();
    const password = formData.password;
    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }
    if (formType === 'signup') {
      if (!formData.fullname.trim()) {
        setFormError('Full name is required.');
        return;
      }
      if (password.length < 8) {
        setFormError('Password must contain at least 8 characters.');
        return;
      }
      if (password !== formData.confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      signup({ ...formData, email, fullname: formData.fullname.trim() }).then((result) => {
        if (!result.success) setFormError(result.message);
      });
      return;
    }
    login({ email, password }).then((result) => {
      if (!result.success) setFormError(result.message);
    });
  };

  const handleFormDataChange = (e) => {
    setformData((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  if(authLoading) {
    return ( <h1>Loading...</h1> )
  }

  return(
    <div className={styles.authPageContainer}>
      {formType === 'login' ? (
        <>
          <h1>Login</h1>
            <button onClick={handleChangeFormType}>Dont you have an account? Click here</button>
            {formError ? <p role="alert">{formError}</p> : null}
            <form onSubmit={handleSubmitForm}>
              <TextField 
              required
              label="Email"
              type="email"
              name="email"
              onChange={handleFormDataChange}
              />
              <TextField 
              required
              label="Password"
              type="password"
              name="password"
              onChange={handleFormDataChange}
              />
            {/* <Button type="submit">Login</Button> */}
            <button type="submit">Login<LuLogIn /></button>
          </form>
        </>
      ) : null}

      {formType === 'signup' ? (
        <>
          <h1>Signup</h1>
            <button onClick={handleChangeFormType}>Already have an account? Click here</button>
            {formError ? <p role="alert">{formError}</p> : null}
            <form onSubmit={handleSubmitForm}>
              <TextField 
              required
              label="Fullname"
              type="fullname"
              name="fullname"
              onChange={handleFormDataChange}
              />
              <TextField 
              required
              label="Email"
              type="email"
              name="email"
              onChange={handleFormDataChange}
              />
              <TextField 
              required
              label="Password"
              type="password"
              name="password"
              onChange={handleFormDataChange}
              />
              <TextField 
              required
              label="Confirm password"
              type="password"
              name="confirmPassword"
              onChange={handleFormDataChange}
              />
            {/* <Button type="submit">Signup</Button> */}
            <button type="submit">Signup<LuLogIn /></button>
          </form>
        </>
      ) : null}
    </div>
  )
}

export default Auth;
