import React, { useState } from "react";
import styles from './Job.module.css';
import { updateJob, deleteJob } from '../../api2';
import { Job } from '../../types';
import { DeleteSVG, ChevronSVG } from '../svgs/svgs';

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
            {job.applied ? '✔' : '✕'}
          </div>
          <p className={styles.jobAppliedText}>{`${job.applied ? '' : 'Not '}Applied`}</p>
        </div>
        <p className={styles.jobTitle}>{job.title}</p>
        {/*job.company || job.location || job.datePosted || job.link ? (*/}
          <div className={styles.jobBottom}>
            <div className={styles.jobFlexbox}>
              {job.company ? 
                <p className={styles.jobCompany}>{job.company}</p> : null}
              {job.location ? 
                <p className={styles.jobLocation}>{job.location}</p> : null}
            </div>
            {job.link ?
              <a 
                className={styles.jobLink} 
                href={job.link} 
                target="_blank"
              >🔗</a> : null}
          </div> 
        {/*) : null*/}
        <div className={styles.jobButtonDiv}>
          <div onClick={() => deleteJob(job.id)} className={styles.circleDelete} >
            {/*<DeleteSVG />*/}
          </div>
        </div>
        <div onClick={() => setShowMore(!showMore)} className={styles.chevronDiv} >
          {/*<ChevronSVG />*/}
        </div>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          {job.tags.length ? <TagDisplay job={job} /> : null}
          <ShowMore 
            datePosted={job.datePosted} 
            description={job.description} 
            notes={job.notes} 
          />
        </div>
      }
    </>
  );
}

const ShowMore: React.FC<{ 
  datePosted: string, 
  description: string, 
  notes: string
}> = ({ datePosted, description, notes}) => (
  <>
    {datePosted ? 
      <p className={styles.jobDatePosted}>{datePosted}</p> : null} 
    {description ? 
      <p className={styles.jobDescription}>{description}</p> : null}
    {notes ? 
      <p className={styles.notes}>{notes}</p> : null}
  </> 

)

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
