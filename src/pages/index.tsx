import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { AddJobFold } from '../components/AddJob/addJob';
import { Header } from '../components/Header/header';
import { LiveSearch } from '../components/LiveSearch/liveSearch';
import { useUser } from '@auth0/nextjs-auth0';


const Home: NextPage = () => {

  const { user, isLoading } = useUser();

  return (
    <div>
      <Head>
        <title>About</title>
        <meta key="cacheControl" httpEquiv='cache-control' content='no-cache' />
        <meta key="httpEquiv" httpEquiv='expires' content='0' />
        <meta key="httpEquiv2" httpEquiv='pragma' content='no-cache' />
      </Head>

      <main className={styles.main}>
        {isLoading ? <div>Loading...</div> :
          <>
            {user ? 
              <>
                <Header />
                <AddJobFold />
                <div className={styles.liveSearchContainer}>
                  <LiveSearch user={user} />
                </div>
              </> : <Land />
            }
          </>
        }
      </main>

    </div>
  );
}

const Land: React.FC = () => {
  return (
    <div>
      <a href="/api/auth/login">
        <div className={styles.linkDiv}>
          <h1 className={styles.login}>Login</h1>
        </div>
      </a>
    </div>
  )
}

export default Home;
