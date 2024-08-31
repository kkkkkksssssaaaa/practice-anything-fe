import React, { useEffect, useRef } from "react";
import { Chapter6Props } from "./types";

const styles = {
  wrapper: {
    margin: 8,
    padding: 8,
    display: "flex",
    flexDirection: "row" as "row",
    border: "1px solid grey",
    borderRadius: 16,
  },
  messageText: {
    color: "black",
    fontSize: 16,
  },
};

export const Notification = (props: Chapter6Props) => {
  const mounted = useRef(false);

  useEffect(() => {
    console.log(`${props.id} component mounted`);

    return () => {
      console.log(`${props.id} component unmounted`);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log(`${props.id} component update`);
    }
  });

  return (
    <div style={styles.wrapper}>
      <span style={styles.messageText}>{props.message}</span>
    </div>
  );
};
