import { useState, useEffect } from "react";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Tab } from "~/shared/ui";
import { handleScroll, handleClick } from "../lib";
import type { TypeTabsProps } from "../model";

export const IngredientTabs: React.FC<TypeTabsProps> = ({ containerRef }) => {
  const { types } = CONSTANTS_MAP.entities.ingredient;
  const [currentTab, setCurrentTab] = useState("bun");
  const scrollHandler = () => handleScroll(setCurrentTab, containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", scrollHandler);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", scrollHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return (
    <div className="grid grid-cols-3 h-10 mt-5 mb-10">
      {Object.entries(types).map(([type, name]) => (
        <Tab
          key={type}
          value={type}
          active={currentTab === type}
          onClick={() => handleClick(setCurrentTab, type)}
        >
          {name}
        </Tab>
      ))}
    </div>
  );
};
