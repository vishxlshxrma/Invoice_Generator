const expressAsyncHandler = require("express-async-handler");
const Invoice = require("../modals/invoiceModal");
const Product = require("../modals/productModal");
const puppeteer = require("puppeteer");
const generateInvoiceHTML = require("../utils/helpers");

const saveProduct = expressAsyncHandler(async (req, res) => {
  try {
    const productData = req.body;

    const invoice = new Invoice({
      total: 0,
      user: req.user._id,
    });

    const product = await Product.insertMany(
      productData.map((item) => ({ ...item, invoice: invoice._id }))
    );

    invoice.total = product.reduce((acc, item) => {
      return acc + item.qty * item.rate;
    }, 0);
    await invoice.save();

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const content = generateInvoiceHTML(product);

    await page.setContent(content);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    throw new Error(error.message || "Error in saving product");
  }
});

const getAllInvocies = expressAsyncHandler(async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id });
    const products = await Product.find({
      invoice: { $in: invoices.map((item) => item._id) },
    });

    const data = invoices.map((invoice) => {
      const product = products.filter(
        (item) => item.invoice.toString() === invoice._id.toString()
      );
      return { invoice, product };
    });

    res.status(200).json({ data: data.reverse() });
  } catch (error) {
    throw new Error(error.message || "Error in fetching invoices");
  }
});

const generateInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ invoice: req.params.id });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const content = generateInvoiceHTML(products);

    await page.setContent(content);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    throw new Error(error.message || "Error in generating invoice");
  }
});

module.exports = { saveProduct, getAllInvocies, generateInvoice };
