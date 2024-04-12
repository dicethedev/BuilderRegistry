import Link from "next/link";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 p-3 mt-1 mb-8 lg:mb-0 w-full container mx-auto">
      <div className="flex justify-between w-full items-center py-2">
        <div className="font-medium">© GuildBase 2024</div>
        <p className="text-sm font-medium">Made in Abuja, available to the 🌎</p>
        <ul className="font-medium">
          <li className="inline">
            <Link href="">Twitter</Link>
          </li>
          <li className="inline ml-5">
            <Link href="">Github</Link>
          </li>
        </ul>
      </div>
      <div className="w-full"></div>
    </div>
  );
};
