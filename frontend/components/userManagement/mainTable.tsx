"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { useSelectedUsers } from "@/store/store";

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    last_login: string | null;
    title: string | null;
    status: string;
}

export function UsersTable({ users }: { users: User[] }) {
    const { selectedUsers, toggleUser, setAll, setNone } = useSelectedUsers();
    const allUsersSelected = users.length > 0 && selectedUsers.length === users.length;

    const handleGeneralCheckedChange = (checked: boolean | "indeterminate") => {
        if (checked === true) {
            setAll(users);
        } else {
            setNone();
        }
    };
    return (
        <Table className="">
            <TableCaption>A list of Users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[40px]">
                        <Checkbox checked={allUsersSelected} onCheckedChange={handleGeneralCheckedChange} />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">No users found</TableCell>
                    </TableRow>
                )}
                {users && users.map((user) => (
                    <TableRow key={user.email}>
                        <TableCell>
                            <Checkbox checked={selectedUsers.includes(user.email)} onCheckedChange={() => toggleUser(user.email)} />
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <div>{user.first_name + " " + user.last_name}</div>
                                <div className="text-slate-500 text-sm">{user.title}</div>
                            </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.last_login ? new Date(user.last_login).toLocaleString() : ""}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className="px-8">
                <TableRow>
                    <TableCell colSpan={4}>Total users selected:</TableCell>
                    <TableCell className="text-right">{selectedUsers.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
