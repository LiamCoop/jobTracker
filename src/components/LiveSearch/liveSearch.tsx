import React, { useState} from "react";
import styles from './liveSearch.module.css';
import { Job } from '../../types';

export const LiveSearch: React.FC<{ children: React.ReactNodeArray}> = 
({ children }) => {
  const [text, setText] = useState('')

  const fitsQuery = (job: Job) => {
    const regex = new RegExp(text);
    return regex.test(Object.values(job).join())
  }

  return(
    <div className={styles.liveSearchContainer}>
      <form
        className={styles.liveSearchForm} 
        onSubmit={async e => { e.preventDefault() }}
      >
        <input
          className={`${styles.input} ${styles.liveSearchInput}`}
          value={text}
          placeholder="Search Jobs"
          onChange={e => setText(e.target.value)}
        />
      </form>
      {children.map((child: React.ReactElement) => 
        fitsQuery(child.props.job) ? child : null)}
    </div>
  )
}
