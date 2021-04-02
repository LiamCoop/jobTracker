import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/About.module.css";
import { useJobs } from '../api2';
import { AddJobFold } from '../components/AddJob/addJob';
import { JobItem } from '../components/Job/job';
import { Header } from '../components/Header/header';
import { Job } from '../types';

const About: NextPage = () => {
  const { data: jobs, error } = useJobs();

  if (error != null) return <div>Error loading jobs...</div>
  if (jobs == null) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      
      <Header />

      <main className={styles.main}>
        <div className={styles.jobFoldDiv}>
          <AddJobFold />
        </div>
        <LiveSearch jobs={jobs} />
      </main>

    </div>
  );
}

const LiveSearch: React.FC<{ jobs: Job[]}> = ({ jobs }) => {
  const [text, setText] = useState('')
  const [show, setShow] = useState(jobs);

  useEffect(() => {
    const updateSearch = () => {
      const display = jobs.filter((job) => (
        job.company.includes(text) ||  
        job.title.includes(text) || 
        job.description.includes(text) ||
        job.notes.includes(text) || 
        job.location.includes(text) || 
        job.contact.includes(text) ||
        job.datePosted.includes(text) ||
        job.link.includes(text)
      ))
      setShow(display)
    }
    updateSearch()
  }, [text, jobs])

  return(
    <div className={styles.liveSearchContainer}>
      <form
        className={styles.liveSearchForm} 
        onSubmit={async e => { e.preventDefault() }}
      >
        <input
          className={`${styles.input} ${styles.liveSearchInput}`}
          value={text}
          placeholder="Search Jobs"
          onChange={e => setText(e.target.value)}
        />
      </form>
      {show.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  )
}

export default About;
