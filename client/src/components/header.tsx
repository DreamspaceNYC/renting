import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  const handleSignOut = () => {
    window.location.href = "/api/logout";
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 sticky-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">RentRushNYC</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-neutral-900 hover:text-primary font-medium transition-colors">
                Rent
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                Neighborhoods
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                NYC Guide
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  {user?.profileImageUrl ? (
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-neutral-600" />
                  )}
                  <span className="text-sm text-neutral-700 hidden md:block">
                    {user?.firstName || user?.email}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-neutral-600 hover:text-primary hidden md:flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleSignIn}
                className="text-neutral-600 hover:text-primary hidden md:block"
              >
                Sign In
              </Button>
            )}
            <Button className="bg-primary text-white hover:bg-primary-dark transition-colors">
              Save Homes
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <a href="/" className="text-neutral-900 hover:text-primary font-medium transition-colors">
                    Rent
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    Neighborhoods
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    NYC Guide
                  </a>
                  <hr className="my-4" />
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    Sign In
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
