export function getAbbreviation(value: string): string {
  const abbreviatedValue = value.slice(0, 3).toUpperCase()

  return abbreviatedValue
}
