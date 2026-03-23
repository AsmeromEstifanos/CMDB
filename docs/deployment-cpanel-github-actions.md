# GitHub Actions cPanel Deployment

The workflow at `.github/workflows/deploy-cpanel.yml` installs dependencies, runs `npm run build`, and deploys the `build/` directory to cPanel whenever `main` is updated.

## Required repository secrets

- `CPANEL_SERVER`: FTP hostname, for example `ftp.sol-ventures.com`
- `CPANEL_USERNAME`: FTP username from cPanel
- `CPANEL_PASSWORD`: FTP password from cPanel
- `CPANEL_PORT`: Usually `21`
- `CPANEL_SERVER_DIR`: Remote target directory ending with `/`

## Important notes for this app

- This project is deployed under `/cmdb/`, not at the site root.
- The workflow builds with `PUBLIC_URL=/cmdb`, so generated asset URLs resolve to `/cmdb/static/...`.
- `public/.htaccess` is copied into the production build so Apache or LiteSpeed on cPanel rewrites `/cmdb/*` requests back to `/cmdb/index.html`.
- The workflow uses `CI=false` for the build step because the current codebase has lint warnings, and Create React App would otherwise fail the GitHub Actions build.

## Choosing `CPANEL_SERVER_DIR`

- If your FTP account is restricted directly to the `public_html/cmdb` folder, use `/`.
- If your FTP account logs into your home directory, use the full target path, usually `/public_html/cmdb/`.
- Do not deploy this app to `/public_html/` unless you also change the routing and public URL strategy.

## If your host requires FTPS

Change this line in `.github/workflows/deploy-cpanel.yml`:

```yaml
protocol: ftp
```

to:

```yaml
protocol: ftps
```
