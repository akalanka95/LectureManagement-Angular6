// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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


/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
