import { classNames } from "utils/classNames";

type TProps = {
  children: React.ReactNode;
};
export function Header({ children }: TProps) {
  return (
    <div className={classNames("flex items-center mt-6 px-8")}>{children}</div>
  );
}
