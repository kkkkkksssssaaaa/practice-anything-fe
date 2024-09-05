import { Chapter10Props } from "./types";

const students: Chapter10Props[] = [
  {
    id: 1,
    name: "Inje",
  },
  {
    id: 2,
    name: "Steve",
  },
  {
    id: 3,
    name: "Bill",
  },
  {
    id: 4,
    name: "Jeff",
  },
];

const AttendanceBook = () => {
  return (
    <ul>
      {students.map((student: Chapter10Props) => {
        return <li key={student.id}>{student.name}</li>;
      })}
    </ul>
  );
};

export default AttendanceBook;
