import { recoverMessageAddress } from "viem";

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

export const verifySignature = async (signature: any, verifyOptions: any) => {
  const trustedMessage = await getSignMessageForId(verifyOptions.messageId, verifyOptions);
  const signingAddress = recoverMessageAddress({ message: trustedMessage, signature });
  return signingAddress === verifyOptions.address;
};

export const getSignMessageForId = async (messageId: MessageType, options: any) => {
  let data = {};
  switch (messageId) {
    case MessageType.CREATE_BUILDER: {
      data = {
        role: options.role,
        ens: options.ens,
        functionTitle: options.functionTitle,
        address: options.address,
        status: options?.status,
        socialLinks: options?.socialLinks,
        skills: options?.skills,
      };
      return `I want to create a builder as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.UPDATE_BUILDER: {
      data = {
        id: options.id,
        role: options.role,
        ens: options.ens,
        functionTitle: options.functionTitle,
        address: options.address,
        status: options?.status,
        socialLinks: options?.socialLinks,
        skills: options?.skills,
      };
      return `I want to update a builder as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.DELETE_BUILDER: {
      data = {
        id: options.id,
      };
      return `I want to delete a builder as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.CREATE_BUILD: {
      data = {
        name: options.name,
        description: options.desc,
        image: options.image,
        videoUrl: options.videoUrl,
        builder: options.builder,
        demoUrl: options.demoUrl,
        branch: options.branch,
        coBuilders: options.coBuilders,
      };
      return `I want to create a build as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.UPDATE_BUILD: {
      data = {
        id: options.id,
        name: options.name,
        description: options.desc,
        image: options.image,
        videoUrl: options.videoUrl,
        builder: options.builder,
        demoUrl: options.demoUrl,
        branch: options.branch,
        coBuilders: options.coBuilders,
      };
      return `I want to update a build as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.DELETE_BUILD: {
      data = {
        id: options.id,
      };
      return `I want to delete a build as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.LIKE_BUILD: {
      data = {
        id: options.id,
      };
      return `I want to like a build as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.CREATE_BOUNTY: {
      data = {
        title: options.title,
        skills: options.skills,
        dealine: options.dealine,
        details: options.details,
        resources: options.resources,
        announcementDate: options.announcementDate,
        reward: options.reward,
      };
      return `I want to create bounty as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.UPDATE_BOUNTY: {
      data = {
        id: options.id,
        title: options.title,
        skills: options.skills,
        dealine: options.dealine,
        details: options.details,
        resources: options.resources,
        announcementDate: options.announcementDate,
        reward: options.reward,
      };
      return `I want to update bounty as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.DELETE_BOUNTY: {
      data = {
        id: options.id,
      };
      return `I want to delete bounty as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.DISABLE_BOUNTY: {
      data = {
        bountyId: options.id,
        option: options.option,
      };
      return `I want to disable bounty as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.APPLY_FOR_BOUNTY: {
      data = {
        bountyId: options.id,
        userAddress: options.address,
      };
      return `I want to apply for bounty as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.CREATE_BOUNTY_SUBMISSION: {
      data = {
        id: options.id,
        userAddress: options.address,
        description: options.description,
      };
      return `I want to create a bounty submission as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.CREATE_GATED_NFT: {
      data = {
        tokenAddress: options.tokenAddress,
        chain: options.chain,
        chainId: options.chain,
        name: options.name,
      };
      return `I want to create gated nft as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }
    case MessageType.CREATE_GATED_NFT: {
      data = {
        tokenAddress: options.tokenAddress,
        chain: options.chain,
        chainId: options.chain,
        name: options.name,
      };
      return `I want to create gated nft as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.DELETE_GATED_NFT: {
      data = {
        id: options.id,
      };
      return `I want to delete gated nft as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.VERIFY_GATED_NFT: {
      data = {
        tokenAddress: options.tokenAddress,
        address: options.address,
      };
      return `I want to verify if i have the gated nft  ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    case MessageType.CREATE_NOTIFICATION: {
      data = {
        component: options.component,
        criteria: options.criteria,
        active: options.active,
        title: options.title,
        content: options.content,
      };
      return `I want to create notification as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;
    }

    default:
      return "Invalid signing option";
  }
};
