import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const { data, error } = await supabase.from("customertbl").insert({
        nickname: body[0].nickname,
        customerfullname: body[0].customerfullname,
        primaryno: body[0].primaryno,
        secondaryno: body[0].secondaryno,
        source: body[0].source,
        referral: body[0].ifReferred,
        profession: body[0].profession,
        group: body[0].group,
        addressline1: body[0].addressline1,
        addressline2: body[0].addressline2,
        addressline3: body[0].addressline3,
        city: body[0].city,
        state: body[0].state,
        pincode: body[0].pincode,
        emailid: body[0].email,
      });
      console.log(error);
      if (error) {
        throw error.details;
      } else {
        res.status(200).json(["success"]);
      }
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
  if (req.method == "PUT") {
    try {
      const body = JSON.parse(req.body);
      console.log(body);
      const resp = await supabase
        .from("customertbl")
        .select("id")
        .eq("nickname", body[1]);

      const { data, error } = await supabase
        .from("customertbl")
        .update({
          nickname: body[0].nickname,
          customerfullname: body[0].customerfullname,
          primaryno: body[0].primaryno,
          secondaryno: body[0].secondaryno,
          source: body[0].source,
          referral: body[0].ifReferred,
          profession: body[0].profession,
          group: body[0].group,
          addressline1: body[0].addressline1,
          addressline2: body[0].addressline2,
          addressline3: body[0].addressline3,
          city: body[0].city,
          state: body[0].state,
          pincode: body[0].pincode,
          emailid: body[0].email,
        })
        .eq("id", resp.data[0].id);
      console.log(error);
      if (error) {
        throw error.details;
      } else {
        res.status(200).json(["success"]);
      }
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
}
