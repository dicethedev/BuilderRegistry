import { useState } from "react";
import { SearchIcon } from "~~/components/assets/SearchIcon";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex border py-[0.6rem] px-5 rounded-lg border-[#f3edf7]">
      <input
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder="Search..."
        className="min-w-[16rem] focus:border-none focus:outline-none placeholder:text-[#9699AA] placeholder:font-light "
      />
      <button className="btn btn-sm btn-primary" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
