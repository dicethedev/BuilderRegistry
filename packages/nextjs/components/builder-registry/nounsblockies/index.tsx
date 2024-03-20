import { ImageData, getNounData, getNounSeedFromBlockHash } from "@nouns/assets";
import { buildSVG } from "@nouns/sdk";
import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { keccak256 } from "viem";

const { palette } = ImageData;

export const NounsBlockies: AvatarComponent = ({ address, size }) => {
  const blockHash = keccak256(`0x${address}`);
  const seed = getNounSeedFromBlockHash(1, blockHash);
  const { parts, background } = getNounData(seed);
  const svgBinary = buildSVG(parts, palette, background);
  const svgBase64 = btoa(svgBinary);
  return (
    <img
      className="rounded-full"
      src={`data:image/svg+xml;base64,${svgBase64}`}
      width={size}
      height={size}
      alt={`${address} avatar`}
    />
  );
};
