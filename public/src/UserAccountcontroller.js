(function ($) {
  $('#password').keypress(function (event) {
    const password = $('#password').val();
    if (password.length < 5) {
      $('#validateUserAccount').html('Weak password');
    } else {
      $('#validateUserAccount').html('');
    }
  });
  // register users
  $('#sign_up').click(function (event) {
    registerUsers();
  });

  function registerUsers () {
    const email = $('#email').val();
    const userPassword = $('#password').val();
    if (email !== '' && userPassword !== '') {
      if (userPassword.length < 5) {
        $('#validateUserAccount').html('Password is weak!!');
      } else {
      // GETTING STARTED
        $('#sign_up').html('Submitting');
        $('#sign_up').prop('disabled', true);
        // AJAX
        $.ajax({
          url: '/register-userAccount',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(
            {
              email: email,
              password: userPassword
            }),
          success: function (response) {
            window.location.href = '/';
          },
          error: function (xhr) {
            // eslint-disable-next-line no-eval
            const err = eval(`(${xhr.responseText})`); // FIXME: Remove use of `eval` as it's considered really bad.
            $('#validateUserAccount').html(err.message);
            $('#sign_up').prop('disabled', false);
            $('#sign_up').html('Sign up');
          }
        });
      }
    } else {
      $('#validateUserAccount').html('All fields are required !!');
    }
  }

  // login submit
  $('#login').click(function (event) {
    loginUser();
  });
  $('#login_user_password').keypress(function (e) {
    const key = e.which;
    if (parseInt(key) === 13) {
      loginUser();
      return false;
    }
  });
  function loginUser () {
    const email = $('#email').val();
    const userPassword = $('#password').val();
    if (email !== '' && userPassword !== '') {
    // GETTING STARTED
      $('#login').html('Processing');
      $('#login').prop('disabled', true);
      // AJAX
      $.ajax({
        url: '/login-userAccount',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
          {
            email: email,
            password: userPassword
          }),
        success: function (response) {
          window.location.href = '/';
        },
        error: function (xhr) {
          // eslint-disable-next-line no-eval
          const err = eval(`(${xhr.responseText})`); // FIXME: Remove use of `eval` as it's considered really bad.
          $('#login').html('Login');
          $('#validateUserAccount').html(err.message);
          $('#login').prop('disabled', false);
        }
      });
    } else {
      $('#validateUserAccount').html('All fields are required !!');
    }
  }
})(jQuery);
