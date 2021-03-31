import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/About.module.css";
import { useJobs, createJob, deleteJob } from '../api2';
import { Job } from '../types';

const About: NextPage = () => {
  const { data: jobs, error } = useJobs();

  if (error != null) return <div>Error loading jobs...</div>
  if (jobs == null) return <div>Loading...</div>

  if (jobs.length === 0) {
    return <div className={styles.emptyState}>Add a job</div>
  }

  return (
    <div>
      <Head>
        <title>About</title>
      </Head>

      <main className={styles.main}>
        <AddJobItem />
        {jobs.map((job) => (
          <JobItem job={job} />
        ))}
      </main>

    </div>
  );
}

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className={styles.jobItem}>
      <button 
        className={styles.deleteButton} 
        onClick={() => deleteJob(job.id)}
      >✕</button>
      <p>{job.applied ? 'appl' : 'notAppl'}</p>
      <p>{job.title}</p>
      <p>{job.company}</p>
      <p>{job.description}</p>
    </div>
  );
}

const AddJobItem = () => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [applied, setApplied] = useState(false)
  const [notes, setNotes] = useState('')
  const [contact, setContact] = useState('')

  const resetJob = () => {
    setTitle('')
    setCompany('')
    setDescription('')
    setApplied(false)
    setNotes('')
    setContact('')
  }

  return (
    <form
      className={styles.addJob}
      onSubmit={async e => {
        e.preventDefault(); 
        createJob(
          title,
          description,
          company,
          applied,
          contact,
          notes,
        );
        resetJob()
      }}
    >
      <input 
        type="checkbox" 
        checked={applied}
        value="applied"
        onChange={e => setApplied(!applied)}
      />
      <input 
        className={styles.input + styles.inputTitle}
        placeholder="job title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputCompany}
        placeholder="company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputDescription}
        placeholder="job description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputNotes}
        placeholder="notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputContact}
        placeholder="contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <button className={styles.button}>submit</button>
    </form>

  );
}

export default About;
