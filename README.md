## Run the application

Create the **.env** file at the root of the project
```
API_DOMAIN=<URL for this app>
UPLOAD_PATH=<folder for uploads>
SECRET_KEY=<key used for checkoing your auth tokens>

DB_HOST=<hostname of your db>
DB_NAME=<name of your db>
DB_USER=<user for your db>
DB_PASSWORD=<password of the user>
DB_PORT=<db port>
DB_DIALECT=<mysql|postgres|sqlite|mssql>

STRIPE_PRIVATE_KEY=<get this key from Stripe dashboard>
STRIPE_ENDPOINT_KEY=<get this key from Stripe dashboard, this is in your regular webhooks>
STRIPE_MERCHANT_ENDPOINT_KEY=<get this key from Stripe dashboard, this is in your Connect webhooks>
STRIPE_DONATION_SUCCESS=<success url on your website after a donation>
STRIPE_DONATION_FAIL=<failure url on your website after a donation>
STRIPE_ONBOARDING_RETURN_URL=<return url on your website after an onboarding session>
```

Some commands
```
npm run dev -> run the app locally, make sure your db server is running as well !
npm test -> launch all the unit tests
npm run build -> builds the project in the bin/ folder, will also check the code with tsc and launch all tests
```

## Clean architecture / DDD

One objective of this project was to learn about a way to easily test our code. We quickly found some articles and blogs about clean architecture and Domain-Driven-Design. Thus, we tried to implement those principles with the help of [this blog](https://khalilstemmler.com/articles/categories/domain-driven-design/).

<img width="1586" alt="Frame 8 (1)" src="https://user-images.githubusercontent.com/6892666/66703014-dc540e80-ecdb-11e9-81ac-9cc24e28f8c3.png">


## Modules

Following the concept of DDD, the API was split into multiple modules, each one having its own Domain, Application, Adapter and Infrastructure layers.

**Admin Module**: Creation and deletion of admin accounts.  
**Article Module**: Handling of articles for a specific association.  
**Association Module**: Handling of an association, its onboarding with Stripe and its members (managers and volunteers).  
**Chatbot Module**: It's in the name ! A quick FAQ for the "asso's" website.  
**Donation Module**: Handles new donations and a history of past donations whether for an association or a donator.  
**Donator Module**: Creation and deletion of donator accounts.  
**Identity Module**: Authentication and the update of the basic info of an account (which is the same for all types of account).  
**Message Module**: Handles the chatroom for a given association.  
**Showcase Module**: Catalog of associations, it is basically a mini-search engine for listing all the associations on our platform.
