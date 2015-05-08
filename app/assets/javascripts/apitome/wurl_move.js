$( document ).ready(function() {
  // function testCall(form_data) {
  //   alert('TEsting');
  //   event.preventDefault();

  //   var form = $(form_data);
  //   console.log(form);
  //
  //   data = queryParams();
  //   console.log(data);
  //
  //   data = getUrl();
  //   console.log(data);
  //
  //   data = getFormData();
  //   console.log(data);
  //
  //   callService();
  // };

  $('span.toggle_view').click(function (event) {
    event.preventDefault();
    var linkEl = $(event.currentTarget).parent().parent();
    linkEl.find('pre').toggle('fast');
    linkEl.find('a').toggle();
  });

  $('form.new_wurl').submit(function(event) {
    event.preventDefault();
    var formEl = $(event.currentTarget);
    // debugger
    $.ajax({
      beforeSend:function (req) {
        formEl.find(".header_pair").each(function (i, element) {
          headerKey = $(element).find('input.key').val();
          headerValue = $(element).find('input.value').val();
          req.setRequestHeader(headerKey, headerValue);
        });
        //req.setRequestHeader('Authorization', self.makeBasicAuth());
      },
      type: formEl.find('#wurl_request_method').val(),
      url: getUrl(formEl),
      data: getFormData(formEl),
      complete:function (jqXHR) {
        formEl.parent().find('.headers_output').html(jqXHR.getAllResponseHeaders());
        formEl.parent().find('.status_output').html(jqXHR.status + ' ' + jqXHR.statusText);
        formEl.parent().find('.code_output').html(jqXHR.responseText);
        console.log(jqXHR.responseText);
        debugger;
      }
    });
  });

  $('.fields').on('click', 'div .delete_field', function (event) {
    event.preventDefault();
    $(event.currentTarget).parent().remove();
  });

  $('.field-group').on('click', 'label a.add_field', function (event) {
    event.preventDefault();
    var header_template = '<div class="header_pair"><input class="key ui-autocomplete-input" name="header_keys[]" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"> <input class="value" name="header_values[]" type="text"> <a class="btn delete_field btn-sm btn-danger" title="delete header"><i class="icon-remove icon-white">X</i></a></div>';
    var param_template = '<div class="param_pair"><input class="key" name="param_keys[]" type="text"> <input class="value" name="param_values[]" type="text"> <a class="btn delete_field btn-sm btn-danger" title="delete parameter"><i class="icon-remove icon-white">X</i></a></div>';
    var fieldsEl = $(event.delegateTarget).find('.fields');
    if (fieldsEl.hasClass('headers')) {
      fieldsEl.append(header_template);
    } else {
      fieldsEl.append(param_template);
    }
  });

  $('.field-group').on('click', 'label a.trash_fields', function (event) {
    event.preventDefault();
    $(event.delegateTarget).find('.fields').empty();
  });

  function getUrl(formEl) {
    var url = formEl.find('.wurl_request_url').val();
    var method = formEl.find('.wurl_request_method').val();
    var params = queryParams(formEl);
    if ($.inArray(method, ["PUT", "POST", "DELETE"]) > -1 && params.length) {
      url += "?" + params;
    }
    console.log(url);
    return url[0] == '/' ? url : '/' + url;
  }

  function getFormData(formEl) {
    data = formEl.find('#wurl_request_body').val();
    return data;
  };

  function queryParams(formEl) {
    var toReturn = [];
    formEl.find(".param_pair").each(function (i, element) {
      paramKey = encodeURIComponent($(element).find('input.key').val());
      paramValue = encodeURIComponent($(element).find('input.value').val());
      if (paramKey.length && paramValue.length) {
        toReturn.push(paramKey + '=' + paramValue);
      }
    });
    return toReturn.join("&");
  };

  // function objToStr (obj) {
  //   var str = '';
  //   for (var k in obj) {
  //       if (obj.hasOwnProperty(k)) {
  //           str += k + ': ' + obj[k] + '\n';
  //       }
  //   }
  //   return str;
  // }

  // function addParam() {
  //   event.preventDefault();
  //   var $fields = $('.param_pair').first().clone();
  //   console.log($fields);
  //   $fields.children('input').val("").attr('disabled', false);
  //   $fields.hide().appendTo($('#params_container')).slideDown('fast');
  // };

  // $('form .new_wurl').submit(callService(event));
});
