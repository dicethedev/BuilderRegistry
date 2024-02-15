import type { NextPage } from "next";
import { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import contributionsData, { Contributions } from "~~/data/contributions";
import Image from "next/image";
import Link from "next/link";
import { GridIcon } from "~~/components/assets/GridIcon";
import { ListIcon } from "~~/components/assets/ListIcon";
import { Card } from "~~/components/builder-registry/Card";

const Contributions: NextPage = () => {
    const [display, setDisplay] = useState(true);
    const [query, setQuery] = useState<string>("");

  const setGridView = () => {
    setDisplay(true);
  };

  const setListView = () => {
    setDisplay(false);
  };

  const filterContributions = () => {
    if (!query) {
      return contributionsData;
    }

    const lowercasedQuery = query.toLowerCase();

    return contributionsData.filter((contribution: Contributions) => {
      return (
        contribution.title.toLowerCase().includes(lowercasedQuery) ||
        contribution.description.toLowerCase().includes(lowercasedQuery)
      );
    });
  };

  const highlightSearchedText = (text: string, query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const index = text.toLowerCase().indexOf(lowercasedQuery);

    if (index === -1) {
      return text;
    }

    const preText = text.slice(0, index);
    const highlightedText = text.slice(index, index + query.length);
    const postText = text.slice(index + query.length);

    return (
      <span>
        {preText}
        <mark>{highlightedText}</mark>
        {postText}
      </span>
    );
  };


  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-base-100">
        <div className="container mx-auto">
          <div>
            <p className="font-bold italic">
              Total Contributors : <span>{contributionsData.length} 👷</span>
            </p>

            <div className="flex justify-between items-center">
          <div className="flex gap-10 my-6 items-center">
              <div className="flex items-center">
                <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Explorers
              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Pioneers              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Cosmonaut              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Navigators              </div>
            </div>

            <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="border p-2 rounded-md min-w-[20rem]"
            />      

             <div className="ml-2">
                <button onClick={setGridView} >
                <GridIcon/>
                </button>
            <button onClick={setListView}>
            <ListIcon/>
            </button>
               
            </div> 
               </div>
            </div>


            {display ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {filterContributions().map((contribution: Contributions, index: number) => (
               <Card index={index} imageUrl={contribution.img} title={contribution.title} description={contribution.description} likes={contribution.likes}/>
                ))}
              </div>
            ) : (

            <table role="table" className="w-full text-left table-fixed">
              <thead>
                <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
                  <th className="py-3 ">Img</th>
                  <th className="py-3 w-[20%]">title</th>
                  <th className="py-3 w-[30%]">Description</th>
                  <th className="py-3 ">contriutors</th>
                  <th className="py-3">Likes</th>
                  <th className="py-3 text-right">Links</th>
                </tr>
              </thead>
              <tbody>
                {filterContributions().map((contribution: Contributions, index: number) => (
                  <tr key={index} className="border-b border-[#DED1EC]">
                    <td className="py-1"><Image src={contribution.img} width={148} height={72} alt={contribution.title + " image"}/></td>
                    <td className="py-5 pr-3 font-semibold">{contribution.title}</td>
                    <td className="py-5 pr-5 f">{contribution.description}</td>
                    <td className="py-5">{contribution.contributorsId.address}</td>
                    <td className="py-5">{contribution.likes}</td>
                    <td className="py-5 text-right">
                        <div className="flex gap-3">
                            <Link href="/">
                            <Image src={"/img/github.svg"} width={28} height={28} alt="github"></Image>
                            </Link>
                       
                            <Image src={"/img/weblink.svg"} width={28} height={28} alt="website link"></Image>

                            <Link href="/">
                            <Image src={"/img/youtube.svg"} width={28} height={28} alt="youtube"></Image>
                            </Link>
                            <Link href="/">
                            <Image src={"/img/twitter.svg"} width={28} height={28} alt="twitter"></Image>
                            </Link>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributions;
