import { parseJwt } from './utils/index';

(function ($) {
  const {
    username,
    password,
    urlBase
  } = parseJwt();

  $('#confirmPassword').keypress(function (event) {
    const password = $('#confirmPassword').val();
    if (password.length < 5) {
      $('#validateUserAccount').html('Weak password');
    } else {
      $('#validateUserAccount').html('');
    }
  });
  // register users
  $('#confirmPassword').keypress(function (e) {
    const key = e.which;
    if (parseInt(key) === 13) {
      registerUsers();
      return false;
    }
  });

  $('#sign_up').click(function (event) {
    registerUsers();
  });

  function registerUsers () {
    const email = $('#email').val();
    const fullName = $('#fullName').val();
    const userPassword = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const contact = $('#contact').val();
    const userType = $('#userType').val();
    const facility = $('#facility').val();
    const recommendedBy = $('#recommendedBy').val();
    if (email !== '' && fullName !== '' && userPassword !== '' && contact !== '' && recommendedBy !== '') {
      if (userPassword !== confirmPassword || userPassword.length < 5) {
        $('#validateUserAccount').html('Password is not matching or weak!!');
      } else {
      // GETTING STARTED
        $('#sign_up').html('Submitting');
        $('#sign_up').prop('disabled', true);
        // AJAX
        $.ajax({
          url: urlBase + '/register-userAccount',
          method: 'POST',
          contentType: 'application/json',
          crossDomain: true,
          xhrFields: { withCredentials: true },
          beforeSend (xhr) {
            xhr.setRequestHeader('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
          },
          data: JSON.stringify(
            {
              fullName: fullName,
              email: email,
              password: userPassword,
              contact: contact,
              userType: userType,
              facility: facility,
              recommendedBy: recommendedBy
            }),
          success: function (response) {
            window.location.href = '/autologin?fullName=' + encodeURIComponent(fullName) + '&userType=' + encodeURIComponent(userType) + '&email=' + encodeURIComponent(email) + '&facility=' + encodeURIComponent(facility) + '';
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
        url: urlBase + '/login-userAccount',
        method: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        xhrFields: { withCredentials: true },
        beforeSend (xhr) {
          xhr.setRequestHeader('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
        },
        data: JSON.stringify(
          {
            email: email,
            password: userPassword
          }),
        success: function (response) {
          window.location.href = '/autologin?fullName=' + encodeURIComponent(response.fullName) + '&userType=' + encodeURIComponent(response.userType) + '&email=' + encodeURIComponent(response.email) + '&facility=' + encodeURIComponent(response.facility) + '';
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
