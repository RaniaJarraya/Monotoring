## Usage
## partie serveur 
mongod --auth --bind_ip 127.0.0.1

Make sure you have mongodb installed into your own machine and running;
Get the project and run: `npm install`

Run `npm start`. It will initialize the server at port 8443.
## partie software 
installer npm v6.13.0

installer ionic v5.4.6

generer les certificats en suivant le fichier Helmet.md 

visiter chrome://flags/ et faire "enable" a " Allow invalid certificates for resources loaded from localhost." pour utiliser le HTTPS

Taper ionic serve --ssl true 

## partie hardware 
Puisque la carte Raspberry pi3 n'a pas été procuré on a procédé à utiliser NodeRed.

pour ouvrir nodered : installer puis taper node-red dans cmd 

on doit créer un compte dans CloudMQTT pour envoyer les données vers nodejs 
