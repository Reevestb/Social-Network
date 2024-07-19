import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { ActiveLink } from "./ActiveLink.jsx";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();

  return (
    <>
      <nav className="flex flex-row gap-5">
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
