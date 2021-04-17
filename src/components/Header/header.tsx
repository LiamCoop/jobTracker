import React from 'react';
import styles from './Header.module.css';
import { useUser } from '@auth0/nextjs-auth0';

export const Header = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.headerContainer}>
      {user ? (
        <>
          <div className={styles.userContainer}>
            <img 
              className={styles.userAvatar} 
              src={user?.picture} 
              alt={user?.name} 
            />
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userEmail}>{user?.email}</p>
          </div>
          <a className={styles.link} href="/api/auth/logout">
            <div className={styles.logDiv}>
              <p className={styles.login}>Logout</p>
            </div>
          </a>
        </>
      ) : (
        <a className={styles.link} href="/api/auth/login">
          <div className={styles.logDiv}>
            <p className={styles.logout}>Login</p>
          </div>
        </a>
      )}
    </div>
  )
}
