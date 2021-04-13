import React from 'react';
import styles from './Header.module.css';
import { useUser } from '@auth0/nextjs-auth0';

export const Header = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.linkContainer}>
        {user ? (
          <a href="/api/auth/logout?returnTo=http%3A@2F@2Flocalhost:3000">
            <div className={styles.logDiv}>
              <p className={styles.login}>Logout</p>
            </div>
          </a>
        ) : (
          <a href="/api/auth/login">
            <div className={styles.logDiv}>
              <p className={styles.logout}>Login</p>
            </div>
          </a>
        )}
      </div>
      <div className={styles.userContainer}>
        {user ? (
          <>
            <img 
              className={styles.userAvatar} 
              src={user?.picture} 
              alt={user?.name} 
            />
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userEmail}>{user?.email}</p>
          </>
        ) : null}
      </div>
    </div>
  )
}
