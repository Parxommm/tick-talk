# TickTalk

A social-style web app: posts feed, profiles, and chats. Generated with [Angular CLI](https://github.com/angular/angular-cli) 20.1.1, built as an Nx monorepo.

## 📋 Features

- **Login** — user authentication (`/login`)
- **Profile** — user profile page (`/profile/:id`, default `/profile/me`)
- **Settings** — account management (`/settings`)
- **Search** — content search (`/search`)
- **Subscriptions** — subscriptions list (`/subscriptions`)
- **Chats** — messaging (lazy-loaded, `/chats`)

## 🛠 Technologies and libraries

- **Frontend:** Angular 20, TypeScript 5.8, RxJS, SCSS
- **State / API:** NgRx Store and Effects
- **Utilities:** ngx-cookie-service
- **Build & monorepo:** Nx 22, Angular CLI 20
- **Testing:** Karma, Jasmine
- **Code quality:** ESLint, Prettier (including Angular parser for HTML)

## 🚀 Development server

To start the local development server:

```bash
npm run start
```

Or via Nx:

```bash
nx run tick-talk:serve
```

Once running, open `http://localhost:4200/` in your browser. The app reloads when you change source files.

## 📦 Building

To build the project:

```bash
npm run build
```

Or via Nx:

```bash
nx build tick-talk
```

Output goes to `dist/tick-talk` (with the application builder: `dist/tick-talk/browser`). The production build is optimized for size and speed.

## 🌐 Deploying to GitHub Pages

To build for GitHub Pages deployment:

```bash
npm run build:github
```

This script:

1. Builds the project with the correct `baseHref` for GitHub Pages (`/tick-talk/`)
2. Copies `404.html` to the output directory for proper routing
3. Fixes asset paths for `baseHref`

### Deployment Steps

1. **Build for GitHub Pages:**
   ```bash
   npm run build:github
   ```

2. **Deploy to GitHub Pages:**

   **Option A: gh-pages branch**
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d dist/tick-talk/browser
   ```

   **Option B: GitHub Actions**
   - Create `.github/workflows/deploy.yml`
   - On push to the repo, the workflow will deploy on push to main

3. **Configure GitHub Pages:**
   - Repository → Settings → Pages
   - Source: `gh-pages` branch (Option A) or **GitHub Actions** (Option B)

### Important

- `baseHref` is set in `apps/tick-talk/project.json` under `configurations.github.baseHref`
- If your repo has a different name, update `baseHref` in `project.json` and in `public/404.html` (the `<base href="...">` tag)
- `404.html` is required for direct URL access (e.g. refreshing the page on a nested route)
- Asset paths automatically respect `baseHref` during the build

## 🧪 Running unit tests

To run unit tests (Karma + Jasmine):

```bash
npm run test
```

Or via Nx:

```bash
nx test tick-talk
```
