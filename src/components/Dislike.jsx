import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { SlDislike } from "react-icons/sl";

export default function DislikeButton({ likes, id }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(
      `UPDATE social_posts
SET likes = ${likes} -1
WHERE id = $1`,
      [id]
    );
    revalidatePath(`/posts`);
    redirect(`/posts`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <button
          size={"1"}
          color="orange"
          className="flex bg-orange-600 rounded text-white items-center text-center
             w-fit justify-center p-[0.25em] text-xs hover:bg-orange-200 hover:text-orange-600"
          type="submit"
        >
          <SlDislike />
        </button>
      </form>
    </>
  );
}
