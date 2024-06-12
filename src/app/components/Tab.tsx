'use client'
 
import { useState } from 'react';
 
type Tab = {
  id: string;
  title: string;
  content: React.ReactNode;
};

// Компонент вкладки
const Tab = ({ tab, isActive, onClick }: { tab: Tab; isActive: boolean; onClick: () => void }) => (
  <span  onClick={onClick} className={isActive ? 'active':''}>
    {tab.title}
  </span>
);

// Компонент вкладок
const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div>
      <div className="tabs">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          onClick={() => setActiveTabId(tab.id)}
        />
      ))}
      </div>
      <div style={{marginTop: 30}}>{tabs.find((tab) => tab.id === activeTabId)?.content}</div>
    </div>
  );
};

export default Tabs;