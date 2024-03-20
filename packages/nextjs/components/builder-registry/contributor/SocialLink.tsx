import React from "react";
import Link from "next/link";
import { socials } from "~~/data/social";

type SocialLinkProps = {
  id: string;
  value: string;
};

export const SocialLink: React.FC<SocialLinkProps> = ({ id, value }) => {
  const Icon = socials[id].icon;
  const link = socials[id].getLink(value);

  return (
    <>
      {link && (
        <Link href={`${link}`}>
          <Icon />
        </Link>
      )}
    </>
  );
};
