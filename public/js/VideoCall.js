parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"jWsf":[function(require,module,exports) {
"use strict";function t(){var t=document.querySelector('meta[name="apiToken"]').getAttribute("content").split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),e=decodeURIComponent(atob(t).split("").map(function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(e)}function e(t,e){var n=JSON.parse('{ "userStatus":"Offline","colorIndicator":"text-warning"}');return JSON.stringify(t).indexOf('\\"'+e+'\\"')>=0&&(n=JSON.parse('{ "userStatus":"Online","colorIndicator":"text-success"}')),n}function n(t,e,n){return"IMAGE-CHAT-01"===t&&!0===a(e)?'<img src="data:image/png;base64,'.concat(n,"\" class='chat-image' />"):"IMAGE-CHAT-01"===t?'<a href="#" class="file-down chat-link-style" fileName="'.concat(n,'">').concat(e,"</a>"):/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(t)?'<a href="'.concat(t,'" target="_blank" class="chat-link-style">').concat(t,"</a>"):t}function a(t){return"jpg"===t.split(".").pop()||"svg"===t.split(".").pop()||"jpeg"===t.split(".").pop()||"png"===t.split(".").pop()||"gif"===t.split(".").pop()}function r(t){return parseInt(t)>0?(o("alert.mp3"),t):""}function o(t){new Audio("images/"+t).play()}function s(t,e){return JSON.stringify(t).indexOf('\\"'+e+'\\"')>=0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseJwt=t,exports.checkUsersOnline=e,exports.checkFileAttachment=n,exports.startPlaySound=r,exports.playNotificationSound=o,exports.videoCheckUser=s;
},{}],"rdRd":[function(require,module,exports) {
"use strict";var e=require("./utils/index");!function(i){var t=(0,e.parseJwt)().loggedUser,l=i("#videoReceiverFullName").val(),o=i("#videoReceiverEmail").val();i(".end-video-call").click(function(e){e.preventDefault(),window.close()}),(0,e.playNotificationSound)("video-call.mp3"),setTimeout(function(){!0===(0,e.videoCheckUser)(t,o)?i(".top-receiver-details").html("Ringing "+l):(i(".top-receiver-details").html("Offline "+l),setTimeout(function(){window.close()},5e3))},5e3)}(jQuery);
},{"./utils/index":"jWsf"}]},{},["rdRd"], null)
//# sourceMappingURL=/VideoCall.js.map