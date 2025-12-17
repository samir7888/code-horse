"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface LogOutProps {
    children: React.ReactNode;
    className?: string;
}
export const LogOut: React.FC<LogOutProps> = ({ children, className }) => {
    const router = useRouter();
    return (
        <span onClick={() => signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login')
                }
            }
        })} className={className}>
            {children}
        </span>
    )
}