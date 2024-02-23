import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./invoice";
import { useState, useEffect } from "react";
export default function Test() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <PDFDownloadLink document={<h1>Js</h1>} fileName="FORM">
          <button>CLick</button>
        </PDFDownloadLink>
      ) : (
        <></>
      )}
    </>
  );
}
