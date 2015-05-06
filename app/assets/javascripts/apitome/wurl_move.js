function testCall(form_data) {
  alert('TEsting');

  var form = $(form_data);

  console.log(form);

  data = queryParams();

  console.log(data);

  data = getUrl();

  console.log(data);

  data = getFormData();

  console.log(data);

  callService();
};

function callService(){
  $.ajax({
    beforeSend:function (req) {
      $(".header_pair:visible").each(function (i, element) {
        headerKey = $(element).find('input.key').val();
        headerValue = $(element).find('input.value').val();
        req.setRequestHeader(headerKey, headerValue);
      });
      //req.setRequestHeader('Authorization', self.makeBasicAuth());
    },
    type:$('#wurl_request_method').val(),
    url: getUrl(),
    data: getFormData(),
    complete:function (jqXHR) {
      $('#code_output').html(jqXHR.responseText);
      console.log(jqXHR.responseText);
    }
  });
}

function getUrl() {
  var url = $('#wurl_request_url').val();
  var method = $('#wurl_request_method').val();
  var params = queryParams();
  if ($.inArray(method, ["PUT", "POST", "DELETE"]) > -1 && params.length) {
    url += "?" + params;
  }
  return url[0] == '/' ? url : '/' + url;
}

function getFormData() {
  data = $('#wurl_request_body').val();
  return data;
};

function queryParams() {
  var toReturn = [];
  $(".param_pair:visible", self.$wurlForm).each(function (i, element) {
    paramKey = $(element).find('input.key').val();
    paramValue = $(element).find('input.value').val();
    if (paramKey.length && paramValue.length) {
      toReturn.push(paramKey + '=' + paramValue);
    }
  });
  return toReturn.join("&");
};

function addParam() {
  event.preventDefault();
  var $fields = $('.param_pair').first().clone();
  console.log($fields);
  $fields.children('input').val("").attr('disabled', false);
  $fields.hide().appendTo($('#params_container')).slideDown('fast');
};
