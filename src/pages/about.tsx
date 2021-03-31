import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/About.module.css";
import { Job } from '../types';


const About: NextPage = () => (
  <div>
    <Head>
      <title>page</title>
    </Head>

    <main className={styles.main}>
      <div>test</div>  
    </main>

  </div>
)

const JobItem: React.FC<{ job: Job }> = ({ job }) => (
  <div>
    <p>{job.title}</p>
    <p>{job.company}</p>
    <p>{job.description}</p>
    <p>{job.contact}</p>
    <p>{job.notes}</p>
  </div>
);

const AddJobItem = () => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [applied, setApplied] = useState(false)

  const resetJob = () => {
    setTitle('')
    setCompany('')
    setDescription('')
    setApplied(false)
  }

  return (
    <form
      className={styles.addJob}
      onSubmit={async e => {
        e.preventDefault(); 
        /*
        createJob({
          title,
          description,
          company,
          applied
        });
        */
        resetJob()
      }}
    >
      <input 
        type="checkbox" 
        checked={applied}
        value="applied"
        onChange={e => setApplied(!applied)}
      />
      <input 
        className={styles.input + styles.inputTitle}
        placeholder="job title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputCompany}
        placeholder="company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={styles.input + styles.inputDescription}
        placeholder="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </form>

  );
}

export default About;
