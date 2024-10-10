import CreateNewForm from "@/components/CreateNewForm";
import { HasCredentials, TokenExpired } from "@/lib/Session";
import { redirect } from "next/navigation";

const AddPage = async () => {
  if (!(await HasCredentials()) || (await TokenExpired())) {
    redirect("/login");
  }
  return (
    <>
      <CreateNewForm />
    </>
  );
};

export default AddPage;
