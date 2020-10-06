import * as credentials from '../../../../secrets.json';

let secrets = (credentials as any).default;

export const environment = {
    production: true,
    firebase: {
        apiKey: secrets.apiKey,
        authDomain: secrets.authDomain,
        databaseURL: secrets.databaseURL,
        projectId: secrets.projectId,
        storageBucket: secrets.storageBucket,
        messagingSenderId: secrets.messagingSenderId,
        appId: secrets.appId,
        measurementId: secrets.measurementId
    }

};
