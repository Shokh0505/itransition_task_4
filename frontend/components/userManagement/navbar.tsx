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
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const { selectedUsers } = useSelectedUsers();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            console.error(error);
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
            <nav className="w-full bg-gray-100 px-4 md:px-12 py-4 flex items-center justify-between relative">
                <button
                    className="sm:hidden px-4 h-10 bg-white text-sky-600 font-medium rounded-sm border border-sky-200 hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    Actions
                </button>

                {isMobileMenuOpen && (
                    <div
                        className="sm:hidden fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
                <div className={`
                   navbar 
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 
                `}>
                    <div className="sm:hidden w-full flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">Actions</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 px-2 py-1">
                            ✕
                        </button>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex items-center justify-center sm:justify-start gap-2 px-4 h-10 rounded-sm border border-sky-200 bg-white text-sky-600 font-medium transition-all duration-200 hover:bg-sky-50 hover:border-sky-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-100 sm:focus:ring-offset-1"
                                onClick={() => mutate('/block')}
                            >
                                <TbLock className="text-lg" />
                                <span className="sm:hidden lg:inline">Block</span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Block</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex items-center justify-center sm:justify-start gap-2 px-4 h-10 rounded-sm border border-sky-200 bg-white text-sky-600 font-medium transition-all duration-200 hover:bg-sky-50 hover:border-sky-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-100 sm:focus:ring-offset-1"
                                onClick={() => mutate('/unblock')}
                            >
                                <CiUnlock className="text-lg" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unblock</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center justify-center sm:justify-start gap-2 px-4 h-10 rounded-sm border border-red-200 bg-white text-red-600 font-medium transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100 sm:focus:ring-offset-1"
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
                        <TooltipTrigger asChild>
                            <div className="flex items-center justify-center sm:justify-start gap-2 px-4 h-10 rounded-sm border border-red-200 bg-white text-red-600 font-medium transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100 sm:focus:ring-offset-1"
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