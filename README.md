# TickTalk

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deploying to GitHub Pages

To build the project for GitHub Pages deployment:

```bash
npm run build:github
```

This will:
1. Build the project with the correct `baseHref` for GitHub Pages (`/tick-talk/`)
2. Copy `404.html` to the output directory for proper routing

### Deployment Steps

1. **Build for GitHub Pages:**
   ```bash
   npm run build:github
   ```

2. **Deploy to GitHub Pages:**
   
   **Option A: Using gh-pages branch**
   ```bash
   # Install gh-pages if not already installed
   npm install --save-dev gh-pages
   
   # Add deploy script to package.json (optional)
   # "deploy": "npm run build:github && gh-pages -d dist/tick-talk/browser"
   
   # Deploy
   npx gh-pages -d dist/tick-talk/browser
   ```

   **Option B: Using GitHub Actions**
   - Create `.github/workflows/deploy.yml` (see example below)
   - Push to your repository
   - GitHub Actions will automatically deploy on push to main branch

3. **Configure GitHub Pages:**
   - Go to your repository Settings → Pages
   - Select source: `gh-pages` branch (if using Option A) or `GitHub Actions` (if using Option B)

### Important Notes

- The `baseHref` is set to `/tick-talk/` in the GitHub build configuration
- If your repository has a different name, update `baseHref` in:
  - `apps/tick-talk/project.json` under `configurations.github.baseHref`
  - `public/404.html` in the `<base href="...">` tag
- The `404.html` file handles routing for direct URL access (e.g., refreshing the page on a route)
- All routes will work correctly, including direct access to nested routes
- **Asset paths**: All asset paths (images, icons, SVG) have been updated to use relative paths that work correctly with `baseHref`. The paths are automatically prefixed with the baseHref during build.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
