export const shortenAddress = (address: string) => {
  if (!address) return "";
  const first = address.slice(0, 4);
  const last = address.slice(-4);
  return `${first}...${last}`;
};
