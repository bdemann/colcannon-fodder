const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/browserAll-VMSClpaX.js","assets/Geometry-IpHxCVTc.js","assets/rolldown-runtime-hePW80VL.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/init-CeGg-dAz.js","assets/webworkerAll-B3Hkad6o.js","assets/WebGPURenderer-LTLhAvoo.js","assets/WebGPURenderer-D1KgKO0_.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js","assets/BufferResource-VXlz2pxo.js","assets/WebGLRenderer-caqgVvmv.js","assets/WebGLRenderer-C1XjW2ra.js","assets/CanvasRenderer-CobwcNGA.js","assets/CanvasRenderer-bnA_Jfob.js"])))=>i.map(i=>d[i]);
import{$ as e,A as t,At as n,B as r,Bt as i,C as a,Ct as o,D as s,Dt as c,E as l,Et as u,F as d,Ft as f,G as p,Gt as m,H as h,Ht as g,I as _,It as v,J as y,K as b,L as x,Lt as S,M as C,Mt as ee,N as te,Nt as w,O as ne,Ot as re,P as T,Pt as ie,Q as ae,R as oe,Rt as se,S as ce,St as le,T as ue,Tt as de,U as E,Ut as fe,V as pe,Vt as me,W as he,Wt as ge,X as _e,Y as ve,Z as ye,_t as be,a as xe,at as Se,bt as Ce,ct as we,d as Te,dt as Ee,et as De,f as D,ft as Oe,g as ke,gt as Ae,h as je,ht as Me,it as Ne,j as Pe,jt as Fe,k as Ie,kt as Le,l as Re,lt as O,m as ze,mt as Be,nt as Ve,o as He,ot as Ue,p as We,pt as Ge,q as Ke,r as qe,rt as Je,s as Ye,st as Xe,t as k,ut as A,v as j,vt as Ze,w as M,wt as Qe,x as $e,xt as et,yt as tt,zt as nt}from"./game-world-DqpF5MyS.js";import{B as rt,C as it,D as at,F as ot,G as st,M as ct,N as lt,O as ut,Q as dt,S as ft,T as pt,W as mt,X as ht,Z as gt,_ as _t,at as vt,b as yt,c as bt,ct as xt,f as St,m as Ct,n as wt,nt as Tt,o as Et,ot as Dt,p as Ot,r as kt,rt as At,s as jt,st as N,t as Mt,tt as Nt,w as Pt,x as Ft}from"./Geometry-IpHxCVTc.js";import{t as It}from"./getPo2TextureFromSource-BZjp2c1c.js";import{t as Lt}from"./canvasUtils-BVGwBBBn.js";import{a as Rt,i as zt,n as P,o as Bt,r as Vt,s as Ht}from"./CanvasRenderer-bnA_Jfob.js";import{A as Ut,D as Wt,a as Gt,i as Kt,l as qt,u as Jt,w as Yt}from"./RenderTargetSystem-Dmqog6ll.js";var Xt={Get:`GET`,Head:`HEAD`,Options:`OPTIONS`,Trace:`TRACE`,Put:`PUT`,Delete:`DELETE`,Post:`POST`,Patch:`PATCH`,Connect:`CONNECT`};function Zt({min:e,max:t}){return e>t?{min:t,max:e}:{min:e,max:t}}function Qt({min:e,max:t}){let{min:n,max:r}=Zt({min:Math.floor(e),max:Math.floor(t)}),i=r-n+1,a=Math.ceil(Math.ceil(Math.log2(i))/8);if(a>65e3)throw RangeError(`Cannot create a random integer so large. ({min: ${n}, max: ${r}})`);let o=Math.floor(256**a/i)*i,s=new Uint8Array(a),c;do crypto.getRandomValues(s),c=s.reduce((e,t,n)=>e+t*256**n,0);while(c>=o);return n+c%i}var $t=`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.split(``);function en(e=16){let t=``;for(let n=0;n<e;n++){let e=Qt({min:0,max:$t.length-1});t+=$t[e]}return t}async function tn(e){let t=new w;return setTimeout(async()=>{t.resolve(await e())}),t.promise}function nn(e,t,n={}){return rn({currentRetry:0,maxRetries:e,callback:t,options:n})}function rn({currentRetry:e,maxRetries:t,callback:n,options:r={}}){try{let i=n({retryCount:e,isFirstExecution:e===0,isFirstRetry:e===1,isLastRetry:e===t});return i instanceof Promise?i.catch(async i=>{if(e>=t)throw S(i,`Retry max reached`);return r.interval&&await Me(r.interval),rn({currentRetry:e+1,maxRetries:t,callback:n,options:r})}):i}catch(i){if(e>=t)throw S(i,`Retry max reached`);return r.interval?Me(r.interval).then(()=>rn({currentRetry:e+1,maxRetries:t,callback:n,options:r})):rn({currentRetry:e+1,maxRetries:t,callback:n,options:r})}}function an(e){try{return JSON.parse(JSON.stringify(e))}catch(t){throw console.error(`Failed to JSON copy for:`,e),S(t,`Failed JSON copy`)}}function on(e,{min:t,max:n}){return Math.min(Math.max(e,t),n)}function sn(e,{digits:t}){if(t==null)return e;let n=10**t,r=e*n;return Number((Math.round(r)/n).toFixed(t))}function cn({searchIn:e,searchFor:t,caseSensitive:n,includeLength:r}){let i=Ge(Be(t,{caseSensitive:n}),`g`),a=[],o=[];return e.replace(i,(...n)=>{let r=n[n.length-2];if(typeof r!=`number`)throw TypeError(`Match index "${r}" is not a number. Searching for "${t}" in "${e}".`);let i=n[0];if(typeof i!=`string`)throw TypeError(`regExpMatch should've been a string but was ${typeof i}!`);o.push({index:r,length:i.length}),a.push(r);let s=n[0];if(typeof s!=`string`)throw TypeError(`Original match when searching for "${t}" in "${e}" at index ${r} is not a string.`);return s}),r?o:a}function ln(e,t,{caseSensitive:n}){let r=cn({searchIn:e,searchFor:t,caseSensitive:n,includeLength:!0}),i=Be(t,{caseSensitive:n});return e.split(i).reduce((t,n,i)=>{let a=r[i],o=t.concat(n);if(a){let t=e.slice(a.index,a.index+a.length);return o.concat(t)}return o},[])}function un({value:e,splitter:t}){return e.split(t)}var dn=class{topMostConstructor;map=new Map;isDestroyed=!1;constructor(e){this.topMostConstructor=e}add(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`add`)}getInstances(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);return Ue(this.map,e,()=>new Set)}remove(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`remove`)}traverseConstructors(e,t,n){let r=t.constructor;if(r&&r!==Function&&r!==Object&&r!==this.topMostConstructor){if(n===`add`)Ue(this.map,r,()=>new Set).add(e);else{let t=this.map.get(r);t&&t.delete(e)}this.traverseConstructors(e,Object.getPrototypeOf(t),n)}}destroy(){this.isDestroyed||(h(this).isDestroyed=!0,this.map.clear(),delete this.map)}};function fn(t,n){let r=e(t).filter(([e,r])=>n(e,r,t));return De(r)}function pn(e,t){return fn(e,e=>!t.includes(e))}function mn(){return r()}var hn=class e{alea;static fromSeed(t){return new e(new gn(t))}static fromState(t){let n=new gn(``);return n.importState(t),new e(n)}exportState(){return this.alea.exportState()}constructor(e){this.alea=e}next(){return this.alea.next()}clone(){return e.fromState(this.exportState())}},gn=class{n=4022871197;s=[this.mash(` `),this.mash(` `),this.mash(` `),1];mash(e){let t=e.toString();for(let e=0;e<t.length;e++){this.n+=t.codePointAt(e);let n=.02519603282416938*this.n;this.n=n>>>0,n-=this.n,n*=this.n,this.n=n>>>0,n-=this.n,this.n+=n*4294967296}return(this.n>>>0)*23283064365386963e-26}constructor(e){this.s[0]-=this.mash(e),this.s[0]<0&&(this.s[0]+=1),this.s[1]-=this.mash(e),this.s[1]<0&&(this.s[1]+=1),this.s[2]-=this.mash(e),this.s[2]<0&&(this.s[2]+=1)}next(){let e=2091639*this.s[0]+this.s[3]*23283064365386963e-26;return this.s[0]=this.s[1],this.s[1]=this.s[2],this.s[2]=e-(this.s[3]=e|0)}importState(e){this.s=e}exportState(){return[...this.s]}};function _n({value:e,wrapper:t}){return Ke({value:he({value:e,suffix:t}),prefix:t})}var vn=class extends m()(`promise-queue-update`){},yn=class extends Je{queue=[];currentlyAwaiting=void 0;queueItemIds=new Set;get size(){return this.queue.length}add(e,t){let n={original:e,id:t,wrapper:new w};return this.queue.push(n),t!=null&&this.queueItemIds.add(t),this.dispatch(new vn({detail:{queueSize:this.size,addedItem:n}})),this.triggerNextQueueItem(),n.wrapper.promise}hasItemById(e){return this.queueItemIds.has(e)}handleItemSettle({rejection:e,resolution:t}){let n=this.currentlyAwaiting;if(!n)throw Error(`Cannot handle queue item settle without a currently awaited queue item.`);return this.queue.splice(0,1),this.dispatch(new vn({detail:{queueSize:this.size,finishedItem:n}})),e?n.wrapper.reject(e):n.wrapper.resolve(t),n.id!=null&&this.queueItemIds.delete(n.id),this.currentlyAwaiting=void 0,this.triggerNextQueueItem(),n}triggerNextQueueItem(){if(this.currentlyAwaiting||!A.isLengthAtLeast(this.queue,1))return!1;let e=this.queue[0];return this.currentlyAwaiting=e,e.original().then(e=>{this.handleItemSettle({resolution:e})}).catch(e=>{this.handleItemSettle({rejection:e})}),!0}};function bn({checkValue:e,default:n,name:r}){return d(r)||_(r,(t,n)=>e(n)),(e=n)=>t(T.Unsafe({[x]:r,default:e}))}function xn(e){return A.isSymbol(e)?Cn(e):t(T.Const(e,{default:e}))}var Sn=`ExactSymbol`;function Cn(e){return d(`ExactSymbol`)||_(Sn,(e,t)=>t===e.symbol),te(Sn,({schema:e})=>`Expected symbol ${e.symbol?.description?_n({value:e.symbol.description,wrapper:`'`}):`<unnamed symbol>`}`),t(T.Unsafe({[x]:Sn,symbol:e,default:e}))}function wn(...e){let n={},r=e.map(e=>{let r=t(e);return Object.assign(n,r.default),r.$_schema});return t(T.Composite(r,{default:n}))}function Tn(e,n={}){oe.ExactOptionalPropertyTypes=!0;let r=t(e).$_schema,i=n.alsoUndefined?T.Union([T.Undefined(),r]):r;return t(T.Optional(i))}function F(...e){let n,r=e.map((e,r)=>{let i=t(e);return r||(n=i.default),i.$_schema});return t(T.Union(r,{default:n}))}function En({exclusiveMax:e,exclusiveMin:n,...r}){let{min:i,max:a}=Zt(r),o=r.default??(a-i)/2+i,c=t(T.Number({...n?{exclusiveMinimum:i}:{minimum:i},...e?{exclusiveMaximum:a}:{maximum:a},default:o})),l=_e(()=>s(o,c));if(l)throw S(l,`Default range value is not within range.`);return c}var Dn=`recordShape`;function On({keys:e,values:n,partial:r,additionalProperties:i}){kn();let a=Mn(e),o=t(n);return t(T.Unsafe({[x]:Dn,keysShape:a,valuesShape:o,isPartial:!!r,additionalProperties:!!i,default:jn({isPartial:!!r,keysShape:a,valuesShape:o})}))}function kn(){d(`recordShape`)||_(Dn,(e,t)=>{if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=Object.entries(t).every(([t,n])=>{let r=e.additionalProperties||ne(t,e.keysShape),i=ne(n,e.valuesShape);return r&&i}),r=e.isPartial||!An(e.keysShape,t).length;return n&&r}),te(Dn,e=>{let t=e.schema,n=e.value;if(typeof n!=`object`||!n||Array.isArray(n))return`Expected an object`;let r=g(Object.entries(n),([e])=>e,(e,[n,r])=>!ne(n,t.keysShape)||!ne(r,t.valuesShape)),i=An(t.keysShape,n);return[r.length?[`Failure at keys`,r.join(`,`)].join(`: `):``,i.length?[`Missing keys`,i.join(`,`)].join(`: `):``].filter(A.isTruthy).join(`
`)})}function An(e,t){let n=Nn(e).filter(e=>A.isPropertyKey(e));return n.length?n.filter(e=>!A.hasKey(t,e)):[]}function jn({keysShape:e,valuesShape:t,isPartial:n}){if(n)return{};{let n=Nn(e),r=t.default;return Object.fromEntries(n.map(e=>[e,r]))}}function Mn(e){return C(e)?e:Pe(e)?t(e):A.isObject(e)?Ie(e):A.isArray(e)&&A.isLengthAtLeast(e,1)?F(...e.map(e=>xn(e))):A.isPropertyKey(e)?t(e):t(T.Undefined())}function Nn(e){let n=e.$_schema,r=n[x].toLowerCase();return[`const`,`literal`].includes(r)?[n.const]:r===`union`?me(n.anyOf.flatMap(e=>Nn(t(e)))):[`undefined`,`number`,`string`,`symbol`].includes(r)?[]:Nn(Mn(e.default))}function Pn(...e){let n=[],r=[];return e.forEach(e=>{let i=t(e);n.push(i.default),r.push(i.$_schema)}),t(T.Tuple(r,{default:n}))}function Fn(e){let t=n.fromObject(pn(e,[`timezone`]),{zone:e.timezone});if(!t.isValid)throw Error(t.invalidExplanation??void 0);return t}function In(e,t){if(!e.isValid)throw Error(`Invalid input: '${e.toISO()}'`);let n=e.zoneName;if(n==null)throw Error(`Valid Luxon dates must have a timezone.`);let r=Oe(n);return{day:Ae(e.day),month:Ce(e.month),year:e.year,hour:be(e.hour),minute:tt(e.minute),second:et(e.second),millisecond:Ze(e.millisecond),timezone:t??r}}var Ln=`Africa/Abidjan.Africa/Accra.Africa/Addis_Ababa.Africa/Algiers.Africa/Asmara.Africa/Bamako.Africa/Bangui.Africa/Banjul.Africa/Bissau.Africa/Blantyre.Africa/Brazzaville.Africa/Bujumbura.Africa/Cairo.Africa/Casablanca.Africa/Ceuta.Africa/Conakry.Africa/Dakar.Africa/Dar_es_Salaam.Africa/Djibouti.Africa/Douala.Africa/El_Aaiun.Africa/Freetown.Africa/Gaborone.Africa/Harare.Africa/Johannesburg.Africa/Juba.Africa/Kampala.Africa/Khartoum.Africa/Kigali.Africa/Kinshasa.Africa/Lagos.Africa/Libreville.Africa/Lome.Africa/Luanda.Africa/Lubumbashi.Africa/Lusaka.Africa/Malabo.Africa/Maputo.Africa/Maseru.Africa/Mbabane.Africa/Mogadishu.Africa/Monrovia.Africa/Nairobi.Africa/Ndjamena.Africa/Niamey.Africa/Nouakchott.Africa/Ouagadougou.Africa/Porto-Novo.Africa/Sao_Tome.Africa/Timbuktu.Africa/Tripoli.Africa/Tunis.Africa/Windhoek.America/Adak.America/Anchorage.America/Anguilla.America/Antigua.America/Araguaina.America/Argentina/Buenos_Aires.America/Argentina/Catamarca.America/Argentina/ComodRivadavia.America/Argentina/Cordoba.America/Argentina/Jujuy.America/Argentina/La_Rioja.America/Argentina/Mendoza.America/Argentina/Rio_Gallegos.America/Argentina/Salta.America/Argentina/San_Juan.America/Argentina/San_Luis.America/Argentina/Tucuman.America/Argentina/Ushuaia.America/Aruba.America/Asuncion.America/Atikokan.America/Bahia.America/Bahia_Banderas.America/Barbados.America/Belem.America/Belize.America/Blanc-Sablon.America/Boa_Vista.America/Bogota.America/Boise.America/Cambridge_Bay.America/Campo_Grande.America/Cancun.America/Caracas.America/Cayenne.America/Cayman.America/Chicago.America/Chihuahua.America/Coral_Harbour.America/Costa_Rica.America/Creston.America/Cuiaba.America/Curacao.America/Danmarkshavn.America/Dawson.America/Dawson_Creek.America/Denver.America/Detroit.America/Dominica.America/Edmonton.America/Eirunepe.America/El_Salvador.America/Ensenada.America/Fort_Nelson.America/Fortaleza.America/Glace_Bay.America/Goose_Bay.America/Grand_Turk.America/Grenada.America/Guadeloupe.America/Guatemala.America/Guayaquil.America/Guyana.America/Halifax.America/Havana.America/Hermosillo.America/Indiana/Indianapolis.America/Indiana/Knox.America/Indiana/Marengo.America/Indiana/Petersburg.America/Indiana/Tell_City.America/Indiana/Vevay.America/Indiana/Vincennes.America/Indiana/Winamac.America/Inuvik.America/Iqaluit.America/Jamaica.America/Juneau.America/Kentucky/Louisville.America/Kentucky/Monticello.America/La_Paz.America/Lima.America/Los_Angeles.America/Maceio.America/Managua.America/Manaus.America/Martinique.America/Matamoros.America/Mazatlan.America/Menominee.America/Merida.America/Metlakatla.America/Mexico_City.America/Miquelon.America/Moncton.America/Monterrey.America/Montevideo.America/Montreal.America/Montserrat.America/Nassau.America/New_York.America/Nipigon.America/Nome.America/Noronha.America/North_Dakota/Beulah.America/North_Dakota/Center.America/North_Dakota/New_Salem.America/Nuuk.America/Ojinaga.America/Panama.America/Pangnirtung.America/Paramaribo.America/Phoenix.America/Port-au-Prince.America/Port_of_Spain.America/Porto_Velho.America/Puerto_Rico.America/Punta_Arenas.America/Rainy_River.America/Rankin_Inlet.America/Recife.America/Regina.America/Resolute.America/Rio_Branco.America/Rosario.America/Santarem.America/Santiago.America/Santo_Domingo.America/Sao_Paulo.America/Scoresbysund.America/Sitka.America/St_Johns.America/St_Kitts.America/St_Lucia.America/St_Thomas.America/St_Vincent.America/Swift_Current.America/Tegucigalpa.America/Thule.America/Thunder_Bay.America/Tijuana.America/Toronto.America/Tortola.America/Vancouver.America/Whitehorse.America/Winnipeg.America/Yakutat.America/Yellowknife.Antarctica/Casey.Antarctica/Davis.Antarctica/DumontDUrville.Antarctica/Macquarie.Antarctica/Mawson.Antarctica/McMurdo.Antarctica/Palmer.Antarctica/Rothera.Antarctica/Syowa.Antarctica/Troll.Antarctica/Vostok.Asia/Aden.Asia/Almaty.Asia/Amman.Asia/Anadyr.Asia/Aqtau.Asia/Aqtobe.Asia/Ashgabat.Asia/Atyrau.Asia/Baghdad.Asia/Bahrain.Asia/Baku.Asia/Bangkok.Asia/Barnaul.Asia/Beirut.Asia/Bishkek.Asia/Brunei.Asia/Chita.Asia/Choibalsan.Asia/Chongqing.Asia/Colombo.Asia/Damascus.Asia/Dhaka.Asia/Dili.Asia/Dubai.Asia/Dushanbe.Asia/Famagusta.Asia/Gaza.Asia/Harbin.Asia/Hebron.Asia/Ho_Chi_Minh.Asia/Hong_Kong.Asia/Hovd.Asia/Irkutsk.Asia/Jakarta.Asia/Jayapura.Asia/Jerusalem.Asia/Kabul.Asia/Kamchatka.Asia/Karachi.Asia/Kashgar.Asia/Kathmandu.Asia/Khandyga.Asia/Kolkata.Asia/Krasnoyarsk.Asia/Kuala_Lumpur.Asia/Kuching.Asia/Kuwait.Asia/Macau.Asia/Magadan.Asia/Makassar.Asia/Manila.Asia/Muscat.Asia/Nicosia.Asia/Novokuznetsk.Asia/Novosibirsk.Asia/Omsk.Asia/Oral.Asia/Phnom_Penh.Asia/Pontianak.Asia/Pyongyang.Asia/Qatar.Asia/Qostanay.Asia/Qyzylorda.Asia/Riyadh.Asia/Sakhalin.Asia/Samarkand.Asia/Seoul.Asia/Shanghai.Asia/Singapore.Asia/Srednekolymsk.Asia/Taipei.Asia/Tashkent.Asia/Tbilisi.Asia/Tehran.Asia/Tel_Aviv.Asia/Thimphu.Asia/Tokyo.Asia/Tomsk.Asia/Ulaanbaatar.Asia/Urumqi.Asia/Ust-Nera.Asia/Vientiane.Asia/Vladivostok.Asia/Yakutsk.Asia/Yangon.Asia/Yekaterinburg.Asia/Yerevan.Atlantic/Azores.Atlantic/Bermuda.Atlantic/Canary.Atlantic/Cape_Verde.Atlantic/Faroe.Atlantic/Jan_Mayen.Atlantic/Madeira.Atlantic/Reykjavik.Atlantic/South_Georgia.Atlantic/St_Helena.Atlantic/Stanley.Australia/Adelaide.Australia/Brisbane.Australia/Broken_Hill.Australia/Currie.Australia/Darwin.Australia/Eucla.Australia/Hobart.Australia/Lindeman.Australia/Lord_Howe.Australia/Melbourne.Australia/Perth.Australia/Sydney.EST.Etc/GMT+1.Etc/GMT+10.Etc/GMT+11.Etc/GMT+12.Etc/GMT+2.Etc/GMT+3.Etc/GMT+4.Etc/GMT+5.Etc/GMT+6.Etc/GMT+7.Etc/GMT+8.Etc/GMT+9.Etc/GMT-1.Etc/GMT-10.Etc/GMT-11.Etc/GMT-12.Etc/GMT-13.Etc/GMT-14.Etc/GMT-2.Etc/GMT-3.Etc/GMT-4.Etc/GMT-5.Etc/GMT-6.Etc/GMT-7.Etc/GMT-8.Etc/GMT-9.Europe/Amsterdam.Europe/Andorra.Europe/Astrakhan.Europe/Athens.Europe/Belfast.Europe/Belgrade.Europe/Berlin.Europe/Brussels.Europe/Bucharest.Europe/Budapest.Europe/Chisinau.Europe/Copenhagen.Europe/Dublin.Europe/Gibraltar.Europe/Guernsey.Europe/Helsinki.Europe/Isle_of_Man.Europe/Istanbul.Europe/Jersey.Europe/Kaliningrad.Europe/Kirov.Europe/Kyiv.Europe/Lisbon.Europe/Ljubljana.Europe/London.Europe/Luxembourg.Europe/Madrid.Europe/Malta.Europe/Minsk.Europe/Monaco.Europe/Moscow.Europe/Oslo.Europe/Paris.Europe/Prague.Europe/Riga.Europe/Rome.Europe/Samara.Europe/Sarajevo.Europe/Saratov.Europe/Simferopol.Europe/Skopje.Europe/Sofia.Europe/Stockholm.Europe/Tallinn.Europe/Tirane.Europe/Tiraspol.Europe/Ulyanovsk.Europe/Uzhgorod.Europe/Vaduz.Europe/Vienna.Europe/Vilnius.Europe/Volgograd.Europe/Warsaw.Europe/Zagreb.Europe/Zaporozhye.Europe/Zurich.HST.Indian/Antananarivo.Indian/Chagos.Indian/Christmas.Indian/Cocos.Indian/Comoro.Indian/Kerguelen.Indian/Mahe.Indian/Maldives.Indian/Mauritius.Indian/Mayotte.Indian/Reunion.MST.Pacific/Apia.Pacific/Auckland.Pacific/Bougainville.Pacific/Chatham.Pacific/Chuuk.Pacific/Easter.Pacific/Efate.Pacific/Enderbury.Pacific/Fakaofo.Pacific/Fiji.Pacific/Funafuti.Pacific/Galapagos.Pacific/Gambier.Pacific/Guadalcanal.Pacific/Guam.Pacific/Honolulu.Pacific/Johnston.Pacific/Kanton.Pacific/Kiritimati.Pacific/Kosrae.Pacific/Kwajalein.Pacific/Majuro.Pacific/Marquesas.Pacific/Midway.Pacific/Nauru.Pacific/Niue.Pacific/Norfolk.Pacific/Noumea.Pacific/Pago_Pago.Pacific/Palau.Pacific/Pitcairn.Pacific/Pohnpei.Pacific/Port_Moresby.Pacific/Rarotonga.Pacific/Saipan.Pacific/Tahiti.Pacific/Tarawa.Pacific/Tongatapu.Pacific/Wake.Pacific/Wallis.UTC`.split(`.`),Rn=new Set(Ln),zn=new Map,Bn=1e3;function Vn(e){if(Rn.has(e))return!0;let t=zn.get(e);if(t!=null)return t;let n=Fe.isValidIANAZone(e);if(zn.size>=Bn){let e=zn.keys().next();e.done||zn.delete(e.value)}return zn.set(e,n),n}function Hn(e,t){if(!Vn(e))throw new Ee(`'${e}' is not a valid time zone`,t)}var Un=Ln.reduce((e,t)=>(e[t]=t,e),{}),Wn=Oe(ee.defaultZone.name),Gn=Un.UTC,Kn=bn({default:Gn,name:`Timezone`,checkValue(e){return A.isString(e)&&Vn(e)}}),qn=t({hour:En({...de,default:de.min}),minute:En({...c,default:c.min}),second:En({...re,default:re.min}),millisecond:En({...u,default:u.min}),timezone:Kn()}),Jn=t({year:2023,month:En({...o,default:o.min}),day:En({...le,default:le.min}),timezone:Kn()}),Yn=t(wn(Jn,qn));function Xn(e){s(e,Yn),Hn(e.timezone),Fn(e)}function Zn(e){try{return Xn(e),!0}catch{return!1}}var Qn=[`L-y`,`LLL-y`,`LLLL-y`,`ccc, d LLL y H:mm:ss ZZZ (z)`,`ccc, dd LLL y HH:mm:ss ZZZ (z)`,`ccc, dd LLL y H:mm:ss ZZZ (z)`,`ccc, d LLL y HH:mm:ss ZZZ (z)`,`ccc, d LLL y H:mm:ss ZZZ`,`ccc, dd LLL y HH:mm:ss ZZZ`,`ccc, dd LLL y H:mm:ss ZZZ`,`ccc, d LLL y HH:mm:ss ZZZ`,`L/d '|' h:mma`,`LL/dd '|' hh:mma`];function $n(e,t){let r=n.fromISO(e,{zone:t});if(r.isValid)return r;let i;return Qn.some(r=>{let a=n.fromFormat(e.trim(),r,{zone:t});return a.isValid?(i=a,!0):!1}),i}function er(e){return tr(e,Wn)}function tr(e,t){let n=rr(e,t);if(!n?.isValid)throw Error(`Failed to parse date input '${i(e)}'`);return In(n,t)}function nr(e){let t=n.fromJSDate(new Date(e));if(t.isValid)return t}function rr(e,t){if(Zn(e)&&(e=Fn(e).toMillis()),n.isDateTime(e))return e.setZone(t);if(A.isNumber(e))return n.fromMillis(e,{zone:Gn}).setZone(t);if(A.isString(e)){let n=$n(e,t);if(n)return n}else if(e instanceof Date)return n.fromJSDate(e).setZone(t);return nr(e)}function ir(e){return e.replace(new RegExp(String.fromCodePoint(8239),`g`),` `)}function ar(e,t,n=Le){return ir(Fn(e).toFormat(t,{locale:n}))}var or=$e(class extends ce{constructor(){super(...arguments),this.key=M}render(e,t){return this.key=e,t}update(e,[t,n]){return t!==this.key&&(a(e),this.key=t),n}}),sr=`onDomCreated`,cr=$e(class extends ce{element;constructor(e){super(e),je(e,sr)}update(e,[t]){je(e,sr);let n=e.element;return n!==this.element&&(window.requestAnimationFrame(()=>t(n)),this.element=n),this.render(t)}render(e){}});function lr(e){return j`
        color: ${e.foreground.value};
        background-color: ${e.background.value};
    `}var ur=`://`;function dr(...e){let t=e.join(`/`),n=t.indexOf(ur),[r,i]=n===-1?[``,t]:[t.slice(0,n),t.slice(n+3)],a=!1,o=i.replace(/\/{2,}/g,`/`).split(`/`).reduce((e,t,n,r)=>{if(a)return e;let i=r[n+1],o=t,s=i?.startsWith(`?`),c=!t.includes(`?`)&&s,l=i===`?`;if(s||c){a=!0;let e=!1,s=r.slice(n+2).reduce((t,n)=>(n.includes(`#`)&&(e=!0),e?t.concat(n):[t,n].join(`&`)),``);o=[t,i,l?y({value:s,prefix:`&`}):s].join(``)}return e.concat(o)},[]);return[r,r?ur:``,o.join(`/`)].join(``)}var fr;(function(e){e.Encode=`encode`,e.Decode=`decode`,e.None=`none`})(fr||={});var pr;(function(e){e.Clear=`clear`,e.Replace=`replace`,e.Append=`append`})(pr||={});var mr=t({encoding:Tn(F(void 0,Ie(fr))),searchParamStrategy:Tn(F(void 0,Ie(pr)))});function hr(e,t){return e.map(e=>{if(e!=null)return gr(String(e),t)}).filter(e=>e!=null)}function gr(e,t){return t?.encoding===fr.Decode?decodeURIComponent(e):t?.encoding===fr.Encode?encodeURIComponent(e):e}t(On({keys:``,values:[``]}));function _r(e,t,n){let r=n?.searchParamStrategy===pr.Clear?{}:pe(e,(e,t)=>ye(t)),i=pe(t,(e,t)=>{if(n?.searchParamStrategy===pr.Append){let i=r[e],a=A.isArray(i)?i:[i];if(t){let e=A.isArray(t)?t:[t];return hr([...a,...e],n)}return hr(a,n)}if(A.isArray(t))return hr(t,n);if(t)return hr([t],n)});return fn({...r,...i},(e,t)=>!!t)}function vr(e,t){if(A.isString(e)&&!e.includes(`?`))return{};let n=A.isString(e)?e:e instanceof URLSearchParams?e.toString():e.search,r=n.indexOf(`#`);return{...(r===-1?n:n.slice(0,r)).replace(/^[^?]*\?/,``).split(`&`).filter(e=>e!==``).map(e=>{let[t,...n]=un({value:e,splitter:`=`});return[t,n.length?n.join(`=`):void 0]}).reduce((e,[n,r])=>{let i=xr({options:t,key:n,value:r}),a=Se(e,i.key,()=>[]);return r!=null&&a.push(i.value),e},Object.create(null))}}function yr(e){if(e!=null)return A.isArray(e)?[...e]:e===``?[]:[e]}function br(e,t){let n=g(Object.entries(e),([e,n])=>{let r=yr(n);return r?.length?r.map(n=>{let r=xr({options:t,key:e,value:n});return[r.key,r.value].join(`=`)}):[e]},(e,[,t])=>t!=null).flat();return n.length?Ke({value:n.join(`&`),prefix:`?`}):``}function xr({options:e,key:t,value:n}){return{key:gr(t,e),value:gr(String(n),e)}}var Sr=[`ftp`,`file`,`http`,`https`,`ws`,`wss`];function Cr({hash:e,hostname:t,password:n,pathname:r,port:i,protocol:a,search:o,username:s}){return[a?a+`://`:``,s?encodeURIComponent(s)+`:`:``,n?encodeURIComponent(n)+`@`:``,Er({hostname:t,port:i}),Tr({hash:e,pathname:r,search:o})].join(``)}function wr({pathname:e}){let t=y({value:e,prefix:`/`});return t?t.split(`/`):[]}function Tr({hash:e,pathname:t,search:n}){return[Ke({value:t,prefix:`/`}),n?Ke({value:n,prefix:`?`}):``,e?Ke({value:e,prefix:`#`}):``].join(``)}function Er({hostname:e,port:t}){return[e,t?`:`+t:``].join(``)}function Dr({hostname:e}){return e?e.split(`.`):[]}function Or({hostname:e,port:t,protocol:n}){return[n,Er({hostname:e,port:t})].filter(A.isTruthy).join(`://`)}function kr(e,t){let n=A.isString(e)?y({value:e,prefix:`.`}):e.toString(),r=n.replace(/^[^#]*(?:#|$)/,``),i=r?Ke({value:gr(r,t),prefix:`#`}):``,a=n.indexOf(`#`),o=a===-1?n:n.slice(0,a),s=o.replace(/^[^?]*(?:\?|$)/,``),c=s?Ke({value:gr(s,t),prefix:`?`}):``,l=o.indexOf(`?`),u=l===-1?o:o.slice(0,l),d=u.includes(`://`)?u.replace(/:\/\/.*$/,``):``,f=(Sr.includes(d.toLowerCase())?u.replace(/\\/g,`/`):u).replace(/^.*?:\/\//,``).replace(/\/{2,}/g,`/`),p=f.length-f.replace(/^\/*/,``).length,m=f.slice(p).replace(/\/.*/,``).lastIndexOf(`@`),h=m!==-1,g=h?f.slice(0,p+m):``,_=h?f.slice(p+m+1):f,[v,...b]=h?g.split(`:`).reverse():[],x=decodeURIComponent(b.toReversed().join(``).replace(/[/:]/g,``)||``),S=decodeURIComponent(v?.replace(/[/:]/g,``)||``),C=_.replace(/\/.*/,``),ee=ln(C,`:`,{caseSensitive:!0}).toReversed(),te=!ee[0]?.endsWith(`]`)&&ee[1]===`:`,w=te&&ee[0]||``,ne=te?C.slice(0,C.length-w.length-1):C,re=ne.endsWith(`]`)?void 0:ne.match(/^(?<host>.*):(?<port>\d+)$/),T=re?.groups?.host??ne,ie=Dr({hostname:T}),ae=re?.groups?.port??w,oe=gr(_.replace(/^[^/]*(\/|$)/,`$1`).replace(/^[^/]*(?:\/|$)/,`/`),t),se=Er({hostname:T,port:ae}),ce=Or({hostname:T,port:ae,protocol:d}),le=Cr({hash:i,hostname:T,password:S,pathname:oe,port:ae,protocol:d,search:c,username:x}),ue=vr(c),de=wr({pathname:oe});return{fullPath:Tr({hash:i,pathname:oe,search:c}),hash:i,host:se,hostname:T,domains:ie,href:le,origin:ce,password:S,pathname:oe,paths:de,port:ae,protocol:d,search:c,searchParams:ue,username:x}}t({hash:Tn(F(void 0,``)),search:Tn(F(void 0,``,On({keys:``,values:F(null,void 0,``,-1,!1,0n,[null,void 0,``,-1,!1,0n])}))),hostname:Tn(F(void 0,``)),domains:Tn(F(void 0,[``])),pathname:Tn(F(void 0,``)),paths:Tn(F(void 0,[``])),protocol:Tn(F(void 0,``)),username:Tn(F(void 0,``)),password:Tn(F(void 0,``)),port:Tn(F(void 0,``,-1))});function Ar(e,t,n){let r=!!n,i=t==null||ne(t,mr,{allowExtraKeys:!1}),a=i?kr(``):A.instanceOf(e,URL)||A.isString(e)?kr(e):e,o=i?e:t,s=A.isString(o)&&o.startsWith(`.`),c=A.isString(o)||A.instanceOf(o,URL)?fn(kr(o),(e,t)=>A.isTruthy(t)&&(e!==`domains`||A.isArray(t)&&t.length!==0)):o,l=r?n:i?t:void 0,u=pe(a,(e,t)=>{if(!A.hasKey(c,e))return t;let n=c[e];return A.isArray(n)?n:A.isNumber(n)?String(n):A.isString(n)?e===`hash`&&n?Ke({value:n,prefix:`#`}):e===`pathname`?Ke({value:n,prefix:`/`}):n:t});A.hasKey(c,`domains`)&&A.isArray(c.domains)&&(u.hostname=c.domains.join(`.`)),u.domains=Dr(u),A.hasKey(c,`paths`)&&c.paths&&(u.pathname=dr(s?a.pathname:``,...c.paths));let d=A.isString(c.search)?vr(Ke({value:c.search,prefix:`?`})):an(c.search||{}),f=_r(u.searchParams,d,{...l,encoding:fr.None}),p=br(f,l);return{...u,searchParams:f,search:p,paths:wr(u),fullPath:Tr(u),host:Er(u),origin:Or(u),href:Cr({...u,search:p})}}var jr=class{constructor(e=0,t=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=n,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){let t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++){let r=e[n];t[n]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){let e=this.first;delete this.items[e.key],--this.size===0?(this.first=null,this.last=null):(this.first=e.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){let t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){let e=Array(this.size),t=this.first,n=0;for(;t!==null;)e[n++]=t.key,t=t.next;return e}setWithEvicted(e,t,n=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,n);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let n=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=n:this.last.next=n,this.last=n}return r}set(e,t,n=!1,r=this.resetTtl){let i=this.items[e];return n||i!==void 0?(i.value=t,n===!1&&r&&(i.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(i)):(this.max>0&&this.size===this.max&&this.evict(!0),i=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=i:this.last.next=i,this.last=i),this}values(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++)t[n]=this.get(e[n]);return t}};function Mr(e=1e3,t=0,n=!1){if(isNaN(e)||e<0)throw TypeError(`Invalid max value`);if(isNaN(t)||t<0)throw TypeError(`Invalid ttl value`);if(typeof n!=`boolean`)throw TypeError(`Invalid resetTtl value`);return new jr(e,t,n)}function Nr(e){return!!e.tagStyles&&Object.keys(e.tagStyles).length>0}function Pr(e){return e.includes(`<`)}function Fr(e,t){return e.clone().assign(t)}function Ir(e,t){let n=[],r=t.tagStyles;if(!Nr(t)||!Pr(e))return n.push({text:e,style:t}),n;let i=[t],a=[],o=``,s=0;for(;s<e.length;){let t=e[s];if(t===`<`){let c=e.indexOf(`>`,s);if(c===-1){o+=t,s++;continue}let l=e.indexOf(`<`,s+1);if(l!==-1&&l<c){o+=t,s++;continue}let u=e.slice(s+1,c);if(u.startsWith(`/`)){let t=u.slice(1).trim();if(a.length>0&&a[a.length-1]===t){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``),i.pop(),a.pop(),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}{let t=u.trim();if(r[t]){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``);let e=i[i.length-1],l=Fr(e,r[t]);i.push(l),a.push(t),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}}o+=t,s++}return o.length>0&&n.push({text:o,style:i[i.length-1]}),n}var Lr=new Set([10,13]),Rr=new Set([9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288]),zr=new Set([45,8208,8211,8212,173]),Br=/(\r\n|\r|\n)/,Vr=/(?:\r\n|\r|\n)/;function Hr(e){return typeof e==`string`&&Lr.has(e.charCodeAt(0))}function Ur(e,t){return typeof e==`string`&&Rr.has(e.charCodeAt(0))}function Wr(e){return typeof e==`string`&&zr.has(e.charCodeAt(0))}function Gr(e){return e===`normal`||e===`pre-line`}function Kr(e){return e===`normal`}function qr(e){if(typeof e!=`string`)return``;let t=e.length-1;for(;t>=0&&Ur(e[t]);)t--;return t<e.length-1?e.slice(0,t+1):e}function Jr(e){let t=[],n=[];if(typeof e!=`string`)return t;for(let r=0;r<e.length;r++){let i=e[r],a=e[r+1];if(Ur(i,a)||Hr(i)){n.length>0&&(t.push(n.join(``)),n.length=0),i===`\r`&&a===`
`?(t.push(`\r
`),r++):t.push(i);continue}n.push(i),Wr(i)&&a&&!Ur(a)&&!Hr(a)&&(t.push(n.join(``)),n.length=0)}return n.length>0&&t.push(n.join(``)),t}function Yr(e,t,n,r){let i=n(e),a=[];for(let n=0;n<i.length;n++){let o=i[n],s=o,c=1;for(;i[n+c];){let a=i[n+c];if(!r(s,a,e,n,t))o+=a,s=a,c++;else break}n+=c-1,a.push(o)}return a}var Xr=/\r\n|\r|\n/g;function Zr(e,t,n,r,i,a,o,s,c){let l=Ir(e,t);if(Kr(t.whiteSpace))for(let e=0;e<l.length;e++){let t=l[e];l[e]={text:t.text.replace(Xr,` `),style:t.style}}let u=[],d=[];for(let e of l){let t=e.text.split(Br);for(let n=0;n<t.length;n++){let r=t[n];r===`\r
`||r===`\r`||r===`
`?(u.push(d),d=[]):r.length>0&&d.push({text:r,style:e.style})}}(d.length>0||u.length===0)&&u.push(d);let f=n?Qr(u,t,r,a,s,c):u,p=[],m=[],h=[],g=[],_=[],v=0,y=t._fontString,b=o(y);b.fontSize===0&&(b.fontSize=t.fontSize,b.ascent=t.fontSize);let x=``,S=!!t.dropShadow,C=t._stroke?.width||0;for(let e of f){let n=0,a=b.ascent,s=b.descent,c=``;for(let t of e){let e=t.style._fontString,l=o(e);e!==x&&(r.font=e,x=e);let u=i(t.text,t.style.letterSpacing,r);n+=u,a=Math.max(a,l.ascent),s=Math.max(s,l.descent),c+=t.text;let d=t.style._stroke?.width||0;d>C&&(C=d),!S&&t.style.dropShadow&&(S=!0)}e.length===0&&(a=b.ascent,s=b.descent),p.push(n),m.push(a),h.push(s),_.push(c);let l=t.lineHeight||a+s;g.push(l+t.leading),v=Math.max(v,n)}let ee=C,te=v+ee+(t.dropShadow?t.dropShadow.distance:0),w=0;for(let e=0;e<g.length;e++)w+=g[e];return w=Math.max(w,g[0]+ee),{width:te,height:w+(t.dropShadow?t.dropShadow.distance:0),lines:_,lineWidths:p,lineHeight:(t.lineHeight||b.fontSize)+t.leading,maxLineWidth:v,fontProperties:b,runsByLine:f,lineAscents:m,lineDescents:h,lineHeights:g,hasDropShadow:S}}function Qr(e,t,n,r,i,a){let{letterSpacing:o,whiteSpace:s,wordWrapWidth:c,breakWords:l}=t,u=Gr(s),d=c+o,f={},p=``,m=(e,t)=>{let i=`${e}|${t.styleKey}`,a=f[i];if(a===void 0){let o=t._fontString;o!==p&&(n.font=o,p=o),a=r(e,t.letterSpacing,n)+t.letterSpacing,f[i]=a}return a},h=[];for(let t of e){let e=$r(t),n=h.length,r=t=>{let n=0,r=t;do{let{token:t,style:i}=e[r];n+=m(t,i),r++}while(r<e.length&&e[r].continuesFromPrevious);return n},o=t=>{let n=[],r=t;do n.push({token:e[r].token,style:e[r].style}),r++;while(r<e.length&&e[r].continuesFromPrevious);return n},s=[],c=0,f=!u,p=null,g=()=>{p&&p.text.length>0&&s.push(p),p=null},_=()=>{if(g(),s.length>0){let e=s[s.length-1];e.text=qr(e.text),e.text.length===0&&s.pop()}h.push(s),s=[],c=0,f=!1};for(let t=0;t<e.length;t++){let{token:n,style:v,continuesFromPrevious:y}=e[t],b=m(n,v);if(u){let e=Ur(n),t=p?.text[p.text.length-1]??s[s.length-1]?.text.slice(-1)??``,r=t?Ur(t):!1;if(e&&r)continue}let x=!y,S=x?r(t):b;if(S>d&&x){if(c>0&&_(),l){let e=o(t);for(let t=0;t<e.length;t++){let n=e[t].token,r=e[t].style,o=Yr(n,l,a,i);for(let e of o){let t=m(e,r);t+c>d&&_(),!p||p.style!==r?(g(),p={text:e,style:r}):p.text+=e,c+=t}}t+=e.length-1}else{let e=o(t);g(),h.push(e.map(e=>({text:e.token,style:e.style}))),f=!1,t+=e.length-1}}else if(S+c>d&&x){if(Ur(n)){f=!1;continue}_(),p={text:n,style:v},c=b}else if(y&&!l)!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b;else{let e=Ur(n);if(c===0&&e&&!f)continue;!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b}}if(g(),s.length>0){let e=s[s.length-1];e.text=qr(e.text),e.text.length===0&&s.pop()}(s.length>0||h.length===n)&&h.push(s)}return h}function $r(e){let t=[],n=!1;for(let r of e){let e=Jr(r.text),i=!0;for(let a of e){let e=Ur(a)||Hr(a),o=i&&n&&!e;t.push({token:a,style:r.style,continuesFromPrevious:o}),n=!e,i=!1}}return t}var ei={willReadFrequently:!0};function ti(e,t,n,r,i){let a=n[e];return typeof a!=`number`&&(a=i(e,t,r)+t,n[e]=a),a}function ni(e,t,n,r,i,a,o){let s=n.getContext(`2d`,ei);s.font=t._fontString;let c=0,l=``,u=[],d=Object.create(null),{letterSpacing:f,whiteSpace:p}=t,m=Gr(p),h=Kr(p),g=!m,_=t.wordWrapWidth+f,v=Jr(e);for(let e=0;e<v.length;e++){let n=v[e];if(Hr(n)){if(!h){u.push(qr(l)),g=!m,l=``,c=0;continue}n=` `}if(m){let e=Ur(n),t=Ur(l[l.length-1]);if(e&&t)continue}let p=ti(n,f,d,s,r);if(p>_){if(l!==``&&(u.push(qr(l)),l=``,c=0),i(n,t.breakWords)){let e=Yr(n,t.breakWords,o,a);for(let t of e){let e=ti(t,f,d,s,r);e+c>_&&(u.push(qr(l)),g=!1,l=``,c=0),l+=t,c+=e}}else l.length>0&&(u.push(qr(l)),l=``,c=0),u.push(qr(n)),g=!1,l=``,c=0}else p+c>_&&(g=!1,u.push(qr(l)),l=``,c=0),(l.length>0||!Ur(n)||g)&&(l+=n,c+=p)}let y=qr(l);return y.length>0&&u.push(y),u.join(`
`)}var ri={willReadFrequently:!0},ii=class e{static get experimentalLetterSpacingSupported(){let t=e._experimentalLetterSpacingSupported;if(t===void 0){let n=Ft.get().getCanvasRenderingContext2D().prototype;t=e._experimentalLetterSpacingSupported=`letterSpacing`in n||`textLetterSpacing`in n}return t}constructor(e,t,n,r,i,a,o,s,c,l){this.text=e,this.style=t,this.width=n,this.height=r,this.lines=i,this.lineWidths=a,this.lineHeight=o,this.maxLineWidth=s,this.fontProperties=c,l&&(this.runsByLine=l.runsByLine,this.lineAscents=l.lineAscents,this.lineDescents=l.lineDescents,this.lineHeights=l.lineHeights,this.hasDropShadow=l.hasDropShadow)}static measureText(t=` `,n,r=e._canvas,i=n.wordWrap){let a=`${t}-${n.styleKey}-wordWrap-${i}`;if(e._measurementCache.has(a))return e._measurementCache.get(a);if(Nr(n)&&Pr(t)){let r=Zr(t,n,i,e._context,e._measureText,e._measureTextAdvance,e.measureFont,e.canBreakChars,e.wordWrapSplit),o=new e(t,n,r.width,r.height,r.lines,r.lineWidths,r.lineHeight,r.maxLineWidth,r.fontProperties,{runsByLine:r.runsByLine,lineAscents:r.lineAscents,lineDescents:r.lineDescents,lineHeights:r.lineHeights,hasDropShadow:r.hasDropShadow});return e._measurementCache.set(a,o),o}let o=n._fontString,s=e.measureFont(o);s.fontSize===0&&(s.fontSize=n.fontSize,s.ascent=n.fontSize,s.descent=0);let c=e._context;c.font=o;let l=(i?e._wordWrap(t,n,r):t).split(Vr),u=Array(l.length),d=0;for(let t=0;t<l.length;t++){let r=e._measureText(l[t],n.letterSpacing,c);u[t]=r,d=Math.max(d,r)}let f=n._stroke?.width??0,p=n.lineHeight||s.fontSize,m=e._adjustWidthForStyle(d,n),h=Math.max(p,s.fontSize+f)+(l.length-1)*(p+n.leading),g=e._adjustHeightForStyle(h,n),_=new e(t,n,m,g,l,u,p+n.leading,d,s);return e._measurementCache.set(a,_),_}static _adjustWidthForStyle(e,t){let n=e+(t._stroke?.width||0);return t.dropShadow&&(n+=t.dropShadow.distance),n}static _adjustHeightForStyle(e,t){let n=e;return t.dropShadow&&(n+=t.dropShadow.distance),n}static _measureText(t,n,r){let{metricWidth:i,metrics:a,letterSpacingVal:o}=e._measureTextCore(t,n,r),s=-(a.actualBoundingBoxLeft??0),c=(a.actualBoundingBoxRight??0)-s;return a.width>0&&(c+=o),Math.max(i,c)}static _measureTextAdvance(t,n,r){return e._measureTextCore(t,n,r).metricWidth}static _measureTextCore(t,n,r){let i=!1;e.experimentalLetterSpacingSupported&&(e.experimentalLetterSpacing?(r.letterSpacing=`${n}px`,r.textLetterSpacing=`${n}px`,i=!0):(r.letterSpacing=`0px`,r.textLetterSpacing=`0px`));let a=r.measureText(t),o=a.width,s=0;return o>0&&(s=i?-n:(e.graphemeSegmenter(t).length-1)*n,o+=s),{metricWidth:o,metrics:a,letterSpacingVal:s}}static _wordWrap(t,n,r=e._canvas){return ni(t,n,r,e._measureTextAdvance,e.canBreakWords,e.canBreakChars,e.wordWrapSplit)}static isBreakingSpace(e,t){return Ur(e,t)}static canBreakWords(e,t){return t}static canBreakChars(e,t,n,r,i){return!0}static wordWrapSplit(t){return e.graphemeSegmenter(t)}static measureFont(t){if(e._fonts[t])return e._fonts[t];let n=e._context;n.font=t;let r=n.measureText(e.METRICS_STRING+e.BASELINE_SYMBOL),i=r.actualBoundingBoxAscent??0,a=r.actualBoundingBoxDescent??0,o={ascent:i,descent:a,fontSize:i+a};return e._fonts[t]=o,o}static clearMetrics(t=``){t?delete e._fonts[t]:e._fonts={}}static get _canvas(){if(!e.__canvas){let t;try{let n=new OffscreenCanvas(0,0);if(n.getContext(`2d`,ri)?.measureText)return e.__canvas=n,n;t=Ft.get().createCanvas()}catch{t=Ft.get().createCanvas()}t.width=t.height=10,e.__canvas=t}return e.__canvas}static get _context(){return e.__context||=e._canvas.getContext(`2d`,ri),e.__context}};ii.METRICS_STRING=`|ÉqÅ`,ii.BASELINE_SYMBOL=`M`,ii.BASELINE_MULTIPLIER=1.4,ii.HEIGHT_MULTIPLIER=2,ii.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter==`function`){let e=new Intl.Segmenter;return t=>{let n=e.segment(t),r=[],i=0;for(let e of n)r[i++]=e.segment;return r}}return e=>[...e]})(),ii.experimentalLetterSpacing=!1,ii._fonts={},ii._measurementCache=Mr(1e3);var ai=ii,oi=[`serif`,`sans-serif`,`monospace`,`cursive`,`fantasy`,`system-ui`];function si(e){let t=typeof e.fontSize==`number`?`${e.fontSize}px`:e.fontSize,n=e.fontFamily;Array.isArray(e.fontFamily)||(n=e.fontFamily.split(`,`));for(let e=n.length-1;e>=0;e--){let t=n[e].trim();!/([\"\'])[^\'\"]+\1/.test(t)&&!oi.includes(t)&&(t=`"${t}"`),n[e]=t}return`${e.fontStyle} ${e.fontVariant} ${e.fontWeight} ${t} ${n.join(`,`)}`}var ci=class e extends Dt{constructor(t={}){super(),this.uid=Nt(`textStyle`),this._tick=0,this._cachedFontString=null,ui(t),t instanceof e&&(t=t._toObject());let n={...e.defaultTextStyle,...t};for(let e in n){let t=e;this[t]=n[e]}this._tagStyles=t.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow!==t&&(this._dropShadow=typeof t==`object`&&t?this._createProxy({...e.defaultDropShadow,...t}):t?this._createProxy({...e.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(this._fontSize=typeof e==`string`?parseInt(e,10):e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...Vt.defaultFillStyle,...e},()=>{this._fill=zt({...this._originalFill},Vt.defaultFillStyle)})),this._fill=zt(e===0?`black`:e,Vt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...Vt.defaultStrokeStyle,...e},()=>{this._stroke=Rt({...this._originalStroke},Vt.defaultStrokeStyle)})),this._stroke=Rt(e,Vt.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit(`update`,this)}reset(){let t=e.defaultTextStyle;for(let e in t)this[e]=t[e]}assign(e){for(let t in e){let n=t;this[n]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=si(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new e(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(t),this._originalFill?.texture&&this._originalFill.texture.destroy(t),this._stroke?.texture&&this._stroke.texture.destroy(t),this._originalStroke?.texture&&this._originalStroke.texture.destroy(t)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(e,n,r)=>e[n]===r||(e[n]=r,t?.(n,r),this.update(),!0)})}_isFillStyle(e){return(e??null)!==null&&!(vt.isColorLike(e)||e instanceof Ht||e instanceof Bt)}};ci.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:`black`,distance:5},ci.defaultTextStyle={align:`left`,breakWords:!1,dropShadow:null,fill:`black`,fontFamily:`Arial`,fontSize:26,fontStyle:`normal`,fontVariant:`normal`,fontWeight:`normal`,leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:`alphabetic`,trim:!1,whiteSpace:`pre`,wordWrap:!1,wordWrapWidth:100};var li=ci;function ui(e){let t=e;if(typeof t.dropShadow==`boolean`&&t.dropShadow){let n=li.defaultDropShadow;e.dropShadow={alpha:t.dropShadowAlpha??n.alpha,angle:t.dropShadowAngle??n.angle,blur:t.dropShadowBlur??n.blur,color:t.dropShadowColor??n.color,distance:t.dropShadowDistance??n.distance}}if(t.strokeThickness!==void 0){gt(dt,`strokeThickness is now a part of stroke`);let n=t.stroke,r={};if(vt.isColorLike(n))r.color=n;else if(n instanceof Ht||n instanceof Bt)r.fill=n;else if(Object.hasOwnProperty.call(n,`color`)||Object.hasOwnProperty.call(n,`fill`))r=n;else throw Error(`Invalid stroke value.`);e.stroke={...r,width:t.strokeThickness}}if(Array.isArray(t.fillGradientStops)){if(gt(dt,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(t.fill)||t.fill.length===0)throw Error(`Invalid fill value. Expected an array of colors for gradient fill.`);t.fill.length!==t.fillGradientStops.length&&ht(`The number of fill colors must match the number of fill gradient stops.`);let n=new Ht({start:{x:0,y:0},end:{x:0,y:1},textureSpace:`local`}),r=t.fillGradientStops.slice(),i=t.fill.map(e=>vt.shared.setValue(e).toNumber());r.forEach((e,t)=>{n.addColorStop(e,i[t])}),e.fill={fill:n}}}var di=1e5;function fi(e,t,n,r=0,i=0,a=0){if(e.texture===ut.WHITE&&!e.fill)return vt.shared.setValue(e.color).setAlpha(e.alpha??1).toHexa();if(!e.fill){let n=t.createPattern(e.texture.source.resource,`repeat`),r=e.matrix.copyTo(At.shared);return r.scale(e.texture.source.pixelWidth,e.texture.source.pixelHeight),n.setTransform(r),n}if(e.fill instanceof Bt){let n=e.fill,r=t.createPattern(n.texture.source.resource,`repeat`);return Lt.applyPatternTransform(r,n.transform,!1),r}if(e.fill instanceof Ht){let o=e.fill,s=o.type===`linear`,c=o.textureSpace===`local`,l=1,u=1;c&&n&&(l=n.width+r,u=n.height+r);let d,f=!1;if(s){let{start:e,end:n}=o;d=t.createLinearGradient(e.x*l+i,e.y*u+a,n.x*l+i,n.y*u+a),f=Math.abs(n.x-e.x)<Math.abs((n.y-e.y)*.1)}else{let{center:e,innerRadius:n,outerCenter:r,outerRadius:s}=o;d=t.createRadialGradient(e.x*l+i,e.y*u+a,n*l,r.x*l+i,r.y*u+a,s*l)}if(f&&c&&n){let e=n.lineHeight/u;for(let t=0;t<n.lines.length;t++){let i=(t*n.lineHeight+r/2)/u;o.colorStops.forEach(t=>{let n=i+t.offset*e;n=Math.max(0,Math.min(1,n)),d.addColorStop(Math.floor(n*di)/di,vt.shared.setValue(t.color).toHex())})}}else o.colorStops.forEach(e=>{d.addColorStop(e.offset,vt.shared.setValue(e.color).toHex())});return d}return ht(`FillStyle not recognised`,e),`red`}function pi(){let e=new Audio,t=!!e.canPlayType(`audio/mpeg;`),n=globalThis.navigator.userAgent,r=n.match(/OPR\/(\d+)/g),i=r?.[0].split(`/`)[1],a=r&&i?parseInt(i)<33:!1,o=n.includes(`Safari`)&&!n.includes(`Chrome`),s=n.match(/Version\/(.*?) /)?.[1],c=o&&s?parseInt(s,10)<15:!1;return{mp3:!(a||!t&&!e.canPlayType(`audio/mp3;`)),mpeg:t,opus:!!e.canPlayType(`audio/ogg; codecs="opus"`),ogg:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),oga:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),wav:!!(e.canPlayType(`audio/wav; codecs="1"`)||e.canPlayType(`audio/wav`)),aac:!!e.canPlayType(`audio/aac;`),caf:!!e.canPlayType(`audio/x-caf;`),m4a:!!(e.canPlayType(`audio/x-m4a;`)||e.canPlayType(`audio/m4a;`)||e.canPlayType(`audio/aac;`)),m4b:!!(e.canPlayType(`audio/x-m4b;`)||e.canPlayType(`audio/m4b;`)||e.canPlayType(`audio/aac;`)),mp4:!!(e.canPlayType(`audio/x-mp4;`)||e.canPlayType(`audio/mp4;`)||e.canPlayType(`audio/aac;`)),weba:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),webm:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),dolby:!!e.canPlayType(`audio/mp4; codecs="ec-3"`),flac:!!(e.canPlayType(`audio/x-flac;`)||e.canPlayType(`audio/flac;`))}}var mi=pi();pe(mi,e=>e);function hi(e){return!!mi[e]}function gi(e){let t=_i(e);if(!t)throw Error(`Cannot determine file extension from '${e}'`);return hi(t)}function _i(e){let t=/^data:audio\/([^;,]+);/i.exec(e),n=e.split(`?`,1)[0],r=n&&/\.([^.]+)$/.exec(n);return(t||r)?.[1]?.toLowerCase()}async function vi(e=new AudioContext){e instanceof AudioContext&&e.state===`suspended`&&e.resume().catch(()=>{});let t=e.createBufferSource();t.buffer=e.createBuffer(1,1,22050),t.connect(e.destination);let n=new w;return t.addEventListener(`ended`,()=>{t.disconnect(),n.isSettled||n.resolve(!0)}),t.start(),globalThis.setTimeout(()=>{n.isSettled||n.resolve(!1)},100),n.promise}function yi(e){return ye(e.sources).map(e=>A.isString(e)?e:[e.url,e.codec].join(`,`)).concat(`v=${e.volume??1}`).join(`;`)}var bi=class extends ge(`audio-file-play-end`){},xi=class extends ge(`audio-file-play-start`){};ge(`audio-file-destroyed`);var Si=class extends ge(`audio-file-load`){},Ci=class extends m()(`audio-file-error`){},wi=class extends ge(`playing-enabled`){};function Ti(e,t,n){let r=n?.(e);return!r||!A.isLengthAtLeast(r,1)?{outputNode:t}:(r.forEach((e,n,r)=>{let i=r[n+1];i?e.connect(i):e.connect(t)}),{outputNode:r[0]})}var Ei=class extends Je{params;urlOrBase64;loadPromise;outputNode;audioContext;audioCache;fetch;isAudioAllowed=!1;isDestroyed=!1;gainNode;sourceKey;activeBufferSources=new Map;audioChannelOutputNodeMap=new Map;pausedPlaybacks=new Set;constructor(e){super(),this.params=e,this.sourceKey=yi(e);let t=ye(e.sources).find(e=>A.isString(e)?gi(e):hi(e.codec));if(!t){let t=Error(`No valid audio source files found in: ${i(e.sources)}`);throw this.dispatch(new Ci({detail:t})),t}this.urlOrBase64=A.isString(t)?t:t.url,this.audioContext=e.audioContext||e.outputNode?.context||new AudioContext,this.audioCache=e.audioCache||{},this.fetch=e.fetch||globalThis.fetch.bind(globalThis),this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=on(e.volume??1,{min:0,max:1}),this.gainNode.connect(e.outputNode||this.audioContext.destination),this.outputNode=Ti(this.audioContext,this.gainNode,e.createEffects).outputNode}load(){return this.loadPromise||=this.loadAudioBuffer(),this.loadPromise}async play({outputNode:e}={}){let t=await this.load();if(!this.isAudioAllowed){if(h(this).isAudioAllowed=await vi(this.audioContext),this.isAudioAllowed)this.dispatch(new wi);else return!1}let n={audioBuffer:t,deferredPlayPromise:new w,offsetSeconds:0,startedAt:this.audioContext.currentTime,...e?{inputNode:Ue(this.audioChannelOutputNodeMap,e,()=>{let t=this.audioContext.createGain();t.gain.value=on(this.params.volume??1,{min:0,max:1}),t.connect(e);let n={gainNode:t,inputNode:Ti(this.audioContext,t,this.params.createEffects).outputNode};return this.audioChannelOutputNodeMap.set(e,n),n}).inputNode}:{}};return this.startPlayback(n),n.deferredPlayPromise.promise}stop(){let e=[...this.pausedPlaybacks],t=[...this.activeBufferSources];this.pausedPlaybacks.clear(),this.activeBufferSources.clear(),e.forEach(e=>{e.deferredPlayPromise.resolve(!0),this.dispatch(new bi)}),t.forEach(([e,t])=>{e.stop(),t.deferredPlayPromise.resolve(!0),this.dispatch(new bi)})}pause(){[...this.activeBufferSources].forEach(([e,t])=>{let n=Math.min(t.audioBuffer.duration,t.offsetSeconds+this.audioContext.currentTime-t.startedAt);n>=t.audioBuffer.duration||(this.activeBufferSources.delete(e),this.pausedPlaybacks.add({...t,offsetSeconds:n}),e.stop())})}resume(){[...this.pausedPlaybacks].forEach(e=>{this.pausedPlaybacks.delete(e),this.startPlayback(e)})}async destroy(){if(this.isDestroyed)return;h(this).isDestroyed=!0,this.stop(),super.destroy();let e=await this.audioCache[this.urlOrBase64];e&&(e.using.delete(this),e.using.size||delete this.audioCache[this.urlOrBase64]),this.audioChannelOutputNodeMap.forEach(e=>{e.inputNode!==e.gainNode&&e.inputNode.disconnect(),e.gainNode.disconnect()}),this.audioChannelOutputNodeMap.clear(),this.outputNode.disconnect(),this.audioCache={},this.loadPromise=void 0,delete this.outputNode,delete this.audioCache}async loadAudioBuffer(){try{let e=this.audioCache[this.urlOrBase64];if(e){let t=await e;return t.using.add(this),t.buffer}let t=new w;this.audioCache[this.urlOrBase64]=t.promise;let n=/^data:[^;]+;base64,/.test(this.urlOrBase64)?this.loadBase64():await this.loadFromUrl(),r=await this.audioContext.decodeAudioData(n);return t.resolve({using:new Set([this]),buffer:r}),this.dispatch(new Si),r}catch(e){let t=v(e);throw this.dispatch(new Ci({detail:t})),t}}loadBase64(){let e=atob(O.isDefined(this.urlOrBase64.split(`,`)[1],`Invalid base64 audio string/`)),t=new Uint8Array(e.length);for(let n=0;n<e.length;++n)t[n]=O.isDefined(e.codePointAt(n),`Invalid base64 audio string at ${n}.`);return t.buffer}async loadFromUrl(){return await(await this.fetch(this.urlOrBase64)).arrayBuffer()}startPlayback(e){let t=this.audioContext.createBufferSource();t.buffer=e.audioBuffer,t.connect(e.inputNode??this.outputNode),e.startedAt=this.audioContext.currentTime,this.activeBufferSources.set(t,e),t.addEventListener(`ended`,()=>{this.activeBufferSources.delete(t)&&(e.deferredPlayPromise.resolve(!0),this.dispatch(new bi))}),this.dispatch(new xi),t.start(0,e.offsetSeconds)}},Di=class extends Je{options;audioChannelNodes={};audioFiles={};audioContext=new AudioContext;audioCache={};isDestroyed=!1;outputNode;isAudioAllowed=!1;gainNode;constructor(t={}){super(),this.options=t,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=on(t.volume??1,{min:0,max:1}),this.gainNode.connect(this.audioContext.destination),this.outputNode=Ti(this.audioContext,this.gainNode,t.createEffects).outputNode,e(t.initChannels||{}).forEach(([e,t])=>{this.getAudioChannelNode(e,t)})}async play({audioChannel:e,...t}){let n=this.setupAudioFile(t);return e==null?n.play():n.play({outputNode:this.getAudioChannelNode(e,1)})}getAudioChannelNode(e,t){return Se(this.audioChannelNodes,e,()=>{let e=this.audioContext.createGain();return e.gain.value=on(t,{min:0,max:1}),e.connect(this.outputNode),e})}setupAudioFile(e){let t=yi(e),n=this.audioFiles[t];if(n)return n;let r=new Ei({fetch:this.options.fetch,...e,audioCache:this.audioCache,audioContext:this.audioContext,outputNode:this.outputNode});return this.audioFiles[t]=r,r.listenToAll(e=>{e instanceof wi&&!this.isAudioAllowed&&(h(this).isAudioAllowed=!0,Object.values(this.audioFiles).forEach(e=>{h(e).isAudioAllowed=!0})),this.dispatch(e)}),r}async unloadFiles(e){await Promise.all(e.map(async e=>{let t=yi(e);await this.audioFiles[t]?.destroy(),delete this.audioFiles[t]}))}stopFile(e){let t=yi(e);this.audioFiles[t]?.stop()}stopFiles(e){e.forEach(e=>{this.stopFile(e)})}stopAllFiles(){Ne(this.audioFiles).forEach(e=>{e.stop()})}pauseFile(e){let t=yi(e);this.audioFiles[t]?.pause()}pauseFiles(e){e.forEach(e=>{this.pauseFile(e)})}pauseAllFiles(){Ne(this.audioFiles).forEach(e=>{e.pause()})}resumeFile(e){let t=yi(e);this.audioFiles[t]?.resume()}resumeFiles(e){e.forEach(e=>{this.resumeFile(e)})}resumeAllFiles(){Ne(this.audioFiles).forEach(e=>{e.resume()})}async loadFiles(e,t={}){let n=0,r=async r=>{let i=this.setupAudioFile(r);return await i.load(),t.progressCallback&&(n++,t.progressCallback({finished:n>=e.length,loaded:n,total:e.length})),i};return t.serial?await ae(e,r):await Promise.all(e.map(r))}async destroy(){this.isDestroyed||=(super.destroy(),await Promise.all(Object.values(this.audioFiles).map(async e=>{delete this.audioFiles[e.sourceKey],await e.destroy(),delete this.audioCache[e.sourceKey]})),Ne(this.audioChannelNodes).forEach(e=>{e.disconnect()}),await this.audioContext.close(),!0)}};function Oi({audioPlayer:e}){e?.audioContext.resume().catch(()=>{})}function ki({audioPlayer:e}){let t;function n(){Oi({audioPlayer:e}),t?.(),t=void 0}let r=[Ve(`click`,n,{capture:!0}),Ve(`keydown`,n,{capture:!0})];return t=()=>{r.forEach(e=>e())},t}function Ai(t){t.audioChannelVolume||={master:1,channels:{}};let n=O.isDefined(t.audioPlayer),r=t.audioChannelVolume;A.isApproximately(n.gainNode.gain.value,r.master,1e-5)||(n.gainNode.gain.value=r.master),e(n.audioChannelNodes).forEach(([e,t])=>{let n=r.channels?.[e]??1;A.isApproximately(t.gain.value,n,1e-5)||(t.gain.value=n)})}function ji(e={}){return Ye({modName:`antha-audio`,async cleanup({state:e}){e.audioResumeListenersCleanup?.(),e.audioResumeListenersCleanup=void 0,await e.audioPlayer?.destroy()},execute({state:t}){t.audioPlayer||=new Di(e),Ai(t),!t.audioResumeListenersCleanup&&(t.audioResumeListenersCleanup=ki({audioPlayer:t.audioPlayer}))}})}function Mi(){let e,t;return Ye({modName:`antha-background-audio-playback`,execute({state:n}){if(!n.audioPlayer||(e!==n.currentBackgroundAudio&&(e&&n.audioPlayer.stopFile(e),e=n.currentBackgroundAudio,t=n.currentBackgroundAudio?{isBlocked:!1,isInFlight:!1}:void 0),!e||!t||t.isInFlight||t.isBlocked&&n.audioPlayer.audioContext.state!==`running`))return;let r=t;r.isInFlight=!0,n.audioPlayer.play(e).then(e=>{r.isBlocked=!e}).catch(e=>{E.error(e),t===r&&(t=void 0)}).finally(()=>{r.isInFlight=!1})}})}var Ni;(function(e){e[e.Undefined=1]=`Undefined`,e[e.Null=2]=`Null`,e[e.False=3]=`False`,e[e.True=4]=`True`,e[e.Number=5]=`Number`,e[e.BigInt=6]=`BigInt`,e[e.String=7]=`String`,e[e.Array=8]=`Array`,e[e.Object=9]=`Object`,e[e.Map=10]=`Map`,e[e.Set=11]=`Set`,e[e.Other=12]=`Other`})(Ni||={});var Pi=new DataView(new ArrayBuffer(8));function Fi(e){let t=2166136261;function n(e){t=Math.imul(t^e,16777619)>>>0}function r(e){n(e.length);for(let t=0;t<e.length;t++)n(O.isDefined(e.codePointAt(t)))}function i(e,r){let i=t,a=0;for(let n of e)t=2166136261,r(n),a=a+t>>>0;t=i,n(a)}function a(e){if(e===void 0)n(Ni.Undefined);else if(e==null)n(Ni.Null);else if(A.isBoolean(e))n(e?Ni.True:Ni.False);else if(typeof e==`number`)n(Ni.Number),Pi.setFloat64(0,Number.isNaN(e)?NaN:e===0?0:e),n(Pi.getUint32(0)),n(Pi.getUint32(4));else if(A.isString(e))n(Ni.String),r(e);else if(typeof e==`bigint`)n(Ni.BigInt),r(e.toString(16));else if(Array.isArray(e))n(Ni.Array),n(e.length),e.forEach(a);else if(e instanceof Map)n(Ni.Map),n(e.size),i(e,([e,t])=>{a(e),a(t)});else if(e instanceof Set)n(Ni.Set),n(e.size),i(e,a);else if(A.isObject(e)){let t=Object.keys(e).sort();n(Ni.Object),n(t.length),t.forEach(t=>{r(t),a(e[t])})}else n(Ni.Other)}return a(e),t}var Ii={exports:{}},Li=Ii.exports,Ri;function zi(){return Ri?Ii.exports:(Ri=1,(function(e,t){(function(t,n){e.exports=n()})(Li,function(){var e={};function t(e,t){this.x=e||0,this.y=t||0}e.Vector=t,e.V=t,t.prototype.copy=t.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this},t.prototype.clone=t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.perp=t.prototype.perp=function(){var e=this.x;return this.x=this.y,this.y=-e,this},t.prototype.rotate=t.prototype.rotate=function(e){var t=this.x,n=this.y;return this.x=t*Math.cos(e)-n*Math.sin(e),this.y=t*Math.sin(e)+n*Math.cos(e),this},t.prototype.reverse=t.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.normalize=t.prototype.normalize=function(){var e=this.len();return e>0&&(this.x/=e,this.y/=e),this},t.prototype.add=t.prototype.add=function(e){return this.x+=e.x,this.y+=e.y,this},t.prototype.sub=t.prototype.sub=function(e){return this.x-=e.x,this.y-=e.y,this},t.prototype.scale=t.prototype.scale=function(e,t){return this.x*=e,this.y*=t===void 0?e:t,this},t.prototype.project=t.prototype.project=function(e){var t=this.dot(e)/e.len2();return this.x=t*e.x,this.y=t*e.y,this},t.prototype.projectN=t.prototype.projectN=function(e){var t=this.dot(e);return this.x=t*e.x,this.y=t*e.y,this},t.prototype.reflect=t.prototype.reflect=function(e){var t=this.x,n=this.y;return this.project(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.reflectN=t.prototype.reflectN=function(e){var t=this.x,n=this.y;return this.projectN(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.dot=t.prototype.dot=function(e){return this.x*e.x+this.y*e.y},t.prototype.len2=t.prototype.len2=function(){return this.dot(this)},t.prototype.len=t.prototype.len=function(){return Math.sqrt(this.len2())};function n(e,n){this.pos=e||new t,this.r=n||0,this.offset=new t}e.Circle=n,n.prototype.getAABBAsBox=n.prototype.getAABBAsBox=function(){var e=this.r;return new i(this.pos.clone().add(this.offset).sub(new t(e,e)),e*2,e*2)},n.prototype.getAABB=n.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},n.prototype.setOffset=n.prototype.setOffset=function(e){return this.offset=e,this};function r(e,n){this.pos=e||new t,this.angle=0,this.offset=new t,this.setPoints(n||[])}e.Polygon=r,r.prototype.setPoints=r.prototype.setPoints=function(e){if(!this.points||this.points.length!==e.length){var n,r=this.calcPoints=[],i=this.edges=[],a=this.normals=[];for(n=0;n<e.length;n++){var o=e[n],s=n<e.length-1?e[n+1]:e[0];if(o!==s&&o.x===s.x&&o.y===s.y){e.splice(n,1),--n;continue}r.push(new t),i.push(new t),a.push(new t)}}return this.points=e,this._recalc(),this},r.prototype.setAngle=r.prototype.setAngle=function(e){return this.angle=e,this._recalc(),this},r.prototype.setOffset=r.prototype.setOffset=function(e){return this.offset=e,this._recalc(),this},r.prototype.rotate=r.prototype.rotate=function(e){for(var t=this.points,n=t.length,r=0;r<n;r++)t[r].rotate(e);return this._recalc(),this},r.prototype.translate=r.prototype.translate=function(e,t){for(var n=this.points,r=n.length,i=0;i<r;i++)n[i].x+=e,n[i].y+=t;return this._recalc(),this},r.prototype._recalc=function(){for(var e=this.calcPoints,t=this.edges,n=this.normals,r=this.points,i=this.offset,a=this.angle,o=r.length,s=0;s<o;s++){var c=e[s].copy(r[s]);c.x+=i.x,c.y+=i.y,a!==0&&c.rotate(a)}for(s=0;s<o;s++){var l=e[s],u=s<o-1?e[s+1]:e[0],d=t[s].copy(u).sub(l);n[s].copy(d).perp().normalize()}return this},r.prototype.getAABBAsBox=r.prototype.getAABBAsBox=function(){for(var e=this.calcPoints,n=e.length,r=e[0].x,a=e[0].y,o=e[0].x,s=e[0].y,c=1;c<n;c++){var l=e[c];l.x<r?r=l.x:l.x>o&&(o=l.x),l.y<a?a=l.y:l.y>s&&(s=l.y)}return new i(this.pos.clone().add(new t(r,a)),o-r,s-a)},r.prototype.getAABB=r.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},r.prototype.getCentroid=r.prototype.getCentroid=function(){for(var e=this.calcPoints,n=e.length,r=0,i=0,a=0,o=0;o<n;o++){var s=e[o],c=o===n-1?e[0]:e[o+1],l=s.x*c.y-c.x*s.y;r+=(s.x+c.x)*l,i+=(s.y+c.y)*l,a+=l}return a*=3,r/=a,i/=a,new t(r,i)};function i(e,n,r){this.pos=e||new t,this.w=n||0,this.h=r||0}e.Box=i,i.prototype.toPolygon=i.prototype.toPolygon=function(){var e=this.pos,n=this.w,i=this.h;return new r(new t(e.x,e.y),[new t,new t(n,0),new t(n,i),new t(0,i)])};function a(){this.a=null,this.b=null,this.overlapN=new t,this.overlapV=new t,this.clear()}e.Response=a,a.prototype.clear=a.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var o=[],s=0;s<10;s++)o.push(new t);for(var c=[],s=0;s<5;s++)c.push([]);var l=new a,u=new i(new t,1e-6,1e-6).toPolygon();function d(e,t,n){for(var r=Number.MAX_VALUE,i=-Number.MAX_VALUE,a=e.length,o=0;o<a;o++){var s=e[o].dot(t);s<r&&(r=s),s>i&&(i=s)}n[0]=r,n[1]=i}function f(e,t,n,r,i,a){var s=c.pop(),l=c.pop(),u=o.pop().copy(t).sub(e),f=u.dot(i);if(d(n,i,s),d(r,i,l),l[0]+=f,l[1]+=f,s[0]>l[1]||l[0]>s[1])return o.push(u),c.push(s),c.push(l),!0;if(a){var p=0;if(s[0]<l[0]){if(a.aInB=!1,s[1]<l[1])p=s[1]-l[0],a.bInA=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}}else if(a.bInA=!1,s[1]>l[1])p=s[0]-l[1],a.aInB=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}var g=Math.abs(p);g<a.overlap&&(a.overlap=g,a.overlapN.copy(i),p<0&&a.overlapN.reverse())}return o.push(u),c.push(s),c.push(l),!1}e.isSeparatingAxis=f;function p(e,t){var n=e.len2(),r=t.dot(e);return r<0?m:r>n?g:h}var m=-1,h=0,g=1;function _(e,t){var n=o.pop().copy(e).sub(t.pos).sub(t.offset),r=t.r*t.r,i=n.len2();return o.push(n),i<=r}e.pointInCircle=_;function v(e,t){u.pos.copy(e),l.clear();var n=S(u,t,l);return n&&=l.aInB,n}e.pointInPolygon=v;function y(e,t,n){var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos).sub(e.offset),i=e.r+t.r,a=i*i,s=r.len2();if(s>a)return o.push(r),!1;if(n){var c=Math.sqrt(s);n.a=e,n.b=t,n.overlap=i-c,n.overlapN.copy(r.normalize()),n.overlapV.copy(r).scale(n.overlap),n.aInB=e.r<=t.r&&c<=t.r-e.r,n.bInA=t.r<=e.r&&c<=e.r-t.r}return o.push(r),!0}e.testCircleCircle=y;function b(e,t,n){for(var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos),i=t.r,a=i*i,s=e.calcPoints,c=s.length,l=o.pop(),u=o.pop(),d=0;d<c;d++){var f=d===c-1?0:d+1,h=d===0?c-1:d-1,_=0,v=null;l.copy(e.edges[d]),u.copy(r).sub(s[d]),n&&u.len2()>a&&(n.aInB=!1);var y=p(l,u);if(y===m){l.copy(e.edges[h]);var b=o.pop().copy(r).sub(s[h]);if(y=p(l,b),y===g){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),o.push(b),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}o.push(b)}else if(y===g){if(l.copy(e.edges[f]),u.copy(r).sub(s[f]),y=p(l,u),y===m){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}}else{var S=l.perp().normalize(),x=u.dot(S);if(x>0&&Math.abs(x)>i)return o.push(r),o.push(S),o.push(u),!1;n&&(v=S,_=i-x,(x>=0||_<2*i)&&(n.bInA=!1))}v&&n&&Math.abs(_)<Math.abs(n.overlap)&&(n.overlap=_,n.overlapN.copy(v))}return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),o.push(r),o.push(l),o.push(u),!0}e.testPolygonCircle=b;function x(e,t,n){var r=b(t,e,n);if(r&&n){var i=n.a,a=n.aInB;n.overlapN.reverse(),n.overlapV.reverse(),n.a=n.b,n.b=i,n.aInB=n.bInA,n.bInA=a}return r}e.testCirclePolygon=x;function S(e,t,n){for(var r=e.calcPoints,i=r.length,a=t.calcPoints,o=a.length,s=0;s<i;s++)if(f(e.pos,t.pos,r,a,e.normals[s],n))return!1;for(var s=0;s<o;s++)if(f(e.pos,t.pos,r,a,t.normals[s],n))return!1;return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),!0}return e.testPolygonPolygon=S,e})})(Ii),Ii.exports)}var I=zi();function Bi(e,t,n=0,r=e.length-1,i=Hi){for(;r>n;){if(r-n>600){let a=r-n+1,o=t-n+1,s=Math.log(a),c=.5*Math.exp(2*s/3),l=.5*Math.sqrt(s*c*(a-c)/a)*(o-a/2<0?-1:1);Bi(e,t,Math.max(n,Math.floor(t-o*c/a+l)),Math.min(r,Math.floor(t+(a-o)*c/a+l)),i)}let a=e[t],o=n,s=r;for(Vi(e,n,t),i(e[r],a)>0&&Vi(e,n,r);o<s;){for(Vi(e,o,s),o++,s--;i(e[o],a)<0;)o++;for(;i(e[s],a)>0;)s--}i(e[n],a)===0?Vi(e,n,s):(s++,Vi(e,s,r)),s<=t&&(n=s+1),t<=s&&(r=s-1)}}function Vi(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function Hi(e,t){return e<t?-1:+(e>t)}var Ui=class{constructor(e=9){this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(this._maxEntries*.4)),this.clear()}all(){return this._all(this.data,[])}search(e){let t=this.data,n=[];if(!ta(e,t))return n;let r=this.toBBox,i=[];for(;t;){for(let a=0;a<t.children.length;a++){let o=t.children[a],s=t.leaf?r(o):o;ta(e,s)&&(t.leaf?n.push(o):ea(e,s)?this._all(o,n):i.push(o))}t=i.pop()}return n}collides(e){let t=this.data;if(!ta(e,t))return!1;let n=[];for(;t;){for(let r=0;r<t.children.length;r++){let i=t.children[r],a=t.leaf?this.toBBox(i):i;if(ta(e,a)){if(t.leaf||ea(e,a))return!0;n.push(i)}}t=n.pop()}return!1}load(e){if(!(e&&e.length))return this;if(e.length<this._minEntries){for(let t=0;t<e.length;t++)this.insert(e[t]);return this}let t=this._build(e.slice(),0,e.length-1,0);if(!this.data.children.length)this.data=t;else if(this.data.height===t.height)this._splitRoot(this.data,t);else{if(this.data.height<t.height){let e=this.data;this.data=t,t=e}this._insert(t,this.data.height-t.height-1,!0)}return this}insert(e){return e&&this._insert(e,this.data.height-1),this}clear(){return this.data=na([]),this}remove(e,t){if(!e)return this;let n=this.data,r=this.toBBox(e),i=[],a=[],o,s,c;for(;n||i.length;){if(n||(n=i.pop(),s=i[i.length-1],o=a.pop(),c=!0),n.leaf){let r=Wi(e,n.children,t);if(r!==-1)return n.children.splice(r,1),i.push(n),this._condense(i),this}!c&&!n.leaf&&ea(n,r)?(i.push(n),a.push(o),o=0,s=n,n=n.children[0]):s?(o++,n=s.children[o],c=!1):n=null}return this}toBBox(e){return e}compareMinX(e,t){return e.minX-t.minX}compareMinY(e,t){return e.minY-t.minY}toJSON(){return this.data}fromJSON(e){return this.data=e,this}_all(e,t){let n=[];for(;e;)e.leaf?t.push(...e.children):n.push(...e.children),e=n.pop();return t}_build(e,t,n,r){let i=n-t+1,a=this._maxEntries,o;if(i<=a)return o=na(e.slice(t,n+1)),Gi(o,this.toBBox),o;r||(r=Math.ceil(Math.log(i)/Math.log(a)),a=Math.ceil(i/a**(r-1))),o=na([]),o.leaf=!1,o.height=r;let s=Math.ceil(i/a),c=s*Math.ceil(Math.sqrt(a));ra(e,t,n,c,this.compareMinX);for(let i=t;i<=n;i+=c){let t=Math.min(i+c-1,n);ra(e,i,t,s,this.compareMinY);for(let n=i;n<=t;n+=s){let i=Math.min(n+s-1,t);o.children.push(this._build(e,n,i,r-1))}}return Gi(o,this.toBBox),o}_chooseSubtree(e,t,n,r){for(;r.push(t),!(t.leaf||r.length-1===n);){let n=1/0,r=1/0,i;for(let a=0;a<t.children.length;a++){let o=t.children[a],s=Xi(o),c=Qi(e,o)-s;c<r?(r=c,n=s<n?s:n,i=o):c===r&&s<n&&(n=s,i=o)}t=i||t.children[0]}return t}_insert(e,t,n){let r=n?e:this.toBBox(e),i=[],a=this._chooseSubtree(r,this.data,t,i);for(a.children.push(e),qi(a,r);t>=0&&i[t].children.length>this._maxEntries;)this._split(i,t),t--;this._adjustParentBBoxes(r,i,t)}_split(e,t){let n=e[t],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);let a=this._chooseSplitIndex(n,i,r),o=na(n.children.splice(a,n.children.length-a));o.height=n.height,o.leaf=n.leaf,Gi(n,this.toBBox),Gi(o,this.toBBox),t?e[t-1].children.push(o):this._splitRoot(n,o)}_splitRoot(e,t){this.data=na([e,t]),this.data.height=e.height+1,this.data.leaf=!1,Gi(this.data,this.toBBox)}_chooseSplitIndex(e,t,n){let r,i=1/0,a=1/0;for(let o=t;o<=n-t;o++){let t=Ki(e,0,o,this.toBBox),s=Ki(e,o,n,this.toBBox),c=$i(t,s),l=Xi(t)+Xi(s);c<i?(i=c,r=o,a=l<a?l:a):c===i&&l<a&&(a=l,r=o)}return r||n-t}_chooseSplitAxis(e,t,n){let r=e.leaf?this.compareMinX:Ji,i=e.leaf?this.compareMinY:Yi;this._allDistMargin(e,t,n,r)<this._allDistMargin(e,t,n,i)&&e.children.sort(r)}_allDistMargin(e,t,n,r){e.children.sort(r);let i=this.toBBox,a=Ki(e,0,t,i),o=Ki(e,n-t,n,i),s=Zi(a)+Zi(o);for(let r=t;r<n-t;r++){let t=e.children[r];qi(a,e.leaf?i(t):t),s+=Zi(a)}for(let r=n-t-1;r>=t;r--){let t=e.children[r];qi(o,e.leaf?i(t):t),s+=Zi(o)}return s}_adjustParentBBoxes(e,t,n){for(let r=n;r>=0;r--)qi(t[r],e)}_condense(e){for(let t=e.length-1,n;t>=0;t--)e[t].children.length===0?t>0?(n=e[t-1].children,n.splice(n.indexOf(e[t]),1)):this.clear():Gi(e[t],this.toBBox)}};function Wi(e,t,n){if(!n)return t.indexOf(e);for(let r=0;r<t.length;r++)if(n(e,t[r]))return r;return-1}function Gi(e,t){Ki(e,0,e.children.length,t,e)}function Ki(e,t,n,r,i){i||=na(null),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let a=t;a<n;a++){let t=e.children[a];qi(i,e.leaf?r(t):t)}return i}function qi(e,t){return e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),e}function Ji(e,t){return e.minX-t.minX}function Yi(e,t){return e.minY-t.minY}function Xi(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function Zi(e){return e.maxX-e.minX+(e.maxY-e.minY)}function Qi(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function $i(e,t){let n=Math.max(e.minX,t.minX),r=Math.max(e.minY,t.minY),i=Math.min(e.maxX,t.maxX),a=Math.min(e.maxY,t.maxY);return Math.max(0,i-n)*Math.max(0,a-r)}function ea(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function ta(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function na(e){return{children:e,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function ra(e,t,n,r,i){let a=[t,n];for(;a.length;){if(n=a.pop(),t=a.pop(),n-t<=r)continue;let o=t+Math.ceil((n-t)/r/2)*r;Bi(e,o,t,n,i),a.push(t,o,o,n)}}function ia(e,t,n,r){let i=t[0]-e[0],a=t[1]-e[1],o=r[0]-n[0],s=r[1]-n[1];if(o*a-s*i===0)return!1;let c=(i*(n[1]-e[1])+a*(e[0]-n[0]))/(o*a-s*i),l=(o*(e[1]-n[1])+s*(n[0]-e[0]))/(s*i-o*a);return c>=0&&c<=1&&l>=0&&l<=1}function aa(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(n[0]-e[0])*(t[1]-e[1])}function oa(e,t,n){return aa(e,t,n)>0}function sa(e,t,n){return aa(e,t,n)>=0}function ca(e,t,n){return aa(e,t,n)<0}function la(e,t,n){return aa(e,t,n)<=0}function ua(e,t){let n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function L(e,t){let n=e.length;return e[t<0?t%n+n:t%n]}function da(e,t,n,r){for(let i=n;i<r;i++)e.push(t[i])}function fa(e,t){return ca(L(e,t-1),L(e,t),L(e,t+1))}function pa(e,t,n){for(let r=0;r!==e.length;++r)if(r!==t&&r!==n&&(r+1)%e.length!==t&&(r+1)%e.length!==n&&ia(L(e,t),L(e,n),L(e,r),L(e,r+1)))return!1;return!0}function ma(e){let t=e,n=0;for(;n<t.length-1;n++)for(let e=0;e<n-1;e++)if(ia(t[n],t[n+1],t[e],t[e+1]))return!1;for(n=1;n<t.length-2;n++)if(ia(t[0],t[t.length-1],t[n],t[n+1]))return!1;return!0}function ha(e,t,n,r,i){i===void 0&&(i=0);let a=t[1]-e[1],o=e[0]-t[0],s=a*e[0]+o*e[1],c=r[1]-n[1],l=n[0]-r[0],u=c*n[0]+l*n[1],d=a*l-c*o;return _a(d,0,i)?[0,0]:[(l*s-o*u)/d,(a*u-c*s)/d]}function ga(e,t,n,r,i,a,o){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=[]),i===void 0&&(i=25),a===void 0&&(a=100),o===void 0&&(o=0);let s=[0,0],c=[0,0],l=[0,0],u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=[],v=[],y=e,b=e;if(b.length<3)return t;if(o++,o>a)return console.warn(`quickDecomp: max level (`+a+`) reached.`),t;for(let x=0;x<e.length;++x)if(fa(y,x)){n.push(y[x]),u=d=Number.MAX_VALUE;for(let t=0;t<e.length;++t)oa(L(y,x-1),L(y,x),L(y,t))&&la(L(y,x-1),L(y,x),L(y,t-1))&&(l=ha(L(y,x-1),L(y,x),L(y,t),L(y,t-1)),ca(L(y,x+1),L(y,x),l)&&(f=ua(y[x],l),f<d&&(d=f,c=l,h=t))),oa(L(y,x+1),L(y,x),L(y,t+1))&&la(L(y,x+1),L(y,x),L(y,t))&&(l=ha(L(y,x+1),L(y,x),L(y,t),L(y,t+1)),oa(L(y,x-1),L(y,x),l)&&(f=ua(y[x],l),f<u&&(u=f,s=l,m=t)));if(h===(m+1)%e.length)l[0]=(c[0]+s[0])/2,l[1]=(c[1]+s[1])/2,r.push(l),x<m?(da(_,y,x,m+1),_.push(l),v.push(l),h!==0&&da(v,y,h,y.length),da(v,y,0,x+1)):(x!==0&&da(_,y,x,y.length),da(_,y,0,m+1),_.push(l),v.push(l),da(v,y,h,x+1));else{if(h>m&&(m+=e.length),p=Number.MAX_VALUE,m<h)return t;for(let t=h;t<=m;++t)sa(L(y,x-1),L(y,x),L(y,t))&&la(L(y,x+1),L(y,x),L(y,t))&&(f=ua(L(y,x),L(y,t)),f<p&&pa(y,x,t)&&(p=f,g=t%e.length));x<g?(da(_,y,x,g+1),g!==0&&da(v,y,g,b.length),da(v,y,0,x+1)):(x!==0&&da(_,y,x,b.length),da(_,y,0,g+1),da(v,y,g,x+1))}return _.length<v.length?(ga(_,t,n,r,i,a,o),ga(v,t,n,r,i,a,o)):(ga(v,t,n,r,i,a,o),ga(_,t,n,r,i,a,o)),t}return t.push(e),t}function _a(e,t,n){return n===void 0&&(n=0),n||=0,Math.abs(e-t)<=n}var va;(function(e){e.Ellipse=`Ellipse`,e.Circle=`Circle`,e.Polygon=`Polygon`,e.Box=`Box`,e.Line=`Line`,e.Point=`Point`})(va||={});var R;(function(e){e[e.Ellipse=32]=`Ellipse`,e[e.Circle=16]=`Circle`,e[e.Polygon=8]=`Polygon`,e[e.Box=4]=`Box`,e[e.Line=2]=`Line`,e[e.Point=1]=`Point`})(R||={});var ya=(e,t)=>{for(let n=0,r=e.length;n<r;n++)t(e[n],n)},ba=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(t(e[n],n))return!0;return!1},xa=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(!t(e[n],n))return!1;return!0},Sa=(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=e[r];t(i,r)&&n.push(i)}return n},Ca=(e,t)=>{let n=e.length,r=Array(n);for(let i=0;i<n;i++)r[i]=t(e[i],i);return r};function wa({calcPoints:e,pos:t}){return Ca(e,({x:e,y:n})=>({x:e+t.x,y:n+t.y}))}function Ta(e){return e.isConvex||e.typeGroup!==R.Polygon?[e]:e.convexPolygons}function Ea(e,t){return xa(wa(e),e=>I.pointInCircle(e,t))}function Da(e,t){return ba(Ta(t),t=>I.pointInPolygon(e,t))}function Oa(e,t){return xa(wa(e),e=>Da(e,t))}function ka(e,t){let n=e.pos.x,r=e.pos.y,i=t.pos.x,a=t.pos.y,o=e.r,s=t.r,c=Math.sqrt((n-i)*(n-i)+(r-a)*(r-a));return c+s===o||c+s<o}function Aa(e,t){if(e.r===0||!Da(e.pos,t))return!1;let n=wa(t);return!(ba(n,t=>I.pointInCircle(t,e))||ba(n,(t,r)=>ja({start:r?n[r-1]:n[n.length-1],end:t},e).length>0))}function ja(e,{pos:t,r:n}){let r={x:e.end.x-e.start.x,y:e.end.y-e.start.y},i={x:e.start.x-t.x,y:e.start.y-t.y},a=(r.x*i.x+r.y*i.y)*-2,o=(r.x*r.x+r.y*r.y)*2,s=Math.sqrt(a*a-(i.x*i.x+i.y*i.y-n*n)*o*2);if(isNaN(s))return[];let c=(a-s)/o,l=(a+s)/o,u=[];return c<=1&&c>=0&&u.push({x:e.start.x+r.x*c,y:e.start.y+r.y*c}),l<=1&&l>=0&&u.push({x:e.start.x+r.x*l,y:e.start.y+r.y*l}),u}function Ma(e,t){let n=e.end.x-e.start.x,r=e.end.y-e.start.y,i=n*(t.end.y-t.start.y)-(t.end.x-t.start.x)*r;if(Math.abs(i)<2**-52)return;let a=((t.end.y-t.start.y)*(t.end.x-e.start.x)+(t.start.x-t.end.x)*(t.end.y-e.start.y))/i,o=((e.start.y-e.end.y)*(t.end.x-e.start.x)+n*(t.end.y-e.start.y))/i;if(!(a<0||a>1||o<0||o>1))return{x:e.start.x+a*n,y:e.start.y+a*r}}function Na(e,{calcPoints:t,pos:n}){let r=[];return ya(t,(i,a)=>{let o=a?t[a-1]:t[t.length-1],s=Ma(e,{start:{x:o.x+n.x,y:o.y+n.y},end:{x:i.x+n.x,y:i.y+n.y}});s&&r.push(s)}),r}function Pa(e,t){let n=[],r=e.pos.x,i=e.pos.y,a=e.r,o=t.pos.x,s=t.pos.y,c=t.r,l=o-r,u=s-i,d=Math.sqrt(l*l+u*u);if(d>a+c||d<Math.abs(a-c)||d===0)return n;let f=(a*a-c*c+d*d)/(2*d),p=Math.sqrt(a*a-f*f),m=r+l*f/d,h=i+u*f/d,g={x:m+p*u/d,y:h-p*l/d};n.push(g);let _={x:m-p*u/d,y:h+p*l/d};return n.push(_),n}var Fa={satCircleCircle:I.testCircleCircle,satCirclePolygon:I.testCirclePolygon,satPolygonCircle:I.testPolygonCircle,satPolygonPolygon:I.testPolygonPolygon,inCircleCircle:ka,inCirclePolygon:Aa,inPolygonCircle:Ea,inPolygonPolygon:Oa};function Ia(e,t){let n=[];return ya(Object.values(R).filter(e=>typeof e==`number`),r=>{n[r]=r===R.Circle?Fa[`${t}${e}Circle`]:Fa[`${t}${e}Polygon`]}),n}var La=Ia(va.Circle,`sat`),Ra=Ia(va.Circle,`in`),za=Ia(va.Polygon,`sat`),Ba=Ia(va.Polygon,`in`),Va=1e-9;function Ha(e,t,n=Va){return Math.abs(e-t)<n}function Ua(e,t){return Ha(e.x,t.x)&&Ha(e.y,t.y)}function Wa(e,t=e,n=1){let r=Math.PI*Math.hypot(e,t)*2,i=Math.max(8,Math.ceil(r/Math.max(1,n))),a=[];for(let n=0;n<i;n++){let r=n/i*2*Math.PI,o=Math.cos(r)*e,s=Math.sin(r)*t;a.push(new I.Vector(o,s))}return a}function Ga(e,t){return[new I.Vector(0,0),new I.Vector(e,0),new I.Vector(e,t),new I.Vector(0,t)]}function Ka(e={}){return e instanceof I.Vector?e:new I.Vector(e.x||0,e.y||0)}function qa(e=[]){let t=Ca(e,Ka);return Ya(t)?t.reverse():t}function Ja(e,t){let n=e.x-t.x,r=e.y-t.y;return Math.hypot(n,r)}function Ya(e){let t=e.length,n=0;return ya(e,(r,i)=>{let a=e[(i+1)%t];n+=(a.x-r.x)*(a.y+r.y)}),n>0}function Xa(e,t={}){e.isStatic=!!t.isStatic,e.isTrigger=!!t.isTrigger,e.padding=t.padding||0,e.group=t.group??2147483647,`userData`in t&&(e.userData=t.userData),t.isCentered&&e.typeGroup!==R.Circle&&(e.isCentered=!0),t.angle&&e.setAngle(t.angle)}function Za(e){let{bbox:t,minX:n,minY:r,maxX:i,maxY:a}=e;return t.minX<n||t.minY<r||t.maxX>i||t.maxY>a}function Qa(e,t){return t.minX>e.maxX||t.minY>e.maxY||t.maxX<e.minX||t.maxY<e.minY}function $a({group:e},{group:t}){let n=e>>16,r=t>>16,i=e&65535;return!!(n&t&65535)&&(r&i)!==0}function eo(e,t){return(e.typeGroup===R.Circle?Ra:Ba)[t.typeGroup](e,t)}function to(e){return Ca(e,({x:e,y:t})=>({x:e,y:t}))}function no({x:e,y:t}={x:0,y:0}){return[e,t]}function ro([e,t]=[0,0]){return{x:e,y:t}}function io(e,t){return(e.typeGroup===R.Circle?La:za)[t.typeGroup]}function ao(e,t,n,r,i,a=2,o=4){let s=r-t,c=i-n,l=Math.atan2(c,s),u=Math.cos(l),d=Math.sin(l),f=t,p=n,m=Math.hypot(s,c);for(;m>0;){let t=Math.min(m,a);e.moveTo(f,p),e.lineTo(f+u*t,p+d*t),f+=u*(a+o),p+=d*(a+o),m-=a+o}}function oo(e,{pos:t,calcPoints:n},r=!1){let i=n[n.length-1],a=t.x+i.x,o=t.y+i.y;n.length===1?e.arc(a,o,1,0,Math.PI*2):e.moveTo(a,o),ya(n,(a,o)=>{let s=t.x+a.x,c=t.y+a.y;if(r){let r=n[o-1]||i;ao(e,t.x+r.x,t.y+r.y,s,c)}else e.lineTo(s,c)})}function so(e,t,n=!0){oo(e,{pos:{x:t.minX,y:t.minY},calcPoints:Ga(t.maxX-t.minX,t.maxY-t.minY)},n)}function co(){return!0}function lo(e){return Math.max(0,Math.min(e,2147483647))}function uo(e,t=1,n=!0){if(!t)return;let r=Math.cos(e.angle)*t,i=Math.sin(e.angle)*t;e.setPosition(e.x+r,e.y+i,n)}var fo=class extends I.Circle{constructor(e,t,n){super(Ka(e),t),this.offsetCopy={x:0,y:0},this.dirty=!1,this.isConvex=!0,this.type=va.Circle,this.typeGroup=R.Circle,this.isCentered=!0,Xa(this,n),this.unscaledRadius=t}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scale(){return this.r/this.unscaledRadius}set scale(e){this.setScale(e)}get scaleX(){return this.scale}get scaleY(){return this.scale}get group(){return this._group}set group(e){this._group=lo(e)}move(e=1,t=!0){return uo(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.r=this.unscaledRadius*Math.abs(e),this.markAsDirty(n),this}setAngle(e,t=!0){this.angle=e;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}setOffset(e,t=!0){this.offsetCopy.x=e.x,this.offsetCopy.y=e.y;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}getAABBAsBBox(){let e=this.pos.x+this.offset.x,t=this.pos.y+this.offset.y;return{minX:e-this.r,maxX:e+this.r,minY:t-this.r,maxY:t+this.r}}draw(e){let t=this.pos.x+this.offset.x,n=this.pos.y+this.offset.y,r=Math.abs(this.r);if(this.isTrigger){let r=Math.max(8,this.r);for(let i=0;i<r;i++){let a=i/r*2*Math.PI,o=(i-1)/r*2*Math.PI;ao(e,t+Math.cos(o)*this.r,n+Math.sin(o)*this.r,t+Math.cos(a)*this.r,n+Math.sin(a)*this.r)}}else e.moveTo(t+r,n),e.arc(t,n,r,0,Math.PI*2)}drawBVH(e){so(e,this)}updateBody(e=this.dirty){e&&(this.system?.insert(this),this.dirty=!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}getOffsetWithAngle(){if(!this.offsetCopy.x&&!this.offsetCopy.y||!this.angle)return this.offsetCopy;let e=Math.sin(this.angle),t=Math.cos(this.angle);return{x:this.offsetCopy.x*t-this.offsetCopy.y*e,y:this.offsetCopy.x*e+this.offsetCopy.y*t}}},po=class extends I.Polygon{constructor(e,t,n){if(super(Ka(e),qa(t)),this.dirty=!1,this.type=va.Polygon,this.typeGroup=R.Polygon,this.centered=!1,this.scaleVector={x:1,y:1},!t.length)throw Error(`No points in polygon`);Xa(this,n)}set isCentered(e){if(this.centered===e)return;let t;this.runWithoutRotation(()=>{t=this.getCentroid()});let n=e?-t.x:-this.points[0].x,r=e?-t.y:-this.points[0].y;this.setPoints(Ca(this.points,({x:e,y:t})=>new I.Vector(e+n,t+r))),this.centered=e}get isCentered(){return this.centered}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scaleX(){return this.scaleVector.x}get scaleY(){return this.scaleVector.y}get scale(){return(this.scaleVector.x+this.scaleVector.y)/2}set scale(e){this.setScale(e)}get group(){return this._group}set group(e){this._group=lo(e)}move(e=1,t=!0){return uo(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.scaleVector.x=Math.abs(e),this.scaleVector.y=Math.abs(t),super.setPoints(Ca(this.points,(e,t)=>new I.Vector(this.pointsBackup[t].x*this.scaleVector.x,this.pointsBackup[t].y*this.scaleVector.y))),this.updateConvex(),this.markAsDirty(n),this}setAngle(e,t=!0){return super.setAngle(e),this.markAsDirty(t),this}setOffset(e,t=!0){return super.setOffset(e),this.markAsDirty(t),this}getAABBAsBBox(){let{pos:e,w:t,h:n}=this.getAABBAsBox();return{minX:e.x,minY:e.y,maxX:e.x+t,maxY:e.y+n}}getEdge(e){let{x:t,y:n}=this.calcPoints[e],r=this.calcPoints[(e+1)%this.calcPoints.length];return{start:{x:this.x+t,y:this.y+n},end:{x:this.x+r.x,y:this.y+r.y}}}draw(e){oo(e,this,this.isTrigger)}drawBVH(e){so(e,this)}setPoints(e){return super.setPoints(e),this.updateConvex(),this.pointsBackup=to(e),this}translate(e,t){return super.translate(e,t),this.pointsBackup=to(this.points),this}rotate(e){return super.rotate(e),this.pointsBackup=to(this.points),this}isSimple(){return ma(Ca(this.calcPoints,no))}updateBody(e=this.dirty){e&&(this.updateConvexPolygonPositions(),this.system?.insert(this),this.dirty=!1)}runWithoutRotation(e){let t=this.angle;this.setAngle(0,!1),e(),this.setAngle(t,!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}updateConvexPolygonPositions(){!this.isConvex&&this.convexPolygons&&ya(this.convexPolygons,e=>{e.pos.x=this.pos.x,e.pos.y=this.pos.y,e.angle!==this.angle&&e.setAngle(this.angle)})}getConvex(){return this.typeGroup&&this.typeGroup!==R.Polygon||this.points.length<4?[]:ga(Ca(this.calcPoints,no))}updateConvexPolygons(e=this.getConvex()){this.isConvex||(this.convexPolygons||=[],ya(e,(e,t)=>{this.convexPolygons[t]||(this.convexPolygons[t]=new I.Polygon),this.convexPolygons[t].pos.x=this.pos.x,this.convexPolygons[t].pos.y=this.pos.y,this.convexPolygons[t].angle=this.angle,this.convexPolygons[t].setPoints(qa(Ca(e,ro)))}),this.convexPolygons.length=e.length)}updateConvex(){let e=this.getConvex();this.isConvex=e.length<=1,this.updateConvexPolygons(e)}},mo=class extends po{constructor(e,t,n=t,r=(t+n)/Math.PI,i){super(e,Wa(t,n,r),i),this.type=va.Ellipse,this.typeGroup=R.Ellipse,this.isConvex=!0,this._radiusX=t,this._radiusY=n,this._step=r}set isCentered(e){}get isCentered(){return!0}get step(){return this._step}set step(e){this._step=e,this.setPoints(Wa(this._radiusX,this._radiusY,this._step))}get radiusX(){return this._radiusX}set radiusX(e){this._radiusX=e,this.setPoints(Wa(this._radiusX,this._radiusY,this._step))}get radiusY(){return this._radiusY}set radiusY(e){this._radiusY=e,this.setPoints(Wa(this._radiusX,this._radiusY,this._step))}center(){}updateConvex(){}},ho=class extends po{constructor(e,t,n,r){super(e,Ga(t,n),r),this.type=va.Box,this.typeGroup=R.Box,this.isConvex=!0,this._width=t,this._height=n}get width(){return this._width}set width(e){this._width=e,this.afterUpdateSize()}get height(){return this._height}set height(e){this._height=e,this.afterUpdateSize()}afterUpdateSize(){this.setPoints(Ga(this._width,this._height))}updateConvex(){}},go=class extends ho{constructor(e,t){super(Ka(e),.001,.001,t),this.type=va.Point,this.typeGroup=R.Point}},_o=class extends po{constructor(e,t,n){if(super(e,[{x:0,y:0},{x:t.x-e.x,y:t.y-e.y}],n),this.type=va.Line,this.typeGroup=R.Line,this.isConvex=!0,this.calcPoints.length===1||!t)throw console.error({start:e,end:t}),Error(`No end point for line provided`)}get start(){return{x:this.x+this.calcPoints[0].x,y:this.y+this.calcPoints[0].y}}set start({x:e,y:t}){this.x=e,this.y=t}get end(){return{x:this.x+this.calcPoints[1].x,y:this.y+this.calcPoints[1].y}}set end({x:e,y:t}){this.points[1].x=e-this.start.x,this.points[1].y=t-this.start.y,this.setPoints(this.points)}getCentroid(){return new I.Vector((this.end.x-this.start.x)/2,(this.end.y-this.start.y)/2)}updateConvex(){}},vo=class extends Ui{createPoint(e,t,n){let r=new(n||go)(e,t);return this.insert(r),r}createLine(e,t,n,r){let i=new(r||_o)(e,t,n);return this.insert(i),i}createCircle(e,t,n,r){let i=new(r||fo)(e,t,n);return this.insert(i),i}createBox(e,t,n,r,i){let a=new(i||ho)(e,t,n,r);return this.insert(a),a}createEllipse(e,t,n=t,r,i,a){let o=new(a||mo)(e,t,n,r,i);return this.insert(o),o}createPolygon(e,t,n,r){let i=new(r||po)(e,t,n);return this.insert(i),i}insert(e){if(e.bbox=e.getAABBAsBBox(),e.system){if(!Za(e))return this;e.system.remove(e)}return e.minX=e.bbox.minX-e.padding,e.minY=e.bbox.minY-e.padding,e.maxX=e.bbox.maxX+e.padding,e.maxY=e.bbox.maxY+e.padding,super.insert(e)}updateBody(e){e.updateBody()}update(){ya(this.all(),e=>{this.updateBody(e)})}draw(e){ya(this.all(),t=>{t.draw(e)})}drawBVH(e,t=!0){let n=r=>{so(e,r,t),r.children&&ya(r.children,n)};ya(this.data.children,n)}remove(e,t){return e.system=void 0,super.remove(e,t)}getPotentials(e){return Sa(this.search(e),t=>t!==e)}traverse(e,{children:t}=this.data){return t?.find((n,r)=>{if(!n)return!1;if(n.typeGroup&&e(n,t,r))return!0;n.children&&this.traverse(e,n)})}},yo=class extends vo{constructor(){super(...arguments),this.response=new I.Response}insert(e){let t=super.insert(e);return e.system=this,t}separate(e=co,t=this.response){ya(this.all(),n=>{this.separateBody(n,e,t)})}separateBody(e,t=co,n=this.response){if(e.isStatic&&!e.isTrigger)return;let r={x:0,y:0};this.checkOne(e,n=>{t(n)&&!e.isTrigger&&!n.b.isTrigger&&(r.x+=n.overlapV.x,r.y+=n.overlapV.y)},n),(r.x||r.y)&&e.setPosition(e.x-r.x,e.y-r.y)}checkOne(e,t=co,n=this.response){return e.isStatic&&!e.isTrigger?!1:ba(this.search(e),r=>{if(r!==e&&this.checkCollision(e,r,n))return t(n)})}checkArea(e,t=co,n=this.response){return ba(this.search(e),e=>this.checkOne(e,t,n))}checkAll(e=co,t=this.response){return ba(this.all(),n=>this.checkOne(n,e,t))}checkCollision(e,t,n=this.response){let{bbox:r,padding:i}=e,{bbox:a,padding:o}=t;if(!r||!a||!$a(e,t)||(i||o)&&Qa(r,a))return!1;let s=io(e,t);if(e.isConvex&&t.isConvex)return n.clear(),s(e,t,n);let c=Ta(e),l=Ta(t),u=0,d=0,f=!1;if(ya(c,e=>{ya(l,t=>{n.clear(),s(e,t,n)&&(f=!0,u+=n.overlapV.x,d+=n.overlapV.y)})}),f){let r=new I.Vector(u,d);n.a=e,n.b=t,n.overlapV.x=u,n.overlapV.y=d,n.overlapN=r.normalize(),n.overlap=r.len(),n.aInB=eo(e,t),n.bInA=eo(t,e)}return f}raycast(e,t,n=co){let r=1/0,i;return this.ray?(this.ray.start=e,this.ray.end=t):this.ray=new _o(e,t,{isTrigger:!0}),this.insert(this.ray),this.checkOne(this.ray,({b:t})=>{if(!n(t,this.ray))return!1;ya(t.typeGroup===R.Circle?ja(this.ray,t):Na(this.ray,t),n=>{let a=Ja(e,n);a<r&&(r=a,i={point:n,body:t})})}),this.remove(this.ray),i}getCollisionPoints(e,t){let n=[];if(e.typeGroup===R.Circle&&t.typeGroup===R.Circle&&n.push(...Pa(e,t)),e.typeGroup===R.Circle&&t.typeGroup!==R.Circle)for(let r=0;r<t.calcPoints.length;r++){let i=t.getEdge(r);n.push(...ja(i,e))}if(e.typeGroup!==R.Circle)for(let r=0;r<e.calcPoints.length;r++){let i=e.getEdge(r);if(t.typeGroup===R.Circle)n.push(...ja(i,t));else for(let e=0;e<t.calcPoints.length;e++){let r=Ma(i,t.getEdge(e));r&&n.push(r)}}return n.filter(({x:e,y:t},r)=>r===n.findIndex(n=>Ua(n,{x:e,y:t})))}};new class{constructor(e=0){this.events=[],this.delay=e,this.toc=()=>{this.events.length&&(this.events.forEach(e=>{e()}),this.tic())}}tic(){this.events.length&&setTimeout(this.toc,this.delay)}add(e){this.events.push(e),this.events.length===1&&this.tic()}clear(){for(;this.events.length;)this.events.pop()}};var bo=I.Response;I.Circle,I.Polygon,I.Vector;var xo={extension:{type:N.Environment,name:`browser`,priority:-1},test:()=>!0,load:async()=>{await ve(()=>import(`./browserAll-VMSClpaX.js`),__vite__mapDeps([0,1,2,3,4,5]))}},So={extension:{type:N.Environment,name:`webworker`,priority:0},test:()=>typeof self<`u`&&self.WorkerGlobalScope!==void 0,load:async()=>{await ve(()=>import(`./webworkerAll-B3Hkad6o.js`),__vite__mapDeps([6,3,1,2,4,5]))}},Co;function wo(e){return Co===void 0&&(Co=(()=>{let t={stencil:!0,failIfMajorPerformanceCaveat:e??Gt.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Ft.get().getWebGLRenderingContext())return!1;let e=Ft.get().createCanvas().getContext(`webgl`,t),n=!!e?.getContextAttributes()?.stencil;if(e){let t=e.getExtension(`WEBGL_lose_context`);t&&t.loseContext()}return e=null,n}catch{return!1}})()),Co}var To;async function Eo(e={}){return To===void 0&&(To=await(async()=>{let t=Ft.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(e)).requestDevice(),!0}catch{return!1}})()),To}var Do=[`webgl`,`webgpu`,`canvas`];async function Oo(e){let t=[];e.preference?Array.isArray(e.preference)?t=e.preference.slice():(t.push(e.preference),Do.forEach(n=>{n!==e.preference&&t.push(n)})):t=Do.slice();let n,r={};for(let i=0;i<t.length;i++){let a=t[i];if(a===`webgpu`&&await Eo()){let{WebGPURenderer:t}=await ve(async()=>{let{WebGPURenderer:e}=await import(`./WebGPURenderer-LTLhAvoo.js`);return{WebGPURenderer:e}},__vite__mapDeps([7,8,1,2,9,10,11]));n=t,r={...e,...e.webgpu};break}if(a===`webgl`&&wo(e.failIfMajorPerformanceCaveat??Gt.defaultOptions.failIfMajorPerformanceCaveat)){let{WebGLRenderer:t}=await ve(async()=>{let{WebGLRenderer:e}=await import(`./WebGLRenderer-caqgVvmv.js`);return{WebGLRenderer:e}},__vite__mapDeps([12,13,1,2,9,11]));n=t,r={...e,...e.webgl};break}if(a===`canvas`){let{CanvasRenderer:t}=await ve(async()=>{let{CanvasRenderer:e}=await import(`./CanvasRenderer-CobwcNGA.js`);return{CanvasRenderer:e}},__vite__mapDeps([14,15,1,2,4,9,10]));n=t,r={...e,...e.canvasOptions};break}}if(delete r.webgpu,delete r.webgl,delete r.canvasOptions,!n)throw Error(`No available renderer for the current environment`);let i=new n;return await i.init(r),i}var ko=class{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(e){globalThis.removeEventListener(`resize`,this.queueResize),this._resizeTo=e,e&&(globalThis.addEventListener(`resize`,this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&=(cancelAnimationFrame(this._resizeId),null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let e,t;if(this._resizeTo===globalThis.window)e=globalThis.innerWidth,t=globalThis.innerHeight;else{let{clientWidth:n,clientHeight:r}=this._resizeTo;e=n,t=r}this.renderer.resize(e,t),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener(`resize`,this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}};ko.extension=N.Application;var Ao=class{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(e){this._ticker&&this._ticker.remove(this.render,this),this._ticker=e,e&&e.add(this.render,this,Pt.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?it.shared:new it,e.autoStart&&this.start()}static destroy(){if(this._ticker){let e=this._ticker;this.ticker=null,e.destroy()}}};Ao.extension=N.Application,xt.add(ko),xt.add(Ao);var jo=class e{constructor(...e){this.stage=new pt,e[0]!==void 0&&gt(dt,`Application constructor options are deprecated, please use Application.init() instead.`)}async init(t){t={...t},this.stage||=new pt,this.renderer=await Oo(t),e._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return gt(dt,`Application.view is deprecated, please use Application.canvas instead.`),this.renderer.canvas}get screen(){return this.renderer.screen}get domContainerRoot(){return this.renderer.renderPipes.dom?._domElement}destroy(t=!1,n=!1){let r=e._plugins.slice(0);r.reverse(),r.forEach(e=>{e.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(t),this.renderer=null}};jo._plugins=[];var Mo=jo;xt.handleByList(N.Application,Mo._plugins),xt.add(Kt);var No=class extends ft{constructor(e,t){let{text:n,resolution:r,style:i,anchor:a,width:o,height:s,roundPixels:c,...l}=e;super({...l}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??``,this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Tt({_onUpdate:()=>{this.onViewUpdate()}}),a&&(this.anchor=a),this.roundPixels=c??!1,o!==void 0&&(this.width=o),s!==void 0&&(this.height=s)}get anchor(){return this._anchor}set anchor(e){typeof e==`number`?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||={},this._style?.off(`update`,this.onViewUpdate,this),this._style=e instanceof this._styleClass?e:new this._styleClass(e),this._style.on(`update`,this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||={},e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e==`object`?(t=e.height??e.width,e=e.width):t??=e,e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){let t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x,i=0;return e.x>=r&&e.x<=r+t&&(i=-n*this.anchor.y,e.y>=i&&e.y<=i+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){this._style?.off(`update`,this.onViewUpdate,this),super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e==`boolean`?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}};function Po(e,t){let n=e[0]??{};return(typeof n==`string`||e[1])&&(gt(dt,`use new ${t}({ text: "hi!", style }) instead`),n={text:n,style:e[1]}),n}var Fo=null,Io=null;function Lo(e,t){Fo||(Fo=Ft.get().createCanvas(256,128),Io=Fo.getContext(`2d`,{willReadFrequently:!0}),Io.globalCompositeOperation=`copy`,Io.globalAlpha=1),(Fo.width<e||Fo.height<t)&&(Fo.width=ot(e),Fo.height=ot(t))}function Ro(e,t,n){for(let r=0,i=4*n*t;r<t;++r,i+=4)if(e[i+3]!==0)return!1;return!0}function zo(e,t,n,r,i){let a=4*t;for(let t=r,o=r*a+4*n;t<=i;++t,o+=a)if(e[o+3]!==0)return!1;return!0}function Bo(...e){let t=e[0];t.canvas||(t={canvas:e[0],resolution:e[1]});let{canvas:n}=t,r=Math.min(t.resolution??1,1),i=t.width??n.width,a=t.height??n.height,o=t.output;if(Lo(i,a),!Io)throw TypeError(`Failed to get canvas 2D context`);Io.drawImage(n,0,0,i,a,0,0,i*r,a*r);let s=Io.getImageData(0,0,i,a).data,c=0,l=0,u=i-1,d=a-1;for(;l<a&&Ro(s,i,l);)++l;if(l===a)return st.EMPTY;for(;Ro(s,i,d);)--d;for(;zo(s,i,c,l,d);)++c;for(;zo(s,i,u,l,d);)--u;return++u,++d,Io.globalCompositeOperation=`source-over`,Io.strokeRect(c,l,u-c,d-l),Io.globalCompositeOperation=`copy`,o??=new st,o.set(c/r,l/r,(u-c)/r,(d-l)/r),o}var Vo=new st;function Ho(e){let t=0;for(let n=0;n<e.length;n++)e.charCodeAt(n)===32&&t++;return t}var Uo=new class{getCanvasAndContext(e){let{text:t,style:n,resolution:r=1}=e,i=n._getFinalPadding(),a=ai.measureText(t||` `,n),o=Math.ceil(Math.ceil(Math.max(1,a.width)+i*2)*r),s=Math.ceil(Math.ceil(Math.max(1,a.height)+i*2)*r),c=_t.getOptimalCanvasAndContext(o,s);return this._renderTextToCanvas(n,i,r,c,a),{canvasAndContext:c,frame:n.trim?Bo({canvas:c.canvas,width:o,height:s,resolution:1,output:Vo}):Vo.set(0,0,o,s)}}returnCanvasAndContext(e){_t.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,n,r,i){if(i.runsByLine&&i.runsByLine.length>0){this._renderTaggedTextToCanvas(i,e,t,n,r);return}let{canvas:a,context:o}=r,s=si(e),c=i.lines,l=i.lineHeight,u=i.lineWidths,d=i.maxLineWidth,f=i.fontProperties,p=a.height;if(o.resetTransform(),o.scale(n,n),o.textBaseline=e.textBaseline,e._stroke?.width){let t=e._stroke;o.lineWidth=t.width,o.miterLimit=t.miterLimit,o.lineJoin=t.join,o.lineCap=t.cap}o.font=s;let m,h,g=e.dropShadow?2:1,_=(e._stroke?.width??0)/2,v=(l-f.fontSize)/2;l-f.fontSize<0&&(v=0);for(let a=0;a<g;++a){let s=e.dropShadow&&a===0,g=s?Math.ceil(Math.max(1,p)+t*2):0,y=g*n;if(s)this._setupDropShadow(o,e,n,y);else{let n=e._gradientBounds,r=e._gradientOffset;if(n){let a={width:n.width,height:n.height,lineHeight:n.height,lines:i.lines};this._setFillAndStrokeStyles(o,e,a,t,_,r?.x??0,r?.y??0)}else r?this._setFillAndStrokeStyles(o,e,i,t,_,r.x,r.y):this._setFillAndStrokeStyles(o,e,i,t,_);o.shadowColor=`rgba(0,0,0,0)`}for(let n=0;n<c.length;n++){m=_,h=_+n*l+f.ascent+v,m+=this._getAlignmentOffset(u[n],d,e.align);let i=0;if(e.align===`justify`&&e.wordWrap&&n<c.length-1){let e=Ho(c[n]);e>0&&(i=(d-u[n])/e)}e._stroke?.width&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!0,i),e._fill!==void 0&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!1,i)}}}_renderTaggedTextToCanvas(e,t,n,r,i){let{canvas:a,context:o}=i,{runsByLine:s,lineWidths:c,maxLineWidth:l,lineAscents:u,lineHeights:d,hasDropShadow:f}=e,p=a.height;o.resetTransform(),o.scale(r,r),o.textBaseline=t.textBaseline;let m=f?2:1,h=t._stroke?.width??0;for(let e of s)for(let t of e){let e=t.style._stroke?.width??0;e>h&&(h=e)}let g=h/2,_=[];for(let e=0;e<s.length;e++){let t=s[e],n=[];for(let e of t){let t=si(e.style);o.font=t,n.push({width:ai._measureText(e.text,e.style.letterSpacing,o),font:t})}_.push(n)}for(let e=0;e<m;++e){let a=f&&e===0,m=a?Math.ceil(Math.max(1,p)+n*2):0,h=m*r;a||(o.shadowColor=`rgba(0,0,0,0)`);let v=g;for(let e=0;e<s.length;e++){let f=s[e],p=c[e],y=u[e],b=d[e],x=_[e],S=g;S+=this._getAlignmentOffset(p,l,t.align);let C=0;if(t.align===`justify`&&t.wordWrap&&e<s.length-1){let e=0;for(let t of f)e+=Ho(t.text);e>0&&(C=(l-p)/e)}let ee=v+y,te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._stroke?.width){let e=t.style._stroke;if(o.lineWidth=e.width,o.miterLimit=e.miterLimit,o.lineJoin=e.join,o.lineCap=e.cap,a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Ho(t.text);te+=s+e*C;continue}}else{let r=ai.measureFont(c),i=t.style.lineHeight||r.fontSize;o.strokeStyle=fi(e,o,{width:s,height:i,lineHeight:i,lines:[t.text]},n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!0,C)}let l=Ho(t.text);te+=s+l*C}te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._fill!==void 0){if(a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Ho(t.text);te+=s+e*C;continue}}else{let e=ai.measureFont(c),r=t.style.lineHeight||e.fontSize,i={width:s,height:r,lineHeight:r,lines:[t.text]};o.fillStyle=fi(t.style._fill,o,i,n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!1,C)}let l=Ho(t.text);te+=s+l*C}v+=b}}}_setFillAndStrokeStyles(e,t,n,r,i,a=0,o=0){if(e.fillStyle=t._fill?fi(t._fill,e,n,r*2,a,o):null,t._stroke?.width){let s=i+r*2;e.strokeStyle=fi(t._stroke,e,n,s,a,o)}}_setupDropShadow(e,t,n,r){e.fillStyle=`black`,e.strokeStyle=`black`;let i=t.dropShadow,a=i.color,o=i.alpha;e.shadowColor=vt.shared.setValue(a).setAlpha(o).toRgbaString();let s=i.blur*n,c=i.distance*n;e.shadowBlur=s,e.shadowOffsetX=Math.cos(i.angle)*c,e.shadowOffsetY=Math.sin(i.angle)*c+r}_getAlignmentOffset(e,t,n){return n===`right`?t-e:n===`center`?(t-e)/2:0}_drawLetterSpacing(e,t,n,r,i,a=!1,o=0){let{context:s}=n,c=t.letterSpacing,l=!1;if(ai.experimentalLetterSpacingSupported&&(ai.experimentalLetterSpacing?(s.letterSpacing=`${c}px`,s.textLetterSpacing=`${c}px`,l=!0):(s.letterSpacing=`0px`,s.textLetterSpacing=`0px`)),(c===0||l)&&o===0){a?s.strokeText(e,r,i):s.fillText(e,r,i);return}if(o!==0&&(c===0||l)){let t=e.split(` `),n=r,c=s.measureText(` `).width;for(let e=0;e<t.length;e++)a?s.strokeText(t[e],n,i):s.fillText(t[e],n,i),n+=s.measureText(t[e]).width+c+o;return}let u=r,d=ai.graphemeSegmenter(e),f=s.measureText(e).width,p=0;for(let e=0;e<d.length;++e){let t=d[e];a?s.strokeText(t,u,i):s.fillText(t,u,i);let n=``;for(let t=e+1;t<d.length;++t)n+=d[t];p=s.measureText(n).width,u+=f-p+c,t===` `&&(u+=o),f=p}}},Wo=!1;function Go(e){if(Wo)return;let t=new lt({scaleMode:e.scaleMode});e._resourceId!==t._resourceId&&(Wo=!0,ht(`Text textureStyle: only scaleMode is applied to a text texture, the other fields are ignored`))}function Ko(e,t){let{texture:n,bounds:r}=e,i=t._style._getFinalPadding();yt(r,t._anchor,n);let a=t._anchor._x*i*2,o=t._anchor._y*i*2;r.minX-=i-a,r.minY-=i-o,r.maxX-=i-a,r.maxY-=i-o}var qo=class extends Ut{},Jo=class{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),e.runners.contextChange.add(this),this._managedTexts=new Jt({renderer:e,type:`renderable`,onUnload:this.onTextUnload.bind(this),name:`canvasText`})}resolutionChange(){for(let e in this._managedTexts.items){let t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}contextChange(){for(let e in this._managedTexts.items)this._managedTexts.items[e]?.unload()}validateRenderable(e){let t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n||e._didTextUpdate}addRenderable(e,t){let n=this._getGpuText(e);if(e._didTextUpdate||n.currentKey!==e.styleKey){let t=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e._resolution!==t)&&this._updateGpuText(e),e._didTextUpdate=!1,Ko(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){let t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new qo;return t.currentKey=`--`,t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){let t=e._gpuData[this._renderer.uid];if(!t)return;let{canvasText:n}=this._renderer;n.getReferenceCount(t.currentKey)>0?n.decreaseReferenceCount(t.currentKey):t.texture&&n.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}};Jo.extension={type:[N.WebGLPipes,N.WebGPUPipes,N.CanvasPipes],name:`text`};var Yo=class{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,n,r){typeof e==`string`&&(gt(`8.0.0`,`CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments`),e={text:e,style:n,resolution:t}),e.style instanceof li||(e.style=new li(e.style)),typeof e.text!=`string`&&(e.text=e.text.toString());let{text:i,style:a,textureStyle:o,autoGenerateMipmaps:s}=e,c=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:u}=Uo.getCanvasAndContext({text:i,style:a,resolution:c}),d=It(u.canvas,l.width,l.height,c,s,o?.scaleMode);if(a.trim&&(l.pad(a.padding),d.frame.copyFrom(l),d.frame.scale(1/c),d.updateUvs()),a.filters){let e=this._applyFilters(d,a.filters);return this.returnTexture(d),Uo.returnCanvasAndContext(u),e}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||Uo.returnCanvasAndContext(u),d}returnTexture(e){let t=e.source,n=t.resource;if(this._retainCanvasContext&&n?.getContext){let e=n.getContext(`2d`);e&&Uo.returnCanvasAndContext({canvas:n,context:e})}t.resource=null,t.uploadMethodId=`unknown`,t.alphaMode=`no-premultiply-alpha`,at.returnTexture(e)}renderTextToCanvas(){gt(`8.10.0`,`CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead`)}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;let n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle,autoGenerateMipmaps:e.autoGenerateMipmaps});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){let t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){let n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind({target:n,clear:!1}),r}destroy(){this._renderer=null;for(let e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}},Xo=class extends Yo{constructor(e){super(e,!0)}};Xo.extension={type:[N.CanvasSystem],name:`canvasText`};var Zo=class extends Yo{constructor(e){super(e,!1)}};Zo.extension={type:[N.WebGLSystem,N.WebGPUSystem],name:`canvasText`},xt.add(Xo),xt.add(Zo),xt.add(Jo);var Qo=class extends No{constructor(...e){let t=Po(e,`Text`);super(t,li),this.renderPipeId=`text`,t.textureStyle&&(this.textureStyle=t.textureStyle instanceof lt?t.textureStyle:new lt(t.textureStyle),Go(this.textureStyle)),this.autoGenerateMipmaps=t.autoGenerateMipmaps??ct.defaultOptions.autoGenerateMipmaps}updateBounds(){let e=this._bounds,t=this._anchor,n=0,r=0;if(this._style.trim){let{frame:e,canvasAndContext:t}=Uo.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Uo.returnCanvasAndContext(t),n=e.width,r=e.height}else{let e=ai.measureText(this._text,this._style);n=e.width,r=e.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}},$o=class{execute(e,t){let n=e.renderer,r=n.canvasContext.activeContext,i=t.particleChildren,a=t.texture;r.save(),n.canvasContext.setContextTransform(t.worldTransform,t.roundPixels),n.canvasContext.setBlendMode(t.groupBlendMode);let o=t.groupColorAlpha,s=n.filter?.alphaMultiplier??1,c=(o>>>24&255)/255*s;for(let e=0;e<i.length;e++){let t=i[e],n=t.texture||a;if(!n?.source?.resource)continue;let o=t.color,s=(o>>>24&255)/255*c;if(s<=0)continue;let l=o&16777215,u=((l&255)<<16)+(l&65280)+(l>>16&255),d=n.source.resource;u!==16777215&&(d=Lt.getTintedCanvas({texture:n},u));let f=n.frame,p=n.source.resolution,m=f.x*p,h=f.y*p,g=f.width*p,_=f.height*p;r.globalAlpha=s;let v=-t.anchorX*f.width,y=-t.anchorY*f.height;t.rotation!==0||t.scaleX!==1||t.scaleY!==1?(r.save(),r.translate(t.x,t.y),r.rotate(t.rotation),r.scale(t.scaleX,t.scaleY),r.drawImage(d,m,h,g,_,v,y,f.width,f.height),r.restore()):r.drawImage(d,m,h,g,_,t.x+v,t.y+y,f.width,f.height)}r.restore()}};function es(e,t=null){let n=e*6;if(t||=n>65535?new Uint32Array(n):new Uint16Array(n),t.length!==n)throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${n}`);for(let e=0,r=0;e<n;e+=6,r+=4)t[e+0]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3;return t}function ts(e){return{dynamicUpdate:ns(e,!0),staticUpdate:ns(e,!1)}}function ns(e,t){let n=[];n.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(let i in e){let a=e[i];if(t!==a.dynamic)continue;n.push(`offset = index + ${r}`),n.push(a.code);let o=Ot(a.format);r+=o.stride/4}n.push(`
            index += stride * 4;
        }
    `),n.unshift(`
        var stride = ${r};
    `);let i=n.join(`
`);return Function(`ps`,`f32v`,`u32v`,i)}var rs=class{constructor(e){this._size=0,this._generateParticleUpdateCache={};let t=this._size=e.size??1e3,n=e.properties,r=0,i=0;for(let e in n){let t=n[e],a=Ot(t.format);t.dynamic?i+=a.stride:r+=a.stride}this._dynamicStride=i/4,this._staticStride=r/4,this.staticAttributeBuffer=new Wt(t*4*r),this.dynamicAttributeBuffer=new Wt(t*4*i),this.indexBuffer=es(t);let a=new Mt,o=0,s=0;this._staticBuffer=new wt({data:new Float32Array(1),label:`static-particle-buffer`,shrinkToFit:!1,usage:kt.VERTEX|kt.COPY_DST}),this._dynamicBuffer=new wt({data:new Float32Array(1),label:`dynamic-particle-buffer`,shrinkToFit:!1,usage:kt.VERTEX|kt.COPY_DST});for(let e in n){let t=n[e],r=Ot(t.format);t.dynamic?(a.addAttribute(t.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:t.format}),o+=r.size):(a.addAttribute(t.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:s*4,format:t.format}),s+=r.size)}a.addIndex(this.indexBuffer);let c=this.getParticleUpdate(n);this._dynamicUpload=c.dynamicUpdate,this._staticUpload=c.staticUpdate,this.geometry=a}getParticleUpdate(e){let t=is(e);return this._generateParticleUpdateCache[t]||(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e)),this._generateParticleUpdateCache[t]}generateParticleUpdate(e){return ts(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new Wt(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new Wt(this._size*this._dynamicStride*4*4),this.indexBuffer=es(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));let n=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,n.float32View,n.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){let t=this.staticAttributeBuffer;this._staticUpload(e,t.float32View,t.uint32View),this._staticBuffer.setDataWithSize(t.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}};function is(e){let t=[];for(let n in e){let r=e[n];t.push(n,r.code,r.dynamic?`d`:`s`)}return t.join(`_`)}var as=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,os=`attribute vec2 aVertex;
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
`,ss=`
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
}`,cs=class extends jt{constructor(){let e=Ct.from({vertex:os,fragment:as}),t=St.from({fragment:{source:ss,entryPoint:`mainFragment`},vertex:{source:ss,entryPoint:`mainVertex`}});super({glProgram:e,gpuProgram:t,resources:{uTexture:ut.WHITE.source,uSampler:new lt({}),uniforms:{uTranslationMatrix:{value:new At,type:`mat3x3<f32>`},uColor:{value:new vt(16777215),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}}})}},ls=class{constructor(e,t){this.state=Et.for2d(),this.localUniforms=new bt({uTranslationMatrix:{value:new At,type:`mat3x3<f32>`},uColor:{value:new Float32Array(4),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}),this.renderer=e,this.adaptor=t,this.defaultShader=new cs,this.state=Et.for2d(),this._managedContainers=new Jt({renderer:e,type:`renderable`,name:`particleContainer`})}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new rs({size:e.particleChildren.length,properties:e._properties}),this._managedContainers.add(e),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){let t=e.particleChildren;if(t.length===0)return;let n=this.renderer,r=this.getBuffers(e);e.texture||=t[0].texture;let i=this.state;r.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=Yt(e.groupBlendMode,e.texture._source);let a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o);let s=n.globalUniforms.globalUniformData;o.tx-=s.offset.x,o.ty-=s.offset.y,o.prepend(s.projectionMatrix),a.uResolution=s.resolution,a.uRound=n._roundPixels|e._roundPixels;let c=e.groupColorAlpha,l=s.worldColor,u=(c>>>24)*(l>>>24)/255|0,d=rt(c&16777215,l&16777215);qt((u<<24|d)>>>0,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this._managedContainers.destroy(),this.renderer=null,this.defaultShader&&=(this.defaultShader.destroy(),null)}};ls.extension={type:[N.CanvasPipes],name:`particle`};var us=class extends ls{constructor(e){super(e,new $o)}};us.extension={type:[N.CanvasPipes],name:`particle`};var ds=class{execute(e,t){let n=e.state,r=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;let a=r.gl,o=e.getBuffers(t);r.shader.bind(i),r.state.set(n),r.geometry.bind(o.geometry,i.glProgram);let s=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,s,0)}},fs=class extends ls{constructor(e){super(e,new ds)}};fs.extension={type:[N.WebGLPipes],name:`particle`};var ps=class{execute(e,t){let n=e.renderer,r=t.shader||e.defaultShader;r.groups[0]=n.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),r.groups[1]=n.texture.getTextureBindGroup(t.texture);let i=e.state,a=e.getBuffers(t);n.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}},ms=class extends ls{constructor(e){super(e,new ps)}};ms.extension={type:[N.WebGPUPipes],name:`particle`};var hs={vertex:{attributeName:`aVertex`,format:`float32x2`,code:`
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
        `,dynamic:!1}};xt.add(fs),xt.add(ms),xt.add(us);var gs=new mt(0,0,0,0),_s=class e extends ft{constructor(t={}){t={...e.defaultOptions,...t,dynamicProperties:{...e.defaultOptions.dynamicProperties,...t?.dynamicProperties}};let{dynamicProperties:n,shader:r,roundPixels:i,texture:a,particles:o,...s}=t;super({label:`ParticleContainer`,...s}),this.renderPipeId=`particle`,this.batched=!1,this._childrenDirty=!1,this.texture=a||null,this.shader=r,this._properties={};for(let e in hs){let t=hs[e],r=n[e];this._properties[e]={...t,dynamic:r}}this.allowChildren=!0,this.roundPixels=i??!1,this.particleChildren=o??[]}addParticle(...e){for(let t=0;t<e.length;t++)this.particleChildren.push(e[t]);return this.onViewUpdate(),e[0]}removeParticle(...e){let t=!1;for(let n=0;n<e.length;n++){let r=this.particleChildren.indexOf(e[n]);r>-1&&(this.particleChildren.splice(r,1),t=!0)}return t&&this.onViewUpdate(),e[0]}update(){this._childrenDirty=!0}onViewUpdate(){this._childrenDirty=!0,super.onViewUpdate()}get bounds(){return gs}updateBounds(){}destroy(e=!1){if(super.destroy(e),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource,n=this.texture??this.particleChildren[0]?.texture;n&&n.destroy(t)}this.texture=null,this.shader?.destroy()}removeParticles(e,t){e??=0,t??=this.particleChildren.length;let n=this.particleChildren.splice(e,t-e);return this.onViewUpdate(),n}removeParticleAt(e){let t=this.particleChildren.splice(e,1);return this.onViewUpdate(),t[0]}addParticleAt(e,t){return this.particleChildren.splice(t,0,e),this.onViewUpdate(),e}addChild(...e){throw Error(`ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()`)}removeChild(...e){throw Error(`ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()`)}removeChildren(e,t){throw Error(`ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()`)}removeChildAt(e){throw Error(`ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()`)}getChildAt(e){throw Error(`ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()`)}setChildIndex(e,t){throw Error(`ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()`)}getChildIndex(e){throw Error(`ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()`)}addChildAt(e,t){throw Error(`ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()`)}swapChildren(e,t){throw Error(`ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()`)}reparentChild(...e){throw Error(`ParticleContainer.reparentChild() is not available with the particle container`)}reparentChildAt(e,t){throw Error(`ParticleContainer.reparentChildAt() is not available with the particle container`)}};_s.defaultOptions={dynamicProperties:{vertex:!1,position:!0,rotation:!1,uvs:!1,color:!1},roundPixels:!1};var vs=_s;xt.add(xo,So),t({x:-1,y:-1});var ys=class extends m()(`antha-entity-event`){constructor(e){super({detail:e})}},bs=class extends ys{},xs=t({x:-1,y:-1});function Ss(t){if(!t)return;let n={};return e(t).forEach(([t,r])=>{e(r).forEach(([e,r])=>{if(!r)return;let i=Se(n,A.isString(r)?r:e,()=>({})),a=Se(i,t,()=>[]);a.includes(e)||a.push(e)})}),n}var Cs=class{static entityKey=`BaseEntity`;static collidesWith;static collidesWithSet=new Set;static paramsShape;static assets;static paramsMap;static reverseParamsMap;static deserialize(e){let t=e?JSON.parse(e):void 0;return this.paramsShape?s(t,this.paramsShape):we.isUndefined(t),t}dispatch(e){this.entityStore?.listenTarget.dispatch(e)}isDestroyed=!1;entityDefinition;abortController=new AbortController;abortSignal=this.abortController.signal;hitbox;entityStore;params;pixi;hitboxSystem;getAsset;constructor(e){this.entityDefinition=this.constructor,this.entityStore=e.entityStore,this.params=e.params,this.pixi=e.pixi,this.hitboxSystem=e.hitboxSystem,this.state=e.state;let t=this.constructor.assets;this.getAsset=ws({assetLoader:e.entityStore.assetLoader,entityAssets:t})}render(e){}initInstance(){}state;async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot add entity through destroyed entity.`);return await this.entityStore.addEntity(e,...t)}destroy(){this.abortController.abort(),h(this).isDestroyed=!0}immediatelyDestroy(){this.abortController.abort(),h(this).isDestroyed=!0,this.entityStore?.removeEntity(this),this.dispatch(new bs({entityInstance:this})),delete this.entityStore,delete this.hitboxSystem,delete this.params}collide(e,t){}serialize(){return this.params?JSON.stringify(this.params):void 0}};function ws({assetLoader:e,entityAssets:t}){return!t||A.isEmpty(t)?{}:pe(t,(t,n)=>async()=>e.loadIndividualAsset({asset:n}))}var Ts=class extends Cs{view;async initInstance(){let{view:e,hitbox:t}=await this.createView();e?(this.view=e,this.pixi.stage.addChild(this.view)):(this.view=new vs,this.view.visible=!1),t&&(this.hitbox=t,this.hitbox.userData=this,this.hitboxSystem.insert(this.hitbox)),this.wrapParamsInProxy()}constructor(e){super(e)}wrapParamsInProxy(){let t=this.constructor.paramsMap,n=this.constructor.reverseParamsMap,r=this.params;r&&t&&n&&(h(this).params=new Proxy(r,{set:(e,t,i,a)=>{if(t in r&&A.hasKey(n,t)){let e=n[t];this.hitbox&&e?.hitbox&&e.hitbox.forEach(e=>{this.hitbox[e]=i}),e?.view&&e.view.forEach(e=>{this.view[e]=i})}return Reflect.set(e,t,i,a)}}),e(this.params).forEach(([e,t])=>{this.params[e]=t}))}isInBounds(e={}){if(this.isDestroyed)throw Error(`Cannot check bounds on destroyed entity.`);return e.entirely?this.pixi.screen.containsRect(this.view.getBounds().rectangle):this.pixi.screen.intersects(this.view.getBounds().rectangle)}immediatelyDestroy(){this.view?.destroy({children:!0}),this.hitbox&&this.hitboxSystem.remove(this.hitbox),super.immediatelyDestroy(),delete this.view}};function Es(e){return e.userData instanceof Cs?e.userData:void 0}function Ds(e){return!!e.entityDefinition.collidesWith?.collidesWithSelf||e.entityDefinition.collidesWithSet.size>0}function Os({entity:e,otherEntity:t}){return e.entityDefinition.collidesWith?.collidesWithSelf&&e.entityDefinition===t.entityDefinition||e.entityDefinition.collidesWithSet.has(t.entityDefinition)}function ks({firstEntity:e,secondEntity:t}){return Os({entity:e,otherEntity:t})||Os({entity:t,otherEntity:e})}function As({entity:e,otherEntity:t}){return Os({entity:e,otherEntity:t})}function js(e){let t=new bo;return t.a=e.b,t.aInB=e.bInA,t.b=e.a,t.bInA=e.aInB,t.overlap=e.overlap,t.overlapN.x=-e.overlapN.x,t.overlapN.y=-e.overlapN.y,t.overlapV.x=-e.overlapV.x,t.overlapV.y=-e.overlapV.y,t}function Ms({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){return e.get(t)?.has(n)||e.get(n)?.has(t)}function Ns({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){let r=e.get(t);r?r.add(n):e.set(t,new WeakSet([n]))}var Ps=class extends yo{checkedHitboxPairs;checkAll(...[e,t]){let n=this.checkedHitboxPairs;this.checkedHitboxPairs=new WeakMap;try{return this.all().some(n=>{let r=Es(n);return(!r||Ds(r))&&this.checkOne(n,e,t)})}finally{this.checkedHitboxPairs=n}}checkOne(...[e,t,n]){let r=Es(e);return r&&!Ds(r)?!1:super.checkOne(e,t,n)}checkCollision(...e){let[t,n]=e,r=this.checkedHitboxPairs;if(r&&Ms({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n}))return!1;r&&Ns({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n});let i=Es(t),a=Es(n);return i&&a&&!ks({firstEntity:i,secondEntity:a})?!1:super.checkCollision(...e)}},Fs=t({entityKey:``,serializedParams:Tn(``,{alsoUndefined:!0})}),Is=class{currentEntityInstances=new Set;isDestroyed=!1;entityInstanceMap=new dn;pixi;hitboxSystem;entityKeyConstructorMap={};listenTarget=new fe;state;assetLoader;constructor(e){this.pixi=e.pixi,this.assetLoader=e.assetLoader,this.hitboxSystem=e.customHitboxSystem||new Ps,this.state=e.state,e.preregisteredEntities&&this.registerEntities({entities:e.preregisteredEntities,clearPreviousRegistrations:!0})}registerEntities({clearPreviousRegistrations:e,entities:t}){e&&(this.entityKeyConstructorMap={}),t.forEach(e=>{this.entityKeyConstructorMap[e.entityKey]=e})}async updateAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed){t.immediatelyDestroy();return}await t.update(e),t.isDestroyed&&t.immediatelyDestroy()}this.hitboxSystem.update();let t=[];this.hitboxSystem.checkAll(e=>{let n=e.a.userData instanceof Cs?e.a.userData:void 0,r=e.b.userData instanceof Cs?e.b.userData:void 0;if(!n||!r||n.isDestroyed||r.isDestroyed)return;function i(e){e instanceof Promise&&t.push(e)}As({entity:n,otherEntity:r})&&i(n.collide(r,e)),As({entity:r,otherEntity:n})&&i(r.collide(n,js(e)))}),await Promise.all(t)}async renderAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed)return;await t.render(e)}}getEntities(e){return this.entityInstanceMap.getInstances(e)}removeEntity(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.delete(e),this.entityInstanceMap.remove(e),e instanceof Ts&&!e.isDestroyed&&(this.pixi.stage.removeChild(e.view),e.hitbox&&this.hitboxSystem.remove(e.hitbox))}async deserializeEntity(e,t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);let n=this.entityKeyConstructorMap[e];if(!n)throw Error(`No entity registered for key '${e}'`);return await this.addEntity(n,n.deserialize(t))}createSnapshot(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);return[...this.currentEntityInstances].filter(e=>!e.isDestroyed).map(e=>({entityKey:e.entityDefinition.entityKey,serializedParams:e.serialize()}))}hashEntities(){return Fi(this.createSnapshot())}async loadSnapshot(e){return we.isArray(e,`Entity snapshot must be an array.`),e.forEach((e,t)=>{s(e,Fs,{},`Invalid entity snapshot entry at index ${t}`)}),this.destroyAllEntities(),await ae(e,async e=>await this.deserializeEntity(e.entityKey,e.serializedParams))}async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);e.entityKey in this.entityKeyConstructorMap||(this.entityKeyConstructorMap[e.entityKey]=e);let n=new e({entityStore:this,pixi:this.pixi,state:this.state,params:t[0],hitboxSystem:this.hitboxSystem});return await n.initInstance(),this.currentEntityInstances.add(n),this.entityInstanceMap.add(n),n}destroyAllEntities(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.forEach(e=>e.immediatelyDestroy())}destroy(){if(this.isDestroyed)throw Error(`Entity store is already destroyed.`);this.currentEntityInstances.forEach(e=>e.destroy()),h(this).isDestroyed=!0,this.listenTarget.destroy(),this.currentEntityInstances.clear(),this.entityInstanceMap.destroy(),delete this.pixi,delete this.hitboxSystem,delete this.listenTarget}};function Ls({state:e,options:t}){return!e.pixi?.pixiApplication||!e.assetLoader?!1:(e.entityStore||=new Is(p({pixi:e.pixi.pixiApplication,state:e,assetLoader:e.assetLoader},t)),!0)}function Rs(t={}){let n=new Set;function r(t){return n=>(n.assets&&e(n.assets).forEach(([e,t])=>{t.assetName=[n.key,e].join(`:`)}),i(t,n))}function i(e,{collidesWith:t,key:r,paramsShape:i,paramsMap:a,assets:o}){if(n.has(r))throw Error(`Entity key '${r}' has already been attached to an entity class.`);n.add(r);let s={[r]:class extends e{static collidesWith=t;static collidesWithSet=new Set(t?.collidesWithOtherEntities);static entityKey=r;static paramsShape=i;static assets=o||{};static paramsMap=a;static reverseParamsMap=Ss(a)}};return O.isDefined(s[r])}return{updateEntitiesMod:Ye({modName:`antha-entity-2d-update`,initState:{showHitboxDebug:!!t.debug,disableEntityRender:!!t.disableEntityRender,disableEntityUpdate:!!t.disableEntityUpdate},cleanup({state:e}){e.entityStore?.destroy()},trigger:t.updateTrigger,async execute(e){if(Ls({options:t,state:e.state}))e.state.entityStore&&(e.state.disableEntityUpdate||await e.state.entityStore.updateAllEntities(e),e.state.disableEntityRender||await e.state.entityStore.renderAllEntities(e));else return He;return e.state.showHitboxDebug?D`
                      <canvas class="hitbox-debug-canvas"></canvas>
                  `:void 0}}),defineEntity:r(Ts),defineLogicEntity:r(Cs),entityKeys:n}}function zs({assetName:e=`Audio files`,audioPlayer:t,files:n,serial:r}){return qe({assetName:e,maxProgress:n.length,async load({incrementProgressCallback:e}){return await t.loadFiles(n,{progressCallback(){e()},serial:!!r}),{value:void 0}}})}async function Bs({assetLoader:e,assets:t,audio:n,entities:r},i){return await e.bulkLoadAssets([...n?[zs(n)]:[],...t||[],...(r||[]).flatMap(e=>Ne(e.assets))],i)}function Vs(e){return Ye({modName:`antha-fps`,trigger:{durationMs:e?.fpsUpdateIntervalMs||500,executeImmediately:!0},initState:{debugFps:!!e?.debugFps,hideFps:!!e?.hideFps},execute({state:e,msSinceLastExecute:t,ticksSinceLastExecute:n}){let r=Se(e,`fpsStutters`,()=>[]),i=t/1e3,a=i>0?sn(n/i,{digits:1}):0;e.debugFps&&a>0&&a<55&&(r.push(a),r.length>10&&r.splice(0,r.length-10));let o=[!e.hideFps&&D`
                        <div
                            title="Ticks Per Second"
                            style=${j`
                                ${lr(Te.asTheme.colors[`vira-pink-foreground-body`])}
                                padding: 1px 3px;
                            `}
                        >
                            ${Math.round(a).toFixed(0)} FPS
                        </div>
                    `,e.debugFps&&r.length>0&&D`
                        <div
                            title="FPS Stutters"
                            style=${j`
                                ${lr(Te.asTheme.colors[`vira-yellow-foreground-body`])}
                                padding: 1px 3px;
                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            ${r.map(e=>D`
                                    <span>${Math.round(e)}</span>
                                `)}
                        </div>
                    `].filter(A.isTruthy);if(o.length)return D`
                    <div
                        style=${j`
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
                `}})}var Hs={background:`black`,antialias:!0,powerPreference:`high-performance`};function Us(e){let t={...Hs,canvas:void 0,...e?.pixiOptions};return Ye({modName:`antha-graphics-2d`,cleanup({state:e}){e.pixi?.resizeObserver?.disconnect(),e.pixi?.pixiApplication?.destroy(!0)},async execute({hostElement:n,state:r}){let i=Se(r,`pixi`,()=>({})),a=t.canvas||i.canvas;if(!i.pixiApplication&&a){let e=new Mo;await e.init({resizeTo:n,...t,canvas:a}),i.pixiApplication=e,i.resizeObserver=We(n,()=>{e.queueResize()}).resizeObserver}return t.canvas?void 0:D`
                      <div
                          style=${j`
                              box-sizing: border-box;
                              z-index: -1;
                              position: absolute;
                              inset: 0;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              overflow: hidden;
                              container-type: size;
                              ${l(e?.extraCanvasWrapperStyles)}
                          `}
                      >
                          <canvas
                              style=${j`
                                  box-sizing: border-box;

                                  width: 100%;
                                  height: 100%;
                                  ${l(e?.extraCanvasStyles)}
                              `}
                              id="antha-graphics-2d"
                              ${cr(e=>{we.instanceOf(e,HTMLCanvasElement),i.canvas||=e})}
                          ></canvas>
                      </div>
                  `}})}function Ws({canvasBounds:e,clientPoint:t,virtualViewport:n}){if(e.width&&e.height)return{x:(t.x-e.left)/e.width*n.width,y:(t.y-e.top)/e.height*n.height}}function Gs(){return{autoDensity:!0,resolution:globalThis.devicePixelRatio||1}}function Ks({previousVirtualViewport:e,virtualViewport:t}){return e!=null&&Math.abs(e.height-t.height)<.01&&Math.abs(e.scale-t.scale)<1e-4&&e.width===t.width}function qs({isFixedViewport:e,screenSize:t,virtualViewport:n}){let r=Math.round((t.width-n.width*n.scale)/2),i=Math.round((t.height-n.height*n.scale)/2);return{height:e?`${n.height}px`:`100%`,transform:e?`translate(${r/n.scale}px, ${i/n.scale}px)`:``,width:e?`${n.width}px`:`100%`,zoom:String(n.scale)}}function Js(e){return[e.style.height,e.style.transform,e.style.width,e.style.zoom].join(`;`)}var Ys=new WeakMap;function Xs({hostElement:e,isFixedViewport:t}){if(!t)return e.getBoundingClientRect();let n=e.getRootNode();return(n instanceof ShadowRoot?n.host:e.parentElement||e).getBoundingClientRect()}function Zs({hostElement:e}){e.style.removeProperty(`height`),e.style.removeProperty(`transform`),e.style.removeProperty(`width`),e.style.removeProperty(`zoom`),Ys.delete(e)}function Qs({virtualHeight:e,virtualWidth:t}){let n=!!e&&!!t;return Ye({modName:`antha-virtual-viewport`,cleanup({hostElement:e,state:t}){Zs({hostElement:e}),t.virtualViewport=void 0},execute({hostElement:r,state:i}){let a=Xs({hostElement:r,isFixedViewport:n}),o=Re({screenSize:a,virtualHeight:e,virtualWidth:t});if(!o)return;let s=qs({isFixedViewport:n,screenSize:a,virtualViewport:o}),c=!Ks({previousVirtualViewport:i.virtualViewport,virtualViewport:o})||Ys.get(r)?.createdStyles!==JSON.stringify(s)||Ys.get(r)?.readStyles!==Js(r);c&&(Object.assign(r.style,s),Ys.set(r,{createdStyles:JSON.stringify(s),readStyles:Js(r)}),i.virtualViewport=o);let l=i.pixi?.pixiApplication;l&&(c||l.renderer.resolution!==(globalThis.devicePixelRatio||1)*o.scale||l.stage.scale.x!==1||l.stage.scale.y!==1)&&(l.renderer.resolution=(globalThis.devicePixelRatio||1)*o.scale,l.resize(),l.stage.scale.set(1))}})}var $s=function(e){return e.Music=`music`,e.Effects=`effects`,e}({}),ec=function(e){return e.GameMusic=`game-music`,e}({});function tc({audioChannel:e,fileName:t,volume:n}){return{audioChannel:e,sources:Ar(document.baseURI,`./audio/${t}`).href,volume:n}}var nc={"game-music":tc({audioChannel:`music`,fileName:`game-music.ogg`,volume:.9})},rc=Ne(nc),ic={small:{radius:16,mashHp:120,value:.6},medium:{radius:22,mashHp:200,value:1},large:{radius:30,mashHp:340,value:1.8},king:{radius:46,mashHp:1200,value:6}},ac={stripeSpacingPx:40},oc={tuftCount:260,flowerCount:36},sc={starting:100,max:100},cc={perfect:{score:100,satisfaction:2},incomplete:{score:0,satisfaction:-5},raw:{score:0,satisfaction:-15}},lc={breakMs:1e4,waves:[{potatoCount:8,chuteShare:0,seagullCount:0,clumpChance:0,clumpMaxExtra:0,extraSpawnsPerSecond:0,bossCount:0,spawnIntervalMs:3500,speedPxPerMs:.07,sizeWeights:{small:.5,medium:.5,large:0}},{potatoCount:10,chuteShare:0,seagullCount:1,clumpChance:.1,clumpMaxExtra:1,extraSpawnsPerSecond:.02,bossCount:0,spawnIntervalMs:2800,speedPxPerMs:.08,sizeWeights:{small:.3,medium:.6,large:.1}},{potatoCount:14,chuteShare:.15,seagullCount:2,clumpChance:.15,clumpMaxExtra:2,extraSpawnsPerSecond:.04,bossCount:0,spawnIntervalMs:2200,speedPxPerMs:.09,sizeWeights:{small:.2,medium:.6,large:.2}},{potatoCount:18,chuteShare:.2,seagullCount:3,clumpChance:.2,clumpMaxExtra:2,extraSpawnsPerSecond:.06,bossCount:0,spawnIntervalMs:1700,speedPxPerMs:.1,sizeWeights:{small:.1,medium:.5,large:.4}},{potatoCount:24,chuteShare:.25,seagullCount:4,clumpChance:.25,clumpMaxExtra:3,extraSpawnsPerSecond:.08,bossCount:1,spawnIntervalMs:1300,speedPxPerMs:.11,sizeWeights:{small:0,medium:.5,large:.5}}]},uc={dropMs:1500,startScale:2},dc={hp:60,flySpeedPxPerMs:.16,walkSpeedPxPerMs:.09,grabRadiusPx:24,stolenSatisfaction:-10,bountyCoins:10,flyChance:.5},fc={radius:30},pc={scale:1,attackMs:{knife:250,boiler:800,masher:600,microwave:300,"cricket-trap":400,swiper:500}},mc={flightMs:180,cricketFlightMs:400,maxLive:40,arcFraction:.25,arcMinPx:18,arcMaxPx:60,cricketArcPx:30,spinTurns:2,puffMs:160,scale:.85,hammerLevel:3},hc={knife:{damage:4,rangePx:220,cooldownMs:250},boiler:{damage:6,rangePx:140,cooldownMs:1200},masher:{damage:40,rangePx:140,cooldownMs:1e3},microwave:{damage:50,rangePx:120,cooldownMs:700},"cricket-trap":{damage:0,rangePx:170,cooldownMs:6e3},swiper:{damage:0,rangePx:110,cooldownMs:0}},gc={cutMultiplier:1.5,softMasherMultiplier:2},_c={hitNumberMs:600,hitNumberRisePx:30,continuousHitIntervalMs:300,iconSizePx:12,tiers:[{minMultiplier:3,color:`#ff4a1c`,fontSize:36,suffix:` ×3 SMASH!`,pop:!0},{minMultiplier:2,color:`#ff9a1c`,fontSize:28,suffix:` ×2`,pop:!1},{minMultiplier:1.5,color:`#ffe135`,fontSize:24,suffix:` ×1.5`,pop:!1},{minMultiplier:0,color:`#ffffff`,fontSize:20,suffix:``,pop:!1}]},vc={servingPopupMs:1200,coinPopupMs:1600,coinPopupRisePx:50,coinPopupStaggerPx:64,coinPopupStaggerSlots:3,coinPopupOffsetPx:40},yc={clickSlopPx:14},bc={volume:.35},xc={startingCoins:150,coinEventsKept:8,towerCost:{knife:40,boiler:60,masher:80,microwave:50,"cricket-trap":60,swiper:70},servingCoins:{perfect:20,incomplete:5,raw:0}},Sc={byWave:[{maxOpen:1,intervalMs:12e3,lifetimeMs:35e3,dishes:[`buttered-mash`,`bangers-and-mash`]},{maxOpen:2,intervalMs:1e4,lifetimeMs:32e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`]},{maxOpen:2,intervalMs:9e3,lifetimeMs:3e4,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:8e3,lifetimeMs:28e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:7e3,lifetimeMs:25e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]}],firstOrderDelayMs:3e3,travelTimeMultiplier:1.6,fulfilled:{score:150,coins:30,satisfaction:5},expiredSatisfaction:-12},Cc={speeds:[1,1.5,2,3],untilIncomeSpeed:2},wc=`colcannon-fodder-volume`,Tc={music:.6,effects:.8};function Ec(e,t){return typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t}function Dc(){try{let e=globalThis.localStorage.getItem(wc);if(e==null)return{...Tc};let t=JSON.parse(e);return{music:Ec(t?.music,Tc.music),effects:Ec(t?.effects,Tc.effects)}}catch{return{...Tc}}}var Oc;function kc(){return Oc??=Dc(),Oc}function Ac(e,t){Oc={...kc(),[e]:Ec(t,Tc[e])};try{globalThis.localStorage.setItem(wc,JSON.stringify(Oc))}catch{}}var jc=function(e){return e.Chop=`chop`,e.Boil=`boil`,e.Squish=`squish`,e.ServePerfect=`serve-perfect`,e.ServeBad=`serve-bad`,e.ServeRaw=`serve-raw`,e.Build=`build`,e.Squawk=`squawk`,e.BossArrives=`boss-arrives`,e}({}),Mc=.001,Nc,Pc,Fc=!1;function Ic(){if(typeof AudioContext<`u`)return(!Nc||!Pc)&&(Nc=new AudioContext,Pc=Nc.createGain(),Pc.gain.value=bc.volume,Pc.connect(Nc.destination)),Pc.gain.value=Fc?0:kc().effects*bc.volume,Nc.state===`suspended`&&Nc.resume().catch(()=>{}),{context:Nc,master:Pc}}function Lc(){return Fc}function Rc(e){Fc=e}function zc(e,t){let{context:n,master:r}=e,i=n.currentTime+t.startSec,a=i+t.durationSec,o=n.createOscillator(),s=n.createGain();if(o.type=t.type,o.frequency.setValueAtTime(t.startHz,i),t.endHz!=null&&o.frequency.exponentialRampToValueAtTime(t.endHz,a),s.gain.setValueAtTime(t.startGain,i),s.gain.exponentialRampToValueAtTime(Mc,a),o.connect(s),t.lowpassHz==null)s.connect(r);else{let e=n.createBiquadFilter();e.type=`lowpass`,e.frequency.value=t.lowpassHz,s.connect(e),e.connect(r)}o.start(i),o.stop(a)}function Bc(e){let{context:t,master:n}=e,r=.04,i=Math.ceil(t.sampleRate*r),a=t.createBuffer(1,i,t.sampleRate),o=a.getChannelData(0),s=crypto.getRandomValues(new Uint16Array(i));for(let e=0;e<i;e++)o[e]=(s[e]??0)/32768-1;let c=t.createBufferSource();c.buffer=a;let l=t.createBiquadFilter();l.type=`bandpass`,l.frequency.value=3e3;let u=t.createGain(),d=t.currentTime;u.gain.setValueAtTime(1,d),u.gain.exponentialRampToValueAtTime(Mc,d+r),c.connect(l),l.connect(u),u.connect(n),c.start(d),c.stop(d+r)}var Vc={boil:[{type:`sine`,startHz:300,endHz:700,startSec:0,durationSec:.12,startGain:.6}],squish:[{type:`sawtooth`,startHz:180,endHz:70,startSec:0,durationSec:.16,startGain:.8,lowpassHz:900}],"serve-perfect":[{type:`sine`,startHz:660,startSec:0,durationSec:.09,startGain:.7},{type:`sine`,startHz:880,startSec:.09,durationSec:.09,startGain:.7}],"serve-bad":[{type:`square`,startHz:220,startSec:0,durationSec:.15,startGain:.4}],"serve-raw":[{type:`sawtooth`,startHz:140,endHz:90,startSec:0,durationSec:.25,startGain:.6}],squawk:[{type:`square`,startHz:900,endHz:600,startSec:0,durationSec:.12,startGain:.4}],"boss-arrives":[{type:`sawtooth`,startHz:110,startSec:0,durationSec:.25,startGain:.6},{type:`sawtooth`,startHz:82,startSec:.25,durationSec:.25,startGain:.6}],build:[{type:`triangle`,startHz:520,startSec:0,durationSec:.08,startGain:.6}]};function Hc(e){if(Fc)return;let t=Ic();if(t){if(e===`chop`){Bc(t);return}Vc[e].forEach(e=>{zc(t,e)})}}function Uc(e){return e.waypoints.slice(1).map((t,n)=>({start:O.isDefined(e.waypoints[n]),end:t}))}function Wc(e){let t=0;for(let{start:n,end:r}of Uc(e))t+=Math.hypot(r.x-n.x,r.y-n.y);return t}function Gc(e,t){let n=Math.max(0,t);for(let{start:t,end:r}of Uc(e)){let e=Math.hypot(r.x-t.x,r.y-t.y);if(n<=e){let i=e?n/e:0;return{x:t.x+(r.x-t.x)*i,y:t.y+(r.y-t.y)*i}}n-=e}let r=O.isDefined(e.waypoints.at(-1));return{x:r.x,y:r.y}}function Kc(e,t){let n=Uc(e).filter(({start:e,end:t})=>e.x!==t.x||e.y!==t.y),r=Math.max(0,t),i=n[0];for(let e of n){i=e;let t=Math.hypot(e.end.x-e.start.x,e.end.y-e.start.y);if(r<=t)break;r-=t}if(!i)return{x:1,y:0};let a=Math.hypot(i.end.x-i.start.x,i.end.y-i.start.y);return{x:(i.end.x-i.start.x)/a,y:(i.end.y-i.start.y)/a}}function qc(e,t){let n=1/0;for(let{start:r,end:i}of Uc(e)){let e=i.x-r.x,a=i.y-r.y,o=e*e+a*a,s=o?Math.min(1,Math.max(0,((t.x-r.x)*e+(t.y-r.y)*a)/o)):0,c=r.x+e*s,l=r.y+a*s;n=Math.min(n,Math.hypot(t.x-c,t.y-l))}return n}function Jc(e,t){let n=e.paths.find(e=>e.pathId===t);if(!n)throw Error(`No path '${t}' in level.`);return n}function Yc(e,t){if(e.spawnMode!==`pick-one`)return e.paths;let n=e.paths.map(e=>Math.max(0,e.spawnWeight??1)),r=t*n.reduce((e,t)=>e+t,0);for(let[t,i]of e.paths.entries())if(r-=n[t]??0,r<0)return[i];let i=e.paths.at(-1);return i?[i]:[]}var Xc=90,Zc=220;function Qc({levelId:e,name:t,description:n,waypoints:r,restaurantCenter:i,chuteFractions:a=[]}){let o={...i,sizePx:Zc},s={pathId:`west`,ownerSlot:0,waypoints:[...r,{x:o.x-o.sizePx/2,y:o.y}],widthPx:Xc},c=Wc(s);return{levelId:e,name:t,description:n,paths:[a.length?{...s,chutes:a.map(e=>({distancePx:Math.round(c*e)}))}:s],restaurant:o}}var $c=Qc({levelId:`winding-way`,name:`Winding Way`,description:`The classic.`,waypoints:[{x:0,y:400},{x:420,y:400},{x:420,y:820},{x:700,y:820},{x:700,y:540}],restaurantCenter:{x:960,y:540}}),el=[$c,Qc({levelId:`double-back`,name:`Double Back`,description:`Two long straights: Knife country.`,waypoints:[{x:0,y:380},{x:1450,y:380},{x:1450,y:620},{x:250,y:620},{x:250,y:780}],restaurantCenter:{x:1450,y:780},chuteFractions:[.55]}),Qc({levelId:`long-haul`,name:`The Long Haul`,description:`A big loop with a chute dropping potatoes mid-belt.`,waypoints:[{x:0,y:380},{x:1500,y:380},{x:1500,y:840},{x:150,y:840},{x:150,y:560}],restaurantCenter:{x:1260,y:560},chuteFractions:[.5]}),{levelId:`the-fork`,name:`The Fork`,description:`Potatoes split at the junction. Cover both roads.`,spawnMode:`pick-one`,paths:[{pathId:`north`,ownerSlot:0,waypoints:[{x:0,y:560},{x:500,y:560},{x:500,y:400},{x:1300,y:400},{x:1300,y:450}],widthPx:Xc},{pathId:`south`,ownerSlot:0,waypoints:[{x:0,y:560},{x:500,y:560},{x:500,y:760},{x:1300,y:760},{x:1300,y:670}],widthPx:Xc}],restaurant:{x:1300,y:560,sizePx:Zc}}],tl=$c;function nl(e){return el.find(t=>t.levelId===e)??tl}var z=function(e){return e.Ready=`ready`,e.Playing=`playing`,e.Won=`won`,e.Lost=`lost`,e}({}),rl=function(e){return e.Perfect=`perfect`,e.Incomplete=`incomplete`,e.Raw=`raw`,e}({}),il=O.isDefined(lc.waves[0]);function al(e=tl.levelId,t=`campaign`){return{levelId:e,mode:t,status:`playing`,paused:!1,speed:1,resetSpeedOnIncome:!1,speedAccumulator:0,satisfaction:sc.starting,coins:xc.startingCoins,coinsEarned:0,coinEvents:[],nextCoinEventId:1,scoreBySlot:{0:0},potatoesSpawned:0,potatoesServed:0,servingCounts:{perfect:0,incomplete:0,raw:0},lastServing:void 0,elapsedMs:0,potatoesPending:0,waveIndex:0,wavePhase:`break`,breakRemainingMs:lc.breakMs,spawnedInWave:0,beltSpeedPxPerMs:il.speedPxPerMs,orders:[],nextOrderId:1,msUntilNextOrder:Sc.firstOrderDelayMs,lastOrderEvent:void 0,nextPotatoId:1,nextTowerId:1,potatoesStolen:0,seagullsSpawnedInWave:0,msUntilNextSeagull:0,lastSteal:void 0,sendBackStreak:0,recentQualities:[],lastBossSpawnAtMs:-1}}var B={bark:`#2b1a12`,walnut:`#4d2f1f`,oak:`#7a4a2b`,caramel:`#a8693a`,toffee:`#cf9456`,sand:`#ecc88a`,wheat:`#f2dca6`,cream:`#fff3da`,moss:`#5d6b2a`,grass:`#7f9040`,meadow:`#a3b254`,tomato:`#b8472f`,pumpkin:`#e07b3f`,butter:`#efc04a`,sage:`#8f9f98`,pond:`#5f7b7a`,stone:`#cfc6b0`,slate:`#6e655b`,pine:`#3f5a52`,sky:`#7fa6b0`},ol={beltStripe:`#e6dfcb`,grassDark:`#6f8035`,lamp:`#ffd47a`},V={outlineWidth:2.6,shadow:{blur:7,offsetY:4,alpha:.4},highlight:.26,shade:.2,shine:.4,squash:.07,hop:.1,wobble:.07,fontFamily:`Georgia, "Times New Roman", serif`,fontWeight:`bold`};function H({x:e,y:t,rx:n,ry:r}){return i=>{i.ellipse(e,t,n,r)}}function U({x:e,y:t,width:n,height:r,radius:i}){return a=>{a.roundRect(e,t,n,r,i)}}function sl(e){return t=>{t.poly(e.flatMap(([e,t])=>[e,t]))}}var cl=new Ht({type:`linear`,start:{x:0,y:0},end:{x:.7,y:1},textureSpace:`local`,colorStops:[{offset:0,color:`rgba(255,255,255,${V.highlight})`},{offset:.45,color:`rgba(255,255,255,0)`},{offset:1,color:`rgba(60,30,10,${V.shade})`}]});function W(e,t){let{path:n,fill:r,outline:i=!0,highlight:a=!0,alpha:o=1,outlineScale:s=1}=t;return i&&(n(e),e.stroke({color:B.bark,width:2*V.outlineWidth*s,alpha:o,join:`round`,cap:`round`})),n(e),e.fill({color:r,alpha:o}),a&&(n(e),e.fill({fill:cl,alpha:o})),e}function G(e,t){let{path:n,color:r,width:i,outline:a=!1,alpha:o=1}=t;return a&&(n(e),e.stroke({color:B.bark,width:i+2*V.outlineWidth*.6,alpha:o,join:`round`,cap:`round`})),n(e),e.stroke({color:r,width:i,alpha:o,join:`round`,cap:`round`}),e}var ll=5;function ul(e,t){let{width:n,height:r,offsetY:i,offsetX:a=0}=t,o=new P,s=V.shadow.alpha/ll;for(let e=0;e<ll;e++){let t=1.1-e/ll*.6;o.ellipse(a,i,n/2*t,r/2*t).fill({color:B.bark,alpha:s})}return e.addChildAt(o,0),o}function dl(e,t){let n=e/1e3;return(.6*Math.sin(n*2.2+t*1.7)+.4*Math.sin(n*3.7+t*2.9))*V.wobble}function fl(e){let t=e-Math.floor(e),n=1-V.squash*Math.sin(t*Math.PI);return{scaleX:1/n,scaleY:n}}var pl={microwaveQualityPerSecond:40,microwaveDamagePerSecond:45,microwaveConeHalfAngleDeg:25,microwaveFlashMs:200,prestigeWindow:10,minOrderQuality:50,mashChampStars:3,maxStars:5,rubberyMaxAlpha:.6,rubberyStep:10},ml={maxLevel:3,costMultiplierByLevel:{2:.75,3:1.25},damageByLevel:{1:1,2:1.4,3:1.9},rangeByLevel:{1:1,2:1.15,3:1.3},cooldownByLevel:{1:1,2:.85,3:.7},sellRefund:.5},hl={perUse:{knife:.45,boiler:2.5,masher:2,"cricket-trap":12},perSecond:{microwave:1.8,swiper:1.1},wornEffectiveness:.5,serviceCostShare:.3,minServiceCost:5,maxWear:100,serviceVerb:{knife:`Sharpen`,boiler:`Refill`,masher:`Oil`,microwave:`Clean`,"cricket-trap":`Restock`,swiper:`Oil`}};function gl(e){return e>=hl.maxWear?hl.wornEffectiveness:1}function _l(e){return Math.max(hl.minServiceCost,Math.round(xc.towerCost[e]*hl.serviceCostShare))}function vl({wear:e,amount:t}){return Math.min(hl.maxWear,e+t)}function yl(e){return hl.perUse[e]??0}function bl(e){return hl.perSecond[e]??0}function xl(e){return hl.serviceVerb[e]}var K=function(e){return e.Knife=`knife`,e.Boiler=`boiler`,e.Masher=`masher`,e.Microwave=`microwave`,e.CricketTrap=`cricket-trap`,e.Swiper=`swiper`,e}({}),Sl={knife:{towerType:`knife`,label:`Knife`,glyph:`K`,hotkey:`1`,color:`#8f9f98`,appliesEffect:`cut`,areaOfEffect:!1,behavior:`line`,...hc.knife},boiler:{towerType:`boiler`,label:`Boiling Pot`,glyph:`B`,hotkey:`2`,color:`#5f7b7a`,appliesEffect:`cooked`,areaOfEffect:!0,behavior:`mash`,...hc.boiler},masher:{towerType:`masher`,label:`Masher`,glyph:`M`,hotkey:`3`,color:`#e0a050`,appliesEffect:void 0,areaOfEffect:!1,behavior:`mash`,...hc.masher},microwave:{towerType:`microwave`,label:`Microwave`,glyph:`µ`,hotkey:`4`,color:`#a8693a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`cone`,...hc.microwave},"cricket-trap":{towerType:`cricket-trap`,label:`Cricket Trap`,glyph:`C`,hotkey:`5`,color:`#7a4a2b`,appliesEffect:void 0,areaOfEffect:!1,behavior:`gull-trap`,...hc[`cricket-trap`]},swiper:{towerType:`swiper`,label:`Swiper`,glyph:`S`,hotkey:`6`,color:`#6f8b6a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`swipe`,...hc.swiper}};function Cl(e){return Math.min(ml.maxLevel,Math.max(1,Math.round(e)))}function wl(e){return ml.damageByLevel[Cl(e)]}function Tl(e,t,n=0){let{damage:r,rangePx:i,cooldownMs:a}=Sl[e],o=Cl(t),s=gl(n),c=Sl[e].behavior===`gull-trap`?s:1;return{damage:Math.round(r*ml.damageByLevel[o]*s),rangePx:Math.round(i*ml.rangeByLevel[o]),cooldownMs:a*ml.cooldownByLevel[o]/c}}function El(e,t){return Math.round(xc.towerCost[e]*ml.costMultiplierByLevel[t])}function Dl(e,t){let n=xc.towerCost[e];for(let r=2;r<=Cl(t);r++)n+=El(e,r);return Math.round(n*ml.sellRefund)}var Ol=Math.PI*2;function kl(e,t,n){return e+(t-e)*n}function Al(e){return Math.max(0,Math.min(1,e))}function q(e,t,n){return Al((e-t)/(n-t))}function jl(e){return 1-(1-e)**3}function Ml(e){return e*e*e}function Nl(e){return 1+3.2*(e-1)**3+2.2*(e-1)**2}var Pl=8;function Fl(e,t,n,r){return H({x:e,y:t,rx:n,ry:r})}function Il(e,t,n){return Fl(e,t,n,n)}function J(e,t,n,r,i){return U({x:e,y:t,width:n,height:r,radius:i})}function Ll(...e){return sl(e)}function Y(e,t,n,r={}){W(e,{path:n,fill:t,outline:!r.noOutline,highlight:!r.flat,outlineScale:r.outlineScale??1,alpha:r.alpha??1})}function Rl(e,t,n,r,i={}){G(e,{color:t,width:n,outline:i.outline??!1,alpha:i.alpha??1,path(e){r.forEach(([t,n],r)=>{r===0?e.moveTo(t,n):e.lineTo(t,n)})}})}function zl(e,{x:t,y:n,rx:r,ry:i,rotation:a=0,strength:o=1}){Bl(e,{x:t,y:n,rotation:a},()=>{e.ellipse(0,0,r,i).fill({color:`#ffffff`,alpha:V.shine*o})})}function Bl(e,t,n){e.save(),e.translateTransform(t.x??0,t.y??0),e.rotateTransform(t.rotation??0),e.scaleTransform(t.scaleX??1,t.scaleY??1),n(),e.restore()}function Vl(e,t){for(let t=0;t<4;t++){let n=1.1-t*.12;e.ellipse(0,24,50*n,17*n).fill({color:B.bark,alpha:.09})}Y(e,t,Fl(0,Pl,46,34)),Y(e,`#ffffff`,Fl(0,Pl,38,27),{noOutline:!0,flat:!0,alpha:.16})}function Hl(e,t){let{timeSec:n}=t,r=t.attack<0?-1:.5+t.attack*.5;Vl(e,B.sage);let i=r<0?0:q(r,.55,.64)*(1-q(r,.64,.9)),a;a=r<0?-.35+Math.sin(n*2)*.05:r<.55?-1.2+Math.sin(r*160)*.025:r<.62?kl(-1.2,.05,Ml(q(r,.55,.62))):kl(.05,-.35,Nl(q(r,.62,1))),Bl(e,{y:22,scaleX:1+.06*i,scaleY:1-.1*i},()=>{Bl(e,{y:-22},()=>{Y(e,B.toffee,J(-32,2,64,24,6)),Y(e,B.caramel,J(-32,18,64,8,4),{noOutline:!0,flat:!0,alpha:.5}),Rl(e,B.caramel,1.5,[[-22,10],[-6,10]],{alpha:.5}),Rl(e,B.caramel,1.5,[[6,13],[24,13]],{alpha:.5})})});let o=r<0?0:i*6;if(Bl(e,{x:12},()=>{Y(e,B.toffee,Fl(-o,0,8,7),{outlineScale:.7}),Y(e,B.toffee,Fl(o,0,8,7),{outlineScale:.7})}),Bl(e,{x:-26,y:6,rotation:a},()=>{Y(e,B.stone,Ll([2,-9],[46,-9],[58,0],[46,8],[2,8])),Rl(e,B.sage,2,[[6,5],[46,5]],{alpha:.7}),zl(e,{x:24,y:-5,rx:16,ry:2,strength:.9}),Y(e,B.caramel,J(-20,-6,24,11,4),{outlineScale:.8}),Y(e,B.butter,Il(-14,0,1.8),{noOutline:!0,flat:!0}),Y(e,B.butter,Il(-4,0,1.8),{noOutline:!0,flat:!0})}),i>0)for(let t of[-1,0,1])Rl(e,B.cream,2.5,[[24+t*6,2],[30+t*14,-8+Math.abs(t)*3]],{alpha:i})}function Ul(e,t){let{attack:n,timeSec:r}=t;Vl(e,B.pond),Y(e,B.sage,Fl(0,24,32,11));for(let t=-2;t<=2;t++){let n=5+3*Math.sin(r*14+t*2.1);Y(e,t%2?B.butter:B.pumpkin,Ll([t*9-4,26],[t*9,26-n-4],[t*9+4,26]),{outlineScale:.5})}let i=n<0?0:q(n,.1,.9),a=n<0?0:Math.sin(q(n,.12,.4)*Math.PI),o=n<0?1+Math.sin(r*3)*.012:1+.1*a-.05*Math.sin(q(n,.4,.7)*Math.PI);Bl(e,{y:24,scaleX:1/o*.5+.5,scaleY:o},()=>{Bl(e,{y:-24},()=>{Y(e,B.stone,J(-26,-18,52,42,10)),zl(e,{x:-14,y:-4,rx:5,ry:14,strength:.8});for(let t of[-1,1])Y(e,B.sage,J(t>0?25:-35,-8,10,7,3),{outlineScale:.8});Y(e,B.sage,Fl(0,-18,27,9));let t=n<0?0:Math.sin(q(n,.1,.5)*Math.PI);Y(e,B.pond,Fl(0,-18,22,6.5+4*t),{noOutline:!0});for(let t=0;t<4;t++){let n=(r*.7+t*.27)%1;Y(e,B.sky,Il((t-1.5)*8,-18-n*5,2+n*3),{outlineScale:.5,alpha:1-n**6})}})});for(let t=0;t<3;t++){let n=(r*.4+t/3)%1;Y(e,B.cream,Il(Math.sin(n*5+t)*6+(t-1)*9,-28-n*26,5+n*5),{noOutline:!0,flat:!0,alpha:(1-n)*.7})}if(n>=0&&i>0){e.circle(0,0,t.rangePx*(.3+.7*i)).stroke({color:B.sky,width:4*(1-i)+1.5,alpha:.9*(1-i)});for(let t=0;t<7;t++){let r=t/7*Ol,i=q(n,.12,.8),a=i*46,o=Math.sin(i*Math.PI)*26;Y(e,B.sky,Il(Math.cos(r)*a,-14+Math.sin(r)*a*.45-o,3.2-i),{outlineScale:.5,alpha:1-i*i})}}}function Wl(e,t){let{timeSec:n}=t,r=t.attack<0?-1:.5+t.attack*.5;Vl(e,`#e0a050`),Y(e,B.sage,Fl(0,20,34,14)),Y(e,B.cream,Fl(0,17,28,9.5),{noOutline:!0}),zl(e,{x:-8,y:15,rx:9,ry:2.5,strength:.8});let i;i=r<0?-10+Math.sin(n*2.4)*2:r<.6?-36+Math.sin(r*100)*.6:r<.68?kl(-36,0,Ml(q(r,.6,.68))):kl(0,-10,jl(q(r,.68,1)));let a=r<0?0:q(r,.68,.74)*(1-q(r,.74,1)),o=r>=.6&&r<.68,s=1+.14*a-(o?.06:0),c=1-.16*a+(o?.14:0);if(Bl(e,{y:18+i,scaleX:s,scaleY:c},()=>{Y(e,B.caramel,J(-3.5,-46,7,40,2.5),{outlineScale:.8}),Y(e,B.toffee,J(-14,-54,28,9,4.5),{outlineScale:.9}),Y(e,B.stone,J(-22,-8,44,10,4));for(let t=-2;t<=2;t++)Y(e,B.sage,Il(t*8,-3,1.8),{noOutline:!0,flat:!0})}),a>0){let t=q(r,.68,1);e.ellipse(0,20,22+t*30,(22+t*30)*.38).stroke({color:B.cream,width:3,alpha:1-t});for(let n of[-1,1])Y(e,B.cream,Il(n*(14+t*26),12-Math.sin(t*Math.PI)*22,3.5),{outlineScale:.5,alpha:1-t})}}function Gl(e,t){let{timeSec:n}=t,r=t.attack>=0,i=r?1-q(t.attack,.5,1):0;if(r){let r=Math.atan2(t.aimY,t.aimX),a=pl.microwaveConeHalfAngleDeg*Math.PI/180;e.moveTo(0,0).arc(0,0,t.rangePx,r-a,r+a).closePath().fill({color:B.pumpkin,alpha:.3*i});for(let o=0;o<3;o++){let s=(n*2+o/3)%1;e.arc(0,0,14+s*(t.rangePx-14),r-a*.8,r+a*.8).stroke({color:B.butter,width:3,alpha:(1-s)*i})}}Vl(e,B.caramel),Bl(e,{x:-16+(r?Math.sin(n*70)*1.1:0)},()=>{Y(e,B.cream,J(-34,-20,68,42,7)),Y(e,B.pine,J(-28,-14,40,30,4),{outlineScale:.8});let t=r?.95:.4+.15*Math.sin(n*2.5);Y(e,B.butter,J(-26,-12,36,26,3),{noOutline:!0,flat:!0,alpha:t*.7}),Y(e,B.stone,Fl(-8,10,14,4),{noOutline:!0,flat:!0});let i=n*(r?5:1.2);Y(e,B.toffee,Fl(-8+Math.cos(i)*3,5,6,4.5),{noOutline:!0,flat:!0}),zl(e,{x:-22,y:-8,rx:6,ry:2,rotation:-.6,strength:.7}),Y(e,B.sage,J(15,-14,14,30,3),{outlineScale:.7});for(let t=0;t<3;t++)Y(e,t===0&&r?B.butter:B.stone,Il(22,-8+t*7,2.2),{outlineScale:.4});Y(e,B.sage,J(-30,22,10,4,2),{noOutline:!0}),Y(e,B.sage,J(20,22,10,4,2),{noOutline:!0})})}function Kl(e,{timeSec:t,squash:n=1,tilt:r=0}){Bl(e,{rotation:r,scaleX:1/n,scaleY:n},()=>{Rl(e,B.pine,2.4,[[-3,2],[-9,-6],[-13,3]],{outline:!0}),Rl(e,B.pine,1.2,[[7,-4],[12,-12+Math.sin(t*12)*2]]),Rl(e,B.pine,1.2,[[8,-3],[15,-8+Math.sin(t*12+1)*2]]),Y(e,B.moss,Fl(0,0,10,5.2),{outlineScale:.8}),Y(e,B.moss,Il(8,-1.5,4.2),{outlineScale:.8}),Y(e,`#ffffff`,Il(9.5,-2.5,1.5),{noOutline:!0,flat:!0}),Y(e,B.bark,Il(10,-2.5,.8),{noOutline:!0,flat:!0}),Rl(e,B.pine,1.2,[[-2,-3],[3,-3]],{alpha:.7})})}function ql(e,t){let{attack:n,timeSec:r}=t;if(Vl(e,B.walnut),n<0)for(let t of[-1,1])G(e,{color:B.pine,width:1.6,path(e){e.moveTo(t*4,-4).quadraticCurveTo(t*10,-20,t*(14+Math.sin(r*5+t)*4),-24+Math.sin(r*4)*2)}});Y(e,B.toffee,J(-30,-2,60,30,5));for(let t of[6,14,22])Rl(e,B.caramel,1.6,[[-28,t],[28,t]],{alpha:.55});Y(e,B.bark,J(-11,6,22,12,3),{outlineScale:.7,flat:!0}),Bl(e,{x:-31,y:-2,rotation:-(.1+(n>=0?.55*Math.sin(n*Math.PI):Math.sin(r*1.5)*.04))},()=>{Y(e,B.caramel,J(0,-8,62,9,3),{outlineScale:.9})}),Y(e,B.meadow,H({x:20,y:-10,rx:7,ry:3.5}),{outlineScale:.6})}function Jl(e,t){let{attack:n}=t;Vl(e,`#6f8b6a`);let r=t.rangePx,i=n<0?0:Math.sin(n*Math.PI);Bl(e,{y:Pl,rotation:t.swiperAngle},()=>{i>.05&&e.arc(0,0,r*.7,-1.5,0).stroke({color:B.cream,width:18,alpha:.5*i,cap:`round`}),Y(e,B.toffee,J(6,-6,18,12,4),{outlineScale:.9}),Y(e,B.toffee,J(20,-11,r-20,22,11)),Rl(e,B.caramel,1.6,[[28,-3],[r-12,-3]],{alpha:.5}),Rl(e,B.caramel,1.6,[[28,4],[r-12,4]],{alpha:.5}),zl(e,{x:r*.6,y:-6,rx:9,ry:2,strength:.7})}),Bl(e,{y:Pl},()=>{Y(e,B.stone,Il(0,0,11)),Y(e,B.sage,Il(0,0,4.2),{outlineScale:.5})})}var Yl={[K.Knife]:Hl,[K.Boiler]:Ul,[K.Masher]:Wl,[K.Microwave]:Gl,[K.CricketTrap]:ql,[K.Swiper]:Jl};function Xl(e,t){e.clear(),e.save(),e.scaleTransform(pc.scale,pc.scale),e.translateTransform(0,-8),Zl(e,t),e.restore()}function Zl(e,t){let n=pc.scale;Yl[t.towerType](e,{...t,rangePx:t.rangePx/n,aimX:t.aimX/n,aimY:t.aimY/n})}var Ql=100,$l=2,eu=50,tu=new Map,nu=!1;function ru(e){return tu.get(e)}function iu(){return tu.size===Object.values(K).length}function au(e){if(!nu){nu=!0;for(let t of Object.values(K)){let n=new P;Xl(n,{towerType:t,attack:-1,timeSec:.3,aimX:0,aimY:0,rangePx:eu,swiperAngle:-.6}),e.extract.base64({target:n,frame:new st(-50,-50,Ql,Ql),resolution:$l}).then(e=>{tu.set(t,e),n.destroy()}).catch(()=>{nu=!1})}}}var ou={lineHalfWidthPx:14,lineColor:`#e0e0e0`,lineAlpha:.25,lineWidthPx:4,rotateStepDeg:15},{defineEntity:su,entityKeys:cu,updateEntitiesMod:lu,defineLogicEntity:uu}=Rs({disableEntityUpdate:!0});function du(e,t){return(e.cut?gc.cutMultiplier:1)*(t===K.Masher&&e.cooked?gc.softMasherMultiplier:1)}function fu(e,t,n={}){return Tl(t,n.level??1,n.wear??0).damage*du(e,t)}function pu(e,t,n={}){e.mashHp=Math.max(0,e.mashHp-fu(e,t,n));let r=Sl[t].appliesEffect;r&&(e[r]=!0)}function mu(e){return 1-e.mashHp/e.maxMashHp}var hu={penaltyMultiplier:3,baseHp:ic.king.mashHp,hpGrowthPerBoss:.25,bannerMs:3e3,meter:{width:90,height:10}};function gu(e){return hu.baseHp*(1+hu.hpGrowthPerBoss*e)}var _u={passSlots:4,queueSpacingPx:50,waiterIntervalMs:2e3,heatLampGraceMs:4e3,heatLampQualityPerSecond:2,angerStep:3,maxSendBacks:2};function vu({next:e,aheadDistances:t,spacingPx:n,endPx:r}){return t.length?Math.min(e,Math.min(...t)-n):Math.min(e,r)}function yu({chutes:e,chuteShare:t,roll:n}){if(!(!e?.length||n>=t))return e[Math.min(e.length-1,Math.floor(n/t*e.length))]}function bu({dropInMs:e,msSinceLastExecute:t}){return Math.max(0,e-t)}function xu({dropInMs:e,dropMs:t,startScale:n}){return 1+(n-1)*Math.min(1,Math.max(0,e/t))}var X=function(e){return e.Butter=`butter`,e.Scallions=`scallions`,e.Cabbage=`cabbage`,e.Gravy=`gravy`,e}({}),Su={butter:{topping:`butter`,label:`Butter`,hotkey:`q`,color:`#ffd84a`},scallions:{topping:`scallions`,label:`Scallions`,hotkey:`w`,color:`#5cb85c`},cabbage:{topping:`cabbage`,label:`Cabbage`,hotkey:`e`,color:`#2e7d32`},gravy:{topping:`gravy`,label:`Gravy`,hotkey:`r`,color:`#7b4a1e`}};function Cu(){return{butter:!1,scallions:!1,cabbage:!1,gravy:!1}}var wu=function(e){return e.ButteredMash=`buttered-mash`,e.Champ=`champ`,e.Colcannon=`colcannon`,e.BangersAndMash=`bangers-and-mash`,e}({}),Tu={"buttered-mash":{dish:`buttered-mash`,label:`Buttered Mash`,toppings:[X.Butter]},champ:{dish:`champ`,label:`Champ`,toppings:[X.Scallions,X.Butter]},colcannon:{dish:`colcannon`,label:`Colcannon`,toppings:[X.Cabbage,X.Butter]},"bangers-and-mash":{dish:`bangers-and-mash`,label:`Bangers & Mash`,toppings:[X.Gravy]}},Eu=Object.values(X);function Du(e){return{[X.Butter]:e[X.Butter],[X.Scallions]:e[X.Scallions],[X.Cabbage]:e[X.Cabbage],[X.Gravy]:e[X.Gravy]}}function Ou(e){return Object.values(wu).find(t=>{let n=Tu[t].toppings;return Eu.every(t=>e[t]===n.includes(t))})}function ku(e,t){return!e.served&&!e[t]}function Au(e,t){for(e.push(t);e.length>pl.prestigeWindow;)e.shift()}function ju(e){if(!e.length)return pl.maxStars;let t=e.reduce((e,t)=>e+t,0)/e.length;return Math.min(pl.maxStars,Math.round(t/20*2)/2)}function Mu(e,t){e.coins+=t.amount,t.amount>0&&(e.coinsEarned+=t.amount,e.resetSpeedOnIncome&&=(e.speed=1,!1)),e.coinEvents.push({id:e.nextCoinEventId,atMs:e.elapsedMs,amount:t.amount,reason:t.reason,x:t.x,y:t.y}),e.nextCoinEventId+=1,e.coinEvents.length>xc.coinEventsKept&&e.coinEvents.splice(0,e.coinEvents.length-xc.coinEventsKept)}function Nu({value:e,quality:t}){let n=`Perfect mash`,r=Object.entries(ic).find(([,t])=>t.value===e);return r&&e!==ic.medium.value&&(n+=` · ${r[0]} ×${e}`),t<100&&(n+=` · quality ${Math.round(t)}%`),n}function Pu(e){let{restaurant:t}=nl(e.levelId);return{x:t.x,y:t.y}}function Fu(e){return e.mashHp<=0?rl.Perfect:!e.cut&&!e.cooked&&e.mashHp>=e.maxMashHp?rl.Raw:rl.Incomplete}function Iu(e,t){return e===rl.Incomplete?Math.min(cc.incomplete.satisfaction,Math.round(cc.raw.satisfaction*(1-mu(t)))):cc[e].satisfaction}function Lu(e,t){if(t.quality<pl.minOrderQuality)return;let n=Ou(t.toppings),r=e.orders.findIndex(e=>e.dish===n),i=e.orders[r];if(!n||!i)return;e.orders.splice(r,1);let a=Math.round(Sc.fulfilled.score*t.value),o=Math.round(Sc.fulfilled.coins*t.value);e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+a,Mu(e,{amount:o,reason:`Order: ${Tu[n].label}`,...Pu(e)});let s=Math.min(sc.max,Math.max(0,e.satisfaction+Sc.fulfilled.satisfaction));e.lastOrderEvent={kind:`fulfilled`,dish:n,atMs:e.elapsedMs,scoreDelta:a,satisfactionDelta:s-e.satisfaction},e.satisfaction=s}function Ru(e){return e.wavePhase===`done`&&e.potatoesPending===0&&e.potatoesServed+e.potatoesStolen>=e.potatoesSpawned}function zu(e){return e.satisfaction<=0?e.status=z.Lost:Ru(e)&&(e.status=z.Won),e.status}function Bu(e){if(e.status!==z.Playing)return;e.potatoesStolen+=1;let t=Math.min(sc.max,Math.max(0,e.satisfaction+dc.stolenSatisfaction));e.lastSteal={atMs:e.elapsedMs,satisfactionDelta:t-e.satisfaction},e.satisfaction=t,zu(e)}function Vu(e,t){let n=Fu(t.processing);if(e.status!==z.Playing)return{result:n,sentBack:!1};let r=n===rl.Perfect,i=!r&&t.timesSentBack<_u.maxSendBacks,a=t.quality/100,o=r?Math.round(cc.perfect.score*t.value*a):cc[n].score,s=r?Math.round(xc.servingCoins.perfect*t.value*a):xc.servingCoins[n];r&&Au(e.recentQualities,t.quality);let c=r?Iu(n,t.processing):(Iu(n,t.processing)-_u.angerStep*e.sendBackStreak)*(t.penaltyMultiplier??1);r?e.sendBackStreak=0:e.sendBackStreak+=1,i||(e.potatoesServed+=1,e.servingCounts[n]+=1,e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+o),Mu(e,{amount:i?0:s,reason:i?`Sent back · no pay`:r?Nu(t):`Eaten anyway`,...Pu(e)});let l=Math.min(sc.max,Math.max(0,e.satisfaction+c)),u=l-e.satisfaction;e.satisfaction=l,e.lastServing={result:n,servedAtMs:e.elapsedMs,scoreDelta:i?0:o,satisfactionDelta:u,progress:mu(t.processing),sentBack:i};let d=zu(e);return r&&d===z.Playing&&Lu(e,t),{result:n,sentBack:i}}var Hu={bobPeriodMs:1e3,hitSquashMs:260,hitSquash:.2};function Uu({elapsedMs:e,potatoId:t,radius:n,lastHitAtMs:r}){let i=e/Hu.bobPeriodMs+t*.37,a=fl(i),o=i-Math.floor(i),s=-Math.cos(o*Math.PI*2)*.5-.5,c=a.scaleX,l=a.scaleY,u=e-r;if(r>=0&&u>=0&&u<Hu.hitSquashMs){let e=1-Hu.hitSquash*Math.sin(u/Hu.hitSquashMs*Math.PI);l*=e,c/=e}return{rotation:dl(e,t),scaleX:c,scaleY:l,offsetY:s*n*V.hop}}var Wu=function(e){return e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e.King=`king`,e}({}),Gu=[`small`,`medium`,`large`];function Ku(e,t){let n=t;for(let t of Gu)if(n-=e[t],n<0&&e[t]>0)return t;return Gu.findLast(t=>e[t]>0)??`medium`}var qu={width:40,height:7},Ju=14,Yu={outline:!1,highlight:!1};function Xu({rx:e,ry:t,lumpiness:n,bumps:r,seed:i}){let a=[];for(let o=0;o<40;o++){let s=o/40*Math.PI*2,c=1+n*Math.sin(r*s+i);a.push([Math.cos(s)*e*c,Math.sin(s)*t*c])}return sl(a)}function Zu({points:e,x:t,y:n,rotation:r=0}){return e.map(([e,i])=>[t+e*Math.cos(r)-i*Math.sin(r),n+e*Math.sin(r)+i*Math.cos(r)])}function Qu({x:e,y:t,rx:n,ry:r,rotation:i}){let a=[];for(let e=0;e<20;e++){let t=e/20*Math.PI*2;a.push([Math.cos(t)*n,Math.sin(t)*r])}return sl(Zu({points:a,x:e,y:t,rotation:i}))}function $u(e){return t=>{e.forEach(([e,n],r)=>{r===0?t.moveTo(e,n):t.lineTo(e,n)})}}function ed({x:e,y:t,radius:n,from:r,to:i}){return a=>{a.moveTo(e+Math.cos(r)*n,t+Math.sin(r)*n),a.arc(e,t,n,r,i)}}function td(e){return t=>{for(let[n,r,i]of e)t.circle(n,r,i)}}function nd(e){return td([[-.45*e,0,.8*e],[.45*e,0,.8*e],[0,-.35*e,.8*e],[0,.3*e,.7*e]])}function rd({x:e,y:t,radius:n}){return H({x:e,y:t,rx:n,ry:n})}function id({graphics:e,x:t,y:n,rx:r,ry:i,rotation:a=-.5,strength:o=1}){W(e,{path:Qu({x:t,y:n,rx:r,ry:i,rotation:a}),fill:`#ffffff`,alpha:V.shine*o,...Yu})}function ad({graphics:e,processing:t,radius:n,toppings:r,quality:i=100,meter:a=qu,crown:o=!1,seed:s=0}){let c=mu(t);return e.clear(),c>0&&c<1&&(od({graphics:e,radius:n,meter:a,progress:c}),md({graphics:e,processing:t,radius:n,meterWidth:a.width})),c>=.5?(ud({graphics:e,radius:n,perfect:c>=1,cooked:t.cooked}),_d({graphics:e,radius:n,quality:i,blob:!0,seed:s}),dd({graphics:e,radius:n,mood:c>=1?`happy`:`dazed`})):(ld({graphics:e,radius:n,processing:t,seed:s,king:o}),_d({graphics:e,radius:n,quality:i,blob:!1,seed:s}),dd({graphics:e,radius:n,mood:o?`angry`:`calm`}),t.cooked&&fd(e,n)),hd(e,n,r),o&&pd(e,n),e}function od({graphics:e,radius:t,meter:n,progress:r}){let i=-t-Ju;W(e,{path:U({x:-n.width/2,y:i,width:n.width,height:n.height,radius:n.height/2}),fill:B.walnut,outlineScale:.5,highlight:!1}),W(e,{path:U({x:-n.width/2,y:i,width:Math.max(n.height,n.width*r),height:n.height,radius:n.height/2}),fill:B.meadow,outline:!1})}var sd=[[-.55,-.1],[.45,.3],[.2,-.5],[-.1,.45]],cd=[[-.7,-.1],[.6,.3],[.3,-.55],[-.2,.55],[.75,-.25],[-.4,.15]];function ld({graphics:e,radius:t,processing:n,seed:r,king:i}){let a=n.cooked,o=t*(i?1.25:1.2),s=t*(i?.95:.9);if(W(e,{path:Xu({rx:o,ry:s,lumpiness:a?.03:.05,bumps:a?4:5,seed:r}),fill:i?B.caramel:a?B.wheat:B.toffee}),a){id({graphics:e,x:-t*.4,y:-t*.4,rx:t*.38,ry:t*.15,strength:1.1});for(let[n,r]of[[-.5,.35],[.4,.2]])W(e,{path:rd({x:n*t,y:r*t,radius:t*.07}),fill:B.sand,alpha:.7,...Yu})}else{id({graphics:e,x:-t*.4,y:-t*.4,rx:t*.35,ry:t*.14});for(let[n,r]of i?cd:sd)W(e,{path:rd({x:n*t,y:r*t,radius:Math.max(1.3,t*.06)}),fill:B.caramel,...Yu})}if(n.cut)for(let n of[-.4,.4]){let r=s*.92*Math.sqrt(Math.max(0,1-(n*t/o)**2));G(e,{path:$u([[n*t,-r],[n*t,r]]),color:B.oak,width:Math.max(2.5,t*.14)}),G(e,{path:$u([[n*t+t*.12,-r*.95],[n*t+t*.12,r*.95]]),color:B.sand,width:Math.max(1,t*.05)})}}function ud({graphics:e,radius:t,perfect:n,cooked:r}){if(n){W(e,{path:nd(t),fill:B.cream}),W(e,{path:sl([[-t*.18,-t*.78],[0,-t*1.18],[t*.2,-t*.78]]),fill:B.cream,outlineScale:.9}),W(e,{path:H({x:0,y:-t*.8,rx:t*.3,ry:t*.14}),fill:B.cream,...Yu}),id({graphics:e,x:-t*.35,y:-t*.35,rx:t*.4,ry:t*.17,rotation:-.4,strength:.95}),id({graphics:e,x:t*.1,y:-t*.3,rx:t*.07,ry:t*.07,rotation:0,strength:1.2}),G(e,{path:ed({x:0,y:-t*.62,radius:t*.2,from:.3,to:Math.PI-.3}),color:B.sand,width:Math.max(1,t*.05),alpha:.6});return}if(W(e,{path:nd(t),fill:r?B.wheat:B.sand}),!r)for(let[n,r,i]of[[-.6,-.2,.5],[.15,-.55,-.3],[.55,.2,1],[-.2,.35,0]])W(e,{path:Qu({x:n*t,y:r*t,rx:t*.3,ry:t*.2,rotation:i}),fill:B.toffee,outlineScale:.55});G(e,{path(e){e.moveTo(-t*.6,t*.15),e.quadraticCurveTo(-t*.3,0,0,t*.15),e.quadraticCurveTo(t*.3,t*.3,t*.6,t*.1)},color:B.caramel,width:Math.max(1.2,t*.06),alpha:.5})}function dd({graphics:e,radius:t,mood:n}){let r=t*.3,i=-t*.05;for(let a of[-1,1])n===`happy`?G(e,{path:ed({x:a*r,y:i+t*.02,radius:t*.09,from:Math.PI*1.1,to:Math.PI*1.9}),color:B.bark,width:t*.07}):W(e,{path:rd({x:a*r,y:i,radius:t*.075}),fill:B.bark,...Yu}),n!==`angry`&&W(e,{path:rd({x:a*t*.5,y:i+t*.2,radius:t*.12}),fill:B.pumpkin,alpha:.55,...Yu});(n===`happy`||n===`calm`)&&G(e,{path:ed({x:0,y:i+t*.12,radius:t*.1,from:.2,to:Math.PI-.2}),color:B.bark,width:t*.05})}function fd(e,t){for(let n=0;n<3;n++){let r=n*.3,i=t*.16*(1+r);W(e,{path:rd({x:Math.sin(r*6+n*2)*t*.2+(n-1)*t*.4,y:-t*.95-r*t*1.1,radius:i}),fill:B.cream,alpha:(1-r)*.85,...Yu})}}function pd(e,t){let n={x:0,y:-t*.82,rotation:.12};function r(e){return Zu({points:e.map(([e,n])=>[e*t,n*t]),...n})}W(e,{path:sl(r([[-.5,.12],[-.58,-.55],[-.27,-.25],[0,-.7],[.27,-.25],[.58,-.55],[.5,.12]])),fill:B.butter,outlineScale:.85}),W(e,{path:sl(r([[-.5,-.02],[.5,-.02],[.5,.14],[-.5,.14]])),fill:B.caramel,outlineScale:.6});for(let[n,i]of r([[-.58,-.55],[0,-.7],[.58,-.55]]))W(e,{path:rd({x:n,y:i,radius:t*.07}),fill:B.tomato,outlineScale:.5})}function md({graphics:e,processing:t,radius:n,meterWidth:r}){let i=_c.iconSizePx,a=-n-Ju-i-3,o=-r/2;t.cut&&(G(e,{path:$u([[o+1,a+i-1],[o+i-1,a+1]]),color:B.stone,width:4,outline:!0}),G(e,{path:$u([[o+2,a+i-3],[o+i-3,a+2]]),color:B.cream,width:1.5}),o+=i+4),t.cooked&&(W(e,{path:sl([[o+i/2,a],[o+i*.2,a+i*.62],[o+i*.8,a+i*.62]]),fill:B.sky,outlineScale:.6}),W(e,{path:rd({x:o+i/2,y:a+i*.68,radius:i*.32}),fill:B.sky,outlineScale:.6}))}function hd(e,t,n){let r=t;if(n[X.Gravy]&&(W(e,{path(e){e.ellipse(0,-r*.12,r*.72,r*.36),e.circle(-r*.5,r*.12,r*.14),e.circle(r*.3,r*.2,r*.18),e.circle(r*.62,0,r*.12)},fill:B.oak,outlineScale:.6}),id({graphics:e,x:-r*.25,y:-r*.24,rx:r*.22,ry:r*.07,rotation:-.2,strength:.8}),W(e,{path:H({x:r*.15,y:-r*.08,rx:r*.2,ry:r*.07}),fill:B.caramel,alpha:.5,...Yu})),n[X.Cabbage])for(let[t,n,i]of[[-.45,.18,-.5],[.38,.28,.4]]){W(e,{path:Qu({x:t*r,y:n*r,rx:r*.34,ry:r*.2,rotation:i}),fill:B.meadow,outlineScale:.6});for(let[a,o,s,c,l]of[[-.28,0,.26,0,.05],[-.08,0,.04,-.1,.035],[-.08,0,.04,.1,.035]])G(e,{path:$u(Zu({points:[[a*r,o*r],[s*r,c*r]],x:t*r,y:n*r,rotation:i})),color:B.moss,width:Math.max(1,r*l)})}if(n[X.Scallions]){for(let[t,n,i]of[[-.3,-.55,-.6],[0,-.62,0],[.3,-.55,.6],[.1,-.35,.9]]){let a=$u(Zu({points:[[0,0],[0,-r*.3]],x:t*r,y:n*r,rotation:i}));G(e,{path:a,color:B.moss,width:r*.16,outline:!0}),G(e,{path:a,color:B.meadow,width:r*.09})}for(let[t,n]of[[-.55,-.2],[.55,-.15],[0,-.15]])W(e,{path:rd({x:t*r,y:n*r,radius:r*.09}),fill:B.meadow,outlineScale:.5}),W(e,{path:rd({x:t*r,y:n*r,radius:r*.04}),fill:B.cream,...Yu})}n[X.Butter]&&(W(e,{path:U({x:-r*.3,y:-r*.55,width:r*.6,height:r*.44,radius:r*.1}),fill:B.toffee,outlineScale:.7}),W(e,{path:U({x:-r*.3,y:-r*.62,width:r*.6,height:r*.36,radius:r*.1}),fill:B.butter,outlineScale:.7}),id({graphics:e,x:-r*.12,y:-r*.5,rx:r*.12,ry:r*.05,rotation:0,strength:.9}),W(e,{path:H({x:r*.1,y:-r*.08,rx:r*.14,ry:r*.05}),fill:B.butter,alpha:.6,...Yu}))}function gd(e){return Math.round(e/pl.rubberyStep)*pl.rubberyStep}function _d({graphics:e,radius:t,quality:n,blob:r,seed:i}){let a=(1-gd(n)/100)*pl.rubberyMaxAlpha;a<=0||W(e,{path:r?nd(t):Xu({rx:t*1.2,ry:t*.9,lumpiness:.05,bumps:5,seed:i}),fill:B.sage,alpha:a,...Yu})}function vd({processing:e,toppings:t,quality:n,radius:r,crown:i}){let a=e.mashHp<=0;return[e.cut,e.cooked,a?`done`:Math.round(mu(e)*20),JSON.stringify(t),gd(n),r,i].join(`|`)}var yd=`chute-shadow`,bd=class e extends su({key:`PotatoEntity`,paramsShape:wn(xs,t({pathId:``,distancePx:0,dropInMs:0,size:Ie(Wu),cut:!1,cooked:!1,mashHp:0,maxMashHp:1,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,passWaitMs:0,potatoId:0,butter:!1,scallions:!1,cabbage:!1,gravy:!1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){drawnKey=``;hitText;createView(){this.drawnKey=this.getLookKey();let e=this.getRadius(),t=ad({graphics:new P,processing:this.getProcessing(),radius:e,toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===Wu.King,seed:this.params.potatoId});ul(t,{width:e*2.4,height:e*.9,offsetY:e*.8});let n=new P({label:yd});return n.ellipse(0,e*.5,e*1.1,e*.5).fill({color:`#000000`}),n.visible=this.params.dropInMs>0,t.addChildAt(n,0),this.params.dropInMs>0&&this.drawFalling(t),{hitbox:new fo({x:0,y:0},this.getRadius()),view:t}}recordHit({towerType:e,tower:t,minIntervalMs:n=0}){let r=this.state.runState.elapsedMs;if(this.params.lastHitAtMs>=0&&r-this.params.lastHitAtMs<n)return;let i=this.getProcessing();this.params.lastHitDamage=Math.round(fu(i,e,t)),this.params.lastHitMultiplier=du(i,e),this.params.lastHitAtMs=r,this.params.lastHitTowerType=e}updateHitNumber(){let e=this.state.runState.elapsedMs-this.params.lastHitAtMs;if(this.params.lastHitAtMs<0||e<0||e>=_c.hitNumberMs){this.hitText&&(this.hitText.visible=!1);return}let t=_c.tiers.find(e=>this.params.lastHitMultiplier>=e.minMultiplier)??_c.tiers[_c.tiers.length-1];if(!t)return;let n=this.hitText??new Qo({text:``,style:{fill:`#ffffff`,fontSize:20,fontWeight:`bold`,stroke:{color:`#000000`,width:4}}});this.hitText||(n.anchor.set(.5),this.hitText=n,this.view.addChild(n));let r=e/_c.hitNumberMs;n.visible=!0,n.text=`-${this.params.lastHitDamage}${t.suffix}`,n.style.fill=t.color,n.style.fontSize=t.fontSize,n.alpha=1-r,n.position.set(0,-this.getRadius()-40-_c.hitNumberRisePx*r),n.scale.set(t.pop?1+.5*Math.max(0,1-r*5):1)}drawFalling(e){let{dropInMs:t}=this.params,n=xu({dropInMs:t,dropMs:uc.dropMs,startScale:uc.startScale}),r=e.getChildByLabel(yd);e.scale.set(n),r&&(r.scale.set(1/n),r.visible=t>0,r.alpha=.6*(1-(n-1)/(uc.startScale-1)))}getRadius(){return ic[this.params.size].radius}getProcessing(){let{cut:e,cooked:t,mashHp:n,maxMashHp:r}=this.params;return{cut:e,cooked:t,mashHp:n,maxMashHp:r}}getToppings(){return Du(this.params)}getLookKey(){return vd({processing:this.getProcessing(),toppings:this.getToppings(),quality:this.params.quality,radius:this.getRadius(),crown:this.params.size===Wu.King})}redrawIfChanged(){let e=this.getLookKey();e!==this.drawnKey&&(this.drawnKey=e,ad({graphics:O.instanceOf(this.view,P),processing:this.getProcessing(),radius:this.getRadius(),toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===Wu.King,seed:this.params.potatoId}))}getMeter(){return this.params.size===Wu.King?hu.meter:qu}update({msSinceLastExecute:t}){if(this.updateHitNumber(),this.params.served||this.params.carriedBySeagull)return;if(this.params.dropInMs>0){this.params.dropInMs=bu({dropInMs:this.params.dropInMs,msSinceLastExecute:t}),this.drawFalling(this.view);return}let n=Jc(this.state.level,this.params.pathId),r=[];for(let t of this.state.entityStore.getEntities(e))t!==this&&t.params.pathId===this.params.pathId&&!t.params.carriedBySeagull&&!t.params.served&&t.params.dropInMs<=0&&t.params.distancePx>this.params.distancePx&&r.push(t.params.distancePx);this.params.distancePx=Math.max(this.params.distancePx,vu({next:this.params.distancePx+this.state.runState.beltSpeedPxPerMs*t,aheadDistances:r,spacingPx:_u.queueSpacingPx,endPx:Wc(n)})),this.moveToDistance(),this.redrawIfChanged(),this.applyMotion()}applyMotion(){let e=this.getRadius(),t=Uu({elapsedMs:this.state.runState.elapsedMs,potatoId:this.params.potatoId,radius:e,lastHitAtMs:this.params.lastHitAtMs});this.view.rotation=t.rotation,this.view.scale.set(t.scaleX,t.scaleY),this.view.pivot.set(0,-t.offsetY)}moveToDistance(){let e=Gc(Jc(this.state.level,this.params.pathId),this.params.distancePx);this.params.x=e.x,this.params.y=e.y}serveAtCounter(){let e=Jc(this.state.level,this.params.pathId),{sentBack:t}=Vu(this.state.runState,{processing:this.getProcessing(),ownerSlot:e.ownerSlot,value:ic[this.params.size].value,toppings:this.getToppings(),timesSentBack:this.params.timesSentBack,quality:this.params.quality,penaltyMultiplier:this.params.size===Wu.King?hu.penaltyMultiplier:1});t?(this.params.distancePx=0,this.params.passWaitMs=0,this.params.timesSentBack+=1,this.moveToDistance()):(this.params.served=!0,this.destroy())}},xd=function(e){return e.Masher=`masher`,e.Hammer=`hammer`,e.Water=`water`,e.Cricket=`cricket`,e}({}),Sd=Math.PI*2;function Cd(e,t,n){e.save(),e.scaleTransform(t.scaleX??1,t.scaleY??1),e.rotateTransform(t.rotation??0),e.translateTransform(t.x,t.y),n(),e.restore()}function wd(e,t,n,r=.7){W(e,{path:U(n),fill:t,outlineScale:r})}function Td(e){wd(e,B.caramel,{x:-4,y:-3,width:26,height:6,radius:3}),wd(e,B.stone,{x:-14,y:-9,width:10,height:18,radius:3});for(let t of[-4,4])W(e,{path:H({x:-9,y:t,rx:1.6,ry:1.6}),fill:B.slate,outline:!1,highlight:!1})}function Ed(e){wd(e,B.caramel,{x:-6,y:-3,width:30,height:6,radius:3}),wd(e,B.slate,{x:-16,y:-10,width:14,height:20,radius:3},.8);for(let t of[-6,0,6])W(e,{path:H({x:-14,y:t,rx:1.4,ry:1.4}),fill:B.stone,outline:!1,highlight:!1})}function Dd(e,t){let n=1+Math.sin(t*40)*.08;W(e,{path:H({x:0,y:0,rx:8*n,ry:8/n}),fill:B.sky,outlineScale:.7}),W(e,{path:H({x:11,y:-2,rx:3,ry:2.4}),fill:B.sky,outlineScale:.5})}function Od(e,{kind:t,x:n,y:r,progress:i,directionX:a,timeSec:o}){let s=mc.scale,c=a<0?-1:1;if(t===xd.Cricket){let t=i*3%1;Cd(e,{x:n,y:r,scaleX:c*s,scaleY:s},()=>{Kl(e,{timeSec:o,squash:1-.15*Math.sin(t*Math.PI),tilt:-Math.cos(t*Math.PI)*.5})})}else t===xd.Water?Cd(e,{x:n,y:r,scaleX:s,scaleY:s},()=>Dd(e,o)):Cd(e,{x:n,y:r,rotation:i*mc.spinTurns*Sd,scaleX:s,scaleY:s},()=>t===xd.Hammer?Ed(e):Td(e))}function kd(e,{kind:t,x:n,y:r,progress:i}){let a=t===xd.Water?B.sky:B.cream,o=6+i*12;G(e,{path(e){e.circle(n,r,o)},color:a,width:3*(1-i)+1,alpha:.9*(1-i)});for(let t of[-1,1])W(e,{path:H({x:n+t*o*.9,y:r-i*6,rx:2.2*(1-i),ry:2.2*(1-i)}),fill:a,outline:!1,highlight:!1,alpha:1-i})}function Ad(e){return e===xd.Cricket?mc.cricketFlightMs:mc.flightMs}function jd({projectile:e,elapsedMs:t}){let{from:n,to:r,kind:i,startMs:a}=e,o=t-a;if(o<0)return{phase:`waiting`};let s=Ad(i);if(o<s){let e=o/s,t=Math.hypot(r.x-n.x,r.y-n.y),a=i===xd.Cricket?mc.cricketArcPx:Math.min(mc.arcMaxPx,Math.max(mc.arcMinPx,t*mc.arcFraction));return{phase:`flight`,progress:e,x:n.x+(r.x-n.x)*e,y:n.y+(r.y-n.y)*e-a*4*e*(1-e)}}return i!==xd.Cricket&&o<s+mc.puffMs?{phase:`puff`,progress:(o-s)/mc.puffMs,x:r.x,y:r.y}:{phase:`done`}}var Md=[];function Nd(e){for(Md.push({kind:e.kind,from:{...e.from},to:{...e.to},startMs:e.startMs});Md.length>mc.maxLive;)Md.shift()}var Pd,Fd=Ye({modName:`projectile-layer`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage;if(!t||!e.runState)return;(!Pd||Pd.destroyed)&&(Pd=new P,Pd.zIndex=900,t.sortableChildren=!0,t.addChild(Pd));let{elapsedMs:n}=e.runState;Pd.clear();for(let e=Md.length-1;e>=0;e--){let t=Md[e];if(!t)continue;let r=jd({projectile:t,elapsedMs:n});r.phase===`done`||r.phase===`waiting`?Md.splice(e,1):r.phase===`flight`?Od(Pd,{kind:t.kind,x:r.x,y:r.y,progress:r.progress,directionX:t.to.x-t.from.x,timeSec:n/1e3}):kd(Pd,{kind:t.kind,x:r.x,y:r.y,progress:r.progress})}}}),Id=40;function Ld({rollEdge:e,rollAlong:t}){return e<1/3?{x:t*k.width,y:-40}:e<2/3?{x:k.width+Id,y:t*k.height}:{x:t*k.width,y:k.height+Id}}function Rd(e){let t=[{x:0,y:e.y},{x:k.width,y:e.y},{x:e.x,y:0},{x:e.x,y:k.height}],n=t[0]??e,r=1/0;for(let i of t){let t=Math.hypot(i.x-e.x,i.y-e.y);t<r&&(n=i,r=t)}return{x:n.x,y:n.y}}function zd({from:e,to:t,stepPx:n}){let r=t.x-e.x,i=t.y-e.y,a=Math.hypot(r,i);return a<=n||a===0?{x:t.x,y:t.y}:{x:e.x+r/a*n,y:e.y+i/a*n}}var Bd=13,Vd=11,Hd=7,Ud=36,Wd={flying:{width:64,height:18,offsetY:44},walking:{width:56,height:14,offsetY:24}};function Gd({extend:e,side:t}){function n(n){return t*n*e}return e=>{e.moveTo(9,t*3).bezierCurveTo(9,n(22),0,n(34),-9,n(38)).lineTo(-15,n(33)).quadraticCurveTo(-14,n(26),-21,n(26)).quadraticCurveTo(-17,n(19),-24,n(17)).quadraticCurveTo(-18,n(10),-19,t*4).closePath()}}function Kd({extend:e,side:t}){function n(n){return t*n*e}return e=>{e.moveTo(-1,n(31)).lineTo(-9,n(38)).lineTo(-15,n(33)).quadraticCurveTo(-14,n(26),-21,n(26)).lineTo(-8,n(26)).closePath()}}function qd({fromX:e,fromY:t,toX:n,toY:r}){return i=>{i.moveTo(e,t).lineTo(n,r)}}function Jd(e,{x:t,y:n}){W(e,{path:H({x:t,y:n,rx:5,ry:2}),fill:`#ffffff`,alpha:.5,outline:!1,highlight:!1})}var Yd={approach:`approach`,escape:`escape`},Xd=class e extends su({key:`SeagullEntity`,paramsShape:wn(xs,t({flying:!1,hp:0,phase:``,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1})),paramsMap:{view:{x:!0,y:!0}}}){flipper;art;shadow;hpBar;lastSeenCarryingId=0;lastSeenX;createView(){let e=new pt,t=new pt,n=this.params.flying?Wd.flying:Wd.walking,r=ul(e,n);r.pivot.y=n.offsetY,r.y=n.offsetY;let i=new P;t.addChild(i),e.addChild(t);let a=new P;return e.addChild(a),this.flipper=t,this.art=i,this.shadow=r,this.hpBar=a,{view:e}}drawGull(){let e=O.isDefined(this.art),{flying:t,fed:n,carryingPotatoId:r}=this.params,i=this.state.runState.elapsedMs/1e3,a=i*(t?Vd:Hd),o=t?.25+.75*Math.abs(Math.sin(a)):0,s=t?-Math.sin(a)*2.5:-Math.abs(Math.sin(a))*2.5,c=t?Math.sin(a)*.03:Math.sin(a)*.12,l=B.pumpkin;if(e.clear(),r!==0){for(let t of[-4,5])G(e,{path:qd({fromX:t,fromY:8,toX:t*.8+4,toY:20}),color:l,width:2.6,outline:!0});G(e,{path:qd({fromX:0,fromY:12,toX:0,toY:28}),color:l,width:2.4,outline:!0})}else if(t)G(e,{path:qd({fromX:-4,fromY:9,toX:-9,toY:14}),color:l,width:2.4,outline:!0}),G(e,{path:qd({fromX:4,fromY:9,toX:-4,toY:15}),color:l,width:2.4,outline:!0});else for(let[t,n]of[[0,-5],[1,5]]){let r=Math.sin(a+t*Math.PI)*4,i=Math.max(0,Math.cos(a+t*Math.PI))*3,o=n+r*.5;G(e,{path:qd({fromX:n,fromY:7,toX:o,toY:19-i}),color:l,width:3,outline:!0}),W(e,{path:sl([[o-1,19-i],[o+9,20-i],[o-2,22-i]]),fill:l,outlineScale:.5})}if(t)for(let t of[-1,1]){let n=Math.max(.1,o);W(e,{path:Gd({extend:n,side:t}),fill:B.sage,outlineScale:.8}),W(e,{path:Kd({extend:n,side:t}),fill:B.walnut,outline:!1,highlight:!1})}return W(e,{path:sl([[-16,-5],[-33,-3],[-34,3],[-16,6]]),fill:B.sage,outlineScale:.8}),W(e,{path:U({x:-34,y:-3,width:4,height:6,radius:1}),fill:B.walnut,outline:!1,highlight:!1}),W(e,{path:H({x:0,y:0,rx:22,ry:Bd}),fill:B.cream}),W(e,{path:H({x:14,y:-5,rx:9,ry:9}),fill:B.cream}),W(e,{path:H({x:6,y:-1,rx:14,ry:10}),fill:B.cream,outline:!1,highlight:!1}),Jd(e,{x:-4,y:-7}),t||(W(e,{path(e){e.moveTo(8,-3).bezierCurveTo(0,-9,-14,-8,-27,-2).lineTo(-19,5).bezierCurveTo(-8,8,2,6,8,-3).closePath()},fill:B.sage,outlineScale:.9}),W(e,{path:sl([[-27,-2],[-19,5],[-14,1],[-20,-3]]),fill:B.walnut,outline:!1,highlight:!1})),W(e,{path:sl([[21,-8],[34,-4],[21,-1]]),fill:B.pumpkin,outlineScale:.85}),W(e,{path:H({x:27,y:-3.2,rx:1.3,ry:1.3}),fill:B.tomato,outline:!1,highlight:!1}),i%3.1<.1?G(e,{path:qd({fromX:14,fromY:-8,toX:19,toY:-8}),color:B.bark,width:1.5}):(W(e,{path:H({x:17,y:-8,rx:2.5,ry:2.5}),fill:B.bark,outline:!1,highlight:!1}),W(e,{path:H({x:17.8,y:-8.8,rx:.9,ry:.9}),fill:`#ffffff`,outline:!1,highlight:!1})),n&&(G(e,{path:qd({fromX:36,fromY:-3,toX:40,toY:0}),color:B.pine,width:1.2}),W(e,{path:H({x:36,y:-3,rx:5,ry:2.5}),fill:B.moss,outlineScale:.5})),{bob:s,rotation:c,phase:a,flapAmount:o}}findPotato(e){if(e!==0){for(let t of this.state.entityStore.getEntities(bd))if(t.params.potatoId===e)return t}}pickNewTarget(){let t=new Set;for(let n of this.state.entityStore.getEntities(e))n!==this&&n.params.phase===Yd.approach&&t.add(n.params.targetPotatoId);let n;for(let e of this.state.entityStore.getEntities(bd))e.params.served||e.params.carriedBySeagull||t.has(e.params.potatoId)||e.params.dropInMs>0||e.params.size===Wu.King||(!n||e.params.distancePx>n.params.distancePx)&&(n=e);return n}startEscape(){let e=Rd(this.params);this.params.phase=Yd.escape,this.params.escapeX=e.x,this.params.escapeY=e.y}takeHit(e){if(this.params.hp<=0||(this.params.hp-=e,this.params.hp>0))return;let t=this.findPotato(this.params.carryingPotatoId);t&&(t.params.carriedBySeagull=!1,t.view.pivot.set(0,0)),Mu(this.state.runState,{amount:dc.bountyCoins,reason:`Seagull bonk`,x:this.params.x,y:this.params.y}),this.destroy()}feedCricket(){if(this.params.hp<=0||this.params.fed)return;let e=this.findPotato(this.params.carryingPotatoId);e&&(e.params.carriedBySeagull=!1,e.view.pivot.set(0,0)),this.params.fed=!0,this.params.carryingPotatoId=0,this.params.targetPotatoId=0,this.startEscape(),Mu(this.state.runState,{amount:dc.bountyCoins,reason:`Seagull fed`,x:this.params.x,y:this.params.y})}update({msSinceLastExecute:e}){if(this.params.hp<=0)return;let t=(this.params.flying?dc.flySpeedPxPerMs:dc.walkSpeedPxPerMs)*e;if(this.params.phase===Yd.approach){let e=this.findPotato(this.params.targetPotatoId);if((!e||e.params.served||e.params.carriedBySeagull||e.params.dropInMs>0)&&(e=this.pickNewTarget(),this.params.targetPotatoId=e?.params.potatoId??0),!e){this.startEscape();return}let n=zd({from:this.params,to:e.params,stepPx:t});this.params.x=n.x,this.params.y=n.y,Math.hypot(e.params.x-n.x,e.params.y-n.y)<=dc.grabRadiusPx&&(e.params.carriedBySeagull=!0,this.params.carryingPotatoId=e.params.potatoId,this.startEscape());return}let n=zd({from:this.params,to:{x:this.params.escapeX,y:this.params.escapeY},stepPx:t});this.params.x=n.x,this.params.y=n.y;let r=this.findPotato(this.params.carryingPotatoId);r&&(r.params.x=n.x,r.params.y=n.y),n.x===this.params.escapeX&&n.y===this.params.escapeY&&(r&&(r.destroy(),Bu(this.state.runState)),this.destroy())}render(){let{flipper:e,hpBar:t,shadow:n}=this;if(!e||!t||!n)return;let{x:r,carryingPotatoId:i,flying:a,hp:o}=this.params;i!==0&&this.lastSeenCarryingId===0&&this.state.runState.status===z.Playing&&Hc(jc.Squawk),this.lastSeenCarryingId=i,this.lastSeenX!=null&&r!==this.lastSeenX&&(e.scale.x=r>this.lastSeenX?1:-1),this.lastSeenX=r;let{bob:s,rotation:c,phase:l,flapAmount:u}=this.drawGull();e.y=s,e.rotation=c,a&&(n.scale.set(1+.2*u),n.alpha=.75-.25*u);let d=this.findPotato(i);d&&d.view.pivot.set(-(e.scale.x*2+Math.sin(l*.5)*4),-(s+Ud)),t.clear(),o<dc.hp&&(t.rect(-20,-39,40,6).fill({color:`rgba(0,0,0,0.6)`}),t.rect(-20,-39,40*Math.max(0,o)/dc.hp,6).fill({color:`#e53935`}))}};function Zd(e,t){let n=t.map((e,t)=>({candidate:e,index:t})).filter(({candidate:t})=>Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0),r=e.appliesEffect,i=r?n.filter(({candidate:e})=>!e.processing[r]):[],a=i.length>0?i:n,o=-1,s=-1/0;for(let{candidate:e,index:t}of a)e.distancePx>s&&(o=t,s=e.distancePx);return o}function Qd(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0&&n.push(r)}),n}function $d(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&n.push(r)}),n}function ef(e,t){let n=-1,r=!1,i=1/0;for(let a of $d(e,t)){let o=t[a];if(!o)continue;let s=Math.hypot(o.x-e.x,o.y-e.y);(n<0||o.carrying&&!r||o.carrying===r&&s<i)&&(n=a,r=o.carrying,i=s)}return n}function tf(e,t){let n=t.map((e,t)=>({gull:e,index:t})).filter(({gull:e})=>!e.fed&&e.hp>0);return n[ef(e,n.map(({gull:e})=>e))]?.index??-1}function nf(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=Tl(e.params.towerType,e.params.level,e.params.wear),r=[...e.state.entityStore.getEntities(Xd)],i=r[tf({x:e.params.x,y:e.params.y,rangePx:n.rangePx},r.map(e=>({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0,fed:e.params.fed,hp:e.params.hp})))];i&&(i.feedCricket(),e.params.wear=vl({wear:e.params.wear,amount:yl(e.params.towerType)}),e.params.cooldownRemainingMs=n.cooldownMs,e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=i.params.x,e.params.lastTargetY=i.params.y)}var rf={rotationMs:5e3,pushBackPx:120,debounceMs:600,armHalfWidthPx:8};function af(e){return(e.elapsedMs-e.builtAtMs)/rf.rotationMs*Math.PI*2}function of({center:e,angle:t,lengthPx:n}){return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function sf({point:e,a:t,b:n}){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a===0?0:Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a));return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}function cf({potato:e,potatoRadius:t,armStart:n,armEnd:r,lastSwipedAtMs:i,elapsedMs:a}){let o=sf({point:e,a:n,b:r})<=rf.armHalfWidthPx+t,s=i>=0&&a-i<rf.debounceMs;return o&&!s}function lf(e,t){e.params.wear=vl({wear:e.params.wear,amount:bl(e.params.towerType)*t/1e3});let{elapsedMs:n}=e.state.runState,r={x:e.params.x,y:e.params.y},i=of({center:r,angle:af({elapsedMs:n,builtAtMs:e.params.builtAtMs}),lengthPx:Tl(e.params.towerType,e.params.level).rangePx});for(let t of e.state.entityStore.getEntities(bd)){let{params:a}=t;if(a.served||a.carriedBySeagull||a.dropInMs>0||a.size===Wu.King||!cf({potato:a,potatoRadius:ic[a.size].radius,armStart:r,armEnd:i,lastSwipedAtMs:a.lastSwipedAtMs,elapsedMs:n}))continue;a.distancePx=Math.max(0,a.distancePx-rf.pushBackPx*gl(e.params.wear));let o=Gc(Jc(e.state.level,a.pathId),a.distancePx);a.x=o.x,a.y=o.y,a.lastSwipedAtMs=n,e.params.lastProcessedAtMs=n}}function uf({origin:e,angleDeg:t,lengthPx:n}){let r=t*Math.PI/180;return{start:{x:e.x,y:e.y},end:{x:e.x+Math.cos(r)*n,y:e.y+Math.sin(r)*n}}}function df({point:e,radius:t,segment:n}){return sf({point:e,a:n.start,b:n.end})<=ou.lineHalfWidthPx+t}function ff(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=Tl(e.params.towerType,e.params.level,e.params.wear),r=uf({origin:{x:e.params.x,y:e.params.y},angleDeg:e.params.angleDeg,lengthPx:n.rangePx}),i=[...e.state.entityStore.getEntities(bd)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),a=!1;for(let t of i){if(!df({point:t.params,radius:ic[t.params.size].radius,segment:r}))continue;a=!0,t.recordHit({towerType:e.params.towerType,tower:e.params});let n=t.getProcessing();pu(n,e.params.towerType,e.params),t.params.cut=n.cut,t.params.cooked=n.cooked,t.params.mashHp=n.mashHp}for(let t of e.state.entityStore.getEntities(Xd))t.params.hp>0&&!t.params.fed&&df({point:t.params,radius:0,segment:r})&&(a=!0,t.takeHit(n.damage));e.params.cooldownRemainingMs=n.cooldownMs,a&&(e.params.wear=vl({wear:e.params.wear,amount:yl(e.params.towerType)}),e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=r.end.x,e.params.lastTargetY=r.end.y)}function pf({origin:e,aimAt:t,point:n,lengthPx:r,halfAngleDeg:i}){let a=n.x-e.x,o=n.y-e.y,s=Math.hypot(a,o);if(s>r)return!1;if(s===0)return!0;let c=Math.atan2(t.y-e.y,t.x-e.x),l=Math.atan2(o,a)-c;return l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)<=i*Math.PI/180+1e-9}function mf(e,t){let{rangePx:n}=Tl(e.params.towerType,e.params.level),r=wl(e.params.level)*gl(e.params.wear),i={x:e.params.x,y:e.params.y},a=[...e.state.entityStore.getEntities(bd)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),o;for(let e of a)e.params.mashHp>0&&Math.hypot(e.params.x-i.x,e.params.y-i.y)<=n&&(!o||e.params.distancePx>o.params.distancePx)&&(o=e);if(!o)return;let s={x:o.params.x,y:o.params.y},c=t/1e3;e.params.wear=vl({wear:e.params.wear,amount:bl(e.params.towerType)*c});for(let t of a)pf({origin:i,aimAt:s,point:t.params,lengthPx:n,halfAngleDeg:pl.microwaveConeHalfAngleDeg})&&(t.recordHit({towerType:e.params.towerType,tower:e.params,minIntervalMs:_c.continuousHitIntervalMs}),t.params.mashHp=Math.max(0,t.params.mashHp-pl.microwaveDamagePerSecond*r*c),t.params.quality=Math.max(0,t.params.quality-pl.microwaveQualityPerSecond*c));e.params.lastTargetX=s.x,e.params.lastTargetY=s.y,e.params.lastProcessedAtMs=e.state.runState.elapsedMs}function hf({level:e,towers:t,point:n}){let r=fc.radius;if(n.x<r||n.x>k.width-r||n.y<r||n.y>k.height-r)return{valid:!1,reason:`Out of bounds`};if(e.paths.some(e=>qc(e,n)<e.widthPx/2+r))return{valid:!1,reason:`Too close to the path`};let{restaurant:i}=e,a=i.sizePx/2+r;return Math.abs(n.x-i.x)<a&&Math.abs(n.y-i.y)<a?{valid:!1,reason:`On the restaurant`}:t.some(e=>Math.hypot(e.x-n.x,e.y-n.y)<2*r)?{valid:!1,reason:`Too close to another tower`}:{valid:!0}}function gf(e,t){return e>=xc.towerCost[t]}function _f({tower:e,pointerWorld:t,selectedTowerType:n,selectedTowerId:r}){return r!=null&&r===e.towerId||n===e.towerType||!!t&&Math.hypot(t.x-e.x,t.y-e.y)<=fc.radius}var vf={[K.Knife]:jc.Chop,[K.Boiler]:jc.Boil,[K.Masher]:jc.Squish,[K.Microwave]:jc.Boil,[K.CricketTrap]:jc.Build,[K.Swiper]:jc.Chop},yf=5,bf=16,xf=8,Sf=44,Cf=6,wf=class extends su({key:`TowerEntity`,paramsShape:wn(xs,t({towerType:Ie(K),towerId:0,level:1,builtAtMs:0,ownerSlot:0,cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:0,wear:0})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){rangeView;body;pips;selection;wearBar;cracks;wrench;drawnLevel=0;lastSeenProcessedAtMs;createView(){let e=new pt,t=new P;e.addChild(t);let n=new P;e.addChild(n);let r=new P;e.addChild(r);let i=new P;e.addChild(i);let a=new P;e.addChild(a);let o=new P,s=fc.radius;o.moveTo(-s*.6,-s*.7).lineTo(-s*.1,-s*.1).lineTo(-s*.3,s*.2).lineTo(s*.2,s*.8).moveTo(s*.7,-s*.5).lineTo(s*.2,-s*.05).lineTo(s*.5,s*.4).stroke({color:B.bark,width:3,cap:`round`,join:`round`}),o.visible=!1,e.addChild(o);let c=new Qo({text:`🔧`,style:{fontSize:28}});return c.anchor.set(.5),c.visible=!1,e.addChild(c),this.rangeView=t,this.body=n,this.pips=i,this.wearBar=a,this.cracks=o,this.wrench=c,this.selection=r,this.drawnLevel=0,{view:e}}update({msSinceLastExecute:e}){let{behavior:t}=Sl[this.params.towerType];if(t===`gull-trap`){nf(this,e);return}if(t===`cone`){mf(this,e);return}if(t===`swipe`){lf(this,e);return}if(t===`line`){ff(this,e);return}if(this.params.cooldownRemainingMs=Math.max(0,this.params.cooldownRemainingMs-e),this.params.cooldownRemainingMs>0)return;let n=Sl[this.params.towerType],r=Tl(this.params.towerType,this.params.level,this.params.wear),i=[...this.state.entityStore.getEntities(Xd)].filter(e=>e.params.hp>0&&!e.params.fed),a=i.map(e=>({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0})),o={x:this.params.x,y:this.params.y,rangePx:r.rangePx},s=(n.areaOfEffect?$d(o,a):[ef(o,a)].filter(e=>e>=0)).flatMap(e=>i[e]??[]);if(!n.areaOfEffect&&s[0]){let e=s[0];this.params.lastTargetX=e.params.x,this.params.lastTargetY=e.params.y,e.takeHit(r.damage),this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs;return}let c=[...this.state.entityStore.getEntities(bd)].filter(e=>!e.params.served&&!e.params.carriedBySeagull&&e.params.dropInMs<=0),l=c.map(e=>({x:e.params.x,y:e.params.y,distancePx:e.params.distancePx,processing:e.getProcessing()}));if(n.areaOfEffect){let e=Qd({x:this.params.x,y:this.params.y,rangePx:r.rangePx},l);if(e.length===0&&s.length===0)return;for(let e of s)e.takeHit(r.damage);for(let t of e){let e=c[t];if(!e)continue;e.recordHit({towerType:this.params.towerType,tower:this.params});let n=e.getProcessing();pu(n,this.params.towerType,this.params),e.params.cut=n.cut,e.params.cooked=n.cooked,e.params.mashHp=n.mashHp}this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs;let t=[...e.flatMap(e=>c[e]??[]),...s],n=Math.max(1,t.length);this.params.lastTargetX=t.reduce((e,t)=>e+t.params.x,0)/n,this.params.lastTargetY=t.reduce((e,t)=>e+t.params.y,0)/n;return}let u=c[Zd({x:this.params.x,y:this.params.y,rangePx:r.rangePx,appliesEffect:n.appliesEffect},l)];if(!u)return;u.recordHit({towerType:this.params.towerType,tower:this.params});let d=u.getProcessing();pu(d,this.params.towerType,this.params),u.params.cut=d.cut,u.params.cooked=d.cooked,u.params.mashHp=d.mashHp,this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs,this.params.lastTargetX=u.params.x,this.params.lastTargetY=u.params.y}wearFromUse(){this.params.wear=vl({wear:this.params.wear,amount:yl(this.params.towerType)})}renderWear(){let{wearBar:e,cracks:t,wrench:n,body:r}=this;if(!e||!t||!n||!r)return;let{wear:i}=this.params,a=i>=hl.maxWear,o=fc.radius;if(e.clear(),i>0){let t=o+xf+14+yf+6,n=i/hl.maxWear;W(e,{path:U({x:-22,y:t,width:Sf,height:Cf,radius:Cf/2}),fill:B.walnut,highlight:!1,outlineScale:.6}),W(e,{path:U({x:-22,y:t,width:Math.max(Cf,Sf*n),height:Cf,radius:Cf/2}),fill:n<.5?B.meadow:n<.85?B.butter:B.tomato,outline:!1})}t.visible=a,r.alpha=a?.75:1,n.visible=a,n.y=-o-22+Math.sin(this.state.runState.elapsedMs/200)*5}drawLevelParts(){let{rangeView:e,pips:t,selection:n}=this;if(!e||!t||!n)return;let{towerType:r,level:i}=this.params,a=Sl[r],{rangePx:o}=Tl(r,i);if(this.drawnLevel=i,a.behavior===`line`){let t=uf({origin:{x:0,y:0},angleDeg:this.params.angleDeg,lengthPx:o});e.clear().moveTo(t.start.x,t.start.y).lineTo(t.end.x,t.end.y).stroke({color:ou.lineColor,alpha:ou.lineAlpha,width:ou.lineWidthPx,cap:`round`})}else e.clear().circle(0,0,o).fill({color:a.color,alpha:.1}).stroke({color:B.cream,alpha:.45,width:3});t.clear();for(let e=0;e<i;e++)W(t,{path:H({x:(e-(i-1)/2)*bf,y:fc.radius+xf+14,rx:yf,ry:yf}),fill:B.butter,outlineScale:.6});G(n.clear(),{path(e){e.circle(0,0,fc.radius+xf)},color:B.cream,width:4,outline:!0})}throwProjectile(){let{towerType:e,level:t,x:n,y:r,lastTargetX:i,lastTargetY:a,lastProcessedAtMs:o}=this.params,s;e===K.Masher?s=t>=mc.hammerLevel?xd.Hammer:xd.Masher:e===K.Boiler?s=xd.Water:e===K.CricketTrap&&(s=xd.Cricket),s&&Nd({kind:s,from:{x:n,y:r},to:{x:i,y:a},startMs:o})}render(){let{body:e,rangeView:t}=this;if(!e||!t)return;this.drawnLevel!==this.params.level&&this.drawLevelParts(),t.visible=Sl[this.params.towerType].behavior===`line`||_f({tower:this.params,pointerWorld:this.state.ui.pointerWorld,selectedTowerType:this.state.ui.selectedTowerType,selectedTowerId:this.state.ui.selectedTowerId}),this.renderWear(),this.selection&&(this.selection.visible=this.state.ui.selectedTowerId===this.params.towerId);let{lastProcessedAtMs:n,lastTargetX:r,lastTargetY:i,x:a,y:o,towerType:s}=this.params,{elapsedMs:c}=this.state.runState;this.lastSeenProcessedAtMs!=null&&n!==this.lastSeenProcessedAtMs&&n>=0&&this.state.runState.status===z.Playing&&(Hc(vf[s]),this.throwProjectile()),this.lastSeenProcessedAtMs=n;let l=c-n,u=pc.attackMs[s];Xl(e,{towerType:s,attack:n>=0&&l>=0&&l<u?l/u:-1,timeSec:c/1e3,aimX:r-a,aimY:i-o,rangePx:Tl(s,this.params.level).rangePx,swiperAngle:af({elapsedMs:c,builtAtMs:this.params.builtAtMs})})}},Z=function(e){return e.StartRun=`start-run`,e.BeginRun=`begin-run`,e.PlaceTower=`place-tower`,e.UpgradeTower=`upgrade-tower`,e.SellTower=`sell-tower`,e.ServiceTower=`service-tower`,e.ApplyTopping=`apply-topping`,e.TogglePause=`toggle-pause`,e.SetSpeed=`set-speed`,e.ArmSpeedReset=`arm-speed-reset`,e}({});function Q(e,t){if(!e.multiplayerP2pLockStep)throw Error(`Cannot send '${t.type}': lockstep mod is missing.`);e.multiplayerP2pLockStep.multiplayerController.act(t)}var Tf=`colcannon-fodder-level`;function Ef(){try{return nl(globalThis.localStorage.getItem(`colcannon-fodder-level`)??void 0).levelId}catch{return tl.levelId}}function Df(e){try{globalThis.localStorage.setItem(Tf,e)}catch{}}function Of({accumulator:e,speed:t}){let n=e+t,r=Math.floor(n);return{steps:r,accumulator:n-r}}function kf(e){return Cc.speeds.includes(e)}function Af(e){let t=Cc.speeds.indexOf(e);return Cc.speeds[(t+1)%Cc.speeds.length]??Cc.speeds[0]}function jf(e){return`${e}x`}var Mf=new WeakMap;function Nf(e){let t=Mf.get(e);if(t)return t;let n={selectTowerType(t){e.ui&&(e.ui.selectedTowerType=t,e.ui.selectedTowerId=void 0,e.ui.selectedTopping=void 0)},selectTopping(t){e.ui&&(e.ui.selectedTopping=t,e.ui.selectedTowerType=void 0,e.ui.selectedTowerId=void 0)},selectTower(t){e.ui&&(e.ui.selectedTowerId=t,e.ui.selectedTowerType=void 0,e.ui.selectedTopping=void 0)},upgradeTower(t){Q(e,{type:Z.UpgradeTower,towerId:t})},serviceTower(t){Q(e,{type:Z.ServiceTower,towerId:t})},sellTower(t){Q(e,{type:Z.SellTower,towerId:t}),e.ui&&(e.ui.selectedTowerId=void 0)},beginRun(){Q(e,{type:Z.BeginRun})},togglePause(){Q(e,{type:Z.TogglePause})},cycleSpeed(){Q(e,{type:Z.SetSpeed,speed:Af(e.runState?.speed??1)})},speedUntilIncome(){(e.runState?.speed??1)===1&&Q(e,{type:Z.SetSpeed,speed:Cc.untilIncomeSpeed}),Q(e,{type:Z.ArmSpeedReset})},setVolume:Ac,selectLevel(t){Df(t),Q(e,{type:Z.StartRun,ready:!0,levelId:t,mode:e.runState?.mode})},selectMode(t){Q(e,{type:Z.StartRun,ready:!0,levelId:e.runState?.levelId??tl.levelId,mode:t})},goToMainMenu(){Q(e,{type:Z.StartRun,ready:!0,levelId:e.runState?.levelId??tl.levelId,mode:e.runState?.mode})},restartRun(){Q(e,{type:Z.StartRun,levelId:e.runState?.levelId??tl.levelId,mode:e.runState?.mode})}};return Mf.set(e,n),n}var Pf={potatoBase:8,potatoPerWave:3,spawnIntervalBaseMs:3500,spawnIntervalPerWaveMs:180,spawnIntervalMinMs:700,speedBase:.07,speedPerWave:.004,speedMax:.14,largeWeightPerWave:.05,largeWeightMax:.7,smallWeightStart:.5,smallWeightPerWave:.05,wavesPerSeagull:2,chuteSharePerWave:.05,chuteShareMax:.35,clumpChancePerWave:.04,clumpChanceMax:.4,wavesPerClumpExtra:3,clumpMaxExtraMax:5,extraSpawnsPerWave:.015,extraSpawnsMax:.15,bossEveryWaves:5,orders:{wavesPerOpenOrder:3,maxOpenBase:1,maxOpenMax:4,intervalBaseMs:12e3,intervalPerWaveMs:500,intervalMinMs:5e3,lifetimeBaseMs:35e3,lifetimePerWaveMs:1e3,lifetimeMinMs:18e3,allDishesFromWave:3}},Ff={storageKey:`colcannon-fodder-records`,hallSize:5};function If(){return{bestScore:0,bestStars:0,wins:0,champs:0,bestWaves:0}}function Lf(){return{levels:{},hall:[]}}function Rf(e,t,n){return e.levels[t]?.[n]??If()}function zf(e){return typeof e==`number`&&Number.isFinite(e)&&e>0?e:0}function Bf(e){return typeof e==`object`&&e?e:{}}function Vf(e){let t=Bf(e);return{bestScore:zf(t.bestScore),bestStars:zf(t.bestStars),wins:zf(t.wins),champs:zf(t.champs),bestWaves:zf(t.bestWaves)}}function Hf(e){let t=Bf(e),n=t.mode;if(!(typeof t.levelId!=`string`||n!==`campaign`&&n!==`endless`))return{levelId:t.levelId,mode:n,score:zf(t.score),stars:zf(t.stars),dateMs:zf(t.dateMs)}}function Uf(e){let t=Lf();if(!e)return t;try{let n=Bf(JSON.parse(e));for(let[e,r]of Object.entries(Bf(n.levels))){let n=Bf(r);t.levels[e]={campaign:Vf(n.campaign),endless:Vf(n.endless)}}Array.isArray(n.hall)&&(t.hall=n.hall.map(Hf).filter(e=>!!e).slice(0,Ff.hallSize))}catch{return Lf()}return t}function Wf(e,t){let n=Rf(e,t.levelId,t.mode);return t.score>n.bestScore||t.stars>n.bestStars||t.mode===`endless`&&t.wavesReached>n.bestWaves}function Gf(e){return e.won&&e.stars>=pl.mashChampStars}function Kf(e,t){let n=Rf(e,t.levelId,t.mode),r=e.levels[t.levelId],i=[...e.hall];return t.score>0&&i.push({levelId:t.levelId,mode:t.mode,score:t.score,stars:t.stars,dateMs:t.dateMs}),i.sort((e,t)=>t.score-e.score||t.stars-e.stars||e.dateMs-t.dateMs),{levels:{...e.levels,[t.levelId]:{campaign:r?.campaign??If(),endless:r?.endless??If(),[t.mode]:{bestScore:Math.max(n.bestScore,t.score),bestStars:Math.max(n.bestStars,t.stars),wins:n.wins+ +!!t.won,champs:n.champs+ +!!Gf(t),bestWaves:Math.max(n.bestWaves,t.wavesReached)}}},hall:i.slice(0,Ff.hallSize)}}function qf(e){for(let t of el)try{let n=Number(globalThis.localStorage.getItem(`colcannon-fodder-endless-best:${t.levelId}`)??0);if(Number.isFinite(n)&&n>0){let r=e.levels[t.levelId]??{campaign:If(),endless:If()};r.endless.bestWaves=Math.max(r.endless.bestWaves,n),e.levels[t.levelId]=r}}catch{return}}var Jf;function Yf(){if(!Jf){try{Jf=Uf(globalThis.localStorage.getItem(Ff.storageKey))}catch{Jf=Lf()}qf(Jf)}return Jf}var Xf=new WeakMap;function Zf(e,t){if(e.status!==z.Won&&e.status!==z.Lost)return;let n=Xf.get(e);if(n!=null)return n;let r={levelId:e.levelId,mode:e.mode,won:e.status===z.Won,dateMs:Date.now(),...t},i=Yf(),a=Wf(i,r);Jf=Kf(i,r),Xf.set(e,a);try{globalThis.localStorage.setItem(Ff.storageKey,JSON.stringify(Jf))}catch{}return a}function Qf(e){let t=Pf,n=Math.min(t.largeWeightMax,t.largeWeightPerWave*e),r=Math.max(0,t.smallWeightStart-t.smallWeightPerWave*e);return{potatoCount:t.potatoBase+t.potatoPerWave*e,spawnIntervalMs:Math.max(t.spawnIntervalMinMs,t.spawnIntervalBaseMs-t.spawnIntervalPerWaveMs*e),speedPxPerMs:Math.min(t.speedMax,t.speedBase+t.speedPerWave*e),sizeWeights:{small:r,medium:Math.max(0,1-n-r),large:n},seagullCount:Math.floor(e/t.wavesPerSeagull),chuteShare:Math.min(t.chuteShareMax,t.chuteSharePerWave*e),clumpChance:Math.min(t.clumpChanceMax,t.clumpChancePerWave*e),clumpMaxExtra:Math.min(t.clumpMaxExtraMax,Math.floor(e/t.wavesPerClumpExtra)),extraSpawnsPerSecond:Math.min(t.extraSpawnsMax,t.extraSpawnsPerWave*e),bossCount:+(e%t.bossEveryWaves===0),bossHp:gu(Math.max(0,e/t.bossEveryWaves-1)),orders:{maxOpen:Math.min(t.orders.maxOpenMax,t.orders.maxOpenBase+Math.floor(e/t.orders.wavesPerOpenOrder)),intervalMs:Math.max(t.orders.intervalMinMs,t.orders.intervalBaseMs-t.orders.intervalPerWaveMs*e),lifetimeMs:Math.max(t.orders.lifetimeMinMs,t.orders.lifetimeBaseMs-t.orders.lifetimePerWaveMs*e),dishes:e>=t.orders.allDishesFromWave?Object.values(wu):Sc.byWave[e-1]?.dishes??Object.values(wu)}}}function $f(e,t){if(e.mode===`endless`)return Qf(t+1);let n=lc.waves[t];if(!n)return;let r=Sc.byWave[t]??Sc.byWave[Sc.byWave.length-1];return{...n,bossHp:gu(0),orders:r??Qf(t+1).orders}}function ep(e){return e.wavePhase===`spawning`?e.waveIndex+1:e.waveIndex}function tp(e){let t=e.ui?.selectedTowerId;if(t!=null&&e.entityStore)for(let n of e.entityStore.getEntities(wf)){let{towerId:e,towerType:r,level:i,wear:a}=n.params;if(e===t)return{towerId:e,towerType:r,level:i,upgradeCost:i<ml.maxLevel?El(r,i+1):void 0,sellValue:Dl(r,i),wear:Math.round(a),serviceCost:_l(r),stats:Tl(r,i,a)}}}function np(e){let t=e.runState??al(),n=t.lastServing,r=t.lastOrderEvent,i=t.lastSteal,a=Object.values(t.scoreBySlot).reduce((e,t)=>e+t,0),o=ju(t.recentQualities),s=Zf(t,{score:a,stars:o,wavesReached:ep(t)});return{status:t.status,levelId:t.levelId,mode:t.mode,isBossWave:($f(t,t.waveIndex)?.bossCount??0)>0,wavesReached:ep(t),records:Yf(),newBest:s??!1,paused:t.paused,speed:t.speed,resetSpeedOnIncome:t.resetSpeedOnIncome,satisfaction:t.satisfaction,maxSatisfaction:sc.max,coins:t.coins,coinsEarned:t.coinsEarned,coinPopups:t.coinEvents.filter(e=>t.elapsedMs-e.atMs<vc.coinPopupMs).map(e=>({id:e.id,amount:e.amount,reason:e.reason,x:e.x,y:e.y,staggerPx:e.id%vc.coinPopupStaggerSlots*vc.coinPopupStaggerPx})),totalScore:a,potatoesServed:t.potatoesServed,waveNumber:t.waveIndex+1,waveCount:t.mode===`endless`?0:lc.waves.length,wavePhase:t.wavePhase,breakSecondsLeft:t.wavePhase===`break`?Math.ceil(t.breakRemainingMs/1e3):0,servingCounts:{...t.servingCounts},servingPopup:n&&t.elapsedMs-n.servedAtMs<vc.servingPopupMs?{result:n.result,id:n.sentBack?-n.servedAtMs-1:t.potatoesServed,scoreDelta:n.scoreDelta,satisfactionDelta:n.satisfactionDelta,progress:n.progress,sentBack:n.sentBack}:void 0,stealPopup:i&&t.elapsedMs-i.atMs<vc.servingPopupMs?{satisfactionDelta:i.satisfactionDelta,id:i.atMs}:void 0,potatoesStolen:t.potatoesStolen,towerIconsReady:iu(),selectedTowerType:e.ui?.selectedTowerType,selectedTopping:e.ui?.selectedTopping,selectedTower:tp(e),orders:t.orders.map(e=>{let n=Math.max(1,e.expiresAtMs-e.createdAtMs),r=Math.max(0,e.expiresAtMs-t.elapsedMs);return{orderId:e.orderId,dish:e.dish,secondsLeft:Math.ceil(r/1e3),fractionLeft:Math.min(1,Math.round(r/n*20)/20)}}),orderPopup:r&&t.elapsedMs-r.atMs<vc.servingPopupMs?{kind:r.kind,dish:r.dish,scoreDelta:r.scoreDelta,satisfactionDelta:r.satisfactionDelta,id:r.atMs}:void 0,bossBanner:t.lastBossSpawnAtMs>=0&&t.elapsedMs-t.lastBossSpawnAtMs<hu.bannerMs?{id:t.lastBossSpawnAtMs}:void 0,prestigeStars:o,muted:Lc(),volumes:{...kc()}}}var rp=`'Fredoka', sans-serif`,ip=l(Object.entries(B).map(([e,t])=>`--hud-${e}: ${t};`).join(`
`)),ap=j`
    background: var(--hud-cream);
    border: 4px solid var(--hud-bark);
    border-radius: 18px;
    box-shadow: 0 5px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
`,op=j`
    background: var(--hud-wheat);
    border: 4px solid var(--hud-bark);
    border-radius: 14px;
    box-shadow: 0 4px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
`,sp=j`
    background: var(--hud-butter);
    border-color: var(--hud-pumpkin);
`,cp=j`
    background: var(--hud-butter);
    border: 4px solid var(--hud-bark);
    border-radius: 16px;
    box-shadow: 0 5px 0 rgba(43, 26, 18, 0.45);
    color: var(--hud-bark);
    cursor: pointer;
    font-family: inherit;
    font-size: 36px;
    font-weight: 700;
    padding: 12px 48px;
`,lp=j`
    background: rgba(43, 26, 18, 0.6);
`,up=j`
    -webkit-text-stroke: 6px var(--hud-bark);
    font-weight: 700;
    paint-order: stroke fill;
`,dp=ke()({tagName:`hud-boss-banner`,styles:j`
        :host {
            display: block;
        }

        .banner {
            ${up}
            color: var(--hud-butter);
            font-size: 64px;
            left: 0;
            position: absolute;
            right: 0;
            text-align: center;
            top: 100px;
        }
    `,render({inputs:e}){return e.snapshot.bossBanner?D`
            <div class="banner">👑 The Russet King approaches!</div>
        `:D`
                ${M}
            `}}),fp=`display: inline-block; height: 1em; vertical-align: -0.16em; width: 1em;`;function pp({outer:e,inner:t}){let n=[];for(let r=0;r<10;r++){let i=-Math.PI/2+r*Math.PI/5,a=r%2?t:e;n.push(`${(Math.cos(i)*a).toFixed(2)},${(Math.sin(i)*a).toFixed(2)}`)}return n.join(` `)}var mp=pp({outer:26,inner:12});function hp(){return D`
        <svg style=${fp} viewBox="-26 -26 52 52">
            ${ue`
                <circle r="22" fill="${B.butter}" stroke="${B.bark}" stroke-width="4" />
                <circle r="16" fill="none" stroke="${B.caramel}" stroke-width="2.5" />
                <text y="1" font-size="22" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${B.caramel}" font-family="Fredoka, sans-serif">C</text>
                <ellipse cx="-8" cy="-9" rx="6" ry="2.6" fill="#fff" fill-opacity="0.55" transform="rotate(-40 -8 -9)" />
            `}
        </svg>
    `}function gp(e=1){let t=`star-left-half`,n=B.butter,r=B.sand;return D`
        <svg style=${fp} viewBox="-30 -30 60 60">
            ${ue`
                <defs>
                    <clipPath id="${t}"><rect x="-30" y="-30" width="30" height="60" /></clipPath>
                </defs>
                <polygon points="${mp}" fill="${e>=1?n:r}" stroke="${B.bark}" stroke-width="4.5" stroke-linejoin="round" />
                ${e>0&&e<1?ue`<polygon points="${mp}" fill="${n}" clip-path="url(#${t})" />`:``}
                ${e>0?ue`<ellipse cx="-7" cy="-9" rx="5" ry="2" fill="#fff" fill-opacity="0.6" transform="rotate(-45 -7 -9)" />`:``}
            `}
        </svg>
    `}function _p(e){return D`
        <span style="white-space: nowrap;">
            ${Array.from({length:pl.maxStars},(t,n)=>gp(Math.max(0,Math.min(1,Math.floor((e-n)*2)/2))))}
        </span>
    `}function vp(){return D`
        <svg style=${fp} viewBox="-40 -40 80 80">
            ${ue`
                <g transform="rotate(-45) translate(0 2)">
                    <rect x="-5.5" y="-8" width="11" height="44" rx="5.5" fill="${B.slate}" stroke="${B.bark}" stroke-width="3.5" />
                    <path d="M5 -15 L5 -33 A13 13 0 1 1 -5 -33 L-5 -15 Z" fill="${B.sage}" stroke="${B.bark}" stroke-width="3.5" stroke-linejoin="round" />
                    <ellipse cx="-8" cy="-24" rx="2.5" ry="6" fill="#fff" fill-opacity="0.6" />
                </g>
            `}
        </svg>
    `}var yp=ke()({tagName:`hud-coin-popups`,styles:j`
        :host {
            display: block;
        }

        .popup {
            animation: float-up ${vc.coinPopupMs}ms ease-out forwards;
            -webkit-text-stroke: 6px var(--hud-bark);
            font-weight: 700;
            paint-order: stroke fill;
            position: absolute;
            text-align: center;
            transform: translate(-50%, -100%);
            line-height: 1.1;
            white-space: nowrap;
        }

        .amount {
            color: var(--hud-butter);
            font-size: 34px;
        }

        .amount.spent {
            color: #ff8f73;
        }

        .amount.zero {
            color: var(--hud-stone);
        }

        .reason {
            color: var(--hud-cream);
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
                margin-top: -${vc.coinPopupRisePx}px;
                opacity: 0;
            }
        }
    `,render({inputs:e}){return D`
            ${e.snapshot.coinPopups.map(e=>or(e.id,D`
                        <div
                            class="popup"
                            style="left: ${e.x}px; top: ${e.y-vc.coinPopupOffsetPx-e.staggerPx}px"
                        >
                            <div
                                class="amount ${e.amount>0?``:e.amount<0?`spent`:`zero`}"
                            >
                                ${e.amount>0?`+`:``}${hp()} ${e.amount}
                            </div>
                            <div class="reason">${e.reason}</div>
                        </div>
                    `))}
        `}}),bp=ke()({tagName:`hud-mute`,styles:j`
        :host {
            display: block;
        }

        .icon {
            ${ap}
            border-radius: 14px;
            font-size: 40px;
            line-height: 1;
            padding: 6px 10px;
            position: absolute;
            right: 344px;
            top: 16px;
        }
    `,render({inputs:e}){return e.snapshot.muted?D`
            <div class="icon">🔇</div>
        `:D`
                ${M}
            `}}),xp=.3,Sp=ke()({tagName:`hud-orders`,styles:j`
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
            ${ap}
            border-radius: 14px;
            font-size: 28px;
            font-weight: 700;
            padding: 2px 0;
            text-align: center;
        }

        .ticket {
            background: var(--hud-cream);
            border: 3px solid var(--hud-bark);
            border-left: 10px solid var(--hud-tomato);
            border-radius: 6px 12px 12px 6px;
            box-shadow: 0 4px 0 rgba(43, 26, 18, 0.35);
            box-sizing: border-box;
            color: var(--hud-walnut);
            padding: 8px 14px 10px;
            width: 300px;
        }

        .dish {
            font-size: 30px;
            font-weight: 700;
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
            border: 2px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 24px;
            width: 24px;
        }

        .time-bar {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 6px;
            box-sizing: border-box;
            height: 14px;
            margin-top: 8px;
            overflow: hidden;
            width: 100%;
        }

        .time-fill {
            height: 100%;
        }

        .popup {
            align-self: flex-end;
            animation: order-popup-rise 1.2s linear forwards;
            ${up}
            font-size: 34px;
            text-align: right;
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
    `,render({inputs:e}){let{orders:t,orderPopup:n}=e.snapshot;return D`
            <div class="title">ORDERS</div>
            ${t.map(e=>{let t=Tu[e.dish];return D`
                    <div class="ticket">
                        <div class="dish">${t.label}</div>
                        <div class="recipe">
                            ${t.toppings.map(e=>{let t=Su[e];return D`
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
                                style="width: ${e.fractionLeft*100}%; background: ${e.fractionLeft<xp?B.tomato:B.grass}"
                            ></div>
                        </div>
                    </div>
                `})}
            ${n?or(n.id,D`
                          <div
                              class="popup"
                              style="color: ${n.kind===`fulfilled`?`#c4e07a`:`#ff8f73`}"
                          >
                              ${n.kind===`fulfilled`?`${Tu[n.dish].label} served! +${n.scoreDelta}`:`${Tu[n.dish].label} order expired! ${n.satisfactionDelta}`}
                          </div>
                      `):M}
        `}}),Cp=[{towerType:K.Knife,verb:`cut`},{towerType:K.Boiler,verb:`splash & soften`},{towerType:K.Masher,verb:`mash`}],wp=`Combo: the Knife cuts (×1.5), the Pot softens (Mashers hit ×2), then the Masher smashes (×3)`,Tp={width:192,height:108};function Ep(e){let t=Tp.width/k.width,n=e.restaurant.sizePx*t;return D`
        <svg
            class="preview"
            width=${Tp.width}
            height=${Tp.height}
            viewBox="0 0 ${Tp.width} ${Tp.height}"
        >
            ${ue`<rect width="${Tp.width}" height="${Tp.height}" fill="#7f9040" />`}
            ${e.paths.map(e=>{let n=e.waypoints.map(e=>`${e.x*t},${e.y*t}`).join(` `);return ue`
                    <polyline
                        points="${n}"
                        fill="none"
                        stroke="#cfc6b0"
                        stroke-width="${e.widthPx*t}"
                        stroke-linejoin="round"
                    />
                    ${(e.chutes??[]).map(n=>{let r=Gc(e,n.distancePx);return ue`<circle cx="${r.x*t}" cy="${r.y*t}" r="6" fill="#e07b3f" stroke="#2b1a12" stroke-width="1.5" />`})}
                `})}
            ${ue`<rect
                x="${(e.restaurant.x-e.restaurant.sizePx/2)*t}"
                y="${(e.restaurant.y-e.restaurant.sizePx/2)*t}"
                width="${n}"
                height="${n}"
                fill="#b8472f"
                stroke="#2b1a12"
                stroke-width="2"
            />`}
        </svg>
    `}function Dp(e,t){let n=Rf(e.records,t,e.mode);return n.bestScore?D`
        <span class="record">
            Best ${n.bestScore.toLocaleString(`en-US`)} · ${n.bestStars} ★ · 🏆
            ${n.champs}
        </span>
    `:D`
            <span class="record">No record yet</span>
        `}function Op(e){return e.records.hall.length?D`
        <div class="hall">
            <div class="hall-title">Hall of Mash Champs</div>
            <div class="hall-list">
                ${e.records.hall.map((e,t)=>D`
                        <div class="hall-entry">
                            <div>
                                ${t+1}. ${nl(e.levelId).name} ·
                                ${e.mode===`campaign`?`Campaign`:`Endless`}
                            </div>
                            <div>
                                ${e.score.toLocaleString(`en-US`)} · ${_p(e.stars)} ·
                                ${ar(er(e.dateMs),`MMM d`)}
                            </div>
                        </div>
                    `)}
            </div>
        </div>
    `:M}var kp=[wp,`Every tower mashes. Aim the Knife when you build it (scroll or [ ]) and it chops everything on that line, fast. Pots soften everything in range, so Mashers hit twice as hard.`,`Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.`,`Fully mashed potatoes make customers happy; the closer to done, the less they complain. Raw ones make them furious.`,`Seagulls swoop in to steal potatoes. Your towers can knock them out.`,`The Microwave is fast and cheap, but rubbery potatoes hurt your prestige.`,`Towers wear out with use. Click one and press S to service it.`,`Keep satisfaction above zero through every wave to become the Mash Champ.`],Ap=`1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause · F fast-forward speed · G fast-forward until the next income (volume sliders are in the pause menu) · R to restart after a run`,jp=ke()({tagName:`hud-title`,styles:j`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${lp}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${ap}
            border-radius: 28px;
            border-width: 6px;
            padding: 16px 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 60px;
            font-weight: 700;
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
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 36px;
            width: 36px;
        }

        .rules {
            font-size: 24px;
            line-height: 1.2;
            margin-bottom: 10px;
        }

        .controls {
            font-size: 20px;
            margin-bottom: 12px;
            opacity: 0.8;
        }

        .levels {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin-bottom: 12px;
        }

        .modes {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 16px;
        }

        .mode {
            ${op}
            font-size: 28px;
            font-weight: 700;
            padding: 8px 32px;
        }

        .mode.selected {
            ${sp}
        }

        .level-card {
            ${op}
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            font-weight: 400;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-card.selected {
            ${sp}
        }

        .level-name {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
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

        .record {
            color: var(--hud-bark);
            font-size: 22px;
            font-weight: 700;
        }

        .hall {
            margin-bottom: 12px;
        }

        .hall-title {
            color: var(--hud-oak);
            font-size: 24px;
            font-weight: 700;
        }

        .hall-list {
            display: flex;
            font-size: 18px;
            gap: 10px;
            justify-content: center;
        }

        .hall-entry {
            border: 3px solid var(--hud-bark);
            border-radius: 14px;
            line-height: 1.3;
            padding: 2px 8px;
            width: 290px;
        }

        .start {
            ${cp}
        }
    `,render({inputs:e}){return e.snapshot.status===z.Ready?D`
            <div class="layer">
                <div class="panel">
                    <div class="title">Colcannon Fodder</div>
                    <div class="tagline">A mashed potato tower defense</div>
                    <div class="recipe">
                        ${Cp.map((e,t)=>{let n=Sl[e.towerType];return D`
                                ${t>0?D`
                                          <span>→</span>
                                      `:M}
                                <span class="chip">
                                    <span class="swatch" style="background: ${n.color}"></span>
                                    ${n.label}: ${e.verb}
                                </span>
                            `})}
                    </div>
                    <div class="rules">
                        ${kp.map(e=>D`
                                <div>${e}</div>
                            `)}
                    </div>
                    <div class="controls">${Ap}</div>
                    <div class="modes">
                        ${[`campaign`,`endless`].map(t=>D`
                                <button
                                    class="mode ${t===e.snapshot.mode?`selected`:``}"
                                    @click=${()=>{e.actions.selectMode(t)}}
                                >
                                    ${t===`campaign`?`Campaign`:`Endless`}
                                </button>
                            `)}
                    </div>
                    <div class="levels">
                        ${el.map(t=>D`
                                <button
                                    class="level-card ${t.levelId===e.snapshot.levelId?`selected`:``}"
                                    @click=${()=>{e.actions.selectLevel(t.levelId)}}
                                >
                                    <span class="level-name">${t.name}</span>
                                    <span class="level-description">${t.description}</span>
                                    ${Dp(e.snapshot,t.levelId)}
                                    ${Ep(t)}
                                </button>
                            `)}
                    </div>
                    ${Op(e.snapshot)}
                    <button
                        class="start"
                        @click=${()=>{e.actions.beginRun()}}
                    >
                        Start cooking (Space)
                    </button>
                </div>
            </div>
        `:D`
                ${M}
            `}});function Mp(){let e=Object.entries(ic).map(([e,t])=>`${e} ×${t.value}`).join(`, `);return[`Perfect mash: ${xc.servingCoins.perfect} coins × size (${e})`,`Quality scales the pay`,`Filled order: +${Sc.fulfilled.coins} coins × size`,`Eaten anyway: ${xc.servingCoins.incomplete} coins`,`Sent back: no pay`,`Seagull knocked out or fed: ${dc.bountyCoins} coins`,`Towers wear out with use. Click one and press S to service it.`,`Selling a tower refunds ${Math.round(ml.sellRefund*100)}%`]}var Np=ke()({tagName:`hud-pause`,styles:j`
        :host {
            display: block;
        }

        .pause-button {
            ${op}
            border-radius: 14px;
            font-size: 32px;
            height: 64px;
            left: 928px;
            padding: 0;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            width: 64px;
        }

        .speed-button {
            ${op}
            border-radius: 14px;
            font-size: 28px;
            height: 64px;
            padding: 0 16px;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            white-space: nowrap;
        }

        .speed-button.armed {
            ${sp}
        }

        .layer {
            align-items: center;
            ${lp}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            z-index: 1;
        }

        .panel {
            ${ap}
            border-radius: 28px;
            border-width: 6px;
            padding: 24px 48px 28px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 60px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .rules {
            font-size: 24px;
            line-height: 1.3;
            margin-bottom: 16px;
        }

        .earn-title {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .earn {
            display: flex;
            flex-wrap: wrap;
            font-size: 22px;
            gap: 2px 32px;
            justify-content: center;
            margin-bottom: 14px;
        }

        .controls {
            font-size: 20px;
            margin-bottom: 16px;
            opacity: 0.8;
        }

        .volume {
            align-items: center;
            display: flex;
            font-size: 26px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 4px;
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
            margin-top: 14px;
            display: flex;
            gap: 32px;
            justify-content: center;
        }

        .buttons button {
            ${cp}
            padding: 8px 40px;
        }

        .buttons button.secondary {
            background: var(--hud-wheat);
        }

        .volume input {
            accent-color: var(--hud-pumpkin);
        }
    `,render({inputs:e}){let t=e.snapshot;return t.status===z.Playing?D`
            ${t.paused?D`
                      <div class="layer">
                          <div class="panel">
                              <div class="title">Paused</div>
                              <div class="rules">
                                  ${kp.map(e=>D`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="earn-title">How you earn ${hp()}</div>
                              <div class="earn">
                                  ${Mp().map(e=>D`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="controls">${Ap}</div>
                              ${[[`music`,`Music`],[`effects`,`Sound effects`]].map(([n,r])=>{let i=Math.round(t.volumes[n]*100);return D`
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
                                      class="secondary"
                                      @click=${()=>{e.actions.restartRun()}}
                                  >
                                      Restart
                                  </button>
                                  <button
                                      class="secondary"
                                      @click=${()=>{e.actions.goToMainMenu()}}
                                  >
                                      Main menu
                                  </button>
                              </div>
                          </div>
                      </div>
                  `:M}
            <button
                class="pause-button"
                @click=${()=>{e.actions.togglePause()}}
            >
                ⏸
            </button>
            <button
                class="speed-button"
                style="left: 1004px; width: 150px;"
                title="Fast-forward (F)"
                @click=${()=>{e.actions.cycleSpeed()}}
            >
                ⏩ ${jf(t.speed)}
            </button>
            <button
                class=${`speed-button`+(t.resetSpeedOnIncome?` armed`:``)}
                style="left: 1170px; width: 190px;"
                title="Fast-forward until the next income (G)"
                @click=${()=>{e.actions.speedUntilIncome()}}
            >
                ⏩ until ${hp()}
            </button>
        `:D`
                ${M}
            `}}),Pp=ke()({tagName:`hud-run-over`,styles:j`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${lp}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${ap}
            border-radius: 28px;
            border-width: 6px;
            padding: 48px;
            text-align: center;
            width: 900px;
        }

        .trophy {
            font-size: 140px;
        }

        .title {
            font-size: 72px;
            font-weight: 700;
        }

        .subtitle {
            font-size: 30px;
            margin-bottom: 24px;
        }

        .stars {
            color: var(--hud-caramel);
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 24px;
        }

        .summary {
            font-size: 30px;
            margin-bottom: 32px;
        }

        .new-best {
            background: var(--hud-caramel);
            border: 4px solid var(--hud-bark);
            border-radius: 999px;
            color: var(--hud-bark);
            display: inline-block;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 16px;
            padding: 4px 28px;
        }

        .bests {
            font-size: 28px;
            margin-bottom: 24px;
            opacity: 0.85;
        }

        button {
            ${cp}
        }

        button.secondary {
            background: var(--hud-wheat);
            margin-left: 32px;
        }
    `,render({inputs:e}){let t=e.snapshot;if(t.status===z.Playing||t.status===z.Ready)return D`
                ${M}
            `;let n=t.mode===`endless`,r=t.status===z.Won,i=r&&t.prestigeStars>=pl.mashChampStars,a=r&&!i,o=Rf(t.records,t.levelId,t.mode);return D`
            <div class="layer">
                <div class="panel">
                    ${i?D`
                              <div class="trophy">🏆</div>
                          `:M}
                    <div
                        class="title"
                        style="color: ${i?`var(--hud-caramel)`:a?`var(--hud-pumpkin)`:`var(--hud-tomato)`}; ${a?`font-size: 64px`:``}"
                    >
                        ${i?`MASH CHAMP!`:a?`Survived!`:`Restaurant Closed`}
                    </div>
                    <div class="subtitle">
                        ${n?`The restaurant closed after ${t.wavesReached} waves`:i?`Every customer went home full.`:a?`...but the critics found it a little rubbery.`:`The customers have had enough of your potatoes.`}
                    </div>
                    ${t.newBest?D`
                              <div class="new-best">New best!</div>
                          `:M}
                    <div class="stars">Prestige ${_p(t.prestigeStars)}</div>
                    <div class="summary">
                        <div>Score ${t.totalScore.toLocaleString(`en-US`)}</div>
                        <div>Coins earned ${t.coinsEarned}</div>
                        <div>Perfect mashes ${t.servingCounts[rl.Perfect]}</div>
                        <div>
                            Not fully mashed ${t.servingCounts[rl.Incomplete]}
                        </div>
                        <div>Raw ${t.servingCounts[rl.Raw]}</div>
                        <div>Stolen by seagulls ${t.potatoesStolen}</div>
                    </div>
                    <div class="bests">
                        Best score ${o.bestScore.toLocaleString(`en-US`)} · Best prestige
                        ${_p(o.bestStars)}${n?` · Best ${o.bestWaves} waves`:` · 🏆 ${o.champs}`}
                    </div>
                    <button
                        @click=${()=>{e.actions.restartRun()}}
                    >
                        Play again (R)
                    </button>
                    <button
                        class="secondary"
                        @click=${()=>{e.actions.goToMainMenu()}}
                    >
                        Main menu
                    </button>
                </div>
            </div>
        `}}),Fp={[rl.Perfect]:{getText(e){return`Perfect mash! +${e.scoreDelta}`},color:`#c4e07a`},[rl.Incomplete]:{getText(e){let t=e.progress>=.75?`Almost mashed`:e.progress>=.4?`Half-mashed`:`Barely touched`;return`${e.sentBack?`Sent back! `:``}${t}... ${e.satisfactionDelta}`},color:`#f6cf6a`},[rl.Raw]:{getText(e){return e.sentBack?`Sent back! Barely touched... ${e.satisfactionDelta}`:`RAW POTATO! ${e.satisfactionDelta}`},color:`#ff8f73`}};function Ip(e){return e>.6?B.grass:e>.3?B.butter:B.tomato}var Lp=ke()({tagName:`hud-stats`,styles:j`
        :host {
            display: block;
            left: 72px;
            position: absolute;
            top: 16px;
        }

        .panel {
            ${ap}
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 22px 14px;
            width: 520px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
        }

        .score {
            font-size: 40px;
            font-weight: 700;
        }

        .coins {
            color: var(--hud-caramel);
            font-size: 36px;
            font-weight: 700;
        }

        .prestige {
            color: var(--hud-caramel);
            font-size: 30px;
            font-weight: 700;
        }

        .wave {
            font-size: 30px;
            font-weight: 700;
        }

        /* The host is at (72, 16), so these offsets put the banner's center at world (960, 200). */
        .banner {
            ${up}
            color: var(--hud-cream);
            font-size: 56px;
            left: 888px;
            position: absolute;
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
            background: var(--hud-sand);
            border: 3px solid var(--hud-bark);
            border-radius: 10px;
            box-sizing: border-box;
            height: 30px;
            overflow: hidden;
            width: 330px;
        }

        .bar-fill {
            height: 100%;
        }

        /* The host is at (72, 16), so these offsets put the popup's center at world (960, 380). */
        .popup {
            ${up}
            animation: popup-rise 1.2s linear forwards;
            font-size: 44px;
            left: 888px;
            position: absolute;
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
    `,render({inputs:e}){let t=e.snapshot,n=t.satisfaction/t.maxSatisfaction,r=t.servingPopup,i=r&&Fp[r.result];return D`
            <div class="panel">
                <div class="title">Colcannon Fodder</div>
                <div class="score">Score ${t.totalScore.toLocaleString(`en-US`)}</div>
                <div class="coins">${hp()} ${t.coins}</div>
                <div class="label">Customer satisfaction</div>
                <div class="bar-row">
                    <div class="bar">
                        <div
                            class="bar-fill"
                            style="width: ${Math.max(0,Math.min(1,n))*100}%; background: ${Ip(n)}"
                        ></div>
                    </div>
                    <span>${t.satisfaction} / ${t.maxSatisfaction}</span>
                </div>
                <div class="prestige">Prestige ${_p(t.prestigeStars)}</div>
                <div class="wave">
                    Wave
                    ${t.waveNumber}${t.mode===`endless`?``:` / ${t.waveCount}`}${t.isBossWave?` 👑`:``}
                </div>
                <div class="label">Potatoes served ${t.potatoesServed}</div>
            </div>
            ${t.wavePhase===`break`&&t.status!==z.Ready?D`
                      <div class="banner">
                          ${t.waveNumber===1?`Get ready! Wave 1 in`:`Wave ${t.waveNumber} incoming in`}
                          ${t.breakSecondsLeft}...
                      </div>
                  `:M}
            ${t.stealPopup?or(t.stealPopup.id,D`
                          <div class="popup" style="color: #ff8f73">
                              A seagull stole a potato! ${t.stealPopup.satisfactionDelta}
                          </div>
                      `):M}
            ${r&&i?or(r.id,D`
                          <div class="popup" style="color: ${i.color}">
                              ${i.getText(r)}
                          </div>
                      `):M}
        `}}),Rp=ke()({tagName:`hud-topping-bar`,styles:j`
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
            ${ap}
            border-radius: 14px;
            font-size: 24px;
            font-weight: 700;
            padding: 2px 0;
            text-align: center;
        }

        button {
            ${op}
            border-radius: 16px;
            height: 90px;
            width: 200px;
        }

        button.selected {
            ${sp}
            transform: translateX(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 14px;
            justify-content: center;
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            flex-shrink: 0;
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
            font-weight: 700;
            white-space: nowrap;
        }

        .hotkey {
            font-size: 22px;
            opacity: 0.7;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTopping;return D`
            <div class="title">TOPPINGS</div>
            ${Object.values(X).map(n=>{let r=Su[n];return D`
                    <button
                        class=${n===t?`selected`:``}
                        ${ze(`click`,()=>{e.actions.selectTopping(n===t?void 0:n)})}
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
        `}});function zp(e){return e<40?B.grass:e<70?B.butter:B.tomato}var Bp=ke()({tagName:`hud-tower-panel`,styles:j`
        :host {
            display: block;
            left: 24px;
            bottom: 150px;
            pointer-events: auto;
            position: absolute;
            width: 360px;
        }

        .panel {
            ${ap}
            border-left: 12px solid var(--hud-pumpkin);
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 12px 18px 14px;
            width: 360px;
        }

        .name {
            font-size: 32px;
            font-weight: 700;
        }

        .level {
            color: var(--hud-caramel);
            font-weight: 600;
            font-size: 24px;
        }

        .stat {
            font-size: 22px;
        }

        .wear-track {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 8px;
            box-sizing: border-box;
            height: 16px;
            overflow: hidden;
        }

        .wear-fill {
            height: 100%;
        }

        button {
            ${op}
            background: var(--hud-meadow);
            border-radius: 12px;
            font-size: 26px;
            margin-top: 4px;
            padding: 8px 0;
        }

        button.service {
            background: var(--hud-sand);
        }

        button.sell {
            background: var(--hud-wheat);
        }

        button:disabled {
            cursor: default;
            opacity: 0.4;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTower;if(!t)return M;let n=Sl[t.towerType],{actions:r,snapshot:i}=e,a=t.upgradeCost!=null&&i.coins>=t.upgradeCost,o=n.behavior!==`gull-trap`&&n.behavior!==`swipe`;return D`
            <div class="panel">
                <div class="name">${n.label}</div>
                <div class="level">Level ${t.level} / ${ml.maxLevel}</div>
                ${o?D`
                          <div class="stat">Damage: ${t.stats.damage}</div>
                      `:M}
                <div class="stat">Range: ${t.stats.rangePx}</div>
                <div class="stat">Reload: ${(t.stats.cooldownMs/1e3).toFixed(2)}s</div>
                <div class="stat">Wear: ${t.wear}%</div>
                <div class="wear-track">
                    <div
                        class="wear-fill"
                        style="width: ${t.wear}%; background: ${zp(t.wear)}"
                    ></div>
                </div>
                <button
                    class="service"
                    ?disabled=${t.wear<=0||i.coins<t.serviceCost}
                    ${ze(`click`,()=>{r.serviceTower(t.towerId)})}
                >
                    ${vp()} ${xl(t.towerType)} (S) ${hp()}
                    ${t.serviceCost}
                </button>
                <button
                    class="upgrade"
                    ?disabled=${!a}
                    ${ze(`click`,()=>{r.upgradeTower(t.towerId)})}
                >
                    Upgrade (U) ${hp()} ${t.upgradeCost??`MAX`}
                </button>
                <button
                    class="sell"
                    ${ze(`click`,()=>{r.sellTower(t.towerId)})}
                >
                    Sell (X) ${hp()} ${t.sellValue}
                </button>
            </div>
        `}}),Vp=ke()({tagName:`hud-tower-toolbar`,styles:j`
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
            ${ap}
            border-radius: 14px;
            font-size: 26px;
            font-weight: 500;
            padding: 4px 22px;
            white-space: nowrap;
        }

        .row {
            display: flex;
            gap: 16px;
        }

        button {
            ${op}
            border-radius: 16px;
            height: 110px;
            width: 212px;
        }

        button.selected {
            ${sp}
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 6px;
            justify-content: center;
        }

        .icon {
            flex-shrink: 0;
            height: 44px;
            margin: 0;
            width: 44px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 26px;
            font-weight: 700;
            white-space: nowrap;
        }

        button.unaffordable {
            opacity: 0.45;
        }

        .cost {
            color: var(--hud-oak);
            font-size: 24px;
            font-weight: 700;
        }

        .hotkey {
            font-size: 24px;
            opacity: 0.7;
        }
    `,render({inputs:e}){let t=e.snapshot.selectedTowerType,n=e.snapshot.selectedTopping,r=n?`Click a potato to add ${Su[n].label}. Right click or Esc to cancel.`:t?t===K.Knife?`Scroll or [ ] to turn the blade. Click beside the belt to build it.`:`Click beside the path to build a ${Sl[t].label}. Right click or Esc to cancel.`:wp;return D`
            <div class="hint">${r}</div>
            <div class="row">
                ${Object.values(K).map(n=>{let r=Sl[n];return D`
                        <button
                            class=${[n===t?`selected`:``,gf(e.snapshot.coins,n)?``:`unaffordable`].join(` `)}
                            ${ze(`click`,()=>{e.actions.selectTowerType(n===t?void 0:n)})}
                        >
                            <div class="content">
                                <img class="icon" src=${ru(n)??``} />
                                <div class="text">
                                    <span class="label">${r.label}</span>
                                    <span class="hotkey">[${r.hotkey}]</span>
                                    <span class="cost">
                                        ${hp()} ${xc.towerCost[n]}
                                    </span>
                                </div>
                            </div>
                        </button>
                    `})}
            </div>
        `}}),Hp=ke()({tagName:`game-hud`,styles:j`
        :host {
            ${ip}
            color: var(--hud-walnut);
            display: block;
            font-family: ${l(rp)};
            inset: 0;
            pointer-events: none;
            position: absolute;
        }
    `,render({inputs:e}){return D`
            <${Lp.assign({snapshot:e.snapshot})}></${Lp}>
            <${Vp.assign({snapshot:e.snapshot,actions:e.actions})}></${Vp}>
            <${Bp.assign({snapshot:e.snapshot,actions:e.actions})}></${Bp}>
            <${Rp.assign({snapshot:e.snapshot,actions:e.actions})}></${Rp}>
            <${Sp.assign({snapshot:e.snapshot})}></${Sp}>
            <${yp.assign({snapshot:e.snapshot})}></${yp}>
            <${bp.assign({snapshot:e.snapshot})}></${bp}>
            <${Np.assign({snapshot:e.snapshot,actions:e.actions})}></${Np}>
            <${dp.assign({snapshot:e.snapshot})}></${dp}>
            <${Pp.assign({snapshot:e.snapshot,actions:e.actions})}></${Pp}>
            <${jp.assign({snapshot:e.snapshot,actions:e.actions})}></${jp}>
        `}}),Up={[rl.Perfect]:jc.ServePerfect,[rl.Incomplete]:jc.ServeBad,[rl.Raw]:jc.ServeRaw},Wp,Gp,Kp=!1,qp,Jp=-1;function Yp(e){let t=e.runState;if(!t)return;let n=t.lastServing,r=e.entityStore?e.entityStore.getEntities(wf).size:0,i=t.status===z.Playing;i&&n&&n.servedAtMs!==Wp&&Hc(Up[n.result]),i&&Gp!=null&&r>Gp&&Hc(jc.Build),i&&t.lastSteal&&t.lastSteal.atMs!==qp&&Hc(jc.ServeRaw),i&&t.lastBossSpawnAtMs>=0&&t.lastBossSpawnAtMs!==Jp&&Hc(jc.BossArrives),Jp=t.lastBossSpawnAtMs,qp=t.lastSteal?.atMs,Wp=n?.servedAtMs,Gp=r}var Xp=Ye({modName:`hud`,execute({state:e}){if(e.runState&&(e.runState.status===z.Won||e.runState.status===z.Lost)&&e.ui&&(e.ui.keys.includes(`r`)||e.ui.keys.includes(`R`))&&Nf(e).restartRun(),e.runState?.status===z.Playing&&e.ui){let t=e.ui.keys.some(e=>e===`p`||e===`P`),n=e.ui.keys.includes(`Escape`)&&!Kp;(t||n)&&Nf(e).togglePause(),e.ui.keys.some(e=>e===`f`||e===`F`)&&Nf(e).cycleSpeed(),e.ui.keys.some(e=>e===`g`||e===`G`)&&Nf(e).speedUntilIncome()}Kp=!!(e.ui?.selectedTowerType||e.ui?.selectedTopping||e.ui?.selectedTowerId!=null),e.runState?.status===z.Ready&&e.ui?.keys.includes(` `)&&Nf(e).beginRun(),(e.ui?.keys.includes(`m`)||e.ui?.keys.includes(`M`))&&Rc(!Lc()),Yp(e);let t=e.pixi?.pixiApplication?.renderer;t&&au(t);let n=kc();return e.audioChannelVolume?.channels?.[$s.Music]!==n.music&&(e.audioChannelVolume={channels:{[$s.Music]:n.music,[$s.Effects]:n.effects},master:1}),D`
            <${Hp.assign({snapshot:np(e),actions:Nf(e)})}></${Hp}>
        `}});function Zp(e,t){let n=e.pixi?.canvas;if(n&&e.virtualViewport)return Ws({canvasBounds:n.getBoundingClientRect(),clientPoint:{x:t.clientX,y:t.clientY},virtualViewport:e.virtualViewport})}var Qp={clicks:[],keys:[],wheelSteps:0},$p=Ye({modName:`input`,execute({state:e}){if(!e.ui)return;e.ui.clicks=Qp.clicks,e.ui.keys=Qp.keys,Qp.clicks=[],e.ui.wheelSteps=Qp.wheelSteps,Qp.keys=[],Qp.wheelSteps=0;let t=e.pixi?.canvas;if(e.inputListenersAttached||!t)return;e.inputListenersAttached=!0;let n=e.ui;t.addEventListener(`pointermove`,t=>{n.pointerWorld=Zp(e,t)}),t.addEventListener(`pointerleave`,()=>{n.pointerWorld=void 0}),t.addEventListener(`pointerdown`,t=>{if(t.button!==0&&t.button!==2)return;let n=Zp(e,t);n&&Qp.clicks.push({...n,button:t.button===0?`left`:`right`})}),t.addEventListener(`contextmenu`,e=>{e.preventDefault()}),t.addEventListener(`wheel`,e=>{e.preventDefault(),Qp.wheelSteps+=Math.sign(e.deltaY)},{passive:!1}),globalThis.addEventListener(`keydown`,e=>{e.repeat||Qp.keys.push(e.key)})}}),em,tm=14,nm=Ye({modName:`topping-input`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(t&&n&&e.entityStore&&e.runState){if((!em||em.destroyed)&&(em=new P,em.zIndex=1e3,t.sortableChildren=!0,t.addChild(em)),em.clear(),e.runState.status!==z.Playing||e.runState.paused){n.selectedTopping=void 0;return}for(let e of n.keys){if(e===`Escape`){n.selectedTopping=void 0;continue}let t=Object.values(X).find(t=>Su[t].hotkey===e.toLowerCase());t&&(n.selectedTopping=n.selectedTopping===t?void 0:t,n.selectedTopping&&(n.selectedTowerType=void 0))}for(let t of n.clicks){if(t.button===`right`){n.selectedTopping=void 0;continue}if(!n.selectedTopping)continue;let r,i=1/0;for(let n of e.entityStore.getEntities(bd)){if(n.params.dropInMs>0)continue;let e=Math.hypot(n.params.x-t.x,n.params.y-t.y);e<=ic[n.params.size].radius+yc.clickSlopPx&&e<i&&(r=n,i=e)}r&&!r.params.served&&Q(e,{type:Z.ApplyTopping,potatoId:r.params.potatoId,topping:n.selectedTopping})}n.selectedTopping&&n.pointerWorld&&em.circle(n.pointerWorld.x,n.pointerWorld.y,tm).fill({color:Su[n.selectedTopping].color}).stroke({color:`#ffffff`,width:3})}}});function rm(e){return(e%360+360)%360}var im,am,om,sm=Ye({modName:`tower-placement`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(!t||!n||!e.entityStore||!e.level||!e.runState)return;if((!im||im.destroyed)&&(im=new P,im.zIndex=1e3,t.sortableChildren=!0,t.addChild(im)),(!am||am.destroyed)&&(am=new P,am.zIndex=1e3,am.alpha=.5,t.addChild(am)),(!om||om.destroyed)&&(om=new Qo({text:``,style:{fill:`#ffffff`,fontSize:24,stroke:{color:`#000000`,width:4}}}),om.anchor.set(.5,0),om.zIndex=1e3,t.addChild(om)),im.clear(),om.visible=!1,am.visible=!1,e.runState.status!==z.Playing||e.runState.paused){n.selectedTowerType=void 0,n.selectedTowerId=void 0,im.visible=!1;return}im.visible=!0;for(let t of n.keys){if(t===`Escape`){n.selectedTowerType=void 0,n.selectedTowerId=void 0;continue}if(n.selectedTowerId!=null&&(t===`u`||t===`U`)){Q(e,{type:Z.UpgradeTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`s`||t===`S`)){Q(e,{type:Z.ServiceTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`x`||t===`X`)){Q(e,{type:Z.SellTower,towerId:n.selectedTowerId}),n.selectedTowerId=void 0;continue}if(n.selectedTowerType===K.Knife&&(t===`[`||t===`]`)){n.placementAngleDeg=rm(n.placementAngleDeg+(t===`]`?1:-1)*ou.rotateStepDeg);continue}let r=Object.values(K).find(e=>Sl[e].hotkey===t);r&&(n.selectedTowerType=n.selectedTowerType===r?void 0:r,n.selectedTowerType&&(n.selectedTopping=void 0))}n.selectedTowerType===K.Knife&&n.wheelSteps!==0&&(n.placementAngleDeg=rm(n.placementAngleDeg+n.wheelSteps*ou.rotateStepDeg));let r=[...e.entityStore.getEntities(wf)].map(e=>({x:e.params.x,y:e.params.y,towerId:e.params.towerId}));(n.selectedTowerType||n.selectedTopping||!r.some(e=>e.towerId===n.selectedTowerId))&&(n.selectedTowerId=void 0);for(let t of n.clicks)if(t.button===`right`)n.selectedTowerType=void 0,n.selectedTowerId=void 0;else if(!n.selectedTowerType&&!n.selectedTopping)n.selectedTowerId=r.find(e=>Math.hypot(e.x-t.x,e.y-t.y)<=fc.radius)?.towerId;else if(n.selectedTowerType&&!n.selectedTopping){let i=Math.round(t.x),a=Math.round(t.y);gf(e.runState.coins,n.selectedTowerType)&&hf({level:e.level,towers:r,point:{x:i,y:a}}).valid&&Q(e,{type:Z.PlaceTower,towerType:n.selectedTowerType,x:i,y:a,angleDeg:n.placementAngleDeg})}if(!n.selectedTowerType||!n.pointerWorld)return;let{x:i,y:a}=n.pointerWorld,o=hf({level:e.level,towers:r,point:{x:i,y:a}}),s=gf(e.runState.coins,n.selectedTowerType),c=o.valid&&s;(!o.valid||!s)&&(om.text=o.valid?`Not enough coins`:o.reason,om.position.set(i,a+fc.radius+8),om.visible=!0);let{rangePx:l}=Tl(n.selectedTowerType,1);if(n.selectedTowerType===K.Knife){let e=uf({origin:{x:i,y:a},angleDeg:n.placementAngleDeg,lengthPx:l});im.moveTo(e.start.x,e.start.y).lineTo(e.end.x,e.end.y).stroke({color:ou.lineColor,alpha:.6,width:ou.lineWidthPx})}else im.circle(i,a,l).stroke({color:`#ffffff`,alpha:.5,width:3});am.visible=!0,am.position.set(i,a),Xl(am,{towerType:n.selectedTowerType,attack:-1,timeSec:e.runState.elapsedMs/1e3,aimX:0,aimY:0,rangePx:l,swiperAngle:0}),im.circle(i,a,fc.radius).stroke({color:c?B.meadow:B.tomato,width:5})}}),cm=function(e){return e.Dev=`dev`,e.Prod=`prod`,e}({});function lm(e){return e===`bdemann.github.io`?`prod`:`dev`}var um=lm(globalThis.location.hostname);function dm({passWaitMs:e,ms:t}){let n=Math.min(t,Math.max(0,e-_u.heatLampGraceMs));return _u.heatLampQualityPerSecond*n/1e3}function fm(e){return e-_u.passSlots*_u.queueSpacingPx}var pm=class extends uu({key:`PassEntity`,paramsShape:t({msUntilWaiter:0})}){update({msSinceLastExecute:e}){let{level:t,entityStore:n}=this.state,r=[];for(let i of n.getEntities(bd)){if(i.params.served||i.params.carriedBySeagull||i.params.dropInMs>0)continue;let n=Wc(Jc(t,i.params.pathId));i.params.distancePx>=fm(n)?(r.push(i),i.params.passWaitMs+=e,i.params.quality=Math.max(0,i.params.quality-dm({passWaitMs:i.params.passWaitMs,ms:e}))):i.params.passWaitMs=0}this.params.msUntilWaiter-=e;let i;for(let e of r)(!i||e.params.distancePx>i.params.distancePx)&&(i=e);if(!i)return;let a=i.params.distancePx>=Wc(Jc(t,i.params.pathId))-1,o=this.params.msUntilWaiter<=0;a&&(o||r.length>_u.passSlots)&&(i.serveAtCounter(),o&&(this.params.msUntilWaiter=_u.waiterIntervalMs))}},mm=34;function hm(e,t){let n=Wc(t),r=fm(n),i=Gc(t,r),a=Gc(t,n),o=Kc(t,r),s=t.widthPx/2,c=-o.y*s,l=o.x*s,u=[i.x-c,i.y-l,a.x-c,a.y-l,a.x+c,a.y+l,i.x+c,i.y+l];e.poly(u).fill({color:B.pumpkin,alpha:.16}),e.poly([i.x-c*.55,i.y-l*.55,a.x-c*.55,a.y-l*.55,a.x+c*.55,a.y+l*.55,i.x+c*.55,i.y+l*.55]).fill({color:B.butter,alpha:.14});let d=i.x-c*1.3,f=i.y-l*1.3;e.circle(d,f,mm).fill({color:ol.lamp,alpha:.22}),W(e,{path:U({x:d-22,y:f-14,width:44,height:16,radius:7}),fill:B.slate}),W(e,{path:H({x:d,y:f+2,rx:9,ry:8}),fill:B.butter}),W(e,{path:H({x:d,y:f+2,rx:4,ry:3.5}),fill:ol.lamp,outline:!1,highlight:!1})}var gm=class extends su({key:`PassLampEntity`}){createView(){return{view:new P({zIndex:-.4})}}update(){}render(){let e=O.instanceOf(this.view,P);e.clear();for(let t of this.state.level.paths)hm(e,t)}},_m=220,vm=8;function ym({text:e,fontSize:t,fill:n}){let r=new Qo({text:e,style:{fill:n,fontSize:t,fontFamily:V.fontFamily,fontWeight:V.fontWeight,stroke:{color:B.bark,width:t/6,join:`round`}}});return r.anchor.set(.5),r}function bm(e){let t=new pt,n=new P;t.position.set(e.x,e.y),t.scale.set(e.sizePx/_m),ul(t,{width:250,height:40,offsetY:104}),W(n,{path:U({x:-104,y:-60,width:208,height:164,radius:6}),fill:B.cream}),W(n,{path:U({x:-104,y:88,width:208,height:16,radius:4}),fill:B.caramel,outlineScale:.8}),W(n,{path:U({x:-92,y:-16,width:118,height:62,radius:6}),fill:B.walnut,outlineScale:.9});for(let e=0;e<5;e++)W(n,{path:H({x:-33,y:18,rx:52-e*9,ry:26-e*4}),fill:e<3?B.butter:ol.lamp,alpha:.22,outline:!1,highlight:!1});W(n,{path:H({x:-33,y:34,rx:22,ry:6}),fill:B.stone,outlineScale:.6}),W(n,{path:H({x:-33,y:27,rx:13,ry:9}),fill:B.cream,outlineScale:.7}),W(n,{path:U({x:-98,y:-20,width:6,height:70,radius:2}),fill:B.pine,outlineScale:.7}),W(n,{path:U({x:26,y:-20,width:6,height:70,radius:2}),fill:B.pine,outlineScale:.7}),W(n,{path:U({x:-106,y:44,width:142,height:14,radius:4}),fill:B.toffee}),W(n,{path:U({x:50,y:2,width:46,height:86,radius:16}),fill:B.oak}),W(n,{path:U({x:58,y:12,width:30,height:34,radius:10}),fill:B.caramel,outlineScale:.6}),W(n,{path:H({x:88,y:56,rx:3.5,ry:3.5}),fill:B.butter,outlineScale:.5,highlight:!1});let r=208/vm;for(let e=0;e<vm;e++){let t=-104+e*r;W(n,{path(e){e.moveTo(t,-62).lineTo(t+r,-62).lineTo(t+r,-42).arc(t+r/2,-42,r/2,0,Math.PI).closePath()},fill:e%2?B.cream:B.tomato,outlineScale:.9})}return W(n,{path:U({x:-114,y:-84,width:228,height:26,radius:6}),fill:B.tomato}),W(n,{path:sl([[-114,-84],[-96,-100],[96,-100],[114,-84]]),fill:B.walnut}),G(n,{path(e){e.moveTo(-40,8).bezierCurveTo(-36,-2,-30,2,-33,-10)},color:B.cream,width:3,alpha:.5}),t.addChild(n),t}function xm(e){let t=new pt,n=new P,r=-58*(e.sizePx/_m);t.position.set(e.x,e.y),ul(t,{width:261,height:20,offsetY:r+6}),W(n,{path:U({x:-145,y:r-52-4,width:290,height:52,radius:10}),fill:B.oak}),W(n,{path:U({x:-137,y:r-52+4,width:274,height:36,radius:6}),fill:B.walnut,outlineScale:.5,highlight:!1}),t.addChild(n);let i=ym({text:`RESTAURANT`,fontSize:40,fill:B.cream});return i.position.set(0,r-26-4),t.addChild(i),t}var Sm={grass:B.grass,grassTuft:ol.grassDark,grassTuftLight:B.meadow,beltRail:B.oak,beltRailDark:B.walnut,belt:B.stone,beltStripe:ol.beltStripe,outline:B.bark},Cm=[B.cream,B.butter,B.tomato,B.pumpkin];function wm(e){let t=2166136261;for(let n of e)t=Math.imul(t^Number(n.codePointAt(0)),16777619);return t>>>0}function Tm(e){let t=e%2147483646+1;return()=>(t=t*16807%2147483647,(t-1)/2147483646)}function Em(e,t){let n=Tm(wm(t)),{tuftCount:r,flowerCount:i}=oc;for(let t=0;t<r;t++){let t=n()*k.width,r=n()*k.height,i=n()<.65?Sm.grassTuft:Sm.grassTuftLight;e.moveTo(t,r).lineTo(t-5,r-15).moveTo(t,r).lineTo(t+2,r-18).moveTo(t,r).lineTo(t+8,r-13).stroke({color:i,width:3.5,cap:`round`,join:`round`})}for(let t=0;t<i;t++){let t=n()*k.width,r=n()*k.height,i=Cm[Math.floor(n()*Cm.length)]??Cm[0];e.moveTo(t,r).lineTo(t,r+12).stroke({color:B.moss,width:3,cap:`round`});for(let n=0;n<5;n++){let a=n/5*Math.PI*2;e.circle(t+Math.cos(a)*6,r+Math.sin(a)*6,4.5).fill({color:i})}e.circle(t,r,4).fill({color:B.butter}),e.circle(t,r,4).stroke({color:B.bark,width:1.2})}}function Dm({ground:e,path:t,color:n,width:r}){let[i,...a]=t.waypoints;i&&(e.moveTo(i.x,i.y),a.forEach(t=>e.lineTo(t.x,t.y)),e.stroke({color:n,width:r,cap:`round`,join:`round`}))}function Om(e,t){let n=V.outlineWidth*2,r=[{color:`rgba(43,26,18,0.3)`,extraWidth:14+n,shadow:!0},{color:Sm.outline,extraWidth:14+n},{color:Sm.beltRail,extraWidth:14},{color:Sm.beltRailDark,extraWidth:4},{color:Sm.outline,extraWidth:1},{color:Sm.belt,extraWidth:-2}];for(let n of r)for(let r of t)Dm({ground:e,path:n.shadow?{...r,waypoints:r.waypoints.map(e=>({x:e.x,y:e.y+V.shadow.offsetY}))}:r,color:n.color,width:r.widthPx+n.extraWidth})}function km(e,t){let n=t.waypoints[0];if(!n)return;let r=t.widthPx*.62,i=new P,a=new pt;a.position.set(n.x,n.y),ul(a,{width:90,height:20,offsetY:r+4,offsetX:20}),W(i,{path:U({x:-34,y:-r-10,width:92,height:r*2+20,radius:8}),fill:B.walnut}),W(i,{path:U({x:-24,y:-r,width:72,height:r*2,radius:5}),fill:B.caramel,outlineScale:.7});for(let e of[[-24,-r,48,r],[-24,r,48,-r]])i.moveTo(e[0],e[1]).lineTo(e[2],e[3]).stroke({color:B.walnut,width:7,cap:`round`});i.moveTo(12,-r).lineTo(12,r).stroke({color:B.bark,width:2.5}),W(i,{path:H({x:38,y:0,rx:4,ry:4}),fill:B.butter,outlineScale:.5,highlight:!1}),a.addChild(i),e.addChild(a);let o=ym({text:`POTATOES`,fontSize:24,fill:B.cream});o.anchor.set(0,1),o.position.set(n.x+8,n.y-t.widthPx/2-18),e.addChild(o)}var Am=class extends su({key:`LevelEntity`}){createView(){let{level:e}=this.state,t=new pt({zIndex:-1}),n=new P().rect(0,0,k.width,k.height).fill({color:Sm.grass});return Em(n,e.levelId),Om(n,e.paths),t.addChild(n),e.paths.forEach(e=>km(t,e)),t.addChild(bm(e.restaurant)),{view:t}}update(){}},jm=class extends su({key:`BeltEntity`}){createView(){return{view:new P({zIndex:-.5})}}update(){}render(){let{level:e,runState:t}=this.state,n=O.instanceOf(this.view,P),r=ac.stripeSpacingPx,i=t.elapsedMs*t.beltSpeedPxPerMs%r;n.clear();for(let t of e.paths){let e=Wc(t),a=(t.widthPx-16)/2;for(let o=i;o<=e;o+=r){let e=Gc(t,o),r=Kc(t,o),i=-r.y*a,s=r.x*a;n.moveTo(e.x-i,e.y-s).lineTo(e.x+i,e.y+s)}}n.stroke({color:Sm.beltStripe,width:5,cap:`round`})}},Mm=class extends su({key:`ChuteEntity`,paramsShape:wn(xs,t({pathId:``,distancePx:0,active:!1})),paramsMap:{view:{x:!0,y:!0}}}){drawnActive;createView(){let e=new P({zIndex:5});return this.drawHopper(e,this.params.active),{view:e}}drawHopper(e,t){this.drawnActive=t,e.clear();let n=t?B.pumpkin:B.toffee;t&&e.ellipse(0,-40,84,64).fill({color:B.pumpkin,alpha:.28}),W(e,{path:sl([[-60,-80],[60,-80],[34,-10],[-34,-10]]),fill:n});for(let t of[-20,20])e.moveTo(t*2.2,-80).lineTo(t*1.3,-10).stroke({color:B.walnut,width:3,cap:`round`});W(e,{path:U({x:-36,y:-10,width:72,height:14,radius:4}),fill:B.walnut,outlineScale:.9}),W(e,{path:U({x:-68,y:-92,width:136,height:16,radius:6}),fill:B.oak})}update(){let e=!1;for(let t of this.state.entityStore.getEntities(bd))if(t.params.dropInMs>0&&t.params.pathId===this.params.pathId&&t.params.distancePx===this.params.distancePx){e=!0;break}this.params.active=e,this.drawnActive!==e&&this.drawHopper(O.instanceOf(this.view,P),e)}},Nm=class extends su({key:`RestaurantSignEntity`}){createView(){let e=xm(this.state.level.restaurant);return e.zIndex=4,{view:e}}update(){}};function Pm({configuredMs:e,pathLengthPx:t,beltSpeedPxPerMs:n}){let r=n>0?t/n:0;return Math.max(e,r*Sc.travelTimeMultiplier)}function Fm({runState:e,msElapsed:t,roll:n,longestPathLengthPx:r}){if(e.status!==z.Playing)return;let i=e.orders.filter(t=>t.expiresAtMs<=e.elapsedMs);e.orders=e.orders.filter(t=>t.expiresAtMs>e.elapsedMs);for(let t of i){let n=Math.min(sc.max,Math.max(0,e.satisfaction+Sc.expiredSatisfaction));e.lastOrderEvent={kind:`expired`,dish:t.dish,atMs:e.elapsedMs,scoreDelta:0,satisfactionDelta:n-e.satisfaction},e.satisfaction=n,e.satisfaction<=0&&(e.status=z.Lost)}if(e.wavePhase!==`spawning`)return;let a=O.isDefined($f(e,e.waveIndex)??$f(e,lc.waves.length-1)).orders;for(e.msUntilNextOrder-=t;e.msUntilNextOrder<=0;){if(e.orders.length<a.maxOpen){let t=O.isDefined(a.dishes[Math.floor(n()*a.dishes.length)]),i=O.isDefined(Object.values(wu).find(e=>e===t));e.orders.push({orderId:e.nextOrderId++,dish:i,createdAtMs:e.elapsedMs,expiresAtMs:e.elapsedMs+Pm({configuredMs:a.lifetimeMs,pathLengthPx:r,beltSpeedPxPerMs:e.beltSpeedPxPerMs})})}e.msUntilNextOrder+=a.intervalMs}}var Im=class extends uu({key:`OrderBoardEntity`,paramsShape:t({})}){update({msSinceLastExecute:e}){let t=Math.max(0,...this.state.level.paths.map(e=>Wc(e)));Fm({runState:this.state.runState,msElapsed:e,roll:()=>this.state.seededRandom.next(),longestPathLengthPx:t})}},Lm={clumpGapMs:220};function Rm({wave:e,chanceRoll:t,sizeRoll:n}){return t>=e.clumpChance?0:1+Math.floor(n*e.clumpMaxExtra)}function zm({wave:e,msElapsed:t,roll:n}){return n<e.extraSpawnsPerSecond*t/1e3}function Bm(e){return e.potatoCount*e.spawnIntervalMs/(e.seagullCount+1)}function Vm(e,t,n){let r=[];if(e.wavePhase===`break`){if(e.breakRemainingMs-=n,e.breakRemainingMs<=0){e.wavePhase=`spawning`,e.spawnedInWave=0;let n=$f(e,e.waveIndex);e.seagullsSpawnedInWave=0,n&&(e.beltSpeedPxPerMs=n.speedPxPerMs,e.msUntilNextSeagull=Bm(n)),t.msUntilNextSpawn=0,e.msUntilNextOrder=Sc.firstOrderDelayMs}return r}if(e.wavePhase===`done`)return r;{let i=$f(e,e.waveIndex);if(!i)return e.wavePhase=`done`,r;for(t.msUntilNextSpawn-=n;t.msUntilNextSpawn<=0&&e.wavePhase===`spawning`;)r.push({sizeWeights:i.sizeWeights,bossCount:e.spawnedInWave===Math.floor(i.potatoCount/2)?i.bossCount:0,bossHp:i.bossHp,chuteShare:i.chuteShare}),e.spawnedInWave++,t.msUntilNextSpawn+=i.spawnIntervalMs,e.spawnedInWave>=i.potatoCount&&(e.mode===`campaign`&&e.waveIndex>=lc.waves.length-1?e.wavePhase=`done`:(e.waveIndex++,e.wavePhase=`break`,e.breakRemainingMs=lc.breakMs));return r}}var Hm=class extends uu({key:`PotatoSpawnerEntity`,paramsShape:t({msUntilNextSpawn:0,pendingClumpSpawns:0,msUntilClumpSpawn:0,clumpWaveIndex:0,clumpPathId:``})}){async update({msSinceLastExecute:e}){let{runState:t,level:n}=this.state,r=t.waveIndex,i=t.wavePhase===`spawning`?$f(t,r):void 0,a=Vm(t,this.params,e);for(let e of a){let a=Yc(n,this.pickRoll(n));for(let t of a){await this.spawnPotato(t,e);for(let n=0;n<e.bossCount;n++)await this.spawnBoss(t,e.bossHp)}if(e.bossCount>0&&(t.lastBossSpawnAtMs=t.elapsedMs),i&&i.clumpChance>0){let e=Rm({wave:i,chanceRoll:this.state.seededRandom.next(),sizeRoll:this.state.seededRandom.next()});e>0&&(this.params.pendingClumpSpawns===0&&(this.params.msUntilClumpSpawn=Lm.clumpGapMs),this.params.pendingClumpSpawns+=e,this.params.clumpWaveIndex=r,this.params.clumpPathId=n.spawnMode===`pick-one`?a[0]?.pathId??``:``,t.potatoesPending+=e*a.length)}}if(i&&i.extraSpawnsPerSecond>0&&zm({wave:i,msElapsed:e,roll:this.state.seededRandom.next()}))for(let e of Yc(n,this.pickRoll(n)))await this.spawnPotato(e,i);await this.releaseClumpSpawns(e),await this.spawnSeagulls(e)}pickRoll(e){return e.spawnMode===`pick-one`?this.state.seededRandom.next():0}async releaseClumpSpawns(e){let{runState:t,level:n}=this.state,r=$f(t,this.params.clumpWaveIndex);if(!(this.params.pendingClumpSpawns<=0||!r))for(this.params.msUntilClumpSpawn-=e;this.params.msUntilClumpSpawn<=0&&this.params.pendingClumpSpawns>0;){let e=this.params.clumpPathId?n.paths.filter(e=>e.pathId===this.params.clumpPathId):n.paths;for(let t of e)await this.spawnPotato(t,r);this.params.pendingClumpSpawns--,t.potatoesPending-=e.length,this.params.msUntilClumpSpawn+=Lm.clumpGapMs}}async spawnPotato(e,t){let{runState:n}=this.state;if(!e.waypoints[0])return;let r=Ku(t.sizeWeights,this.state.seededRandom.next()),i=ic[r].mashHp,a=e.chutes?.length?yu({chutes:e.chutes,chuteShare:t.chuteShare,roll:this.state.seededRandom.next()}):void 0,o=a?.distancePx??0,s=Gc(e,o);await this.addEntity(bd,{x:s.x,y:s.y,pathId:e.pathId,distancePx:o,dropInMs:a?uc.dropMs:0,size:r,cut:!1,cooked:!1,mashHp:i,maxMashHp:i,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,passWaitMs:0,potatoId:n.nextPotatoId,...Cu()}),n.nextPotatoId++,n.potatoesSpawned++}async spawnBoss(e,t){let{runState:n}=this.state,r=e.waypoints[0];r&&(await this.addEntity(bd,{x:r.x,y:r.y,pathId:e.pathId,distancePx:0,dropInMs:0,size:Wu.King,cut:!1,cooked:!1,mashHp:t,maxMashHp:t,served:!1,carriedBySeagull:!1,quality:100,timesSentBack:0,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,passWaitMs:0,potatoId:n.nextPotatoId,...Cu()}),n.nextPotatoId++,n.potatoesSpawned++)}async spawnSeagulls(e){let{runState:t}=this.state,n=$f(t,t.waveIndex);if(t.wavePhase!==`spawning`||!n||(t.msUntilNextSeagull-=e,t.msUntilNextSeagull>0||t.seagullsSpawnedInWave>=n.seagullCount))return;let r=Ld({rollEdge:this.state.seededRandom.next(),rollAlong:this.state.seededRandom.next()});await this.addEntity(Xd,{x:r.x,y:r.y,flying:this.state.seededRandom.next()<dc.flyChance,hp:dc.hp,phase:Yd.approach,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1}),t.seagullsSpawnedInWave++,t.msUntilNextSeagull=Bm(n)}},Um=[Am,jm,Nm,Mm,bd,Hm,Im,wf,Xd,pm,gm];function Wm(e){return e?AbortSignal.timeout(Qe(e,{milliseconds:!0}).milliseconds):void 0}async function Gm(e,t){return t?(t.throwIfAborted(),await new Promise((n,r)=>{let i=new AbortController;t.addEventListener(`abort`,()=>{r(v(t.reason))},{once:!0,signal:i.signal}),e.then(n,r).finally(()=>{i.abort()})})):await e}var Km=class extends Error{name=`RoomRejectionError`;room;constructor(e){super(`Room connection rejected`),this.room=pn(e,[`roomPassword`])}},qm=class extends Error{name=`DefineApiError`};function Jm(e){return{apiName:e.apiName,endpoints:e.endpoints?Ym(`endpoints`,e.endpoints):{},webSockets:e.webSockets?Ym(`webSockets`,e.webSockets):{}}}function Ym(e,t){let n=new Set,r=t.reduce((e,t)=>(t.path in e?n.add(t.path):e[t.path]=t,e),{});if(n.size)throw new qm(`Duplicate API ${e} paths: ${Array.from(n).join(`,`)}`);return r}function Xm(e){return e}function Zm(e,t){return e.requests[t]}Xt.Get,Xt.Put,Xt.Post,Xt.Delete,Xt.Patch,Xt.Trace,Xt.Post,Xt.Put,Xt.Patch,Xt.Delete;function Qm(e){return e}function $m(e,...t){let n=t[0]?.pathParams,r=0,i=e.path.replaceAll(/\/:([^/]+)/g,(e,t)=>{if(r++,n&&A.hasKey(n,t)&&n[t])return Ke({value:n[t],prefix:`/`});throw Error(`Missing value for path param '${t}'.`)}).replace(/\/\*$/,()=>{if(r++,n?.wildcard==null)throw Error(`Missing value for wildcard param.`);return Ke({value:n.wildcard,prefix:`/`})});if(!r&&n)throw Error(`Route '${e.path}' does not allow any path params but some were set.`);return i}var eh=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function th(e){let t=new Set,n=-1,r=-1,i=0;for(;i<e.length;i++){let a=e.codePointAt(i);if(r===-1&&eh[a]===1)n===-1&&(n=i);else if(i!==0&&(a===32||a===9))r===-1&&n!==-1&&(r=i);else if(a===44){if(n===-1)throw SyntaxError(`Unexpected character at index ${i}`);r===-1&&(r=i);let a=e.slice(n,r);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),n=r=-1}else throw SyntaxError(`Unexpected character at index ${i}`)}if(n===-1||r!==-1)throw SyntaxError(`Unexpected end of input`);let a=e.slice(n,i);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);return t.add(a),t}function nh(e){if(e&&e!==`undefined`)return _e(()=>JSON.parse(e),{fallbackValue:e})}function rh(e,t){t.forEach(t=>{e.delete(t)})}function ih(e,t){let n=t.toLowerCase(),r=b(e,(e,t)=>({key:e.toLowerCase(),value:t}))[n];return r==null?[]:A.isNumber(r)?[String(r)]:ye(r)}var ah=`rest-vir-api`;async function oh(e,{startOrigin:t,...n}){try{let r=Object.values(e.endpoints)[0];if(!r)throw Error(`Api has no endpoints.`);let{port:i}=await Xe.isDefined(async()=>({port:await sh(t,r,{...n,isValidResponse(t){return t.headers.get(ah)===e.apiName}})}),{timeout:n.timeout});if(!i)return;let{origin:a}=Ar(t,{port:i});return{port:i,origin:a}}catch(t){throw S(t,`Cannot find dev origin for service '${e.apiName}'`)}}async function sh(e,t,{fetchOverride:n,maxScanDistance:r=100,isValidResponse:i,timeout:a={seconds:10}}){let{port:o}=kr(e);if(!o)return;let s=Number(o);if(!A.isNumber(s))throw TypeError(`Origin '${e}' doesn't have a valid port: '${o}'.`);let c=0,l=!1,u=Qe(a,{milliseconds:!0}).milliseconds,d=Date.now();for(;!l;){let a=c+s;if(Date.now()-d>=u)throw Error(`Port scan timeout reached. Last scanned port: ${a-1}`);let o=Ar(e,{pathname:t.path,port:a}).href,f=await _e(()=>(n||fetch)(o,{method:Xt.Options},t));if(!A.instanceOf(f,Error)&&f.ok&&(!i||i(f)))l=!0;else if(c>=r)throw Error(`Max port scan distance reached. Last scanned port: ${a}`);else c++}return c+s}function ch(e){let t=Number(e),n=String(e);if(A.isEnumValue(t,ie))return t;console.error(`Invalid HTTP status: ${e}`);let r=Math.floor((Number(n[0])||0)*100);return A.isEnumValue(r,ie)?r:ie.InternalServerError}async function lh({endpoint:e,method:t,response:n,handleDeclaredResponseStatusOverride:r,includeResponse:i,shouldCondenseResponse:a}){let o=Zm(e,t),s=ch(n.status),c=o?.responses[s],l={status:s,...i?{response:n}:{}};if(c){let t=await(r||uh)({endpoint:e,responseDefinition:c,response:n});return a&&dh(n),{[ph[s]]:{...l,responseData:t,headers:fh(n.headers)}}}if(f(s)){let e=await mh(n);return a&&dh(n),{unexpectedError:{...l,responseData:e,headers:fh(n.headers)}}}throw Error(`Received unexpected successful response status from endpoint '${e.path}': ${s}`)}async function uh({response:e,responseDefinition:t,endpoint:n}){let r=await hh(e);if(t.responseData)s(r,t.responseData,{allowExtraKeys:!0},`Response from endpoint '${n.path}' has invalid data.`);else if(r!==void 0)throw Error(`Response from endpoint '${n.path}' has unexpectedly present data.`);return r}function dh(e){rh(e.headers,[`access-control-allow-credentials`,`access-control-allow-origin`,`access-control-expose-headers`,`connection`,`content-length`,`content-type`,`date`,`keep-alive`,`vary`,ah])}function fh(e){return Object.fromEntries(e.entries())}var ph=De(e(ie).map(([e,t])=>[t,e]));async function mh(e){return await e.clone().text()||void 0}async function hh(e){let t=await mh(e);return t&&nh(t)}function gh(e,t,n){if(t){if(!n)throw Error(`Endpoint '${String(e)}' has required headers but none were set.`);return b(t,(t,r)=>{let a=ih(n,t)[0];if(r instanceof RegExp){if(!a||!r.test(a))throw Error(`Route '${String(e)}' required header '${t}' value does not match RegExp requirement: '${i(a)}'`)}else we.tsType(r).equals(),s(a,r,{allowExtraKeys:!0},`Route '${String(e)}' required header '${t}' value does not match shape requirement: '${i(a)}'`);if(a)return{key:t,value:a}})}if(n&&Object.keys(n).length)throw Error(`Endpoint '${String(e)}' has no required headers but some were set.`);return{}}function _h(t,n){let r=n??{},i={};return e(t||{}).forEach(([e,t])=>{let n=r[e],a=vh(e,n,t);a!=null&&(i[e]=a)}),nt(r).forEach(e=>{if(!(t&&e in t)){let t=r[e],n=Ch(t);n!==void 0&&(i[e]=n)}}),i}function vh(e,t,n){return n instanceof RegExp?bh(e,t,n):A.isArray(n)?xh(e,t,n):yh(e,t,n)}function yh(e,t,n){let r=Sh(t),a=!t||A.isArray(t)?void 0:[i(t)],o=!A.isArray(t)||t.length!==1?void 0:String(t[0]);if(ne(r,n,{allowExtraKeys:!0}))return r;if(a&&ne(a,n,{allowExtraKeys:!0}))return a;if(o&&ne(o,n,{allowExtraKeys:!0}))return o;s(t,n,{allowExtraKeys:!0},`Search param '${e}' value does not match shape requirement: '${i(t)}'`)}function bh(e,t,n){let r=A.isArray(t)&&t.length===1?t[0]:t;if(r==null)throw Error(`Search param '${e}' is required but was not provided.`);if(A.isArray(r))throw TypeError(`Search param '${e}' expects a single value but got multiple: '${i(t)}'`);let a=i(r);if(!a||!n.test(a))throw Error(`Search param '${e}' value does not match RegExp requirement: '${i(a)}'`);return a}function xh(e,t,n){let r=A.isArray(t)?t:t==null?[]:[t];if(!r.length)throw Error(`Search param '${e}' is required but was not provided.`);return r.map((t,r)=>{let a=String(t);if(!a)throw Error(`Search param '${e}' value at index ${r} is empty: '${i(a)}'`);if(!n.some(e=>e.test(a)))throw Error(`Search param '${e}' value at index ${r} does not match any RegExp requirement: '${i(a)}'`);return a})}function Sh(e){return e==null?e:A.isArray(e)?g(e,e=>String(e),A.isDefined):i(e)}function Ch(e){if(e!=null){if(A.isArray(e)){let t=e.filter(A.isDefined).map(e=>String(e));return t.length?t:void 0}return i(e)}}var wh;(function(e){e[e.Connecting=0]=`Connecting`,e[e.Open=1]=`Open`,e[e.Closing=2]=`Closing`,e[e.Closed=3]=`Closed`})(wh||={});var Th;(function(e){e.OnHost=`on-host`,e.OnClient=`on-client`})(Th||={});async function Eh(e,t,n){let r=Ah(e,t,Th.OnClient);return n?.open&&r.addEventListener(`open`,n.open),n?.error&&r.addEventListener(`error`,n.error),n?.message&&r.addEventListener(`message`,n.message),n?.close&&r.addEventListener(`close`,n.close),await Oh(t),r}function Dh(e){return A.isObject(e)?(delete e.webSocket,A.hasKey(e,`webSocketDefinition`)&&A.hasKey(e.webSocketDefinition,`path`)&&(e.path=e.webSocketDefinition.path),delete e.webSocketDefinition,e):e}async function Oh(e){let t=new w;function n(e){t.isSettled||t.reject(S(Dh(e),`WebSocket connection failed.`))}e.addEventListener(`error`,n),Xe.isTruthy(()=>t.isSettled?!0:e.readyState===wh.Closed?(t.reject(`WebSocket closed while waiting for it to open.`),!0):e.readyState===wh.Open&&(t.resolve(),!0),void 0,`WebSocket never opened`).catch(e=>{t.isSettled||t.reject(Dh(e))}),await t.promise.finally(()=>{e.removeEventListener(`error`,n)})}function kh(e){return e===Th.OnClient?Th.OnHost:Th.OnClient}function Ah(e,t,n){let r=t.send,i=t.close,a=t.addEventListener,o=t.removeEventListener,s=t,c=new w;s.addEventListener(`close`,()=>{tn(()=>{c.resolve()})});let l={};return Object.assign(s,{originalListenerMap:l,async close(){i.call(s),s.readyState===wh.Closed&&c.resolve(),await c.promise},addEventListener(t,r){function i(i){let a={event:i,webSocket:s,webSocketDefinition:e};if(t===`message`){let t=jh(e,nh(String(i.data)),kh(n));return r({...a,message:t})}return r(a)}return Se(l,t,()=>new WeakMap).set(r,i),a.call(s,t,i)},removeEventListener(e,t){let n=l[e]?.get(t);n&&(l[e]?.delete(t),o.call(s,e,n))},async sendAndWaitForReply({message:t,timeout:n={seconds:10},replyCheck:r}={}){let i=new w;async function a({message:e}){i.isSettled||(!r||await _e(()=>r(e))===!0)&&i.resolve(e)}let o=setTimeout(()=>{i.isSettled||i.reject(`WebSocket '${e.path}' message timeout: got no reply.`)},Qe(n,{milliseconds:!0}).milliseconds);s.addEventListener(`message`,a),s.send(t);try{return await i.promise}finally{clearTimeout(o),s.removeEventListener(`message`,a)}},send(t){r.call(s,String(JSON.stringify(jh(e,t,n))))}}),s}function jh(e,t,n){let r=n===Th.OnClient?e.clientMessage:e.hostMessage;if(r)s(t,r,{allowExtraKeys:!0});else if(t!==void 0)throw TypeError(`WebSocket '${e.path}' does not expect any message data from the ${n===Th.OnClient?`client`:`host`} but received it: ${i(t)}.`);return t}function Mh(e,t){return A.isArray(t)?t.some(t=>Mh(e,t)):t instanceof RegExp?t.test(e):C(t)?ne(e,t,{allowExtraKeys:!0}):!1}function Nh(e,t){if(!e||!e.length)return;let n=e.join(`, `),r=t.connectProtocol;r&&e.forEach(e=>{if(!Mh(e,r))throw Error(`WebSocket protocol '${e}' failed protocol requirement in WebSocket '${t.path}'.`)});try{th(n)}catch(e){throw S(e,`Invalid protocols given to WebSocket '${t.path}': [${n}]`)}}var Ph=class{api;baseUrl;fetchOverride;webSocketConstructor;constructor(e,t,n,r){this.api=e,this.baseUrl=t,this.fetchOverride=n,this.webSocketConstructor=r}fetch(e){return b(e.requests,t=>({key:t,value:async(...n)=>await this.runEndpointRequest(e,t,n[0])}))}async fetchStream(e,t,...n){return await this.runEndpointRequest(e,t,n[0],({response:t})=>{if(!t.body)throw Error(`Endpoint '${e.path}' returned an ok response with no body to stream.`);return t.body})}async runEndpointRequest(e,t,n,r){if(!A.hasKey(this.api.endpoints,e.path))throw Error(`Cannot fetch: this api has no '${e.path}' endpoint.`);let{requestInit:i,url:a}=this.buildEndpointRequestInit(e,t,n);return await lh({endpoint:e,method:t,response:await(n?.fetchOverride||this.fetchOverride||fetch)(a,i,e),includeResponse:!0,handleDeclaredResponseStatusOverride:r,shouldCondenseResponse:!1})}buildEndpointUrl(e,t,n){let r=n,i=Zm(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=_h(i.searchParams,r.searchParams),o=$m(e,{pathParams:r.pathParams});return Ar(this.baseUrl,{search:a,pathname:o},{encoding:fr.Encode}).href}buildEndpointRequestInit(e,t,n){let r=n,i=Zm(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=gh(e.path,i.requiredRequestHeaders,r?.requiredHeaders),o=!!r&&`requestData`in r&&r.requestData!==void 0,s={...b(r?.options?.headers instanceof Headers?De(Array.from(r.options.headers.entries())):A.isArray(r?.options?.headers)?De(r.options.headers):r?.options?.headers||{},(e,t)=>({key:e.toLowerCase(),value:t})),...a};s[`content-type`]||r?.requestData instanceof FormData||r?.skipAutomaticContentTypeHeader||o&&(s[`content-type`]=`application/json`);let c=!!s[`content-type`]?.match(/\bjson\b/i);return{url:this.buildEndpointUrl(e,t,r||{}),requestInit:{...r?.options,headers:s,method:t,...o?c?{body:JSON.stringify(r.requestData)}:{body:r.requestData}:{}}}}async connectWebSocket(e,...t){let n=t[0];Nh(n?.protocols,e);let r=this.buildWebSocketUrl(e,n);return await Eh(e,new((n?.webSocketConstructor)||this.webSocketConstructor||Fh)(r,n?.protocols,e),n?.listeners)}buildWebSocketUrl(e,t){let n=t,r=e,i=_h(r.searchParams,n?.searchParams),a=$m(r,{pathParams:n?.pathParams}),o=Ar(this.baseUrl,{search:i,pathname:a},{encoding:fr.Encode}).href;return Ar(o,{protocol:o.startsWith(`https`)?`wss`:`ws`}).href}},Fh=function(...[e,t]){return new globalThis.WebSocket(e,t)},Ih={room:`r_`,client:`c_`,socketMessage:`sm_`},Lh=pe(Ih,(e,t)=>()=>`${t}${mn()}`),Rh=pe(Ih,e=>bn({checkValue(t){return A.isString(t)&&t.startsWith(Ih[e])},default:``,name:`${e} multiplayer id shape`})),$;(function(e){e.Offer=`offer`,e.Answer=`answer`,e.OfferResult=`offer-result`,e.HostPing=`host-ping`,e.Error=`error`})($||={});var zh=t({type:xn($.Answer),sdp:``}),Bh=t({type:xn($.Offer),sdp:``}),Vh=t({clientId:Rh.client(),roomId:Rh.room(),roomName:``}),Hh=t({messageId:Rh.socketMessage()}),Uh=t(wn(Vh,Hh,{type:xn($.Answer),data:F({rejected:xn(!0)},zh)})),Wh=t(wn(Vh,Hh,{type:xn($.HostPing),clientSecret:``,clientCount:-1,roomPassword:``})),Gh=t(wn(Vh,Hh,{type:xn($.Offer),data:Bh})),Kh=t(wn(Gh,Hh,{clientSecret:``,roomPassword:``})),qh=t(wn(Hh,{type:xn($.OfferResult),hostClientId:Rh.client()})),Jh=t(wn(Hh,{type:xn($.Error),errorMessage:``})),Yh=t({roomName:``,roomId:Rh.room(),clientCount:-1,hasRoomPassword:!1}),Xh=t(On({keys:Rh.room(),values:Yh,partial:!0})),Zh=Ar(`http://localhost`,{port:9348}).origin,Qh=Xm({path:`/`,requests:{[Xt.Get]:{responses:{[ie.Ok]:{responseData:xn(`ok`)}}}}}),$h=Xm({path:`/health`,requests:{[Xt.Get]:{responses:{[ie.Ok]:{responseData:xn(`ok`)}}}}}),eg=Xm({path:`/rooms`,requests:{[Xt.Get]:{responses:{[ie.Ok]:{responseData:Xh}},searchParams:{gameId:Pn(``)}}}}),tg=Qm({path:`/connect`,clientMessage:F(Uh,Kh,Wh),hostMessage:F(Uh,Gh,qh,Jh),searchParams:{gameId:Pn(``)}}),ng=Jm({apiName:`multiplayer-api`,endpoints:[Qh,$h,eg],webSockets:[tg]});async function rg({backendOrigin:e,portScanOptions:t,timeout:n}){let r=e||Zh,i=A.isBoolean(t)?void 0:t,a=Wm(n);return new Ph(ng,(t?await oh(ng,{startOrigin:r,timeout:n,...i,fetchOverride(e,t,n){let r={...t,signal:a??null};return i?.fetchOverride?i.fetchOverride(e,r,n):globalThis.fetch(e,r)}}):void 0)?.origin||r)}function ig(e){return{type:e.type,sdp:e.sdp}}var ag=class extends m()(`webrtc-message`){},og=class extends m()(`webrtc-connect`){};function sg(e){return e.map(e=>({urls:Ke({value:e,prefix:`stun:`})}))}var cg=class extends Je{clientId;dataChannel;connection;isConnected=!1;constructor(e){super(),this.clientId=e}async createOffer(e){let t=this.createConnection(e);we.isDefined(this.connection),this.handleDataChannel(this.connection.createDataChannel(`chat`)),await this.connection.setLocalDescription(await this.connection.createOffer()),await t;let n=ig(O.isDefined(this.connection.localDescription));return s(n,Bh),n}async acceptAnswer(e){let t=A.isString(e)?JSON.parse(e):e;we.isDefined(this.connection),s(t,zh),await this.connection.setRemoteDescription(t)}async createAnswer(e,t){let n=A.isString(e)?JSON.parse(e):e,r=this.createConnection(t);we.isDefined(this.connection),this.connection.addEventListener(`datachannel`,e=>{this.handleDataChannel(e.channel)}),await this.connection.setRemoteDescription(n),await this.connection.setLocalDescription(await this.connection.createAnswer()),t.length&&await r;let i=ig(O.isDefined(this.connection.localDescription));return s(i,zh),i}sendMessage(e){we.isTrue(this.isConnected,`There is no WebRTC connection to send a message to from ${this.clientId}.`),we.isDefined(this.dataChannel,`There is no WebRTC connection to send a message to from ${this.clientId}.`),this.dataChannel.send(JSON.stringify(e))}destroy(){this.dataChannel?.close(),this.connection?.close(),super.destroy()}handleDataChannel(e){this.dataChannel?.close(),this.dataChannel=e,this.dataChannel.addEventListener(`open`,()=>{h(this).isConnected=!0,this.dispatch(new og({detail:!0}))}),this.dataChannel.addEventListener(`closing`,()=>{h(this).isConnected=!1,this.dispatch(new og({detail:!1}))}),this.dataChannel.addEventListener(`message`,e=>{let t=_e(()=>A.isString(e.data)?JSON.parse(e.data):e.data,{fallbackValue:e.data});this.dispatch(new ag({detail:t}))})}createConnection(e){if(this.connection)throw Error(`Connection already created!`);let t=new w,n=e=>{e.candidate||(we.isDefined(this.connection),t.resolve(),this.connection.removeEventListener(`icecandidate`,n))};return this.connection=new RTCPeerConnection({iceServers:sg(e)}),this.connection.addEventListener(`icecandidate`,n),t.promise}},lg=class extends m()(`webrtc-multiplayer-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},ug=class extends m()(`webrtc-multiplayer-connection-update`){},dg=class e extends Je{gameId;multiplayerApiClient;stunServerUrls;multiplayerRoom;clientId;shouldAllowConnectionCheck;hostClientId;connections={};webSocket;clientSecret=en(32);isDestroyed=!1;hostPingTimeoutId;reconnectPromise;isCleaningUpConnection=!1;constructor(e,t,n,r,i=Lh.client(),a=()=>!0){super(),this.gameId=e,this.multiplayerApiClient=t,this.stunServerUrls=n,this.multiplayerRoom=r,this.clientId=i,this.shouldAllowConnectionCheck=a}isHost(){return this.hostClientId===this.clientId}getConnectedClientIds(){return g(Ne(this.connections),e=>e.clientId,(e,t)=>t.isConnected)}getAllClientIds(){let e=this.getConnectedClientIds(),t=this.isHost()?[...e,this.clientId]:this.hostClientId&&this.isConnected()?[...e,this.clientId,this.hostClientId]:e;return me(t)}isConnected(){return this.isHost()||!!this.getConnectedClientIds().length}destroy(){h(this).isDestroyed=!0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,Object.values(this.connections).forEach(e=>e.destroy()),this.webSocket?.close(),this.connectionQueue.destroy(),super.destroy()}sendMessage(e){Object.values(this.connections).forEach(t=>{if(t.isConnected)try{t.sendMessage(e)}catch(e){E.error(se(e))}})}sendToOnlyOneClient(e,t){if(!this.isHost()){E.error(Error(`Cannot send to an individual client as not a host.`));return}let n=this.connections[e];if(!n||!n.isConnected){E.error(Error(`Cannot send to missing or disconnected client ('${e}')`));return}n.sendMessage(t)}async initConnection({abortSignal:e}={}){if(Object.values(this.connections).length)return!1;try{let t=await Gm(this.createNewConnection(this.clientId).createOffer(this.stunServerUrls),e),n=await Gm((await this.setupWebSocket(e)).sendAndWaitForReply({message:{messageId:Lh.socketMessage(),type:$.Offer,clientId:this.clientId,clientSecret:this.clientSecret,data:t,...this.multiplayerRoom},replyCheck(e){return e.type===$.OfferResult}}),e);return we.strictEquals(n.type,$.OfferResult),await Gm(Xe.isDefined(()=>this.hostClientId),e),this.sendHostPing(),!0}catch(e){this.isCleaningUpConnection=!0;try{this.connections[this.clientId]?.destroy(),delete this.connections[this.clientId],globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,await this.webSocket?.close(),this.webSocket=void 0}finally{this.isCleaningUpConnection=!1}throw e}}sendHostPing(){this.isHost()&&this.webSocket&&(this.webSocket.send({messageId:Lh.socketMessage(),type:$.HostPing,clientCount:this.getAllClientIds().length,clientId:this.clientId,clientSecret:this.clientSecret,...this.multiplayerRoom}),this.hostPingTimeoutId=setTimeout(()=>this.sendHostPing(),1e3))}reconnectAfterHostLoss(){this.isDestroyed||this.reconnectPromise||this.isCleaningUpConnection||(this.reconnectPromise=nn(3,()=>this.initConnection(),{interval:{seconds:1}}).then(()=>void 0).catch(e=>{E.warning(S(e,`Failed to reconnect to the multiplayer room.`))}).finally(()=>{this.reconnectPromise=void 0}))}connectionQueue=new yn;async setupWebSocket(t){if(this.webSocket&&(this.webSocket.readyState===WebSocket.OPEN||this.webSocket.readyState===WebSocket.CONNECTING))return this.webSocket;let n=this.multiplayerApiClient.connectWebSocket(tg,{searchParams:{gameId:[this.gameId]},listeners:{message:async({message:t,webSocket:n})=>{try{if(t.type===$.Offer){if(!this.isHost())throw Error(`Non-host multiplayer client received a WebRTC offer.`);let e={messageId:t.messageId,type:$.Answer,roomId:t.roomId,roomName:t.roomName,clientId:t.clientId};await this.connectionQueue.add(async()=>{if(!this.shouldAllowConnectionCheck({connectingClientId:t.clientId,multiplayerController:this})){E.warning(`offer rejected`),n.send({...e,data:{rejected:!0}});return}E.faint(`received offer`);let r=this.createNewConnection(t.clientId),i=await r.createAnswer(t.data,this.stunServerUrls);n.send({...e,data:i}),await Xe.isTrue(()=>r.isConnected)})}else if(t.type===$.Answer){if(this.isHost())throw Error(`Host multiplayer client received a WebRTC answer.`);let e=this.connections[this.clientId];if(`rejected`in t.data)E.warning(`offer was rejected`),this.destroy();else{if(E.faint(`received answer`),!e)throw Error(`Cannot accept answer, no init connection found.`);await e.acceptAnswer(t.data),await n.close()}}else if(t.type===$.OfferResult){if(t.hostClientId!==this.hostClientId){if(h(this).hostClientId=t.hostClientId,this.isHost()){let e=this.connections[this.clientId];delete this.connections[this.clientId],e?.destroy()}this.dispatch(new ug({detail:{newHost:t.hostClientId}}))}}else if(t.type===$.Error)throw Error(t.errorMessage);else throw Error(`Unexpected ${e.name} WebSocket message type: ${t.type}`)}catch(e){E.error(S(e,`WebSocket message failed: ${i(t)}`))}},error(e){E.error(e)},close:()=>{this.webSocket=void 0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0}}});try{let e=await Gm(n,t);return this.webSocket=e,e}catch(e){throw n.then(e=>e.close(),()=>{}),e}}createNewConnection(e){let t=new cg(e);return this.connections[e]=t,t.listen(og,n=>{n.detail?e!==this.clientId&&this.dispatch(new ug({detail:{newMember:e}})):(t.destroy(),delete this.connections[e],this.isHost()?this.dispatch(new ug({detail:{lostMember:e}})):(this.dispatch(new ug({detail:{lostHost:e}})),this.reconnectAfterHostLoss()))}),t.listen(ag,t=>{let n=e===this.clientId?this.hostClientId:e;n&&this.dispatch(new lg(n,t.detail))}),t}},fg;(function(e){e.Connecting=`connecting`,e.Connected=`connected`,e.Disconnected=`disconnected`})(fg||={});var pg={room:fg.Disconnected,api:fg.Disconnected},mg=class extends m()(`multiplayer-controller-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},hg=class extends m()(`multiplayer-controller-room-list`){},gg=class extends m()(`multiplayer-controller-client-status`){},_g=class extends m()(`multiplayer-controller-connection`){},vg=class e extends Je{params;static events={MultiplayerControllerMessageEvent:mg,MultiplayerControllerRoomListEvent:hg,MultiplayerControllerClientStatusEvent:gg,MultiplayerControllerConnectionEvent:_g};events=e.events;static knownErrors={RoomRejectionError:Km};knownErrors=e.knownErrors;isListeningToRoomUpdates=!1;roomId;apiConnectionState=fg.Disconnected;roomConnectionState=fg.Disconnected;currentConnection;rejectedRoomIds=new Set;multiplayerApiClient;roomUpdateIntervalId;multiplayerParams;getClientId(){return this.currentConnection?.clientId}getConnectedClientIds(){return this.currentConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.currentConnection?.getAllClientIds()||[]}constructor(e){super(),this.params=e}async initMultiplayer(e){if(this.currentConnection)throw Error(`Cannot start multiplayer mode again when a multiplayer connection already present.`);this.multiplayerParams=e,this.updateConnectionState({api:fg.Connecting});let t=Wm(e.timeout);try{let n=e.multiplayerApiClient||await rg({portScanOptions:e.portScanOptions,backendOrigin:e.backendOrigin,timeout:e.timeout});if(!(await n.fetch($h).GET({options:{signal:t??null}})).Ok)throw Error(`Failed to find multiplayer API at ${n.baseUrl}.`);this.multiplayerApiClient=n,this.updateConnectionState({api:fg.Connected})}catch(e){throw this.updateConnectionState({api:v(e)}),e}}startRoomUpdates(e){if(this.isListeningToRoomUpdates=!0,this.startRoomInterval(),e)return this.listen(hg,async t=>{await e(t.detail)})}stopRoomUpdates(){this.isListeningToRoomUpdates=!1,this.stopRoomInterval()}sendMessage(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot send message: not connected to a room.`);this.currentConnection.sendMessage(e)}isHost(){return this.currentConnection?.isHost()||!1}isConnected(){return this.currentConnection?.isConnected()||!1}destroy(){super.destroy(),this.updateConnectionState({room:fg.Disconnected,api:fg.Disconnected}),this.currentConnection?.destroy(),this.stopRoomUpdates()}async joinOrCreateRoom(e,{timeout:t}={}){if(!this.multiplayerApiClient||!this.multiplayerParams)throw Error(`Cannot join room. Please start this controller in multiplayer mode to join rooms.`);if(this.rejectedRoomIds.has(e.roomId))throw new Km(e);let n=this.currentConnection,r=this.roomId,i=Wm(t);this.updateConnectionState({room:fg.Connecting});let a=new dg(this.params.gameId,this.multiplayerApiClient,this.multiplayerParams.stunServerUrls||[],e,this.params.clientId,this.params.acceptConnection?e=>this.params.acceptConnection?.(e.connectingClientId,this)??!0:void 0);a.listen(lg,e=>{this.dispatch(new mg(e.sourceClientId,e.detail))}),a.listen(ug,e=>{this.dispatch(new gg({detail:e.detail}))});try{if(await a.initConnection({abortSignal:i}),(await Gm(Xe.isDefined(()=>{let e=a.isConnected(),t=a.isDestroyed;return!e&&!t?void 0:{connected:e,destroyed:t}}),i)).connected)await Gm(Promise.resolve(this.params.prepareConnection?.(a)),i),this.currentConnection=a,n?.destroy(),h(this).roomId=e.roomId,this.stopRoomUpdates(),this.updateConnectionState({room:fg.Connected});else throw this.rejectedRoomIds.add(e.roomId),new Km(e)}catch(e){throw a.destroy(),n?(this.currentConnection=n,h(this).roomId=r,this.updateConnectionState({room:fg.Connected})):(this.currentConnection=void 0,this.updateConnectionState({room:v(e)})),e}}leaveRoom(){this.currentConnection&&(h(this).roomId=void 0,this.currentConnection.destroy(),this.currentConnection=void 0,this.updateConnectionState({room:fg.Disconnected}))}updateConnectionState(e){e.api&&(h(this).apiConnectionState=e.api),e.room&&(h(this).roomConnectionState=e.room),this.dispatch(new _g({detail:{room:this.roomConnectionState,api:this.apiConnectionState}}))}stopRoomInterval(){globalThis.clearInterval(this.roomUpdateIntervalId),this.roomUpdateIntervalId=void 0}startRoomInterval(){if(this.stopRoomInterval(),this.isListeningToRoomUpdates&&this.multiplayerApiClient){let e=this.multiplayerParams?.roomUpdateInterval?Qe(this.multiplayerParams.roomUpdateInterval,{milliseconds:!0}).milliseconds:1e4;this.roomUpdateIntervalId=globalThis.setInterval(async()=>{if(!this.isListeningToRoomUpdates||!this.multiplayerApiClient)return;let e=await this.multiplayerApiClient.fetch(eg).GET({searchParams:{gameId:[this.params.gameId]}});e.Ok&&this.dispatch(new hg({detail:e.Ok.responseData}))},e)}}},yg=class e extends Je{static knownErrors={RoomRejectionError:Km};knownErrors=e.knownErrors;debugMultiplayer;roomController;localClientId=Lh.client();roomConnection;singleplayer=!1;constructor(e){super(),this.debugMultiplayer=!!e.debugMultiplayer,this.debugLog(`constructing controller for game '${e.gameId}'`),this.roomController=new vg({gameId:e.gameId,clientId:this.localClientId,prepareConnection:async e=>{await this.prepareRoomConnection?.(e)},acceptConnection:e=>(this.debugLog(`checking incoming connection from ${e}`),this.shouldAcceptConnection(e))}),this.listenToRoomController()}get currentConnection(){return this.isConnected()?this:void 0}get clientId(){return this.roomConnection?.clientId||this.localClientId}get roomId(){return this.roomController.roomId}get apiConnectionState(){return this.roomController.apiConnectionState}get roomConnectionState(){return this.roomController.roomConnectionState}get multiplayerApiClient(){return this.roomController.multiplayerApiClient}startRoomUpdates(e){return this.roomController.startRoomUpdates(e)}stopRoomUpdates(){this.roomController.stopRoomUpdates()}getClientId(){return this.singleplayer?this.localClientId:this.roomConnection?.clientId||this.roomController.getClientId()}getConnectedClientIds(){return this.roomConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.singleplayer?[this.localClientId]:this.roomConnection?.getAllClientIds()||[]}async initMultiplayer(e){this.debugLog(`initializing multiplayer with backend ${e.backendOrigin}`),await this.roomController.initMultiplayer(e),this.debugLog(`multiplayer API initialized`)}isHost(){return this.singleplayer||this.roomConnection?.isHost()||!1}isConnected(){return this.singleplayer||this.roomConnection?.isConnected()||!1}leaveRoom(){if(!this.currentConnection){this.debugLog(`leaveRoom called without a current connection`);return}this.debugLog(`leaving room '${this.roomId||`unknown`}'`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.leaveRoom()}destroy(){this.debugLog(`destroying controller`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.destroy(),super.destroy()}listenToRoomController(){this.roomController.listen(hg,e=>{this.dispatch(e)}),this.roomController.listen(_g,e=>{this.debugLog(`connection event received: api=${String(e.detail.api)} room=${String(e.detail.room)}`),this.dispatch(e)}),this.roomController.listen(gg,e=>{this.debugLog(`client event received: ${JSON.stringify(e.detail)}`),this.handleClientStatus?.(e.detail),this.dispatch(e)}),this.roomController.listen(mg,e=>{this.debugLog(`message event received from ${e.sourceClientId}`),this.handleReceivedMessage(e.sourceClientId,e.detail)})}debugLog(e){E.if(this.debugMultiplayer).faint(`[multiplayer] ${e}`)}},bg;(function(e){e.Actions=`actions`,e.Frame=`frame`,e.StateSyncRequest=`state-sync-request`})(bg||={});var xg=class extends m()(`multiplayer-controller-frame`){constructor(e){super(e)}},Sg=class extends m()(`multiplayer-controller-desync`){},Cg=class extends m()(`multiplayer-controller-state-sync`){},wg={milliseconds:10},Tg=class e extends yg{params;currentFps=0;static events={MultiplayerControllerDesyncEvent:Sg,MultiplayerControllerFrameEvent:xg,MultiplayerControllerStateSyncEvent:Cg};events=e.events;frameCount=0;clientsResponded={};frameActions=[];timeoutId;frameTickReady=!0;frameMs;producedFrameCount=0;desyncCheckFrameInterval;latestCheckFrameEvent;nextFrameStateHash;localStateHash;stateSyncRequestClientIds=[];stateSyncFrameClientIds=[];awaitingStateSync=!1;joiningRoom=!1;lastFpsCalculation={timestamp:0,frameCount:0};stateSyncFrameCount;constructor(e){super(e),this.params=e;let t=e.frameDuration||wg;this.frameMs=Qe(t,{milliseconds:!0}).milliseconds,this.desyncCheckFrameInterval=e.desyncCheckInterval&&this.frameMs?Math.max(1,Math.round(Qe(e.desyncCheckInterval,{milliseconds:!0}).milliseconds/this.frameMs)):void 0}shouldAcceptConnection(e){return this.params.acceptConnection?.(e,this)??!0}startSingleplayer(){if(this.currentConnection)throw Error(`Cannot start singleplayer with a connection already present.`);this.debugLog(`starting singleplayer connection`),this.resetStateSync(),this.setFrameCount(0),this.singleplayer=!0,this.finishFrame(),this.dispatch(new _g({detail:{...pg,api:fg.Connected}})),this.debugLog(`singleplayer connection ready with client ${this.getClientId()||`unknown`}`)}runFrame(e){this.debugLog(`runFrame called with ${e?.length||0} actions`),e&&this.act(e),this.isHost()&&(this.frameTickReady=!0,this.maybeFinishFrame())}getFps(){return this.currentFps}act(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot perform action: not connected to a room.`);let t=ye(e);this.debugLog(`act called with ${t.length} actions`),this.frameActions=[...this.frameActions,...t.map(e=>({sourceClientId:this.clientId,packet:e}))]}countAppliedFrame(){return this.setFrameCount(this.frameCount+1),this.frameCount}reportStateHash({frameEvent:e,stateHash:t}){this.awaitingStateSync||(this.isHost()?e===this.latestCheckFrameEvent&&(this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=t):this.localStateHash=t)}checkStateHash(e){if(this.awaitingStateSync||e.detail.hostStateHash==null||this.localStateHash==null||e.detail.hostStateHash===this.localStateHash)return;let t={hostStateHash:e.detail.hostStateHash,localStateHash:this.localStateHash};E.warning(`[multiplayer] Desync detected: local state hash ${t.localStateHash} does not match host state hash ${t.hostStateHash}.`),this.dispatch(new Sg({detail:t})),this.params.resyncOnDesync&&this.requestStateSync()}requestStateSync(){!this.params.enableStateSync||this.isHost()||this.awaitingStateSync||(this.debugLog(`requesting state sync from host`),this.awaitingStateSync=!0,this.localStateHash=void 0,this.roomConnection?.sendMessage({type:bg.StateSyncRequest}))}finishStateSync(){this.awaitingStateSync=!1,this.localStateHash=void 0,this.setFrameCount(this.stateSyncFrameCount??0),this.stateSyncFrameCount=void 0}sendStateSync(e){let t=this.getConnectedClientIds();this.stateSyncFrameClientIds.filter(e=>t.includes(e)).forEach(t=>{this.debugLog(`sending state sync to ${t}`),this.roomConnection?.sendToOnlyOneClient(t,{type:bg.Frame,packets:[],isSynchronizationFrame:!0,stateSync:e,frameCount:this.frameCount})}),this.stateSyncFrameClientIds=[],this.maybeFinishFrame()}destroy(){globalThis.clearTimeout(this.timeoutId),super.destroy()}async joinOrCreateRoom(e,t={}){let n=this.roomConnection,r=this.singleplayer;this.debugLog(`joining or creating room '${e.roomName}' (${e.roomId})`),this.joiningRoom=!0;try{let i=await this.joinRoom({previousRoomConnection:n,room:e,timeoutOptions:t});this.resetDesyncCheck(),this.resetStateSync(),n?(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.frameActions=[],this.frameTickReady=!0):r&&(globalThis.clearTimeout(this.timeoutId),this.frameTickReady=!0),this.singleplayer=!1,this.setFrameCount(0),this.awaitingStateSync=!!this.params.enableStateSync&&!i.isHost(),this.attachMultiplayerRoomConnection(i),this.debugLog(`attached p2p-lock-step connection; client=${this.getClientId()||`unknown`} host=${this.isHost()} connected=${this.isConnected()}`)}finally{this.joiningRoom=!1}}async joinRoom({previousRoomConnection:e,room:t,timeoutOptions:n}){try{if(await this.roomController.joinOrCreateRoom(t,n),this.debugLog(`room controller joined room '${t.roomName}' (${t.roomId}); client=${this.roomController.getClientId()||`unknown`} host=${this.roomController.isHost()}`),!this.roomController.currentConnection)throw Error(`Cannot start p2p-lock-step multiplayer: room connection is missing.`);return this.roomController.currentConnection}catch(t){throw this.debugLog(`join room failed: ${String(t)}`),this.roomConnection=e,t}}leaveRoom(){this.currentConnection&&(globalThis.clearTimeout(this.timeoutId),this.resetStateSync()),super.leaveRoom()}handleClientStatus(e){`newMember`in e?this.syncNewMember(e.newMember):`newHost`in e&&this.handleNewHost(e.newHost)}attachMultiplayerRoomConnection(e){this.debugLog(`attached room connection; client=${e.clientId} host=${e.isHost()} connected=${e.isConnected()} connectedClients=${e.getConnectedClientIds().length} allClients=${e.getAllClientIds().length}`),this.roomConnection=e,e.isHost()?this.finishFrame():(this.debugLog(`attached as member; sending initial readiness actions to host`),e.sendMessage({actions:[],sourceClientId:this.clientId,type:bg.Actions}))}handleNewHost(e){!this.joiningRoom&&e===this.localClientId&&this.roomConnection&&this.roomConnection.isHost()&&(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.resetDesyncCheck(),this.resetStateSync(),this.frameTickReady=!0,this.finishFrame())}syncNewMember(e){this.debugLog(`syncNewMember called for ${e}; host=${this.isHost()}`),this.params.enableStateSync?this.queueStateSync(e):this.roomConnection&&this.isHost()&&this.roomConnection.sendToOnlyOneClient(e,{type:bg.Frame,packets:[],isSynchronizationFrame:!0})}messageHandlers={[bg.Actions]:{isForHost:!0,handle:({message:e,sourceClientId:t})=>{this.debugLog(`host received ${e.actions.length} actions from ${t}`),this.clientsResponded={...this.clientsResponded,[t]:!0},this.frameActions=[...this.frameActions,...e.actions.map(e=>({sourceClientId:t,packet:e}))],this.maybeFinishFrame()}},[bg.Frame]:{isForHost:!1,handle:({message:e})=>{this.debugLog(`member received frame with ${e.packets.length} actions; sending ${this.frameActions.length} local actions back to host`);let t=this.frameActions;this.frameActions=[],this.roomConnection?.sendMessage({actions:t.map(({packet:e})=>e),sourceClientId:this.clientId,type:bg.Actions}),e.stateSync===void 0?e.isSynchronizationFrame||(this.calculateFps(),this.dispatch(new xg({detail:{packets:e.packets,hostStateHash:e.stateHash,shouldReportNextFrameHash:e.shouldReportNextFrameHash}}))):(this.stateSyncFrameCount=e.frameCount,this.dispatch(new Cg({detail:{stateSync:e.stateSync}})))}},[bg.StateSyncRequest]:{isForHost:!0,handle:({sourceClientId:e})=>{this.queueStateSync(e)}}};handleReceivedMessage(e,t){if(this.debugLog(`received lock-step message from ${e}: type=${t.type} host=${this.isHost()}`),!this.roomConnection){this.debugLog(`ignored message because no room connection is attached`);return}let n=t.type;this.messageHandlers[n].isForHost===this.isHost()&&this.messageHandlers[n].handle({message:t,sourceClientId:e})}queueStateSync(e){!this.isHost()||this.stateSyncRequestClientIds.includes(e)||this.stateSyncFrameClientIds.includes(e)||(this.debugLog(`queueing state sync for ${e}`),this.stateSyncRequestClientIds=[...this.stateSyncRequestClientIds,e])}resetStateSync(){this.stateSyncRequestClientIds=[],this.stateSyncFrameClientIds=[],this.stateSyncFrameCount=void 0,this.awaitingStateSync=!1}setFrameCount(e){h(this).frameCount=e}resetDesyncCheck(){this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=void 0,this.localStateHash=void 0}calculateFps(){let e=Date.now(),t=Date.now()-this.lastFpsCalculation.timestamp;t>1e3?(h(this).currentFps=this.lastFpsCalculation.frameCount/(t/1e3),this.lastFpsCalculation={frameCount:0,timestamp:e}):this.lastFpsCalculation={...this.lastFpsCalculation,frameCount:this.lastFpsCalculation.frameCount+1}}finishFrame(){let e=this.frameActions,t=this.nextFrameStateHash;this.frameActions=[],this.nextFrameStateHash=void 0,this.producedFrameCount++;let n=!!this.desyncCheckFrameInterval&&!(this.producedFrameCount%this.desyncCheckFrameInterval)&&this.getAllClientIds().length>1,r=!!this.stateSyncRequestClientIds.length;this.stateSyncFrameClientIds=[...this.stateSyncFrameClientIds,...this.stateSyncRequestClientIds],this.stateSyncRequestClientIds=[],this.roomConnection?.sendMessage({type:bg.Frame,packets:e,...n&&{shouldReportNextFrameHash:n},...t!=null&&{stateHash:t}});let i=new xg({detail:{packets:e,shouldReportNextFrameHash:n,...r&&{shouldSendStateSync:r}}});n&&(this.latestCheckFrameEvent=i),this.dispatch(i),this.frameTickReady=!1,this.calculateFps(),this.frameMs&&(this.timeoutId=globalThis.setTimeout(()=>{this.frameTickReady=!0,this.maybeFinishFrame()},this.frameMs))}maybeFinishFrame(){if(!this.isHost()){this.debugLog(`maybeFinishFrame skipped because this client is not host`);return}let e=this.singleplayer||this.roomConnection?.getConnectedClientIds().every(e=>this.clientsResponded[e]);if(!this.frameTickReady||!e||this.stateSyncFrameClientIds.length){this.debugLog(`maybeFinishFrame waiting: frameTickReady=${this.frameTickReady} clientsReady=${!!e} stateSyncs=${this.stateSyncFrameClientIds.length}`);return}this.finishFrame()}};function Eg(e={}){let t=!!(e.handlePacket||e.runFrameUpdate||e.desyncCheck||e.stateSync);return Ye({modName:`antha-multiplayer-p2p-lock-step`,trigger:t||e.handleClientStatus?{event:[...t?[xg]:[],...e.stateSync?[Cg]:[],...e.handleClientStatus?[gg]:[]],executeImmediately:!0}:void 0,cleanup({state:e}){E.if(!!e.multiplayerP2pLockStep?.multiplayerController.debugMultiplayer).faint(`[multiplayer] cleaning up p2p-lock-step mod`),e.multiplayerP2pLockStep?.multiplayerController.destroy()},async execute(n){let{engine:r,state:i}=n;i.multiplayerP2pLockStep||(i.multiplayerP2pLockStep={multiplayerController:new Tg({gameId:e.gameId||`antha`,acceptConnection:e.acceptConnection,debugMultiplayer:e.debugMultiplayer,desyncCheckInterval:e.desyncCheck?.interval,enableStateSync:!!e.stateSync,frameDuration:e.frameDuration,resyncOnDesync:e.stateSync?.resyncOnDesync}),connectionState:pg},i.multiplayerP2pLockStep.multiplayerController.listen(_g,({detail:e})=>{i.multiplayerP2pLockStep&&(E.if(i.multiplayerP2pLockStep.multiplayerController.debugMultiplayer).faint(`[multiplayer] mod connection state updated: api=${String(e.api)} room=${String(e.room)}`),i.multiplayerP2pLockStep.connectionState=e)}),i.multiplayerP2pLockStep.multiplayerController.listenToAll(e=>{r.dispatch(e)})),n.executionTrigger.type===xe.Event&&await ae(n.executionTrigger.events,async r=>{if(i.multiplayerP2pLockStep?.multiplayerController){if(r instanceof gg){await e.handleClientStatus?.({event:r,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});return}if(r instanceof Cg){await e.stateSync?.loadStateSync({stateSync:r.detail.stateSync,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i}),i.multiplayerP2pLockStep.multiplayerController.finishStateSync();return}if(r instanceof xg&&t&&!i.multiplayerP2pLockStep.multiplayerController.awaitingStateSync){i.multiplayerP2pLockStep.multiplayerController.checkStateHash(r);let t=i.multiplayerP2pLockStep.multiplayerController.countAppliedFrame();if(e.handlePacket)for(let t of r.detail.packets)await e.handlePacket({packet:t,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});await e.runFrameUpdate?.({...n,currentTick:t,executionTrigger:{events:[r],type:xe.Event},msSinceLastExecute:i.multiplayerP2pLockStep.multiplayerController.frameMs,multiplayerFrameEvent:r,ticksSinceLastExecute:1}),r.detail.shouldReportNextFrameHash&&i.multiplayerP2pLockStep.multiplayerController.reportStateHash({frameEvent:r,stateHash:await e.desyncCheck?.createStateHash({state:i})}),r.detail.shouldSendStateSync&&e.stateSync&&i.multiplayerP2pLockStep.multiplayerController.sendStateSync(await e.stateSync.createStateSync({state:i}))}}})}})}function Dg(){return 0}var Og={async[Z.StartRun]({detail:e,state:t}){if(!t.entityStore)throw Error(`Cannot start run: no entity store exists.`);t.entityStore.destroyAllEntities();let n=nl(e.packet.levelId);t.level=n,t.runState=al(n.levelId,e.packet.mode),e.packet.ready&&(t.runState.status=z.Ready),await t.entityStore.addEntity(Am),await t.entityStore.addEntity(jm),await t.entityStore.addEntity(Nm);for(let e of n.paths)for(let n of e.chutes??[])await t.entityStore.addEntity(Mm,{...Gc(e,n.distancePx),pathId:e.pathId,distancePx:n.distancePx,active:!1});await t.entityStore.addEntity(Hm,{msUntilNextSpawn:0,pendingClumpSpawns:0,msUntilClumpSpawn:0,clumpWaveIndex:0,clumpPathId:``}),await t.entityStore.addEntity(Im,{}),await t.entityStore.addEntity(pm,{msUntilWaiter:_u.waiterIntervalMs}),await t.entityStore.addEntity(gm)},[Z.BeginRun]({state:e}){e.runState?.status===z.Ready&&(e.runState.status=z.Playing)},async[Z.PlaceTower]({detail:e,state:t}){let{packet:n}=e;if(!t.entityStore||!t.level||t.runState?.status!==z.Playing||t.runState.paused)return;let r=[...t.entityStore.getEntities(wf)].map(e=>({x:e.params.x,y:e.params.y}));gf(t.runState.coins,n.towerType)&&hf({level:t.level,towers:r,point:{x:n.x,y:n.y}}).valid&&(t.runState.coins-=xc.towerCost[n.towerType],await t.entityStore.addEntity(wf,{x:n.x,y:n.y,towerType:n.towerType,towerId:t.runState.nextTowerId,level:1,builtAtMs:t.runState.elapsedMs,ownerSlot:Dg(),cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:n.angleDeg??0,wear:0}),t.runState.nextTowerId++)},[Z.UpgradeTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===z.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(wf)){if(n.params.towerId!==e.packet.towerId)continue;if(n.params.level>=ml.maxLevel)return;let r=El(n.params.towerType,n.params.level+1);t.runState.coins>=r&&(t.runState.coins-=r,n.params.level++);return}},[Z.SellTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===z.Playing&&!t.runState.paused){for(let n of t.entityStore.getEntities(wf))if(n.params.towerId===e.packet.towerId){Mu(t.runState,{amount:Dl(n.params.towerType,n.params.level),reason:`Sold ${Sl[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.destroy(),n.params.towerId=0;return}}},[Z.ServiceTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===z.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(wf)){if(n.params.towerId!==e.packet.towerId)continue;let r=_l(n.params.towerType);n.params.wear>0&&t.runState.coins>=r&&(Mu(t.runState,{amount:-r,reason:`Serviced ${Sl[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.params.wear=0);return}},[Z.TogglePause]({state:e}){e.runState?.status===z.Playing&&(e.runState.paused=!e.runState.paused)},[Z.SetSpeed]({detail:e,state:t}){t.runState?.status===z.Playing&&kf(e.packet.speed)&&(t.runState.speed=e.packet.speed)},[Z.ArmSpeedReset]({state:e}){e.runState?.status===z.Playing&&(e.runState.resetSpeedOnIncome=!0)},[Z.ApplyTopping]({detail:e,state:t}){let{packet:n}=e;if(t.entityStore&&t.runState?.status===z.Playing&&!t.runState.paused){for(let e of t.entityStore.getEntities(bd))if(e.params.potatoId===n.potatoId){!e.params.carriedBySeagull&&e.params.dropInMs<=0&&ku(e.params,n.topping)&&(e.params[n.topping]=!0);return}}}},kg=Eg({gameId:`colcannon-fodder`,desyncCheck:{interval:{seconds:1},createStateHash({state:e}){if(e.entityStore&&e.seededRandom&&e.runState)return Fi([e.entityStore.hashEntities(),e.seededRandom.exportState(),e.runState])}},stateSync:{createStateSync({state:e}){if(!e.entityStore||!e.seededRandom||!e.runState)throw Error(`Cannot create state sync: game state is incomplete.`);return{entities:e.entityStore.createSnapshot(),randomState:e.seededRandom.exportState(),runState:e.runState}},async loadStateSync({state:e,stateSync:t}){if(!e.entityStore)throw Error(`Cannot load state sync: no entity store exists.`);e.seededRandom=hn.fromState(t.randomState),e.runState=t.runState,e.entityStore.destroyAllEntities(),e.entityStore.registerEntities({entities:Um}),await e.entityStore.loadSnapshot(t.entities)},resyncOnDesync:!0},async handlePacket({packet:e,state:t}){try{await Og[e.packet.type]({detail:e,state:t})}catch(t){E.error(S(t,`Failed to handle '${e.packet.type}' command.`))}},handleClientStatus(){},async runFrameUpdate(e){let{state:t}=e;if(t.runState?.status!==z.Playing||t.runState.paused)return;let{steps:n,accumulator:r}=Of({accumulator:t.runState.speedAccumulator,speed:t.runState.speed});t.runState.speedAccumulator=r;for(let r=0;r<n&&t.runState.status===z.Playing;r++)t.runState.elapsedMs+=e.msSinceLastExecute,await t.entityStore?.updateAllEntities(e)}}),Ag=Ye({modName:`game-update`,execute({state:e}){!e.hasStartedInitialGame&&e.multiplayerP2pLockStep&&e.entityStore&&e.pixi?.pixiApplication?.screen&&(e.hasStartedInitialGame=!0,um===cm.Dev&&(globalThis.gameState=e),e.multiplayerP2pLockStep.multiplayerController.startSingleplayer(),Q(e,{type:Z.StartRun,ready:!0,levelId:Ef()}))}});async function jg({assetLoader:e,engine:t,loadSession:n,state:r}){t.currentMods.push(Qs({virtualHeight:k.height,virtualWidth:k.width}));let i=new Di;return r.audioPlayer=i,await Bs({assetLoader:e,audio:{assetName:`Game audio`,audioPlayer:i,files:rc,serial:!0},entities:Um},{doNotUnload:!0,loadSession:n}),r.currentBackgroundAudio=nc[ec.GameMusic],r.level=tl,r.runState=al(),r.seededRandom=hn.fromSeed(en()),r.ui={selectedTowerType:void 0,selectedTopping:void 0,selectedTowerId:void 0,pointerWorld:void 0,clicks:[],keys:[],wheelSteps:0,placementAngleDeg:0},{mods:[Us({extraCanvasWrapperStyles:j`
                    z-index: 0;
                `,pixiOptions:{background:`black`,...Gs()}}),...um===cm.Dev?[Vs({debugFps:!0})]:[],ji(),$p,lu,kg,Ag,sm,Fd,nm,Xp,Mi()]}}export{jg as bootstrapGame};