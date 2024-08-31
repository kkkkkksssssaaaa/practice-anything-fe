import React, { useEffect, useRef, useState } from "react";
import { Chapter6Props } from "./types";
import { Notification } from "./Notification";
import { clearInterval } from "timers";

const reservedNotifications: Chapter6Props[] = [
  {
    id: 1,
    message: "안녕하세요, 오늘 일정을 알려드립니다.",
  },
  {
    id: 2,
    message: "점심 식사 시간입니다.",
  },
  {
    id: 3,
    message: "이제 곧 미팅이 시작됩니다.",
  },
];

const NotificationList = () => {
  const [notifications, setNotificaitons] = useState(reservedNotifications);
  const interval = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    interval.current = setInterval(() => {
      const index = notifications.length;

      notifications.push(reservedNotifications[index]);

      setNotificaitons(notifications);
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      {notifications.map((notificaiton: Chapter6Props) => {
        return (
          <Notification id={notificaiton.id} message={notificaiton.message} />
        );
      })}
    </div>
  );
};

export default NotificationList;
