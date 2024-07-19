import { dbConnect } from "@/utils/dbConnection";
import { Flex, Text, Button } from "@radix-ui/themes";

export default async function PostsPage() {
  const db = dbConnect();
  const postData = (
    await db.query(
      `SELECT social_posts.user_id, social_posts.content, social_users.username, social_users.clerk_id FROM social_posts JOIN social_users ON social_posts.user_id = social_users.clerk_id WHERE social_posts.user_id = social_users.clerk_id`
    )
  ).rows;

  return (
    <Flex direction={"column"} align={"center"}>
      <Text className="text-4xl">Posts Feed</Text>
      <Flex direction={"column-reverse"}>
        {postData.map((item) => (
          <div className="mt-10" key={item.id}>
            <Text>{item.username}</Text>
            <br />
            <p>{item.content}</p>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
