import React from "react";
import Image from "next/image";

export default function ContributorsStats() {
  return (
    <div className="flex gap-8 my-6 items-center flex-wrap">
      <div className="flex items-center font-medium">
        <Image src="/img/explorer.svg" alt="chart" width={30} height={30} className="mr-3" />
        Explorers
      </div>
      <div className="flex items-center font-medium">
        <Image src="/img/pioneers.svg" alt="chart" width={30} height={30} className="mr-3" />
        Pioneers
      </div>
      <div className="flex items-center font-medium">
        <Image src="/img/Cosmonaut.svg" alt="chart" width={30} height={30} className="mr-3" />
        Cosmonaut
      </div>
      <div className="flex items-center font-medium">
        <Image src="/img/navigators.svg" alt="chart" width={30} height={30} className="mr-3" />
        Navigators
      </div>
    </div>
  );
}
