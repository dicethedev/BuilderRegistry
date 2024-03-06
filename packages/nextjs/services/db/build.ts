import { Schema, db } from "~~/services/db";

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
  builderRole?: string;
}

export interface BuildResult extends Build {
  id: string;
}

export function toBuildResult(build: Schema["builds"]["Doc"] | null): BuildResult {
  return { id: build?.ref?.id as string, ...(build?.data as Build) };
}

export async function findAllBuilds(): Promise<BuildResult[]> {
  const buildsSnaphot = await db.builds.all();
  const builds = buildsSnaphot.map(build => toBuildResult(build));
  return builds;
}
export async function findBuild(id: string): Promise<BuildResult> {
  const buildSnapshot = await db.builds.get(db.builds.id(id));
  return toBuildResult(buildSnapshot);
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
  builderRole = "",
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
    builderRole,
  }));
  const buildSnapshot = await db.builds.get(ref.id);
  return toBuildResult(buildSnapshot);
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
  return toBuildResult(buildSnapshot);
}

export async function deleteBuild(id: string) {
  await db.builds.remove(db.builds.id(id));
}

export async function likeBuild(id: string, userAddress: string) {
  const build = await findBuild(id);
  const currentLikesSet = new Set(build.likes ?? []);
  const willUnlike = currentLikesSet.has(userAddress);
  console.log(currentLikesSet);
  if (willUnlike) {
    currentLikesSet.delete(userAddress);
  } else {
    currentLikesSet.add(userAddress);
  }
  const likes = Array.from(currentLikesSet);
  const buildSnapshot = await db.builds.get(db.builds.id(id));
  await buildSnapshot?.ref?.update(() => ({ likes }));
}
