'use strict';

function userDashboard (userType) {
  switch (userType) {
    case 'Doctor':
      return JSON.parse('{ "page":"./views/doctor.html","pagePartial":"doctor/home-page.html"}');
    case 'Pregnant Woman':
      return JSON.parse('{ "page":"./views/patient.html","pagePartial":"patient/home-page.html"}');
  }
}

module.exports = { userDashboard };
