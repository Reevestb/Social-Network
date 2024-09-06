import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { SlLike } from "react-icons/sl";

export default function LikeButton({ id, likes }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(
      `UPDATE social_posts
SET likes = ${likes} +1
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
          // size={"1"}
          // color="blue"
          className="flex bg-green-600 rounded text-white items-center text-center
             w-fit justify-center p-[.25em] text-xs hover:bg-green-200 hover:text-green-600"
          type="submit"
        >
          <SlLike />
        </button>
      </form>
    </>
  );
}
