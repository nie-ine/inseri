'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">nie-frontend documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' : 'data-target="#xs-components-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' : 'id="xs-components-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' : 'data-target="#xs-injectables-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' : 'id="xs-injectables-links-module-AppModule-56563cc15c589ffc42c45443acda173a"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthenticationService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/BaseTypeFormsModule.html" data-type="entity-link">BaseTypeFormsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-BaseTypeFormsModule-6b26ceabb79f8595cda757da5e5b3153"' : 'data-target="#xs-components-links-module-BaseTypeFormsModule-6b26ceabb79f8595cda757da5e5b3153"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-BaseTypeFormsModule-6b26ceabb79f8595cda757da5e5b3153"' : 'id="xs-components-links-module-BaseTypeFormsModule-6b26ceabb79f8595cda757da5e5b3153"' }>
                                        <li class="link">
                                            <a href="components/BooleanValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BooleanValueEditorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DateValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateValueEditorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DateValueViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateValueViewerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DecimalValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DecimalValueEditorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/IntValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IntValueEditorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LinkValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LinkValueEditorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LinkValueLabelViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LinkValueLabelViewerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextValueEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextValueEditorComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ComplexTextViewsModule.html" data-type="entity-link">ComplexTextViewsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ComplexTextViewsModule-879e852fcd40c6f48d8d05c793e9e3f9"' : 'data-target="#xs-components-links-module-ComplexTextViewsModule-879e852fcd40c6f48d8d05c793e9e3f9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ComplexTextViewsModule-879e852fcd40c6f48d8d05c793e9e3f9"' : 'id="xs-components-links-module-ComplexTextViewsModule-879e852fcd40c6f48d8d05c793e9e3f9"' }>
                                        <li class="link">
                                            <a href="components/InterlinearGlossingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InterlinearGlossingComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextPageOfWordsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextPageOfWordsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextSvgViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextSvgViewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextSvgViewWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextSvgViewWrapperComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' : 'data-target="#xs-components-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' : 'id="xs-components-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' }>
                                        <li class="link">
                                            <a href="components/DialogUserSettingsDialog.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogUserSettingsDialog</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ExtendSessionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExtendSessionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/InitPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InitPopupComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PizzaPartyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PizzaPartyComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' : 'data-target="#xs-injectables-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' : 'id="xs-injectables-links-module-CoreModule-2d36ae8d1f7679235a2f4684b434c11b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KnoraAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KnoraRequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraRequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResultToTextMapperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ResultToTextMapperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SparqlRequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SparqlRequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SynopsisObjectStorageService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CreateResourceModule.html" data-type="entity-link">CreateResourceModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' : 'data-target="#xs-components-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' : 'id="xs-components-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' }>
                                        <li class="link">
                                            <a href="components/CreateResourceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateResourceComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' : 'data-target="#xs-injectables-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' : 'id="xs-injectables-links-module-CreateResourceModule-94c3ef83e524f8aca4319bd343616931"' }>
                                        <li class="link">
                                            <a href="injectables/KnoraV1RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraV1RequestService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/D3jsModule.html" data-type="entity-link">D3jsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-D3jsModule-7f5c1ba57c38aee00058a8b03370c5e7"' : 'data-target="#xs-components-links-module-D3jsModule-7f5c1ba57c38aee00058a8b03370c5e7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-D3jsModule-7f5c1ba57c38aee00058a8b03370c5e7"' : 'id="xs-components-links-module-D3jsModule-7f5c1ba57c38aee00058a8b03370c5e7"' }>
                                        <li class="link">
                                            <a href="components/BarChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarChartComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/BrushAndZoomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrushAndZoomComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ChordDiagramComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChordDiagramComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/D3tutorialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">D3tutorialComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LeafletExampleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeafletExampleComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MultiLineChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MultiLineChartComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PieChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieChartComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RadialBarchartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadialBarchartComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SankeyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SankeyComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SpiralBarChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpiralBarChartComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/StackedBarChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StackedBarChartComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DashboardModule-5c841f5aa65a2b8ce20b340c88e95b63"' : 'data-target="#xs-components-links-module-DashboardModule-5c841f5aa65a2b8ce20b340c88e95b63"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DashboardModule-5c841f5aa65a2b8ce20b340c88e95b63"' : 'id="xs-components-links-module-DashboardModule-5c841f5aa65a2b8ce20b340c88e95b63"' }>
                                        <li class="link">
                                            <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DeleteActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteActionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DialogOverviewExampleDialog.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogOverviewExampleDialog</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditActionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImpressumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImpressumComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DataManagementToolModule.html" data-type="entity-link">DataManagementToolModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' : 'data-target="#xs-components-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' : 'id="xs-components-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' }>
                                        <li class="link">
                                            <a href="components/DataChooserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataChooserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataChooserSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataChooserSettingsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' : 'data-target="#xs-injectables-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' : 'id="xs-injectables-links-module-DataManagementToolModule-34a8b68e7e9f0b88f6c9987f38672341"' }>
                                        <li class="link">
                                            <a href="injectables/FileDatabase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>FileDatabase</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DeveloperNotesModule.html" data-type="entity-link">DeveloperNotesModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/DevelopmentViewsModule.html" data-type="entity-link">DevelopmentViewsModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/FactSheetModule.html" data-type="entity-link">FactSheetModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-FactSheetModule-ef28438b1745f5ccc49dc88216815a27"' : 'data-target="#xs-components-links-module-FactSheetModule-ef28438b1745f5ccc49dc88216815a27"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-FactSheetModule-ef28438b1745f5ccc49dc88216815a27"' : 'id="xs-components-links-module-FactSheetModule-ef28438b1745f5ccc49dc88216815a27"' }>
                                        <li class="link">
                                            <a href="components/FactSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FactSheetComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HowToProgramWithNieOSModule.html" data-type="entity-link">HowToProgramWithNieOSModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HowToProgramWithNieOSModule-4dafaafa290ce3cc1aee57b5ae99444a"' : 'data-target="#xs-components-links-module-HowToProgramWithNieOSModule-4dafaafa290ce3cc1aee57b5ae99444a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HowToProgramWithNieOSModule-4dafaafa290ce3cc1aee57b5ae99444a"' : 'id="xs-components-links-module-HowToProgramWithNieOSModule-4dafaafa290ce3cc1aee57b5ae99444a"' }>
                                        <li class="link">
                                            <a href="components/DictionaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DictionaryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MyPractiseComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyPractiseComponentComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextDisplayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextDisplayComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HtmlViewerModule.html" data-type="entity-link">HtmlViewerModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HtmlViewerModule-e24c4e41c5f5d04d6bacb4e77bd0b77b"' : 'data-target="#xs-components-links-module-HtmlViewerModule-e24c4e41c5f5d04d6bacb4e77bd0b77b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HtmlViewerModule-e24c4e41c5f5d04d6bacb4e77bd0b77b"' : 'id="xs-components-links-module-HtmlViewerModule-e24c4e41c5f5d04d6bacb4e77bd0b77b"' }>
                                        <li class="link">
                                            <a href="components/HtmlViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HtmlViewerComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ImageFrameModule.html" data-type="entity-link">ImageFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' : 'data-target="#xs-components-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' : 'id="xs-components-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' }>
                                        <li class="link">
                                            <a href="components/ImageFrameSizesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageFrameSizesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImageWithOverlayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageWithOverlayComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' : 'data-target="#xs-injectables-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' : 'id="xs-injectables-links-module-ImageFrameModule-7368e2dcba314db09350be3c6268270a"' }>
                                        <li class="link">
                                            <a href="injectables/RegionToSvgService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>RegionToSvgService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ImageViewModule.html" data-type="entity-link">ImageViewModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ImageViewModule-f74a7602df58a7b27830371999a11778"' : 'data-target="#xs-components-links-module-ImageViewModule-f74a7602df58a7b27830371999a11778"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ImageViewModule-f74a7602df58a7b27830371999a11778"' : 'id="xs-components-links-module-ImageViewModule-f74a7602df58a7b27830371999a11778"' }>
                                        <li class="link">
                                            <a href="components/ImageFrameOldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageFrameOldComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImageViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MetadataViewModule.html" data-type="entity-link">MetadataViewModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MetadataViewModule-5b583cfbd0bdfd74de70ba4205068f04"' : 'data-target="#xs-components-links-module-MetadataViewModule-5b583cfbd0bdfd74de70ba4205068f04"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MetadataViewModule-5b583cfbd0bdfd74de70ba4205068f04"' : 'id="xs-components-links-module-MetadataViewModule-5b583cfbd0bdfd74de70ba4205068f04"' }>
                                        <li class="link">
                                            <a href="components/MetadataViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MockupTutorialModule.html" data-type="entity-link">MockupTutorialModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MockupTutorialModule-0f94cac793a1a46a1c60e30fba3a618f"' : 'data-target="#xs-components-links-module-MockupTutorialModule-0f94cac793a1a46a1c60e30fba3a618f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MockupTutorialModule-0f94cac793a1a46a1c60e30fba3a618f"' : 'id="xs-components-links-module-MockupTutorialModule-0f94cac793a1a46a1c60e30fba3a618f"' }>
                                        <li class="link">
                                            <a href="components/MyMainComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyMainComponentComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MyPageSetModule.html" data-type="entity-link">MyPageSetModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' : 'data-target="#xs-components-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' : 'id="xs-components-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' }>
                                        <li class="link">
                                            <a href="components/DeletePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeletePageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DialogCreateNewPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogCreateNewPageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DuplicatePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DuplicatePageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditPageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditPageSetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditPageSetComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageSetLandingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageSetLandingPageComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' : 'data-target="#xs-injectables-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' : 'id="xs-injectables-links-module-MyPageSetModule-a18fb614e80887f3c0b4dfcd168a4e7c"' }>
                                        <li class="link">
                                            <a href="injectables/GenerateHashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>GenerateHashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PageSetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PageSetService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NIEOSModule.html" data-type="entity-link">NIEOSModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'data-target="#xs-components-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'id="xs-components-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                        <li class="link">
                                            <a href="components/DataAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataAssignmentComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataListView.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListView</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataListViewDetailsDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewDetailsDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataListViewSettings.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewSettings</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataListViewTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DataManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataManagementComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/Frame.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Frame</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FrameSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FrameSettingsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/GrapesjsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GrapesjsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/KeyValueFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeyValueFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoadVariablesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadVariablesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NewGjsBoxDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewGjsBoxDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/OpenbisLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OpenbisLoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ParzivalFassungComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParzivalFassungComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QueryAppInputMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryAppInputMapComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QueryEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryEntryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QueryInformationDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryInformationDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QueryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryListComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResponseTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResponseTreeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SimpleImageAppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimpleImageAppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextlistViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextlistViewerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UpdateLinkedAppsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateLinkedAppsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'data-target="#xs-injectables-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'id="xs-injectables-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                        <li class="link">
                                            <a href="injectables/FileDatabase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>FileDatabase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateHashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>GenerateHashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SendGravSearchQueryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SendGravSearchQueryService</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'data-target="#xs-pipes-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' : 'id="xs-pipes-links-module-NIEOSModule-dfe7db13540c5afa56da8cdf70d49c14"' }>
                                        <li class="link">
                                            <a href="pipes/HighlightPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HighlightPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NavigationModule.html" data-type="entity-link">NavigationModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NavigationModule-e1c7876d3914d6997603a66855c1e433"' : 'data-target="#xs-components-links-module-NavigationModule-e1c7876d3914d6997603a66855c1e433"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NavigationModule-e1c7876d3914d6997603a66855c1e433"' : 'id="xs-components-links-module-NavigationModule-e1c7876d3914d6997603a66855c1e433"' }>
                                        <li class="link">
                                            <a href="components/NavigationTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationTreeComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/Project0041Module.html" data-type="entity-link">Project0041Module</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' : 'data-target="#xs-components-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' : 'id="xs-components-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' }>
                                        <li class="link">
                                            <a href="components/P0041EditionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">P0041EditionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/P0041KandaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">P0041KandaComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/P0041StropheComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">P0041StropheComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/P0041SuktaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">P0041SuktaComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' : 'data-target="#xs-injectables-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' : 'id="xs-injectables-links-module-Project0041Module-34dc50619578bc4a4ad85c001a8ffb96"' }>
                                        <li class="link">
                                            <a href="injectables/KnoraV2RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraV2RequestService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/Project0062Module.html" data-type="entity-link">Project0062Module</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-Project0062Module-582850c5bff57ce2a2f76e6ed7f73c71"' : 'data-target="#xs-components-links-module-Project0062Module-582850c5bff57ce2a2f76e6ed7f73c71"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-Project0062Module-582850c5bff57ce2a2f76e6ed7f73c71"' : 'id="xs-components-links-module-Project0062Module-582850c5bff57ce2a2f76e6ed7f73c71"' }>
                                        <li class="link">
                                            <a href="components/P0062TranscriptionFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">P0062TranscriptionFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ResourceFormModule.html" data-type="entity-link">ResourceFormModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' : 'data-target="#xs-components-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' : 'id="xs-components-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' }>
                                        <li class="link">
                                            <a href="components/ResourceFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourceFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResourceValueHistoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourceValueHistoryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResourceValueHistoryValueComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourceValueHistoryValueComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' : 'data-target="#xs-injectables-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' : 'id="xs-injectables-links-module-ResourceFormModule-c50ee683ec91229b66ef5d7595316fe2"' }>
                                        <li class="link">
                                            <a href="injectables/KnoraV1RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraV1RequestService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/RichTextModule.html" data-type="entity-link">RichTextModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' : 'data-target="#xs-components-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' : 'id="xs-components-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' }>
                                        <li class="link">
                                            <a href="components/RichTextByIriComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RichTextByIriComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextRichInnerhtmlComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextRichInnerhtmlComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' : 'data-target="#xs-injectables-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' : 'id="xs-injectables-links-module-RichTextModule-b1ef0ccfc552791b98b2bf5453b04843"' }>
                                        <li class="link">
                                            <a href="injectables/KnoraV2RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>KnoraV2RequestService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/StaticPagesModule.html" data-type="entity-link">StaticPagesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-StaticPagesModule-9a5788a5f4b3d47a53573745f0067a69"' : 'data-target="#xs-components-links-module-StaticPagesModule-9a5788a5f4b3d47a53573745f0067a69"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-StaticPagesModule-9a5788a5f4b3d47a53573745f0067a69"' : 'id="xs-components-links-module-StaticPagesModule-9a5788a5f4b3d47a53573745f0067a69"' }>
                                        <li class="link">
                                            <a href="components/DeactivateNewsletterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeactivateNewsletterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ReactivateAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReactivateAccountComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SynopsisModule.html" data-type="entity-link">SynopsisModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'id="xs-components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <li class="link">
                                            <a href="components/FloatLightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatLightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FloatingImageObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatingImageObjectComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FloatingTextObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatingTextObjectComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LightTableMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LightTableMenuComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoadLightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadLightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RemoveObjectsByIdComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RemoveObjectsByIdComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SaveLightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveLightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ShareLightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShareLightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SynopsisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SynopsisObjectManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectManagerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SynopsisObjectToolboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectToolboxComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ThumbnailbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThumbnailbarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TiledImageObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledImageObjectComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TiledLightTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledLightTableComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TiledTextObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledTextObjectComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'id="xs-directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <li class="link">
                                            <a href="directives/DraggableDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DraggableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DraggableStubDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DraggableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FloatDropTargetDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatDropTargetDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ModifiableDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifiableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ModifiableStubDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifiableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SelectableDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SelectableStubDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SynopsisObjectAnchorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectAnchorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TileDropTargetDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TileDropTargetDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'id="xs-injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <li class="link">
                                            <a href="injectables/DragService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>DragService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LightTableLayoutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LightTableLayoutService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LightTableStashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LightTableStashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectModifierService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SynopsisObjectModifierService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectSelectorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SynopsisObjectSelectorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectSerializerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SynopsisObjectSerializerService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TagChipsModule.html" data-type="entity-link">TagChipsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TagChipsModule-8910eda427abc39475cdb778b908f87a"' : 'data-target="#xs-components-links-module-TagChipsModule-8910eda427abc39475cdb778b908f87a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TagChipsModule-8910eda427abc39475cdb778b908f87a"' : 'id="xs-components-links-module-TagChipsModule-8910eda427abc39475cdb778b908f87a"' }>
                                        <li class="link">
                                            <a href="components/TagChipsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagChipsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TextDevViewModule.html" data-type="entity-link">TextDevViewModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TextDevViewModule-f2e4db5573d413fab32d49e15e2f31bb"' : 'data-target="#xs-components-links-module-TextDevViewModule-f2e4db5573d413fab32d49e15e2f31bb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TextDevViewModule-f2e4db5573d413fab32d49e15e2f31bb"' : 'id="xs-components-links-module-TextDevViewModule-f2e4db5573d413fab32d49e15e2f31bb"' }>
                                        <li class="link">
                                            <a href="components/TextDevViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextDevViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TextStructureModule.html" data-type="entity-link">TextStructureModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TextStructureModule-54ab0e86f5f7e166b08a92c57421c234"' : 'data-target="#xs-components-links-module-TextStructureModule-54ab0e86f5f7e166b08a92c57421c234"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TextStructureModule-54ab0e86f5f7e166b08a92c57421c234"' : 'id="xs-components-links-module-TextStructureModule-54ab0e86f5f7e166b08a92c57421c234"' }>
                                        <li class="link">
                                            <a href="components/TextLineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextLineGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineGroupComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextLineMarginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineMarginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextLineNumberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineNumberComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TextViewModule.html" data-type="entity-link">TextViewModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'data-target="#xs-components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'id="xs-components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                        <li class="link">
                                            <a href="components/TextViewCanvasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewCanvasComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextViewMetadataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewMetadataComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextViewStructureComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewStructureComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TextViewToolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewToolsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'data-target="#xs-injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'id="xs-injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                        <li class="link">
                                            <a href="injectables/CanvasOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CanvasOptionsService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/NavigationComponent-1.html" data-type="entity-link">NavigationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationComponent-2.html" data-type="entity-link">NavigationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextDisplayComponent-1.html" data-type="entity-link">TextDisplayComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AbstractJsonService.html" data-type="entity-link">AbstractJsonService</a>
                    </li>
                    <li class="link">
                        <a href="classes/ActivatedRouteStub.html" data-type="entity-link">ActivatedRouteStub</a>
                    </li>
                    <li class="link">
                        <a href="classes/BasicModel.html" data-type="entity-link">BasicModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/FileFlatNode.html" data-type="entity-link">FileFlatNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/FileFlatNode-1.html" data-type="entity-link">FileFlatNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/FileNode.html" data-type="entity-link">FileNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/FileNode-1.html" data-type="entity-link">FileNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/IIIFImage.html" data-type="entity-link">IIIFImage</a>
                    </li>
                    <li class="link">
                        <a href="classes/IIIFImage-1.html" data-type="entity-link">IIIFImage</a>
                    </li>
                    <li class="link">
                        <a href="classes/ImageViewer.html" data-type="entity-link">ImageViewer</a>
                    </li>
                    <li class="link">
                        <a href="classes/InstantErrorStateMatcher.html" data-type="entity-link">InstantErrorStateMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/JulianDate.html" data-type="entity-link">JulianDate</a>
                    </li>
                    <li class="link">
                        <a href="classes/LightTableStorage.html" data-type="entity-link">LightTableStorage</a>
                    </li>
                    <li class="link">
                        <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/OpenAppsModel.html" data-type="entity-link">OpenAppsModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/PageSetModel.html" data-type="entity-link">PageSetModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/Person.html" data-type="entity-link">Person</a>
                    </li>
                    <li class="link">
                        <a href="classes/Place.html" data-type="entity-link">Place</a>
                    </li>
                    <li class="link">
                        <a href="classes/RequestTemplate.html" data-type="entity-link">RequestTemplate</a>
                    </li>
                    <li class="link">
                        <a href="classes/Standoff.html" data-type="entity-link">Standoff</a>
                    </li>
                    <li class="link">
                        <a href="classes/SubjectTag.html" data-type="entity-link">SubjectTag</a>
                    </li>
                    <li class="link">
                        <a href="classes/SynopsisImageData.html" data-type="entity-link">SynopsisImageData</a>
                    </li>
                    <li class="link">
                        <a href="classes/SynopsisItem.html" data-type="entity-link">SynopsisItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/SynopsisTextData.html" data-type="entity-link">SynopsisTextData</a>
                    </li>
                    <li class="link">
                        <a href="classes/TermsAndConditions.html" data-type="entity-link">TermsAndConditions</a>
                    </li>
                    <li class="link">
                        <a href="classes/Text.html" data-type="entity-link">Text</a>
                    </li>
                    <li class="link">
                        <a href="classes/TextTemplate.html" data-type="entity-link">TextTemplate</a>
                    </li>
                    <li class="link">
                        <a href="classes/Token.html" data-type="entity-link">Token</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ActionService.html" data-type="entity-link">ActionService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ContactService.html" data-type="entity-link">ContactService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/DataService.html" data-type="entity-link">DataService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GeneralRequestService.html" data-type="entity-link">GeneralRequestService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GenerateArrayFromLeafsService.html" data-type="entity-link">GenerateArrayFromLeafsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GenerateDataChoosersService.html" data-type="entity-link">GenerateDataChoosersService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GeneratePathService.html" data-type="entity-link">GeneratePathService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ImageViewerService.html" data-type="entity-link">ImageViewerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/InitService.html" data-type="entity-link">InitService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PageService.html" data-type="entity-link">PageService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PasswordFormatCheckService.html" data-type="entity-link">PasswordFormatCheckService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/QueryService.html" data-type="entity-link">QueryService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/RequestService.html" data-type="entity-link">RequestService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ResultToModelMapperService.html" data-type="entity-link">ResultToModelMapperService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StandoffReconcilerService.html" data-type="entity-link">StandoffReconcilerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StyleMappingService.html" data-type="entity-link">StyleMappingService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/SynopsisObjectSerializerServiceStub.html" data-type="entity-link">SynopsisObjectSerializerServiceStub</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/FakeBackendInterceptor.html" data-type="entity-link">FakeBackendInterceptor</a>
                    </li>
                    <li class="link">
                        <a href="interceptors/JwtInterceptor.html" data-type="entity-link">JwtInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Action.html" data-type="entity-link">Action</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ActionArray.html" data-type="entity-link">ActionArray</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/AuthData.html" data-type="entity-link">AuthData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ChipColor.html" data-type="entity-link">ChipColor</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ComponentRefTracker.html" data-type="entity-link">ComponentRefTracker</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/DAG.html" data-type="entity-link">DAG</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/DropTargetOptions.html" data-type="entity-link">DropTargetOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Food.html" data-type="entity-link">Food</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Frequency.html" data-type="entity-link">Frequency</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Frequency-1.html" data-type="entity-link">Frequency</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/HalfStrophe.html" data-type="entity-link">HalfStrophe</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Margin.html" data-type="entity-link">Margin</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Margin-1.html" data-type="entity-link">Margin</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ObjectDimensions.html" data-type="entity-link">ObjectDimensions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Page.html" data-type="entity-link">Page</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PageTree.html" data-type="entity-link">PageTree</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PageTreeLine.html" data-type="entity-link">PageTreeLine</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PageTreeWord.html" data-type="entity-link">PageTreeWord</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ResourceFlatNode.html" data-type="entity-link">ResourceFlatNode</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ResourceNode.html" data-type="entity-link">ResourceNode</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SLinkExtra.html" data-type="entity-link">SLinkExtra</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SNodeExtra.html" data-type="entity-link">SNodeExtra</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SamhitaWord.html" data-type="entity-link">SamhitaWord</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SelectableEnvironments.html" data-type="entity-link">SelectableEnvironments</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Stock.html" data-type="entity-link">Stock</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/StorageObject.html" data-type="entity-link">StorageObject</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/StyleDeclaration.html" data-type="entity-link">StyleDeclaration</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SynopsisObject.html" data-type="entity-link">SynopsisObject</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SynopsisObjectData.html" data-type="entity-link">SynopsisObjectData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Verse.html" data-type="entity-link">Verse</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
