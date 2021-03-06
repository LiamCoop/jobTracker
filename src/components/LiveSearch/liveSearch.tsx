import React, { useEffect, useState } from "react";
import styles from './LiveSearch.module.css';
import { useJobs } from '../../api';
import { JobItem } from '../Job/job';
import { Job, User } from '../../types';

export const LiveSearch: React.FC<{ user?: User }> = ({ user }) => {
  const { data: jobs, error } = useJobs(user?.sub);

  const [show, setShow] = useState([])
  const [text, setText] = useState('')
  const [tag, setTag] = useState(null);

  const searchTag = (argtag: string) => setTag(tag !== argtag ? argtag : null)

  useEffect(() => {
    let tryshow = jobs ? jobs : [];
    if(tag) {
      tryshow = tryshow.filter((job: Job) => 
        job.tags.filter((jtag: string) => jtag === tag).length !== 0
      )
    }
    if(text) {
      tryshow = tryshow.filter((job: Job) => 
        Object.values(job).join('').toLowerCase()
          .includes(text.toLowerCase())
      )
    }
    setShow(tryshow)
  }, [jobs, tag, text])
  
  if (error != null) 
    return <div className={styles.noJob}>Error loading jobs...</div>
  if (jobs == null) 
    return <div className={styles.noJob}>Loading...</div>

  return(
    <>
      {jobs.length === 0 ? (
        <div className={styles.noJob}>
          <p>Try adding a job!</p>
        </div>
      ) : (
        <div className={styles.liveSearchContainer}>
          <div className={styles.searchGroup}>
            {tag && <div className={styles.tagContainer}>
              <div className={styles.tag} onClick={() => searchTag(tag)}>
                <p className={styles.tagText}>{tag}</p>
              </div>
            </div>}
            <div className={styles.searchBar}>
              <input
                className={styles.searchTerm}
                value={text}
                placeholder="Search Jobs"
                onChange={e => setText(e.target.value)}
              />
              <div className={styles.searchButton}>
                <svg height="24px" width="34px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.jobContainer}>
            {show.map((job) => <JobItem job={job} key={job.id} searchTag={searchTag} />)}
          </div>
        </div>
      )}
    </>
  )
}
