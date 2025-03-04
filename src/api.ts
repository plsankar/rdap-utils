import type { RDAPDNSList } from "./types";

export const fetchDNSList = async (): Promise<RDAPDNSList> => {
    const response = await fetch("https://data.iana.org/rdap/dns.json");
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
};
