import { error } from "console";
import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      await supabase.from("jobWork").insert({
        date: body.date,
        jobWorkerName: body.name,
        jobWorkType: body.workType,
        dyeType: body.dyeType,
        jobMovement: body.movementType,
        fabric: body.fabric,
        product: body.product,
        quantity: body.quantity,
      });
      res.json(["success"]);
    } catch {
      throw error;
    }
  }
}
