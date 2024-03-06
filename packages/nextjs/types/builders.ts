interface SocialLinks {
  github: string | null;
  website: string | null;
  youtube: string | null;
  twitter: string | null;
}

interface Status {
  text: string;
  timestamp: number;
}

export interface Contributors {
  id: string;
  role: string;
  ens: string;
  function: string;
  status?: Status;
  socialLinks?: [SocialLinks];
}

export interface Contributions {
  id: string;
  branch: string;
  demoUrl: string;
  videoUrl: string;
  desc: string;
  image: string;
  name: string;
  builder: string;
  featured: boolean;
  subimtedTimestamp: number;
  coBuilders: string[];
  likes: string[];
  builderRole?: string;
}
