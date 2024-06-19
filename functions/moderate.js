const httpsRequest = require("./httpsRequest.js")
const config = require("../config.js")
const tokens = require("../tokens.js")

const urlRegex = /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/g;

function getHostname(url) {
    console.log(url)
    // Find & remove protocol (http, ftp, etc.) and get hostname
    var hostname = url.split('/')[2];

    // Find & remove port number
    hostname = hostname.split(':')[0];

    return hostname;
}

function containsNonWhitelistedLinks(links, whitelist) {
    function isLinkInWhitelist(link) {
        const linkDomain = new URL(link).hostname.replace('www.', ''); // Extract domain from link
        return whitelist.some(domain => domain === linkDomain);
    }

    return links.some(link => !isLinkInWhitelist(link));
}

module.exports = function (message) {
    let reason = null;
    const urls = message.content.match(urlRegex)

    if (urls && containsNonWhitelistedLinks(urls, config.links)) {
        reason = 'Unknown Link';
    }

    if (reason) {
        message.reply(`This was flagged by the moderation system.\nReason: ${reason}`);
        setTimeout(function () {
            message.delete();
        }, 5000);
    }
}