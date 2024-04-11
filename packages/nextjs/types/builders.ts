export enum BountyStatus {
  INPROGRESS,
  OPEN,
  COMPLETED,
}

export interface SocialLinks {
  telegram: string;
  twitter: string;
  github: string;
  discord: string;
  email: string;
  instagram: string;
}

interface Status {
  text: string;
  timestamp: number;
}

export interface TypeStats {
  name: string;
  count: number;
}

export interface Contributors {
  id: string;
  role: string;
  ens: string;
  function: string;
  status?: Status;
  creationTimestamp: string;
  socialLinks?: SocialLinks;
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

export const DefaultSocialLinks = {
  telegram: "",
  twitter: "",
  github: "",
  discord: "",
  email: "",
  instagram: "",
};
