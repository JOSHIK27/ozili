"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { item } from "../store/states";
import { useRecoilState } from "recoil";

export default function DatePickerDemo({ message, x, o }) {
  const [date, setDate] = useState();
  const [items, setItems] = useRecoilState(item);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] h-[8px] absolute ml-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{message}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={(date) => {
            const dateString = new Date(date).toLocaleDateString();
            const {
              id,
              fabric,
              supplier,
              orderDate,
              deliveryDate,
              quantity,
              price,
              products,
              subProduct,
              productType,
              cargoProvider,
              cargoCharges,
              additionalCharges,
              invoiceNumber,
              cpuBt,
              gstPaid,
              gstRate,
              cpuAt,
              net,
              cargoPaidBySupplier,
              totalCost,
            } = x;
            let updatedItem;
            if (o == true) {
              updatedItem = {
                id,
                fabric,
                supplier,
                orderDate: dateString,
                deliveryDate,
                quantity,
                price,
                products,
                subProduct,
                productType,
                cargoProvider,
                cargoCharges,
                additionalCharges,
                invoiceNumber,
                cpuBt,
                gstPaid,
                gstRate,
                cpuAt,
                net,
                cargoPaidBySupplier,
                totalCost,
              };
            } else {
              updatedItem = {
                id,
                fabric,
                supplier,
                orderDate,
                deliveryDate: dateString,
                quantity,
                price,
                products,
                subProduct,
                productType,
                cargoProvider,
                cargoCharges,
                additionalCharges,
                invoiceNumber,
                cpuBt,
                gstPaid,
                gstRate,
                cpuAt,
                net,
                cargoPaidBySupplier,
                totalCost,
              };
            }
            const updatedItemList = items?.map((y) => {
              if (y.id === x.id) {
                return updatedItem;
              } else return y;
            });
            setItems(updatedItemList);
          }}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
