import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/firebase";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Agents", href: "/agents" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-110 transition-transform">
            S
          </div>
          <span className={`font-display font-bold text-xl tracking-wide ${scrolled ? 'text-foreground' : 'text-foreground'}`}>
            Serenity
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary font-bold" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span className="text-xs font-medium truncate max-w-[100px]">
                  {user.displayName?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              {user ? (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {user.photoURL && (
                      <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="font-medium">{user.displayName}</span>
                  </div>
                  <button onClick={() => logout()} className="text-destructive font-medium text-sm">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
