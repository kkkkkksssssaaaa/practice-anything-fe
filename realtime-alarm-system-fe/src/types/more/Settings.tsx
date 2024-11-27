import { ReactElement } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";
import { MdOutlineHelpOutline } from "react-icons/md";

export interface Setting {
  icon: ReactElement;
  name: string;
  link: string;
}

export const settings: Setting[] = [
  {
    icon: <MdOutlinePerson />,
    name: "My bubble",
    link: "/my/subscribe",
  },
  {
    icon: <MdStorefront />,
    name: "STORE",
    link: "/store",
  },
  {
    icon: <AiOutlineNotification />,
    name: "Notice",
    link: "/notice",
  },
  {
    icon: <MdOutlineHelpOutline />,
    name: "FAQ",
    link: "/faq",
  },
];
