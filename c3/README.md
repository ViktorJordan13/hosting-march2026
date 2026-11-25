# Microservices, Proxy i hostiranje na Vercel

### Od edna aplikacija (minatite casovi) do mikroservisi (ovoj cas)

    - Na minatite casoi nie imavme eden backend (api/index.js) koj pravese se - toa e monolith (monorepo)

    - Na ovoj cas ke imame dva mali servisi - eden za students i eden za courses. Sekoj od niv si ima svoja funkcija(rabota),
    svoj port i se startuva posebno

    - Dvata servisa rabotat na ist nacin (MongoDB model + GET i POST ) - razlikata e samo vo tipot na podatoci so koi rakuvaat

### Microservices

    - Namesto edna golema aplikacija sto se startuva naednas, imame poveke pomali servisi

    - Ako eden servis padne, drugite dva prodolzuvaat da rabotat

```

 Frontend (React :5173)
          │
          ▼
  ┌─────────────────┐
  │  Proxy  :5005   │
  └─────────────────┘
     │ /students    │ /courses
     ▼              ▼
  ┌────────────┐  ┌────────────┐
  │ students   │  │ courses    │
  │ :5001      │  │ :5002      │
  └────────────┘  └────────────┘
     │              │
     ▼              ▼
  ┌─────────────────────────┐
  │      MongoDB Atlas      │
  └─────────────────────────┘

```

### Proxy

    - sluzi kako posrednik pomegu klientot i serverot, toj moze da bide konfiguriran da gi prenesuva baranjata
    na klientite do odreden mikroservis

    - Primer: kelnerot vo restoran vi e proxy-to. Nie ne odime do kujnata ili do sankot na restoranot, vo zavistnosst od dali
    sme naracale samo jadenje ili samo pienje ili dvete, kelnerot e toj sto znae kade treba da ja odnese narackata i da ni gi donese
    pienjeto ili jadenjeto ili dvete

    - Frontendot poznava i komunicira samo so edna adresa/port-5005 (vo primerot toa e kelner) - ne mora da znae kade se naogaat servisite
    (kako sto nie ne mora da znaeme kade se kujnata i sankot)

### Lokalno vs Vercel

| | Локално                                     | Vercel |

| students сервис | api/students.js – порт 5001 | посебна serverless функција |
| courses сервис | api/courses.js – порт 5002   | посебна serverless функција |
| proxy | proxy.js – порт 5005                  | vercel.json (rewrites) |

    - lokalnoto proxy ke go napiseme nie, na Vercel proxy ke ni bide vercel.json fajlot

### Unificarana i zaednicka konfiguraciska datoteka

    - .env i db.js - za spodelena konfiguracija (istata baza za site servisi)
    - package.json - za da se startuvaat site mikroservisi (npm run dev da gi startuva site tri(students, courses i frontend) odednas)

### Monorepo

    - site servisi vo eden repozitorium

    - Na Vercel: backend i frontend se dva POSEBNI porekti od istiot repozitorium (Root Directory: backend i frontend)

### Sto e hostiranje ?

    - Dosega aplikacijata rabotese samo na nasiot kompjuter (localhost). Koga ke go isklucime kompjuterot - aplikacijata isceznuva, ja nema.

    - Hostiranje = nasata aplikacija raboti na tugj kompjuter (server) koj e sekogas vklucen i ima javna adresa (URL).

    - Vercel e platforma za hostiranje, Hobby planot e besplaten za licni proekti.

### vercel.json

    - "version": 2 - verzijata na konfiguracijata sto ja koristi Vercel

    - "rewrites" - ova pole ovozmozuva da se pravata URL prezapisuvanja (rewrites).

    -/students -> /api/students - baranjeto se praka do students servisot

    -/courses -> /api/courses - baranjeto se praka do courses servisot

### Serverless

    - Sekoja datoteka(fajl) vo api/ papkata (folderot) na Vercel pretstavuva posebna funkcija (poseben servis)

    - Vercel ne go drzi servisot vklucen cel den. Koga ke dojde baranje - go "budi", odgovara, i pak "zaspiva"

    - Zatoa sto na Vercel ne ni treba app.listen - dovolno e module.exports = app.

### Environment Variables na Vercel

    - .env ne se prikacuva na GitHub, zatoa nie mora istite tie vrednosti da gi vneseme vo Vercel -> Settings -> Environment Variables

    - Backend: MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB, FRONTEND_URL

    - Frontend: VITE_API_URL (adresata, na backend-ot, BEZ / na krajot)

    - Sekoja promena na Environment Variables bara nov Redeploy

### MongoDB Atlas - Network Atlass

    - Vercel ima mnogu razlicni IP adresi, zatoa vo Atlas -> Network Acess dodavame 0.0.0.0./0 (Allow access from everywhere)/

### Cesti greski

    - Prazna lista / 500 grska -> Environment Variables ne se vneseni ili ne ste napravile Redeploy

    - Backend ne se povrzuva so bazata -> Atlas Network access ne ste vnesel 0.0.0.0/0

    - CORS greska -> FRONTEND_URL e pogresen ili ima / na krajot

    - Logovi: Vercel -> proektot -> Logs

### Kako da ja startuvame aplikacijata

    Terminal 1: cd backend -> npm install -> npm run dev (gi startuva students, courses i proxy)
        -ili sekoj od niv posebno vo poseben terminal:
        npm run students
        npm run courses
        npm run proxy

    Terminal 2: cd frontend -> npm install -> npm run dev




