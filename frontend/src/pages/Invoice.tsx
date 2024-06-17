import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import {
  useGetAllInvoiceData,
  useProductGeneratePdf,
} from "../hooks/productHooks";
import { InvoiceEntry } from "../types";
import LoadingButton from "../components/LoadingButton";

const Invoice = () => {
  const { data: invoiceData, isLoading } = useGetAllInvoiceData();
  const { mutateAsync: generatePdf } = useProductGeneratePdf();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentGeneratingPDFId, setCurrentGeneratingPDFId] = useState<
    string | null
  >(null);
  console.log(invoiceData);

  if (isLoading) return <LoadingScreen isLoading={isLoading} />;

  const generatPdfHandler = async (id: string) => {
    try {
      setLoading(true);
      const response = await generatePdf(id);

      const blob = new Blob([response], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";

      link.click();

      URL.revokeObjectURL(url);
      setCurrentGeneratingPDFId(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoiceData &&
          invoiceData?.data.map((invoiceEntry: InvoiceEntry, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Invoice ID: {invoiceEntry.invoice._id}
              </h2>
              <p className="mb-2">
                <strong>Total:</strong> ₹{invoiceEntry.invoice.total}
              </p>
              <p className="mb-2">
                <strong>Created At:</strong>{" "}
                {new Date(invoiceEntry.invoice.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>Updated At:</strong>{" "}
                {new Date(invoiceEntry.invoice.updatedAt).toLocaleDateString()}
              </p>
              <div>
                <h3 className="text-lg font-medium mb-2">Products:</h3>
                {invoiceEntry.product.map((product, productIndex: number) => (
                  <div
                    key={productIndex}
                    className="border-t border-gray-200 pt-2 mt-2"
                  >
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.qty}
                    </p>
                    <p>
                      <strong>Rate:</strong> ₹{product.rate}
                    </p>
                  </div>
                ))}
              </div>
              <LoadingButton
                className="mt-4 w-full bg-blue-500 py-2 px-4 border rounded text-white font-bold "
                onClick={() => {
                  setCurrentGeneratingPDFId(invoiceEntry.invoice._id);
                  generatPdfHandler(invoiceEntry.invoice._id);
                }}
                isLoading={
                  loading && currentGeneratingPDFId === invoiceEntry.invoice._id
                }
              >
                Generate PDF
              </LoadingButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Invoice;
