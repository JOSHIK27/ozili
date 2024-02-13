import { Button, Divider } from "@tremor/react";
import icon from "../../images/png_20230713_181315_0000.png";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// const downloadPdfDocument = (pdfRef) => {
//   const input = pdfRef.current;
//   html2canvas(input, { useCORS: true }).then((canvas) => {
//     const imageData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4", true);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imageWidth = canvas.width;
//     const imageHeight = canvas.height;
//     const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
//     const imgX = (pdfWidth - imageWidth * ratio) / 2;
//     const imgY = 5;
//     pdf.addImage(
//       imageData,
//       "PNG",
//       imgX,
//       imgY,
//       imageWidth * ratio,
//       imageHeight * ratio
//     );
//     pdf.save("invoice.pdf");
//   });
// };

export default function Invoice() {
  const pdfRef = useRef();
  return (
    <>
      {/* <div ref={pdfRef}>
        <div id="invoice" className="ml-32 mr-32 mt-20">
          <div>
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-600">
                  <strong>Village Prints</strong>
                </h1>
                <h1>
                  Kapu street, Ozili <br></br> Tirupati Dist <br></br> Andhra
                  Pradesh - 524402 <br></br> Phone no.: +91-8919056375
                </h1>
              </div>
              <img className="w-60 h-60" src={icon.src}></img>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <h1 className="text-2xl font-800 text-[#B80000]">
                Bill of Supply
              </h1>
            </div>
            <br></br>
            <div className="flex justify-between">
              <h1>
                <strong>Bill To:</strong>
              </h1>
              <h1>
                <strong>Invoice No : xxx</strong>
              </h1>
            </div>
            <div className="flex justify-between">
              <h1>
                <strong>Bhargav test</strong>
              </h1>
              <h1>
                <strong>Date : xxx</strong>
              </h1>
            </div>
            <div className="flex justify-between">
              <h1>
                <strong>Contact No : 9490950789</strong>
              </h1>
              <h1>
                <strong>Due Date: 16-02-2024</strong>
              </h1>
            </div>
            <br></br>
            <div className="bg-[#B80000] flex w-full h-8 justify-between">
              <div className="flex">
                <h1 className="text-white mr-16 ml-4 my-auto">#</h1>
                <h1 className="text-white my-auto">Item Name</h1>
              </div>
              <div className="flex">
                <h1 className="text-white mr-16 my-auto">Quantity</h1>
                <h1 className="text-white mr-16 my-auto">Price/Unit</h1>
                <h1 className="text-white mr-4 my-auto">Amount</h1>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <Divider></Divider>
          <div className="flex justify-between">
            <div>
              <div className="mb-8">
                <div className="mb-[4px]">INVOICE AMOUNT IN WORDS</div>
                <div className="bg-slate-200 w-[400px]">
                  Two Thousand Seven Hundred and Fifty Three Rupees and Ten
                  Paisa only
                </div>
              </div>
              <div className="mb-8">
                <div className="mb-[4px]">TERMS AND CONDITIONS</div>
                <div className="bg-slate-200 w-[400px]">
                  We accept returns on items that are flawed or damaged within 7
                  days of receipt of the item. Items must be in new, unworn,
                  unused condition.
                  <br></br> Please keep in mind that all products are
                  artisanmade and are subject to minute contortions in design,
                  slight difference in color or print and are not defect but
                  result of technique used, which could be found in all hand
                  printed products.
                </div>
              </div>
              <div>
                <div className="mb-[4px]">Pay To</div>
                <div className="w-[400px]">
                  Bank Name: ANDHRA BANK Bank Account No.: 091910100018608 Bank
                  IFSC code: ANDB0000919 Account Holder's Name: Manogna Reddy
                </div>
              </div>
            </div>
            <div className="w-[400px]">
              <div className="mb-32">
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Sub Total</h1>
                  <h1 className="my-auto mr-[6px]">£2000</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Discount</h1>
                  <h1 className="my-auto mr-[6px]">£20</h1>
                </div>
                <div className="flex justify-between bg-[#B80000]">
                  <h1 className="my-auto ml-[6px] text-white">Discount</h1>
                  <h1 className="my-auto mr-[6px] text-white">£20</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Received</h1>
                  <h1 className="my-auto mr-[6px]">£20</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Balance</h1>
                  <h1 className="my-auto mr-[6px]">£20</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Payment Mode</h1>
                  <h1 className="my-auto mr-[6px]">£20</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="my-auto ml-[6px]">Current Balance</h1>
                  <h1 className="my-auto mr-[6px]">£20</h1>
                </div>
              </div>
              <div className="mb-20 pl-20">For, Village Prints</div>
              <div className="pl-20">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            downloadPdfDocument(pdfRef);
          }}
          variant="primary"
        >
          download
        </Button>
      </div> */}
    </>
  );
}
