import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()

export class DataService {
  constructor(private http: HttpClient) {
  }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/sparql-results+json;charset=UTF-8'
    })
  };

  baseUrl = 'http://localhost:8080/repositories/knora-test?';
  query = 'PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20knora-base%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23%3E%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX%20drcs%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2F0046%2Fdrcs%23%3E%0APREFIX%20human%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2F0048%2Fhuman%23%3E%0APREFIX%20text%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2Fshared%2Ftext%23%3E%0APREFIX%20kuno-raeber%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2F004D%2Fkuno-raeber%23%3E%0A%0ASELECT%09%3Findexed_thing%20%3Flabel%20%3Foccurence%20%3Fadd_info_1%0A%0AWHERE%20%09%7B%3Findexed_thing%20%3Fsomeprop%20text%3AText%20.%0A%20%20%20%20%09%3Findexed_thing%20rdfs%3Alabel%20%3Flabel.%0A%20%20%20%20%20%20%20%20OPTIONAL%20%7B%3Findexed_thing%20drcs%3AhasStegmuellerPersonDescription%20%3Fsteg_object.%0A%20%20%20%20%20%20%20%09%09%09%09%09%3Fsteg_object%20knora-base%3AvalueHasString%20%3Fadd_info_1.%0A%20%20%20%20%20%20%20%20%20%20%20%20%09%09%09%3Findexed_thing%20human%3AhasName%20%3Fname_object.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Fname_object%20knora-base%3AvalueHasString%20%3Fdisplayed_text.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%09%09%3Findexed_thing%20human%3ApersonHasRole%20%3Frole.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%09%09%3Frole%20rdf%3Atype%20%3Foccurence.%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%09%09%0A%20%20%20%20%20%20%20%20%20%20%20%20%09%09%09%7D%0A%20%20%20%20%20%20%20%20%0A%09%09%09%09%0A%20%20%20%20%09%7D%0A%20limit%20100%20'  // query = 'PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20knora-base%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23%3E%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX%20drcs%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2F0046%2Fdrcs%23%3E%0APREFIX%20human%3A%20%3Chttp%3A%2F%2Fwww.knora.org%2Fontology%2F0048%2Fhuman%23%3E%0A%0ASELECT%09%3Fmy_person%20%3Flabel%20%3Fauthorsname%20%3Fdescription%0A%0AWHERE%20%09%7B%3Fmy_person%20rdf%3Atype%20drcs%3APerson%20.%0A%20%20%20%20%09%3Fmy_person%20rdfs%3Alabel%20%3Flabel.%0A%09%09%7BGRAPH%20%3Chttp%3A%2F%2Fwww.knora.org%2Fdata%2F0046%2FDRCS%3E%7B%20%20%20%20%09%20%23%20ONLY%20WITHIN%20%09%09%09DATA%20OF%20THE%20LOMBARD%20PROJECT%0A%20%20%20%20%20%20%20%20%3Fmy_person%20drcs%3AhasStegmuellerPersonDescription%20%3Fsteg_object.%0A%20%20%20%20%20%20%20%09%09%09%09%09%3Fsteg_object%20knora-base%3AvalueHasString%20%3Fdescription.%0A%20%20%20%20%20%20%20%20%20%20%20%20%09%09%09%3Fmy_person%20human%3AhasName%20%3Fname_object.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Fname_object%20knora-base%3AvalueHasString%20%3Fauthorsname.%0A%09%09%09%09%7D%0A%20%20%20%20%09%7D%0A%7D%0A';

  private getUrl(baseUrl, query) {
    let completeUrl: string;
    completeUrl = baseUrl + 'query=' + query;
    return completeUrl;
  }

/*  public getHeaders() {
      const complete_url = this.getUrl(this.baseUrl, this.query);
      console.log('post query to server ' + this.baseUrl)

      return this.http.get(complete_url, this.httpOptions)
        //.subscribe(response => {console.log(response)})
        .map((response: Response) => {
          const headers = [];
          for (let key in response ) {
            if(key === 'head' ) {
              headers.push(response[key])
            }
          }
          console.log(headers);
          return headers;
        });
    }*/

  public getData() {
    const complete_url = this.getUrl(this.baseUrl, this.query);
    console.log('post query to server ' + this.baseUrl);

    return this.http.get(complete_url, this.httpOptions);
      // .subscribe(response => {console.log(response)})
  }

}
