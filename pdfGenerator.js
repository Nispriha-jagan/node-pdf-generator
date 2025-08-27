const PDFDocument = require('pdfkit');

function generatePDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    // Centered Invoice Title
    doc.fontSize(20).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
    doc.moveDown(1.5);

    // Company Info (Top-Right)
    doc.fontSize(10).font('Helvetica');
    doc.text(data.from.name, 400)
      .text(data.from.address, 400)
      .text(`${data.from.city}, ${data.from.zipcode}`, 400)
      .text(data.from.country, 400)
      .text(data.from.phone, 400);

    // Billed To (Top-Left)
    doc.text('Billed To:', 50, 130)
      .text(data.to.name, 50)
      .text(data.to.address, 50)
      .text(`${data.to.city}, ${data.to.zipcode}`, 50)
      .text(data.to.country, 50)
      .text(data.to.phone, 50);

    // Invoice Metadata (Right)
    doc.text(`Date Issued: ${data.invoice.dateIssued}`, 400, 220)
      .text(`Invoice Number: ${data.invoice.number}`, 400)
      .text(`Due Date: ${data.invoice.dueDate}`, 400);

    doc.moveDown(2);

    // Table Header
    const tableTop = doc.y + 10;
    const itemX = 50;
    const rateX = 300;
    const qtyX = 370;
    const amountX = 450;

    doc.font('Helvetica-Bold');
    doc.text('Description', itemX, tableTop);
    doc.text('Rate', rateX, tableTop);
    doc.text('Qty', qtyX, tableTop);
    doc.text('Amount', amountX, tableTop);
    doc.moveTo(itemX, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // Table Rows
    let y = tableTop + 25;
    doc.font('Helvetica');
    let subtotal = 0;

    data.items.forEach(item => {
      const itemTotal = item.rate * item.quantity;
      subtotal += itemTotal;

      doc.text(item.description, itemX, y);
      doc.text(`$${item.rate.toFixed(2)}`, rateX, y);
      doc.text(item.quantity.toString(), qtyX, y);
      doc.text(`$${itemTotal.toFixed(2)}`, amountX, y);
      y += 15;

      // Item details (optional line)
      if (item.details) {
        doc.fontSize(9).fillColor('#555555');
        doc.text(item.details, itemX + 10, y);
        doc.fontSize(10).fillColor('black');
        y += 15;
      }
    });

    // Totals Section
    y += 10;
    const totalX = 400;
    doc.font('Helvetica-Bold');
    doc.text(`Subtotal:`, totalX, y);
    doc.text(`$${subtotal.toFixed(2)}`, amountX, y);
    y += 15;

    doc.text(`Discount:`, totalX, y);
    doc.text(`-$${data.discount.toFixed(2)}`, amountX, y);
    y += 15;

    doc.text(`Tax:`, totalX, y);
    doc.text(`$${data.tax.toFixed(2)}`, amountX, y);
    y += 15;

    doc.moveTo(totalX, y).lineTo(550, y).stroke();
    y += 5;

    const grandTotal = subtotal - data.discount + data.tax;
    doc.text(`Total:`, totalX, y);
    doc.text(`$${grandTotal.toFixed(2)}`, amountX, y);
    y += 20;

    doc.text(`Deposit\nDue:`, totalX, y);
    doc.text(`$${data.depositRequested.toFixed(2)}`, amountX, y);

    // Notes & Terms
    y += 40;
    doc.font('Helvetica-Bold').text('Notes:', 50, y);
    doc.font('Helvetica').text(data.notes, 50, y + 15);

    y += 50;
    doc.font('Helvetica-Bold').text('Terms:', 50, y);
    doc.font('Helvetica').text(data.terms, 50, y + 15);

    doc.end();
  });
}


module.exports = generatePDF;
