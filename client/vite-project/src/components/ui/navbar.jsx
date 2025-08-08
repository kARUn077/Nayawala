import { Menu, School2 } from "lucide-react";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "@/features/authSlice";
import DarkMode from "@/Darkmode";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutUserHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedOut());
      toast.success(data?.message || "User logged out successfully");
      navigate("/login");
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
   // <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-white dark:from-[#0c0c0c] dark:to-[#1a1a1a] border-b border-gray-200 dark:border-black/10 shadow-md transition-colors duration-300">
    <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-100 to-white dark:from-[#111827] dark:to-[#1f2937] border-b border-gray-300 dark:border-gray-700 shadow-sm transition-all duration-300 ease-in-out">


  {/* Desktop View */}
  <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
      <School2 size={26} className="text-blue-700 dark:text-white" />
      <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white tracking-wide">
        Learnifinity
      </h1>
    </Link>

    <div className="flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{user?.name?.slice(0, 2)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg">
            <DropdownMenuLabel className="text-gray-800 dark:text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/my-learning" className="w-full block hover:text-blue-600">My Learning</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/profile" className="w-full block hover:text-blue-600">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={LogoutUserHandler} className="hover:text-red-600">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {user.role === "instructor" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/admin/dashboard" className="w-full block hover:text-green-700">Dashboard</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => navigate("/login")}>Login</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      )}
      <DarkMode />
    </div>
  </div>

  {/* Mobile View */}
  <div className="md:hidden flex items-center justify-between px-4 h-full">
    <Link to="/" className="flex items-center gap-2">
      <School2 size={24} className="text-blue-700 dark:text-white" />
      <h1 className="font-bold text-xl text-gray-800 dark:text-white">E-learning</h1>
    </Link>
    <MobileNavbar user={user} onLogout={LogoutUserHandler} />
  </div>
</header>

  );
};

export default Navbar;

const MobileNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-blue-100 text-blue-700 dark:bg-white/10 dark:text-white hover:bg-blue-200 dark:hover:bg-white/20 backdrop-blur"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:bg-[#0c0c0c] bg-white text-gray-800 dark:text-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-lg font-bold">Learnifinity</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-4 mx-5">
          {user ? (
            <>
              <Link to="/my-learning" className="hover:text-blue-600">My Learning</Link>
              <Link to="/profile" className="hover:text-blue-600">Edit Profile</Link>
              <span onClick={onLogout} className="cursor-pointer hover:text-red-600">Log Out</span>
              {user.role === "instructor" && (
                <Link
                  to="/admin/dashboard"
                  className="text-center mt-6 bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition"
                >
                  Dashboard
                </Link>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => navigate("/login")}>Login</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/signup")}>Signup</Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
