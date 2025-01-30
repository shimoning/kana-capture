"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const q=require("./utilities/diff.js"),p=require("./utilities/extractor.js"),b=require("./utilities/kanaConverter.js");var _=(c=>(c[c.REALTIME=0]="REALTIME",c[c.ENTER=1]="ENTER",c))(_||{});function K(c,m,n={observeInterval:30,debug:!1,realtime:!0,enter:!1,clearOnInputEmpty:!1,captureablePatterns:p.CaptureableCharacterType.HIRAGANA}){const A=p.generateCaptureableRegExp(n.captureablePatterns??p.CaptureableCharacterType.HIRAGANA),a=typeof c=="string"?document.querySelector(c):c;if(!a)throw new Error("input element not found");let E=0;function H(){const e=n.realtime&&(n.realtime===!0||n.realtime instanceof HTMLInputElement&&n.realtime.checked),t=n.enter&&(n.enter===!0||n.enter instanceof HTMLInputElement&&n.enter.checked);E=e||!t?0:1}const u=[],I=e=>{if(typeof e=="string"){const t=document.querySelectorAll(e);for(const d of t)u.push({element:d,type:b.KanaType.Hiragana})}else e instanceof HTMLInputElement?u.push({element:e,type:b.KanaType.Hiragana}):u.push({element:e.element,type:e.type??b.KanaType.Hiragana})};if(Array.isArray(m))for(const e of m)I(e);else I(m);let i=!1,s="",v="",o="";const l=new Array(u.length).fill("");function C(){r("reset"),s="",v="",o="";for(let e=0;e<u.length;e++)l[e]=""}function g(){s=a.value,u.forEach(({element:e},t)=>{l[t]=e.value}),r("setup",a.value,{defaultString:s,activeOutputs:u})}let f;function R(){r("start",{timer:f}),!f&&(f=setInterval(()=>{H(),S()},n.observeInterval??30))}function k(){r("end",{timer:f}),f&&(clearInterval(f),f=void 0)}function S(){const e=a.value;if(r("observe",{observing:i,inputString:e,defaultString:s,currentString:v,outputValues:l}),e==="")return;const t=q.diff(s,e);v!==t.diff&&(v=t.diff,i&&y(v))}function y(e){r("set",{defaultString:s,string:e,inputValue:o,outputValues:l});const t=p.extractor({input:e,patterns:A});t.length===e.length&&(o=t),u.forEach(({element:d,type:L},h)=>{const T=b.kanaConverter(L,o);r("converted",{type:L,string:e,inputValue:o,after:T,before:l[h]}),E===0?d.value=l[h]+T:E===1&&(d.dataset.kana=l[h]=T)})}function M(){u.forEach(({element:e})=>{e.dataset.kana&&(e.value+=e.dataset.kana,e.removeAttribute("data-kana"))})}function r(e,...t){if(n.debug){if(t.length===0){console.info("debug",{message:e});return}console.info("debug",{message:e},...t)}}a.addEventListener("focus",()=>{r("focus"),g()}),a.addEventListener("blur",()=>{r("blur"),k()}),a.addEventListener("compositionstart",e=>{r("compositionstart",{e}),g(),R(),i=!0}),a.addEventListener("compositionend",e=>{r("compositionend",{e}),k(),y(o),C(),i=!1}),a.addEventListener("beforeinput",e=>{if(r("beforeinput",{observing:i,e}),!i&&!e.isComposing&&e.data){const t=e.data,d=p.extractor({input:t,patterns:A});t&&t===d&&(g(),y(t))}}),a.addEventListener("keyup",e=>{r("keyup",{observing:i,e}),e.code==="Enter"&&(n.clearOnInputEmpty&&a.value===""?(C(),y("")):E===1&&M())})}exports.CaptureableCharacterType=p.CaptureableCharacterType;exports.KanaType=b.KanaType;exports.OutputTiming=_;exports.setupObserver=K;
//# sourceMappingURL=observer.js.map
