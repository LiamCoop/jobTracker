import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/About.module.css";
import { useJobs, createJob, updateJob, deleteJob } from '../api2';
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

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className={styles.jobGrid}>
        <div className={styles.jobAppliedDiv}>
          <div 
            className={styles.circle}
            onDoubleClick={() => 
              updateJob({ ...job, applied: !job.applied })
            }
          >
            <p className={styles.jobAppliedSymbol}>{job.applied ? '✔' : '✕'}</p>
          </div>
          <p className={styles.jobAppliedText}>{`${job.applied ? '' : 'Not'} Applied`}</p>
        </div>
        <p className={styles.jobTitle}>{job.title}</p>
        <div className={styles.jobFlexbox}>
          <p className={styles.jobCompany}>{job.company}</p>
          <p className={styles.jobLocation}>{job.location}</p>
          {job.datePosted ? 
            <p className={styles.jobDatePosted}>{job.datePosted}</p> : null}
        </div>
        <button 
          className={styles.deleteButton} 
          onClick={() => deleteJob(job.id)}
        >
          x
        </button>
        <p 
          className={styles.carat} 
          onClick={() => setShowMore(!showMore)}
        >
          ⌄
        </p>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          {job.link ?
            <a className={styles.jobLink} href={job.link} target="_blank">
              {job.link} 
            </a> : null}
          {job.description ? 
            <p className={styles.jobDescription}>{job.description}</p> : null}
          {job.notes ? 
            <p className={styles.notes}>{job.notes}</p> : null}
        </div> 
      }
    </>
  );
}

const AddJobFold = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.addJobFoldContainer}>
      <div className={styles.addJobIcon}>
        <div 
          onClick={() => setShow(!show)} 
          className={styles.circle}
        >
          <p>+</p>
        </div>
        <p>Add a job</p>
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
  const [datePosted, setDatePosted] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  // const [tags, setTags] = useState([]);

  const resetJob = () => {
    setTitle('')
    setCompany('')
    setDescription('')
    setApplied(false)
    setNotes('')
    setContact('')
    setDatePosted('');
    setDateClosed('');
    setLocation('');
    setLink('');
  }
  const fireCreateJob = () => createJob(
    title, 
    description, 
    company, 
    applied, 
    contact, 
    notes,
    datePosted,
    dateClosed,
    location,
    link,
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
        <input 
          type="checkbox" 
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
        <label htmlFor="applied">Applied</label>
      </div>
      <input 
        className={`${styles.input} ${styles.inputCompany}`}
        placeholder="Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputTitle}`}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputNotes}`}
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputContact}`}
        placeholder="Contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDatePosted}`}
        placeholder="Post Date"
        value={datePosted}
        onChange={e => setDatePosted(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDateClosed}`}
        placeholder="Close Date"
        value={dateClosed}
        onChange={e => setDateClosed(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputLocation}`}
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.link}`}
        placeholder="Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDescription}`}
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button className={styles.addJobButton}>Add Job</button>
    </form>

  );
}

export default About;
