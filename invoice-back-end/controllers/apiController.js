const Invoice = require('../models/Invoice');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');


const createInvoice = (req, res) => {
  const invoice = req.body;
  Invoice.create(invoice)
    .then(() => {
      res.send('Invoice Generated');
    })
    .catch((error) => {
      console.error('Error creating invoice:', error);
      res.status(500).send('Error creating invoice');
    });
};

const getInvoices = async (req, res) => {
  console.log('Invoices get')
  const invoices = await Invoice.findAll()
  console.log(invoices)
  res.send(invoices)

}

const generateInvoice = async (req, res) => {
  try {
    const id = req.query.id
    const invoice = await Invoice.findOne({
      where: {
        id: id
      }
    });
    console.log("invoice id ", id)
    if (invoice) {
      console.log(invoice);
      invoiceData = invoice
    } else {
      console.log("Invoice not found");
    }
    const htmlTemplate = `
          <html>
            <head>
              <style>
                /* Add your CSS styles here */
              </style>
            </head>
            <body>
          <h1>Invoice ID :${invoice.id}</h1>
          <h1>Invoice Number :${invoice.invoiceNumber}</h1>
          <h1>CUSTOMER NAME :${invoice.customerName}</h1>
          <h1>invoice address :${invoice.address}</h1>
          <h1>invoice Description :${invoice.invoiceDescription}</h1>
          <h1>invoice Amount :${invoice.invoiceAmount}</h1>
          <h1>invoice Date: ${invoice.invoiceDate}</h1>
        </body>
          </html>
        `;

    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(htmlTemplate);

    // Generate the PDF from the page
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser instance
    await browser.close();

    // Set the response headers for downloading the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="generated-pdf.pdf"');

    // Send the PDF buffer as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('An error occurred while generating the PDF.');
  }
}

const emailInvoice = async (req, res) => {
  try {
    const id = req.query.id;
    const invoice = await Invoice.findOne({
      where: {
        id: id
      }
    });

    if (!invoice) {
      console.log("Invoice not found");
      return res.status(404).send('Invoice not found');
    }

    const htmlTemplate = `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
          </style>
        </head>
        <body>
          <h1>${invoice.id}</h1>
          <h1>${invoice.invoiceNumber}</h1>
          <h1>${invoice.customerName}</h1>
          <h1>${invoice.address}</h1>
          <h1>${invoice.invoiceDescription}</h1>
          <h1>${invoice.invoiceAmount}</h1>
          <h1>${invoice.Date}</h1>
        </body>
      </html>
    `;

    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(htmlTemplate);

    // Generate the PDF from the page
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser instance
    await browser.close();

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6e9e0ace291d6f",
        pass: "7ac19eab10ba41"
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'shahidsalafi@outlook.in',
      to: 'shahidsalafi4@gmail.com',
      subject: 'Invoice',
      text: 'Please find the attached invoice.',
      attachments: [
        {
          filename: 'generated-pdf.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  }
  catch (error) {
    console.error('Failed to generate PDF and send email:', error);
    res.status(500).send('Failed to generate PDF and send email');
  }
}

module.exports = {
  createInvoice,
  getInvoices,
  generateInvoice,
  emailInvoice
};
