import useSWR, { mutate } from "swr";
import { Job } from "./types";

const jobPath = "/api/jobs";

export const useJobs = () => useSWR<Job[]>(jobPath);

export const createJob = async ( 
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
    jobPostings => [{ 
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
    }, ...jobPostings],
    false,
  );
  await fetch(jobPath, {
    method: "POST",
    body: JSON.stringify({ 
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
    jobs =>
      jobs.map(j =>
        j.id === job.id ? { ...job } : j,
      ),
    false,
  );
  await fetch(`${jobPath}?jobId=${job.id}`, {
    method: "PUT",
    body: JSON.stringify(job),
  });
  mutate(jobPath);
};

export const deleteJob = async (id: string) => {
  mutate(jobPath, jobPostings => jobPostings.filter(t => t.id !== id), false);
  await fetch(`${jobPath}?jobId=${id}`, { method: "DELETE" });
  mutate(jobPath);
};
