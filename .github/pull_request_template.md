## What
Landing page, Login and Register pages built from the ByteSpace Figma design.

## How to check
- `npm install && npm run dev`
- Compare `/`, `/login`, `/register` with the Figma frames at 1440px, then resize to 768px and 390px.

## Notes for the reviewer
- Auth endpoints are mocked (validation only, no database).
- Satoshi falls back to DM Sans until the font files are added (see `public/fonts/README.txt`).

## Checklist
- [ ] `npm run lint` and `npm run typecheck` pass
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Checked at 390 / 768 / 1440px
