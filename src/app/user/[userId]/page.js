import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Flex, Text, Heading, Card, Strong, Button } from "@radix-ui/themes";
import HoverCard from "@/components/HoverCard";
import DcBtn from "@/components/DeleteCom";
import Edit from "@/components/EditPost";

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
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
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
      await db.query(
        `SELECT * FROM social_posts WHERE user_id = $1 ORDER BY id ASC`,
        [userId]
      )
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
  const db = dbConnect();
  const usersData = (
    await db.query(`SELECT * FROM social_users WHERE clerk_id = $1`, [userId])
  ).rows;

  if (usersData.length > 0) {
    return (
      <main className="flex flex-col items-center pl-4 pr-4 max-w-5xl mx-auto relative">
        <Flex direction={"column"} align={"center"} maxWidth={"100vw"}>
          <Heading size={"8"} className="m-2">
            <span className="uppercase">{userData.username}</span> Profile
          </Heading>
          <div id="profile-info">
            {Bio.map((item) => (
              <Flex direction={"column"} align={"center"} key={item.id}>
                <Text>
                  Location:
                  <Strong> {item.location}</Strong>
                </Text>
                <Text>Bio: {item.bio}</Text>
              </Flex>
            ))}
          </div>
          <Flex direction={"row"} gap={"5"} align={"center"} justify={"center"}>
            <Button variant="classic">
              <a href="/edit-user">Edit Profile</a>
            </Button>
            <HoverCard />
          </Flex>
          <br />
          <section className="flex flex-col gap-10 mt-5 w-auto">
            <form className="flex flex-col items-center" action={handlePost}>
              <div className="flex flex-col">
                <input
                  name="user_id"
                  className="text-black"
                  defaultValue={userData.id}
                  hidden
                />
                <label
                  htmlFor="content"
                  className=" flex mb-5 mt-2 justify-center text-3xl"
                >
                  <Strong> Create A Post</Strong>
                </label>

                <textarea
                  className="w-80 h-20 text-black outline outline-black border-black md:w-[40rem] "
                  name="content"
                  required
                  placeholder="Fill your post with content here!"
                  maxLength={"400"}
                />
              </div>
              <div className="pt-2">
                <Button
                  variant="classic"
                  type="submit"
                  className="flex bg-gray-400 rounded text-black items-center text-center
             w-fit pt-1 mt-2 justify-center hover:bg-green-400 hover:text-white"
                >
                  Post!
                </Button>
              </div>
            </form>

            {/* <Pm userData={userData.id} formData={handlePost(formData)} /> */}

            <div className="flex flex-col items-center">
              <Heading size={"7"}>Your Previous Posts</Heading>

              <div className="flex pb-4">
                <Flex
                  direction={"column-reverse"}
                  align={"center"}
                  overflow={"scroll"}
                >
                  {usersPosts.map((item) => (
                    <div key={item.id} className="flex mt-3 justify-center">
                      <Card
                        key={item.id}
                        size={"1"}
                        className="flex w-[20rem] md:w-[32rem] items-center"
                      >
                        <Flex
                          key={item.id}
                          direction={"column"}
                          gap={"3"}
                          // className="flex w-[20rem] lg:w-[32rem] items-center"
                          justify={"between"}
                          align={"center"}
                        >
                          <Text>{item.content}</Text>
                          <div className="flex flex-row gap-2 relative justify-center">
                            <Edit
                              data={item.id}
                              content={item.content}
                              className="absolute top-2 right-2 text-black text-xl"
                            />
                            <DcBtn
                              content={item.content}
                              userId={item.user_id}
                              use_id={userId}
                            />
                          </div>
                        </Flex>
                      </Card>
                    </div>
                  ))}
                </Flex>
              </div>
            </div>
          </section>
        </Flex>
      </main>
    );
  }
  //!This is where the change is if they haven't made a profile
  else {
    return (
      <main className="flex flex-col items-center max-h-screen  ">
        <Heading>{userData.username} Profile Page</Heading>
        <div id="profile-info">
          {/* {Bio.map((item) => (
            <Flex direction={"column"} align={"center"} key={item.id}>
              <Text>{item.location}</Text>
              <Text>Bio: {item.bio}</Text>
            </Flex>
          ))} */}
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
            <Button
              variant="classic"
              type="submit"
              className="flex bg-white rounded text-black items-center text-center
             w-fit p-1 mt-2 justify-center hover:bg-gray-600 hover:text-white"
            >
              Create profile
            </Button>
          </form>
        </div>
        <br />
        <Button variant="classic">
          <a href="/edit-user">Edit Profile</a>
        </Button>
      </main>
    );
  }
}
