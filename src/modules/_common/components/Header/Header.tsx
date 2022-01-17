import { classNames } from "utils/classNames";

type TProps = {
  children: React.ReactNode;
};
export function Header({ children }: TProps) {
  return (
    <div className={classNames("flex items-center justify-center mt-6 px-4")}>
      {children}
    </div>
  );
}
