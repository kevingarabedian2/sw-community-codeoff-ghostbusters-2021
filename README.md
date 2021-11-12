# Signalwire Community Code-off Entry
# Ecto 411 Community Alert System
# https://ecto411.codergames.dev

This is my entry I wanted to share another way to digest and generate call flows.

The folder flows, contains multiple predefined flows that are routed to based on the input 
numbers flow query string var, and then passed in-app via the flow id.

## Features
-    Demonstrates alerting a group i.e. Ghostbusters
-    Demonstrates subscription to a group ie.e Neighborhood Alert
-    Demonstrates inbound flow IVR to report sightings, and to join neighborhood alert ecto 411.
-    Demonstrates web signup for neigborhood alert, and reporting of sightings.
-    Demonstrates text submission / reporting

# Getting Started 
 1. Clone the repo
 2. Install dependencies
    - `npm install`
 2. Build Docker Image
    - ./docker-build
 3. Bring up with Docker-Compose
    - docker-compose up or docker-compose up -d
 
 I am running my test site - https://ecto411.codergames.dev using ssl, behind a proxy so make sure you modify your deployment as needed.
 By default, the docker image will spin up and serve only on port 80 unless you configure proxy for your enviroment.

 To Test inbound calls you can call 
 1 (877) 723-1337
 
 You can also visit us on the web, https://ecto411.codergames.dev
