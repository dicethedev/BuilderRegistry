import { Heading } from "../Heading";

type BountyStatusTabProps = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

export const BountyStatusTab = ({ activeTab, setActiveTab }: BountyStatusTabProps) => {
  return (
    <div role="tablist" className="tabs space-x-3">
      <a role="tab" className={`${activeTab === 0 ? "tab-active" : ""}`} onClick={() => setActiveTab(0)}>
        <Heading text="All Bounties" />
      </a>
      <a role="tab" className={` ${activeTab === 1 ? "tab-active" : ""}`} onClick={() => setActiveTab(1)}>
        <Heading text="Opened Bounties" />
      </a>
      <a role="tab" className={`${activeTab === 2 ? "tab-active" : ""}`} onClick={() => setActiveTab(2)}>
        <Heading text="Completed" />
      </a>
    </div>
  );
};
