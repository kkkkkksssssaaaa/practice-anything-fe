import { Chapter9Props } from "./types";

const styles = {
  wrapper: {
    padding: 16,
    display: "flex",
    flexDirection: "row" as "row",
    borderBottom: "1px solid grey",
  },
  greeting: {
    marginRight: 8,
  },
};

const Toolbar = (props: Chapter9Props) => {
  return (
    <div style={styles.wrapper}>
      {props.isLoggedIn && <span style={styles.greeting}>하잉</span>}

      {props.isLoggedIn ? (
        <button onClick={props.onClickLogout}>로그아웃</button>
      ) : (
        <button onClick={props.onClickLogin}>로그인</button>
      )}
    </div>
  );
};

export default Toolbar;
