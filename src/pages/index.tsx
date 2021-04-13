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
      <Head><title>JobTracker</title></Head>

      <main className={styles.main}>
        {isLoading ? <div>Loading...</div> :
          <>
            <Header />
            <AddJobFold user={user} />
            <div className={styles.liveSearchContainer}>
              <LiveSearch user={user} />
            </div>
          </>
        }
      </main>

    </div>
  );
}

export default Home;
