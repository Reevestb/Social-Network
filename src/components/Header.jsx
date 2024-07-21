import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { ActiveLink } from "./ActiveLink.jsx";
// import SeparatorPrim from "./SeparatorPrim.jsx";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();
  //
  return (
    <>
      {/* <SeparatorPrim /> */}
      <nav className="flex flex-row gap-5 justify-end flex-wrap min-w-max text-lg p-5 pr-10">
        <ActiveLink href="/">
          <p>Home</p>
        </ActiveLink>
        <ActiveLink href="/posts">
          <p>Post Feed</p>
        </ActiveLink>
        <ActiveLink href={`/user/${userId}`}>
          <p>Profile</p>
        </ActiveLink>
        <br />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton>Sign Up</SignUpButton>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
      </nav>
    </>
  );
}
