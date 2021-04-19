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
          <div style={{display: 'flex', flexDirection: "column"}}>
            <p 
              className={styles.removeText}
              onClick={() => setEditing(!editing)}
            >
              x
            </p>
            <div style={{display: "flex", flexDirection: "row" }}>
              <svg 
                className={styles.svg} 
                onClick={() => {
                  setEditing(!editing)
                  update(itemVal)
                }}
                height="24px" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" 
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" 
                />
              </svg>
              <svg 
                className={styles.svg}
                onClick={() => {
                  setEditing(!editing)
                  update('')
                }}
                height="24px"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </div>
          </div>
        </div>  
        )
      }
    </>
  )
}
