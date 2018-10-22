({
	handleApplicationEvent : function(component, event, helper) {
        //Custom Debounce
        var timer = component.get('v.timer');
        clearTimeout(timer);
        var timer = setTimeout(function(){

            const siteOrigin = window.location.origin;
            let message = {
                name: "ExecuteQuery",
                modifiedField: event.getParam("modifiedField"),
                modifiedFieldValue: event.getParam("modifiedFieldValue")
            };
            window.postMessage(JSON.stringify(message), siteOrigin);

            clearTimeout(timer);
            component.set('v.timer', null);
        }, 500);
        component.set('v.timer', timer);
    },
})