# springmvcform-to-json

[![Build Status](https://circleci.com/gh/donnchadh/springmvcform-to-json.svg?style=svg)](https://circleci.com/gh/donnchadh/springmvcform-to-json)
[![Code Coverage](https://codecov.io/gh/donnchadh/springmvcform-to-json/branch/master/graph/badge.svg)](https://codecov.io/gh/donnchadh/springmvcform-to-json)

Convert Spring-MVC form fields to JSON representation

## Using this library with jQuery

```javascript
    $.ajax({
        url: contextPath + '/path/someController.do?action=anAction',
        data: serializeFormData($('#myForm').serializeArray()),
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
