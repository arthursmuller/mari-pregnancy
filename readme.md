### 2\. Implementation Guide (README)

Add the following section to your `readme.md` (or replace the "Deploy to GitHub Pages" section) to document how to set this up and find the link.

**Markdown Content:**

## 🚀 Automated Deployment (GitHub Actions)

This project is configured to automatically build and deploy to **GitHub Pages** whenever you push changes to the `master` branch.

### Prerequisites

1.  **Repository Name & Base Path**:
    Ensure your `vite.config.mjs` has the correct `base` property matching your GitHub repository name.

    *File: `vite.config.mjs`*

    ```javascript
    export default defineConfig({
      base: '/your-repo-name/', // e.g., '/pregnancy-app/'
      plugins: [react()],
    })
    ```

2.  **Enable GitHub Pages**:
    You must configure the repository to accept deployments from GitHub Actions.

      * Go to your repository on GitHub.
      * Click **Settings** \> **Pages** (in the left sidebar).
      * Under **Build and deployment** \> **Source**, select **GitHub Actions**.

### How to Deploy

Simply push your code to the `master` branch:

```bash
git add .
git commit -m "New features"
git push origin master
```

The GitHub Action will automatically:

1.  Install dependencies.
2.  Build the project.
3.  Publish the `dist` folder to GitHub Pages.

### 🔗 Where to view the live page

Once the Action completes (usually 1-2 minutes):

1.  Go to your repository **Settings** \> **Pages**.
2.  You will see a banner at the top: **"Your site is live at..."**
3.  Click the link to view your app (e.g., `https://your-username.github.io/your-repo-name/`).

You can also monitor the build progress in the **Actions** tab of your repository.