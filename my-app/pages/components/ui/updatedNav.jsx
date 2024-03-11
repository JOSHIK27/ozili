import React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function UpdatedNav() {
  return (
    <div>
      <div className="flex flex-row-reverse justify-center sm:justify-start">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  className="hover:bg-[#f1f5f9] focus:bg-[#f1f5f9] mr-4"
                  href="/"
                >
                  Home
                </Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:bg-[#f1f5f9] focus:bg-[#f1f5f9] mr-4">
                Forms
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white">
                  <ListItem
                    href="/forms/whiteStock"
                    title="White Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/cutStock"
                    title="Cut Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/dyeStock"
                    title="Dye Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/printStock"
                    title="Print Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/rollStock"
                    title="Roll Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/jobWork"
                    title="Job Stock Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/customer"
                    title="Customer Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/preOrderForm"
                    title="Pre Order Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/readyStock"
                    title="Ready Stock Form"
                  ></ListItem>
                  <ListItem href="/forms/sales" title="Sales Form"></ListItem>
                  <ListItem
                    href="/forms/payment"
                    title="Payments Form"
                  ></ListItem>
                  <ListItem
                    href="/forms/saleReturns"
                    title="Sales Returns Form"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="mr-4">
                Reports
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white">
                  <ListItem href="/dashboards/toCut" title="Cut"></ListItem>
                  <ListItem href="/dashboards/todye" title="Dye"></ListItem>
                  <ListItem href="/dashboards/toprint" title="Print"></ListItem>
                  <ListItem href="/dashboards/toRoll" title="Roll"></ListItem>
                  <ListItem href="/dashboards/jobwork" title="Job"></ListItem>
                  <ListItem
                    href="/forms/orderList"
                    title="Pre Orders List"
                  ></ListItem>
                  <ListItem
                    href="/dashboards/readyStock"
                    title="Ready Stock"
                  ></ListItem>
                  <ListItem
                    href="/dashboards/saleSummary"
                    title="Sales Summary"
                  ></ListItem>
                  <ListItem
                    href="/dashboards/addressLabelGenerator"
                    title="Address Label Generator"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-8">
              <div className="rounded-md cursor-pointer border-[0.25px] hover:bg-green-800  text-center px-4 py-[7px] bg-green-700 text-white">
                <Link href={"/login"}>Login</Link>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="bg-[#E2E8F0] mt-[4px] w-full h-[2px]"></div>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f1f5f9] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
