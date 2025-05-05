
import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  LineChart, 
  Menu, 
  X,
  LogOut,
  BellIcon
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isInitialized, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to login if not authenticated
  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const mainNavItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      active: location.pathname === '/dashboard' 
    },
    { 
      name: 'Configurar Campanha', 
      href: '/dashboard/campaign-setup', 
      icon: Settings,
      active: location.pathname === '/dashboard/campaign-setup' 
    },
    { 
      name: 'Pipeline de Leads', 
      href: '/dashboard/leads', 
      icon: Users,
      active: location.pathname === '/dashboard/leads' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navbar */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/dashboard" className="text-xl font-bold text-saac-blue">SAAC</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-saac-blue"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`bg-gray-800 w-64 border-r border-gray-700 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static h-[calc(100vh-56px)] z-10`}
        >
          <nav className="p-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors hover:bg-gray-700 ${
                    item.active ? 'bg-saac-blue text-white' : 'text-gray-300'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Campanhas Recentes
              </h3>
              <div className="mt-3 space-y-1">
                <Link
                  to="/dashboard/campaign/1"
                  className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
                >
                  <LineChart className="h-4 w-4 mr-3" />
                  Growth Hack B2B
                </Link>
                <Link
                  to="/dashboard/campaign/2"
                  className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
                >
                  <LineChart className="h-4 w-4 mr-3" />
                  Expansão Varejo
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
