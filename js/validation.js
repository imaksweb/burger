var validation = (function() {
    let _memory = [];

    let init = function(form) {
        _setUpListener(form);
    }
    
    let validateForm = function(form) {

        // Проверить, чтобы все поля формы были непустыми. Если пустые - вызывает тултипы
        let elements = form.find('input[data-valid]');
        let valid = true;
        $.each(elements, function(index, element) {
            let value = $(element).val();
            if (!value.length) {
                _addError($(element));
                valid = false;
            }
        });

        return valid;
    }

    let _setUpListener = function(form) {
        // Прослушиваем все события
        // удаляем красную обводку у элементов форм по нажатию клавиши
        $(form).on('keydown', '.error', _removeError);

        // удаляем красную обводку у элементов форм по клику мышки
        $(form).on('click', '.error', _removeError);

        // при сбросе формы удаляем также тултипы и обводку
        $(form).on('reset', _clearForm);

    }

    let _removeError = function() {

        $(this).removeClass('error');

    }

    let _addError = function(element) {

        element.addClass('error');

    }

    let _clearForm = function() {

        $(this).find('.error').removeClass('error');
        $(this).find('.order-form_error').hide();

    }
    
    return {
        isValidateForm: validateForm,
        init: init
    }
})();