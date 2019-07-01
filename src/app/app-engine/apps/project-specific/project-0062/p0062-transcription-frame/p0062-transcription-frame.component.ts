import { Component, OnInit } from '@angular/core';
import { SelectableEnvironments, StyleDeclaration } from '../../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

/**
 * This component wraps the text-rich-innerhtml component and governs its input.
 * It is intended to be a NIE-OS app.
 */
@Component({
  selector: 'app-p0062-transcription-frame',
  templateUrl: './p0062-transcription-frame.component.html',
  styleUrls: ['./p0062-transcription-frame.component.scss']
})
export class P0062TranscriptionFrameComponent implements OnInit {

  /**
   * The unsanitized HTML content.
   * TODO replace default value.
   */
  htmlContent = '<div xmlns=""><span class="">Beta: </span><span class="page"></span><span class="">\n' +
    '        </span><div class="opener"><div class="address"><p class="#alr"><span class="placeName"><span class="#scl"><span class="">Leipzig</span></span></span><span class="">, d. 24/2.1883</span></p></div><span class="">\n' +
    '          </span><div height="1 em"></div><span class="">\n' +
    '        </span><p class="salute #fi1"><span class="">Lieber Doctor!</span></p></div><span class="">\n' +
    '        </span><div height="1 em"></div><span class="">\n' +
    '        </span><p><span class="">Es war mir ein rechter Trost </span><span class="subst"><span class="small-replaced"><span class="gap">x</span></span><span class="big-replaced"><span class="ref:AHS.witn.1 witn-lemma ">v</span></span></span><span class="ref:AHS.witn.1 witn-lemma ">on</span><span class="ref:AHS.witn.1 witn-lemma ">\n' +
    '          Ihrem letzten Briefe</span><span class=""> den Kopf zu finden:</span><span class="">\n' +
    ' „Ihre Briefe sind mir immer eine Freude.“</span><span class="">\n' +
    ' Denn ich habe gar manchmal gezögert</span><span class="">\n' +
    ' mein unbedeutendes Geschreibsel fort</span><span class="">zuschicken und wenn es fortwar, hätte</span><span class="">\n' +
    ' ich es gern wieder zurückgehabt. </span><span class="ref:AHS.witn.2 witn-lemma ">Sie</span><span class="ref:AHS.witn.2 witn-lemma ">\n' +
    '          machen mir Courage!</span></p><span class="">\n' +
    '        </span><p><span class="ref:AHS.witn.8 witn-lemma ">Das Erfreuliche zuerst. Vorgestern war</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    ' ich in einer großen Gesellschaft (– ich,</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    ' sonst ganz aus der Mode Gekommener,</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    ' mußte 5 Abende hintereinander große Diner\'s</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    ' und Soupers mitmachen und habe einige </span>⸢<span class="ref:AHS.witn.8 witn-lemma ">Male</span>⸣<span class="ref:AHS.witn.8 witn-lemma ">\n' +
    '          unter großem Beifall gesprochen, –). </span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">Der</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    '          Erste den ich sah, war </span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma ">Ebers</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma "> umgeben von</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma ">\n' +
    '          einer Schaar von Frauen und Männern.</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma ">\n' +
    '          Ich wollte die erste Gelegenheit abwarten um</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma ">\n' +
    '          ihn anzureden. Da trat er,</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma "> auf seine Krücke</span><span class="ref:Ebers person ref:AHS.expl.1 expl-lemma ref:AHS.witn.8 witn-lemma ref:AHS.witn.10 witn-lemma ">\n' +
    '          gestützt</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">, plötzlich auf mich zu, um mich zu</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    ' begrüßen und ein langes, zuerst stehend</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    ' dann sitzend</span><span class="subst"><span class="small-replaced"><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">es</span></span><span class="big-replaced"><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">g</span></span></span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">efuhrtes Gespräch drehte sich </span><span class="page">|<span class="pageNumber">2</span></span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma "> einzig und allein um Sie. Es war</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    ' mir geradezu wohlthuend in welcher</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    ' Weise er von Ihnen sprach. </span><span class="ref:Ebers person ref:AHS.expl.2 expl-lemma ref:AHS.witn.8 witn-lemma ">Er werde</span><span class="ref:Ebers person ref:AHS.expl.2 expl-lemma ref:AHS.witn.8 witn-lemma ">\n' +
    '          über </span><span class="ref:Ebers person ref:AHS.expl.2 expl-lemma ref:AHS.text.1 text-lemma ref:AHS.witn.8 witn-lemma ">sie</span><span class="ref:Ebers person ref:AHS.expl.2 expl-lemma ref:AHS.witn.8 witn-lemma "> schreiben</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">, erwähnte er auch. Endlich</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    ' wurde ich von ihm gedrängt und ich konnte</span><span class="ref:Ebers person ref:AHS.witn.8 witn-lemma ">\n' +
    '          nicht wieder zu ihm kommen.</span></p><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    '        </span><p><span class="ref:AHS.witn.8 witn-lemma ">Keine der anderen z. Th. recht </span><span class="ref:AHS.text.4 text-lemma ref:AHS.witn.8 witn-lemma ">ansehnlichen</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    ' Gesellschaften ist ohne an Sie erinnert zu</span><span class="ref:AHS.witn.8 witn-lemma ">\n' +
    '          werden, vorüber gegangen.</span><span class=""> Man ehrt mich</span><span class="">\n' +
    ' in Ihnen. Das ist auch so ganz richtig.</span></p><span class="">\n' +
    '        </span><p><span class="ref:Louise person ">Eine der Gesellschaften, erzählen Sie es</span><span class="ref:Louise person ">\n' +
    ' Frau Luise, war sowohl hinsichtlich der</span><span class="ref:Louise person ">\n' +
    ' Empfangsräume, als der Bewirthung, als</span><span class="ref:Louise person ">\n' +
    '          der Gesellschaft, von fürstlicher Pracht.</span><span class=""> Ich</span><span class="">\n' +
    ' habe noch niemals so viel Diamantenschmuck</span><span class="">\n' +
    ' gesehen und die Dame, welche ich zu Tische</span><span class="">\n' +
    ' führte war bedeckt von den schönsten Steinen.</span><span class="">\n' +
    ' Ich sage immer: wie eine Wilde! wenn</span><span class="">\n' +
    ' ich Aehnliches sehe.</span></p><span class="">\n' +
    '        </span><p><span class="ref:AHS.witn.3 witn-lemma ">Die eine Mittheilung Ihres Briefes,</span><span class="ref:AHS.witn.3 witn-lemma ">\n' +
    '          die mir </span><span class="ref:AHS.expl.3 expl-lemma ref:AHS.witn.3 witn-lemma ">den Scheideweg schildert an dem</span><span class="ref:AHS.expl.3 expl-lemma ref:AHS.witn.3 witn-lemma ">\n' +
    '          Sie wiederum stehen</span><span class="ref:AHS.witn.3 witn-lemma ">, hat mich recht bedenklich</span><span class="ref:AHS.witn.3 witn-lemma ">\n' +
    '          gemacht.</span><span class=""> Möchten Sie inzwischen dazu</span><span class="">\n' +
    ' gekommen seyn, eine bestimmte Richtung</span><span class="">\n' +
    ' einzuschlagen. Welche es auch sey, – das </span><span class="page">|<span class="pageNumber">3</span></span><span class=""> gute Ziel wird erreicht werden.</span></p><span class="">\n' +
    '        </span><p><span class="ref:Gedichte person ref:AHS.witn.4 witn-lemma ">Ueber die Gedichte müssen Sie anderer</span><span class="ref:Gedichte person ref:AHS.witn.4 witn-lemma ">\n' +
    '          Ansicht werden.</span><span class="ref:Gedichte person "> Ich habe wohl so bestimmt nicht</span><span class="ref:Gedichte person ">\n' +
    ' gesagt: sie gehen </span><span class="#deu"><span class="ref:Gedichte person ">nicht</span></span><span class="ref:Gedichte person ">. – Ich finde daß sie</span><span class="ref:Gedichte person ">\n' +
    '          mäßig gehen, aber sie gehen. </span><span class="ref:Gedichte person ref:Frey.Adolf person ref:Deutsche_Rundschau paper ref:AHS.expl.4 expl-lemma ref:AHS.witn.9 witn-lemma ">Frey\'s Kritik</span><span class="ref:Gedichte person ref:Frey.Adolf person ref:Deutsche_Rundschau paper ref:AHS.witn.9 witn-lemma ">\n' +
    ' ist dem Absatze günstig gewesen. Ich glaube</span><span class="ref:Gedichte person ref:Frey.Adolf person ref:Deutsche_Rundschau paper ref:AHS.witn.9 witn-lemma ">\n' +
    '          er kann Alles Gesagte verantworten.</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma "> – Der</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' Absatz wird in dem ersten Jahre nicht 600 Ex.</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' erreichen, wohl glaube ich aber, daß etwa</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' 400 Ex. abgesetzt seyn können. Das ist ganz</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' zufriedenstellend. Trifft meine Erwartung</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' ein, so können in diesem Jahre wohl noch</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    ' 200 verkauft werden und Sie lassen </span>⸢<span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">dann</span>⸣<span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma "> 1884</span><span class="ref:Gedichte person ref:AHS.witn.9 witn-lemma ">\n' +
    '          die 2. Auflage erscheinen.</span></p><span class="ref:Gedichte person ">\n' +
    '        </span><p><span class="ref:Gedichte person ">Das zu Ihrem Troste.</span><span class=""> Ob in diesem</span><span class="">\n' +
    ' Jahre sonst noch etwas nothwendig werden</span><span class="">\n' +
    ' wird, das kann ich vor der Ostermesse nicht</span><span class="">\n' +
    ' wissen und ich würde davon nicht reden,</span><span class="">\n' +
    ' um Sie nicht in Ihren Arbeiten zu stören.</span></p><span class="">\n' +
    '        </span><p><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:AHS.witn.5 witn-lemma ">Ihr Urtheil über Laube gefällt mir sehr.</span><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:AHS.witn.5 witn-lemma ">\n' +
    ' </span><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma ">Es wandert in der nächsten Stunde an</span><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma ">\n' +
    '          </span><span class="#scl"><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma ">Laube</span></span><span class="ref:Norddeutsche_Theater person ref:Burgtheater person ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma ">,</span><span class="ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma "> denn ich denke Sie wollen dem</span><span class="ref:Laube.Heinrich person ref:AHS.witn.5 witn-lemma ">\n' +
    '          alten Herrn eine Freude machen.</span><span class="ref:Laube.Heinrich person "> </span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ">Das will</span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ">\n' +
    ' ich auch, denn er hat mir </span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ref:AHS.expl.5 expl-lemma ">sein neues </span><span class="page">|<span class="pageNumber">4</span></span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ref:AHS.expl.5 expl-lemma "> Lustspiel </span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ref:AHS.expl.5 expl-lemma ref:AHS.text.2 text-lemma ">„Sauspielerei“</span><span class="ref:Laube.Heinrich person ref:Schauspielerei person "> vorige Woche</span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ">\n' +
    ' geschickt, das immer noch des Guten</span><span class="ref:Laube.Heinrich person ref:Schauspielerei person ">\n' +
    '          gar Vieles enthält.</span></p><span class="">\n' +
    '        </span><p><span class="ref:Keller person ref:Spitteler person ref:AHS.expl.6 expl-lemma ">Was </span><span class="#scl"><span class="ref:Keller person ref:Spitteler person ref:AHS.expl.6 expl-lemma ">Keller</span></span><span class="ref:Keller person ref:Spitteler person ref:AHS.expl.6 expl-lemma "> an </span><span class="#scl"><span class="ref:Keller person ref:Spitteler person ref:AHS.expl.6 expl-lemma ">Tandem</span></span><span class="ref:Keller person ref:Spitteler person ref:AHS.expl.6 expl-lemma "> geschrieben</span><span class="ref:Keller person ref:Spitteler person ">\n' +
    ' möchte ich wohl wissen. Vielleicht theilt</span><span class="ref:Keller person ref:Spitteler person ">\n' +
    ' es mir </span><span class="#scl"><span class="ref:Keller person ref:Spitteler person ">Tandem</span></span><span class="ref:Keller person ref:Spitteler person "> mit, dem ich morgen</span><span class="ref:Keller person ref:Spitteler person ">\n' +
    '          zu schreiben habe.</span><span class=""> </span><span class="ref:Extramundana person ">Es ist etwas Sonderbares</span><span class="ref:Extramundana person ">\n' +
    ' um des Mannes Buch. Soeben verläßt</span><span class="ref:Extramundana person ">\n' +
    ' mich ein Gelehrter, der mich darum bat,</span><span class="ref:Extramundana person ">\n' +
    ' da er Interessantes davon gehört. – In</span><span class="ref:Extramundana person ">\n' +
    ' einzelnen Exemplaren ist es verlangt</span><span class="ref:Extramundana person ">\n' +
    ' worden, doch glaube ich nicht, daß mehr</span><span class="ref:Extramundana person ">\n' +
    '          als 50 verkauft seyn </span><span class="ref:Extramundana person ref:AHS.text.5 text-lemma ">können</span><span class="ref:Extramundana person ">. </span><span class="ref:Extramundana person ref:Spitteler person ">Das wäre</span><span class="ref:Extramundana person ref:Spitteler person ">\n' +
    ' mir ganz recht, wenn </span><span class="#scl"><span class="ref:Extramundana person ref:Spitteler person ">Tandem</span></span><span class="ref:Extramundana person ref:Spitteler person "> nur den</span><span class="ref:Extramundana person ref:Spitteler person ">\n' +
    ' rechten Weg erkennen würde, den er zu</span><span class="ref:Extramundana person ref:Spitteler person ">\n' +
    '          gehen hat.</span><span class=""> </span><span class="ref:Jesabel person ref:AHS.expl.7 expl-lemma ref:AHS.witn.7 witn-lemma ">Ein Drama, als nächste Arbeit</span><span class="ref:Jesabel person ref:AHS.expl.7 expl-lemma ref:AHS.witn.7 witn-lemma ">\n' +
    '          zu nehmen, ist mir sehr bedenklich.</span><span class=""> </span><span class="ref:Schiller person ref:Raeuber person ref:AHS.expl.8 expl-lemma ">Selbst</span><span class="ref:Schiller person ref:Raeuber person ref:AHS.expl.8 expl-lemma ">\n' +
    '          Schiller kam </span>[<span class="gray-unclear"><span class="ref:Schiller person ref:Raeuber person ref:AHS.expl.8 expl-lemma ">z</span></span>]<span class="ref:Schiller person ref:Raeuber person ref:AHS.expl.8 expl-lemma "> erst zur Erkenntniß, als</span><span class="ref:Schiller person ref:Raeuber person ref:AHS.expl.8 expl-lemma ">\n' +
    '          er das Theater leibhaftig zur Hand hatte.</span><span class="">\n' +
    '          </span><span class="ref:Schweiz place "> In einem Winkel der Schweiz wär</span>⸢<span class="ref:Schweiz place ">e</span>⸣<span class="ref:Schweiz place "> das</span><span class="ref:Schweiz place ">\n' +
    '          Gelingen wunderbar!</span></p><span class="">\n' +
    '        </span><p><span class="">Den </span><span class="ref:AHS.expl.9 expl-lemma ref:AHS.witn.6 witn-lemma ">Sammelband Ihrer kleinen</span><span class="ref:AHS.expl.9 expl-lemma ref:AHS.witn.6 witn-lemma ">\n' +
    '          Schriften</span><span class=""> bedenken Sie doch immer bei Gelegenheit</span></p><span class="">\n' +
    '        </span><div class="closer"><p class="salute #fi1"><span class="ref:Louise person ">Herzlich grüßt Sie und Frau Luise</span></p><span class="">\n' +
    '          </span><p class="salute #fi17"><span class="">Ihr</span></p><span class="">\n' +
    '            </span><p class="signed #fi19"><span class="#scl"><span class="">Haeßel</span></span></p></div><span class="">\n' +
    '        </span></div>';

  /**
   * Style declarations that are applied on init.
   * TODO: replace default
   */
  styleDeclarations: Array<StyleDeclaration> = [
      {
        'type': 'tag',
        'name': 'p',
        'styles': {
          'font-family': 'Garamond, Times, serif',
          'text-align': 'justify'
        }
      },
      {
        'type': 'class',
        'name': 'big-replaced',
        'styles': {'font-weight': 'bold'}
      },
      {
        'type': 'class',
        'name': 'small-replaced',
        'styles': {'font-size': '80%'}
      },
      {
        'type': 'class',
        'name': '#scl',
        'styles': {'font-family': 'Frutiger, Helvetica, sans-serif'}
      },
      {
        'type': 'class',
        'name': 'gap',
        'styles': {'font-style': 'italic'}
      },
      {
        'type': 'class',
        'name': 'supplied',
        'styles': {'font-style': 'italic'}
      },
      {
        'type': 'tag',
        'name': 'p',
        'styles': {'text-indent': '3em'}
      },
      {
        'type': 'class',
        'name': '#alr',
        'styles': {'text-align': 'right'}
      },
      {
        'type': 'class',
        'name': 'pageNumber',
        'styles': {
          'font-style': 'italic',
          'vertical-align': 'super',
          'font-size': '0.6em'
        }
      }
    ];

  /**
   * Dynamic style declarations.
   * TODO: remove default values.
   */
  selectiveStyleDeclarations: SelectableEnvironments = {
    'opener': [
      {
        'type': 'class',
        'name': 'opener',
        'styles': {'color': 'red'}
      }
    ],
    'closer': [
      {
        'type': 'class',
        'name': 'closer',
        'styles': {'color': 'blue'}
      }
    ],
    'index': [
      {
        'type': 'class',
        'name': 'person',
        'styles': {'background-color': 'green'}
      },
      {
        'type': 'class',
        'name': 'place',
        'styles': {'background-color': 'violet'}
      },
      {
        'type': 'class',
        'name': 'person',
        'styles': {'background-color': 'orange'}
      }
    ]
  };

  /**
   * Keys of selectiveStyleDeclarations that can be selected and de-selected.
   */
  annotationTypeIDs = new Set(['closer', 'opener', 'index']);

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  highlighted = ['opener'];

  /**
   * Add selectiveStyleDeclaration key when selecting.
   * TODO: by now, it is rewritten to make it easier to observe.
   * @param annotationTypeID  key of the style
   */
  activateAnnotationType(annotationTypeID: string) {
    this.highlighted = this.highlighted.concat(annotationTypeID);
  }

  /**
   * Remove selectiveStyleDeclaration key when de-selecting.
   * TODO: by now, it is rewritten to make it easier to observe.
   * @param annotationTypeID  key of the style
   */
  deactivateAnnotationType(annotationTypeID: string) {
    this.highlighted = this.highlighted.filter(key => key !== annotationTypeID);
  }

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * default written by angular-cli
   */
  ngOnInit() {
  }

}
