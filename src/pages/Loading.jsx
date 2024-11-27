
import styles from './Loading.module.css';

import { CircularProgress } from '@mui/material';

function Loading() {
  return (
    <div className={styles.loadingPageContainer}>
        <h3>Loading...</h3>
        <br/>
        <CircularProgress color='primary'/>
    </div>
  )
}

export default Loading;
