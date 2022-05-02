var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var axios$2 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject$2(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$2(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$h = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject: isObject$2,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$g = utils$h;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$g.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$g.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$g.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$g.forEach(val, function parseValue(v) {
        if (utils$g.isDate(v)) {
          v = v.toISOString();
        } else if (utils$g.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$f = utils$h;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$f.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$e = utils$h;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$e.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$d = utils$h;
function AxiosError$5(message, code, config2, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config2 && (this.config = config2);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$d.inherits(AxiosError$5, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$5.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = {
    value: code
  };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, "isAxiosError", {
  value: true
});
AxiosError$5.from = function(error, code, config2, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$d.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$5.call(axiosError, error.message, code, config2, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$5;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$c = utils$h;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$c.isDate(value)) {
      return value.toISOString();
    }
    if (utils$c.isArrayBuffer(value) || utils$c.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$c.isPlainObject(data2) || utils$c.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$c.forEach(data2, function each(value, key) {
        if (utils$c.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$c.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$c.endsWith(key, "[]") && (arr = utils$c.toArray(value))) {
            arr.forEach(function(el) {
              !utils$c.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var AxiosError$4 = AxiosError_1;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$4("Request failed with status code " + response.status, [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};
var utils$b = utils$h;
var cookies$1 = utils$b.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$b.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$b.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$b.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$a = utils$h;
var ignoreDuplicateOf = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$a.forEach(headers.split("\n"), function parser(line) {
    i = line.indexOf(":");
    key = utils$a.trim(line.substr(0, i)).toLowerCase();
    val = utils$a.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$9 = utils$h;
var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var AxiosError$3 = AxiosError_1;
var utils$8 = utils$h;
function CanceledError$3(message) {
  AxiosError$3.call(this, message == null ? "canceled" : message, AxiosError$3.ERR_CANCELED);
  this.name = "CanceledError";
}
utils$8.inherits(CanceledError$3, AxiosError$3, {
  __CANCEL__: true
});
var CanceledError_1 = CanceledError$3;
var parseProtocol$1 = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
};
var utils$7 = utils$h;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath$1 = buildFullPath$2;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var transitionalDefaults$1 = transitional;
var AxiosError$2 = AxiosError_1;
var CanceledError$2 = CanceledError_1;
var parseProtocol2 = parseProtocol$1;
var xhr = function xhrAdapter(config2) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config2.data;
    var requestHeaders = config2.headers;
    var responseType = config2.responseType;
    var onCanceled;
    function done() {
      if (config2.cancelToken) {
        config2.cancelToken.unsubscribe(onCanceled);
      }
      if (config2.signal) {
        config2.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData) && utils$7.isStandardBrowserEnv()) {
      delete requestHeaders["Content-Type"];
    }
    var request2 = new XMLHttpRequest();
    if (config2.auth) {
      var username = config2.auth.username || "";
      var password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath$1(config2.baseURL, config2.url);
    request2.open(config2.method.toUpperCase(), buildURL$1(fullPath, config2.params, config2.paramsSerializer), true);
    request2.timeout = config2.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      var response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config: config2,
        request: request2
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config2, request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config2, request2, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
      var transitional3 = config2.transitional || transitionalDefaults$1;
      if (config2.timeoutErrorMessage) {
        timeoutErrorMessage = config2.timeoutErrorMessage;
      }
      reject(new AxiosError$2(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED, config2, request2));
      request2 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config2.withCredentials || isURLSameOrigin(fullPath)) && config2.xsrfCookieName ? cookies.read(config2.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config2.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request2) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request2.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config2.withCredentials)) {
      request2.withCredentials = !!config2.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = config2.responseType;
    }
    if (typeof config2.onDownloadProgress === "function") {
      request2.addEventListener("progress", config2.onDownloadProgress);
    }
    if (typeof config2.onUploadProgress === "function" && request2.upload) {
      request2.upload.addEventListener("progress", config2.onUploadProgress);
    }
    if (config2.cancelToken || config2.signal) {
      onCanceled = function(cancel) {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
        request2.abort();
        request2 = null;
      };
      config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
      if (config2.signal) {
        config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    var protocol = parseProtocol2(fullPath);
    if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config2));
      return;
    }
    request2.send(requestData);
  });
};
var _null = null;
var utils$6 = utils$h;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? {
        "files[]": data2
      } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _null
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$5 = utils$h;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$h;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$1 = defaults_1;
var CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError$1();
  }
}
var dispatchRequest$1 = function dispatchRequest(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = config2.headers || {};
  config2.data = transformData2.call(config2, config2.data, config2.headers, config2.transformRequest);
  config2.headers = utils$4.merge(config2.headers.common || {}, config2.headers[config2.method] || {}, config2.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
    delete config2.headers[method];
  });
  var adapter = config2.adapter || defaults$1.adapter;
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData2.call(config2, response.data, response.headers, config2.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(config2, reason.response.data, reason.response.headers, config2.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$h;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config3 = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
};
var data = {
  "version": "0.27.2"
};
var VERSION = data.version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$h;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config2) {
  if (typeof configOrUrl === "string") {
    config2 = config2 || {};
    config2.url = configOrUrl;
  } else {
    config2 = configOrUrl || {};
  }
  config2 = mergeConfig$1(this.defaults, config2);
  if (config2.method) {
    config2.method = config2.method.toLowerCase();
  } else if (this.defaults.method) {
    config2.method = this.defaults.method.toLowerCase();
  } else {
    config2.method = "get";
  }
  var transitional3 = config2.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config2);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config2;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config2) {
  config2 = mergeConfig$1(this.defaults, config2);
  var fullPath = buildFullPath2(config2.baseURL, config2.url);
  return buildURL2(fullPath, config2.params, config2.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config2) {
    return this.request(mergeConfig$1(config2 || {}, {
      method,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config2) {
      return this.request(mergeConfig$1(config2 || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CanceledError = CanceledError_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$h;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$h;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
var FUNC_ERROR_TEXT = "Expected a function";
var NAN = 0 / 0;
var symbolTag = "[object Symbol]";
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max, nativeMin = Math.min;
var now = function() {
  return root.Date.now();
};
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced2() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced2.cancel = cancel;
  debounced2.flush = flush;
  return debounced2;
}
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$1(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_debounce = debounce;
var Shadowable = {
  props: {
    dropShadow: [Boolean, String],
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: [Boolean, String],
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const dropShadowClassName = this.dropShadow === true ? "" : this.dropShadow && `-${this.dropShadow}`;
      const shadowClassName = this.shadow === true ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${dropShadowClassName}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${shadowClassName}`]: !!this.shadow
      };
    }
  }
};
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function lowerCase$2(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP$2 = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP$2 = /[^A-Z0-9]+/gi;
function noCase$2(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP$2 : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP$2 : _b, _c = options.transform, transform = _c === void 0 ? lowerCase$2 : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace$2(replace$2(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace$2(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase$2(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase$2(input, __assign$1({
    delimiter: "."
  }, options));
}
function paramCase$2(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase$2(input, __assign$1({
    delimiter: "-"
  }, options));
}
const global$1 = {};
function config(...args) {
  if (!args.length) {
    return global$1;
  }
  const [key, value] = args;
  if (typeof key === "string") {
    return typeof global$1[key] !== "undefined" ? global$1[key] : value;
  }
  if (Array.isArray(key)) {
    return key.reduce((carry, key2) => {
      return Object.assign(carry, {
        [key2]: global$1[key2]
      });
    }, {});
  }
  return Object.assign(global$1, ...args);
}
function prefix(key, value, delimeter = "-") {
  const string = value.toString().replace(new RegExp(`^${key}${delimeter}?`), "");
  return [paramCase$2(string), key].filter((value2) => !!value2).join(delimeter);
}
function isObject(subject) {
  return !Array.isArray(subject) && typeof subject === "object";
}
var FormControl = {
  directives: {
    bindEvents: {
      bind(el, binding, vnode) {
        el.addEventListener("focus", () => {
          vnode.context.hasFocus = true;
        });
        el.addEventListener("blur", () => {
          vnode.context.hasFocus = false;
        });
        el.addEventListener(el.tagName === "SELECT" ? "change" : "input", (e) => {
          vnode.context.isEmpty = !el.value;
          vnode.context.currentValue = el.value;
        });
        vnode.context.hasChanged = !!el.value;
        vnode.context.bindEvents.forEach((name) => {
          el.addEventListener(name, (event) => {
            vnode.context.$emit(name, event);
          });
        });
        if (el.tagName === "SELECT") {
          const opt = el.querySelector('[value=""]');
          if (opt && opt.value === el.value) {
            vnode.context.defaultEmpty = true;
          }
        }
      }
    }
  },
  mixins: [Shadowable],
  inheritAttrs: false,
  props: {
    activity: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: () => config("animated", false)
    },
    bindEvents: {
      type: Array,
      default() {
        return ["focus", "blur", "change", "click", "keypress", "keyup", "keydown", "progress", "paste"];
      }
    },
    componentName: {
      type: String,
      default() {
        return this.$options.name;
      }
    },
    defaultControlClass: {
      type: String,
      default: () => config("defaultControlClass", "form-control")
    },
    defaultValue: {
      default: () => config("defaultValue", null)
    },
    error: [String, Array, Boolean],
    errors: {
      type: [Array, Object, Boolean],
      default() {
        return {};
      }
    },
    feedback: [String, Array],
    group: {
      type: Boolean,
      default: () => config("group", true)
    },
    helpText: [Number, String],
    hideLabel: Boolean,
    indicator: {
      type: String,
      default: () => config("indicator", "spinner")
    },
    indicatorSize: String,
    inline: Boolean,
    invalid: Boolean,
    label: [Number, String],
    labelClass: {
      type: [Object, String],
      default: () => config("labelClass", "form-label")
    },
    pill: Boolean,
    plaintext: Boolean,
    size: String,
    spacing: String,
    valid: Boolean,
    value: {
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value || this.defaultValue,
      defaultEmpty: false,
      hasChanged: false,
      hasFocus: false,
      isEmpty: !(this.value || this.defaultValue)
    };
  },
  computed: {
    id() {
      return this.$attrs.id || this.$attrs.name;
    },
    controlAttributes() {
      return Object.keys(this.$attrs).concat([["id", this.id], ["class", this.controlClasses]]).reduce((carry, key) => {
        if (Array.isArray(key)) {
          carry[key[0]] = key[1];
        } else {
          carry[key] = this[key] || this.$attrs[key];
        }
        return carry;
      }, {});
    },
    controlClass() {
      return this.defaultControlClass;
    },
    controlSizeClass() {
      return prefix(this.size, this.controlClass);
    },
    formGroupClasses() {
      return {
        [paramCase$2(this.componentName)]: !!this.componentName,
        [this.size && prefix(this.size, this.componentName)]: !!this.size,
        "animated": this.animated,
        "default-empty": this.defaultEmpty,
        "form-group": this.group,
        [this.size && prefix(this.size, "form-group")]: !!this.size,
        "has-activity": this.activity,
        "has-changed": this.hasChanged,
        "has-focus": this.hasFocus,
        "has-icon": !!this.$slots.icon,
        "is-empty": this.isEmpty,
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        "is-valid": !!(this.valid || this.validFeedback)
      };
    },
    controlClasses() {
      return Object.assign({
        [this.controlClass]: !!this.controlClass,
        [this.controlSizeClass]: !!this.controlSizeClass,
        "form-control-icon": !!this.$slots.icon,
        "is-valid": !!(this.valid || this.validFeedback),
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        [this.pillClasses]: this.pill,
        [this.plaintextClass]: this.plaintext,
        [this.spacing]: !!this.spacing
      }, this.shadowableClass);
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    invalidFeedback() {
      if (this.error === "") {
        return null;
      }
      if (this.error) {
        return this.error;
      }
      const errors = this.getFieldErrors();
      return Array.isArray(errors) ? errors.filter((error) => {
        return error && typeof error === "string";
      }).join("<br>") : errors;
    },
    pillClasses() {
      return "rounded rounded-pill";
    },
    plaintextClass() {
      return "form-control-plaintext";
    },
    validFeedback() {
      return Array.isArray(this.feedback) ? this.feedback.join("<br>") : this.feedback;
    }
  },
  watch: {
    hasFocus() {
      if (this.shouldChangeOnFocus()) {
        this.hasChanged = true;
      }
    },
    value(value) {
      this.currentValue = value;
    },
    currentValue() {
      this.hasChanged = true;
    },
    defaultEmpty() {
      this.hasChanged = true;
    }
  },
  mounted() {
    if (this.value === null && this.defaultValue !== null) {
      this.$emit("input", this.defaultValue);
    }
  },
  methods: {
    blur() {
      if (this.getInputField()) {
        this.getInputField().blur();
      }
    },
    focus() {
      if (this.getInputField()) {
        this.getInputField().focus();
      }
    },
    getInputField() {
      return this.$el.querySelector(".form-control, input, select, textarea");
    },
    getFieldErrors() {
      let errors = this.error || this.errors;
      if (this.errors && isObject(this.errors)) {
        errors = this.errors[this.$attrs.name || this.$attrs.id];
      }
      return !errors || Array.isArray(errors) || isObject(errors) ? errors : [errors];
    },
    shouldChangeOnFocus() {
      return !this.getInputField().readOnly;
    },
    onInput(e) {
      this.$emit("input", e.target.value);
      this.$emit("update:value", e.target.value);
    }
  }
};
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var _assign = function __assign() {
  _assign = Object.assign || function __assign22(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function lowerCase$1(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP$1 = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP$1 = /[^A-Z0-9]+/gi;
function noCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP$1 : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP$1 : _b, _c = options.transform, transform = _c === void 0 ? lowerCase$1 : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace$1(replace$1(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0") {
    start++;
  }
  while (result.charAt(end - 1) === "\0") {
    end--;
  }
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace$1(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase$1(input, _assign({
    delimiter: "."
  }, options));
}
function paramCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase$1(input, _assign({
    delimiter: "-"
  }, options));
}
var ComponentRegistry = /* @__PURE__ */ function() {
  function ComponentRegistry2() {
    var _this = this;
    var components = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, ComponentRegistry2);
    this.components = {};
    Object.entries(components).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
      _this.register(key, value);
    });
  }
  _createClass(ComponentRegistry2, [{
    key: "get",
    value: function get(name) {
      var match = this.components[name = paramCase$1(name)];
      if (match) {
        return match;
      }
      throw new Error('"'.concat(name, '" has not been registered yet!'));
    }
  }, {
    key: "register",
    value: function register(name, value) {
      var _this2 = this;
      if (_typeof(name) === "object") {
        Object.entries(name).forEach(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), name2 = _ref4[0], module = _ref4[1];
          _this2.register(paramCase$1(name2), module);
        });
        return this;
      }
      this.components[paramCase$1(name)] = value;
      return this;
    }
  }, {
    key: "remove",
    value: function remove(name) {
      delete this.components[paramCase$1(name)];
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.components = {};
      return this;
    }
  }]);
  return ComponentRegistry2;
}();
function factory() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(ComponentRegistry, args);
}
const registry = factory();
var render$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "activity-indicator", class: _vm.classes, style: _vm.style }, [_c("div", { staticClass: "activity-indicator-content" }, [_c(_vm.component, { tag: "component", staticClass: "mx-auto" }), _vm.label ? _c("div", { staticClass: "activity-indicator-label" }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e()], 1)]);
};
var staticRenderFns$c = [];
var ActivityIndicator_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
function unit(value, uom = "px") {
  return value !== null && value !== void 0 && value !== false && isFinite(value) ? `${value}${uom}` : value;
}
const __vue2_script$d = {
  name: "ActivityIndicator",
  props: {
    absolute: Boolean,
    center: Boolean,
    label: String,
    size: {
      type: String,
      default: "md"
    },
    registry: {
      type: ComponentRegistry,
      default() {
        return registry;
      }
    },
    type: {
      type: String,
      required: true
    },
    height: [String, Number],
    maxHeight: [String, Number],
    minHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    minWidth: [String, Number]
  },
  computed: {
    classes() {
      return {
        "activity-indicator-center": this.center,
        "activity-indicator-absolute": this.absolute,
        [this.size && `activity-indicator-${this.size}`]: !!this.size
      };
    },
    style() {
      return {
        width: unit(this.width),
        maxWidth: unit(this.maxWidth),
        minWidth: unit(this.minWidth),
        height: unit(this.height),
        maxHeight: unit(this.maxHeight),
        minHeight: unit(this.minHeight)
      };
    },
    component() {
      return () => {
        const component = registry.get(this.type);
        if (component instanceof Promise) {
          return component;
        }
        if (typeof component === "function") {
          return component();
        }
        return Promise.resolve(component);
      };
    }
  }
};
const __cssModules$d = {};
var __component__$d = /* @__PURE__ */ normalizeComponent(__vue2_script$d, render$c, staticRenderFns$c, false, __vue2_injectStyles$d, null, null, null);
function __vue2_injectStyles$d(context) {
  for (let o in __cssModules$d) {
    this[o] = __cssModules$d[o];
  }
}
var ActivityIndicator = /* @__PURE__ */ function() {
  return __component__$d.exports;
}();
var Chase_vue_vue_type_style_index_0_lang = "";
var CircleFade_vue_vue_type_style_index_0_lang = "";
var CircleOrbit_vue_vue_type_style_index_0_lang = "";
var CircleTrail_vue_vue_type_style_index_0_lang = "";
var Dots_vue_vue_type_style_index_0_lang = "";
var DoublePulse_vue_vue_type_style_index_0_lang = "";
var Facebook_vue_vue_type_style_index_0_lang = "";
var Grid_vue_vue_type_style_index_0_lang = "";
var Pulse_vue_vue_type_style_index_0_lang = "";
var Spinner_vue_vue_type_style_index_0_lang = "";
var Spotify_vue_vue_type_style_index_0_lang = "";
var Square_vue_vue_type_style_index_0_lang = "";
var SquareFold_vue_vue_type_style_index_0_lang = "";
var SquareOrbit_vue_vue_type_style_index_0_lang = "";
var render$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.formGroupClasses }, [_vm._t("label", function() {
    return [_vm.label ? _c("label", { ref: "label", class: _vm.labelClass, attrs: { "for": _vm.id }, domProps: { "innerHTML": _vm._s(_vm.label) }, on: { "click": _vm.focus } }) : _vm._e()];
  }), _c("div", { staticClass: "form-group-inner" }, [_vm._t("control", function() {
    return [_vm.$slots.icon ? _c("div", { staticClass: "form-group-inner-icon", on: { "click": _vm.focus } }, [_vm._t("icon")], 2) : _vm._e(), _c("input", _vm._b({ directives: [{ name: "bind-events", rawName: "v-bind-events" }], ref: "field", domProps: { "value": _vm.currentValue }, on: { "input": _vm.onInput } }, "input", _vm.controlAttributes, false))];
  }), _vm._t("activity", function() {
    return [_c("transition", { attrs: { "name": "input-field-fade" } }, [_vm.activity ? _c("activity-indicator", { key: "activity", ref: "activity", attrs: { "type": _vm.indicator, "size": _vm.indicatorSize || _vm.size } }) : _vm._e()], 1)];
  })], 2), _vm._t("feedback", function() {
    return [_vm.invalidFeedback ? _c("div", { staticClass: "invalid-feedback", attrs: { "invalid": "" }, domProps: { "innerHTML": _vm._s(_vm.invalidFeedback) } }) : _vm.validFeedback ? _c("div", { staticClass: "valid-feedback", attrs: { "valid": "" }, domProps: { "innerHTML": _vm._s(_vm.validFeedback) } }) : _vm._e()];
  }), _vm._t("help", function() {
    return [_vm.helpText ? _c("small", { ref: "help" }, [_vm._v(" " + _vm._s(_vm.helpText) + " ")]) : _vm._e()];
  })], 2);
};
var staticRenderFns$b = [];
var InputField_vue_vue_type_style_index_0_lang = "";
const __vue2_script$c = {
  name: "InputField",
  components: {
    ActivityIndicator
  },
  mixins: [
    FormControl
  ]
};
const __cssModules$c = {};
var __component__$c = /* @__PURE__ */ normalizeComponent(__vue2_script$c, render$b, staticRenderFns$b, false, __vue2_injectStyles$c, null, null, null);
function __vue2_injectStyles$c(context) {
  for (let o in __cssModules$c) {
    this[o] = __cssModules$c[o];
  }
}
var InputField = /* @__PURE__ */ function() {
  return __component__$c.exports;
}();
var render$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("tbody", [_c("tr", [_c("td", { attrs: { "colspan": _vm.colspan } }, [_c("activity-indicator", { attrs: { "height": _vm.height, "size": _vm.size, "type": _vm.type, "center": "" } })], 1)])]);
};
var staticRenderFns$a = [];
const __vue2_script$b = {
  components: {
    ActivityIndicator
  },
  props: {
    colspan: {
      type: Number,
      required: true
    },
    height: {
      type: [Number, String]
    },
    type: {
      type: String,
      required: true,
      default: "dots"
    },
    size: {
      type: String,
      required: true,
      default: "sm"
    }
  }
};
const __cssModules$b = {};
var __component__$b = /* @__PURE__ */ normalizeComponent(__vue2_script$b, render$a, staticRenderFns$a, false, __vue2_injectStyles$b, null, null, null);
function __vue2_injectStyles$b(context) {
  for (let o in __cssModules$b) {
    this[o] = __cssModules$b[o];
  }
}
var DataTableActivityIndicator = /* @__PURE__ */ function() {
  return __component__$b.exports;
}();
var render$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "data-table-animated-gradient", class: { pulse: _vm.pulse, rounded: _vm.rounded, wave: _vm.wave } });
};
var staticRenderFns$9 = [];
var DataTableAnimatedGradient_vue_vue_type_style_index_0_lang = "";
const __vue2_script$a = {
  props: {
    pulse: Boolean,
    wave: Boolean,
    rounded: Boolean,
    height: [String, Number]
  }
};
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent(__vue2_script$a, render$9, staticRenderFns$9, false, __vue2_injectStyles$a, null, null, null);
function __vue2_injectStyles$a(context) {
  for (let o in __cssModules$a) {
    this[o] = __cssModules$a[o];
  }
}
var DataTableAnimatedGradient = /* @__PURE__ */ function() {
  return __component__$a.exports;
}();
var render$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("tbody", _vm._l(_vm.rows, function(y) {
    return _c("tr", { key: "row-" + y }, _vm._l(_vm.colspan, function(x) {
      return _c("td", { key: "col-" + x }, [_c("data-table-animated-gradient", { attrs: { "height": _vm.height, "rounded": _vm.rounded, "pulse": _vm.pulse, "wave": _vm.wave } })], 1);
    }), 0);
  }), 0);
};
var staticRenderFns$8 = [];
const __vue2_script$9 = {
  components: {
    DataTableAnimatedGradient
  },
  props: {
    colspan: {
      type: Number,
      required: true
    },
    height: {
      type: [Number, String]
    },
    pulse: Boolean,
    wave: Boolean,
    rounded: Boolean,
    rows: {
      type: Number,
      required: true
    }
  }
};
const __cssModules$9 = {};
var __component__$9 = /* @__PURE__ */ normalizeComponent(__vue2_script$9, render$8, staticRenderFns$8, false, __vue2_injectStyles$9, null, null, null);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var DataTableAnimatedGrid = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var render$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("tbody", [_c("tr", [_c("td", { attrs: { "colspan": _vm.colspan } }, [_vm._v(" " + _vm._s(_vm.error) + " ")])])]);
};
var staticRenderFns$7 = [];
const __vue2_script$8 = {
  props: {
    colspan: Number,
    error: Error
  }
};
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent(__vue2_script$8, render$7, staticRenderFns$7, false, __vue2_injectStyles$8, null, null, null);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var DataTableError = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
var render$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("a", { staticClass: "data-table-anchor", attrs: { "href": _vm.href, "data-current-sort": _vm.currentSort, "data-last-sort": _vm.lastSort } }, [_vm._t("default"), _vm.currentSort === "asc" ? _c("span", { staticClass: "sort-asc" }, [_c("svg", { attrs: { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "viewBox": "0 0 292.362 292.361" } }, [_c("g", [_c("path", { attrs: { "d": "M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287\n		C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813\n		c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z" } })])])]) : _vm._e(), _vm.currentSort === "desc" ? _c("span", { staticClass: "sort-desc" }, [_c("svg", { attrs: { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "viewBox": "0 0 292.362 292.362" } }, [_c("g", [_c("path", { attrs: { "d": "M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n		C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n		s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" } })])])]) : _vm._e()], 2);
};
var staticRenderFns$6 = [];
var DataTableAnchor_vue_vue_type_style_index_0_lang = "";
const __vue2_script$7 = {
  props: {
    href: {
      type: String,
      default: "#"
    },
    sort: {
      type: String,
      default: void 0,
      validate(value) {
        return ["asc", "desc"].indexOf(value) > -1;
      }
    }
  },
  data() {
    return {
      currentSort: this.sort,
      lastSort: null
    };
  },
  watch: {},
  methods: {
    asc() {
      return this.currentSort = "asc";
    },
    desc() {
      return this.currentSort = "desc";
    },
    clear(saveLastSort = true) {
      return this.currentSort = void 0;
    },
    saveLastSort() {
      return this.lastSort = this.currentSort;
    },
    restoreLastSort() {
      this.currentSort = this.lastSort;
      this.lastSort = null;
      return this.currentSort;
    },
    toggle(saveLastSort = true) {
      if (this.lastSort) {
        return this.restoreLastSort();
      }
      if (!this.currentSort) {
        return this.asc();
      }
      if (this.currentSort === "asc") {
        return this.desc();
      }
      return this.clear();
    }
  }
};
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent(__vue2_script$7, render$6, staticRenderFns$6, false, __vue2_injectStyles$7, null, null, null);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var DataTableAnchor = /* @__PURE__ */ function() {
  return __component__$7.exports;
}();
const __vue2_script$6 = {
  functional: true,
  render(h, context) {
    context.children.filter((vnode) => !!(vnode.tag && vnode.data && vnode.data.attrs && vnode.data.attrs["data-order"])).map((vnode) => {
      const anchor = h(DataTableAnchor, {
        props: {
          sort: vnode.data.attrs["data-sort"]
        },
        nativeOn: {
          click(e) {
            const sort = anchor.componentInstance.toggle();
            if (context.listeners && context.listeners.order) {
              e.preventDefault();
              context.listeners.order(vnode.data.attrs["data-order"], sort, anchor, context.children);
            }
          }
        }
      }, vnode.children);
      return Object.assign(vnode, {
        children: [
          anchor
        ]
      });
    });
    return h("thead", [
      h("tr", [context.children])
    ]);
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(__vue2_script$6, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var DataTableHead = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign2 = function() {
  __assign2 = Object.assign || function __assign22(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign2({
    delimiter: "."
  }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign2({
    delimiter: "-"
  }, options));
}
var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name;
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix && paramCase(this.sizePrefix);
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", [_c("ul", { staticClass: "pagination", class: _vm.classes }, [_c("li", { staticClass: "page-item", class: { "disabled": _vm.disabled || _vm.currentPage === 1 } }, [_c("a", { staticClass: "page-link", attrs: { "href": "#", "aria-label": "Previous" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.prev($event);
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(" \xAB ")])])]), _vm._l(_vm.pages, function(item, i) {
    return _c("li", { key: i, staticClass: "page-item", class: { "active": item.page === _vm.currentPage, "disabled": _vm.disabled || !!item.divider || !!item.disabled }, attrs: { "data-page": item.page } }, [_vm._t("default", function() {
      return [item.divider ? _c("a", { staticClass: "page-link" }, [_vm._v(" \u2026 ")]) : _c("a", { staticClass: "page-link", class: item.class, attrs: { "href": "#", "disabled": _vm.disabled, "data-label": item.label }, on: { "click": function($event) {
        $event.preventDefault();
        return _vm.paginate(item.page, $event);
      } } }, [item.label ? _c("span", { attrs: { "aria-hidden": "true" }, domProps: { "innerHTML": _vm._s(item.label) } }) : _vm._e(), item.page ? _c("span", { attrs: { "aria-hidden": "true" }, domProps: { "innerHTML": _vm._s(item.page) } }) : _vm._e()])];
    }, { "item": item })], 2);
  }), _c("li", { staticClass: "page-item", class: { "disabled": _vm.disabled || _vm.currentPage >= _vm.totalPages } }, [_c("a", { staticClass: "page-link", attrs: { "href": "#", "aria-label": "Next" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.next($event);
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(" \xBB ")])])])], 2)]);
};
var staticRenderFns$5 = [];
const __vue2_script$5 = {
  name: "Pagination",
  mixins: [
    Shadowable,
    Sizeable
  ],
  props: {
    align: {
      type: String,
      validate: (value) => {
        return ["start", "end", "center"].indexOf(value) !== -1;
      }
    },
    disabled: Boolean,
    page: {
      type: Number,
      default: 1
    },
    showPages: {
      type: Number,
      default: 6
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: this.page
    };
  },
  computed: {
    pages() {
      return this.generate();
    },
    classes() {
      return {
        [this.shadowableClass]: !!this.shadow,
        [this.sizeableClass]: !!this.sizeableClass,
        ["justify-content-" + this.align]: !!this.align
      };
    }
  },
  methods: {
    next(event) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
    },
    prev(event) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
    },
    paginate(page, event) {
      if (event.currentTarget.parentNode.classList.contains("disabled")) {
        return;
      }
      this.currentPage = page;
      this.$emit("paginate", page, event);
    },
    generate() {
      const pages = [];
      const showPages = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      let startPage = this.currentPage >= showPages ? this.currentPage - showPages / 2 : 1;
      const startOffset = showPages + startPage;
      const endPage = this.totalPages < startOffset ? this.totalPages : startOffset;
      const diff = startPage - endPage + showPages;
      startPage -= startPage - diff > 0 ? diff : 0;
      if (startPage > 1) {
        pages.push({ page: 1 });
      }
      if (startPage > 2) {
        pages.push({ divider: true });
      }
      for (let i = startPage; i < endPage; i++) {
        pages.push({ page: i });
      }
      if (endPage <= this.totalPages) {
        if (this.totalPages - 1 > endPage) {
          pages.push({ divider: true });
        }
        pages.push({ page: this.totalPages < Infinity ? this.totalPages : "&#8734;", disabled: this.totalPages === Infinity });
      }
      return pages;
    }
  }
};
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent(__vue2_script$5, render$5, staticRenderFns$5, false, __vue2_injectStyles$5, null, null, null);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var Pagination = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.type === "full" ? _c("div", { staticClass: "data-table-pagination-full" }, [_c("pagination", { attrs: { "page": _vm.page, "disabled": _vm.disabled, "shadow": _vm.shadow, "total-pages": _vm.totalPages }, on: { "paginate": _vm.onPaginate } })], 1) : _c("div", { staticClass: "data-table-pagination-simple" }, [_c("button", { staticClass: "btn btn-light", attrs: { "type": "button", "disabled": _vm.page === 1 }, on: { "click": function($event) {
    _vm.$emit("paginate", Math.max(1, _vm.page - 1));
  } } }, [_vm._v(" \u2190 Prev ")]), _c("div", [_vm._v(" Page " + _vm._s(_vm.page) + " of " + _vm._s(_vm.isInfinity ? _vm.totalPages : "\u221E") + " ")]), _c("button", { staticClass: "btn btn-light", attrs: { "type": "button", "disabled": _vm.page === _vm.totalPages }, on: { "click": function($event) {
    return _vm.$emit("paginate", _vm.page + 1);
  } } }, [_vm._v(" Next \u2192 ")])]);
};
var staticRenderFns$4 = [];
var DataTablePagination_vue_vue_type_style_index_0_lang = "";
const __vue2_script$4 = {
  components: {
    Pagination
  },
  mixins: [
    Shadowable
  ],
  props: {
    disabled: Boolean,
    page: Number,
    totalPages: Number,
    type: String
  },
  computed: {
    isInfinity() {
      return this.totalPages < Infinity;
    }
  },
  methods: {
    onPaginate(page) {
      this.$emit("paginate", page);
    }
  }
};
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent(__vue2_script$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var DataTablePagination = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("tbody", [_c("tr", [_c("td", { attrs: { "colspan": _vm.colspan } }, [_c("div", { staticClass: "data-table-placeholder" }, [_vm.title ? _c("h3", { staticClass: "data-table-placeholder-title" }, [_vm._v(" " + _vm._s(_vm.title) + " ")]) : _vm._e(), _vm.subtitle ? _c("h4", { staticClass: "data-table-placeholder-subtitle" }, [_vm._v(" " + _vm._s(_vm.subtitle) + " ")]) : _vm._e(), _c("div", { staticClass: "data-table-placeholder-content" }, [_vm._t("default")], 2)])])])]);
};
var staticRenderFns$3 = [];
var DataTablePlaceholder_vue_vue_type_style_index_0_lang = "";
const __vue2_script$3 = {
  props: {
    colspan: Number,
    title: String,
    subtitle: String
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var DataTablePlaceholder = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("svg", { attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 -12 512.00032 512" } }, [_c("path", { attrs: { "d": "m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0" } }), _c("path", { attrs: { "d": "m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0" } }), _c("path", { attrs: { "d": "m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0" } })]);
};
var staticRenderFns$2 = [];
const __vue2_script$2 = {};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var EmptyBox = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("svg", { attrs: { "xmlns": "http://www.w3.org/2000/svg", "version": "1.1", "viewBox": "-1 0 136 136.21852" } }, [_c("g", [_c("path", { attrs: { "d": "M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " } })])]);
};
var staticRenderFns$1 = [];
const __vue2_script$1 = {};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var MagnifyingGlass = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
let handleResponse = (response) => response;
let handleRequest = (data2) => data2;
function transformResponse2(fn) {
  if (typeof fn === "function") {
    return handleResponse = fn;
  }
  throw Error("The response transformer must be a function.");
}
var render = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "data-table" }, [_vm._t("content"), _vm.title || _vm.search || _vm.$slots.left ? _c("form", { ref: "form", staticClass: "data-table-header", on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.onSubmit.apply(null, arguments);
  } } }, [_c("div", { staticClass: "data-table-header-left" }, [_vm._t("title", function() {
    return [_vm.title ? _c(_vm.titleTag, { tag: "component", class: { "mb-3": _vm.search, "mb-0": !_vm.search } }, [_vm._v(" " + _vm._s(_vm.title) + " ")]) : _vm._e()];
  }), _vm._t("search", function() {
    return [_vm.search ? _c("input-field", { staticClass: "data-table-search", attrs: { "activity": _vm.isSubmitting, "group": false, "placeholder": _vm.searchPlaceholder, "label": _vm.searchLabel }, on: { "input": _vm.onSearchInput }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_vm._t("search-icon", function() {
        return [_c("magnifying-glass", { attrs: { "width": "1rem", "height": "1rem" } })];
      })];
    }, proxy: true }], null, true), model: { value: _vm.params[_vm.searchParam], callback: function($$v) {
      _vm.$set(_vm.params, _vm.searchParam, $$v);
    }, expression: "params[searchParam]" } }) : _vm._e()];
  }), _vm._t("left")], 2), _c("div", { staticClass: "data-table-header-right" }, [_vm._t("limit", function() {
    return [_vm.hasLoadedOnce && _vm.limitField ? _c("label", { staticClass: "data-table-header-inline-field", class: { "has-slot": !!_vm.$slots.right } }, [_c("span", { staticClass: "data-table-header-inline-field-label" }, [_vm._v(_vm._s(_vm.limitLabel))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.currentLimit, expression: "currentLimit" }], staticClass: "form-select form-control", on: { "change": function($event) {
      var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
        return o.selected;
      }).map(function(o) {
        var val = "_value" in o ? o._value : o.value;
        return val;
      });
      _vm.currentLimit = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
    } } }, _vm._l(_vm.limitOptions, function(value) {
      return _c("option", { key: value }, [_vm._v(_vm._s(value))]);
    }), 0)]) : _vm._e()];
  }), _vm._t("right")], 2)]) : _vm._e(), _c("div", { class: (_obj = { "card": !!_vm.card }, _obj[_vm.shadowableClass] = !!_vm.shadow, _obj) }, [_c("table", { staticClass: "table", class: { "loading": !!_vm.isLoading } }, [_vm._t("thead", function() {
    return [_c("data-table-head", { on: { "order": _vm.onOrderBy } }, [_vm._t("th", null, { "colspan": _vm.colspan })], 2)];
  }, { "colspan": _vm.colspan, "onOrderBy": _vm.onOrderBy }), _vm._t("tbody", function() {
    return [_vm.isLoading && _vm.indicator ? _c("data-table-activity-indicator", { attrs: { "colspan": _vm.colspan, "height": _vm.hasLoadedOnce ? _vm.currentHeight : _vm.initialHeight, "type": _vm.indicator, "size": _vm.indicatorSize } }) : _vm.isLoading ? _c("data-table-animated-grid", { attrs: { "colspan": _vm.colspan, "wave": "", "rounded": "", "rows": _vm.currentData.length || _vm.currentLimit } }) : !_vm.isLoading && _vm.currentData.length ? _c("tbody", _vm._l(_vm.currentData, function(row, i) {
      return _c("tr", { key: i }, [_vm._t("default", null, { "row": row })], 2);
    }), 0) : _vm.error ? _c("data-table-error", { attrs: { "colspan": _vm.colspan, "error": _vm.error } }, [_vm._t("error", null, { "error": _vm.error })], 2) : _c("data-table-placeholder", { attrs: { "colspan": _vm.colspan, "title": !_vm.isLoading ? _vm.placeholderTitle : void 0, "subtitle": !_vm.isLoading ? _vm.placeholderSubtitle : void 0 } }, [_c("empty-box", { staticClass: "mt-2", attrs: { "height": "5rem" } })], 1)];
  }, { "colspan": _vm.colspan, "currentData": _vm.currentData, "error": _vm.error, "isLoading": _vm.isLoading, "title": _vm.placeholderTitle, "subtitle": _vm.placeholderSubtitle }), _vm._t("tfoot", function() {
    return [_vm.$slots.tf ? _c("tfoot", [_c("tr", [_vm._t("tf", null, { "colspan": _vm.colspan })], 2)]) : _vm._e()];
  }, { "colspan": _vm.colspan })], 2)]), _vm._t("pagination", function() {
    return [_vm.totalPages > 1 && _vm.hasLoadedOnce && _vm.pagination && !_vm.error ? _c("data-table-pagination", { staticClass: "mt-3", attrs: { "disabled": !_vm.hasLoadedOnce, "type": _vm.pagination, "page": _vm.currentPage, "total-pages": _vm.totalPages, "shadow": _vm.shadow }, on: { "paginate": _vm.onPaginate } }) : _vm._e()];
  }, { "currentPage": _vm.currentPage, "hasLoadedOnce": _vm.hasLoadedOnce, "page": _vm.currentPage, "totalPages": _vm.totalPages })], 2);
};
var staticRenderFns = [];
var DataTable_vue_vue_type_style_index_0_lang = "";
const debounced = lodash_debounce((fn, ...args) => fn(...args), 500);
const __vue2_script = {
  components: {
    DataTableActivityIndicator,
    DataTableAnimatedGrid,
    DataTableError,
    DataTableHead,
    DataTablePagination,
    DataTablePlaceholder,
    EmptyBox,
    InputField,
    MagnifyingGlass
  },
  mixins: [
    Shadowable
  ],
  props: {
    activity: Boolean,
    axios: {
      type: [Object, Function],
      default: () => axios
    },
    card: Boolean,
    data: Array,
    indicator: String,
    indicatorSize: String,
    initialHeight: {
      type: [String, Number],
      default: 250
    },
    limit: {
      type: Number,
      default: 10
    },
    limitField: {
      type: Boolean,
      default: true
    },
    limitLabel: {
      type: String,
      default: "Per Page"
    },
    limitOptions: {
      type: Array,
      default: () => [1, 5, 10, 20, 50, 100]
    },
    limitParam: {
      type: String,
      default: "limit"
    },
    order: [Array, String],
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    page: Number,
    pageParam: {
      type: String,
      default: "page"
    },
    pagination: {
      type: [Boolean, String],
      default: "full",
      validate(value) {
        return ["simple", "full"].indexOf(value) > -1;
      }
    },
    placeholderTitle: {
      type: String,
      default: "Oops!"
    },
    placeholderSubtitle: {
      type: String,
      default: "This table is empty."
    },
    request: {
      type: Function,
      default() {
        const transformer = this.transformRequest || handleRequest;
        return this.axios.get(this.url, transformer({
          params: Object.assign({
            [this.limitParam]: this.currentLimit,
            [this.pageParam]: this.currentPage,
            order: this.currentSort.length ? this.currentSort.map(({ column }) => column).join(",") : void 0,
            sort: this.currentSort.length ? this.currentSort.map(({ direction }) => direction).join(",") : void 0
          }, this.params)
        }));
      }
    },
    search: {
      type: Boolean,
      default: false
    },
    searchLabel: String,
    searchPlaceholder: {
      type: String,
      default: "Search by keyword(s)"
    },
    searchParam: {
      type: String,
      default: "q"
    },
    title: String,
    titleTag: {
      type: String,
      default: "h3"
    },
    transformRequest: Function,
    transformResponse: Function,
    size: String,
    sort: [Array, String],
    sortLimit: Number,
    url: String
  },
  data() {
    return {
      currentHeight: null,
      currentLimit: this.limit,
      currentPage: this.page ? parseInt(this.page) : void 0,
      currentSort: [],
      currentData: this.data || [],
      error: null,
      hasLoadedOnce: false,
      isLoading: this.activity,
      isSubmitting: false,
      totalPages: Infinity
    };
  },
  computed: {
    colspan() {
      return this.$slots.th && (this.$slots.th.filter((vnode) => !!vnode.tag).length || 1);
    }
  },
  watch: {
    currentSort: {
      deep: true,
      handler(value) {
        if (this.sortLimit && this.sortLimit < value.length) {
          value.splice(0, this.sortLimit).forEach(({ vnode }) => {
            vnode.componentInstance.saveLastSort();
            vnode.componentInstance.clear();
          });
        }
        this.fetch();
      }
    },
    currentPage(value, oldValue) {
      if (value && (oldValue || oldValue === void 0)) {
        const { height } = getComputedStyle(this.$el.querySelector("tbody"));
        const { paddingTop, paddingBottom, borderBottomWidth } = getComputedStyle(this.$el.querySelector("td"));
        this.currentHeight = `calc(${height} - ${paddingTop} - ${paddingBottom} - ${borderBottomWidth})`;
        this.fetch();
      }
    },
    currentLimit(value, oldValue) {
      if (value && oldValue) {
        this.fetch();
      }
    }
  },
  mounted() {
    if (this.url) {
      this.fetch();
    }
  },
  methods: {
    handleResponse(response) {
      const transformer = this.transformResponse || handleResponse;
      const transformed = transformer(response);
      if (typeof transformed === "object") {
        const { data: data2, totalPages } = transformed;
        this.hasLoadedOnce = true;
        this.currentData = data2;
        this.totalPages = totalPages;
        return transformed;
      }
      throw Error("The transformed response must return an object.");
    },
    fetch() {
      this.isLoading = true;
      return this.request().then(this.handleResponse, (e) => {
        this.error = e;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    setPage(page) {
      this.currentPage = parseInt(page || 1);
    },
    next() {
      this.currentPage++;
    },
    prev() {
      this.currentPage = Math.max(1, --this.currentPage);
    },
    submit() {
      this.$refs.form.dispatchEvent(new Event("submit"));
    },
    onPaginate(page) {
      this.currentPage = parseInt(page || 1);
    },
    orderBy(column, direction, vnode) {
      const existing = this.currentSort.reduce((carry, item) => {
        return item.column === column ? item : carry;
      }, null);
      if (!direction) {
        this.currentSort.splice(this.currentSort.indexOf(existing), 1);
      } else if (existing) {
        existing.direction = direction;
      } else {
        this.currentSort.push({ column, direction, vnode });
      }
    },
    orderByKeys() {
      return this.currentSort.filter();
    },
    onSearchInput(value) {
      if (value) {
        debounced(this.submit);
      } else {
        this.submit();
      }
    },
    onSubmit(e) {
      this.isSubmitting = true;
      this.fetch().then(() => {
        this.isSubmitting = false;
      });
    },
    onOrderBy(column, direction, vnode) {
      this.orderBy(column, direction, vnode);
      this.$emit("sort", this.currentSort);
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var DataTable = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { DataTable, transformResponse2 as transformResponse };
