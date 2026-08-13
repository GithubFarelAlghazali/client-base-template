## Project Setup & Deployment Workflow

### Phase 1: Repository Setup

1. Clone this repository into your `client-pages` folder (the directory containing all client repositories).
2. Delete the repository history by running: `rm -rf .git`
3. Navigate to the `kasislamat` repository (which contains the landing page).

### Phase 2: Template Configuration

4. Open the `/app/templates` directory.
5. Locate the specific template requested by the client.
6. Copy the `/sections` and `/assets` folders from the template.
7. Navigate back to your specific client folder and paste the copied folders.
8. Update `/helpers/data.ts` with the information provided by the client.
9. Replace the placeholder photos with the client's actual photos.
10. Update the audio files according to the client's music request.

### Phase 3: Database & Credentials Setup

11. Create the Guests List on **Google Sheets** by copying the `Template-Guests List`.
12. Share the spreadsheet by adding the **Google Sheets** client email (service account).
13. Generate the password and email credentials by running: `node ./scripts/pw-hash.mjs <password> <email>`
14. Create `GOOGLE_SHEETS_CLIENT_EMAIL` in `.env` and `.env.vercel`, and paste the value from `\Downloads\guest-book-db-505223-b23e9f587f3c.json` > `client_email`.
15. Create `GOOGLE_SHEETS_PRIVATE_KEY` in `.env` and `.env.vercel`, and paste the value from `\Downloads\guest-book-db-505223-b23e9f587f3c.json` > `private_key`.
16. Create `GOOGLE_SHEET_ID` in `.env` and `.env.vercel`, and paste the value from your **Google Sheets** ID (found in the URL between `/d/` and `/edit`).

### Phase 4: Development & Version Control

17. Install dependencies and start the development environment by running: `pnpm install`
18. Adjust the layout, customize the design, and fix any bugs.
19. Navigate back to the parent folder (the `client-pages` directory).
20. Stage, commit, and push your changes by running: `git add .` (followed by your commit and push commands).

### Phase 5: Review, Deployment, & Delivery

21. Send the invitation draft to the client for their review.
22. Deploy the project to **Vercel**.
23. Wait for payment confirmation from the client.
24. Update the **Vercel** domain with the designated subdomain from `kasislamat.my.id`.
25. Add the necessary DNS records on **hPanel**.
26. Hand over the final, live invitation link to the client.
