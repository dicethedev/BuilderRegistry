import { Result, Schema, db, toResult } from "~~/services/db";

export interface Submisssion {
  address: string;
  timeStamp: number;
  description: string;
}

export interface Bounty {
  title: string;
  createdBy: string;
  deadLine: Date;
  applications: string[];
  active: boolean;
  skills: string[];
  details: string;
  resources: string;
  subimtedTimestamp: number;
}

export type BountyDoc = Schema["bounties"]["Doc"];
export type BountyResult = Result<Bounty>;
export type SubmisssionDoc = Schema["bounties"]["sub"]["submissions"]["Doc"];
export type SubmisssionResult = Result<Submisssion>;

export async function findAllBounties(fetch_disabled?: boolean): Promise<BountyResult[]> {
  let bountiesSnaphot = [];
  bountiesSnaphot = fetch_disabled ? await db.bounties.all() : await db.bounties.query($ => $.field("active").eq(true));
  const bounties = bountiesSnaphot.map(bounty => toResult<Bounty>(bounty));
  return bounties;
}
export async function findBounty(id: string): Promise<BountyResult> {
  const bountySnapshot = await db.bounties.get(db.bounties.id(id));
  return toResult<Bounty>(bountySnapshot);
}

export async function createBounty(
  title: string,
  createdBy: string,
  deadLine: Date,
  skills: string[],
  details: string,
  resources: string,
): Promise<BountyResult> {
  const ref = await db.bounties.add(() => ({
    title,
    createdBy,
    deadLine,
    skills,
    details,
    resources,
    subimtedTimestamp: Date.now(),
    applications: [],
    active: true,
    submisssions: [],
  }));
  const bountySnapshot = await db.bounties.get(ref.id);
  return toResult<Bounty>(bountySnapshot);
}

export async function updateBounty(
  id: string,
  title: string,
  deadLine: Date,
  skills: string[],
  details: string,
  resources: string,
): Promise<BountyResult> {
  let bountySnapshot = await db.bounties.get(db.bounties.id(id));
  await bountySnapshot?.ref?.update(() => ({
    title,
    deadLine,
    skills,
    details,
    resources,
  }));
  bountySnapshot = await db.bounties.get(db.bounties.id(id));
  return toResult<Bounty>(bountySnapshot);
}

export async function deleteBounty(id: string) {
  await db.bounties.remove(db.bounties.id(id));
}

export async function disableBounty(id: string) {
  let bountySnapshot = await db.bounties.get(db.bounties.id(id));
  await bountySnapshot?.ref?.update(() => ({ active: false }));
  bountySnapshot = await db.bounties.get(db.bounties.id(id));
  return toResult<Bounty>(bountySnapshot);
}

export async function enableBounty(id: string) {
  let bountySnapshot = await db.bounties.get(db.bounties.id(id));
  await bountySnapshot?.ref?.update(() => ({ active: true }));
  bountySnapshot = await db.bounties.get(db.bounties.id(id));
  return toResult<Bounty>(bountySnapshot);
}

export async function applyForBounty(id: string, userAddress: string) {
  let bountySnapshot = await db.bounties.get(db.bounties.id(id));
  const bountiesApplications = new Set(bountySnapshot?.data.applications);
  if (bountiesApplications.has(userAddress)) {
    bountiesApplications.delete(userAddress);
  } else {
    bountiesApplications.add(userAddress);
  }
  const bountiesUserApplication = Array.from(bountiesApplications);
  await bountySnapshot?.ref?.update(() => ({
    applications: bountiesUserApplication,
  }));
  bountySnapshot = await db.bounties.get(db.bounties.id(id));
  return toResult<Bounty>(bountySnapshot);
}

export async function submitBounty(id: string, userAddress: string, description: string) {
  const bountyId = db.bounties.id(id);
  const submissionRef = await db.bounties(bountyId).submissions.add({
    address: userAddress,
    description: description,
    timeStamp: Date.now(),
  });

  const submisssions = await db.bounties(bountyId).submissions.get(submissionRef.id);
  return toResult<Submisssion>(submisssions);
}
