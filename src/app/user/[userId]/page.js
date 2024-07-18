import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function userIdPage() {
  const { userId } = auth();

  // we need a from to add user data
  // we also need a handle submit

  async function handleSubmit(formData) {}
  return (
    <>
      <h1>User Profile</h1>
      {/* form here */}
    </>
  );
}
//! ================ add to above =====================
import { auth, currentUser } from "@clerk/nextjs/server";

<h2>current user data</h2>;
{
  /* show current users data in here  */
}
