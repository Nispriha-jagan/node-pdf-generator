function addItem() {
  const container = document.getElementById('items');
  const div = document.createElement('div');
  div.className = 'item-row';
  div.innerHTML = `
    <input type="text" placeholder="Description" name="item_description" required>
    <input type="text" placeholder="Details" name="item_details">
    <input type="number" placeholder="Rate" name="item_rate" step="0.01" required>
    <input type="number" placeholder="Quantity" name="item_quantity" required>
  `;
  container.appendChild(div);
}

document.getElementById('invoiceForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const items = [];
  const descriptions = form.querySelectorAll('[name="item_description"]');
  const details = form.querySelectorAll('[name="item_details"]');
  const rates = form.querySelectorAll('[name="item_rate"]');
  const quantities = form.querySelectorAll('[name="item_quantity"]');

  for (let i = 0; i < descriptions.length; i++) {
    items.push({
      description: descriptions[i].value,
      details: details[i].value,
      rate: parseFloat(rates[i].value),
      quantity: parseInt(quantities[i].value)
    });
  }

  const jsonData = {
    from: {
      name: formData.get("from_name"),
      address: formData.get("from_address"),
      city: formData.get("from_city"),
      zipcode: formData.get("from_zipcode"),
      country: formData.get("from_country"),
      phone: formData.get("from_phone")
    },
    to: {
      name: formData.get("to_name"),
      address: formData.get("to_address"),
      city: formData.get("to_city"),
      zipcode: formData.get("to_zipcode"),
      country: formData.get("to_country"),
      phone: formData.get("to_phone")
    },
    invoice: {
      number: formData.get("invoice_number"),
      dateIssued: formData.get("dateIssued"),
      dueDate: formData.get("dueDate")
    },
    items: items,
    discount: parseFloat(formData.get("discount")),
    tax: parseFloat(formData.get("tax")),
    depositRequested: parseFloat(formData.get("depositRequested")),
    notes: formData.get("notes"),
    terms: formData.get("terms")
  };

  const response = await fetch('http://localhost:8080/invoice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoice.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
});
