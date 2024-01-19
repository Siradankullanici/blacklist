const url = {
    domains: "https://api.exerra.xyz/v2/scam/all/domains",
    links: "https://api.exerra.xyz/v2/scam/all/links"
}

const domainReq = await fetch(url.domains)
const linksReq = await fetch(url.links)

if (domainReq.status !== 200) throw Error("Exerra Phishing API /all/domains status !== 200")
if (linksReq.status !== 200) throw Error("Exerra Phishing API /all/links status !== 200")

const domains = await domainReq.json() as { status: 200 | 400 | 500, data: [string] }
const links = await linksReq.json() as { status: 200 | 400 | 500, data: [string] }

let parsedDomains = domains.data.join("\n")
let parsedLinks = links.data.join("\n")

await Bun.write("./lists/domains.txt", `! Title: Exerra Phishing API blacklist (domains only)
! Updated: ${new Date().toISOString()}
! Expires: 1 day (update frequency)
${parsedDomains}
`)

await Bun.write("./lists/links.txt", `! Title: Exerra Phishing API blacklist (links only)
! Updated: ${new Date().toISOString()}
! Expires: 1 day (update frequency)
${parsedLinks}
`)

await Bun.write("./lists/all.txt", `! Title: Exerra Phishing API blacklist (domains + links)
! Updated: ${new Date().toISOString()}
! Expires: 1 day (update frequency)
${parsedDomains}
${parsedLinks}
`)

// console.log(domains.data.join("\n"))

console.log("Hello via Bun!");