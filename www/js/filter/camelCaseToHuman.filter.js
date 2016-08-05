// Filter To Change Camel Case String Into Human Readable Case.
app
.filter('camelCaseToHuman', function() {
    return function(input) {
        if(input === true) return "true";
        if(input === null) return;
        if(input === undefined) return;
        return input
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function(str){ return str.toUpperCase(); });
    }
});