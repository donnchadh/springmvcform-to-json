# springmvcform-to-json

[![Build Status](https://circleci.com/gh/donnchadh/springmvcform-to-json.svg?style=svg)](https://circleci.com/gh/donnchadh/springmvcform-to-json)
[![Code Coverage](https://codecov.io/gh/donnchadh/springmvcform-to-json/branch/master/graph/badge.svg)](https://codecov.io/gh/donnchadh/springmvcform-to-json)

Convert Spring-MVC form fields to JSON representation

## Webjar dependency

### Maven

```xml
<dependency>
    <groupId>org.webjars.npm</groupId>
    <artifactId>springmvcform-to-json</artifactId>
    <version>2.0.2</version>
</dependency>
```

## Using this library with plain old JS

```javascript
    var form = document.querySelector('#myForm');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/path/someController.do?action=anAction');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status !== 200) {
        showErrors("<ul><li>Oops something went wrong on our side.</li></ul>");
      }
    };
    xhr.send(serializeFormData(formData));
```

## Using this library with jQuery

```javascript
    $.ajax({
        url: contextPath + '/path/someController.do?action=anAction',
        data: serializeFormDataArray($('#myForm').serializeArray()),
        method: 'POST',
        dataType: 'json'
    }).error(function() {
        _showErrors("<ul><li>Oops something went wrong on our side.</li></ul>");
    });
```

## Building and Testing

```
npm run build
npm test
```
