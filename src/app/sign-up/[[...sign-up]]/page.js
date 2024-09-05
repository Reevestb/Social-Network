import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center p-5">
      <SignUp />
    </main>
  );
}
