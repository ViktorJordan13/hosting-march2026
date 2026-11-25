import { useState, useEffect} from "react";

// adresata na nasiot backend (vo tretiot cas ke ja smenime so Vercel adresata)
const API_URL = "http://localhost:5005";

function App(){
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    try{
      const res = await fetch(`${API_URL}/data`);
      const resData = await res.json();
      setData(resData);
    }catch(err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name.trim()) return; // ne prakjame prazno ime

    try{

      await fetch(`${API_URL}/data`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({name}),
      });

      setName(""); // go praznime inputot
      fetchData(); // povtorno gi zemame i prikazuvame site studenti

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  return(
    <>
      <h1>Frontend + Backend + MongoDB (MERN)</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vnesi ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Dodaj Student</button>
      </form>

      <div style={{ display: "flex", flexDirection: "column"}}>
          {data.map((d) => (
            <span key={d.id}>{d.name}</span>
          ))}
      </div>
    </>
  );
}

export default App;