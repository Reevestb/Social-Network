import { dbConnect } from "@/utils/dbConnection";
import { Flex, Text, Heading, Card, Strong } from "@radix-ui/themes";
import DcBtn from "@/components/DeleteCom";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function PostsPage() {
  const db = dbConnect();
  const postData = (
    await db.query(
      `SELECT social_posts.user_id, social_posts.content, social_users.username, social_users.clerk_id FROM social_posts JOIN social_users ON social_posts.user_id = social_users.clerk_id WHERE social_posts.user_id = social_users.clerk_id`
    )
  ).rows;

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

  return (
    <main className="flex flex-col items-center max-h-screen overflow-scroll p-2">
      <Heading size={"8"}>Posts Feed</Heading>
      <Flex
        direction={"column-reverse"}
        justify={"end"}
        // maxWidth={"80vw"}
        className="flex max-w-2xl"
      >
        {postData.map((item) => (
          <div key={item.id} className="mt-4 mb-3 items-center">
            <Card size={"2"} key={item.id}>
              <Text as="div" weight={"medium"} size={"3"} align={"center"}>
                <Strong>{item.username}</Strong>
              </Text>
              {/* <div className="flex justify-center "> */}
              <Text as="p" align={"center"}>
                {item.content}
              </Text>
              <DcBtn
                content={item.content}
                userId={item.user_id}
                use_id={userId}
              />
              {/* </div> */}
            </Card>
          </div>
        ))}
      </Flex>
    </main>
  );
}
