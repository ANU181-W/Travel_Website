import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubContentItem {
  name: string;
  link: string;
}

interface AccordianProps {
  icon: JSX.Element;
  title: string;
  subContent: SubContentItem[];
  link?: string;
  onNavigate?: (link: string | undefined) => void;
}

const Accordian: React.FC<AccordianProps> = ({
  icon,
  title,
  subContent,
  link,
  onNavigate,
}) => {
  const handleNavigate = () => {
    if (onNavigate && link) {
      onNavigate(link);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title}>
        <AccordionTrigger>
          <span className="flex items-center" onClick={handleNavigate}>
            {icon}
            {link ? (
              <Link href={link}>
                <span className="ml-2">{title}</span>
              </Link>
            ) : (
              <span className="ml-2">{title}</span>
            )}
          </span>
        </AccordionTrigger>
        {subContent.length > 0 && (
          <AccordionContent>
            <ul>
              {subContent.map((item, index) => (
                <li key={index} className="p-2 hover:bg-gray-600">
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default Accordian;
