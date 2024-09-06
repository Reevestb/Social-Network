import { dbConnect } from "@/utils/dbConnection";
import { Flex, Text, Heading, Card, Strong } from "@radix-ui/themes";
import DcBtn from "@/components/DeleteCom";
import { auth, currentUser } from "@clerk/nextjs/server";
import LikeBtnM from "@/components/Like";
import DislikeBtnM from "@/components/Dislike";

export default async function PostsPage() {
  const db = dbConnect();
  const postData = (
    await db.query(
      `SELECT social_posts.user_id, social_posts.id, social_posts.content, social_posts.likes, social_users.username,  social_users.clerk_id FROM social_posts JOIN social_users ON social_posts.user_id = social_users.clerk_id WHERE social_posts.user_id = social_users.clerk_id ORDER BY social_posts.id ASC`
    )
  ).rows;

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
  function likeCheck(item) {
    if (item.user_id != userId) {
      return (
        <div className="flex flex-row items-center ">
          <LikeBtnM id={item.id} likes={item.likes} />
          <br></br>
          <Text className=" ml-2 mr-2">{item.likes}</Text>
          <br></br>
          <DislikeBtnM likes={item.likes} id={item.id} />
        </div>
      );
    } else {
      return <></>;
    }
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

              <Text as="p" align={"center"}>
                {item.content}
              </Text>
              <div key={item.id} className="flex flex-row justify-center">
                {likeCheck(item)}
                <div>
                  <DcBtn
                    content={item.content}
                    userId={item.user_id}
                    use_id={userId}
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Flex>
    </main>
  );
}
