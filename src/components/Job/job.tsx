import React, { useState } from "react";
import styles from './Job.module.css';
import { updateJob, deleteJob } from '../../api2';
import { Job } from '../../types';
import { DeleteSVG, ChevronSVG } from '../svgs/svgs';

export const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div className={styles.jobContainer}>
      <div className={styles.jobGrid}>
        <div className={styles.jobAppliedDiv}>
          <div 
            className={styles.circle}
            onDoubleClick={() => 
              updateJob({ ...job, applied: !job.applied })
            }
          >
            <p className={`${styles.applied} ${job.applied ? styles.applCheck : styles.applX}`}>
              {job.applied ? '✔' : '✕'}
            </p>
          </div>
          <p className={styles.jobAppliedText}>{`${job.applied ? '' : 'Not '}Applied`}</p>
        </div>
        <p className={styles.jobTitle}>{job.title}</p>
        <div className={styles.jobBottom}>
          <div className={styles.jobFlexbox}>
            {job.company ? 
              <p className={styles.jobCompany}>{job.company}</p> : null}
            {job.location ? 
              <p className={styles.jobLocation}>{job.location}</p> : null}
            {job.datePosted ? 
              <p className={styles.jobdatePosted}>{job.datePosted}</p> : null}
          </div>
          <div onClick={() => setShowMore(!showMore)} className={styles.chevronDiv} >
            <ChevronSVG />
          </div>
        </div> 
        <div className={styles.jobButtonDiv}>
          <div onClick={() => deleteJob(job.id)} className={styles.circleDelete} >
            <DeleteSVG />
          </div>
        </div>
        <div className={styles.jobLinkDiv}>
          {job.link ? <a 
            className={styles.jobLink} 
            href={job.link} 
            target="_blank"
          >🔗</a> : null}
        </div>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          {job.tags.length ? <TagDisplay job={job} /> : null}
          {job.description ? 
            <p className={styles.jobDescription}>
              {job.description}
            </p> : null}
          {job.notes ? 
            <p className={styles.notes}>{job.notes}</p> : null}
        </div>
      }
    </div>
  );
}

const TagDisplay: React.FC<{ job: Job }>= ({ job }) => {
  const [hover, setHover] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      updateJob({ ...job, tags: Array.from(new Set ([...job.tags, text]))})
      setText('')
      setShowInput(false)
    }
  }

  return (
    <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setShowInput(false)
      }}
      className={styles.tagsDiv}
    >
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
      {hover && 
        <div onClick={() => setShowInput(true)}
          className={styles.tag}
        >
          {showInput ? 
            <input 
              className={styles.addTagInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="tag"
              onKeyDown={handleKeyDown}
            /> : <p className={styles.addTagText}>+</p>
          }
        </div >
      }
    </div>
  )
}
