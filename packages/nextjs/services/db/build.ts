import { Result, Schema, db, toResult } from "~~/services/db";

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

export type BuildDoc = Schema["builds"]["Doc"];
export type BuildResult = Result<Build>;

export async function findAllBuilds(): Promise<BuildResult[]> {
  const buildsSnaphot = await db.builds.all();
  const builds = buildsSnaphot.map(build => toResult<Build>(build));
  return builds;
}

export async function findBuild(id: string): Promise<BuildResult> {
  const buildSnapshot = await db.builds.get(db.builds.id(id));
  return toResult<Build>(buildSnapshot);
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
  return toResult<Build>(buildSnapshot);
}

export async function updateBuild(
  id: string,
  branch: string,
  demoUrl: string,
  videoUrl: string,
  desc: string,
  image: string,
  name: string,
  featured: boolean,
  coBuilders: string[] = [],
): Promise<BuildResult> {
  let buildSnapshot = await db.builds.get(db.builds.id(id));
  await buildSnapshot?.ref?.update(() => ({
    branch,
    demoUrl,
    videoUrl,
    desc,
    image,
    name,
    featured,
    coBuilders,
    subimtedTimestamp: Date.now(),
  }));
  buildSnapshot = await db.builds.get(db.builds.id(id));
  return toResult<Build>(buildSnapshot);
}

export async function deleteBuild(id: string) {
  await db.builds.remove(db.builds.id(id));
}

export async function likeBuild(id: string, userAddress: string) {
  const build = await findBuild(id);
  if (!build.exist) return;
  const currentLikesSet = new Set(build.likes ?? []);
  const willUnlike = currentLikesSet.has(userAddress);
  if (willUnlike) {
    currentLikesSet.delete(userAddress);
  } else {
    currentLikesSet.add(userAddress);
  }
  const likes = Array.from(currentLikesSet);
  const buildSnapshot = await db.builds.get(db.builds.id(id));
  await buildSnapshot?.ref?.update(() => ({ likes }));
}
