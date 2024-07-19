import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Flex, Text, Heading } from "@radix-ui/themes";

//getting userId from clerk
export default async function UserIdPage() {
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
  //   console.log(userData);

  async function handleSubmit(formData) {
    "use server";
    const clerk_id = formData.get("clerk_id");
    const username = formData.get("username");
    const bio = formData.get("bio");
    const location = formData.get("location");
    const db = dbConnect();
    await db.query(
      `INSERT INTO social_users (clerk_id, username, location, bio) VALUES ($1, $2, $3, $4)`,
      [clerk_id, username, location, bio]
    );
  }
  async function handlePost(formData) {
    "use server";
    const user = formData.get("user_id");
    const post = formData.get("content");
    const db = dbConnect();
    await db.query(
      `
      INSERT INTO social_posts (user_id, content) 
      VALUES ($1, $2)
      `,
      [user, post]
    );
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  async function userPosts() {
    const db = dbConnect();
    const postData = (
      await db.query(`SELECT * FROM social_posts WHERE user_id = $1 `, [userId])
    ).rows;
    return postData;
  }
  const usersPosts = await userPosts();

  async function userBio() {
    const db = dbConnect();
    const bio = (
      await db.query(`SELECT * FROM social_users WHERE clerk_id = $1 `, [
        userId,
      ])
    ).rows;
    return bio;
  }
  const Bio = await userBio();

  return (
    <main className="flex flex-col items-center  ">
      <Heading>{userData.username} Profile Page</Heading>
      <div id="profile-info">
        {Bio.map((item) => (
          <Flex direction={"column"} align={"center"} key={item.id}>
            <Text>{item.location}</Text>
            <Text>Bio: {item.bio}</Text>
          </Flex>
        ))}
        <form
          action={handleSubmit}
          className="flex flex-col items-center mt-10"
        >
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
          <button
            type="submit"
            className="flex bg-white rounded text-black items-center text-center
             w-fit p-1 mt-2 justify-center hover:bg-gray-600 hover:text-white"
          >
            Create profile
          </button>
        </form>
      </div>
      <br />
      <form className="flex flex-col items-center" action={handlePost}>
        <div className="flex flex-col">
          <input
            name="user_id"
            className="text-black"
            defaultValue={userData.id}
            hidden
          />
          <label htmlFor="content">Make a post full of your content!</label>

          <textarea
            className="resize text-black"
            name="content"
            required
            placeholder="Fill your post with content here!"
          />
        </div>
        <button
          type="submit"
          className="flex bg-white rounded text-black items-center text-center
             w-fit p-1 mt-2 justify-center hover:bg-gray-600 hover:text-white"
        >
          Post!
        </button>
      </form>
      <Heading>Your Previous Posts</Heading>
      <div className="flex flex-col-reverse">
        {usersPosts.map((item) => (
          <Flex key={item.id}>
            <Text>{item.content}</Text>
          </Flex>
        ))}
      </div>
    </main>
  );
}
