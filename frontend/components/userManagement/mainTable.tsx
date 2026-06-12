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
import { useState } from "react";

const users = [
    {
        name: "Alex John",
        title: "Director, Marketing",
        email: "alexjohn.director@mail.com",
        lastLogin: "123",
        status: "Active",
    }
]

export function UsersTable() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [allUsersSelected, setAllUsersSelected] = useState(false);

    const selectAllUsers = () => {
        if (allUsersSelected) {
            setSelectedUsers([]);
            setAllUsersSelected(false);
        } else {
            setSelectedUsers(users.map((user) => user.email));
            setAllUsersSelected(true);
        }
    }

    const handleUserSelection = (email: string) => {
        if (selectedUsers.includes(email)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== email));
        } else {
            setSelectedUsers([...selectedUsers, email]);
        }
    }

    return (
        <Table className="">
            <TableCaption>A list of Users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[40px]">
                        <Checkbox checked={allUsersSelected} onCheckedChange={selectAllUsers} />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.email}>
                        <TableCell>
                            <Checkbox checked={selectedUsers.includes(user.email)} onCheckedChange={() => handleUserSelection(user.email)} />
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <div>{user.name}</div>
                                <div className="text-slate-500 text-sm">{user.title}</div>
                            </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
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
