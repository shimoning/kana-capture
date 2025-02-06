(function(l,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(l=typeof globalThis<"u"?globalThis:l||self,_(l.KanaCapture={}))})(this,function(l){"use strict";function _(e,s){if(!e.length||!s.length)return{before:e,after:s,diff:s,same:"",gap:0};if(e===s)return{before:e,after:s,diff:"",same:e,gap:0};const t=e.split(""),i=s.split(""),f=Math.max(t.length,i.length),a=[],g=[];let K=0;for(let r=0;r<f;r++){const N=t[r];for(let u=r+K;u<f;u++,K++){const d=i[u];if(N===d){a.push(N);break}g.push(d)}}return{before:e,after:s,diff:g.join(""),same:a.join(""),gap:K}}var U=(e=>(e[e.HIRAGANA=0]="HIRAGANA",e[e.KUTOUTEN=1]="KUTOUTEN",e[e.CHOUON=2]="CHOUON",e[e.KAGIKAKKO=3]="KAGIKAKKO",e[e.ZENKAKU_SPACE=4]="ZENKAKU_SPACE",e[e.HANKAKU_SPACE=5]="HANKAKU_SPACE",e[e.ZENKAKU_ALPHABET=6]="ZENKAKU_ALPHABET",e[e.HANKAKU_ALPHABET=7]="HANKAKU_ALPHABET",e[e.ZENKAKU_NUMBER=8]="ZENKAKU_NUMBER",e[e.HANKAKU_NUMBER=9]="HANKAKU_NUMBER",e[e.ZENKAKU_1BYTE_SYMBOL=10]="ZENKAKU_1BYTE_SYMBOL",e[e.HANKAKU_1BYTE_SYMBOL=11]="HANKAKU_1BYTE_SYMBOL",e))(U||{});const G={0:/[ぁ-ん]/g,1:/[、。]/g,2:/[ー]/g,3:/[「」]/g,4:/[　]/g,5:/[ ]/g,6:/[Ａ-Ｚａ-ｚ]/g,7:/[A-Za-z]/g,8:/[０-９]/g,9:/[0-9]/g,10:/[！＂”＃＄％＆＇’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿｀“｛｜｝～]/g,11:/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g};function R({input:e,patterns:s=0}){const t=s instanceof RegExp?s:O(s),i=e.replace(t,"");return i.length===0?e:e.replace(new RegExp("["+i+"]","g"),"")}function O(e){const s=[],t=i=>{typeof i=="string"?s.push("["+i+"]"):i instanceof RegExp?s.push(i.source):s.push(G[i].source)};if(Array.isArray(e))for(const i of e)t(i);else t(e);return new RegExp(s.join("|"),"g")}function w(e){return e>=12353&&e<=12438||e>=12445&&e<=12446}function p(e){return e+96}const B={が:"ｶﾞ",ぎ:"ｷﾞ",ぐ:"ｸﾞ",げ:"ｹﾞ",ご:"ｺﾞ",ざ:"ｻﾞ",じ:"ｼﾞ",ず:"ｽﾞ",ぜ:"ｾﾞ",ぞ:"ｿﾞ",だ:"ﾀﾞ",ぢ:"ﾁﾞ",づ:"ﾂﾞ",で:"ﾃﾞ",ど:"ﾄﾞ",ば:"ﾊﾞ",び:"ﾋﾞ",ぶ:"ﾌﾞ",べ:"ﾍﾞ",ぼ:"ﾎﾞ",ぱ:"ﾊﾟ",ぴ:"ﾋﾟ",ぷ:"ﾌﾟ",ぺ:"ﾍﾟ",ぽ:"ﾎﾟ",ゔ:"ｳﾞ",あ:"ｱ",い:"ｲ",う:"ｳ",え:"ｴ",お:"ｵ",か:"ｶ",き:"ｷ",く:"ｸ",け:"ｹ",こ:"ｺ",さ:"ｻ",し:"ｼ",す:"ｽ",せ:"ｾ",そ:"ｿ",た:"ﾀ",ち:"ﾁ",つ:"ﾂ",て:"ﾃ",と:"ﾄ",な:"ﾅ",に:"ﾆ",ぬ:"ﾇ",ね:"ﾈ",の:"ﾉ",は:"ﾊ",ひ:"ﾋ",ふ:"ﾌ",へ:"ﾍ",ほ:"ﾎ",ま:"ﾏ",み:"ﾐ",む:"ﾑ",め:"ﾒ",も:"ﾓ",や:"ﾔ",ゆ:"ﾕ",よ:"ﾖ",ら:"ﾗ",り:"ﾘ",る:"ﾙ",れ:"ﾚ",ろ:"ﾛ",わ:"ﾜ",を:"ｦ",ん:"ﾝ",ぁ:"ｧ",ぃ:"ｨ",ぅ:"ｩ",ぇ:"ｪ",ぉ:"ｫ",っ:"ｯ",ゃ:"ｬ",ゅ:"ｭ",ょ:"ｮ","。":"｡","、":"､",ー:"ｰ","「":"｢","」":"｣","・":"･"},P={Ａ:"A",Ｂ:"B",Ｃ:"C",Ｄ:"D",Ｅ:"E",Ｆ:"F",Ｇ:"G",Ｈ:"H",Ｉ:"I",Ｊ:"J",Ｋ:"K",Ｌ:"L",Ｍ:"M",Ｎ:"N",Ｏ:"O",Ｐ:"P",Ｑ:"Q",Ｒ:"R",Ｓ:"S",Ｔ:"T",Ｕ:"U",Ｖ:"V",Ｗ:"W",Ｘ:"X",Ｙ:"Y",Ｚ:"Z",ａ:"a",ｂ:"b",ｃ:"c",ｄ:"d",ｅ:"e",ｆ:"f",ｇ:"g",ｈ:"h",ｉ:"i",ｊ:"j",ｋ:"k",ｌ:"l",ｍ:"m",ｎ:"n",ｏ:"o",ｐ:"p",ｑ:"q",ｒ:"r",ｓ:"s",ｔ:"t",ｕ:"u",ｖ:"v",ｗ:"w",ｘ:"x",ｙ:"y",ｚ:"z"},Z={"０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9"},Y={"　":" ","！":"!","＂":'"',"”":'"',"＃":"#","＄":"$","％":"%","＆":"&","＇":"'","’":"'","（":"(","）":")","＊":"*","＋":"+","，":",","－":"-","．":".","／":"/","：":":","；":";","＜":"<","＝":"=","＞":">","？":"?","＠":"@","［":"[","￥":"\\","］":"]","＾":"^","＿":"_","｀":"`","“":"`","｛":"{","｜":"|","｝":"}","～":"~"};var H=(e=>(e[e.Hiragana=0]="Hiragana",e[e.ZenkakuKatakana=1]="ZenkakuKatakana",e[e.HankakuKatakana=2]="HankakuKatakana",e))(H||{});function q(e,s){let t="";for(let i=0;i<s.length;i++){const f=s[i];if(e===0)t+=f;else if(e===1){const a=s.charCodeAt(i);w(a)?t+=String.fromCharCode(p(a)):t+=f}else e===2&&(typeof B[f]=="string"?t+=B[f]:typeof P[f]=="string"?t+=P[f]:typeof Z[f]=="string"?t+=Z[f]:typeof Y[f]=="string"?t+=Y[f]:t+=f)}return t}var b=(e=>(e[e.REALTIME=0]="REALTIME",e[e.ENTER=1]="ENTER",e))(b||{});function V(e,s,t={observeInterval:30,debug:!1,realtime:!0,enter:!1,clearOnInputEmpty:!1,captureablePatterns:U.HIRAGANA}){const i=O(t.captureablePatterns??U.HIRAGANA),f=typeof e=="string"?document.querySelector(e):e;if(!f)throw new Error("input element not found");let a=0;const g=!(t.realtime instanceof HTMLInputElement)&&!(t.enter instanceof HTMLInputElement);function K(){const n=t.realtime&&(t.realtime===!0||t.realtime instanceof HTMLInputElement&&t.realtime.checked),o=t.enter&&(t.enter===!0||t.enter instanceof HTMLInputElement&&t.enter.checked);a=n||!o?0:1}g&&K(),c("outputTimingIsStatic",{outputTimingIsStatic:g});const r=[],N=n=>{if(typeof n=="string"){const o=document.querySelectorAll(n);for(const v of o)r.push({element:v,type:H.Hiragana})}else n instanceof HTMLInputElement?r.push({element:n,type:H.Hiragana}):r.push({element:n.element,type:n.type??H.Hiragana})};if(Array.isArray(s))for(const n of s)N(n);else N(s);let u=!1,d="",k="",m="";const A=new Array(r.length).fill("");function x(){c("reset"),d="",k="",m="";for(let n=0;n<r.length;n++)A[n]=""}function I(){d=f.value,r.forEach(({element:n},o)=>{A[o]=n.value}),c("setup",f.value,{defaultString:d,activeOutputs:r})}let E;function z(){c("start",{timer:E}),!E&&(E=setInterval(()=>{g||K(),$()},t.observeInterval??30))}function S(){c("end",{timer:E}),E&&(clearInterval(E),E=void 0)}function $(){const n=f.value;if(c("observe",{observing:u,inputString:n,defaultString:d,currentString:k,outputValues:A}),n==="")return;const o=_(d,n);k!==o.diff&&(k=o.diff,u&&M(k))}function M(n){c("set",{defaultString:d,string:n,inputValue:m,outputValues:A});const o=R({input:n,patterns:i});o.length===n.length&&(m=o),r.forEach(({element:v,type:j},L)=>{const h=q(j,m);c("converted",{type:j,string:n,inputValue:m,after:h,before:A[L]}),a===0?v.value=A[L]+h:a===1&&(v.dataset.kana=A[L]=h)})}function D(){r.forEach(({element:n})=>{n.dataset.kana&&(n.value+=n.dataset.kana,n.removeAttribute("data-kana"))})}function c(n,...o){if(t.debug){if(o.length===0){console.info("debug",{message:n});return}console.info("debug",{message:n},...o)}}f.addEventListener("focus",()=>{c("focus"),I()}),f.addEventListener("blur",()=>{c("blur"),S()}),f.addEventListener("compositionstart",n=>{c("compositionstart",{e:n}),I(),z(),u=!0}),f.addEventListener("compositionend",n=>{c("compositionend",{e:n}),S(),M(m),x(),u=!1}),f.addEventListener("beforeinput",n=>{if(c("beforeinput",{observing:u,e:n}),!u&&!n.isComposing&&n.data){const o=n.data,v=R({input:o,patterns:i});o&&o===v&&(I(),M(o))}}),f.addEventListener("keyup",n=>{c("keyup",{observing:u,e:n}),n.code==="Enter"&&(t.clearOnInputEmpty&&f.value===""?(x(),M("")):a===1&&D())})}l.CaptureableCharacterType=U,l.KanaType=H,l.OutputTiming=b,l.setupObserver=V,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.js.map
