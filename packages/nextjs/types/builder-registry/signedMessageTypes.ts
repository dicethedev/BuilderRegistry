export enum MessageType {
  CREATE_BUILDER,
  UPDATE_BUILDER,
  DELETE_BUILDER,
  CREATE_BUILD,
  UPDATE_BUILD,
  DELETE_BUILD,
  LIKE_BUILD,
  CREATE_BOUNTY,
  UPDATE_BOUNTY,
  DELETE_BOUNTY,
  APPLY_FOR_BOUNTY,
  SUBMIT_BOUNTY,
  FAVORITE_BOUNTY,
  CLAIM_BOUNTY_REWARD,
  DISABLE_BOUNTY,
  CREATE_BOUNTY_SUBMISSION,
  CREATE_GATED_NFT,
  DELETE_GATED_NFT,
  VERIFY_GATED_NFT,
  CREATE_NOTIFICATION,
}

export interface MessageOptions {
  messageId: MessageType;
  address: string;
}

export interface CreateBuilderOptions {
  role: string;
  ens: string;
  functionTitle: string;
  address: string;
  status?: string;
  socialLinks?: string[];
  skills?: string[];
}

export interface UpdateBuilderOptions extends CreateBuilderOptions {
  id: string;
}

export interface DeleteBuilderOptions {
  id: string;
}

export interface CreateBuildOptions {
  name: string;
  desc: string;
  image: string;
  videoUrl: string;
  builder: string;
  demoUrl: string;
  branch: string;
  coBuilders: string[];
}

export interface UpdateBuildOptions extends CreateBuilderOptions {
  id: string;
}

export interface DeleteBuildOptions {
  id: string;
}

export interface LikeBuildOptions {
  id: string;
}

export interface DisLikeBuildOptions {
  id: string;
}

export interface CreateBountyOptions {
  title: string;
  skills: string[];
  dealine: Date;
  details: string;
  resources: string[];
  announcementDate: Date;
  reward: number;
}

export interface UpdateBountyOptions extends CreateBountyOptions {
  id: string;
}

export interface DeleteBountyOptions {
  id: string;
}

export interface DisableBountyOptions {
  bountyId: string;
  option: string;
}

export interface ApplyForBountyOptions {
  bountyId: string;
}

export interface CreateBountySubmissionOptions {
  id: string;
  description: string;
}

export interface CreateGatedNFTOptions {
  tokenAddress: string;
  chain: string;
  chainId: string;
  name: string;
}

export interface DeleteGatedNFTOptions {
  id: string;
}

export interface VerifyGatedNFTOptions {
  tokenAddress: string;
  address: string;
}

export interface Options extends MessageOptions {
  createBuilderOptions: CreateBuilderOptions;
  updateBuilderOptions: UpdateBuilderOptions;
  deleteBuilderOptions: DeleteBuilderOptions;
  createBuildOptions: CreateBuildOptions;
  updateBuildOptions: UpdateBuilderOptions;
  deleteBuildOptions: DeleteBuildOptions;
  likeBuildOptions: LikeBuildOptions;
  disLikeBuildOptions: DisLikeBuildOptions;
  createBountyOptions: CreateBountyOptions;
  updateBountyOptions: UpdateBountyOptions;
  deleteBountyOptions: DeleteBountyOptions;
  createBountySubmissionOptions: CreateBountySubmissionOptions;
  disableBountyOptions: DisableBountyOptions;
  applyForBountyOptions: ApplyForBountyOptions;
  createGatedNFTOptions: CreateGatedNFTOptions;
  deleteGatedNFTOPtions: DeleteGatedNFTOptions;
  verifyGatedNFTOptions: VerifyGatedNFTOptions;
}
