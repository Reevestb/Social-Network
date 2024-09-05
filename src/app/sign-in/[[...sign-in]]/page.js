import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex justify-center items-center p-5">
      <SignIn />
    </main>
  );
}
