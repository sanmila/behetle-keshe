# Deploy HAPPY MAN To A VPS

This app is configured for a standard Linux VPS deployment with:

- Next.js standalone output with copied static/public assets
- Prisma + SQLite
- PM2 process management
- Nginx reverse proxy

## Requirements

- Ubuntu or Debian VPS
- Node.js 20+
- npm 10+
- Nginx
- PM2

## 1. Prepare Environment Variables

Create a `.env` file on the server:

```env
NODE_ENV=production
DATABASE_URL="file:/var/www/happy-man/shared/production.db"
JWT_SECRET="replace-this-with-a-long-random-secret"
PORT=3000
HOSTNAME=0.0.0.0
```

Notes:

- `JWT_SECRET` is required in production.
- Keep the SQLite database outside the release folder so deploys do not wipe it.

## 2. Upload The App

Upload the `neura-fashion` project to your VPS, then install dependencies:

```bash
cd /var/www/happy-man/current
npm install
```

## 3. Run The Production Build

```bash
cd /var/www/happy-man/current
npm run build
```

The build script also prepares `.next/standalone` with the required `public/` and `.next/static/` files for production runtime.

## 4. Create And Seed The Database

```bash
mkdir -p /var/www/happy-man/shared
cd /var/www/happy-man/current
npm run db:migrate
npm run db:seed
```

Default seeded admin login:

- Email: `admin@happy-man.ru`
- Password: `admin123`

Change that password immediately after first login.

## 5. Start The App With PM2

```bash
cd /var/www/happy-man/current
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Manual start alternative:

```bash
HOSTNAME=0.0.0.0 PORT=3000 npm run start:standalone
```

## 6. Configure Nginx

Example server block:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Recommended Release Layout

```text
/var/www/happy-man/
  current/
  releases/
  shared/
    production.db
    .env
```

Symlink `.env` from `shared` into each release before starting PM2.

## 8. Quick Smoke Test

After deployment:

```bash
curl -I http://127.0.0.1:3000
pm2 logs happy-man --lines 100
```

## Notes

- The app uses SSR, so it must run as a Node process on the VPS.
- Production builds use `.next/standalone/server.js`.
- Orders are created from the cookie-backed cart and persisted to SQLite.
