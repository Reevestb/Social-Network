import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function deleteButton({ userId, content, use_id }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(`DELETE FROM social_posts WHERE content = $1 RETURNING * `, [
      content,
    ]);
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }
  if (userId === use_id) {
    return (
      <>
        <form action={handleSubmit} className="flex justify-center">
          <button
            className="flex bg-red-600 rounded text-white items-center text-center
             w-fit h-fit justify-center self-center p-1 text-xs hover:bg-red-200 hover:text-red-600"
            type="submit"
          >
            <MdOutlineDeleteOutline />
          </button>
        </form>
      </>
    );
  } else {
    return <></>;
  }
}
