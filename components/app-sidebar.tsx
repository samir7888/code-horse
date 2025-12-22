"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { BookOpen, Github, GithubIcon, LogOut, MoonIcon, Settings, SunIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut as Logout } from '@/modules/auth/components/LogOut'
import { title } from 'process'
const AppSidebar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, [])

    const navigationsItems = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: BookOpen
        },
        {
            title: 'Repository',
            url: '/dashboard/repository',
            icon: Github
        },
        {
            title: 'Reviews',
            url: '/dashboard/reviews',
            icon: BookOpen
        },
        {
            title: 'Subscription',
            url: '/dashboard/subscription',
            icon: BookOpen
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings
        }
    ]

    const isActive = (url: string) => {
        return pathname === url || pathname.startsWith(url + '/dashboard');
    }

    if (!mounted || !session) return null;

    const user = session.user;
    const userName = user.name || 'GUEST';
    const userEmail = user.email;

    const userInitials = userName.split(" ").map(name => name[0]).join('').toUpperCase();

    return (
        <Sidebar>
            <SidebarHeader className='border-b border-foreground/20'>
                <div className='px-3 py-4 flex items-center gap-2'>
                    <div>
                        <GithubIcon size={32} />
                    </div>
                    <div className='flex-1'>
                        <p className=' font-semibold'>Connected Account</p>
                        <span aria-label={'username: ' + userName}>@{userName}</span>

                    </div>

                </div>
            </SidebarHeader>

            <SidebarContent>


                <SidebarMenu className='gap-2 py-6'>
                    {
                        navigationsItems.map((item) => {
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={title}
                                        className={`h-11 px-4 rounded-lg transition-all duration-200, ${isActive(item.url) ? 'bg-foreground/20'
                                            :
                                            ""
                                            }`}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span className='text-lg font-semibold '>{item.title}</span>
                                        </Link>

                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            )
                        })
                    }

                </SidebarMenu>

            </SidebarContent>

            <SidebarFooter className='border-t border-foreground/20'>
                <SidebarMenu className='gap-2 py-4'>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    className='h-11 px-4 rounded-lg transition-all duration-200 hover:bg-foreground/10  flex items-center gap-3'>
                                    <Avatar>
                                        <AvatarImage src={user.image || ''} alt={userName} />
                                        <AvatarFallback className='w-8 h-8 rounded-full bg-foreground/30 flex items-center justify-center text-lg font-semibold'>
                                            {userInitials}
                                        </AvatarFallback>

                                    </Avatar>
                                    <div className='flex-1 text-left'>
                                        <p className='font-semibold'>{userName}</p>
                                        <span className='text-sm text-foreground/50'>{userEmail}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-80 rounded-lg'
                                align='end'
                                side='right'
                                sideOffset={8}>
                                <div>
                                    <DropdownMenuItem asChild>
                                        <button onClick={() => {
                                            setTheme(theme === 'light' ? 'dark' : 'light')
                                        }}
                                            className='w-full px-3 py-3 flex items-center justify-center'
                                        >
                                            {
                                                theme === 'dark' ?
                                                    (
                                                        <>
                                                            <SunIcon className='mr-2 shrink-0' />
                                                            <span>Light Mode</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MoonIcon className='mr-2 shrink-0' />
                                                            <span>Dark Mode</span>
                                                        </>
                                                    )
                                            }
                                        </button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <button className='w-full px-3 py-3 flex items-center justify-center'>
                                            <Logout className='flex items-center justify-center w-full gap-1'>
                                                <LogOut className='mr-2 shrink-0' size={4} />
                                                <span className='ml-2'>Log Out</span>

                                            </Logout>
                                        </button>
                                    </DropdownMenuItem>
                                </div>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}

export default AppSidebar