import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/About.module.css";
import { useJobs } from '../api2';
import { AddJobFold } from '../components/AddJob/addJob';
import { Header } from '../components/Header/header';
import { LiveSearch } from '../components/LiveSearch/liveSearch';
import { useUser } from '@auth0/nextjs-auth0';

const About: NextPage = () => {
  const { user } = useUser();

  const { data: jobs, error } = useJobs(user?.sub);

  if (error != null) return <div>Error loading jobs...</div>
  if (jobs == null) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>About</title>
        <meta key="cacheControl" http-equiv='cache-control' content='no-cache' />
        <meta key="httpEquiv" http-equiv='expires' content='0' />
        <meta key="httpEquiv2" http-equiv='pragma' content='no-cache' />
      </Head>
      

      <main className={styles.main}>
        <Header />
        <AddJobFold />
        <div className={styles.liveSearchContainer}>
          <LiveSearch jobs={jobs} />
        </div>
      </main>

    </div>
  );
}

export default About;
