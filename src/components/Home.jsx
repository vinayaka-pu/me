import React, { useState, useEffect } from "react";
import "./css/home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchdata, setSearchData] = useState([]);
  const [userinput, setUserinput] = useState("");
  useEffect(() => {
    async function getdata() {
      try {
        const datalist = await fetch(
          "https://72ih8opnm2.execute-api.ap-south-1.amazonaws.com/live",
          { mode: "cors" }
        );
        const finalData = await datalist.json();
        setData(finalData);
      } catch (err) {
        alert("Error fetching data");
      }
    }
    getdata();
  }, []);

  function handlechange(e) {
    setUserinput(e.target.value);
  }
  function handleinput() {
    if (userinput.length > 0) {
      setSearchData(
        data.filter((el) =>
          el.company_name.toLowerCase().includes(userinput.toLowerCase())
        )
      );
      document.getElementById("input").value = "";
    }
  }
  function finallocation(str) {
    if (str.length > 0) {
      let text = str.replace(/[{}"</div><div>]/g, "");
      return text;
    }
  }

  return (
    <div className="home">
      <div className="searchbox">
        <input type="text" id="input" onInput={(e) => handlechange(e)} />
        <button onClick={handleinput}>Search</button>
      </div>
      <div className="itembox">
        {searchdata.length > 0
          ? searchdata.map((e, id) => (
              <div className="item" key={id}>
                <p className="companyname">{e.company_name}</p>
                <p className="location">
                  {e.location.length > 2
                    ? finallocation(e.location)
                    : "Location Not Availble"}
                </p>
              </div>
            ))
          : data.map((e, id) => (
              <div className="item" key={id}>
                <p className="companyname">{e.company_name}</p>
                <p className="location">
                  {e.location.length > 2
                    ? finallocation(e.location)
                    : "Location Not Availble"}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
