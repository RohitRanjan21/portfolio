# Rohit Ranjan - Portfolio

Vite + React + TypeScript + Tailwind CSS v4 + Motion (Framer Motion) + Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Updating content (no component code needed)

All content lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, tagline, about text, stats, email, socials, résumé link, availability badge |
| `experience.ts` | Timeline jobs (newest first) |
| `projects.ts` | Project cards + the detail modal. New `category` values become filter chips automatically |
| `skills.ts` | Skill groups (bento cards). The marquee is generated from these |
| `credentials.ts` | Certifications, education, awards |

### Add a project
Copy an object in `src/data/projects.ts`, change the `slug` (must be unique) and fill in the fields.
Optional: `image: '/projects/my-shot.png'` (put the file in `public/projects/`), `links`, `badge`, `featured: true`.
Without an image, a generative cover is drawn from `accent`.

### Add a certification
Add an entry to `certifications` in `src/data/credentials.ts` and the "in progress" placeholder disappears automatically.

### Add a résumé download button
Drop your PDF at `public/resume.pdf` and set `resume: '/resume.pdf'` in `profile.ts`.

## Deploy on your own domain (Vercel, free)

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. Framework preset **Vite** is detected; no settings to change.
3. In the project → **Settings → Domains** → add `yourdomain.com` (and `www.yourdomain.com`).
4. At your domain registrar's DNS settings, add the records Vercel shows, typically:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
5. Wait for DNS to propagate (minutes to a few hours). HTTPS is issued automatically.

Every `git push` to `main` redeploys the site.
