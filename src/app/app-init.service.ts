import { Injectable } from '@angular/core';
import { KuiCoreConfig } from '@knora/core';


export interface IAppConfig {

    env: {
        name: string;
    };
    ontologyIRI: string;
    apiURL: string;
    externalApiURL: string;
    iiifURL: string;
    appURL: string;
    appName: string;
    localData: string;
    pagingLimit: number;
    startComponent: string;
}

@Injectable()
export class AppInitService {

    static settings: IAppConfig;
    static coreConfig: KuiCoreConfig;

    constructor () {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            // console.log('AppInitService.init() called');
            // do your initialisation stuff here

            const data = <IAppConfig>window['tempConfigStorage'];
            // console.log('AppInitService: json', data);
            AppInitService.settings = data;

            AppInitService.coreConfig = <KuiCoreConfig>{
                name: AppInitService.settings.appName,
                api: AppInitService.settings.apiURL,
                media: AppInitService.settings.iiifURL,
                app: AppInitService.settings.appURL
            };

            // console.log('AppInitService: finished');

            resolve();
        });
    }
}
