import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/About.module.css";
import { useJobs, updateJob, deleteJob } from '../api2';
import { AddJobFold } from '../components/AddJob/addJob';
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
  const [isEditing, setIsEditing] = useState(false);

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
        <div className={styles.jobButtonDiv}>
          <button 
            className={styles.deleteButton} 
            onClick={() => deleteJob(job.id)}
          >
            x
          </button>
          {isEditing ? (
              <button 
                className={styles.saveButton}
                onClick={() => setIsEditing(false)}
              >
                Save
              </button>
            ) : ( <button 
                className={styles.editButton} 
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button> 
            ) 
          }
        </div>
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



export default About;
