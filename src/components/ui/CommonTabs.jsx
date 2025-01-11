/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";

function CommonTabs({ tabs }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTabFromParams = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(0);

  // Set the active tab based on the search params
  useEffect(() => {
    const tabIndex = tabs.findIndex(tab => tab.value === activeTabFromParams);
    setActiveTab(tabIndex >= 0 ? tabIndex : 0); // Default to the first tab if no match
  }, [activeTabFromParams, tabs]);

  // Handle tab change and update the URL search params
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const selectedTabValue = tabs[newValue].value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", selectedTabValue);
    router.push(`?${newParams.toString()}`, undefined, { shallow: true });
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box mt={2}>{tabs[activeTab]?.content}</Box>
    </Box>
  );
}

export default CommonTabs;
