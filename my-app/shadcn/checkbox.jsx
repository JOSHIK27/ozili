"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { item } from "@/store/states"
import { useRecoilState } from "recoil"
export function CheckboxWithText() {
  return (
    <div className="ml-[60px] h-8 w-8">
      <Checkbox id="terms1" />
    </div>
  )
}
