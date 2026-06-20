# Frugality Scanner

Branded diagnostic funnel for Mindful Tech's Operational Intelligence Assessment.

## Local Development

```bash
npm run dev
```

Create `.env.local` from `.env.example`. The MVP stores leads through Supabase REST when Supabase variables are present. If n8n is unavailable, the API still stores the lead and returns a generated fallback report.

## Routes

- `/` landing page
- `/assessment` assessment flow
- `/results` partial results and contact unlock
- `/thank-you` audit booking CTA
- `/admin` password-protected lead dashboard
- `/admin/[id]` lead detail
- `/api/submit-assessment` lead storage and webhook handoff
- `/api/n8n-webhook-test` webhook smoke test
