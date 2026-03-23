# GitHub Actions cPanel Deployment

The workflow at `.github/workflows/deploy-cpanel.yml` installs dependencies, runs `npm run build`, and deploys the `build/` directory to cPanel whenever `main` is updated.

## Required repository secrets

### cPanel deploy

- `CPANEL_SERVER`: FTP/FTPS hostname, for example `s4377.lon1.stableserver.net`
- `CPANEL_USERNAME`: FTP username from cPanel
- `CPANEL_PASSWORD`: FTP password from cPanel
- `CPANEL_PORT`: Usually `21`
- `CPANEL_SERVER_DIR`: Remote target directory ending with `/`

### React build-time env values

These come from your local `.env` file and are injected during the GitHub Actions build:

- `REACT_APP_AZURE_CLIENT_ID`
- `REACT_APP_AZURE_AUTHORITY`
- `REACT_APP_SHAREPOINT_SITE_URL`
- `REACT_APP_ASSET_DRIVE_ID`
- `REACT_APP_REDIRECT_URI`

## Important notes for this app

- This project is deployed under `/cmdb/`, not at the site root.
- The workflow builds with `PUBLIC_URL=/cmdb`, so generated asset URLs resolve to `/cmdb/static/...`.
- `public/.htaccess` is copied into the production build so Apache or LiteSpeed on cPanel rewrites `/cmdb/*` requests back to `/cmdb/index.html`.
- The workflow uses `CI=false` for the build step because the current codebase has lint warnings, and Create React App would otherwise fail the GitHub Actions build.
- This project uses `react-scripts`, so only `REACT_APP_*` values matter for the deployed build. The `VITE_*` entries in your local `.env` are ignored by the current workflow.

## Choosing `CPANEL_SERVER_DIR`

- If your FTP account is restricted directly to the `public_html/cmdb` folder, use `/`.
- If your FTP account logs into your home directory, use the full target path, usually `/public_html/cmdb/`.
- Do not deploy this app to `/public_html/` unless you also change the routing and public URL strategy.

## If your host requires FTPS

The workflow is currently configured for explicit FTPS on port `21`.

```yaml
protocol: ftps
```
