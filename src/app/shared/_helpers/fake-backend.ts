import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // console.log(users);
        const actions: any[] = JSON.parse(localStorage.getItem('actions')) || [];
        // console.log(actions);
        const views: any[] = JSON.parse(localStorage.getItem('views')) || [];
        console.log(views);
        const editions: any[] = JSON.parse(localStorage.getItem('editions')) || [];
        console.log(editions);

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
              console.log( 'Send request to knora' );
              console.log(request);
              const url = 'http://localhost:3333';
              request = request.clone({
                url: url + request.url
              });
              console.log( request );
              console.log( 'After we have dhlab request, we send it to Knora in the foloowing line: ' );
              // return next.handle( request );
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    console.log('wrong user');
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid,
              // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

          // get editions
          if (request.url.endsWith('/api/editions') && request.method === 'GET') {
            // check for fake auth token in header and return users if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              return Observable.of(new HttpResponse({ status: 200, body: editions }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid,
              // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

          // get action by id
          if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              const matchedActions = actions.filter(action => { return action.id === id; });
              const action = matchedActions.length ? matchedActions[0] : null;

              return Observable.of(new HttpResponse({ status: 200, body: action }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

          // get view by id
          if (request.url.match(/\/api\/views\/\w+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              console.log(urlParts);
              const hash = urlParts[urlParts.length - 1];
              console.log('Hash: ' + hash);
              const matchedActions = views.filter(view => { return view.hash === hash; });
              const view = matchedActions.length ? matchedActions[0] : null;

              return Observable.of(new HttpResponse({ status: 200, body: view }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

          // get edition by hash
          if (request.url.match(/\/api\/editions\/\w+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              console.log(urlParts);
              const hash = urlParts[urlParts.length - 1];
              console.log('Hash: ' + hash);
              const matchedActions = editions.filter(edition => { return edition.hash === hash; });
              const edition = matchedActions.length ? matchedActions[0] : null;

              return Observable.of(new HttpResponse({ status: 200, body: edition }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

          // update action
          if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'PUT') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              console.log('update action ' + id);
              console.log(request.body);
              for (let i = 0; i < actions.length; i++) {
                const action = actions[i];
                if ( action.id === id) {
                  // delete action to save it again afterwards
                  actions.splice(i, 1);
                  localStorage.setItem('actions', JSON.stringify(actions));
                  // save existing action again in storage
                  const newAction = request.body;
                  // save new action
                  console.log('Update action');
                  console.log(newAction);
                  newAction.id = actions.length + 1;
                  newAction.isFinished = false;
                  actions.push(newAction);
                  localStorage.setItem('actions', JSON.stringify(actions));
                  return Observable.of(new HttpResponse({ status: 200, body: newAction }));
                }
              }
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

          // update view
          if (request.url.match(/\/api\/views\/\w+$/) && request.method === 'PUT') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const hash = urlParts[urlParts.length - 1];
              console.log('update view ' + hash);
              console.log(request.body);
              console.log(views);
              // save new action
              console.log('Update action');
              console.log('Views before');
              console.log(views);
              views[ 0 ] = request.body;
              console.log('Views after');
              console.log(views);
              localStorage.setItem('views', JSON.stringify(views));
                  return Observable.of(new HttpResponse({ status: 200, body: request.body }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

          // update edition
          if (request.url.match(/\/api\/editions\/\w+$/) && request.method === 'PUT') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in editions array
              const urlParts = request.url.split('/');
              const hash = urlParts[urlParts.length - 1];
              console.log('update edition ' + hash);
              console.log(request.body);
              console.log(editions);
              // save new action
              console.log('Update action');
              console.log('Views before');
              console.log(editions);
              editions[ 0 ] = request.body;
              console.log('Views after');
              console.log(editions);
              localStorage.setItem('editions', JSON.stringify(editions));
              return Observable.of(new HttpResponse({ status: 200, body: request.body }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

          // create view
          if (request.url.endsWith('/api/views') && request.method === 'POST') {
            // get new user object from post body
            let newView = request.body;
            // validation
            let duplicateView = views.filter(view => { return view.hash === newView.hash; }).length;
            if ( duplicateView ) {
              return Observable.throw('View id "' + newView.hash + '" is already taken');
            }

            // save new view
            views.push( newView );
            localStorage.setItem('views', JSON.stringify(views));
            console.log(JSON.parse(localStorage.getItem('views')));

            // respond 200 OK
            return Observable.of(new HttpResponse({ status: 200 }));
          }

          // create edition
          if (request.url.endsWith('/api/editions') && request.method === 'POST') {
            // get new user object from post body
            console.log('Create edition');
            console.log(request.body);
            let newEdition = request.body;
            // validation
            let duplicateEdition = views.filter(edition => { return edition.hash === newEdition.hash; }).length;
            if ( duplicateEdition ) {
              return Observable.throw('Edition with hash "' + newEdition.hash + '" is already taken');
            }

            // save new edition
            console.log()
            editions.push( newEdition );
            localStorage.setItem('editions', JSON.stringify(editions));
            console.log(JSON.parse(localStorage.getItem('editions')));

            // respond 200 OK
            return Observable.of(new HttpResponse({ status: 200 }));
          }

          // get views
          if (request.url.endsWith('/api/views') && request.method === 'GET') {
            // check for fake auth token in header and return users if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              return Observable.of(new HttpResponse({ status: 200, body: views }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }


          // create action
          if (request.url.endsWith('/api/actions') && request.method === 'POST') {
            // get new user object from post body
            const newAction = request.body;

            // validation
            const duplicateAction = users.filter(action => { return action.title === newAction.title; }).length;
            if (duplicateAction) {
              return Observable.throw('Action "' + newAction.title + '" already exists');
            }

            // save new action
            console.log('Create action');
            newAction.id = actions.length + 1;
            newAction.isFinished = false;
            newAction.hasViews = [];
            actions.push(newAction);
            localStorage.setItem('actions', JSON.stringify(actions));

            // respond 200 OK
            return Observable.of(new HttpResponse({ status: 200 }));
          }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid,
              // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

          // delete action
          if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'DELETE') {
            // check for fake auth token in header and return user if valid,
            // this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              for (let i = 0; i < actions.length; i++) {
                const action = actions[i];
                if (action.id === id) {
                  // delete user
                  actions.splice(i, 1);
                  localStorage.setItem('actions', JSON.stringify(actions));
                  break;
                }
              }

              // respond 200 OK
              return Observable.of(new HttpResponse({ status: 200 }));
            } else {
              // return 401 not authorised if token is null or invalid
              return Observable.throw('Unauthorised');
            }
          }

            // pass through any requests not handled above
            console.log('Pass on request');
            console.log(request);
            return next.handle(request);

        })

        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
