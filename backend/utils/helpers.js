function generateInvoiceHTML(data) {
  let productRows = "";
  data.forEach((product) => {
    productRows += `
              <tr>
                  <td>${product.name}</td>
                  <td>${product.qty}</td>
                  <td>${product.rate}</td>
                  <td>${product.rate * product.qty}</td>
              </tr>
          `;
  });

  const calulcateTotal = data.reduce((acc, item) => {
    return acc + item.qty * item.rate;
  }, 0);

  const calculateTotalAfterGST = calulcateTotal + calulcateTotal * 0.18;

  return `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Invoice</title>
              <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
        }
  
        .container {
          max-width: 800px;
          margin: auto;
          margin-top: 48px;
        }
  
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 16px;
        }
  
        .subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          text-align: center;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 32px;
        }
  
        th,
        td {
          padding: 22px 16px;
          text-align: left;
        }
  
        th {
          font-weight: bold;
        }
  
        .heading_section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
  
        .heading_section div {
          display: flex;
          flex-direction: column;
        }
  
        .heading_section p {
          font-size: 1.5rem;
        }
        subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin-top: -20px;
        }
  
        th {
          border-bottom: rgba(0, 0, 0, 0.03) 2px solid;
        }
  
        .footer {
          border-top: rgba(0, 0, 0, 0.062) 2px solid;
          display: flex;
          justify-content: end;
          padding-right: 55px;
        }
  
        .footer-div {
          min-width: 280px;
        }
  
        .footer_heading {
          font-size: 1rem;
          font-weight: bold;
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
        }
        .grand-total {
          border: rgba(0, 0, 0, 0.17) 2px solid;
          border-left: none;
          border-right: none;
        }
        .color-price {
          color: #707bc6;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="heading_section">
          <h1 class="title">INVOICE GENERATOR</h1>
          <div>
            <p>levitation</p>
            <subtitle>infotech</subtitle>
          </div>
        </div>
  
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          ${productRows}
          </tbody>
        </table>
        <div class="footer">
          <div class="footer-div">
            <div class="wrapper">
              <p class="footer_heading">Total</p>
              <p>INR ${calulcateTotal}</p>
            </div>
            <div class="wrapper">
              <p class="footer_heading">GST</p>
              <p class="gst color-price">18%</p>
            </div>
            <div class="wrapper grand-total">
              <p class="footer_heading">Grand Total</p>
              <p class="color-price">₹ ${calculateTotalAfterGST}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
          </html>
      `;
}

module.exports = generateInvoiceHTML;
