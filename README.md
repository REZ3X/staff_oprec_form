# TASIS Staff Recruitment Form

This is a recruitment form for TASIS (Tata Tertib Siswa) staff period 2025/2026 with Google Sheets integration.

## Features

- Clean and simple form design with TASIS branding
- Dynamic position selection (Ketua, Sekretaris, Bendahara) with automatic filtering
- Instagram follow verification
- Direct submission to Google Sheets
- Success page with contact persons
- Mobile responsive design

## Google Sheets Integration Setup

To connect this form to Google Sheets, follow these steps:

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "TASIS Staff Recruitment 2025/2026"
4. Set up the header row with these columns:
   - Timestamp
   - Nama
   - No HP
   - Kelas Jurusan
   - Kenapa ingin jadi staf TASIS
   - Pilihan 1
   - Alasan Pilihan 1
   - Pilihan 2
   - Alasan Pilihan 2
   - Pilihan 3
   - Alasan Pilihan 3
   - Apa yang kamu tahu tentang TASIS
   - Sudah follow IG TASIS

### 2. Create Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any code in the script editor
3. Copy and paste the following code:

```javascript
// Google Apps Script - Deploy as Web App
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
    const sheet = ss.getSheetByName('Responses') || ss.insertSheet('Responses');
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nama Lengkap',
        'No. HP',
        'Kelas & Jurusan',
        'Alasan Bergabung',
        'Pilihan 1',
        'Alasan Pilihan 1',
        'Pilihan 2',
        'Alasan Pilihan 2',
        'Pilihan 3',
        'Alasan Pilihan 3',
        'Pilihan 4',
        'Alasan Pilihan 4',
        'Pengetahuan TASIS',
        'Follow IG',
        'Join WA'
      ]);
      
      const headerRange = sheet.getRange(1, 1, 1, 16);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#ebae3b');
      headerRange.setFontColor('#0d1216');
    }
    
    const lastRow = sheet.getLastRow();
    const phoneColumn = sheet.getRange(1, 3, sheet.getMaxRows(), 1);
    phoneColumn.setNumberFormat('@STRING@');
    
    sheet.appendRow([
      data.timestamp || new Date(),
      data.nama || '',
      "'" + (data.noHP || ''),
      data.kelasJurusan || '',
      data.alasanBergabung || '',
      data.pilihan1 || '',
      data.alasanPilihan1 || '',
      data.pilihan2 || '',
      data.alasanPilihan2 || '',
      data.pilihan3 || '',
      data.alasanPilihan3 || '',
      data.pilihan4 || '',
      data.alasanPilihan4 || '',
      data.pengetahuanTasis || '',
      data.followIG || '',
      data.joinWA || ''
    ]);
    
    sheet.autoResizeColumns(1, 16);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Click **Deploy** > **New deployment**
6. Click the gear icon ⚙️ next to "Select type"
7. Select **Web app**
8. Configure:
   - Description: "TASIS Form API"
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy**
10. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root of your project:

```env
GOOGLE_SCRIPT_URL=your_web_app_url_here
```

2. Replace `your_web_app_url_here` with the URL you copied from Apps Script

### 4. Important Notes

- The Google Apps Script Web App is **FREE** and has generous quotas
- Each form submission creates a new row in your spreadsheet
- Data is appended in real-time
- The script runs with your permissions, so only you need Google account access
- If users submit multiple times, the latest submission will be recorded (as per your requirement)

## Additional Customization

### Contact Persons

Update the WhatsApp numbers in `src/components/RecruitmentForm.js`:

```javascript
<a href="https://wa.me/6281234567890" ...>
  📱 Contact Person 1: +62 812-3456-7890
</a>
<a href="https://wa.me/6281234567891" ...>
  📱 Contact Person 2: +62 812-3456-7891
</a>
```

### Instagram Link

Update the Instagram username in `src/components/RecruitmentForm.js`:

```javascript
<a href="https://instagram.com/tasis" ...>
  📷 Kunjungi Instagram TASIS →
</a>
```

### TASIS Logo

Replace `public/tasis-logo.png` with your actual TASIS logo image.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the form.

## Color Palette

- Primary Gold: `#ebae3b`
- Dark Brown: `#584928`
- Light Background: `#f2f3ff`
- Dark Text: `#0d1216`
- Medium Brown: `#3d321c`

## Technology Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Google Apps Script (for backend)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
