/**
 * 
 * @param {object} params
 * 
 * @keys
 *  - type      required    {string}
 *  - id        optional    {string}
 *  - style     optional    {string}
 *  - value     optional    {string}
 *  - innerHtml optional    {string}
 *  - options   optional    {array|object}
 *      @keys
 *       - value    optional    {string}
 *       - label    optional    {string}
 *  - bind      optional    {object}
 *      @keys
 *       - event    required    {string}
 *       - method   required    {string|function}
 *  
 * @returns {undefined|domCreator}
 */
function domCreator(params){
    if (typeof(params["type"]) === "undefined") return;
    this.type    = typeof(params["type"])     !== "undefined" ? params["type"]      : false;
    this.id      = typeof(params["id"])       !== "undefined" ? params["id"]        : false;
    this.style   = typeof(params["style"])    !== "undefined" ? params["style"]     : false;
    this.value   = typeof(params["value"])    !== "undefined" ? params["value"]     : false;
    this.html    = typeof(params["innerHtml"])!== "undefined" ? params["innerHtml"] : false;
    this.options = typeof(params["options"])  !== "undefined" ? params["options"]   : false;
    this.bind    = typeof(params["bind"])     !== "undefined" ? params["bind"]      : false;
    this.element = document.createElement(this.type);
    
    if (this.id)    this.addAttributeToElement("id", this.id);
    if (this.style) this.addAttributeToElement("class", this.style);
    if (this.value) this.addAttributeToElement("value", this.value);
    if (this.html)  this.element.innerHTML = this.html;
    if (this.bind)  this.bindEvent(this.bind["event"], this.bind["method"]);
    
    if (this.options) this.buildSelectOptions();
    
    return this;
};
/**
 * @param {array} _options
 * @returns {domCreator}
 */
domCreator.prototype.buildSelectOptions = function(_options){
    if (this.type &&
        this.type.toLowerCase() == 'select' &&
        typeof(options) !== undefined)
    {
        var options = this.options || _options;

        for (var option in options){
            if (options.hasOwnProperty(option)){
                this.addChildToElement({
                    type        : "option",
                    id          : null,
                    style       : null,
                    value       : options[option]["value"],
                    innerHtml   : options[option]["label"],
                    options     : null,
                    bind        : null
                });
            }
        }
    }

    return this;
}
/**
 * 
 * @param {string} type
 * @param {string} value
 * @returns {domCreator}
 */
domCreator.prototype.addAttributeToElement = function(type, value){
    if (false === this.element instanceof HTMLElement) return this;
    var attr = document.createAttribute(type);
    attr.value = value;
    this.element.setAttributeNode(attr);
    return this;
};
/**
 * 
 * @param {object} object
 * 
 * keys
 *  - type      required    {string}
 *  - id        optional    {string}
 *  - style     optional    {string}
 *  - value     optional    {string}
 *  - innerHtml optional    {string}
 *  - options   optional    {array|object}
 *      keys
 *       - value    optional    {string}
 *       - label    optional    {string}
 *  - bind      optional    {object}
 *      keys
 *       - event    required    {string}
 *       - method   required    {string|function}
 *  
 * @returns {undefined|domCreator}
 */
domCreator.prototype.addChildToElement = function(object){
    if (false === this.element instanceof HTMLElement) return this;
    if (true === object instanceof domCreator){
        var childElem = object;
    } else {
        var childElem = new domCreator(object);    
    }
    
    this.element.appendChild(childElem.toHtml());
    return this;
};
/**
 * 
 * @returns {Element}
 */
domCreator.prototype.toHtml = function(){
    if (this.element instanceof HTMLElement){
        return this.element;
    }
};
/**
 * 
 * @param {string} event
 * @param {string|function} method
 * @returns {domCreator}
 */
domCreator.prototype.bindEvent = function(event, method){
    if (false === this.element instanceof HTMLElement) return this;

    if (this.element.addEventListener){
        this.element.addEventListener(event, method);

    } else if (this.element.attachEvent){
        this.element.attachEvent(event, method);

    }

    return this;
};