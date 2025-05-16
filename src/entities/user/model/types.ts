export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: "PasswordIcon" | "PasswordHideIcon";
  error?: boolean;
  errorText?: string;
  onIconClick?: () => void;
};
