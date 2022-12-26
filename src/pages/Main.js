import React from "react";
const Main = () => {
  const handleUpdate = () => {
    fetch("api/movie", {
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h3>영화 랭킹</h3>
      <div>선호 하는 장르 : </div>
      <div>드라마, 판타지</div>
      <button>변경</button>

      <div>기준 : 20221225</div>
      <button onClick={handleUpdate}>갱신</button>
    </>
  );
};

export default Main;
