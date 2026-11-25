import { useState, useEffect} from "react";

// Lokalno: proxy-to na port 5005
// Na Vercel: VITE_API_URL e adresata na nasiot backend (ja vnesuvame vo Vercel -> Environment Variables)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"

function Section({ title, endpoint}){
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try{
      const res = await fetch(`${API_URL}/${endpoint}`);
      const resData = await res.json();

      if(!res.ok){
        setError(resData.message); // na pr, "Servisot ... ne e dostapen!"
        setData([]);
        return;
      }

      setError("");
      setData(resData);
    }catch(err) {
      console.log(err);
      setError("Proxy-to ne e dostapen!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name.trim()) return; // ne prakjame prazno ime

    try{

      await fetch(`${API_URL}/${endpoint}`,{
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
    <div>
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vnesi ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>

      {error && <p style={{color: "red"}}>{error}</p>}

      <div style={{ display: "flex", flexDirection: "column"}}>
          {data.map((d) => (
            <span key={d._id}>{d.name}</span>
          ))}
      </div>
  </div>
  );
}

function App(){
  return(
    <>
      <h1> MERN Microservices</h1>

      <div style={{display: "flex", gap: "60px"}}>
          <Section title="Studenti" endpoint="students" />
          <Section title="Kursevi" endpoint="courses" />
      </div>
    </>
  )
}

export default App;