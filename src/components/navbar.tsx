"use client"
import {  Heart, Search, ShoppingCart, User} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Input } from "./ui/input";
import { Avatar, AvatarBadge, AvatarFallback} from "./ui/avatar";
import Link from "next/link";
import { WishlistContext } from "@/context/wishlistContext";
import { signOut, useSession } from "next-auth/react";
import {

  LogOutIcon,

  UserIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext } from "react";
import { cartContext } from "@/context/cartContext";







const Navbar = () => {
 const { noOfWishlistItems } = useContext(WishlistContext) as { noOfWishlistItems: number };
  const session = useSession()

 
  const cart = useContext(cartContext) as { noOfCartItems: number }
  const { noOfCartItems } = cart

  function logOutUser (){
    signOut({callbackUrl : "/login"})
  }
  return (

    
    <nav className="h-16 border-b bg-background fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex h-full max-w-(--breakpoint-lg) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
         <Link href="/" > <Logo /> </Link> 

          {/* Desktop Menu */}
           <div className="relative hidden md:block">
            <Search className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
            <Input
              className="w-[280px] flex-1 rounded-full border-none bg-muted pl-10 shadow-none"
              placeholder="search"
            />
          </div>
          <NavMenu className="hidden md:block" />
        </div>

     




<div className= "flex ">


{session.status == "authenticated"? <>
<Link href={"/cart"} className="px-3">
 <Avatar className="" >
      <AvatarFallback className= "border-[none]">
        <ShoppingCart className="size-7" />
      </AvatarFallback >
      
      <AvatarBadge className="top-0 text-[7px] p-2  ">
        <span>{noOfCartItems}</span>
      </AvatarBadge>
    </Avatar>



</Link>

<Link href={"/wishlist"} className="px-3">
 <Avatar className="" >
      <AvatarFallback className= "border-[none]">
        <Heart className="size-7" />
      </AvatarFallback >
      
      <AvatarBadge className="top-0 text-[7px] p-2  ">
        <span>{noOfWishlistItems}</span>
      </AvatarBadge>
    </Avatar>



</Link>

 <DropdownMenu>

      <DropdownMenuTrigger asChild >
       <Button variant="outline">{session.data.user?.name.split(" ")[0]}</Button>
        
         </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>


        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOutUser} variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
</> : <>
<Button  >

<Link className="flex  justify-center align-center" href="/login">
Login  <User/> 
</Link>

</Button>

</> }


<div/>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
