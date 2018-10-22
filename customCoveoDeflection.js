window.coveoCustomScripts['default'] = function () {
    //Make sure the static resource is set to public if using a Guest user profile in lightning communities
    //need a counter for impeding multiple event listeners to attach to the window object (lightning communities behavior)
    window.sessionStorage.getItem('coveoCounter');
    const root = document.querySelector('#search');
     
    //Custom Analytics if applicable
    function customSearchAnalytics(fieldName, fieldValue) {
        const customEventCause = { name: 'caseSearch', type: 'customSearch' };
        const customEventMetadata = { queryField: fieldName, queryvalue: fieldValue };
        Coveo.logCustomEvent(root, customEventCause, customEventMetadata);
    }
    function receiveMessage(event)
    {
        if (event.origin === window.location.origin){
            queryContext[JSON.parse(event.data).modifiedField]=JSON.parse(event.data).modifiedFieldValue;
            customSearchAnalytics(JSON.parse(event.data).modifiedField, JSON.parse(event.data).modifiedFieldValue);
            Coveo.logSearchEvent(root, { type: 'searchContext', name: 'contextChanged' });
            Coveo.executeQuery(root);
        }
        window.sessionStorage.setItem('coveoContext', queryContext);
    }
    if(!window.sessionStorage.getItem('coveoCounter')){
        window.addEventListener("message", receiveMessage, false);
    }
     
    let coveoCounter=window.sessionStorage.getItem('coveoCounter')+1;
    window.sessionStorage.setItem('coveoCounter', coveoCounter);
    let queryContext = {};
     
    //add context on buildingQuery
    Coveo.$$(root).on("buildingQuery", function(e, args) {
        args.queryBuilder.addContext(queryContext);
        window.sessionStorage.removeItem('coveoCounter');
    });
     
}