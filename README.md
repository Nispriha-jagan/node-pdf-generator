# PDF Invoice Generator API

A backend RESTful API built using **Node.js, Express.js, and PDFKit** for generating professional **invoice PDFs**.  
The project also includes a **frontend form (HTML, CSS, JS)** for creating invoices interactively and downloading them as PDFs.

---

## Features
- Generate **PDF invoices** dynamically.
- Input **company details, client details, invoice metadata, and multiple items**.
- Auto-calculates **subtotal, discount, tax, deposit, and grand total**.
- Supports **custom notes and terms** on invoices.
- Downloadable PDF with professional formatting.
- Simple and responsive **web-based frontend**.

---

## Technology Stack
- **Backend:** Node.js, Express.js, PDFKit  
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Other Tools:** Nodemon (for development), CORS  

---

## API Routes and Endpoints

### 1. `/invoice` – PDF Invoice Generation
| Method | Endpoint   | Description |
|--------|-----------|-------------|
| POST   | `/invoice` | Generate a new invoice PDF from JSON data |
