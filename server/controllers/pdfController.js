const puppeteer = require("puppeteer");

const generatePDF = async (req, res) => {
  let browser;
  try {
    const { html, fileName } = req.body;

    if (!html) {
      return res.status(400).json({ error: "HTML content is required" });
    }

    console.log("Starting PDF generation...");
    console.log("HTML length:", html.length);

    // Launch puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({ width: 794, height: 1123 }); // A4 at 96 DPI

    // Set content
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    console.log("Content loaded, generating PDF...");

    // Generate PDF with A4 size
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    console.log("PDF generated, size:", pdfBuffer.length);

    await browser.close();
    browser = null;

    // Send PDF
    res.contentType("application/pdf");
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (browser) {
      await browser.close();
    }
    res.status(500).json({
      error: "Failed to generate PDF",
      message: error.message,
    });
  }
};

module.exports = { generatePDF };
