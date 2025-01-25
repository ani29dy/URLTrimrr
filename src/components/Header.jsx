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
const Header = () => {
  const navigate = useNavigate();

  const user = true;

  return (
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ani_2916</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mt-0.5 h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-800">
                <LogOut className="mt-0.5 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
