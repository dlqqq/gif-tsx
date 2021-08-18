# Changelog

## 0.1.5

- Fix `README.md` example (#2)

- Include `prepublishOnly` script to ensure package is always built before publish.

## 0.1.4

Bunk. The `--dry-run` flag wasn't working for whatever reason.

## 0.1.3

BROKEN: forgot to run `yarn build` before publish. whoops...

- Include `repository` field in `package.json` manifest

## 0.1.2

All done over the course of a soul-draining 6-hour-long flight with no internet.

- Symlinked `.eslintignore` and `.prettierignore` to `.gitignore`

- Nuked console log in `useGifController`

- Fixed linter errors

- Merged `loading: boolean` and `error: boolean` properties into `state: 'loading' | 'error' | 'resolved'`.

- Updated `README.md`

## 0.1.1

- Added `bugs` property to `package.json` manifest

## 0.1.0

- Initial release
