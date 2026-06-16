import { cookies } from "next/headers";

import { UsersTable } from "@/components/userManagement/mainTable";
import Navbar from "@/components/userManagement/navbar";
import Providers from "@/components/userManagement/providers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users', {
    headers: {
      Cookie: `token=${token?.value}`
    },
    next: { tags: ['users'] }
  });

  if (res.status === 401) redirect("/login?error=session_expired");
  if (res.status === 403) redirect("/login?error=blocked");
  if (!res.ok) redirect('/login?error=unknown');

  const data = await res.json();

  return (
    <Providers>
      <div>
        <Navbar />
        <div className="px-12">
          <UsersTable users={data.users} />
        </div>
      </div>
    </Providers>
  );
}
