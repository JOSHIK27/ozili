import { error } from "console";
import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      await supabase.from("print").insert({
        date: body.date,
        mainPrinter: body.mainPrinter,
        secPrinter: body.secPrinter,
        product: body.product,
        dyeType: body.dyeType,
        printType: body.printType,
        product: body.product,
        count: parseFloat(body.quantity),
        rollingRequired: !body.rollingNotRequired,
      });
      res.json(["success"]);
    } catch {
      throw error;
    }
  }
}
