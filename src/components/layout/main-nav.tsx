'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, MessagesSquare, Sparkles, Settings } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/chat', label: 'Chat', icon: MessagesSquare },
  { href: '/generate', label: 'Generate', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <SidebarMenu className="p-2">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        const isCollapsed = state === 'collapsed';

        const buttonContent = (
             <Link href={link.href} className="flex w-full items-center gap-2">
                <Icon className="shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
        )

        return (
          <SidebarMenuItem key={link.href}>
            {isCollapsed ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isActive}>
                           {buttonContent}
                        </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                        <p>{link.label}</p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <SidebarMenuButton asChild isActive={isActive}>
                     {buttonContent}
                </SidebarMenuButton>
            )}

          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
