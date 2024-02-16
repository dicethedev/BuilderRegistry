import { db } from "~~/services/db";

export interface Build {
  branch: string;
  demoUrl: string;
  videoUrl: string;
  desc: string;
  image: string;
  name: string;
  builder: string;
  featured: boolean;
  submittedTimestamp: number;
  likes: string[];
}

interface BuildResult extends Build {
  id: string;
}

export async function findAllBuild(): Promise<BuildResult[]> {
  const buildSnaphot = await db.builds.all();
  const builds = buildSnaphot.map(build => ({ id: build?.ref?.id as string, ...(build?.data as Build) }));
  return builds;
}

// export async function findBuild(id: string) {
//
// }

// export async function createBuild(
//   branch: string,
//   demoUrl: string,
//   videoUrl: string,
//   desc: string,
//   image: string,
//   builder?: string,
// ) {
//  }
