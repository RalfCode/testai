# Testplan voor Authentificatie-Functionaliteit

## Installatie

* Installeer Node.js en npm op je lokale machine.
* Installeer de nodige dependencies met `npm install`:
	+ `@prisma/client`
	+ `@prisma/client-js`
	+ `bcryptjs`
	+ `jsonwebtoken`
	+ `axios`

## Run-command

* Start de Prisma-server met `npx prisma dev`.
* Start de Express-server met `node server.js`.

## Testcases

### 1. Registeren en login

* Gebruik een POST-verzoek naar `/register` om een nieuwe gebruiker aan te maken.
	+ Verzoekbody: `{ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }`
* Gebruik een POST-verzoek naar `/login` om de login-gegevens in te voeren.
	+ Verzoekbody: `{ email: 'john.doe@example.com', password: 'password123' }`
* Controleer of het token is opgenomen en dat de gebruiker is ingelogd.

### 2. Token-verloop

* Gebruik een GET-verzoek naar `/api/auth/token` om een nieuw token op te halen.
* Controleer of het token is verlopen na een bepaalde tijd (10 minuten in dit geval).

### 3. Token-uitlaat

* Gebruik een DELETE-verzoek naar `/api/auth/token` om het token uit te laten.
* Controleer of het token is verwijderd en dat de gebruiker niet meer ingelogd kan worden.

### 4. Edge cases

* Probeer met lege gegevens (leeg email, leeg password) om te zien of er een foutmelding wordt getoond.
* Probeer met een bestaande gebruiker om te zien of het token is opgenomen en dat de gebruiker is ingelogd.

## Handmatige checks

* Controleer in de console of er geen fouten zijn opgetreden tijdens de testuitvoering.
* Controleer in de database of alle gegevens correct zijn opgeslagen.