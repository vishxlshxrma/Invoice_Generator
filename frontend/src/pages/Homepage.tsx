import { useState } from "react";
import { useSaveData } from "../hooks/productHooks";
import { Product } from "../types";
import toast from "react-hot-toast";
import LoadingButton from "../components/LoadingButton";

const Homepage = () => {
  const { mutateAsync: saveProductData } = useSaveData();
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState<Product[]>([
    { name: "product1", rate: 100, qty: 1 },
    { name: "product2", rate: 200, qty: 1 },
  ]);

  const handleChange = (key: string, index: number, value: string | number) => {
    const newProductData = productData.map((product, i) => {
      if (i === index) {
        return { ...product, [key]: value };
      }
      return product;
    });
    setProductData(newProductData);
  };

  const calculateTotal = () => {
    return productData.reduce(
      (total, product) => total + product.rate * product.qty,
      0
    );
  };

  const calculateGST = () => {
    return (calculateTotal() * 0.18).toFixed(2);
  };

  const calculateFinalAmount = () => {
    return (calculateTotal() + parseFloat(calculateGST())).toFixed(2);
  };

  const generatePdf = async () => {
    try {
      for (const product of productData) {
        const isValid = Object.values(product).every((item) => item);

        if (!isValid) {
          toast.error("Please fill all the fields");
          return;
        }
      }
      setLoading(true);
      const response = await saveProductData(productData);

      const blob = new Blob([response], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";

      link.click();

      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-10">
      <div className="w-full max-w-4xl">
        <h1 className="font-bold py-6 text-3xl text-center">
          Invoice Generator
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-8 py-3">
                  Product name
                </th>
                <th scope="col" className="px-4 md:px-9 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 md:px-8 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-4 md:px-8 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-4 md:px-6 py-4">
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border border-white focus:border focus:border-gray-800 rounded  appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      value={product.name}
                      placeholder="Product name"
                      onChange={(e) => {
                        handleChange("name", index, e.target.value);
                      }}
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <input
                      type="number"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border border-white focus:border focus:border-gray-800 rounded  appearance-none focus:outline-none focus:shadow-outline"
                      value={product.rate}
                      placeholder="Product Price"
                      onChange={(e) => {
                        handleChange("rate", index, e.target.value);
                      }}
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border border-white focus:border focus:border-gray-800 rounded  appearance-none focus:outline-none focus:shadow-outline"
                      type="number"
                      value={product.qty}
                      placeholder="Product Rate"
                      onChange={(e) => {
                        handleChange("qty", index, e.target.value);
                      }}
                    />
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <button
                      className="w-full px-3 py-1 text-xs font-medium leading-5 text-white uppercase transition-colors duration-150 bg-red-500 border border-transparent rounded-md active:bg-red-600 hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                      onClick={() => {
                        const newProductData = productData.filter(
                          (_, i) => i !== index
                        );
                        setProductData(newProductData);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button
            className="self-start px-3 py-2 text-xs font-medium leading-5 text-white uppercase transition-colors duration-150 bg-blue-500 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
            onClick={() => {
              setProductData([...productData, { name: "", rate: 0, qty: 0 }]);
            }}
          >
            + Add Row
          </button>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full md:w-auto min-w-[300px] md:min-w-[200px]">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">GST (18%):</span>
              <span>₹{calculateGST()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Final Amount:</span>
              <span>₹{calculateFinalAmount()}</span>
            </div>
          </div>
        </div>
      </div>
      <LoadingButton
        isLoading={loading}
        className="mt-10 bg-blue-500 py-2 px-4 border rounded text-white font-bold w-full md:w-auto"
        onClick={generatePdf}
      >
        Generate PDF
      </LoadingButton>
    </div>
  );
};

export default Homepage;
