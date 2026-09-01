# Deploying this site

Recommended: deploy to Vercel (fast for Next.js).

Steps

1. Create a GitHub repository and push this project (root directory).

2. Go to https://vercel.com, sign in, and "Import Project" from GitHub.

3. Provide build settings if prompted:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: (leave default)

4. Set the following environment variables in Vercel (Project Settings > Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key

5. Deploy. Vercel will build and publish automatically on push.

Local verification

1. Create a local `.env.local` file with the two vars above.
2. Run:

```bash
npm install
npm run dev
```

Advanced: If you prefer GitHub Actions or Netlify, tell me and I can add a deployment workflow.
