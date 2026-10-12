# Cathedral media contract

Updated 12 October 2026 following the user's correction that every card image area must be the same.

`cathedral-media` owns one 4:3 image-area ratio through `--cathedral-media-ratio`. Equal-width cards have equal-height image areas, independent of source dimensions. The internal image is 100% wide and high, uses cover fit, and has zero padding. Photographs retain their proportions and are cropped to the frame. The shared frame owns the arch; `position` can specify a focal point.

This supersedes the previous natural-height/no-cropping instruction for card image areas. Consumers do not set source-dependent media heights or page-specific fit overrides. Atlas, Glaze Families and Reading remain on their existing rendering path.

`tools/check-media.mjs` checks the component contract. `tools/audit-media-browser.js` checks the actual 4:3 frame ratio, matching frame/image dimensions, cover fit, padding, fallback and consumer coverage at compact and expanded sizes.
