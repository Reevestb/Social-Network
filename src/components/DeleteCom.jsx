import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function deleteButton({ userId, content }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(`DELETE FROM social_posts WHERE content = $1 RETURNING * `, [
      content,
    ]);
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <button
          className="flex bg-red-600 rounded text-white items-center text-center
             w-fit justify-center p-1 text-sm hover:bg-red-200 hover:text-red-600"
          type="submit"
        >
          <MdOutlineDeleteOutline />
        </button>
      </form>
    </>
  );
}
