import DiscordIcon from "~~/components/assets/icons/DiscordIcon";
import EmailIcon from "~~/components/assets/icons/EmailIcon";
import GithubIcon from "~~/components/assets/icons/GithubIcon";
import InstagramIcon from "~~/components/assets/icons/IntagramIcon";
import TelegramIcon from "~~/components/assets/icons/TelegramIcon";
import TwitterIcon from "~~/components/assets/icons/TwitterIcon";

interface Social {
  label: string;
  placeholder: string;
  icon: React.ComponentType<any>; // Adjust the props type if necessary
  getLink: (value: string) => string | null;
  weight: number;
  validator?: string;
}

interface Socials {
  [key: string]: Social;
}

export const socials: Socials = {
  telegram: {
    label: "Telegram",
    placeholder: "Your Telegram handle without the @",
    icon: TelegramIcon,
    getLink: (value: string) => `https://telegram.me/${value}`,
    weight: 0,
  },
  twitter: {
    label: "Twitter",
    placeholder: "Your Twitter username without the @",
    icon: TwitterIcon,
    getLink: (value: string) => `https://twitter.com/${value}`,
    weight: 1,
  },
  discord: {
    label: "Discord",
    placeholder: "Your Discord username#id",
    icon: DiscordIcon,
    getLink: () => null,
    weight: 2,
    validator: "discord",
  },
  github: {
    label: "GitHub",
    placeholder: "Your GitHub username",
    icon: GithubIcon,
    getLink: (value: string) => `https://github.com/${value}`,
    weight: 3,
  },
  email: {
    label: "E-mail",
    placeholder: "Your e-mail address",
    icon: EmailIcon,
    getLink: (value: string) => `mailto:${value}`,
    weight: 4,
    validator: "email",
  },
  instagram: {
    label: "Instagram",
    placeholder: "Your Instagram handle without the @",
    icon: InstagramIcon,
    getLink: (value: string) => `https://instagram.com/${value}`,
    weight: 5,
  },
};

export const bySocialWeight = (socialEntry1: string, socialEntry2: string): number =>
  socials[socialEntry1].weight - socials[socialEntry2].weight;
