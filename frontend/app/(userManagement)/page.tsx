import { cookies } from "next/headers";

import { UsersTable } from "@/components/userManagement/mainTable";
import Navbar from "@/components/userManagement/navbar";
import Providers from "@/components/userManagement/providers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users', {
    headers: {
      Cookie: `token=${token?.value}`
    },
    next: { tags: ['users'] }
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();

  return (
    <Providers>
    <div className="">
      <Navbar />
      <div className="px-12">
        <UsersTable users={data.users} />
      </div>
    </div>
    </Providers>
  );
}
