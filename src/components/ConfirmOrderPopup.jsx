/* eslint-disable react/prop-types */

import styles from './ConfirmOrderPopup.module.css';
import { Dialog, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Centralized auth storage: validates JWT expiry, isolates localStorage,
// and fails safely on corrupted/missing data (CWE-798 / CWE-754 mitigation).
import { getSession } from '../lib/authStorage';

function ConfirmOrderPopup({ open, onClose, onConfirm }) {
  const [ formData, setFormData ] = useState(null);
  const session = getSession(); // Safe, validated JWT session
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!session?.user?._id) {
      // No authenticated user → redirect to login/signup page
      return navigate('/auth');
    }

    if (!formData?.pickupTime) {
      return;
    } else {
      const orderData = {
        userId: session.user._id,
        pickupTime: formData.pickupTime,
      };
      // console.log(orderData); // <-- removed to avoid leaking PII/token info
      onConfirm(orderData);
    }
  };

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.popupContainer}>
        <h2>We`re almost there...</h2>
        <p>Confirm your order with the current date:<strong>{(new Date()).toLocaleDateString()}</strong>. What time will you come to pick up your order?</p>
        <form className={styles.formContainer}>
          <TextField
            onChange={handleFormDataChange}
            required
            type="time"
            name="pickupTime"
          />
          <div className={styles.confirmBtns}>
            <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ConfirmOrderPopup;