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
          <div className={styles.jobBottom}>
            <div className={styles.jobFlexbox}>
              {job.company || job.location ? (
                <>
                  {job.company ? 
                    <p className={styles.jobCompany}>{job.company}</p> : null}
                  {job.location ? 
                    <p className={styles.jobLocation}>{job.location}</p> : null}
                </>
              ) : null}
            </div>
            {job.link ?
              <a 
                className={styles.jobLink} 
                href={job.link} 
                target="_blank"
              >🔗Job Posting🔗</a> : null}
          </div> ) : null}
        <div className={styles.jobButtonDiv}>
          <div 
            className={styles.circleDelete} 
            onClick={() => deleteJob(job.id)}
          >
           <svg height="24px" xmlns="http://www.w3.org/2000/svg" className={styles.trashSVG} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        <div className={styles.chevronDiv} >
          <svg onClick={() => setShowMore(!showMore)}
            height="24px" xmlns="http://www.w3.org/2000/svg" className={styles.chevronSVG} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          {job.tags.length ? <TagDisplay job={job} /> : null}
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
      <div key={tag} className={styles.tag}>
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
