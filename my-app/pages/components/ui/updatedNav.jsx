import React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function UpdatedNav() {
  return (
    <div>
      <div className="flex flex-row-reverse justify-center sm:justify-start">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:bg-[#f1f5f9] focus:bg-[#f1f5f9] mr-8">
                Stock Forms
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
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="mr-8">
                Charts
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white">
                  <ListItem href="/dashboards/toCut" title="Cut"></ListItem>
                  <ListItem href="/dashboards/toDye" title="Dye"></ListItem>
                  <ListItem href="/dashboards/toprint" title="Print"></ListItem>
                  <ListItem href="/dashboards/toroll" title="Roll"></ListItem>
                  <ListItem href="/dashboards/inJob" title="Job"></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-8">
              <a class="inline-flex cursor-pointer items-center justify-center rounded-md py-2 sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm h-10 w-fit px-4 text-sm mr-8 mt-[4px] mr-[4px] sm:w-fit">
                Login
              </a>
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
