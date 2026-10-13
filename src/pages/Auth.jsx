
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
  const [ formData, setformData ] = useState(null);
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
    setformData(null);
    if(formType === 'login') {
      setformType('signup');
    } else {
      setformType('login');
    }
  };

  const handleFormDataChange = (e) => {
    setformData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    switch (formType) {
      case 'login':
        login(formData)
      break;
      case 'signup':
        if(formData.password !== formData.confirmPassword) {
          console.log('Passwords do not match');
          return
        }
        signup(formData);

      break;
    }
  }

  if(authLoading) {
    return ( <h1>Loading...</h1> )
  }

  return(
    <div className={styles.authPageContainer}>
      {formType === 'login' ? (
        <>
          <h1>Login</h1>
            <button onClick={handleChangeFormType}>Dont you have an account? Click here</button>
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
