import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { Separator } from "@radix-ui/themes";

import { auth } from "@clerk/nextjs/server";
import { ActiveLink } from "./ActiveLink.jsx";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();
  //
  return (
    <main>
      {/* <SeparatorPrim /> */}
      <nav
        // className="flex flex-row gap-5 justify-between text-sm p-5 md:pl-10 md:pr-10"
        className=" flex flex-row top-0 z-40 self-center justify-between max-w-5xl mx-auto p-4 text-sm md:text-[16px]"
      >
        <div className="flex flex-row gap-4 ">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignUpButton>Sign Up</SignUpButton>
            <SignInButton>Sign In</SignInButton>
          </SignedOut>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <ActiveLink href="/">
            <p>Home</p>
          </ActiveLink>
          <Separator orientation={"vertical"} />

          <ActiveLink href="/posts">
            <p>Post Feed</p>
          </ActiveLink>
          <Separator orientation={"vertical"} />
          <ActiveLink href={`/user/${userId}`}>
            <p>Profile</p>
          </ActiveLink>
        </div>
      </nav>
    </main>
  );
}
