Contact and info about the organisation NIE-INE | NATIONAL INFRASTRUCTURE FOR EDITIONS | A swiss-wide organisation for the infrastructure of editions: [https://www.nie-ine.ch/](https://www.nie-ine.ch/)

Mandated by [swissuniversities](https://www.swissuniversities.ch/)

# Presented or mentioned at

[Virtual research environments and ancient manuscripts 2020/09 | University of Lausanne | Switzerland](https://www.swissuniversities.ch/themen/digitalisierung/p-5-wissenschaftliche-information/newsletter/newsletter-august-2020)

[Swissuniversities Newsletter 2020/08 | Switzerland](https://www.swissuniversities.ch/themen/digitalisierung/p-5-wissenschaftliche-information/newsletter/newsletter-august-2020)

[Digitisation of newspapers collections 2020/04 | University of Luxembourg](https://impresso.github.io/eldorado/online-program/)


# What can I do with inseri?
inseri is an online collaborative work and publish environment.

## What can I publish with inseri?

- You can create websites with inseri
	- Websites consist of collages that display your data.
	- This data can be text you entered directly in inseri, but also data from your database
- You can create online presentations with inseri
	- Like in powerpoint, you can create online presentations in inseri. Slides are called collages in inseri and can visualise data from your database in d3.js data visualisations.
	- Users can comment on each collage, which is helpful for instance in lectures that professors hold in front of 1000 students who might have further questions especially related to one collage.
	- You can store each collage in a central way and integrate it in different presentations, thus no more copy and pasting slides with the same content, you can maintain everything in a central way!
- You can publish own frontend components in inseri
	- If you wish to write own frontend components, for instance to enter data in your database or to create an individual d3.js data visualisations, you can do this very fast in inseri. Any npm - module can be integrated in inseri without any needed changes of the npm module you would like to integrate.

## How can I work with inseri?

- inseri can be used to work collaboratively
	- If somebody in your team needs to enter data and another team member needs to review it, you can create a site with 2 collages in inseri, exactly tailored to your team-specific workflow
- Your can upload any of your data to inseri and always access it whereever you are, also over your phone. inseri also provides pdf readers and other apps that enable you to work with your data.
- You can display for example one pdf, one spreadsheet, and one texteditor on one collage and save this constellation. You can then come back to this collage and keep on working on your task, also collaboratively with colleagues.

## Who is inseri for?

- Universities who would like to centrally maintain project and research specific online presentations of data and research output. Since maintaining thousands of different websites is too labor intensive for many IT departments, inseri offers projects to create websites in inseri which can be centrally maintained by the respective insitution.
- Online developers who would like to publish combineable frontend components. If a frontend developer for instance needs a SQL-entry-frontend-component fast, he/she is much faster adding it to inseri than creating a whole new project. He/She is able to maintain everything he/she does in a central, reusable and combineable way.
- Companies who write internal and external business applications can create their frontend components in inseri. This way the components are instantly reusable by other users and clients if desired.
- Universities who would like to create research specific data visualisations in a central way. A researcher or phd student who creates his/her data visualisations in inseri enables future researchers and phd students to reuse the visualisations for their research.
- Researchers and phd students who would like to visualise and publish their data online as part of their research publication.
- University projects who would like to publish their data and enable the user to visualise and create interesting subsets of the published data. For instance, a user can visualise data from one Library which published a RestFul API, visualise on the same collage data from another Library RestFul API, visualise on the same collage data from a University project, and add his/her own notes, thus working on his/her research.


# Get it up and running - OUTDATED - needs to be updated!

[![Build Status](https://travis-ci.org/nie-ine/NIE-OS.svg?branch=devel)](https://travis-ci.org/nie-ine/inseri)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running to use it locally with docker

 - ``git clone https://github.com/nie-ine/inseri.git``
 - ``cd inseri``
 
1. ```mv ./backend/settings_default ./backend/.settings```
2. ```docker-compose up```
3. Wait until the mongodb - conatiner has a first terminal output, then restart the nieine/mean container, the last terminal output of the node container should say  "connected to database"

So, in another terminal, type:

```docker ps``` to find out the < container id > of nieine/mean

```docker restart < container id >```

You can find the software on the following ports:

Inseri:  [http://localhost:4200](http://localhost:4200)

MongoDB - Admin - Interface: [http://localhost:8081](http://localhost:8081)

## Get it up and running for development

### Clone inseri
 - ``git clone https://github.com/nie-ine/inseri.git``
 - ``cd inseri``

## 1. Create MongoDB instance:

### Alternative 1: Create your own MongoDB instance:
 - Create a sandbox on Mongodb, choose a free instance.
 - In this sandbox, add your IP to the whitelist
 - Get the server-connect string, similiar to this: ```mongodb+srv://user:dfgsdbdtrgr@cluster567-7kilp.mongodb.net/node-angular``` via klick on Connect, klick on connect your application, klick one nodejs

### Alternative 2: Contact jan.stoffregen@uzh.ch

## 2. Connect inseri to MongoDB: 
 - Create a folder .settings
 - In the folder settings, create the file mongodbServer.js Your file should look similiar to the following:

 
```
const mongodbServer = 'mongodb+srv://user:dfgsdbdtrgr@cluster567-7kilp.mongodb.net/node-angular';

module.exports = {
  mongodbServer: mongodbServer
};
```

- another file in this folder should be mailDetails, where you can put the information for your email - server, it should look like the following:

```
const emailAdress = '<your Email Address>';
const pw = '<your password>';
const recipient = '<default recipient if there is no other one defined>';
const type = '<type of your mail server>';

module.exports = {
  emailAdress: emailAdress,
  pw: pw,
  recipient: recipient,
  type: type
};
```

- another file is nieOsServer.js:

```
const nieOSServer = 'http://localhost:4200';

module.exports = {
  nieOSServer: nieOSServer
};

```

- another file is salt.js


```
const salt = 'your_secret_that_should_be_very_long';


module.exports = {
  salt: salt
};

```


## 3. Start Angular and Node.js

 - ``yarn``
 - ``ng s``

## 4. Start node.js
```npm run start:server```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Technical Documentation:

https://nie-ine.github.io/inseri/

## Generate documentation

npm run compodoc

compodoc -p src/tsconfig.app.json -s

