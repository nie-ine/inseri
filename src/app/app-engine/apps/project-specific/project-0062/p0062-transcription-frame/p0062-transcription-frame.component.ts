import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p0062-transcription-frame',
  templateUrl: './p0062-transcription-frame.component.html',
  styleUrls: ['./p0062-transcription-frame.component.scss']
})
export class P0062TranscriptionFrameComponent implements OnInit {

  htmlContent = '<div xmlns="">Beta: <span class="page"></span>\n' +
    '        <div class="opener"><span class="address"><p class="#alr"><span class="placeName"><span class="#scl">Leipzig</span></span>, d. 24/2.1883</p></span>\n' +
    '          <div height="1 em"></div>\n' +
    '        <p class="salute #fi1">Lieber Doctor!</p></div>\n' +
    '        <div height="1 em"></div>\n' +
    '        <p>Es war mir ein rechter Trost <a class="witn begin" id="ref:AHS.witn.1_b"></a><span class="subst"><span class="small-replaced"><span class="gap">x</span></span><span class="big-replaced">v</span></span>on\n' +
    '          Ihrem letzten Briefe<a class="witn end" id="ref:AHS.witn.1_e"></a> den Kopf zu finden:\n' +
    ' „Ihre Briefe sind mir immer eine Freude.“\n' +
    ' Denn ich habe gar manchmal gezögert\n' +
    ' mein unbedeutendes Geschreibsel fortzuschicken und wenn es fortwar, hätte\n' +
    ' ich es gern wieder zurückgehabt. <a class="witn begin" id="ref:AHS.witn.2_b"></a>Sie\n' +
    '          machen mir Courage!<a class="witn end" id="ref:AHS.witn.2_e"></a></p>\n' +
    '        <p><a class="witn begin" id="ref:AHS.witn.8_b"></a>Das Erfreuliche zuerst. Vorgestern war\n' +
    ' ich in einer großen Gesellschaft (– ich,\n' +
    ' sonst ganz aus der Mode Gekommener,\n' +
    ' mußte 5 Abende hintereinander große Diner\'s\n' +
    ' und Soupers mitmachen und habe einige ⸢Male⸣\n' +
    '          unter großem Beifall gesprochen, –). <a class="person begin ref:Ebers" id="AHS.pers.1_b"></a>Der\n' +
    '          Erste den ich sah, war <a class="witn begin" id="ref:AHS.witn.10_b"></a><a class="expl begin" id="ref:AHS.expl.1_b"></a>Ebers umgeben von\n' +
    '          einer Schaar von Frauen und Männern.\n' +
    '          Ich wollte die erste Gelegenheit abwarten um\n' +
    '          ihn anzureden. Da trat er, auf seine Krücke\n' +
    '          gestützt<a class="expl end" id="ref:AHS.expl.1_e"></a><a class="witn end" id="ref:AHS.witn.10_e"></a>, plötzlich auf mich zu, um mich zu\n' +
    ' begrüßen und ein langes, zuerst stehend\n' +
    ' dann sitzend<span class="subst"><span class="small-replaced">es</span><span class="big-replaced">g</span></span>efuhrtes Gespräch drehte sich <span class="page">|2</span> einzig und allein um Sie. Es war\n' +
    ' mir geradezu wohlthuend in welcher\n' +
    ' Weise er von Ihnen sprach. <a class="expl begin" id="ref:AHS.expl.2_b"></a>Er werde\n' +
    '          über <a class="text begin" id="ref:AHS.text.1_b"></a>sie<a class="text end" id="ref:AHS.text.1_e"></a> schreiben<a class="expl end" id="ref:AHS.expl.2_e"></a>, erwähnte er auch. Endlich\n' +
    ' wurde ich von ihm gedrängt und ich konnte\n' +
    '          nicht wieder zu ihm kommen.<a class="person end ref:Ebers" id="AHS.pers.1_e"></a></p>\n' +
    '        <p>Keine der anderen z. Th. recht <a class="text begin" id="ref:AHS.text.4_b"></a>ansehnlichen<a class="text end" id="ref:AHS.text.4_e"></a>\n' +
    ' Gesellschaften ist ohne an Sie erinnert zu\n' +
    '          werden, vorüber gegangen.<a class="witn end" id="ref:AHS.witn.8_e"></a> Man ehrt mich\n' +
    ' in Ihnen. Das ist auch so ganz richtig.</p>\n' +
    '        <p><a class="person begin ref:Louise" id="AHS.pers.2_b"></a>Eine der Gesellschaften, erzählen Sie es\n' +
    ' Frau Luise, war sowohl hinsichtlich der\n' +
    ' Empfangsräume, als der Bewirthung, als\n' +
    '          der Gesellschaft, von fürstlicher Pracht.<a class="person end ref:Louise" id="AHS.pers.2_e"></a> Ich\n' +
    ' habe noch niemals so viel Diamantenschmuck\n' +
    ' gesehen und die Dame, welche ich zu Tische\n' +
    ' führte war bedeckt von den schönsten Steinen.\n' +
    ' Ich sage immer: wie eine Wilde! wenn\n' +
    ' ich Aehnliches sehe.</p>\n' +
    '        <p><a class="witn begin" id="ref:AHS.witn.3_b"></a>Die eine Mittheilung Ihres Briefes,\n' +
    '          die mir <a class="expl begin" id="ref:AHS.expl.3_b"></a>den Scheideweg schildert an dem\n' +
    '          Sie wiederum stehen<a class="expl end" id="ref:AHS.expl.3_e"></a>, hat mich recht bedenklich\n' +
    '          gemacht.<a class="witn end" id="ref:AHS.witn.3_e"></a> Möchten Sie inzwischen dazu\n' +
    ' gekommen seyn, eine bestimmte Richtung\n' +
    ' einzuschlagen. Welche es auch sey, – das <span class="page">|3</span> gute Ziel wird erreicht werden.</p>\n' +
    '        <p><a class="person begin ref:Gedichte" id="AHS.pers.3_b"></a><a class="witn begin" id="ref:AHS.witn.4_b"></a>Ueber die Gedichte müssen Sie anderer\n' +
    '          Ansicht werden.<a class="witn end" id="ref:AHS.witn.4_e"></a> Ich habe wohl so bestimmt nicht\n' +
    ' gesagt: sie gehen <span class="#deu">nicht</span>. – Ich finde daß sie\n' +
    '          mäßig gehen, aber sie gehen. <a class="person begin ref:Frey.Adolf" id="AHS.pers.4_b"></a><a class="paper begin ref:Deutsche_Rundschau" id="AHS.pape.1_b"></a><a class="witn begin" id="ref:AHS.witn.9_b"></a><a class="expl begin" id="ref:AHS.expl.4_b"></a>Frey\'s Kritik<a class="expl end" id="ref:AHS.expl.4_e"></a>\n' +
    ' ist dem Absatze günstig gewesen. Ich glaube\n' +
    '          er kann Alles Gesagte verantworten.<a class="person end ref:Frey.Adolf" id="AHS.pers.4_e"></a><a class="paper end ref:Deutsche_Rundschau" id="AHS.pape.1_e"></a> – Der\n' +
    ' Absatz wird in dem ersten Jahre nicht 600 Ex.\n' +
    ' erreichen, wohl glaube ich aber, daß etwa\n' +
    ' 400 Ex. abgesetzt seyn können. Das ist ganz\n' +
    ' zufriedenstellend. Trifft meine Erwartung\n' +
    ' ein, so können in diesem Jahre wohl noch\n' +
    ' 200 verkauft werden und Sie lassen ⸢dann⸣ 1884\n' +
    '          die 2. Auflage erscheinen.<a class="witn end" id="ref:AHS.witn.9_e"></a></p>\n' +
    '        <p>Das zu Ihrem Troste.<a class="person end ref:Gedichte" id="AHS.pers.3_e"></a> Ob in diesem\n' +
    ' Jahre sonst noch etwas nothwendig werden\n' +
    ' wird, das kann ich vor der Ostermesse nicht\n' +
    ' wissen und ich würde davon nicht reden,\n' +
    ' um Sie nicht in Ihren Arbeiten zu stören.</p>\n' +
    '        <p><a class="person begin ref:Norddeutsche_Theater" id="AHS.pers.13_b"></a><a class="person begin ref:Burgtheater" id="AHS.pers.14_b"></a><a class="witn begin" id="ref:AHS.witn.5_b"></a>Ihr Urtheil über Laube gefällt mir sehr.\n' +
    ' <a class="person begin ref:Laube.Heinrich" id="AHS.pers.5_b"></a>Es wandert in der nächsten Stunde an\n' +
    '          <span class="#scl">Laube</span>,<a class="person end ref:Norddeutsche_Theater" id="AHS.pers.13_e"></a><a class="person end ref:Burgtheater" id="AHS.pers.14_e"></a> denn ich denke Sie wollen dem\n' +
    '          alten Herrn eine Freude machen.<a class="witn end" id="ref:AHS.witn.5_e"></a> <a class="person begin ref:Schauspielerei" id="AHS.pers.6_b"></a>Das will\n' +
    ' ich auch, denn er hat mir <a class="expl begin" id="ref:AHS.expl.5_b"></a>sein neues <span class="page">|4</span> Lustspiel <a class="text begin" id="ref:AHS.text.2_b"></a>„Sauspielerei“<a class="text end" id="ref:AHS.text.2_e"></a><a class="expl end" id="ref:AHS.expl.5_e"></a> vorige Woche\n' +
    ' geschickt, das immer noch des Guten\n' +
    '          gar Vieles enthält.<a class="person end ref:Laube.Heinrich" id="AHS.pers.5_e"></a><a class="person end ref:Schauspielerei" id="AHS.pers.6_e"></a></p>\n' +
    '        <p><a class="person begin ref:Keller" id="AHS.pers.7_b"></a><a class="person begin ref:Spitteler" id="AHS.pers.8_b"></a><a class="expl begin" id="ref:AHS.expl.6_b"></a>Was <span class="#scl">Keller</span> an <span class="#scl">Tandem</span> geschrieben<a class="expl end" id="ref:AHS.expl.6_e"></a>\n' +
    ' möchte ich wohl wissen. Vielleicht theilt\n' +
    ' es mir <span class="#scl">Tandem</span> mit, dem ich morgen\n' +
    '          zu schreiben habe.<a class="person end ref:Keller" id="AHS.pers.7_e"></a><a class="person end ref:Spitteler" id="AHS.pers.8_e"></a> <a class="person begin ref:Extramundana" id="AHS.pers.9_b"></a>Es ist etwas Sonderbares\n' +
    ' um des Mannes Buch. Soeben verläßt\n' +
    ' mich ein Gelehrter, der mich darum bat,\n' +
    ' da er Interessantes davon gehört. – In\n' +
    ' einzelnen Exemplaren ist es verlangt\n' +
    ' worden, doch glaube ich nicht, daß mehr\n' +
    '          als 50 verkauft seyn <a class="text begin" id="ref:AHS.text.5_b"></a>können<a class="text end" id="ref:AHS.text.5_e"></a>. <a class="person begin ref:Spitteler" id="AHS.pers.10_b"></a>Das wäre\n' +
    ' mir ganz recht, wenn <span class="#scl">Tandem</span> nur den\n' +
    ' rechten Weg erkennen würde, den er zu\n' +
    '          gehen hat.<a class="person end ref:Extramundana" id="AHS.pers.9_e"></a><a class="person end ref:Spitteler" id="AHS.pers.10_e"></a> <a class="expl begin" id="ref:AHS.expl.7_b"></a><a class="person begin ref:Jesabel" id="AHS.pers.11_b"></a><a class="witn begin" id="ref:AHS.witn.7_b"></a>Ein Drama, als nächste Arbeit\n' +
    '          zu nehmen, ist mir sehr bedenklich.<a class="expl end" id="ref:AHS.expl.7_e"></a><a class="witn end" id="ref:AHS.witn.7_e"></a><a class="person end ref:Jesabel" id="AHS.pers.11_e"></a> <a class="person begin ref:Schiller" id="AHS.pers.12_b"></a><a class="person begin ref:Raeuber" id="AHS.pers.16_b"></a><a class="expl begin" id="ref:AHS.expl.8_b"></a>Selbst\n' +
    '          Schiller kam [<span class="gray-unclear">z</span>] erst zur Erkenntniß, als\n' +
    '          er das Theater leibhaftig zur Hand hatte.<a class="expl end" id="ref:AHS.expl.8_e"></a><a class="person end ref:Raeuber" id="AHS.pers.16_e"></a><a class="person end ref:Schiller" id="AHS.pers.12_e"></a>\n' +
    '          <a class="place begin ref:Schweiz" id="AHS.plac.1_b"></a> In einem Winkel der Schweiz wär⸢e⸣ das\n' +
    '          Gelingen wunderbar!<a class="place end ref:Schweiz" id="AHS.plac.1_e"></a></p>\n' +
    '        <p>Den <a class="witn begin" id="ref:AHS.witn.6_b"></a><a class="expl begin" id="ref:AHS.expl.9_b"></a>Sammelband Ihrer kleinen\n' +
    '          Schriften<a class="expl end" id="ref:AHS.expl.9_e"></a><a class="witn end" id="ref:AHS.witn.6_e"></a> bedenken Sie doch immer bei Gelegenheit</p>\n' +
    '        <div class="closer"><p class="salute #fi1"><a class="person begin ref:Louise" id="AHS.pers.15_b"></a>Herzlich grüßt Sie und Frau Luise<a class="person end ref:Louise" id="AHS.pers.15_e"></a></p>\n' +
    '          <p class="salute #fi17">Ihr</p>\n' +
    '            <p class="signed #fi19"><span class="#scl">Haeßel</span></p></div>\n' +
    '        </div>';

  styleDeclarations = {
    'initial': [
      {
        'type': 'tag',
        'name': 'p',
        'styles': {
          'fontFamily': 'Garamond, Times, serif',
          'textAlign': 'justify'
        }
      },
      {
        'type': 'class',
        'name': 'big-replaced',
        'styles': {'fontWeight': 'bold'}
      },
      {
        'type': 'class',
        'name': 'small-replaced',
        'styles': {'fontSize': '80%'}
      },
      {
        'type': 'class',
        'name': '#scl',
        'styles': {'fontFamily': 'Frutiger, Helvetica, sans-serif'}
      },
      {
        'type': 'class',
        'name': 'gap',
        'styles': {'fontStyle': 'italic'}
      },
      {
        'type': 'class',
        'name': 'supplied',
        'styles': {'fontStyle': 'italic'}
      },
      {
        'type': 'tag',
        'name': 'p',
        'styles': {'textIndent': '3em'}
      },
      {
        'type': 'class',
        'name': '#alr',
        'styles': {'textAlign': 'right'}
      }
    ]};


  constructor() { }

  ngOnInit() {
  }

}
