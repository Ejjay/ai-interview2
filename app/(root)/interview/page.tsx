import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
console.log("USER OBJECT ON PAGE:", JSON.stringify(user, null, 2)); 

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;
