# Moving the site to another GitHub account or organisation

The site carries no domain of its own. There is no canonical URL, no absolute asset path and no
hard-coded host anywhere in `src/`, so a move is a copy of the repository plus one setting on
GitHub. This document is the whole procedure.

Two things decide the address you end up with, and both are choices made when the repository is
created. Nothing else matters.

---

## 1. Pick the address first

| Repository name | What GitHub serves it at |
| --- | --- |
| `<owner>/<owner>.github.io` | `https://<owner>.github.io/` (the bare root) |
| any other name, for example `Booking-AE-web` | `https://<owner>.github.io/Booking-AE-web/` |

Only a repository named exactly `<owner>.github.io` gets the root address. That is a GitHub rule,
not a preference of this project. If you want `https://aetheria-events.github.io` with nothing
after it, the repository must be called `aetheria-events.github.io`.

The build already knows the difference. `vite.config.js` drops the path prefix for a
`*.github.io` repository and adds it for every other name, and the deploy workflow works out the
sitemap origin the same way. Nothing in this project needs editing after the move.

To confirm before you commit to a name:

```bash
npm ci
GITHUB_ACTIONS=true GITHUB_REPOSITORY="Aetheria-events/aetheria-events.github.io" \
  npx vite build --outDir /tmp/root-check
grep -o 'src="[^"]*\.js"' /tmp/root-check/index.html     # expect /assets/...

GITHUB_ACTIONS=true GITHUB_REPOSITORY="Aetheria-events/Booking-AE-web" \
  npx vite build --outDir /tmp/path-check
grep -o 'src="[^"]*\.js"' /tmp/path-check/index.html     # expect /Booking-AE-web/assets/...
```

---

## 2. Create the repository

On GitHub, with the correct owner and the name chosen above:

- **Visibility:** public. GitHub Pages needs a public repository on the free plan.
- **Add README:** off, we already have one.
- **Add .gitignore:** none, ours is committed.
- **Add license:** none unless you have decided on one.

Do not add a `.github.io` custom domain yet. Get the plain address working first.

---

## 3. Push the code

From a checkout of this project, with the new repository URL:

```bash
git remote add neworigin https://github.com/<owner>/<repo>.git
git push neworigin main
```

If the new repository was created with a README or any other commit, that push is rejected as
non-fast-forward. Either delete and recreate the repository empty, or force the first push with
`git push --force neworigin main` while it still contains nothing of value. Never force push over
anything you want to keep.

After the push, the local checkout can point at the new home:

```bash
git remote set-url origin https://github.com/<owner>/<repo>.git
git remote remove neworigin
```

---

## 4. Turn on Pages

In the new repository: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

That is the only setting. There is no branch to pick, no folder to choose and no Jekyll build,
because the workflow publishes a prebuilt artifact.

The push in step 3 started a run before Pages was enabled, and that run will have failed at the
deploy step. Do not chase it. Either wait for the next push or run **Actions → Deploy to GitHub
Pages → Run workflow** once Pages is on.

---

## 5. Check four things, in this order

1. **The build log** shows `building for https://<owner>.github.io...`, which proves the sitemap
   origin resolved to the new home rather than the old one.
2. **The address loads** and the stylesheet is not missing. A white unstyled page means the path
   prefix is wrong, which means the repository name and the expected address disagree.
3. **A deep link works.** Open `/<path>/booking` directly, not by clicking through. It should load
   the form, not GitHub's 404. This is what `dist/404.html` is for.
4. **The sitemap** at `/<path>/sitemap.xml` lists the new origin on every line.

---

## 6. Afterwards

- **The old address.** Leave the old repository deployed until the new one has been checked on a
  phone. Then either archive it or turn Pages off in its settings. Anything printed or shared that
  points at the old address will stop working, so if the marketing site has been circulating, keep
  a small redirect page there instead: an `index.html` with a meta refresh to the new address.
- **The backup folder.** Regenerate all three files from the new main branch and replace the copies
  in Drive, so a restore lands on the current home rather than the old one.
- **The custom domain.** When `book.aetheriaevents.com` is ready, set it in Settings → Pages on the
  new repository and add the CNAME record at the DNS provider. Do not set the custom domain before
  the DNS record exists, or the Pages address stops answering.
- **Links inside the site** are all relative or router paths, so they keep working unchanged.

---

## What does not need to change

Worth knowing, because it is the usual source of worry:

- **The booking form.** It posts to the Google Apps Script URL stored in `brand.bookingEndpoint`,
  which is an absolute `script.google.com` address. It does not care what domain the page is served
  from and does not need re-authorising after a move.
- **The spreadsheet and the Drive folder.** They belong to the Google account, not to GitHub.
- **Assets, fonts and the PDF.** All relative, all bundled.
- **The single-file build.** Opened from disk, no host involved at all.

The only file in the repository that ever named the old home was the deploy workflow, and it now
derives the address from whichever repository runs it.
