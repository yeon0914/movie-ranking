import React, { useState } from "react";
const Main = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    fetch("api/movie", {
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRanking(data.data);
        setLoading(false);
      })
      .catch(() => {
        alert("재시도해주세요");
        setLoading(false);
      });
  };

  const handleTableClick = (link) => {
    console.log(link);
    window.open("https://movie.naver.com" + link);
  };

  return (
    <>
      <h3>영화 랭킹</h3>
      <div>선호 하는 장르 : </div>
      <div>드라마, 판타지</div>
      <button>변경</button>

      <div>기준 : 20221225</div>
      <button onClick={handleUpdate} disabled={loading}>
        갱신
      </button>
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>순위</th>
            <th>포스터</th>
            <th>제목</th>
            <th>평점</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : ranking?.map((item) => (
                <tr
                  key={item.rank}
                  onClick={() => handleTableClick(item.link)}
                  style={{ cursor: "pointer" }}
                >
                  <th>{item.rank}</th>
                  <td>
                    <img src={item.poster} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.score.length ? item.score : "관람객 평점 없음"}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? <div>Loading...</div> : null}
    </>
  );
};

export default Main;
