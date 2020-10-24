# Inseri: an overview

Inseri is an IT framework allowing to conduct an academic research project online, in virtually any discipline, beginning to end. Research projects can include many groups and members, and can join at any stage of their development.

## Architecture of Inseri 
The user opens an account, and from within the account he or she can create an unlimited number of the "projects". "Project" does not have to correspond to the whole research project, it can cover, for example, just one kind of analysis. For the publication purposes, the results are best collided together into a single "project", and then published.
Within the "project", the user has "pages". Each of these "pages" can have as many elements (texts, images, videos, etc.) as needed, and the user can add as many pages as necessary to the project via a continuous navigation (p. 1, p. 2, etc), or via hyperlinks. 
All like in WordPress or Squarespace, the user can freely add text, upload images and other types of files, provide links to the external webpages, etc., however, free of charge. Besides the web-editing functions, which were the original ground for the creation of Inseri, it provides now a large pallettes of tools (called Apps) specifically designed to facilitate research process.

### Types of Apps
The applications are classified into the six groups according to their general purpose:

1. Admin
2. Add, Edit & Manage Data
3. Visualise
4. Microservice
5. Web Applications
6. Publish

Let us briefly characterise each of the groups.

**Admin** set of apps allows to log in and out, make an additional access, save project, and navigate to Dashboard.

**Add, Edit & Manage Data** is a powerful set of apps allowing the user to apload files from the desktop, to add the text manually, or to query external resources (via RESTful APIs) and to comment on them. With these applications Inseri allows to collect all research materials in a single place online, and make it available for the whole research team, which definitely simplifies the questions of accessing the same version of a document, or the necessity to have project data in many different places (University server, Switch, GoogleDocs). If we take digital edition as example, here, with this set of apps, the researchers can 

* collect manuscripts
* transcribe them
* add TEI tags
* provide the results of preliminary analysis in a form of a text or a spreadsheet.

Inseri (Oct. 2020) includes the templates to some 65 institutions worldwide offering many millions of resources in IIIF. The user only needs to replace the URL of the template with the URL of the document he or she would like to work with to access it directly from within Inseri.

**Visualise** is the most developed set of Apps, including (Oct. 2020) 21 Apps. These apps allow a large variety of inputs, from manual, to consiming JSONs, that, for example can be queries or created via a spreadsheet. The general aim of this block is to enable the user to make visually appealing presentations of the data and/or analysis results. It includes various charts (like in Excel), but also links to maps, viewing images with zoom or without, viweing HTML and navigation views.

**Microservice** block includes the possibility to integrate analysis directly in Inseri. One can run here a Python code for Text Mining, or, if one has the data in RDF, even a Machine Reasoning session.

**Web Applications**, as it is evident from the name, is all about implementing within Inseri the resources that are available elsewhere on the Web, for example, Audio and Video files, PDF viewer, SPARQL visualiser for the ontologies, as well as the complete webpages of the freely accessible finalised research projects published in Inseri. This same set includes the links to the "authority files", for example GND, and the URL Updater, which is necessary to reuse the queries to RESTful APIs.

**Publish**, this block allows the user to publish the project as a webpage in just a few clicks, or even to publish it as a template, thus allowing other users to reuse it directly. 

To summarize, Inseri combines the functions of a server, webpage, data mining- and visualisations applications, with the data reused from one step to another. The user who is informed about how the data is stored, how it can be called and queried, needs virtually no other applications to successfully complete a research project A to Z, including publishing it online in a form of interactive webpage.

### Technical side of Inseri
Json, Angular, ngm, ...
