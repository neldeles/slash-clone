type THeadingProps = {
  text: string;
};
export function Heading({ text }: THeadingProps) {
  return <h1 className="text-lg font-medium text-secondary">{text}</h1>;
}
