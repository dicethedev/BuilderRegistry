type ContributorsId = {
  address: string;
  image: string;
};

type Contributions = {
  img: string;
  title: string;
  description: string;
  likes: number;
  links: string[];
};

export type Contributors = {
  contributorsId: ContributorsId;
  bio: string;
  title: string;
  submissions: number;
  lastActivity: string;
  contributions: Contributions[];
};

const contributorsData: Contributors[] = [
  {
    contributorsId: {
      address: "0x016c",
      image: "/image.jpg",
    },
    title: "Explorer",
    bio: "Ex business developer for Ethereum Foundation, currently supporting open-source development",
    submissions: 126,
    lastActivity: "12 days ago",
    contributions: [
      {
        img: "/img/card-img.png",
        title: "Buidlers INC",
        description:
          "A curated group of Ethereum builders creating products, prototypes, and tutorials to enrich the web3 ecosystem.",
        likes: 126,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
      {
        img: "/img/card-img.png",
        title: "ETH Nassarawa x web3bridge event",
        description:
          "Hosting the first edition of the northern Ethereum drive and bringing sustainable crypto growth to the regions that need it.",
        likes: 13,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
      {
        img: "/img/card-img2.png",
        title: "Building on Optimism",
        description: "Step by step process on building scalable applications on optimism.",
        likes: 6,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
    ],
  },
  {
    contributorsId: {
      address: "0x016c",
      image: "/image.jpg",
    },
    title: "Explorer",
    bio: "Ex business developer for Ethereum Foundation, currently supporting open-source development",
    submissions: 126,
    lastActivity: "12 days ago",
    contributions: [
      {
        img: "/img/img.png",
        title: "SoulBound NFTs - The Membership Protocol",
        description: "Developed a football game on the Ethereum platform",
        likes: 126,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
    ],
  },
  {
    contributorsId: {
      address: "0x016c",
      image: "/image.jpg",
    },
    title: "Explorer",
    bio: "Ex business developer for Ethereum Foundation, currently supporting open-source development",
    submissions: 126,
    lastActivity: "12 days ago",
    contributions: [
      {
        img: "/img/img.png",
        title: "SoulBound NFTs - The Membership Protocol",
        description: "Developed a football game on the Ethereum platform",
        likes: 126,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
    ],
  },
  {
    contributorsId: {
      address: "0x016c",
      image: "/image.jpg",
    },
    title: "Explorer",
    bio: "Ex business developer for Ethereum Foundation, currently supporting open-source development",
    submissions: 126,
    lastActivity: "12 days ago",
    contributions: [
      {
        img: "/img/img.png",
        title: "SoulBound NFTs - The Membership Protocol",
        description: "Developed a football game on the Ethereum platform",
        likes: 126,
        links: ["https://twitter.com/contribution", "https://github.com/contributor1"],
      },
    ],
  },
];

export default contributorsData;
