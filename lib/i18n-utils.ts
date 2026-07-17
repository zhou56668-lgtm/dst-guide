export function localName<T extends { name: string; nameEn: string }>(
  item: T,
  locale: string
): string {
  return locale === "en" ? item.nameEn : item.name;
}

export function localText(
  zhText: string,
  enText: string | undefined,
  locale: string
): string {
  if (locale === "en" && enText) return enText;
  return zhText;
}
