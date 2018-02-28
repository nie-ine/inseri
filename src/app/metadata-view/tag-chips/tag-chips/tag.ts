/**
 * Created by Reto Baumgartner (rfbaumgartner) on 14.02.18.
 */
export class SubjectTag {
  id: string;
  iri: string;
  name: string;

  public constructor(id: string, iri: string, name: string) {
    this.id = id;
    this.iri = iri;
    this.name = name;
  }
}
