export function classNames(...classes: Array<string | null>): string {
  return classes.filter(Boolean).join(" ");
}
