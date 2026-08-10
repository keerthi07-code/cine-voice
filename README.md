# CineVoice

A voice-driven movie chatbot — recommends films, tells you where to watch,
explains cinematic universes, and talks through how movies were shot.

It's two pieces:
- `index.html` — the voice UI, runs entirely in the browser
- `api/chat.js` — a tiny backend function that holds your API key safely
  and talks to Qwen (via Alibaba Cloud DashScope) on the frontend's behalf.
  The browser never sees your key.

## Get an API key
1. Go to https://bailian.console.aliyun.com (or https://dashscope-intl.console.aliyun.com
   for the international endpoint) and create a DashScope API key.
2. Keep it secret — don't paste it into chat, code you commit, or the frontend.
3. If you already had a DashScope key exposed anywhere before, regenerate it —
   don't reuse an old one that's been shared publicly.

## Deploy (free, ~5 minutes, no command line needed)

1. **Put this folder in a GitHub repo.**
   - Create a new repo on github.com, upload this whole `cinevoice-app` folder to it
     (drag and drop works, or use GitHub Desktop).
2. **Import it into Vercel.**
   - Go to https://vercel.com, sign up/log in (GitHub login is easiest), click
     "Add New Project", and select the repo you just created.
3. **Add your API key.**
   - In the import screen (or Project Settings → Environment Variables afterward),
     add a variable named `DASHSCOPE_API_KEY` with your real key as the value.
4. **Deploy.**
   - Click Deploy. Vercel builds it and gives you a live URL like
     `https://cinevoice-yourname.vercel.app` — that's your real, working, shareable app.

Every time you push changes to the GitHub repo, Vercel redeploys automatically.

## Local testing (optional, needs Node + Vercel CLI)
```bash
npm i -g vercel
cp .env.example .env.local
# edit .env.local and paste your real key
vercel dev
```
Then open the local URL it prints.

## Notes
- The mic (speech-to-text) needs Chrome or Edge, and needs the page served over
  HTTPS — which Vercel gives you automatically. It will NOT work if you just
  double-click `index.html` locally, since browsers block mic access outside
  HTTPS/localhost.
- Text-to-speech (the bot talking back) works in most browsers regardless.
- "Where to watch" answers come from the model's general knowledge, not a live
  database, so it's prompted to tell you to double-check current availability.
