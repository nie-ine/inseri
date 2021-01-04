# Create a New App

This tutorial shows you how to add a new inseri app based on the creation of the _machine reasoning_ app. 

## Change to the inseri app directory

```cd src/app/app-engine/apps```
   
## Generate the new app

```ng g c machine-reasoning```

A new directory _machine-reasoning_ with the following files is created:  
   
- _machine-reasoning.component.html_
- _machine-reasoning.component.scss_
- _machine-reasoning.component.spec.ts_
- _machine-reasoning.component.ts_
   
## Add the app to the open-apps model

**_src/app/user-action-engine/mongodb/page/open-apps.model.ts_**:

This model serves a page to describe which apps are open. The following shows the possible keys and some example values in this model (see below to continue with our machine-reasong app example): 
   
```typescript
urlParamUpdater: {                 // The key of this app
   type: 'urlParamUpdater',        // The type of this app. Needs to be the same name as the key.
   model: [],
   inputs: [                       // This app has two inputs
      {
         'inputName': 'param',
         default: 'defaultParam'   // The default app input generated when a new instance of the app is opened
      },
      {
         'inputName': 'textFile',
         default: 'Please paste variable here and click save afterwards'
      }
   ],
   materialIcon: 'menu',           // The material icon displayed in the app menu
   initialWidth: '375',            // The initial width of the app
   initialHeight: '100',           // The initial height of the app
   fullWidth: true,                // fullWidth and fullHeight can be true
}
```

The machine-reasoning app has no default input: 
   
```typescript
machineReasoning: {
   type: 'machineReasoning',
   model: [],
   materialIcon: 'blur_on',
   initialWidth: '600',
   initialHeight: '800',
   fullWidth: true
}
```

## Add the app to the appMenu model

**_src/app/app-engine/page/page/appMenu.model.ts_**:

This model is used by the page menu where users can open new apps. It's a bit redundant to the open-apps model and can be improved in the future.
    
```typescript
{
   id: 'blur_on',                         // The material icon id
   name: 'Machine Reasoning',             // The name of the app in the menu
   tags: 'N3, rdfs, rdf, owl',            // Currently not displayed anywhere
   color: 'yellow',                       // Currently not displayed anywhere
   status: 'under development',           // Currently not displayed anywhere
   appType: 'machineReasoning',           // Must be the same as in open-apps.model.ts
   description: 'Reason with reason',     // Currently not displayed anywhere
   showOnHome: false,                     // Show or don't show the app when logged out
   appGroup: 'microservice'               // App group the app belongs to
}
```

## Add the app to the all-app-selectors component

**_src/app/app-engine/page/all-app-selectors/all-app-selectors.component.html_**:

Here, you can define various things for the app. The following shows an example of the data-list-view app (see below to continue with our machine-reasong app example):

```html
<data-list-view style="position: sticky;" 
   *ngIf="app.type === 'dataListView'"              <!-- This needs to be the same name as defined in the previous models -->
   [queryResponse]="app.json"                       <!-- This maps the app inputs defined before -->
   [dataListSettings]="app.settings"                <!-- Another input for this app -->
   [hash] = "app.hash"                              <!-- This is needed if the app saves something in inseri -->
   [appInputQueryMapping] = "appInputQueryMapping"  <!-- This is needed if the app saves something in inseri -->
   [showSettings]="app.showSettings"                <!-- Another input for this app -->
   (reloadVariables)="reloadVariablesFunction()">   <!-- This is needed if the app saves something in inseri -->
</data-list-view>
```

The machine-reasoning app is less connected to the rest of inseri: 
  
```html  
<app-machine-reasoning *ngIf="app.type === 'machineReasoning'">
  
</app-machine-reasoning>
```

## Develop the app

The app now shows up in the above-defined app group in the inseri app menu. You can develop the app's logic in _src/app/app-engine/apps/machine-reasoning_.
