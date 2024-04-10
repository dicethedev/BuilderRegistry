export enum BountyStatus {
  INPROGRESS,
  OPEN,
  COMPLETED,
}
export interface SocialLinksType {
  github: string | null;
  website: string | null;
  youtube: string | null;
  twitter: string | null;
  email: string | null;
  telegram: string | null;
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
  creationTimestamp: string;
  socialLinks?: SocialLinksType;
  skills: string[];
  builds: [Contributions];
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

export interface Bounties {
  id: string;
  title: string;
  image: string;
  createdBy: string;
  deadLine: Date;
  applications: string[];
  active: boolean;
  skills: string[];
  details: string;
  resources: string;
  subimtedTimestamp: number;
  announcementDate: Date;
  reward: number;
  winners: string[];
  status: BountyStatus;
}
