// FAst Validator of add and edit question and suggestion
$(function () {
    $('.suggestion-form').submit(function (event) {
        var title = $('#question');
        var editor = $('#editor1');
        if (title.val().length < 10 || editor.val().trim() === "" || editor.val().length > 200) {
            event.preventDefault();
        }
    });

    $("#question").blur(function (event) {
        if ($(this).val().length < 10) {
            $('#title-feedback').addClass('d-block');
            $('#title-feedback').text('please ask a Suitable Question...');
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            $('#title-feedback').removeClass('d-block');
            $(this).css('box-shadow', '0px 0px 5px green');
            $(this).css('border', '1px solid lightgreen');
        }
    });

    $("#editor1").blur(function (event) {
        if ($(this).val().trim() === "") {
            $('#note-feedback').addClass('d-block');
            $('#note-feedback').text('please Give Suggestions...');
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            if ($(this).val().length > 200) {
                $('#note-feedback').addClass('d-block');
                $('#note-feedback').text('please Give Suggestions in less than 200 letters...');
                $(this).css('box-shadow', '0px 0px 5px red');
                $(this).css('border', '2px solid red');
            } else {
                $('#note-feedback').removeClass('d-block');
                $(this).css('box-shadow', '0px 0px 5px green');
                $(this).css('border', '1px solid lightgreen');
            }
        }
    });
});

// Login fast validator
$(function () {
    var password = $('.login-form #password');
    $('.login-form').submit(function (event) {
        if (password.val().length < 5 || !(/.*[0-9].*/.test(password.val()))) {
            event.preventDefault();
        }
    })

    password.blur(function () {
        if (password.val().length < 5 || !(/.*[0-9].*/.test(password.val()))) {
            $('#password-feedback--login').addClass('d-block');
            $('#password-feedback--login').text('please enter password correctly');
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            $('#password-feedback--login').removeClass('d-block');
            $(this).css('box-shadow', '0px 0px 5px green');
            $(this).css('border', '1px solid lightgreen');
        }
    })
})

// Register fast Validator
$(function () {
    var password = $('.register-form #password');
    var confirmPassword = $('.register-form #password2');
    var name = $('.register-form #name');

    $('.register-form').submit(function (event) {
        if (password.val().length < 5 || !(/.*[0-9].*/.test(password.val())) || password.val() !== confirmPassword.val() || name.val().length < 3) {
            event.preventDefault();
        }
    })

    password.blur(function () {
        if (password.val().length < 5 || !(/.*[0-9].*/.test(password.val()))) {
            $('#password-feedback--register').addClass('d-block');
            $('#password-feedback--register').text('please enter password with atleast of 5 length and one number.');
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            $('#password-feedback--register').removeClass('d-block');
            $(this).css('box-shadow', '0px 0px 5px green');
            $(this).css('border', '1px solid lightgreen');
        }
    })
    confirmPassword.blur(function () {
        if (confirmPassword.val() !== password.val()) {
            $('#confirm-password-feedback--register').addClass('d-block');
            $('#confirm-password-feedback--register').text("Password doesn't matched");
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            $('#confirm-password-feedback--register').removeClass('d-block');
            $(this).css('box-shadow', '0px 0px 5px green');
            $(this).css('border', '1px solid lightgreen');
        }
    })
    name.blur(function () {
        if (name.val().length < 3) {
            $('#name-feedback--register').addClass('d-block');
            $('#name-feedback--register').text("Please give valid name");
            $(this).css('box-shadow', '0px 0px 5px red');
            $(this).css('border', '2px solid red');
        } else {
            $('#name-feedback--register').removeClass('d-block');
            $(this).css('box-shadow', '0px 0px 5px green');
            $(this).css('border', '1px solid lightgreen');
        }
    })
})