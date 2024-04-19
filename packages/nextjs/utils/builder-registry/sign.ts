import { recoverMessageAddress } from "viem";
import { MessageType, Options } from "~~/types/builder-registry/signedMessageTypes";

export const verifySignature = async (signature: any, verifyOptions: any) => {
  const trustedMessage = await getSignMessageForId(verifyOptions.messageId, verifyOptions);
  const signingAddress = recoverMessageAddress({ message: trustedMessage, signature });
  return signingAddress === verifyOptions.address;
};

export const getSignMessageForId = async (messageId: MessageType, options: Options) => {
  switch (messageId) {
    case MessageType.CREATE_BUILDER: {
      return `I want to create a builder as ${options.address}:\n\n${JSON.stringify(
        options.createBuilderOptions,
        null,
        2,
      )}`;
    }

    case MessageType.UPDATE_BUILDER: {
      return `I want to update a builder as ${options.address}:\n\n${JSON.stringify(
        options.updateBuilderOptions,
        null,
        2,
      )}`;
    }
    case MessageType.DELETE_BUILDER: {
      return `I want to delete a builder as ${options.address}:\n\n${JSON.stringify(
        options.deleteBuilderOptions,
        null,
        2,
      )}`;
    }
    case MessageType.CREATE_BUILD: {
      return `I want to create a build as ${options.address}:\n\n${JSON.stringify(
        options.createBuildOptions,
        null,
        2,
      )}`;
    }
    case MessageType.UPDATE_BUILD: {
      return `I want to update a build as ${options.address}:\n\n${JSON.stringify(
        options.updateBuildOptions,
        null,
        2,
      )}`;
    }
    case MessageType.DELETE_BUILD: {
      return `I want to delete a build as ${options.address}:\n\n${JSON.stringify(
        options.deleteBuildOptions,
        null,
        2,
      )}`;
    }
    case MessageType.LIKE_BUILD: {
      return `I want to like a build as ${options.address}:\n\n${JSON.stringify(options.likeBuildOptions, null, 2)}`;
    }
    case MessageType.CREATE_BOUNTY: {
      return `I want to create bounty as ${options.address}:\n\n${JSON.stringify(
        options.createBountyOptions,
        null,
        2,
      )}`;
    }

    case MessageType.UPDATE_BOUNTY: {
      return `I want to update bounty as ${options.address}:\n\n${JSON.stringify(
        options.updateBountyOptions,
        null,
        2,
      )}`;
    }

    case MessageType.DELETE_BOUNTY: {
      return `I want to delete bounty as ${options.address}:\n\n${JSON.stringify(
        options.deleteBountyOptions,
        null,
        2,
      )}`;
    }

    case MessageType.DISABLE_BOUNTY: {
      return `I want to disable bounty as ${options.address}:\n\n${JSON.stringify(
        options.disableBountyOptions,
        null,
        2,
      )}`;
    }

    case MessageType.APPLY_FOR_BOUNTY: {
      return `I want to apply for bounty as ${options.address}:\n\n${JSON.stringify(
        options.applyForBountyOptions,
        null,
        2,
      )}`;
    }

    case MessageType.CREATE_BOUNTY_SUBMISSION: {
      return `I want to create a bounty submission as ${options.address}:\n\n${JSON.stringify(
        options.createBountySubmissionOptions,
        null,
        2,
      )}`;
    }

    case MessageType.CREATE_GATED_NFT: {
      return `I want to create gated nft as ${options.address}:\n\n${JSON.stringify(
        options.createGatedNFTOptions,
        null,
        2,
      )}`;
    }

    case MessageType.DELETE_GATED_NFT: {
      return `I want to delete gated nft as ${options.address}:\n\n${JSON.stringify(
        options.deleteGatedNFTOPtions,
        null,
        2,
      )}`;
    }

    case MessageType.VERIFY_GATED_NFT: {
      return `I want to verify if i have the gated nft  ${options.address}:\n\n${JSON.stringify(
        options.verifyGatedNFTOptions,
        null,
        2,
      )}`;
    }
    default:
      return "Invalid signing option";
  }
};
