import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("남자");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert(`이름: ${name} 성별: ${gender}`);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        <input type="text" value={name} onChange={handleChangeName} />
      </label>
      <label>
        성별:
        <select value={gender} onChange={handleChangeGender}>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
  );
};

export default SignUp;
