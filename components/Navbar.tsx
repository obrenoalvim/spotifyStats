'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, Music, User, LogOut, Home, TrendingUp } from 'lucide-react';
import { useSpotifyAuth } from '@/hooks/useSpotify';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useSpotifyAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/top-tracks', label: 'Top Tracks', icon: Music },
    { href: '/top-artists', label: 'Top Artists', icon: TrendingUp },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors ${
            mobile ? 'py-2' : ''
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                SpotifyStats
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-green-500/10"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {user && (
              <>
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarImage src={user.images?.[0]?.url} alt={user.display_name} />
                          <AvatarFallback>
                            {user.display_name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="md:hidden">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px]">
                      <div className="flex flex-col space-y-6 mt-6">
                        <div className="flex items-center space-x-3 pb-4 border-b">
                          <Avatar>
                            <AvatarImage src={user.images?.[0]?.url} alt={user.display_name} />
                            <AvatarFallback>
                              {user.display_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.display_name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        
                        <nav className="flex flex-col space-y-4">
                          <NavLinks mobile />
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                          >
                            <User size={18} />
                            <span>Profile</span>
                          </Link>
                        </nav>
                        
                        <Button
                          variant="destructive"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                          className="w-full justify-start"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}