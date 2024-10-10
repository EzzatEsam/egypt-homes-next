import LoginForm from "@/components/LoginForm";
import { HasCredentials } from "@/lib/Session";
import { redirect } from "next/navigation";

async function SignUpPage() {
  if (await HasCredentials()) {
    redirect("/");
  } else
    return (
      <>
        <LoginForm />
      </>
    );
}

export default SignUpPage;
