import styles from './Profile.module.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S_auth from '../services/S_auth';
import OrderServices from '../services/OrderServices';
import { LuLogOut, LuTimer, LuAlertCircle, LuCheckCircle } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Loading from './Loading';

// Centralized auth storage: validates JWT expiry, isolates localStorage,
// and fails safely on corrupted/missing data (CWE-798 / CWE-754 mitigation).
import { getSession } from '../lib/authStorage';

function Profile() {
  const { logout } = S_auth();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } = OrderServices();
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      // No valid session → redirect to login/signup page
      return navigate('/auth');
    } else if (refetchOrders) {
      // Guard: only fetch if we have a user id (avoid undefined query param)
      getUserOrders(session?.user?._id);
    }
  }, [session, getUserOrders, navigate, refetchOrders]);

  if (orderLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    return navigate('/auth');
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1>{session?.user?.fullname}</h1>
        <h2>{session?.user?.email}</h2>
      </div>
      <button onClick={handleLogout}>Logout<LuLogOut /></button>

      {ordersList.length > 0 ? (
        <div className={styles.ordersContainer}>
          {ordersList.map((order) => (
            <div key={order._id} className={styles.orderContainer}>
              {order.pickupStatus === 'Pending' ? (
                <p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer />{order.pickupStatus}</p>
              ) : null}
              {order.pickupStatus === 'Completed' ? (
                <p className={`${styles.pickupStatus} ${styles.completed}`}><LuCheckCircle />{order.pickupStatus}</p>
              ) : null}
              {order.pickupStatus === 'Canceled' ? (
                <p className={`${styles.pickupStatus} ${styles.canceled}`}><LuAlertCircle />{order.pickupStatus}</p>
              ) : null}
              <h3>{order.pickupTime}</h3>
              {order.orderItems && order.orderItems.map((item) => (
                <div key={item._id}>
                  <h4>{item.itemDetails?.[0]?.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          You dont have orders yet:
          <br />
          <Link to={'/plates'} className={styles.platesLink}>Click here and see our specialities !</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;