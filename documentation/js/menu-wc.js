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
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nie-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4ee63b014c3f3066ac7163def14a6041"' : 'data-target="#xs-components-links-module-AppModule-4ee63b014c3f3066ac7163def14a6041"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4ee63b014c3f3066ac7163def14a6041"' :
                                            'id="xs-components-links-module-AppModule-4ee63b014c3f3066ac7163def14a6041"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComplexTextViewsModule.html" data-type="entity-link">ComplexTextViewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComplexTextViewsModule-0dbe245dce51e8b163096a64dc28065e"' : 'data-target="#xs-components-links-module-ComplexTextViewsModule-0dbe245dce51e8b163096a64dc28065e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComplexTextViewsModule-0dbe245dce51e8b163096a64dc28065e"' :
                                            'id="xs-components-links-module-ComplexTextViewsModule-0dbe245dce51e8b163096a64dc28065e"' }>
                                            <li class="link">
                                                <a href="components/TextLineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextLineMarginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLineMarginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextPageOfWordsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextPageOfWordsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextRichInnerhtmlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextRichInnerhtmlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextSvgViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextSvgViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextSvgViewWrapperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextSvgViewWrapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' : 'data-target="#xs-components-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' :
                                            'id="xs-components-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' }>
                                            <li class="link">
                                                <a href="components/DialogUserSettingsDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogUserSettingsDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExtendSessionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExtendSessionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InitPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InitPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PizzaPartyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PizzaPartyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' : 'data-target="#xs-injectables-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' :
                                        'id="xs-injectables-links-module-CoreModule-0c18e9ee098a0a80fbed45ceca1c3e4c"' }>
                                        <li class="link">
                                            <a href="injectables/KnoraAuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>KnoraAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KnoraRequestService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>KnoraRequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResultToTextMapperService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ResultToTextMapperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/D3jsModule.html" data-type="entity-link">D3jsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-D3jsModule-e47d7a6dca058e99a2a319d3ae6b3eca"' : 'data-target="#xs-components-links-module-D3jsModule-e47d7a6dca058e99a2a319d3ae6b3eca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-D3jsModule-e47d7a6dca058e99a2a319d3ae6b3eca"' :
                                            'id="xs-components-links-module-D3jsModule-e47d7a6dca058e99a2a319d3ae6b3eca"' }>
                                            <li class="link">
                                                <a href="components/BarChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrushAndZoomComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrushAndZoomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChordDiagramComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChordDiagramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/D3tutorialComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">D3tutorialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeafletExampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeafletExampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiLineChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MultiLineChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadialBarchartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadialBarchartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SankeyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SankeyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpiralBarChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpiralBarChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StackedBarChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StackedBarChartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' : 'data-target="#xs-components-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' :
                                            'id="xs-components-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteActionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogOverviewExampleDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogOverviewExampleDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditActionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImpressumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImpressumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' : 'data-target="#xs-injectables-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' :
                                        'id="xs-injectables-links-module-DashboardModule-b7a551e680d7cec36c4b7e0325bb6508"' }>
                                        <li class="link">
                                            <a href="injectables/TermsAndConditions.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TermsAndConditions</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeveloperNotesModule.html" data-type="entity-link">DeveloperNotesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HierarchicalNavigationModule.html" data-type="entity-link">HierarchicalNavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HierarchicalNavigationModule-1479eb9a254f8076db76f2a8c54029bb"' : 'data-target="#xs-components-links-module-HierarchicalNavigationModule-1479eb9a254f8076db76f2a8c54029bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HierarchicalNavigationModule-1479eb9a254f8076db76f2a8c54029bb"' :
                                            'id="xs-components-links-module-HierarchicalNavigationModule-1479eb9a254f8076db76f2a8c54029bb"' }>
                                            <li class="link">
                                                <a href="components/HierarchicalNavigationNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HierarchicalNavigationNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HierarchicalNavigationRootComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HierarchicalNavigationRootComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HierarchicalNavigationViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HierarchicalNavigationViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HowToProgramWithNieOSModule.html" data-type="entity-link">HowToProgramWithNieOSModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HowToProgramWithNieOSModule-d9076de936b20ec1306e22fdd5d46c26"' : 'data-target="#xs-components-links-module-HowToProgramWithNieOSModule-d9076de936b20ec1306e22fdd5d46c26"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HowToProgramWithNieOSModule-d9076de936b20ec1306e22fdd5d46c26"' :
                                            'id="xs-components-links-module-HowToProgramWithNieOSModule-d9076de936b20ec1306e22fdd5d46c26"' }>
                                            <li class="link">
                                                <a href="components/DictionaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DictionaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyPractiseComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyPractiseComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextDisplayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HtmlViewerModule.html" data-type="entity-link">HtmlViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HtmlViewerModule-16a2d2d263877f979cfc417b5e5a0ed3"' : 'data-target="#xs-components-links-module-HtmlViewerModule-16a2d2d263877f979cfc417b5e5a0ed3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HtmlViewerModule-16a2d2d263877f979cfc417b5e5a0ed3"' :
                                            'id="xs-components-links-module-HtmlViewerModule-16a2d2d263877f979cfc417b5e5a0ed3"' }>
                                            <li class="link">
                                                <a href="components/HtmlViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HtmlViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HtmlViewerInnerhtmlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HtmlViewerInnerhtmlComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageFrameModule.html" data-type="entity-link">ImageFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' : 'data-target="#xs-components-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' :
                                            'id="xs-components-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' }>
                                            <li class="link">
                                                <a href="components/ImageWithOverlayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageWithOverlayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' : 'data-target="#xs-injectables-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' :
                                        'id="xs-injectables-links-module-ImageFrameModule-f289ff82c0b550f415f5597e6498d542"' }>
                                        <li class="link">
                                            <a href="injectables/RegionToSvgService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RegionToSvgService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JoinedTextViewModule.html" data-type="entity-link">JoinedTextViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-JoinedTextViewModule-5eb8fef69db5eb57aebad174f957cbce"' : 'data-target="#xs-components-links-module-JoinedTextViewModule-5eb8fef69db5eb57aebad174f957cbce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JoinedTextViewModule-5eb8fef69db5eb57aebad174f957cbce"' :
                                            'id="xs-components-links-module-JoinedTextViewModule-5eb8fef69db5eb57aebad174f957cbce"' }>
                                            <li class="link">
                                                <a href="components/JoinedTextBlockComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextInnerhtmlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextInnerhtmlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextLineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextLineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextLinepartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextLinepartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextMarginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextMarginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextTextwrapperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextTextwrapperComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedTextViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedTextViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KnoraV2ViewerModule.html" data-type="entity-link">KnoraV2ViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KnoraV2ViewerModule-4166b0d643109bcaee44ad8cca2ae195"' : 'data-target="#xs-components-links-module-KnoraV2ViewerModule-4166b0d643109bcaee44ad8cca2ae195"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KnoraV2ViewerModule-4166b0d643109bcaee44ad8cca2ae195"' :
                                            'id="xs-components-links-module-KnoraV2ViewerModule-4166b0d643109bcaee44ad8cca2ae195"' }>
                                            <li class="link">
                                                <a href="components/KnoraV2ViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KnoraV2ViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KnoraV2ViewerInnerhtmlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KnoraV2ViewerInnerhtmlComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MockupTutorialModule.html" data-type="entity-link">MockupTutorialModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MockupTutorialModule-c479ec322bf9a114d52b526acfe7492d"' : 'data-target="#xs-components-links-module-MockupTutorialModule-c479ec322bf9a114d52b526acfe7492d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MockupTutorialModule-c479ec322bf9a114d52b526acfe7492d"' :
                                            'id="xs-components-links-module-MockupTutorialModule-c479ec322bf9a114d52b526acfe7492d"' }>
                                            <li class="link">
                                                <a href="components/MyMainComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyMainComponentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyPageSetModule.html" data-type="entity-link">MyPageSetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' : 'data-target="#xs-components-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' :
                                            'id="xs-components-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' }>
                                            <li class="link">
                                                <a href="components/DeletePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeletePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogCreateNewPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogCreateNewPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DuplicatePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DuplicatePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPageSetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditPageSetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageSetLandingPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageSetLandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubPageListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubPageListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' : 'data-target="#xs-injectables-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' :
                                        'id="xs-injectables-links-module-MyPageSetModule-a6edf96e8e6b28828a33819acd2b77f1"' }>
                                        <li class="link">
                                            <a href="injectables/GenerateHashService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GenerateHashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PageSetService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PageSetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NIEOSModule.html" data-type="entity-link">NIEOSModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' : 'data-target="#xs-components-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' :
                                            'id="xs-components-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                            <li class="link">
                                                <a href="components/AddAppGroupDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddAppGroupDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AllAppSelectorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllAppSelectorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AngularHandsometableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AngularHandsometableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppInputComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppInputComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AudioPlayerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AudioPlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrowserlingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrowserlingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CanvasWhiteboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CanvasWhiteboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommentOnIndicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentOnIndicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrisprComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CrisprComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataAssignmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataChooserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataChooserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataListViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataListViewSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataListViewTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataListViewTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileListDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileListDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Frame.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Frame</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FrameSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FrameSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GndLobidComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GndLobidComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GrapesjsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GrapesjsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupedBarChartV2Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupedBarChartV2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IframeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IframeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KeyValueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeyValueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KeyValueFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeyValueFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadVariablesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadVariablesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachineReasoningComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MachineReasoningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MinimizePasswordDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinimizePasswordDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyFilesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyFilesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NestedMenu.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NestedMenu</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewGjsBoxDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewGjsBoxDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OpenbisLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OpenbisLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OurDemoAppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OurDemoAppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OurNewComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OurNewComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageListDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageListDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParzivalFassungComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParzivalFassungComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PdfViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieChartV2Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieChartV2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrimeEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrimeEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PythonEnvironmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PythonEnvironmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueryAppInputMapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryAppInputMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueryEntryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueryInformationDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryInformationDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueryListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RaeberNavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RaeberNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResponseTreeAppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResponseTreeAppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResponseTreeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResponseTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleImageAppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimpleImageAppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextlistViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextlistViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UrlParamUpdaterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UrlParamUpdaterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YoutubeVideoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YoutubeVideoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' : 'data-target="#xs-injectables-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' :
                                        'id="xs-injectables-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                        <li class="link">
                                            <a href="injectables/AbstractJsonService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AbstractJsonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataListViewInAppQueryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataListViewInAppQueryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileDatabase.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FileDatabase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileDatabaseForApp.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FileDatabaseForApp</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileDatabaseForAppGND.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FileDatabaseForAppGND</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateHashService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GenerateHashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OpenAppsModel.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OpenAppsModel</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' : 'data-target="#xs-pipes-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' :
                                            'id="xs-pipes-links-module-NIEOSModule-942314fffc75c4130e80ffa175c3e3e6"' }>
                                            <li class="link">
                                                <a href="pipes/HighlightPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HighlightPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedPipeModule.html" data-type="entity-link">SharedPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedPipeModule-cf5a6f58e4b53492ec4cc8f76b95d784"' : 'data-target="#xs-pipes-links-module-SharedPipeModule-cf5a6f58e4b53492ec4cc8f76b95d784"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedPipeModule-cf5a6f58e4b53492ec4cc8f76b95d784"' :
                                            'id="xs-pipes-links-module-SharedPipeModule-cf5a6f58e4b53492ec4cc8f76b95d784"' }>
                                            <li class="link">
                                                <a href="pipes/LinkifyPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LinkifyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PrettyPrintPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrettyPrintPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StaticPagesModule.html" data-type="entity-link">StaticPagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' : 'data-target="#xs-components-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' :
                                            'id="xs-components-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' }>
                                            <li class="link">
                                                <a href="components/DeactivateNewsletterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeactivateNewsletterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReactivateAccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReactivateAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' : 'data-target="#xs-injectables-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' :
                                        'id="xs-injectables-links-module-StaticPagesModule-a76e856ea4725b01d986e320bbf69da0"' }>
                                        <li class="link">
                                            <a href="injectables/TermsAndConditions.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TermsAndConditions</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SynopsisModule.html" data-type="entity-link">SynopsisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' :
                                            'id="xs-components-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                            <li class="link">
                                                <a href="components/FloatLightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatLightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FloatingImageObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatingImageObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FloatingTextObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatingTextObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LightTableMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LightTableMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadLightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadLightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RemoveObjectsByIdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RemoveObjectsByIdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveLightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveLightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShareLightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShareLightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SynopsisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SynopsisObjectManagerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SynopsisObjectToolboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectToolboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThumbnailbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThumbnailbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TiledImageObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledImageObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TiledLightTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledLightTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TiledTextObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiledTextObjectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' :
                                        'id="xs-directives-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <li class="link">
                                            <a href="directives/DraggableDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DraggableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DraggableStubDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DraggableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FloatDropTargetDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloatDropTargetDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ModifiableDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifiableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ModifiableStubDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifiableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SelectableDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SelectableStubDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectableStubDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SynopsisObjectAnchorDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SynopsisObjectAnchorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TileDropTargetDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">TileDropTargetDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' : 'data-target="#xs-injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' :
                                        'id="xs-injectables-links-module-SynopsisModule-9fe550242dbd5bff10e21d9a62289703"' }>
                                        <li class="link">
                                            <a href="injectables/DragService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DragService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LightTableLayoutService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LightTableLayoutService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LightTableStashService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LightTableStashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectModifierService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SynopsisObjectModifierService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectSelectorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SynopsisObjectSelectorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SynopsisObjectSerializerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SynopsisObjectSerializerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TextViewModule.html" data-type="entity-link">TextViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'data-target="#xs-components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' :
                                            'id="xs-components-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                            <li class="link">
                                                <a href="components/TextViewCanvasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewCanvasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextViewMetadataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewMetadataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextViewStructureComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewStructureComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextViewToolsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewToolsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' : 'data-target="#xs-injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' :
                                        'id="xs-injectables-links-module-TextViewModule-865b8441ec47c1f2b77a51da6bd1acab"' }>
                                        <li class="link">
                                            <a href="injectables/CanvasOptionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CanvasOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TreeNavigationModule.html" data-type="entity-link">TreeNavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TreeNavigationModule-949264957c1f37111504f1b17a730b86"' : 'data-target="#xs-components-links-module-TreeNavigationModule-949264957c1f37111504f1b17a730b86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeNavigationModule-949264957c1f37111504f1b17a730b86"' :
                                            'id="xs-components-links-module-TreeNavigationModule-949264957c1f37111504f1b17a730b86"' }>
                                            <li class="link">
                                                <a href="components/TreeNavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TreeNavigationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivatedRouteStub.html" data-type="entity-link">ActivatedRouteStub</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppMenuModel.html" data-type="entity-link">AppMenuModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicModel.html" data-type="entity-link">BasicModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnHeader.html" data-type="entity-link">ColumnHeader</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataCell.html" data-type="entity-link">DataCell</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileFlatNode.html" data-type="entity-link">FileFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileFlatNode-1.html" data-type="entity-link">FileFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileFlatNodeGnd.html" data-type="entity-link">FileFlatNodeGnd</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNode.html" data-type="entity-link">FileNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNode-1.html" data-type="entity-link">FileNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNode-2.html" data-type="entity-link">FileNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/HierarchicalNavigationConfiguration.html" data-type="entity-link">HierarchicalNavigationConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/HierarchicalNavigationNodeConfiguration.html" data-type="entity-link">HierarchicalNavigationNodeConfiguration</a>
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
                                <a href="classes/JoinedTextElement.html" data-type="entity-link">JoinedTextElement</a>
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
                                <a href="classes/MyErrorStateMatcher-1.html" data-type="entity-link">MyErrorStateMatcher</a>
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
                                <a href="classes/SynopsisImageData.html" data-type="entity-link">SynopsisImageData</a>
                            </li>
                            <li class="link">
                                <a href="classes/SynopsisItem.html" data-type="entity-link">SynopsisItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SynopsisTextData.html" data-type="entity-link">SynopsisTextData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Text.html" data-type="entity-link">Text</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextTemplate.html" data-type="entity-link">TextTemplate</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionService.html" data-type="entity-link">ActionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link">CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactService.html" data-type="entity-link">ContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link">DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DisplayedCollumnsService.html" data-type="entity-link">DisplayedCollumnsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link">FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FolderService.html" data-type="entity-link">FolderService</a>
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
                                    <a href="injectables/HierarchicalNavigationRequestService.html" data-type="entity-link">HierarchicalNavigationRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageViewerService.html" data-type="entity-link">ImageViewerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InitService.html" data-type="entity-link">InitService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterpolateVariablesInQueriesService.html" data-type="entity-link">InterpolateVariablesInQueriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoinedTextViewRequestService.html" data-type="entity-link">JoinedTextViewRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KnoraV2ViewerRequestService.html" data-type="entity-link">KnoraV2ViewerRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MicroserviceService.html" data-type="entity-link">MicroserviceService</a>
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
                                    <a href="injectables/SettingsService.html" data-type="entity-link">SettingsService</a>
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
                                <li class="link">
                                    <a href="injectables/SynopsisObjectStorageService.html" data-type="entity-link">SynopsisObjectStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsergroupService.html" data-type="entity-link">UsergroupService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/FakeBackendInterceptor.html" data-type="entity-link">FakeBackendInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
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
                                <a href="interfaces/FileModel.html" data-type="entity-link">FileModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Folder.html" data-type="entity-link">Folder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Food.html" data-type="entity-link">Food</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InLink.html" data-type="entity-link">InLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextBlock.html" data-type="entity-link">JoinedTextBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextElement.html" data-type="entity-link">JoinedTextElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextLine.html" data-type="entity-link">JoinedTextLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextLinepart.html" data-type="entity-link">JoinedTextLinepart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextMargin.html" data-type="entity-link">JoinedTextMargin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinedTextViewRoot.html" data-type="entity-link">JoinedTextViewRoot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Margin.html" data-type="entity-link">Margin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MyOwnJson.html" data-type="entity-link">MyOwnJson</a>
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
                                <a href="interfaces/QueryModel.html" data-type="entity-link">QueryModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceFlatNode.html" data-type="entity-link">ResourceFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceNode.html" data-type="entity-link">ResourceNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectableEnvironments.html" data-type="entity-link">SelectableEnvironments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectableEnvironments-1.html" data-type="entity-link">SelectableEnvironments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectableEnvironments-2.html" data-type="entity-link">SelectableEnvironments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectableEnvironments-3.html" data-type="entity-link">SelectableEnvironments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLinkExtra.html" data-type="entity-link">SLinkExtra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SNodeExtra.html" data-type="entity-link">SNodeExtra</a>
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
                                <a href="interfaces/StyleDeclaration-1.html" data-type="entity-link">StyleDeclaration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StyleDeclaration-2.html" data-type="entity-link">StyleDeclaration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StyleDeclaration-3.html" data-type="entity-link">StyleDeclaration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubPageOfPageModel.html" data-type="entity-link">SubPageOfPageModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SynopsisObject.html" data-type="entity-link">SynopsisObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SynopsisObjectData.html" data-type="entity-link">SynopsisObjectData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/value.html" data-type="entity-link">value</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/value-1.html" data-type="entity-link">value</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});