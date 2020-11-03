Query engine for Knora
======================

This folder includes services for the communication with a Knora instance. The services can be used by core parts of the whole project but also by specific apps.
Collecting these services makes simplifies updating both to changes in the data source and to changes in Angular.

In the future also the authentication to the data sources has to be piped through this. 

Services in this collection:

- KnoraRequestService
    - used in text view apps
    - dependencies of this service: KnoraAuthService, RequestService, RequestTemplate
