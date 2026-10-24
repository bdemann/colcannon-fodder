const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/browserAll-VMSClpaX.js","assets/Geometry-IpHxCVTc.js","assets/rolldown-runtime-hePW80VL.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/init-CeGg-dAz.js","assets/webworkerAll-B3Hkad6o.js","assets/WebGPURenderer-LTLhAvoo.js","assets/WebGPURenderer-D1KgKO0_.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js","assets/BufferResource-VXlz2pxo.js","assets/WebGLRenderer-caqgVvmv.js","assets/WebGLRenderer-C1XjW2ra.js","assets/CanvasRenderer-CobwcNGA.js","assets/CanvasRenderer-bnA_Jfob.js"])))=>i.map(i=>d[i]);
import{$ as e,A as t,B as n,C as r,Ct as i,D as a,Dt as o,E as s,Et as c,F as l,G as u,H as d,I as f,J as p,K as m,L as h,M as g,N as _,O as v,P as y,Q as b,R as x,S,St as C,T as ee,Tt as te,U as w,V as ne,W as re,X as ie,Y as ae,Z as oe,_t as se,a as ce,at as le,bt as ue,ct as de,d as fe,dt as pe,et as me,f as T,ft as he,g as ge,gt as _e,h as ve,ht as ye,it as be,j as xe,k as Se,l as Ce,lt as E,m as we,mt as Te,nt as Ee,o as De,ot as Oe,p as ke,pt as Ae,q as D,r as je,rt as Me,s as Ne,st as Pe,t as O,ut as k,v as A,vt as Fe,w as j,wt as Ie,x as Le,xt as Re,yt as ze}from"./game-world-CJt24hSf.js";import{B as Be,C as Ve,D as He,F as Ue,G as We,M as Ge,N as Ke,O as qe,Q as Je,S as Ye,T as Xe,W as Ze,X as Qe,Z as $e,_ as et,at as tt,b as nt,c as rt,ct as it,f as at,m as ot,n as st,nt as ct,o as lt,ot as ut,p as dt,r as ft,rt as pt,s as mt,st as M,t as ht,tt as gt,w as _t,x as vt}from"./Geometry-IpHxCVTc.js";import{t as yt}from"./getPo2TextureFromSource-BZjp2c1c.js";import{t as bt}from"./canvasUtils-BVGwBBBn.js";import{a as xt,i as St,n as N,o as Ct,r as wt,s as Tt}from"./CanvasRenderer-bnA_Jfob.js";import{A as Et,D as Dt,a as Ot,i as kt,l as At,u as jt,w as Mt}from"./RenderTargetSystem-Dmqog6ll.js";var P={Get:`GET`,Head:`HEAD`,Options:`OPTIONS`,Trace:`TRACE`,Put:`PUT`,Delete:`DELETE`,Post:`POST`,Patch:`PATCH`,Connect:`CONNECT`};function Nt({min:e,max:t}){return e>t?{min:t,max:e}:{min:e,max:t}}function Pt({min:e,max:t}){let{min:n,max:r}=Nt({min:Math.floor(e),max:Math.floor(t)}),i=r-n+1,a=Math.ceil(Math.ceil(Math.log2(i))/8);if(a>65e3)throw RangeError(`Cannot create a random integer so large. ({min: ${n}, max: ${r}})`);let o=Math.floor(256**a/i)*i,s=new Uint8Array(a),c;do crypto.getRandomValues(s),c=s.reduce((e,t,n)=>e+t*256**n,0);while(c>=o);return n+c%i}var Ft=`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.split(``);function It(e=16){let t=``;for(let n=0;n<e;n++){let e=Pt({min:0,max:Ft.length-1});t+=Ft[e]}return t}async function Lt(e){let t=new ye;return setTimeout(async()=>{t.resolve(await e())}),t.promise}function Rt(e,t,n={}){return zt({currentRetry:0,maxRetries:e,callback:t,options:n})}function zt({currentRetry:e,maxRetries:t,callback:n,options:r={}}){try{let i=n({retryCount:e,isFirstExecution:e===0,isFirstRetry:e===1,isLastRetry:e===t});return i instanceof Promise?i.catch(async i=>{if(e>=t)throw ze(i,`Retry max reached`);return r.interval&&await Ae(r.interval),zt({currentRetry:e+1,maxRetries:t,callback:n,options:r})}):i}catch(i){if(e>=t)throw ze(i,`Retry max reached`);return r.interval?Ae(r.interval).then(()=>zt({currentRetry:e+1,maxRetries:t,callback:n,options:r})):zt({currentRetry:e+1,maxRetries:t,callback:n,options:r})}}function Bt(e){try{return JSON.parse(JSON.stringify(e))}catch(t){throw console.error(`Failed to JSON copy for:`,e),ze(t,`Failed JSON copy`)}}function Vt(e,{min:t,max:n}){return Math.min(Math.max(e,t),n)}function Ht(e,{digits:t}){if(t==null)return e;let n=10**t,r=e*n;return Number((Math.round(r)/n).toFixed(t))}function Ut({searchIn:e,searchFor:t,caseSensitive:n,includeLength:r}){let i=pe(he(t,{caseSensitive:n}),`g`),a=[],o=[];return e.replace(i,(...n)=>{let r=n[n.length-2];if(typeof r!=`number`)throw TypeError(`Match index "${r}" is not a number. Searching for "${t}" in "${e}".`);let i=n[0];if(typeof i!=`string`)throw TypeError(`regExpMatch should've been a string but was ${typeof i}!`);o.push({index:r,length:i.length}),a.push(r);let s=n[0];if(typeof s!=`string`)throw TypeError(`Original match when searching for "${t}" in "${e}" at index ${r} is not a string.`);return s}),r?o:a}function Wt(e,t,{caseSensitive:n}){let r=Ut({searchIn:e,searchFor:t,caseSensitive:n,includeLength:!0}),i=he(t,{caseSensitive:n});return e.split(i).reduce((t,n,i)=>{let a=r[i],o=t.concat(n);if(a){let t=e.slice(a.index,a.index+a.length);return o.concat(t)}return o},[])}function Gt({value:e,splitter:t}){return e.split(t)}var Kt=class{topMostConstructor;map=new Map;isDestroyed=!1;constructor(e){this.topMostConstructor=e}add(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`add`)}getInstances(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);return Oe(this.map,e,()=>new Set)}remove(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`remove`)}traverseConstructors(e,t,n){let r=t.constructor;if(r&&r!==Function&&r!==Object&&r!==this.topMostConstructor){if(n===`add`)Oe(this.map,r,()=>new Set).add(e);else{let t=this.map.get(r);t&&t.delete(e)}this.traverseConstructors(e,Object.getPrototypeOf(t),n)}}destroy(){this.isDestroyed||(d(this).isDestroyed=!0,this.map.clear(),delete this.map)}};function qt(t,n){let r=e(t).filter(([e,r])=>n(e,r,t));return me(r)}function Jt(e,t){return qt(e,e=>!t.includes(e))}function Yt(){return n()}var Xt=class e{alea;static fromSeed(t){return new e(new Zt(t))}static fromState(t){let n=new Zt(``);return n.importState(t),new e(n)}exportState(){return this.alea.exportState()}constructor(e){this.alea=e}next(){return this.alea.next()}clone(){return e.fromState(this.exportState())}},Zt=class{n=4022871197;s=[this.mash(` `),this.mash(` `),this.mash(` `),1];mash(e){let t=e.toString();for(let e=0;e<t.length;e++){this.n+=t.codePointAt(e);let n=.02519603282416938*this.n;this.n=n>>>0,n-=this.n,n*=this.n,this.n=n>>>0,n-=this.n,this.n+=n*4294967296}return(this.n>>>0)*23283064365386963e-26}constructor(e){this.s[0]-=this.mash(e),this.s[0]<0&&(this.s[0]+=1),this.s[1]-=this.mash(e),this.s[1]<0&&(this.s[1]+=1),this.s[2]-=this.mash(e),this.s[2]<0&&(this.s[2]+=1)}next(){let e=2091639*this.s[0]+this.s[3]*23283064365386963e-26;return this.s[0]=this.s[1],this.s[1]=this.s[2],this.s[2]=e-(this.s[3]=e|0)}importState(e){this.s=e}exportState(){return[...this.s]}};function Qt({value:e,wrapper:t}){return D({value:re({value:e,suffix:t}),prefix:t})}var $t=class extends o()(`promise-queue-update`){},en=class extends Me{queue=[];currentlyAwaiting=void 0;queueItemIds=new Set;get size(){return this.queue.length}add(e,t){let n={original:e,id:t,wrapper:new ye};return this.queue.push(n),t!=null&&this.queueItemIds.add(t),this.dispatch(new $t({detail:{queueSize:this.size,addedItem:n}})),this.triggerNextQueueItem(),n.wrapper.promise}hasItemById(e){return this.queueItemIds.has(e)}handleItemSettle({rejection:e,resolution:t}){let n=this.currentlyAwaiting;if(!n)throw Error(`Cannot handle queue item settle without a currently awaited queue item.`);return this.queue.splice(0,1),this.dispatch(new $t({detail:{queueSize:this.size,finishedItem:n}})),e?n.wrapper.reject(e):n.wrapper.resolve(t),n.id!=null&&this.queueItemIds.delete(n.id),this.currentlyAwaiting=void 0,this.triggerNextQueueItem(),n}triggerNextQueueItem(){if(this.currentlyAwaiting||!k.isLengthAtLeast(this.queue,1))return!1;let e=this.queue[0];return this.currentlyAwaiting=e,e.original().then(e=>{this.handleItemSettle({resolution:e})}).catch(e=>{this.handleItemSettle({rejection:e})}),!0}};function tn({checkValue:e,default:n,name:r}){return l(r)||f(r,(t,n)=>e(n)),(e=n)=>t(y.Unsafe({[h]:r,default:e}))}function nn(e){return k.isSymbol(e)?an(e):t(y.Const(e,{default:e}))}var rn=`ExactSymbol`;function an(e){return l(`ExactSymbol`)||f(rn,(e,t)=>t===e.symbol),_(rn,({schema:e})=>`Expected symbol ${e.symbol?.description?Qt({value:e.symbol.description,wrapper:`'`}):`<unnamed symbol>`}`),t(y.Unsafe({[h]:rn,symbol:e,default:e}))}function on(...e){let n={},r=e.map(e=>{let r=t(e);return Object.assign(n,r.default),r.$_schema});return t(y.Composite(r,{default:n}))}function F(e,n={}){x.ExactOptionalPropertyTypes=!0;let r=t(e).$_schema,i=n.alsoUndefined?y.Union([y.Undefined(),r]):r;return t(y.Optional(i))}function I(...e){let n,r=e.map((e,r)=>{let i=t(e);return r||(n=i.default),i.$_schema});return t(y.Union(r,{default:n}))}var sn=`recordShape`;function cn({keys:e,values:n,partial:r,additionalProperties:i}){ln();let a=fn(e),o=t(n);return t(y.Unsafe({[h]:sn,keysShape:a,valuesShape:o,isPartial:!!r,additionalProperties:!!i,default:dn({isPartial:!!r,keysShape:a,valuesShape:o})}))}function ln(){l(`recordShape`)||f(sn,(e,t)=>{if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=Object.entries(t).every(([t,n])=>{let r=e.additionalProperties||v(t,e.keysShape),i=v(n,e.valuesShape);return r&&i}),r=e.isPartial||!un(e.keysShape,t).length;return n&&r}),_(sn,e=>{let t=e.schema,n=e.value;if(typeof n!=`object`||!n||Array.isArray(n))return`Expected an object`;let r=Ie(Object.entries(n),([e])=>e,(e,[n,r])=>!v(n,t.keysShape)||!v(r,t.valuesShape)),i=un(t.keysShape,n);return[r.length?[`Failure at keys`,r.join(`,`)].join(`: `):``,i.length?[`Missing keys`,i.join(`,`)].join(`: `):``].filter(k.isTruthy).join(`
`)})}function un(e,t){let n=pn(e).filter(e=>k.isPropertyKey(e));return n.length?n.filter(e=>!k.hasKey(t,e)):[]}function dn({keysShape:e,valuesShape:t,isPartial:n}){if(n)return{};{let n=pn(e),r=t.default;return Object.fromEntries(n.map(e=>[e,r]))}}function fn(e){return g(e)?e:xe(e)?t(e):k.isObject(e)?Se(e):k.isArray(e)&&k.isLengthAtLeast(e,1)?I(...e.map(e=>nn(e))):k.isPropertyKey(e)?t(e):t(y.Undefined())}function pn(e){let n=e.$_schema,r=n[h].toLowerCase();return[`const`,`literal`].includes(r)?[n.const]:r===`union`?i(n.anyOf.flatMap(e=>pn(t(e)))):[`undefined`,`number`,`string`,`symbol`].includes(r)?[]:pn(fn(e.default))}function mn(...e){let n=[],r=[];return e.forEach(e=>{let i=t(e);n.push(i.default),r.push(i.$_schema)}),t(y.Tuple(r,{default:n}))}var hn=Le(class extends S{constructor(){super(...arguments),this.key=j}render(e,t){return this.key=e,t}update(e,[t,n]){return t!==this.key&&(r(e),this.key=t),n}}),gn=`onDomCreated`,_n=Le(class extends S{element;constructor(e){super(e),ve(e,gn)}update(e,[t]){ve(e,gn);let n=e.element;return n!==this.element&&(window.requestAnimationFrame(()=>t(n)),this.element=n),this.render(t)}render(e){}});function vn(e){return A`
        color: ${e.foreground.value};
        background-color: ${e.background.value};
    `}var yn=`://`;function bn(...e){let t=e.join(`/`),n=t.indexOf(yn),[r,i]=n===-1?[``,t]:[t.slice(0,n),t.slice(n+3)],a=!1,o=i.replace(/\/{2,}/g,`/`).split(`/`).reduce((e,t,n,r)=>{if(a)return e;let i=r[n+1],o=t,s=i?.startsWith(`?`),c=!t.includes(`?`)&&s,l=i===`?`;if(s||c){a=!0;let e=!1,s=r.slice(n+2).reduce((t,n)=>(n.includes(`#`)&&(e=!0),e?t.concat(n):[t,n].join(`&`)),``);o=[t,i,l?p({value:s,prefix:`&`}):s].join(``)}return e.concat(o)},[]);return[r,r?yn:``,o.join(`/`)].join(``)}var xn;(function(e){e.Encode=`encode`,e.Decode=`decode`,e.None=`none`})(xn||={});var Sn;(function(e){e.Clear=`clear`,e.Replace=`replace`,e.Append=`append`})(Sn||={});var Cn=t({encoding:F(I(void 0,Se(xn))),searchParamStrategy:F(I(void 0,Se(Sn)))});function wn(e,t){return e.map(e=>{if(e!=null)return Tn(String(e),t)}).filter(e=>e!=null)}function Tn(e,t){return t?.encoding===xn.Decode?decodeURIComponent(e):t?.encoding===xn.Encode?encodeURIComponent(e):e}t(cn({keys:``,values:[``]}));function En(e,t,n){let r=n?.searchParamStrategy===Sn.Clear?{}:ne(e,(e,t)=>oe(t)),i=ne(t,(e,t)=>{if(n?.searchParamStrategy===Sn.Append){let i=r[e],a=k.isArray(i)?i:[i];if(t){let e=k.isArray(t)?t:[t];return wn([...a,...e],n)}return wn(a,n)}if(k.isArray(t))return wn(t,n);if(t)return wn([t],n)});return qt({...r,...i},(e,t)=>!!t)}function Dn(e,t){if(k.isString(e)&&!e.includes(`?`))return{};let n=k.isString(e)?e:e instanceof URLSearchParams?e.toString():e.search,r=n.indexOf(`#`);return{...(r===-1?n:n.slice(0,r)).replace(/^[^?]*\?/,``).split(`&`).filter(e=>e!==``).map(e=>{let[t,...n]=Gt({value:e,splitter:`=`});return[t,n.length?n.join(`=`):void 0]}).reduce((e,[n,r])=>{let i=An({options:t,key:n,value:r}),a=le(e,i.key,()=>[]);return r!=null&&a.push(i.value),e},Object.create(null))}}function On(e){if(e!=null)return k.isArray(e)?[...e]:e===``?[]:[e]}function kn(e,t){let n=Ie(Object.entries(e),([e,n])=>{let r=On(n);return r?.length?r.map(n=>{let r=An({options:t,key:e,value:n});return[r.key,r.value].join(`=`)}):[e]},(e,[,t])=>t!=null).flat();return n.length?D({value:n.join(`&`),prefix:`?`}):``}function An({options:e,key:t,value:n}){return{key:Tn(t,e),value:Tn(String(n),e)}}var jn=[`ftp`,`file`,`http`,`https`,`ws`,`wss`];function Mn({hash:e,hostname:t,password:n,pathname:r,port:i,protocol:a,search:o,username:s}){return[a?a+`://`:``,s?encodeURIComponent(s)+`:`:``,n?encodeURIComponent(n)+`@`:``,Fn({hostname:t,port:i}),Pn({hash:e,pathname:r,search:o})].join(``)}function Nn({pathname:e}){let t=p({value:e,prefix:`/`});return t?t.split(`/`):[]}function Pn({hash:e,pathname:t,search:n}){return[D({value:t,prefix:`/`}),n?D({value:n,prefix:`?`}):``,e?D({value:e,prefix:`#`}):``].join(``)}function Fn({hostname:e,port:t}){return[e,t?`:`+t:``].join(``)}function In({hostname:e}){return e?e.split(`.`):[]}function Ln({hostname:e,port:t,protocol:n}){return[n,Fn({hostname:e,port:t})].filter(k.isTruthy).join(`://`)}function Rn(e,t){let n=k.isString(e)?p({value:e,prefix:`.`}):e.toString(),r=n.replace(/^[^#]*(?:#|$)/,``),i=r?D({value:Tn(r,t),prefix:`#`}):``,a=n.indexOf(`#`),o=a===-1?n:n.slice(0,a),s=o.replace(/^[^?]*(?:\?|$)/,``),c=s?D({value:Tn(s,t),prefix:`?`}):``,l=o.indexOf(`?`),u=l===-1?o:o.slice(0,l),d=u.includes(`://`)?u.replace(/:\/\/.*$/,``):``,f=(jn.includes(d.toLowerCase())?u.replace(/\\/g,`/`):u).replace(/^.*?:\/\//,``).replace(/\/{2,}/g,`/`),m=f.length-f.replace(/^\/*/,``).length,h=f.slice(m).replace(/\/.*/,``).lastIndexOf(`@`),g=h!==-1,_=g?f.slice(0,m+h):``,v=g?f.slice(m+h+1):f,[y,...b]=g?_.split(`:`).reverse():[],x=decodeURIComponent(b.toReversed().join(``).replace(/[/:]/g,``)||``),S=decodeURIComponent(y?.replace(/[/:]/g,``)||``),C=v.replace(/\/.*/,``),ee=Wt(C,`:`,{caseSensitive:!0}).toReversed(),te=!ee[0]?.endsWith(`]`)&&ee[1]===`:`,w=te&&ee[0]||``,ne=te?C.slice(0,C.length-w.length-1):C,re=ne.endsWith(`]`)?void 0:ne.match(/^(?<host>.*):(?<port>\d+)$/),ie=re?.groups?.host??ne,ae=In({hostname:ie}),oe=re?.groups?.port??w,se=Tn(v.replace(/^[^/]*(\/|$)/,`$1`).replace(/^[^/]*(?:\/|$)/,`/`),t),ce=Fn({hostname:ie,port:oe}),le=Ln({hostname:ie,port:oe,protocol:d}),ue=Mn({hash:i,hostname:ie,password:S,pathname:se,port:oe,protocol:d,search:c,username:x}),de=Dn(c),fe=Nn({pathname:se});return{fullPath:Pn({hash:i,pathname:se,search:c}),hash:i,host:ce,hostname:ie,domains:ae,href:ue,origin:le,password:S,pathname:se,paths:fe,port:oe,protocol:d,search:c,searchParams:de,username:x}}t({hash:F(I(void 0,``)),search:F(I(void 0,``,cn({keys:``,values:I(null,void 0,``,-1,!1,0n,[null,void 0,``,-1,!1,0n])}))),hostname:F(I(void 0,``)),domains:F(I(void 0,[``])),pathname:F(I(void 0,``)),paths:F(I(void 0,[``])),protocol:F(I(void 0,``)),username:F(I(void 0,``)),password:F(I(void 0,``)),port:F(I(void 0,``,-1))});function zn(e,t,n){let r=!!n,i=t==null||v(t,Cn,{allowExtraKeys:!1}),a=i?Rn(``):k.instanceOf(e,URL)||k.isString(e)?Rn(e):e,o=i?e:t,s=k.isString(o)&&o.startsWith(`.`),c=k.isString(o)||k.instanceOf(o,URL)?qt(Rn(o),(e,t)=>k.isTruthy(t)&&(e!==`domains`||k.isArray(t)&&t.length!==0)):o,l=r?n:i?t:void 0,u=ne(a,(e,t)=>{if(!k.hasKey(c,e))return t;let n=c[e];return k.isArray(n)?n:k.isNumber(n)?String(n):k.isString(n)?e===`hash`&&n?D({value:n,prefix:`#`}):e===`pathname`?D({value:n,prefix:`/`}):n:t});k.hasKey(c,`domains`)&&k.isArray(c.domains)&&(u.hostname=c.domains.join(`.`)),u.domains=In(u),k.hasKey(c,`paths`)&&c.paths&&(u.pathname=bn(s?a.pathname:``,...c.paths));let d=k.isString(c.search)?Dn(D({value:c.search,prefix:`?`})):Bt(c.search||{}),f=En(u.searchParams,d,{...l,encoding:xn.None}),p=kn(f,l);return{...u,searchParams:f,search:p,paths:Nn(u),fullPath:Pn(u),host:Fn(u),origin:Ln(u),href:Mn({...u,search:p})}}var Bn=class{constructor(e=0,t=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=n,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){let t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++){let r=e[n];t[n]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){let e=this.first;delete this.items[e.key],--this.size===0?(this.first=null,this.last=null):(this.first=e.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){let t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){let e=Array(this.size),t=this.first,n=0;for(;t!==null;)e[n++]=t.key,t=t.next;return e}setWithEvicted(e,t,n=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,n);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let n=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=n:this.last.next=n,this.last=n}return r}set(e,t,n=!1,r=this.resetTtl){let i=this.items[e];return n||i!==void 0?(i.value=t,n===!1&&r&&(i.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(i)):(this.max>0&&this.size===this.max&&this.evict(!0),i=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=i:this.last.next=i,this.last=i),this}values(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++)t[n]=this.get(e[n]);return t}};function Vn(e=1e3,t=0,n=!1){if(isNaN(e)||e<0)throw TypeError(`Invalid max value`);if(isNaN(t)||t<0)throw TypeError(`Invalid ttl value`);if(typeof n!=`boolean`)throw TypeError(`Invalid resetTtl value`);return new Bn(e,t,n)}function Hn(e){return!!e.tagStyles&&Object.keys(e.tagStyles).length>0}function Un(e){return e.includes(`<`)}function Wn(e,t){return e.clone().assign(t)}function Gn(e,t){let n=[],r=t.tagStyles;if(!Hn(t)||!Un(e))return n.push({text:e,style:t}),n;let i=[t],a=[],o=``,s=0;for(;s<e.length;){let t=e[s];if(t===`<`){let c=e.indexOf(`>`,s);if(c===-1){o+=t,s++;continue}let l=e.indexOf(`<`,s+1);if(l!==-1&&l<c){o+=t,s++;continue}let u=e.slice(s+1,c);if(u.startsWith(`/`)){let t=u.slice(1).trim();if(a.length>0&&a[a.length-1]===t){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``),i.pop(),a.pop(),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}{let t=u.trim();if(r[t]){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``);let e=i[i.length-1],l=Wn(e,r[t]);i.push(l),a.push(t),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}}o+=t,s++}return o.length>0&&n.push({text:o,style:i[i.length-1]}),n}var Kn=new Set([10,13]),qn=new Set([9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288]),Jn=new Set([45,8208,8211,8212,173]),Yn=/(\r\n|\r|\n)/,Xn=/(?:\r\n|\r|\n)/;function Zn(e){return typeof e==`string`&&Kn.has(e.charCodeAt(0))}function Qn(e,t){return typeof e==`string`&&qn.has(e.charCodeAt(0))}function $n(e){return typeof e==`string`&&Jn.has(e.charCodeAt(0))}function er(e){return e===`normal`||e===`pre-line`}function tr(e){return e===`normal`}function nr(e){if(typeof e!=`string`)return``;let t=e.length-1;for(;t>=0&&Qn(e[t]);)t--;return t<e.length-1?e.slice(0,t+1):e}function rr(e){let t=[],n=[];if(typeof e!=`string`)return t;for(let r=0;r<e.length;r++){let i=e[r],a=e[r+1];if(Qn(i,a)||Zn(i)){n.length>0&&(t.push(n.join(``)),n.length=0),i===`\r`&&a===`
`?(t.push(`\r
`),r++):t.push(i);continue}n.push(i),$n(i)&&a&&!Qn(a)&&!Zn(a)&&(t.push(n.join(``)),n.length=0)}return n.length>0&&t.push(n.join(``)),t}function ir(e,t,n,r){let i=n(e),a=[];for(let n=0;n<i.length;n++){let o=i[n],s=o,c=1;for(;i[n+c];){let a=i[n+c];if(!r(s,a,e,n,t))o+=a,s=a,c++;else break}n+=c-1,a.push(o)}return a}var ar=/\r\n|\r|\n/g;function or(e,t,n,r,i,a,o,s,c){let l=Gn(e,t);if(tr(t.whiteSpace))for(let e=0;e<l.length;e++){let t=l[e];l[e]={text:t.text.replace(ar,` `),style:t.style}}let u=[],d=[];for(let e of l){let t=e.text.split(Yn);for(let n=0;n<t.length;n++){let r=t[n];r===`\r
`||r===`\r`||r===`
`?(u.push(d),d=[]):r.length>0&&d.push({text:r,style:e.style})}}(d.length>0||u.length===0)&&u.push(d);let f=n?sr(u,t,r,a,s,c):u,p=[],m=[],h=[],g=[],_=[],v=0,y=t._fontString,b=o(y);b.fontSize===0&&(b.fontSize=t.fontSize,b.ascent=t.fontSize);let x=``,S=!!t.dropShadow,C=t._stroke?.width||0;for(let e of f){let n=0,a=b.ascent,s=b.descent,c=``;for(let t of e){let e=t.style._fontString,l=o(e);e!==x&&(r.font=e,x=e);let u=i(t.text,t.style.letterSpacing,r);n+=u,a=Math.max(a,l.ascent),s=Math.max(s,l.descent),c+=t.text;let d=t.style._stroke?.width||0;d>C&&(C=d),!S&&t.style.dropShadow&&(S=!0)}e.length===0&&(a=b.ascent,s=b.descent),p.push(n),m.push(a),h.push(s),_.push(c);let l=t.lineHeight||a+s;g.push(l+t.leading),v=Math.max(v,n)}let ee=C,te=v+ee+(t.dropShadow?t.dropShadow.distance:0),w=0;for(let e=0;e<g.length;e++)w+=g[e];return w=Math.max(w,g[0]+ee),{width:te,height:w+(t.dropShadow?t.dropShadow.distance:0),lines:_,lineWidths:p,lineHeight:(t.lineHeight||b.fontSize)+t.leading,maxLineWidth:v,fontProperties:b,runsByLine:f,lineAscents:m,lineDescents:h,lineHeights:g,hasDropShadow:S}}function sr(e,t,n,r,i,a){let{letterSpacing:o,whiteSpace:s,wordWrapWidth:c,breakWords:l}=t,u=er(s),d=c+o,f={},p=``,m=(e,t)=>{let i=`${e}|${t.styleKey}`,a=f[i];if(a===void 0){let o=t._fontString;o!==p&&(n.font=o,p=o),a=r(e,t.letterSpacing,n)+t.letterSpacing,f[i]=a}return a},h=[];for(let t of e){let e=cr(t),n=h.length,r=t=>{let n=0,r=t;do{let{token:t,style:i}=e[r];n+=m(t,i),r++}while(r<e.length&&e[r].continuesFromPrevious);return n},o=t=>{let n=[],r=t;do n.push({token:e[r].token,style:e[r].style}),r++;while(r<e.length&&e[r].continuesFromPrevious);return n},s=[],c=0,f=!u,p=null,g=()=>{p&&p.text.length>0&&s.push(p),p=null},_=()=>{if(g(),s.length>0){let e=s[s.length-1];e.text=nr(e.text),e.text.length===0&&s.pop()}h.push(s),s=[],c=0,f=!1};for(let t=0;t<e.length;t++){let{token:n,style:v,continuesFromPrevious:y}=e[t],b=m(n,v);if(u){let e=Qn(n),t=p?.text[p.text.length-1]??s[s.length-1]?.text.slice(-1)??``,r=t?Qn(t):!1;if(e&&r)continue}let x=!y,S=x?r(t):b;if(S>d&&x){if(c>0&&_(),l){let e=o(t);for(let t=0;t<e.length;t++){let n=e[t].token,r=e[t].style,o=ir(n,l,a,i);for(let e of o){let t=m(e,r);t+c>d&&_(),!p||p.style!==r?(g(),p={text:e,style:r}):p.text+=e,c+=t}}t+=e.length-1}else{let e=o(t);g(),h.push(e.map(e=>({text:e.token,style:e.style}))),f=!1,t+=e.length-1}}else if(S+c>d&&x){if(Qn(n)){f=!1;continue}_(),p={text:n,style:v},c=b}else if(y&&!l)!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b;else{let e=Qn(n);if(c===0&&e&&!f)continue;!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b}}if(g(),s.length>0){let e=s[s.length-1];e.text=nr(e.text),e.text.length===0&&s.pop()}(s.length>0||h.length===n)&&h.push(s)}return h}function cr(e){let t=[],n=!1;for(let r of e){let e=rr(r.text),i=!0;for(let a of e){let e=Qn(a)||Zn(a),o=i&&n&&!e;t.push({token:a,style:r.style,continuesFromPrevious:o}),n=!e,i=!1}}return t}var lr={willReadFrequently:!0};function ur(e,t,n,r,i){let a=n[e];return typeof a!=`number`&&(a=i(e,t,r)+t,n[e]=a),a}function dr(e,t,n,r,i,a,o){let s=n.getContext(`2d`,lr);s.font=t._fontString;let c=0,l=``,u=[],d=Object.create(null),{letterSpacing:f,whiteSpace:p}=t,m=er(p),h=tr(p),g=!m,_=t.wordWrapWidth+f,v=rr(e);for(let e=0;e<v.length;e++){let n=v[e];if(Zn(n)){if(!h){u.push(nr(l)),g=!m,l=``,c=0;continue}n=` `}if(m){let e=Qn(n),t=Qn(l[l.length-1]);if(e&&t)continue}let p=ur(n,f,d,s,r);if(p>_){if(l!==``&&(u.push(nr(l)),l=``,c=0),i(n,t.breakWords)){let e=ir(n,t.breakWords,o,a);for(let t of e){let e=ur(t,f,d,s,r);e+c>_&&(u.push(nr(l)),g=!1,l=``,c=0),l+=t,c+=e}}else l.length>0&&(u.push(nr(l)),l=``,c=0),u.push(nr(n)),g=!1,l=``,c=0}else p+c>_&&(g=!1,u.push(nr(l)),l=``,c=0),(l.length>0||!Qn(n)||g)&&(l+=n,c+=p)}let y=nr(l);return y.length>0&&u.push(y),u.join(`
`)}var fr={willReadFrequently:!0},pr=class e{static get experimentalLetterSpacingSupported(){let t=e._experimentalLetterSpacingSupported;if(t===void 0){let n=vt.get().getCanvasRenderingContext2D().prototype;t=e._experimentalLetterSpacingSupported=`letterSpacing`in n||`textLetterSpacing`in n}return t}constructor(e,t,n,r,i,a,o,s,c,l){this.text=e,this.style=t,this.width=n,this.height=r,this.lines=i,this.lineWidths=a,this.lineHeight=o,this.maxLineWidth=s,this.fontProperties=c,l&&(this.runsByLine=l.runsByLine,this.lineAscents=l.lineAscents,this.lineDescents=l.lineDescents,this.lineHeights=l.lineHeights,this.hasDropShadow=l.hasDropShadow)}static measureText(t=` `,n,r=e._canvas,i=n.wordWrap){let a=`${t}-${n.styleKey}-wordWrap-${i}`;if(e._measurementCache.has(a))return e._measurementCache.get(a);if(Hn(n)&&Un(t)){let r=or(t,n,i,e._context,e._measureText,e._measureTextAdvance,e.measureFont,e.canBreakChars,e.wordWrapSplit),o=new e(t,n,r.width,r.height,r.lines,r.lineWidths,r.lineHeight,r.maxLineWidth,r.fontProperties,{runsByLine:r.runsByLine,lineAscents:r.lineAscents,lineDescents:r.lineDescents,lineHeights:r.lineHeights,hasDropShadow:r.hasDropShadow});return e._measurementCache.set(a,o),o}let o=n._fontString,s=e.measureFont(o);s.fontSize===0&&(s.fontSize=n.fontSize,s.ascent=n.fontSize,s.descent=0);let c=e._context;c.font=o;let l=(i?e._wordWrap(t,n,r):t).split(Xn),u=Array(l.length),d=0;for(let t=0;t<l.length;t++){let r=e._measureText(l[t],n.letterSpacing,c);u[t]=r,d=Math.max(d,r)}let f=n._stroke?.width??0,p=n.lineHeight||s.fontSize,m=e._adjustWidthForStyle(d,n),h=Math.max(p,s.fontSize+f)+(l.length-1)*(p+n.leading),g=e._adjustHeightForStyle(h,n),_=new e(t,n,m,g,l,u,p+n.leading,d,s);return e._measurementCache.set(a,_),_}static _adjustWidthForStyle(e,t){let n=e+(t._stroke?.width||0);return t.dropShadow&&(n+=t.dropShadow.distance),n}static _adjustHeightForStyle(e,t){let n=e;return t.dropShadow&&(n+=t.dropShadow.distance),n}static _measureText(t,n,r){let{metricWidth:i,metrics:a,letterSpacingVal:o}=e._measureTextCore(t,n,r),s=-(a.actualBoundingBoxLeft??0),c=(a.actualBoundingBoxRight??0)-s;return a.width>0&&(c+=o),Math.max(i,c)}static _measureTextAdvance(t,n,r){return e._measureTextCore(t,n,r).metricWidth}static _measureTextCore(t,n,r){let i=!1;e.experimentalLetterSpacingSupported&&(e.experimentalLetterSpacing?(r.letterSpacing=`${n}px`,r.textLetterSpacing=`${n}px`,i=!0):(r.letterSpacing=`0px`,r.textLetterSpacing=`0px`));let a=r.measureText(t),o=a.width,s=0;return o>0&&(s=i?-n:(e.graphemeSegmenter(t).length-1)*n,o+=s),{metricWidth:o,metrics:a,letterSpacingVal:s}}static _wordWrap(t,n,r=e._canvas){return dr(t,n,r,e._measureTextAdvance,e.canBreakWords,e.canBreakChars,e.wordWrapSplit)}static isBreakingSpace(e,t){return Qn(e,t)}static canBreakWords(e,t){return t}static canBreakChars(e,t,n,r,i){return!0}static wordWrapSplit(t){return e.graphemeSegmenter(t)}static measureFont(t){if(e._fonts[t])return e._fonts[t];let n=e._context;n.font=t;let r=n.measureText(e.METRICS_STRING+e.BASELINE_SYMBOL),i=r.actualBoundingBoxAscent??0,a=r.actualBoundingBoxDescent??0,o={ascent:i,descent:a,fontSize:i+a};return e._fonts[t]=o,o}static clearMetrics(t=``){t?delete e._fonts[t]:e._fonts={}}static get _canvas(){if(!e.__canvas){let t;try{let n=new OffscreenCanvas(0,0);if(n.getContext(`2d`,fr)?.measureText)return e.__canvas=n,n;t=vt.get().createCanvas()}catch{t=vt.get().createCanvas()}t.width=t.height=10,e.__canvas=t}return e.__canvas}static get _context(){return e.__context||=e._canvas.getContext(`2d`,fr),e.__context}};pr.METRICS_STRING=`|ÉqÅ`,pr.BASELINE_SYMBOL=`M`,pr.BASELINE_MULTIPLIER=1.4,pr.HEIGHT_MULTIPLIER=2,pr.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter==`function`){let e=new Intl.Segmenter;return t=>{let n=e.segment(t),r=[],i=0;for(let e of n)r[i++]=e.segment;return r}}return e=>[...e]})(),pr.experimentalLetterSpacing=!1,pr._fonts={},pr._measurementCache=Vn(1e3);var mr=pr,hr=[`serif`,`sans-serif`,`monospace`,`cursive`,`fantasy`,`system-ui`];function gr(e){let t=typeof e.fontSize==`number`?`${e.fontSize}px`:e.fontSize,n=e.fontFamily;Array.isArray(e.fontFamily)||(n=e.fontFamily.split(`,`));for(let e=n.length-1;e>=0;e--){let t=n[e].trim();!/([\"\'])[^\'\"]+\1/.test(t)&&!hr.includes(t)&&(t=`"${t}"`),n[e]=t}return`${e.fontStyle} ${e.fontVariant} ${e.fontWeight} ${t} ${n.join(`,`)}`}var _r=class e extends ut{constructor(t={}){super(),this.uid=gt(`textStyle`),this._tick=0,this._cachedFontString=null,yr(t),t instanceof e&&(t=t._toObject());let n={...e.defaultTextStyle,...t};for(let e in n){let t=e;this[t]=n[e]}this._tagStyles=t.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow!==t&&(this._dropShadow=typeof t==`object`&&t?this._createProxy({...e.defaultDropShadow,...t}):t?this._createProxy({...e.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(this._fontSize=typeof e==`string`?parseInt(e,10):e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...wt.defaultFillStyle,...e},()=>{this._fill=St({...this._originalFill},wt.defaultFillStyle)})),this._fill=St(e===0?`black`:e,wt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...wt.defaultStrokeStyle,...e},()=>{this._stroke=xt({...this._originalStroke},wt.defaultStrokeStyle)})),this._stroke=xt(e,wt.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit(`update`,this)}reset(){let t=e.defaultTextStyle;for(let e in t)this[e]=t[e]}assign(e){for(let t in e){let n=t;this[n]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=gr(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new e(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(t),this._originalFill?.texture&&this._originalFill.texture.destroy(t),this._stroke?.texture&&this._stroke.texture.destroy(t),this._originalStroke?.texture&&this._originalStroke.texture.destroy(t)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(e,n,r)=>e[n]===r||(e[n]=r,t?.(n,r),this.update(),!0)})}_isFillStyle(e){return(e??null)!==null&&!(tt.isColorLike(e)||e instanceof Tt||e instanceof Ct)}};_r.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:`black`,distance:5},_r.defaultTextStyle={align:`left`,breakWords:!1,dropShadow:null,fill:`black`,fontFamily:`Arial`,fontSize:26,fontStyle:`normal`,fontVariant:`normal`,fontWeight:`normal`,leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:`alphabetic`,trim:!1,whiteSpace:`pre`,wordWrap:!1,wordWrapWidth:100};var vr=_r;function yr(e){let t=e;if(typeof t.dropShadow==`boolean`&&t.dropShadow){let n=vr.defaultDropShadow;e.dropShadow={alpha:t.dropShadowAlpha??n.alpha,angle:t.dropShadowAngle??n.angle,blur:t.dropShadowBlur??n.blur,color:t.dropShadowColor??n.color,distance:t.dropShadowDistance??n.distance}}if(t.strokeThickness!==void 0){$e(Je,`strokeThickness is now a part of stroke`);let n=t.stroke,r={};if(tt.isColorLike(n))r.color=n;else if(n instanceof Tt||n instanceof Ct)r.fill=n;else if(Object.hasOwnProperty.call(n,`color`)||Object.hasOwnProperty.call(n,`fill`))r=n;else throw Error(`Invalid stroke value.`);e.stroke={...r,width:t.strokeThickness}}if(Array.isArray(t.fillGradientStops)){if($e(Je,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(t.fill)||t.fill.length===0)throw Error(`Invalid fill value. Expected an array of colors for gradient fill.`);t.fill.length!==t.fillGradientStops.length&&Qe(`The number of fill colors must match the number of fill gradient stops.`);let n=new Tt({start:{x:0,y:0},end:{x:0,y:1},textureSpace:`local`}),r=t.fillGradientStops.slice(),i=t.fill.map(e=>tt.shared.setValue(e).toNumber());r.forEach((e,t)=>{n.addColorStop(e,i[t])}),e.fill={fill:n}}}var br=1e5;function xr(e,t,n,r=0,i=0,a=0){if(e.texture===qe.WHITE&&!e.fill)return tt.shared.setValue(e.color).setAlpha(e.alpha??1).toHexa();if(!e.fill){let n=t.createPattern(e.texture.source.resource,`repeat`),r=e.matrix.copyTo(pt.shared);return r.scale(e.texture.source.pixelWidth,e.texture.source.pixelHeight),n.setTransform(r),n}if(e.fill instanceof Ct){let n=e.fill,r=t.createPattern(n.texture.source.resource,`repeat`);return bt.applyPatternTransform(r,n.transform,!1),r}if(e.fill instanceof Tt){let o=e.fill,s=o.type===`linear`,c=o.textureSpace===`local`,l=1,u=1;c&&n&&(l=n.width+r,u=n.height+r);let d,f=!1;if(s){let{start:e,end:n}=o;d=t.createLinearGradient(e.x*l+i,e.y*u+a,n.x*l+i,n.y*u+a),f=Math.abs(n.x-e.x)<Math.abs((n.y-e.y)*.1)}else{let{center:e,innerRadius:n,outerCenter:r,outerRadius:s}=o;d=t.createRadialGradient(e.x*l+i,e.y*u+a,n*l,r.x*l+i,r.y*u+a,s*l)}if(f&&c&&n){let e=n.lineHeight/u;for(let t=0;t<n.lines.length;t++){let i=(t*n.lineHeight+r/2)/u;o.colorStops.forEach(t=>{let n=i+t.offset*e;n=Math.max(0,Math.min(1,n)),d.addColorStop(Math.floor(n*br)/br,tt.shared.setValue(t.color).toHex())})}}else o.colorStops.forEach(e=>{d.addColorStop(e.offset,tt.shared.setValue(e.color).toHex())});return d}return Qe(`FillStyle not recognised`,e),`red`}function Sr(){let e=new Audio,t=!!e.canPlayType(`audio/mpeg;`),n=globalThis.navigator.userAgent,r=n.match(/OPR\/(\d+)/g),i=r?.[0].split(`/`)[1],a=r&&i?parseInt(i)<33:!1,o=n.includes(`Safari`)&&!n.includes(`Chrome`),s=n.match(/Version\/(.*?) /)?.[1],c=o&&s?parseInt(s,10)<15:!1;return{mp3:!(a||!t&&!e.canPlayType(`audio/mp3;`)),mpeg:t,opus:!!e.canPlayType(`audio/ogg; codecs="opus"`),ogg:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),oga:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),wav:!!(e.canPlayType(`audio/wav; codecs="1"`)||e.canPlayType(`audio/wav`)),aac:!!e.canPlayType(`audio/aac;`),caf:!!e.canPlayType(`audio/x-caf;`),m4a:!!(e.canPlayType(`audio/x-m4a;`)||e.canPlayType(`audio/m4a;`)||e.canPlayType(`audio/aac;`)),m4b:!!(e.canPlayType(`audio/x-m4b;`)||e.canPlayType(`audio/m4b;`)||e.canPlayType(`audio/aac;`)),mp4:!!(e.canPlayType(`audio/x-mp4;`)||e.canPlayType(`audio/mp4;`)||e.canPlayType(`audio/aac;`)),weba:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),webm:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),dolby:!!e.canPlayType(`audio/mp4; codecs="ec-3"`),flac:!!(e.canPlayType(`audio/x-flac;`)||e.canPlayType(`audio/flac;`))}}var Cr=Sr();ne(Cr,e=>e);function wr(e){return!!Cr[e]}function Tr(e){let t=Er(e);if(!t)throw Error(`Cannot determine file extension from '${e}'`);return wr(t)}function Er(e){let t=/^data:audio\/([^;,]+);/i.exec(e),n=e.split(`?`,1)[0],r=n&&/\.([^.]+)$/.exec(n);return(t||r)?.[1]?.toLowerCase()}async function Dr(e=new AudioContext){e instanceof AudioContext&&e.state===`suspended`&&e.resume().catch(()=>{});let t=e.createBufferSource();t.buffer=e.createBuffer(1,1,22050),t.connect(e.destination);let n=new ye;return t.addEventListener(`ended`,()=>{t.disconnect(),n.isSettled||n.resolve(!0)}),t.start(),globalThis.setTimeout(()=>{n.isSettled||n.resolve(!1)},100),n.promise}function Or(e){return oe(e.sources).map(e=>k.isString(e)?e:[e.url,e.codec].join(`,`)).concat(`v=${e.volume??1}`).join(`;`)}var kr=class extends c(`audio-file-play-end`){},Ar=class extends c(`audio-file-play-start`){};c(`audio-file-destroyed`);var jr=class extends c(`audio-file-load`){},Mr=class extends o()(`audio-file-error`){},Nr=class extends c(`playing-enabled`){};function Pr(e,t,n){let r=n?.(e);return!r||!k.isLengthAtLeast(r,1)?{outputNode:t}:(r.forEach((e,n,r)=>{let i=r[n+1];i?e.connect(i):e.connect(t)}),{outputNode:r[0]})}var Fr=class extends Me{params;urlOrBase64;loadPromise;outputNode;audioContext;audioCache;fetch;isAudioAllowed=!1;isDestroyed=!1;gainNode;sourceKey;activeBufferSources=new Map;audioChannelOutputNodeMap=new Map;pausedPlaybacks=new Set;constructor(e){super(),this.params=e,this.sourceKey=Or(e);let t=oe(e.sources).find(e=>k.isString(e)?Tr(e):wr(e.codec));if(!t){let t=Error(`No valid audio source files found in: ${C(e.sources)}`);throw this.dispatch(new Mr({detail:t})),t}this.urlOrBase64=k.isString(t)?t:t.url,this.audioContext=e.audioContext||e.outputNode?.context||new AudioContext,this.audioCache=e.audioCache||{},this.fetch=e.fetch||globalThis.fetch.bind(globalThis),this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=Vt(e.volume??1,{min:0,max:1}),this.gainNode.connect(e.outputNode||this.audioContext.destination),this.outputNode=Pr(this.audioContext,this.gainNode,e.createEffects).outputNode}load(){return this.loadPromise||=this.loadAudioBuffer(),this.loadPromise}async play({outputNode:e}={}){let t=await this.load();if(!this.isAudioAllowed){if(d(this).isAudioAllowed=await Dr(this.audioContext),this.isAudioAllowed)this.dispatch(new Nr);else return!1}let n={audioBuffer:t,deferredPlayPromise:new ye,offsetSeconds:0,startedAt:this.audioContext.currentTime,...e?{inputNode:Oe(this.audioChannelOutputNodeMap,e,()=>{let t=this.audioContext.createGain();t.gain.value=Vt(this.params.volume??1,{min:0,max:1}),t.connect(e);let n={gainNode:t,inputNode:Pr(this.audioContext,t,this.params.createEffects).outputNode};return this.audioChannelOutputNodeMap.set(e,n),n}).inputNode}:{}};return this.startPlayback(n),n.deferredPlayPromise.promise}stop(){let e=[...this.pausedPlaybacks],t=[...this.activeBufferSources];this.pausedPlaybacks.clear(),this.activeBufferSources.clear(),e.forEach(e=>{e.deferredPlayPromise.resolve(!0),this.dispatch(new kr)}),t.forEach(([e,t])=>{e.stop(),t.deferredPlayPromise.resolve(!0),this.dispatch(new kr)})}pause(){[...this.activeBufferSources].forEach(([e,t])=>{let n=Math.min(t.audioBuffer.duration,t.offsetSeconds+this.audioContext.currentTime-t.startedAt);n>=t.audioBuffer.duration||(this.activeBufferSources.delete(e),this.pausedPlaybacks.add({...t,offsetSeconds:n}),e.stop())})}resume(){[...this.pausedPlaybacks].forEach(e=>{this.pausedPlaybacks.delete(e),this.startPlayback(e)})}async destroy(){if(this.isDestroyed)return;d(this).isDestroyed=!0,this.stop(),super.destroy();let e=await this.audioCache[this.urlOrBase64];e&&(e.using.delete(this),e.using.size||delete this.audioCache[this.urlOrBase64]),this.audioChannelOutputNodeMap.forEach(e=>{e.inputNode!==e.gainNode&&e.inputNode.disconnect(),e.gainNode.disconnect()}),this.audioChannelOutputNodeMap.clear(),this.outputNode.disconnect(),this.audioCache={},this.loadPromise=void 0,delete this.outputNode,delete this.audioCache}async loadAudioBuffer(){try{let e=this.audioCache[this.urlOrBase64];if(e){let t=await e;return t.using.add(this),t.buffer}let t=new ye;this.audioCache[this.urlOrBase64]=t.promise;let n=/^data:[^;]+;base64,/.test(this.urlOrBase64)?this.loadBase64():await this.loadFromUrl(),r=await this.audioContext.decodeAudioData(n);return t.resolve({using:new Set([this]),buffer:r}),this.dispatch(new jr),r}catch(e){let t=Fe(e);throw this.dispatch(new Mr({detail:t})),t}}loadBase64(){let e=atob(E.isDefined(this.urlOrBase64.split(`,`)[1],`Invalid base64 audio string/`)),t=new Uint8Array(e.length);for(let n=0;n<e.length;++n)t[n]=E.isDefined(e.codePointAt(n),`Invalid base64 audio string at ${n}.`);return t.buffer}async loadFromUrl(){return await(await this.fetch(this.urlOrBase64)).arrayBuffer()}startPlayback(e){let t=this.audioContext.createBufferSource();t.buffer=e.audioBuffer,t.connect(e.inputNode??this.outputNode),e.startedAt=this.audioContext.currentTime,this.activeBufferSources.set(t,e),t.addEventListener(`ended`,()=>{this.activeBufferSources.delete(t)&&(e.deferredPlayPromise.resolve(!0),this.dispatch(new kr))}),this.dispatch(new Ar),t.start(0,e.offsetSeconds)}},Ir=class extends Me{options;audioChannelNodes={};audioFiles={};audioContext=new AudioContext;audioCache={};isDestroyed=!1;outputNode;isAudioAllowed=!1;gainNode;constructor(t={}){super(),this.options=t,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=Vt(t.volume??1,{min:0,max:1}),this.gainNode.connect(this.audioContext.destination),this.outputNode=Pr(this.audioContext,this.gainNode,t.createEffects).outputNode,e(t.initChannels||{}).forEach(([e,t])=>{this.getAudioChannelNode(e,t)})}async play({audioChannel:e,...t}){let n=this.setupAudioFile(t);return e==null?n.play():n.play({outputNode:this.getAudioChannelNode(e,1)})}getAudioChannelNode(e,t){return le(this.audioChannelNodes,e,()=>{let e=this.audioContext.createGain();return e.gain.value=Vt(t,{min:0,max:1}),e.connect(this.outputNode),e})}setupAudioFile(e){let t=Or(e),n=this.audioFiles[t];if(n)return n;let r=new Fr({fetch:this.options.fetch,...e,audioCache:this.audioCache,audioContext:this.audioContext,outputNode:this.outputNode});return this.audioFiles[t]=r,r.listenToAll(e=>{e instanceof Nr&&!this.isAudioAllowed&&(d(this).isAudioAllowed=!0,Object.values(this.audioFiles).forEach(e=>{d(e).isAudioAllowed=!0})),this.dispatch(e)}),r}async unloadFiles(e){await Promise.all(e.map(async e=>{let t=Or(e);await this.audioFiles[t]?.destroy(),delete this.audioFiles[t]}))}stopFile(e){let t=Or(e);this.audioFiles[t]?.stop()}stopFiles(e){e.forEach(e=>{this.stopFile(e)})}stopAllFiles(){be(this.audioFiles).forEach(e=>{e.stop()})}pauseFile(e){let t=Or(e);this.audioFiles[t]?.pause()}pauseFiles(e){e.forEach(e=>{this.pauseFile(e)})}pauseAllFiles(){be(this.audioFiles).forEach(e=>{e.pause()})}resumeFile(e){let t=Or(e);this.audioFiles[t]?.resume()}resumeFiles(e){e.forEach(e=>{this.resumeFile(e)})}resumeAllFiles(){be(this.audioFiles).forEach(e=>{e.resume()})}async loadFiles(e,t={}){let n=0,r=async r=>{let i=this.setupAudioFile(r);return await i.load(),t.progressCallback&&(n++,t.progressCallback({finished:n>=e.length,loaded:n,total:e.length})),i};return t.serial?await b(e,r):await Promise.all(e.map(r))}async destroy(){this.isDestroyed||=(super.destroy(),await Promise.all(Object.values(this.audioFiles).map(async e=>{delete this.audioFiles[e.sourceKey],await e.destroy(),delete this.audioCache[e.sourceKey]})),be(this.audioChannelNodes).forEach(e=>{e.disconnect()}),await this.audioContext.close(),!0)}};function Lr({audioPlayer:e}){e?.audioContext.resume().catch(()=>{})}function Rr({audioPlayer:e}){let t;function n(){Lr({audioPlayer:e}),t?.(),t=void 0}let r=[Ee(`click`,n,{capture:!0}),Ee(`keydown`,n,{capture:!0})];return t=()=>{r.forEach(e=>e())},t}function zr(t){t.audioChannelVolume||={master:1,channels:{}};let n=E.isDefined(t.audioPlayer),r=t.audioChannelVolume;k.isApproximately(n.gainNode.gain.value,r.master,1e-5)||(n.gainNode.gain.value=r.master),e(n.audioChannelNodes).forEach(([e,t])=>{let n=r.channels?.[e]??1;k.isApproximately(t.gain.value,n,1e-5)||(t.gain.value=n)})}function Br(e={}){return Ne({modName:`antha-audio`,async cleanup({state:e}){e.audioResumeListenersCleanup?.(),e.audioResumeListenersCleanup=void 0,await e.audioPlayer?.destroy()},execute({state:t}){t.audioPlayer||=new Ir(e),zr(t),!t.audioResumeListenersCleanup&&(t.audioResumeListenersCleanup=Rr({audioPlayer:t.audioPlayer}))}})}function Vr(){let e,t;return Ne({modName:`antha-background-audio-playback`,execute({state:n}){if(!n.audioPlayer||(e!==n.currentBackgroundAudio&&(e&&n.audioPlayer.stopFile(e),e=n.currentBackgroundAudio,t=n.currentBackgroundAudio?{isBlocked:!1,isInFlight:!1}:void 0),!e||!t||t.isInFlight||t.isBlocked&&n.audioPlayer.audioContext.state!==`running`))return;let r=t;r.isInFlight=!0,n.audioPlayer.play(e).then(e=>{r.isBlocked=!e}).catch(e=>{w.error(e),t===r&&(t=void 0)}).finally(()=>{r.isInFlight=!1})}})}var L;(function(e){e[e.Undefined=1]=`Undefined`,e[e.Null=2]=`Null`,e[e.False=3]=`False`,e[e.True=4]=`True`,e[e.Number=5]=`Number`,e[e.BigInt=6]=`BigInt`,e[e.String=7]=`String`,e[e.Array=8]=`Array`,e[e.Object=9]=`Object`,e[e.Map=10]=`Map`,e[e.Set=11]=`Set`,e[e.Other=12]=`Other`})(L||={});var Hr=new DataView(new ArrayBuffer(8));function Ur(e){let t=2166136261;function n(e){t=Math.imul(t^e,16777619)>>>0}function r(e){n(e.length);for(let t=0;t<e.length;t++)n(E.isDefined(e.codePointAt(t)))}function i(e,r){let i=t,a=0;for(let n of e)t=2166136261,r(n),a=a+t>>>0;t=i,n(a)}function a(e){if(e===void 0)n(L.Undefined);else if(e==null)n(L.Null);else if(k.isBoolean(e))n(e?L.True:L.False);else if(typeof e==`number`)n(L.Number),Hr.setFloat64(0,Number.isNaN(e)?NaN:e===0?0:e),n(Hr.getUint32(0)),n(Hr.getUint32(4));else if(k.isString(e))n(L.String),r(e);else if(typeof e==`bigint`)n(L.BigInt),r(e.toString(16));else if(Array.isArray(e))n(L.Array),n(e.length),e.forEach(a);else if(e instanceof Map)n(L.Map),n(e.size),i(e,([e,t])=>{a(e),a(t)});else if(e instanceof Set)n(L.Set),n(e.size),i(e,a);else if(k.isObject(e)){let t=Object.keys(e).sort();n(L.Object),n(t.length),t.forEach(t=>{r(t),a(e[t])})}else n(L.Other)}return a(e),t}var Wr={exports:{}},Gr=Wr.exports,Kr;function qr(){return Kr?Wr.exports:(Kr=1,(function(e,t){(function(t,n){e.exports=n()})(Gr,function(){var e={};function t(e,t){this.x=e||0,this.y=t||0}e.Vector=t,e.V=t,t.prototype.copy=t.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this},t.prototype.clone=t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.perp=t.prototype.perp=function(){var e=this.x;return this.x=this.y,this.y=-e,this},t.prototype.rotate=t.prototype.rotate=function(e){var t=this.x,n=this.y;return this.x=t*Math.cos(e)-n*Math.sin(e),this.y=t*Math.sin(e)+n*Math.cos(e),this},t.prototype.reverse=t.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.normalize=t.prototype.normalize=function(){var e=this.len();return e>0&&(this.x/=e,this.y/=e),this},t.prototype.add=t.prototype.add=function(e){return this.x+=e.x,this.y+=e.y,this},t.prototype.sub=t.prototype.sub=function(e){return this.x-=e.x,this.y-=e.y,this},t.prototype.scale=t.prototype.scale=function(e,t){return this.x*=e,this.y*=t===void 0?e:t,this},t.prototype.project=t.prototype.project=function(e){var t=this.dot(e)/e.len2();return this.x=t*e.x,this.y=t*e.y,this},t.prototype.projectN=t.prototype.projectN=function(e){var t=this.dot(e);return this.x=t*e.x,this.y=t*e.y,this},t.prototype.reflect=t.prototype.reflect=function(e){var t=this.x,n=this.y;return this.project(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.reflectN=t.prototype.reflectN=function(e){var t=this.x,n=this.y;return this.projectN(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.dot=t.prototype.dot=function(e){return this.x*e.x+this.y*e.y},t.prototype.len2=t.prototype.len2=function(){return this.dot(this)},t.prototype.len=t.prototype.len=function(){return Math.sqrt(this.len2())};function n(e,n){this.pos=e||new t,this.r=n||0,this.offset=new t}e.Circle=n,n.prototype.getAABBAsBox=n.prototype.getAABBAsBox=function(){var e=this.r;return new i(this.pos.clone().add(this.offset).sub(new t(e,e)),e*2,e*2)},n.prototype.getAABB=n.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},n.prototype.setOffset=n.prototype.setOffset=function(e){return this.offset=e,this};function r(e,n){this.pos=e||new t,this.angle=0,this.offset=new t,this.setPoints(n||[])}e.Polygon=r,r.prototype.setPoints=r.prototype.setPoints=function(e){if(!this.points||this.points.length!==e.length){var n,r=this.calcPoints=[],i=this.edges=[],a=this.normals=[];for(n=0;n<e.length;n++){var o=e[n],s=n<e.length-1?e[n+1]:e[0];if(o!==s&&o.x===s.x&&o.y===s.y){e.splice(n,1),--n;continue}r.push(new t),i.push(new t),a.push(new t)}}return this.points=e,this._recalc(),this},r.prototype.setAngle=r.prototype.setAngle=function(e){return this.angle=e,this._recalc(),this},r.prototype.setOffset=r.prototype.setOffset=function(e){return this.offset=e,this._recalc(),this},r.prototype.rotate=r.prototype.rotate=function(e){for(var t=this.points,n=t.length,r=0;r<n;r++)t[r].rotate(e);return this._recalc(),this},r.prototype.translate=r.prototype.translate=function(e,t){for(var n=this.points,r=n.length,i=0;i<r;i++)n[i].x+=e,n[i].y+=t;return this._recalc(),this},r.prototype._recalc=function(){for(var e=this.calcPoints,t=this.edges,n=this.normals,r=this.points,i=this.offset,a=this.angle,o=r.length,s=0;s<o;s++){var c=e[s].copy(r[s]);c.x+=i.x,c.y+=i.y,a!==0&&c.rotate(a)}for(s=0;s<o;s++){var l=e[s],u=s<o-1?e[s+1]:e[0],d=t[s].copy(u).sub(l);n[s].copy(d).perp().normalize()}return this},r.prototype.getAABBAsBox=r.prototype.getAABBAsBox=function(){for(var e=this.calcPoints,n=e.length,r=e[0].x,a=e[0].y,o=e[0].x,s=e[0].y,c=1;c<n;c++){var l=e[c];l.x<r?r=l.x:l.x>o&&(o=l.x),l.y<a?a=l.y:l.y>s&&(s=l.y)}return new i(this.pos.clone().add(new t(r,a)),o-r,s-a)},r.prototype.getAABB=r.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},r.prototype.getCentroid=r.prototype.getCentroid=function(){for(var e=this.calcPoints,n=e.length,r=0,i=0,a=0,o=0;o<n;o++){var s=e[o],c=o===n-1?e[0]:e[o+1],l=s.x*c.y-c.x*s.y;r+=(s.x+c.x)*l,i+=(s.y+c.y)*l,a+=l}return a*=3,r/=a,i/=a,new t(r,i)};function i(e,n,r){this.pos=e||new t,this.w=n||0,this.h=r||0}e.Box=i,i.prototype.toPolygon=i.prototype.toPolygon=function(){var e=this.pos,n=this.w,i=this.h;return new r(new t(e.x,e.y),[new t,new t(n,0),new t(n,i),new t(0,i)])};function a(){this.a=null,this.b=null,this.overlapN=new t,this.overlapV=new t,this.clear()}e.Response=a,a.prototype.clear=a.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var o=[],s=0;s<10;s++)o.push(new t);for(var c=[],s=0;s<5;s++)c.push([]);var l=new a,u=new i(new t,1e-6,1e-6).toPolygon();function d(e,t,n){for(var r=Number.MAX_VALUE,i=-Number.MAX_VALUE,a=e.length,o=0;o<a;o++){var s=e[o].dot(t);s<r&&(r=s),s>i&&(i=s)}n[0]=r,n[1]=i}function f(e,t,n,r,i,a){var s=c.pop(),l=c.pop(),u=o.pop().copy(t).sub(e),f=u.dot(i);if(d(n,i,s),d(r,i,l),l[0]+=f,l[1]+=f,s[0]>l[1]||l[0]>s[1])return o.push(u),c.push(s),c.push(l),!0;if(a){var p=0;if(s[0]<l[0]){if(a.aInB=!1,s[1]<l[1])p=s[1]-l[0],a.bInA=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}}else if(a.bInA=!1,s[1]>l[1])p=s[0]-l[1],a.aInB=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}var g=Math.abs(p);g<a.overlap&&(a.overlap=g,a.overlapN.copy(i),p<0&&a.overlapN.reverse())}return o.push(u),c.push(s),c.push(l),!1}e.isSeparatingAxis=f;function p(e,t){var n=e.len2(),r=t.dot(e);return r<0?m:r>n?g:h}var m=-1,h=0,g=1;function _(e,t){var n=o.pop().copy(e).sub(t.pos).sub(t.offset),r=t.r*t.r,i=n.len2();return o.push(n),i<=r}e.pointInCircle=_;function v(e,t){u.pos.copy(e),l.clear();var n=S(u,t,l);return n&&=l.aInB,n}e.pointInPolygon=v;function y(e,t,n){var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos).sub(e.offset),i=e.r+t.r,a=i*i,s=r.len2();if(s>a)return o.push(r),!1;if(n){var c=Math.sqrt(s);n.a=e,n.b=t,n.overlap=i-c,n.overlapN.copy(r.normalize()),n.overlapV.copy(r).scale(n.overlap),n.aInB=e.r<=t.r&&c<=t.r-e.r,n.bInA=t.r<=e.r&&c<=e.r-t.r}return o.push(r),!0}e.testCircleCircle=y;function b(e,t,n){for(var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos),i=t.r,a=i*i,s=e.calcPoints,c=s.length,l=o.pop(),u=o.pop(),d=0;d<c;d++){var f=d===c-1?0:d+1,h=d===0?c-1:d-1,_=0,v=null;l.copy(e.edges[d]),u.copy(r).sub(s[d]),n&&u.len2()>a&&(n.aInB=!1);var y=p(l,u);if(y===m){l.copy(e.edges[h]);var b=o.pop().copy(r).sub(s[h]);if(y=p(l,b),y===g){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),o.push(b),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}o.push(b)}else if(y===g){if(l.copy(e.edges[f]),u.copy(r).sub(s[f]),y=p(l,u),y===m){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}}else{var S=l.perp().normalize(),x=u.dot(S);if(x>0&&Math.abs(x)>i)return o.push(r),o.push(S),o.push(u),!1;n&&(v=S,_=i-x,(x>=0||_<2*i)&&(n.bInA=!1))}v&&n&&Math.abs(_)<Math.abs(n.overlap)&&(n.overlap=_,n.overlapN.copy(v))}return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),o.push(r),o.push(l),o.push(u),!0}e.testPolygonCircle=b;function x(e,t,n){var r=b(t,e,n);if(r&&n){var i=n.a,a=n.aInB;n.overlapN.reverse(),n.overlapV.reverse(),n.a=n.b,n.b=i,n.aInB=n.bInA,n.bInA=a}return r}e.testCirclePolygon=x;function S(e,t,n){for(var r=e.calcPoints,i=r.length,a=t.calcPoints,o=a.length,s=0;s<i;s++)if(f(e.pos,t.pos,r,a,e.normals[s],n))return!1;for(var s=0;s<o;s++)if(f(e.pos,t.pos,r,a,t.normals[s],n))return!1;return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),!0}return e.testPolygonPolygon=S,e})})(Wr),Wr.exports)}var R=qr();function Jr(e,t,n=0,r=e.length-1,i=Xr){for(;r>n;){if(r-n>600){let a=r-n+1,o=t-n+1,s=Math.log(a),c=.5*Math.exp(2*s/3),l=.5*Math.sqrt(s*c*(a-c)/a)*(o-a/2<0?-1:1);Jr(e,t,Math.max(n,Math.floor(t-o*c/a+l)),Math.min(r,Math.floor(t+(a-o)*c/a+l)),i)}let a=e[t],o=n,s=r;for(Yr(e,n,t),i(e[r],a)>0&&Yr(e,n,r);o<s;){for(Yr(e,o,s),o++,s--;i(e[o],a)<0;)o++;for(;i(e[s],a)>0;)s--}i(e[n],a)===0?Yr(e,n,s):(s++,Yr(e,s,r)),s<=t&&(n=s+1),t<=s&&(r=s-1)}}function Yr(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function Xr(e,t){return e<t?-1:+(e>t)}var Zr=class{constructor(e=9){this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(this._maxEntries*.4)),this.clear()}all(){return this._all(this.data,[])}search(e){let t=this.data,n=[];if(!li(e,t))return n;let r=this.toBBox,i=[];for(;t;){for(let a=0;a<t.children.length;a++){let o=t.children[a],s=t.leaf?r(o):o;li(e,s)&&(t.leaf?n.push(o):ci(e,s)?this._all(o,n):i.push(o))}t=i.pop()}return n}collides(e){let t=this.data;if(!li(e,t))return!1;let n=[];for(;t;){for(let r=0;r<t.children.length;r++){let i=t.children[r],a=t.leaf?this.toBBox(i):i;if(li(e,a)){if(t.leaf||ci(e,a))return!0;n.push(i)}}t=n.pop()}return!1}load(e){if(!(e&&e.length))return this;if(e.length<this._minEntries){for(let t=0;t<e.length;t++)this.insert(e[t]);return this}let t=this._build(e.slice(),0,e.length-1,0);if(!this.data.children.length)this.data=t;else if(this.data.height===t.height)this._splitRoot(this.data,t);else{if(this.data.height<t.height){let e=this.data;this.data=t,t=e}this._insert(t,this.data.height-t.height-1,!0)}return this}insert(e){return e&&this._insert(e,this.data.height-1),this}clear(){return this.data=ui([]),this}remove(e,t){if(!e)return this;let n=this.data,r=this.toBBox(e),i=[],a=[],o,s,c;for(;n||i.length;){if(n||(n=i.pop(),s=i[i.length-1],o=a.pop(),c=!0),n.leaf){let r=Qr(e,n.children,t);if(r!==-1)return n.children.splice(r,1),i.push(n),this._condense(i),this}!c&&!n.leaf&&ci(n,r)?(i.push(n),a.push(o),o=0,s=n,n=n.children[0]):s?(o++,n=s.children[o],c=!1):n=null}return this}toBBox(e){return e}compareMinX(e,t){return e.minX-t.minX}compareMinY(e,t){return e.minY-t.minY}toJSON(){return this.data}fromJSON(e){return this.data=e,this}_all(e,t){let n=[];for(;e;)e.leaf?t.push(...e.children):n.push(...e.children),e=n.pop();return t}_build(e,t,n,r){let i=n-t+1,a=this._maxEntries,o;if(i<=a)return o=ui(e.slice(t,n+1)),$r(o,this.toBBox),o;r||(r=Math.ceil(Math.log(i)/Math.log(a)),a=Math.ceil(i/a**(r-1))),o=ui([]),o.leaf=!1,o.height=r;let s=Math.ceil(i/a),c=s*Math.ceil(Math.sqrt(a));di(e,t,n,c,this.compareMinX);for(let i=t;i<=n;i+=c){let t=Math.min(i+c-1,n);di(e,i,t,s,this.compareMinY);for(let n=i;n<=t;n+=s){let i=Math.min(n+s-1,t);o.children.push(this._build(e,n,i,r-1))}}return $r(o,this.toBBox),o}_chooseSubtree(e,t,n,r){for(;r.push(t),!(t.leaf||r.length-1===n);){let n=1/0,r=1/0,i;for(let a=0;a<t.children.length;a++){let o=t.children[a],s=ii(o),c=oi(e,o)-s;c<r?(r=c,n=s<n?s:n,i=o):c===r&&s<n&&(n=s,i=o)}t=i||t.children[0]}return t}_insert(e,t,n){let r=n?e:this.toBBox(e),i=[],a=this._chooseSubtree(r,this.data,t,i);for(a.children.push(e),ti(a,r);t>=0&&i[t].children.length>this._maxEntries;)this._split(i,t),t--;this._adjustParentBBoxes(r,i,t)}_split(e,t){let n=e[t],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);let a=this._chooseSplitIndex(n,i,r),o=ui(n.children.splice(a,n.children.length-a));o.height=n.height,o.leaf=n.leaf,$r(n,this.toBBox),$r(o,this.toBBox),t?e[t-1].children.push(o):this._splitRoot(n,o)}_splitRoot(e,t){this.data=ui([e,t]),this.data.height=e.height+1,this.data.leaf=!1,$r(this.data,this.toBBox)}_chooseSplitIndex(e,t,n){let r,i=1/0,a=1/0;for(let o=t;o<=n-t;o++){let t=ei(e,0,o,this.toBBox),s=ei(e,o,n,this.toBBox),c=si(t,s),l=ii(t)+ii(s);c<i?(i=c,r=o,a=l<a?l:a):c===i&&l<a&&(a=l,r=o)}return r||n-t}_chooseSplitAxis(e,t,n){let r=e.leaf?this.compareMinX:ni,i=e.leaf?this.compareMinY:ri;this._allDistMargin(e,t,n,r)<this._allDistMargin(e,t,n,i)&&e.children.sort(r)}_allDistMargin(e,t,n,r){e.children.sort(r);let i=this.toBBox,a=ei(e,0,t,i),o=ei(e,n-t,n,i),s=ai(a)+ai(o);for(let r=t;r<n-t;r++){let t=e.children[r];ti(a,e.leaf?i(t):t),s+=ai(a)}for(let r=n-t-1;r>=t;r--){let t=e.children[r];ti(o,e.leaf?i(t):t),s+=ai(o)}return s}_adjustParentBBoxes(e,t,n){for(let r=n;r>=0;r--)ti(t[r],e)}_condense(e){for(let t=e.length-1,n;t>=0;t--)e[t].children.length===0?t>0?(n=e[t-1].children,n.splice(n.indexOf(e[t]),1)):this.clear():$r(e[t],this.toBBox)}};function Qr(e,t,n){if(!n)return t.indexOf(e);for(let r=0;r<t.length;r++)if(n(e,t[r]))return r;return-1}function $r(e,t){ei(e,0,e.children.length,t,e)}function ei(e,t,n,r,i){i||=ui(null),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let a=t;a<n;a++){let t=e.children[a];ti(i,e.leaf?r(t):t)}return i}function ti(e,t){return e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),e}function ni(e,t){return e.minX-t.minX}function ri(e,t){return e.minY-t.minY}function ii(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function ai(e){return e.maxX-e.minX+(e.maxY-e.minY)}function oi(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function si(e,t){let n=Math.max(e.minX,t.minX),r=Math.max(e.minY,t.minY),i=Math.min(e.maxX,t.maxX),a=Math.min(e.maxY,t.maxY);return Math.max(0,i-n)*Math.max(0,a-r)}function ci(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function li(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function ui(e){return{children:e,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function di(e,t,n,r,i){let a=[t,n];for(;a.length;){if(n=a.pop(),t=a.pop(),n-t<=r)continue;let o=t+Math.ceil((n-t)/r/2)*r;Jr(e,o,t,n,i),a.push(t,o,o,n)}}function fi(e,t,n,r){let i=t[0]-e[0],a=t[1]-e[1],o=r[0]-n[0],s=r[1]-n[1];if(o*a-s*i===0)return!1;let c=(i*(n[1]-e[1])+a*(e[0]-n[0]))/(o*a-s*i),l=(o*(e[1]-n[1])+s*(n[0]-e[0]))/(s*i-o*a);return c>=0&&c<=1&&l>=0&&l<=1}function pi(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(n[0]-e[0])*(t[1]-e[1])}function mi(e,t,n){return pi(e,t,n)>0}function hi(e,t,n){return pi(e,t,n)>=0}function gi(e,t,n){return pi(e,t,n)<0}function _i(e,t,n){return pi(e,t,n)<=0}function vi(e,t){let n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function z(e,t){let n=e.length;return e[t<0?t%n+n:t%n]}function yi(e,t,n,r){for(let i=n;i<r;i++)e.push(t[i])}function bi(e,t){return gi(z(e,t-1),z(e,t),z(e,t+1))}function xi(e,t,n){for(let r=0;r!==e.length;++r)if(r!==t&&r!==n&&(r+1)%e.length!==t&&(r+1)%e.length!==n&&fi(z(e,t),z(e,n),z(e,r),z(e,r+1)))return!1;return!0}function Si(e){let t=e,n=0;for(;n<t.length-1;n++)for(let e=0;e<n-1;e++)if(fi(t[n],t[n+1],t[e],t[e+1]))return!1;for(n=1;n<t.length-2;n++)if(fi(t[0],t[t.length-1],t[n],t[n+1]))return!1;return!0}function Ci(e,t,n,r,i){i===void 0&&(i=0);let a=t[1]-e[1],o=e[0]-t[0],s=a*e[0]+o*e[1],c=r[1]-n[1],l=n[0]-r[0],u=c*n[0]+l*n[1],d=a*l-c*o;return Ti(d,0,i)?[0,0]:[(l*s-o*u)/d,(a*u-c*s)/d]}function wi(e,t,n,r,i,a,o){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=[]),i===void 0&&(i=25),a===void 0&&(a=100),o===void 0&&(o=0);let s=[0,0],c=[0,0],l=[0,0],u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=[],v=[],y=e,b=e;if(b.length<3)return t;if(o++,o>a)return console.warn(`quickDecomp: max level (`+a+`) reached.`),t;for(let x=0;x<e.length;++x)if(bi(y,x)){n.push(y[x]),u=d=Number.MAX_VALUE;for(let t=0;t<e.length;++t)mi(z(y,x-1),z(y,x),z(y,t))&&_i(z(y,x-1),z(y,x),z(y,t-1))&&(l=Ci(z(y,x-1),z(y,x),z(y,t),z(y,t-1)),gi(z(y,x+1),z(y,x),l)&&(f=vi(y[x],l),f<d&&(d=f,c=l,h=t))),mi(z(y,x+1),z(y,x),z(y,t+1))&&_i(z(y,x+1),z(y,x),z(y,t))&&(l=Ci(z(y,x+1),z(y,x),z(y,t),z(y,t+1)),mi(z(y,x-1),z(y,x),l)&&(f=vi(y[x],l),f<u&&(u=f,s=l,m=t)));if(h===(m+1)%e.length)l[0]=(c[0]+s[0])/2,l[1]=(c[1]+s[1])/2,r.push(l),x<m?(yi(_,y,x,m+1),_.push(l),v.push(l),h!==0&&yi(v,y,h,y.length),yi(v,y,0,x+1)):(x!==0&&yi(_,y,x,y.length),yi(_,y,0,m+1),_.push(l),v.push(l),yi(v,y,h,x+1));else{if(h>m&&(m+=e.length),p=Number.MAX_VALUE,m<h)return t;for(let t=h;t<=m;++t)hi(z(y,x-1),z(y,x),z(y,t))&&_i(z(y,x+1),z(y,x),z(y,t))&&(f=vi(z(y,x),z(y,t)),f<p&&xi(y,x,t)&&(p=f,g=t%e.length));x<g?(yi(_,y,x,g+1),g!==0&&yi(v,y,g,b.length),yi(v,y,0,x+1)):(x!==0&&yi(_,y,x,b.length),yi(_,y,0,g+1),yi(v,y,g,x+1))}return _.length<v.length?(wi(_,t,n,r,i,a,o),wi(v,t,n,r,i,a,o)):(wi(v,t,n,r,i,a,o),wi(_,t,n,r,i,a,o)),t}return t.push(e),t}function Ti(e,t,n){return n===void 0&&(n=0),n||=0,Math.abs(e-t)<=n}var Ei;(function(e){e.Ellipse=`Ellipse`,e.Circle=`Circle`,e.Polygon=`Polygon`,e.Box=`Box`,e.Line=`Line`,e.Point=`Point`})(Ei||={});var B;(function(e){e[e.Ellipse=32]=`Ellipse`,e[e.Circle=16]=`Circle`,e[e.Polygon=8]=`Polygon`,e[e.Box=4]=`Box`,e[e.Line=2]=`Line`,e[e.Point=1]=`Point`})(B||={});var V=(e,t)=>{for(let n=0,r=e.length;n<r;n++)t(e[n],n)},Di=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(t(e[n],n))return!0;return!1},Oi=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(!t(e[n],n))return!1;return!0},ki=(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=e[r];t(i,r)&&n.push(i)}return n},Ai=(e,t)=>{let n=e.length,r=Array(n);for(let i=0;i<n;i++)r[i]=t(e[i],i);return r};function ji({calcPoints:e,pos:t}){return Ai(e,({x:e,y:n})=>({x:e+t.x,y:n+t.y}))}function Mi(e){return e.isConvex||e.typeGroup!==B.Polygon?[e]:e.convexPolygons}function Ni(e,t){return Oi(ji(e),e=>R.pointInCircle(e,t))}function Pi(e,t){return Di(Mi(t),t=>R.pointInPolygon(e,t))}function Fi(e,t){return Oi(ji(e),e=>Pi(e,t))}function Ii(e,t){let n=e.pos.x,r=e.pos.y,i=t.pos.x,a=t.pos.y,o=e.r,s=t.r,c=Math.sqrt((n-i)*(n-i)+(r-a)*(r-a));return c+s===o||c+s<o}function Li(e,t){if(e.r===0||!Pi(e.pos,t))return!1;let n=ji(t);return!(Di(n,t=>R.pointInCircle(t,e))||Di(n,(t,r)=>Ri({start:r?n[r-1]:n[n.length-1],end:t},e).length>0))}function Ri(e,{pos:t,r:n}){let r={x:e.end.x-e.start.x,y:e.end.y-e.start.y},i={x:e.start.x-t.x,y:e.start.y-t.y},a=(r.x*i.x+r.y*i.y)*-2,o=(r.x*r.x+r.y*r.y)*2,s=Math.sqrt(a*a-(i.x*i.x+i.y*i.y-n*n)*o*2);if(isNaN(s))return[];let c=(a-s)/o,l=(a+s)/o,u=[];return c<=1&&c>=0&&u.push({x:e.start.x+r.x*c,y:e.start.y+r.y*c}),l<=1&&l>=0&&u.push({x:e.start.x+r.x*l,y:e.start.y+r.y*l}),u}function zi(e,t){let n=e.end.x-e.start.x,r=e.end.y-e.start.y,i=n*(t.end.y-t.start.y)-(t.end.x-t.start.x)*r;if(Math.abs(i)<2**-52)return;let a=((t.end.y-t.start.y)*(t.end.x-e.start.x)+(t.start.x-t.end.x)*(t.end.y-e.start.y))/i,o=((e.start.y-e.end.y)*(t.end.x-e.start.x)+n*(t.end.y-e.start.y))/i;if(!(a<0||a>1||o<0||o>1))return{x:e.start.x+a*n,y:e.start.y+a*r}}function Bi(e,{calcPoints:t,pos:n}){let r=[];return V(t,(i,a)=>{let o=a?t[a-1]:t[t.length-1],s=zi(e,{start:{x:o.x+n.x,y:o.y+n.y},end:{x:i.x+n.x,y:i.y+n.y}});s&&r.push(s)}),r}function Vi(e,t){let n=[],r=e.pos.x,i=e.pos.y,a=e.r,o=t.pos.x,s=t.pos.y,c=t.r,l=o-r,u=s-i,d=Math.sqrt(l*l+u*u);if(d>a+c||d<Math.abs(a-c)||d===0)return n;let f=(a*a-c*c+d*d)/(2*d),p=Math.sqrt(a*a-f*f),m=r+l*f/d,h=i+u*f/d,g={x:m+p*u/d,y:h-p*l/d};n.push(g);let _={x:m-p*u/d,y:h+p*l/d};return n.push(_),n}var Hi={satCircleCircle:R.testCircleCircle,satCirclePolygon:R.testCirclePolygon,satPolygonCircle:R.testPolygonCircle,satPolygonPolygon:R.testPolygonPolygon,inCircleCircle:Ii,inCirclePolygon:Li,inPolygonCircle:Ni,inPolygonPolygon:Fi};function Ui(e,t){let n=[];return V(Object.values(B).filter(e=>typeof e==`number`),r=>{n[r]=r===B.Circle?Hi[`${t}${e}Circle`]:Hi[`${t}${e}Polygon`]}),n}var Wi=Ui(Ei.Circle,`sat`),Gi=Ui(Ei.Circle,`in`),Ki=Ui(Ei.Polygon,`sat`),qi=Ui(Ei.Polygon,`in`),Ji=1e-9;function Yi(e,t,n=Ji){return Math.abs(e-t)<n}function Xi(e,t){return Yi(e.x,t.x)&&Yi(e.y,t.y)}function Zi(e,t=e,n=1){let r=Math.PI*Math.hypot(e,t)*2,i=Math.max(8,Math.ceil(r/Math.max(1,n))),a=[];for(let n=0;n<i;n++){let r=n/i*2*Math.PI,o=Math.cos(r)*e,s=Math.sin(r)*t;a.push(new R.Vector(o,s))}return a}function Qi(e,t){return[new R.Vector(0,0),new R.Vector(e,0),new R.Vector(e,t),new R.Vector(0,t)]}function $i(e={}){return e instanceof R.Vector?e:new R.Vector(e.x||0,e.y||0)}function ea(e=[]){let t=Ai(e,$i);return na(t)?t.reverse():t}function ta(e,t){let n=e.x-t.x,r=e.y-t.y;return Math.hypot(n,r)}function na(e){let t=e.length,n=0;return V(e,(r,i)=>{let a=e[(i+1)%t];n+=(a.x-r.x)*(a.y+r.y)}),n>0}function ra(e,t={}){e.isStatic=!!t.isStatic,e.isTrigger=!!t.isTrigger,e.padding=t.padding||0,e.group=t.group??2147483647,`userData`in t&&(e.userData=t.userData),t.isCentered&&e.typeGroup!==B.Circle&&(e.isCentered=!0),t.angle&&e.setAngle(t.angle)}function ia(e){let{bbox:t,minX:n,minY:r,maxX:i,maxY:a}=e;return t.minX<n||t.minY<r||t.maxX>i||t.maxY>a}function aa(e,t){return t.minX>e.maxX||t.minY>e.maxY||t.maxX<e.minX||t.maxY<e.minY}function oa({group:e},{group:t}){let n=e>>16,r=t>>16,i=e&65535;return!!(n&t&65535)&&(r&i)!==0}function sa(e,t){return(e.typeGroup===B.Circle?Gi:qi)[t.typeGroup](e,t)}function ca(e){return Ai(e,({x:e,y:t})=>({x:e,y:t}))}function la({x:e,y:t}={x:0,y:0}){return[e,t]}function ua([e,t]=[0,0]){return{x:e,y:t}}function da(e,t){return(e.typeGroup===B.Circle?Wi:Ki)[t.typeGroup]}function fa(e,t,n,r,i,a=2,o=4){let s=r-t,c=i-n,l=Math.atan2(c,s),u=Math.cos(l),d=Math.sin(l),f=t,p=n,m=Math.hypot(s,c);for(;m>0;){let t=Math.min(m,a);e.moveTo(f,p),e.lineTo(f+u*t,p+d*t),f+=u*(a+o),p+=d*(a+o),m-=a+o}}function pa(e,{pos:t,calcPoints:n},r=!1){let i=n[n.length-1],a=t.x+i.x,o=t.y+i.y;n.length===1?e.arc(a,o,1,0,Math.PI*2):e.moveTo(a,o),V(n,(a,o)=>{let s=t.x+a.x,c=t.y+a.y;if(r){let r=n[o-1]||i;fa(e,t.x+r.x,t.y+r.y,s,c)}else e.lineTo(s,c)})}function ma(e,t,n=!0){pa(e,{pos:{x:t.minX,y:t.minY},calcPoints:Qi(t.maxX-t.minX,t.maxY-t.minY)},n)}function ha(){return!0}function ga(e){return Math.max(0,Math.min(e,2147483647))}function _a(e,t=1,n=!0){if(!t)return;let r=Math.cos(e.angle)*t,i=Math.sin(e.angle)*t;e.setPosition(e.x+r,e.y+i,n)}var va=class extends R.Circle{constructor(e,t,n){super($i(e),t),this.offsetCopy={x:0,y:0},this.dirty=!1,this.isConvex=!0,this.type=Ei.Circle,this.typeGroup=B.Circle,this.isCentered=!0,ra(this,n),this.unscaledRadius=t}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scale(){return this.r/this.unscaledRadius}set scale(e){this.setScale(e)}get scaleX(){return this.scale}get scaleY(){return this.scale}get group(){return this._group}set group(e){this._group=ga(e)}move(e=1,t=!0){return _a(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.r=this.unscaledRadius*Math.abs(e),this.markAsDirty(n),this}setAngle(e,t=!0){this.angle=e;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}setOffset(e,t=!0){this.offsetCopy.x=e.x,this.offsetCopy.y=e.y;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}getAABBAsBBox(){let e=this.pos.x+this.offset.x,t=this.pos.y+this.offset.y;return{minX:e-this.r,maxX:e+this.r,minY:t-this.r,maxY:t+this.r}}draw(e){let t=this.pos.x+this.offset.x,n=this.pos.y+this.offset.y,r=Math.abs(this.r);if(this.isTrigger){let r=Math.max(8,this.r);for(let i=0;i<r;i++){let a=i/r*2*Math.PI,o=(i-1)/r*2*Math.PI;fa(e,t+Math.cos(o)*this.r,n+Math.sin(o)*this.r,t+Math.cos(a)*this.r,n+Math.sin(a)*this.r)}}else e.moveTo(t+r,n),e.arc(t,n,r,0,Math.PI*2)}drawBVH(e){ma(e,this)}updateBody(e=this.dirty){e&&(this.system?.insert(this),this.dirty=!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}getOffsetWithAngle(){if(!this.offsetCopy.x&&!this.offsetCopy.y||!this.angle)return this.offsetCopy;let e=Math.sin(this.angle),t=Math.cos(this.angle);return{x:this.offsetCopy.x*t-this.offsetCopy.y*e,y:this.offsetCopy.x*e+this.offsetCopy.y*t}}},ya=class extends R.Polygon{constructor(e,t,n){if(super($i(e),ea(t)),this.dirty=!1,this.type=Ei.Polygon,this.typeGroup=B.Polygon,this.centered=!1,this.scaleVector={x:1,y:1},!t.length)throw Error(`No points in polygon`);ra(this,n)}set isCentered(e){if(this.centered===e)return;let t;this.runWithoutRotation(()=>{t=this.getCentroid()});let n=e?-t.x:-this.points[0].x,r=e?-t.y:-this.points[0].y;this.setPoints(Ai(this.points,({x:e,y:t})=>new R.Vector(e+n,t+r))),this.centered=e}get isCentered(){return this.centered}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scaleX(){return this.scaleVector.x}get scaleY(){return this.scaleVector.y}get scale(){return(this.scaleVector.x+this.scaleVector.y)/2}set scale(e){this.setScale(e)}get group(){return this._group}set group(e){this._group=ga(e)}move(e=1,t=!0){return _a(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.scaleVector.x=Math.abs(e),this.scaleVector.y=Math.abs(t),super.setPoints(Ai(this.points,(e,t)=>new R.Vector(this.pointsBackup[t].x*this.scaleVector.x,this.pointsBackup[t].y*this.scaleVector.y))),this.updateConvex(),this.markAsDirty(n),this}setAngle(e,t=!0){return super.setAngle(e),this.markAsDirty(t),this}setOffset(e,t=!0){return super.setOffset(e),this.markAsDirty(t),this}getAABBAsBBox(){let{pos:e,w:t,h:n}=this.getAABBAsBox();return{minX:e.x,minY:e.y,maxX:e.x+t,maxY:e.y+n}}getEdge(e){let{x:t,y:n}=this.calcPoints[e],r=this.calcPoints[(e+1)%this.calcPoints.length];return{start:{x:this.x+t,y:this.y+n},end:{x:this.x+r.x,y:this.y+r.y}}}draw(e){pa(e,this,this.isTrigger)}drawBVH(e){ma(e,this)}setPoints(e){return super.setPoints(e),this.updateConvex(),this.pointsBackup=ca(e),this}translate(e,t){return super.translate(e,t),this.pointsBackup=ca(this.points),this}rotate(e){return super.rotate(e),this.pointsBackup=ca(this.points),this}isSimple(){return Si(Ai(this.calcPoints,la))}updateBody(e=this.dirty){e&&(this.updateConvexPolygonPositions(),this.system?.insert(this),this.dirty=!1)}runWithoutRotation(e){let t=this.angle;this.setAngle(0,!1),e(),this.setAngle(t,!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}updateConvexPolygonPositions(){!this.isConvex&&this.convexPolygons&&V(this.convexPolygons,e=>{e.pos.x=this.pos.x,e.pos.y=this.pos.y,e.angle!==this.angle&&e.setAngle(this.angle)})}getConvex(){return this.typeGroup&&this.typeGroup!==B.Polygon||this.points.length<4?[]:wi(Ai(this.calcPoints,la))}updateConvexPolygons(e=this.getConvex()){this.isConvex||(this.convexPolygons||=[],V(e,(e,t)=>{this.convexPolygons[t]||(this.convexPolygons[t]=new R.Polygon),this.convexPolygons[t].pos.x=this.pos.x,this.convexPolygons[t].pos.y=this.pos.y,this.convexPolygons[t].angle=this.angle,this.convexPolygons[t].setPoints(ea(Ai(e,ua)))}),this.convexPolygons.length=e.length)}updateConvex(){let e=this.getConvex();this.isConvex=e.length<=1,this.updateConvexPolygons(e)}},ba=class extends ya{constructor(e,t,n=t,r=(t+n)/Math.PI,i){super(e,Zi(t,n,r),i),this.type=Ei.Ellipse,this.typeGroup=B.Ellipse,this.isConvex=!0,this._radiusX=t,this._radiusY=n,this._step=r}set isCentered(e){}get isCentered(){return!0}get step(){return this._step}set step(e){this._step=e,this.setPoints(Zi(this._radiusX,this._radiusY,this._step))}get radiusX(){return this._radiusX}set radiusX(e){this._radiusX=e,this.setPoints(Zi(this._radiusX,this._radiusY,this._step))}get radiusY(){return this._radiusY}set radiusY(e){this._radiusY=e,this.setPoints(Zi(this._radiusX,this._radiusY,this._step))}center(){}updateConvex(){}},xa=class extends ya{constructor(e,t,n,r){super(e,Qi(t,n),r),this.type=Ei.Box,this.typeGroup=B.Box,this.isConvex=!0,this._width=t,this._height=n}get width(){return this._width}set width(e){this._width=e,this.afterUpdateSize()}get height(){return this._height}set height(e){this._height=e,this.afterUpdateSize()}afterUpdateSize(){this.setPoints(Qi(this._width,this._height))}updateConvex(){}},Sa=class extends xa{constructor(e,t){super($i(e),.001,.001,t),this.type=Ei.Point,this.typeGroup=B.Point}},Ca=class extends ya{constructor(e,t,n){if(super(e,[{x:0,y:0},{x:t.x-e.x,y:t.y-e.y}],n),this.type=Ei.Line,this.typeGroup=B.Line,this.isConvex=!0,this.calcPoints.length===1||!t)throw console.error({start:e,end:t}),Error(`No end point for line provided`)}get start(){return{x:this.x+this.calcPoints[0].x,y:this.y+this.calcPoints[0].y}}set start({x:e,y:t}){this.x=e,this.y=t}get end(){return{x:this.x+this.calcPoints[1].x,y:this.y+this.calcPoints[1].y}}set end({x:e,y:t}){this.points[1].x=e-this.start.x,this.points[1].y=t-this.start.y,this.setPoints(this.points)}getCentroid(){return new R.Vector((this.end.x-this.start.x)/2,(this.end.y-this.start.y)/2)}updateConvex(){}},wa=class extends Zr{createPoint(e,t,n){let r=new(n||Sa)(e,t);return this.insert(r),r}createLine(e,t,n,r){let i=new(r||Ca)(e,t,n);return this.insert(i),i}createCircle(e,t,n,r){let i=new(r||va)(e,t,n);return this.insert(i),i}createBox(e,t,n,r,i){let a=new(i||xa)(e,t,n,r);return this.insert(a),a}createEllipse(e,t,n=t,r,i,a){let o=new(a||ba)(e,t,n,r,i);return this.insert(o),o}createPolygon(e,t,n,r){let i=new(r||ya)(e,t,n);return this.insert(i),i}insert(e){if(e.bbox=e.getAABBAsBBox(),e.system){if(!ia(e))return this;e.system.remove(e)}return e.minX=e.bbox.minX-e.padding,e.minY=e.bbox.minY-e.padding,e.maxX=e.bbox.maxX+e.padding,e.maxY=e.bbox.maxY+e.padding,super.insert(e)}updateBody(e){e.updateBody()}update(){V(this.all(),e=>{this.updateBody(e)})}draw(e){V(this.all(),t=>{t.draw(e)})}drawBVH(e,t=!0){let n=r=>{ma(e,r,t),r.children&&V(r.children,n)};V(this.data.children,n)}remove(e,t){return e.system=void 0,super.remove(e,t)}getPotentials(e){return ki(this.search(e),t=>t!==e)}traverse(e,{children:t}=this.data){return t?.find((n,r)=>{if(!n)return!1;if(n.typeGroup&&e(n,t,r))return!0;n.children&&this.traverse(e,n)})}},Ta=class extends wa{constructor(){super(...arguments),this.response=new R.Response}insert(e){let t=super.insert(e);return e.system=this,t}separate(e=ha,t=this.response){V(this.all(),n=>{this.separateBody(n,e,t)})}separateBody(e,t=ha,n=this.response){if(e.isStatic&&!e.isTrigger)return;let r={x:0,y:0};this.checkOne(e,n=>{t(n)&&!e.isTrigger&&!n.b.isTrigger&&(r.x+=n.overlapV.x,r.y+=n.overlapV.y)},n),(r.x||r.y)&&e.setPosition(e.x-r.x,e.y-r.y)}checkOne(e,t=ha,n=this.response){return e.isStatic&&!e.isTrigger?!1:Di(this.search(e),r=>{if(r!==e&&this.checkCollision(e,r,n))return t(n)})}checkArea(e,t=ha,n=this.response){return Di(this.search(e),e=>this.checkOne(e,t,n))}checkAll(e=ha,t=this.response){return Di(this.all(),n=>this.checkOne(n,e,t))}checkCollision(e,t,n=this.response){let{bbox:r,padding:i}=e,{bbox:a,padding:o}=t;if(!r||!a||!oa(e,t)||(i||o)&&aa(r,a))return!1;let s=da(e,t);if(e.isConvex&&t.isConvex)return n.clear(),s(e,t,n);let c=Mi(e),l=Mi(t),u=0,d=0,f=!1;if(V(c,e=>{V(l,t=>{n.clear(),s(e,t,n)&&(f=!0,u+=n.overlapV.x,d+=n.overlapV.y)})}),f){let r=new R.Vector(u,d);n.a=e,n.b=t,n.overlapV.x=u,n.overlapV.y=d,n.overlapN=r.normalize(),n.overlap=r.len(),n.aInB=sa(e,t),n.bInA=sa(t,e)}return f}raycast(e,t,n=ha){let r=1/0,i;return this.ray?(this.ray.start=e,this.ray.end=t):this.ray=new Ca(e,t,{isTrigger:!0}),this.insert(this.ray),this.checkOne(this.ray,({b:t})=>{if(!n(t,this.ray))return!1;V(t.typeGroup===B.Circle?Ri(this.ray,t):Bi(this.ray,t),n=>{let a=ta(e,n);a<r&&(r=a,i={point:n,body:t})})}),this.remove(this.ray),i}getCollisionPoints(e,t){let n=[];if(e.typeGroup===B.Circle&&t.typeGroup===B.Circle&&n.push(...Vi(e,t)),e.typeGroup===B.Circle&&t.typeGroup!==B.Circle)for(let r=0;r<t.calcPoints.length;r++){let i=t.getEdge(r);n.push(...Ri(i,e))}if(e.typeGroup!==B.Circle)for(let r=0;r<e.calcPoints.length;r++){let i=e.getEdge(r);if(t.typeGroup===B.Circle)n.push(...Ri(i,t));else for(let e=0;e<t.calcPoints.length;e++){let r=zi(i,t.getEdge(e));r&&n.push(r)}}return n.filter(({x:e,y:t},r)=>r===n.findIndex(n=>Xi(n,{x:e,y:t})))}};new class{constructor(e=0){this.events=[],this.delay=e,this.toc=()=>{this.events.length&&(this.events.forEach(e=>{e()}),this.tic())}}tic(){this.events.length&&setTimeout(this.toc,this.delay)}add(e){this.events.push(e),this.events.length===1&&this.tic()}clear(){for(;this.events.length;)this.events.pop()}};var Ea=R.Response;R.Circle,R.Polygon,R.Vector;var Da={extension:{type:M.Environment,name:`browser`,priority:-1},test:()=>!0,load:async()=>{await ae(()=>import(`./browserAll-VMSClpaX.js`),__vite__mapDeps([0,1,2,3,4,5]))}},Oa={extension:{type:M.Environment,name:`webworker`,priority:0},test:()=>typeof self<`u`&&self.WorkerGlobalScope!==void 0,load:async()=>{await ae(()=>import(`./webworkerAll-B3Hkad6o.js`),__vite__mapDeps([6,3,1,2,4,5]))}},ka;function Aa(e){return ka===void 0&&(ka=(()=>{let t={stencil:!0,failIfMajorPerformanceCaveat:e??Ot.defaultOptions.failIfMajorPerformanceCaveat};try{if(!vt.get().getWebGLRenderingContext())return!1;let e=vt.get().createCanvas().getContext(`webgl`,t),n=!!e?.getContextAttributes()?.stencil;if(e){let t=e.getExtension(`WEBGL_lose_context`);t&&t.loseContext()}return e=null,n}catch{return!1}})()),ka}var ja;async function Ma(e={}){return ja===void 0&&(ja=await(async()=>{let t=vt.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(e)).requestDevice(),!0}catch{return!1}})()),ja}var Na=[`webgl`,`webgpu`,`canvas`];async function Pa(e){let t=[];e.preference?Array.isArray(e.preference)?t=e.preference.slice():(t.push(e.preference),Na.forEach(n=>{n!==e.preference&&t.push(n)})):t=Na.slice();let n,r={};for(let i=0;i<t.length;i++){let a=t[i];if(a===`webgpu`&&await Ma()){let{WebGPURenderer:t}=await ae(async()=>{let{WebGPURenderer:e}=await import(`./WebGPURenderer-LTLhAvoo.js`);return{WebGPURenderer:e}},__vite__mapDeps([7,8,1,2,9,10,11]));n=t,r={...e,...e.webgpu};break}if(a===`webgl`&&Aa(e.failIfMajorPerformanceCaveat??Ot.defaultOptions.failIfMajorPerformanceCaveat)){let{WebGLRenderer:t}=await ae(async()=>{let{WebGLRenderer:e}=await import(`./WebGLRenderer-caqgVvmv.js`);return{WebGLRenderer:e}},__vite__mapDeps([12,13,1,2,9,11]));n=t,r={...e,...e.webgl};break}if(a===`canvas`){let{CanvasRenderer:t}=await ae(async()=>{let{CanvasRenderer:e}=await import(`./CanvasRenderer-CobwcNGA.js`);return{CanvasRenderer:e}},__vite__mapDeps([14,15,1,2,4,9,10]));n=t,r={...e,...e.canvasOptions};break}}if(delete r.webgpu,delete r.webgl,delete r.canvasOptions,!n)throw Error(`No available renderer for the current environment`);let i=new n;return await i.init(r),i}var Fa=class{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(e){globalThis.removeEventListener(`resize`,this.queueResize),this._resizeTo=e,e&&(globalThis.addEventListener(`resize`,this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&=(cancelAnimationFrame(this._resizeId),null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let e,t;if(this._resizeTo===globalThis.window)e=globalThis.innerWidth,t=globalThis.innerHeight;else{let{clientWidth:n,clientHeight:r}=this._resizeTo;e=n,t=r}this.renderer.resize(e,t),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener(`resize`,this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}};Fa.extension=M.Application;var Ia=class{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(e){this._ticker&&this._ticker.remove(this.render,this),this._ticker=e,e&&e.add(this.render,this,_t.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?Ve.shared:new Ve,e.autoStart&&this.start()}static destroy(){if(this._ticker){let e=this._ticker;this.ticker=null,e.destroy()}}};Ia.extension=M.Application,it.add(Fa),it.add(Ia);var La=class e{constructor(...e){this.stage=new Xe,e[0]!==void 0&&$e(Je,`Application constructor options are deprecated, please use Application.init() instead.`)}async init(t){t={...t},this.stage||=new Xe,this.renderer=await Pa(t),e._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return $e(Je,`Application.view is deprecated, please use Application.canvas instead.`),this.renderer.canvas}get screen(){return this.renderer.screen}get domContainerRoot(){return this.renderer.renderPipes.dom?._domElement}destroy(t=!1,n=!1){let r=e._plugins.slice(0);r.reverse(),r.forEach(e=>{e.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(t),this.renderer=null}};La._plugins=[];var Ra=La;it.handleByList(M.Application,Ra._plugins),it.add(kt);var za=class extends Ye{constructor(e,t){let{text:n,resolution:r,style:i,anchor:a,width:o,height:s,roundPixels:c,...l}=e;super({...l}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??``,this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new ct({_onUpdate:()=>{this.onViewUpdate()}}),a&&(this.anchor=a),this.roundPixels=c??!1,o!==void 0&&(this.width=o),s!==void 0&&(this.height=s)}get anchor(){return this._anchor}set anchor(e){typeof e==`number`?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||={},this._style?.off(`update`,this.onViewUpdate,this),this._style=e instanceof this._styleClass?e:new this._styleClass(e),this._style.on(`update`,this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||={},e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e==`object`?(t=e.height??e.width,e=e.width):t??=e,e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){let t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x,i=0;return e.x>=r&&e.x<=r+t&&(i=-n*this.anchor.y,e.y>=i&&e.y<=i+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){this._style?.off(`update`,this.onViewUpdate,this),super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e==`boolean`?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}};function Ba(e,t){let n=e[0]??{};return(typeof n==`string`||e[1])&&($e(Je,`use new ${t}({ text: "hi!", style }) instead`),n={text:n,style:e[1]}),n}var Va=null,Ha=null;function Ua(e,t){Va||(Va=vt.get().createCanvas(256,128),Ha=Va.getContext(`2d`,{willReadFrequently:!0}),Ha.globalCompositeOperation=`copy`,Ha.globalAlpha=1),(Va.width<e||Va.height<t)&&(Va.width=Ue(e),Va.height=Ue(t))}function Wa(e,t,n){for(let r=0,i=4*n*t;r<t;++r,i+=4)if(e[i+3]!==0)return!1;return!0}function Ga(e,t,n,r,i){let a=4*t;for(let t=r,o=r*a+4*n;t<=i;++t,o+=a)if(e[o+3]!==0)return!1;return!0}function Ka(...e){let t=e[0];t.canvas||(t={canvas:e[0],resolution:e[1]});let{canvas:n}=t,r=Math.min(t.resolution??1,1),i=t.width??n.width,a=t.height??n.height,o=t.output;if(Ua(i,a),!Ha)throw TypeError(`Failed to get canvas 2D context`);Ha.drawImage(n,0,0,i,a,0,0,i*r,a*r);let s=Ha.getImageData(0,0,i,a).data,c=0,l=0,u=i-1,d=a-1;for(;l<a&&Wa(s,i,l);)++l;if(l===a)return We.EMPTY;for(;Wa(s,i,d);)--d;for(;Ga(s,i,c,l,d);)++c;for(;Ga(s,i,u,l,d);)--u;return++u,++d,Ha.globalCompositeOperation=`source-over`,Ha.strokeRect(c,l,u-c,d-l),Ha.globalCompositeOperation=`copy`,o??=new We,o.set(c/r,l/r,(u-c)/r,(d-l)/r),o}var qa=new We;function Ja(e){let t=0;for(let n=0;n<e.length;n++)e.charCodeAt(n)===32&&t++;return t}var Ya=new class{getCanvasAndContext(e){let{text:t,style:n,resolution:r=1}=e,i=n._getFinalPadding(),a=mr.measureText(t||` `,n),o=Math.ceil(Math.ceil(Math.max(1,a.width)+i*2)*r),s=Math.ceil(Math.ceil(Math.max(1,a.height)+i*2)*r),c=et.getOptimalCanvasAndContext(o,s);return this._renderTextToCanvas(n,i,r,c,a),{canvasAndContext:c,frame:n.trim?Ka({canvas:c.canvas,width:o,height:s,resolution:1,output:qa}):qa.set(0,0,o,s)}}returnCanvasAndContext(e){et.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,n,r,i){if(i.runsByLine&&i.runsByLine.length>0){this._renderTaggedTextToCanvas(i,e,t,n,r);return}let{canvas:a,context:o}=r,s=gr(e),c=i.lines,l=i.lineHeight,u=i.lineWidths,d=i.maxLineWidth,f=i.fontProperties,p=a.height;if(o.resetTransform(),o.scale(n,n),o.textBaseline=e.textBaseline,e._stroke?.width){let t=e._stroke;o.lineWidth=t.width,o.miterLimit=t.miterLimit,o.lineJoin=t.join,o.lineCap=t.cap}o.font=s;let m,h,g=e.dropShadow?2:1,_=(e._stroke?.width??0)/2,v=(l-f.fontSize)/2;l-f.fontSize<0&&(v=0);for(let a=0;a<g;++a){let s=e.dropShadow&&a===0,g=s?Math.ceil(Math.max(1,p)+t*2):0,y=g*n;if(s)this._setupDropShadow(o,e,n,y);else{let n=e._gradientBounds,r=e._gradientOffset;if(n){let a={width:n.width,height:n.height,lineHeight:n.height,lines:i.lines};this._setFillAndStrokeStyles(o,e,a,t,_,r?.x??0,r?.y??0)}else r?this._setFillAndStrokeStyles(o,e,i,t,_,r.x,r.y):this._setFillAndStrokeStyles(o,e,i,t,_);o.shadowColor=`rgba(0,0,0,0)`}for(let n=0;n<c.length;n++){m=_,h=_+n*l+f.ascent+v,m+=this._getAlignmentOffset(u[n],d,e.align);let i=0;if(e.align===`justify`&&e.wordWrap&&n<c.length-1){let e=Ja(c[n]);e>0&&(i=(d-u[n])/e)}e._stroke?.width&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!0,i),e._fill!==void 0&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!1,i)}}}_renderTaggedTextToCanvas(e,t,n,r,i){let{canvas:a,context:o}=i,{runsByLine:s,lineWidths:c,maxLineWidth:l,lineAscents:u,lineHeights:d,hasDropShadow:f}=e,p=a.height;o.resetTransform(),o.scale(r,r),o.textBaseline=t.textBaseline;let m=f?2:1,h=t._stroke?.width??0;for(let e of s)for(let t of e){let e=t.style._stroke?.width??0;e>h&&(h=e)}let g=h/2,_=[];for(let e=0;e<s.length;e++){let t=s[e],n=[];for(let e of t){let t=gr(e.style);o.font=t,n.push({width:mr._measureText(e.text,e.style.letterSpacing,o),font:t})}_.push(n)}for(let e=0;e<m;++e){let a=f&&e===0,m=a?Math.ceil(Math.max(1,p)+n*2):0,h=m*r;a||(o.shadowColor=`rgba(0,0,0,0)`);let v=g;for(let e=0;e<s.length;e++){let f=s[e],p=c[e],y=u[e],b=d[e],x=_[e],S=g;S+=this._getAlignmentOffset(p,l,t.align);let C=0;if(t.align===`justify`&&t.wordWrap&&e<s.length-1){let e=0;for(let t of f)e+=Ja(t.text);e>0&&(C=(l-p)/e)}let ee=v+y,te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._stroke?.width){let e=t.style._stroke;if(o.lineWidth=e.width,o.miterLimit=e.miterLimit,o.lineJoin=e.join,o.lineCap=e.cap,a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Ja(t.text);te+=s+e*C;continue}}else{let r=mr.measureFont(c),i=t.style.lineHeight||r.fontSize;o.strokeStyle=xr(e,o,{width:s,height:i,lineHeight:i,lines:[t.text]},n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!0,C)}let l=Ja(t.text);te+=s+l*C}te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._fill!==void 0){if(a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Ja(t.text);te+=s+e*C;continue}}else{let e=mr.measureFont(c),r=t.style.lineHeight||e.fontSize,i={width:s,height:r,lineHeight:r,lines:[t.text]};o.fillStyle=xr(t.style._fill,o,i,n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!1,C)}let l=Ja(t.text);te+=s+l*C}v+=b}}}_setFillAndStrokeStyles(e,t,n,r,i,a=0,o=0){if(e.fillStyle=t._fill?xr(t._fill,e,n,r*2,a,o):null,t._stroke?.width){let s=i+r*2;e.strokeStyle=xr(t._stroke,e,n,s,a,o)}}_setupDropShadow(e,t,n,r){e.fillStyle=`black`,e.strokeStyle=`black`;let i=t.dropShadow,a=i.color,o=i.alpha;e.shadowColor=tt.shared.setValue(a).setAlpha(o).toRgbaString();let s=i.blur*n,c=i.distance*n;e.shadowBlur=s,e.shadowOffsetX=Math.cos(i.angle)*c,e.shadowOffsetY=Math.sin(i.angle)*c+r}_getAlignmentOffset(e,t,n){return n===`right`?t-e:n===`center`?(t-e)/2:0}_drawLetterSpacing(e,t,n,r,i,a=!1,o=0){let{context:s}=n,c=t.letterSpacing,l=!1;if(mr.experimentalLetterSpacingSupported&&(mr.experimentalLetterSpacing?(s.letterSpacing=`${c}px`,s.textLetterSpacing=`${c}px`,l=!0):(s.letterSpacing=`0px`,s.textLetterSpacing=`0px`)),(c===0||l)&&o===0){a?s.strokeText(e,r,i):s.fillText(e,r,i);return}if(o!==0&&(c===0||l)){let t=e.split(` `),n=r,c=s.measureText(` `).width;for(let e=0;e<t.length;e++)a?s.strokeText(t[e],n,i):s.fillText(t[e],n,i),n+=s.measureText(t[e]).width+c+o;return}let u=r,d=mr.graphemeSegmenter(e),f=s.measureText(e).width,p=0;for(let e=0;e<d.length;++e){let t=d[e];a?s.strokeText(t,u,i):s.fillText(t,u,i);let n=``;for(let t=e+1;t<d.length;++t)n+=d[t];p=s.measureText(n).width,u+=f-p+c,t===` `&&(u+=o),f=p}}},Xa=!1;function Za(e){if(Xa)return;let t=new Ke({scaleMode:e.scaleMode});e._resourceId!==t._resourceId&&(Xa=!0,Qe(`Text textureStyle: only scaleMode is applied to a text texture, the other fields are ignored`))}function Qa(e,t){let{texture:n,bounds:r}=e,i=t._style._getFinalPadding();nt(r,t._anchor,n);let a=t._anchor._x*i*2,o=t._anchor._y*i*2;r.minX-=i-a,r.minY-=i-o,r.maxX-=i-a,r.maxY-=i-o}var $a=class extends Et{},eo=class{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),e.runners.contextChange.add(this),this._managedTexts=new jt({renderer:e,type:`renderable`,onUnload:this.onTextUnload.bind(this),name:`canvasText`})}resolutionChange(){for(let e in this._managedTexts.items){let t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}contextChange(){for(let e in this._managedTexts.items)this._managedTexts.items[e]?.unload()}validateRenderable(e){let t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n||e._didTextUpdate}addRenderable(e,t){let n=this._getGpuText(e);if(e._didTextUpdate||n.currentKey!==e.styleKey){let t=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e._resolution!==t)&&this._updateGpuText(e),e._didTextUpdate=!1,Qa(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){let t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new $a;return t.currentKey=`--`,t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){let t=e._gpuData[this._renderer.uid];if(!t)return;let{canvasText:n}=this._renderer;n.getReferenceCount(t.currentKey)>0?n.decreaseReferenceCount(t.currentKey):t.texture&&n.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}};eo.extension={type:[M.WebGLPipes,M.WebGPUPipes,M.CanvasPipes],name:`text`};var to=class{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,n,r){typeof e==`string`&&($e(`8.0.0`,`CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments`),e={text:e,style:n,resolution:t}),e.style instanceof vr||(e.style=new vr(e.style)),typeof e.text!=`string`&&(e.text=e.text.toString());let{text:i,style:a,textureStyle:o,autoGenerateMipmaps:s}=e,c=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:u}=Ya.getCanvasAndContext({text:i,style:a,resolution:c}),d=yt(u.canvas,l.width,l.height,c,s,o?.scaleMode);if(a.trim&&(l.pad(a.padding),d.frame.copyFrom(l),d.frame.scale(1/c),d.updateUvs()),a.filters){let e=this._applyFilters(d,a.filters);return this.returnTexture(d),Ya.returnCanvasAndContext(u),e}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||Ya.returnCanvasAndContext(u),d}returnTexture(e){let t=e.source,n=t.resource;if(this._retainCanvasContext&&n?.getContext){let e=n.getContext(`2d`);e&&Ya.returnCanvasAndContext({canvas:n,context:e})}t.resource=null,t.uploadMethodId=`unknown`,t.alphaMode=`no-premultiply-alpha`,He.returnTexture(e)}renderTextToCanvas(){$e(`8.10.0`,`CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead`)}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;let n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle,autoGenerateMipmaps:e.autoGenerateMipmaps});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){let t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){let n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind({target:n,clear:!1}),r}destroy(){this._renderer=null;for(let e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}},no=class extends to{constructor(e){super(e,!0)}};no.extension={type:[M.CanvasSystem],name:`canvasText`};var ro=class extends to{constructor(e){super(e,!1)}};ro.extension={type:[M.WebGLSystem,M.WebGPUSystem],name:`canvasText`},it.add(no),it.add(ro),it.add(eo);var io=class extends za{constructor(...e){let t=Ba(e,`Text`);super(t,vr),this.renderPipeId=`text`,t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Ke?t.textureStyle:new Ke(t.textureStyle),Za(this.textureStyle)),this.autoGenerateMipmaps=t.autoGenerateMipmaps??Ge.defaultOptions.autoGenerateMipmaps}updateBounds(){let e=this._bounds,t=this._anchor,n=0,r=0;if(this._style.trim){let{frame:e,canvasAndContext:t}=Ya.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Ya.returnCanvasAndContext(t),n=e.width,r=e.height}else{let e=mr.measureText(this._text,this._style);n=e.width,r=e.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}},ao=class{execute(e,t){let n=e.renderer,r=n.canvasContext.activeContext,i=t.particleChildren,a=t.texture;r.save(),n.canvasContext.setContextTransform(t.worldTransform,t.roundPixels),n.canvasContext.setBlendMode(t.groupBlendMode);let o=t.groupColorAlpha,s=n.filter?.alphaMultiplier??1,c=(o>>>24&255)/255*s;for(let e=0;e<i.length;e++){let t=i[e],n=t.texture||a;if(!n?.source?.resource)continue;let o=t.color,s=(o>>>24&255)/255*c;if(s<=0)continue;let l=o&16777215,u=((l&255)<<16)+(l&65280)+(l>>16&255),d=n.source.resource;u!==16777215&&(d=bt.getTintedCanvas({texture:n},u));let f=n.frame,p=n.source.resolution,m=f.x*p,h=f.y*p,g=f.width*p,_=f.height*p;r.globalAlpha=s;let v=-t.anchorX*f.width,y=-t.anchorY*f.height;t.rotation!==0||t.scaleX!==1||t.scaleY!==1?(r.save(),r.translate(t.x,t.y),r.rotate(t.rotation),r.scale(t.scaleX,t.scaleY),r.drawImage(d,m,h,g,_,v,y,f.width,f.height),r.restore()):r.drawImage(d,m,h,g,_,t.x+v,t.y+y,f.width,f.height)}r.restore()}};function oo(e,t=null){let n=e*6;if(t||=n>65535?new Uint32Array(n):new Uint16Array(n),t.length!==n)throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${n}`);for(let e=0,r=0;e<n;e+=6,r+=4)t[e+0]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3;return t}function so(e){return{dynamicUpdate:co(e,!0),staticUpdate:co(e,!1)}}function co(e,t){let n=[];n.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(let i in e){let a=e[i];if(t!==a.dynamic)continue;n.push(`offset = index + ${r}`),n.push(a.code);let o=dt(a.format);r+=o.stride/4}n.push(`
            index += stride * 4;
        }
    `),n.unshift(`
        var stride = ${r};
    `);let i=n.join(`
`);return Function(`ps`,`f32v`,`u32v`,i)}var lo=class{constructor(e){this._size=0,this._generateParticleUpdateCache={};let t=this._size=e.size??1e3,n=e.properties,r=0,i=0;for(let e in n){let t=n[e],a=dt(t.format);t.dynamic?i+=a.stride:r+=a.stride}this._dynamicStride=i/4,this._staticStride=r/4,this.staticAttributeBuffer=new Dt(t*4*r),this.dynamicAttributeBuffer=new Dt(t*4*i),this.indexBuffer=oo(t);let a=new ht,o=0,s=0;this._staticBuffer=new st({data:new Float32Array(1),label:`static-particle-buffer`,shrinkToFit:!1,usage:ft.VERTEX|ft.COPY_DST}),this._dynamicBuffer=new st({data:new Float32Array(1),label:`dynamic-particle-buffer`,shrinkToFit:!1,usage:ft.VERTEX|ft.COPY_DST});for(let e in n){let t=n[e],r=dt(t.format);t.dynamic?(a.addAttribute(t.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:t.format}),o+=r.size):(a.addAttribute(t.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:s*4,format:t.format}),s+=r.size)}a.addIndex(this.indexBuffer);let c=this.getParticleUpdate(n);this._dynamicUpload=c.dynamicUpdate,this._staticUpload=c.staticUpdate,this.geometry=a}getParticleUpdate(e){let t=uo(e);return this._generateParticleUpdateCache[t]||(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e)),this._generateParticleUpdateCache[t]}generateParticleUpdate(e){return so(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new Dt(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new Dt(this._size*this._dynamicStride*4*4),this.indexBuffer=oo(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));let n=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,n.float32View,n.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){let t=this.staticAttributeBuffer;this._staticUpload(e,t.float32View,t.uint32View),this._staticBuffer.setDataWithSize(t.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}};function uo(e){let t=[];for(let n in e){let r=e[n];t.push(n,r.code,r.dynamic?`d`:`s`)}return t.join(`_`)}var fo=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,po=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,mo=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`,ho=class extends mt{constructor(){let e=ot.from({vertex:po,fragment:fo}),t=at.from({fragment:{source:mo,entryPoint:`mainFragment`},vertex:{source:mo,entryPoint:`mainVertex`}});super({glProgram:e,gpuProgram:t,resources:{uTexture:qe.WHITE.source,uSampler:new Ke({}),uniforms:{uTranslationMatrix:{value:new pt,type:`mat3x3<f32>`},uColor:{value:new tt(16777215),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}}})}},go=class{constructor(e,t){this.state=lt.for2d(),this.localUniforms=new rt({uTranslationMatrix:{value:new pt,type:`mat3x3<f32>`},uColor:{value:new Float32Array(4),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}),this.renderer=e,this.adaptor=t,this.defaultShader=new ho,this.state=lt.for2d(),this._managedContainers=new jt({renderer:e,type:`renderable`,name:`particleContainer`})}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new lo({size:e.particleChildren.length,properties:e._properties}),this._managedContainers.add(e),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){let t=e.particleChildren;if(t.length===0)return;let n=this.renderer,r=this.getBuffers(e);e.texture||=t[0].texture;let i=this.state;r.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=Mt(e.groupBlendMode,e.texture._source);let a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o);let s=n.globalUniforms.globalUniformData;o.tx-=s.offset.x,o.ty-=s.offset.y,o.prepend(s.projectionMatrix),a.uResolution=s.resolution,a.uRound=n._roundPixels|e._roundPixels;let c=e.groupColorAlpha,l=s.worldColor,u=(c>>>24)*(l>>>24)/255|0,d=Be(c&16777215,l&16777215);At((u<<24|d)>>>0,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this._managedContainers.destroy(),this.renderer=null,this.defaultShader&&=(this.defaultShader.destroy(),null)}};go.extension={type:[M.CanvasPipes],name:`particle`};var _o=class extends go{constructor(e){super(e,new ao)}};_o.extension={type:[M.CanvasPipes],name:`particle`};var vo=class{execute(e,t){let n=e.state,r=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;let a=r.gl,o=e.getBuffers(t);r.shader.bind(i),r.state.set(n),r.geometry.bind(o.geometry,i.glProgram);let s=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,s,0)}},yo=class extends go{constructor(e){super(e,new vo)}};yo.extension={type:[M.WebGLPipes],name:`particle`};var bo=class{execute(e,t){let n=e.renderer,r=t.shader||e.defaultShader;r.groups[0]=n.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),r.groups[1]=n.texture.getTextureBindGroup(t.texture);let i=e.state,a=e.getBuffers(t);n.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}},xo=class extends go{constructor(e){super(e,new bo)}};xo.extension={type:[M.WebGPUPipes],name:`particle`};var So={vertex:{attributeName:`aVertex`,format:`float32x2`,code:`
            const texture = p.texture;
            const sx = p.scaleX;
            const sy = p.scaleY;
            const ax = p.anchorX;
            const ay = p.anchorY;
            const trim = texture.trim;
            const orig = texture.orig;

            if (trim)
            {
                w1 = trim.x - (ax * orig.width);
                w0 = w1 + trim.width;

                h1 = trim.y - (ay * orig.height);
                h0 = h1 + trim.height;
            }
            else
            {
                w1 = -ax * (orig.width);
                w0 = w1 + orig.width;

                h1 = -ay * (orig.height);
                h0 = h1 + orig.height;
            }

            f32v[offset] = w1 * sx;
            f32v[offset + 1] = h1 * sy;

            f32v[offset + stride] = w0 * sx;
            f32v[offset + stride + 1] = h1 * sy;

            f32v[offset + (stride * 2)] = w0 * sx;
            f32v[offset + (stride * 2) + 1] = h0 * sy;

            f32v[offset + (stride * 3)] = w1 * sx;
            f32v[offset + (stride * 3) + 1] = h0 * sy;
        `,dynamic:!1},position:{attributeName:`aPosition`,format:`float32x2`,code:`
            var x = p.x;
            var y = p.y;

            f32v[offset] = x;
            f32v[offset + 1] = y;

            f32v[offset + stride] = x;
            f32v[offset + stride + 1] = y;

            f32v[offset + (stride * 2)] = x;
            f32v[offset + (stride * 2) + 1] = y;

            f32v[offset + (stride * 3)] = x;
            f32v[offset + (stride * 3) + 1] = y;
        `,dynamic:!0},rotation:{attributeName:`aRotation`,format:`float32`,code:`
            var rotation = p.rotation;

            f32v[offset] = rotation;
            f32v[offset + stride] = rotation;
            f32v[offset + (stride * 2)] = rotation;
            f32v[offset + (stride * 3)] = rotation;
        `,dynamic:!1},uvs:{attributeName:`aUV`,format:`float32x2`,code:`
            var uvs = p.texture.uvs;

            f32v[offset] = uvs.x0;
            f32v[offset + 1] = uvs.y0;

            f32v[offset + stride] = uvs.x1;
            f32v[offset + stride + 1] = uvs.y1;

            f32v[offset + (stride * 2)] = uvs.x2;
            f32v[offset + (stride * 2) + 1] = uvs.y2;

            f32v[offset + (stride * 3)] = uvs.x3;
            f32v[offset + (stride * 3) + 1] = uvs.y3;
        `,dynamic:!1},color:{attributeName:`aColor`,format:`unorm8x4`,code:`
            const c = p.color;

            u32v[offset] = c;
            u32v[offset + stride] = c;
            u32v[offset + (stride * 2)] = c;
            u32v[offset + (stride * 3)] = c;
        `,dynamic:!1}};it.add(yo),it.add(xo),it.add(_o);var Co=new Ze(0,0,0,0),wo=class e extends Ye{constructor(t={}){t={...e.defaultOptions,...t,dynamicProperties:{...e.defaultOptions.dynamicProperties,...t?.dynamicProperties}};let{dynamicProperties:n,shader:r,roundPixels:i,texture:a,particles:o,...s}=t;super({label:`ParticleContainer`,...s}),this.renderPipeId=`particle`,this.batched=!1,this._childrenDirty=!1,this.texture=a||null,this.shader=r,this._properties={};for(let e in So){let t=So[e],r=n[e];this._properties[e]={...t,dynamic:r}}this.allowChildren=!0,this.roundPixels=i??!1,this.particleChildren=o??[]}addParticle(...e){for(let t=0;t<e.length;t++)this.particleChildren.push(e[t]);return this.onViewUpdate(),e[0]}removeParticle(...e){let t=!1;for(let n=0;n<e.length;n++){let r=this.particleChildren.indexOf(e[n]);r>-1&&(this.particleChildren.splice(r,1),t=!0)}return t&&this.onViewUpdate(),e[0]}update(){this._childrenDirty=!0}onViewUpdate(){this._childrenDirty=!0,super.onViewUpdate()}get bounds(){return Co}updateBounds(){}destroy(e=!1){if(super.destroy(e),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource,n=this.texture??this.particleChildren[0]?.texture;n&&n.destroy(t)}this.texture=null,this.shader?.destroy()}removeParticles(e,t){e??=0,t??=this.particleChildren.length;let n=this.particleChildren.splice(e,t-e);return this.onViewUpdate(),n}removeParticleAt(e){let t=this.particleChildren.splice(e,1);return this.onViewUpdate(),t[0]}addParticleAt(e,t){return this.particleChildren.splice(t,0,e),this.onViewUpdate(),e}addChild(...e){throw Error(`ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()`)}removeChild(...e){throw Error(`ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()`)}removeChildren(e,t){throw Error(`ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()`)}removeChildAt(e){throw Error(`ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()`)}getChildAt(e){throw Error(`ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()`)}setChildIndex(e,t){throw Error(`ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()`)}getChildIndex(e){throw Error(`ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()`)}addChildAt(e,t){throw Error(`ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()`)}swapChildren(e,t){throw Error(`ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()`)}reparentChild(...e){throw Error(`ParticleContainer.reparentChild() is not available with the particle container`)}reparentChildAt(e,t){throw Error(`ParticleContainer.reparentChildAt() is not available with the particle container`)}};wo.defaultOptions={dynamicProperties:{vertex:!1,position:!0,rotation:!1,uvs:!1,color:!1},roundPixels:!1};var To=wo;it.add(Da,Oa),t({x:-1,y:-1});var Eo=class extends o()(`antha-entity-event`){constructor(e){super({detail:e})}},Do=class extends Eo{},Oo=t({x:-1,y:-1});function ko(t){if(!t)return;let n={};return e(t).forEach(([t,r])=>{e(r).forEach(([e,r])=>{if(!r)return;let i=le(n,k.isString(r)?r:e,()=>({})),a=le(i,t,()=>[]);a.includes(e)||a.push(e)})}),n}var Ao=class{static entityKey=`BaseEntity`;static collidesWith;static collidesWithSet=new Set;static paramsShape;static assets;static paramsMap;static reverseParamsMap;static deserialize(e){let t=e?JSON.parse(e):void 0;return this.paramsShape?a(t,this.paramsShape):de.isUndefined(t),t}dispatch(e){this.entityStore?.listenTarget.dispatch(e)}isDestroyed=!1;entityDefinition;abortController=new AbortController;abortSignal=this.abortController.signal;hitbox;entityStore;params;pixi;hitboxSystem;getAsset;constructor(e){this.entityDefinition=this.constructor,this.entityStore=e.entityStore,this.params=e.params,this.pixi=e.pixi,this.hitboxSystem=e.hitboxSystem,this.state=e.state;let t=this.constructor.assets;this.getAsset=jo({assetLoader:e.entityStore.assetLoader,entityAssets:t})}render(e){}initInstance(){}state;async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot add entity through destroyed entity.`);return await this.entityStore.addEntity(e,...t)}destroy(){this.abortController.abort(),d(this).isDestroyed=!0}immediatelyDestroy(){this.abortController.abort(),d(this).isDestroyed=!0,this.entityStore?.removeEntity(this),this.dispatch(new Do({entityInstance:this})),delete this.entityStore,delete this.hitboxSystem,delete this.params}collide(e,t){}serialize(){return this.params?JSON.stringify(this.params):void 0}};function jo({assetLoader:e,entityAssets:t}){return!t||k.isEmpty(t)?{}:ne(t,(t,n)=>async()=>e.loadIndividualAsset({asset:n}))}var Mo=class extends Ao{view;async initInstance(){let{view:e,hitbox:t}=await this.createView();e?(this.view=e,this.pixi.stage.addChild(this.view)):(this.view=new To,this.view.visible=!1),t&&(this.hitbox=t,this.hitbox.userData=this,this.hitboxSystem.insert(this.hitbox)),this.wrapParamsInProxy()}constructor(e){super(e)}wrapParamsInProxy(){let t=this.constructor.paramsMap,n=this.constructor.reverseParamsMap,r=this.params;r&&t&&n&&(d(this).params=new Proxy(r,{set:(e,t,i,a)=>{if(t in r&&k.hasKey(n,t)){let e=n[t];this.hitbox&&e?.hitbox&&e.hitbox.forEach(e=>{this.hitbox[e]=i}),e?.view&&e.view.forEach(e=>{this.view[e]=i})}return Reflect.set(e,t,i,a)}}),e(this.params).forEach(([e,t])=>{this.params[e]=t}))}isInBounds(e={}){if(this.isDestroyed)throw Error(`Cannot check bounds on destroyed entity.`);return e.entirely?this.pixi.screen.containsRect(this.view.getBounds().rectangle):this.pixi.screen.intersects(this.view.getBounds().rectangle)}immediatelyDestroy(){this.view?.destroy({children:!0}),this.hitbox&&this.hitboxSystem.remove(this.hitbox),super.immediatelyDestroy(),delete this.view}};function No(e){return e.userData instanceof Ao?e.userData:void 0}function Po(e){return!!e.entityDefinition.collidesWith?.collidesWithSelf||e.entityDefinition.collidesWithSet.size>0}function Fo({entity:e,otherEntity:t}){return e.entityDefinition.collidesWith?.collidesWithSelf&&e.entityDefinition===t.entityDefinition||e.entityDefinition.collidesWithSet.has(t.entityDefinition)}function Io({firstEntity:e,secondEntity:t}){return Fo({entity:e,otherEntity:t})||Fo({entity:t,otherEntity:e})}function Lo({entity:e,otherEntity:t}){return Fo({entity:e,otherEntity:t})}function Ro(e){let t=new Ea;return t.a=e.b,t.aInB=e.bInA,t.b=e.a,t.bInA=e.aInB,t.overlap=e.overlap,t.overlapN.x=-e.overlapN.x,t.overlapN.y=-e.overlapN.y,t.overlapV.x=-e.overlapV.x,t.overlapV.y=-e.overlapV.y,t}function zo({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){return e.get(t)?.has(n)||e.get(n)?.has(t)}function Bo({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){let r=e.get(t);r?r.add(n):e.set(t,new WeakSet([n]))}var Vo=class extends Ta{checkedHitboxPairs;checkAll(...[e,t]){let n=this.checkedHitboxPairs;this.checkedHitboxPairs=new WeakMap;try{return this.all().some(n=>{let r=No(n);return(!r||Po(r))&&this.checkOne(n,e,t)})}finally{this.checkedHitboxPairs=n}}checkOne(...[e,t,n]){let r=No(e);return r&&!Po(r)?!1:super.checkOne(e,t,n)}checkCollision(...e){let[t,n]=e,r=this.checkedHitboxPairs;if(r&&zo({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n}))return!1;r&&Bo({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n});let i=No(t),a=No(n);return i&&a&&!Io({firstEntity:i,secondEntity:a})?!1:super.checkCollision(...e)}},Ho=t({entityKey:``,serializedParams:F(``,{alsoUndefined:!0})}),Uo=class{currentEntityInstances=new Set;isDestroyed=!1;entityInstanceMap=new Kt;pixi;hitboxSystem;entityKeyConstructorMap={};listenTarget=new te;state;assetLoader;constructor(e){this.pixi=e.pixi,this.assetLoader=e.assetLoader,this.hitboxSystem=e.customHitboxSystem||new Vo,this.state=e.state,e.preregisteredEntities&&this.registerEntities({entities:e.preregisteredEntities,clearPreviousRegistrations:!0})}registerEntities({clearPreviousRegistrations:e,entities:t}){e&&(this.entityKeyConstructorMap={}),t.forEach(e=>{this.entityKeyConstructorMap[e.entityKey]=e})}async updateAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed){t.immediatelyDestroy();return}await t.update(e),t.isDestroyed&&t.immediatelyDestroy()}this.hitboxSystem.update();let t=[];this.hitboxSystem.checkAll(e=>{let n=e.a.userData instanceof Ao?e.a.userData:void 0,r=e.b.userData instanceof Ao?e.b.userData:void 0;if(!n||!r||n.isDestroyed||r.isDestroyed)return;function i(e){e instanceof Promise&&t.push(e)}Lo({entity:n,otherEntity:r})&&i(n.collide(r,e)),Lo({entity:r,otherEntity:n})&&i(r.collide(n,Ro(e)))}),await Promise.all(t)}async renderAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed)return;await t.render(e)}}getEntities(e){return this.entityInstanceMap.getInstances(e)}removeEntity(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.delete(e),this.entityInstanceMap.remove(e),e instanceof Mo&&!e.isDestroyed&&(this.pixi.stage.removeChild(e.view),e.hitbox&&this.hitboxSystem.remove(e.hitbox))}async deserializeEntity(e,t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);let n=this.entityKeyConstructorMap[e];if(!n)throw Error(`No entity registered for key '${e}'`);return await this.addEntity(n,n.deserialize(t))}createSnapshot(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);return[...this.currentEntityInstances].filter(e=>!e.isDestroyed).map(e=>({entityKey:e.entityDefinition.entityKey,serializedParams:e.serialize()}))}hashEntities(){return Ur(this.createSnapshot())}async loadSnapshot(e){return de.isArray(e,`Entity snapshot must be an array.`),e.forEach((e,t)=>{a(e,Ho,{},`Invalid entity snapshot entry at index ${t}`)}),this.destroyAllEntities(),await b(e,async e=>await this.deserializeEntity(e.entityKey,e.serializedParams))}async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);e.entityKey in this.entityKeyConstructorMap||(this.entityKeyConstructorMap[e.entityKey]=e);let n=new e({entityStore:this,pixi:this.pixi,state:this.state,params:t[0],hitboxSystem:this.hitboxSystem});return await n.initInstance(),this.currentEntityInstances.add(n),this.entityInstanceMap.add(n),n}destroyAllEntities(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.forEach(e=>e.immediatelyDestroy())}destroy(){if(this.isDestroyed)throw Error(`Entity store is already destroyed.`);this.currentEntityInstances.forEach(e=>e.destroy()),d(this).isDestroyed=!0,this.listenTarget.destroy(),this.currentEntityInstances.clear(),this.entityInstanceMap.destroy(),delete this.pixi,delete this.hitboxSystem,delete this.listenTarget}};function Wo({state:e,options:t}){return!e.pixi?.pixiApplication||!e.assetLoader?!1:(e.entityStore||=new Uo(u({pixi:e.pixi.pixiApplication,state:e,assetLoader:e.assetLoader},t)),!0)}function Go(t={}){let n=new Set;function r(t){return n=>(n.assets&&e(n.assets).forEach(([e,t])=>{t.assetName=[n.key,e].join(`:`)}),i(t,n))}function i(e,{collidesWith:t,key:r,paramsShape:i,paramsMap:a,assets:o}){if(n.has(r))throw Error(`Entity key '${r}' has already been attached to an entity class.`);n.add(r);let s={[r]:class extends e{static collidesWith=t;static collidesWithSet=new Set(t?.collidesWithOtherEntities);static entityKey=r;static paramsShape=i;static assets=o||{};static paramsMap=a;static reverseParamsMap=ko(a)}};return E.isDefined(s[r])}return{updateEntitiesMod:Ne({modName:`antha-entity-2d-update`,initState:{showHitboxDebug:!!t.debug,disableEntityRender:!!t.disableEntityRender,disableEntityUpdate:!!t.disableEntityUpdate},cleanup({state:e}){e.entityStore?.destroy()},trigger:t.updateTrigger,async execute(e){if(Wo({options:t,state:e.state}))e.state.entityStore&&(e.state.disableEntityUpdate||await e.state.entityStore.updateAllEntities(e),e.state.disableEntityRender||await e.state.entityStore.renderAllEntities(e));else return De;return e.state.showHitboxDebug?T`
                      <canvas class="hitbox-debug-canvas"></canvas>
                  `:void 0}}),defineEntity:r(Mo),defineLogicEntity:r(Ao),entityKeys:n}}function Ko({assetName:e=`Audio files`,audioPlayer:t,files:n,serial:r}){return je({assetName:e,maxProgress:n.length,async load({incrementProgressCallback:e}){return await t.loadFiles(n,{progressCallback(){e()},serial:!!r}),{value:void 0}}})}async function qo({assetLoader:e,assets:t,audio:n,entities:r},i){return await e.bulkLoadAssets([...n?[Ko(n)]:[],...t||[],...(r||[]).flatMap(e=>be(e.assets))],i)}function Jo(e){return Ne({modName:`antha-fps`,trigger:{durationMs:e?.fpsUpdateIntervalMs||500,executeImmediately:!0},initState:{debugFps:!!e?.debugFps,hideFps:!!e?.hideFps},execute({state:e,msSinceLastExecute:t,ticksSinceLastExecute:n}){let r=le(e,`fpsStutters`,()=>[]),i=t/1e3,a=i>0?Ht(n/i,{digits:1}):0;e.debugFps&&a>0&&a<55&&(r.push(a),r.length>10&&r.splice(0,r.length-10));let o=[!e.hideFps&&T`
                        <div
                            title="Ticks Per Second"
                            style=${A`
                                ${vn(fe.asTheme.colors[`vira-pink-foreground-body`])}
                                padding: 1px 3px;
                            `}
                        >
                            ${Math.round(a).toFixed(0)} FPS
                        </div>
                    `,e.debugFps&&r.length>0&&T`
                        <div
                            title="FPS Stutters"
                            style=${A`
                                ${vn(fe.asTheme.colors[`vira-yellow-foreground-body`])}
                                padding: 1px 3px;
                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            ${r.map(e=>T`
                                    <span>${Math.round(e)}</span>
                                `)}
                        </div>
                    `].filter(k.isTruthy);if(o.length)return T`
                    <div
                        style=${A`
                            position: absolute;
                            top: 0;
                            left: 0;
                            font-family: monospace;
                            font-size: 14px;
                            pointer-events: none;
                            z-index: ${999999999999};
                        `}
                    >
                        ${o}
                    </div>
                `}})}var Yo={background:`black`,antialias:!0,powerPreference:`high-performance`};function Xo(e){let t={...Yo,canvas:void 0,...e?.pixiOptions};return Ne({modName:`antha-graphics-2d`,cleanup({state:e}){e.pixi?.resizeObserver?.disconnect(),e.pixi?.pixiApplication?.destroy(!0)},async execute({hostElement:n,state:r}){let i=le(r,`pixi`,()=>({})),a=t.canvas||i.canvas;if(!i.pixiApplication&&a){let e=new Ra;await e.init({resizeTo:n,...t,canvas:a}),i.pixiApplication=e,i.resizeObserver=ke(n,()=>{e.queueResize()}).resizeObserver}return t.canvas?void 0:T`
                      <div
                          style=${A`
                              box-sizing: border-box;
                              z-index: -1;
                              position: absolute;
                              inset: 0;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              overflow: hidden;
                              container-type: size;
                              ${s(e?.extraCanvasWrapperStyles)}
                          `}
                      >
                          <canvas
                              style=${A`
                                  box-sizing: border-box;

                                  width: 100%;
                                  height: 100%;
                                  ${s(e?.extraCanvasStyles)}
                              `}
                              id="antha-graphics-2d"
                              ${_n(e=>{de.instanceOf(e,HTMLCanvasElement),i.canvas||=e})}
                          ></canvas>
                      </div>
                  `}})}function Zo({canvasBounds:e,clientPoint:t,virtualViewport:n}){if(e.width&&e.height)return{x:(t.x-e.left)/e.width*n.width,y:(t.y-e.top)/e.height*n.height}}function Qo(){return{autoDensity:!0,resolution:globalThis.devicePixelRatio||1}}function $o({previousVirtualViewport:e,virtualViewport:t}){return e!=null&&Math.abs(e.height-t.height)<.01&&Math.abs(e.scale-t.scale)<1e-4&&e.width===t.width}function es({isFixedViewport:e,screenSize:t,virtualViewport:n}){let r=Math.round((t.width-n.width*n.scale)/2),i=Math.round((t.height-n.height*n.scale)/2);return{height:e?`${n.height}px`:`100%`,transform:e?`translate(${r/n.scale}px, ${i/n.scale}px)`:``,width:e?`${n.width}px`:`100%`,zoom:String(n.scale)}}function ts(e){return[e.style.height,e.style.transform,e.style.width,e.style.zoom].join(`;`)}var ns=new WeakMap;function rs({hostElement:e,isFixedViewport:t}){if(!t)return e.getBoundingClientRect();let n=e.getRootNode();return(n instanceof ShadowRoot?n.host:e.parentElement||e).getBoundingClientRect()}function is({hostElement:e}){e.style.removeProperty(`height`),e.style.removeProperty(`transform`),e.style.removeProperty(`width`),e.style.removeProperty(`zoom`),ns.delete(e)}function as({virtualHeight:e,virtualWidth:t}){let n=!!e&&!!t;return Ne({modName:`antha-virtual-viewport`,cleanup({hostElement:e,state:t}){is({hostElement:e}),t.virtualViewport=void 0},execute({hostElement:r,state:i}){let a=rs({hostElement:r,isFixedViewport:n}),o=Ce({screenSize:a,virtualHeight:e,virtualWidth:t});if(!o)return;let s=es({isFixedViewport:n,screenSize:a,virtualViewport:o}),c=!$o({previousVirtualViewport:i.virtualViewport,virtualViewport:o})||ns.get(r)?.createdStyles!==JSON.stringify(s)||ns.get(r)?.readStyles!==ts(r);c&&(Object.assign(r.style,s),ns.set(r,{createdStyles:JSON.stringify(s),readStyles:ts(r)}),i.virtualViewport=o);let l=i.pixi?.pixiApplication;l&&(c||l.renderer.resolution!==(globalThis.devicePixelRatio||1)*o.scale||l.stage.scale.x!==1||l.stage.scale.y!==1)&&(l.renderer.resolution=(globalThis.devicePixelRatio||1)*o.scale,l.resize(),l.stage.scale.set(1))}})}var os=function(e){return e.Music=`music`,e.Effects=`effects`,e}({}),ss=function(e){return e.GameMusic=`game-music`,e}({});function cs({audioChannel:e,fileName:t,volume:n}){return{audioChannel:e,sources:zn(document.baseURI,`./audio/${t}`).href,volume:n}}var ls={"game-music":cs({audioChannel:`music`,fileName:`game-music.ogg`,volume:.9})},us=be(ls),ds={small:{radius:16,mashHp:120,value:.6},medium:{radius:22,mashHp:200,value:1},large:{radius:30,mashHp:340,value:1.8},king:{radius:46,mashHp:1200,value:6}},fs={stripeSpacingPx:40},ps={starting:100,max:100},ms={perfect:{score:100,satisfaction:2},incomplete:{score:0,satisfaction:-5},raw:{score:0,satisfaction:-15}},hs={breakMs:1e4,waves:[{potatoCount:8,chuteShare:0,seagullCount:0,bossCount:0,spawnIntervalMs:3500,speedPxPerMs:.07,sizeWeights:{small:.5,medium:.5,large:0}},{potatoCount:10,chuteShare:0,seagullCount:1,bossCount:0,spawnIntervalMs:2800,speedPxPerMs:.08,sizeWeights:{small:.3,medium:.6,large:.1}},{potatoCount:14,chuteShare:.15,seagullCount:2,bossCount:0,spawnIntervalMs:2200,speedPxPerMs:.09,sizeWeights:{small:.2,medium:.6,large:.2}},{potatoCount:18,chuteShare:.2,seagullCount:3,bossCount:0,spawnIntervalMs:1700,speedPxPerMs:.1,sizeWeights:{small:.1,medium:.5,large:.4}},{potatoCount:24,chuteShare:.25,seagullCount:4,bossCount:1,spawnIntervalMs:1300,speedPxPerMs:.11,sizeWeights:{small:0,medium:.5,large:.5}}]},gs={dropMs:1500,startScale:2},_s={hp:60,flySpeedPxPerMs:.16,walkSpeedPxPerMs:.09,grabRadiusPx:24,stolenSatisfaction:-10,bountyCoins:10,flyChance:.5};function vs(e){return hs.waves.reduce((e,t)=>e+t.potatoCount+t.bossCount,0)*e}var ys={radius:30},bs={knife:{damage:4,rangePx:220,cooldownMs:250},boiler:{damage:6,rangePx:140,cooldownMs:1200},masher:{damage:40,rangePx:140,cooldownMs:1e3},microwave:{damage:50,rangePx:120,cooldownMs:700},"cricket-trap":{damage:0,rangePx:170,cooldownMs:6e3},swiper:{damage:0,rangePx:110,cooldownMs:0}},xs={cutMultiplier:1.5,softMasherMultiplier:2},Ss={hitNumberMs:600,hitNumberRisePx:30,continuousHitIntervalMs:300,iconSizePx:12,tiers:[{minMultiplier:3,color:`#ff4a1c`,fontSize:36,suffix:` ×3 SMASH!`,pop:!0},{minMultiplier:2,color:`#ff9a1c`,fontSize:28,suffix:` ×2`,pop:!1},{minMultiplier:1.5,color:`#ffe135`,fontSize:24,suffix:` ×1.5`,pop:!1},{minMultiplier:0,color:`#ffffff`,fontSize:20,suffix:``,pop:!1}]},Cs={servingPopupMs:1200,coinPopupMs:1600,coinPopupRisePx:50,coinPopupStaggerPx:64,coinPopupStaggerSlots:3,coinPopupOffsetPx:40},ws={clickSlopPx:14},Ts={flashMs:150,splashMs:350},Es={volume:.35},H={startingCoins:150,coinEventsKept:8,towerCost:{knife:40,boiler:60,masher:80,microwave:50,"cricket-trap":60,swiper:70},servingCoins:{perfect:20,incomplete:5,raw:0}},Ds={byWave:[{maxOpen:1,intervalMs:12e3,lifetimeMs:35e3,dishes:[`buttered-mash`,`bangers-and-mash`]},{maxOpen:2,intervalMs:1e4,lifetimeMs:32e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`]},{maxOpen:2,intervalMs:9e3,lifetimeMs:3e4,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:8e3,lifetimeMs:28e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:7e3,lifetimeMs:25e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]}],firstOrderDelayMs:3e3,fulfilled:{score:150,coins:30,satisfaction:5},expiredSatisfaction:-12},Os=`colcannon-fodder-volume`,ks={music:.6,effects:.8};function As(e,t){return typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t}function js(){try{let e=globalThis.localStorage.getItem(Os);if(e==null)return{...ks};let t=JSON.parse(e);return{music:As(t?.music,ks.music),effects:As(t?.effects,ks.effects)}}catch{return{...ks}}}var Ms;function Ns(){return Ms??=js(),Ms}function Ps(e,t){Ms={...Ns(),[e]:As(t,ks[e])};try{globalThis.localStorage.setItem(Os,JSON.stringify(Ms))}catch{}}var U=function(e){return e.Chop=`chop`,e.Boil=`boil`,e.Squish=`squish`,e.ServePerfect=`serve-perfect`,e.ServeBad=`serve-bad`,e.ServeRaw=`serve-raw`,e.Build=`build`,e.Squawk=`squawk`,e.BossArrives=`boss-arrives`,e}({}),Fs=.001,Is,Ls,Rs=!1;function zs(){if(typeof AudioContext<`u`)return(!Is||!Ls)&&(Is=new AudioContext,Ls=Is.createGain(),Ls.gain.value=Es.volume,Ls.connect(Is.destination)),Ls.gain.value=Rs?0:Ns().effects*Es.volume,Is.state===`suspended`&&Is.resume().catch(()=>{}),{context:Is,master:Ls}}function Bs(){return Rs}function Vs(e){Rs=e}function Hs(e,t){let{context:n,master:r}=e,i=n.currentTime+t.startSec,a=i+t.durationSec,o=n.createOscillator(),s=n.createGain();if(o.type=t.type,o.frequency.setValueAtTime(t.startHz,i),t.endHz!=null&&o.frequency.exponentialRampToValueAtTime(t.endHz,a),s.gain.setValueAtTime(t.startGain,i),s.gain.exponentialRampToValueAtTime(Fs,a),o.connect(s),t.lowpassHz==null)s.connect(r);else{let e=n.createBiquadFilter();e.type=`lowpass`,e.frequency.value=t.lowpassHz,s.connect(e),e.connect(r)}o.start(i),o.stop(a)}function Us(e){let{context:t,master:n}=e,r=.04,i=Math.ceil(t.sampleRate*r),a=t.createBuffer(1,i,t.sampleRate),o=a.getChannelData(0),s=crypto.getRandomValues(new Uint16Array(i));for(let e=0;e<i;e++)o[e]=(s[e]??0)/32768-1;let c=t.createBufferSource();c.buffer=a;let l=t.createBiquadFilter();l.type=`bandpass`,l.frequency.value=3e3;let u=t.createGain(),d=t.currentTime;u.gain.setValueAtTime(1,d),u.gain.exponentialRampToValueAtTime(Fs,d+r),c.connect(l),l.connect(u),u.connect(n),c.start(d),c.stop(d+r)}var Ws={boil:[{type:`sine`,startHz:300,endHz:700,startSec:0,durationSec:.12,startGain:.6}],squish:[{type:`sawtooth`,startHz:180,endHz:70,startSec:0,durationSec:.16,startGain:.8,lowpassHz:900}],"serve-perfect":[{type:`sine`,startHz:660,startSec:0,durationSec:.09,startGain:.7},{type:`sine`,startHz:880,startSec:.09,durationSec:.09,startGain:.7}],"serve-bad":[{type:`square`,startHz:220,startSec:0,durationSec:.15,startGain:.4}],"serve-raw":[{type:`sawtooth`,startHz:140,endHz:90,startSec:0,durationSec:.25,startGain:.6}],squawk:[{type:`square`,startHz:900,endHz:600,startSec:0,durationSec:.12,startGain:.4}],"boss-arrives":[{type:`sawtooth`,startHz:110,startSec:0,durationSec:.25,startGain:.6},{type:`sawtooth`,startHz:82,startSec:.25,durationSec:.25,startGain:.6}],build:[{type:`triangle`,startHz:520,startSec:0,durationSec:.08,startGain:.6}]};function Gs(e){if(Rs)return;let t=zs();if(t){if(e===`chop`){Us(t);return}Ws[e].forEach(e=>{Hs(t,e)})}}function Ks(e){return e.waypoints.slice(1).map((t,n)=>({start:E.isDefined(e.waypoints[n]),end:t}))}function qs(e){let t=0;for(let{start:n,end:r}of Ks(e))t+=Math.hypot(r.x-n.x,r.y-n.y);return t}function Js(e,t){let n=Math.max(0,t);for(let{start:t,end:r}of Ks(e)){let e=Math.hypot(r.x-t.x,r.y-t.y);if(n<=e){let i=e?n/e:0;return{x:t.x+(r.x-t.x)*i,y:t.y+(r.y-t.y)*i}}n-=e}let r=E.isDefined(e.waypoints.at(-1));return{x:r.x,y:r.y}}function Ys(e,t){let n=Ks(e).filter(({start:e,end:t})=>e.x!==t.x||e.y!==t.y),r=Math.max(0,t),i=n[0];for(let e of n){i=e;let t=Math.hypot(e.end.x-e.start.x,e.end.y-e.start.y);if(r<=t)break;r-=t}if(!i)return{x:1,y:0};let a=Math.hypot(i.end.x-i.start.x,i.end.y-i.start.y);return{x:(i.end.x-i.start.x)/a,y:(i.end.y-i.start.y)/a}}function Xs(e,t){let n=1/0;for(let{start:r,end:i}of Ks(e)){let e=i.x-r.x,a=i.y-r.y,o=e*e+a*a,s=o?Math.min(1,Math.max(0,((t.x-r.x)*e+(t.y-r.y)*a)/o)):0,c=r.x+e*s,l=r.y+a*s;n=Math.min(n,Math.hypot(t.x-c,t.y-l))}return n}function Zs(e,t){let n=e.paths.find(e=>e.pathId===t);if(!n)throw Error(`No path '${t}' in level.`);return n}var Qs=90,$s=220;function ec({levelId:e,name:t,description:n,waypoints:r,restaurantCenter:i,chuteFractions:a=[]}){let o={...i,sizePx:$s},s={pathId:`west`,ownerSlot:0,waypoints:[...r,{x:o.x-o.sizePx/2,y:o.y}],widthPx:Qs},c=qs(s);return{levelId:e,name:t,description:n,paths:[a.length?{...s,chutes:a.map(e=>({distancePx:Math.round(c*e)}))}:s],restaurant:o}}var tc=ec({levelId:`winding-way`,name:`Winding Way`,description:`The classic.`,waypoints:[{x:0,y:400},{x:420,y:400},{x:420,y:820},{x:700,y:820},{x:700,y:540}],restaurantCenter:{x:960,y:540}}),nc=[tc,ec({levelId:`double-back`,name:`Double Back`,description:`Two long straights: Knife country.`,waypoints:[{x:0,y:380},{x:1450,y:380},{x:1450,y:620},{x:250,y:620},{x:250,y:780}],restaurantCenter:{x:1450,y:780},chuteFractions:[.55]}),ec({levelId:`long-haul`,name:`The Long Haul`,description:`A big loop with a chute dropping potatoes mid-belt.`,waypoints:[{x:0,y:380},{x:1500,y:380},{x:1500,y:840},{x:150,y:840},{x:150,y:560}],restaurantCenter:{x:1260,y:560},chuteFractions:[.5]})],rc=tc;function ic(e){return nc.find(t=>t.levelId===e)??rc}var W=function(e){return e.Ready=`ready`,e.Playing=`playing`,e.Won=`won`,e.Lost=`lost`,e}({}),G=function(e){return e.Perfect=`perfect`,e.Incomplete=`incomplete`,e.Raw=`raw`,e}({}),ac=E.isDefined(hs.waves[0]);function oc(e=rc.levelId){return{levelId:e,status:`playing`,paused:!1,satisfaction:ps.starting,coins:H.startingCoins,coinsEarned:0,coinEvents:[],nextCoinEventId:1,scoreBySlot:{0:0},potatoesSpawned:0,potatoesServed:0,servingCounts:{perfect:0,incomplete:0,raw:0},lastServing:void 0,elapsedMs:0,potatoesPerRun:vs(1),waveIndex:0,wavePhase:`break`,breakRemainingMs:hs.breakMs,spawnedInWave:0,beltSpeedPxPerMs:ac.speedPxPerMs,orders:[],nextOrderId:1,msUntilNextOrder:Ds.firstOrderDelayMs,lastOrderEvent:void 0,nextPotatoId:1,nextTowerId:1,potatoesStolen:0,seagullsSpawnedInWave:0,msUntilNextSeagull:0,lastSteal:void 0,sendBackStreak:0,recentQualities:[],lastBossSpawnAtMs:-1}}var sc={lineHalfWidthPx:14,lineColor:`#e0e0e0`,lineAlpha:.25,lineWidthPx:4,rotateStepDeg:15},K={microwaveQualityPerSecond:40,microwaveDamagePerSecond:45,microwaveConeHalfAngleDeg:25,microwaveFlashMs:200,prestigeWindow:10,minOrderQuality:50,mashChampStars:3,maxStars:5,rubberyMaxAlpha:.6,rubberyStep:10},cc={rotationMs:5e3,pushBackPx:120,debounceMs:600,armHalfWidthPx:8},lc={perUse:{knife:.45,boiler:2.5,masher:2,"cricket-trap":12},perSecond:{microwave:1.8,swiper:1.1},wornEffectiveness:.5,serviceCostShare:.3,minServiceCost:5,maxWear:100,serviceVerb:{knife:`Sharpen`,boiler:`Refill`,masher:`Oil`,microwave:`Clean`,"cricket-trap":`Restock`,swiper:`Oil`}},{defineEntity:uc,entityKeys:dc,updateEntitiesMod:fc,defineLogicEntity:pc}=Go({disableEntityUpdate:!0}),mc={maxLevel:3,costMultiplierByLevel:{2:.75,3:1.25},damageByLevel:{1:1,2:1.4,3:1.9},rangeByLevel:{1:1,2:1.15,3:1.3},cooldownByLevel:{1:1,2:.85,3:.7},sellRefund:.5};function hc(e){return e>=lc.maxWear?lc.wornEffectiveness:1}function gc(e){return Math.max(lc.minServiceCost,Math.round(H.towerCost[e]*lc.serviceCostShare))}function _c({wear:e,amount:t}){return Math.min(lc.maxWear,e+t)}function vc(e){return lc.perUse[e]??0}function yc(e){return lc.perSecond[e]??0}function bc(e){return lc.serviceVerb[e]}var q=function(e){return e.Knife=`knife`,e.Boiler=`boiler`,e.Masher=`masher`,e.Microwave=`microwave`,e.CricketTrap=`cricket-trap`,e.Swiper=`swiper`,e}({}),J={knife:{towerType:`knife`,label:`Knife`,glyph:`K`,hotkey:`1`,color:`#b8c4cc`,appliesEffect:`cut`,areaOfEffect:!1,behavior:`line`,...bs.knife},boiler:{towerType:`boiler`,label:`Boiling Pot`,glyph:`B`,hotkey:`2`,color:`#3a8ee6`,appliesEffect:`cooked`,areaOfEffect:!0,behavior:`mash`,...bs.boiler},masher:{towerType:`masher`,label:`Masher`,glyph:`M`,hotkey:`3`,color:`#e6a23a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`mash`,...bs.masher},microwave:{towerType:`microwave`,label:`Microwave`,glyph:`µ`,hotkey:`4`,color:`#ab47bc`,appliesEffect:void 0,areaOfEffect:!1,behavior:`cone`,...bs.microwave},"cricket-trap":{towerType:`cricket-trap`,label:`Cricket Trap`,glyph:`C`,hotkey:`5`,color:`#8d6e63`,appliesEffect:void 0,areaOfEffect:!1,behavior:`gull-trap`,...bs[`cricket-trap`]},swiper:{towerType:`swiper`,label:`Swiper`,glyph:`S`,hotkey:`6`,color:`#26a69a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`swipe`,...bs.swiper}};function xc(e){return Math.min(mc.maxLevel,Math.max(1,Math.round(e)))}function Sc(e){return mc.damageByLevel[xc(e)]}function Cc(e,t,n=0){let{damage:r,rangePx:i,cooldownMs:a}=J[e],o=xc(t),s=hc(n),c=J[e].behavior===`gull-trap`?s:1;return{damage:Math.round(r*mc.damageByLevel[o]*s),rangePx:Math.round(i*mc.rangeByLevel[o]),cooldownMs:a*mc.cooldownByLevel[o]/c}}function wc(e,t){return Math.round(H.towerCost[e]*mc.costMultiplierByLevel[t])}function Tc(e,t){let n=H.towerCost[e];for(let r=2;r<=xc(t);r++)n+=wc(e,r);return Math.round(n*mc.sellRefund)}function Ec(e,t){return(e.cut?xs.cutMultiplier:1)*(t===q.Masher&&e.cooked?xs.softMasherMultiplier:1)}function Dc(e,t,n={}){return Cc(t,n.level??1,n.wear??0).damage*Ec(e,t)}function Oc(e,t,n={}){e.mashHp=Math.max(0,e.mashHp-Dc(e,t,n));let r=J[t].appliesEffect;r&&(e[r]=!0)}function kc(e){return 1-e.mashHp/e.maxMashHp}var Ac={penaltyMultiplier:3,baseHp:ds.king.mashHp,hpGrowthPerBoss:.25,bannerMs:3e3,meter:{width:90,height:10}};function jc(e){return Ac.baseHp*(1+Ac.hpGrowthPerBoss*e)}var Mc={passSlots:4,queueSpacingPx:50,waiterIntervalMs:2e3,heatLampGraceMs:4e3,heatLampQualityPerSecond:2,angerStep:3,maxSendBacks:2};function Nc({next:e,aheadDistances:t,spacingPx:n,endPx:r}){return t.length?Math.min(e,Math.min(...t)-n):Math.min(e,r)}function Pc({chutes:e,chuteShare:t,roll:n}){if(!(!e?.length||n>=t))return e[Math.min(e.length-1,Math.floor(n/t*e.length))]}function Fc({dropInMs:e,msSinceLastExecute:t}){return Math.max(0,e-t)}function Ic({dropInMs:e,dropMs:t,startScale:n}){return 1+(n-1)*Math.min(1,Math.max(0,e/t))}var Y=function(e){return e.Butter=`butter`,e.Scallions=`scallions`,e.Cabbage=`cabbage`,e.Gravy=`gravy`,e}({}),Lc={butter:{topping:`butter`,label:`Butter`,hotkey:`q`,color:`#ffd84a`},scallions:{topping:`scallions`,label:`Scallions`,hotkey:`w`,color:`#5cb85c`},cabbage:{topping:`cabbage`,label:`Cabbage`,hotkey:`e`,color:`#2e7d32`},gravy:{topping:`gravy`,label:`Gravy`,hotkey:`r`,color:`#7b4a1e`}};function Rc(){return{butter:!1,scallions:!1,cabbage:!1,gravy:!1}}var zc=function(e){return e.ButteredMash=`buttered-mash`,e.Champ=`champ`,e.Colcannon=`colcannon`,e.BangersAndMash=`bangers-and-mash`,e}({}),Bc={"buttered-mash":{dish:`buttered-mash`,label:`Buttered Mash`,toppings:[Y.Butter]},champ:{dish:`champ`,label:`Champ`,toppings:[Y.Scallions,Y.Butter]},colcannon:{dish:`colcannon`,label:`Colcannon`,toppings:[Y.Cabbage,Y.Butter]},"bangers-and-mash":{dish:`bangers-and-mash`,label:`Bangers & Mash`,toppings:[Y.Gravy]}},Vc=Object.values(Y);function Hc(e){return{[Y.Butter]:e[Y.Butter],[Y.Scallions]:e[Y.Scallions],[Y.Cabbage]:e[Y.Cabbage],[Y.Gravy]:e[Y.Gravy]}}function Uc(e){return Object.values(zc).find(t=>{let n=Bc[t].toppings;return Vc.every(t=>e[t]===n.includes(t))})}function Wc(e,t){return!e.served&&!e[t]}function Gc(e,t){for(e.push(t);e.length>K.prestigeWindow;)e.shift()}function Kc(e){if(!e.length)return K.maxStars;let t=e.reduce((e,t)=>e+t,0)/e.length;return Math.min(K.maxStars,Math.round(t/20*2)/2)}function qc(e){let t=Math.floor(e),n=+(e-t>=.5);return`★`.repeat(t)+(n?`½`:``)+`☆`.repeat(K.maxStars-t-n)}function Jc(e,t){e.coins+=t.amount,t.amount>0&&(e.coinsEarned+=t.amount),e.coinEvents.push({id:e.nextCoinEventId,atMs:e.elapsedMs,amount:t.amount,reason:t.reason,x:t.x,y:t.y}),e.nextCoinEventId+=1,e.coinEvents.length>H.coinEventsKept&&e.coinEvents.splice(0,e.coinEvents.length-H.coinEventsKept)}function Yc({value:e,quality:t}){let n=`Perfect mash`,r=Object.entries(ds).find(([,t])=>t.value===e);return r&&e!==ds.medium.value&&(n+=` · ${r[0]} ×${e}`),t<100&&(n+=` · quality ${Math.round(t)}%`),n}function Xc(e){let{restaurant:t}=ic(e.levelId);return{x:t.x,y:t.y}}function Zc(e){return e.mashHp<=0?G.Perfect:!e.cut&&!e.cooked&&e.mashHp>=e.maxMashHp?G.Raw:G.Incomplete}function Qc(e,t){return e===G.Incomplete?Math.min(ms.incomplete.satisfaction,Math.round(ms.raw.satisfaction*(1-kc(t)))):ms[e].satisfaction}function $c(e,t){if(t.quality<K.minOrderQuality)return;let n=Uc(t.toppings),r=e.orders.findIndex(e=>e.dish===n),i=e.orders[r];if(!n||!i)return;e.orders.splice(r,1);let a=Math.round(Ds.fulfilled.score*t.value),o=Math.round(Ds.fulfilled.coins*t.value);e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+a,Jc(e,{amount:o,reason:`Order: ${Bc[n].label}`,...Xc(e)});let s=Math.min(ps.max,Math.max(0,e.satisfaction+Ds.fulfilled.satisfaction));e.lastOrderEvent={kind:`fulfilled`,dish:n,atMs:e.elapsedMs,scoreDelta:a,satisfactionDelta:s-e.satisfaction},e.satisfaction=s}function el(e){return e.satisfaction<=0?e.status=W.Lost:e.potatoesServed+e.potatoesStolen>=e.potatoesPerRun&&(e.status=W.Won),e.status}function tl(e){if(e.status!==W.Playing)return;e.potatoesStolen+=1;let t=Math.min(ps.max,Math.max(0,e.satisfaction+_s.stolenSatisfaction));e.lastSteal={atMs:e.elapsedMs,satisfactionDelta:t-e.satisfaction},e.satisfaction=t,el(e)}function nl(e,t){let n=Zc(t.processing);if(e.status!==W.Playing)return{result:n,sentBack:!1};let r=n===G.Perfect,i=!r&&t.timesSentBack<Mc.maxSendBacks,a=t.quality/100,o=r?Math.round(ms.perfect.score*t.value*a):ms[n].score,s=r?Math.round(H.servingCoins.perfect*t.value*a):H.servingCoins[n];r&&Gc(e.recentQualities,t.quality);let c=r?Qc(n,t.processing):(Qc(n,t.processing)-Mc.angerStep*e.sendBackStreak)*(t.penaltyMultiplier??1);r?e.sendBackStreak=0:e.sendBackStreak+=1,i||(e.potatoesServed+=1,e.servingCounts[n]+=1,e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+o),Jc(e,{amount:i?0:s,reason:i?`Sent back · no pay`:r?Yc(t):`Eaten anyway`,...Xc(e)});let l=Math.min(ps.max,Math.max(0,e.satisfaction+c)),u=l-e.satisfaction;e.satisfaction=l,e.lastServing={result:n,servedAtMs:e.elapsedMs,scoreDelta:i?0:o,satisfactionDelta:u,progress:kc(t.processing),sentBack:i};let d=el(e);return r&&d===W.Playing&&$c(e,t),{result:n,sentBack:i}}var rl=function(e){return e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e.King=`king`,e}({}),il=[`small`,`medium`,`large`];function al(e,t){let n=t;for(let t of il)if(n-=e[t],n<0&&e[t]>0)return t;return il.findLast(t=>e[t]>0)??`medium`}var X={raw:{fill:`#c8a165`,stroke:`#7a5a30`},boiled:{fill:`#f3e3a1`,stroke:`#c9a35a`},glue:{fill:`#d9c08a`,stroke:`#a08850`},mashedCooked:{fill:`#fff0b8`,stroke:`#d8c070`},perfect:{fill:`#fff4c2`,stroke:`#d8c070`},meterBackground:`rgba(0,0,0,0.6)`,meterFill:`#7CFC00`,highlight:`#ffffff`,butterStroke:`#e0b000`,scallionLine:Lc[Y.Scallions].color,cabbageLeaf:Lc[Y.Cabbage].color,gravyPool:Lc[Y.Gravy].color,sliceLine:`#5a3d1e`,steam:`#ffffff`,rubbery:`#9e9e9e`,crown:{fill:`#ffd700`,stroke:`#b8860b`},bladeStroke:`#c0c8d0`,bladeHighlight:`#ffffff`,softDrop:`#3aa0ff`},ol=[{x:-8,y:-5},{x:6,y:4},{x:10,y:-7}],sl={width:40,height:7},cl=14;function ll({graphics:e,processing:t,radius:n,toppings:r,quality:i=100,meter:a=sl,crown:o=!1}){let s=kc(t);if(e.clear(),s>0&&s<1&&(e.rect(-a.width/2,-n-cl,a.width,a.height).fill({color:X.meterBackground}),e.rect(-a.width/2,-n-cl,a.width*s,a.height).fill({color:X.meterFill}),dl({graphics:e,processing:t,radius:n,meterWidth:a.width})),s>=.5){let a=s>=1?X.perfect:t.cooked?X.mashedCooked:X.glue,c=[{x:-n*.45,y:0},{x:n*.45,y:0},{x:0,y:-n*.35}];for(let t of c)e.circle(t.x,t.y,n*.8).fill({color:a.fill});for(let t of c)e.circle(t.x,t.y,n*.8).stroke({color:a.stroke,width:2});return s>=1&&e.ellipse(-n*.25,-n*.3,n*.35,n*.2).fill({color:X.highlight,alpha:.7}),ml({graphics:e,radius:n,quality:i,blob:!0}),fl(e,n,r),o&&ul(e,n),e}let c=t.cooked?X.boiled:X.raw;if(e.ellipse(0,0,n*1.2,n*.9).fill({color:c.fill}).stroke({color:c.stroke,width:3}),t.cooked)e.circle(-6,-n-6,4).fill({color:X.steam,alpha:.7}),e.circle(6,-n-12,4).fill({color:X.steam,alpha:.7});else for(let t of ol)e.circle(t.x,t.y,3).fill({color:X.raw.stroke});if(t.cut)for(let t of[-n*.4,n*.4])e.moveTo(t,-n*.9).lineTo(t,n*.9).stroke({color:X.sliceLine,width:3});return ml({graphics:e,radius:n,quality:i,blob:!1}),fl(e,n,r),o&&ul(e,n),e}function ul(e,t){let n=t*.6,r=-t*.75,i=t*.6,a=t*.25,o=[-n,r,-n,r-i];for(let e=1;e<5;e++){let t=-n+e*2*n/4;o.push(t-n/4,r-a,t,r-i)}o.push(n,r),e.poly(o).fill({color:X.crown.fill}).stroke({color:X.crown.stroke,width:3})}function dl({graphics:e,processing:t,radius:n,meterWidth:r}){let i=Ss.iconSizePx,a=-n-cl-i-3,o=-r/2;t.cut&&(e.moveTo(o+1,a+i-1).lineTo(o+i-1,a+1).stroke({color:X.bladeStroke,width:4}),e.moveTo(o+2,a+i-3).lineTo(o+i-3,a+2).stroke({color:X.bladeHighlight,width:1.5}),o+=i+4),t.cooked&&(e.circle(o+i/2,a+i*.68,i*.32).fill({color:X.softDrop}),e.poly([o+i/2,a,o+i*.2,a+i*.62,o+i*.8,a+i*.62]).fill({color:X.softDrop}))}function fl(e,t,n){if(n[Y.Gravy]&&e.ellipse(0,-t*.1,t*.7,t*.35).fill({color:X.gravyPool,alpha:.9}),n[Y.Butter]&&e.rect(-6,-t*.45-6,12,12).fill({color:Lc[Y.Butter].color}).stroke({color:X.butterStroke,width:2}),n[Y.Scallions])for(let n of[-.6,0,.6]){let r=Math.sin(n)*t*.5,i=-t*.6+(1-Math.cos(n))*t*.3;e.moveTo(r,i).lineTo(r+Math.sin(n)*10,i-Math.cos(n)*10).stroke({color:X.scallionLine,width:4})}if(n[Y.Cabbage])for(let n of[{x:-t*.4,y:t*.1},{x:t*.35,y:t*.2}])e.ellipse(n.x,n.y,10,6).fill({color:X.cabbageLeaf})}function pl(e){return Math.round(e/K.rubberyStep)*K.rubberyStep}function ml({graphics:e,radius:t,quality:n,blob:r}){let i=(1-pl(n)/100)*K.rubberyMaxAlpha;if(!(i<=0)){if(r){for(let n of[-t*.45,t*.45])e.circle(n,0,t*.8).fill({color:X.rubbery,alpha:i});e.circle(0,-t*.35,t*.8).fill({color:X.rubbery,alpha:i})}else e.ellipse(0,0,t*1.2,t*.9).fill({color:X.rubbery,alpha:i})}}var hl=`chute-shadow`,gl=class e extends uc({key:`PotatoEntity`,paramsShape:on(Oo,t({pathId:``,distancePx:0,dropInMs:0,size:Se(rl),cut:!1,cooked:!1,mashHp:0,maxMashHp:1,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,passWaitMs:0,potatoId:0,butter:!1,scallions:!1,cabbage:!1,gravy:!1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){drawnKey=``;hitText;createView(){this.drawnKey=this.getLookKey();let e=this.getRadius(),t=ll({graphics:new N,processing:this.getProcessing(),radius:e,toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===rl.King}),n=new N({label:hl});return n.ellipse(0,e*.5,e*1.1,e*.5).fill({color:`#000000`}),n.visible=this.params.dropInMs>0,t.addChildAt(n,0),this.params.dropInMs>0&&this.drawFalling(t),{hitbox:new va({x:0,y:0},this.getRadius()),view:t}}recordHit({towerType:e,tower:t,minIntervalMs:n=0}){let r=this.state.runState.elapsedMs;if(this.params.lastHitAtMs>=0&&r-this.params.lastHitAtMs<n)return;let i=this.getProcessing();this.params.lastHitDamage=Math.round(Dc(i,e,t)),this.params.lastHitMultiplier=Ec(i,e),this.params.lastHitAtMs=r,this.params.lastHitTowerType=e}updateHitNumber(){let e=this.state.runState.elapsedMs-this.params.lastHitAtMs;if(this.params.lastHitAtMs<0||e<0||e>=Ss.hitNumberMs){this.hitText&&(this.hitText.visible=!1);return}let t=Ss.tiers.find(e=>this.params.lastHitMultiplier>=e.minMultiplier)??Ss.tiers[Ss.tiers.length-1];if(!t)return;let n=this.hitText??new io({text:``,style:{fill:`#ffffff`,fontSize:20,fontWeight:`bold`,stroke:{color:`#000000`,width:4}}});this.hitText||(n.anchor.set(.5),this.hitText=n,this.view.addChild(n));let r=e/Ss.hitNumberMs;n.visible=!0,n.text=`-${this.params.lastHitDamage}${t.suffix}`,n.style.fill=t.color,n.style.fontSize=t.fontSize,n.alpha=1-r,n.position.set(0,-this.getRadius()-40-Ss.hitNumberRisePx*r),n.scale.set(t.pop?1+.5*Math.max(0,1-r*5):1)}drawFalling(e){let{dropInMs:t}=this.params,n=Ic({dropInMs:t,dropMs:gs.dropMs,startScale:gs.startScale}),r=e.getChildByLabel(hl);e.scale.set(n),r&&(r.scale.set(1/n),r.visible=t>0,r.alpha=.6*(1-(n-1)/(gs.startScale-1)))}getRadius(){return ds[this.params.size].radius}getProcessing(){let{cut:e,cooked:t,mashHp:n,maxMashHp:r}=this.params;return{cut:e,cooked:t,mashHp:n,maxMashHp:r}}getToppings(){return Hc(this.params)}getLookKey(){let e=kc(this.getProcessing()),{butter:t,scallions:n,cabbage:r,gravy:i}=this.params;return`${this.params.cut}${this.params.cooked}${Math.round(e*20)}${t}${n}${r}${i}${pl(this.params.quality)}`}redrawIfChanged(){let e=this.getLookKey();e!==this.drawnKey&&(this.drawnKey=e,ll({graphics:E.instanceOf(this.view,N),processing:this.getProcessing(),radius:this.getRadius(),toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===rl.King}))}getMeter(){return this.params.size===rl.King?Ac.meter:sl}update({msSinceLastExecute:t}){if(this.updateHitNumber(),this.params.served||this.params.carriedBySeagull)return;if(this.params.dropInMs>0){this.params.dropInMs=Fc({dropInMs:this.params.dropInMs,msSinceLastExecute:t}),this.drawFalling(this.view);return}let n=Zs(this.state.level,this.params.pathId),r=[];for(let t of this.state.entityStore.getEntities(e))t!==this&&t.params.pathId===this.params.pathId&&!t.params.carriedBySeagull&&!t.params.served&&t.params.dropInMs<=0&&t.params.distancePx>this.params.distancePx&&r.push(t.params.distancePx);this.params.distancePx=Math.max(this.params.distancePx,Nc({next:this.params.distancePx+this.state.runState.beltSpeedPxPerMs*t,aheadDistances:r,spacingPx:Mc.queueSpacingPx,endPx:qs(n)})),this.moveToDistance(),this.redrawIfChanged()}moveToDistance(){let e=Js(Zs(this.state.level,this.params.pathId),this.params.distancePx);this.params.x=e.x,this.params.y=e.y}serveAtCounter(){let e=Zs(this.state.level,this.params.pathId),{sentBack:t}=nl(this.state.runState,{processing:this.getProcessing(),ownerSlot:e.ownerSlot,value:ds[this.params.size].value,toppings:this.getToppings(),timesSentBack:this.params.timesSentBack,quality:this.params.quality,penaltyMultiplier:this.params.size===rl.King?Ac.penaltyMultiplier:1});t?(this.params.distancePx=0,this.params.passWaitMs=0,this.params.timesSentBack+=1,this.moveToDistance()):(this.params.served=!0,this.destroy())}},_l=40;function vl({rollEdge:e,rollAlong:t}){return e<1/3?{x:t*O.width,y:-40}:e<2/3?{x:O.width+_l,y:t*O.height}:{x:t*O.width,y:O.height+_l}}function yl(e){let t=[{x:0,y:e.y},{x:O.width,y:e.y},{x:e.x,y:0},{x:e.x,y:O.height}],n=t[0]??e,r=1/0;for(let i of t){let t=Math.hypot(i.x-e.x,i.y-e.y);t<r&&(n=i,r=t)}return{x:n.x,y:n.y}}function bl({from:e,to:t,stepPx:n}){let r=t.x-e.x,i=t.y-e.y,a=Math.hypot(r,i);return a<=n||a===0?{x:t.x,y:t.y}:{x:e.x+r/a*n,y:e.y+i/a*n}}var xl=22,Sl=13,Cl=30,wl=90,Tl=6,El=3,Dl={approach:`approach`,escape:`escape`},Ol=class e extends uc({key:`SeagullEntity`,paramsShape:on(Oo,t({flying:!1,hp:0,phase:``,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1})),paramsMap:{view:{x:!0,y:!0}}}){flipper;wings;hpBar;cricket;lastSeenCarryingId=0;lastSeenX;createView(){let e=new Xe,t=new Xe,{flying:n}=this.params;n?e.addChild(new N().ellipse(0,Cl,xl*1.2,Sl*.7).fill({color:`#000000`,alpha:.25})):t.addChild(new N().moveTo(-5,9).lineTo(-5,22).moveTo(5,9).lineTo(5,22).stroke({color:`#ff9800`,width:3}));let r=new N().ellipse(-2,-13,7,14).fill({color:`#9aa3ab`}).ellipse(-2,Sl,7,14).fill({color:`#9aa3ab`});t.addChild(r),t.addChild(new N().ellipse(0,0,xl,Sl).fill({color:`#ffffff`})),t.addChild(new N().poly([18,-4,31,1,18,5]).fill({color:`#ff9800`})),t.addChild(new N().circle(14,-3,2.5).fill({color:`#000000`})),e.addChild(t);let i=new N().ellipse(31,1,Tl/2,El/2).fill({color:`#1b5e20`});i.visible=!1,t.addChild(i);let a=new N;return e.addChild(a),this.flipper=t,this.wings=r,this.hpBar=a,this.cricket=i,{view:e}}findPotato(e){if(e!==0){for(let t of this.state.entityStore.getEntities(gl))if(t.params.potatoId===e)return t}}pickNewTarget(){let t=new Set;for(let n of this.state.entityStore.getEntities(e))n!==this&&n.params.phase===Dl.approach&&t.add(n.params.targetPotatoId);let n;for(let e of this.state.entityStore.getEntities(gl))e.params.served||e.params.carriedBySeagull||t.has(e.params.potatoId)||e.params.dropInMs>0||e.params.size===rl.King||(!n||e.params.distancePx>n.params.distancePx)&&(n=e);return n}startEscape(){let e=yl(this.params);this.params.phase=Dl.escape,this.params.escapeX=e.x,this.params.escapeY=e.y}takeHit(e){if(this.params.hp<=0||(this.params.hp-=e,this.params.hp>0))return;let t=this.findPotato(this.params.carryingPotatoId);t&&(t.params.carriedBySeagull=!1),Jc(this.state.runState,{amount:_s.bountyCoins,reason:`Seagull bonk`,x:this.params.x,y:this.params.y}),this.destroy()}feedCricket(){if(this.params.hp<=0||this.params.fed)return;let e=this.findPotato(this.params.carryingPotatoId);e&&(e.params.carriedBySeagull=!1),this.params.fed=!0,this.params.carryingPotatoId=0,this.params.targetPotatoId=0,this.startEscape(),Jc(this.state.runState,{amount:_s.bountyCoins,reason:`Seagull fed`,x:this.params.x,y:this.params.y})}update({msSinceLastExecute:e}){if(this.params.hp<=0)return;let t=(this.params.flying?_s.flySpeedPxPerMs:_s.walkSpeedPxPerMs)*e;if(this.params.phase===Dl.approach){let e=this.findPotato(this.params.targetPotatoId);if((!e||e.params.served||e.params.carriedBySeagull||e.params.dropInMs>0)&&(e=this.pickNewTarget(),this.params.targetPotatoId=e?.params.potatoId??0),!e){this.startEscape();return}let n=bl({from:this.params,to:e.params,stepPx:t});this.params.x=n.x,this.params.y=n.y,Math.hypot(e.params.x-n.x,e.params.y-n.y)<=_s.grabRadiusPx&&(e.params.carriedBySeagull=!0,this.params.carryingPotatoId=e.params.potatoId,this.startEscape());return}let n=bl({from:this.params,to:{x:this.params.escapeX,y:this.params.escapeY},stepPx:t});this.params.x=n.x,this.params.y=n.y;let r=this.findPotato(this.params.carryingPotatoId);r&&(r.params.x=n.x,r.params.y=n.y),n.x===this.params.escapeX&&n.y===this.params.escapeY&&(r&&(r.destroy(),tl(this.state.runState)),this.destroy())}render(){let{flipper:e,wings:t,hpBar:n,cricket:r}=this;if(!e||!t||!n||!r)return;let{x:i,carryingPotatoId:a,flying:o,hp:s,fed:c}=this.params;r.visible=c,a!==0&&this.lastSeenCarryingId===0&&this.state.runState.status===W.Playing&&Gs(U.Squawk),this.lastSeenCarryingId=a,this.lastSeenX!=null&&i!==this.lastSeenX&&(e.scale.x=i>this.lastSeenX?1:-1),this.lastSeenX=i,t.scale.y=o?.6+.4*Math.abs(Math.sin(this.state.runState.elapsedMs/wl)):.6,n.clear(),s<_s.hp&&(n.rect(-20,-39,40,6).fill({color:`rgba(0,0,0,0.6)`}),n.rect(-20,-39,40*Math.max(0,s)/_s.hp,6).fill({color:`#e53935`}))}};function kl(e,t){let n=t.map((e,t)=>({candidate:e,index:t})).filter(({candidate:t})=>Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0),r=e.appliesEffect,i=r?n.filter(({candidate:e})=>!e.processing[r]):[],a=i.length>0?i:n,o=-1,s=-1/0;for(let{candidate:e,index:t}of a)e.distancePx>s&&(o=t,s=e.distancePx);return o}function Al(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0&&n.push(r)}),n}function jl(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&n.push(r)}),n}function Ml(e,t){let n=-1,r=!1,i=1/0;for(let a of jl(e,t)){let o=t[a];if(!o)continue;let s=Math.hypot(o.x-e.x,o.y-e.y);(n<0||o.carrying&&!r||o.carrying===r&&s<i)&&(n=a,r=o.carrying,i=s)}return n}function Nl(e,t){let n=t.map((e,t)=>({gull:e,index:t})).filter(({gull:e})=>!e.fed&&e.hp>0);return n[Ml(e,n.map(({gull:e})=>e))]?.index??-1}function Pl(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=Cc(e.params.towerType,e.params.level,e.params.wear),r=[...e.state.entityStore.getEntities(Ol)],i=r[Nl({x:e.params.x,y:e.params.y,rangePx:n.rangePx},r.map(e=>({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0,fed:e.params.fed,hp:e.params.hp})))];i&&(i.feedCricket(),e.params.wear=_c({wear:e.params.wear,amount:vc(e.params.towerType)}),e.params.cooldownRemainingMs=n.cooldownMs,e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=i.params.x,e.params.lastTargetY=i.params.y)}function Fl(e){return(e.elapsedMs-e.builtAtMs)/cc.rotationMs*Math.PI*2}function Il({center:e,angle:t,lengthPx:n}){return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function Ll({point:e,a:t,b:n}){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a===0?0:Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a));return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}function Rl({potato:e,potatoRadius:t,armStart:n,armEnd:r,lastSwipedAtMs:i,elapsedMs:a}){let o=Ll({point:e,a:n,b:r})<=cc.armHalfWidthPx+t,s=i>=0&&a-i<cc.debounceMs;return o&&!s}function zl(e,t){e.params.wear=_c({wear:e.params.wear,amount:yc(e.params.towerType)*t/1e3});let{elapsedMs:n}=e.state.runState,r={x:e.params.x,y:e.params.y},i=Il({center:r,angle:Fl({elapsedMs:n,builtAtMs:e.params.builtAtMs}),lengthPx:Cc(e.params.towerType,e.params.level).rangePx});for(let t of e.state.entityStore.getEntities(gl)){let{params:a}=t;if(a.served||a.carriedBySeagull||a.dropInMs>0||a.size===rl.King||!Rl({potato:a,potatoRadius:ds[a.size].radius,armStart:r,armEnd:i,lastSwipedAtMs:a.lastSwipedAtMs,elapsedMs:n}))continue;a.distancePx=Math.max(0,a.distancePx-cc.pushBackPx*hc(e.params.wear));let o=Js(Zs(e.state.level,a.pathId),a.distancePx);a.x=o.x,a.y=o.y,a.lastSwipedAtMs=n,e.params.lastProcessedAtMs=n}}function Bl({origin:e,angleDeg:t,lengthPx:n}){let r=t*Math.PI/180;return{start:{x:e.x,y:e.y},end:{x:e.x+Math.cos(r)*n,y:e.y+Math.sin(r)*n}}}function Vl({point:e,radius:t,segment:n}){return Ll({point:e,a:n.start,b:n.end})<=sc.lineHalfWidthPx+t}function Hl(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=Cc(e.params.towerType,e.params.level,e.params.wear),r=Bl({origin:{x:e.params.x,y:e.params.y},angleDeg:e.params.angleDeg,lengthPx:n.rangePx}),i=[...e.state.entityStore.getEntities(gl)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),a=!1;for(let t of i){if(!Vl({point:t.params,radius:ds[t.params.size].radius,segment:r}))continue;a=!0,t.recordHit({towerType:e.params.towerType,tower:e.params});let n=t.getProcessing();Oc(n,e.params.towerType,e.params),t.params.cut=n.cut,t.params.cooked=n.cooked,t.params.mashHp=n.mashHp}for(let t of e.state.entityStore.getEntities(Ol))t.params.hp>0&&!t.params.fed&&Vl({point:t.params,radius:0,segment:r})&&(a=!0,t.takeHit(n.damage));e.params.cooldownRemainingMs=n.cooldownMs,a&&(e.params.wear=_c({wear:e.params.wear,amount:vc(e.params.towerType)}),e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=r.end.x,e.params.lastTargetY=r.end.y)}function Ul({origin:e,aimAt:t,point:n,lengthPx:r,halfAngleDeg:i}){let a=n.x-e.x,o=n.y-e.y,s=Math.hypot(a,o);if(s>r)return!1;if(s===0)return!0;let c=Math.atan2(t.y-e.y,t.x-e.x),l=Math.atan2(o,a)-c;return l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)<=i*Math.PI/180+1e-9}function Wl(e,t){let{rangePx:n}=Cc(e.params.towerType,e.params.level),r=Sc(e.params.level)*hc(e.params.wear),i={x:e.params.x,y:e.params.y},a=[...e.state.entityStore.getEntities(gl)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),o;for(let e of a)e.params.mashHp>0&&Math.hypot(e.params.x-i.x,e.params.y-i.y)<=n&&(!o||e.params.distancePx>o.params.distancePx)&&(o=e);if(!o)return;let s={x:o.params.x,y:o.params.y},c=t/1e3;e.params.wear=_c({wear:e.params.wear,amount:yc(e.params.towerType)*c});for(let t of a)Ul({origin:i,aimAt:s,point:t.params,lengthPx:n,halfAngleDeg:K.microwaveConeHalfAngleDeg})&&(t.recordHit({towerType:e.params.towerType,tower:e.params,minIntervalMs:Ss.continuousHitIntervalMs}),t.params.mashHp=Math.max(0,t.params.mashHp-K.microwaveDamagePerSecond*r*c),t.params.quality=Math.max(0,t.params.quality-K.microwaveQualityPerSecond*c));e.params.lastTargetX=s.x,e.params.lastTargetY=s.y,e.params.lastProcessedAtMs=e.state.runState.elapsedMs}function Gl({level:e,towers:t,point:n}){let r=ys.radius;if(n.x<r||n.x>O.width-r||n.y<r||n.y>O.height-r)return{valid:!1,reason:`Out of bounds`};if(e.paths.some(e=>Xs(e,n)<e.widthPx/2+r))return{valid:!1,reason:`Too close to the path`};let{restaurant:i}=e,a=i.sizePx/2+r;return Math.abs(n.x-i.x)<a&&Math.abs(n.y-i.y)<a?{valid:!1,reason:`On the restaurant`}:t.some(e=>Math.hypot(e.x-n.x,e.y-n.y)<2*r)?{valid:!1,reason:`Too close to another tower`}:{valid:!0}}function Kl(e,t){return e>=H.towerCost[t]}function ql({tower:e,pointerWorld:t,selectedTowerType:n,selectedTowerId:r}){return r!=null&&r===e.towerId||n===e.towerType||!!t&&Math.hypot(t.x-e.x,t.y-e.y)<=ys.radius}var Jl={[q.Knife]:U.Chop,[q.Boiler]:U.Boil,[q.Masher]:U.Squish,[q.Microwave]:U.Boil,[q.CricketTrap]:U.Build,[q.Swiper]:U.Chop},Yl=5,Xl=16,Zl=8,Ql=44,$l=6,eu=44,tu=400,nu=class extends uc({key:`TowerEntity`,paramsShape:on(Oo,t({towerType:Se(q),towerId:0,level:1,builtAtMs:0,ownerSlot:0,cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:0,wear:0})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){rangeView;body;letter;beam;paddle;splash;pips;selection;wearBar;cracks;wrench;drawnLevel=0;lastSeenProcessedAtMs;createView(){let e=J[this.params.towerType],t=new Xe,n=new N;t.addChild(n);let r=e.behavior===`gull-trap`,i=new N;r?i.roundRect(-22,-22,eu,eu,6).fill({color:`#8d6e63`}).stroke({color:`#5d4037`,width:4}).ellipse(0,0,9,4.5).fill({color:`#1b5e20`}).moveTo(-4,3).lineTo(-9,9).moveTo(4,3).lineTo(9,9).stroke({color:`#1b5e20`,width:2}):i.circle(0,0,ys.radius).fill({color:e.color}).stroke({color:`#222222`,width:4}),t.addChild(i),e.behavior===`swipe`&&(this.paddle=new N,t.addChild(this.paddle));let a=new io({text:e.glyph,style:{fill:`#1a1a1a`,fontSize:30,fontWeight:`bold`}});a.anchor.set(.5),a.visible=!r,t.addChild(a);let o=new N;t.addChild(o);let s=new N;t.addChild(s);let c=new N;t.addChild(c);let l=new N,u=r?eu/2:ys.radius;l.moveTo(-u*.6,-u*.7).lineTo(-u*.1,-u*.1).lineTo(-u*.3,u*.2).lineTo(u*.2,u*.8).moveTo(u*.7,-u*.5).lineTo(u*.2,-u*.05).lineTo(u*.5,u*.4).stroke({color:`#1a1a1a`,width:3}),l.visible=!1,t.addChild(l);let d=new io({text:`🔧`,style:{fontSize:28}});d.anchor.set(.5),d.visible=!1,t.addChild(d);let f=new N;t.addChild(f);let p=new N;return t.addChild(p),this.rangeView=n,this.body=i,this.letter=a,this.beam=f,this.splash=p,this.pips=s,this.wearBar=c,this.cracks=l,this.wrench=d,this.selection=o,this.drawnLevel=0,{view:t}}update({msSinceLastExecute:e}){let{behavior:t}=J[this.params.towerType];if(t===`gull-trap`){Pl(this,e);return}if(t===`cone`){Wl(this,e);return}if(t===`swipe`){zl(this,e);return}if(t===`line`){Hl(this,e);return}if(this.params.cooldownRemainingMs=Math.max(0,this.params.cooldownRemainingMs-e),this.params.cooldownRemainingMs>0)return;let n=J[this.params.towerType],r=Cc(this.params.towerType,this.params.level,this.params.wear),i=[...this.state.entityStore.getEntities(Ol)].filter(e=>e.params.hp>0&&!e.params.fed),a=i.map(e=>({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0})),o={x:this.params.x,y:this.params.y,rangePx:r.rangePx},s=(n.areaOfEffect?jl(o,a):[Ml(o,a)].filter(e=>e>=0)).flatMap(e=>i[e]??[]);if(!n.areaOfEffect&&s[0]){let e=s[0];this.params.lastTargetX=e.params.x,this.params.lastTargetY=e.params.y,e.takeHit(r.damage),this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs;return}let c=[...this.state.entityStore.getEntities(gl)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),l=c.map(e=>({x:e.params.x,y:e.params.y,distancePx:e.params.distancePx,processing:e.getProcessing()}));if(n.areaOfEffect){let e=Al({x:this.params.x,y:this.params.y,rangePx:r.rangePx},l);if(e.length===0&&s.length===0)return;for(let e of s)e.takeHit(r.damage);for(let t of e){let e=c[t];if(!e)continue;e.recordHit({towerType:this.params.towerType,tower:this.params});let n=e.getProcessing();Oc(n,this.params.towerType,this.params),e.params.cut=n.cut,e.params.cooked=n.cooked,e.params.mashHp=n.mashHp}this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs,this.params.lastTargetX=this.params.x,this.params.lastTargetY=this.params.y;return}let u=c[kl({x:this.params.x,y:this.params.y,rangePx:r.rangePx,appliesEffect:n.appliesEffect},l)];if(!u)return;u.recordHit({towerType:this.params.towerType,tower:this.params});let d=u.getProcessing();Oc(d,this.params.towerType,this.params),u.params.cut=d.cut,u.params.cooked=d.cooked,u.params.mashHp=d.mashHp,this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs,this.params.lastTargetX=u.params.x,this.params.lastTargetY=u.params.y}wearFromUse(){this.params.wear=_c({wear:this.params.wear,amount:vc(this.params.towerType)})}renderWear(){let{wearBar:e,cracks:t,wrench:n,body:r}=this;if(!e||!t||!n||!r)return;let{wear:i,towerType:a}=this.params,o=i>=lc.maxWear,s=J[a].behavior===`gull-trap`?eu/2:ys.radius;if(e.clear(),i>0){let t=s+Zl+14+Yl+6,n=i/lc.maxWear;e.rect(-22,t,Ql,$l).fill({color:`#000000`,alpha:.6}).rect(-22,t,Ql*n,$l).fill({color:`hsl(${Math.round(120-n*120)}, 75%, 45%)`})}t.visible=o,r.alpha=o?.75:1,n.visible=o,n.y=-s-22+Math.sin(this.state.runState.elapsedMs/200)*5}drawLevelParts(){let{rangeView:e,pips:t,selection:n,paddle:r}=this;if(!e||!t||!n)return;let{towerType:i,level:a}=this.params,o=J[i],{rangePx:s}=Cc(i,a);if(this.drawnLevel=a,o.behavior===`line`){let t=Bl({origin:{x:0,y:0},angleDeg:this.params.angleDeg,lengthPx:s});e.clear().moveTo(t.start.x,t.start.y).lineTo(t.end.x,t.end.y).stroke({color:sc.lineColor,alpha:sc.lineAlpha,width:sc.lineWidthPx})}else e.clear().circle(0,0,s).fill({color:o.color,alpha:.08}).stroke({color:o.color,alpha:.35,width:3});if(r){let e=Il({center:{x:0,y:0},angle:0,lengthPx:s});r.clear().roundRect(0,-cc.armHalfWidthPx,e.x,cc.armHalfWidthPx*2,cc.armHalfWidthPx).fill({color:`#a1887f`}).stroke({color:`#5d4037`,width:3})}let c=o.behavior===`gull-trap`?eu/2:ys.radius;t.clear();for(let e=0;e<a;e++)t.circle((e-(a-1)/2)*Xl,c+Zl+14,Yl).fill({color:`#ffd700`});n.clear().circle(0,0,ys.radius+Zl).stroke({color:`#ffffff`,width:4})}render(){let{body:e,letter:t,beam:n,splash:r,rangeView:i}=this;if(!e||!t||!n||!r||!i)return;this.drawnLevel!==this.params.level&&this.drawLevelParts(),i.visible=J[this.params.towerType].behavior===`line`||ql({tower:this.params,pointerWorld:this.state.ui.pointerWorld,selectedTowerType:this.state.ui.selectedTowerType,selectedTowerId:this.state.ui.selectedTowerId}),this.renderWear(),this.selection&&(this.selection.visible=this.state.ui.selectedTowerId===this.params.towerId),this.paddle&&(this.paddle.rotation=Fl({elapsedMs:this.state.runState.elapsedMs,builtAtMs:this.params.builtAtMs}));let{lastProcessedAtMs:a,lastTargetX:o,lastTargetY:s,x:c,y:l,towerType:u}=this.params,d=a>=0&&this.state.runState.elapsedMs-a<Ts.flashMs;this.lastSeenProcessedAtMs!=null&&a!==this.lastSeenProcessedAtMs&&a>=0&&this.state.runState.status===W.Playing&&Gs(Jl[u]),this.lastSeenProcessedAtMs=a;let f=d?1.25:1;e.scale.set(f),t.scale.set(f),n.clear(),r.clear();let p=J[u],m=this.state.runState.elapsedMs-a;if(p.behavior===`cone`){if(a>=0&&m<K.microwaveFlashMs){let e=Math.atan2(s-l,o-c),t=K.microwaveConeHalfAngleDeg*Math.PI/180;r.moveTo(0,0).arc(0,0,Cc(u,this.params.level).rangePx,e-t,e+t).closePath().fill({color:p.color,alpha:.24+.06*Math.sin(this.state.runState.elapsedMs/60)})}}else if(p.areaOfEffect){if(a>=0&&m<Ts.splashMs){let e=m/Ts.splashMs;r.circle(0,0,Cc(u,this.params.level).rangePx*(.3+.7*e)).stroke({color:p.color,width:10,alpha:.8*(1-e)})}}else if(p.behavior===`gull-trap`){if(a>=0&&m<tu){let e=m/tu,t=o-c,n=s-l;r.circle(t*e,n*e-120*e*(1-e),4).fill({color:`#1b5e20`})}}else p.behavior===`line`?d&&n.moveTo(0,0).lineTo(o-c,s-l).stroke({color:`#e0e0e0`,width:6,alpha:.9}).moveTo(0,0).lineTo(o-c,s-l).stroke({color:`#ffffff`,width:2}):d&&n.moveTo(0,0).lineTo(o-c,s-l).stroke({color:J[u].color,width:8,alpha:.9})}},Z=function(e){return e.StartRun=`start-run`,e.BeginRun=`begin-run`,e.PlaceTower=`place-tower`,e.UpgradeTower=`upgrade-tower`,e.SellTower=`sell-tower`,e.ServiceTower=`service-tower`,e.ApplyTopping=`apply-topping`,e.TogglePause=`toggle-pause`,e}({});function ru(e,t){if(!e.multiplayerP2pLockStep)throw Error(`Cannot send '${t.type}': lockstep mod is missing.`);e.multiplayerP2pLockStep.multiplayerController.act(t)}var iu=`colcannon-fodder-level`;function au(){try{return ic(globalThis.localStorage.getItem(`colcannon-fodder-level`)??void 0).levelId}catch{return rc.levelId}}function ou(e){try{globalThis.localStorage.setItem(iu,e)}catch{}}var su=new WeakMap;function cu(e){let t=su.get(e);if(t)return t;let n={selectTowerType(t){e.ui&&(e.ui.selectedTowerType=t,e.ui.selectedTowerId=void 0,e.ui.selectedTopping=void 0)},selectTopping(t){e.ui&&(e.ui.selectedTopping=t,e.ui.selectedTowerType=void 0,e.ui.selectedTowerId=void 0)},selectTower(t){e.ui&&(e.ui.selectedTowerId=t,e.ui.selectedTowerType=void 0,e.ui.selectedTopping=void 0)},upgradeTower(t){ru(e,{type:Z.UpgradeTower,towerId:t})},serviceTower(t){ru(e,{type:Z.ServiceTower,towerId:t})},sellTower(t){ru(e,{type:Z.SellTower,towerId:t}),e.ui&&(e.ui.selectedTowerId=void 0)},beginRun(){ru(e,{type:Z.BeginRun})},togglePause(){ru(e,{type:Z.TogglePause})},setVolume:Ps,selectLevel(t){ou(t),ru(e,{type:Z.StartRun,ready:!0,levelId:t})},restartRun(){ru(e,{type:Z.StartRun,levelId:e.runState?.levelId??rc.levelId})}};return su.set(e,n),n}function lu(e){let t=e.ui?.selectedTowerId;if(t!=null&&e.entityStore)for(let n of e.entityStore.getEntities(nu)){let{towerId:e,towerType:r,level:i,wear:a}=n.params;if(e===t)return{towerId:e,towerType:r,level:i,upgradeCost:i<mc.maxLevel?wc(r,i+1):void 0,sellValue:Tc(r,i),wear:Math.round(a),serviceCost:gc(r),stats:Cc(r,i,a)}}}function uu(e){let t=e.runState??oc(),n=t.lastServing,r=t.lastOrderEvent,i=t.lastSteal;return{status:t.status,levelId:t.levelId,paused:t.paused,satisfaction:t.satisfaction,maxSatisfaction:ps.max,coins:t.coins,coinsEarned:t.coinsEarned,coinPopups:t.coinEvents.filter(e=>t.elapsedMs-e.atMs<Cs.coinPopupMs).map(e=>({id:e.id,amount:e.amount,reason:e.reason,x:e.x,y:e.y,staggerPx:e.id%Cs.coinPopupStaggerSlots*Cs.coinPopupStaggerPx})),totalScore:Object.values(t.scoreBySlot).reduce((e,t)=>e+t,0),potatoesServed:t.potatoesServed,potatoesPerRun:t.potatoesPerRun,waveNumber:t.waveIndex+1,waveCount:hs.waves.length,wavePhase:t.wavePhase,breakSecondsLeft:t.wavePhase===`break`?Math.ceil(t.breakRemainingMs/1e3):0,servingCounts:{...t.servingCounts},servingPopup:n&&t.elapsedMs-n.servedAtMs<Cs.servingPopupMs?{result:n.result,id:n.sentBack?-n.servedAtMs-1:t.potatoesServed,scoreDelta:n.scoreDelta,satisfactionDelta:n.satisfactionDelta,progress:n.progress,sentBack:n.sentBack}:void 0,stealPopup:i&&t.elapsedMs-i.atMs<Cs.servingPopupMs?{satisfactionDelta:i.satisfactionDelta,id:i.atMs}:void 0,potatoesStolen:t.potatoesStolen,selectedTowerType:e.ui?.selectedTowerType,selectedTopping:e.ui?.selectedTopping,selectedTower:lu(e),orders:t.orders.map(e=>{let n=Math.max(1,e.expiresAtMs-e.createdAtMs),r=Math.max(0,e.expiresAtMs-t.elapsedMs);return{orderId:e.orderId,dish:e.dish,secondsLeft:Math.ceil(r/1e3),fractionLeft:Math.min(1,Math.round(r/n*20)/20)}}),orderPopup:r&&t.elapsedMs-r.atMs<Cs.servingPopupMs?{kind:r.kind,dish:r.dish,scoreDelta:r.scoreDelta,satisfactionDelta:r.satisfactionDelta,id:r.atMs}:void 0,bossBanner:t.lastBossSpawnAtMs>=0&&t.elapsedMs-t.lastBossSpawnAtMs<Ac.bannerMs?{id:t.lastBossSpawnAtMs}:void 0,prestigeStars:Kc(t.recentQualities),muted:Bs(),volumes:{...Ns()}}}var du=ge()({tagName:`hud-boss-banner`,styles:A`
        :host {
            display: block;
        }

        .banner {
            -webkit-text-stroke: 3px black;
            color: #ffd700;
            font-size: 64px;
            font-weight: bold;
            left: 0;
            paint-order: stroke fill;
            position: absolute;
            right: 0;
            text-align: center;
            top: 100px;
        }
    `,render({inputs:e}){return e.snapshot.bossBanner?T`
            <div class="banner">👑 The Russet King approaches!</div>
        `:T`
                ${j}
            `}}),fu=ge()({tagName:`hud-coin-popups`,styles:A`
        :host {
            display: block;
        }

        .popup {
            animation: float-up ${Cs.coinPopupMs}ms ease-out forwards;
            font-weight: bold;
            position: absolute;
            text-align: center;
            text-shadow:
                0 0 4px black,
                0 3px 6px black;
            transform: translate(-50%, -100%);
            line-height: 1.1;
            white-space: nowrap;
        }

        .amount {
            color: #ffd700;
            font-size: 34px;
        }

        .amount.spent {
            color: #ff5252;
        }

        .amount.zero {
            color: #bdbdbd;
        }

        .reason {
            color: white;
            font-size: 22px;
        }

        @keyframes float-up {
            0% {
                margin-top: 0;
                opacity: 1;
            }
            60% {
                opacity: 1;
            }
            100% {
                margin-top: -${Cs.coinPopupRisePx}px;
                opacity: 0;
            }
        }
    `,render({inputs:e}){return T`
            ${e.snapshot.coinPopups.map(e=>hn(e.id,T`
                        <div
                            class="popup"
                            style="left: ${e.x}px; top: ${e.y-Cs.coinPopupOffsetPx-e.staggerPx}px"
                        >
                            <div
                                class="amount ${e.amount>0?``:e.amount<0?`spent`:`zero`}"
                            >
                                ${e.amount>0?`+`:``}🪙 ${e.amount}
                            </div>
                            <div class="reason">${e.reason}</div>
                        </div>
                    `))}
        `}}),pu=ge()({tagName:`hud-mute`,styles:A`
        :host {
            display: block;
        }

        .icon {
            font-size: 48px;
            position: absolute;
            right: 344px;
            top: 16px;
        }
    `,render({inputs:e}){return e.snapshot.muted?T`
            <div class="icon">🔇</div>
        `:T`
                ${j}
            `}}),mu=.3,hu=ge()({tagName:`hud-orders`,styles:A`
        :host {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: absolute;
            right: 24px;
            text-shadow: none;
            top: 24px;
            width: 300px;
        }

        .title {
            font-size: 28px;
            font-weight: bold;
            text-shadow: 0 3px 6px black;
        }

        .ticket {
            background: #fff8e1;
            border-left: 6px solid #c0392b;
            border-radius: 10px;
            box-sizing: border-box;
            color: #3e2723;
            padding: 8px 14px 10px;
            width: 300px;
        }

        .dish {
            font-size: 30px;
            font-weight: bold;
            white-space: nowrap;
        }

        .recipe {
            display: flex;
            flex-wrap: wrap;
            gap: 4px 12px;
        }

        .ingredient {
            align-items: center;
            display: flex;
            font-size: 20px;
            gap: 6px;
        }

        .swatch {
            border: 2px solid rgba(0, 0, 0, 0.4);
            border-radius: 50%;
            box-sizing: border-box;
            height: 24px;
            width: 24px;
        }

        .time-bar {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            height: 10px;
            margin-top: 8px;
            overflow: hidden;
            width: 260px;
        }

        .time-fill {
            height: 100%;
        }

        .popup {
            align-self: flex-end;
            animation: order-popup-rise 1.2s linear forwards;
            font-size: 34px;
            font-weight: bold;
            text-align: right;
            text-shadow: 0 3px 6px black;
            white-space: nowrap;
        }

        @keyframes order-popup-rise {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-40px);
            }
        }
    `,render({inputs:e}){let{orders:t,orderPopup:n}=e.snapshot;return T`
            <div class="title">ORDERS</div>
            ${t.map(e=>{let t=Bc[e.dish];return T`
                    <div class="ticket">
                        <div class="dish">${t.label}</div>
                        <div class="recipe">
                            ${t.toppings.map(e=>{let t=Lc[e];return T`
                                    <span class="ingredient">
                                        <span
                                            class="swatch"
                                            style="background: ${t.color}"
                                        ></span>
                                        ${t.label}
                                    </span>
                                `})}
                        </div>
                        <div class="time-bar">
                            <div
                                class="time-fill"
                                style="width: ${e.fractionLeft*100}%; background: ${e.fractionLeft<mu?`#f44336`:`#4caf50`}"
                            ></div>
                        </div>
                    </div>
                `})}
            ${n?hn(n.id,T`
                          <div
                              class="popup"
                              style="color: ${n.kind===`fulfilled`?`#7CFC00`:`#ff5252`}"
                          >
                              ${n.kind===`fulfilled`?`${Bc[n.dish].label} served! +${n.scoreDelta}`:`${Bc[n.dish].label} order expired! ${n.satisfactionDelta}`}
                          </div>
                      `):j}
        `}}),gu=[{towerType:q.Knife,verb:`cut`},{towerType:q.Boiler,verb:`splash & soften`},{towerType:q.Masher,verb:`mash`}],_u=`Combo: Knife cuts (×1.5) → Pot softens (×2 Masher) → Masher SMASH (×3)`,vu={width:240,height:135};function yu(e){let t=vu.width/O.width,n=e.restaurant.sizePx*t;return T`
        <svg
            class="preview"
            width=${vu.width}
            height=${vu.height}
            viewBox="0 0 ${vu.width} ${vu.height}"
        >
            ${ee`<rect width="${vu.width}" height="${vu.height}" fill="#5b8c3a" />`}
            ${e.paths.map(e=>{let n=e.waypoints.map(e=>`${e.x*t},${e.y*t}`).join(` `);return ee`
                    <polyline
                        points="${n}"
                        fill="none"
                        stroke="#4a4a4a"
                        stroke-width="${e.widthPx*t}"
                        stroke-linejoin="round"
                    />
                    ${(e.chutes??[]).map(n=>{let r=Js(e,n.distancePx);return ee`<circle cx="${r.x*t}" cy="${r.y*t}" r="6" fill="#ff8c1a" stroke="#111" stroke-width="1.5" />`})}
                `})}
            ${ee`<rect
                x="${(e.restaurant.x-e.restaurant.sizePx/2)*t}"
                y="${(e.restaurant.y-e.restaurant.sizePx/2)*t}"
                width="${n}"
                height="${n}"
                fill="#c0392b"
                stroke="#f5e6c8"
                stroke-width="2"
            />`}
        </svg>
    `}var bu=[_u,`Every tower mashes. Knife: set its direction when you build it (scroll or [ ]); it chops everything on that line, fast; pots soften everything in range so mashers hit twice as hard.`,`Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.`,`Fully mashed potatoes make customers happy; the closer to done, the less they complain. Raw ones make them furious.`,`Seagulls swoop in to steal potatoes. Your towers can knock them out.`,`The Microwave is fast and cheap, but rubbery potatoes hurt your prestige.`,`Towers wear out with use. Click one and press S to service it.`,`Keep satisfaction above zero through every wave to become the Mash Champ.`],xu=`1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause (volume sliders are in the pause menu) · R to restart after a run`,Su=ge()({tagName:`hud-title`,styles:A`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            background: rgba(30, 20, 10, 0.95);
            border: 6px solid #f5e6c8;
            border-radius: 24px;
            box-sizing: border-box;
            padding: 28px 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: #ffd700;
            font-size: 72px;
            font-weight: bold;
        }

        .tagline {
            font-size: 32px;
            margin-bottom: 16px;
            opacity: 0.8;
        }

        .recipe {
            align-items: center;
            display: flex;
            font-size: 30px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 16px;
            white-space: nowrap;
        }

        .chip {
            align-items: center;
            display: flex;
            gap: 12px;
        }

        .swatch {
            border: 3px solid white;
            border-radius: 50%;
            box-sizing: border-box;
            height: 36px;
            width: 36px;
        }

        .rules {
            font-size: 24px;
            line-height: 1.3;
            margin-bottom: 16px;
        }

        .controls {
            font-size: 20px;
            margin-bottom: 20px;
            opacity: 0.8;
        }

        .levels {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin-bottom: 20px;
        }

        .level-card {
            background: rgba(255, 255, 255, 0.06);
            border: 5px solid transparent;
            border-radius: 16px;
            color: inherit;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            font: inherit;
            font-weight: normal;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-card.selected {
            border-color: #ffd700;
        }

        .level-name {
            color: #ffd700;
            font-size: 30px;
            font-weight: bold;
        }

        .level-description {
            font-size: 20px;
            min-height: 52px;
            opacity: 0.85;
        }

        .preview {
            align-self: center;
            border-radius: 6px;
            margin-top: auto;
        }

        .start {
            background: #ffd700;
            border: none;
            border-radius: 12px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 48px;
        }
    `,render({inputs:e}){return e.snapshot.status===W.Ready?T`
            <div class="layer">
                <div class="panel">
                    <div class="title">Colcannon Fodder</div>
                    <div class="tagline">A mashed potato tower defense</div>
                    <div class="recipe">
                        ${gu.map((e,t)=>{let n=J[e.towerType];return T`
                                ${t>0?T`
                                          <span>→</span>
                                      `:j}
                                <span class="chip">
                                    <span class="swatch" style="background: ${n.color}"></span>
                                    ${n.label}: ${e.verb}
                                </span>
                            `})}
                    </div>
                    <div class="rules">
                        ${bu.map(e=>T`
                                <div>${e}</div>
                            `)}
                    </div>
                    <div class="controls">${xu}</div>
                    <div class="levels">
                        ${nc.map(t=>T`
                                <button
                                    class="level-card ${t.levelId===e.snapshot.levelId?`selected`:``}"
                                    @click=${()=>{e.actions.selectLevel(t.levelId)}}
                                >
                                    <span class="level-name">${t.name}</span>
                                    <span class="level-description">${t.description}</span>
                                    ${yu(t)}
                                </button>
                            `)}
                    </div>
                    <button
                        class="start"
                        @click=${()=>{e.actions.beginRun()}}
                    >
                        Start cooking (Space)
                    </button>
                </div>
            </div>
        `:T`
                ${j}
            `}});function Cu(){let e=Object.entries(ds).map(([e,t])=>`${e} ×${t.value}`).join(`, `);return[`Perfect mash: ${H.servingCoins.perfect} coins × size (${e})`,`Quality scales the pay`,`Filled order: +${Ds.fulfilled.coins} coins × size`,`Eaten anyway: ${H.servingCoins.incomplete} coins`,`Sent back: no pay`,`Seagull knocked out or fed: ${_s.bountyCoins} coins`,`Towers wear out with use. Click one and press S to service it.`,`Selling a tower refunds ${Math.round(mc.sellRefund*100)}%`]}var wu=ge()({tagName:`hud-pause`,styles:A`
        :host {
            display: block;
        }

        .pause-button {
            background: rgba(20, 20, 20, 0.85);
            border: none;
            border-radius: 12px;
            color: white;
            cursor: pointer;
            font-size: 36px;
            height: 64px;
            left: 928px;
            padding: 0;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            width: 64px;
        }

        .layer {
            align-items: center;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            background: rgba(30, 20, 10, 0.95);
            border: 6px solid #f5e6c8;
            border-radius: 24px;
            box-sizing: border-box;
            padding: 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: #ffd700;
            font-size: 72px;
            font-weight: bold;
            margin-bottom: 24px;
        }

        .rules {
            font-size: 28px;
            line-height: 1.5;
            margin-bottom: 32px;
        }

        .earn-title {
            color: #ffd700;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .earn {
            display: flex;
            flex-wrap: wrap;
            font-size: 22px;
            gap: 4px 32px;
            justify-content: center;
            margin-bottom: 24px;
        }

        .controls {
            font-size: 24px;
            margin-bottom: 40px;
            opacity: 0.8;
        }

        .volume {
            align-items: center;
            display: flex;
            font-size: 28px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 16px;
        }

        .volume label {
            text-align: right;
            width: 260px;
        }

        .volume input {
            height: 40px;
            width: 700px;
        }

        .volume .percent {
            text-align: left;
            width: 100px;
        }

        .buttons {
            margin-top: 24px;
            display: flex;
            gap: 32px;
            justify-content: center;
        }

        .buttons button {
            background: #ffd700;
            border: none;
            border-radius: 12px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 48px;
        }
    `,render({inputs:e}){let t=e.snapshot;return t.status===W.Playing?T`
            ${t.paused?T`
                      <div class="layer">
                          <div class="panel">
                              <div class="title">Paused</div>
                              <div class="rules">
                                  ${bu.map(e=>T`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="earn-title">How you earn 🪙</div>
                              <div class="earn">
                                  ${Cu().map(e=>T`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="controls">${xu}</div>
                              ${[[`music`,`Music`],[`effects`,`Sound effects`]].map(([n,r])=>{let i=Math.round(t.volumes[n]*100);return T`
                                          <div class="volume">
                                              <label>${r}</label>
                                              <input
                                                  type="range"
                                                  min="0"
                                                  max="100"
                                                  .value=${String(i)}
                                                  @input=${t=>{t.target instanceof HTMLInputElement&&e.actions.setVolume(n,Number(t.target.value)/100)}}
                                              />
                                              <span class="percent">${i}%</span>
                                          </div>
                                      `})}
                              <div class="buttons">
                                  <button
                                      @click=${()=>{e.actions.togglePause()}}
                                  >
                                      Resume (P)
                                  </button>
                                  <button
                                      @click=${()=>{e.actions.restartRun()}}
                                  >
                                      Restart
                                  </button>
                              </div>
                          </div>
                      </div>
                  `:j}
            <button
                class="pause-button"
                @click=${()=>{e.actions.togglePause()}}
            >
                ⏸
            </button>
        `:T`
                ${j}
            `}}),Tu=ge()({tagName:`hud-run-over`,styles:A`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            background: rgba(30, 20, 10, 0.95);
            border: 6px solid #f5e6c8;
            border-radius: 24px;
            box-sizing: border-box;
            padding: 48px;
            text-align: center;
            width: 900px;
        }

        .trophy {
            font-size: 140px;
        }

        .title {
            font-size: 72px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 30px;
            margin-bottom: 24px;
        }

        .stars {
            color: #ffd700;
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 24px;
        }

        .summary {
            font-size: 30px;
            margin-bottom: 32px;
        }

        button {
            background: #ffd700;
            border: none;
            border-radius: 12px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 48px;
        }
    `,render({inputs:e}){let t=e.snapshot;if(t.status===W.Playing||t.status===W.Ready)return T`
                ${j}
            `;let n=t.status===W.Won,r=n&&t.prestigeStars>=K.mashChampStars,i=n&&!r;return T`
            <div class="layer">
                <div class="panel">
                    ${r?T`
                              <div class="trophy">🏆</div>
                          `:j}
                    <div
                        class="title"
                        style="color: ${r?`#ffd700`:i?`#ffc107`:`#ff5252`}; ${i?`font-size: 64px`:``}"
                    >
                        ${r?`MASH CHAMP!`:i?`Survived!`:`Restaurant Closed`}
                    </div>
                    <div class="subtitle">
                        ${r?`Every customer went home full.`:i?`...but the critics found it a little rubbery.`:`The customers have had enough of your potatoes.`}
                    </div>
                    <div class="stars">Prestige ${qc(t.prestigeStars)}</div>
                    <div class="summary">
                        <div>Score ${t.totalScore.toLocaleString(`en-US`)}</div>
                        <div>Coins earned ${t.coinsEarned}</div>
                        <div>Perfect mashes ${t.servingCounts[G.Perfect]}</div>
                        <div>
                            Not fully mashed ${t.servingCounts[G.Incomplete]}
                        </div>
                        <div>Raw ${t.servingCounts[G.Raw]}</div>
                        <div>Stolen by seagulls ${t.potatoesStolen}</div>
                    </div>
                    <button
                        @click=${()=>{e.actions.restartRun()}}
                    >
                        Play again (R)
                    </button>
                </div>
            </div>
        `}}),Eu={[G.Perfect]:{getText(e){return`Perfect mash! +${e.scoreDelta}`},color:`#7CFC00`},[G.Incomplete]:{getText(e){let t=e.progress>=.75?`Almost mashed`:e.progress>=.4?`Half-mashed`:`Barely touched`;return`${e.sentBack?`Sent back! `:``}${t}... ${e.satisfactionDelta}`},color:`#ffc107`},[G.Raw]:{getText(e){return e.sentBack?`Sent back! Barely touched... ${e.satisfactionDelta}`:`RAW POTATO! ${e.satisfactionDelta}`},color:`#ff5252`}};function Du(e){return e>.6?`#4caf50`:e>.3?`#ffc107`:`#f44336`}var Ou=ge()({tagName:`hud-stats`,styles:A`
        :host {
            display: block;
            left: 72px;
            position: absolute;
            text-shadow: 0 3px 6px black;
            top: 16px;
        }

        .title {
            font-size: 32px;
            font-weight: bold;
        }

        .score {
            font-size: 40px;
            font-weight: bold;
        }

        .coins {
            color: #ffd700;
            font-size: 36px;
            font-weight: bold;
        }

        .prestige {
            color: #ffd700;
            font-size: 30px;
            font-weight: bold;
        }

        .wave {
            font-size: 30px;
            font-weight: bold;
        }

        /* The host is at (72, 16), so these offsets put the banner's center at world (960, 200). */
        .banner {
            color: #ffffff;
            font-size: 56px;
            font-weight: bold;
            left: 888px;
            position: absolute;
            text-shadow: 0 3px 6px black;
            top: 184px;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }

        .label {
            font-size: 26px;
        }

        .bar-row {
            align-items: center;
            display: flex;
            font-size: 26px;
            gap: 16px;
        }

        .bar {
            background: rgba(0, 0, 0, 0.5);
            border: 3px solid white;
            border-radius: 8px;
            box-sizing: border-box;
            height: 30px;
            overflow: hidden;
            width: 420px;
        }

        .bar-fill {
            height: 100%;
        }

        /* The host is at (72, 16), so these offsets put the popup's center at world (960, 380). */
        .popup {
            animation: popup-rise 1.2s linear forwards;
            font-size: 44px;
            font-weight: bold;
            left: 888px;
            position: absolute;
            text-shadow: 0 3px 6px black;
            top: 364px;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }

        @keyframes popup-rise {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, calc(-50% - 60px));
            }
        }
    `,render({inputs:e}){let t=e.snapshot,n=t.satisfaction/t.maxSatisfaction,r=t.servingPopup,i=r&&Eu[r.result];return T`
            <div class="title">Colcannon Fodder</div>
            <div class="score">Score ${t.totalScore.toLocaleString(`en-US`)}</div>
            <div class="coins">🪙 ${t.coins}</div>
            <div class="label">Customer satisfaction</div>
            <div class="bar-row">
                <div class="bar">
                    <div
                        class="bar-fill"
                        style="width: ${Math.max(0,Math.min(1,n))*100}%; background: ${Du(n)}"
                    ></div>
                </div>
                <span>${t.satisfaction} / ${t.maxSatisfaction}</span>
            </div>
            <div class="prestige">Prestige ${qc(t.prestigeStars)}</div>
            <div class="wave">Wave ${t.waveNumber} / ${t.waveCount}</div>
            <div class="label">
                Potatoes served ${t.potatoesServed} / ${t.potatoesPerRun}
            </div>
            ${t.wavePhase===`break`&&t.status!==W.Ready?T`
                      <div class="banner">
                          ${t.waveNumber===1?`Get ready! Wave 1 in`:`Wave ${t.waveNumber} incoming in`}
                          ${t.breakSecondsLeft}...
                      </div>
                  `:j}
            ${t.stealPopup?hn(t.stealPopup.id,T`
                          <div class="popup" style="color: #ff5252">
                              A seagull stole a potato! ${t.stealPopup.satisfactionDelta}
                          </div>
                      `):j}
            ${r&&i?hn(r.id,T`
                          <div class="popup" style="color: ${i.color}">
                              ${i.getText(r)}
                          </div>
                      `):j}
        `}}),ku=ge()({tagName:`hud-topping-bar`,styles:A`
        :host {
            align-items: stretch;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: auto;
            position: absolute;
            right: 24px;
            top: 62%;
            transform: translateY(-50%);
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            text-shadow: 0 2px 4px black;
        }

        button {
            background: rgba(20, 20, 20, 0.85);
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-radius: 16px;
            box-sizing: border-box;
            color: white;
            cursor: pointer;
            font-family: inherit;
            height: 90px;
            width: 200px;
        }

        button.selected {
            border: 6px solid #ffffff;
            transform: translateX(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 14px;
            justify-content: center;
        }

        .swatch {
            border-radius: 50%;
            height: 40px;
            width: 40px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 28px;
            font-weight: bold;
            white-space: nowrap;
        }

        .hotkey {
            font-size: 22px;
            opacity: 0.7;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTopping;return T`
            <div class="title">TOPPINGS</div>
            ${Object.values(Y).map(n=>{let r=Lc[n];return T`
                    <button
                        class=${n===t?`selected`:``}
                        ${we(`click`,()=>{e.actions.selectTopping(n===t?void 0:n)})}
                    >
                        <div class="content">
                            <div class="swatch" style="background: ${r.color}"></div>
                            <div class="text">
                                <span class="label">${r.label}</span>
                                <span class="hotkey">[${r.hotkey.toUpperCase()}]</span>
                            </div>
                        </div>
                    </button>
                `})}
        `}}),Au=ge()({tagName:`hud-tower-panel`,styles:A`
        :host {
            display: block;
            left: 24px;
            bottom: 150px;
            pointer-events: auto;
            position: absolute;
            width: 360px;
        }

        .panel {
            background: rgba(20, 20, 20, 0.9);
            border-left: 6px solid #ffd700;
            border-radius: 10px;
            box-sizing: border-box;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 12px 18px 14px;
            width: 360px;
        }

        .name {
            font-size: 32px;
            font-weight: bold;
        }

        .level {
            color: #ffd700;
            font-size: 24px;
        }

        .stat {
            font-size: 22px;
        }

        .wear-track {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            height: 14px;
            overflow: hidden;
        }

        .wear-fill {
            height: 100%;
        }

        button {
            background: #3a8e4a;
            border: 3px solid rgba(255, 255, 255, 0.4);
            border-radius: 10px;
            color: white;
            cursor: pointer;
            font-family: inherit;
            font-size: 26px;
            margin-top: 4px;
            padding: 8px 0;
        }

        button.service {
            background: #6a5a2a;
        }

        button.sell {
            background: #8e3a3a;
        }

        button:disabled {
            cursor: default;
            opacity: 0.4;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTower;if(!t)return j;let n=J[t.towerType],{actions:r,snapshot:i}=e,a=t.upgradeCost!=null&&i.coins>=t.upgradeCost,o=n.behavior!==`gull-trap`&&n.behavior!==`swipe`;return T`
            <div class="panel">
                <div class="name">${n.label}</div>
                <div class="level">Level ${t.level} / ${mc.maxLevel}</div>
                ${o?T`
                          <div class="stat">Damage: ${t.stats.damage}</div>
                      `:j}
                <div class="stat">Range: ${t.stats.rangePx}</div>
                <div class="stat">Reload: ${(t.stats.cooldownMs/1e3).toFixed(2)}s</div>
                <div class="stat">Wear: ${t.wear}%</div>
                <div class="wear-track">
                    <div
                        class="wear-fill"
                        style="width: ${t.wear}%; background: hsl(${120-t.wear*1.2}, 70%, 45%)"
                    ></div>
                </div>
                <button
                    class="service"
                    ?disabled=${t.wear<=0||i.coins<t.serviceCost}
                    ${we(`click`,()=>{r.serviceTower(t.towerId)})}
                >
                    ${bc(t.towerType)} (S) 🪙 ${t.serviceCost}
                </button>
                <button
                    class="upgrade"
                    ?disabled=${!a}
                    ${we(`click`,()=>{r.upgradeTower(t.towerId)})}
                >
                    Upgrade (U) 🪙 ${t.upgradeCost??`MAX`}
                </button>
                <button
                    class="sell"
                    ${we(`click`,()=>{r.sellTower(t.towerId)})}
                >
                    Sell (X) 🪙 ${t.sellValue}
                </button>
            </div>
        `}}),ju=ge()({tagName:`hud-tower-toolbar`,styles:A`
        :host {
            align-items: center;
            bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            left: 50%;
            pointer-events: auto;
            position: absolute;
            transform: translateX(-50%);
        }

        .hint {
            font-size: 26px;
            text-shadow: 0 2px 4px black;
            white-space: nowrap;
        }

        .row {
            display: flex;
            gap: 16px;
        }

        button {
            background: rgba(20, 20, 20, 0.85);
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-radius: 16px;
            box-sizing: border-box;
            color: white;
            cursor: pointer;
            font-family: inherit;
            height: 110px;
            width: 200px;
        }

        button.selected {
            border: 6px solid #ffffff;
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 16px;
            justify-content: center;
        }

        .swatch {
            flex-shrink: 0;
            border-radius: 50%;
            height: 44px;
            width: 44px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 30px;
            font-weight: bold;
            white-space: nowrap;
        }

        button.unaffordable {
            opacity: 0.45;
        }

        .cost {
            color: #ffd700;
            font-size: 24px;
        }

        .hotkey {
            font-size: 24px;
            opacity: 0.7;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTowerType,n=e.snapshot.selectedTopping,r=n?`Click a potato to add ${Lc[n].label}. Right click or Esc to cancel.`:t?t===q.Knife?`Scroll or [ ] to turn the blade. Click beside the belt to build it.`:`Click beside the path to build a ${J[t].label}. Right click or Esc to cancel.`:_u;return T`
            <div class="hint">${r}</div>
            <div class="row">
                ${Object.values(q).map(n=>{let r=J[n];return T`
                        <button
                            class=${[n===t?`selected`:``,Kl(e.snapshot.coins,n)?``:`unaffordable`].join(` `)}
                            ${we(`click`,()=>{e.actions.selectTowerType(n===t?void 0:n)})}
                        >
                            <div class="content">
                                <div class="swatch" style="background: ${r.color}"></div>
                                <div class="text">
                                    <span class="label">${r.label}</span>
                                    <span class="hotkey">[${r.hotkey}]</span>
                                    <span class="cost">
                                        🪙 ${H.towerCost[n]}
                                    </span>
                                </div>
                            </div>
                        </button>
                    `})}
            </div>
        `}}),Mu=ge()({tagName:`game-hud`,styles:A`
        :host {
            color: white;
            display: block;
            font-family: sans-serif;
            inset: 0;
            pointer-events: none;
            position: absolute;
        }
    `,render({inputs:e}){return T`
            <${Ou.assign({snapshot:e.snapshot})}></${Ou}>
            <${ju.assign({snapshot:e.snapshot,actions:e.actions})}></${ju}>
            <${Au.assign({snapshot:e.snapshot,actions:e.actions})}></${Au}>
            <${ku.assign({snapshot:e.snapshot,actions:e.actions})}></${ku}>
            <${hu.assign({snapshot:e.snapshot})}></${hu}>
            <${fu.assign({snapshot:e.snapshot})}></${fu}>
            <${pu.assign({snapshot:e.snapshot})}></${pu}>
            <${wu.assign({snapshot:e.snapshot,actions:e.actions})}></${wu}>
            <${du.assign({snapshot:e.snapshot})}></${du}>
            <${Tu.assign({snapshot:e.snapshot,actions:e.actions})}></${Tu}>
            <${Su.assign({snapshot:e.snapshot,actions:e.actions})}></${Su}>
        `}}),Nu={[G.Perfect]:U.ServePerfect,[G.Incomplete]:U.ServeBad,[G.Raw]:U.ServeRaw},Pu,Fu,Iu=!1,Lu,Ru=-1;function zu(e){let t=e.runState;if(!t)return;let n=t.lastServing,r=e.entityStore?e.entityStore.getEntities(nu).size:0,i=t.status===W.Playing;i&&n&&n.servedAtMs!==Pu&&Gs(Nu[n.result]),i&&Fu!=null&&r>Fu&&Gs(U.Build),i&&t.lastSteal&&t.lastSteal.atMs!==Lu&&Gs(U.ServeRaw),i&&t.lastBossSpawnAtMs>=0&&t.lastBossSpawnAtMs!==Ru&&Gs(U.BossArrives),Ru=t.lastBossSpawnAtMs,Lu=t.lastSteal?.atMs,Pu=n?.servedAtMs,Fu=r}var Bu=Ne({modName:`hud`,execute({state:e}){if(e.runState&&(e.runState.status===W.Won||e.runState.status===W.Lost)&&e.ui&&(e.ui.keys.includes(`r`)||e.ui.keys.includes(`R`))&&cu(e).restartRun(),e.runState?.status===W.Playing&&e.ui){let t=e.ui.keys.some(e=>e===`p`||e===`P`),n=e.ui.keys.includes(`Escape`)&&!Iu;(t||n)&&cu(e).togglePause()}Iu=!!(e.ui?.selectedTowerType||e.ui?.selectedTopping||e.ui?.selectedTowerId!=null),e.runState?.status===W.Ready&&e.ui?.keys.includes(` `)&&cu(e).beginRun(),(e.ui?.keys.includes(`m`)||e.ui?.keys.includes(`M`))&&Vs(!Bs()),zu(e);let t=Ns();return e.audioChannelVolume?.channels?.[os.Music]!==t.music&&(e.audioChannelVolume={channels:{[os.Music]:t.music,[os.Effects]:t.effects},master:1}),T`
            <${Mu.assign({snapshot:uu(e),actions:cu(e)})}></${Mu}>
        `}});function Vu(e,t){let n=e.pixi?.canvas;if(n&&e.virtualViewport)return Zo({canvasBounds:n.getBoundingClientRect(),clientPoint:{x:t.clientX,y:t.clientY},virtualViewport:e.virtualViewport})}var Hu={clicks:[],keys:[],wheelSteps:0},Uu=Ne({modName:`input`,execute({state:e}){if(!e.ui)return;e.ui.clicks=Hu.clicks,e.ui.keys=Hu.keys,Hu.clicks=[],e.ui.wheelSteps=Hu.wheelSteps,Hu.keys=[],Hu.wheelSteps=0;let t=e.pixi?.canvas;if(e.inputListenersAttached||!t)return;e.inputListenersAttached=!0;let n=e.ui;t.addEventListener(`pointermove`,t=>{n.pointerWorld=Vu(e,t)}),t.addEventListener(`pointerleave`,()=>{n.pointerWorld=void 0}),t.addEventListener(`pointerdown`,t=>{if(t.button!==0&&t.button!==2)return;let n=Vu(e,t);n&&Hu.clicks.push({...n,button:t.button===0?`left`:`right`})}),t.addEventListener(`contextmenu`,e=>{e.preventDefault()}),t.addEventListener(`wheel`,e=>{e.preventDefault(),Hu.wheelSteps+=Math.sign(e.deltaY)},{passive:!1}),globalThis.addEventListener(`keydown`,e=>{e.repeat||Hu.keys.push(e.key)})}}),Wu,Gu=14,Ku=Ne({modName:`topping-input`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(t&&n&&e.entityStore&&e.runState){if((!Wu||Wu.destroyed)&&(Wu=new N,Wu.zIndex=1e3,t.sortableChildren=!0,t.addChild(Wu)),Wu.clear(),e.runState.status!==W.Playing||e.runState.paused){n.selectedTopping=void 0;return}for(let e of n.keys){if(e===`Escape`){n.selectedTopping=void 0;continue}let t=Object.values(Y).find(t=>Lc[t].hotkey===e.toLowerCase());t&&(n.selectedTopping=n.selectedTopping===t?void 0:t,n.selectedTopping&&(n.selectedTowerType=void 0))}for(let t of n.clicks){if(t.button===`right`){n.selectedTopping=void 0;continue}if(!n.selectedTopping)continue;let r,i=1/0;for(let n of e.entityStore.getEntities(gl)){if(n.params.dropInMs>0)continue;let e=Math.hypot(n.params.x-t.x,n.params.y-t.y);e<=ds[n.params.size].radius+ws.clickSlopPx&&e<i&&(r=n,i=e)}r&&!r.params.served&&ru(e,{type:Z.ApplyTopping,potatoId:r.params.potatoId,topping:n.selectedTopping})}n.selectedTopping&&n.pointerWorld&&Wu.circle(n.pointerWorld.x,n.pointerWorld.y,Gu).fill({color:Lc[n.selectedTopping].color}).stroke({color:`#ffffff`,width:3})}}});function qu(e){return(e%360+360)%360}var Ju,Yu,Xu=Ne({modName:`tower-placement`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(!t||!n||!e.entityStore||!e.level||!e.runState)return;if((!Ju||Ju.destroyed)&&(Ju=new N,Ju.zIndex=1e3,t.sortableChildren=!0,t.addChild(Ju)),(!Yu||Yu.destroyed)&&(Yu=new io({text:``,style:{fill:`#ffffff`,fontSize:24,stroke:{color:`#000000`,width:4}}}),Yu.anchor.set(.5,0),Yu.zIndex=1e3,t.addChild(Yu)),Ju.clear(),Yu.visible=!1,e.runState.status!==W.Playing||e.runState.paused){n.selectedTowerType=void 0,n.selectedTowerId=void 0,Ju.visible=!1;return}Ju.visible=!0;for(let t of n.keys){if(t===`Escape`){n.selectedTowerType=void 0,n.selectedTowerId=void 0;continue}if(n.selectedTowerId!=null&&(t===`u`||t===`U`)){ru(e,{type:Z.UpgradeTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`s`||t===`S`)){ru(e,{type:Z.ServiceTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`x`||t===`X`)){ru(e,{type:Z.SellTower,towerId:n.selectedTowerId}),n.selectedTowerId=void 0;continue}if(n.selectedTowerType===q.Knife&&(t===`[`||t===`]`)){n.placementAngleDeg=qu(n.placementAngleDeg+(t===`]`?1:-1)*sc.rotateStepDeg);continue}let r=Object.values(q).find(e=>J[e].hotkey===t);r&&(n.selectedTowerType=n.selectedTowerType===r?void 0:r,n.selectedTowerType&&(n.selectedTopping=void 0))}n.selectedTowerType===q.Knife&&n.wheelSteps!==0&&(n.placementAngleDeg=qu(n.placementAngleDeg+n.wheelSteps*sc.rotateStepDeg));let r=[...e.entityStore.getEntities(nu)].map(e=>({x:e.params.x,y:e.params.y,towerId:e.params.towerId}));(n.selectedTowerType||n.selectedTopping||!r.some(e=>e.towerId===n.selectedTowerId))&&(n.selectedTowerId=void 0);for(let t of n.clicks)if(t.button===`right`)n.selectedTowerType=void 0,n.selectedTowerId=void 0;else if(!n.selectedTowerType&&!n.selectedTopping)n.selectedTowerId=r.find(e=>Math.hypot(e.x-t.x,e.y-t.y)<=ys.radius)?.towerId;else if(n.selectedTowerType&&!n.selectedTopping){let i=Math.round(t.x),a=Math.round(t.y);Kl(e.runState.coins,n.selectedTowerType)&&Gl({level:e.level,towers:r,point:{x:i,y:a}}).valid&&ru(e,{type:Z.PlaceTower,towerType:n.selectedTowerType,x:i,y:a,angleDeg:n.placementAngleDeg})}if(!n.selectedTowerType||!n.pointerWorld)return;let i=J[n.selectedTowerType],{x:a,y:o}=n.pointerWorld,s=Gl({level:e.level,towers:r,point:{x:a,y:o}}),c=Kl(e.runState.coins,n.selectedTowerType),l=s.valid&&c;(!s.valid||!c)&&(Yu.text=s.valid?`Not enough coins`:s.reason,Yu.position.set(a,o+ys.radius+8),Yu.visible=!0);let{rangePx:u}=Cc(n.selectedTowerType,1);if(n.selectedTowerType===q.Knife){let e=Bl({origin:{x:a,y:o},angleDeg:n.placementAngleDeg,lengthPx:u});Ju.moveTo(e.start.x,e.start.y).lineTo(e.end.x,e.end.y).stroke({color:sc.lineColor,alpha:.6,width:sc.lineWidthPx})}else Ju.circle(a,o,u).stroke({color:`#ffffff`,alpha:.5,width:3});Ju.circle(a,o,ys.radius).fill({color:i.color,alpha:.5}).stroke({color:l?`#3cff6e`:`#ff3c3c`,width:5})}}),Zu=function(e){return e.Dev=`dev`,e.Prod=`prod`,e}({});function Qu(e){return e===`bdemann.github.io`?`prod`:`dev`}var $u=Qu(globalThis.location.hostname);function ed({passWaitMs:e,ms:t}){let n=Math.min(t,Math.max(0,e-Mc.heatLampGraceMs));return Mc.heatLampQualityPerSecond*n/1e3}function td(e){return e-Mc.passSlots*Mc.queueSpacingPx}var nd=class extends pc({key:`PassEntity`,paramsShape:t({msUntilWaiter:0})}){update({msSinceLastExecute:e}){let{level:t,entityStore:n}=this.state,r=[];for(let i of n.getEntities(gl)){if(i.params.served||i.params.carriedBySeagull||i.params.dropInMs>0)continue;let n=qs(Zs(t,i.params.pathId));i.params.distancePx>=td(n)?(r.push(i),i.params.passWaitMs+=e,i.params.quality=Math.max(0,i.params.quality-ed({passWaitMs:i.params.passWaitMs,ms:e}))):i.params.passWaitMs=0}this.params.msUntilWaiter-=e;let i;for(let e of r)(!i||e.params.distancePx>i.params.distancePx)&&(i=e);if(!i)return;let a=i.params.distancePx>=qs(Zs(t,i.params.pathId))-1,o=this.params.msUntilWaiter<=0;a&&(o||r.length>Mc.passSlots)&&(i.serveAtCounter(),o&&(this.params.msUntilWaiter=Mc.waiterIntervalMs))}};function rd(e,t){let n=qs(t),r=td(n),i=Js(t,r),a=Js(t,n),o=Ys(t,r),s=t.widthPx/2,c=-o.y*s,l=o.x*s;e.poly([i.x-c,i.y-l,a.x-c,a.y-l,a.x+c,a.y+l,i.x+c,i.y+l]).fill({color:`#ff9800`,alpha:.18});let u=i.x-c*1.3,d=i.y-l*1.3;e.rect(u-22,d-10,44,20).fill({color:`#37474f`}),e.circle(u,d,9).fill({color:`#ffcc80`})}var id=class extends uc({key:`PassLampEntity`}){createView(){return{view:new N({zIndex:-.4})}}update(){}render(){let e=E.instanceOf(this.view,N);e.clear();for(let t of this.state.level.paths)rd(e,t)}},ad={grass:`#5b8c3a`,belt:`#4a4a4a`,beltRail:`#2b2b2b`,beltStripe:`#6a6a6a`,restaurant:`#c0392b`,restaurantRoof:`#f5e6c8`,text:`#ffffff`},od=class extends uc({key:`LevelEntity`}){createView(){let{level:e}=this.state,t=new Xe({zIndex:-1}),n=new N().rect(0,0,O.width,O.height).fill({color:ad.grass});e.paths.forEach(e=>{let[t,...r]=e.waypoints;t&&(n.moveTo(t.x,t.y),r.forEach(e=>n.lineTo(e.x,e.y)),n.stroke({color:ad.beltRail,width:e.widthPx+14,cap:`round`,join:`round`}),n.moveTo(t.x,t.y),r.forEach(e=>n.lineTo(e.x,e.y)),n.stroke({color:ad.belt,width:e.widthPx,cap:`round`,join:`round`}),n.circle(t.x,t.y,e.widthPx*.6).fill({color:ad.beltRail}))});let{restaurant:r}=e,i=r.sizePx/2;n.rect(r.x-i,r.y-i,r.sizePx,r.sizePx).fill({color:ad.restaurant}).stroke({color:ad.restaurantRoof,width:8}),t.addChild(n);let a=new io({text:`RESTAURANT`,style:{fill:ad.text,fontSize:32,fontWeight:`bold`}});return a.anchor.set(.5),a.position.set(r.x,r.y),t.addChild(a),e.paths.forEach(e=>{let n=e.waypoints[0];if(!n)return;let r=new io({text:`POTATOES`,style:{fill:ad.text,fontSize:22,fontWeight:`bold`}});r.anchor.set(0,1),r.position.set(n.x+8,n.y-e.widthPx/2-12),t.addChild(r)}),{view:t}}update(){}},sd=class extends uc({key:`BeltEntity`}){createView(){return{view:new N({zIndex:-.5})}}update(){}render(){let{level:e,runState:t}=this.state,n=E.instanceOf(this.view,N),r=fs.stripeSpacingPx,i=t.elapsedMs*t.beltSpeedPxPerMs%r;n.clear();for(let t of e.paths){let e=qs(t),a=(t.widthPx-16)/2;for(let o=i;o<=e;o+=r){let e=Js(t,o),r=Ys(t,o),i=-r.y*a,s=r.x*a;n.moveTo(e.x-i,e.y-s).lineTo(e.x+i,e.y+s)}}n.stroke({color:ad.beltStripe,width:4})}},cd={idle:`#2b2b2b`,active:`#ff8c1a`,rim:`#111111`},ld=class extends uc({key:`ChuteEntity`,paramsShape:on(Oo,t({pathId:``,distancePx:0,active:!1})),paramsMap:{view:{x:!0,y:!0}}}){drawnActive;createView(){let e=new N({zIndex:5});return this.drawHopper(e,this.params.active),{view:e}}drawHopper(e,t){this.drawnActive=t,e.clear().poly([-60,-80,60,-80,34,-10,-34,-10]).fill({color:t?cd.active:cd.idle}).stroke({color:cd.rim,width:5}).rect(-34,-10,68,12).fill({color:cd.rim})}update(){let e=!1;for(let t of this.state.entityStore.getEntities(gl))if(t.params.dropInMs>0&&t.params.pathId===this.params.pathId&&t.params.distancePx===this.params.distancePx){e=!0;break}this.params.active=e,this.drawnActive!==e&&this.drawHopper(E.instanceOf(this.view,N),e)}};function ud(e,t,n){if(e.status!==W.Playing)return;let r=e.orders.filter(t=>t.expiresAtMs<=e.elapsedMs);e.orders=e.orders.filter(t=>t.expiresAtMs>e.elapsedMs);for(let t of r){let n=Math.min(ps.max,Math.max(0,e.satisfaction+Ds.expiredSatisfaction));e.lastOrderEvent={kind:`expired`,dish:t.dish,atMs:e.elapsedMs,scoreDelta:0,satisfactionDelta:n-e.satisfaction},e.satisfaction=n,e.satisfaction<=0&&(e.status=W.Lost)}if(e.wavePhase!==`spawning`)return;let i=E.isDefined(Ds.byWave[e.waveIndex]??Ds.byWave[Ds.byWave.length-1]);for(e.msUntilNextOrder-=t;e.msUntilNextOrder<=0;){if(e.orders.length<i.maxOpen){let t=E.isDefined(i.dishes[Math.floor(n()*i.dishes.length)]),r=E.isDefined(Object.values(zc).find(e=>e===t));e.orders.push({orderId:e.nextOrderId++,dish:r,createdAtMs:e.elapsedMs,expiresAtMs:e.elapsedMs+i.lifetimeMs})}e.msUntilNextOrder+=i.intervalMs}}var dd=class extends pc({key:`OrderBoardEntity`,paramsShape:t({})}){update({msSinceLastExecute:e}){ud(this.state.runState,e,()=>this.state.seededRandom.next())}};function fd(e){return e.potatoCount*e.spawnIntervalMs/(e.seagullCount+1)}function pd(e,t,n){let r=[];if(e.wavePhase===`break`){if(e.breakRemainingMs-=n,e.breakRemainingMs<=0){e.wavePhase=`spawning`,e.spawnedInWave=0;let n=hs.waves[e.waveIndex];e.seagullsSpawnedInWave=0,n&&(e.beltSpeedPxPerMs=n.speedPxPerMs,e.msUntilNextSeagull=fd(n)),t.msUntilNextSpawn=0,e.msUntilNextOrder=Ds.firstOrderDelayMs}return r}if(e.wavePhase===`done`)return r;{let i=hs.waves[e.waveIndex];if(!i)return e.wavePhase=`done`,r;for(t.msUntilNextSpawn-=n;t.msUntilNextSpawn<=0&&e.wavePhase===`spawning`;)r.push({sizeWeights:i.sizeWeights,bossCount:e.spawnedInWave===Math.floor(i.potatoCount/2)?i.bossCount:0,chuteShare:i.chuteShare}),e.spawnedInWave++,t.msUntilNextSpawn+=i.spawnIntervalMs,e.spawnedInWave>=i.potatoCount&&(e.waveIndex>=hs.waves.length-1?e.wavePhase=`done`:(e.waveIndex++,e.wavePhase=`break`,e.breakRemainingMs=hs.breakMs));return r}}var md=class extends pc({key:`PotatoSpawnerEntity`,paramsShape:t({msUntilNextSpawn:0})}){async update({msSinceLastExecute:e}){let{runState:t,level:n}=this.state,r=pd(t,this.params,e);for(let e of r){for(let r of n.paths){if(!r.waypoints[0])continue;let n=al(e.sizeWeights,this.state.seededRandom.next()),i=ds[n].mashHp,a=r.chutes?.length?Pc({chutes:r.chutes,chuteShare:e.chuteShare,roll:this.state.seededRandom.next()}):void 0,o=a?.distancePx??0,s=Js(r,o);await this.addEntity(gl,{x:s.x,y:s.y,pathId:r.pathId,distancePx:o,dropInMs:a?gs.dropMs:0,size:n,cut:!1,cooked:!1,mashHp:i,maxMashHp:i,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,passWaitMs:0,potatoId:t.nextPotatoId,...Rc()}),t.nextPotatoId++,t.potatoesSpawned++;for(let t=0;t<e.bossCount;t++)await this.spawnBoss(r,jc(t))}e.bossCount>0&&(t.lastBossSpawnAtMs=t.elapsedMs)}await this.spawnSeagulls(e)}async spawnBoss(e,t){let{runState:n}=this.state,r=e.waypoints[0];r&&(await this.addEntity(gl,{x:r.x,y:r.y,pathId:e.pathId,distancePx:0,dropInMs:0,size:rl.King,cut:!1,cooked:!1,mashHp:t,maxMashHp:t,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,passWaitMs:0,potatoId:n.nextPotatoId,...Rc()}),n.nextPotatoId++,n.potatoesSpawned++)}async spawnSeagulls(e){let{runState:t}=this.state,n=hs.waves[t.waveIndex];if(t.wavePhase!==`spawning`||!n||(t.msUntilNextSeagull-=e,t.msUntilNextSeagull>0||t.seagullsSpawnedInWave>=n.seagullCount))return;let r=vl({rollEdge:this.state.seededRandom.next(),rollAlong:this.state.seededRandom.next()});await this.addEntity(Ol,{x:r.x,y:r.y,flying:this.state.seededRandom.next()<_s.flyChance,hp:_s.hp,phase:Dl.approach,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1}),t.seagullsSpawnedInWave++,t.msUntilNextSeagull=fd(n)}},hd=[od,sd,ld,gl,md,dd,nu,Ol,nd,id];function gd(e){return e?AbortSignal.timeout(Te(e,{milliseconds:!0}).milliseconds):void 0}async function _d(e,t){return t?(t.throwIfAborted(),await new Promise((n,r)=>{let i=new AbortController;t.addEventListener(`abort`,()=>{r(Fe(t.reason))},{once:!0,signal:i.signal}),e.then(n,r).finally(()=>{i.abort()})})):await e}var vd=class extends Error{name=`RoomRejectionError`;room;constructor(e){super(`Room connection rejected`),this.room=Jt(e,[`roomPassword`])}},yd=class extends Error{name=`DefineApiError`};function bd(e){return{apiName:e.apiName,endpoints:e.endpoints?xd(`endpoints`,e.endpoints):{},webSockets:e.webSockets?xd(`webSockets`,e.webSockets):{}}}function xd(e,t){let n=new Set,r=t.reduce((e,t)=>(t.path in e?n.add(t.path):e[t.path]=t,e),{});if(n.size)throw new yd(`Duplicate API ${e} paths: ${Array.from(n).join(`,`)}`);return r}function Sd(e){return e}function Cd(e,t){return e.requests[t]}P.Get,P.Put,P.Post,P.Delete,P.Patch,P.Trace,P.Post,P.Put,P.Patch,P.Delete;function wd(e){return e}function Td(e,...t){let n=t[0]?.pathParams,r=0,i=e.path.replaceAll(/\/:([^/]+)/g,(e,t)=>{if(r++,n&&k.hasKey(n,t)&&n[t])return D({value:n[t],prefix:`/`});throw Error(`Missing value for path param '${t}'.`)}).replace(/\/\*$/,()=>{if(r++,n?.wildcard==null)throw Error(`Missing value for wildcard param.`);return D({value:n.wildcard,prefix:`/`})});if(!r&&n)throw Error(`Route '${e.path}' does not allow any path params but some were set.`);return i}var Ed=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Dd(e){let t=new Set,n=-1,r=-1,i=0;for(;i<e.length;i++){let a=e.codePointAt(i);if(r===-1&&Ed[a]===1)n===-1&&(n=i);else if(i!==0&&(a===32||a===9))r===-1&&n!==-1&&(r=i);else if(a===44){if(n===-1)throw SyntaxError(`Unexpected character at index ${i}`);r===-1&&(r=i);let a=e.slice(n,r);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),n=r=-1}else throw SyntaxError(`Unexpected character at index ${i}`)}if(n===-1||r!==-1)throw SyntaxError(`Unexpected end of input`);let a=e.slice(n,i);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);return t.add(a),t}function Od(e){if(e&&e!==`undefined`)return ie(()=>JSON.parse(e),{fallbackValue:e})}function kd(e,t){t.forEach(t=>{e.delete(t)})}function Ad(e,t){let n=t.toLowerCase(),r=m(e,(e,t)=>({key:e.toLowerCase(),value:t}))[n];return r==null?[]:k.isNumber(r)?[String(r)]:oe(r)}var jd=`rest-vir-api`;async function Md(e,{startOrigin:t,...n}){try{let r=Object.values(e.endpoints)[0];if(!r)throw Error(`Api has no endpoints.`);let{port:i}=await Pe.isDefined(async()=>({port:await Nd(t,r,{...n,isValidResponse(t){return t.headers.get(jd)===e.apiName}})}),{timeout:n.timeout});if(!i)return;let{origin:a}=zn(t,{port:i});return{port:i,origin:a}}catch(t){throw ze(t,`Cannot find dev origin for service '${e.apiName}'`)}}async function Nd(e,t,{fetchOverride:n,maxScanDistance:r=100,isValidResponse:i,timeout:a={seconds:10}}){let{port:o}=Rn(e);if(!o)return;let s=Number(o);if(!k.isNumber(s))throw TypeError(`Origin '${e}' doesn't have a valid port: '${o}'.`);let c=0,l=!1,u=Te(a,{milliseconds:!0}).milliseconds,d=Date.now();for(;!l;){let a=c+s;if(Date.now()-d>=u)throw Error(`Port scan timeout reached. Last scanned port: ${a-1}`);let o=zn(e,{pathname:t.path,port:a}).href,f=await ie(()=>(n||fetch)(o,{method:P.Options},t));if(!k.instanceOf(f,Error)&&f.ok&&(!i||i(f)))l=!0;else if(c>=r)throw Error(`Max port scan distance reached. Last scanned port: ${a}`);else c++}return c+s}function Pd(e){let t=Number(e),n=String(e);if(k.isEnumValue(t,_e))return t;console.error(`Invalid HTTP status: ${e}`);let r=Math.floor((Number(n[0])||0)*100);return k.isEnumValue(r,_e)?r:_e.InternalServerError}async function Fd({endpoint:e,method:t,response:n,handleDeclaredResponseStatusOverride:r,includeResponse:i,shouldCondenseResponse:a}){let o=Cd(e,t),s=Pd(n.status),c=o?.responses[s],l={status:s,...i?{response:n}:{}};if(c){let t=await(r||Id)({endpoint:e,responseDefinition:c,response:n});return a&&Ld(n),{[zd[s]]:{...l,responseData:t,headers:Rd(n.headers)}}}if(se(s)){let e=await Bd(n);return a&&Ld(n),{unexpectedError:{...l,responseData:e,headers:Rd(n.headers)}}}throw Error(`Received unexpected successful response status from endpoint '${e.path}': ${s}`)}async function Id({response:e,responseDefinition:t,endpoint:n}){let r=await Vd(e);if(t.responseData)a(r,t.responseData,{allowExtraKeys:!0},`Response from endpoint '${n.path}' has invalid data.`);else if(r!==void 0)throw Error(`Response from endpoint '${n.path}' has unexpectedly present data.`);return r}function Ld(e){kd(e.headers,[`access-control-allow-credentials`,`access-control-allow-origin`,`access-control-expose-headers`,`connection`,`content-length`,`content-type`,`date`,`keep-alive`,`vary`,jd])}function Rd(e){return Object.fromEntries(e.entries())}var zd=me(e(_e).map(([e,t])=>[t,e]));async function Bd(e){return await e.clone().text()||void 0}async function Vd(e){let t=await Bd(e);return t&&Od(t)}function Hd(e,t,n){if(t){if(!n)throw Error(`Endpoint '${String(e)}' has required headers but none were set.`);return m(t,(t,r)=>{let i=Ad(n,t)[0];if(r instanceof RegExp){if(!i||!r.test(i))throw Error(`Route '${String(e)}' required header '${t}' value does not match RegExp requirement: '${C(i)}'`)}else de.tsType(r).equals(),a(i,r,{allowExtraKeys:!0},`Route '${String(e)}' required header '${t}' value does not match shape requirement: '${C(i)}'`);if(i)return{key:t,value:i}})}if(n&&Object.keys(n).length)throw Error(`Endpoint '${String(e)}' has no required headers but some were set.`);return{}}function Ud(t,n){let r=n??{},i={};return e(t||{}).forEach(([e,t])=>{let n=r[e],a=Wd(e,n,t);a!=null&&(i[e]=a)}),Re(r).forEach(e=>{if(!(t&&e in t)){let t=r[e],n=Yd(t);n!==void 0&&(i[e]=n)}}),i}function Wd(e,t,n){return n instanceof RegExp?Kd(e,t,n):k.isArray(n)?qd(e,t,n):Gd(e,t,n)}function Gd(e,t,n){let r=Jd(t),i=!t||k.isArray(t)?void 0:[C(t)],o=!k.isArray(t)||t.length!==1?void 0:String(t[0]);if(v(r,n,{allowExtraKeys:!0}))return r;if(i&&v(i,n,{allowExtraKeys:!0}))return i;if(o&&v(o,n,{allowExtraKeys:!0}))return o;a(t,n,{allowExtraKeys:!0},`Search param '${e}' value does not match shape requirement: '${C(t)}'`)}function Kd(e,t,n){let r=k.isArray(t)&&t.length===1?t[0]:t;if(r==null)throw Error(`Search param '${e}' is required but was not provided.`);if(k.isArray(r))throw TypeError(`Search param '${e}' expects a single value but got multiple: '${C(t)}'`);let i=C(r);if(!i||!n.test(i))throw Error(`Search param '${e}' value does not match RegExp requirement: '${C(i)}'`);return i}function qd(e,t,n){let r=k.isArray(t)?t:t==null?[]:[t];if(!r.length)throw Error(`Search param '${e}' is required but was not provided.`);return r.map((t,r)=>{let i=String(t);if(!i)throw Error(`Search param '${e}' value at index ${r} is empty: '${C(i)}'`);if(!n.some(e=>e.test(i)))throw Error(`Search param '${e}' value at index ${r} does not match any RegExp requirement: '${C(i)}'`);return i})}function Jd(e){return e==null?e:k.isArray(e)?Ie(e,e=>String(e),k.isDefined):C(e)}function Yd(e){if(e!=null){if(k.isArray(e)){let t=e.filter(k.isDefined).map(e=>String(e));return t.length?t:void 0}return C(e)}}var Xd;(function(e){e[e.Connecting=0]=`Connecting`,e[e.Open=1]=`Open`,e[e.Closing=2]=`Closing`,e[e.Closed=3]=`Closed`})(Xd||={});var Zd;(function(e){e.OnHost=`on-host`,e.OnClient=`on-client`})(Zd||={});async function Qd(e,t,n){let r=nf(e,t,Zd.OnClient);return n?.open&&r.addEventListener(`open`,n.open),n?.error&&r.addEventListener(`error`,n.error),n?.message&&r.addEventListener(`message`,n.message),n?.close&&r.addEventListener(`close`,n.close),await ef(t),r}function $d(e){return k.isObject(e)?(delete e.webSocket,k.hasKey(e,`webSocketDefinition`)&&k.hasKey(e.webSocketDefinition,`path`)&&(e.path=e.webSocketDefinition.path),delete e.webSocketDefinition,e):e}async function ef(e){let t=new ye;function n(e){t.isSettled||t.reject(ze($d(e),`WebSocket connection failed.`))}e.addEventListener(`error`,n),Pe.isTruthy(()=>t.isSettled?!0:e.readyState===Xd.Closed?(t.reject(`WebSocket closed while waiting for it to open.`),!0):e.readyState===Xd.Open&&(t.resolve(),!0),void 0,`WebSocket never opened`).catch(e=>{t.isSettled||t.reject($d(e))}),await t.promise.finally(()=>{e.removeEventListener(`error`,n)})}function tf(e){return e===Zd.OnClient?Zd.OnHost:Zd.OnClient}function nf(e,t,n){let r=t.send,i=t.close,a=t.addEventListener,o=t.removeEventListener,s=t,c=new ye;s.addEventListener(`close`,()=>{Lt(()=>{c.resolve()})});let l={};return Object.assign(s,{originalListenerMap:l,async close(){i.call(s),s.readyState===Xd.Closed&&c.resolve(),await c.promise},addEventListener(t,r){function i(i){let a={event:i,webSocket:s,webSocketDefinition:e};if(t===`message`){let t=rf(e,Od(String(i.data)),tf(n));return r({...a,message:t})}return r(a)}return le(l,t,()=>new WeakMap).set(r,i),a.call(s,t,i)},removeEventListener(e,t){let n=l[e]?.get(t);n&&(l[e]?.delete(t),o.call(s,e,n))},async sendAndWaitForReply({message:t,timeout:n={seconds:10},replyCheck:r}={}){let i=new ye;async function a({message:e}){i.isSettled||(!r||await ie(()=>r(e))===!0)&&i.resolve(e)}let o=setTimeout(()=>{i.isSettled||i.reject(`WebSocket '${e.path}' message timeout: got no reply.`)},Te(n,{milliseconds:!0}).milliseconds);s.addEventListener(`message`,a),s.send(t);try{return await i.promise}finally{clearTimeout(o),s.removeEventListener(`message`,a)}},send(t){r.call(s,String(JSON.stringify(rf(e,t,n))))}}),s}function rf(e,t,n){let r=n===Zd.OnClient?e.clientMessage:e.hostMessage;if(r)a(t,r,{allowExtraKeys:!0});else if(t!==void 0)throw TypeError(`WebSocket '${e.path}' does not expect any message data from the ${n===Zd.OnClient?`client`:`host`} but received it: ${C(t)}.`);return t}function af(e,t){return k.isArray(t)?t.some(t=>af(e,t)):t instanceof RegExp?t.test(e):g(t)?v(e,t,{allowExtraKeys:!0}):!1}function of(e,t){if(!e||!e.length)return;let n=e.join(`, `),r=t.connectProtocol;r&&e.forEach(e=>{if(!af(e,r))throw Error(`WebSocket protocol '${e}' failed protocol requirement in WebSocket '${t.path}'.`)});try{Dd(n)}catch(e){throw ze(e,`Invalid protocols given to WebSocket '${t.path}': [${n}]`)}}var sf=class{api;baseUrl;fetchOverride;webSocketConstructor;constructor(e,t,n,r){this.api=e,this.baseUrl=t,this.fetchOverride=n,this.webSocketConstructor=r}fetch(e){return m(e.requests,t=>({key:t,value:async(...n)=>await this.runEndpointRequest(e,t,n[0])}))}async fetchStream(e,t,...n){return await this.runEndpointRequest(e,t,n[0],({response:t})=>{if(!t.body)throw Error(`Endpoint '${e.path}' returned an ok response with no body to stream.`);return t.body})}async runEndpointRequest(e,t,n,r){if(!k.hasKey(this.api.endpoints,e.path))throw Error(`Cannot fetch: this api has no '${e.path}' endpoint.`);let{requestInit:i,url:a}=this.buildEndpointRequestInit(e,t,n);return await Fd({endpoint:e,method:t,response:await(n?.fetchOverride||this.fetchOverride||fetch)(a,i,e),includeResponse:!0,handleDeclaredResponseStatusOverride:r,shouldCondenseResponse:!1})}buildEndpointUrl(e,t,n){let r=n,i=Cd(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=Ud(i.searchParams,r.searchParams),o=Td(e,{pathParams:r.pathParams});return zn(this.baseUrl,{search:a,pathname:o},{encoding:xn.Encode}).href}buildEndpointRequestInit(e,t,n){let r=n,i=Cd(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=Hd(e.path,i.requiredRequestHeaders,r?.requiredHeaders),o=!!r&&`requestData`in r&&r.requestData!==void 0,s={...m(r?.options?.headers instanceof Headers?me(Array.from(r.options.headers.entries())):k.isArray(r?.options?.headers)?me(r.options.headers):r?.options?.headers||{},(e,t)=>({key:e.toLowerCase(),value:t})),...a};s[`content-type`]||r?.requestData instanceof FormData||r?.skipAutomaticContentTypeHeader||o&&(s[`content-type`]=`application/json`);let c=!!s[`content-type`]?.match(/\bjson\b/i);return{url:this.buildEndpointUrl(e,t,r||{}),requestInit:{...r?.options,headers:s,method:t,...o?c?{body:JSON.stringify(r.requestData)}:{body:r.requestData}:{}}}}async connectWebSocket(e,...t){let n=t[0];of(n?.protocols,e);let r=this.buildWebSocketUrl(e,n);return await Qd(e,new((n?.webSocketConstructor)||this.webSocketConstructor||cf)(r,n?.protocols,e),n?.listeners)}buildWebSocketUrl(e,t){let n=t,r=e,i=Ud(r.searchParams,n?.searchParams),a=Td(r,{pathParams:n?.pathParams}),o=zn(this.baseUrl,{search:i,pathname:a},{encoding:xn.Encode}).href;return zn(o,{protocol:o.startsWith(`https`)?`wss`:`ws`}).href}},cf=function(...[e,t]){return new globalThis.WebSocket(e,t)},lf={room:`r_`,client:`c_`,socketMessage:`sm_`},uf=ne(lf,(e,t)=>()=>`${t}${Yt()}`),df=ne(lf,e=>tn({checkValue(t){return k.isString(t)&&t.startsWith(lf[e])},default:``,name:`${e} multiplayer id shape`})),Q;(function(e){e.Offer=`offer`,e.Answer=`answer`,e.OfferResult=`offer-result`,e.HostPing=`host-ping`,e.Error=`error`})(Q||={});var ff=t({type:nn(Q.Answer),sdp:``}),pf=t({type:nn(Q.Offer),sdp:``}),mf=t({clientId:df.client(),roomId:df.room(),roomName:``}),hf=t({messageId:df.socketMessage()}),gf=t(on(mf,hf,{type:nn(Q.Answer),data:I({rejected:nn(!0)},ff)})),_f=t(on(mf,hf,{type:nn(Q.HostPing),clientSecret:``,clientCount:-1,roomPassword:``})),vf=t(on(mf,hf,{type:nn(Q.Offer),data:pf})),yf=t(on(vf,hf,{clientSecret:``,roomPassword:``})),bf=t(on(hf,{type:nn(Q.OfferResult),hostClientId:df.client()})),xf=t(on(hf,{type:nn(Q.Error),errorMessage:``})),Sf=t({roomName:``,roomId:df.room(),clientCount:-1,hasRoomPassword:!1}),Cf=t(cn({keys:df.room(),values:Sf,partial:!0})),wf=zn(`http://localhost`,{port:9348}).origin,Tf=Sd({path:`/`,requests:{[P.Get]:{responses:{[_e.Ok]:{responseData:nn(`ok`)}}}}}),Ef=Sd({path:`/health`,requests:{[P.Get]:{responses:{[_e.Ok]:{responseData:nn(`ok`)}}}}}),Df=Sd({path:`/rooms`,requests:{[P.Get]:{responses:{[_e.Ok]:{responseData:Cf}},searchParams:{gameId:mn(``)}}}}),Of=wd({path:`/connect`,clientMessage:I(gf,yf,_f),hostMessage:I(gf,vf,bf,xf),searchParams:{gameId:mn(``)}}),kf=bd({apiName:`multiplayer-api`,endpoints:[Tf,Ef,Df],webSockets:[Of]});async function Af({backendOrigin:e,portScanOptions:t,timeout:n}){let r=e||wf,i=k.isBoolean(t)?void 0:t,a=gd(n);return new sf(kf,(t?await Md(kf,{startOrigin:r,timeout:n,...i,fetchOverride(e,t,n){let r={...t,signal:a??null};return i?.fetchOverride?i.fetchOverride(e,r,n):globalThis.fetch(e,r)}}):void 0)?.origin||r)}function jf(e){return{type:e.type,sdp:e.sdp}}var Mf=class extends o()(`webrtc-message`){},Nf=class extends o()(`webrtc-connect`){};function Pf(e){return e.map(e=>({urls:D({value:e,prefix:`stun:`})}))}var Ff=class extends Me{clientId;dataChannel;connection;isConnected=!1;constructor(e){super(),this.clientId=e}async createOffer(e){let t=this.createConnection(e);de.isDefined(this.connection),this.handleDataChannel(this.connection.createDataChannel(`chat`)),await this.connection.setLocalDescription(await this.connection.createOffer()),await t;let n=jf(E.isDefined(this.connection.localDescription));return a(n,pf),n}async acceptAnswer(e){let t=k.isString(e)?JSON.parse(e):e;de.isDefined(this.connection),a(t,ff),await this.connection.setRemoteDescription(t)}async createAnswer(e,t){let n=k.isString(e)?JSON.parse(e):e,r=this.createConnection(t);de.isDefined(this.connection),this.connection.addEventListener(`datachannel`,e=>{this.handleDataChannel(e.channel)}),await this.connection.setRemoteDescription(n),await this.connection.setLocalDescription(await this.connection.createAnswer()),t.length&&await r;let i=jf(E.isDefined(this.connection.localDescription));return a(i,ff),i}sendMessage(e){de.isTrue(this.isConnected,`There is no WebRTC connection to send a message to from ${this.clientId}.`),de.isDefined(this.dataChannel,`There is no WebRTC connection to send a message to from ${this.clientId}.`),this.dataChannel.send(JSON.stringify(e))}destroy(){this.dataChannel?.close(),this.connection?.close(),super.destroy()}handleDataChannel(e){this.dataChannel?.close(),this.dataChannel=e,this.dataChannel.addEventListener(`open`,()=>{d(this).isConnected=!0,this.dispatch(new Nf({detail:!0}))}),this.dataChannel.addEventListener(`closing`,()=>{d(this).isConnected=!1,this.dispatch(new Nf({detail:!1}))}),this.dataChannel.addEventListener(`message`,e=>{let t=ie(()=>k.isString(e.data)?JSON.parse(e.data):e.data,{fallbackValue:e.data});this.dispatch(new Mf({detail:t}))})}createConnection(e){if(this.connection)throw Error(`Connection already created!`);let t=new ye,n=e=>{e.candidate||(de.isDefined(this.connection),t.resolve(),this.connection.removeEventListener(`icecandidate`,n))};return this.connection=new RTCPeerConnection({iceServers:Pf(e)}),this.connection.addEventListener(`icecandidate`,n),t.promise}},If=class extends o()(`webrtc-multiplayer-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},Lf=class extends o()(`webrtc-multiplayer-connection-update`){},Rf=class e extends Me{gameId;multiplayerApiClient;stunServerUrls;multiplayerRoom;clientId;shouldAllowConnectionCheck;hostClientId;connections={};webSocket;clientSecret=It(32);isDestroyed=!1;hostPingTimeoutId;reconnectPromise;isCleaningUpConnection=!1;constructor(e,t,n,r,i=uf.client(),a=()=>!0){super(),this.gameId=e,this.multiplayerApiClient=t,this.stunServerUrls=n,this.multiplayerRoom=r,this.clientId=i,this.shouldAllowConnectionCheck=a}isHost(){return this.hostClientId===this.clientId}getConnectedClientIds(){return Ie(be(this.connections),e=>e.clientId,(e,t)=>t.isConnected)}getAllClientIds(){let e=this.getConnectedClientIds(),t=this.isHost()?[...e,this.clientId]:this.hostClientId&&this.isConnected()?[...e,this.clientId,this.hostClientId]:e;return i(t)}isConnected(){return this.isHost()||!!this.getConnectedClientIds().length}destroy(){d(this).isDestroyed=!0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,Object.values(this.connections).forEach(e=>e.destroy()),this.webSocket?.close(),this.connectionQueue.destroy(),super.destroy()}sendMessage(e){Object.values(this.connections).forEach(t=>{if(t.isConnected)try{t.sendMessage(e)}catch(e){w.error(ue(e))}})}sendToOnlyOneClient(e,t){if(!this.isHost()){w.error(Error(`Cannot send to an individual client as not a host.`));return}let n=this.connections[e];if(!n||!n.isConnected){w.error(Error(`Cannot send to missing or disconnected client ('${e}')`));return}n.sendMessage(t)}async initConnection({abortSignal:e}={}){if(Object.values(this.connections).length)return!1;try{let t=await _d(this.createNewConnection(this.clientId).createOffer(this.stunServerUrls),e),n=await _d((await this.setupWebSocket(e)).sendAndWaitForReply({message:{messageId:uf.socketMessage(),type:Q.Offer,clientId:this.clientId,clientSecret:this.clientSecret,data:t,...this.multiplayerRoom},replyCheck(e){return e.type===Q.OfferResult}}),e);return de.strictEquals(n.type,Q.OfferResult),await _d(Pe.isDefined(()=>this.hostClientId),e),this.sendHostPing(),!0}catch(e){this.isCleaningUpConnection=!0;try{this.connections[this.clientId]?.destroy(),delete this.connections[this.clientId],globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,await this.webSocket?.close(),this.webSocket=void 0}finally{this.isCleaningUpConnection=!1}throw e}}sendHostPing(){this.isHost()&&this.webSocket&&(this.webSocket.send({messageId:uf.socketMessage(),type:Q.HostPing,clientCount:this.getAllClientIds().length,clientId:this.clientId,clientSecret:this.clientSecret,...this.multiplayerRoom}),this.hostPingTimeoutId=setTimeout(()=>this.sendHostPing(),1e3))}reconnectAfterHostLoss(){this.isDestroyed||this.reconnectPromise||this.isCleaningUpConnection||(this.reconnectPromise=Rt(3,()=>this.initConnection(),{interval:{seconds:1}}).then(()=>void 0).catch(e=>{w.warning(ze(e,`Failed to reconnect to the multiplayer room.`))}).finally(()=>{this.reconnectPromise=void 0}))}connectionQueue=new en;async setupWebSocket(t){if(this.webSocket&&(this.webSocket.readyState===WebSocket.OPEN||this.webSocket.readyState===WebSocket.CONNECTING))return this.webSocket;let n=this.multiplayerApiClient.connectWebSocket(Of,{searchParams:{gameId:[this.gameId]},listeners:{message:async({message:t,webSocket:n})=>{try{if(t.type===Q.Offer){if(!this.isHost())throw Error(`Non-host multiplayer client received a WebRTC offer.`);let e={messageId:t.messageId,type:Q.Answer,roomId:t.roomId,roomName:t.roomName,clientId:t.clientId};await this.connectionQueue.add(async()=>{if(!this.shouldAllowConnectionCheck({connectingClientId:t.clientId,multiplayerController:this})){w.warning(`offer rejected`),n.send({...e,data:{rejected:!0}});return}w.faint(`received offer`);let r=this.createNewConnection(t.clientId),i=await r.createAnswer(t.data,this.stunServerUrls);n.send({...e,data:i}),await Pe.isTrue(()=>r.isConnected)})}else if(t.type===Q.Answer){if(this.isHost())throw Error(`Host multiplayer client received a WebRTC answer.`);let e=this.connections[this.clientId];if(`rejected`in t.data)w.warning(`offer was rejected`),this.destroy();else{if(w.faint(`received answer`),!e)throw Error(`Cannot accept answer, no init connection found.`);await e.acceptAnswer(t.data),await n.close()}}else if(t.type===Q.OfferResult){if(t.hostClientId!==this.hostClientId){if(d(this).hostClientId=t.hostClientId,this.isHost()){let e=this.connections[this.clientId];delete this.connections[this.clientId],e?.destroy()}this.dispatch(new Lf({detail:{newHost:t.hostClientId}}))}}else if(t.type===Q.Error)throw Error(t.errorMessage);else throw Error(`Unexpected ${e.name} WebSocket message type: ${t.type}`)}catch(e){w.error(ze(e,`WebSocket message failed: ${C(t)}`))}},error(e){w.error(e)},close:()=>{this.webSocket=void 0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0}}});try{let e=await _d(n,t);return this.webSocket=e,e}catch(e){throw n.then(e=>e.close(),()=>{}),e}}createNewConnection(e){let t=new Ff(e);return this.connections[e]=t,t.listen(Nf,n=>{n.detail?e!==this.clientId&&this.dispatch(new Lf({detail:{newMember:e}})):(t.destroy(),delete this.connections[e],this.isHost()?this.dispatch(new Lf({detail:{lostMember:e}})):(this.dispatch(new Lf({detail:{lostHost:e}})),this.reconnectAfterHostLoss()))}),t.listen(Mf,t=>{let n=e===this.clientId?this.hostClientId:e;n&&this.dispatch(new If(n,t.detail))}),t}},$;(function(e){e.Connecting=`connecting`,e.Connected=`connected`,e.Disconnected=`disconnected`})($||={});var zf={room:$.Disconnected,api:$.Disconnected},Bf=class extends o()(`multiplayer-controller-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},Vf=class extends o()(`multiplayer-controller-room-list`){},Hf=class extends o()(`multiplayer-controller-client-status`){},Uf=class extends o()(`multiplayer-controller-connection`){},Wf=class e extends Me{params;static events={MultiplayerControllerMessageEvent:Bf,MultiplayerControllerRoomListEvent:Vf,MultiplayerControllerClientStatusEvent:Hf,MultiplayerControllerConnectionEvent:Uf};events=e.events;static knownErrors={RoomRejectionError:vd};knownErrors=e.knownErrors;isListeningToRoomUpdates=!1;roomId;apiConnectionState=$.Disconnected;roomConnectionState=$.Disconnected;currentConnection;rejectedRoomIds=new Set;multiplayerApiClient;roomUpdateIntervalId;multiplayerParams;getClientId(){return this.currentConnection?.clientId}getConnectedClientIds(){return this.currentConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.currentConnection?.getAllClientIds()||[]}constructor(e){super(),this.params=e}async initMultiplayer(e){if(this.currentConnection)throw Error(`Cannot start multiplayer mode again when a multiplayer connection already present.`);this.multiplayerParams=e,this.updateConnectionState({api:$.Connecting});let t=gd(e.timeout);try{let n=e.multiplayerApiClient||await Af({portScanOptions:e.portScanOptions,backendOrigin:e.backendOrigin,timeout:e.timeout});if(!(await n.fetch(Ef).GET({options:{signal:t??null}})).Ok)throw Error(`Failed to find multiplayer API at ${n.baseUrl}.`);this.multiplayerApiClient=n,this.updateConnectionState({api:$.Connected})}catch(e){throw this.updateConnectionState({api:Fe(e)}),e}}startRoomUpdates(e){if(this.isListeningToRoomUpdates=!0,this.startRoomInterval(),e)return this.listen(Vf,async t=>{await e(t.detail)})}stopRoomUpdates(){this.isListeningToRoomUpdates=!1,this.stopRoomInterval()}sendMessage(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot send message: not connected to a room.`);this.currentConnection.sendMessage(e)}isHost(){return this.currentConnection?.isHost()||!1}isConnected(){return this.currentConnection?.isConnected()||!1}destroy(){super.destroy(),this.updateConnectionState({room:$.Disconnected,api:$.Disconnected}),this.currentConnection?.destroy(),this.stopRoomUpdates()}async joinOrCreateRoom(e,{timeout:t}={}){if(!this.multiplayerApiClient||!this.multiplayerParams)throw Error(`Cannot join room. Please start this controller in multiplayer mode to join rooms.`);if(this.rejectedRoomIds.has(e.roomId))throw new vd(e);let n=this.currentConnection,r=this.roomId,i=gd(t);this.updateConnectionState({room:$.Connecting});let a=new Rf(this.params.gameId,this.multiplayerApiClient,this.multiplayerParams.stunServerUrls||[],e,this.params.clientId,this.params.acceptConnection?e=>this.params.acceptConnection?.(e.connectingClientId,this)??!0:void 0);a.listen(If,e=>{this.dispatch(new Bf(e.sourceClientId,e.detail))}),a.listen(Lf,e=>{this.dispatch(new Hf({detail:e.detail}))});try{if(await a.initConnection({abortSignal:i}),(await _d(Pe.isDefined(()=>{let e=a.isConnected(),t=a.isDestroyed;return!e&&!t?void 0:{connected:e,destroyed:t}}),i)).connected)await _d(Promise.resolve(this.params.prepareConnection?.(a)),i),this.currentConnection=a,n?.destroy(),d(this).roomId=e.roomId,this.stopRoomUpdates(),this.updateConnectionState({room:$.Connected});else throw this.rejectedRoomIds.add(e.roomId),new vd(e)}catch(e){throw a.destroy(),n?(this.currentConnection=n,d(this).roomId=r,this.updateConnectionState({room:$.Connected})):(this.currentConnection=void 0,this.updateConnectionState({room:Fe(e)})),e}}leaveRoom(){this.currentConnection&&(d(this).roomId=void 0,this.currentConnection.destroy(),this.currentConnection=void 0,this.updateConnectionState({room:$.Disconnected}))}updateConnectionState(e){e.api&&(d(this).apiConnectionState=e.api),e.room&&(d(this).roomConnectionState=e.room),this.dispatch(new Uf({detail:{room:this.roomConnectionState,api:this.apiConnectionState}}))}stopRoomInterval(){globalThis.clearInterval(this.roomUpdateIntervalId),this.roomUpdateIntervalId=void 0}startRoomInterval(){if(this.stopRoomInterval(),this.isListeningToRoomUpdates&&this.multiplayerApiClient){let e=this.multiplayerParams?.roomUpdateInterval?Te(this.multiplayerParams.roomUpdateInterval,{milliseconds:!0}).milliseconds:1e4;this.roomUpdateIntervalId=globalThis.setInterval(async()=>{if(!this.isListeningToRoomUpdates||!this.multiplayerApiClient)return;let e=await this.multiplayerApiClient.fetch(Df).GET({searchParams:{gameId:[this.params.gameId]}});e.Ok&&this.dispatch(new Vf({detail:e.Ok.responseData}))},e)}}},Gf=class e extends Me{static knownErrors={RoomRejectionError:vd};knownErrors=e.knownErrors;debugMultiplayer;roomController;localClientId=uf.client();roomConnection;singleplayer=!1;constructor(e){super(),this.debugMultiplayer=!!e.debugMultiplayer,this.debugLog(`constructing controller for game '${e.gameId}'`),this.roomController=new Wf({gameId:e.gameId,clientId:this.localClientId,prepareConnection:async e=>{await this.prepareRoomConnection?.(e)},acceptConnection:e=>(this.debugLog(`checking incoming connection from ${e}`),this.shouldAcceptConnection(e))}),this.listenToRoomController()}get currentConnection(){return this.isConnected()?this:void 0}get clientId(){return this.roomConnection?.clientId||this.localClientId}get roomId(){return this.roomController.roomId}get apiConnectionState(){return this.roomController.apiConnectionState}get roomConnectionState(){return this.roomController.roomConnectionState}get multiplayerApiClient(){return this.roomController.multiplayerApiClient}startRoomUpdates(e){return this.roomController.startRoomUpdates(e)}stopRoomUpdates(){this.roomController.stopRoomUpdates()}getClientId(){return this.singleplayer?this.localClientId:this.roomConnection?.clientId||this.roomController.getClientId()}getConnectedClientIds(){return this.roomConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.singleplayer?[this.localClientId]:this.roomConnection?.getAllClientIds()||[]}async initMultiplayer(e){this.debugLog(`initializing multiplayer with backend ${e.backendOrigin}`),await this.roomController.initMultiplayer(e),this.debugLog(`multiplayer API initialized`)}isHost(){return this.singleplayer||this.roomConnection?.isHost()||!1}isConnected(){return this.singleplayer||this.roomConnection?.isConnected()||!1}leaveRoom(){if(!this.currentConnection){this.debugLog(`leaveRoom called without a current connection`);return}this.debugLog(`leaving room '${this.roomId||`unknown`}'`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.leaveRoom()}destroy(){this.debugLog(`destroying controller`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.destroy(),super.destroy()}listenToRoomController(){this.roomController.listen(Vf,e=>{this.dispatch(e)}),this.roomController.listen(Uf,e=>{this.debugLog(`connection event received: api=${String(e.detail.api)} room=${String(e.detail.room)}`),this.dispatch(e)}),this.roomController.listen(Hf,e=>{this.debugLog(`client event received: ${JSON.stringify(e.detail)}`),this.handleClientStatus?.(e.detail),this.dispatch(e)}),this.roomController.listen(Bf,e=>{this.debugLog(`message event received from ${e.sourceClientId}`),this.handleReceivedMessage(e.sourceClientId,e.detail)})}debugLog(e){w.if(this.debugMultiplayer).faint(`[multiplayer] ${e}`)}},Kf;(function(e){e.Actions=`actions`,e.Frame=`frame`,e.StateSyncRequest=`state-sync-request`})(Kf||={});var qf=class extends o()(`multiplayer-controller-frame`){constructor(e){super(e)}},Jf=class extends o()(`multiplayer-controller-desync`){},Yf=class extends o()(`multiplayer-controller-state-sync`){},Xf={milliseconds:10},Zf=class e extends Gf{params;currentFps=0;static events={MultiplayerControllerDesyncEvent:Jf,MultiplayerControllerFrameEvent:qf,MultiplayerControllerStateSyncEvent:Yf};events=e.events;frameCount=0;clientsResponded={};frameActions=[];timeoutId;frameTickReady=!0;frameMs;producedFrameCount=0;desyncCheckFrameInterval;latestCheckFrameEvent;nextFrameStateHash;localStateHash;stateSyncRequestClientIds=[];stateSyncFrameClientIds=[];awaitingStateSync=!1;joiningRoom=!1;lastFpsCalculation={timestamp:0,frameCount:0};stateSyncFrameCount;constructor(e){super(e),this.params=e;let t=e.frameDuration||Xf;this.frameMs=Te(t,{milliseconds:!0}).milliseconds,this.desyncCheckFrameInterval=e.desyncCheckInterval&&this.frameMs?Math.max(1,Math.round(Te(e.desyncCheckInterval,{milliseconds:!0}).milliseconds/this.frameMs)):void 0}shouldAcceptConnection(e){return this.params.acceptConnection?.(e,this)??!0}startSingleplayer(){if(this.currentConnection)throw Error(`Cannot start singleplayer with a connection already present.`);this.debugLog(`starting singleplayer connection`),this.resetStateSync(),this.setFrameCount(0),this.singleplayer=!0,this.finishFrame(),this.dispatch(new Uf({detail:{...zf,api:$.Connected}})),this.debugLog(`singleplayer connection ready with client ${this.getClientId()||`unknown`}`)}runFrame(e){this.debugLog(`runFrame called with ${e?.length||0} actions`),e&&this.act(e),this.isHost()&&(this.frameTickReady=!0,this.maybeFinishFrame())}getFps(){return this.currentFps}act(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot perform action: not connected to a room.`);let t=oe(e);this.debugLog(`act called with ${t.length} actions`),this.frameActions=[...this.frameActions,...t.map(e=>({sourceClientId:this.clientId,packet:e}))]}countAppliedFrame(){return this.setFrameCount(this.frameCount+1),this.frameCount}reportStateHash({frameEvent:e,stateHash:t}){this.awaitingStateSync||(this.isHost()?e===this.latestCheckFrameEvent&&(this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=t):this.localStateHash=t)}checkStateHash(e){if(this.awaitingStateSync||e.detail.hostStateHash==null||this.localStateHash==null||e.detail.hostStateHash===this.localStateHash)return;let t={hostStateHash:e.detail.hostStateHash,localStateHash:this.localStateHash};w.warning(`[multiplayer] Desync detected: local state hash ${t.localStateHash} does not match host state hash ${t.hostStateHash}.`),this.dispatch(new Jf({detail:t})),this.params.resyncOnDesync&&this.requestStateSync()}requestStateSync(){!this.params.enableStateSync||this.isHost()||this.awaitingStateSync||(this.debugLog(`requesting state sync from host`),this.awaitingStateSync=!0,this.localStateHash=void 0,this.roomConnection?.sendMessage({type:Kf.StateSyncRequest}))}finishStateSync(){this.awaitingStateSync=!1,this.localStateHash=void 0,this.setFrameCount(this.stateSyncFrameCount??0),this.stateSyncFrameCount=void 0}sendStateSync(e){let t=this.getConnectedClientIds();this.stateSyncFrameClientIds.filter(e=>t.includes(e)).forEach(t=>{this.debugLog(`sending state sync to ${t}`),this.roomConnection?.sendToOnlyOneClient(t,{type:Kf.Frame,packets:[],isSynchronizationFrame:!0,stateSync:e,frameCount:this.frameCount})}),this.stateSyncFrameClientIds=[],this.maybeFinishFrame()}destroy(){globalThis.clearTimeout(this.timeoutId),super.destroy()}async joinOrCreateRoom(e,t={}){let n=this.roomConnection,r=this.singleplayer;this.debugLog(`joining or creating room '${e.roomName}' (${e.roomId})`),this.joiningRoom=!0;try{let i=await this.joinRoom({previousRoomConnection:n,room:e,timeoutOptions:t});this.resetDesyncCheck(),this.resetStateSync(),n?(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.frameActions=[],this.frameTickReady=!0):r&&(globalThis.clearTimeout(this.timeoutId),this.frameTickReady=!0),this.singleplayer=!1,this.setFrameCount(0),this.awaitingStateSync=!!this.params.enableStateSync&&!i.isHost(),this.attachMultiplayerRoomConnection(i),this.debugLog(`attached p2p-lock-step connection; client=${this.getClientId()||`unknown`} host=${this.isHost()} connected=${this.isConnected()}`)}finally{this.joiningRoom=!1}}async joinRoom({previousRoomConnection:e,room:t,timeoutOptions:n}){try{if(await this.roomController.joinOrCreateRoom(t,n),this.debugLog(`room controller joined room '${t.roomName}' (${t.roomId}); client=${this.roomController.getClientId()||`unknown`} host=${this.roomController.isHost()}`),!this.roomController.currentConnection)throw Error(`Cannot start p2p-lock-step multiplayer: room connection is missing.`);return this.roomController.currentConnection}catch(t){throw this.debugLog(`join room failed: ${String(t)}`),this.roomConnection=e,t}}leaveRoom(){this.currentConnection&&(globalThis.clearTimeout(this.timeoutId),this.resetStateSync()),super.leaveRoom()}handleClientStatus(e){`newMember`in e?this.syncNewMember(e.newMember):`newHost`in e&&this.handleNewHost(e.newHost)}attachMultiplayerRoomConnection(e){this.debugLog(`attached room connection; client=${e.clientId} host=${e.isHost()} connected=${e.isConnected()} connectedClients=${e.getConnectedClientIds().length} allClients=${e.getAllClientIds().length}`),this.roomConnection=e,e.isHost()?this.finishFrame():(this.debugLog(`attached as member; sending initial readiness actions to host`),e.sendMessage({actions:[],sourceClientId:this.clientId,type:Kf.Actions}))}handleNewHost(e){!this.joiningRoom&&e===this.localClientId&&this.roomConnection&&this.roomConnection.isHost()&&(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.resetDesyncCheck(),this.resetStateSync(),this.frameTickReady=!0,this.finishFrame())}syncNewMember(e){this.debugLog(`syncNewMember called for ${e}; host=${this.isHost()}`),this.params.enableStateSync?this.queueStateSync(e):this.roomConnection&&this.isHost()&&this.roomConnection.sendToOnlyOneClient(e,{type:Kf.Frame,packets:[],isSynchronizationFrame:!0})}messageHandlers={[Kf.Actions]:{isForHost:!0,handle:({message:e,sourceClientId:t})=>{this.debugLog(`host received ${e.actions.length} actions from ${t}`),this.clientsResponded={...this.clientsResponded,[t]:!0},this.frameActions=[...this.frameActions,...e.actions.map(e=>({sourceClientId:t,packet:e}))],this.maybeFinishFrame()}},[Kf.Frame]:{isForHost:!1,handle:({message:e})=>{this.debugLog(`member received frame with ${e.packets.length} actions; sending ${this.frameActions.length} local actions back to host`);let t=this.frameActions;this.frameActions=[],this.roomConnection?.sendMessage({actions:t.map(({packet:e})=>e),sourceClientId:this.clientId,type:Kf.Actions}),e.stateSync===void 0?e.isSynchronizationFrame||(this.calculateFps(),this.dispatch(new qf({detail:{packets:e.packets,hostStateHash:e.stateHash,shouldReportNextFrameHash:e.shouldReportNextFrameHash}}))):(this.stateSyncFrameCount=e.frameCount,this.dispatch(new Yf({detail:{stateSync:e.stateSync}})))}},[Kf.StateSyncRequest]:{isForHost:!0,handle:({sourceClientId:e})=>{this.queueStateSync(e)}}};handleReceivedMessage(e,t){if(this.debugLog(`received lock-step message from ${e}: type=${t.type} host=${this.isHost()}`),!this.roomConnection){this.debugLog(`ignored message because no room connection is attached`);return}let n=t.type;this.messageHandlers[n].isForHost===this.isHost()&&this.messageHandlers[n].handle({message:t,sourceClientId:e})}queueStateSync(e){!this.isHost()||this.stateSyncRequestClientIds.includes(e)||this.stateSyncFrameClientIds.includes(e)||(this.debugLog(`queueing state sync for ${e}`),this.stateSyncRequestClientIds=[...this.stateSyncRequestClientIds,e])}resetStateSync(){this.stateSyncRequestClientIds=[],this.stateSyncFrameClientIds=[],this.stateSyncFrameCount=void 0,this.awaitingStateSync=!1}setFrameCount(e){d(this).frameCount=e}resetDesyncCheck(){this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=void 0,this.localStateHash=void 0}calculateFps(){let e=Date.now(),t=Date.now()-this.lastFpsCalculation.timestamp;t>1e3?(d(this).currentFps=this.lastFpsCalculation.frameCount/(t/1e3),this.lastFpsCalculation={frameCount:0,timestamp:e}):this.lastFpsCalculation={...this.lastFpsCalculation,frameCount:this.lastFpsCalculation.frameCount+1}}finishFrame(){let e=this.frameActions,t=this.nextFrameStateHash;this.frameActions=[],this.nextFrameStateHash=void 0,this.producedFrameCount++;let n=!!this.desyncCheckFrameInterval&&!(this.producedFrameCount%this.desyncCheckFrameInterval)&&this.getAllClientIds().length>1,r=!!this.stateSyncRequestClientIds.length;this.stateSyncFrameClientIds=[...this.stateSyncFrameClientIds,...this.stateSyncRequestClientIds],this.stateSyncRequestClientIds=[],this.roomConnection?.sendMessage({type:Kf.Frame,packets:e,...n&&{shouldReportNextFrameHash:n},...t!=null&&{stateHash:t}});let i=new qf({detail:{packets:e,shouldReportNextFrameHash:n,...r&&{shouldSendStateSync:r}}});n&&(this.latestCheckFrameEvent=i),this.dispatch(i),this.frameTickReady=!1,this.calculateFps(),this.frameMs&&(this.timeoutId=globalThis.setTimeout(()=>{this.frameTickReady=!0,this.maybeFinishFrame()},this.frameMs))}maybeFinishFrame(){if(!this.isHost()){this.debugLog(`maybeFinishFrame skipped because this client is not host`);return}let e=this.singleplayer||this.roomConnection?.getConnectedClientIds().every(e=>this.clientsResponded[e]);if(!this.frameTickReady||!e||this.stateSyncFrameClientIds.length){this.debugLog(`maybeFinishFrame waiting: frameTickReady=${this.frameTickReady} clientsReady=${!!e} stateSyncs=${this.stateSyncFrameClientIds.length}`);return}this.finishFrame()}};function Qf(e={}){let t=!!(e.handlePacket||e.runFrameUpdate||e.desyncCheck||e.stateSync);return Ne({modName:`antha-multiplayer-p2p-lock-step`,trigger:t||e.handleClientStatus?{event:[...t?[qf]:[],...e.stateSync?[Yf]:[],...e.handleClientStatus?[Hf]:[]],executeImmediately:!0}:void 0,cleanup({state:e}){w.if(!!e.multiplayerP2pLockStep?.multiplayerController.debugMultiplayer).faint(`[multiplayer] cleaning up p2p-lock-step mod`),e.multiplayerP2pLockStep?.multiplayerController.destroy()},async execute(n){let{engine:r,state:i}=n;i.multiplayerP2pLockStep||(i.multiplayerP2pLockStep={multiplayerController:new Zf({gameId:e.gameId||`antha`,acceptConnection:e.acceptConnection,debugMultiplayer:e.debugMultiplayer,desyncCheckInterval:e.desyncCheck?.interval,enableStateSync:!!e.stateSync,frameDuration:e.frameDuration,resyncOnDesync:e.stateSync?.resyncOnDesync}),connectionState:zf},i.multiplayerP2pLockStep.multiplayerController.listen(Uf,({detail:e})=>{i.multiplayerP2pLockStep&&(w.if(i.multiplayerP2pLockStep.multiplayerController.debugMultiplayer).faint(`[multiplayer] mod connection state updated: api=${String(e.api)} room=${String(e.room)}`),i.multiplayerP2pLockStep.connectionState=e)}),i.multiplayerP2pLockStep.multiplayerController.listenToAll(e=>{r.dispatch(e)})),n.executionTrigger.type===ce.Event&&await b(n.executionTrigger.events,async r=>{if(i.multiplayerP2pLockStep?.multiplayerController){if(r instanceof Hf){await e.handleClientStatus?.({event:r,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});return}if(r instanceof Yf){await e.stateSync?.loadStateSync({stateSync:r.detail.stateSync,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i}),i.multiplayerP2pLockStep.multiplayerController.finishStateSync();return}if(r instanceof qf&&t&&!i.multiplayerP2pLockStep.multiplayerController.awaitingStateSync){i.multiplayerP2pLockStep.multiplayerController.checkStateHash(r);let t=i.multiplayerP2pLockStep.multiplayerController.countAppliedFrame();if(e.handlePacket)for(let t of r.detail.packets)await e.handlePacket({packet:t,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});await e.runFrameUpdate?.({...n,currentTick:t,executionTrigger:{events:[r],type:ce.Event},msSinceLastExecute:i.multiplayerP2pLockStep.multiplayerController.frameMs,multiplayerFrameEvent:r,ticksSinceLastExecute:1}),r.detail.shouldReportNextFrameHash&&i.multiplayerP2pLockStep.multiplayerController.reportStateHash({frameEvent:r,stateHash:await e.desyncCheck?.createStateHash({state:i})}),r.detail.shouldSendStateSync&&e.stateSync&&i.multiplayerP2pLockStep.multiplayerController.sendStateSync(await e.stateSync.createStateSync({state:i}))}}})}})}function $f(){return 0}var ep={async[Z.StartRun]({detail:e,state:t}){if(!t.entityStore)throw Error(`Cannot start run: no entity store exists.`);t.entityStore.destroyAllEntities();let n=ic(e.packet.levelId);t.level=n,t.runState=oc(n.levelId),e.packet.ready&&(t.runState.status=W.Ready),await t.entityStore.addEntity(od),await t.entityStore.addEntity(sd);for(let e of n.paths)for(let n of e.chutes??[])await t.entityStore.addEntity(ld,{...Js(e,n.distancePx),pathId:e.pathId,distancePx:n.distancePx,active:!1});t.runState.potatoesPerRun=vs(n.paths.length),await t.entityStore.addEntity(md,{msUntilNextSpawn:0}),await t.entityStore.addEntity(dd,{}),await t.entityStore.addEntity(nd,{msUntilWaiter:Mc.waiterIntervalMs}),await t.entityStore.addEntity(id)},[Z.BeginRun]({state:e}){e.runState?.status===W.Ready&&(e.runState.status=W.Playing)},async[Z.PlaceTower]({detail:e,state:t}){let{packet:n}=e;if(!t.entityStore||!t.level||t.runState?.status!==W.Playing||t.runState.paused)return;let r=[...t.entityStore.getEntities(nu)].map(e=>({x:e.params.x,y:e.params.y}));Kl(t.runState.coins,n.towerType)&&Gl({level:t.level,towers:r,point:{x:n.x,y:n.y}}).valid&&(t.runState.coins-=H.towerCost[n.towerType],await t.entityStore.addEntity(nu,{x:n.x,y:n.y,towerType:n.towerType,towerId:t.runState.nextTowerId,level:1,builtAtMs:t.runState.elapsedMs,ownerSlot:$f(),cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:n.angleDeg??0,wear:0}),t.runState.nextTowerId++)},[Z.UpgradeTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(nu)){if(n.params.towerId!==e.packet.towerId)continue;if(n.params.level>=mc.maxLevel)return;let r=wc(n.params.towerType,n.params.level+1);t.runState.coins>=r&&(t.runState.coins-=r,n.params.level++);return}},[Z.SellTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused){for(let n of t.entityStore.getEntities(nu))if(n.params.towerId===e.packet.towerId){Jc(t.runState,{amount:Tc(n.params.towerType,n.params.level),reason:`Sold ${J[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.destroy(),n.params.towerId=0;return}}},[Z.ServiceTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(nu)){if(n.params.towerId!==e.packet.towerId)continue;let r=gc(n.params.towerType);n.params.wear>0&&t.runState.coins>=r&&(Jc(t.runState,{amount:-r,reason:`Serviced ${J[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.params.wear=0);return}},[Z.TogglePause]({state:e}){e.runState?.status===W.Playing&&(e.runState.paused=!e.runState.paused)},[Z.ApplyTopping]({detail:e,state:t}){let{packet:n}=e;if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused){for(let e of t.entityStore.getEntities(gl))if(e.params.potatoId===n.potatoId){!e.params.carriedBySeagull&&e.params.dropInMs<=0&&Wc(e.params,n.topping)&&(e.params[n.topping]=!0);return}}}},tp=Qf({gameId:`colcannon-fodder`,desyncCheck:{interval:{seconds:1},createStateHash({state:e}){if(e.entityStore&&e.seededRandom&&e.runState)return Ur([e.entityStore.hashEntities(),e.seededRandom.exportState(),e.runState])}},stateSync:{createStateSync({state:e}){if(!e.entityStore||!e.seededRandom||!e.runState)throw Error(`Cannot create state sync: game state is incomplete.`);return{entities:e.entityStore.createSnapshot(),randomState:e.seededRandom.exportState(),runState:e.runState}},async loadStateSync({state:e,stateSync:t}){if(!e.entityStore)throw Error(`Cannot load state sync: no entity store exists.`);e.seededRandom=Xt.fromState(t.randomState),e.runState=t.runState,e.entityStore.destroyAllEntities(),e.entityStore.registerEntities({entities:hd}),await e.entityStore.loadSnapshot(t.entities)},resyncOnDesync:!0},async handlePacket({packet:e,state:t}){try{await ep[e.packet.type]({detail:e,state:t})}catch(t){w.error(ze(t,`Failed to handle '${e.packet.type}' command.`))}},handleClientStatus(){},async runFrameUpdate(e){let{state:t}=e;t.runState?.status!==W.Playing||t.runState.paused||(t.runState.elapsedMs+=e.msSinceLastExecute,await t.entityStore?.updateAllEntities(e))}}),np=Ne({modName:`game-update`,execute({state:e}){!e.hasStartedInitialGame&&e.multiplayerP2pLockStep&&e.entityStore&&e.pixi?.pixiApplication?.screen&&(e.hasStartedInitialGame=!0,$u===Zu.Dev&&(globalThis.gameState=e),e.multiplayerP2pLockStep.multiplayerController.startSingleplayer(),ru(e,{type:Z.StartRun,ready:!0,levelId:au()}))}});async function rp({assetLoader:e,engine:t,loadSession:n,state:r}){t.currentMods.push(as({virtualHeight:O.height,virtualWidth:O.width}));let i=new Ir;return r.audioPlayer=i,await qo({assetLoader:e,audio:{assetName:`Game audio`,audioPlayer:i,files:us,serial:!0},entities:hd},{doNotUnload:!0,loadSession:n}),r.currentBackgroundAudio=ls[ss.GameMusic],r.level=rc,r.runState=oc(),r.seededRandom=Xt.fromSeed(It()),r.ui={selectedTowerType:void 0,selectedTopping:void 0,selectedTowerId:void 0,pointerWorld:void 0,clicks:[],keys:[],wheelSteps:0,placementAngleDeg:0},{mods:[Xo({extraCanvasWrapperStyles:A`
                    z-index: 0;
                `,pixiOptions:{background:`black`,...Qo()}}),...$u===Zu.Dev?[Jo({debugFps:!0})]:[],Br(),Uu,fc,tp,np,Xu,Ku,Bu,Vr()]}}export{rp as bootstrapGame};