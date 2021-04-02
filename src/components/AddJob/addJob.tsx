import React, { useState } from "react";
import { createJob } from '../../api2';
import styles from './AddJob.module.css';

export const AddJobFold = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.addJobFoldContainer}>
      <div className={styles.addJobIcon}>
        <div 
          className={styles.circle}
          onClick={() => setShow(!show)} 
        >
          <p>+</p>
        </div>
        <p>Add a job</p>
      </div>
      {show && <AddJobItem closeFold={() => {setShow(false)}} /> }
    </div>
  )
}

const AddJobItem = ({ closeFold }) => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [applied, setApplied] = useState(false)
  const [notes, setNotes] = useState('')
  const [contact, setContact] = useState('')
  const [datePosted, setDatePosted] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  // const [tags, setTags] = useState([]);

  const resetJob = () => {
    setTitle('')
    setCompany('')
    setDescription('')
    setApplied(false)
    setNotes('')
    setContact('')
    setDatePosted('');
    setDateClosed('');
    setLocation('');
    setLink('');
  }

  const fireCreateJob = () => createJob(
    title, 
    description, 
    company, 
    applied, 
    contact, 
    notes,
    datePosted,
    dateClosed,
    location,
    link,
  );

  return (
    <form
      className={styles.addJob}
      onSubmit={async e => {
        e.preventDefault()
        fireCreateJob()
        resetJob()
        closeFold()
      }}
    >
      <input 
        className={`${styles.input} ${styles.inputCompany}`}
        placeholder="Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputTitle}`}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputNotes}`}
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputContact}`}
        placeholder="Contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDatePosted}`}
        placeholder="Post Date"
        value={datePosted}
        onChange={e => setDatePosted(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDateClosed}`}
        placeholder="Close Date"
        value={dateClosed}
        onChange={e => setDateClosed(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputLocation}`}
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputLink}`}
        placeholder="Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDescription}`}
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div>
        <input 
          type="checkbox" 
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
        <label htmlFor="applied">Applied</label>
        <button className={styles.addJobButton}>Add Job</button>
      </div>
    </form>
  );
}