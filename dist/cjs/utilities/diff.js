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
 */Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function d(e,a){if(!e.length||!a.length)return{before:e,after:a,diff:a,same:"",gap:0};if(e===a)return{before:e,after:a,diff:"",same:e,gap:0};const c=e.split(""),o=a.split(""),h=Math.max(c.length,o.length),l=[],r=[];let t=0;for(let s=0;s<h;s++){const n=c[s];for(let f=s+t;f<h;f++,t++){const u=o[f];if(n===u){l.push(n);break}r.push(u)}}return{before:e,after:a,diff:r.join(""),same:l.join(""),gap:t}}exports.diff=d;
//# sourceMappingURL=diff.js.map
