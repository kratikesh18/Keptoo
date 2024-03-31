import { authOptions } from "@/lib/authOptions";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  // Get the current user from your database
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("UnAuthorized", { status: 401 });
  }

  const user = session.user;
  const email = user.email || "";

  // Identify the user and return the result
  const { status, body } = await liveBlocksClient.identifyUser(
    {
      userId: email,
      groupIds: [], // Optional
    },
    {
      userInfo: {
        name: user.name || "",
        email: email,
        image: user.image,
      },
    }
  );

  return new Response(body, { status });
}

// ************* GARBAGE********//
// const liveblocks = new Liveblocks({
//   secret:
//     "sk_dev_CC24HwiY6xuffe2s4331HYR0iC6GsZJfk1zzdpC-vRe2_tyuUmzlDE7DEHurmVQm",
// });
