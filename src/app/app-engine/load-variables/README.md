## load-variables.component

This component is instantiated at ngOninit at the page.component. It asynchronously loads all data for the page.component from mongodb.

It has been written as a component and not as a pure class because it emits asynchronously different parameters and keeps its state.

Being initiated through the selector in the page.html, it can communicate with its state also with the page-management.component which is
necessary for the data mapping process.
