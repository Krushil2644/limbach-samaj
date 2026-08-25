# Limbach Samaj

A modern, responsive website for **Limbach Samaj of Canada** – a not-for-profit community organization for Limbach families across **Canada**.  

The site focuses on sharing information about the community, its committee, events, membership, and ways to get involved.

---

## 🚀 Features

- Static website built for fast load times and easy hosting
- Responsive layout (mobile, tablet, desktop)
- **Light & Dark mode** toggle
- Sections for:
  - Home / Hero
  - About Limbach Samaj
  - Our Committee
  - Events (upcoming & past)
  - Membership & Donations (coming soon)
  - Gallery
  - Contact
- Basic SEO setup (title, meta description, social preview tags)
- Accessible design (contrast-friendly colors, semantic HTML)
- Content structured so it can be updated easily in code or moved to a CMS later

---

## 🧱 Tech Stack

- [Vite](https://vitejs.dev/)  
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [shadcn/ui](https://ui.shadcn.com/) components  

---

## 📂 Project Structure (high-level)

```text
limbach-samaj-connect
├─ public/          # Static assets (images, favicons, etc.)
├─ src/
│  ├─ components/   # Reusable UI components (navbar, sections, cards, etc.)
│  ├─ pages/ or routes/  # Page-level components (depending on setup)
│  ├─ lib/ or utils/     # Helper functions, theming, hooks, etc.
│  └─ content/ or data/  # Config/data files for committee, events, text (if present)
├─ index.html
├─ package.json
└─ vite.config.ts

---

## 🖼️ Adding a gallery album

Albums are discovered from Cloudinary at runtime — **no code change or deploy
is needed to publish one.**

1. In Cloudinary, create a folder under `Limbach-Samaj-Assets/` named in
   lowercase with hyphens, e.g. `picnic-2026`.
2. Upload the photos (and video, if any) into it.
3. Reload `/gallery`. The album appears immediately.

What happens automatically:

| | |
|---|---|
| **Title** | Derived from the folder name — `picnic-2026` becomes "Picnic 2026" |
| **Cover** | The most recent *image* in the folder, cropped to 800×450 and served as WebP |
| **Count** | Total assets in the folder |
| **Order** | Newest album first, by most recent upload |

Empty folders are skipped, and a folder whose newest asset is a video still
gets an image cover.

### Overriding a title or cover

`src/content/gallery.json` is **only** overrides and an offline fallback — it
no longer controls which albums exist. Add an entry to give an album a
hand-written title:

```json
{ "id": "picnic-2026", "title": "Summer Picnic 2026", "coverImage": "", "imagesLength": 0 }
```

A `title` here always wins over the folder-name guess. `coverImage` is used
only if Cloudinary can't be reached.

### Image sizing

Originals are never sent to the browser. `api/gallery/[album].ts` returns
`display_url` (max 1600px) and `thumbnail_url` (320×320) alongside
`secure_url`, so a 5.7 MB original is delivered as ~172 kB in the lightbox and
~24 kB in the filmstrip. Do not switch the UI back to `secure_url`.
