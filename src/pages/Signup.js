import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [genreType, setGenreType] = useState([]);
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [genre, setGenre] = useState("0");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/genre/type", {
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGenreType(data.data);
      })
      .catch(() => {});
  }, []);

  const handleSignUp = () => {
    console.log(id, passwd, genre);

    if (!id || !passwd || !name) {
      alert("모두 입력하세요");
      return;
    }
    fetch("/api/member", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        passwd: passwd,
        genre: genre,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          alert("회원가입 성공. 로그인하세요.");
          window.location.href = "http://localhost:3000/login";
        }
      });
  };

  return (
    <>
      <h1>회원가입</h1>
      아이디 : <input type={"text"} onChange={(e) => setId(e.target.value)} />
      <p></p>
      비밀번호 :{" "}
      <input type={"password"} onChange={(e) => setPasswd(e.target.value)} />
      <p></p>
      이름 : <input type={"text"} onChange={(e) => setName(e.target.value)} />
      <p></p>
      선호 장르 :{" "}
      <select defaultChecked={"all"} onChange={(e) => setGenre(e.target.value)}>
        <option value={"0"}>전체</option>
        {genreType.map((item) => (
          <option value={item.value} key={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <p></p>
      <button onClick={handleSignUp}>회원가입</button>
      <p></p>
      <Link to={"/login"}>로그인으로 이동</Link>
    </>
  );
};

export default Signup;
