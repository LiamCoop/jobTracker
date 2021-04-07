import React, { useEffect, useState } from "react";
import styles from './LiveSearch.module.css';
import { JobItem } from '../Job/job';
import { Job } from '../../types';



export const LiveSearch: React.FC<{ jobs: Job[]}> = 
({ jobs }) => {
  const [show, setShow] = useState(jobs);
  const [text, setText] = useState('')
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState(jobs.flatMap((job: Job) => job.tags));

  // adjust if a tag is clicked (to show those with that tag)
  const searchTag = (argtag: string) => {
    setTag(tag !== argtag ? argtag : null)
  }

  // if tag, text (search params) change
  // refine tags first, then refine by text
  useEffect(() => {
    let tryshow = jobs;
    if(tag) {
      tryshow = tryshow.filter((job: Job) => 
        job.tags.filter((jobtag) => jobtag === tag).length)
    }
    if(text) {
      tryshow = tryshow.filter((job: Job) => Object.values(job).join()
        .toLowerCase().includes(text.toLowerCase()))
    }
    setShow(tryshow)
  }, [tag, text, jobs])

  
  return(
    <div className={styles.liveSearchContainer}>
      <div className={styles.searchGroup}>
        <div className={styles.searchBar}>
          <input
            className={styles.searchTerm}
            value={text}
            placeholder="Search Jobs"
            onChange={e => setText(e.target.value)}
          />
          <button className={styles.searchButton}>
            <svg className={styles.svg} height="24px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {tag && <div className={styles.tagContainer}>
          <div className={styles.tag} onClick={() => searchTag(tag)}>
            <p className={styles.tagText}>{tag}</p>
          </div>
        </div>}
      </div>
      <div className={styles.jobContainer}>
        {show.map((job) => 
          <JobItem job={job} key={job.id} searchTag={searchTag} />
        )}
      </div>
    </div>
  )
}
