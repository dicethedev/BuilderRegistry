interface BountyStatusTabProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const BountyStatusTab = ({ activeTab, setActiveTab }: BountyStatusTabProps) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <a role="tab" className={`tab ${activeTab === 0 ? "tab-active" : ""}`} onClick={() => setActiveTab(0)}>
        All
      </a>
      <a role="tab" className={`tab ${activeTab === 1 ? "tab-active" : ""}`} onClick={() => setActiveTab(1)}>
        Active
      </a>
      <a role="tab" className={`tab ${activeTab === 2 ? "tab-active" : ""}`} onClick={() => setActiveTab(2)}>
        Closed
      </a>
    </div>
  );
};

export default BountyStatusTab;
