import { UsersTable } from "@/components/userManagement/mainTable";
import Navbar from "@/components/userManagement/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="px-12">
        <UsersTable />
      </div>
    </div>
  );
}
