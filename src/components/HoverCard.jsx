import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

// import "@/components/HoverC.module.css";

const HoverCardDemo = () => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a>
        <p className="bg-green-600 text-white rounded-lg p-1">
          Helpful Hover Info
        </p>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div>
          <div className="Text text-black">
            Useful Tips: Please use the `Edit Profile Button` to update your
            profile. To change your Avatar please use the account settings.
          </div>
        </div>

        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverCardDemo;
