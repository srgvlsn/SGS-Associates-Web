/**
 * ==============================================================================
 * SGS ASSOCIATES — ENQUIRY & LEAD MANAGEMENT BACKEND (GOOGLE APPS SCRIPT)
 * ==============================================================================
 * 
 * This script runs directly inside your Google Sheet (Extensions > Apps Script).
 * It automatically:
 * 1. Appends every website enquiry / career application as a new row in Google Sheets.
 * 2. Formats and sends an instant HTML notification email to tax.sgs@gmail.com.
 * 3. Returns a JSON response with CORS headers back to your website.
 *
 * HOW TO DEPLOY:
 * 1. In Google Drive, create a new Google Sheet named "SGS Associates Client Enquiries".
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any code in the editor, paste this entire file, and click Save (disk icon).
 * 4. Click "Deploy" (top right) > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set:
 *    - Description: "SGS Website Leads v1.0"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"  <-- CRITICAL for public form submissions
 * 7. Click "Deploy" and grant permissions if prompted.
 * 8. Copy the "Web app URL" and paste it into js/data.js (inquiryEndpoint).
 * ==============================================================================
 */

// Configuration
const NOTIFICATION_EMAIL = "tax.sgs@gmail.com";
const FIRM_NAME = "SGS Associates - Accountants & Tax Practitioners";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10s for concurrency control

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getActiveSheet();

    // Parse the payload (supports both JSON and standard FormData / x-www-form-urlencoded)
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    // Ensure header row exists
    const headers = [
      "Timestamp",
      "Type",
      "Client Name",
      "Phone Number",
      "Email Address",
      "Service / Role",
      "Branch",
      "Message / Details",
      "Status",
      "Staff Assigned",
      "Follow-up Notes"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Format current timestamp in IST (Indian Standard Time)
    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    const rowData = [
      timestamp,
      data.type || "Consultation Inquiry",
      data.name || "N/A",
      data.phone || "N/A",
      data.email || "N/A",
      data.service || data.qualification || "General Compliance",
      data.branch || "North Paravur (Head Office)",
      data.message || data.notes || "No additional message provided.",
      "New",          // Initial lead status
      "Unassigned",   // Assigned staff member
      ""              // Follow-up notes
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Send styled HTML email alert to the firm
    sendNotificationEmail(data, timestamp);

    // Return success response to the website
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Enquiry successfully logged and notification dispatched."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Dispatches an instant HTML email alert to tax.sgs@gmail.com
 */
function sendNotificationEmail(data, timestamp) {
  try {
    const isCareer = (data.type === "Career Application");
    const subject = isCareer
      ? `💼 [New Career Application] ${data.name || "Applicant"} — ${data.branch || "All Branches"}`
      : `📋 [New Website Enquiry] ${data.name || "Client"} — ${data.service || "Consultation"}`;

    const clientPhone = data.phone ? data.phone.toString().replace(/[^0-9]/g, '') : '';
    const whatsappLink = clientPhone ? `https://wa.me/91${clientPhone}` : '#';

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background: #0F172A; padding: 24px; color: #ffffff; text-align: left; border-bottom: 3px solid #00D06C;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; color: #00D06C;">${FIRM_NAME}</h2>
          <p style="margin: 0; font-size: 14px; color: #94A3B8;">${isCareer ? 'New Trainee / Career Application Received' : 'New Website Consultation Request'}</p>
        </div>
        
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; width: 140px; font-weight: 600;">Date & Time</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0F172A; font-weight: 600;">${timestamp} IST</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600;">Applicant / Client</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0F172A; font-weight: bold; font-size: 16px;">${data.name || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600;">Phone Number</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0F172A;">
                <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none; font-weight: 600;">📞 ${data.phone || 'N/A'}</a>
                ${clientPhone ? `&nbsp;|&nbsp;<a href="${whatsappLink}" style="color: #059669; text-decoration: none; font-weight: 600;" target="_blank">💬 Open WhatsApp Chat</a>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600;">Email Address</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0F172A;">
                ${data.email ? `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600;">${isCareer ? 'Qualification' : 'Service Required'}</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #7940EC; font-weight: 700;">${data.service || data.qualification || 'General Compliance'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600;">Preferred Branch</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0F172A; font-weight: 600;">📍 ${data.branch || 'North Paravur'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748B; font-weight: 600; vertical-align: top;">${isCareer ? 'Notes' : 'Requirement Details'}</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155; background: #F8FAFC; border-radius: 6px; white-space: pre-wrap;">${data.message || data.notes || 'None'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 14px; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #065F46;">
              💡 <strong>Lead auto-logged:</strong> This entry has been saved in your Google Sheet CRM. You can update its status and assign staff there.
            </p>
          </div>
        </div>

        <div style="background: #F8FAFC; padding: 16px 24px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
          Sent automatically from SGS Associates Website • North Paravur, Kerala
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: data.email || NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Email notification error: " + err.toString());
  }
}

// Optional GET method for quick health checking
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "active",
      message: "SGS Associates Google Apps Script Backend is online and accepting POST requests."
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
