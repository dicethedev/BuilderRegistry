import { Result, Schema, db, toResult } from "~~/services/db";

export interface Poap {
  tokenAddress: string;
  chain: string;
  chainId: number;
  name: string;
}

export type PoapDoc = Schema["poap"]["Doc"];
export type PoapResult = Result<Poap>;

export async function createPoap(
  tokenAddress: string,
  chain: string,
  chainId: number,
  name: string,
): Promise<PoapResult> {
  const id = db.poap.id(tokenAddress);
  const poapWithAddress = await db.poap.get(id);
  if (poapWithAddress) {
    return Promise.reject(new Error("Poap already exists"));
  }
  const ref = await db.poap.set(id, { tokenAddress, chain, chainId, name });
  const poapSnapshot = await db.poap.get(ref.id);
  return toResult<PoapResult>(poapSnapshot);
}

export async function getAllPoap(): Promise<PoapResult[]> {
  const poaps = await db.poap.all();
  const poapsResult = poaps.map(poap => toResult<Poap>(poap));
  return poapsResult;
}

export async function deletePoap(tokenAddress: string) {
  const id = db.poap.id(tokenAddress);
  await db.poap.remove(id);
}
