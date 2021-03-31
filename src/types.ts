export interface Todo {
  id: string;
  created: string;
  text: string;
  completed: boolean;
}

export interface Job {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  company: string;
  applied: boolean;
  notes: string;
  contact: string;
}