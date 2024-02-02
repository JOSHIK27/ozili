import { error } from "console";
import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      if (
        body.printType == "Pigment" ||
        body.printType == "Rapid" ||
        body.printType == "Dye Damage" ||
        body.printType == "Print Damage"
      ) {
        const respone1 = await supabase
          .from("stilltoprint_view")
          .select(body.dyeType)
          .eq("product", body.product);
        if (
          respone1 &&
          respone1.data.length &&
          respone1.data[0][body.dyeType] >= parseInt(body.quantity)
        ) {
          await supabase.from("printtbl").insert({
            date: body.date,
            mainprinter: body.mainPrinter,
            secprinter: body.secPrinter,
            product: body.product,
            dyetype: body.dyeType,
            printtype: body.printType,
            quantity: parseInt(body.quantity),
            fabric: body.fabric,
            product: body.product,
            quantity: parseInt(body.quantity),
            rollingrequired: body.rollingNotRequired,
            transaction: body.transaction,
          });
          res.json(["success"]);
        } else {
          res.json(["Quantity Insufficient"]);
        }
      } else {
        const respone2 = await supabase
          .from("screenblendtoprint_view")
          .select(body.dyeType)
          .eq("product", body.product);
        if (
          respone2 &&
          respone2.data.length &&
          respone2.data[0][body.dyeType] >= parseInt(body.quantity)
        ) {
          await supabase.from("printtbl").insert({
            date: body.date,
            mainprinter: body.mainPrinter,
            secprinter: body.secPrinter,
            product: body.product,
            dyetype: body.dyeType,
            printtype: body.printType,
            quantity: parseInt(body.quantity),
            fabric: body.fabric,
            product: body.product,
            quantity: parseInt(body.quantity),
            rollingrequired: body.rollingNotRequired,
            transaction: body.transaction,
          });
          res.json(["success"]);
        } else {
          res.json(["Quantity Insufficient"]);
        }
      }
    } catch {
      throw error;
    }
  }
}
