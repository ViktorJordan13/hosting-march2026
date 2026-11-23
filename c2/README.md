# MERN aplikacija 

### MongoDB Atlas

    - Besplatna MongoDB nerelaciona baza na podatoci vo cloud (M0 cluster)

    - Nas ni treba cloud baza na podatoci zatoa sto vo naredniot Cas 3 nasiot backend ke raboti na Vercel, a 
    Vercel ne moze da pristapi do baza na nasiot kompjuter

### .env datoteka i dotenv

    - Vo .env cuvame tajni podatoci (MONGO_USERNAME, MONGO_PASSWORD)

    - So require("dotenv).config() gi citame vrednostite od .env i gi stavame vo process.env

    - .env NIKOGAS ne se prikacuva na GitHub (zatoa e vo .gitignore)

    - .env.example go pokazvua formatot bez fistinski podatoci i se prikacuva na GitHub

### Mongoose

    - Schema - kako izgleda eden dokument vo bazata

    - Model - so nego citame i zapisuvame vo kolekcijata

    - Student.find() - gi vrakja studenti (getAll)

    - Student.create() - dodava nov student

    - MongoDB sama dodava _id za sekoj dokument (zatoa vo React koristime key={d._id})

### express.json()

    - Bez nego req.body e undefined kaj POST baranjata

### Kako da ja startuvame aplikacijata

    - Terminal 1: cd backend -> npm install -> npm run dev
    - Terminal 2: cd frontend -> npm install -> npm run dev