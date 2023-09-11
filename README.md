### Récupérer la qualité de l'air de la ville la plus proche d'un point de latitude Lat et longitude Long:
- point d'entrée de l'application: index.js
- installation des dépendances :
```bash
npm install
```
- lancer l'application:
```bash
npm start
```
 OU
```bash
node index.js
```
  
#### url de récupération de la qualité de l'air: 

http://localhost:8000/airnearest/nearest/Lat/Long avec Lat et Long les valeurs respectives de la latitude et la longitude.

#### url de récupération de la qualité de l'air à paris , toutes les minutes:
http://localhost:8000/airnearest/airparis

La requete attend un corps contenant les paramètres du CRON comme suit:

{
    "minute": "",
    "hour" :"",
    "dayOfMonth" :"",
    "month" : "",
    "dayOfWeek": ""
}

#### url de récupération de la date avec la plus haute pollution à Paris

http://localhost:8000/airnearest/highestPollution

# Docker:

#### Lien docker: 
```bash
docker pull antsavr/node-senior:pollution
```

Pour lancer : 

```bash
docker-compose up
```
#### Testing: 
Pour lancer les tests:
```bash
npm test
```

