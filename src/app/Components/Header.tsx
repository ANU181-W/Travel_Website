"use client";
import { useEffect, useState } from "react";
import SvgComponent from "./Applogo";
import { Globe, Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AlignJustify, CircleUserRound } from "lucide-react";
import { categories } from "../lib/categories";
import { Switch } from "@/components/ui/switch";
import { signIn, signOut, useSession } from "next-auth/react";
const Image = require("next/image").default;
export const Header = () => {
  const { data: session } = useSession();
  const [isactive, setActive] = useState(false);

  useEffect(() => {
    const element = document.querySelector(".main-header");
    function handlescroll() {
      const scrollpos = window.scrollY;
      if (scrollpos > 3) {
        setActive(true);
        element?.classList.add("show-item");
      } else {
        setActive(false);
        element?.classList.remove("show-item");
      }
    }
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  const categoryData = categories.categoryBar.categories;
  return (
    <div className="parent-container">
      <div className="main-header border-b-[1px] h-[25vh] border-solid pl-20 pr-20">
        <div className="flex h-20 items-center justify-between">
          <div className="z-10">
            <SvgComponent className="text-[red] " />
          </div>
          <div className="primary-header flex gap-9 ">
            <div>Stays</div>
            <div>Experiences</div>
            <div>Online Experiences</div>
          </div>
          <div className="flex gap-4 z-10">
            <div>Airbnb Your Home</div>
            <div>
              <Globe />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="btn">
                  <div className="flex p-2 border-solid border-[1px] rounded-full items-center gap-2 hover:shadow-xl mt-[-9px] ">
                    <AlignJustify />
                    {
                      <DropdownMenuLabel>
                        {session && session.user ? (
                          <Image
                            src={session.user?.image}
                            width={32}
                            height={32}
                            alt="user-profile"
                          ></Image>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CircleUserRound />
                          </div>
                        )}
                      </DropdownMenuLabel>
                    }
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="right-[-30px]">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-[#ebebeb] cursor-pointer">
                    Sign up
                  </DropdownMenuItem>
                  {session ? (
                    <DropdownMenuItem
                      className="hover:bg-[#ebebeb] cursor-pointer"
                      onClick={() =>
                        signOut({
                          callbackUrl: "http://localhost:3000/",
                        })
                      }
                    >
                      Log OUT
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="hover:bg-[#ebebeb] cursor-pointer"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "http://localhost:3000/",
                        })
                      }
                    >
                      Log In
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem className="hover:bg-[#ebebeb] cursor-pointer">
                    Airbnb your home
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#ebebeb] cursor-pointer">
                    Help Center
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="primary-header flex w-full justify-center">
          <div className="mb-[25px] flex w-fit min-w-[60%] justify-between rounded-full border-[1px] border-solid pb-2 pl-6 pt-2 shadow-lg">
            <div>
              <div>Where</div>
              <div className="text-[#7d7d7d]">Search destinations</div>
            </div>
            <div>
              <div>Check in</div>
              <div className="text-[#7d7d7d]">Add Dates</div>
            </div>
            <div>
              <div>Check Out</div>
              <div className="text-[#7d7d7d]">Add Dates</div>
            </div>
            <div>
              <div>Who</div>
              <div className="text-[#7d7d7d]">Add guests</div>
            </div>
            <div className="mr-3 h-12 w-12 rounded-full bg-red-500">
              <Search className="mt-[12px] ml-[12px] text-[#ffffff]" />
            </div>
          </div>
        </div>
        <div className="secondary-header flex w-full justify-center ">
          <div className="flex w-fit justify-between gap-10 rounded-full border-[1px] border-solid pb-2 pl-6 pt-2 hover:shadow-lg items-center">
            <div>
              <div>Anywhere</div>
            </div>
            <div>
              <div>Any Week</div>
            </div>
            <div>
              <div>Add Guests</div>
            </div>

            <div className="mr-3 aspect-square h-8 w-8 rounded-full bg-red-500">
              <Search className="mt-[4px] ml-[6px] w-[20px] text-[#ffffff]" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`filter-header h-20 px-20 fixed w-full bg-[#ffff] ${
          isactive ? `active` : `inactive`
        } flex items-center  justify-between`}
      >
        <Carousel className="w-[68%]">
          <CarouselContent className="-ml-1">
            {Array.from(categoryData).map((item, index) => (
              <CarouselItem key={index} className="pl-1 basis-auto">
                <div className="p-1">
                  <Card className="shadow-none border-0">
                    <CardContent className="flex flex-col items-center justify-center p-4 ">
                      <Image
                        width={30}
                        height={30}
                        src={item.imageUrl}
                        alt="category-image"
                      />
                      <span className="text-sm font-normal opacity-55">
                        {item.title}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="next-btn" />
          <CarouselNext className="next-btn" />
        </Carousel>

        <button className="border flex p-3 items-center rounded-xl cursor-pointer  hover:border-black hover:bg-[#f7f7f7]">
          <SlidersHorizontal className="mr-2 w-4 h-4" />
          <div className="leading-[1.15rem] text-[0.75rem] font-medium">
            Filters
          </div>
        </button>

        <div className="border flex p-3 items-center rounded-xl cursor-pointer gap-2  hover:border-black hover:bg-[#f7f7f7]">
          <div className="leading-[1.15rem] text-[0.75rem] font-medium">
            Display total before taxes
          </div>
          <Switch className="text-muted-foreground" />
        </div>
      </div>
      <div
        className={`content-section px-20 py-20 grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 absolute -z-10  ${
          isactive ? `mt-[21vh]` : `mt-[30vh]`
        }`}
      >
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>

        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
        <div className="card flex flex-col">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-53371625/original/b230521e-d33c-4c5e-a2ba-d1d5277ade92.jpeg?im_w=720"
            className="aspect-square w-[262px] object-cover"
          />
          <span>jaipur</span>
          <span>208 kilometer</span>
          <span>27 may </span>
          <span>RS.11601</span>
        </div>
      </div>
    </div>
  );
};
