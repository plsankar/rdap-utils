const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Function to fetch RDAP data from a DNS service
async function fetchRdapData(url) {
  try {
    const response = await fetch(url);
    
    // Check if the response is ok (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch RDAP data: ${response.statusText}`);
    }
    
    // Parse the JSON response body
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching RDAP data:", error);
    throw error;
  }
}

// Function to save the data as a TypeScript file
function saveDataToFile(data, filename) {

  const { services } = data;

  let tlds = _(services)
      .map((service) => {
          return service[0].map((tld) => {
              return { tld, server: service[1][0] };
          });
      })
      .flatten()
      .value();

  const fileContent = `export const dnsList = ${JSON.stringify(tlds, null, 2)};`;

  fs.writeFileSync(filename, fileContent, 'utf8');
  console.log(`Data has been saved to ${filename}`);
}

const rdapUrl = 'https://data.iana.org/rdap/dns.json'; // Replace with the actual RDAP URL you want to fetch data from
const outputFile = path.join(process.cwd(), 'src', 'dns-list.ts');

// Fetch RDAP data and save it to a TypeScript file
fetchRdapData(rdapUrl)
  .then(data => {
    saveDataToFile(data, outputFile);
  })
  .catch(error => {
    console.error("Error processing RDAP data:", error);
  });
