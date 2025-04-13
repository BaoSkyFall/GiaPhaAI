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
                    <a href="index.html" data-type="index-link">nest-basic-baoit documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' :
                                            'id="xs-controllers-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' :
                                        'id="xs-injectables-links-module-AppModule-9bb82d3e11d5779cb97df41bd642a17d70e69749f6af735fca1e8ce103d8a6be3aa79266aaa010f02d0ced582323ce2b3eaf06f5e4e9ce5463901557ba39650b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' :
                                            'id="xs-controllers-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' :
                                        'id="xs-injectables-links-module-AuthModule-0f74cf721c21380275aa31c167cb9fcfb4b32767a486f842b4fb7facb006989d1c4f890e4c0d40a05f798e9901d50461c9bbf8386e65ee303e8a771ea7667620"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' :
                                            'id="xs-controllers-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' :
                                        'id="xs-injectables-links-module-CompaniesModule-30d058df9bb54a2d747bbd13c06744d1d2314036d0dfadb6200c78e3c2c73fc8ff6ce498f19cdedf183a97027924376178c2c0ec72f2e902db0b89a9969e847b"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' :
                                            'id="xs-controllers-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' :
                                        'id="xs-injectables-links-module-DatabasesModule-a3a6bb914239cdf055b2ee33c6a49558603b7a53b168bb5d4fd2e831df78316dc6f4b89aa325437a1f738add4b767ef2424ddfa18a32fb1a14cba144852adae3"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' :
                                            'id="xs-controllers-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' :
                                        'id="xs-injectables-links-module-FilesModule-d7fbb1c4976ca078c2dc558f1e590c14a86bb9cd9b8a0ffdb9a540665a2c41f2f3c5953bac852a0ed56608b49933e7d52bac3ae8226363bc0ab7468099b953a4"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' :
                                            'id="xs-controllers-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' :
                                        'id="xs-injectables-links-module-JobsModule-8aa91a89641e65d7fc511e58f7824aad0dd0d9f6d0e9e10f92cf1d1d3575ca4edb2d0bdb5da41eed7ee76dcd766fe67c16259978898e6cdf01129c3fd622a01c"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' : 'data-bs-target="#xs-controllers-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' :
                                            'id="xs-controllers-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' : 'data-bs-target="#xs-injectables-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' :
                                        'id="xs-injectables-links-module-MailModule-14c8c93e0d3a75de789a25a95a2b5cf3c1d815f918e7131982aa4a62b0859f39656f82889bb1b88ec729cabab1795bdd745900689944871d2689b6c47fe45879"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' :
                                            'id="xs-controllers-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' :
                                        'id="xs-injectables-links-module-PermissionsModule-e2fe1aae42fc7500d7d2d03847923cb7cf199199e2ed66bc5af4bc8329447e6044d9c368ddbce9cde0f91c9124738a85c75bd0b532d38d6e2e849e7ee8cb0a99"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' :
                                            'id="xs-controllers-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' :
                                        'id="xs-injectables-links-module-ResumesModule-00294bb9c0b18dd7cd7eb5d9a83b479151d89ef2683f1899bc1df1185048f7a6f11464847b162d980522e1d610b63c20d5c1b3307314c6affe90abf296e3a9cb"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' :
                                            'id="xs-controllers-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' :
                                        'id="xs-injectables-links-module-RolesModule-6115b810028e1f5e8962c6e473a1239a437e071f5fccc2b599eefcc3d1ed5164b110024f7690bdf15c4234b743cf020688a305a89e4b8bfae8fab636c30dc532"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' :
                                            'id="xs-controllers-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' :
                                        'id="xs-injectables-links-module-SubscribersModule-6fb1be77e4b4cbb9b67c563e004c2e22ff89b75ccbf7067b64b6d0ce92ee2f844e6dce0048284d513680292fb88ef39bb0c7de4742bec074c8f4790fde09f563"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' :
                                            'id="xs-controllers-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' :
                                        'id="xs-injectables-links-module-UsersModule-45b1805038f207757e7a7b190a3367e64ed2df9393e54d9cfa90b9a3e1f6a82d805b022cfe20c453a485e8309c0890613ba814c3a92701037347d45964ad73e2"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});