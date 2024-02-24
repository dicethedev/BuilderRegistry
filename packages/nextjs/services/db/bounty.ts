import { Schema, db } from "~~/services/db";

export interface Submisssion {
  address: string;
  timeStamp: number;
  description: string;
}

interface SubmisssionResult extends Submisssion {
  id: string;
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

interface BountyResult extends Bounty {
  id: string;
}

function toBountyResult(bounty: Schema["bountys"]["Doc"] | null): BountyResult {
  return { id: bounty?.ref?.id as string, ...(bounty?.data as Bounty) };
}

function toSubmisssionResult(submisssion: Schema["bountys"]["sub"]["submissions"]["Doc"] | null): SubmisssionResult {
  return { id: submisssion?.ref?.id as string, ...(submisssion?.data as Submisssion) };
}

export async function findAllBounties(): Promise<BountyResult[]> {
  const bountiesSnaphot = await db.bountys.all();
  const bounties = bountiesSnaphot.map(bounty => toBountyResult(bounty));
  return bounties;
}
export async function findBounty(id: string): Promise<BountyResult> {
  const bountySnapshot = await db.bountys.get(db.bountys.id(id));
  return toBountyResult(bountySnapshot);
}

export async function createBounty(
  title: string,
  createdBy: string,
  deadLine: Date,
  skills: string[],
  details: string,
  resources: string,
): Promise<BountyResult> {
  const ref = await db.bountys.add(() => ({
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
  const bountySnapshot = await db.bountys.get(ref.id);
  return toBountyResult(bountySnapshot);
}

export async function updateBounty(
  id: string,
  title: string,
  deadLine: Date,
  skills: string[],
  details: string,
  resources: string,
): Promise<BountyResult> {
  let bountySnapshot = await db.bountys.get(db.bountys.id(id));
  await bountySnapshot?.ref?.update(() => ({
    title,
    deadLine,
    skills,
    details,
    resources,
  }));
  bountySnapshot = await db.bountys.get(db.bountys.id(id));
  return toBountyResult(bountySnapshot);
}

export async function deleteBounty(id: string) {
  await db.bountys.remove(db.bountys.id(id));
}

export async function disableBounty(id: string) {
  let bountySnapshot = await db.bountys.get(db.bountys.id(id));
  await bountySnapshot?.ref?.update(() => ({ active: false }));
  bountySnapshot = await db.bountys.get(db.bountys.id(id));
  return toBountyResult(bountySnapshot);
}

export async function applyForBuounty(id: string, userAddress: string) {
  let bountySnapshot = await db.bountys.get(db.bountys.id(id));
  const bountiesApplications = bountySnapshot?.data.applications;
  bountiesApplications?.push(userAddress);
  await bountySnapshot?.ref?.update(() => ({
    applications: bountiesApplications,
  }));
  bountySnapshot = await db.bountys.get(db.bountys.id(id));
  return toBountyResult(bountySnapshot);
}

export async function submitBuounty(id: string, userAddress: string, description: string) {
  const bountyId = db.bountys.id(id);
  const submissionRef = await db.bountys(bountyId).submissions.add({
    address: userAddress,
    description: description,
    timeStamp: Date.now(),
  });

  const submisssions = await db.bountys(bountyId).submissions.get(submissionRef.id);
  return toSubmisssionResult(submisssions);
}
