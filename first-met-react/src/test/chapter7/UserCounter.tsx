import { useState } from "react";

const useCounter = (initCounter: number) => {
  const [count, setCount] = useState(initCounter);

  const increaseCount = () => setCount((count) => count + 1);
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

  return [count, increaseCount, decreaseCount];
};

export default useCounter;
