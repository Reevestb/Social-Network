import { dbConnect } from "@/utils/dbConnection";
import { Flex, Text, Heading, Card, Strong } from "@radix-ui/themes";

export default async function PostsPage() {
  const db = dbConnect();
  const postData = (
    await db.query(
      `SELECT social_posts.user_id, social_posts.content, social_users.username, social_users.clerk_id FROM social_posts JOIN social_users ON social_posts.user_id = social_users.clerk_id WHERE social_posts.user_id = social_users.clerk_id`
    )
  ).rows;

  return (
    <main className="flex flex-col items-center">
      <Heading size={"8"}>Posts Feed</Heading>
      <Flex direction={"column-reverse"}>
        {postData.map((item) => (
          <div key={item.id} className="mt-6 ">
            <Card size={"2"} key={item.id}>
              <Text as="div" weight={"medium"} size={"3"} align={"center"}>
                <Strong>{item.username}</Strong>
              </Text>
              <Text as="p" align={"center"}>
                {item.content}
              </Text>
            </Card>
          </div>
        ))}
      </Flex>
    </main>
  );
}
