import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Change = () => {
  const [genreType, setGenreType] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [name, setName] = useState(params.get("name"));
  const [genre, setGenre] = useState(params.get("genre"));

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

  return (
    <>
      <h1>선호 장르 변경</h1>
      선호 장르 :{" "}
      <select onChange={(e) => setGenre(e.target.value)}>
        <option value={"0"}>전체</option>
        {genreType.map((item) => (
          <option
            value={item.value}
            key={item.value}
            selected={item.value == genre}
          >
            {item.name}
          </option>
        ))}
      </select>
      <p></p>
      <button
        onClick={() =>
          (window.location.href = `http://localhost:3000/main?name=${name}&genre=${genre}`)
        }
      >
        변경완료
      </button>
    </>
  );
};

export default Change;
