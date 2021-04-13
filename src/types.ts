export interface Todo {
  id: string;
  created: string;
  text: string;
  completed: boolean;
}

export interface Job {
  user_id: string;
  id: string;
  createdAt: string;
  title: string;
  description: string;
  company: string;
  applied: boolean;
  notes?: string;
  contact?: string;
  datePosted?: string;
  dateClosed?: string;
  location?: string;
  link?: string;
  tags?: string[];
}

export interface User { 
  nickname?: string,
  name?: string,
  picture?: string,
  updated_at?: string,
  email?: string,
  email_verified?: boolean,
  sub?: string,
}

