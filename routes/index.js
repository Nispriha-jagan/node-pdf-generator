const express = require('express');

const generatePDF = require('../pdfGenerator'); 

const router = express.Router();

router.post('/invoice', async (req, res) => {
  const invoiceData = req.body;

  try {
    const pdfBuffer = await generatePDF(invoiceData); // define this function next
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send('Error generating PDF');
  }
});

module.exports = router;