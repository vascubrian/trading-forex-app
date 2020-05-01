export function parseJwt () {
  const base64Url = document.querySelector('meta[name="apiToken"]').getAttribute('content').split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export function checkUsersOnline (sessionData, userEmail) {
  var userStatus = JSON.parse('{ "userStatus":"Offline","colorIndicator":"text-warning"}');
  const textObject = JSON.stringify(sessionData);
  if (textObject.indexOf('\\"' + userEmail + '\\"') >= 0) {
    userStatus = JSON.parse('{ "userStatus":"Online","colorIndicator":"text-success"}');
  }
  return userStatus;
}

export function checkFileAttachment (messageBody, fileName, autoFileName) {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (messageBody === 'IMAGE-CHAT-01' && checkFileExtension(fileName) === true) {
    return `<img src="data:image/png;base64,${autoFileName}" class='chat-image' />`;
  } else if (messageBody === 'IMAGE-CHAT-01') {
    return `<a href="#" class="file-down chat-link-style" fileName="${autoFileName}">${fileName}</a>`;
  } else if (regexp.test(messageBody)) {
    return `<a href="${messageBody}" target="_blank" class="chat-link-style">${messageBody}</a>`;
  } else {
    return messageBody;
  }
}

function checkFileExtension (fileName) {
  if (fileName.split('.').pop() === 'jpg' || fileName.split('.').pop() === 'svg' || fileName.split('.').pop() === 'jpeg' || fileName.split('.').pop() === 'png' || fileName.split('.').pop() === 'gif') {
    return true;
  } else {
    return false;
  }
}
// start play sound
export function startPlaySound (smsNumbers) {
  if (parseInt(smsNumbers) > 0) {
    playNotificationSound('alert.mp3');
    return smsNumbers;
  } else {
    return '';
  }
}

export function playNotificationSound (audioFile) {
  const audio = new Audio('images/' + audioFile);
  audio.play();
}

export function videoCheckUser (sessionData, userEmail) {
  const textObject = JSON.stringify(sessionData);
  if (textObject.indexOf('\\"' + userEmail + '\\"') >= 0) {
    return true;
  } else {
    return false;
  }
}
