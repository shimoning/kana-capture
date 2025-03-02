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
 */Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var N=(A=>(A[A.HIRAGANA=0]="HIRAGANA",A[A.KUTOUTEN=1]="KUTOUTEN",A[A.CHOUON=2]="CHOUON",A[A.KAGIKAKKO=3]="KAGIKAKKO",A[A.ZENKAKU_SPACE=4]="ZENKAKU_SPACE",A[A.HANKAKU_SPACE=5]="HANKAKU_SPACE",A[A.ZENKAKU_ALPHABET=6]="ZENKAKU_ALPHABET",A[A.HANKAKU_ALPHABET=7]="HANKAKU_ALPHABET",A[A.ZENKAKU_NUMBER=8]="ZENKAKU_NUMBER",A[A.HANKAKU_NUMBER=9]="HANKAKU_NUMBER",A[A.ZENKAKU_1BYTE_SYMBOL=10]="ZENKAKU_1BYTE_SYMBOL",A[A.HANKAKU_1BYTE_SYMBOL=11]="HANKAKU_1BYTE_SYMBOL",A))(N||{});const U={0:/[ぁ-ん]/g,1:/[、。]/g,2:/[ー]/g,3:/[「」]/g,4:/[　]/g,5:/[ ]/g,6:/[Ａ-Ｚａ-ｚ]/g,7:/[A-Za-z]/g,8:/[０-９]/g,9:/[0-9]/g,10:/[！＂”＃＄％＆＇’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿｀“｛｜｝～]/g,11:/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g};function _({input:A,patterns:E=0}){const g=E instanceof RegExp?E:o(E),K=A.replace(g,"");return K.length===0?A:A.replace(new RegExp("["+K+"]","g"),"")}function o(A){const E=[],g=K=>{typeof K=="string"?E.push("["+K+"]"):K instanceof RegExp?E.push(K.source):E.push(U[K].source)};if(Array.isArray(A))for(const K of A)g(K);else g(A);return new RegExp(E.join("|"),"g")}exports.CapturableCharacterMap=U;exports.CapturableCharacterType=N;exports.extractor=_;exports.generateCapturableRegExp=o;
//# sourceMappingURL=extractor.js.map
