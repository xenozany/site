# XENOZANY

A lightweight personal website: moving typography, a central **etc.** index, and the original archive. HTML, CSS, and JavaScript, with no dependencies or build step.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Three continuous type columns and the central etc. link |
| `etc.html` | The six existing destinations, with archive and elsewhere filters |
| `before25.html` | BEFORE SS25 archive |
| `poem.html` | The original 17-line poem, playback controls, and a full transcript |
| `offline.html` | All nine original images and three original Spotify playlists |
| `plan.html` | The original redacted invitation |
| `court.html` | The original archived document |
| `404.html` | A route back to the index for missing pages |

The original HTML comment notes remain on their respective pages. The small asterisk opens three additional, discoverable notes drawn from the original homepage comments. The original URLs, fonts, artwork, redactions, and playlist destinations are preserved. No additional personal data has been added.

## Editing

- Shared appearance: `assets/site.css`.
- Theme, motion, filters, dialogs: `assets/site.js`.
- Poem playback: `assets/poem.js`. Edit the transcript in `poem.html` to change the sequence. It is the single source of poem content.
- Add a future project by copying an `.index-item` in `etc.html`, setting its real URL and description, and updating the initial result count. If adding a new category, add a matching `data-filter` button.
- Image names are case-sensitive. Keep the original filenames in `zanypunk/`.

## Preview and deployment

Any static server can serve the repository root, for example `python -m http.server 8000`. The existing GitHub Pages workflow deploys the root on pushes to `main`; `CNAME` continues to point to xenozany.com.

The site respects `prefers-reduced-motion`, remembers light/dark and background-motion preferences in the current browser, works with keyboard navigation, and retains readable content with JavaScript disabled. Image enlargement and notes use native dialogs with Escape dismissal and focus return.

The plan and court pages carry `noindex` metadata. This is a search-engine hint, not access control; the original public URLs remain accessible.
