import React, { useEffect, useState } from "react";
const Login = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");

  const handleLogin = () => {
    console.log(id, passwd);
    if (!id || !passwd) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    fetch(`/api/member?id=${id}&passwd=${passwd}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          alert(`반갑습니다. ${response.data.user.name}님.`);
          window.location.href = `http://localhost:3000/main?name=${response.data.user.name}&genre=${response.data.user.genre}`;
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요");
        }
      });
  };
  return (
    <>
      <h1>로그인</h1>
      아이디 : <input type={"text"} onChange={(e) => setId(e.target.value)} />
      <p></p>
      비밀번호 :{" "}
      <input type={"password"} onChange={(e) => setPasswd(e.target.value)} />
      <p></p>
      <button onClick={handleLogin}>로그인</button>
    </>
  );
};

export default Login;
