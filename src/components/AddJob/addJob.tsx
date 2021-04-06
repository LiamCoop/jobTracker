import React, { useEffect, useState } from "react";
import { createJob } from '../../api2';
import { useUser } from '@auth0/nextjs-auth0';
import styles from './AddJob.module.css';

export const AddJobFold = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={styles.addJobIcon}>
        <div 
          className={styles.circle}
          onClick={() => setShow(!show)} 
        >+</div>
        <p className={styles.addJobText}>Add a job</p>
      </div>
      {show && <AddJobItem closeFold={() => {setShow(false)}} /> }
    </>
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
      contact, 
      notes,
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
      <input 
        className={`${styles.input} ${styles.inputTitle}`}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputCompany}`}
        placeholder="Company"
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
      <textarea 
        className={`${styles.input} ${styles.inputDescription}`}
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
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
      <TagsInput tags={tags} handleTags={handleTags} />
      <div>
        <input 
          type="checkbox" 
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
        <label htmlFor="applied">Applied</label>
      </div>
      <button className={styles.addJobButton} >
        Add Job
      </button>
    </form>
  );
}

const TagsInput: React.FC<{ tags: string[], handleTags: (arg: string[]) => void}> = 
({ tags, handleTags }) => {
  const [text, setText] = useState('');
  const [unique, setUnique] = useState(true);

  useEffect(() => {
    const resetUnique = () => {
      handleTags(tags.filter((item, pos) => tags.indexOf(item) === pos))
      setUnique(true)
    }
    if(!unique) resetUnique()
  }, [unique]);

  return (
    <div className={styles.inputTag}>
      <ul className={styles.inputTag__tags}>
        {tags.map((tag, idx) => (
          <li key={tag}>
            {tag}
            <button 
              type="button" 
              onClick={() => handleTags(
                tags.filter((t, iidx) => idx !== iidx)
              )}
            >+</button>
          </li>
        ))}
        <li className={styles.tagInput}>
          <input
            type="text"
            placeholder="tags"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                handleTags([...tags, text])
                setUnique(false)
                setText('')
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}
