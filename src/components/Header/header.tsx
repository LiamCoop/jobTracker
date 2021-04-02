import React from 'react';
import styles from './Header.module.css';
import { useUser } from '@auth0/nextjs-auth0';

const User: React.FC = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user ? (
      <div className={styles.userContainer}>
        <img 
          className={styles.userAvatar} 
          src={user.picture} 
          alt={user.name} 
        />
        <p className={styles.userName}>{user.name}</p>
        <p className={styles.userEmail}>{user.email}</p>
      </div>
    ) : null
  );
}

export const Header = () => (
  <div className={styles.headerContainer}>
    <a href="/api/auth/login">Login</a>
    <a href="/api/auth/logout?returnTo=http%3A@2F@2Flocalhost:3000">Logout</a>
    <User />
  </div>
)
