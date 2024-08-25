"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import Accordian from "@/app/Components/Accordian";
interface SubContentItem {
  name: string;
  link: string;
}

interface AdminContentItem {
  icon: JSX.Element;
  title: string;
  subContent: SubContentItem[];
  link?: string;
}

const adminContent: AdminContentItem[] = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    subContent: [],
    link: "../Components/admin_components/CreateProduct",
  },
  {
    icon: <FaUser />,
    title: "Users",
    subContent: [
      {
        name: "Create User",
        link: "../Components/admin_components/CreateUser",
      },
      { name: "All Users", link: "../Components/admin_components/Users" },
    ],
  },
  {
    icon: <ShoppingCart />,
    title: "Products",
    subContent: [
      {
        name: "Create Product",
        link: "/createProduct",
      },
      { name: "All Products", link: "/GetProduct" },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleNavigation = (link: string | undefined) => {
    if (link) {
      router.push(link);
      console.log("link:", link);
    }
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isOpen ? "w-64" : "w-16"
      } md:w-64 duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        <h1
          className={`font-bold text-lg ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          Admin Panel
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <FaCog />
        </button>
      </div>
      <nav className="flex-grow mt-10">
        {adminContent.map((content, index) => (
          <Accordian
            key={index}
            icon={content.icon}
            title={content.title}
            subContent={content.subContent}
            link={content.link}
            onNavigate={handleNavigation}
          />
        ))}
      </nav>
      <div className="p-4">
        <button className="bg-gray-700 p-2 w-full rounded-md text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
