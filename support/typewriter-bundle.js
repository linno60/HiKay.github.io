require=function t(e,n,r){function i(u,s){if(!n[u]){if(!e[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(o)return o(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[u]={exports:{}};e[u][0].call(l.exports,function(t){var n=e[u][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(t,e,n){(function(){var n,r;r=t("./random"),n=function(t,e,n,i){var o,u,s;return o=-1,s=-1,u=!1,{next:function(){var a;if(o>=i.length-1){if(-1===s)return null;u=!0}return u?o>=s?(o--,"\b"):(u=!1,s=-1,i.charAt(++o)):(o++,u=-1!==s&&o%n===0,r.integerInRange(0,100)>e?(a=t.getAdjacentCharacter(i.charAt(o)),null==a?i.charAt(o):(-1===s&&(s=o,u=1===r.integerInRange(0,1)),a)):i.charAt(o))}}},e.exports=n}).call(this)},{"./random":4}],2:[function(t,e,n){(function(){var n,r,i,o;o=t("./random"),i=[["`","1","2","3","4","5","6","7","8","9","0","-","="],["","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],["","A","S","D","F","G","H","J","K","L",";","'"],["","Z","X","C","V","B","N","M",",",".","/"]],r=function(t){return t===t.toLowerCase()},n=function(t){var e,u,s,a,c,l,f,p,m,h;for(h=c=0,p=i.length;p>c;h=c+=1)for(a=l=0,m=i[h].length;m>l;a=l+=1)if(i[h][a].toLowerCase()===t.toLowerCase())return f=o.integerInRange(-1,1),s=h+f,(s>=i.length||0>s)&&(s+=-2*f),a>=i[s].length&&(a=i[s].length-1),f=0===f?[-1,1][o.integerInRange(0,1)]:o.integerInRange(-1,1),u=a+f,(u>=i[s].length||0>u)&&(u+=-2*f),e=i[s][u],""===e?n(t):r(t)?e.toLowerCase():e;return null},e.exports.getAdjacentCharacter=n}).call(this)},{"./random":4}],3:[function(t,e,n){(function(){var n,r,i;i=t("assert"),r=t("./sequence"),n=function(){function t(t){this.onWait=t,this._sequences=[],this._waiting=!0,"function"==typeof this.onWait&&this.onWait()}return t.prototype._next=function(){var t,e,n,r,i;for(i=null,n=this._sequences,t=0,e=n.length;e>t;t++)if(r=n[t],null!=r){if(r.empty())continue;i=r;break}return null!=i?i.next(this._next.bind(this)):(this._sequences=[],this._waiting=!0,"function"==typeof this.onWait?this.onWait():void 0)},t.prototype.then=function(t,e){return i.ok(null!=t,"The priority must be specified"),i.strictEqual(typeof t,"number","Priority must be a number"),i.strictEqual(~~t,t,"Priority must be an integer"),i.ok(t>=0,"Priority must be a positive integer"),i.ok(null!=e,"The function must be specified"),null==this._sequences[t]&&(this._sequences[t]=new r),this._sequences[t].add(e),this._waiting?(this._waiting=!1,this._next()):void 0},t}(),e.exports=n}).call(this)},{"./sequence":5,assert:7}],4:[function(t,e,n){(function(){var n,r;n=t("assert"),r=function(t,e){return n.ok(null!=t,"The minimum must be specified"),n.strictEqual(typeof t,"number","Min must be a Number"),n.strictEqual(~~t,t,"Min must be an integer"),n.ok(null!=e,"The maximum must be specified"),n.strictEqual(typeof e,"number","Max must be a Number"),n.strictEqual(~~e,e,"Max must be an integer"),n.strictEqual(e>=t,!0,"Min must be less than or equal to Max"),t===e?t:Math.floor(Math.random()*(e-t+1))+t},e.exports.integerInRange=r}).call(this)},{assert:7}],5:[function(t,e,n){(function(){var n,r;r=t("assert"),n=function(){function t(){this._queue=[]}return t.prototype.next=function(t){var e;return this.empty()?void 0:(e=this._queue.shift())(t)},t.prototype.add=function(t){return r.ok(null!=t,"The function must be specified"),this._queue.push(t)},t.prototype.empty=function(){return 0===this._queue.length},t}(),e.exports=n}).call(this)},{assert:7}],6:[function(t,e,n){(function(n){(function(){var r,i,o,u,s;o=t("assert"),r=t("./prioritysequence"),s=t("./random"),u=t("./charactergenerator"),i=function(){function t(){this._prioritySequence=new r(function(t){return function(){return t._sequenceLevel=0}}(this))}return t.prototype.setTargetDomElement=function(t){return o.ok(t instanceof Element,"TargetDomElement must be an instance of Element"),this.targetDomElement=t},t.prototype.setAccuracy=function(t){return o.strictEqual(typeof t,"number","Accuracy must be a number"),o.ok(t>0&&100>=t,"Accuracy must be greater than 0 and less than or equal to 100"),this.accuracy=t},t.prototype.setMinimumSpeed=function(t){return o.strictEqual(typeof t,"number","MinimumSpeed must be a number"),o.ok(t>0,"MinimumSpeed must be greater than 0"),null!=this.maximumSpeed&&t>this.maximumSpeed?this.minimumSpeed=this.maximumSpeed:this.minimumSpeed=t},t.prototype.setMaximumSpeed=function(t){return o.strictEqual(typeof t,"number","MaximumSpeed must be a number"),o.ok(t>0,"MaximumSpeed must be greater than 0"),null!=this.minimumSpeed&&this.minimumSpeed>t?this.maximumSpeed=minimumSpeed:this.maximumSpeed=t},t.prototype.setKeyboardLayout=function(t){return o.strictEqual(typeof t.getAdjacentCharacter,"function","KeyboardLayout must have an exported getAdjacentCharacter method"),this.keyboardLayout=t},t.prototype._makeChainable=function(t,e){var r;return r=Object.create(this),r._sequenceLevel=this._sequenceLevel,this._prioritySequence.then(this._sequenceLevel,function(i){return n.nextTick(function(){return e(function(){return null!=t&&t.call(r),i()})})}),null!=t&&this._sequenceLevel++,null==t||this.hasOwnProperty("_prioritySequence")?this:void 0},t.prototype.clear=function(t){return this._makeChainable(t,function(t){return function(e){for(var n;null!=(n=t.targetDomElement.lastChild);)t.targetDomElement.removeChild(n);return e()}}(this))},t.prototype.waitRange=function(t,e,n){return this._makeChainable(n,function(n){return function(n){return setTimeout(n,s.integerInRange(t,e))}}(this))},t.prototype.wait=function(t,e){return this.waitRange(t,t,e)},t.prototype.put=function(t,e){return this._makeChainable(e,function(e){return function(n){var r,i;for(i=document.createElement("div"),i.innerHTML=t;null!=(r=i.firstChild);)e.targetDomElement.appendChild(r);return n()}}(this))},t.prototype["delete"]=function(t){return this._makeChainable(t,function(t){return function(e){return t.targetDomElement.removeChild(t.targetDomElement.lastChild),e()}}(this))},t.prototype.type=function(t,e){var n,r,i;for(r=(this.minimumSpeed+this.maximumSpeed)/2,i=u(this.keyboardLayout,this.accuracy,r,t);null!==(n=i.next());)"\b"!==n?this.put(n):this["delete"](),this.waitRange(~~(1e3/this.maximumSpeed),~~(1e3/this.minimumSpeed));return this.wait(0,e)},t}(),e.exports=i}).call(this)}).call(this,t("_process"))},{"./charactergenerator":1,"./prioritysequence":3,"./random":4,_process:9,assert:7}],7:[function(t,e,n){function r(t,e){return m.isUndefined(e)?""+e:m.isNumber(e)&&!isFinite(e)?e.toString():m.isFunction(e)||m.isRegExp(e)?e.toString():e}function i(t,e){return m.isString(t)?t.length<e?t:t.slice(0,e):t}function o(t){return i(JSON.stringify(t.actual,r),128)+" "+t.operator+" "+i(JSON.stringify(t.expected,r),128)}function u(t,e,n,r,i){throw new d.AssertionError({message:n,actual:t,expected:e,operator:r,stackStartFunction:i})}function s(t,e){t||u(t,!0,e,"==",d.ok)}function a(t,e){if(t===e)return!0;if(m.isBuffer(t)&&m.isBuffer(e)){if(t.length!=e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}return m.isDate(t)&&m.isDate(e)?t.getTime()===e.getTime():m.isRegExp(t)&&m.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:m.isObject(t)||m.isObject(e)?l(t,e):t==e}function c(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function l(t,e){if(m.isNullOrUndefined(t)||m.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(m.isPrimitive(t)||m.isPrimitive(e))return t===e;var n=c(t),r=c(e);if(n&&!r||!n&&r)return!1;if(n)return t=h.call(t),e=h.call(e),a(t,e);var i,o,u=y(t),s=y(e);if(u.length!=s.length)return!1;for(u.sort(),s.sort(),o=u.length-1;o>=0;o--)if(u[o]!=s[o])return!1;for(o=u.length-1;o>=0;o--)if(i=u[o],!a(t[i],e[i]))return!1;return!0}function f(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0?!0:!1:!1}function p(t,e,n,r){var i;m.isString(n)&&(r=n,n=null);try{e()}catch(o){i=o}if(r=(n&&n.name?" ("+n.name+").":".")+(r?" "+r:"."),t&&!i&&u(i,n,"Missing expected exception"+r),!t&&f(i,n)&&u(i,n,"Got unwanted exception"+r),t&&i&&n&&!f(i,n)||!t&&i)throw i}var m=t("util/"),h=Array.prototype.slice,g=Object.prototype.hasOwnProperty,d=e.exports=s;d.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=o(this),this.generatedMessage=!0);var e=t.stackStartFunction||u;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var n=new Error;if(n.stack){var r=n.stack,i=e.name,s=r.indexOf("\n"+i);if(s>=0){var a=r.indexOf("\n",s+1);r=r.substring(a+1)}this.stack=r}}},m.inherits(d.AssertionError,Error),d.fail=u,d.ok=s,d.equal=function(t,e,n){t!=e&&u(t,e,n,"==",d.equal)},d.notEqual=function(t,e,n){t==e&&u(t,e,n,"!=",d.notEqual)},d.deepEqual=function(t,e,n){a(t,e)||u(t,e,n,"deepEqual",d.deepEqual)},d.notDeepEqual=function(t,e,n){a(t,e)&&u(t,e,n,"notDeepEqual",d.notDeepEqual)},d.strictEqual=function(t,e,n){t!==e&&u(t,e,n,"===",d.strictEqual)},d.notStrictEqual=function(t,e,n){t===e&&u(t,e,n,"!==",d.notStrictEqual)},d["throws"]=function(t,e,n){p.apply(this,[!0].concat(h.call(arguments)))},d.doesNotThrow=function(t,e){p.apply(this,[!1].concat(h.call(arguments)))},d.ifError=function(t){if(t)throw t};var y=Object.keys||function(t){var e=[];for(var n in t)g.call(t,n)&&e.push(n);return e}},{"util/":11}],8:[function(t,e,n){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],9:[function(t,e,n){function r(){l=!1,s.length?c=s.concat(c):f=-1,c.length&&i()}function i(){if(!l){var t=setTimeout(r);l=!0;for(var e=c.length;e;){for(s=c,c=[];++f<e;)s&&s[f].run();f=-1,e=c.length}s=null,l=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function u(){}var s,a=e.exports={},c=[],l=!1,f=-1;a.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new o(t,e)),1!==c.length||l||setTimeout(i,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=u,a.addListener=u,a.once=u,a.off=u,a.removeListener=u,a.removeAllListeners=u,a.emit=u,a.binding=function(t){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(t){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},{}],10:[function(t,e,n){e.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},{}],11:[function(t,e,n){(function(e,r){function i(t,e){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(e)?r.showHidden=e:e&&n._extend(r,e),S(r.showHidden)&&(r.showHidden=!1),S(r.depth)&&(r.depth=2),S(r.colors)&&(r.colors=!1),S(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),a(r,t,r.depth)}function o(t,e){var n=i.styles[e];return n?"["+i.colors[n][0]+"m"+t+"["+i.colors[n][1]+"m":t}function u(t,e){return t}function s(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function a(t,e,r){if(t.customInspect&&e&&_(e.inspect)&&e.inspect!==n.inspect&&(!e.constructor||e.constructor.prototype!==e)){var i=e.inspect(r,t);return v(i)||(i=a(t,i,r)),i}var o=c(t,e);if(o)return o;var u=Object.keys(e),g=s(u);if(t.showHidden&&(u=Object.getOwnPropertyNames(e)),O(e)&&(u.indexOf("message")>=0||u.indexOf("description")>=0))return l(e);if(0===u.length){if(_(e)){var d=e.name?": "+e.name:"";return t.stylize("[Function"+d+"]","special")}if(E(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp");if(q(e))return t.stylize(Date.prototype.toString.call(e),"date");if(O(e))return l(e)}var y="",b=!1,x=["{","}"];if(h(e)&&(b=!0,x=["[","]"]),_(e)){var S=e.name?": "+e.name:"";y=" [Function"+S+"]"}if(E(e)&&(y=" "+RegExp.prototype.toString.call(e)),q(e)&&(y=" "+Date.prototype.toUTCString.call(e)),O(e)&&(y=" "+l(e)),0===u.length&&(!b||0==e.length))return x[0]+y+x[1];if(0>r)return E(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special");t.seen.push(e);var w;return w=b?f(t,e,r,g,u):u.map(function(n){return p(t,e,r,g,n,b)}),t.seen.pop(),m(w,y,x)}function c(t,e){if(S(e))return t.stylize("undefined","undefined");if(v(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return b(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):d(e)?t.stylize("null","null"):void 0}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,n,r,i){for(var o=[],u=0,s=e.length;s>u;++u)M(e,String(u))?o.push(p(t,e,n,r,String(u),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(p(t,e,n,r,i,!0))}),o}function p(t,e,n,r,i,o){var u,s,c;if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?s=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(s=t.stylize("[Setter]","special")),M(r,i)||(u="["+i+"]"),s||(t.seen.indexOf(c.value)<0?(s=d(n)?a(t,c.value,null):a(t,c.value,n-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n"))):s=t.stylize("[Circular]","special")),S(u)){if(o&&i.match(/^\d+$/))return s;u=JSON.stringify(""+i),u.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=t.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=t.stylize(u,"string"))}return u+": "+s}function m(t,e,n){var r=0,i=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function h(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function d(t){return null===t}function y(t){return null==t}function b(t){return"number"==typeof t}function v(t){return"string"==typeof t}function x(t){return"symbol"==typeof t}function S(t){return void 0===t}function E(t){return w(t)&&"[object RegExp]"===j(t)}function w(t){return"object"==typeof t&&null!==t}function q(t){return w(t)&&"[object Date]"===j(t)}function O(t){return w(t)&&("[object Error]"===j(t)||t instanceof Error)}function _(t){return"function"==typeof t}function k(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function j(t){return Object.prototype.toString.call(t)}function A(t){return 10>t?"0"+t.toString(10):t.toString(10)}function D(){var t=new Date,e=[A(t.getHours()),A(t.getMinutes()),A(t.getSeconds())].join(":");return[t.getDate(),N[t.getMonth()],e].join(" ")}function M(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var C=/%[sdj%]/g;n.format=function(t){if(!v(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(i(arguments[n]));return e.join(" ")}for(var n=1,r=arguments,o=r.length,u=String(t).replace(C,function(t){if("%%"===t)return"%";if(n>=o)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}}),s=r[n];o>n;s=r[++n])u+=d(s)||!w(s)?" "+s:" "+i(s);return u},n.deprecate=function(t,i){function o(){if(!u){if(e.throwDeprecation)throw new Error(i);e.traceDeprecation?console.trace(i):console.error(i),u=!0}return t.apply(this,arguments)}if(S(r.process))return function(){return n.deprecate(t,i).apply(this,arguments)};if(e.noDeprecation===!0)return t;var u=!1;return o};var L,T={};n.debuglog=function(t){if(S(L)&&(L=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!T[t])if(new RegExp("\\b"+t+"\\b","i").test(L)){var r=e.pid;T[t]=function(){var e=n.format.apply(n,arguments);console.error("%s %d: %s",t,r,e)}}else T[t]=function(){};return T[t]},n.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},n.isArray=h,n.isBoolean=g,n.isNull=d,n.isNullOrUndefined=y,n.isNumber=b,n.isString=v,n.isSymbol=x,n.isUndefined=S,n.isRegExp=E,n.isObject=w,n.isDate=q,n.isError=O,n.isFunction=_,n.isPrimitive=k,n.isBuffer=t("./support/isBuffer");var N=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n.log=function(){console.log("%s - %s",D(),n.format.apply(n,arguments))},n.inherits=t("inherits"),n._extend=function(t,e){if(!e||!w(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":10,_process:9,inherits:8}],typewriter:[function(t,e,n){(function(){var n,r,i;i=t("assert"),n=t("./typewriter"),r=function(e){var r;return r=new n,r.setTargetDomElement(e),{withAccuracy:function(t){return this.accuracy=t,r.setAccuracy(this.accuracy),this},withMinimumSpeed:function(t){return this.minimumSpeed=t,r.setMinimumSpeed(this.minimumSpeed),this},withMaximumSpeed:function(t){return this.maximumSpeed=t,r.setMaximumSpeed(this.maximumSpeed),this},withKeyboardLayout:function(t){return this.keyboardLayout=t,r.setKeyboardLayout(this.keyboardLayout),this},build:function(){return i.ok(null!=this.accuracy,"Accuracy must be set"),i.ok(null!=this.minimumSpeed,"MinimumSpeed must be set"),i.ok(null!=this.maximumSpeed,"MaximumSpeed must be set"),null==this.keyboardLayout&&r.setKeyboardLayout(t("./defaultkeyboardlayout")),r}}},e.exports=r}).call(this)},{"./defaultkeyboardlayout":2,"./typewriter":6,assert:7}]},{},[]);