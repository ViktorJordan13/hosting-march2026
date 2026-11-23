import { useState, useEffect} from "react";

// adresata na nasiot backend (vo tretiot cas ke ja smenime so Vercel adresata)
const API_URL = "http://localhost:5005";

function App(){
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try{
      const res = await fetch(`${API_URL}/data`);
      const resData = await res.json();
      setData(resData);
    }catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  return(
    <>
      <h1>Frontend + Backend (Full Stack)</h1>
      <div style={{ display: "flex", flexDirection: "column"}}>
          {data.map((d) => (
            <span key={d.id}>{d.name}</span>
          ))}
      </div>
    </>
  );
}

export default App;