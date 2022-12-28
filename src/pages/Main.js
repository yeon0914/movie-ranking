import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GenreType = {
  0: "전체",
  1: "드라마",
  2: "판타지",
  4: "공포",
  5: "멜로/애정/로맨스",
  6: "모험",
  7: "스릴러",
  8: "느와르",
  10: "다큐멘터리",
  11: "코미디",
  12: "가족",
  13: "미스터리",
  14: "전쟁",
  15: "애니메이션",
  16: "범죄",
  17: "뮤지컬",
  18: "SF",
  19: "액션",
};

const Main = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState("");
  const [name, setName] = useState(params.get("name"));
  const [genre, setGenre] = useState(params.get("genre"));

  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = () => {
    fetch(`api/movie/current`, {
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpdate(data.data.update);
        setRanking(data.data.movie);
      })
      .catch(() => {});
  };

  const handleUpdate = () => {
    setLoading(true);
    fetch(`api/movie/update?genre=${genre}`, {
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRanking(data.data.movie);
        setUpdate(data.data.update);
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
      <h1>영화 랭킹</h1>
      {name ? (
        <>
          <h3>안녕하세요 {name}님</h3>

          <p></p>
          <div style={{ float: "left" }}>선호 하는 장르 : </div>
          <div style={{ float: "left" }}>
            &nbsp;{GenreType[parseInt(genre)]}&nbsp;
          </div>
          <Link to={`/Change?name=${name}&genre=${genre}`}>변경</Link>

          <p></p>
          <div style={{ float: "left" }}>업데이트 날짜: {update}&nbsp;</div>
          <button onClick={handleUpdate} disabled={loading}>
            갱신
          </button>
          <p></p>
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
                      <td>
                        {item.score.length ? item.score : "관람객 평점 없음"}
                      </td>
                      <td>{item.category}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {loading ? <div>Loading...</div> : null}
        </>
      ) : (
        <>
          <div style={{ float: "left" }}>로그인을 해주세요&nbsp;</div>
          <Link to={"/login"}>로그인</Link>&nbsp;
          <Link to={"/signup"}>회원가입</Link>
        </>
      )}
    </>
  );
};

export default Main;
