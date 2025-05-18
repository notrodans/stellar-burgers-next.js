export type HandleScrollType = (
  setCurrent: (value: string) => void,
  containerRef: React.RefObject<HTMLDivElement | null>,
) => void;

export type HandleClickType = (
  setCurrent: (value: string) => void,
  value: string,
) => void;

export interface TypeTabsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}
