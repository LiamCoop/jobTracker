import React, { useState } from 'react';
import styles from './Editable.module.css';

export const Editable: React.FC<{ 
  textArea?: boolean, 
  item: string, 
  update: (arg: string) => void,
}> = ({ textArea = false, item, update }) => {
  const [editing, setEditing] = useState(false);
  const [itemVal, setItemVal] = useState(item);

  return (
    <>
      {!editing ? (
        <div
          className={styles.editText}
          onDoubleClick={() => setEditing(!editing)} 
        >
          {itemVal}
        </div>
      ) : (
        <div className={styles.editDiv}>
          <div className={styles.circle} onClick={() => update('')} >
            <p className={styles.removeText}>x</p>
          </div>
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
            />
          )}
          <button 
            className={styles.editSave}
            onClick={() => {
              setEditing(!editing)
              update(itemVal)
            }}
          >
            <svg height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>  
        )
      }
    </>
  )
}
