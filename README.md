# EduMotive

Online home of **EduMotive Trimonthly** — the student magazine of Darul Huda Islamic University. Built with ZiteJS (React + Vite + Tailwind, TypeScript).

## Apps
| Folder | What it is |
| --- | --- |
| `apps/edumotive` | Public magazine site: articles, authors, flip-book magazine issues, news, about, join & contact, subscriptions, ads |
| `apps/edumotive-admin` | Admin panel to manage articles, issues, news, hero slides, team, settings and more |
| `apps/unimedia` | UniMedia site |
| `packages/components` | Shared UI components (shadcn/ui) |

## Structure
- `src/pages`, `src/components` — frontend
- `src/api` — backend endpoints (each file is one endpoint)
- `.zite/` — auto-generated SDK files (do not edit)

## Development
```bash
npm install
npx zitejs generate
npm run dev -w apps/edumotive
```

Data lives in the Zite Database; secrets are managed in Zite (never commit `.env` files).
