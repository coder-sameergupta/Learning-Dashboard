export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface UserProfile {
  name: string;
  streak: number;
  avatar_url?: string;
}
