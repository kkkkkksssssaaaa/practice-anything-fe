import Comment from "./Comment";
import { Chapter5Props } from "./types";

const comments: Chapter5Props[] = [
  {
    name: "하이",
    comment: "하이하이",
  },
  {
    name: "의문세",
    comment: "눈빛이 참 맑으시내여",
  },
  {
    name: "빵상",
    comment: "빵상빵상 👽",
  },
];

const CommentList = () => {
  return (
    <div>
      {comments.map((comment: Chapter5Props) => {
        return <Comment name={comment.name} comment={comment.comment} />;
      })}
    </div>
  );
};

export default CommentList;
