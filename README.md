# Vipin Saket — AI/ML Engineer Portfolio

Fully working source code of the portfolio site. Same code, same design, runs 100% locally
in VS Code. No paid service needed.

---

## 1. Pehle ye install karo (one-time setup)

| Tool | Kyun chahiye | Kaise install karein |
| --- | --- | --- |
| **Node.js 20+ (LTS)** | Isme `npm` aata hai — project isi se chalta hai | https://nodejs.org se "LTS" download karo |
| **VS Code** | Code edit karne ke liye | https://code.visualstudio.com |
| **Git** (optional) | GitHub pe code daalne aur deploy ke liye | https://git-scm.com |

Install ke baad terminal kholo aur check karo:

```sh
node -v     # 20 ya usse bada hona chahiye
npm -v
```

### VS Code extensions (recommended)

- **ESLint** + **Prettier** — auto formatting
- **Tailwind CSS IntelliSense** — class names autocomplete
- **ES7+ React Snippets** — fast React typing

---

## 2. Project chalao (3 commands)

Folder ko VS Code me kholo (**File → Open Folder**), phir VS Code ka terminal kholo
(`Ctrl + ~` / `Cmd + ~`) aur:

```sh
npm install      # ek baar — saare packages aate hain (2-3 min)
npm run dev      # server start
```

Terminal me `http://localhost:5173` dikhega — browser me kholo, site live.
Koi bhi file save karo, page apne aap refresh ho jayega.

Aur commands:

```sh
npm run build    # production build banata hai
npm run preview  # build ko locally test karo
npm test         # routing test
npm run lint     # code check
```

---

## 3. Kahan kya badalna hai (sabse zaroori)

| File | Isme kya hai |
| --- | --- |
| **`src/content/site.ts`** | **Yahi main file hai.** Naam, title, email, phone, LinkedIn, GitHub URL, skills, projects — sab yahan se badalte hain. |
| `src/routes/index.tsx` | Page ka layout: hero, About, Skills, Projects, Education, Contact form. Section copy ya order badalne ke liye. |
| `src/styles.css` | Rang (dark navy, blue/purple accent), fonts, glow shadow, animation. |
| `src/routes/__root.tsx` | Page title, SEO description, Google Fonts load. |
| `public/resume.pdf` | **Apna resume PDF yahan daalo** — "Download Resume" button chalu ho jayega. |
| `public/favicon.ico` | Tab ka icon. |

### Content edit karne ka example

`src/content/site.ts` kholo aur apni values daalo:

```ts
export const site = {
  name: "Vipin Saket",
  title: "Aspiring AI/ML Engineer",
  email: "vippu.2026@outlook.com",
  phone: "+91-8349828668",
  linkedin: "https://www.linkedin.com/in/VipinSaket",
  github: "https://github.com/<tumhara-username>",   // <-- yahan apna GitHub URL
  resumePath: "/resume.pdf",
};
```

Naya project add karna ho to `projects` array me ek object aur daal do:

```ts
{
  title: "Project ka naam",
  overview: "2-3 line me project kya karta hai.",
  tech: ["Python", "Scikit-learn"],
  status: "Completed",
  link: "https://github.com/<username>/<repo>",
},
```

### Rang badalna ho

`src/styles.css` me ye lines edit karo (oklch format hi rakho):

```css
--background: oklch(0.16 0.04 265);  /* page ka dark navy */
--primary: oklch(0.68 0.17 250);     /* blue accent */
--accent: oklch(0.65 0.2 295);       /* purple accent */
```

---

## 4. Free me publish kaise karein

### Option A — Lovable se (sabse aasan, 1 click)
Lovable editor me **Publish** dabao, ek free address chuno (`vipin-saket.lovable.app`),
ho gaya. Koi paisa nahi.

### Option B — Vercel (free, VS Code wale code se)
1. GitHub pe naya private repo banao, code push karo:
   ```sh
   git init
   git add .
   git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. https://vercel.com pe GitHub se login karo → **Add New → Project** → repo select karo.
3. Framework khud detect ho jayega → **Deploy**. Free `*.vercel.app` link milta hai.

### Option C — Netlify
https://app.netlify.com → **Add new site → Import from Git** → repo select → Deploy.

> Domain kharidne ki zaroorat nahi. `.vercel.app` / `.netlify.app` / `.lovable.app`
> links free hain aur recruiter ko bhejne ke liye bilkul theek hain.

---

## 5. Problem aaye to

| Problem | Fix |
| --- | --- |
| `npm install` fail ho | `rm -rf node_modules package-lock.json` phir `npm install` dobara |
| Node purana hai | Node.js site se latest **LTS** install karo |
| Port 5173 busy | `npm run dev -- --port 3000` |
| Build me error | Terminal ka pura error padho — usually ek file ka naam ya import galat hota hai |
| Resume button alert dikhaye | `public/resume.pdf` file nahi hai — PDF wahan daalo |

---

## 6. Folder ka structure

```text
vipin-saket-portfolio/
├── public/                 resume.pdf, favicon, robots.txt
├── src/
│   ├── content/site.ts     ← SAB content yahan (naam, skills, projects)
│   ├── routes/
│   │   ├── __root.tsx      HTML shell, SEO title/description, fonts
│   │   └── index.tsx       Poori page ka layout + contact form
│   ├── styles.css          Design system: rang, fonts, animation
│   ├── router.tsx          Router setup
│   ├── start.ts            Server setup
│   ├── server.ts           SSR entry
│   └── test/               Routing test
├── package.json            Dependencies + npm scripts
├── vite.config.ts          Build config
└── tsconfig.json           TypeScript config
```

**Stack:** React 19 + TanStack Start (file-based routing) + Tailwind CSS v4 + TypeScript.
`src/routeTree.gen.ts` automatically generate hota hai — ise haath mat lagana.
