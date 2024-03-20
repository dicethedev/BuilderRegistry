import { useEffect, useState } from "react";
import { NounsBlockies } from "../nounsblockies";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isAddress } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { BlockieAvatar } from "~~/components/scaffold-eth";

export const ContributorAddress = ({ address }: { address: string }) => {
  const [ens, setEns] = useState<string | null>();
  const [ensAvatar, setEnsAvatar] = useState<string | null>();
  const [addressCopied, setAddressCopied] = useState(false);

  const { data: fetchedEns } = useEnsName({ address, enabled: isAddress(address ?? ""), chainId: 1 });
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns,
    enabled: Boolean(fetchedEns),
    chainId: 1,
    cacheTime: 30_000,
  });

  useEffect(() => {
    setEns(fetchedEns);
  }, [fetchedEns]);

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar);
  }, [fetchedEnsAvatar]);

  let displayAddress = address;

  if (!isAddress(address)) {
    displayAddress = "";
  }

  if (ens) {
    displayAddress = ens;
  }

  return (
    <>
      <div className="my-4 border-2 border-[#6057FB] rounded-full">
        {ensAvatar ? (
          <BlockieAvatar address={address} ensImage={ensAvatar} size={150} />
        ) : (
          <NounsBlockies address={address} size={150} />
        )}
      </div>
      <div className="flex flex-row">
        <span className={`text-xl font-bold`}>{displayAddress}</span>
        {addressCopied ? (
          <CheckCircleIcon
            className="ml-1.5 text-xl font-normal text-secondary h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        ) : (
          <CopyToClipboard
            text={address}
            onCopy={() => {
              setAddressCopied(true);
              setTimeout(() => {
                setAddressCopied(false);
              }, 800);
            }}
          >
            <DocumentDuplicateIcon
              className="ml-1.5 text-xl font-normal text-secondary h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </CopyToClipboard>
        )}
      </div>
    </>
  );
};
