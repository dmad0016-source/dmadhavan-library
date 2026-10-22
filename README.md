# NoMash Library (FIT5032 labs, weeks 2–12)

A Vue 3 + Vite library app built through the FIT5032 labs: JSON data, a validated
registration form, routing with a login guard, Firebase Authentication, Firestore,
a Cloud Function, the OpenWeather API, and deployment with CI/CD.

## Pages

| Page | Path | Week |
|---|---|---|
| Registration form (validation, confirm password, PrimeVue DataTable) | `/` | 3–5 |
| About (needs the demo login) | `/about` | 5 |
| Login / Access denied | `/login`, `/access-denied` | 5 (D/HD) |
| JSON Lab | `/json-lab` | 2 |
| Firebase Login / Register | `/FireLogin`, `/FireRegister` | 7 |
| Add Book + book list (ISBN > 1000) | `/addbook` | 8 |
| Get Book Count (Cloud Function) | `/GetBookCount` | 9 |
| Get Weather | `/WeatherCheck` | 10 |
| Count Book API (JSON only, no header) | `/CountBookAPI` | 10 |

Demo login for the About page: **admin / password123**.

## Project structure

```
src/
  components/   BHeader, BookList, JSONLab, ConfigNotice
  views/        one file per page
  router/       routes and the login guard
  stores/       auth.js (demo login state)
  firebase/     init.js (Firebase app + Firestore)
  config.js     weather API key and Cloud Function URL
functions/      countBooks Cloud Function
server.js       Week 9 Express test server (npm start)
.github/workflows/deploy.yml   GitHub Pages CI/CD
```

## 1. Run locally

```sh
npm install        # installs everything, including firebase, vue-router and axios
npm run dev        # open the http://localhost:5173 link it prints
```

The Firebase, weather and book-count pages show a yellow notice until you add
your keys (steps 3–5).

## 2. Put the project on GitHub

**VS Code:** Source Control (Ctrl+Shift+G) → **Publish to GitHub** → choose a
**public** repository → keep all files ticked.

**Or the terminal** (create an empty repo on GitHub first, without a README):

```sh
git init
git add .
git commit -m "NoMash Library weeks 2-12"
git branch -M main
git remote add origin https://github.com/<username>/<repository-name>.git
git push -u origin main
```

## 3. Firebase project, Authentication and Firestore

1. <https://console.firebase.google.com> → **Create a project** → name it
   (e.g. FIT5032IAD) → turn off Google Analytics → **Create project**.
2. Project Overview → **Web (`</>`)** icon → nickname → **Register app**.
   Keep the `firebaseConfig` values on screen.
3. Build → **Authentication** → Get started → **Email/Password** → Enable → Save.
4. Build → **Firestore Database** → Create database → Standard edition →
   location **australia-southeast2 (Melbourne)** → **Start in test mode**.
5. Copy `.env.example` to `.env.local` and paste the config values:

   ```sh
   cp .env.example .env.local            # macOS/Linux
   Copy-Item .env.example .env.local     # Windows PowerShell
   ```

6. Restart `npm run dev`, then try Firebase Register → Firebase Login → Add Book.

`.env.local` is ignored by Git, so your keys are not pushed to GitHub.

## 4. OpenWeather API key

1. <https://openweathermap.org/price> → sign up for the free plan (student email).
2. <https://home.openweathermap.org/api_keys> → copy your key.
3. Put it in `.env.local` as `VITE_OPENWEATHER_API_KEY`, then restart `npm run dev`.
   New keys can take up to 2 hours to start working.

## 5. Cloud Function (countBooks)

Cloud Functions need the **Blaze** plan: Firebase console → Functions →
**Upgrade project** → link a billing account (free trial credit) and set a budget.

```sh
npm install -g firebase-tools
firebase login
firebase use --add                  # pick your project, alias: default
cd functions
npm install
cd ..
firebase deploy --only functions,firestore
```

Copy the `countBooks` URL from the deploy output (or Firebase console → Functions)
into `.env.local` as `VITE_COUNT_BOOKS_URL`, then restart `npm run dev`.

The deploy also publishes `firestore.rules` (test mode until 31 Dec 2026).

> Windows "running scripts is disabled": run
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` in PowerShell, or use a
> Command Prompt terminal in VS Code.

## 6. Hosting on Cloudflare Pages (Week 11)

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create application** →
   **Pages** → **Connect to Git** → authorise GitHub → choose this repository.
2. Build settings: Framework preset **Vue**, build command `npm run build`,
   output directory `dist`.
3. **Environment variables:** add every `VITE_...` line from `.env.local`
   (name and value).
4. **Save and Deploy**. The site appears at `https://<project>.pages.dev`.
5. Settings → Builds → Branch control → set preview branches to **None**, so
   Cloudflare does not try to build the `gh-pages` branch.

Changed a variable later? Update it under Settings → Variables and Secrets, then
retry the latest deployment, because Vite bakes the values in at build time. This
is the usual reason `/WeatherCheck` works locally but not when deployed.

## 7. CI/CD with GitHub Actions → GitHub Pages (Week 12)

`.github/workflows/deploy.yml` builds the app on every push to `main` and
publishes `dist` to the `gh-pages` branch.

1. GitHub repo → Settings → Secrets and variables → **Actions** →
   **New repository secret**: name `ENV_LOCAL`, value = the whole content of
   your `.env.local`.
2. Push a commit (or Actions → Deploy to GitHub Pages → **Run workflow**) and wait
   for the green tick.
3. Settings → **Pages** → Source **Deploy from a branch** → branch `gh-pages`,
   folder `/ (root)` → Save.
4. The site appears at `https://<username>.github.io/<repository-name>/`.

The workflow sets the base path from the repository name and adds a `404.html`
copy of `index.html`, so links and page refreshes work under the subfolder.

If the Deploy step fails with a 403: Settings → Actions → General → Workflow
permissions → **Read and write permissions** → Save, then re-run.

## After deploying

Firebase console → Authentication → Settings → **Authorized domains** → add
`<project>.pages.dev` and `<username>.github.io`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm start` | Week 9 Express test server on port 3000 |
| `npm run lint` | ESLint |
