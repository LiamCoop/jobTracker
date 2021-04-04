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
        {job.company || job.location || job.datePosted || job.link ? (
          <div className={styles.jobFlexbox}>
            {job.company ? 
              <p className={styles.jobCompany}>{job.company}</p> : null}
            {job.location ? 
              <p className={styles.jobLocation}>{job.location}</p> : null}
            {job.link ?
            <a 
              className={styles.jobLink} 
              href={job.link} 
              target="_blank"
            >🔗Job Posting🔗</a> : null}
          </div>) : null}
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
          {job.tags !== [] ? <TagDisplay job={job} /> : null}
          {job.datePosted ? 
            <p className={styles.jobDatePosted}>{job.datePosted}</p> : null} 
          {job.description ? 
            <p className={styles.jobDescription}>{job.description}</p> : null}
          {job.notes ? 
            <p className={styles.notes}>{job.notes}</p> : null}
        </div> 
      }
    </>
  );
}

const TagDisplay: React.FC<{ job: Job }>= ({ job }) => (
 <div className={styles.tagsDiv}>
    {job.tags.map((tag, idx) => 
      <div className={styles.tag}>
        <p 
          className={styles.tagRemove}
          onClick={() => updateJob( { ...job, 
            tags: job.tags.filter((_, iidx) => idx !== iidx )}
          )}
        >x</p>
        <p className={styles.tagText}>{tag}</p>
      </div>
      )}
  </div>
)
