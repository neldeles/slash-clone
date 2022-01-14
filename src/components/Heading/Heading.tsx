type THeadingProps = {
  text: string;
};
export function Heading({ text }: THeadingProps) {
  return <h1 className="mt-6 text-lg font-medium text-gray-500">{text}</h1>;
}
