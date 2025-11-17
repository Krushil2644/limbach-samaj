# Limbach Samaj Connect

A modern, responsive website for **Limbach Samaaj** – a not-for-profit community organization for Limbach families across **Canada**.  

The site focuses on sharing information about the community, its committee, events, membership, and ways to get involved.

---

## 🚀 Features

- Static website built for fast load times and easy hosting
- Responsive layout (mobile, tablet, desktop)
- **Light & Dark mode** toggle
- Sections for:
  - Home / Hero
  - About Limbach Samaaj
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
