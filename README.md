# Dom Creator

Simple JS script used to quickly create DOM Elements.

## Usage

Instead of doing the following:

```js
var div = document.createElement('div');
var id  = div.createAttribute('id');
var klass = div.createAttribute('class');

id.value = 'some_identifier';
klass.value = 'some-class'
div.setAttributeNode(id);
div.setAttributeNode(klass);
div.innerHTML = 'The lazy cat is sleeping again!';

```

You can just do :

```js
var div = new domCreator({
    type:  'div',
    id:    'some_identifier',
    class: 'success',
    innerHtml: 'The lazy cat is sleeping again!',
    bind:   {
        event: 'click',
        method: function(){
            alert('Is he going to sleep all day?');
        }
    }
});
```
You can use methods like <code>addAttributeToElement</code> to add more attributes later after constructor, or <code>addChildToElement</code> to pass in either an object of paramters or another instance of domCreator, with its own attributes and bindings already set.  Additional bindings can be added by leveraging the <code>bindEvent</code> method.

```js
div.addAttributeToElement('data-employee-id', 123456789);
div.addChildToElement({
    type:  'span',
    class: 'bold',
    innerHtml: 'Wake him up!',
    bind: {
        event: 'click',
        method: wake_up_cat()
    }
});

//or

button = new domCreator({
    type:  'span',
    class: 'bold',
    innerHtml: 'Wake him up!',
});

button.bindEvent('click', wake_up_cat());
div.addChildToElement(button.toHtml());
```

The <code>toHtml</code> method returns the Element you have built and not an instance of domCreator.  Every method of domCreator returns the instance of itself.  When you are ready to append the Element, or inject it into another Element, use <code>toHtml</code> to get the newly created element.

```js
    var container = document.getElementById('page_wrapper');
    container.appendChild(div.toHtml())
```

There is a built in helper for select boxes.  You can use the above methods to build the select box and built all the child options but that gets a little long.  So the shortcut for select boxes and options is:

```js
var select = new domCreator({
    type: 'select',
    options: [
        {
            label: 'name',
            value: 1
        },
        {
            label: 'sex', value: '2'
        }
    ]
});

//or

var select = new domCreator({ type: 'select'});
select.buildSelectOptions(
    [{ label: '', value: '' }, { label: '', value: '' }]
)
```  

With the helper method, domCreator will check to see if the element type is a selectbox before adding the childs.  If it is not, it will just return the instance of itself.