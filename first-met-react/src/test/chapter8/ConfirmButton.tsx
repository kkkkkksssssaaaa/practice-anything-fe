import { useState } from "react";

const ConfirmButton = () => {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleConfirm = () => {
    setIsConfirm((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleConfirm}>
        {isConfirm ? "확인됨" : "확인하기"}
      </button>
      <p>{String(isConfirm)}</p>
    </div>
  );
};

export default ConfirmButton;
