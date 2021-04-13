import React, { useState, useRef, useEffect } from 'react';
import { Job } from '../../types';
import { updateJob } from '../../api';
import styles from './AddMissing.module.css';

export const AddMissing: React.FC<{ job: Job }> = ({ job }) => {
  const [adding, setAdding] = useState(false);
  const [option, setOption] = useState('')
  const [val, setVal] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if(option) inputRef?.current?.focus();
  }, [option])

  const handleSubmit = () => {
    if(!val) return
    switch(option) {
      case 'description':
        updateJob({ ...job, description: val })
        reset()
        break;
      case 'datePosted':
        updateJob({ ...job, datePosted: val })
        reset()
        break;
      case 'dateClosed':
        updateJob({ ...job, dateClosed: val })
        reset()
        break;
      case 'contact':
        updateJob({ ...job, contact: val })
        reset()
        break;
      case 'notes':
        updateJob({ ...job, notes: val })
        reset()
        break;
      case 'link':
        updateJob({ ...job, link: val })
        reset()
        break;
      default:
        break;
    }
  }

  const reset = () => {
    setOption('')
    setVal('')
    setAdding(!adding)
  }

  return (
    <div className={styles.AddMissingContainer}>
      {adding ? (
        <form 
          className={styles.addFieldForm}
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className={styles.addFieldCircle} onClick={() => reset()}>
            <p>x</p>
          </div>
          <div className={styles.selectorDiv}>
            <select autoFocus 
              className={styles.selector}
              onChange={e => setOption(e.target.value)}
            >
              <option className={styles.AddMissingOption} value="">
                Missing Field
              </option>
              {!job.description && 
                <option className={styles.AddMissingOption} value="description">
                  Description
                </option>}
              {!job.datePosted && 
                <option className={styles.AddMissingOption} value="datePosted">
                  Date Posted
                </option>}
              {!job.dateClosed && 
                <option className={styles.AddMissingOption} value="dateClosed">
                  Date Closed
                </option>}
              {!job.contact && 
                <option className={styles.AddMissingOption} value="contact">
                  contact
                </option>}
              {!job.notes && 
                <option className={styles.AddMissingOption} value="notes">
                  notes
                </option>}
              {!job.link && 
                <option className={styles.AddMissingOption} value="link">
                  link
                </option>}
            </select>
          </div>
          {option === 'description' ? (
            <textarea 
              className={styles.editTextInput}
              ref={inputRef}
              value={val} 
              onChange={e => setVal(e.target.value)}
            />
          ) : (
            <input
              className={styles.editInput}
              ref={inputRef}
              value={val}
              onChange={e => setVal(e.target.value)}
            />
          )}
          <button
            className={styles.addMissingButton} 
            type="submit" 
            value="submit"
          >Add</button> 
        </form>
      ) : (
        <div className={styles.circle} onClick={() => setAdding(!adding)}>
          <p>+</p>
        </div>
      )}
    </div>
  )
}