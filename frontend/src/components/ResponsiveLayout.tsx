import { useState, useEffect, createContext, useContext } from 'react';
import { Menu, X } from 'lucide-react';

// Simple cn utility for className concatenation
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ResponsiveLayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

const ResponsiveLayoutContext = createContext<ResponsiveLayoutContextType | null>(null);

export function useResponsiveLayout() {
  const context = useContext(ResponsiveLayoutContext);
  if (!context) {
    throw new Error("useResponsiveLayout must be used within a ResponsiveLayoutProvider");
  }
  return context;
}

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  showSidebar?: boolean;
}

export function ResponsiveLayout({ 
  children, 
  className, 
  sidebar, 
  header,
  showSidebar = false 
}: ResponsiveLayoutProps) {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1025) {
        setScreenSize('desktop');
      } else if (window.innerWidth >= 481) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const contextValue: ResponsiveLayoutContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    screenSize
  };

  if (screenSize === 'mobile' || !showSidebar) {
    return (
      <ResponsiveLayoutContext.Provider value={contextValue}>
        <div className={cn("min-h-screen bg-background", className)}>
          {header}
          <main className="p-4 pb-20">
            {children}
          </main>
        </div>
      </ResponsiveLayoutContext.Provider>
    );
  }

  if (screenSize === 'tablet') {
    const sidebarWidth = sidebarCollapsed ? '80px' : '280px';
    
    return (
      <ResponsiveLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen bg-background flex">
          {sidebar && (
            <aside 
              className={cn(
                "fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 transition-all duration-300 overflow-y-auto",
                sidebarCollapsed ? "w-20" : "w-70"
              )}
              style={{ width: sidebarWidth }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                {!sidebarCollapsed && <h2 className="font-semibold">Menu</h2>}
                {/* Sidebar collapse button */}
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="w-8 h-8 p-0 rounded transition flex items-center justify-center bg-transparent hover:bg-gray-100"
                >
                  {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>
              </div>
              {sidebar}
            </aside>
          )}
          <main 
            className="flex-1 transition-all duration-300 min-h-screen"
            style={{ marginLeft: sidebar ? sidebarWidth : '0' }}
          >
            <div className="p-6">
              {header}
              <div className={className}>
                {children}
              </div>
            </div>
          </main>
        </div>
      </ResponsiveLayoutContext.Provider>
    );
  }

  // Desktop layout
  const sidebarWidth = sidebarCollapsed ? '80px' : '320px';
  
  return (
    <ResponsiveLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background flex">
        {sidebar && (
          <aside 
            className={cn(
              "fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 transition-all duration-300 overflow-y-auto"
            )}
            style={{ width: sidebarWidth }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              {!sidebarCollapsed && <h2 className="font-semibold">Navigation</h2>}
              {/* Sidebar collapse button */}
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 p-0 rounded transition flex items-center justify-center bg-transparent hover:bg-gray-100"
              >
                {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </button>
            </div>
            {sidebar}
          </aside>
        )}
        <main 
          className="flex-1 transition-all duration-300 min-h-screen"
          style={{ marginLeft: sidebar ? sidebarWidth : '0' }}
        >
          <div className="p-8">
            {header}
            <div className={className}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </ResponsiveLayoutContext.Provider>
  );
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1025) {
        setScreenSize('desktop');
      } else if (window.innerWidth >= 481) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenSize;
}