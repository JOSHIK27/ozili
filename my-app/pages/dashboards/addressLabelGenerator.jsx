import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  // jsPdf.html(htmlElement, opt);
  const tempDiv = document.createElement("div");
  tempDiv.style.width = 1400 + "px";
  tempDiv.style.overflowX = "auto";
  tempDiv.appendChild(htmlElement.cloneNode(true));
  document.body.appendChild(tempDiv);
  jsPdf.html(tempDiv, opt);
  document.body.removeChild(tempDiv);
}

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Print</TableHead>
              <TableHead>Nickname</TableHead>
              <TableHead>Sale ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Address Line 1</TableHead>
              <TableHead>Address Line 2</TableHead>
              <TableHead>Address Line 3</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>Primary Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((item) => {
              return (
                <TableRow key={item.saleid}>
                  <TableCell className="border-2 p-2">
                    <input
                      onClick={() => {
                        handleCheckBox(item.saleid);
                      }}
                      type="checkbox"
                      name="selectRow"
                    />
                  </TableCell>
                  <TableCell className="border-2 p-2">
                    {item.nickname}
                  </TableCell>
                  <TableCell className="border-2 p-2">{item.saleid}</TableCell>
                  <TableCell className="border-2 p-2">
                    {item.customerfullname}
                  </TableCell>
                  <TableCell className="border-2 p-2">
                    {item.orderstatus}
                  </TableCell>
                  <TableCell className="border-2 p-2">
                    {item.addressline1}
                  </TableCell>
                  <TableCell className="border-2 p-2">
                    {item.addressline2}
                  </TableCell>
                  <TableCell className="border-2 p-2">
                    {item.addressline3}
                  </TableCell>
                  <TableCell className="border-2 p-2">{item.city}</TableCell>
                  <TableCell className="border-2 p-2">{item.state}</TableCell>
                  <TableCell className="border-2 p-2">{item.pincode}</TableCell>
                  <TableCell className="border-2 p-2">
                    {item.primaryno}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
          <div className="p-[2px] mx-auto">
            {shippingCustomers &&
              shippingCustomers.map((item) => {
                if (item.check) {
                  return (
                    <div
                      key={item.saleid}
                      className="overflow-scroll whitespace-nowrap"
                    >
                      <div
                        key={item.saleid}
                        className="flex border-2 border-black mb-4 h-[375px]"
                        style={{ width: "1400px" }} // Set a fixed width here
                      >
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
                          pincode: {item.pincode}
                          <br />
                          Mobile no: {item.primaryno}
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
