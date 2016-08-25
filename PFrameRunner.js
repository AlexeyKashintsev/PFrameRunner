/**
 * @author Alexey
 * @module PFrameRunner
 */

define('PFrameRunner', ['HTMLHandler'] , function (HTMLHandler, ModuleName) {
    var frames = {};
    var activeFrame = null;

    function setActiveFrame(aFormName) {
        $('#' + activeFrame).hide();
        $('#' + aFormName).show();
        activeFrame = aFormName;
    }

    function show(aFormName, aCaption) {
        if (!frames[aFormName]) {
            frames[aFormName] = {};
            frames[aFormName].div = HTMLHandler.createElement('div', 'form-page', 'mainArea', aFormName);
            if (aCaption) {
                var header = HTMLHandler.createElement('div', 'navbar navbar-default navbar-static-top', frames[aFormName].div, '');
                header.innerHTML = '<div class="container"><h2>' + aCaption + '</h2></div>';
            }
            var Loading = HTMLHandler.createElement('blockquote', '', frames[aFormName].div, '');
            Loading.innerHTML = '<p>Загрузка...</p>';
            frames[aFormName].formDiv = HTMLHandler.createElement('div', 'form-container', frames[aFormName].div, aFormName);
            setActiveFrame(aFormName);
            require([aFormName], function(aForm) {
                frames[aFormName].form = new aForm();
                frames[aFormName].div.removeChild(Loading);
                    frames[aFormName].form.show(frames[aFormName].formDiv);
                return frames[aFormName].form;
            });

        }
        else
            setActiveFrame(aFormName);
    };
    
    var module = {};
    Object.defineProperty(module, 'show', {
        value: show
    });
    
    return module;
});
