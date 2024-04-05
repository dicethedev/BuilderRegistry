import { useEffect, useState } from "react";
import { NounsBlockies } from "../nounsblockies";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isAddress } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

/* import CopyIcon from "~~/components/assets/icons/CopyIcon"; */
import { BlockieAvatar } from "~~/components/scaffold-eth";

export const ContributorAddress = ({
  address,
  dateJoined,
  title,
}: {
  address: string;
  dateJoined: string | number | Date;
  title: string;
}) => {
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

  let displayAddress = address?.slice(0, 2) + "..." + address?.slice(-4);

  if (!isAddress(address)) {
    displayAddress = "";
  }

  if (ens) {
    displayAddress = ens;
  }

  const getDateJoined = (date: string | number | Date): string => {
    const dateJoined = new Date(date);
    return dateJoined.toLocaleString("default", { month: "long" }) + " " + dateJoined.getFullYear();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="my-4 border-2 border-[#6057FB] rounded-full">
        {ensAvatar ? (
          <BlockieAvatar address={address} ensImage={ensAvatar} size={80} />
        ) : (
          <NounsBlockies address={address} size={80} />
        )}
      </div>
      <div>
        <div className="flex flex-row items-center">
          <span className={`text-xl font-semibold`}>{displayAddress}</span>
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
              {/*           <CopyIcon className="ml-1.5 cursor-pointer" /> */}
            </CopyToClipboard>
          )}
        </div>
        <div className="mt-2 flex space-x-3 items-center">
          <span className="px-3 bg-[#E7E9ED] inline text-[0.8rem] py-1 rounded-full font-medium">{title}</span>
          <p className="text-[0.85rem] font-medium">Joined {getDateJoined(dateJoined)}</p>{" "}
        </div>
      </div>
    </div>
  );
};
