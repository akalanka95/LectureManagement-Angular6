// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    firebase: {
        apiKey: 'AIzaSyDlLX5hfjyCRXp_7u6RbFjx83SyiH7TEOw',
        authDomain: 'notification-pwa-e9494.firebaseapp.com',
        databaseURL: 'https://notification-pwa-e9494.firebaseio.com',
        projectId: 'notification-pwa-e9494',
        storageBucket: 'notification-pwa-e9494.appspot.com',
        messagingSenderId: '1036895257069'
    }
};
