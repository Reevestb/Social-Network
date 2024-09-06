// import React from "react";
// import * as HoverCard from "@radix-ui/react-hover-card";
// import { FaInfo } from "react-icons/fa";

// //! My Primitive component from radix-ui

// const HoverCardDemo = () => (
//   <HoverCard.Root>
//     <HoverCard.Trigger asChild>
//       <a>
//         <p className="bg-green-700  text-white  rounded-lg p-1 text-xl">
//           {/* Helpful Hover Info */}
//           <FaInfo />
//         </p>
//       </a>
//     </HoverCard.Trigger>
//     <HoverCard.Portal>
//       <HoverCard.Content className="HoverCard" side={"bottom"}>
//         <div>
//           <div className="Text text-green-700">
//             Useful Tips: Please use the `Edit Profile Button` to update your
//             profile. To change your Avatar please use the `Manage Account`.
//           </div>
//         </div>

//         <HoverCard.Arrow className="HoverCardArrow" />
//       </HoverCard.Content>
//     </HoverCard.Portal>
//   </HoverCard.Root>
// );

// export default HoverCardDemo;

// components/HoverCardDemo.js

import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { FaInfo } from "react-icons/fa";

const HoverCardDemo = () => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a>
        <p
          id="HoverCard"
          className="bg-green-700 text-white rounded-lg p-1 text-xl"
        >
          <FaInfo />
        </p>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content id="HoverCard" side={"bottom"}>
        <div>
          <div className="Text text-green-700">
            Useful Tips: Please use the `Edit Profile Button` to update your
            profile. To change your Avatar please use the `Manage Account`.
          </div>
        </div>
        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverCardDemo;
