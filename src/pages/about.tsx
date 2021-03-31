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
        <div className={styles.jobFoldDiv}><AddJobFold /></div>
        {jobs.map((job) => (
          <JobItem job={job} />
        ))}
      </main>

    </div>
  );
}

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.jobItem}>
      <div className={styles.jobMain}>
        <p>{`Applied: ${job.applied ? '✔' : '✕'}`}</p>
        <p>{`Title: ${job.title}`}</p>
        <p>{`Company: ${job.company}`}</p>
        <p>{`Contact: ${job.contact}`}</p>
        <p onClick={() => setShowMore(!showMore)}>⌄</p>
        <div className={styles.jobButtons}>
          <button 
            className={styles.deleteButton} 
            onClick={() => deleteJob(job.id)}
          >
            ✕
          </button>
          <button 
            className={styles.editButton} 
          >
            Edit
          </button>
        </div>
      </div>
      {showMore && 
        <div className={styles.jobMore}>
          <p>{job.description}</p>
          <p>{job.notes}</p>
        </div>
      }
    </div>
  );
}

const AddJobFold = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className={styles.plusGroup}>
        <div 
          onClick={() => setShow(!show)} 
          className={styles.circle}
        >
          <p>+</p>
        </div>
        <p>Click to add new job</p>
      </div>
      {show && <AddJobItem closeFold={() => {setShow(false)}} /> }
    </div>
  )
}

const AddJobItem = ({ closeFold }) => {
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
  const fireCreateJob = () => 
    createJob(
      title, 
      description, 
      company, 
      applied, 
      contact, 
      notes
    );
  return (
    <form
      className={styles.addJob}
      onSubmit={async e => {
        e.preventDefault()
        fireCreateJob()
        resetJob()
        closeFold()
      }}
    >
      <div>
        <label htmlFor="applied">Applied</label>
        <input 
          type="checkbox" 
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
      </div>
      <input 
        className={styles.input + styles.inputCompany}
        placeholder="Company Name"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputTitle}
        placeholder="Job Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputDescription}
        placeholder="Job Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputNotes}
        placeholder="Additional notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputContact}
        placeholder="Contact Info"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <button className={styles.button}>submit</button>
    </form>

  );
}

export default About;
