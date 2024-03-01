import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import { useRef } from "react";
import pdfMake from "pdfmake";

function generatePdf() {
  let jsPdf = new jsPDF("p", "pt", "letter");
  var htmlElement = document.getElementById("doc-target");
  const opt = {
    callback: function (jsPdf) {
      jsPdf.save("Test.pdf");
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
    margin: [0, 0, 0, 0],
    autoPaging: "text",
    html2canvas: {
      allowTaint: true,
      dpi: 300,
      letterRendering: true,
      logging: false,
      scale: 0.5,
    },
  };
  jsPdf.html(htmlElement, opt);
}

// function generatePdf() {
//   var doc = new jsPDF.jsPDF("p", "pt", "a4");

//   doc.html(document.getElementById("doc-target"), {
//     callback: function (doc) {
//       doc.save("MLB World Series Winners.pdf");
//     },
//     margin: [60, 60, 60, 60],
//     x: 32,
//     y: 32,
//   });
// }

export default function AddressLabelGenerator({ customers }) {
  const [shippingCustomers, setShippingCustomers] = useState(customers);
  useEffect(() => {
    setShippingCustomers(customers);
  }, []);
  const handleCheckBox = (id) => {
    console.log(id);
    const updatedShippingCustomers = shippingCustomers.map((item) => {
      if (item.saleid == id) {
        return {
          ...item,
          check: !item.check,
        };
      } else {
        return item;
      }
    });
    setShippingCustomers(updatedShippingCustomers);
  };

  return (
    <div>
      <UpdatedNav />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Sales Table</h2>
        <table className="w-full border-collapse mb-8">
          <thead>
            <tr>
              <th>Print</th>
              <th>Nickname</th>
              <th>Sale ID</th>
              <th>Customer Name</th>
              <th>Order Status</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>Address Line 3</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Primary Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => {
              return (
                <tr key={item.saleid}>
                  <td className="border-2 p-2">
                    <input
                      onClick={() => {
                        handleCheckBox(item.saleid);
                      }}
                      type="checkbox"
                      name="selectRow"
                    />
                  </td>
                  <td className="border-2 p-2">{item.nickname}</td>
                  <td className="border-2 p-2">{item.saleid}</td>
                  <td className="border-2 p-2">{item.customerfullname}</td>
                  <td className="border-2 p-2">{item.orderstatus}</td>
                  <td className="border-2 p-2">{item.addressline1}</td>
                  <td className="border-2 p-2">{item.addressline2}</td>
                  <td className="border-2 p-2">{item.addressline3}</td>
                  <td className="border-2 p-2">{item.city}</td>
                  <td className="border-2 p-2">{item.state}</td>
                  <td className="border-2 p-2">{item.pincode}</td>
                  <td className="border-2 p-2">{item.primaryno}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="bg-blue-500  text-white px-4 py-2 rounded"
          onClick={() => {
            generatePdf();
          }}
        >
          Print Labels
        </button>
        <br />
        <div id="doc-target" className="mt-8">
          <div className="p-[2px]">
            {shippingCustomers &&
              shippingCustomers.map((item) => {
                if (item.check) {
                  return (
                    <div key={item.saleid}>
                      <div className="flex border-2 border-black mb-4 h-[375px]">
                        <div
                          id="from"
                          className="border-black text-[20px] my-8 w-2/5 ml-16"
                        >
                          <strong className="underline">From:</strong>
                          <br />
                          <br />
                          Manogna Reddy
                          <br />
                          Village Prints, Ozili Village,
                          <br />
                          Ozili Mandal, Andhra Pradesh
                          <br />
                          Pin Code 524402
                          <br />
                          Ph: 8919056375
                        </div>
                        <div id="to" className="my-8 w-3/5 text-[20px]">
                          <strong className="w-2/3 underline">
                            Deliver This To :
                          </strong>
                          <br />
                          <br />
                          {item.customerfullname}
                          <br />
                          {item.addressline1}
                          <br />
                          {item.addressline2}
                          <br />
                          {item.addressline3}
                          <br />
                          {item.city}
                          <br />
                          {item.state}
                          <br />
                          pincode : {item.pincode}
                          <br />
                          Mobile no : {item.primaryno}
                          <br />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("stilltoship_view").select();
  const customers = data.map((item) => {
    return {
      ...item,
      check: false,
    };
  });
  return {
    props: {
      customers,
    },
  };
}
