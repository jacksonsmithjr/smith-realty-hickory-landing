# Smith Realty Group - Hickory Landing Page

A high-converting real estate landing page built with Next.js and Tailwind CSS, designed to capture relocation buyer leads from Google Ads.

## Features

- **Hero Section** with compelling headline and CTA
- **Lead Capture Form** with validation and GHL webhook integration
- **Why Relocate Section** highlighting Hickory, NC benefits
- **Social Proof** with testimonials
- **New Construction Spotlight**
- **Mobile-Optimized** with sticky CTA bar
- **Fully Responsive** design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your GHL webhook URL to `.env.local`:
```
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://your-ghl-webhook-url.com/webhook
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Make sure you're logged in:
```bash
vercel login
```

2. Deploy to production:
```bash
vercel --prod
```

3. Add your environment variable in Vercel dashboard:
   - Go to your project settings → Environment Variables
   - Add `NEXT_PUBLIC_GHL_WEBHOOK_URL` with your webhook URL
   - Redeploy after adding the variable

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings
6. Add environment variable `NEXT_PUBLIC_GHL_WEBHOOK_URL` in project settings
7. Click "Deploy"

### Environment Variables

Make sure to add `NEXT_PUBLIC_GHL_WEBHOOK_URL` in your Vercel project settings:
- Project Settings → Environment Variables
- Add the variable for Production, Preview, and Development environments

## Customization

- Update contact information in the footer
- Replace placeholder phone number in mobile CTA
- Update service areas as needed
- Customize colors in `tailwind.config.ts`
- Replace Unsplash images with your own

## Form Integration

The form submits to `/api/lead` which forwards data to your GHL webhook. The payload includes:
- firstName
- lastName
- email
- phone
- moveTimeline
- budgetRange
- source (defaults to "Google Ads - Hickory Relocation")
