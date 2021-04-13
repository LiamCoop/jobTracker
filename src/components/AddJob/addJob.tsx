import React, { useState } from "react";
import { createJob } from '../../api';
import { useUser } from '@auth0/nextjs-auth0';
import styles from './AddJob.module.css';

export const AddJobFold = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.addJobIcon}>
        <div 
          className={styles.circle}
          onClick={() => setShow(!show)} 
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className={styles.addJobText}>Add a job</p>
      </div>
      {show && <AddJobItem closeFold={() => setShow(!show)} /> }
    </div>
  )
}

const AddJobItem = ({ closeFold }) => {
  const { user } = useUser();
  const user_id = user ? user.sub : 'no user';

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
  const [tags, setTags] = useState([]);
  const handleTags = (arg: string[]) => setTags(arg)
  
  const submitForm = () => {
    createJob(
      user_id,
      title, 
      description, 
      company, 
      applied, 
      notes,
      contact, 
      datePosted,
      dateClosed,
      location,
      link,
      tags,
    );

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
    setTags([]);

    closeFold()
  }

  return (
    <form
      className={styles.addJob}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      onSubmit={e => {
        e.preventDefault()
        submitForm()
      }}
    >
      <div className={styles.checkboxDiv}>
        <input 
          type="checkbox" 
          className={styles.checkbox}
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
        <label htmlFor="applied">
          <p className={styles.appliedText}>Applied</p>
        </label>
      </div>
      <input 
        required
        className={`${styles.input} ${styles.inputTitle}`}
        placeholder="Job Title (required)"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        required
        className={`${styles.input} ${styles.inputCompany}`}
        placeholder="Company (required)"
        value={company}
        onChange={e => setCompany(e.target.value)}
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
        className={`${styles.input} ${styles.inputDatePosted}`}
        placeholder="Posting Date"
        value={datePosted}
        onChange={e => setDatePosted(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDateClosed}`}
        placeholder="Closing Date"
        value={dateClosed}
        onChange={e => setDateClosed(e.target.value)}
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
      <textarea 
        required
        className={`${styles.input} ${styles.inputDescription}`}
        placeholder="Description (required)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <TagsInput tags={tags} handleTags={handleTags} />
      <div className={styles.tagsDiv}>
        {tags.map((tag, iidx) => (
          <div className={styles.tag} key={tag}>
            <p 
              className={styles.tagRemove}
              onClick={() => handleTags(
                tags.filter((t, idx) => idx !== iidx)
              )}
            >x</p>
            <p className={styles.tagText}>{tag}</p>
          </div>
        ))}
      </div>
      <button className={styles.addJobButton} >
        <p className={styles.addJobButtonText}>
          Add Job
        </p>
      </button>
    </form>
  );
}

const TagsInput: React.FC<{ tags: string[], handleTags: (arg: string[]) => void}> = 
({ tags, handleTags }) => {
  const [text, setText] = useState('');

  return (
    <>
      <input
        className={styles.input}
        placeholder="tags"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter' && text) {
            handleTags(Array.from(new Set([...tags, text])))
            setText('')
          }
        }}
      />
      
    </>
  );
}
