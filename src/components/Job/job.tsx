import React, { useState } from "react";
import styles from './Job.module.css';
import { updateJob, deleteJob } from '../../api';
import { AddMissing } from '../AddMissing/addMissing';
import { Editable } from '../Editable/editable';
import { Job } from '../../types';

export const JobItem: React.FC<{ 
  job: Job, 
  searchTag: (tag: string) => void, 
}> = ({ job, searchTag }) => {
  const [showMore, setShowMore] = useState(false);
  const updateTags = (utags: string[]) => updateJob({ ...job, tags: utags })

  return (
    <div className={styles.jobContainer}>
      <div className={styles.jobGrid}>
        <div className={styles.jobAppliedDiv}>
          <div 
            className={styles.circle}
            onDoubleClick={() => updateJob({ ...job, applied: !job.applied }) }
          >
            <p className={`${styles.applied} ${job.applied ? styles.applCheck : styles.applX}`}>
              {!!job.applied ? '✔' : '✕'}
            </p>
          </div>
          <p className={styles.jobAppliedText}>
            {`${!!job.applied ? '' : 'Not '}Applied`}
          </p>
        </div>
        <p className={styles.jobTitle}>{job.title}</p>
        <div className={styles.jobBottom}>
          <div className={styles.jobFlexbox}>
            {!!job.company &&
              <p className={styles.jobCompany}>{job.company}</p>}
            {!!job.location &&
              <p className={styles.jobLocation}>{job.location}</p>}
          </div>
          <div onClick={() => setShowMore(!showMore)} className={styles.chevronDiv} >
            <svg height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#333333" >
              <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div> 
        <div className={styles.jobButtonDiv}>
          <div onClick={() => deleteJob(job.id)} className={styles.circleDelete} >
            <svg height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#333333" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg> 
          </div>
        </div>
        <div className={styles.jobLinkDiv}>
          {!!job.link && 
            <a 
              className={styles.jobLink} 
              href={job.link} 
              target="_blank"
            >🔗</a> 
          }
        </div>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          <TagDisplay tags={job.tags} updateTags={updateTags} searchTag={searchTag} />
          <div className={styles.dates}>
            {!!job.datePosted &&
              <div className={styles.date}>
                <p>Posted: </p>
                <Editable 
                  item={job.datePosted} 
                  update={(arg: string) => {
                    updateJob({ ...job, datePosted: arg })
                  }} 
                />
              </div>}
            {!!job.dateClosed && 
              <div className={styles.date}>
                <p>Closes: </p>
                <Editable 
                  item={job.dateClosed} 
                  update={(arg: string) => {
                    updateJob({ ...job, dateClosed: arg })
                  }} 
                />
              </div>}
          </div>
          {!!job.description &&
            <>
              <h1 className={styles.header}>Job Description</h1>
              <Editable 
                textArea 
                item={job.description} 
                update={(arg: string) => {
                  updateJob({ ...job, description: arg })
                }} 
              />
            </>}
          {!!job.notes &&
            <>
              <h1 className={styles.header}>Notes</h1>
              <Editable 
                item={job.notes} 
                update={(arg: string) => {
                  updateJob({ ...job, notes: arg }) 
                }} 
              />
            </>}
          {!!job.contact &&
            <>
              <h1 className={styles.header}>Contact</h1>
              <Editable 
                item={job.contact} 
                update={(arg: string) => {
                  updateJob({ ...job, contact: arg })
                }} 
              />
            </>}
          {(!job.datePosted || !job.dateClosed || !job.description || 
            !job.notes || !job.contact || !job.link) && 
              <AddMissing job={job} />}
        </div>
      }
    </div>
  );
}

const TagDisplay: React.FC<{ 
  tags: string[],
  updateTags: (tags: string[]) => void,
  searchTag: (tag: string) => void 
}> = ({ tags, updateTags, searchTag }) => {
  const [hover, setHover] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      updateTags(Array.from(new Set ([...tags, text])))
      setText('')
      setShowInput(false)
    }
  }

  return (
    <div className={styles.tagsDiv}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setShowInput(false)
        setText('')
      }}
    >
      {tags.map((tag, idx) => 
        <div className={styles.tag} 
          onClick={() => searchTag(tag)}
          key={tag} 
        >
          <p className={styles.tagRemove}
            onClick={(e) => {
              e.stopPropagation()
              updateTags(tags.filter((t, iidx) => idx !== iidx))
            }}
          >x</p>
          <p className={styles.tagText}>{tag}</p>
        </div>
      )}
      {hover && 
        <div className={styles.tag}
          onClick={() => setShowInput(true)}
          style={showInput ? {cursor: 'default'}: {}}
        >
          {showInput ? 
            <input 
              autoFocus
              className={styles.addTagInput}
              value={text}
              placeholder="tag"
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            /> : <p className={styles.addTagText}>+</p>}
        </div >
      }
    </div>
  )
}
