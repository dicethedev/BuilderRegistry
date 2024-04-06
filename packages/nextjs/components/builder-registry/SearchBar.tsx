import SearchIcon from "~~/components/assets/icons/SearchIcon";

type SearchProps = {
  query: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchBar: React.FC<SearchProps> = ({ query, onChange }) => {
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex border py-[0.6rem] px-5 rounded-lg border-[#DED1EC]">
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="Search..."
        className="min-w-[16rem] focus:border-none focus:outline-none placeholder:text-[#9699AA] placeholder:font-light text-sm"
      />
      <SearchIcon />
    </form>
  );
};
