import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${isActive ? "text-primary font-semibold" : ""}  hover:text-primary 
        active:!text-neutral py-1.5 px-3 text-sm gap-2 grid grid-flow-col rounded-none focus:bg-white font-medium nav-link text-secondary-content`}
    >
      {children}
    </Link>
  );
};

export const ProfileHeader = () => {
  const navLinks = (
    <>
      <li>
        <NavLink href={"/contributors/"}>Profile Details</NavLink>
      </li>
      <li>
        <NavLink href="/contributions">Bounty Details</NavLink>
      </li>
    </>
  );

  return (
    <section className="sm:px-0 border-b border-[#f3edf7]">
      <div className="container mx-auto py-1">
        <ul className="flex flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
    </section>
  );
};
