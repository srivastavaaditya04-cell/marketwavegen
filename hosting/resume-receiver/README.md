# Resume receiver (Hostinger hosting)

When someone applies on `/careers/...`, the website (on Vercel) sends their resume to this small script on your
Hostinger hosting. The script saves the file in the `files` folder under a random name and gives back its link.
The website puts that link in the **Careers** tab of the Google Sheet ("Resume link" column, last column).
Nothing is emailed.

What the script accepts: PDF, DOC, DOCX, up to 4 MB, and only requests that carry the shared secret.
The applicant's own file name is never used.

## One-time setup

1. **Pick the address for the files.** In hPanel go to **Domains > Subdomains** and create one, for example
   `files.marketwavegen.com` (the name is your choice). Hostinger creates its folder and DNS record and issues SSL.
   Check **Performance > CDN** and switch CDN **off** for this subdomain (CDN once broke marketwavegen.com).
2. **Upload the script.** In hPanel open **File Manager**, go into that subdomain's folder, create a folder named
   `resumes`, and upload these into it (keep the `files` folder and its `.htaccess`):
   - `upload.php`
   - `.htaccess`
   - `config.sample.php`
   - `files/.htaccess`
3. **Create the settings file.** Rename `config.sample.php` to `config.php` and edit it:
   - `secret`: a long random string. Make one in Terminal with `openssl rand -hex 32` and keep a copy.
   - `base_url`: the public address of the files folder, for example `https://files.marketwavegen.com/resumes/files`
4. **Tell the website.** In Vercel go to the marketwavegen project > **Settings > Environment Variables** and add
   (for Production):
   - `RESUME_UPLOAD_URL` = `https://files.marketwavegen.com/resumes/upload.php` (use your own subdomain)
   - `RESUME_UPLOAD_SECRET` = the same secret as in `config.php`
   Then redeploy (Deployments > the latest one > Redeploy).
5. **Optional but recommended: password-protect the folder** so only your team can open resume links. In hPanel use
   **Advanced > Password Protect Directories** on the `files` folder. Anyone clicking a link in the Sheet then has to
   log in. Without it, a link works for anyone who has it (the names are long and random, and the folder cannot be browsed).

## Checking it works

- Open `https://files.marketwavegen.com/resumes/upload.php` in a browser: it should answer `{"error":"POST only"}`.
- Open `https://files.marketwavegen.com/resumes/files/` in a browser: it should be refused (403), not list files.
- Submit one real application on the careers page and check the Careers tab of the Sheet has a working "Open resume" link.

## Notes

- Resumes are personal data. The careers form's privacy notice says they are accessible only to people involved in
  selection, so step 5 is worth doing, and the folder should be cleaned up when applications are closed.
- If the script is not set up, the application form shows "Your resume could not be saved" and nothing is written to the Sheet.
- `config.php` and everything inside `files/` (except its `.htaccess`) are ignored by git on purpose.
