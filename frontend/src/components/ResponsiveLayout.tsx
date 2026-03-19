import { useState, useEffect, createContext, useContext } from 'react';

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
  header
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

  if (screenSize === 'mobile') {
    return (
      <ResponsiveLayoutContext.Provider value={contextValue}>
        <div className={cn("min-h-screen bg-[#f9fafb]", className)}>
          {header}
          <main className="p-4 pb-24">
            {children}
          </main>
          {/* Mobile Bottom Navigation */}
          {sidebar && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] shadow-xl rounded-t-2xl z-40">
              <div className="overflow-x-auto">
                <div className="p-2 flex gap-1 justify-around">
                  {sidebar}
                </div>
              </div>
            </div>
          )}
        </div>
      </ResponsiveLayoutContext.Provider>
    );
  }

  if (screenSize === 'tablet') {
    const sidebarWidth = sidebarCollapsed ? '80px' : '280px';
    
    return (
      <ResponsiveLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen bg-[#f9fafb] flex">
          {sidebar && (
            <aside 
              className={cn(
                "fixed left-0 top-0 bottom-0 bg-[#ffffff] shadow-lg z-40 transition-all duration-300 overflow-y-auto"
              )}
              style={{ width: sidebarWidth }}
            >
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
  const sidebarWidth = '280px';
  
  return (
    <ResponsiveLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[#f9fafb] flex">
        {sidebar && (
          <aside 
            className={cn(
              "fixed left-0 top-0 bottom-0 bg-[#ffffff] shadow-lg z-40 overflow-y-auto"
            )}
            style={{ width: sidebarWidth }}
          >
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