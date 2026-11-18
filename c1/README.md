# Full Stack aplikacija

### Dvoslojna (two-tier) aplikacija

```
    Prelistuvac (korisnik)
  ┌───────────────────────┐         request          ┌───────────────────────┐
  │   Frontend (React)    │  ─────────────────────►  │   Backend (Express)   │
  │ http://localhost:5173 │  ◄─────────────────────  │ http://localhost:5005 │
  └───────────────────────┘     response (JSON)      └───────────────────────┘
```

- Frontend (klient) - React aplikacija sto ja gleda korisnikot vo prelistuvacot

- Backend (server) - Node.js + Express aplikacija sto gi cuva i gi vraka podatocite

- Frontend-ot ispraka baranje (request) do backend-ot, a backend-ot vraka odgovor (response) vo JSON format

Stom aplikacijava e gotova i ja hostirame, togas nie userite sme klientite, a celata aplikacija e neli na nekoj server

### Proxy (posrednik)

- sluzi kako posrednik megu klientot i serverot, toj moze da bide konfiguriran da gi prenasocuva baranjata na klientite do
odreden mikroservis

### Monorepo

- site servisi se vo edne repoziritorium

### Microservice

- sekoj servis e vo poseben repozitorium

### Unificirana zaednicka konfiguraciska datoteka

    - config.json - za spolena konfiguracija
    - package.json - za da se startuvaat site mikroservisi

### CORS

    - Prelistuvacot ne dozvoluva strana od edna adresa (localhost:5173) da cita podatoci od
    druga adresa (localhost: 5005)

    - So app.user(cors()) na backend-ot dozvoluvame sekoj frontend da gi cita nasite podatoci

### Kako da ja startuvame aplikacijata

    - Terminal 1: cd backend -> npm install -> npm run dev
    - Terminal 2: cd frontend -> npm install -> npm run dev

### Vercel (Cas 3)

    - Vercel e platforma za hostiranje i avtomatsko prikacuvanje na veb-aplikacii, najcesto koristena za frontend ramki kako
    Next.js, no isto taka podrzuva i backend funkcii, vklucuvajki Node.js

    - "version": 2 - verzijata na konfiguracijata sto ja koristi Vercel

    - "rewrites" - ova pole ovozmozuva da se pravata URL prezapisuvanja (rewrites).

    - source "/(.\*)" - go opfaka sekoe baranje koe doaga od serverot, bez razlika na patekata

    - destination "/api" - site pateki se interno prenasocuvaat (prezapisuvaat) kon /api rutata