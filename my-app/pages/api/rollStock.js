import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    if (body.transaction == "Exception") {
      await supabase.from("rollingtbl").insert({
        date: body.date,
        supplier: body.name,
        rolltype: body.rollType,
        movement: body.movementType,
        printtype: body.printType,
        fabric: body.fabric,
        quantity: parseFloat(body.quantity),
        transportcharges: parseFloat(body.charges),
        product: body.product,
        transaction: body.transaction,
        damage: body.damage,
      });
      res.send(["success"]);
    } else {
      if (body.movementType == "Out") {
        const { data, error } = await supabase
          .from("stilltoroll_view")
          .select(body.printtype)
          .eq("product", body.product);
        let ptype = body.printType;
        if (data[0][ptype] >= parseFloat(body.quantity)) {
          await supabase.from("rollingtbl").insert({
            date: body.date,
            supplier: body.name,
            rolltype: body.rollType,
            movement: body.movementType,
            printtype: body.printType,
            fabric: body.fabric,
            quantity: parseFloat(body.quantity),
            transportcharges: parseFloat(body.charges),
            product: body.product,
            transaction: body.transaction,
            damage: body.damage,
          });
          res.send(["success"]);
        } else {
          res.json(["Quantity Insufficient"]);
        }
      } else {
        const { data, error } = await supabase
          .from("stillinroll_view")
          .select(body.printtype)
          .eq("product", body.product)
          .eq("supplier", body.name);
        let ptype = body.printType;
        if (data[0][ptype] >= parseFloat(body.quantity)) {
          await supabase.from("rollingtbl").insert({
            date: body.date,
            supplier: body.name,
            rolltype: body.rollType,
            movement: body.movementType,
            printtype: body.printType,
            fabric: body.fabric,
            quantity: parseFloat(body.quantity),
            transportcharges: parseFloat(body.charges),
            product: body.product,
            transaction: body.transaction,
            damage: body.damage,
          });
          res.send(["success"]);
        } else {
          res.json(["Quantity Insufficient"]);
        }
      }
    }
  }
}
