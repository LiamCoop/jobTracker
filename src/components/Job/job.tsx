import React, { useState } from "react";
import styles from './Job.module.css';
import { updateJob, deleteJob } from '../../api2';
import { Job } from '../../types';

export const JobItem: React.FC<{ job: Job }> = ({ job }) => {
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
        <div className={styles.jobButtonDiv}>
          <button 
            className={styles.deleteButton} 
            onClick={() => deleteJob(job.id)}
          >
            x
          </button>
          {/*<button className={styles.editButton}>
            Edit
          </button>*/}
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
            <a 
              className={styles.jobLink} 
              href={job.link} 
              target="_blank"
            >
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

