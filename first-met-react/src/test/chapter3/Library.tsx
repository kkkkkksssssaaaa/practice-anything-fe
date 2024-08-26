import Book from "./Book";

const Chapter3Library = () => {
  return (
    <div>
      <Book name="처음 만난 파이썬" numOfPage={300}></Book>
      <Book name="처음 만난 AWS" numOfPage={400}></Book>
      <Book name="처음 만난 리액트" numOfPage={500}></Book>
    </div>
  );
};

export default Chapter3Library;
