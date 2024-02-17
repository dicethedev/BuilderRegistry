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
  subimtedTimestamp: number;
  coBuilders: string[];
  likes: string[];
}

interface BuildResult extends Build {
  id: string;
}

export async function findAllBuilds(): Promise<BuildResult[]> {
  const buildsSnaphot = await db.builds.all();
  const builds = buildsSnaphot.map(build => ({ id: build?.ref?.id as string, ...(build?.data as Build) }));
  return builds;
}
export async function findBuild(id: string): Promise<BuildResult> {
  const buildSnapshot = await db.builds.get(db.builds.id(id));
  const build = { id: buildSnapshot?.ref?.id as string, ...(buildSnapshot?.data as Build) };
  return build;
}

export async function createBuild(
  branch: string,
  demoUrl: string,
  videoUrl: string,
  desc: string,
  image: string,
  name: string,
  builder: string,
  featured: boolean,
  coBuilders: string[] = [],
  likes: string[] = [],
): Promise<BuildResult> {
  const ref = await db.builds.add(() => ({
    branch,
    demoUrl,
    videoUrl,
    desc,
    image,
    name,
    builder,
    featured,
    coBuilders,
    likes,
    subimtedTimestamp: Date.now(),
  }));
  const buildSnapshot = await db.builds.get(ref.id);
  const build = { id: buildSnapshot?.ref?.id as string, ...(buildSnapshot?.data as Build) };
  return build;
}
