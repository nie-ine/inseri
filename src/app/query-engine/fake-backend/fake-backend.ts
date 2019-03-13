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
import {AuthService} from '../../user-action-engine/mongodb/auth/auth.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
      private http: HttpClient,
      private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // // array in local storage for registered users
        // const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // const actions: any[] = JSON.parse(localStorage.getItem('actions')) || [];
        // const views: any[] = JSON.parse(localStorage.getItem('views')) || [];
        // const editions: any[] = JSON.parse(localStorage.getItem('editions')) || [];
        //
        // // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
          if (request.url.endsWith('/tutorialOne') && request.method === 'GET') {
            const body = {
              poems: [
                {
                  season: 'Spring',
                  title: 'Daffodils',
                  author: 'William Wordsworth',
                  text: 'I wandered lonely as a cloud\n' +
                    'That floats on high o\'er vales and hills,\n' +
                    'When all at once I saw a crowd,\n' +
                    'A host, of golden daffodils;\n' +
                    'Beside the lake, beneath the trees,\n' +
                    'Fluttering and dancing in the breeze.'
                },
                {
                  season: 'Summer',
                  title: 'At the Seaside',
                  author: 'Robert Louis Stevenson',
                  text: 'When I was down beside the sea \n' +
                    'A wooden spade they gave to me \n' +
                    'To dig the sandy shore.\n' +
                    'My holes were empty like a cup, \n' +
                    'In every hole the sea came up, \n' +
                    'Till it could come no more.'
                },
                {
                  season: 'Autumn',
                  title: 'Leaves',
                  author: 'Elsie N. Brady',
                  text: 'How silently they tumble down\n' +
                    'And come to rest upon the ground\n' +
                    'To lay a carpet, rich and rare,\n' +
                    'Beneath the trees without a care,\n' +
                    'Content to sleep, their work well done,\n' +
                    'Colors gleaming in the sun.'
                },
                {
                  season: 'Winter',
                  title: 'Winter',
                  author: 'Mother Goose poem',
                  text: 'Cold and raw the north wind doth blow,\n' +
                    'Bleak in the morning early;\n' +
                    'All the hills are covered with snow,\n' +
                    'And winter\'s now come fairly.'
                }
              ]
            };
            return Observable.of(new HttpResponse({ status: 200, body: body }));
          }

          if (request.url.endsWith('/tutorialTwo') && request.method === 'GET') {
            const body = {
              people: [
                {
                  name: 'Maximilane Mustermann',
                  hometown: 'Zuerich',
                  image: '../../../../assets/img/team/1.jpg'
                },
                {
                  name: 'John Johnson',
                  hometown: 'New York',
                  image: '../../../../assets/img/team/2.jpg'
                },
                {
                  name: 'Jane Janeson',
                  hometown: 'London',
                  image: '../../../../assets/img/team/3.jpg'
                }
              ]
            };
            return Observable.of(new HttpResponse({ status: 200, body: body }));
          }

          if (request.url.endsWith('/enhancement208') && request.method === 'GET') {
            const body = {
              firstDepth: [
                {
                  firstDepth: '1',
                  secondDepthArray: [
                    {
                      secondDepth: '11',
                      thirdDepthArray: [
                        {
                          thirdDepth: '111'
                        },
                        {
                          thirdDepth: '112'
                        },
                        {
                          thirdDepth: '113'
                        }
                      ]
                    },
                    {
                      secondDepth: '12',
                      thirdDepthArray: [
                        {
                          thirdDepth: '121'
                        },
                        {
                          thirdDepth: '122'
                        },
                        {
                          thirdDepth: '123'
                        }
                      ]
                    },
                    {
                      secondDepth: '13',
                      thirdDepthArray: [
                        {
                          thirdDepth: '131'
                        },
                        {
                          thirdDepth: '132'
                        },
                        {
                          thirdDepth: '133'
                        }
                      ]
                    }
                  ]
                },
                {
                  firstDepth: '2',
                  secondDepthArray: [
                    {
                      secondDepth: '21',
                      thirdDepthArray: [
                        {
                          thirdDepth: '211'
                        },
                        {
                          thirdDepth: '212'
                        },
                        {
                          thirdDepth: '213'
                        }
                      ]
                    },
                    {
                      secondDepth: '22',
                      thirdDepthArray: [
                        {
                          thirdDepth: '221'
                        },
                        {
                          thirdDepth: '222'
                        },
                        {
                          thirdDepth: '223'
                        }
                      ]
                    },
                    {
                      secondDepth: '23',
                      thirdDepthArray: [
                        {
                          thirdDepth: '231'
                        },
                        {
                          thirdDepth: '232'
                        },
                        {
                          thirdDepth: '233'
                        }
                      ]
                    }
                  ]
                },
                {
                  firstDepth: '3',
                  secondDepthArray: [
                    {
                      secondDepth: '31',
                      thirdDepthArray: [
                        {
                          thirdDepth: '311'
                        },
                        {
                          thirdDepth: '312'
                        },
                        {
                          thirdDepth: '313'
                        }
                      ]
                    },
                    {
                      secondDepth: '32',
                      thirdDepthArray: [
                        {
                          thirdDepth: '321'
                        },
                        {
                          thirdDepth: '322'
                        },
                        {
                          thirdDepth: '323'
                        }
                      ]
                    },
                    {
                      secondDepth: '33',
                      thirdDepthArray: [
                        {
                          thirdDepth: '331'
                        },
                        {
                          thirdDepth: '332'
                        },
                        {
                          thirdDepth: '333'
                        }
                      ]
                    }
                  ]
                }
              ]
            };
            return Observable.of(new HttpResponse({ status: 200, body: body }));
          }
        //
        //     // get users
        //     if (request.url.endsWith('/api/users') && request.method === 'GET') {
        //         // check for fake auth token in header and return users if valid,
        //       // this security is implemented server side in a real application
        //         if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //             return Observable.of(new HttpResponse({ status: 200, body: users }));
        //         } else {
        //             // return 401 not authorised if token is null or invalid
        //             return Observable.throw('Unauthorised');
        //         }
        //     }
        //
        //   // get editions
        //   if (request.url.endsWith('/api/editions') && request.method === 'GET') {
        //     // check for fake auth token in header and return users if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       return Observable.of(new HttpResponse({ status: 200, body: editions }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //     // get user by id
        //     if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
        //         // check for fake auth token in header and return user if valid,
        //       // this security is implemented server side in a real application
        //         if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //             // find user by id in users array
        //             const urlParts = request.url.split('/');
        //           const id = parseInt(urlParts[urlParts.length - 1]);
        //           const matchedUsers = users.filter(user => { return user.id === id; });
        //           const user = matchedUsers.length ? matchedUsers[0] : null;
        //
        //             return Observable.of(new HttpResponse({ status: 200, body: user }));
        //         } else {
        //             // return 401 not authorised if token is null or invalid
        //             return Observable.throw('Unauthorised');
        //         }
        //     }
        //
        //   // get action by id
        //   if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'GET') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       const id = parseInt(urlParts[urlParts.length - 1]);
        //       const matchedActions = actions.filter(action => { return action.id === id; });
        //       const action = matchedActions.length ? matchedActions[0] : null;
        //
        //       return Observable.of(new HttpResponse({ status: 200, body: action }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //   // get view by id
        //   if (request.url.match(/\/api\/views\/\w+$/) && request.method === 'GET') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       // console.log(urlParts);
        //       const hash = urlParts[urlParts.length - 1];
        //       // console.log('Hash: ' + hash);
        //       const matchedActions = views.filter(view => { return view.hash === hash; });
        //       const view = matchedActions.length ? matchedActions[0] : null;
        //
        //       return Observable.of(new HttpResponse({ status: 200, body: view }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //   // get edition by hash
        //   if (request.url.match(/\/api\/editions\/\w+$/) && request.method === 'GET') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       console.log(urlParts);
        //       const hash = urlParts[urlParts.length - 1];
        //       console.log('Hash: ' + hash);
        //       const matchedActions = editions.filter(edition => { return edition.hash === hash; });
        //       const edition = matchedActions.length ? matchedActions[0] : null;
        //
        //       return Observable.of(new HttpResponse({ status: 200, body: edition }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //   // update action
        //   if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'PUT') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       const id = parseInt(urlParts[urlParts.length - 1]);
        //       console.log('update action ' + id);
        //       console.log(request.body);
        //       for (let i = 0; i < actions.length; i++) {
        //         const action = actions[i];
        //         if ( action.id === id) {
        //           // delete action to save it again afterwards
        //           actions.splice(i, 1);
        //           localStorage.setItem('actions', JSON.stringify(actions));
        //           // save existing action again in storage
        //           const newAction = request.body;
        //           // save new action
        //           console.log('Update action');
        //           console.log(newAction);
        //           newAction.id = actions.length + 1;
        //           newAction.isFinished = false;
        //           actions.push(newAction);
        //           localStorage.setItem('actions', JSON.stringify(actions));
        //           return Observable.of(new HttpResponse({ status: 200, body: newAction }));
        //         }
        //       }
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //   // update view
        //   if (request.url.match(/\/api\/views\/\w+$/) && request.method === 'PUT') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       const hash = urlParts[urlParts.length - 1];
        //       console.log('update view ' + hash);
        //       console.log(request.body);
        //       console.log(views);
        //       // save new action
        //       console.log('Update action');
        //       console.log('Views before');
        //       console.log(views);
        //       let index = 0;
        //       let finalIndex = 0;
        //       for ( const view of views ) {
        //         if ( view.hash === hash ) {
        //           finalIndex = index;
        //         }
        //         index += 1;
        //       }
        //       views[ finalIndex ] = request.body;
        //       console.log('Views after');
        //       console.log(views);
        //       localStorage.setItem('views', JSON.stringify(views));
        //           return Observable.of(new HttpResponse({ status: 200, body: request.body }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //   // update edition
        //   if (request.url.match(/\/api\/editions\/\w+$/) && request.method === 'PUT') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in editions array
        //       const urlParts = request.url.split('/');
        //       const hash = urlParts[urlParts.length - 1];
        //       console.log('update edition ' + hash);
        //       console.log(request.body);
        //       console.log(editions);
        //       // save new action
        //       console.log('Update action');
        //       console.log('Views before');
        //       console.log(editions);
        //       editions[ 0 ] = request.body;
        //       console.log('Views after');
        //       console.log(editions);
        //       localStorage.setItem('editions', JSON.stringify(editions));
        //       return Observable.of(new HttpResponse({ status: 200, body: request.body }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //     // create user
        //     if (request.url.endsWith('/api/users') && request.method === 'POST') {
        //         // get new user object from post body
        //         let newUser = request.body;
        //
        //         // validation
        //         let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
        //         if (duplicateUser) {
        //             return Observable.throw('Username "' + newUser.username + '" is already taken');
        //         }
        //
        //         // save new user
        //         newUser.id = users.length + 1;
        //         users.push(newUser);
        //         localStorage.setItem('users', JSON.stringify(users));
        //
        //         // respond 200 OK
        //         return Observable.of(new HttpResponse({ status: 200 }));
        //     }
        //
        //   // create view
        //   if (request.url.endsWith('/api/views') && request.method === 'POST') {
        //     // get new user object from post body
        //     let newView = request.body;
        //     // validation
        //     let duplicateView = views.filter(view => { return view.hash === newView.hash; }).length;
        //     if ( duplicateView ) {
        //       return Observable.throw('View id "' + newView.hash + '" is already taken');
        //     }
        //
        //     // save new view
        //     views.push( newView );
        //     localStorage.setItem('views', JSON.stringify(views));
        //     console.log(JSON.parse(localStorage.getItem('views')));
        //
        //     // respond 200 OK
        //     return Observable.of(new HttpResponse({ status: 200 }));
        //   }
        //
        //   // create edition
        //   if (request.url.endsWith('/api/editions') && request.method === 'POST') {
        //     // get new user object from post body
        //     console.log('Create edition');
        //     console.log(request.body);
        //     let newEdition = request.body;
        //     // validation
        //     let duplicateEdition = views.filter(edition => { return edition.hash === newEdition.hash; }).length;
        //     if ( duplicateEdition ) {
        //       return Observable.throw('Edition with hash "' + newEdition.hash + '" is already taken');
        //     }
        //
        //     // save new edition
        //     console.log()
        //     editions.push( newEdition );
        //     localStorage.setItem('editions', JSON.stringify(editions));
        //     console.log(JSON.parse(localStorage.getItem('editions')));
        //
        //     // respond 200 OK
        //     return Observable.of(new HttpResponse({ status: 200 }));
        //   }
        //
        //   // get views
        //   if (request.url.endsWith('/api/views') && request.method === 'GET') {
        //     // check for fake auth token in header and return users if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       return Observable.of(new HttpResponse({ status: 200, body: views }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
        //
        //
        //   // create action
        //   if (request.url.endsWith('/api/actions') && request.method === 'POST') {
        //     // get new user object from post body
        //     const newAction = request.body;
        //
        //     // validation
        //     const duplicateAction = users.filter(action => { return action.title === newAction.title; }).length;
        //     if (duplicateAction) {
        //       return Observable.throw('Action "' + newAction.title + '" already exists');
        //     }
        //
        //     // save new action
        //     console.log('Create action');
        //     newAction.id = actions.length + 1;
        //     newAction.isFinished = false;
        //     newAction.hasViews = [];
        //     actions.push(newAction);
        //     localStorage.setItem('actions', JSON.stringify(actions));
        //
        //     // respond 200 OK
        //     return Observable.of(new HttpResponse({ status: 200 }));
        //   }
        //
        //     // delete user
        //     if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
        //         // check for fake auth token in header and return user if valid,
        //       // this security is implemented server side in a real application
        //         if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //             // find user by id in users array
        //             let urlParts = request.url.split('/');
        //             let id = parseInt(urlParts[urlParts.length - 1]);
        //             for (let i = 0; i < users.length; i++) {
        //                 let user = users[i];
        //                 if (user.id === id) {
        //                     // delete user
        //                     users.splice(i, 1);
        //                     localStorage.setItem('users', JSON.stringify(users));
        //                     break;
        //                 }
        //             }
        //
        //             // respond 200 OK
        //             return Observable.of(new HttpResponse({ status: 200 }));
        //         } else {
        //             // return 401 not authorised if token is null or invalid
        //             return Observable.throw('Unauthorised');
        //         }
        //     }
        //
        //   // delete action
        //   if (request.url.match(/\/api\/actions\/\d+$/) && request.method === 'DELETE') {
        //     // check for fake auth token in header and return user if valid,
        //     // this security is implemented server side in a real application
        //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //       // find user by id in users array
        //       const urlParts = request.url.split('/');
        //       const id = parseInt(urlParts[urlParts.length - 1]);
        //       for (let i = 0; i < actions.length; i++) {
        //         const action = actions[i];
        //         if (action.id === id) {
        //           // delete user
        //           actions.splice(i, 1);
        //           localStorage.setItem('actions', JSON.stringify(actions));
        //           break;
        //         }
        //       }
        //
        //       // respond 200 OK
        //       return Observable.of(new HttpResponse({ status: 200 }));
        //     } else {
        //       // return 401 not authorised if token is null or invalid
        //       return Observable.throw('Unauthorised');
        //     }
        //   }
          // pass through any requests not handled above
          // console.log('Pass on request');
          // console.log(request);
          // attach Token from nodejs
          // console.log(request.url);
          if( request.url.search( 'knora' ) === -1 ) {
            const authToken = this.authService.getToken();
            const authRequest = request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + authToken)
            });
            return next.handle(authRequest);
          } else {
            return next.handle(request);
          }
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
