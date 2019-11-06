function Browserling (apiKey) {
  if (!(this instanceof Browserling)) return new Browserling(apiKey);
  var self = this;
  self.apiKey = apiKey;

  var messageQueue = [];

  var browserOpts = {
    platformName : undefined,
    platformVersion : undefined,
    browser : undefined,
    version : undefined,
    url : undefined,
    myCursor : undefined,
    idleTimeout : undefined,
    sessionTimeout : undefined,
    resolution : undefined
  };

  self.configure = function (opts) {
    browserOpts.platformName = opts.platformName;
    browserOpts.platformVersion = opts.platformVersion;
    browserOpts.browser = opts.browser;
    browserOpts.version = opts.version;
    browserOpts.url = opts.url;
    browserOpts.myCursor = opts.myCursor;
    if (browserOpts.myCursor === undefined) {
      browserOpts.myCursor = true;
    }
    browserOpts.idleTimeout = opts.idleTimeout;
    browserOpts.sessionTimeout = opts.sessionTimeout;
    browserOpts.resolution = opts.resolution;
    if (browserOpts.resolution === undefined) {
      if (/android/i.test(opts.platformName)) {
        browserOpts.resolution = '480x800';
      }
      else {
        browserOpts.resolution = '1024x768';
      }
    }
    return this;
  }

  self.setBrowser = function (browser) {
    browserOpts.browser = browser;
    return this;
  }

  self.setVersion = function (version) {
    browserOpts.version = version;
    return this;
  }

  self.setUrl = function (url) {
    browserOpts.url = url;
    return this;
  }

  self.setPlatformName = function (platformName) {
    browserOpts.platformName = platformName;
    return this;
  }

  self.setPlatformVersion = function (platformVersion) {
    browserOpts.platformVersion = platformVersion;
    return this;
  }

  self.setIdleTimeout = function (milliseconds) {
    browserOpts.idleTimeout = milliseconds;
    return this;
  }

  self.setSessionTimeout = function (milliseconds) {
    browserOpts.sessionTimeout = milliseconds;
    return this;
  }

  self.setMyCursor = function (show) {
    browserOpts.myCursor = show;
    return this;
  }

  self.setResolution = function (resolution) {
    browserOpts.resolution = resolution;
    return this;
  }

  self.iframe = function () {
    if (browserOpts.browser === undefined) {
      throw new Error("No browser set. Use setBrowser to set the browser.");
    }
    if (browserOpts.version === undefined) {
      throw new Error("No browser version set. Use setVersion to set the version.");
    }
    if (browserOpts.url === undefined) {
      throw new Error("No URL set. Use setUrl to set the URL.");
    }
    if (!/^\d+x\d+$/.test(browserOpts.resolution)) {
      throw new Error("Invalid resolution format. Should be WidthxHeight.");
    }
    var iframe = document.createElement('iframe');
    self.iframe = iframe;

    var my_cursor = browserOpts.myCursor ? '1' : '0';
    var idle_timeout = browserOpts.idleTimeout ?
      browserOpts.idleTimeout : 0;
    var session_timeout = browserOpts.sessionTimeout ?
      browserOpts.sessionTimeout : 0;

    var queryString = "api_key=" + encodeURIComponent(self.apiKey)
      + "&platform_name=" + encodeURIComponent(browserOpts.platformName)
      + "&platform_version=" + encodeURIComponent(browserOpts.platformVersion)
      + "&browser=" + encodeURIComponent(browserOpts.browser)
      + "&version=" + encodeURIComponent(browserOpts.version)
      + "&url=" + encodeURIComponent(browserOpts.url)
      + "&my_cursor=" + my_cursor
      + "&idle_timeout=" + idle_timeout
      + "&session_timeout=" + session_timeout
      + "&resolution=" + browserOpts.resolution;

    if (/192.168.1/.test(window.location.href)) {
      self.iframeSrc = 'http://192.168.1.1:8080/raw_browser?' + queryString;
    }
    else {
      self.iframeSrc = 'https://api.browserling.com/raw_browser?' + queryString;
    }
    iframe.src = self.iframeSrc;

    var iframeWidth = browserOpts.resolution.split('x')[0];
    var iframeHeight = browserOpts.resolution.split('x')[1];

    iframe.width = iframeWidth;
    iframe.height = iframeHeight;

    iframe.scrolling = "no";
    iframe.style.overflow = "hidden";

    iframe.onload = function () {
      self.iframeLoaded = true;
      iframe.contentWindow.focus();
      processMessageQueue();
    }
    iframe.onmouseover = function () {
      iframe.contentWindow.focus();
    }
    return iframe;
  }

  self.resizeIframe = function (width, height) {
    self.iframe.width = width;
    self.iframe.height = height;
    newMessage({
      action : 'scaleCanvas',
      width : width,
      height : height
    });
  }

  function processMessageQueue () {
    if (self.iframeLoaded) {
      while (messageQueue.length) {
        var message = messageQueue.shift();
        self.iframe.contentWindow.postMessage(message, self.iframeSrc);
      }
    }
  }

  function newMessage(message) {
    messageQueue.push(message);
    processMessageQueue();
  }

  self.navigate = function (url) {
    newMessage({
      action : 'navigate',
      url : url
    });
    return this;
  }

  self.delay = function (duration) {
    newMessage({
      action : 'delay',
      duration : duration
    });
    return this;
  }

  self.mouseMove = function (x, y) {
    newMessage({
      action : 'mouseMove',
      x : x,
      y : y
    });
    return this;
  }

  self.leftClick = function (x, y) {
    newMessage({
      action : 'leftClick',
      x : x,
      y : y
    });
    return this;
  }

  self.wheelClick = function (x, y) {
    newMessage({
      action : 'wheelClick',
      x : x,
      y : y
    });
    return this;
  }

  self.click = function (x, y, button) {
    button = button === undefined ? 1 : button;
    newMessage({
      action : 'click',
      x : x,
      y : y,
      button : button
    });
    return this;
  }

  self.rightClick = function (x, y) {
    newMessage({
      action : 'rightClick',
      x : x,
      y : y
    });
    return this;
  }

  self.mouseDown = function (x, y, button) {
    button = button === undefined ? 1 : button;
    newMessage({
      action : 'mouseDown',
      x : x,
      y : y,
      button : button
    });
    return this;
  }

  self.mouseUp = function (x, y) {
    newMessage({
      action : 'mouseUp',
      x : x,
      y : y
    });
    return this;
  }

  self.dragMouse = function (x1, y1, x2, y2, button) {
    button = button === undefined ? 1 : button;
    newMessage({
      action : 'dragMouse',
      x1 : x1,
      y1 : y1,
      x2 : x2,
      y2 : y2,
      button : button
    });
    return this;
  }

  self.typeText = function (text) {
    newMessage({
      action : 'typeText',
      text : text
    });
    return this;
  }

  self.keyPress = function (key) {
    newMessage({
      action : 'keyPress',
      key : key
    });
    return this;
  }

  self.keyDown = function (key) {
    newMessage({
      action : 'keyDown',
      key : key
    });
    return this;
  }

  self.keyUp = function (key) {
    newMessage({
      action : 'keyUp',
      key : key
    });
    return this;
  }

  self.changeResolution = function (resolution) {
    if (!/^\d+x\d+$/.test(browserOpts.resolution)) {
      throw new Error("Invalid resolution format. Should be WidthxHeight.");
    }

    newMessage({
      action : 'changeResolution',
      resolution : resolution
    });
    self.iframe.width = resolution.split('x')[0];
    self.iframe.height = resolution.split('x')[1];

    return this;
  }
}

Browserling.Keys = {
  Backspace : { keyCode : 8 },
  Tab : { keyCode : 9 },
  TAB : { keyCode : 9 },
  Enter : { keyCode : 13 },
  Shift : { keyCode : 16 },
  Control : { keyCode : 17 },
  Ctrl : { keyCode : 17 },
  Alt : { keyCode : 18 },
  Esc : { keyCode : 27 },
  ESC : { keyCode : 27 },
  Space : { keyCode : 32 },
  PageUp : { keyCode : 33 },
  PgUp : { keyCode : 33 },
  PageDown : { keyCode : 34 },
  PgDn : { keyCode : 34 },
  End : { keyCode : 35 },
  Home : { keyCode : 36 },
  Left : { keyCode : 37 },
  Up : { keyCode : 38 },
  Right : { keyCode : 39 },
  Down : { keyCode : 40 },
  Del : { keyCode : 46 },
  Delete : { keyCode : 46 },
  WinKey : { keyCode : 91 },
  OptKey : { keyCode : 93 },
  F1 : { keyCode : 112 },
  F2 : { keyCode : 113 },
  F3 : { keyCode : 114 },
  F4 : { keyCode : 115 },
  F5 : { keyCode : 116 },
  F6 : { keyCode : 117 },
  F7 : { keyCode : 118 },
  F8 : { keyCode : 119 },
  F9 : { keyCode : 120 },
  F10 : { keyCode : 121 },
  F11 : { keyCode : 122 },
  F12 : { keyCode : 123 }
};
