import React, { useState } from "react";
import styles from './Job.module.css';
import { updateJob, deleteJob } from '../../api';
import { Job } from '../../types';

export const JobItem: React.FC<{ 
  job: Job, 
  searchTag: (tag: string) => void 
}> = ({ job, searchTag }) => {
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
          {job.link ? <a 
            className={styles.jobLink} 
            href={job.link} 
            target="_blank"
          >🔗</a> : null}
        </div>
      </div>
      {showMore && 
        <div className={styles.jobShowMore}>
          <TagDisplay job={job} searchTag={searchTag} />
          <div className={styles.dates}>
            {job.datePosted ? 
              <p className={styles.jobDatePosted}>{`Posted: ${job.datePosted}`}</p> : null}
            {job.dateClosed ? 
              <p className={styles.jobDateClosed}>{`Closes: ${job.dateClosed}`}</p> : null}
          </div>
          {job.description ? 
            <>
              <h1 className={styles.header}>Job Description</h1>
              <Editable textArea item={job.description} update={(arg: string) => {
                updateJob({ ...job, description: arg })
              }} />
            </> : null}
          {job.notes ? 
            <>
              <h1 className={styles.header}>Notes</h1>
              <Editable textArea={false} item={job.notes} update={(arg: string) => {
                updateJob({ ...job, notes: arg }) }} 
              />
            </> : null}
          {job.contact ? 
            <>
              <h1 className={styles.header}>Contact</h1>
              <Editable textArea={false} item={job.contact} update={(arg: string) => {
                updateJob({ ...job, contact: arg })}} 
              />
            </> : null}
        </div>
      }
    </div>
  );
}

const Editable: React.FC<{ textArea: boolean, item: string, update: (arg: string) => void }> = 
({ textArea = false, item, update }) => {
  const [editing, setEditing] = useState(false);
  const [itemVal, setItemVal] = useState(item);
  return (
    <>
      {!editing ? (
        <div
          onDoubleClick={() => setEditing(true)} 
          className={styles.jobNotes}
        >
          {itemVal}
        </div>
      ) : (
        <div className={styles.editDiv}>
          {textArea ? (
            <textarea 
              className={styles.editTextInput}
              placeholder="Description"
              value={itemVal}
              onChange={e => setItemVal(e.target.value)}
            />
          ) : (
            <input 
              autoFocus
              className={styles.editInput}
              value={itemVal}
              onChange={e => setItemVal(e.target.value)}
            />)
          }
          <button 
            className={styles.editSave}
            onClick={() => {
              setEditing(false)
              update(itemVal)
            }}
          >
            <svg height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>  
        )
      }
    </>
  )
}


const TagDisplay: React.FC<{ 
  job: Job,
  searchTag: (tag: string) => void 
}> = ({ job, searchTag }) => {
  const [hover, setHover] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      updateJob(
        { ...job, tags: Array.from(new Set ([...job.tags, text]))}
      )
      setText('')
      setShowInput(false)
    }
  }

  return (
    <div 
      className={styles.tagsDiv}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setShowInput(false)
        setText('')
      }}
    >
      {job.tags.map((tag, idx) => 
        <div 
          className={styles.tag} 
          onClick={() => searchTag(tag)}
          key={tag} 
        >
          <p 
            className={styles.tagRemove}
            onClick={(e) => {
              e.stopPropagation()
              updateJob({ ...job, tags: 
                job.tags.filter((t, iidx) => idx !== iidx )
              })
            }}
          >x</p>
          <p className={styles.tagText}>{tag}</p>
        </div>
      )}
      {hover && 
        <div 
          onClick={() => setShowInput(true)}
          className={styles.tag}
          style={showInput ? {cursor: 'default'}: {}}
        >
          {showInput ? 
            <input 
              autoFocus
              className={styles.addTagInput}
              value={text}
              placeholder="tag"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            /> : <p className={styles.addTagText}>+</p>
          }
        </div >
      }
    </div>
  )
}
