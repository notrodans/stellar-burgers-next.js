import { CONSTANTS_MAP } from "~/shared/constants";
import type { HandleClickType, HandleScrollType } from "../model";

export const handleClick: HandleClickType = (setCurrent, value) => {
  const element = document.getElementById(value);
  element?.scrollIntoView({ behavior: "smooth" });
  setCurrent(value);
};

export const handleScroll: HandleScrollType = (setCurrent, containerRef) => {
  const { types } = CONSTANTS_MAP.entities.ingredient;
  const container = containerRef.current;
  if (!container) return;
  const tabs = Object.keys(types);
  for (const tab of tabs) {
    const section = document.getElementById(tab);
    if (!section) continue;
    const bounds = section.getBoundingClientRect();
    if (
      bounds.top <= container.clientHeight * 0.6 &&
      bounds.bottom >= container.clientHeight * 0.6
    ) {
      setCurrent(tab);
      break;
    }
  }
};
