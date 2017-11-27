let MyForm = function(form, url) {
    this.form = form;
    this.url = url;
    this.init = function() {
        this.addListener(this.form);
    }
}

MyForm.prototype.addListener = function(form) {
    $(form).on('submit', $.proxy(this.submitForm, this));
}

MyForm.prototype.submitForm = function(e) {
    e.preventDefault();
    let $form = $(this.form);
    let defObject = this.ajaxForm($form, this.url);
    if (defObject) {
        defObject.done(function(ans) {
            let mes = ans.mes;
            let status = ans.status;
            if (status = 'OK') {
                $form.trigger('reset');
                $form.find('.order-form_success').text(mes).show();
            } else {
                $form.find('order-form_error').text(mes).show();
            }
        })
    }
}

MyForm.prototype.ajaxForm = function(form) {
    if (validation.isValidateForm(form)) {
        return false;
    }

    // запрос
    var data = form.serialize(); // собирает данные из формы в объект data

    return $.ajax({
        // Возвращает Deferred Object
        type: 'POST',
        url: this.url,
        dataType: 'JSON',
        data: data
    }).fail(function(ans) {
        console.log('Проблемы в PHP');
        form.find('.order-form_error').text('На сервере произошла ошибка').show();
    });
}