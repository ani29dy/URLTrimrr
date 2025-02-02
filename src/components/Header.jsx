import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../Context";
import useFetch from "../hooks/useFetch";
import { logout } from "../db/APIAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <nav className="flex justify-between items-center py-4">
        <Link to="/">
          <img src="./logo.png" className="h-16" alt="Trimrr Logo" />
        </Link>
        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-white text-black cursor-pointer"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/dashboard"} className="flex">
                    <LinkIcon className="mt-0.5 h-4 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-800">
                  <LogOut className="mt-0.5 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
