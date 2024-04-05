import { SwitchTheme } from "~~/components/SwitchTheme";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 p-3 mt-1 mb-8 lg:mb-0 w-full container mx-auto">
      <div className="flex justify-between w-full items-center">
        <div>© GuildBase 2024</div>
        <div className="flex justify-between items-center p-4 bottom-0 left-0 pointer-events-none">
          <SwitchTheme className="pointer-events-auto" />
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
};
