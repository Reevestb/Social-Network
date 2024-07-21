import { dbConnect } from "@/utils/dbConnection";
import { Flex, Text, Heading, Card, Strong, Button } from "@radix-ui/themes";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function UserId() {
  const userData = await currentUser();
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    await db.query(
      `
                SELECT * FROM social_users WHERE clerk_id = $1
                  `,
      [userId]
    );
  }

  async function handleSubmit(formData) {
    "use server";
    const clerk_id = formData.get("clerk_id");
    const username = formData.get("username");
    const bio = formData.get("bio");
    const location = formData.get("location");
    const db = dbConnect();
    await db.query(
      `UPDATE social_users SET clerk_id = $1, username = $2, location = $3, bio = $4 WHERE clerk_id = $1`,
      [clerk_id, username, location, bio]
    );
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  return (
    <>
      <h1>Edit your profile</h1>
      <form action={handleSubmit} className="flex flex-col items-center mt-10">
        <input name="clerk_id" defaultValue={userData.id} hidden></input>
        <label htmlFor="username">Enter a username:</label>
        <input
          className="text-black"
          name="username"
          placeholder="Enter your username"
          required
        />

        <label htmlFor="location">Your location?</label>
        <input
          name="location"
          className="text-black"
          required
          placeholder="Where are you from?"
        />
        <label htmlFor="bio">Enter your bio</label>
        <textarea
          className="resize text-black"
          name="bio"
          required
          placeholder="Write your bio here!"
        />
        <Button
          variant="classic"
          type="submit"
          className="flex bg-white rounded text-black items-center text-center
             w-fit p-1 mt-2 justify-center hover:bg-gray-600 hover:text-white"
        >
          Update profile
        </Button>
      </form>
    </>
  );
}
