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
        //
            // authenticate
            if (request.url.endsWith('/tests/test1') && request.method === 'GET') {
              const body = {
                "head": {
                  "vars": [
                    "my_person",
                    "label",
                    "authorsname",
                    "description"
                  ]
                },
                "results": {
                  "bindings": [
                    {
                      "description": {
                        "type": "literal",
                        "value": "Novariensis; natus c. 1100; venit in Galliam c. 1136; breviter Remis moratus est, ubi docebat magister Lotulfus Novariensis; c. 1139 venit Parisios et commendatus a s. Bernardo morabatur in monasterio sancti Victoris; c. 1140–1159 docuit in scholis cathedralis Parisiensis; 1152 Romam profectus est; 1159 electus est episcopus Parisiensis, sed iam 1260 e vita migravit. Sent. I composuit probabiliter ante 1148; Sent. II–V probabiliter finivit hieme 1151/2.\nGregorianum 2 (1921) 387–392 et 15 (1934) 262–266 [F. Pelster; de tempore compositionis]; Scholastik 5 (1930) 569–573 [F. Pelster; de codice originali]; Rev. Hist. Eccl. 14 (1913) 511–536; 705–719 [J. de Ghellinck; de notis marginalibus]; 27 (1931) 792–830 et 30 (1934) [J. de Ghellinck; de vita]; Rech. Théol. anç. méd. 2 (1930) 80–99 [A. Landgraf; de critica textus]; Dict. Théol. Cath. XII,2 (1935) 1941–2019 [J. de Ghellinck]."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Petrus Lombardus"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_1_PetrusLombardus"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/zS7E7xyEQxKQG30LZQSZbQ"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide Antonius; Arnoldus Vesaliensis; Bandinus; Conradus OP; Dionysius Carthusiensis; Ps.Hugo de s. Caro; Jacobus de Lausanne; Dionysius Carthusianus; Ps. Hugo de s. Caro ; Jacobus de Lausanne; Odalricus Verdunensis; Simon Tornacensis; nr. 1070; 1190; 1342,1.\nA. Landgraf, Bearbeitungen von Werken des Petr. Lomb. Coll. Franc. 10, 321–337."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Abbreviationes Sententiarum Petri Lombardi"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_2_AbbreviationesSententiarumPetriLombardi"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/2Kx5KiOET9OS1yVbk6DOVg"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide ARNOLDUS; FRANCISCUS TOTI DE PERUSIO; MATTHAEUS DE AQUASPARTA; MICHAEL AIGNANI DE BONONIA; ROBERTUS KILWARDBY; SIMON de TOURNAY; nr. 966."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Tabulae in Sententias Petri Lombardi"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_3_TabulaeinSententiasPetriLombardi"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/Xe845xy9RgK1WZR_2kCjlw"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide Arnoldus Vesaliensis; Fridericus Werdinensis OCist; Helwicus."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Petri Lombardi Sententiae Metrice Redactae"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_4_PetriLombardiSententiaeMetriceRedactae"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/BJ06D4gURMiNEJDyrMpmsQ"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide Odo Parisiensis; Petrus Comestor; Ps. Petrus Pictaviensis; Stefanus Langton; Udo. Anon. nr. 1111; 1273; 1274; 1286.\nA. Landgraf, Sentenzenglossen des beginnenden 13. Jahrhunderts. Rech. Théol. anç. méd. 10 (1938) 36–55. A.\nLandgraf, The first Sentence Commentary of early Scholasticism New Scholasticism 13 (1939) 101–132 (Napoli, Naz. VII C 14 = Stefan Langton) A. LANDGRAF, Z.f.k.Th. 58 (1934) 397."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Glossae in Sententias Petri Lombardi"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_6_GlossaeinSententiasPetriLombardi"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/ShnZhWqlQ3qkTMWfdg-u6A"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Composuit commentarium in Sententias c. 1240–1250, dependentem ab Odone Rigaldi.\nM. D. Chénu, Maîtres et bacheliers de l’Université de Paris v. 1240. Etudes d’histoire littéraire et doctrinale du XIII siècle, I. série, 1938, 11–39. G. Engelhardt, Rech. Theol. anç. méd. 8 (1936) 61–78."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Adamus de Puteorum Villa"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_9_AdamusdePuteorumVilla"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/QS8RMni6TN-mzz28InQSJw"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Discipulus Guilelmi Occam, docuit Oxoniae, obiit 1338.\nG. Little, Grey friars (1892) 172. C. Michalski, Les courants philosophiques (1922) 71."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Adam Wodeham [goddam] OM"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_10_AdamWodehamgoddamOM"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/D6jtgrFtTbGd4x6rLph3hg"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "I–IV Sent. Abhreviatus ab Henrico de Oyta Pragae 1373–1378."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Adam Wodeham Abbreviatus"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_11_AdamWodehamAbbreviatus"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/_X1bra40T9u5yd2kxfYLfw"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Discipulus Johannis Gerson; legit super Sententias 1413/14; obiit 1472. V. Doucet, Antonianum 5 (1930) 405–442."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Aegidius Carlerii"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_12_AegidiusCarlerii"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/D5Ih0J8NSWmMD-zWDKgQrA"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "1285–1291 docuit theologiam in universitate Parisiensi, 1292 generalis ordinis, 1295 archiep. Bourges, obiit 1316.\nG. Bertini, Catalogo critico delle opere di Egidio Romano, La Bibliofilia 36 (1934) 78–109; 37 (1935) 251–254; G. Bruni, Analect. Augustiniana 18, 95–124; 238–268 [edit Anon. Thomistae, Impugnationes contra Aegidium Romanum].\nI script. 1276/77; II script. 1308/09; III script. 1311/12; inter 1277 et 1279 Stefanus Tempier plures propositiones Aegidii Romani praesertim ex I Sent. extractas convocatis magistris examinandas proposuit; Aegidius vero non revocavit sed Parisiis secessit; 1285 Honorius IV mandat convocationi magistrorum Parisiensium, ut recipiant retractationem Aegidii. Hic indiculus habebat ut minimum 19 articulos, quorum unus: Persona, quae a se mittitur, a se procedit. Verum est de processione temporali; Art. 18: Quod non est malitia in voluntate, nisi sit error vel aliqua nescientia in ratione.\nE. Hocedez SJ, La condamnation de Gilles de Rome. Rech. Théol. anç. méd. 4 (1932) 34–38. F. Richeldi, Il commento di Egidio romano al libro III delle Sentenze di Pietro Lombardo. Modena 1942."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Aegidius Romanus Oesa"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_13_AegidiusRomanusOesa"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/mdFG1OY3So-2CRaPUBX68w"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "v. nr. [oid ###]1157[/oid]."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Ahacius N. Ex Landau"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_14_AhaciusNExLandau"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/A8M5e32ITmiIYf9mstvhLA"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Doctor universalis; obiit 1202. Dict. Hist. Géogr. I, 1299–1304. J. Huyzinga, Über die Verknüpfung des Poetischen mit dem Theologischen bei Alanus de Insulis. [Mededeelingen d. b. Akademie van Wetensch. Afd. Letterkunde, Deel 74 ser. B. n. 6.] Amsterdam 1932. Cl. Baeumker, Philos. Jahrb. 6 (1893); 7 (1894)."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Alanus Ab Insulis [de Ryssel]"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_15_AlanusAbInsulisdeRyssel"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/zCWVBLc1RE-3SoOcbLr8mw"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Theologus Parisiensis c. 1407. Fabricius I (1754) 43."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Albertus Engelschalk"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_16_AlbertusEngelschalk"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/fGPPBHQ6TJC4L4Q8iycWJg"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide: Johannes Findling, Commentarius in Guilelmi de Vorillon lecturam in Sententias."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Guilelmus de Vorillon"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_170_GuilelmusdeVorillon"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/TxqyWHc6QxiLct7KZT8hsg"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "1292 decanus; 1299/1300 mag. theol. Oxoniae.ŦFr. Ehrle, Festschrift Hertling 1913, 426–450. Fr. Pelster, Zeitschr. f. kath. Theol. 1922, 212–253; 361–401; 1923,483–494. Scholastik 1928, 411–413. B. Sharp, Revue Néoscol. 36 (1934) 332–354; 37 (1935) 88–104; 219–233. Grabmann, LThK. 9 (1937) 916; Dict. Théol. Cath. XIV, 2 (1941) 2867–2873 [Glorieux]."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Thomas de Sutton OP"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_502_ThomasdeSuttonOP"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/3Nf9-xU_RzGhYf2HcF_vuQ"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Novariensis; natus c. 1100; venit in Galliam c. 1136; breviter Remis moratus est, ubi docebat magister Lotulfus Novariensis; c. 1139 venit Parisios et commendatus a s. Bernardo morabatur in monasterio sancti Victoris; c. 1140–1159 docuit in scholis cathedralis Parisiensis; 1152 Romam profectus est; 1159 electus est episcopus Parisiensis, sed iam 1260 e vita migravit. Sent. I composuit probabiliter ante 1148; Sent. II–V probabiliter finivit hieme 1151/2.\nGregorianum 2 (1921) 387–392 et 15 (1934) 262–266 [F. Pelster; de tempore compositionis]; Scholastik 5 (1930) 569–573 [F. Pelster; de codice originali]; Rev. Hist. Eccl. 14 (1913) 511–536; 705–719 [J. de Ghellinck; de notis marginalibus]; 27 (1931) 792–830 et 30 (1934) [J. de Ghellinck; de vita]; Rech. Théol. anç. méd. 2 (1930) 80–99 [A. Landgraf; de critica textus]; Dict. Théol. Cath. XII,2 (1935) 1941–2019 [J. de Ghellinck]."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Petrus Lombardus"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_671_PetrusLombardus"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/rfbG-wYFSwi8A6xNXvwjOg"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide Antonius; Arnoldus Vesaliensis; Bandinus; Conradus OP; Dionysius Carthusiensis; Ps.Hugo de s. Caro; Jacobus de Lausanne; Dionysius Carthusianus; Ps. Hugo de s. Caro ; Jacobus de Lausanne; Odalricus Verdunensis; Simon Tornacensis; nr. 1070; 1190; 1342,1.\nA. Landgraf, Bearbeitungen von Werken des Petr. Lomb. Coll. Franc. 10, 321–337."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Abbreviationes Sententiarum Petri Lombardi"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_672_AbbreviationesSententiarumPetriLombardi"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/nY5furB5T5aitY1UOsSKBw"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Vide Odo Parisiensis; Petrus Comestor; Ps. Petrus Pictaviensis; Stefanus Langton; Udo. Anon. nr. 1111; 1273; 1274; 1286.\nA. Landgraf, Sentenzenglossen des beginnenden 13. Jahrhunderts. Rech. Théol. anç. méd. 10 (1938) 36–55. A.\nLandgraf, The first Sentence Commentary of early Scholasticism New Scholasticism 13 (1939) 101–132 (Napoli, Naz. VII C 14 = Stefan Langton) A. LANDGRAF, Z.f.k.Th. 58 (1934) 397."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Glossae in Sententias Petri Lombardi"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_676_GlossaeinSententiasPetriLombardi"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/ejwBdQGEQcuX3GC9Nf09Ew"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "1285–1291 docuit theologiam in universitate Parisiensi, 1292 generalis ordinis, 1295 archiep. Bourges, obiit 1316.\nG. Bertini, Catalogo critico delle opere di Egidio Romano, La Bibliofilia 36 (1934) 78–109; 37 (1935) 251–254; G. Bruni, Analect. Augustiniana 18, 95–124; 238–268 [edit Anon. Thomistae, Impugnationes contra Aegidium Romanum].\nI script. 1276/77; II script. 1308/09; III script. 1311/12; inter 1277 et 1279 Stefanus Tempier plures propositiones Aegidii Romani praesertim ex I Sent. extractas convocatis magistris examinandas proposuit; Aegidius vero non revocavit sed Parisiis secessit; 1285 Honorius IV mandat convocationi magistrorum Parisiensium, ut recipiant retractationem Aegidii. Hic indiculus habebat ut minimum 19 articulos, quorum unus: Persona, quae a se mittitur, a se procedit. Verum est de processione temporali; Art. 18: Quod non est malitia in voluntate, nisi sit error vel aliqua nescientia in ratione.\nE. Hocedez SJ, La condamnation de Gilles de Rome. Rech. Théol. anç. méd. 4 (1932) 34–38. F. Richeldi, Il commento di Egidio romano al libro III delle Sentenze di Pietro Lombardo. Modena 1942."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Aegidius Romanus"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_683_AegidiusRomanus"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/L4-P2CFqS2Gkg2OA0wqcXA"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "c. 1245–1250 scripsit In Sententias et Summam de creaturis; post 1270 composuit Summam theologiae; decessit 1280; 1249 scripsit in IV. librum Sententiarum.\nA. Ohlmeyer, Rech. Théol. anç. méd. 6 (1934) 42–54; 424–427. H. Kühle, Geisteswelt des MA I, 591–610. F. M. Henquinet, Une pièce inédite du Commentaire d’Albert le Grand sur le IV. livre des Sentences. Rech. Théol. anç. méd. 7 (1935) 263–293r de sensibus corporis gloriosi]. M. Henquinet, New Scholasticism 9 (1935) 283–328 [quaestiones vat. lat. 781 f. 9–31]. A. Fries, Angelicum 13 (1936) 60–92 [quaestiones vat lat. 781 f. 9–31; Karlsruhe, Landesbibl. Aug. 32; vat. lat. 4245 f. 22–24: Principia in f. 73–74; 76–79]. O. Lottin, Rech. Théol. anç. méd. 8 (1936) 117–153. H. Pouillou, Rech. Théol. anç. méd. 8 (1936) 203–206. Franzisk. Studien 27 (1940) 22–56; 65-87 (H. Neufeld). J. Hinz, Das Verhältnis des Sent. commentars von Thomas v. Aquino zu dem Alberts d. Gr. Diss. Würzburg 1936; L. Hausberger, Diss. Würzburg 1936."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Albertus Magnus"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_687_AlbertusMagnus"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/PxFFVykURHym4891nVQE3w"
                      }
                    },
                    {
                      "description": {
                        "type": "literal",
                        "value": "Dioecesis Eboracensis; memoratur Vaticana, vat. lat. 986 f. 11; 30; 52; 56."
                      },
                      "authorsname": {
                        "type": "literal",
                        "value": "Richardus de Chillington"
                      },
                      "label": {
                        "type": "literal",
                        "value": "AID_1097_RichardusdeChillington"
                      },
                      "my_person": {
                        "type": "uri",
                        "value": "http://rdfh.ch/0046/4AJ_b4XERhyPfWyUNuPdHg"
                      }
                    }
                  ]
                }
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
