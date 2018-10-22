# Custom Search Deflection Lightning Component

This component is meant to be used as a standalone Deflection Component in Lightning Communities. In order to work, you must either be using the Standard 'Contact Support Form' or have a Custom Form that fires an `selfService:caseCreateFieldChange` Event preferably using the [Record Edit Form](https://developer.salesforce.com/docs/component-library/bundle/lightning:recordEditForm/example)

## Getting Started (Salesforce)

- Create a Lightning Component that uses the Latest API Version Using this Repositories Code.
- Drag and Drop the Component on the Contact Support Page of your community Template on the Right Side Panel.
- Create a Public Static Resource with the name attribute assigned in the markup of the CoveoV2:Search component.
- in the Builder, add the necessary attribute names (Name and SearchHub)

## Getting Started (Coveo Platform)
- Create a Pipeline Conndition where SearchHub name equals the assigned searchHub name of the Deflection Component
- Assign the Condition to a Pipeline (Or create a designated Pipeline)
- Add a Query Parameter rule WITH CODE as follows:
   -`override query lq:"<@+ $context.Subject $context.Description +@>"`
- Whenever a Field Change occurs on the form (for the Out of the box Contact Support Form) - a query should be triggered.
- If the pipeline override query rule is properly set, the changed field values should be added in the context of a [large query expression](https://docs.coveo.com/en/214/glossary/large-query-expression)

### Debug/Troubleshooting
- Pen you Browser Developer Tools (Chrome = F12 or CTRL+Shift+J)
- Select the Network Tab and select the XHR & Fetch tab/pill.
- change a field value for a query to trigger
- A request with the name V2 should populate (V2?authentication sometimes)
-select it and the default tab should be `Headers`
- Scroll all the way down, under Form Data, there should Context
- In the Context, there should be the Field Names and Values added everytime a field is filled or changed.
