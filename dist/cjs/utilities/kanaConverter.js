"use strict";/*!
 * MIT License
 *
 * Copyright (c) 2025 Shimoning, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const f=require("./isHiraganaCharCode.js"),c=require("./toKatakanaCharCode.js"),i=require("../maps/kana/hiragana2hankakuKatakana.js"),s=require("../maps/kana/alphabet.js"),k=require("../maps/kana/number.js"),u=require("../maps/kana/symbol.js");var l=(a=>(a[a.Hiragana=0]="Hiragana",a[a.ZenkakuKatakana=1]="ZenkakuKatakana",a[a.HankakuKatakana=2]="HankakuKatakana",a))(l||{});function g(a,n){let r="";for(let t=0;t<n.length;t++){const e=n[t];if(a===0)r+=e;else if(a===1){const o=n.charCodeAt(t);f.isHiraganaCharCode(o)?r+=String.fromCharCode(c.toKatakanaCharCode(o)):r+=e}else a===2&&(typeof i.katakanaMap[e]=="string"?r+=i.katakanaMap[e]:typeof s.alphabetMap[e]=="string"?r+=s.alphabetMap[e]:typeof k.numberMap[e]=="string"?r+=k.numberMap[e]:typeof u.symbolMap[e]=="string"?r+=u.symbolMap[e]:r+=e)}return r}exports.KanaType=l;exports.kanaConverter=g;
//# sourceMappingURL=kanaConverter.js.map
