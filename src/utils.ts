import { dnsList } from "./dns-list"

export const getTldServer = (tld: string) => {
    return dnsList.find((item) => item.tld === tld)?.server||null
}