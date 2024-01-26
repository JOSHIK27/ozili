import { error } from "console";
import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      await supabase.from("rolling").insert({
        date: body.date,
        rollerName: body.name,
        rollType: body.rollType,
        rollMovement: body.movement,
        printType: body.printType,
        fabric: body.fabric,
        quantity: parseFloat(body.quantity),
        charges: parseFloat(body.charges),
      });
      res.json(["success"]);
    } catch {
      throw error;
    }
  }
}
