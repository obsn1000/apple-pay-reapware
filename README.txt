REAPWARE APPLE PAY API — README
===============================

This project enables Apple Wallet Pass generation and Apple Pay integration.
Domain: reapwareapi.cc
Hosting Target: Vercel

---

1️⃣ SETUP LOCALLY
-----------------
1. Install dependencies:
   npm install

2. Run the server:
   node app.js

3. Access the test UI:
   http://localhost:3000/public/wallet-ui

---

2️⃣ FIXES APPLIED
-----------------
- Updated passkit-generator to version ^3.0.6 (latest working)
- Cleaned out MacOS files (.DS_Store, __MACOSX)

---

3️⃣ DEPLOY TO VERCEL
--------------------
1. Push the project to GitHub.
2. Go to https://vercel.com and create a new project.
3. Link your GitHub repo.
4. Set these Vercel DNS settings on Namecheap (Advanced DNS tab):

   A Record:
   Host: @
   Value: 76.76.21.21

   CNAME Record:
   Host: www
   Value: cname.vercel-dns.com

5. Add domain `reapwareapi.cc` in Vercel → Project → Settings → Domains

6. Wait for verification and SSL setup.

---

4️⃣ CUSTOMIZE IF NEEDED
-----------------------
- Wallet pass template is in /passModel
- Certs in /certs
- UI in /public/wallet-ui/index.html