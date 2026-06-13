"use client"
import { TbLock } from "react-icons/tb";
import { CiUnlock, CiTrash } from "react-icons/ci";
import { FaUserAltSlash } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { useSelectedUsers } from "@/store/store";
import { toast } from 'sonner';
import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { selectedUsers } = useSelectedUsers();

    const { mutate, isPending } = useMutation({
        mutationFn: async (action: '/block' | '/unblock' | '/delete_users' | '/delete_unverified_users') => {
            const res = await axiosInstance.post(action, {
                emails: selectedUsers
            })
            return res.data
        },
        onSuccess: (data) => {
            router.refresh();
            toast.success(data.message || "Operation executed successfully")
        },
        onError: (error) => {
            toast.error(error.message || "Failed to execute")
        }
    })

    const { mutate: logoutMutate, isPending: logoutPending } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.get('/auth/logout')
            return res.data
        },
        onSuccess: (data) => {
            toast.success(data.message || "Logout success!")
            router.push('/login');
        },
        onError: (error) => {
            toast.error(error.message || "Failed to logout")
        }
    })

    return (
        <TooltipProvider>
            <nav className="w-full bg-gray-100 px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center gap-2 px-4 h-10 rounded-sm border border-sky-200 bg-white text-sky-600 font-medium transition-all duration-200 hover:bg-sky-50 hover:border-sky-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-100"
                                onClick={() => mutate('/block')}
                            >
                                <TbLock className="text-lg" />
                                Block
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Block</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center justify-center px-4 h-10 rounded-sm border border-sky-200 bg-white text-sky-600 font-medium transition-all duration-200 hover:bg-sky-50 hover:border-sky-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-100"
                                onClick={() => mutate('/unblock')}
                            >
                                <CiUnlock className="text-lg" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unblock</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center justify-center px-4 h-10 rounded-sm border border-red-200 bg-white text-red-600 font-medium transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100"
                                onClick={() => mutate('/delete_users')}
                            >
                                <CiTrash className="text-lg" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center justify-center px-4 h-10 rounded-sm border border-red-200 bg-white text-red-600 font-medium transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100"
                                onClick={() => mutate('/delete_unverified_users')}
                            >
                                <FaUserAltSlash className="text-lg" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Unverified</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div>
                    <button className="bg-sky-600 hover:bg-sky-700 text-white transition-colors h-10 px-4 py-2 rounded-sm"
                        onClick={() => logoutMutate()}
                        disabled={logoutPending}
                    >
                        Log out
                    </button>
                </div>
            </nav>
        </TooltipProvider>
    )
}