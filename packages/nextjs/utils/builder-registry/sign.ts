import { recoverMessageAddress } from "viem";

export enum MessageType {
  CREATE_BUILDER,
  UPDATE_BUILDER,
  CREATE_BUILD,
  UPDATE_BUILD,
  LIKE_BUILD,
  CREATE_BOUNTY,
}

export const getSignMessageForId = async (messageId: MessageType, options: any) => {
  const data = {
    ...options,
  };
  console.log(data);
  switch (messageId) {
    default:
      return "Invalid signing option";
  }
};

export const verifySignature = async (signature: any, verifyOptions: any) => {
  const trustedMessage = await getSignMessageForId(verifyOptions.messageId, verifyOptions);
  const signingAddress = recoverMessageAddress({ message: trustedMessage, signature });

  return signingAddress === verifyOptions.address;
};
