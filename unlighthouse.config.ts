import { defineUnlighthouseConfig } from 'unlighthouse/config'

// Toggle this to switch between local development and production audits
const isDev = true

export default defineUnlighthouseConfig({
    site: isDev ? 'http://localhost:3000' : 'https://techbros.tech',
    urls: [
        '/',
        '/services/web-development',
        '/services/app-development',
        '/services/ui-ux-design',
        '/services/brand-strategy'
    ],
    scanner: {
        // Current limitation: Unlighthouse runs one device type per scan.
        // To run both, you can toggle this or run with CLI flags: --mobile or --desktop
        device: 'desktop',
        skipJavascript: false,
        samples: 1, // Performed 1 audits for better accuracy
        throttle: true,
    },
    debug: true,
})
