import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SeePost from "./SeePost";

export default async function EditButton({ data, content }) {
  async function handleSubmit(formData) {
    "use server";
    const content = formData.get("content");

    const db = dbConnect();
    await db.query(`UPDATE social_posts SET content = $1 WHERE id = $2`, [
      content,
      data,
    ]);
    revalidatePath(``);
    redirect(``);
  }

  return (
    <main className="flex justify-center">
      <SeePost data={data} content={content} handleSubmit={handleSubmit} />
    </main>
  );
}
