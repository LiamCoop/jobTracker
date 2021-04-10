import useSWR, { mutate } from "swr";
import { Job } from "./types";

const jobPath = "/api/jobs";

const fetchWithUser = (sub) => (url) => fetch(`${url}?uid=${sub}`).then(r=>r.json())

export const useJobs = (sub = '') => useSWR<Job[]>(jobPath, fetchWithUser(sub))

export const createJob = async ( 
  user_id: string,
  title: string,
  description: string,
  company: string,
  applied: boolean,
  notes?: string,
  contact?: string,
  datePosted?: string,
  dateClosed?: string,
  location?: string,
  link?: string,
  tags?: string[],
) => {
  mutate(
    jobPath,
    jobs => 
    [{ 
        user_id,
        id: "new-job", 
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
    }, ...jobs],
    false,
  );
  await fetch(jobPath, {
    method: "POST",
    body: JSON.stringify({ 
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
    }),
  });
  mutate(jobPath);
};

export const updateJob = async (job: Job) => {
  mutate(
    jobPath,
    jobs => jobs.map((j: Job) => j.id === job.id ? {...job} : j),
    false,
  );
  await fetch(`${jobPath}?jobId=${job.id}`, {
    method: "PUT",
    body: JSON.stringify(job),
  });
  mutate(jobPath)
};

export const deleteJob = async (id: string) => {
  mutate(jobPath, (jobs: Job[]) => jobs.filter(t => t.id !== id), false);
  await fetch(`${jobPath}?jobId=${id}`, { method: "DELETE" });
  mutate(jobPath);
};
