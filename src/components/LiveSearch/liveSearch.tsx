import React, { useState} from "react";
import styles from './liveSearch.module.css';
import { Job } from '../../types';

export const LiveSearch: React.FC<{ children: React.ReactNodeArray}> = 
({ children }) => {
  const [text, setText] = useState('')

  return(
    <div className={styles.liveSearchContainer}>
      <input
        className={`${styles.input} ${styles.liveSearchInput}`}
        value={text}
        placeholder="Search Jobs"
        onChange={e => setText(e.target.value)}
      />
      {children.map((child: React.ReactElement) => Object.values(child.props.job)
        .join().toLowerCase().includes(text.toLowerCase()) ? 
        child : null)}
    </div>
  )
}
