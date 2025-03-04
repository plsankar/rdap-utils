export interface RDAPData {
    handle: string;
    ldhName: string;
    links: { href: string; rel: string }[];
    events: { eventAction: string; eventDate: string }[];
    entities: {
        handle: string;
        roles: string[];
        vcardArray: [string, ...unknown[]][];
    }[];
    status: string[];
    notices: { title: string; description: string[] }[];
}

export interface RDAPDNSList {
    services: Array<RDAPDNSListItem>;
}

export type RDAPDNSListItem = [string[], string[]];
