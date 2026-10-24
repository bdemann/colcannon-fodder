const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/browserAll-VMSClpaX.js","assets/Geometry-IpHxCVTc.js","assets/rolldown-runtime-hePW80VL.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/init-CeGg-dAz.js","assets/webworkerAll-B3Hkad6o.js","assets/WebGPURenderer-LTLhAvoo.js","assets/WebGPURenderer-D1KgKO0_.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js","assets/BufferResource-VXlz2pxo.js","assets/WebGLRenderer-caqgVvmv.js","assets/WebGLRenderer-C1XjW2ra.js","assets/CanvasRenderer-CobwcNGA.js","assets/CanvasRenderer-bnA_Jfob.js"])))=>i.map(i=>d[i]);
import{$ as e,A as t,At as n,B as r,Bt as i,C as a,Ct as o,D as s,Dt as c,E as l,Et as u,F as d,Ft as f,G as p,Gt as m,H as h,Ht as g,I as _,It as v,J as y,K as b,L as x,Lt as S,M as C,Mt as ee,N as te,Nt as ne,O as re,Ot as ie,P as w,Pt as ae,Q as oe,R as se,Rt as ce,S as le,St as ue,T as de,Tt as fe,U as T,Ut as pe,V as me,Vt as he,W as ge,Wt as _e,X as ve,Y as ye,Z as be,_t as xe,a as Se,at as Ce,bt as we,ct as Te,d as Ee,dt as De,et as Oe,f as E,ft as ke,g as Ae,gt as je,h as Me,ht as Ne,it as Pe,j as Fe,jt as Ie,k as Le,kt as Re,l as ze,lt as D,m as Be,mt as Ve,nt as He,o as Ue,ot as We,p as Ge,pt as Ke,q as qe,r as Je,rt as Ye,s as Xe,st as Ze,t as O,ut as k,v as A,vt as Qe,w as j,wt as $e,x as et,xt as tt,yt as nt,zt as rt}from"./game-world-DqpF5MyS.js";import{B as it,C as at,D as ot,F as st,G as ct,M as lt,N as ut,O as dt,Q as ft,S as pt,T as mt,W as ht,X as gt,Z as _t,_ as vt,at as yt,b as bt,c as xt,ct as St,f as Ct,m as wt,n as Tt,nt as Et,o as Dt,ot as Ot,p as kt,r as At,rt as jt,s as Mt,st as Nt,t as Pt,tt as Ft,w as It,x as Lt}from"./Geometry-IpHxCVTc.js";import{t as Rt}from"./getPo2TextureFromSource-BZjp2c1c.js";import{t as zt}from"./canvasUtils-BVGwBBBn.js";import{a as Bt,i as Vt,n as M,o as Ht,r as Ut,s as Wt}from"./CanvasRenderer-bnA_Jfob.js";import{A as Gt,D as Kt,a as qt,i as Jt,l as Yt,u as Xt,w as Zt}from"./RenderTargetSystem-Dmqog6ll.js";var Qt={Get:`GET`,Head:`HEAD`,Options:`OPTIONS`,Trace:`TRACE`,Put:`PUT`,Delete:`DELETE`,Post:`POST`,Patch:`PATCH`,Connect:`CONNECT`};function $t({min:e,max:t}){return e>t?{min:t,max:e}:{min:e,max:t}}function en({min:e,max:t}){let{min:n,max:r}=$t({min:Math.floor(e),max:Math.floor(t)}),i=r-n+1,a=Math.ceil(Math.ceil(Math.log2(i))/8);if(a>65e3)throw RangeError(`Cannot create a random integer so large. ({min: ${n}, max: ${r}})`);let o=Math.floor(256**a/i)*i,s=new Uint8Array(a),c;do crypto.getRandomValues(s),c=s.reduce((e,t,n)=>e+t*256**n,0);while(c>=o);return n+c%i}var tn=`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.split(``);function nn(e=16){let t=``;for(let n=0;n<e;n++){let e=en({min:0,max:tn.length-1});t+=tn[e]}return t}async function rn(e){let t=new ne;return setTimeout(async()=>{t.resolve(await e())}),t.promise}function an(e,t,n={}){return on({currentRetry:0,maxRetries:e,callback:t,options:n})}function on({currentRetry:e,maxRetries:t,callback:n,options:r={}}){try{let i=n({retryCount:e,isFirstExecution:e===0,isFirstRetry:e===1,isLastRetry:e===t});return i instanceof Promise?i.catch(async i=>{if(e>=t)throw S(i,`Retry max reached`);return r.interval&&await Ne(r.interval),on({currentRetry:e+1,maxRetries:t,callback:n,options:r})}):i}catch(i){if(e>=t)throw S(i,`Retry max reached`);return r.interval?Ne(r.interval).then(()=>on({currentRetry:e+1,maxRetries:t,callback:n,options:r})):on({currentRetry:e+1,maxRetries:t,callback:n,options:r})}}function sn(e){try{return JSON.parse(JSON.stringify(e))}catch(t){throw console.error(`Failed to JSON copy for:`,e),S(t,`Failed JSON copy`)}}function cn(e,{min:t,max:n}){return Math.min(Math.max(e,t),n)}function ln(e,{digits:t}){if(t==null)return e;let n=10**t,r=e*n;return Number((Math.round(r)/n).toFixed(t))}function un({searchIn:e,searchFor:t,caseSensitive:n,includeLength:r}){let i=Ke(Ve(t,{caseSensitive:n}),`g`),a=[],o=[];return e.replace(i,(...n)=>{let r=n[n.length-2];if(typeof r!=`number`)throw TypeError(`Match index "${r}" is not a number. Searching for "${t}" in "${e}".`);let i=n[0];if(typeof i!=`string`)throw TypeError(`regExpMatch should've been a string but was ${typeof i}!`);o.push({index:r,length:i.length}),a.push(r);let s=n[0];if(typeof s!=`string`)throw TypeError(`Original match when searching for "${t}" in "${e}" at index ${r} is not a string.`);return s}),r?o:a}function dn(e,t,{caseSensitive:n}){let r=un({searchIn:e,searchFor:t,caseSensitive:n,includeLength:!0}),i=Ve(t,{caseSensitive:n});return e.split(i).reduce((t,n,i)=>{let a=r[i],o=t.concat(n);if(a){let t=e.slice(a.index,a.index+a.length);return o.concat(t)}return o},[])}function fn({value:e,splitter:t}){return e.split(t)}var pn=class{topMostConstructor;map=new Map;isDestroyed=!1;constructor(e){this.topMostConstructor=e}add(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`add`)}getInstances(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);return We(this.map,e,()=>new Set)}remove(e){if(this.isDestroyed)throw Error(`Cannot operate on destroyed ConstructorMap.`);this.traverseConstructors(e,Object.getPrototypeOf(e),`remove`)}traverseConstructors(e,t,n){let r=t.constructor;if(r&&r!==Function&&r!==Object&&r!==this.topMostConstructor){if(n===`add`)We(this.map,r,()=>new Set).add(e);else{let t=this.map.get(r);t&&t.delete(e)}this.traverseConstructors(e,Object.getPrototypeOf(t),n)}}destroy(){this.isDestroyed||(h(this).isDestroyed=!0,this.map.clear(),delete this.map)}};function mn(t,n){let r=e(t).filter(([e,r])=>n(e,r,t));return Oe(r)}function hn(e,t){return mn(e,e=>!t.includes(e))}function gn(){return r()}var _n=class e{alea;static fromSeed(t){return new e(new vn(t))}static fromState(t){let n=new vn(``);return n.importState(t),new e(n)}exportState(){return this.alea.exportState()}constructor(e){this.alea=e}next(){return this.alea.next()}clone(){return e.fromState(this.exportState())}},vn=class{n=4022871197;s=[this.mash(` `),this.mash(` `),this.mash(` `),1];mash(e){let t=e.toString();for(let e=0;e<t.length;e++){this.n+=t.codePointAt(e);let n=.02519603282416938*this.n;this.n=n>>>0,n-=this.n,n*=this.n,this.n=n>>>0,n-=this.n,this.n+=n*4294967296}return(this.n>>>0)*23283064365386963e-26}constructor(e){this.s[0]-=this.mash(e),this.s[0]<0&&(this.s[0]+=1),this.s[1]-=this.mash(e),this.s[1]<0&&(this.s[1]+=1),this.s[2]-=this.mash(e),this.s[2]<0&&(this.s[2]+=1)}next(){let e=2091639*this.s[0]+this.s[3]*23283064365386963e-26;return this.s[0]=this.s[1],this.s[1]=this.s[2],this.s[2]=e-(this.s[3]=e|0)}importState(e){this.s=e}exportState(){return[...this.s]}};function yn({value:e,wrapper:t}){return qe({value:ge({value:e,suffix:t}),prefix:t})}var bn=class extends m()(`promise-queue-update`){},xn=class extends Ye{queue=[];currentlyAwaiting=void 0;queueItemIds=new Set;get size(){return this.queue.length}add(e,t){let n={original:e,id:t,wrapper:new ne};return this.queue.push(n),t!=null&&this.queueItemIds.add(t),this.dispatch(new bn({detail:{queueSize:this.size,addedItem:n}})),this.triggerNextQueueItem(),n.wrapper.promise}hasItemById(e){return this.queueItemIds.has(e)}handleItemSettle({rejection:e,resolution:t}){let n=this.currentlyAwaiting;if(!n)throw Error(`Cannot handle queue item settle without a currently awaited queue item.`);return this.queue.splice(0,1),this.dispatch(new bn({detail:{queueSize:this.size,finishedItem:n}})),e?n.wrapper.reject(e):n.wrapper.resolve(t),n.id!=null&&this.queueItemIds.delete(n.id),this.currentlyAwaiting=void 0,this.triggerNextQueueItem(),n}triggerNextQueueItem(){if(this.currentlyAwaiting||!k.isLengthAtLeast(this.queue,1))return!1;let e=this.queue[0];return this.currentlyAwaiting=e,e.original().then(e=>{this.handleItemSettle({resolution:e})}).catch(e=>{this.handleItemSettle({rejection:e})}),!0}};function Sn({checkValue:e,default:n,name:r}){return d(r)||_(r,(t,n)=>e(n)),(e=n)=>t(w.Unsafe({[x]:r,default:e}))}function Cn(e){return k.isSymbol(e)?Tn(e):t(w.Const(e,{default:e}))}var wn=`ExactSymbol`;function Tn(e){return d(`ExactSymbol`)||_(wn,(e,t)=>t===e.symbol),te(wn,({schema:e})=>`Expected symbol ${e.symbol?.description?yn({value:e.symbol.description,wrapper:`'`}):`<unnamed symbol>`}`),t(w.Unsafe({[x]:wn,symbol:e,default:e}))}function En(...e){let n={},r=e.map(e=>{let r=t(e);return Object.assign(n,r.default),r.$_schema});return t(w.Composite(r,{default:n}))}function Dn(e,n={}){se.ExactOptionalPropertyTypes=!0;let r=t(e).$_schema,i=n.alsoUndefined?w.Union([w.Undefined(),r]):r;return t(w.Optional(i))}function N(...e){let n,r=e.map((e,r)=>{let i=t(e);return r||(n=i.default),i.$_schema});return t(w.Union(r,{default:n}))}function On({exclusiveMax:e,exclusiveMin:n,...r}){let{min:i,max:a}=$t(r),o=r.default??(a-i)/2+i,c=t(w.Number({...n?{exclusiveMinimum:i}:{minimum:i},...e?{exclusiveMaximum:a}:{maximum:a},default:o})),l=ve(()=>s(o,c));if(l)throw S(l,`Default range value is not within range.`);return c}var kn=`recordShape`;function An({keys:e,values:n,partial:r,additionalProperties:i}){jn();let a=Pn(e),o=t(n);return t(w.Unsafe({[x]:kn,keysShape:a,valuesShape:o,isPartial:!!r,additionalProperties:!!i,default:Nn({isPartial:!!r,keysShape:a,valuesShape:o})}))}function jn(){d(`recordShape`)||_(kn,(e,t)=>{if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=Object.entries(t).every(([t,n])=>{let r=e.additionalProperties||re(t,e.keysShape),i=re(n,e.valuesShape);return r&&i}),r=e.isPartial||!Mn(e.keysShape,t).length;return n&&r}),te(kn,e=>{let t=e.schema,n=e.value;if(typeof n!=`object`||!n||Array.isArray(n))return`Expected an object`;let r=g(Object.entries(n),([e])=>e,(e,[n,r])=>!re(n,t.keysShape)||!re(r,t.valuesShape)),i=Mn(t.keysShape,n);return[r.length?[`Failure at keys`,r.join(`,`)].join(`: `):``,i.length?[`Missing keys`,i.join(`,`)].join(`: `):``].filter(k.isTruthy).join(`
`)})}function Mn(e,t){let n=Fn(e).filter(e=>k.isPropertyKey(e));return n.length?n.filter(e=>!k.hasKey(t,e)):[]}function Nn({keysShape:e,valuesShape:t,isPartial:n}){if(n)return{};{let n=Fn(e),r=t.default;return Object.fromEntries(n.map(e=>[e,r]))}}function Pn(e){return C(e)?e:Fe(e)?t(e):k.isObject(e)?Le(e):k.isArray(e)&&k.isLengthAtLeast(e,1)?N(...e.map(e=>Cn(e))):k.isPropertyKey(e)?t(e):t(w.Undefined())}function Fn(e){let n=e.$_schema,r=n[x].toLowerCase();return[`const`,`literal`].includes(r)?[n.const]:r===`union`?he(n.anyOf.flatMap(e=>Fn(t(e)))):[`undefined`,`number`,`string`,`symbol`].includes(r)?[]:Fn(Pn(e.default))}function In(...e){let n=[],r=[];return e.forEach(e=>{let i=t(e);n.push(i.default),r.push(i.$_schema)}),t(w.Tuple(r,{default:n}))}function Ln(e){let t=n.fromObject(hn(e,[`timezone`]),{zone:e.timezone});if(!t.isValid)throw Error(t.invalidExplanation??void 0);return t}function Rn(e,t){if(!e.isValid)throw Error(`Invalid input: '${e.toISO()}'`);let n=e.zoneName;if(n==null)throw Error(`Valid Luxon dates must have a timezone.`);let r=ke(n);return{day:je(e.day),month:we(e.month),year:e.year,hour:xe(e.hour),minute:nt(e.minute),second:tt(e.second),millisecond:Qe(e.millisecond),timezone:t??r}}var zn=`Africa/Abidjan.Africa/Accra.Africa/Addis_Ababa.Africa/Algiers.Africa/Asmara.Africa/Bamako.Africa/Bangui.Africa/Banjul.Africa/Bissau.Africa/Blantyre.Africa/Brazzaville.Africa/Bujumbura.Africa/Cairo.Africa/Casablanca.Africa/Ceuta.Africa/Conakry.Africa/Dakar.Africa/Dar_es_Salaam.Africa/Djibouti.Africa/Douala.Africa/El_Aaiun.Africa/Freetown.Africa/Gaborone.Africa/Harare.Africa/Johannesburg.Africa/Juba.Africa/Kampala.Africa/Khartoum.Africa/Kigali.Africa/Kinshasa.Africa/Lagos.Africa/Libreville.Africa/Lome.Africa/Luanda.Africa/Lubumbashi.Africa/Lusaka.Africa/Malabo.Africa/Maputo.Africa/Maseru.Africa/Mbabane.Africa/Mogadishu.Africa/Monrovia.Africa/Nairobi.Africa/Ndjamena.Africa/Niamey.Africa/Nouakchott.Africa/Ouagadougou.Africa/Porto-Novo.Africa/Sao_Tome.Africa/Timbuktu.Africa/Tripoli.Africa/Tunis.Africa/Windhoek.America/Adak.America/Anchorage.America/Anguilla.America/Antigua.America/Araguaina.America/Argentina/Buenos_Aires.America/Argentina/Catamarca.America/Argentina/ComodRivadavia.America/Argentina/Cordoba.America/Argentina/Jujuy.America/Argentina/La_Rioja.America/Argentina/Mendoza.America/Argentina/Rio_Gallegos.America/Argentina/Salta.America/Argentina/San_Juan.America/Argentina/San_Luis.America/Argentina/Tucuman.America/Argentina/Ushuaia.America/Aruba.America/Asuncion.America/Atikokan.America/Bahia.America/Bahia_Banderas.America/Barbados.America/Belem.America/Belize.America/Blanc-Sablon.America/Boa_Vista.America/Bogota.America/Boise.America/Cambridge_Bay.America/Campo_Grande.America/Cancun.America/Caracas.America/Cayenne.America/Cayman.America/Chicago.America/Chihuahua.America/Coral_Harbour.America/Costa_Rica.America/Creston.America/Cuiaba.America/Curacao.America/Danmarkshavn.America/Dawson.America/Dawson_Creek.America/Denver.America/Detroit.America/Dominica.America/Edmonton.America/Eirunepe.America/El_Salvador.America/Ensenada.America/Fort_Nelson.America/Fortaleza.America/Glace_Bay.America/Goose_Bay.America/Grand_Turk.America/Grenada.America/Guadeloupe.America/Guatemala.America/Guayaquil.America/Guyana.America/Halifax.America/Havana.America/Hermosillo.America/Indiana/Indianapolis.America/Indiana/Knox.America/Indiana/Marengo.America/Indiana/Petersburg.America/Indiana/Tell_City.America/Indiana/Vevay.America/Indiana/Vincennes.America/Indiana/Winamac.America/Inuvik.America/Iqaluit.America/Jamaica.America/Juneau.America/Kentucky/Louisville.America/Kentucky/Monticello.America/La_Paz.America/Lima.America/Los_Angeles.America/Maceio.America/Managua.America/Manaus.America/Martinique.America/Matamoros.America/Mazatlan.America/Menominee.America/Merida.America/Metlakatla.America/Mexico_City.America/Miquelon.America/Moncton.America/Monterrey.America/Montevideo.America/Montreal.America/Montserrat.America/Nassau.America/New_York.America/Nipigon.America/Nome.America/Noronha.America/North_Dakota/Beulah.America/North_Dakota/Center.America/North_Dakota/New_Salem.America/Nuuk.America/Ojinaga.America/Panama.America/Pangnirtung.America/Paramaribo.America/Phoenix.America/Port-au-Prince.America/Port_of_Spain.America/Porto_Velho.America/Puerto_Rico.America/Punta_Arenas.America/Rainy_River.America/Rankin_Inlet.America/Recife.America/Regina.America/Resolute.America/Rio_Branco.America/Rosario.America/Santarem.America/Santiago.America/Santo_Domingo.America/Sao_Paulo.America/Scoresbysund.America/Sitka.America/St_Johns.America/St_Kitts.America/St_Lucia.America/St_Thomas.America/St_Vincent.America/Swift_Current.America/Tegucigalpa.America/Thule.America/Thunder_Bay.America/Tijuana.America/Toronto.America/Tortola.America/Vancouver.America/Whitehorse.America/Winnipeg.America/Yakutat.America/Yellowknife.Antarctica/Casey.Antarctica/Davis.Antarctica/DumontDUrville.Antarctica/Macquarie.Antarctica/Mawson.Antarctica/McMurdo.Antarctica/Palmer.Antarctica/Rothera.Antarctica/Syowa.Antarctica/Troll.Antarctica/Vostok.Asia/Aden.Asia/Almaty.Asia/Amman.Asia/Anadyr.Asia/Aqtau.Asia/Aqtobe.Asia/Ashgabat.Asia/Atyrau.Asia/Baghdad.Asia/Bahrain.Asia/Baku.Asia/Bangkok.Asia/Barnaul.Asia/Beirut.Asia/Bishkek.Asia/Brunei.Asia/Chita.Asia/Choibalsan.Asia/Chongqing.Asia/Colombo.Asia/Damascus.Asia/Dhaka.Asia/Dili.Asia/Dubai.Asia/Dushanbe.Asia/Famagusta.Asia/Gaza.Asia/Harbin.Asia/Hebron.Asia/Ho_Chi_Minh.Asia/Hong_Kong.Asia/Hovd.Asia/Irkutsk.Asia/Jakarta.Asia/Jayapura.Asia/Jerusalem.Asia/Kabul.Asia/Kamchatka.Asia/Karachi.Asia/Kashgar.Asia/Kathmandu.Asia/Khandyga.Asia/Kolkata.Asia/Krasnoyarsk.Asia/Kuala_Lumpur.Asia/Kuching.Asia/Kuwait.Asia/Macau.Asia/Magadan.Asia/Makassar.Asia/Manila.Asia/Muscat.Asia/Nicosia.Asia/Novokuznetsk.Asia/Novosibirsk.Asia/Omsk.Asia/Oral.Asia/Phnom_Penh.Asia/Pontianak.Asia/Pyongyang.Asia/Qatar.Asia/Qostanay.Asia/Qyzylorda.Asia/Riyadh.Asia/Sakhalin.Asia/Samarkand.Asia/Seoul.Asia/Shanghai.Asia/Singapore.Asia/Srednekolymsk.Asia/Taipei.Asia/Tashkent.Asia/Tbilisi.Asia/Tehran.Asia/Tel_Aviv.Asia/Thimphu.Asia/Tokyo.Asia/Tomsk.Asia/Ulaanbaatar.Asia/Urumqi.Asia/Ust-Nera.Asia/Vientiane.Asia/Vladivostok.Asia/Yakutsk.Asia/Yangon.Asia/Yekaterinburg.Asia/Yerevan.Atlantic/Azores.Atlantic/Bermuda.Atlantic/Canary.Atlantic/Cape_Verde.Atlantic/Faroe.Atlantic/Jan_Mayen.Atlantic/Madeira.Atlantic/Reykjavik.Atlantic/South_Georgia.Atlantic/St_Helena.Atlantic/Stanley.Australia/Adelaide.Australia/Brisbane.Australia/Broken_Hill.Australia/Currie.Australia/Darwin.Australia/Eucla.Australia/Hobart.Australia/Lindeman.Australia/Lord_Howe.Australia/Melbourne.Australia/Perth.Australia/Sydney.EST.Etc/GMT+1.Etc/GMT+10.Etc/GMT+11.Etc/GMT+12.Etc/GMT+2.Etc/GMT+3.Etc/GMT+4.Etc/GMT+5.Etc/GMT+6.Etc/GMT+7.Etc/GMT+8.Etc/GMT+9.Etc/GMT-1.Etc/GMT-10.Etc/GMT-11.Etc/GMT-12.Etc/GMT-13.Etc/GMT-14.Etc/GMT-2.Etc/GMT-3.Etc/GMT-4.Etc/GMT-5.Etc/GMT-6.Etc/GMT-7.Etc/GMT-8.Etc/GMT-9.Europe/Amsterdam.Europe/Andorra.Europe/Astrakhan.Europe/Athens.Europe/Belfast.Europe/Belgrade.Europe/Berlin.Europe/Brussels.Europe/Bucharest.Europe/Budapest.Europe/Chisinau.Europe/Copenhagen.Europe/Dublin.Europe/Gibraltar.Europe/Guernsey.Europe/Helsinki.Europe/Isle_of_Man.Europe/Istanbul.Europe/Jersey.Europe/Kaliningrad.Europe/Kirov.Europe/Kyiv.Europe/Lisbon.Europe/Ljubljana.Europe/London.Europe/Luxembourg.Europe/Madrid.Europe/Malta.Europe/Minsk.Europe/Monaco.Europe/Moscow.Europe/Oslo.Europe/Paris.Europe/Prague.Europe/Riga.Europe/Rome.Europe/Samara.Europe/Sarajevo.Europe/Saratov.Europe/Simferopol.Europe/Skopje.Europe/Sofia.Europe/Stockholm.Europe/Tallinn.Europe/Tirane.Europe/Tiraspol.Europe/Ulyanovsk.Europe/Uzhgorod.Europe/Vaduz.Europe/Vienna.Europe/Vilnius.Europe/Volgograd.Europe/Warsaw.Europe/Zagreb.Europe/Zaporozhye.Europe/Zurich.HST.Indian/Antananarivo.Indian/Chagos.Indian/Christmas.Indian/Cocos.Indian/Comoro.Indian/Kerguelen.Indian/Mahe.Indian/Maldives.Indian/Mauritius.Indian/Mayotte.Indian/Reunion.MST.Pacific/Apia.Pacific/Auckland.Pacific/Bougainville.Pacific/Chatham.Pacific/Chuuk.Pacific/Easter.Pacific/Efate.Pacific/Enderbury.Pacific/Fakaofo.Pacific/Fiji.Pacific/Funafuti.Pacific/Galapagos.Pacific/Gambier.Pacific/Guadalcanal.Pacific/Guam.Pacific/Honolulu.Pacific/Johnston.Pacific/Kanton.Pacific/Kiritimati.Pacific/Kosrae.Pacific/Kwajalein.Pacific/Majuro.Pacific/Marquesas.Pacific/Midway.Pacific/Nauru.Pacific/Niue.Pacific/Norfolk.Pacific/Noumea.Pacific/Pago_Pago.Pacific/Palau.Pacific/Pitcairn.Pacific/Pohnpei.Pacific/Port_Moresby.Pacific/Rarotonga.Pacific/Saipan.Pacific/Tahiti.Pacific/Tarawa.Pacific/Tongatapu.Pacific/Wake.Pacific/Wallis.UTC`.split(`.`),Bn=new Set(zn),Vn=new Map,Hn=1e3;function Un(e){if(Bn.has(e))return!0;let t=Vn.get(e);if(t!=null)return t;let n=Ie.isValidIANAZone(e);if(Vn.size>=Hn){let e=Vn.keys().next();e.done||Vn.delete(e.value)}return Vn.set(e,n),n}function Wn(e,t){if(!Un(e))throw new De(`'${e}' is not a valid time zone`,t)}var Gn=zn.reduce((e,t)=>(e[t]=t,e),{}),Kn=ke(ee.defaultZone.name),qn=Gn.UTC,Jn=Sn({default:qn,name:`Timezone`,checkValue(e){return k.isString(e)&&Un(e)}}),Yn=t({hour:On({...fe,default:fe.min}),minute:On({...c,default:c.min}),second:On({...ie,default:ie.min}),millisecond:On({...u,default:u.min}),timezone:Jn()}),Xn=t({year:2023,month:On({...o,default:o.min}),day:On({...ue,default:ue.min}),timezone:Jn()}),Zn=t(En(Xn,Yn));function Qn(e){s(e,Zn),Wn(e.timezone),Ln(e)}function $n(e){try{return Qn(e),!0}catch{return!1}}var er=[`L-y`,`LLL-y`,`LLLL-y`,`ccc, d LLL y H:mm:ss ZZZ (z)`,`ccc, dd LLL y HH:mm:ss ZZZ (z)`,`ccc, dd LLL y H:mm:ss ZZZ (z)`,`ccc, d LLL y HH:mm:ss ZZZ (z)`,`ccc, d LLL y H:mm:ss ZZZ`,`ccc, dd LLL y HH:mm:ss ZZZ`,`ccc, dd LLL y H:mm:ss ZZZ`,`ccc, d LLL y HH:mm:ss ZZZ`,`L/d '|' h:mma`,`LL/dd '|' hh:mma`];function tr(e,t){let r=n.fromISO(e,{zone:t});if(r.isValid)return r;let i;return er.some(r=>{let a=n.fromFormat(e.trim(),r,{zone:t});return a.isValid?(i=a,!0):!1}),i}function nr(e){return rr(e,Kn)}function rr(e,t){let n=ar(e,t);if(!n?.isValid)throw Error(`Failed to parse date input '${i(e)}'`);return Rn(n,t)}function ir(e){let t=n.fromJSDate(new Date(e));if(t.isValid)return t}function ar(e,t){if($n(e)&&(e=Ln(e).toMillis()),n.isDateTime(e))return e.setZone(t);if(k.isNumber(e))return n.fromMillis(e,{zone:qn}).setZone(t);if(k.isString(e)){let n=tr(e,t);if(n)return n}else if(e instanceof Date)return n.fromJSDate(e).setZone(t);return ir(e)}function or(e){return e.replace(new RegExp(String.fromCodePoint(8239),`g`),` `)}function sr(e,t,n=Re){return or(Ln(e).toFormat(t,{locale:n}))}var cr=et(class extends le{constructor(){super(...arguments),this.key=j}render(e,t){return this.key=e,t}update(e,[t,n]){return t!==this.key&&(a(e),this.key=t),n}}),lr=`onDomCreated`,ur=et(class extends le{element;constructor(e){super(e),Me(e,lr)}update(e,[t]){Me(e,lr);let n=e.element;return n!==this.element&&(window.requestAnimationFrame(()=>t(n)),this.element=n),this.render(t)}render(e){}});function dr(e){return A`
        color: ${e.foreground.value};
        background-color: ${e.background.value};
    `}var fr=`://`;function pr(...e){let t=e.join(`/`),n=t.indexOf(fr),[r,i]=n===-1?[``,t]:[t.slice(0,n),t.slice(n+3)],a=!1,o=i.replace(/\/{2,}/g,`/`).split(`/`).reduce((e,t,n,r)=>{if(a)return e;let i=r[n+1],o=t,s=i?.startsWith(`?`),c=!t.includes(`?`)&&s,l=i===`?`;if(s||c){a=!0;let e=!1,s=r.slice(n+2).reduce((t,n)=>(n.includes(`#`)&&(e=!0),e?t.concat(n):[t,n].join(`&`)),``);o=[t,i,l?y({value:s,prefix:`&`}):s].join(``)}return e.concat(o)},[]);return[r,r?fr:``,o.join(`/`)].join(``)}var mr;(function(e){e.Encode=`encode`,e.Decode=`decode`,e.None=`none`})(mr||={});var hr;(function(e){e.Clear=`clear`,e.Replace=`replace`,e.Append=`append`})(hr||={});var gr=t({encoding:Dn(N(void 0,Le(mr))),searchParamStrategy:Dn(N(void 0,Le(hr)))});function _r(e,t){return e.map(e=>{if(e!=null)return vr(String(e),t)}).filter(e=>e!=null)}function vr(e,t){return t?.encoding===mr.Decode?decodeURIComponent(e):t?.encoding===mr.Encode?encodeURIComponent(e):e}t(An({keys:``,values:[``]}));function yr(e,t,n){let r=n?.searchParamStrategy===hr.Clear?{}:me(e,(e,t)=>be(t)),i=me(t,(e,t)=>{if(n?.searchParamStrategy===hr.Append){let i=r[e],a=k.isArray(i)?i:[i];if(t){let e=k.isArray(t)?t:[t];return _r([...a,...e],n)}return _r(a,n)}if(k.isArray(t))return _r(t,n);if(t)return _r([t],n)});return mn({...r,...i},(e,t)=>!!t)}function br(e,t){if(k.isString(e)&&!e.includes(`?`))return{};let n=k.isString(e)?e:e instanceof URLSearchParams?e.toString():e.search,r=n.indexOf(`#`);return{...(r===-1?n:n.slice(0,r)).replace(/^[^?]*\?/,``).split(`&`).filter(e=>e!==``).map(e=>{let[t,...n]=fn({value:e,splitter:`=`});return[t,n.length?n.join(`=`):void 0]}).reduce((e,[n,r])=>{let i=Cr({options:t,key:n,value:r}),a=Ce(e,i.key,()=>[]);return r!=null&&a.push(i.value),e},Object.create(null))}}function xr(e){if(e!=null)return k.isArray(e)?[...e]:e===``?[]:[e]}function Sr(e,t){let n=g(Object.entries(e),([e,n])=>{let r=xr(n);return r?.length?r.map(n=>{let r=Cr({options:t,key:e,value:n});return[r.key,r.value].join(`=`)}):[e]},(e,[,t])=>t!=null).flat();return n.length?qe({value:n.join(`&`),prefix:`?`}):``}function Cr({options:e,key:t,value:n}){return{key:vr(t,e),value:vr(String(n),e)}}var wr=[`ftp`,`file`,`http`,`https`,`ws`,`wss`];function Tr({hash:e,hostname:t,password:n,pathname:r,port:i,protocol:a,search:o,username:s}){return[a?a+`://`:``,s?encodeURIComponent(s)+`:`:``,n?encodeURIComponent(n)+`@`:``,Or({hostname:t,port:i}),Dr({hash:e,pathname:r,search:o})].join(``)}function Er({pathname:e}){let t=y({value:e,prefix:`/`});return t?t.split(`/`):[]}function Dr({hash:e,pathname:t,search:n}){return[qe({value:t,prefix:`/`}),n?qe({value:n,prefix:`?`}):``,e?qe({value:e,prefix:`#`}):``].join(``)}function Or({hostname:e,port:t}){return[e,t?`:`+t:``].join(``)}function kr({hostname:e}){return e?e.split(`.`):[]}function Ar({hostname:e,port:t,protocol:n}){return[n,Or({hostname:e,port:t})].filter(k.isTruthy).join(`://`)}function jr(e,t){let n=k.isString(e)?y({value:e,prefix:`.`}):e.toString(),r=n.replace(/^[^#]*(?:#|$)/,``),i=r?qe({value:vr(r,t),prefix:`#`}):``,a=n.indexOf(`#`),o=a===-1?n:n.slice(0,a),s=o.replace(/^[^?]*(?:\?|$)/,``),c=s?qe({value:vr(s,t),prefix:`?`}):``,l=o.indexOf(`?`),u=l===-1?o:o.slice(0,l),d=u.includes(`://`)?u.replace(/:\/\/.*$/,``):``,f=(wr.includes(d.toLowerCase())?u.replace(/\\/g,`/`):u).replace(/^.*?:\/\//,``).replace(/\/{2,}/g,`/`),p=f.length-f.replace(/^\/*/,``).length,m=f.slice(p).replace(/\/.*/,``).lastIndexOf(`@`),h=m!==-1,g=h?f.slice(0,p+m):``,_=h?f.slice(p+m+1):f,[v,...b]=h?g.split(`:`).reverse():[],x=decodeURIComponent(b.toReversed().join(``).replace(/[/:]/g,``)||``),S=decodeURIComponent(v?.replace(/[/:]/g,``)||``),C=_.replace(/\/.*/,``),ee=dn(C,`:`,{caseSensitive:!0}).toReversed(),te=!ee[0]?.endsWith(`]`)&&ee[1]===`:`,ne=te&&ee[0]||``,re=te?C.slice(0,C.length-ne.length-1):C,ie=re.endsWith(`]`)?void 0:re.match(/^(?<host>.*):(?<port>\d+)$/),w=ie?.groups?.host??re,ae=kr({hostname:w}),oe=ie?.groups?.port??ne,se=vr(_.replace(/^[^/]*(\/|$)/,`$1`).replace(/^[^/]*(?:\/|$)/,`/`),t),ce=Or({hostname:w,port:oe}),le=Ar({hostname:w,port:oe,protocol:d}),ue=Tr({hash:i,hostname:w,password:S,pathname:se,port:oe,protocol:d,search:c,username:x}),de=br(c),fe=Er({pathname:se});return{fullPath:Dr({hash:i,pathname:se,search:c}),hash:i,host:ce,hostname:w,domains:ae,href:ue,origin:le,password:S,pathname:se,paths:fe,port:oe,protocol:d,search:c,searchParams:de,username:x}}t({hash:Dn(N(void 0,``)),search:Dn(N(void 0,``,An({keys:``,values:N(null,void 0,``,-1,!1,0n,[null,void 0,``,-1,!1,0n])}))),hostname:Dn(N(void 0,``)),domains:Dn(N(void 0,[``])),pathname:Dn(N(void 0,``)),paths:Dn(N(void 0,[``])),protocol:Dn(N(void 0,``)),username:Dn(N(void 0,``)),password:Dn(N(void 0,``)),port:Dn(N(void 0,``,-1))});function Mr(e,t,n){let r=!!n,i=t==null||re(t,gr,{allowExtraKeys:!1}),a=i?jr(``):k.instanceOf(e,URL)||k.isString(e)?jr(e):e,o=i?e:t,s=k.isString(o)&&o.startsWith(`.`),c=k.isString(o)||k.instanceOf(o,URL)?mn(jr(o),(e,t)=>k.isTruthy(t)&&(e!==`domains`||k.isArray(t)&&t.length!==0)):o,l=r?n:i?t:void 0,u=me(a,(e,t)=>{if(!k.hasKey(c,e))return t;let n=c[e];return k.isArray(n)?n:k.isNumber(n)?String(n):k.isString(n)?e===`hash`&&n?qe({value:n,prefix:`#`}):e===`pathname`?qe({value:n,prefix:`/`}):n:t});k.hasKey(c,`domains`)&&k.isArray(c.domains)&&(u.hostname=c.domains.join(`.`)),u.domains=kr(u),k.hasKey(c,`paths`)&&c.paths&&(u.pathname=pr(s?a.pathname:``,...c.paths));let d=k.isString(c.search)?br(qe({value:c.search,prefix:`?`})):sn(c.search||{}),f=yr(u.searchParams,d,{...l,encoding:mr.None}),p=Sr(f,l);return{...u,searchParams:f,search:p,paths:Er(u),fullPath:Dr(u),host:Or(u),origin:Ar(u),href:Tr({...u,search:p})}}var Nr=class{constructor(e=0,t=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=n,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){let t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++){let r=e[n];t[n]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){let e=this.first;delete this.items[e.key],--this.size===0?(this.first=null,this.last=null):(this.first=e.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){let t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){let e=Array(this.size),t=this.first,n=0;for(;t!==null;)e[n++]=t.key,t=t.next;return e}setWithEvicted(e,t,n=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,n);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let n=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=n:this.last.next=n,this.last=n}return r}set(e,t,n=!1,r=this.resetTtl){let i=this.items[e];return n||i!==void 0?(i.value=t,n===!1&&r&&(i.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(i)):(this.max>0&&this.size===this.max&&this.evict(!0),i=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=i:this.last.next=i,this.last=i),this}values(e=this.keys()){let t=Array(e.length);for(let n=0;n<e.length;n++)t[n]=this.get(e[n]);return t}};function Pr(e=1e3,t=0,n=!1){if(isNaN(e)||e<0)throw TypeError(`Invalid max value`);if(isNaN(t)||t<0)throw TypeError(`Invalid ttl value`);if(typeof n!=`boolean`)throw TypeError(`Invalid resetTtl value`);return new Nr(e,t,n)}function Fr(e){return!!e.tagStyles&&Object.keys(e.tagStyles).length>0}function Ir(e){return e.includes(`<`)}function Lr(e,t){return e.clone().assign(t)}function Rr(e,t){let n=[],r=t.tagStyles;if(!Fr(t)||!Ir(e))return n.push({text:e,style:t}),n;let i=[t],a=[],o=``,s=0;for(;s<e.length;){let t=e[s];if(t===`<`){let c=e.indexOf(`>`,s);if(c===-1){o+=t,s++;continue}let l=e.indexOf(`<`,s+1);if(l!==-1&&l<c){o+=t,s++;continue}let u=e.slice(s+1,c);if(u.startsWith(`/`)){let t=u.slice(1).trim();if(a.length>0&&a[a.length-1]===t){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``),i.pop(),a.pop(),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}{let t=u.trim();if(r[t]){o.length>0&&(n.push({text:o,style:i[i.length-1]}),o=``);let e=i[i.length-1],l=Lr(e,r[t]);i.push(l),a.push(t),s=c+1;continue}o+=e.slice(s,c+1),s=c+1;continue}}o+=t,s++}return o.length>0&&n.push({text:o,style:i[i.length-1]}),n}var zr=new Set([10,13]),Br=new Set([9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288]),Vr=new Set([45,8208,8211,8212,173]),Hr=/(\r\n|\r|\n)/,Ur=/(?:\r\n|\r|\n)/;function Wr(e){return typeof e==`string`&&zr.has(e.charCodeAt(0))}function Gr(e,t){return typeof e==`string`&&Br.has(e.charCodeAt(0))}function Kr(e){return typeof e==`string`&&Vr.has(e.charCodeAt(0))}function qr(e){return e===`normal`||e===`pre-line`}function Jr(e){return e===`normal`}function Yr(e){if(typeof e!=`string`)return``;let t=e.length-1;for(;t>=0&&Gr(e[t]);)t--;return t<e.length-1?e.slice(0,t+1):e}function Xr(e){let t=[],n=[];if(typeof e!=`string`)return t;for(let r=0;r<e.length;r++){let i=e[r],a=e[r+1];if(Gr(i,a)||Wr(i)){n.length>0&&(t.push(n.join(``)),n.length=0),i===`\r`&&a===`
`?(t.push(`\r
`),r++):t.push(i);continue}n.push(i),Kr(i)&&a&&!Gr(a)&&!Wr(a)&&(t.push(n.join(``)),n.length=0)}return n.length>0&&t.push(n.join(``)),t}function Zr(e,t,n,r){let i=n(e),a=[];for(let n=0;n<i.length;n++){let o=i[n],s=o,c=1;for(;i[n+c];){let a=i[n+c];if(!r(s,a,e,n,t))o+=a,s=a,c++;else break}n+=c-1,a.push(o)}return a}var Qr=/\r\n|\r|\n/g;function $r(e,t,n,r,i,a,o,s,c){let l=Rr(e,t);if(Jr(t.whiteSpace))for(let e=0;e<l.length;e++){let t=l[e];l[e]={text:t.text.replace(Qr,` `),style:t.style}}let u=[],d=[];for(let e of l){let t=e.text.split(Hr);for(let n=0;n<t.length;n++){let r=t[n];r===`\r
`||r===`\r`||r===`
`?(u.push(d),d=[]):r.length>0&&d.push({text:r,style:e.style})}}(d.length>0||u.length===0)&&u.push(d);let f=n?ei(u,t,r,a,s,c):u,p=[],m=[],h=[],g=[],_=[],v=0,y=t._fontString,b=o(y);b.fontSize===0&&(b.fontSize=t.fontSize,b.ascent=t.fontSize);let x=``,S=!!t.dropShadow,C=t._stroke?.width||0;for(let e of f){let n=0,a=b.ascent,s=b.descent,c=``;for(let t of e){let e=t.style._fontString,l=o(e);e!==x&&(r.font=e,x=e);let u=i(t.text,t.style.letterSpacing,r);n+=u,a=Math.max(a,l.ascent),s=Math.max(s,l.descent),c+=t.text;let d=t.style._stroke?.width||0;d>C&&(C=d),!S&&t.style.dropShadow&&(S=!0)}e.length===0&&(a=b.ascent,s=b.descent),p.push(n),m.push(a),h.push(s),_.push(c);let l=t.lineHeight||a+s;g.push(l+t.leading),v=Math.max(v,n)}let ee=C,te=v+ee+(t.dropShadow?t.dropShadow.distance:0),ne=0;for(let e=0;e<g.length;e++)ne+=g[e];return ne=Math.max(ne,g[0]+ee),{width:te,height:ne+(t.dropShadow?t.dropShadow.distance:0),lines:_,lineWidths:p,lineHeight:(t.lineHeight||b.fontSize)+t.leading,maxLineWidth:v,fontProperties:b,runsByLine:f,lineAscents:m,lineDescents:h,lineHeights:g,hasDropShadow:S}}function ei(e,t,n,r,i,a){let{letterSpacing:o,whiteSpace:s,wordWrapWidth:c,breakWords:l}=t,u=qr(s),d=c+o,f={},p=``,m=(e,t)=>{let i=`${e}|${t.styleKey}`,a=f[i];if(a===void 0){let o=t._fontString;o!==p&&(n.font=o,p=o),a=r(e,t.letterSpacing,n)+t.letterSpacing,f[i]=a}return a},h=[];for(let t of e){let e=ti(t),n=h.length,r=t=>{let n=0,r=t;do{let{token:t,style:i}=e[r];n+=m(t,i),r++}while(r<e.length&&e[r].continuesFromPrevious);return n},o=t=>{let n=[],r=t;do n.push({token:e[r].token,style:e[r].style}),r++;while(r<e.length&&e[r].continuesFromPrevious);return n},s=[],c=0,f=!u,p=null,g=()=>{p&&p.text.length>0&&s.push(p),p=null},_=()=>{if(g(),s.length>0){let e=s[s.length-1];e.text=Yr(e.text),e.text.length===0&&s.pop()}h.push(s),s=[],c=0,f=!1};for(let t=0;t<e.length;t++){let{token:n,style:v,continuesFromPrevious:y}=e[t],b=m(n,v);if(u){let e=Gr(n),t=p?.text[p.text.length-1]??s[s.length-1]?.text.slice(-1)??``,r=t?Gr(t):!1;if(e&&r)continue}let x=!y,S=x?r(t):b;if(S>d&&x){if(c>0&&_(),l){let e=o(t);for(let t=0;t<e.length;t++){let n=e[t].token,r=e[t].style,o=Zr(n,l,a,i);for(let e of o){let t=m(e,r);t+c>d&&_(),!p||p.style!==r?(g(),p={text:e,style:r}):p.text+=e,c+=t}}t+=e.length-1}else{let e=o(t);g(),h.push(e.map(e=>({text:e.token,style:e.style}))),f=!1,t+=e.length-1}}else if(S+c>d&&x){if(Gr(n)){f=!1;continue}_(),p={text:n,style:v},c=b}else if(y&&!l)!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b;else{let e=Gr(n);if(c===0&&e&&!f)continue;!p||p.style!==v?(g(),p={text:n,style:v}):p.text+=n,c+=b}}if(g(),s.length>0){let e=s[s.length-1];e.text=Yr(e.text),e.text.length===0&&s.pop()}(s.length>0||h.length===n)&&h.push(s)}return h}function ti(e){let t=[],n=!1;for(let r of e){let e=Xr(r.text),i=!0;for(let a of e){let e=Gr(a)||Wr(a),o=i&&n&&!e;t.push({token:a,style:r.style,continuesFromPrevious:o}),n=!e,i=!1}}return t}var ni={willReadFrequently:!0};function ri(e,t,n,r,i){let a=n[e];return typeof a!=`number`&&(a=i(e,t,r)+t,n[e]=a),a}function ii(e,t,n,r,i,a,o){let s=n.getContext(`2d`,ni);s.font=t._fontString;let c=0,l=``,u=[],d=Object.create(null),{letterSpacing:f,whiteSpace:p}=t,m=qr(p),h=Jr(p),g=!m,_=t.wordWrapWidth+f,v=Xr(e);for(let e=0;e<v.length;e++){let n=v[e];if(Wr(n)){if(!h){u.push(Yr(l)),g=!m,l=``,c=0;continue}n=` `}if(m){let e=Gr(n),t=Gr(l[l.length-1]);if(e&&t)continue}let p=ri(n,f,d,s,r);if(p>_){if(l!==``&&(u.push(Yr(l)),l=``,c=0),i(n,t.breakWords)){let e=Zr(n,t.breakWords,o,a);for(let t of e){let e=ri(t,f,d,s,r);e+c>_&&(u.push(Yr(l)),g=!1,l=``,c=0),l+=t,c+=e}}else l.length>0&&(u.push(Yr(l)),l=``,c=0),u.push(Yr(n)),g=!1,l=``,c=0}else p+c>_&&(g=!1,u.push(Yr(l)),l=``,c=0),(l.length>0||!Gr(n)||g)&&(l+=n,c+=p)}let y=Yr(l);return y.length>0&&u.push(y),u.join(`
`)}var ai={willReadFrequently:!0},oi=class e{static get experimentalLetterSpacingSupported(){let t=e._experimentalLetterSpacingSupported;if(t===void 0){let n=Lt.get().getCanvasRenderingContext2D().prototype;t=e._experimentalLetterSpacingSupported=`letterSpacing`in n||`textLetterSpacing`in n}return t}constructor(e,t,n,r,i,a,o,s,c,l){this.text=e,this.style=t,this.width=n,this.height=r,this.lines=i,this.lineWidths=a,this.lineHeight=o,this.maxLineWidth=s,this.fontProperties=c,l&&(this.runsByLine=l.runsByLine,this.lineAscents=l.lineAscents,this.lineDescents=l.lineDescents,this.lineHeights=l.lineHeights,this.hasDropShadow=l.hasDropShadow)}static measureText(t=` `,n,r=e._canvas,i=n.wordWrap){let a=`${t}-${n.styleKey}-wordWrap-${i}`;if(e._measurementCache.has(a))return e._measurementCache.get(a);if(Fr(n)&&Ir(t)){let r=$r(t,n,i,e._context,e._measureText,e._measureTextAdvance,e.measureFont,e.canBreakChars,e.wordWrapSplit),o=new e(t,n,r.width,r.height,r.lines,r.lineWidths,r.lineHeight,r.maxLineWidth,r.fontProperties,{runsByLine:r.runsByLine,lineAscents:r.lineAscents,lineDescents:r.lineDescents,lineHeights:r.lineHeights,hasDropShadow:r.hasDropShadow});return e._measurementCache.set(a,o),o}let o=n._fontString,s=e.measureFont(o);s.fontSize===0&&(s.fontSize=n.fontSize,s.ascent=n.fontSize,s.descent=0);let c=e._context;c.font=o;let l=(i?e._wordWrap(t,n,r):t).split(Ur),u=Array(l.length),d=0;for(let t=0;t<l.length;t++){let r=e._measureText(l[t],n.letterSpacing,c);u[t]=r,d=Math.max(d,r)}let f=n._stroke?.width??0,p=n.lineHeight||s.fontSize,m=e._adjustWidthForStyle(d,n),h=Math.max(p,s.fontSize+f)+(l.length-1)*(p+n.leading),g=e._adjustHeightForStyle(h,n),_=new e(t,n,m,g,l,u,p+n.leading,d,s);return e._measurementCache.set(a,_),_}static _adjustWidthForStyle(e,t){let n=e+(t._stroke?.width||0);return t.dropShadow&&(n+=t.dropShadow.distance),n}static _adjustHeightForStyle(e,t){let n=e;return t.dropShadow&&(n+=t.dropShadow.distance),n}static _measureText(t,n,r){let{metricWidth:i,metrics:a,letterSpacingVal:o}=e._measureTextCore(t,n,r),s=-(a.actualBoundingBoxLeft??0),c=(a.actualBoundingBoxRight??0)-s;return a.width>0&&(c+=o),Math.max(i,c)}static _measureTextAdvance(t,n,r){return e._measureTextCore(t,n,r).metricWidth}static _measureTextCore(t,n,r){let i=!1;e.experimentalLetterSpacingSupported&&(e.experimentalLetterSpacing?(r.letterSpacing=`${n}px`,r.textLetterSpacing=`${n}px`,i=!0):(r.letterSpacing=`0px`,r.textLetterSpacing=`0px`));let a=r.measureText(t),o=a.width,s=0;return o>0&&(s=i?-n:(e.graphemeSegmenter(t).length-1)*n,o+=s),{metricWidth:o,metrics:a,letterSpacingVal:s}}static _wordWrap(t,n,r=e._canvas){return ii(t,n,r,e._measureTextAdvance,e.canBreakWords,e.canBreakChars,e.wordWrapSplit)}static isBreakingSpace(e,t){return Gr(e,t)}static canBreakWords(e,t){return t}static canBreakChars(e,t,n,r,i){return!0}static wordWrapSplit(t){return e.graphemeSegmenter(t)}static measureFont(t){if(e._fonts[t])return e._fonts[t];let n=e._context;n.font=t;let r=n.measureText(e.METRICS_STRING+e.BASELINE_SYMBOL),i=r.actualBoundingBoxAscent??0,a=r.actualBoundingBoxDescent??0,o={ascent:i,descent:a,fontSize:i+a};return e._fonts[t]=o,o}static clearMetrics(t=``){t?delete e._fonts[t]:e._fonts={}}static get _canvas(){if(!e.__canvas){let t;try{let n=new OffscreenCanvas(0,0);if(n.getContext(`2d`,ai)?.measureText)return e.__canvas=n,n;t=Lt.get().createCanvas()}catch{t=Lt.get().createCanvas()}t.width=t.height=10,e.__canvas=t}return e.__canvas}static get _context(){return e.__context||=e._canvas.getContext(`2d`,ai),e.__context}};oi.METRICS_STRING=`|ÉqÅ`,oi.BASELINE_SYMBOL=`M`,oi.BASELINE_MULTIPLIER=1.4,oi.HEIGHT_MULTIPLIER=2,oi.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter==`function`){let e=new Intl.Segmenter;return t=>{let n=e.segment(t),r=[],i=0;for(let e of n)r[i++]=e.segment;return r}}return e=>[...e]})(),oi.experimentalLetterSpacing=!1,oi._fonts={},oi._measurementCache=Pr(1e3);var si=oi,ci=[`serif`,`sans-serif`,`monospace`,`cursive`,`fantasy`,`system-ui`];function li(e){let t=typeof e.fontSize==`number`?`${e.fontSize}px`:e.fontSize,n=e.fontFamily;Array.isArray(e.fontFamily)||(n=e.fontFamily.split(`,`));for(let e=n.length-1;e>=0;e--){let t=n[e].trim();!/([\"\'])[^\'\"]+\1/.test(t)&&!ci.includes(t)&&(t=`"${t}"`),n[e]=t}return`${e.fontStyle} ${e.fontVariant} ${e.fontWeight} ${t} ${n.join(`,`)}`}var ui=class e extends Ot{constructor(t={}){super(),this.uid=Ft(`textStyle`),this._tick=0,this._cachedFontString=null,fi(t),t instanceof e&&(t=t._toObject());let n={...e.defaultTextStyle,...t};for(let e in n){let t=e;this[t]=n[e]}this._tagStyles=t.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow!==t&&(this._dropShadow=typeof t==`object`&&t?this._createProxy({...e.defaultDropShadow,...t}):t?this._createProxy({...e.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(this._fontSize=typeof e==`string`?parseInt(e,10):e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...Ut.defaultFillStyle,...e},()=>{this._fill=Vt({...this._originalFill},Ut.defaultFillStyle)})),this._fill=Vt(e===0?`black`:e,Ut.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...Ut.defaultStrokeStyle,...e},()=>{this._stroke=Bt({...this._originalStroke},Ut.defaultStrokeStyle)})),this._stroke=Bt(e,Ut.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit(`update`,this)}reset(){let t=e.defaultTextStyle;for(let e in t)this[e]=t[e]}assign(e){for(let t in e){let n=t;this[n]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=li(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new e(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(t),this._originalFill?.texture&&this._originalFill.texture.destroy(t),this._stroke?.texture&&this._stroke.texture.destroy(t),this._originalStroke?.texture&&this._originalStroke.texture.destroy(t)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(e,n,r)=>e[n]===r||(e[n]=r,t?.(n,r),this.update(),!0)})}_isFillStyle(e){return(e??null)!==null&&!(yt.isColorLike(e)||e instanceof Wt||e instanceof Ht)}};ui.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:`black`,distance:5},ui.defaultTextStyle={align:`left`,breakWords:!1,dropShadow:null,fill:`black`,fontFamily:`Arial`,fontSize:26,fontStyle:`normal`,fontVariant:`normal`,fontWeight:`normal`,leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:`alphabetic`,trim:!1,whiteSpace:`pre`,wordWrap:!1,wordWrapWidth:100};var di=ui;function fi(e){let t=e;if(typeof t.dropShadow==`boolean`&&t.dropShadow){let n=di.defaultDropShadow;e.dropShadow={alpha:t.dropShadowAlpha??n.alpha,angle:t.dropShadowAngle??n.angle,blur:t.dropShadowBlur??n.blur,color:t.dropShadowColor??n.color,distance:t.dropShadowDistance??n.distance}}if(t.strokeThickness!==void 0){_t(ft,`strokeThickness is now a part of stroke`);let n=t.stroke,r={};if(yt.isColorLike(n))r.color=n;else if(n instanceof Wt||n instanceof Ht)r.fill=n;else if(Object.hasOwnProperty.call(n,`color`)||Object.hasOwnProperty.call(n,`fill`))r=n;else throw Error(`Invalid stroke value.`);e.stroke={...r,width:t.strokeThickness}}if(Array.isArray(t.fillGradientStops)){if(_t(ft,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(t.fill)||t.fill.length===0)throw Error(`Invalid fill value. Expected an array of colors for gradient fill.`);t.fill.length!==t.fillGradientStops.length&&gt(`The number of fill colors must match the number of fill gradient stops.`);let n=new Wt({start:{x:0,y:0},end:{x:0,y:1},textureSpace:`local`}),r=t.fillGradientStops.slice(),i=t.fill.map(e=>yt.shared.setValue(e).toNumber());r.forEach((e,t)=>{n.addColorStop(e,i[t])}),e.fill={fill:n}}}var pi=1e5;function mi(e,t,n,r=0,i=0,a=0){if(e.texture===dt.WHITE&&!e.fill)return yt.shared.setValue(e.color).setAlpha(e.alpha??1).toHexa();if(!e.fill){let n=t.createPattern(e.texture.source.resource,`repeat`),r=e.matrix.copyTo(jt.shared);return r.scale(e.texture.source.pixelWidth,e.texture.source.pixelHeight),n.setTransform(r),n}if(e.fill instanceof Ht){let n=e.fill,r=t.createPattern(n.texture.source.resource,`repeat`);return zt.applyPatternTransform(r,n.transform,!1),r}if(e.fill instanceof Wt){let o=e.fill,s=o.type===`linear`,c=o.textureSpace===`local`,l=1,u=1;c&&n&&(l=n.width+r,u=n.height+r);let d,f=!1;if(s){let{start:e,end:n}=o;d=t.createLinearGradient(e.x*l+i,e.y*u+a,n.x*l+i,n.y*u+a),f=Math.abs(n.x-e.x)<Math.abs((n.y-e.y)*.1)}else{let{center:e,innerRadius:n,outerCenter:r,outerRadius:s}=o;d=t.createRadialGradient(e.x*l+i,e.y*u+a,n*l,r.x*l+i,r.y*u+a,s*l)}if(f&&c&&n){let e=n.lineHeight/u;for(let t=0;t<n.lines.length;t++){let i=(t*n.lineHeight+r/2)/u;o.colorStops.forEach(t=>{let n=i+t.offset*e;n=Math.max(0,Math.min(1,n)),d.addColorStop(Math.floor(n*pi)/pi,yt.shared.setValue(t.color).toHex())})}}else o.colorStops.forEach(e=>{d.addColorStop(e.offset,yt.shared.setValue(e.color).toHex())});return d}return gt(`FillStyle not recognised`,e),`red`}function hi(){let e=new Audio,t=!!e.canPlayType(`audio/mpeg;`),n=globalThis.navigator.userAgent,r=n.match(/OPR\/(\d+)/g),i=r?.[0].split(`/`)[1],a=r&&i?parseInt(i)<33:!1,o=n.includes(`Safari`)&&!n.includes(`Chrome`),s=n.match(/Version\/(.*?) /)?.[1],c=o&&s?parseInt(s,10)<15:!1;return{mp3:!(a||!t&&!e.canPlayType(`audio/mp3;`)),mpeg:t,opus:!!e.canPlayType(`audio/ogg; codecs="opus"`),ogg:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),oga:!!e.canPlayType(`audio/ogg; codecs="vorbis"`),wav:!!(e.canPlayType(`audio/wav; codecs="1"`)||e.canPlayType(`audio/wav`)),aac:!!e.canPlayType(`audio/aac;`),caf:!!e.canPlayType(`audio/x-caf;`),m4a:!!(e.canPlayType(`audio/x-m4a;`)||e.canPlayType(`audio/m4a;`)||e.canPlayType(`audio/aac;`)),m4b:!!(e.canPlayType(`audio/x-m4b;`)||e.canPlayType(`audio/m4b;`)||e.canPlayType(`audio/aac;`)),mp4:!!(e.canPlayType(`audio/x-mp4;`)||e.canPlayType(`audio/mp4;`)||e.canPlayType(`audio/aac;`)),weba:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),webm:!(c||!e.canPlayType(`audio/webm; codecs="vorbis"`)),dolby:!!e.canPlayType(`audio/mp4; codecs="ec-3"`),flac:!!(e.canPlayType(`audio/x-flac;`)||e.canPlayType(`audio/flac;`))}}var gi=hi();me(gi,e=>e);function _i(e){return!!gi[e]}function vi(e){let t=yi(e);if(!t)throw Error(`Cannot determine file extension from '${e}'`);return _i(t)}function yi(e){let t=/^data:audio\/([^;,]+);/i.exec(e),n=e.split(`?`,1)[0],r=n&&/\.([^.]+)$/.exec(n);return(t||r)?.[1]?.toLowerCase()}async function bi(e=new AudioContext){e instanceof AudioContext&&e.state===`suspended`&&e.resume().catch(()=>{});let t=e.createBufferSource();t.buffer=e.createBuffer(1,1,22050),t.connect(e.destination);let n=new ne;return t.addEventListener(`ended`,()=>{t.disconnect(),n.isSettled||n.resolve(!0)}),t.start(),globalThis.setTimeout(()=>{n.isSettled||n.resolve(!1)},100),n.promise}function xi(e){return be(e.sources).map(e=>k.isString(e)?e:[e.url,e.codec].join(`,`)).concat(`v=${e.volume??1}`).join(`;`)}var Si=class extends _e(`audio-file-play-end`){},Ci=class extends _e(`audio-file-play-start`){};_e(`audio-file-destroyed`);var wi=class extends _e(`audio-file-load`){},Ti=class extends m()(`audio-file-error`){},Ei=class extends _e(`playing-enabled`){};function Di(e,t,n){let r=n?.(e);return!r||!k.isLengthAtLeast(r,1)?{outputNode:t}:(r.forEach((e,n,r)=>{let i=r[n+1];i?e.connect(i):e.connect(t)}),{outputNode:r[0]})}var Oi=class extends Ye{params;urlOrBase64;loadPromise;outputNode;audioContext;audioCache;fetch;isAudioAllowed=!1;isDestroyed=!1;gainNode;sourceKey;activeBufferSources=new Map;audioChannelOutputNodeMap=new Map;pausedPlaybacks=new Set;constructor(e){super(),this.params=e,this.sourceKey=xi(e);let t=be(e.sources).find(e=>k.isString(e)?vi(e):_i(e.codec));if(!t){let t=Error(`No valid audio source files found in: ${i(e.sources)}`);throw this.dispatch(new Ti({detail:t})),t}this.urlOrBase64=k.isString(t)?t:t.url,this.audioContext=e.audioContext||e.outputNode?.context||new AudioContext,this.audioCache=e.audioCache||{},this.fetch=e.fetch||globalThis.fetch.bind(globalThis),this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=cn(e.volume??1,{min:0,max:1}),this.gainNode.connect(e.outputNode||this.audioContext.destination),this.outputNode=Di(this.audioContext,this.gainNode,e.createEffects).outputNode}load(){return this.loadPromise||=this.loadAudioBuffer(),this.loadPromise}async play({outputNode:e}={}){let t=await this.load();if(!this.isAudioAllowed){if(h(this).isAudioAllowed=await bi(this.audioContext),this.isAudioAllowed)this.dispatch(new Ei);else return!1}let n={audioBuffer:t,deferredPlayPromise:new ne,offsetSeconds:0,startedAt:this.audioContext.currentTime,...e?{inputNode:We(this.audioChannelOutputNodeMap,e,()=>{let t=this.audioContext.createGain();t.gain.value=cn(this.params.volume??1,{min:0,max:1}),t.connect(e);let n={gainNode:t,inputNode:Di(this.audioContext,t,this.params.createEffects).outputNode};return this.audioChannelOutputNodeMap.set(e,n),n}).inputNode}:{}};return this.startPlayback(n),n.deferredPlayPromise.promise}stop(){let e=[...this.pausedPlaybacks],t=[...this.activeBufferSources];this.pausedPlaybacks.clear(),this.activeBufferSources.clear(),e.forEach(e=>{e.deferredPlayPromise.resolve(!0),this.dispatch(new Si)}),t.forEach(([e,t])=>{e.stop(),t.deferredPlayPromise.resolve(!0),this.dispatch(new Si)})}pause(){[...this.activeBufferSources].forEach(([e,t])=>{let n=Math.min(t.audioBuffer.duration,t.offsetSeconds+this.audioContext.currentTime-t.startedAt);n>=t.audioBuffer.duration||(this.activeBufferSources.delete(e),this.pausedPlaybacks.add({...t,offsetSeconds:n}),e.stop())})}resume(){[...this.pausedPlaybacks].forEach(e=>{this.pausedPlaybacks.delete(e),this.startPlayback(e)})}async destroy(){if(this.isDestroyed)return;h(this).isDestroyed=!0,this.stop(),super.destroy();let e=await this.audioCache[this.urlOrBase64];e&&(e.using.delete(this),e.using.size||delete this.audioCache[this.urlOrBase64]),this.audioChannelOutputNodeMap.forEach(e=>{e.inputNode!==e.gainNode&&e.inputNode.disconnect(),e.gainNode.disconnect()}),this.audioChannelOutputNodeMap.clear(),this.outputNode.disconnect(),this.audioCache={},this.loadPromise=void 0,delete this.outputNode,delete this.audioCache}async loadAudioBuffer(){try{let e=this.audioCache[this.urlOrBase64];if(e){let t=await e;return t.using.add(this),t.buffer}let t=new ne;this.audioCache[this.urlOrBase64]=t.promise;let n=/^data:[^;]+;base64,/.test(this.urlOrBase64)?this.loadBase64():await this.loadFromUrl(),r=await this.audioContext.decodeAudioData(n);return t.resolve({using:new Set([this]),buffer:r}),this.dispatch(new wi),r}catch(e){let t=v(e);throw this.dispatch(new Ti({detail:t})),t}}loadBase64(){let e=atob(D.isDefined(this.urlOrBase64.split(`,`)[1],`Invalid base64 audio string/`)),t=new Uint8Array(e.length);for(let n=0;n<e.length;++n)t[n]=D.isDefined(e.codePointAt(n),`Invalid base64 audio string at ${n}.`);return t.buffer}async loadFromUrl(){return await(await this.fetch(this.urlOrBase64)).arrayBuffer()}startPlayback(e){let t=this.audioContext.createBufferSource();t.buffer=e.audioBuffer,t.connect(e.inputNode??this.outputNode),e.startedAt=this.audioContext.currentTime,this.activeBufferSources.set(t,e),t.addEventListener(`ended`,()=>{this.activeBufferSources.delete(t)&&(e.deferredPlayPromise.resolve(!0),this.dispatch(new Si))}),this.dispatch(new Ci),t.start(0,e.offsetSeconds)}},ki=class extends Ye{options;audioChannelNodes={};audioFiles={};audioContext=new AudioContext;audioCache={};isDestroyed=!1;outputNode;isAudioAllowed=!1;gainNode;constructor(t={}){super(),this.options=t,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=cn(t.volume??1,{min:0,max:1}),this.gainNode.connect(this.audioContext.destination),this.outputNode=Di(this.audioContext,this.gainNode,t.createEffects).outputNode,e(t.initChannels||{}).forEach(([e,t])=>{this.getAudioChannelNode(e,t)})}async play({audioChannel:e,...t}){let n=this.setupAudioFile(t);return e==null?n.play():n.play({outputNode:this.getAudioChannelNode(e,1)})}getAudioChannelNode(e,t){return Ce(this.audioChannelNodes,e,()=>{let e=this.audioContext.createGain();return e.gain.value=cn(t,{min:0,max:1}),e.connect(this.outputNode),e})}setupAudioFile(e){let t=xi(e),n=this.audioFiles[t];if(n)return n;let r=new Oi({fetch:this.options.fetch,...e,audioCache:this.audioCache,audioContext:this.audioContext,outputNode:this.outputNode});return this.audioFiles[t]=r,r.listenToAll(e=>{e instanceof Ei&&!this.isAudioAllowed&&(h(this).isAudioAllowed=!0,Object.values(this.audioFiles).forEach(e=>{h(e).isAudioAllowed=!0})),this.dispatch(e)}),r}async unloadFiles(e){await Promise.all(e.map(async e=>{let t=xi(e);await this.audioFiles[t]?.destroy(),delete this.audioFiles[t]}))}stopFile(e){let t=xi(e);this.audioFiles[t]?.stop()}stopFiles(e){e.forEach(e=>{this.stopFile(e)})}stopAllFiles(){Pe(this.audioFiles).forEach(e=>{e.stop()})}pauseFile(e){let t=xi(e);this.audioFiles[t]?.pause()}pauseFiles(e){e.forEach(e=>{this.pauseFile(e)})}pauseAllFiles(){Pe(this.audioFiles).forEach(e=>{e.pause()})}resumeFile(e){let t=xi(e);this.audioFiles[t]?.resume()}resumeFiles(e){e.forEach(e=>{this.resumeFile(e)})}resumeAllFiles(){Pe(this.audioFiles).forEach(e=>{e.resume()})}async loadFiles(e,t={}){let n=0,r=async r=>{let i=this.setupAudioFile(r);return await i.load(),t.progressCallback&&(n++,t.progressCallback({finished:n>=e.length,loaded:n,total:e.length})),i};return t.serial?await oe(e,r):await Promise.all(e.map(r))}async destroy(){this.isDestroyed||=(super.destroy(),await Promise.all(Object.values(this.audioFiles).map(async e=>{delete this.audioFiles[e.sourceKey],await e.destroy(),delete this.audioCache[e.sourceKey]})),Pe(this.audioChannelNodes).forEach(e=>{e.disconnect()}),await this.audioContext.close(),!0)}};function Ai({audioPlayer:e}){e?.audioContext.resume().catch(()=>{})}function ji({audioPlayer:e}){let t;function n(){Ai({audioPlayer:e}),t?.(),t=void 0}let r=[He(`click`,n,{capture:!0}),He(`keydown`,n,{capture:!0})];return t=()=>{r.forEach(e=>e())},t}function Mi(t){t.audioChannelVolume||={master:1,channels:{}};let n=D.isDefined(t.audioPlayer),r=t.audioChannelVolume;k.isApproximately(n.gainNode.gain.value,r.master,1e-5)||(n.gainNode.gain.value=r.master),e(n.audioChannelNodes).forEach(([e,t])=>{let n=r.channels?.[e]??1;k.isApproximately(t.gain.value,n,1e-5)||(t.gain.value=n)})}function Ni(e={}){return Xe({modName:`antha-audio`,async cleanup({state:e}){e.audioResumeListenersCleanup?.(),e.audioResumeListenersCleanup=void 0,await e.audioPlayer?.destroy()},execute({state:t}){t.audioPlayer||=new ki(e),Mi(t),!t.audioResumeListenersCleanup&&(t.audioResumeListenersCleanup=ji({audioPlayer:t.audioPlayer}))}})}function Pi(){let e,t;return Xe({modName:`antha-background-audio-playback`,execute({state:n}){if(!n.audioPlayer||(e!==n.currentBackgroundAudio&&(e&&n.audioPlayer.stopFile(e),e=n.currentBackgroundAudio,t=n.currentBackgroundAudio?{isBlocked:!1,isInFlight:!1}:void 0),!e||!t||t.isInFlight||t.isBlocked&&n.audioPlayer.audioContext.state!==`running`))return;let r=t;r.isInFlight=!0,n.audioPlayer.play(e).then(e=>{r.isBlocked=!e}).catch(e=>{T.error(e),t===r&&(t=void 0)}).finally(()=>{r.isInFlight=!1})}})}var Fi;(function(e){e[e.Undefined=1]=`Undefined`,e[e.Null=2]=`Null`,e[e.False=3]=`False`,e[e.True=4]=`True`,e[e.Number=5]=`Number`,e[e.BigInt=6]=`BigInt`,e[e.String=7]=`String`,e[e.Array=8]=`Array`,e[e.Object=9]=`Object`,e[e.Map=10]=`Map`,e[e.Set=11]=`Set`,e[e.Other=12]=`Other`})(Fi||={});var Ii=new DataView(new ArrayBuffer(8));function Li(e){let t=2166136261;function n(e){t=Math.imul(t^e,16777619)>>>0}function r(e){n(e.length);for(let t=0;t<e.length;t++)n(D.isDefined(e.codePointAt(t)))}function i(e,r){let i=t,a=0;for(let n of e)t=2166136261,r(n),a=a+t>>>0;t=i,n(a)}function a(e){if(e===void 0)n(Fi.Undefined);else if(e==null)n(Fi.Null);else if(k.isBoolean(e))n(e?Fi.True:Fi.False);else if(typeof e==`number`)n(Fi.Number),Ii.setFloat64(0,Number.isNaN(e)?NaN:e===0?0:e),n(Ii.getUint32(0)),n(Ii.getUint32(4));else if(k.isString(e))n(Fi.String),r(e);else if(typeof e==`bigint`)n(Fi.BigInt),r(e.toString(16));else if(Array.isArray(e))n(Fi.Array),n(e.length),e.forEach(a);else if(e instanceof Map)n(Fi.Map),n(e.size),i(e,([e,t])=>{a(e),a(t)});else if(e instanceof Set)n(Fi.Set),n(e.size),i(e,a);else if(k.isObject(e)){let t=Object.keys(e).sort();n(Fi.Object),n(t.length),t.forEach(t=>{r(t),a(e[t])})}else n(Fi.Other)}return a(e),t}var Ri={exports:{}},zi=Ri.exports,Bi;function Vi(){return Bi?Ri.exports:(Bi=1,(function(e,t){(function(t,n){e.exports=n()})(zi,function(){var e={};function t(e,t){this.x=e||0,this.y=t||0}e.Vector=t,e.V=t,t.prototype.copy=t.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this},t.prototype.clone=t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.perp=t.prototype.perp=function(){var e=this.x;return this.x=this.y,this.y=-e,this},t.prototype.rotate=t.prototype.rotate=function(e){var t=this.x,n=this.y;return this.x=t*Math.cos(e)-n*Math.sin(e),this.y=t*Math.sin(e)+n*Math.cos(e),this},t.prototype.reverse=t.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.normalize=t.prototype.normalize=function(){var e=this.len();return e>0&&(this.x/=e,this.y/=e),this},t.prototype.add=t.prototype.add=function(e){return this.x+=e.x,this.y+=e.y,this},t.prototype.sub=t.prototype.sub=function(e){return this.x-=e.x,this.y-=e.y,this},t.prototype.scale=t.prototype.scale=function(e,t){return this.x*=e,this.y*=t===void 0?e:t,this},t.prototype.project=t.prototype.project=function(e){var t=this.dot(e)/e.len2();return this.x=t*e.x,this.y=t*e.y,this},t.prototype.projectN=t.prototype.projectN=function(e){var t=this.dot(e);return this.x=t*e.x,this.y=t*e.y,this},t.prototype.reflect=t.prototype.reflect=function(e){var t=this.x,n=this.y;return this.project(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.reflectN=t.prototype.reflectN=function(e){var t=this.x,n=this.y;return this.projectN(e).scale(2),this.x-=t,this.y-=n,this},t.prototype.dot=t.prototype.dot=function(e){return this.x*e.x+this.y*e.y},t.prototype.len2=t.prototype.len2=function(){return this.dot(this)},t.prototype.len=t.prototype.len=function(){return Math.sqrt(this.len2())};function n(e,n){this.pos=e||new t,this.r=n||0,this.offset=new t}e.Circle=n,n.prototype.getAABBAsBox=n.prototype.getAABBAsBox=function(){var e=this.r;return new i(this.pos.clone().add(this.offset).sub(new t(e,e)),e*2,e*2)},n.prototype.getAABB=n.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},n.prototype.setOffset=n.prototype.setOffset=function(e){return this.offset=e,this};function r(e,n){this.pos=e||new t,this.angle=0,this.offset=new t,this.setPoints(n||[])}e.Polygon=r,r.prototype.setPoints=r.prototype.setPoints=function(e){if(!this.points||this.points.length!==e.length){var n,r=this.calcPoints=[],i=this.edges=[],a=this.normals=[];for(n=0;n<e.length;n++){var o=e[n],s=n<e.length-1?e[n+1]:e[0];if(o!==s&&o.x===s.x&&o.y===s.y){e.splice(n,1),--n;continue}r.push(new t),i.push(new t),a.push(new t)}}return this.points=e,this._recalc(),this},r.prototype.setAngle=r.prototype.setAngle=function(e){return this.angle=e,this._recalc(),this},r.prototype.setOffset=r.prototype.setOffset=function(e){return this.offset=e,this._recalc(),this},r.prototype.rotate=r.prototype.rotate=function(e){for(var t=this.points,n=t.length,r=0;r<n;r++)t[r].rotate(e);return this._recalc(),this},r.prototype.translate=r.prototype.translate=function(e,t){for(var n=this.points,r=n.length,i=0;i<r;i++)n[i].x+=e,n[i].y+=t;return this._recalc(),this},r.prototype._recalc=function(){for(var e=this.calcPoints,t=this.edges,n=this.normals,r=this.points,i=this.offset,a=this.angle,o=r.length,s=0;s<o;s++){var c=e[s].copy(r[s]);c.x+=i.x,c.y+=i.y,a!==0&&c.rotate(a)}for(s=0;s<o;s++){var l=e[s],u=s<o-1?e[s+1]:e[0],d=t[s].copy(u).sub(l);n[s].copy(d).perp().normalize()}return this},r.prototype.getAABBAsBox=r.prototype.getAABBAsBox=function(){for(var e=this.calcPoints,n=e.length,r=e[0].x,a=e[0].y,o=e[0].x,s=e[0].y,c=1;c<n;c++){var l=e[c];l.x<r?r=l.x:l.x>o&&(o=l.x),l.y<a?a=l.y:l.y>s&&(s=l.y)}return new i(this.pos.clone().add(new t(r,a)),o-r,s-a)},r.prototype.getAABB=r.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},r.prototype.getCentroid=r.prototype.getCentroid=function(){for(var e=this.calcPoints,n=e.length,r=0,i=0,a=0,o=0;o<n;o++){var s=e[o],c=o===n-1?e[0]:e[o+1],l=s.x*c.y-c.x*s.y;r+=(s.x+c.x)*l,i+=(s.y+c.y)*l,a+=l}return a*=3,r/=a,i/=a,new t(r,i)};function i(e,n,r){this.pos=e||new t,this.w=n||0,this.h=r||0}e.Box=i,i.prototype.toPolygon=i.prototype.toPolygon=function(){var e=this.pos,n=this.w,i=this.h;return new r(new t(e.x,e.y),[new t,new t(n,0),new t(n,i),new t(0,i)])};function a(){this.a=null,this.b=null,this.overlapN=new t,this.overlapV=new t,this.clear()}e.Response=a,a.prototype.clear=a.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var o=[],s=0;s<10;s++)o.push(new t);for(var c=[],s=0;s<5;s++)c.push([]);var l=new a,u=new i(new t,1e-6,1e-6).toPolygon();function d(e,t,n){for(var r=Number.MAX_VALUE,i=-Number.MAX_VALUE,a=e.length,o=0;o<a;o++){var s=e[o].dot(t);s<r&&(r=s),s>i&&(i=s)}n[0]=r,n[1]=i}function f(e,t,n,r,i,a){var s=c.pop(),l=c.pop(),u=o.pop().copy(t).sub(e),f=u.dot(i);if(d(n,i,s),d(r,i,l),l[0]+=f,l[1]+=f,s[0]>l[1]||l[0]>s[1])return o.push(u),c.push(s),c.push(l),!0;if(a){var p=0;if(s[0]<l[0]){if(a.aInB=!1,s[1]<l[1])p=s[1]-l[0],a.bInA=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}}else if(a.bInA=!1,s[1]>l[1])p=s[0]-l[1],a.aInB=!1;else{var m=s[1]-l[0],h=l[1]-s[0];p=m<h?m:-h}var g=Math.abs(p);g<a.overlap&&(a.overlap=g,a.overlapN.copy(i),p<0&&a.overlapN.reverse())}return o.push(u),c.push(s),c.push(l),!1}e.isSeparatingAxis=f;function p(e,t){var n=e.len2(),r=t.dot(e);return r<0?m:r>n?g:h}var m=-1,h=0,g=1;function _(e,t){var n=o.pop().copy(e).sub(t.pos).sub(t.offset),r=t.r*t.r,i=n.len2();return o.push(n),i<=r}e.pointInCircle=_;function v(e,t){u.pos.copy(e),l.clear();var n=S(u,t,l);return n&&=l.aInB,n}e.pointInPolygon=v;function y(e,t,n){var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos).sub(e.offset),i=e.r+t.r,a=i*i,s=r.len2();if(s>a)return o.push(r),!1;if(n){var c=Math.sqrt(s);n.a=e,n.b=t,n.overlap=i-c,n.overlapN.copy(r.normalize()),n.overlapV.copy(r).scale(n.overlap),n.aInB=e.r<=t.r&&c<=t.r-e.r,n.bInA=t.r<=e.r&&c<=e.r-t.r}return o.push(r),!0}e.testCircleCircle=y;function b(e,t,n){for(var r=o.pop().copy(t.pos).add(t.offset).sub(e.pos),i=t.r,a=i*i,s=e.calcPoints,c=s.length,l=o.pop(),u=o.pop(),d=0;d<c;d++){var f=d===c-1?0:d+1,h=d===0?c-1:d-1,_=0,v=null;l.copy(e.edges[d]),u.copy(r).sub(s[d]),n&&u.len2()>a&&(n.aInB=!1);var y=p(l,u);if(y===m){l.copy(e.edges[h]);var b=o.pop().copy(r).sub(s[h]);if(y=p(l,b),y===g){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),o.push(b),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}o.push(b)}else if(y===g){if(l.copy(e.edges[f]),u.copy(r).sub(s[f]),y=p(l,u),y===m){var x=u.len();if(x>i)return o.push(r),o.push(l),o.push(u),!1;n&&(n.bInA=!1,v=u.normalize(),_=i-x)}}else{var S=l.perp().normalize(),x=u.dot(S);if(x>0&&Math.abs(x)>i)return o.push(r),o.push(S),o.push(u),!1;n&&(v=S,_=i-x,(x>=0||_<2*i)&&(n.bInA=!1))}v&&n&&Math.abs(_)<Math.abs(n.overlap)&&(n.overlap=_,n.overlapN.copy(v))}return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),o.push(r),o.push(l),o.push(u),!0}e.testPolygonCircle=b;function x(e,t,n){var r=b(t,e,n);if(r&&n){var i=n.a,a=n.aInB;n.overlapN.reverse(),n.overlapV.reverse(),n.a=n.b,n.b=i,n.aInB=n.bInA,n.bInA=a}return r}e.testCirclePolygon=x;function S(e,t,n){for(var r=e.calcPoints,i=r.length,a=t.calcPoints,o=a.length,s=0;s<i;s++)if(f(e.pos,t.pos,r,a,e.normals[s],n))return!1;for(var s=0;s<o;s++)if(f(e.pos,t.pos,r,a,t.normals[s],n))return!1;return n&&(n.a=e,n.b=t,n.overlapV.copy(n.overlapN).scale(n.overlap)),!0}return e.testPolygonPolygon=S,e})})(Ri),Ri.exports)}var P=Vi();function Hi(e,t,n=0,r=e.length-1,i=Wi){for(;r>n;){if(r-n>600){let a=r-n+1,o=t-n+1,s=Math.log(a),c=.5*Math.exp(2*s/3),l=.5*Math.sqrt(s*c*(a-c)/a)*(o-a/2<0?-1:1);Hi(e,t,Math.max(n,Math.floor(t-o*c/a+l)),Math.min(r,Math.floor(t+(a-o)*c/a+l)),i)}let a=e[t],o=n,s=r;for(Ui(e,n,t),i(e[r],a)>0&&Ui(e,n,r);o<s;){for(Ui(e,o,s),o++,s--;i(e[o],a)<0;)o++;for(;i(e[s],a)>0;)s--}i(e[n],a)===0?Ui(e,n,s):(s++,Ui(e,s,r)),s<=t&&(n=s+1),t<=s&&(r=s-1)}}function Ui(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function Wi(e,t){return e<t?-1:+(e>t)}var Gi=class{constructor(e=9){this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(this._maxEntries*.4)),this.clear()}all(){return this._all(this.data,[])}search(e){let t=this.data,n=[];if(!ra(e,t))return n;let r=this.toBBox,i=[];for(;t;){for(let a=0;a<t.children.length;a++){let o=t.children[a],s=t.leaf?r(o):o;ra(e,s)&&(t.leaf?n.push(o):na(e,s)?this._all(o,n):i.push(o))}t=i.pop()}return n}collides(e){let t=this.data;if(!ra(e,t))return!1;let n=[];for(;t;){for(let r=0;r<t.children.length;r++){let i=t.children[r],a=t.leaf?this.toBBox(i):i;if(ra(e,a)){if(t.leaf||na(e,a))return!0;n.push(i)}}t=n.pop()}return!1}load(e){if(!(e&&e.length))return this;if(e.length<this._minEntries){for(let t=0;t<e.length;t++)this.insert(e[t]);return this}let t=this._build(e.slice(),0,e.length-1,0);if(!this.data.children.length)this.data=t;else if(this.data.height===t.height)this._splitRoot(this.data,t);else{if(this.data.height<t.height){let e=this.data;this.data=t,t=e}this._insert(t,this.data.height-t.height-1,!0)}return this}insert(e){return e&&this._insert(e,this.data.height-1),this}clear(){return this.data=ia([]),this}remove(e,t){if(!e)return this;let n=this.data,r=this.toBBox(e),i=[],a=[],o,s,c;for(;n||i.length;){if(n||(n=i.pop(),s=i[i.length-1],o=a.pop(),c=!0),n.leaf){let r=Ki(e,n.children,t);if(r!==-1)return n.children.splice(r,1),i.push(n),this._condense(i),this}!c&&!n.leaf&&na(n,r)?(i.push(n),a.push(o),o=0,s=n,n=n.children[0]):s?(o++,n=s.children[o],c=!1):n=null}return this}toBBox(e){return e}compareMinX(e,t){return e.minX-t.minX}compareMinY(e,t){return e.minY-t.minY}toJSON(){return this.data}fromJSON(e){return this.data=e,this}_all(e,t){let n=[];for(;e;)e.leaf?t.push(...e.children):n.push(...e.children),e=n.pop();return t}_build(e,t,n,r){let i=n-t+1,a=this._maxEntries,o;if(i<=a)return o=ia(e.slice(t,n+1)),qi(o,this.toBBox),o;r||(r=Math.ceil(Math.log(i)/Math.log(a)),a=Math.ceil(i/a**(r-1))),o=ia([]),o.leaf=!1,o.height=r;let s=Math.ceil(i/a),c=s*Math.ceil(Math.sqrt(a));aa(e,t,n,c,this.compareMinX);for(let i=t;i<=n;i+=c){let t=Math.min(i+c-1,n);aa(e,i,t,s,this.compareMinY);for(let n=i;n<=t;n+=s){let i=Math.min(n+s-1,t);o.children.push(this._build(e,n,i,r-1))}}return qi(o,this.toBBox),o}_chooseSubtree(e,t,n,r){for(;r.push(t),!(t.leaf||r.length-1===n);){let n=1/0,r=1/0,i;for(let a=0;a<t.children.length;a++){let o=t.children[a],s=Qi(o),c=ea(e,o)-s;c<r?(r=c,n=s<n?s:n,i=o):c===r&&s<n&&(n=s,i=o)}t=i||t.children[0]}return t}_insert(e,t,n){let r=n?e:this.toBBox(e),i=[],a=this._chooseSubtree(r,this.data,t,i);for(a.children.push(e),Yi(a,r);t>=0&&i[t].children.length>this._maxEntries;)this._split(i,t),t--;this._adjustParentBBoxes(r,i,t)}_split(e,t){let n=e[t],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);let a=this._chooseSplitIndex(n,i,r),o=ia(n.children.splice(a,n.children.length-a));o.height=n.height,o.leaf=n.leaf,qi(n,this.toBBox),qi(o,this.toBBox),t?e[t-1].children.push(o):this._splitRoot(n,o)}_splitRoot(e,t){this.data=ia([e,t]),this.data.height=e.height+1,this.data.leaf=!1,qi(this.data,this.toBBox)}_chooseSplitIndex(e,t,n){let r,i=1/0,a=1/0;for(let o=t;o<=n-t;o++){let t=Ji(e,0,o,this.toBBox),s=Ji(e,o,n,this.toBBox),c=ta(t,s),l=Qi(t)+Qi(s);c<i?(i=c,r=o,a=l<a?l:a):c===i&&l<a&&(a=l,r=o)}return r||n-t}_chooseSplitAxis(e,t,n){let r=e.leaf?this.compareMinX:Xi,i=e.leaf?this.compareMinY:Zi;this._allDistMargin(e,t,n,r)<this._allDistMargin(e,t,n,i)&&e.children.sort(r)}_allDistMargin(e,t,n,r){e.children.sort(r);let i=this.toBBox,a=Ji(e,0,t,i),o=Ji(e,n-t,n,i),s=$i(a)+$i(o);for(let r=t;r<n-t;r++){let t=e.children[r];Yi(a,e.leaf?i(t):t),s+=$i(a)}for(let r=n-t-1;r>=t;r--){let t=e.children[r];Yi(o,e.leaf?i(t):t),s+=$i(o)}return s}_adjustParentBBoxes(e,t,n){for(let r=n;r>=0;r--)Yi(t[r],e)}_condense(e){for(let t=e.length-1,n;t>=0;t--)e[t].children.length===0?t>0?(n=e[t-1].children,n.splice(n.indexOf(e[t]),1)):this.clear():qi(e[t],this.toBBox)}};function Ki(e,t,n){if(!n)return t.indexOf(e);for(let r=0;r<t.length;r++)if(n(e,t[r]))return r;return-1}function qi(e,t){Ji(e,0,e.children.length,t,e)}function Ji(e,t,n,r,i){i||=ia(null),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let a=t;a<n;a++){let t=e.children[a];Yi(i,e.leaf?r(t):t)}return i}function Yi(e,t){return e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),e}function Xi(e,t){return e.minX-t.minX}function Zi(e,t){return e.minY-t.minY}function Qi(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function $i(e){return e.maxX-e.minX+(e.maxY-e.minY)}function ea(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function ta(e,t){let n=Math.max(e.minX,t.minX),r=Math.max(e.minY,t.minY),i=Math.min(e.maxX,t.maxX),a=Math.min(e.maxY,t.maxY);return Math.max(0,i-n)*Math.max(0,a-r)}function na(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function ra(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function ia(e){return{children:e,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function aa(e,t,n,r,i){let a=[t,n];for(;a.length;){if(n=a.pop(),t=a.pop(),n-t<=r)continue;let o=t+Math.ceil((n-t)/r/2)*r;Hi(e,o,t,n,i),a.push(t,o,o,n)}}function oa(e,t,n,r){let i=t[0]-e[0],a=t[1]-e[1],o=r[0]-n[0],s=r[1]-n[1];if(o*a-s*i===0)return!1;let c=(i*(n[1]-e[1])+a*(e[0]-n[0]))/(o*a-s*i),l=(o*(e[1]-n[1])+s*(n[0]-e[0]))/(s*i-o*a);return c>=0&&c<=1&&l>=0&&l<=1}function sa(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(n[0]-e[0])*(t[1]-e[1])}function ca(e,t,n){return sa(e,t,n)>0}function la(e,t,n){return sa(e,t,n)>=0}function ua(e,t,n){return sa(e,t,n)<0}function da(e,t,n){return sa(e,t,n)<=0}function fa(e,t){let n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function F(e,t){let n=e.length;return e[t<0?t%n+n:t%n]}function pa(e,t,n,r){for(let i=n;i<r;i++)e.push(t[i])}function ma(e,t){return ua(F(e,t-1),F(e,t),F(e,t+1))}function ha(e,t,n){for(let r=0;r!==e.length;++r)if(r!==t&&r!==n&&(r+1)%e.length!==t&&(r+1)%e.length!==n&&oa(F(e,t),F(e,n),F(e,r),F(e,r+1)))return!1;return!0}function ga(e){let t=e,n=0;for(;n<t.length-1;n++)for(let e=0;e<n-1;e++)if(oa(t[n],t[n+1],t[e],t[e+1]))return!1;for(n=1;n<t.length-2;n++)if(oa(t[0],t[t.length-1],t[n],t[n+1]))return!1;return!0}function _a(e,t,n,r,i){i===void 0&&(i=0);let a=t[1]-e[1],o=e[0]-t[0],s=a*e[0]+o*e[1],c=r[1]-n[1],l=n[0]-r[0],u=c*n[0]+l*n[1],d=a*l-c*o;return ya(d,0,i)?[0,0]:[(l*s-o*u)/d,(a*u-c*s)/d]}function va(e,t,n,r,i,a,o){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=[]),i===void 0&&(i=25),a===void 0&&(a=100),o===void 0&&(o=0);let s=[0,0],c=[0,0],l=[0,0],u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=[],v=[],y=e,b=e;if(b.length<3)return t;if(o++,o>a)return console.warn(`quickDecomp: max level (`+a+`) reached.`),t;for(let x=0;x<e.length;++x)if(ma(y,x)){n.push(y[x]),u=d=Number.MAX_VALUE;for(let t=0;t<e.length;++t)ca(F(y,x-1),F(y,x),F(y,t))&&da(F(y,x-1),F(y,x),F(y,t-1))&&(l=_a(F(y,x-1),F(y,x),F(y,t),F(y,t-1)),ua(F(y,x+1),F(y,x),l)&&(f=fa(y[x],l),f<d&&(d=f,c=l,h=t))),ca(F(y,x+1),F(y,x),F(y,t+1))&&da(F(y,x+1),F(y,x),F(y,t))&&(l=_a(F(y,x+1),F(y,x),F(y,t),F(y,t+1)),ca(F(y,x-1),F(y,x),l)&&(f=fa(y[x],l),f<u&&(u=f,s=l,m=t)));if(h===(m+1)%e.length)l[0]=(c[0]+s[0])/2,l[1]=(c[1]+s[1])/2,r.push(l),x<m?(pa(_,y,x,m+1),_.push(l),v.push(l),h!==0&&pa(v,y,h,y.length),pa(v,y,0,x+1)):(x!==0&&pa(_,y,x,y.length),pa(_,y,0,m+1),_.push(l),v.push(l),pa(v,y,h,x+1));else{if(h>m&&(m+=e.length),p=Number.MAX_VALUE,m<h)return t;for(let t=h;t<=m;++t)la(F(y,x-1),F(y,x),F(y,t))&&da(F(y,x+1),F(y,x),F(y,t))&&(f=fa(F(y,x),F(y,t)),f<p&&ha(y,x,t)&&(p=f,g=t%e.length));x<g?(pa(_,y,x,g+1),g!==0&&pa(v,y,g,b.length),pa(v,y,0,x+1)):(x!==0&&pa(_,y,x,b.length),pa(_,y,0,g+1),pa(v,y,g,x+1))}return _.length<v.length?(va(_,t,n,r,i,a,o),va(v,t,n,r,i,a,o)):(va(v,t,n,r,i,a,o),va(_,t,n,r,i,a,o)),t}return t.push(e),t}function ya(e,t,n){return n===void 0&&(n=0),n||=0,Math.abs(e-t)<=n}var ba;(function(e){e.Ellipse=`Ellipse`,e.Circle=`Circle`,e.Polygon=`Polygon`,e.Box=`Box`,e.Line=`Line`,e.Point=`Point`})(ba||={});var I;(function(e){e[e.Ellipse=32]=`Ellipse`,e[e.Circle=16]=`Circle`,e[e.Polygon=8]=`Polygon`,e[e.Box=4]=`Box`,e[e.Line=2]=`Line`,e[e.Point=1]=`Point`})(I||={});var xa=(e,t)=>{for(let n=0,r=e.length;n<r;n++)t(e[n],n)},Sa=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(t(e[n],n))return!0;return!1},Ca=(e,t)=>{for(let n=0,r=e.length;n<r;n++)if(!t(e[n],n))return!1;return!0},wa=(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=e[r];t(i,r)&&n.push(i)}return n},Ta=(e,t)=>{let n=e.length,r=Array(n);for(let i=0;i<n;i++)r[i]=t(e[i],i);return r};function Ea({calcPoints:e,pos:t}){return Ta(e,({x:e,y:n})=>({x:e+t.x,y:n+t.y}))}function Da(e){return e.isConvex||e.typeGroup!==I.Polygon?[e]:e.convexPolygons}function Oa(e,t){return Ca(Ea(e),e=>P.pointInCircle(e,t))}function ka(e,t){return Sa(Da(t),t=>P.pointInPolygon(e,t))}function Aa(e,t){return Ca(Ea(e),e=>ka(e,t))}function ja(e,t){let n=e.pos.x,r=e.pos.y,i=t.pos.x,a=t.pos.y,o=e.r,s=t.r,c=Math.sqrt((n-i)*(n-i)+(r-a)*(r-a));return c+s===o||c+s<o}function Ma(e,t){if(e.r===0||!ka(e.pos,t))return!1;let n=Ea(t);return!(Sa(n,t=>P.pointInCircle(t,e))||Sa(n,(t,r)=>Na({start:r?n[r-1]:n[n.length-1],end:t},e).length>0))}function Na(e,{pos:t,r:n}){let r={x:e.end.x-e.start.x,y:e.end.y-e.start.y},i={x:e.start.x-t.x,y:e.start.y-t.y},a=(r.x*i.x+r.y*i.y)*-2,o=(r.x*r.x+r.y*r.y)*2,s=Math.sqrt(a*a-(i.x*i.x+i.y*i.y-n*n)*o*2);if(isNaN(s))return[];let c=(a-s)/o,l=(a+s)/o,u=[];return c<=1&&c>=0&&u.push({x:e.start.x+r.x*c,y:e.start.y+r.y*c}),l<=1&&l>=0&&u.push({x:e.start.x+r.x*l,y:e.start.y+r.y*l}),u}function Pa(e,t){let n=e.end.x-e.start.x,r=e.end.y-e.start.y,i=n*(t.end.y-t.start.y)-(t.end.x-t.start.x)*r;if(Math.abs(i)<2**-52)return;let a=((t.end.y-t.start.y)*(t.end.x-e.start.x)+(t.start.x-t.end.x)*(t.end.y-e.start.y))/i,o=((e.start.y-e.end.y)*(t.end.x-e.start.x)+n*(t.end.y-e.start.y))/i;if(!(a<0||a>1||o<0||o>1))return{x:e.start.x+a*n,y:e.start.y+a*r}}function Fa(e,{calcPoints:t,pos:n}){let r=[];return xa(t,(i,a)=>{let o=a?t[a-1]:t[t.length-1],s=Pa(e,{start:{x:o.x+n.x,y:o.y+n.y},end:{x:i.x+n.x,y:i.y+n.y}});s&&r.push(s)}),r}function Ia(e,t){let n=[],r=e.pos.x,i=e.pos.y,a=e.r,o=t.pos.x,s=t.pos.y,c=t.r,l=o-r,u=s-i,d=Math.sqrt(l*l+u*u);if(d>a+c||d<Math.abs(a-c)||d===0)return n;let f=(a*a-c*c+d*d)/(2*d),p=Math.sqrt(a*a-f*f),m=r+l*f/d,h=i+u*f/d,g={x:m+p*u/d,y:h-p*l/d};n.push(g);let _={x:m-p*u/d,y:h+p*l/d};return n.push(_),n}var La={satCircleCircle:P.testCircleCircle,satCirclePolygon:P.testCirclePolygon,satPolygonCircle:P.testPolygonCircle,satPolygonPolygon:P.testPolygonPolygon,inCircleCircle:ja,inCirclePolygon:Ma,inPolygonCircle:Oa,inPolygonPolygon:Aa};function Ra(e,t){let n=[];return xa(Object.values(I).filter(e=>typeof e==`number`),r=>{n[r]=r===I.Circle?La[`${t}${e}Circle`]:La[`${t}${e}Polygon`]}),n}var za=Ra(ba.Circle,`sat`),Ba=Ra(ba.Circle,`in`),Va=Ra(ba.Polygon,`sat`),Ha=Ra(ba.Polygon,`in`),Ua=1e-9;function Wa(e,t,n=Ua){return Math.abs(e-t)<n}function Ga(e,t){return Wa(e.x,t.x)&&Wa(e.y,t.y)}function Ka(e,t=e,n=1){let r=Math.PI*Math.hypot(e,t)*2,i=Math.max(8,Math.ceil(r/Math.max(1,n))),a=[];for(let n=0;n<i;n++){let r=n/i*2*Math.PI,o=Math.cos(r)*e,s=Math.sin(r)*t;a.push(new P.Vector(o,s))}return a}function qa(e,t){return[new P.Vector(0,0),new P.Vector(e,0),new P.Vector(e,t),new P.Vector(0,t)]}function Ja(e={}){return e instanceof P.Vector?e:new P.Vector(e.x||0,e.y||0)}function Ya(e=[]){let t=Ta(e,Ja);return Za(t)?t.reverse():t}function Xa(e,t){let n=e.x-t.x,r=e.y-t.y;return Math.hypot(n,r)}function Za(e){let t=e.length,n=0;return xa(e,(r,i)=>{let a=e[(i+1)%t];n+=(a.x-r.x)*(a.y+r.y)}),n>0}function Qa(e,t={}){e.isStatic=!!t.isStatic,e.isTrigger=!!t.isTrigger,e.padding=t.padding||0,e.group=t.group??2147483647,`userData`in t&&(e.userData=t.userData),t.isCentered&&e.typeGroup!==I.Circle&&(e.isCentered=!0),t.angle&&e.setAngle(t.angle)}function $a(e){let{bbox:t,minX:n,minY:r,maxX:i,maxY:a}=e;return t.minX<n||t.minY<r||t.maxX>i||t.maxY>a}function eo(e,t){return t.minX>e.maxX||t.minY>e.maxY||t.maxX<e.minX||t.maxY<e.minY}function to({group:e},{group:t}){let n=e>>16,r=t>>16,i=e&65535;return!!(n&t&65535)&&(r&i)!==0}function no(e,t){return(e.typeGroup===I.Circle?Ba:Ha)[t.typeGroup](e,t)}function ro(e){return Ta(e,({x:e,y:t})=>({x:e,y:t}))}function io({x:e,y:t}={x:0,y:0}){return[e,t]}function ao([e,t]=[0,0]){return{x:e,y:t}}function oo(e,t){return(e.typeGroup===I.Circle?za:Va)[t.typeGroup]}function so(e,t,n,r,i,a=2,o=4){let s=r-t,c=i-n,l=Math.atan2(c,s),u=Math.cos(l),d=Math.sin(l),f=t,p=n,m=Math.hypot(s,c);for(;m>0;){let t=Math.min(m,a);e.moveTo(f,p),e.lineTo(f+u*t,p+d*t),f+=u*(a+o),p+=d*(a+o),m-=a+o}}function co(e,{pos:t,calcPoints:n},r=!1){let i=n[n.length-1],a=t.x+i.x,o=t.y+i.y;n.length===1?e.arc(a,o,1,0,Math.PI*2):e.moveTo(a,o),xa(n,(a,o)=>{let s=t.x+a.x,c=t.y+a.y;if(r){let r=n[o-1]||i;so(e,t.x+r.x,t.y+r.y,s,c)}else e.lineTo(s,c)})}function lo(e,t,n=!0){co(e,{pos:{x:t.minX,y:t.minY},calcPoints:qa(t.maxX-t.minX,t.maxY-t.minY)},n)}function uo(){return!0}function fo(e){return Math.max(0,Math.min(e,2147483647))}function po(e,t=1,n=!0){if(!t)return;let r=Math.cos(e.angle)*t,i=Math.sin(e.angle)*t;e.setPosition(e.x+r,e.y+i,n)}var mo=class extends P.Circle{constructor(e,t,n){super(Ja(e),t),this.offsetCopy={x:0,y:0},this.dirty=!1,this.isConvex=!0,this.type=ba.Circle,this.typeGroup=I.Circle,this.isCentered=!0,Qa(this,n),this.unscaledRadius=t}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scale(){return this.r/this.unscaledRadius}set scale(e){this.setScale(e)}get scaleX(){return this.scale}get scaleY(){return this.scale}get group(){return this._group}set group(e){this._group=fo(e)}move(e=1,t=!0){return po(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.r=this.unscaledRadius*Math.abs(e),this.markAsDirty(n),this}setAngle(e,t=!0){this.angle=e;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}setOffset(e,t=!0){this.offsetCopy.x=e.x,this.offsetCopy.y=e.y;let{x:n,y:r}=this.getOffsetWithAngle();return this.offset.x=n,this.offset.y=r,this.markAsDirty(t),this}getAABBAsBBox(){let e=this.pos.x+this.offset.x,t=this.pos.y+this.offset.y;return{minX:e-this.r,maxX:e+this.r,minY:t-this.r,maxY:t+this.r}}draw(e){let t=this.pos.x+this.offset.x,n=this.pos.y+this.offset.y,r=Math.abs(this.r);if(this.isTrigger){let r=Math.max(8,this.r);for(let i=0;i<r;i++){let a=i/r*2*Math.PI,o=(i-1)/r*2*Math.PI;so(e,t+Math.cos(o)*this.r,n+Math.sin(o)*this.r,t+Math.cos(a)*this.r,n+Math.sin(a)*this.r)}}else e.moveTo(t+r,n),e.arc(t,n,r,0,Math.PI*2)}drawBVH(e){lo(e,this)}updateBody(e=this.dirty){e&&(this.system?.insert(this),this.dirty=!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}getOffsetWithAngle(){if(!this.offsetCopy.x&&!this.offsetCopy.y||!this.angle)return this.offsetCopy;let e=Math.sin(this.angle),t=Math.cos(this.angle);return{x:this.offsetCopy.x*t-this.offsetCopy.y*e,y:this.offsetCopy.x*e+this.offsetCopy.y*t}}},ho=class extends P.Polygon{constructor(e,t,n){if(super(Ja(e),Ya(t)),this.dirty=!1,this.type=ba.Polygon,this.typeGroup=I.Polygon,this.centered=!1,this.scaleVector={x:1,y:1},!t.length)throw Error(`No points in polygon`);Qa(this,n)}set isCentered(e){if(this.centered===e)return;let t;this.runWithoutRotation(()=>{t=this.getCentroid()});let n=e?-t.x:-this.points[0].x,r=e?-t.y:-this.points[0].y;this.setPoints(Ta(this.points,({x:e,y:t})=>new P.Vector(e+n,t+r))),this.centered=e}get isCentered(){return this.centered}get x(){return this.pos.x}set x(e){this.pos.x=e,this.markAsDirty()}get y(){return this.pos.y}set y(e){this.pos.y=e,this.markAsDirty()}get scaleX(){return this.scaleVector.x}get scaleY(){return this.scaleVector.y}get scale(){return(this.scaleVector.x+this.scaleVector.y)/2}set scale(e){this.setScale(e)}get group(){return this._group}set group(e){this._group=fo(e)}move(e=1,t=!0){return po(this,e,t),this}setPosition(e,t,n=!0){return this.pos.x=e,this.pos.y=t,this.markAsDirty(n),this}setScale(e,t=e,n=!0){return this.scaleVector.x=Math.abs(e),this.scaleVector.y=Math.abs(t),super.setPoints(Ta(this.points,(e,t)=>new P.Vector(this.pointsBackup[t].x*this.scaleVector.x,this.pointsBackup[t].y*this.scaleVector.y))),this.updateConvex(),this.markAsDirty(n),this}setAngle(e,t=!0){return super.setAngle(e),this.markAsDirty(t),this}setOffset(e,t=!0){return super.setOffset(e),this.markAsDirty(t),this}getAABBAsBBox(){let{pos:e,w:t,h:n}=this.getAABBAsBox();return{minX:e.x,minY:e.y,maxX:e.x+t,maxY:e.y+n}}getEdge(e){let{x:t,y:n}=this.calcPoints[e],r=this.calcPoints[(e+1)%this.calcPoints.length];return{start:{x:this.x+t,y:this.y+n},end:{x:this.x+r.x,y:this.y+r.y}}}draw(e){co(e,this,this.isTrigger)}drawBVH(e){lo(e,this)}setPoints(e){return super.setPoints(e),this.updateConvex(),this.pointsBackup=ro(e),this}translate(e,t){return super.translate(e,t),this.pointsBackup=ro(this.points),this}rotate(e){return super.rotate(e),this.pointsBackup=ro(this.points),this}isSimple(){return ga(Ta(this.calcPoints,io))}updateBody(e=this.dirty){e&&(this.updateConvexPolygonPositions(),this.system?.insert(this),this.dirty=!1)}runWithoutRotation(e){let t=this.angle;this.setAngle(0,!1),e(),this.setAngle(t,!1)}markAsDirty(e=!1){e?this.updateBody(!0):this.dirty=!0}updateConvexPolygonPositions(){!this.isConvex&&this.convexPolygons&&xa(this.convexPolygons,e=>{e.pos.x=this.pos.x,e.pos.y=this.pos.y,e.angle!==this.angle&&e.setAngle(this.angle)})}getConvex(){return this.typeGroup&&this.typeGroup!==I.Polygon||this.points.length<4?[]:va(Ta(this.calcPoints,io))}updateConvexPolygons(e=this.getConvex()){this.isConvex||(this.convexPolygons||=[],xa(e,(e,t)=>{this.convexPolygons[t]||(this.convexPolygons[t]=new P.Polygon),this.convexPolygons[t].pos.x=this.pos.x,this.convexPolygons[t].pos.y=this.pos.y,this.convexPolygons[t].angle=this.angle,this.convexPolygons[t].setPoints(Ya(Ta(e,ao)))}),this.convexPolygons.length=e.length)}updateConvex(){let e=this.getConvex();this.isConvex=e.length<=1,this.updateConvexPolygons(e)}},go=class extends ho{constructor(e,t,n=t,r=(t+n)/Math.PI,i){super(e,Ka(t,n,r),i),this.type=ba.Ellipse,this.typeGroup=I.Ellipse,this.isConvex=!0,this._radiusX=t,this._radiusY=n,this._step=r}set isCentered(e){}get isCentered(){return!0}get step(){return this._step}set step(e){this._step=e,this.setPoints(Ka(this._radiusX,this._radiusY,this._step))}get radiusX(){return this._radiusX}set radiusX(e){this._radiusX=e,this.setPoints(Ka(this._radiusX,this._radiusY,this._step))}get radiusY(){return this._radiusY}set radiusY(e){this._radiusY=e,this.setPoints(Ka(this._radiusX,this._radiusY,this._step))}center(){}updateConvex(){}},_o=class extends ho{constructor(e,t,n,r){super(e,qa(t,n),r),this.type=ba.Box,this.typeGroup=I.Box,this.isConvex=!0,this._width=t,this._height=n}get width(){return this._width}set width(e){this._width=e,this.afterUpdateSize()}get height(){return this._height}set height(e){this._height=e,this.afterUpdateSize()}afterUpdateSize(){this.setPoints(qa(this._width,this._height))}updateConvex(){}},vo=class extends _o{constructor(e,t){super(Ja(e),.001,.001,t),this.type=ba.Point,this.typeGroup=I.Point}},yo=class extends ho{constructor(e,t,n){if(super(e,[{x:0,y:0},{x:t.x-e.x,y:t.y-e.y}],n),this.type=ba.Line,this.typeGroup=I.Line,this.isConvex=!0,this.calcPoints.length===1||!t)throw console.error({start:e,end:t}),Error(`No end point for line provided`)}get start(){return{x:this.x+this.calcPoints[0].x,y:this.y+this.calcPoints[0].y}}set start({x:e,y:t}){this.x=e,this.y=t}get end(){return{x:this.x+this.calcPoints[1].x,y:this.y+this.calcPoints[1].y}}set end({x:e,y:t}){this.points[1].x=e-this.start.x,this.points[1].y=t-this.start.y,this.setPoints(this.points)}getCentroid(){return new P.Vector((this.end.x-this.start.x)/2,(this.end.y-this.start.y)/2)}updateConvex(){}},bo=class extends Gi{createPoint(e,t,n){let r=new(n||vo)(e,t);return this.insert(r),r}createLine(e,t,n,r){let i=new(r||yo)(e,t,n);return this.insert(i),i}createCircle(e,t,n,r){let i=new(r||mo)(e,t,n);return this.insert(i),i}createBox(e,t,n,r,i){let a=new(i||_o)(e,t,n,r);return this.insert(a),a}createEllipse(e,t,n=t,r,i,a){let o=new(a||go)(e,t,n,r,i);return this.insert(o),o}createPolygon(e,t,n,r){let i=new(r||ho)(e,t,n);return this.insert(i),i}insert(e){if(e.bbox=e.getAABBAsBBox(),e.system){if(!$a(e))return this;e.system.remove(e)}return e.minX=e.bbox.minX-e.padding,e.minY=e.bbox.minY-e.padding,e.maxX=e.bbox.maxX+e.padding,e.maxY=e.bbox.maxY+e.padding,super.insert(e)}updateBody(e){e.updateBody()}update(){xa(this.all(),e=>{this.updateBody(e)})}draw(e){xa(this.all(),t=>{t.draw(e)})}drawBVH(e,t=!0){let n=r=>{lo(e,r,t),r.children&&xa(r.children,n)};xa(this.data.children,n)}remove(e,t){return e.system=void 0,super.remove(e,t)}getPotentials(e){return wa(this.search(e),t=>t!==e)}traverse(e,{children:t}=this.data){return t?.find((n,r)=>{if(!n)return!1;if(n.typeGroup&&e(n,t,r))return!0;n.children&&this.traverse(e,n)})}},xo=class extends bo{constructor(){super(...arguments),this.response=new P.Response}insert(e){let t=super.insert(e);return e.system=this,t}separate(e=uo,t=this.response){xa(this.all(),n=>{this.separateBody(n,e,t)})}separateBody(e,t=uo,n=this.response){if(e.isStatic&&!e.isTrigger)return;let r={x:0,y:0};this.checkOne(e,n=>{t(n)&&!e.isTrigger&&!n.b.isTrigger&&(r.x+=n.overlapV.x,r.y+=n.overlapV.y)},n),(r.x||r.y)&&e.setPosition(e.x-r.x,e.y-r.y)}checkOne(e,t=uo,n=this.response){return e.isStatic&&!e.isTrigger?!1:Sa(this.search(e),r=>{if(r!==e&&this.checkCollision(e,r,n))return t(n)})}checkArea(e,t=uo,n=this.response){return Sa(this.search(e),e=>this.checkOne(e,t,n))}checkAll(e=uo,t=this.response){return Sa(this.all(),n=>this.checkOne(n,e,t))}checkCollision(e,t,n=this.response){let{bbox:r,padding:i}=e,{bbox:a,padding:o}=t;if(!r||!a||!to(e,t)||(i||o)&&eo(r,a))return!1;let s=oo(e,t);if(e.isConvex&&t.isConvex)return n.clear(),s(e,t,n);let c=Da(e),l=Da(t),u=0,d=0,f=!1;if(xa(c,e=>{xa(l,t=>{n.clear(),s(e,t,n)&&(f=!0,u+=n.overlapV.x,d+=n.overlapV.y)})}),f){let r=new P.Vector(u,d);n.a=e,n.b=t,n.overlapV.x=u,n.overlapV.y=d,n.overlapN=r.normalize(),n.overlap=r.len(),n.aInB=no(e,t),n.bInA=no(t,e)}return f}raycast(e,t,n=uo){let r=1/0,i;return this.ray?(this.ray.start=e,this.ray.end=t):this.ray=new yo(e,t,{isTrigger:!0}),this.insert(this.ray),this.checkOne(this.ray,({b:t})=>{if(!n(t,this.ray))return!1;xa(t.typeGroup===I.Circle?Na(this.ray,t):Fa(this.ray,t),n=>{let a=Xa(e,n);a<r&&(r=a,i={point:n,body:t})})}),this.remove(this.ray),i}getCollisionPoints(e,t){let n=[];if(e.typeGroup===I.Circle&&t.typeGroup===I.Circle&&n.push(...Ia(e,t)),e.typeGroup===I.Circle&&t.typeGroup!==I.Circle)for(let r=0;r<t.calcPoints.length;r++){let i=t.getEdge(r);n.push(...Na(i,e))}if(e.typeGroup!==I.Circle)for(let r=0;r<e.calcPoints.length;r++){let i=e.getEdge(r);if(t.typeGroup===I.Circle)n.push(...Na(i,t));else for(let e=0;e<t.calcPoints.length;e++){let r=Pa(i,t.getEdge(e));r&&n.push(r)}}return n.filter(({x:e,y:t},r)=>r===n.findIndex(n=>Ga(n,{x:e,y:t})))}};new class{constructor(e=0){this.events=[],this.delay=e,this.toc=()=>{this.events.length&&(this.events.forEach(e=>{e()}),this.tic())}}tic(){this.events.length&&setTimeout(this.toc,this.delay)}add(e){this.events.push(e),this.events.length===1&&this.tic()}clear(){for(;this.events.length;)this.events.pop()}};var So=P.Response;P.Circle,P.Polygon,P.Vector;var Co={extension:{type:Nt.Environment,name:`browser`,priority:-1},test:()=>!0,load:async()=>{await ye(()=>import(`./browserAll-VMSClpaX.js`),__vite__mapDeps([0,1,2,3,4,5]))}},wo={extension:{type:Nt.Environment,name:`webworker`,priority:0},test:()=>typeof self<`u`&&self.WorkerGlobalScope!==void 0,load:async()=>{await ye(()=>import(`./webworkerAll-B3Hkad6o.js`),__vite__mapDeps([6,3,1,2,4,5]))}},To;function Eo(e){return To===void 0&&(To=(()=>{let t={stencil:!0,failIfMajorPerformanceCaveat:e??qt.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Lt.get().getWebGLRenderingContext())return!1;let e=Lt.get().createCanvas().getContext(`webgl`,t),n=!!e?.getContextAttributes()?.stencil;if(e){let t=e.getExtension(`WEBGL_lose_context`);t&&t.loseContext()}return e=null,n}catch{return!1}})()),To}var Do;async function Oo(e={}){return Do===void 0&&(Do=await(async()=>{let t=Lt.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(e)).requestDevice(),!0}catch{return!1}})()),Do}var ko=[`webgl`,`webgpu`,`canvas`];async function Ao(e){let t=[];e.preference?Array.isArray(e.preference)?t=e.preference.slice():(t.push(e.preference),ko.forEach(n=>{n!==e.preference&&t.push(n)})):t=ko.slice();let n,r={};for(let i=0;i<t.length;i++){let a=t[i];if(a===`webgpu`&&await Oo()){let{WebGPURenderer:t}=await ye(async()=>{let{WebGPURenderer:e}=await import(`./WebGPURenderer-LTLhAvoo.js`);return{WebGPURenderer:e}},__vite__mapDeps([7,8,1,2,9,10,11]));n=t,r={...e,...e.webgpu};break}if(a===`webgl`&&Eo(e.failIfMajorPerformanceCaveat??qt.defaultOptions.failIfMajorPerformanceCaveat)){let{WebGLRenderer:t}=await ye(async()=>{let{WebGLRenderer:e}=await import(`./WebGLRenderer-caqgVvmv.js`);return{WebGLRenderer:e}},__vite__mapDeps([12,13,1,2,9,11]));n=t,r={...e,...e.webgl};break}if(a===`canvas`){let{CanvasRenderer:t}=await ye(async()=>{let{CanvasRenderer:e}=await import(`./CanvasRenderer-CobwcNGA.js`);return{CanvasRenderer:e}},__vite__mapDeps([14,15,1,2,4,9,10]));n=t,r={...e,...e.canvasOptions};break}}if(delete r.webgpu,delete r.webgl,delete r.canvasOptions,!n)throw Error(`No available renderer for the current environment`);let i=new n;return await i.init(r),i}var jo=class{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(e){globalThis.removeEventListener(`resize`,this.queueResize),this._resizeTo=e,e&&(globalThis.addEventListener(`resize`,this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&=(cancelAnimationFrame(this._resizeId),null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let e,t;if(this._resizeTo===globalThis.window)e=globalThis.innerWidth,t=globalThis.innerHeight;else{let{clientWidth:n,clientHeight:r}=this._resizeTo;e=n,t=r}this.renderer.resize(e,t),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener(`resize`,this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}};jo.extension=Nt.Application;var Mo=class{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(e){this._ticker&&this._ticker.remove(this.render,this),this._ticker=e,e&&e.add(this.render,this,It.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?at.shared:new at,e.autoStart&&this.start()}static destroy(){if(this._ticker){let e=this._ticker;this.ticker=null,e.destroy()}}};Mo.extension=Nt.Application,St.add(jo),St.add(Mo);var No=class e{constructor(...e){this.stage=new mt,e[0]!==void 0&&_t(ft,`Application constructor options are deprecated, please use Application.init() instead.`)}async init(t){t={...t},this.stage||=new mt,this.renderer=await Ao(t),e._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return _t(ft,`Application.view is deprecated, please use Application.canvas instead.`),this.renderer.canvas}get screen(){return this.renderer.screen}get domContainerRoot(){return this.renderer.renderPipes.dom?._domElement}destroy(t=!1,n=!1){let r=e._plugins.slice(0);r.reverse(),r.forEach(e=>{e.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(t),this.renderer=null}};No._plugins=[];var Po=No;St.handleByList(Nt.Application,Po._plugins),St.add(Jt);var Fo=class extends pt{constructor(e,t){let{text:n,resolution:r,style:i,anchor:a,width:o,height:s,roundPixels:c,...l}=e;super({...l}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??``,this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Et({_onUpdate:()=>{this.onViewUpdate()}}),a&&(this.anchor=a),this.roundPixels=c??!1,o!==void 0&&(this.width=o),s!==void 0&&(this.height=s)}get anchor(){return this._anchor}set anchor(e){typeof e==`number`?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||={},this._style?.off(`update`,this.onViewUpdate,this),this._style=e instanceof this._styleClass?e:new this._styleClass(e),this._style.on(`update`,this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||={},e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e==`object`?(t=e.height??e.width,e=e.width):t??=e,e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){let t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x,i=0;return e.x>=r&&e.x<=r+t&&(i=-n*this.anchor.y,e.y>=i&&e.y<=i+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){this._style?.off(`update`,this.onViewUpdate,this),super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e==`boolean`?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}};function Io(e,t){let n=e[0]??{};return(typeof n==`string`||e[1])&&(_t(ft,`use new ${t}({ text: "hi!", style }) instead`),n={text:n,style:e[1]}),n}var Lo=null,Ro=null;function zo(e,t){Lo||(Lo=Lt.get().createCanvas(256,128),Ro=Lo.getContext(`2d`,{willReadFrequently:!0}),Ro.globalCompositeOperation=`copy`,Ro.globalAlpha=1),(Lo.width<e||Lo.height<t)&&(Lo.width=st(e),Lo.height=st(t))}function Bo(e,t,n){for(let r=0,i=4*n*t;r<t;++r,i+=4)if(e[i+3]!==0)return!1;return!0}function Vo(e,t,n,r,i){let a=4*t;for(let t=r,o=r*a+4*n;t<=i;++t,o+=a)if(e[o+3]!==0)return!1;return!0}function Ho(...e){let t=e[0];t.canvas||(t={canvas:e[0],resolution:e[1]});let{canvas:n}=t,r=Math.min(t.resolution??1,1),i=t.width??n.width,a=t.height??n.height,o=t.output;if(zo(i,a),!Ro)throw TypeError(`Failed to get canvas 2D context`);Ro.drawImage(n,0,0,i,a,0,0,i*r,a*r);let s=Ro.getImageData(0,0,i,a).data,c=0,l=0,u=i-1,d=a-1;for(;l<a&&Bo(s,i,l);)++l;if(l===a)return ct.EMPTY;for(;Bo(s,i,d);)--d;for(;Vo(s,i,c,l,d);)++c;for(;Vo(s,i,u,l,d);)--u;return++u,++d,Ro.globalCompositeOperation=`source-over`,Ro.strokeRect(c,l,u-c,d-l),Ro.globalCompositeOperation=`copy`,o??=new ct,o.set(c/r,l/r,(u-c)/r,(d-l)/r),o}var Uo=new ct;function Wo(e){let t=0;for(let n=0;n<e.length;n++)e.charCodeAt(n)===32&&t++;return t}var Go=new class{getCanvasAndContext(e){let{text:t,style:n,resolution:r=1}=e,i=n._getFinalPadding(),a=si.measureText(t||` `,n),o=Math.ceil(Math.ceil(Math.max(1,a.width)+i*2)*r),s=Math.ceil(Math.ceil(Math.max(1,a.height)+i*2)*r),c=vt.getOptimalCanvasAndContext(o,s);return this._renderTextToCanvas(n,i,r,c,a),{canvasAndContext:c,frame:n.trim?Ho({canvas:c.canvas,width:o,height:s,resolution:1,output:Uo}):Uo.set(0,0,o,s)}}returnCanvasAndContext(e){vt.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,n,r,i){if(i.runsByLine&&i.runsByLine.length>0){this._renderTaggedTextToCanvas(i,e,t,n,r);return}let{canvas:a,context:o}=r,s=li(e),c=i.lines,l=i.lineHeight,u=i.lineWidths,d=i.maxLineWidth,f=i.fontProperties,p=a.height;if(o.resetTransform(),o.scale(n,n),o.textBaseline=e.textBaseline,e._stroke?.width){let t=e._stroke;o.lineWidth=t.width,o.miterLimit=t.miterLimit,o.lineJoin=t.join,o.lineCap=t.cap}o.font=s;let m,h,g=e.dropShadow?2:1,_=(e._stroke?.width??0)/2,v=(l-f.fontSize)/2;l-f.fontSize<0&&(v=0);for(let a=0;a<g;++a){let s=e.dropShadow&&a===0,g=s?Math.ceil(Math.max(1,p)+t*2):0,y=g*n;if(s)this._setupDropShadow(o,e,n,y);else{let n=e._gradientBounds,r=e._gradientOffset;if(n){let a={width:n.width,height:n.height,lineHeight:n.height,lines:i.lines};this._setFillAndStrokeStyles(o,e,a,t,_,r?.x??0,r?.y??0)}else r?this._setFillAndStrokeStyles(o,e,i,t,_,r.x,r.y):this._setFillAndStrokeStyles(o,e,i,t,_);o.shadowColor=`rgba(0,0,0,0)`}for(let n=0;n<c.length;n++){m=_,h=_+n*l+f.ascent+v,m+=this._getAlignmentOffset(u[n],d,e.align);let i=0;if(e.align===`justify`&&e.wordWrap&&n<c.length-1){let e=Wo(c[n]);e>0&&(i=(d-u[n])/e)}e._stroke?.width&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!0,i),e._fill!==void 0&&this._drawLetterSpacing(c[n],e,r,m+t,h+t-g,!1,i)}}}_renderTaggedTextToCanvas(e,t,n,r,i){let{canvas:a,context:o}=i,{runsByLine:s,lineWidths:c,maxLineWidth:l,lineAscents:u,lineHeights:d,hasDropShadow:f}=e,p=a.height;o.resetTransform(),o.scale(r,r),o.textBaseline=t.textBaseline;let m=f?2:1,h=t._stroke?.width??0;for(let e of s)for(let t of e){let e=t.style._stroke?.width??0;e>h&&(h=e)}let g=h/2,_=[];for(let e=0;e<s.length;e++){let t=s[e],n=[];for(let e of t){let t=li(e.style);o.font=t,n.push({width:si._measureText(e.text,e.style.letterSpacing,o),font:t})}_.push(n)}for(let e=0;e<m;++e){let a=f&&e===0,m=a?Math.ceil(Math.max(1,p)+n*2):0,h=m*r;a||(o.shadowColor=`rgba(0,0,0,0)`);let v=g;for(let e=0;e<s.length;e++){let f=s[e],p=c[e],y=u[e],b=d[e],x=_[e],S=g;S+=this._getAlignmentOffset(p,l,t.align);let C=0;if(t.align===`justify`&&t.wordWrap&&e<s.length-1){let e=0;for(let t of f)e+=Wo(t.text);e>0&&(C=(l-p)/e)}let ee=v+y,te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._stroke?.width){let e=t.style._stroke;if(o.lineWidth=e.width,o.miterLimit=e.miterLimit,o.lineJoin=e.join,o.lineCap=e.cap,a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Wo(t.text);te+=s+e*C;continue}}else{let r=si.measureFont(c),i=t.style.lineHeight||r.fontSize;o.strokeStyle=mi(e,o,{width:s,height:i,lineHeight:i,lines:[t.text]},n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!0,C)}let l=Wo(t.text);te+=s+l*C}te=S+n;for(let e=0;e<f.length;e++){let t=f[e],{width:s,font:c}=x[e];if(o.font=c,o.textBaseline=t.style.textBaseline,t.style._fill!==void 0){if(a){if(t.style.dropShadow)this._setupDropShadow(o,t.style,r,h);else{let e=Wo(t.text);te+=s+e*C;continue}}else{let e=si.measureFont(c),r=t.style.lineHeight||e.fontSize,i={width:s,height:r,lineHeight:r,lines:[t.text]};o.fillStyle=mi(t.style._fill,o,i,n*2,te-n,v)}this._drawLetterSpacing(t.text,t.style,i,te,ee+n-m,!1,C)}let l=Wo(t.text);te+=s+l*C}v+=b}}}_setFillAndStrokeStyles(e,t,n,r,i,a=0,o=0){if(e.fillStyle=t._fill?mi(t._fill,e,n,r*2,a,o):null,t._stroke?.width){let s=i+r*2;e.strokeStyle=mi(t._stroke,e,n,s,a,o)}}_setupDropShadow(e,t,n,r){e.fillStyle=`black`,e.strokeStyle=`black`;let i=t.dropShadow,a=i.color,o=i.alpha;e.shadowColor=yt.shared.setValue(a).setAlpha(o).toRgbaString();let s=i.blur*n,c=i.distance*n;e.shadowBlur=s,e.shadowOffsetX=Math.cos(i.angle)*c,e.shadowOffsetY=Math.sin(i.angle)*c+r}_getAlignmentOffset(e,t,n){return n===`right`?t-e:n===`center`?(t-e)/2:0}_drawLetterSpacing(e,t,n,r,i,a=!1,o=0){let{context:s}=n,c=t.letterSpacing,l=!1;if(si.experimentalLetterSpacingSupported&&(si.experimentalLetterSpacing?(s.letterSpacing=`${c}px`,s.textLetterSpacing=`${c}px`,l=!0):(s.letterSpacing=`0px`,s.textLetterSpacing=`0px`)),(c===0||l)&&o===0){a?s.strokeText(e,r,i):s.fillText(e,r,i);return}if(o!==0&&(c===0||l)){let t=e.split(` `),n=r,c=s.measureText(` `).width;for(let e=0;e<t.length;e++)a?s.strokeText(t[e],n,i):s.fillText(t[e],n,i),n+=s.measureText(t[e]).width+c+o;return}let u=r,d=si.graphemeSegmenter(e),f=s.measureText(e).width,p=0;for(let e=0;e<d.length;++e){let t=d[e];a?s.strokeText(t,u,i):s.fillText(t,u,i);let n=``;for(let t=e+1;t<d.length;++t)n+=d[t];p=s.measureText(n).width,u+=f-p+c,t===` `&&(u+=o),f=p}}},Ko=!1;function qo(e){if(Ko)return;let t=new ut({scaleMode:e.scaleMode});e._resourceId!==t._resourceId&&(Ko=!0,gt(`Text textureStyle: only scaleMode is applied to a text texture, the other fields are ignored`))}function Jo(e,t){let{texture:n,bounds:r}=e,i=t._style._getFinalPadding();bt(r,t._anchor,n);let a=t._anchor._x*i*2,o=t._anchor._y*i*2;r.minX-=i-a,r.minY-=i-o,r.maxX-=i-a,r.maxY-=i-o}var Yo=class extends Gt{},Xo=class{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),e.runners.contextChange.add(this),this._managedTexts=new Xt({renderer:e,type:`renderable`,onUnload:this.onTextUnload.bind(this),name:`canvasText`})}resolutionChange(){for(let e in this._managedTexts.items){let t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}contextChange(){for(let e in this._managedTexts.items)this._managedTexts.items[e]?.unload()}validateRenderable(e){let t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n||e._didTextUpdate}addRenderable(e,t){let n=this._getGpuText(e);if(e._didTextUpdate||n.currentKey!==e.styleKey){let t=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e._resolution!==t)&&this._updateGpuText(e),e._didTextUpdate=!1,Jo(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){let t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new Yo;return t.currentKey=`--`,t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){let t=e._gpuData[this._renderer.uid];if(!t)return;let{canvasText:n}=this._renderer;n.getReferenceCount(t.currentKey)>0?n.decreaseReferenceCount(t.currentKey):t.texture&&n.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}};Xo.extension={type:[Nt.WebGLPipes,Nt.WebGPUPipes,Nt.CanvasPipes],name:`text`};var Zo=class{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,n,r){typeof e==`string`&&(_t(`8.0.0`,`CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments`),e={text:e,style:n,resolution:t}),e.style instanceof di||(e.style=new di(e.style)),typeof e.text!=`string`&&(e.text=e.text.toString());let{text:i,style:a,textureStyle:o,autoGenerateMipmaps:s}=e,c=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:u}=Go.getCanvasAndContext({text:i,style:a,resolution:c}),d=Rt(u.canvas,l.width,l.height,c,s,o?.scaleMode);if(a.trim&&(l.pad(a.padding),d.frame.copyFrom(l),d.frame.scale(1/c),d.updateUvs()),a.filters){let e=this._applyFilters(d,a.filters);return this.returnTexture(d),Go.returnCanvasAndContext(u),e}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||Go.returnCanvasAndContext(u),d}returnTexture(e){let t=e.source,n=t.resource;if(this._retainCanvasContext&&n?.getContext){let e=n.getContext(`2d`);e&&Go.returnCanvasAndContext({canvas:n,context:e})}t.resource=null,t.uploadMethodId=`unknown`,t.alphaMode=`no-premultiply-alpha`,ot.returnTexture(e)}renderTextToCanvas(){_t(`8.10.0`,`CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead`)}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;let n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle,autoGenerateMipmaps:e.autoGenerateMipmaps});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){let t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){let n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind({target:n,clear:!1}),r}destroy(){this._renderer=null;for(let e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}},Qo=class extends Zo{constructor(e){super(e,!0)}};Qo.extension={type:[Nt.CanvasSystem],name:`canvasText`};var $o=class extends Zo{constructor(e){super(e,!1)}};$o.extension={type:[Nt.WebGLSystem,Nt.WebGPUSystem],name:`canvasText`},St.add(Qo),St.add($o),St.add(Xo);var es=class extends Fo{constructor(...e){let t=Io(e,`Text`);super(t,di),this.renderPipeId=`text`,t.textureStyle&&(this.textureStyle=t.textureStyle instanceof ut?t.textureStyle:new ut(t.textureStyle),qo(this.textureStyle)),this.autoGenerateMipmaps=t.autoGenerateMipmaps??lt.defaultOptions.autoGenerateMipmaps}updateBounds(){let e=this._bounds,t=this._anchor,n=0,r=0;if(this._style.trim){let{frame:e,canvasAndContext:t}=Go.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Go.returnCanvasAndContext(t),n=e.width,r=e.height}else{let e=si.measureText(this._text,this._style);n=e.width,r=e.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}},ts=class{execute(e,t){let n=e.renderer,r=n.canvasContext.activeContext,i=t.particleChildren,a=t.texture;r.save(),n.canvasContext.setContextTransform(t.worldTransform,t.roundPixels),n.canvasContext.setBlendMode(t.groupBlendMode);let o=t.groupColorAlpha,s=n.filter?.alphaMultiplier??1,c=(o>>>24&255)/255*s;for(let e=0;e<i.length;e++){let t=i[e],n=t.texture||a;if(!n?.source?.resource)continue;let o=t.color,s=(o>>>24&255)/255*c;if(s<=0)continue;let l=o&16777215,u=((l&255)<<16)+(l&65280)+(l>>16&255),d=n.source.resource;u!==16777215&&(d=zt.getTintedCanvas({texture:n},u));let f=n.frame,p=n.source.resolution,m=f.x*p,h=f.y*p,g=f.width*p,_=f.height*p;r.globalAlpha=s;let v=-t.anchorX*f.width,y=-t.anchorY*f.height;t.rotation!==0||t.scaleX!==1||t.scaleY!==1?(r.save(),r.translate(t.x,t.y),r.rotate(t.rotation),r.scale(t.scaleX,t.scaleY),r.drawImage(d,m,h,g,_,v,y,f.width,f.height),r.restore()):r.drawImage(d,m,h,g,_,t.x+v,t.y+y,f.width,f.height)}r.restore()}};function ns(e,t=null){let n=e*6;if(t||=n>65535?new Uint32Array(n):new Uint16Array(n),t.length!==n)throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${n}`);for(let e=0,r=0;e<n;e+=6,r+=4)t[e+0]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3;return t}function rs(e){return{dynamicUpdate:is(e,!0),staticUpdate:is(e,!1)}}function is(e,t){let n=[];n.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(let i in e){let a=e[i];if(t!==a.dynamic)continue;n.push(`offset = index + ${r}`),n.push(a.code);let o=kt(a.format);r+=o.stride/4}n.push(`
            index += stride * 4;
        }
    `),n.unshift(`
        var stride = ${r};
    `);let i=n.join(`
`);return Function(`ps`,`f32v`,`u32v`,i)}var as=class{constructor(e){this._size=0,this._generateParticleUpdateCache={};let t=this._size=e.size??1e3,n=e.properties,r=0,i=0;for(let e in n){let t=n[e],a=kt(t.format);t.dynamic?i+=a.stride:r+=a.stride}this._dynamicStride=i/4,this._staticStride=r/4,this.staticAttributeBuffer=new Kt(t*4*r),this.dynamicAttributeBuffer=new Kt(t*4*i),this.indexBuffer=ns(t);let a=new Pt,o=0,s=0;this._staticBuffer=new Tt({data:new Float32Array(1),label:`static-particle-buffer`,shrinkToFit:!1,usage:At.VERTEX|At.COPY_DST}),this._dynamicBuffer=new Tt({data:new Float32Array(1),label:`dynamic-particle-buffer`,shrinkToFit:!1,usage:At.VERTEX|At.COPY_DST});for(let e in n){let t=n[e],r=kt(t.format);t.dynamic?(a.addAttribute(t.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:t.format}),o+=r.size):(a.addAttribute(t.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:s*4,format:t.format}),s+=r.size)}a.addIndex(this.indexBuffer);let c=this.getParticleUpdate(n);this._dynamicUpload=c.dynamicUpdate,this._staticUpload=c.staticUpdate,this.geometry=a}getParticleUpdate(e){let t=os(e);return this._generateParticleUpdateCache[t]||(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e)),this._generateParticleUpdateCache[t]}generateParticleUpdate(e){return rs(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new Kt(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new Kt(this._size*this._dynamicStride*4*4),this.indexBuffer=ns(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));let n=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,n.float32View,n.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){let t=this.staticAttributeBuffer;this._staticUpload(e,t.float32View,t.uint32View),this._staticBuffer.setDataWithSize(t.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}};function os(e){let t=[];for(let n in e){let r=e[n];t.push(n,r.code,r.dynamic?`d`:`s`)}return t.join(`_`)}var ss=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,cs=`attribute vec2 aVertex;
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
`,ls=`
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
}`,us=class extends Mt{constructor(){let e=wt.from({vertex:cs,fragment:ss}),t=Ct.from({fragment:{source:ls,entryPoint:`mainFragment`},vertex:{source:ls,entryPoint:`mainVertex`}});super({glProgram:e,gpuProgram:t,resources:{uTexture:dt.WHITE.source,uSampler:new ut({}),uniforms:{uTranslationMatrix:{value:new jt,type:`mat3x3<f32>`},uColor:{value:new yt(16777215),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}}})}},ds=class{constructor(e,t){this.state=Dt.for2d(),this.localUniforms=new xt({uTranslationMatrix:{value:new jt,type:`mat3x3<f32>`},uColor:{value:new Float32Array(4),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}),this.renderer=e,this.adaptor=t,this.defaultShader=new us,this.state=Dt.for2d(),this._managedContainers=new Xt({renderer:e,type:`renderable`,name:`particleContainer`})}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new as({size:e.particleChildren.length,properties:e._properties}),this._managedContainers.add(e),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){let t=e.particleChildren;if(t.length===0)return;let n=this.renderer,r=this.getBuffers(e);e.texture||=t[0].texture;let i=this.state;r.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=Zt(e.groupBlendMode,e.texture._source);let a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o);let s=n.globalUniforms.globalUniformData;o.tx-=s.offset.x,o.ty-=s.offset.y,o.prepend(s.projectionMatrix),a.uResolution=s.resolution,a.uRound=n._roundPixels|e._roundPixels;let c=e.groupColorAlpha,l=s.worldColor,u=(c>>>24)*(l>>>24)/255|0,d=it(c&16777215,l&16777215);Yt((u<<24|d)>>>0,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this._managedContainers.destroy(),this.renderer=null,this.defaultShader&&=(this.defaultShader.destroy(),null)}};ds.extension={type:[Nt.CanvasPipes],name:`particle`};var fs=class extends ds{constructor(e){super(e,new ts)}};fs.extension={type:[Nt.CanvasPipes],name:`particle`};var ps=class{execute(e,t){let n=e.state,r=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;let a=r.gl,o=e.getBuffers(t);r.shader.bind(i),r.state.set(n),r.geometry.bind(o.geometry,i.glProgram);let s=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,s,0)}},ms=class extends ds{constructor(e){super(e,new ps)}};ms.extension={type:[Nt.WebGLPipes],name:`particle`};var hs=class{execute(e,t){let n=e.renderer,r=t.shader||e.defaultShader;r.groups[0]=n.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),r.groups[1]=n.texture.getTextureBindGroup(t.texture);let i=e.state,a=e.getBuffers(t);n.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}},gs=class extends ds{constructor(e){super(e,new hs)}};gs.extension={type:[Nt.WebGPUPipes],name:`particle`};var _s={vertex:{attributeName:`aVertex`,format:`float32x2`,code:`
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
        `,dynamic:!1}};St.add(ms),St.add(gs),St.add(fs);var vs=new ht(0,0,0,0),ys=class e extends pt{constructor(t={}){t={...e.defaultOptions,...t,dynamicProperties:{...e.defaultOptions.dynamicProperties,...t?.dynamicProperties}};let{dynamicProperties:n,shader:r,roundPixels:i,texture:a,particles:o,...s}=t;super({label:`ParticleContainer`,...s}),this.renderPipeId=`particle`,this.batched=!1,this._childrenDirty=!1,this.texture=a||null,this.shader=r,this._properties={};for(let e in _s){let t=_s[e],r=n[e];this._properties[e]={...t,dynamic:r}}this.allowChildren=!0,this.roundPixels=i??!1,this.particleChildren=o??[]}addParticle(...e){for(let t=0;t<e.length;t++)this.particleChildren.push(e[t]);return this.onViewUpdate(),e[0]}removeParticle(...e){let t=!1;for(let n=0;n<e.length;n++){let r=this.particleChildren.indexOf(e[n]);r>-1&&(this.particleChildren.splice(r,1),t=!0)}return t&&this.onViewUpdate(),e[0]}update(){this._childrenDirty=!0}onViewUpdate(){this._childrenDirty=!0,super.onViewUpdate()}get bounds(){return vs}updateBounds(){}destroy(e=!1){if(super.destroy(e),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource,n=this.texture??this.particleChildren[0]?.texture;n&&n.destroy(t)}this.texture=null,this.shader?.destroy()}removeParticles(e,t){e??=0,t??=this.particleChildren.length;let n=this.particleChildren.splice(e,t-e);return this.onViewUpdate(),n}removeParticleAt(e){let t=this.particleChildren.splice(e,1);return this.onViewUpdate(),t[0]}addParticleAt(e,t){return this.particleChildren.splice(t,0,e),this.onViewUpdate(),e}addChild(...e){throw Error(`ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()`)}removeChild(...e){throw Error(`ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()`)}removeChildren(e,t){throw Error(`ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()`)}removeChildAt(e){throw Error(`ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()`)}getChildAt(e){throw Error(`ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()`)}setChildIndex(e,t){throw Error(`ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()`)}getChildIndex(e){throw Error(`ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()`)}addChildAt(e,t){throw Error(`ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()`)}swapChildren(e,t){throw Error(`ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()`)}reparentChild(...e){throw Error(`ParticleContainer.reparentChild() is not available with the particle container`)}reparentChildAt(e,t){throw Error(`ParticleContainer.reparentChildAt() is not available with the particle container`)}};ys.defaultOptions={dynamicProperties:{vertex:!1,position:!0,rotation:!1,uvs:!1,color:!1},roundPixels:!1};var bs=ys;St.add(Co,wo),t({x:-1,y:-1});var xs=class extends m()(`antha-entity-event`){constructor(e){super({detail:e})}},Ss=class extends xs{},Cs=t({x:-1,y:-1});function ws(t){if(!t)return;let n={};return e(t).forEach(([t,r])=>{e(r).forEach(([e,r])=>{if(!r)return;let i=Ce(n,k.isString(r)?r:e,()=>({})),a=Ce(i,t,()=>[]);a.includes(e)||a.push(e)})}),n}var Ts=class{static entityKey=`BaseEntity`;static collidesWith;static collidesWithSet=new Set;static paramsShape;static assets;static paramsMap;static reverseParamsMap;static deserialize(e){let t=e?JSON.parse(e):void 0;return this.paramsShape?s(t,this.paramsShape):Te.isUndefined(t),t}dispatch(e){this.entityStore?.listenTarget.dispatch(e)}isDestroyed=!1;entityDefinition;abortController=new AbortController;abortSignal=this.abortController.signal;hitbox;entityStore;params;pixi;hitboxSystem;getAsset;constructor(e){this.entityDefinition=this.constructor,this.entityStore=e.entityStore,this.params=e.params,this.pixi=e.pixi,this.hitboxSystem=e.hitboxSystem,this.state=e.state;let t=this.constructor.assets;this.getAsset=Es({assetLoader:e.entityStore.assetLoader,entityAssets:t})}render(e){}initInstance(){}state;async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot add entity through destroyed entity.`);return await this.entityStore.addEntity(e,...t)}destroy(){this.abortController.abort(),h(this).isDestroyed=!0}immediatelyDestroy(){this.abortController.abort(),h(this).isDestroyed=!0,this.entityStore?.removeEntity(this),this.dispatch(new Ss({entityInstance:this})),delete this.entityStore,delete this.hitboxSystem,delete this.params}collide(e,t){}serialize(){return this.params?JSON.stringify(this.params):void 0}};function Es({assetLoader:e,entityAssets:t}){return!t||k.isEmpty(t)?{}:me(t,(t,n)=>async()=>e.loadIndividualAsset({asset:n}))}var Ds=class extends Ts{view;async initInstance(){let{view:e,hitbox:t}=await this.createView();e?(this.view=e,this.pixi.stage.addChild(this.view)):(this.view=new bs,this.view.visible=!1),t&&(this.hitbox=t,this.hitbox.userData=this,this.hitboxSystem.insert(this.hitbox)),this.wrapParamsInProxy()}constructor(e){super(e)}wrapParamsInProxy(){let t=this.constructor.paramsMap,n=this.constructor.reverseParamsMap,r=this.params;r&&t&&n&&(h(this).params=new Proxy(r,{set:(e,t,i,a)=>{if(t in r&&k.hasKey(n,t)){let e=n[t];this.hitbox&&e?.hitbox&&e.hitbox.forEach(e=>{this.hitbox[e]=i}),e?.view&&e.view.forEach(e=>{this.view[e]=i})}return Reflect.set(e,t,i,a)}}),e(this.params).forEach(([e,t])=>{this.params[e]=t}))}isInBounds(e={}){if(this.isDestroyed)throw Error(`Cannot check bounds on destroyed entity.`);return e.entirely?this.pixi.screen.containsRect(this.view.getBounds().rectangle):this.pixi.screen.intersects(this.view.getBounds().rectangle)}immediatelyDestroy(){this.view?.destroy({children:!0}),this.hitbox&&this.hitboxSystem.remove(this.hitbox),super.immediatelyDestroy(),delete this.view}};function Os(e){return e.userData instanceof Ts?e.userData:void 0}function ks(e){return!!e.entityDefinition.collidesWith?.collidesWithSelf||e.entityDefinition.collidesWithSet.size>0}function As({entity:e,otherEntity:t}){return e.entityDefinition.collidesWith?.collidesWithSelf&&e.entityDefinition===t.entityDefinition||e.entityDefinition.collidesWithSet.has(t.entityDefinition)}function js({firstEntity:e,secondEntity:t}){return As({entity:e,otherEntity:t})||As({entity:t,otherEntity:e})}function Ms({entity:e,otherEntity:t}){return As({entity:e,otherEntity:t})}function Ns(e){let t=new So;return t.a=e.b,t.aInB=e.bInA,t.b=e.a,t.bInA=e.aInB,t.overlap=e.overlap,t.overlapN.x=-e.overlapN.x,t.overlapN.y=-e.overlapN.y,t.overlapV.x=-e.overlapV.x,t.overlapV.y=-e.overlapV.y,t}function Ps({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){return e.get(t)?.has(n)||e.get(n)?.has(t)}function Fs({checkedHitboxPairs:e,firstHitbox:t,secondHitbox:n}){let r=e.get(t);r?r.add(n):e.set(t,new WeakSet([n]))}var Is=class extends xo{checkedHitboxPairs;checkAll(...[e,t]){let n=this.checkedHitboxPairs;this.checkedHitboxPairs=new WeakMap;try{return this.all().some(n=>{let r=Os(n);return(!r||ks(r))&&this.checkOne(n,e,t)})}finally{this.checkedHitboxPairs=n}}checkOne(...[e,t,n]){let r=Os(e);return r&&!ks(r)?!1:super.checkOne(e,t,n)}checkCollision(...e){let[t,n]=e,r=this.checkedHitboxPairs;if(r&&Ps({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n}))return!1;r&&Fs({checkedHitboxPairs:r,firstHitbox:t,secondHitbox:n});let i=Os(t),a=Os(n);return i&&a&&!js({firstEntity:i,secondEntity:a})?!1:super.checkCollision(...e)}},Ls=t({entityKey:``,serializedParams:Dn(``,{alsoUndefined:!0})}),Rs=class{currentEntityInstances=new Set;isDestroyed=!1;entityInstanceMap=new pn;pixi;hitboxSystem;entityKeyConstructorMap={};listenTarget=new pe;state;assetLoader;constructor(e){this.pixi=e.pixi,this.assetLoader=e.assetLoader,this.hitboxSystem=e.customHitboxSystem||new Is,this.state=e.state,e.preregisteredEntities&&this.registerEntities({entities:e.preregisteredEntities,clearPreviousRegistrations:!0})}registerEntities({clearPreviousRegistrations:e,entities:t}){e&&(this.entityKeyConstructorMap={}),t.forEach(e=>{this.entityKeyConstructorMap[e.entityKey]=e})}async updateAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed){t.immediatelyDestroy();return}await t.update(e),t.isDestroyed&&t.immediatelyDestroy()}this.hitboxSystem.update();let t=[];this.hitboxSystem.checkAll(e=>{let n=e.a.userData instanceof Ts?e.a.userData:void 0,r=e.b.userData instanceof Ts?e.b.userData:void 0;if(!n||!r||n.isDestroyed||r.isDestroyed)return;function i(e){e instanceof Promise&&t.push(e)}Ms({entity:n,otherEntity:r})&&i(n.collide(r,e)),Ms({entity:r,otherEntity:n})&&i(r.collide(n,Ns(e)))}),await Promise.all(t)}async renderAllEntities(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);for(let t of this.currentEntityInstances){if(t.isDestroyed)return;await t.render(e)}}getEntities(e){return this.entityInstanceMap.getInstances(e)}removeEntity(e){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.delete(e),this.entityInstanceMap.remove(e),e instanceof Ds&&!e.isDestroyed&&(this.pixi.stage.removeChild(e.view),e.hitbox&&this.hitboxSystem.remove(e.hitbox))}async deserializeEntity(e,t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);let n=this.entityKeyConstructorMap[e];if(!n)throw Error(`No entity registered for key '${e}'`);return await this.addEntity(n,n.deserialize(t))}createSnapshot(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);return[...this.currentEntityInstances].filter(e=>!e.isDestroyed).map(e=>({entityKey:e.entityDefinition.entityKey,serializedParams:e.serialize()}))}hashEntities(){return Li(this.createSnapshot())}async loadSnapshot(e){return Te.isArray(e,`Entity snapshot must be an array.`),e.forEach((e,t)=>{s(e,Ls,{},`Invalid entity snapshot entry at index ${t}`)}),this.destroyAllEntities(),await oe(e,async e=>await this.deserializeEntity(e.entityKey,e.serializedParams))}async addEntity(e,...t){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);e.entityKey in this.entityKeyConstructorMap||(this.entityKeyConstructorMap[e.entityKey]=e);let n=new e({entityStore:this,pixi:this.pixi,state:this.state,params:t[0],hitboxSystem:this.hitboxSystem});return await n.initInstance(),this.currentEntityInstances.add(n),this.entityInstanceMap.add(n),n}destroyAllEntities(){if(this.isDestroyed)throw Error(`Cannot operate on a destroyed entity store.`);this.currentEntityInstances.forEach(e=>e.immediatelyDestroy())}destroy(){if(this.isDestroyed)throw Error(`Entity store is already destroyed.`);this.currentEntityInstances.forEach(e=>e.destroy()),h(this).isDestroyed=!0,this.listenTarget.destroy(),this.currentEntityInstances.clear(),this.entityInstanceMap.destroy(),delete this.pixi,delete this.hitboxSystem,delete this.listenTarget}};function zs({state:e,options:t}){return!e.pixi?.pixiApplication||!e.assetLoader?!1:(e.entityStore||=new Rs(p({pixi:e.pixi.pixiApplication,state:e,assetLoader:e.assetLoader},t)),!0)}function Bs(t={}){let n=new Set;function r(t){return n=>(n.assets&&e(n.assets).forEach(([e,t])=>{t.assetName=[n.key,e].join(`:`)}),i(t,n))}function i(e,{collidesWith:t,key:r,paramsShape:i,paramsMap:a,assets:o}){if(n.has(r))throw Error(`Entity key '${r}' has already been attached to an entity class.`);n.add(r);let s={[r]:class extends e{static collidesWith=t;static collidesWithSet=new Set(t?.collidesWithOtherEntities);static entityKey=r;static paramsShape=i;static assets=o||{};static paramsMap=a;static reverseParamsMap=ws(a)}};return D.isDefined(s[r])}return{updateEntitiesMod:Xe({modName:`antha-entity-2d-update`,initState:{showHitboxDebug:!!t.debug,disableEntityRender:!!t.disableEntityRender,disableEntityUpdate:!!t.disableEntityUpdate},cleanup({state:e}){e.entityStore?.destroy()},trigger:t.updateTrigger,async execute(e){if(zs({options:t,state:e.state}))e.state.entityStore&&(e.state.disableEntityUpdate||await e.state.entityStore.updateAllEntities(e),e.state.disableEntityRender||await e.state.entityStore.renderAllEntities(e));else return Ue;return e.state.showHitboxDebug?E`
                      <canvas class="hitbox-debug-canvas"></canvas>
                  `:void 0}}),defineEntity:r(Ds),defineLogicEntity:r(Ts),entityKeys:n}}function Vs({assetName:e=`Audio files`,audioPlayer:t,files:n,serial:r}){return Je({assetName:e,maxProgress:n.length,async load({incrementProgressCallback:e}){return await t.loadFiles(n,{progressCallback(){e()},serial:!!r}),{value:void 0}}})}async function Hs({assetLoader:e,assets:t,audio:n,entities:r},i){return await e.bulkLoadAssets([...n?[Vs(n)]:[],...t||[],...(r||[]).flatMap(e=>Pe(e.assets))],i)}function Us(e){return Xe({modName:`antha-fps`,trigger:{durationMs:e?.fpsUpdateIntervalMs||500,executeImmediately:!0},initState:{debugFps:!!e?.debugFps,hideFps:!!e?.hideFps},execute({state:e,msSinceLastExecute:t,ticksSinceLastExecute:n}){let r=Ce(e,`fpsStutters`,()=>[]),i=t/1e3,a=i>0?ln(n/i,{digits:1}):0;e.debugFps&&a>0&&a<55&&(r.push(a),r.length>10&&r.splice(0,r.length-10));let o=[!e.hideFps&&E`
                        <div
                            title="Ticks Per Second"
                            style=${A`
                                ${dr(Ee.asTheme.colors[`vira-pink-foreground-body`])}
                                padding: 1px 3px;
                            `}
                        >
                            ${Math.round(a).toFixed(0)} FPS
                        </div>
                    `,e.debugFps&&r.length>0&&E`
                        <div
                            title="FPS Stutters"
                            style=${A`
                                ${dr(Ee.asTheme.colors[`vira-yellow-foreground-body`])}
                                padding: 1px 3px;
                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            ${r.map(e=>E`
                                    <span>${Math.round(e)}</span>
                                `)}
                        </div>
                    `].filter(k.isTruthy);if(o.length)return E`
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
                `}})}var Ws={background:`black`,antialias:!0,powerPreference:`high-performance`};function Gs(e){let t={...Ws,canvas:void 0,...e?.pixiOptions};return Xe({modName:`antha-graphics-2d`,cleanup({state:e}){e.pixi?.resizeObserver?.disconnect(),e.pixi?.pixiApplication?.destroy(!0)},async execute({hostElement:n,state:r}){let i=Ce(r,`pixi`,()=>({})),a=t.canvas||i.canvas;if(!i.pixiApplication&&a){let e=new Po;await e.init({resizeTo:n,...t,canvas:a}),i.pixiApplication=e,i.resizeObserver=Ge(n,()=>{e.queueResize()}).resizeObserver}return t.canvas?void 0:E`
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
                              ${l(e?.extraCanvasWrapperStyles)}
                          `}
                      >
                          <canvas
                              style=${A`
                                  box-sizing: border-box;

                                  width: 100%;
                                  height: 100%;
                                  ${l(e?.extraCanvasStyles)}
                              `}
                              id="antha-graphics-2d"
                              ${ur(e=>{Te.instanceOf(e,HTMLCanvasElement),i.canvas||=e})}
                          ></canvas>
                      </div>
                  `}})}function Ks({canvasBounds:e,clientPoint:t,virtualViewport:n}){if(e.width&&e.height)return{x:(t.x-e.left)/e.width*n.width,y:(t.y-e.top)/e.height*n.height}}function qs(){return{autoDensity:!0,resolution:globalThis.devicePixelRatio||1}}function Js({previousVirtualViewport:e,virtualViewport:t}){return e!=null&&Math.abs(e.height-t.height)<.01&&Math.abs(e.scale-t.scale)<1e-4&&e.width===t.width}function Ys({isFixedViewport:e,screenSize:t,virtualViewport:n}){let r=Math.round((t.width-n.width*n.scale)/2),i=Math.round((t.height-n.height*n.scale)/2);return{height:e?`${n.height}px`:`100%`,transform:e?`translate(${r/n.scale}px, ${i/n.scale}px)`:``,width:e?`${n.width}px`:`100%`,zoom:String(n.scale)}}function Xs(e){return[e.style.height,e.style.transform,e.style.width,e.style.zoom].join(`;`)}var Zs=new WeakMap;function Qs({hostElement:e,isFixedViewport:t}){if(!t)return e.getBoundingClientRect();let n=e.getRootNode();return(n instanceof ShadowRoot?n.host:e.parentElement||e).getBoundingClientRect()}function $s({hostElement:e}){e.style.removeProperty(`height`),e.style.removeProperty(`transform`),e.style.removeProperty(`width`),e.style.removeProperty(`zoom`),Zs.delete(e)}function ec({virtualHeight:e,virtualWidth:t}){let n=!!e&&!!t;return Xe({modName:`antha-virtual-viewport`,cleanup({hostElement:e,state:t}){$s({hostElement:e}),t.virtualViewport=void 0},execute({hostElement:r,state:i}){let a=Qs({hostElement:r,isFixedViewport:n}),o=ze({screenSize:a,virtualHeight:e,virtualWidth:t});if(!o)return;let s=Ys({isFixedViewport:n,screenSize:a,virtualViewport:o}),c=!Js({previousVirtualViewport:i.virtualViewport,virtualViewport:o})||Zs.get(r)?.createdStyles!==JSON.stringify(s)||Zs.get(r)?.readStyles!==Xs(r);c&&(Object.assign(r.style,s),Zs.set(r,{createdStyles:JSON.stringify(s),readStyles:Xs(r)}),i.virtualViewport=o);let l=i.pixi?.pixiApplication;l&&(c||l.renderer.resolution!==(globalThis.devicePixelRatio||1)*o.scale||l.stage.scale.x!==1||l.stage.scale.y!==1)&&(l.renderer.resolution=(globalThis.devicePixelRatio||1)*o.scale,l.resize(),l.stage.scale.set(1))}})}var tc=function(e){return e.Music=`music`,e.Effects=`effects`,e}({}),nc=function(e){return e.GameMusic=`game-music`,e}({});function rc({audioChannel:e,fileName:t,volume:n}){return{audioChannel:e,sources:Mr(document.baseURI,`./audio/${t}`).href,volume:n}}var ic={"game-music":rc({audioChannel:`music`,fileName:`game-music.ogg`,volume:.9})},ac=Pe(ic),L=function(e){return e.Red=`red`,e.Russet=`russet`,e.Yukon=`yukon`,e.ToughSkinned=`tough-skinned`,e.Sweet=`sweet`,e.Yam=`yam`,e}({}),oc=[`red`,`russet`,`yukon`,`tough-skinned`,`sweet`,`yam`];function sc(e,t){let n=t;for(let t of oc)if(n-=e[t],n<0&&e[t]>0)return t;return oc.findLast(t=>e[t]>0)??`russet`}function cc(e){return{red:e.red??0,russet:e.russet??0,yukon:e.yukon??0,"tough-skinned":e[`tough-skinned`]??0,sweet:e.sweet??0,yam:e.yam??0}}var lc={perpendicularRangePx:160,lineHalfWidthPx:14,lineColor:`#e0e0e0`,lineAlpha:.45,lineWidthPx:4,laserColor:`#ff4d4d`,rotateStepDeg:15},uc={small:{radius:16,mashHp:120,value:.6},medium:{radius:22,mashHp:200,value:1},large:{radius:30,mashHp:340,value:1.8},king:{radius:46,mashHp:1200,value:6}},dc={stripeSpacingPx:40},fc={tuftCount:260,flowerCount:36},pc={starting:100,max:100},mc={perfect:{score:100,satisfaction:2},incomplete:{score:0,satisfaction:-5},raw:{score:0,satisfaction:-15}},hc={breakMs:1e4,waves:[{potatoCount:8,hpMultiplier:.25,chuteShare:0,seagullCount:0,clumpChance:0,clumpMaxExtra:0,extraSpawnsPerSecond:0,bossCount:0,spawnIntervalMs:3500,speedPxPerMs:.07,eyesChance:0,varietyWeights:cc({[L.Red]:.5,[L.Russet]:.5}),sizeWeights:{small:.5,medium:.5,large:0}},{potatoCount:10,hpMultiplier:.5,chuteShare:0,seagullCount:1,clumpChance:.1,clumpMaxExtra:1,extraSpawnsPerSecond:.02,bossCount:0,spawnIntervalMs:2800,speedPxPerMs:.08,eyesChance:0,varietyWeights:cc({[L.Red]:.4,[L.Russet]:.6}),sizeWeights:{small:.3,medium:.6,large:.1}},{potatoCount:14,hpMultiplier:.45,chuteShare:.15,seagullCount:2,clumpChance:.15,clumpMaxExtra:2,extraSpawnsPerSecond:.04,bossCount:0,spawnIntervalMs:2200,speedPxPerMs:.09,eyesChance:.05,varietyWeights:cc({[L.Red]:.05,[L.Russet]:.45,[L.Yukon]:.4,[L.ToughSkinned]:.1}),sizeWeights:{small:.2,medium:.6,large:.2}},{potatoCount:18,hpMultiplier:.65,chuteShare:.2,seagullCount:3,clumpChance:.2,clumpMaxExtra:2,extraSpawnsPerSecond:.06,bossCount:0,spawnIntervalMs:1700,speedPxPerMs:.1,eyesChance:.1,varietyWeights:cc({[L.Russet]:.4,[L.Yukon]:.4,[L.ToughSkinned]:.15,[L.Sweet]:.05}),sizeWeights:{small:.1,medium:.5,large:.4}},{potatoCount:24,hpMultiplier:.85,chuteShare:.25,seagullCount:4,clumpChance:.25,clumpMaxExtra:3,extraSpawnsPerSecond:.08,bossCount:1,spawnIntervalMs:1300,speedPxPerMs:.11,eyesChance:.3,varietyWeights:cc({[L.Russet]:.05,[L.ToughSkinned]:.4,[L.Sweet]:.3,[L.Yam]:.25}),sizeWeights:{small:0,medium:.5,large:.5}}]},gc={dropMs:1500,startScale:2},_c={edgeMarginPx:6,drawOrderPerPx:1e-4},vc={hp:60,flySpeedPxPerMs:.16,walkSpeedPxPerMs:.09,grabRadiusPx:24,stolenSatisfaction:-10,bountyCoins:10,flyChance:.5},yc={radius:30,buildRadiusNearOwnPathPx:300},bc={scale:1,attackMs:{knife:250,laser:250,boiler:800,masher:600,microwave:300,"cricket-trap":400,swiper:500},idleRedrawMs:50,activeRedrawMs:33},xc={flightMs:180,cricketFlightMs:400,maxLive:40,arcFraction:.25,arcMinPx:18,arcMaxPx:60,cricketArcPx:30,spinTurns:2,puffMs:160,scale:.85,hammerLevel:3},Sc={knife:{damage:4,rangePx:lc.perpendicularRangePx,cooldownMs:250},laser:{damage:4,rangePx:220,cooldownMs:250},boiler:{damage:6,rangePx:140,cooldownMs:1200},masher:{damage:40,rangePx:140,cooldownMs:1e3},microwave:{damage:50,rangePx:120,cooldownMs:700},"cricket-trap":{damage:0,rangePx:170,cooldownMs:6e3},swiper:{damage:0,rangePx:110,cooldownMs:0}},Cc={cutMultiplier:1.5,softMasherMultiplier:2},wc={hitNumberMs:600,hitNumberRisePx:30,continuousHitIntervalMs:300,iconSizePx:12,tiers:[{minMultiplier:3,color:`#ff4a1c`,fontSize:36,suffix:` ×3 SMASH!`,pop:!0},{minMultiplier:2,color:`#ff9a1c`,fontSize:28,suffix:` ×2`,pop:!1},{minMultiplier:1.5,color:`#ffe135`,fontSize:24,suffix:` ×1.5`,pop:!1},{minMultiplier:0,color:`#ffffff`,fontSize:20,suffix:``,pop:!1}]},Tc={servingPopupMs:1200,coinPopupMs:1600,coinPopupRisePx:50,coinPopupStaggerPx:64,coinPopupStaggerSlots:3,coinPopupOffsetPx:40},Ec={clickSlopPx:14},Dc={volume:.35},Oc={startingCoins:150,coinEventsKept:8,towerCost:{knife:40,laser:150,boiler:60,masher:80,microwave:50,"cricket-trap":60,swiper:70},servingCoins:{perfect:20,incomplete:5,raw:0}},kc={extraStartingCoinsPerPlayer:100},Ac={byWave:[{maxOpen:1,intervalMs:12e3,lifetimeMs:35e3,dishes:[`buttered-mash`,`bangers-and-mash`]},{maxOpen:2,intervalMs:1e4,lifetimeMs:32e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`]},{maxOpen:2,intervalMs:9e3,lifetimeMs:3e4,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:8e3,lifetimeMs:28e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]},{maxOpen:3,intervalMs:7e3,lifetimeMs:25e3,dishes:[`buttered-mash`,`bangers-and-mash`,`champ`,`colcannon`]}],firstOrderDelayMs:3e3,travelTimeMultiplier:1.6,fulfilled:{score:150,coins:30,satisfaction:5},expiredSatisfaction:-12},jc={speeds:[1,1.5,2,3],untilIncomeSpeed:2},Mc=[`#e0533d`,`#4a90c8`,`#6aa84f`,`#9b59b6`],Nc={frameMs:1e3/30,simSpeedWindowMs:2e3},Pc=`colcannon-fodder-volume`,Fc={music:.6,effects:.8};function Ic(e,t){return typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t}function Lc(){try{let e=globalThis.localStorage.getItem(Pc);if(e==null)return{...Fc};let t=JSON.parse(e);return{music:Ic(t?.music,Fc.music),effects:Ic(t?.effects,Fc.effects)}}catch{return{...Fc}}}var Rc;function zc(){return Rc??=Lc(),Rc}function Bc(e,t){Rc={...zc(),[e]:Ic(t,Fc[e])};try{globalThis.localStorage.setItem(Pc,JSON.stringify(Rc))}catch{}}var Vc=function(e){return e.Chop=`chop`,e.Boil=`boil`,e.Squish=`squish`,e.ServePerfect=`serve-perfect`,e.ServeBad=`serve-bad`,e.ServeRaw=`serve-raw`,e.Build=`build`,e.Squawk=`squawk`,e.BossArrives=`boss-arrives`,e}({}),Hc=.001,Uc,Wc,Gc=!1;function Kc(){if(typeof AudioContext<`u`)return(!Uc||!Wc)&&(Uc=new AudioContext,Wc=Uc.createGain(),Wc.gain.value=Dc.volume,Wc.connect(Uc.destination)),Wc.gain.value=Gc?0:zc().effects*Dc.volume,Uc.state===`suspended`&&Uc.resume().catch(()=>{}),{context:Uc,master:Wc}}function qc(){return Gc}function Jc(e){Gc=e}function Yc(e,t){let{context:n,master:r}=e,i=n.currentTime+t.startSec,a=i+t.durationSec,o=n.createOscillator(),s=n.createGain();if(o.type=t.type,o.frequency.setValueAtTime(t.startHz,i),t.endHz!=null&&o.frequency.exponentialRampToValueAtTime(t.endHz,a),s.gain.setValueAtTime(t.startGain,i),s.gain.exponentialRampToValueAtTime(Hc,a),o.connect(s),t.lowpassHz==null)s.connect(r);else{let e=n.createBiquadFilter();e.type=`lowpass`,e.frequency.value=t.lowpassHz,s.connect(e),e.connect(r)}o.start(i),o.stop(a)}function Xc(e){let{context:t,master:n}=e,r=.04,i=Math.ceil(t.sampleRate*r),a=t.createBuffer(1,i,t.sampleRate),o=a.getChannelData(0),s=crypto.getRandomValues(new Uint16Array(i));for(let e=0;e<i;e++)o[e]=(s[e]??0)/32768-1;let c=t.createBufferSource();c.buffer=a;let l=t.createBiquadFilter();l.type=`bandpass`,l.frequency.value=3e3;let u=t.createGain(),d=t.currentTime;u.gain.setValueAtTime(1,d),u.gain.exponentialRampToValueAtTime(Hc,d+r),c.connect(l),l.connect(u),u.connect(n),c.start(d),c.stop(d+r)}var Zc={boil:[{type:`sine`,startHz:300,endHz:700,startSec:0,durationSec:.12,startGain:.6}],squish:[{type:`sawtooth`,startHz:180,endHz:70,startSec:0,durationSec:.16,startGain:.8,lowpassHz:900}],"serve-perfect":[{type:`sine`,startHz:660,startSec:0,durationSec:.09,startGain:.7},{type:`sine`,startHz:880,startSec:.09,durationSec:.09,startGain:.7}],"serve-bad":[{type:`square`,startHz:220,startSec:0,durationSec:.15,startGain:.4}],"serve-raw":[{type:`sawtooth`,startHz:140,endHz:90,startSec:0,durationSec:.25,startGain:.6}],squawk:[{type:`square`,startHz:900,endHz:600,startSec:0,durationSec:.12,startGain:.4}],"boss-arrives":[{type:`sawtooth`,startHz:110,startSec:0,durationSec:.25,startGain:.6},{type:`sawtooth`,startHz:82,startSec:.25,durationSec:.25,startGain:.6}],build:[{type:`triangle`,startHz:520,startSec:0,durationSec:.08,startGain:.6}]};function Qc(e){if(Gc)return;let t=Kc();if(t){if(e===`chop`){Xc(t);return}Zc[e].forEach(e=>{Yc(t,e)})}}function $c(e){return e?AbortSignal.timeout($e(e,{milliseconds:!0}).milliseconds):void 0}async function el(e,t){return t?(t.throwIfAborted(),await new Promise((n,r)=>{let i=new AbortController;t.addEventListener(`abort`,()=>{r(v(t.reason))},{once:!0,signal:i.signal}),e.then(n,r).finally(()=>{i.abort()})})):await e}var tl=class extends Error{name=`RoomRejectionError`;room;constructor(e){super(`Room connection rejected`),this.room=hn(e,[`roomPassword`])}},nl=class extends Error{name=`DefineApiError`};function rl(e){return{apiName:e.apiName,endpoints:e.endpoints?il(`endpoints`,e.endpoints):{},webSockets:e.webSockets?il(`webSockets`,e.webSockets):{}}}function il(e,t){let n=new Set,r=t.reduce((e,t)=>(t.path in e?n.add(t.path):e[t.path]=t,e),{});if(n.size)throw new nl(`Duplicate API ${e} paths: ${Array.from(n).join(`,`)}`);return r}function al(e){return e}function ol(e,t){return e.requests[t]}Qt.Get,Qt.Put,Qt.Post,Qt.Delete,Qt.Patch,Qt.Trace,Qt.Post,Qt.Put,Qt.Patch,Qt.Delete;function sl(e){return e}function cl(e,...t){let n=t[0]?.pathParams,r=0,i=e.path.replaceAll(/\/:([^/]+)/g,(e,t)=>{if(r++,n&&k.hasKey(n,t)&&n[t])return qe({value:n[t],prefix:`/`});throw Error(`Missing value for path param '${t}'.`)}).replace(/\/\*$/,()=>{if(r++,n?.wildcard==null)throw Error(`Missing value for wildcard param.`);return qe({value:n.wildcard,prefix:`/`})});if(!r&&n)throw Error(`Route '${e.path}' does not allow any path params but some were set.`);return i}var ll=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function ul(e){let t=new Set,n=-1,r=-1,i=0;for(;i<e.length;i++){let a=e.codePointAt(i);if(r===-1&&ll[a]===1)n===-1&&(n=i);else if(i!==0&&(a===32||a===9))r===-1&&n!==-1&&(r=i);else if(a===44){if(n===-1)throw SyntaxError(`Unexpected character at index ${i}`);r===-1&&(r=i);let a=e.slice(n,r);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),n=r=-1}else throw SyntaxError(`Unexpected character at index ${i}`)}if(n===-1||r!==-1)throw SyntaxError(`Unexpected end of input`);let a=e.slice(n,i);if(t.has(a))throw SyntaxError(`The "${a}" subprotocol is duplicated`);return t.add(a),t}function dl(e){if(e&&e!==`undefined`)return ve(()=>JSON.parse(e),{fallbackValue:e})}function fl(e,t){t.forEach(t=>{e.delete(t)})}function pl(e,t){let n=t.toLowerCase(),r=b(e,(e,t)=>({key:e.toLowerCase(),value:t}))[n];return r==null?[]:k.isNumber(r)?[String(r)]:be(r)}var ml=`rest-vir-api`;async function hl(e,{startOrigin:t,...n}){try{let r=Object.values(e.endpoints)[0];if(!r)throw Error(`Api has no endpoints.`);let{port:i}=await Ze.isDefined(async()=>({port:await gl(t,r,{...n,isValidResponse(t){return t.headers.get(ml)===e.apiName}})}),{timeout:n.timeout});if(!i)return;let{origin:a}=Mr(t,{port:i});return{port:i,origin:a}}catch(t){throw S(t,`Cannot find dev origin for service '${e.apiName}'`)}}async function gl(e,t,{fetchOverride:n,maxScanDistance:r=100,isValidResponse:i,timeout:a={seconds:10}}){let{port:o}=jr(e);if(!o)return;let s=Number(o);if(!k.isNumber(s))throw TypeError(`Origin '${e}' doesn't have a valid port: '${o}'.`);let c=0,l=!1,u=$e(a,{milliseconds:!0}).milliseconds,d=Date.now();for(;!l;){let a=c+s;if(Date.now()-d>=u)throw Error(`Port scan timeout reached. Last scanned port: ${a-1}`);let o=Mr(e,{pathname:t.path,port:a}).href,f=await ve(()=>(n||fetch)(o,{method:Qt.Options},t));if(!k.instanceOf(f,Error)&&f.ok&&(!i||i(f)))l=!0;else if(c>=r)throw Error(`Max port scan distance reached. Last scanned port: ${a}`);else c++}return c+s}function _l(e){let t=Number(e),n=String(e);if(k.isEnumValue(t,ae))return t;console.error(`Invalid HTTP status: ${e}`);let r=Math.floor((Number(n[0])||0)*100);return k.isEnumValue(r,ae)?r:ae.InternalServerError}async function vl({endpoint:e,method:t,response:n,handleDeclaredResponseStatusOverride:r,includeResponse:i,shouldCondenseResponse:a}){let o=ol(e,t),s=_l(n.status),c=o?.responses[s],l={status:s,...i?{response:n}:{}};if(c){let t=await(r||yl)({endpoint:e,responseDefinition:c,response:n});return a&&bl(n),{[Sl[s]]:{...l,responseData:t,headers:xl(n.headers)}}}if(f(s)){let e=await Cl(n);return a&&bl(n),{unexpectedError:{...l,responseData:e,headers:xl(n.headers)}}}throw Error(`Received unexpected successful response status from endpoint '${e.path}': ${s}`)}async function yl({response:e,responseDefinition:t,endpoint:n}){let r=await wl(e);if(t.responseData)s(r,t.responseData,{allowExtraKeys:!0},`Response from endpoint '${n.path}' has invalid data.`);else if(r!==void 0)throw Error(`Response from endpoint '${n.path}' has unexpectedly present data.`);return r}function bl(e){fl(e.headers,[`access-control-allow-credentials`,`access-control-allow-origin`,`access-control-expose-headers`,`connection`,`content-length`,`content-type`,`date`,`keep-alive`,`vary`,ml])}function xl(e){return Object.fromEntries(e.entries())}var Sl=Oe(e(ae).map(([e,t])=>[t,e]));async function Cl(e){return await e.clone().text()||void 0}async function wl(e){let t=await Cl(e);return t&&dl(t)}function Tl(e,t,n){if(t){if(!n)throw Error(`Endpoint '${String(e)}' has required headers but none were set.`);return b(t,(t,r)=>{let a=pl(n,t)[0];if(r instanceof RegExp){if(!a||!r.test(a))throw Error(`Route '${String(e)}' required header '${t}' value does not match RegExp requirement: '${i(a)}'`)}else Te.tsType(r).equals(),s(a,r,{allowExtraKeys:!0},`Route '${String(e)}' required header '${t}' value does not match shape requirement: '${i(a)}'`);if(a)return{key:t,value:a}})}if(n&&Object.keys(n).length)throw Error(`Endpoint '${String(e)}' has no required headers but some were set.`);return{}}function El(t,n){let r=n??{},i={};return e(t||{}).forEach(([e,t])=>{let n=r[e],a=Dl(e,n,t);a!=null&&(i[e]=a)}),rt(r).forEach(e=>{if(!(t&&e in t)){let t=r[e],n=Ml(t);n!==void 0&&(i[e]=n)}}),i}function Dl(e,t,n){return n instanceof RegExp?kl(e,t,n):k.isArray(n)?Al(e,t,n):Ol(e,t,n)}function Ol(e,t,n){let r=jl(t),a=!t||k.isArray(t)?void 0:[i(t)],o=!k.isArray(t)||t.length!==1?void 0:String(t[0]);if(re(r,n,{allowExtraKeys:!0}))return r;if(a&&re(a,n,{allowExtraKeys:!0}))return a;if(o&&re(o,n,{allowExtraKeys:!0}))return o;s(t,n,{allowExtraKeys:!0},`Search param '${e}' value does not match shape requirement: '${i(t)}'`)}function kl(e,t,n){let r=k.isArray(t)&&t.length===1?t[0]:t;if(r==null)throw Error(`Search param '${e}' is required but was not provided.`);if(k.isArray(r))throw TypeError(`Search param '${e}' expects a single value but got multiple: '${i(t)}'`);let a=i(r);if(!a||!n.test(a))throw Error(`Search param '${e}' value does not match RegExp requirement: '${i(a)}'`);return a}function Al(e,t,n){let r=k.isArray(t)?t:t==null?[]:[t];if(!r.length)throw Error(`Search param '${e}' is required but was not provided.`);return r.map((t,r)=>{let a=String(t);if(!a)throw Error(`Search param '${e}' value at index ${r} is empty: '${i(a)}'`);if(!n.some(e=>e.test(a)))throw Error(`Search param '${e}' value at index ${r} does not match any RegExp requirement: '${i(a)}'`);return a})}function jl(e){return e==null?e:k.isArray(e)?g(e,e=>String(e),k.isDefined):i(e)}function Ml(e){if(e!=null){if(k.isArray(e)){let t=e.filter(k.isDefined).map(e=>String(e));return t.length?t:void 0}return i(e)}}var Nl;(function(e){e[e.Connecting=0]=`Connecting`,e[e.Open=1]=`Open`,e[e.Closing=2]=`Closing`,e[e.Closed=3]=`Closed`})(Nl||={});var Pl;(function(e){e.OnHost=`on-host`,e.OnClient=`on-client`})(Pl||={});async function Fl(e,t,n){let r=zl(e,t,Pl.OnClient);return n?.open&&r.addEventListener(`open`,n.open),n?.error&&r.addEventListener(`error`,n.error),n?.message&&r.addEventListener(`message`,n.message),n?.close&&r.addEventListener(`close`,n.close),await Ll(t),r}function Il(e){return k.isObject(e)?(delete e.webSocket,k.hasKey(e,`webSocketDefinition`)&&k.hasKey(e.webSocketDefinition,`path`)&&(e.path=e.webSocketDefinition.path),delete e.webSocketDefinition,e):e}async function Ll(e){let t=new ne;function n(e){t.isSettled||t.reject(S(Il(e),`WebSocket connection failed.`))}e.addEventListener(`error`,n),Ze.isTruthy(()=>t.isSettled?!0:e.readyState===Nl.Closed?(t.reject(`WebSocket closed while waiting for it to open.`),!0):e.readyState===Nl.Open&&(t.resolve(),!0),void 0,`WebSocket never opened`).catch(e=>{t.isSettled||t.reject(Il(e))}),await t.promise.finally(()=>{e.removeEventListener(`error`,n)})}function Rl(e){return e===Pl.OnClient?Pl.OnHost:Pl.OnClient}function zl(e,t,n){let r=t.send,i=t.close,a=t.addEventListener,o=t.removeEventListener,s=t,c=new ne;s.addEventListener(`close`,()=>{rn(()=>{c.resolve()})});let l={};return Object.assign(s,{originalListenerMap:l,async close(){i.call(s),s.readyState===Nl.Closed&&c.resolve(),await c.promise},addEventListener(t,r){function i(i){let a={event:i,webSocket:s,webSocketDefinition:e};if(t===`message`){let t=Bl(e,dl(String(i.data)),Rl(n));return r({...a,message:t})}return r(a)}return Ce(l,t,()=>new WeakMap).set(r,i),a.call(s,t,i)},removeEventListener(e,t){let n=l[e]?.get(t);n&&(l[e]?.delete(t),o.call(s,e,n))},async sendAndWaitForReply({message:t,timeout:n={seconds:10},replyCheck:r}={}){let i=new ne;async function a({message:e}){i.isSettled||(!r||await ve(()=>r(e))===!0)&&i.resolve(e)}let o=setTimeout(()=>{i.isSettled||i.reject(`WebSocket '${e.path}' message timeout: got no reply.`)},$e(n,{milliseconds:!0}).milliseconds);s.addEventListener(`message`,a),s.send(t);try{return await i.promise}finally{clearTimeout(o),s.removeEventListener(`message`,a)}},send(t){r.call(s,String(JSON.stringify(Bl(e,t,n))))}}),s}function Bl(e,t,n){let r=n===Pl.OnClient?e.clientMessage:e.hostMessage;if(r)s(t,r,{allowExtraKeys:!0});else if(t!==void 0)throw TypeError(`WebSocket '${e.path}' does not expect any message data from the ${n===Pl.OnClient?`client`:`host`} but received it: ${i(t)}.`);return t}function Vl(e,t){return k.isArray(t)?t.some(t=>Vl(e,t)):t instanceof RegExp?t.test(e):C(t)?re(e,t,{allowExtraKeys:!0}):!1}function Hl(e,t){if(!e||!e.length)return;let n=e.join(`, `),r=t.connectProtocol;r&&e.forEach(e=>{if(!Vl(e,r))throw Error(`WebSocket protocol '${e}' failed protocol requirement in WebSocket '${t.path}'.`)});try{ul(n)}catch(e){throw S(e,`Invalid protocols given to WebSocket '${t.path}': [${n}]`)}}var Ul=class{api;baseUrl;fetchOverride;webSocketConstructor;constructor(e,t,n,r){this.api=e,this.baseUrl=t,this.fetchOverride=n,this.webSocketConstructor=r}fetch(e){return b(e.requests,t=>({key:t,value:async(...n)=>await this.runEndpointRequest(e,t,n[0])}))}async fetchStream(e,t,...n){return await this.runEndpointRequest(e,t,n[0],({response:t})=>{if(!t.body)throw Error(`Endpoint '${e.path}' returned an ok response with no body to stream.`);return t.body})}async runEndpointRequest(e,t,n,r){if(!k.hasKey(this.api.endpoints,e.path))throw Error(`Cannot fetch: this api has no '${e.path}' endpoint.`);let{requestInit:i,url:a}=this.buildEndpointRequestInit(e,t,n);return await vl({endpoint:e,method:t,response:await(n?.fetchOverride||this.fetchOverride||fetch)(a,i,e),includeResponse:!0,handleDeclaredResponseStatusOverride:r,shouldCondenseResponse:!1})}buildEndpointUrl(e,t,n){let r=n,i=ol(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=El(i.searchParams,r.searchParams),o=cl(e,{pathParams:r.pathParams});return Mr(this.baseUrl,{search:a,pathname:o},{encoding:mr.Encode}).href}buildEndpointRequestInit(e,t,n){let r=n,i=ol(e,t);if(!i)throw Error(`Method '${t}' does not exist on endpoint '${e.path}'.`);let a=Tl(e.path,i.requiredRequestHeaders,r?.requiredHeaders),o=!!r&&`requestData`in r&&r.requestData!==void 0,s={...b(r?.options?.headers instanceof Headers?Oe(Array.from(r.options.headers.entries())):k.isArray(r?.options?.headers)?Oe(r.options.headers):r?.options?.headers||{},(e,t)=>({key:e.toLowerCase(),value:t})),...a};s[`content-type`]||r?.requestData instanceof FormData||r?.skipAutomaticContentTypeHeader||o&&(s[`content-type`]=`application/json`);let c=!!s[`content-type`]?.match(/\bjson\b/i);return{url:this.buildEndpointUrl(e,t,r||{}),requestInit:{...r?.options,headers:s,method:t,...o?c?{body:JSON.stringify(r.requestData)}:{body:r.requestData}:{}}}}async connectWebSocket(e,...t){let n=t[0];Hl(n?.protocols,e);let r=this.buildWebSocketUrl(e,n);return await Fl(e,new((n?.webSocketConstructor)||this.webSocketConstructor||Wl)(r,n?.protocols,e),n?.listeners)}buildWebSocketUrl(e,t){let n=t,r=e,i=El(r.searchParams,n?.searchParams),a=cl(r,{pathParams:n?.pathParams}),o=Mr(this.baseUrl,{search:i,pathname:a},{encoding:mr.Encode}).href;return Mr(o,{protocol:o.startsWith(`https`)?`wss`:`ws`}).href}},Wl=function(...[e,t]){return new globalThis.WebSocket(e,t)},Gl={room:`r_`,client:`c_`,socketMessage:`sm_`},Kl=me(Gl,(e,t)=>()=>`${t}${gn()}`),ql=me(Gl,e=>Sn({checkValue(t){return k.isString(t)&&t.startsWith(Gl[e])},default:``,name:`${e} multiplayer id shape`})),R;(function(e){e.Offer=`offer`,e.Answer=`answer`,e.OfferResult=`offer-result`,e.HostPing=`host-ping`,e.Error=`error`})(R||={});var Jl=t({type:Cn(R.Answer),sdp:``}),Yl=t({type:Cn(R.Offer),sdp:``}),Xl=t({clientId:ql.client(),roomId:ql.room(),roomName:``}),Zl=t({messageId:ql.socketMessage()}),Ql=t(En(Xl,Zl,{type:Cn(R.Answer),data:N({rejected:Cn(!0)},Jl)})),$l=t(En(Xl,Zl,{type:Cn(R.HostPing),clientSecret:``,clientCount:-1,roomPassword:``})),eu=t(En(Xl,Zl,{type:Cn(R.Offer),data:Yl})),tu=t(En(eu,Zl,{clientSecret:``,roomPassword:``})),nu=t(En(Zl,{type:Cn(R.OfferResult),hostClientId:ql.client()})),ru=t(En(Zl,{type:Cn(R.Error),errorMessage:``})),iu=t({roomName:``,roomId:ql.room(),clientCount:-1,hasRoomPassword:!1}),au=t(An({keys:ql.room(),values:iu,partial:!0})),ou=Mr(`http://localhost`,{port:9348}).origin,su=al({path:`/`,requests:{[Qt.Get]:{responses:{[ae.Ok]:{responseData:Cn(`ok`)}}}}}),cu=al({path:`/health`,requests:{[Qt.Get]:{responses:{[ae.Ok]:{responseData:Cn(`ok`)}}}}}),lu=al({path:`/rooms`,requests:{[Qt.Get]:{responses:{[ae.Ok]:{responseData:au}},searchParams:{gameId:In(``)}}}}),uu=sl({path:`/connect`,clientMessage:N(Ql,tu,$l),hostMessage:N(Ql,eu,nu,ru),searchParams:{gameId:In(``)}}),du=rl({apiName:`multiplayer-api`,endpoints:[su,cu,lu],webSockets:[uu]});async function fu({backendOrigin:e,portScanOptions:t,timeout:n}){let r=e||ou,i=k.isBoolean(t)?void 0:t,a=$c(n);return new Ul(du,(t?await hl(du,{startOrigin:r,timeout:n,...i,fetchOverride(e,t,n){let r={...t,signal:a??null};return i?.fetchOverride?i.fetchOverride(e,r,n):globalThis.fetch(e,r)}}):void 0)?.origin||r)}function pu(e){return{type:e.type,sdp:e.sdp}}var mu=class extends m()(`webrtc-message`){},hu=class extends m()(`webrtc-connect`){};function gu(e){return e.map(e=>({urls:qe({value:e,prefix:`stun:`})}))}var _u=class extends Ye{clientId;dataChannel;connection;isConnected=!1;constructor(e){super(),this.clientId=e}async createOffer(e){let t=this.createConnection(e);Te.isDefined(this.connection),this.handleDataChannel(this.connection.createDataChannel(`chat`)),await this.connection.setLocalDescription(await this.connection.createOffer()),await t;let n=pu(D.isDefined(this.connection.localDescription));return s(n,Yl),n}async acceptAnswer(e){let t=k.isString(e)?JSON.parse(e):e;Te.isDefined(this.connection),s(t,Jl),await this.connection.setRemoteDescription(t)}async createAnswer(e,t){let n=k.isString(e)?JSON.parse(e):e,r=this.createConnection(t);Te.isDefined(this.connection),this.connection.addEventListener(`datachannel`,e=>{this.handleDataChannel(e.channel)}),await this.connection.setRemoteDescription(n),await this.connection.setLocalDescription(await this.connection.createAnswer()),t.length&&await r;let i=pu(D.isDefined(this.connection.localDescription));return s(i,Jl),i}sendMessage(e){Te.isTrue(this.isConnected,`There is no WebRTC connection to send a message to from ${this.clientId}.`),Te.isDefined(this.dataChannel,`There is no WebRTC connection to send a message to from ${this.clientId}.`),this.dataChannel.send(JSON.stringify(e))}destroy(){this.dataChannel?.close(),this.connection?.close(),super.destroy()}handleDataChannel(e){this.dataChannel?.close(),this.dataChannel=e,this.dataChannel.addEventListener(`open`,()=>{h(this).isConnected=!0,this.dispatch(new hu({detail:!0}))}),this.dataChannel.addEventListener(`closing`,()=>{h(this).isConnected=!1,this.dispatch(new hu({detail:!1}))}),this.dataChannel.addEventListener(`message`,e=>{let t=ve(()=>k.isString(e.data)?JSON.parse(e.data):e.data,{fallbackValue:e.data});this.dispatch(new mu({detail:t}))})}createConnection(e){if(this.connection)throw Error(`Connection already created!`);let t=new ne,n=e=>{e.candidate||(Te.isDefined(this.connection),t.resolve(),this.connection.removeEventListener(`icecandidate`,n))};return this.connection=new RTCPeerConnection({iceServers:gu(e)}),this.connection.addEventListener(`icecandidate`,n),t.promise}},vu=class extends m()(`webrtc-multiplayer-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},yu=class extends m()(`webrtc-multiplayer-connection-update`){};function bu(e={}){return p({roomId:Kl.room(),roomName:``,roomPassword:``},e)}var xu=class e extends Ye{gameId;multiplayerApiClient;stunServerUrls;multiplayerRoom;clientId;shouldAllowConnectionCheck;hostClientId;connections={};webSocket;clientSecret=nn(32);isDestroyed=!1;hostPingTimeoutId;reconnectPromise;isCleaningUpConnection=!1;constructor(e,t,n,r,i=Kl.client(),a=()=>!0){super(),this.gameId=e,this.multiplayerApiClient=t,this.stunServerUrls=n,this.multiplayerRoom=r,this.clientId=i,this.shouldAllowConnectionCheck=a}isHost(){return this.hostClientId===this.clientId}getConnectedClientIds(){return g(Pe(this.connections),e=>e.clientId,(e,t)=>t.isConnected)}getAllClientIds(){let e=this.getConnectedClientIds(),t=this.isHost()?[...e,this.clientId]:this.hostClientId&&this.isConnected()?[...e,this.clientId,this.hostClientId]:e;return he(t)}isConnected(){return this.isHost()||!!this.getConnectedClientIds().length}destroy(){h(this).isDestroyed=!0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,Object.values(this.connections).forEach(e=>e.destroy()),this.webSocket?.close(),this.connectionQueue.destroy(),super.destroy()}sendMessage(e){Object.values(this.connections).forEach(t=>{if(t.isConnected)try{t.sendMessage(e)}catch(e){T.error(ce(e))}})}sendToOnlyOneClient(e,t){if(!this.isHost()){T.error(Error(`Cannot send to an individual client as not a host.`));return}let n=this.connections[e];if(!n||!n.isConnected){T.error(Error(`Cannot send to missing or disconnected client ('${e}')`));return}n.sendMessage(t)}async initConnection({abortSignal:e}={}){if(Object.values(this.connections).length)return!1;try{let t=await el(this.createNewConnection(this.clientId).createOffer(this.stunServerUrls),e),n=await el((await this.setupWebSocket(e)).sendAndWaitForReply({message:{messageId:Kl.socketMessage(),type:R.Offer,clientId:this.clientId,clientSecret:this.clientSecret,data:t,...this.multiplayerRoom},replyCheck(e){return e.type===R.OfferResult}}),e);return Te.strictEquals(n.type,R.OfferResult),await el(Ze.isDefined(()=>this.hostClientId),e),this.sendHostPing(),!0}catch(e){this.isCleaningUpConnection=!0;try{this.connections[this.clientId]?.destroy(),delete this.connections[this.clientId],globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0,await this.webSocket?.close(),this.webSocket=void 0}finally{this.isCleaningUpConnection=!1}throw e}}sendHostPing(){this.isHost()&&this.webSocket&&(this.webSocket.send({messageId:Kl.socketMessage(),type:R.HostPing,clientCount:this.getAllClientIds().length,clientId:this.clientId,clientSecret:this.clientSecret,...this.multiplayerRoom}),this.hostPingTimeoutId=setTimeout(()=>this.sendHostPing(),1e3))}reconnectAfterHostLoss(){this.isDestroyed||this.reconnectPromise||this.isCleaningUpConnection||(this.reconnectPromise=an(3,()=>this.initConnection(),{interval:{seconds:1}}).then(()=>void 0).catch(e=>{T.warning(S(e,`Failed to reconnect to the multiplayer room.`))}).finally(()=>{this.reconnectPromise=void 0}))}connectionQueue=new xn;async setupWebSocket(t){if(this.webSocket&&(this.webSocket.readyState===WebSocket.OPEN||this.webSocket.readyState===WebSocket.CONNECTING))return this.webSocket;let n=this.multiplayerApiClient.connectWebSocket(uu,{searchParams:{gameId:[this.gameId]},listeners:{message:async({message:t,webSocket:n})=>{try{if(t.type===R.Offer){if(!this.isHost())throw Error(`Non-host multiplayer client received a WebRTC offer.`);let e={messageId:t.messageId,type:R.Answer,roomId:t.roomId,roomName:t.roomName,clientId:t.clientId};await this.connectionQueue.add(async()=>{if(!this.shouldAllowConnectionCheck({connectingClientId:t.clientId,multiplayerController:this})){T.warning(`offer rejected`),n.send({...e,data:{rejected:!0}});return}T.faint(`received offer`);let r=this.createNewConnection(t.clientId),i=await r.createAnswer(t.data,this.stunServerUrls);n.send({...e,data:i}),await Ze.isTrue(()=>r.isConnected)})}else if(t.type===R.Answer){if(this.isHost())throw Error(`Host multiplayer client received a WebRTC answer.`);let e=this.connections[this.clientId];if(`rejected`in t.data)T.warning(`offer was rejected`),this.destroy();else{if(T.faint(`received answer`),!e)throw Error(`Cannot accept answer, no init connection found.`);await e.acceptAnswer(t.data),await n.close()}}else if(t.type===R.OfferResult){if(t.hostClientId!==this.hostClientId){if(h(this).hostClientId=t.hostClientId,this.isHost()){let e=this.connections[this.clientId];delete this.connections[this.clientId],e?.destroy()}this.dispatch(new yu({detail:{newHost:t.hostClientId}}))}}else if(t.type===R.Error)throw Error(t.errorMessage);else throw Error(`Unexpected ${e.name} WebSocket message type: ${t.type}`)}catch(e){T.error(S(e,`WebSocket message failed: ${i(t)}`))}},error(e){T.error(e)},close:()=>{this.webSocket=void 0,globalThis.clearTimeout(this.hostPingTimeoutId),this.hostPingTimeoutId=void 0}}});try{let e=await el(n,t);return this.webSocket=e,e}catch(e){throw n.then(e=>e.close(),()=>{}),e}}createNewConnection(e){let t=new _u(e);return this.connections[e]=t,t.listen(hu,n=>{n.detail?e!==this.clientId&&this.dispatch(new yu({detail:{newMember:e}})):(t.destroy(),delete this.connections[e],this.isHost()?this.dispatch(new yu({detail:{lostMember:e}})):(this.dispatch(new yu({detail:{lostHost:e}})),this.reconnectAfterHostLoss()))}),t.listen(mu,t=>{let n=e===this.clientId?this.hostClientId:e;n&&this.dispatch(new vu(n,t.detail))}),t}},Su;(function(e){e.Connecting=`connecting`,e.Connected=`connected`,e.Disconnected=`disconnected`})(Su||={});var Cu={room:Su.Disconnected,api:Su.Disconnected},wu=class extends m()(`multiplayer-controller-message`){sourceClientId;constructor(e,t){super({detail:t}),this.sourceClientId=e}},Tu=class extends m()(`multiplayer-controller-room-list`){},Eu=class extends m()(`multiplayer-controller-client-status`){},Du=class extends m()(`multiplayer-controller-connection`){},Ou=class e extends Ye{params;static events={MultiplayerControllerMessageEvent:wu,MultiplayerControllerRoomListEvent:Tu,MultiplayerControllerClientStatusEvent:Eu,MultiplayerControllerConnectionEvent:Du};events=e.events;static knownErrors={RoomRejectionError:tl};knownErrors=e.knownErrors;isListeningToRoomUpdates=!1;roomId;apiConnectionState=Su.Disconnected;roomConnectionState=Su.Disconnected;currentConnection;rejectedRoomIds=new Set;multiplayerApiClient;roomUpdateIntervalId;multiplayerParams;getClientId(){return this.currentConnection?.clientId}getConnectedClientIds(){return this.currentConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.currentConnection?.getAllClientIds()||[]}constructor(e){super(),this.params=e}async initMultiplayer(e){if(this.currentConnection)throw Error(`Cannot start multiplayer mode again when a multiplayer connection already present.`);this.multiplayerParams=e,this.updateConnectionState({api:Su.Connecting});let t=$c(e.timeout);try{let n=e.multiplayerApiClient||await fu({portScanOptions:e.portScanOptions,backendOrigin:e.backendOrigin,timeout:e.timeout});if(!(await n.fetch(cu).GET({options:{signal:t??null}})).Ok)throw Error(`Failed to find multiplayer API at ${n.baseUrl}.`);this.multiplayerApiClient=n,this.updateConnectionState({api:Su.Connected})}catch(e){throw this.updateConnectionState({api:v(e)}),e}}startRoomUpdates(e){if(this.isListeningToRoomUpdates=!0,this.startRoomInterval(),e)return this.listen(Tu,async t=>{await e(t.detail)})}stopRoomUpdates(){this.isListeningToRoomUpdates=!1,this.stopRoomInterval()}sendMessage(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot send message: not connected to a room.`);this.currentConnection.sendMessage(e)}isHost(){return this.currentConnection?.isHost()||!1}isConnected(){return this.currentConnection?.isConnected()||!1}destroy(){super.destroy(),this.updateConnectionState({room:Su.Disconnected,api:Su.Disconnected}),this.currentConnection?.destroy(),this.stopRoomUpdates()}async joinOrCreateRoom(e,{timeout:t}={}){if(!this.multiplayerApiClient||!this.multiplayerParams)throw Error(`Cannot join room. Please start this controller in multiplayer mode to join rooms.`);if(this.rejectedRoomIds.has(e.roomId))throw new tl(e);let n=this.currentConnection,r=this.roomId,i=$c(t);this.updateConnectionState({room:Su.Connecting});let a=new xu(this.params.gameId,this.multiplayerApiClient,this.multiplayerParams.stunServerUrls||[],e,this.params.clientId,this.params.acceptConnection?e=>this.params.acceptConnection?.(e.connectingClientId,this)??!0:void 0);a.listen(vu,e=>{this.dispatch(new wu(e.sourceClientId,e.detail))}),a.listen(yu,e=>{this.dispatch(new Eu({detail:e.detail}))});try{if(await a.initConnection({abortSignal:i}),(await el(Ze.isDefined(()=>{let e=a.isConnected(),t=a.isDestroyed;return!e&&!t?void 0:{connected:e,destroyed:t}}),i)).connected)await el(Promise.resolve(this.params.prepareConnection?.(a)),i),this.currentConnection=a,n?.destroy(),h(this).roomId=e.roomId,this.stopRoomUpdates(),this.updateConnectionState({room:Su.Connected});else throw this.rejectedRoomIds.add(e.roomId),new tl(e)}catch(e){throw a.destroy(),n?(this.currentConnection=n,h(this).roomId=r,this.updateConnectionState({room:Su.Connected})):(this.currentConnection=void 0,this.updateConnectionState({room:v(e)})),e}}leaveRoom(){this.currentConnection&&(h(this).roomId=void 0,this.currentConnection.destroy(),this.currentConnection=void 0,this.updateConnectionState({room:Su.Disconnected}))}updateConnectionState(e){e.api&&(h(this).apiConnectionState=e.api),e.room&&(h(this).roomConnectionState=e.room),this.dispatch(new Du({detail:{room:this.roomConnectionState,api:this.apiConnectionState}}))}stopRoomInterval(){globalThis.clearInterval(this.roomUpdateIntervalId),this.roomUpdateIntervalId=void 0}startRoomInterval(){if(this.stopRoomInterval(),this.isListeningToRoomUpdates&&this.multiplayerApiClient){let e=this.multiplayerParams?.roomUpdateInterval?$e(this.multiplayerParams.roomUpdateInterval,{milliseconds:!0}).milliseconds:1e4;this.roomUpdateIntervalId=globalThis.setInterval(async()=>{if(!this.isListeningToRoomUpdates||!this.multiplayerApiClient)return;let e=await this.multiplayerApiClient.fetch(lu).GET({searchParams:{gameId:[this.params.gameId]}});e.Ok&&this.dispatch(new Tu({detail:e.Ok.responseData}))},e)}}},ku=class e extends Ye{static knownErrors={RoomRejectionError:tl};knownErrors=e.knownErrors;debugMultiplayer;roomController;localClientId=Kl.client();roomConnection;singleplayer=!1;constructor(e){super(),this.debugMultiplayer=!!e.debugMultiplayer,this.debugLog(`constructing controller for game '${e.gameId}'`),this.roomController=new Ou({gameId:e.gameId,clientId:this.localClientId,prepareConnection:async e=>{await this.prepareRoomConnection?.(e)},acceptConnection:e=>(this.debugLog(`checking incoming connection from ${e}`),this.shouldAcceptConnection(e))}),this.listenToRoomController()}get currentConnection(){return this.isConnected()?this:void 0}get clientId(){return this.roomConnection?.clientId||this.localClientId}get roomId(){return this.roomController.roomId}get apiConnectionState(){return this.roomController.apiConnectionState}get roomConnectionState(){return this.roomController.roomConnectionState}get multiplayerApiClient(){return this.roomController.multiplayerApiClient}startRoomUpdates(e){return this.roomController.startRoomUpdates(e)}stopRoomUpdates(){this.roomController.stopRoomUpdates()}getClientId(){return this.singleplayer?this.localClientId:this.roomConnection?.clientId||this.roomController.getClientId()}getConnectedClientIds(){return this.roomConnection?.getConnectedClientIds()||[]}getAllClientIds(){return this.singleplayer?[this.localClientId]:this.roomConnection?.getAllClientIds()||[]}async initMultiplayer(e){this.debugLog(`initializing multiplayer with backend ${e.backendOrigin}`),await this.roomController.initMultiplayer(e),this.debugLog(`multiplayer API initialized`)}isHost(){return this.singleplayer||this.roomConnection?.isHost()||!1}isConnected(){return this.singleplayer||this.roomConnection?.isConnected()||!1}leaveRoom(){if(!this.currentConnection){this.debugLog(`leaveRoom called without a current connection`);return}this.debugLog(`leaving room '${this.roomId||`unknown`}'`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.leaveRoom()}destroy(){this.debugLog(`destroying controller`),this.roomConnection=void 0,this.singleplayer=!1,this.roomController.destroy(),super.destroy()}listenToRoomController(){this.roomController.listen(Tu,e=>{this.dispatch(e)}),this.roomController.listen(Du,e=>{this.debugLog(`connection event received: api=${String(e.detail.api)} room=${String(e.detail.room)}`),this.dispatch(e)}),this.roomController.listen(Eu,e=>{this.debugLog(`client event received: ${JSON.stringify(e.detail)}`),this.handleClientStatus?.(e.detail),this.dispatch(e)}),this.roomController.listen(wu,e=>{this.debugLog(`message event received from ${e.sourceClientId}`),this.handleReceivedMessage(e.sourceClientId,e.detail)})}debugLog(e){T.if(this.debugMultiplayer).faint(`[multiplayer] ${e}`)}},Au={prodBackendOrigin:`https://backend.mp.electrovir.com`,gameId:`colcannon-fodder`,prodOrigin:`https://bdemann.github.io`,devBackendPort:9348,stunServerUrls:[`stun.cloudflare.com:3478`],connectionTimeoutSeconds:30,roomListTimeoutSeconds:8,roomUpdateIntervalSeconds:1,maxNameLength:24},z={bark:`#2b1a12`,walnut:`#4d2f1f`,oak:`#7a4a2b`,caramel:`#a8693a`,toffee:`#cf9456`,sand:`#ecc88a`,wheat:`#f2dca6`,cream:`#fff3da`,moss:`#5d6b2a`,grass:`#7f9040`,meadow:`#a3b254`,tomato:`#b8472f`,pumpkin:`#e07b3f`,butter:`#efc04a`,sage:`#8f9f98`,pond:`#5f7b7a`,stone:`#cfc6b0`,slate:`#6e655b`,pine:`#3f5a52`,sky:`#7fa6b0`},ju={beltStripe:`#e6dfcb`,grassDark:`#6f8035`},Mu={outlineWidth:2.6,shadow:{blur:7,offsetY:4,alpha:.4},highlight:.26,shade:.2,shine:.4,squash:.07,hop:.1,wobble:.07,fontFamily:`Georgia, "Times New Roman", serif`,fontWeight:`bold`};function B({x:e,y:t,rx:n,ry:r}){return i=>{i.ellipse(e,t,n,r)}}function V({x:e,y:t,width:n,height:r,radius:i}){return a=>{a.roundRect(e,t,n,r,i)}}function Nu(e){return t=>{t.poly(e.flatMap(([e,t])=>[e,t]))}}var Pu=new Wt({type:`linear`,start:{x:0,y:0},end:{x:.7,y:1},textureSpace:`local`,colorStops:[{offset:0,color:`rgba(255,255,255,${Mu.highlight})`},{offset:.45,color:`rgba(255,255,255,0)`},{offset:1,color:`rgba(60,30,10,${Mu.shade})`}]});function H(e,t){let{path:n,fill:r,outline:i=!0,highlight:a=!0,alpha:o=1,outlineScale:s=1}=t;return i&&(n(e),e.stroke({color:z.bark,width:2*Mu.outlineWidth*s,alpha:o,join:`round`,cap:`round`})),n(e),e.fill({color:r,alpha:o}),a&&(n(e),e.fill({fill:Pu,alpha:o})),e}function U(e,t){let{path:n,color:r,width:i,outline:a=!1,alpha:o=1}=t;return a&&(n(e),e.stroke({color:z.bark,width:i+2*Mu.outlineWidth*.6,alpha:o,join:`round`,cap:`round`})),n(e),e.stroke({color:r,width:i,alpha:o,join:`round`,cap:`round`}),e}var Fu=5;function Iu(e,t){let{width:n,height:r,offsetY:i,offsetX:a=0}=t,o=new M,s=Mu.shadow.alpha/Fu;for(let e=0;e<Fu;e++){let t=1.1-e/Fu*.6;o.ellipse(a,i,n/2*t,r/2*t).fill({color:z.bark,alpha:s})}return e.addChildAt(o,0),o}function Lu(e,t){let n=e/1e3;return(.6*Math.sin(n*2.2+t*1.7)+.4*Math.sin(n*3.7+t*2.9))*Mu.wobble}function Ru(e){let t=e-Math.floor(e),n=1-Mu.squash*Math.sin(t*Math.PI);return{scaleX:1/n,scaleY:n}}var zu=[z.tomato,z.sky,z.butter,z.pine];function Bu(e){return zu[e%zu.length]??z.tomato}function Vu(e,t){return t>=e.minPlayers&&t<=e.maxPlayers}function Hu(e){return e.waypoints.slice(1).map((t,n)=>({start:D.isDefined(e.waypoints[n]),end:t}))}function Uu(e){let t=0;for(let{start:n,end:r}of Hu(e))t+=Math.hypot(r.x-n.x,r.y-n.y);return t}function Wu(e,t){let n=Math.max(0,t);for(let{start:t,end:r}of Hu(e)){let e=Math.hypot(r.x-t.x,r.y-t.y);if(n<=e){let i=e?n/e:0;return{x:t.x+(r.x-t.x)*i,y:t.y+(r.y-t.y)*i}}n-=e}let r=D.isDefined(e.waypoints.at(-1));return{x:r.x,y:r.y}}function Gu({path:e,distancePx:t,offsetPx:n}){let r=Wu(e,t),i=Ku(e,t);return{x:r.x+i.y*n,y:r.y-i.x*n}}function Ku(e,t){let n=Hu(e).filter(({start:e,end:t})=>e.x!==t.x||e.y!==t.y),r=Math.max(0,t),i=n[0];for(let e of n){i=e;let t=Math.hypot(e.end.x-e.start.x,e.end.y-e.start.y);if(r<=t)break;r-=t}if(!i)return{x:1,y:0};let a=Math.hypot(i.end.x-i.start.x,i.end.y-i.start.y);return{x:(i.end.x-i.start.x)/a,y:(i.end.y-i.start.y)/a}}function qu(e,t){return Ju(e,t).distance}function Ju(e,t){let n=1/0,r=0,i=0;for(let{start:a,end:o}of Hu(e)){let e=o.x-a.x,s=o.y-a.y,c=e*e+s*s,l=c?Math.min(1,Math.max(0,((t.x-a.x)*e+(t.y-a.y)*s)/c)):0,u=a.x+e*l,d=a.y+s*l,f=Math.hypot(t.x-u,t.y-d);f<n&&(n=f,r=i+Math.sqrt(c)*l),i+=Math.sqrt(c)}return{distance:n,alongPx:r}}function Yu(e,t){let n=e.paths.find(e=>e.pathId===t);if(!n)throw Error(`No path '${t}' in level.`);return n}function Xu(e,t){if(e.spawnMode!==`pick-one`)return e.paths;let n=e.paths.map(e=>Math.max(0,e.spawnWeight??1)),r=t*n.reduce((e,t)=>e+t,0);for(let[t,i]of e.paths.entries())if(r-=n[t]??0,r<0)return[i];let i=e.paths.at(-1);return i?[i]:[]}var Zu=90,Qu=220;function $u({levelId:e,name:t,description:n,waypoints:r,restaurantCenter:i,chuteFractions:a=[]}){let o={...i,sizePx:Qu},s={pathId:`west`,ownerSlot:0,waypoints:[...r,{x:o.x-o.sizePx/2,y:o.y}],widthPx:Zu},c=Uu(s);return{levelId:e,name:t,description:n,paths:[a.length?{...s,chutes:a.map(e=>({distancePx:Math.round(c*e)}))}:s],restaurant:o,minPlayers:1,maxPlayers:1}}var ed=$u({levelId:`winding-way`,name:`Winding Way`,description:`The classic.`,waypoints:[{x:0,y:400},{x:420,y:400},{x:420,y:820},{x:700,y:820},{x:700,y:540}],restaurantCenter:{x:960,y:540}}),td=$u({levelId:`double-back`,name:`Double Back`,description:`Two long straights: Knife country.`,waypoints:[{x:0,y:380},{x:1450,y:380},{x:1450,y:620},{x:250,y:620},{x:250,y:780}],restaurantCenter:{x:1450,y:780},chuteFractions:[.55]}),nd=$u({levelId:`long-haul`,name:`The Long Haul`,description:`A big loop with a chute dropping potatoes mid-belt.`,waypoints:[{x:0,y:380},{x:1500,y:380},{x:1500,y:840},{x:150,y:840},{x:150,y:560}],restaurantCenter:{x:1260,y:560},chuteFractions:[.5]}),rd={levelId:`the-fork`,name:`The Fork`,description:`Potatoes split at the junction. Cover both roads.`,spawnMode:`pick-one`,paths:[{pathId:`north`,ownerSlot:0,waypoints:[{x:0,y:560},{x:500,y:560},{x:500,y:400},{x:1300,y:400},{x:1300,y:450}],widthPx:Zu},{pathId:`south`,ownerSlot:0,waypoints:[{x:0,y:560},{x:500,y:560},{x:500,y:760},{x:1300,y:760},{x:1300,y:670}],widthPx:Zu}],restaurant:{x:1300,y:560,sizePx:Qu},minPlayers:1,maxPlayers:1},id={x:960,y:540,sizePx:Qu},ad={west:{x:id.x-id.sizePx/2,y:id.y},east:{x:id.x+id.sizePx/2,y:id.y},north:{x:id.x,y:id.y-id.sizePx/2},south:{x:id.x,y:id.y+id.sizePx/2}};function od({levelId:e,name:t,description:n,pathSpecs:r,minPlayers:i,maxPlayers:a}){return{levelId:e,name:t,description:n,paths:r.map((e,t)=>{let n={pathId:e.pathId,ownerSlot:t,waypoints:[...e.waypoints,ad[e.pathId]],widthPx:Zu},r=Uu(n);return e.chuteFractions?.length?{...n,chutes:e.chuteFractions.map(e=>({distancePx:Math.round(r*e)}))}:n}),restaurant:id,minPlayers:i,maxPlayers:a}}var sd=[ed,td,nd,rd,od({levelId:`two-roads`,name:`Two Roads`,description:`Two players, one belt each, one hungry restaurant.`,minPlayers:2,maxPlayers:2,pathSpecs:[{pathId:`west`,waypoints:[{x:0,y:450},{x:500,y:450},{x:500,y:800},{x:720,y:800},{x:720,y:540}]},{pathId:`east`,waypoints:[{x:1920,y:450},{x:1420,y:450},{x:1420,y:800},{x:1200,y:800},{x:1200,y:540}]}]}),od({levelId:`crossroads`,name:`Crossroads`,description:`Three or four players, a belt from every side.`,minPlayers:3,maxPlayers:4,pathSpecs:[{pathId:`west`,waypoints:[{x:0,y:450},{x:330,y:450},{x:330,y:640},{x:640,y:640},{x:640,y:540}],chuteFractions:[.55]},{pathId:`east`,waypoints:[{x:1920,y:450},{x:1500,y:450},{x:1500,y:540}]},{pathId:`north`,waypoints:[{x:760,y:0},{x:760,y:220},{x:1180,y:220},{x:1180,y:350},{x:960,y:350}],chuteFractions:[.5]},{pathId:`south`,waypoints:[{x:150,y:1080},{x:150,y:835},{x:960,y:835}]}]})];function cd(e){return sd.filter(t=>Vu(t,e))}var ld=ed;function ud(e){return sd.find(t=>t.levelId===e)??ld}var dd=`colcannon-fodder-level`;function fd(){try{return ud(globalThis.localStorage.getItem(`colcannon-fodder-level`)??void 0).levelId}catch{return ld.levelId}}function pd(e){try{globalThis.localStorage.setItem(dd,e)}catch{}}var W=function(e){return e.Ready=`ready`,e.Playing=`playing`,e.Won=`won`,e.Lost=`lost`,e}({}),md=function(e){return e.Perfect=`perfect`,e.Incomplete=`incomplete`,e.Raw=`raw`,e}({});function hd(e){let t={0:0};for(let n of ud(e).paths)t[n.ownerSlot]=0;return t}function gd(e,t){return!e||t==null?0:e.slotByClientId[t]??0}function _d(e){return!!e&&Object.keys(e.slotByClientId).length>1}var vd=D.isDefined(hc.waves[0]);function yd(e=ld.levelId,t=`campaign`){return{levelId:e,mode:t,status:`playing`,paused:!1,pausedBySlot:void 0,speed:1,resetSpeedOnIncome:!1,speedAccumulator:0,satisfaction:pc.starting,coins:Oc.startingCoins+(ud(e).minPlayers-1)*kc.extraStartingCoinsPerPlayer,coinsEarned:0,coinEvents:[],nextCoinEventId:1,scoreBySlot:hd(e),perfectBySlot:{},slotByClientId:{},slotNames:{},connected:{},potatoesSpawned:0,potatoesServed:0,servingCounts:{perfect:0,incomplete:0,raw:0},lastServing:void 0,elapsedMs:0,potatoesPending:0,waveIndex:0,wavePhase:`break`,breakRemainingMs:hc.breakMs,spawnedInWave:0,beltSpeedPxPerMs:vd.speedPxPerMs,orders:[],nextOrderId:1,msUntilNextOrder:Ac.firstOrderDelayMs,lastOrderEvent:void 0,nextPotatoId:1,nextTowerId:1,potatoesStolen:0,seagullsSpawnedInWave:0,msUntilNextSeagull:0,lastSteal:void 0,prestigePoints:0,prestigeNotice:void 0,waveSpawnTotals:[],wavesPaid:0,lastBossSpawnAtMs:-1}}var bd=function(e){return e.Dev=`dev`,e.Prod=`prod`,e}({});function xd(e){return e===`bdemann.github.io`?`prod`:`dev`}var Sd=xd(globalThis.location.hostname),G=function(e){return e.StartRun=`start-run`,e.BeginRun=`begin-run`,e.PlaceTower=`place-tower`,e.UpgradeTower=`upgrade-tower`,e.SellTower=`sell-tower`,e.ServiceTower=`service-tower`,e.ApplyTopping=`apply-topping`,e.TogglePause=`toggle-pause`,e.SetSpeed=`set-speed`,e.ArmSpeedReset=`arm-speed-reset`,e.JoinRun=`join-run`,e.LeaveRun=`leave-run`,e}({});function K(e,t){if(!e.multiplayerP2pLockStep)throw Error(`Cannot send '${t.type}': lockstep mod is missing.`);e.multiplayerP2pLockStep.multiplayerController.act(t)}var Cd=[/^localhost$/,/^127\.0\.0\.1$/,/^\[::1\]$/,/^10\.\d+\.\d+\.\d+$/,/^192\.168\.\d+\.\d+$/,/^172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+$/,/^[^.]+\.local$/];function wd(e){if(e===Au.prodOrigin)return Au.gameId;try{let{hostname:t}=jr(e);return Cd.some(e=>e.test(t))?Au.gameId:void 0}catch{return}}var Td=function(e){return e.Menu=`menu`,e.Rooms=`rooms`,e.Playing=`playing`,e}({});function Ed(e,t){return e===bd.Dev?`http://${t}:${Au.devBackendPort}`:Au.prodBackendOrigin}function Dd(){return!!wd(globalThis.location.origin)&&!!Ed(Sd,globalThis.location.hostname)}function Od(e={enabled:Dd(),search:globalThis.location.search}){return{screen:!e.enabled||new URLSearchParams(e.search).has(`solo`)?`playing`:`menu`,rooms:void 0,busy:void 0,error:void 0,roomName:void 0}}function kd(e){if(!e.multiplayerP2pLockStep)throw Error(`Cannot manage multiplayer: the lockstep mod is missing.`);return e.multiplayerP2pLockStep.multiplayerController}function Ad(e){if(!e.ui)throw Error(`Cannot manage multiplayer: UI state is missing.`);return e.ui.session}function jd(e,t){return`${e} (${t instanceof Error?t.message:String(t)}). Check your connection and try again. Some networks, such as strict firewalls or mobile data, block direct connections between players.`}function Md(e){return e.screen===`rooms`}var Nd,Pd,Fd=!1;function Id(e){Nd?.(),Nd=void 0,clearTimeout(Pd),Pd=void 0,e.multiplayerP2pLockStep?.multiplayerController.stopRoomUpdates()}async function Ld(e){let t=kd(e);return t.multiplayerApiClient||await t.initMultiplayer({backendOrigin:Ed(Sd,globalThis.location.hostname),portScanOptions:!1,stunServerUrls:Au.stunServerUrls,roomUpdateInterval:{seconds:Au.roomUpdateIntervalSeconds},timeout:{seconds:Au.connectionTimeoutSeconds}}),t}function Rd(e){let t=kd(e),n=Ad(e);Id(e),t.isConnected()&&t.leaveRoom(),t.startSingleplayer(),n.screen=`playing`,n.error=void 0,n.busy=void 0,n.roomName=void 0,K(e,{type:G.StartRun,ready:!0,levelId:fd(),seed:nn()})}async function zd(e){let t=Ad(e);Fd=!1,t.screen=`rooms`,t.rooms=void 0,t.error=void 0,t.busy=void 0;try{let n=await Ld(e);if(!Md(t))return;Id(e),Nd=n.startRoomUpdates(e=>{Fd&&(Fd=!1,t.error=void 0),t.rooms=Object.values(e).filter(e=>!!e).map(({roomId:e,roomName:t,clientCount:n,hasRoomPassword:r})=>({roomId:e,roomName:t,clientCount:n,hasRoomPassword:r})).sort((e,t)=>e.roomName.localeCompare(t.roomName))}),Pd=setTimeout(()=>{t.screen===`rooms`&&!t.rooms&&(Fd=!0,t.error=jd(`The multiplayer server did not answer`,`timed out`))},Au.roomListTimeoutSeconds*1e3)}catch(e){Md(t)&&(t.error=jd(`Could not reach the multiplayer server`,e))}}function Bd(e){let t=Ad(e);Id(e),t.screen=`menu`,t.error=void 0,t.busy=void 0}function Vd(e){e.entityStore?.destroyAllEntities(),e.runState=yd(),e.ui&&(e.ui.selectedTowerType=void 0,e.ui.selectedTopping=void 0,e.ui.selectedTowerId=void 0)}async function Hd(e,t){let n=Ad(e);n.busy=`Joining ${t.roomName}...`,n.error=void 0;try{let n=await Ld(e);Id(e),await n.joinOrCreateRoom(t,{timeout:{seconds:Au.connectionTimeoutSeconds}})}catch(t){let r=e.multiplayerP2pLockStep?.multiplayerController;r?.isConnected()&&r.leaveRoom(),n.busy=void 0,n.error=jd(`Could not join the room`,t),await zd(e),n.error=jd(`Could not join the room`,t);return}let r=kd(e);n.busy=void 0,n.rooms=void 0,n.roomName=t.roomName,n.screen=`playing`,r.isHost()?(Vd(e),K(e,{type:G.StartRun,ready:!0,levelId:fd(),seed:nn()})):K(e,{type:G.JoinRun})}async function Ud(e,{name:t,password:n}){await Hd(e,bu({roomName:t.trim().slice(0,Au.maxNameLength)||`Mash Kitchen`,roomPassword:n}))}async function Wd(e,t,n){await Hd(e,{...t,roomPassword:n})}function Gd(e){let t=kd(e),n=Ad(e);Id(e),t.isConnected()&&t.leaveRoom(),Vd(e),n.roomName=void 0,n.busy=void 0,n.error=void 0,n.screen=`menu`}function Kd(e){e.ui&&e.ui.session.screen===`playing`&&e.ui.session.roomName&&(Gd(e),e.ui.session.error=`The host left, so the room has closed.`)}var qd={microwaveQualityPerSecond:40,microwaveDamagePerSecond:45,microwaveConeHalfAngleDeg:25,microwaveFlashMs:200,minOrderQuality:50,mashChampStars:3,maxStars:5,rubberyMaxAlpha:.6,rubberyStep:10},Jd={maxLevel:3,costMultiplierByLevel:{2:.75,3:1.25},damageByLevel:{1:1,2:1.4,3:1.9},rangeByLevel:{1:1,2:1.15,3:1.3},cooldownByLevel:{1:1,2:.85,3:.7},sellRefund:.5},Yd={perUse:{knife:.45,laser:.45,boiler:2.5,masher:2,"cricket-trap":12},perSecond:{microwave:1.8,swiper:1.1},wornEffectiveness:.5,serviceCostShare:.3,minServiceCost:5,maxWear:100,serviceVerb:{knife:`Sharpen`,laser:`Recalibrate`,boiler:`Refill`,masher:`Oil`,microwave:`Clean`,"cricket-trap":`Restock`,swiper:`Oil`}};function Xd(e){return e>=Yd.maxWear?Yd.wornEffectiveness:1}function Zd(e){return Math.max(Yd.minServiceCost,Math.round(Oc.towerCost[e]*Yd.serviceCostShare))}function Qd({wear:e,amount:t}){return Math.min(Yd.maxWear,e+t)}function $d(e){return Yd.perUse[e]??0}function ef(e){return Yd.perSecond[e]??0}function tf(e){return Yd.serviceVerb[e]}var q=function(e){return e.Knife=`knife`,e.Boiler=`boiler`,e.Masher=`masher`,e.Microwave=`microwave`,e.CricketTrap=`cricket-trap`,e.Swiper=`swiper`,e.Laser=`laser`,e}({}),J={knife:{towerType:`knife`,label:`Knife`,glyph:`K`,hotkey:`1`,color:`#8f9f98`,appliesEffect:`cut`,areaOfEffect:!1,behavior:`line`,...Sc.knife},boiler:{towerType:`boiler`,label:`Boiling Pot`,glyph:`B`,hotkey:`2`,color:`#5f7b7a`,appliesEffect:`cooked`,areaOfEffect:!0,behavior:`mash`,...Sc.boiler},masher:{towerType:`masher`,label:`Masher`,glyph:`M`,hotkey:`3`,color:`#e0a050`,appliesEffect:void 0,areaOfEffect:!1,behavior:`mash`,...Sc.masher},microwave:{towerType:`microwave`,label:`Microwave`,glyph:`µ`,hotkey:`4`,color:`#a8693a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`cone`,...Sc.microwave},"cricket-trap":{towerType:`cricket-trap`,label:`Cricket Trap`,glyph:`C`,hotkey:`5`,color:`#7a4a2b`,appliesEffect:void 0,areaOfEffect:!1,behavior:`gull-trap`,...Sc[`cricket-trap`]},swiper:{towerType:`swiper`,label:`Swiper`,glyph:`S`,hotkey:`6`,color:`#6f8b6a`,appliesEffect:void 0,areaOfEffect:!1,behavior:`swipe`,...Sc.swiper},laser:{towerType:`laser`,label:`Laser`,glyph:`L`,hotkey:`7`,color:`#c4584a`,appliesEffect:`cut`,areaOfEffect:!1,behavior:`line`,...Sc.laser}};function nf(e){return Math.min(Jd.maxLevel,Math.max(1,Math.round(e)))}function rf(e){return Jd.damageByLevel[nf(e)]}function af(e,t,n=0){let{damage:r,rangePx:i,cooldownMs:a}=J[e],o=nf(t),s=Xd(n),c=J[e].behavior===`gull-trap`?s:1;return{damage:Math.round(r*Jd.damageByLevel[o]*s),rangePx:Math.round(i*Jd.rangeByLevel[o]),cooldownMs:a*Jd.cooldownByLevel[o]/c}}function of(e,t){return Math.round(Oc.towerCost[e]*Jd.costMultiplierByLevel[t])}function sf(e,t){let n=Oc.towerCost[e];for(let r=2;r<=nf(t);r++)n+=of(e,r);return Math.round(n*Jd.sellRefund)}var cf=lc.laserColor,lf=Math.PI*2;function uf(e,t,n){return e+(t-e)*n}function df(e){return Math.max(0,Math.min(1,e))}function Y(e,t,n){return df((e-t)/(n-t))}function ff(e){return 1-(1-e)**3}function pf(e){return e*e*e}function mf(e){return 1+3.2*(e-1)**3+2.2*(e-1)**2}var hf=8;function gf(e,t,n,r){return B({x:e,y:t,rx:n,ry:r})}function _f(e,t,n){return gf(e,t,n,n)}function X(e,t,n,r,i){return V({x:e,y:t,width:n,height:r,radius:i})}function vf(...e){return Nu(e)}function Z(e,t,n,r={}){H(e,{path:n,fill:t,outline:!r.noOutline,highlight:!r.flat,outlineScale:r.outlineScale??1,alpha:r.alpha??1})}function yf(e,t,n,r,i={}){U(e,{color:t,width:n,outline:i.outline??!1,alpha:i.alpha??1,path(e){r.forEach(([t,n],r)=>{r===0?e.moveTo(t,n):e.lineTo(t,n)})}})}function bf(e,{x:t,y:n,rx:r,ry:i,rotation:a=0,strength:o=1}){xf(e,{x:t,y:n,rotation:a},()=>{e.ellipse(0,0,r,i).fill({color:`#ffffff`,alpha:Mu.shine*o})})}function xf(e,t,n){e.save(),e.translateTransform(t.x??0,t.y??0),e.rotateTransform(t.rotation??0),e.scaleTransform(t.scaleX??1,t.scaleY??1),n(),e.restore()}function Sf(e,t,n){if(!(n?.skipBase&&Mf(n.towerType))){for(let t=0;t<4;t++){let n=1.1-t*.12;e.ellipse(0,24,50*n,17*n).fill({color:z.bark,alpha:.09})}Z(e,t,gf(0,hf,46,34)),Z(e,`#ffffff`,gf(0,hf,38,27),{noOutline:!0,flat:!0,alpha:.16})}}function Cf(e,t){let{timeSec:n}=t,r=t.attack<0?-1:.5+t.attack*.5;Sf(e,z.sage,t);let i=r<0?0:Y(r,.55,.64)*(1-Y(r,.64,.9)),a;a=r<0?-.35+Math.sin(n*2)*.05:r<.55?-1.2+Math.sin(r*160)*.025:r<.62?uf(-1.2,.05,pf(Y(r,.55,.62))):uf(.05,-.35,mf(Y(r,.62,1))),xf(e,{y:22,scaleX:1+.06*i,scaleY:1-.1*i},()=>{xf(e,{y:-22},()=>{Z(e,z.toffee,X(-32,2,64,24,6)),Z(e,z.caramel,X(-32,18,64,8,4),{noOutline:!0,flat:!0,alpha:.5}),yf(e,z.caramel,1.5,[[-22,10],[-6,10]],{alpha:.5}),yf(e,z.caramel,1.5,[[6,13],[24,13]],{alpha:.5})})});let o=r<0?0:i*6;if(xf(e,{x:12},()=>{Z(e,z.toffee,gf(-o,0,8,7),{outlineScale:.7}),Z(e,z.toffee,gf(o,0,8,7),{outlineScale:.7})}),xf(e,{x:-26,y:6,rotation:a},()=>{Z(e,z.stone,vf([2,-9],[46,-9],[58,0],[46,8],[2,8])),yf(e,z.sage,2,[[6,5],[46,5]],{alpha:.7}),bf(e,{x:24,y:-5,rx:16,ry:2,strength:.9}),Z(e,z.caramel,X(-20,-6,24,11,4),{outlineScale:.8}),Z(e,z.butter,_f(-14,0,1.8),{noOutline:!0,flat:!0}),Z(e,z.butter,_f(-4,0,1.8),{noOutline:!0,flat:!0})}),i>0)for(let t of[-1,0,1])yf(e,z.cream,2.5,[[24+t*6,2],[30+t*14,-8+Math.abs(t)*3]],{alpha:i})}function wf(e,t){let{attack:n,timeSec:r}=t;Sf(e,z.pond,t),Z(e,z.sage,gf(0,24,32,11));for(let t=-2;t<=2;t++){let n=5+3*Math.sin(r*14+t*2.1);Z(e,t%2?z.butter:z.pumpkin,vf([t*9-4,26],[t*9,26-n-4],[t*9+4,26]),{outlineScale:.5})}let i=n<0?0:Y(n,.1,.9),a=n<0?0:Math.sin(Y(n,.12,.4)*Math.PI),o=n<0?1+Math.sin(r*3)*.012:1+.1*a-.05*Math.sin(Y(n,.4,.7)*Math.PI);xf(e,{y:24,scaleX:1/o*.5+.5,scaleY:o},()=>{xf(e,{y:-24},()=>{Z(e,z.stone,X(-26,-18,52,42,10)),bf(e,{x:-14,y:-4,rx:5,ry:14,strength:.8});for(let t of[-1,1])Z(e,z.sage,X(t>0?25:-35,-8,10,7,3),{outlineScale:.8});Z(e,z.sage,gf(0,-18,27,9));let t=n<0?0:Math.sin(Y(n,.1,.5)*Math.PI);Z(e,z.pond,gf(0,-18,22,6.5+4*t),{noOutline:!0});for(let t=0;t<4;t++){let n=(r*.7+t*.27)%1;Z(e,z.sky,_f((t-1.5)*8,-18-n*5,2+n*3),{outlineScale:.5,alpha:1-n**6})}})});for(let t=0;t<3;t++){let n=(r*.4+t/3)%1;Z(e,z.cream,_f(Math.sin(n*5+t)*6+(t-1)*9,-28-n*26,5+n*5),{noOutline:!0,flat:!0,alpha:(1-n)*.7})}if(n>=0&&i>0){e.circle(0,0,t.rangePx*(.3+.7*i)).stroke({color:z.sky,width:4*(1-i)+1.5,alpha:.9*(1-i)});for(let t=0;t<7;t++){let r=t/7*lf,i=Y(n,.12,.8),a=i*46,o=Math.sin(i*Math.PI)*26;Z(e,z.sky,_f(Math.cos(r)*a,-14+Math.sin(r)*a*.45-o,3.2-i),{outlineScale:.5,alpha:1-i*i})}}}function Tf(e,t){let{timeSec:n}=t,r=t.attack<0?-1:.5+t.attack*.5;Sf(e,`#e0a050`,t),Z(e,z.sage,gf(0,20,34,14)),Z(e,z.cream,gf(0,17,28,9.5),{noOutline:!0}),bf(e,{x:-8,y:15,rx:9,ry:2.5,strength:.8});let i;i=r<0?-10+Math.sin(n*2.4)*2:r<.6?-36+Math.sin(r*100)*.6:r<.68?uf(-36,0,pf(Y(r,.6,.68))):uf(0,-10,ff(Y(r,.68,1)));let a=r<0?0:Y(r,.68,.74)*(1-Y(r,.74,1)),o=r>=.6&&r<.68,s=1+.14*a-(o?.06:0),c=1-.16*a+(o?.14:0);if(xf(e,{y:18+i,scaleX:s,scaleY:c},()=>{Z(e,z.caramel,X(-3.5,-46,7,40,2.5),{outlineScale:.8}),Z(e,z.toffee,X(-14,-54,28,9,4.5),{outlineScale:.9}),Z(e,z.stone,X(-22,-8,44,10,4));for(let t=-2;t<=2;t++)Z(e,z.sage,_f(t*8,-3,1.8),{noOutline:!0,flat:!0})}),a>0){let t=Y(r,.68,1);e.ellipse(0,20,22+t*30,(22+t*30)*.38).stroke({color:z.cream,width:3,alpha:1-t});for(let n of[-1,1])Z(e,z.cream,_f(n*(14+t*26),12-Math.sin(t*Math.PI)*22,3.5),{outlineScale:.5,alpha:1-t})}}function Ef(e,t){let{timeSec:n}=t,r=t.attack>=0,i=r?1-Y(t.attack,.5,1):0;if(r){let r=Math.atan2(t.aimY,t.aimX),a=qd.microwaveConeHalfAngleDeg*Math.PI/180;e.moveTo(0,0).arc(0,0,t.rangePx,r-a,r+a).closePath().fill({color:z.pumpkin,alpha:.3*i});for(let o=0;o<3;o++){let s=(n*2+o/3)%1;e.arc(0,0,14+s*(t.rangePx-14),r-a*.8,r+a*.8).stroke({color:z.butter,width:3,alpha:(1-s)*i})}}Sf(e,z.caramel,t),xf(e,{x:-16+(r?Math.sin(n*70)*1.1:0)},()=>{Z(e,z.cream,X(-34,-20,68,42,7)),Z(e,z.pine,X(-28,-14,40,30,4),{outlineScale:.8});let t=r?.95:.4+.15*Math.sin(n*2.5);Z(e,z.butter,X(-26,-12,36,26,3),{noOutline:!0,flat:!0,alpha:t*.7}),Z(e,z.stone,gf(-8,10,14,4),{noOutline:!0,flat:!0});let i=n*(r?5:1.2);Z(e,z.toffee,gf(-8+Math.cos(i)*3,5,6,4.5),{noOutline:!0,flat:!0}),bf(e,{x:-22,y:-8,rx:6,ry:2,rotation:-.6,strength:.7}),Z(e,z.sage,X(15,-14,14,30,3),{outlineScale:.7});for(let t=0;t<3;t++)Z(e,t===0&&r?z.butter:z.stone,_f(22,-8+t*7,2.2),{outlineScale:.4});Z(e,z.sage,X(-30,22,10,4,2),{noOutline:!0}),Z(e,z.sage,X(20,22,10,4,2),{noOutline:!0})})}function Df(e,{timeSec:t,squash:n=1,tilt:r=0}){xf(e,{rotation:r,scaleX:1/n,scaleY:n},()=>{yf(e,z.pine,2.4,[[-3,2],[-9,-6],[-13,3]],{outline:!0}),yf(e,z.pine,1.2,[[7,-4],[12,-12+Math.sin(t*12)*2]]),yf(e,z.pine,1.2,[[8,-3],[15,-8+Math.sin(t*12+1)*2]]),Z(e,z.moss,gf(0,0,10,5.2),{outlineScale:.8}),Z(e,z.moss,_f(8,-1.5,4.2),{outlineScale:.8}),Z(e,`#ffffff`,_f(9.5,-2.5,1.5),{noOutline:!0,flat:!0}),Z(e,z.bark,_f(10,-2.5,.8),{noOutline:!0,flat:!0}),yf(e,z.pine,1.2,[[-2,-3],[3,-3]],{alpha:.7})})}function Of(e,t){let{attack:n,timeSec:r}=t;if(Sf(e,z.walnut,t),n<0)for(let t of[-1,1])U(e,{color:z.pine,width:1.6,path(e){e.moveTo(t*4,-4).quadraticCurveTo(t*10,-20,t*(14+Math.sin(r*5+t)*4),-24+Math.sin(r*4)*2)}});Z(e,z.toffee,X(-30,-2,60,30,5));for(let t of[6,14,22])yf(e,z.caramel,1.6,[[-28,t],[28,t]],{alpha:.55});Z(e,z.bark,X(-11,6,22,12,3),{outlineScale:.7,flat:!0}),xf(e,{x:-31,y:-2,rotation:-(.1+(n>=0?.55*Math.sin(n*Math.PI):Math.sin(r*1.5)*.04))},()=>{Z(e,z.caramel,X(0,-8,62,9,3),{outlineScale:.9})}),Z(e,z.meadow,B({x:20,y:-10,rx:7,ry:3.5}),{outlineScale:.6})}function kf(e,t){let{attack:n}=t;Sf(e,`#6f8b6a`,t);let r=t.rangePx,i=n<0?0:Math.sin(n*Math.PI);xf(e,{y:hf,rotation:t.swiperAngle},()=>{i>.05&&e.arc(0,0,r*.7,-1.5,0).stroke({color:z.cream,width:18,alpha:.5*i,cap:`round`}),Z(e,z.toffee,X(6,-6,18,12,4),{outlineScale:.9}),Z(e,z.toffee,X(20,-11,r-20,22,11)),yf(e,z.caramel,1.6,[[28,-3],[r-12,-3]],{alpha:.5}),yf(e,z.caramel,1.6,[[28,4],[r-12,4]],{alpha:.5}),bf(e,{x:r*.6,y:-6,rx:9,ry:2,strength:.7})}),xf(e,{y:hf},()=>{Z(e,z.stone,_f(0,0,11)),Z(e,z.sage,_f(0,0,4.2),{outlineScale:.5})})}function Af(e,t){let{timeSec:n,attack:r}=t;Sf(e,z.walnut,t);let i=t.aimX!==0||t.aimY!==0?Math.atan2(t.aimY,t.aimX):-.5,a=r<0?0:1-Y(r,.2,1),o=r<0?.35+Math.sin(n*3)*.15:.6+a*.4;if(Z(e,z.toffee,X(-26,2,52,22,6)),Z(e,z.caramel,X(-26,16,52,8,4),{noOutline:!0,flat:!0,alpha:.5}),Z(e,z.toffee,X(-6,-14,12,18,3)),xf(e,{y:-14,rotation:i},()=>{Z(e,z.butter,X(-8,-9,34,18,6)),Z(e,z.caramel,X(-12,-6,8,12,3),{outlineScale:.7}),Z(e,z.stone,_f(26,0,9),{outlineScale:.8}),Z(e,cf,_f(26,0,5.5),{noOutline:!0,flat:!0,alpha:o}),bf(e,{x:6,y:-5,rx:10,ry:2,strength:.8})}),a>0){let n=[[Math.cos(i)*26,-6+Math.sin(i)*26],[t.aimX,t.aimY+hf]];yf(e,cf,16,n,{alpha:.2*a}),yf(e,cf,8,n,{alpha:.45*a}),yf(e,`#ffffff`,3,n,{alpha:a})}}var jf={[q.Knife]:z.sage,[q.Boiler]:z.pond,[q.Masher]:`#e0a050`,[q.Microwave]:z.caramel,[q.CricketTrap]:z.walnut,[q.Swiper]:`#6f8b6a`,[q.Laser]:z.walnut};function Mf(e){return e!==q.Microwave}function Nf(e,t){e.clear(),e.save(),e.scaleTransform(bc.scale,bc.scale),e.translateTransform(0,-8),Sf(e,jf[t]),e.restore()}var Pf={[q.Knife]:Cf,[q.Boiler]:wf,[q.Masher]:Tf,[q.Microwave]:Ef,[q.CricketTrap]:Of,[q.Swiper]:kf,[q.Laser]:Af};function Ff(e,t){e.clear(),e.save(),e.scaleTransform(bc.scale,bc.scale),e.translateTransform(0,-8),If(e,t),e.restore()}function If(e,t){let n=bc.scale;Pf[t.towerType](e,{...t,rangePx:t.rangePx/n,aimX:t.aimX/n,aimY:t.aimY/n})}var Lf=100,Rf=2,zf=50,Bf=new Map,Vf=!1;function Hf(e){return Bf.get(e)}function Uf(){return Bf.size===Object.values(q).length}function Wf(e){if(!Vf){Vf=!0;for(let t of Object.values(q)){let n=new M;Ff(n,{towerType:t,attack:-1,timeSec:.3,aimX:0,aimY:0,rangePx:zf,swiperAngle:-.6}),e.extract.base64({target:n,frame:new ct(-50,-50,Lf,Lf),resolution:Rf}).then(e=>{Bf.set(t,e),n.destroy()}).catch(()=>{Vf=!1})}}}var{defineEntity:Gf,entityKeys:Kf,updateEntitiesMod:qf,defineLogicEntity:Jf}=Bs({disableEntityUpdate:!0}),Yf={varieties:{[L.Red]:{label:`Red`,hpMultiplier:.7,toughSkin:!1,dense:!1},[L.Russet]:{label:`Russet`,hpMultiplier:1,toughSkin:!1,dense:!1},[L.Yukon]:{label:`Yukon Gold`,hpMultiplier:1.3,toughSkin:!1,dense:!1},[L.ToughSkinned]:{label:`Tough-skinned`,hpMultiplier:1.2,toughSkin:!0,dense:!1},[L.Sweet]:{label:`Sweet potato`,hpMultiplier:1.5,toughSkin:!1,dense:!0},[L.Yam]:{label:`Yam`,hpMultiplier:2,toughSkin:!0,dense:!0}},toughSkinMultiplier:.4,denseMasherMultiplier:.5,eyesBladeMultiplier:.5},Xf=[`Tough skin: Cut it first.`,`Dense: soften it first.`,`Eyes: blades struggle.`];function Zf(e,t){let n=e.cut?Cc.cutMultiplier:1,r=t===q.Masher&&e.cooked?Cc.softMasherMultiplier:1,i=Yf.varieties[e.variety??L.Russet],a=i.toughSkin&&!e.cut?Yf.toughSkinMultiplier:1,o=i.dense&&t===q.Masher&&!e.cooked?Yf.denseMasherMultiplier:1,s=e.hasEyes&&(t===q.Knife||t===q.Laser)?Yf.eyesBladeMultiplier:1;return n*r*a*o*s}function Qf(e,t,n={}){return af(t,n.level??1,n.wear??0).damage*Zf(e,t)}function $f(e,t,n={}){e.mashHp=Math.max(0,e.mashHp-Qf(e,t,n));let r=J[t].appliesEffect;r&&(e[r]=!0)}function ep(e){return 1-e.mashHp/e.maxMashHp}var tp={penaltyMultiplier:3,baseHp:uc.king.mashHp,hpGrowthPerBoss:.25,bannerMs:3e3,meter:{width:90,height:10}};function np(e){return tp.baseHp*(1+tp.hpGrowthPerBoss*e)}var rp={bobPeriodMs:1e3,hitSquashMs:260,hitSquash:.2,serveHopMs:380,serveHopHeight:1.2,blinkPeriodMs:3400,blinkMs:130,steamPeriodMs:1800,steamRise:.5};function ip({chutes:e,chuteShare:t,roll:n}){if(!(!e?.length||n>=t))return e[Math.min(e.length-1,Math.floor(n/t*e.length))]}function ap({dropInMs:e,msSinceLastExecute:t}){return Math.max(0,e-t)}function op({dropInMs:e,dropMs:t,startScale:n}){return 1+(n-1)*Math.min(1,Math.max(0,e/t))}var Q=function(e){return e.Butter=`butter`,e.Scallions=`scallions`,e.Cabbage=`cabbage`,e.Gravy=`gravy`,e}({}),sp={butter:{topping:`butter`,label:`Butter`,hotkey:`q`,color:`#ffd84a`},scallions:{topping:`scallions`,label:`Scallions`,hotkey:`w`,color:`#5cb85c`},cabbage:{topping:`cabbage`,label:`Cabbage`,hotkey:`e`,color:`#2e7d32`},gravy:{topping:`gravy`,label:`Gravy`,hotkey:`r`,color:`#7b4a1e`}};function cp(){return{butter:!1,scallions:!1,cabbage:!1,gravy:!1}}var lp=function(e){return e.ButteredMash=`buttered-mash`,e.Champ=`champ`,e.Colcannon=`colcannon`,e.BangersAndMash=`bangers-and-mash`,e}({}),up={"buttered-mash":{dish:`buttered-mash`,label:`Buttered Mash`,toppings:[Q.Butter]},champ:{dish:`champ`,label:`Champ`,toppings:[Q.Scallions,Q.Butter]},colcannon:{dish:`colcannon`,label:`Colcannon`,toppings:[Q.Cabbage,Q.Butter]},"bangers-and-mash":{dish:`bangers-and-mash`,label:`Bangers & Mash`,toppings:[Q.Gravy]}},dp=Object.values(Q);function fp(e){return{[Q.Butter]:e[Q.Butter],[Q.Scallions]:e[Q.Scallions],[Q.Cabbage]:e[Q.Cabbage],[Q.Gravy]:e[Q.Gravy]}}function pp(e){return Object.values(lp).find(t=>{let n=up[t].toppings;return dp.every(t=>e[t]===n.includes(t))})}function mp(e,t){return!e.served&&!e[t]}var $={pointsPerStar:20,maxPoints:100,maxStars:5,perfectMax:3,rubberyQuality:60,rubberyPenalty:-2,incompletePenalty:-2,rawPenalty:-4,orderFilled:2,orderExpired:-2,potatoStolen:-1,towerUnlockStars:{knife:0,boiler:.5,masher:1,swiper:2,"cricket-trap":2,microwave:3,laser:4},lockedBuiltTowersGoDormant:!0,upgradeLevelStars:{2:2.5,3:4},waveEndBonusCoins:[80,60,60,80,100],tutorialHintMs:2e4,tutorialHint:`Only the Knife is unlocked. Serve great mash to earn stars and unlock more towers!`,noticeMs:4e3};function hp(e){let t=Math.min($.maxStars,Math.max(0,e/$.pointsPerStar));return Math.floor(t*2+1e-9)/2}function gp(e,t){return t>=$.towerUnlockStars[e]}function _p(e){return $.towerUnlockStars[e]}function vp(e,t,n=$.lockedBuiltTowersGoDormant){return!n||gp(e,t)}function yp(e){return $.upgradeLevelStars[e]??0}function bp({towerType:e,toLevel:t,stars:n}){return gp(e,n)&&n>=yp(t)}function xp(){return he([...Object.values($.towerUnlockStars),...Object.values($.upgradeLevelStars)]).filter(e=>e>0).sort((e,t)=>e-t)}function Sp(e){let{pointsPerStar:t}=$,n=hp(e),r=xp(),i=r.find(e=>e>n);if(i==null)return;let a=r.findLast(e=>e<=n)??0,o=(e-a*t)/((i-a)*t);return{nextStars:i,fraction:Math.round(Math.min(1,Math.max(0,o))*20)/20}}function Cp(e){return e.kind===`perfect`?e.quality<$.rubberyQuality?$.rubberyPenalty:$.perfectMax*e.quality/100:{incomplete:$.incompletePenalty,raw:$.rawPenalty,"order-filled":$.orderFilled,"order-expired":$.orderExpired,stolen:$.potatoStolen}[e.kind]}function wp(e,t){let n=e.prestigePoints,r=Math.round(Math.min($.maxPoints,Math.max(0,n+Cp(t)))*1e3)/1e3;e.prestigePoints=r;let i=hp(n),a=hp(r),o=Object.values(q).filter(e=>!gp(e,i)&&gp(e,a)),s=Object.values(q).filter(e=>gp(e,i)&&!gp(e,a)),c=o.length?o:s;return c.length&&(e.prestigeNotice={id:(e.prestigeNotice?.id??0)+1,atMs:e.elapsedMs,kind:o.length?`unlocked`:`locked`,towerTypes:c}),Math.round((r-n)*1e3)/1e3}function Tp(e,t){e.coins+=t.amount,t.amount>0&&(e.coinsEarned+=t.amount,e.resetSpeedOnIncome&&=(e.speed=1,!1)),e.coinEvents.push({id:e.nextCoinEventId,atMs:e.elapsedMs,amount:t.amount,reason:t.reason,x:t.x,y:t.y}),e.nextCoinEventId+=1,e.coinEvents.length>Oc.coinEventsKept&&e.coinEvents.splice(0,e.coinEvents.length-Oc.coinEventsKept)}function Ep({value:e,quality:t}){let n=`Perfect mash`,r=Object.entries(uc).find(([,t])=>t.value===e);return r&&e!==uc.medium.value&&(n+=` · ${r[0]} ×${e}`),t<100&&(n+=` · quality ${Math.round(t)}%`),n}function Dp(e){let{restaurant:t}=ud(e.levelId);return{x:t.x,y:t.y}}function Op(e){return e.mashHp<=0?md.Perfect:!e.cut&&!e.cooked&&e.mashHp>=e.maxMashHp?md.Raw:md.Incomplete}function kp(e,t){return e===md.Incomplete?Math.min(mc.incomplete.satisfaction,Math.round(mc.raw.satisfaction*(1-ep(t)))):mc[e].satisfaction}function Ap(e,t){if(t.quality<qd.minOrderQuality)return;let n=pp(t.toppings),r=e.orders.findIndex(e=>e.dish===n),i=e.orders[r];if(!n||!i)return;e.orders.splice(r,1);let a=Math.round(Ac.fulfilled.score*t.value),o=Math.round(Ac.fulfilled.coins*t.value);e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+a,Tp(e,{amount:o,reason:`Order: ${up[n].label}`,...Dp(e)});let s=Math.min(pc.max,Math.max(0,e.satisfaction+Ac.fulfilled.satisfaction));e.lastOrderEvent={kind:`fulfilled`,prestigeDelta:wp(e,{kind:`order-filled`}),dish:n,atMs:e.elapsedMs,scoreDelta:a,satisfactionDelta:s-e.satisfaction},e.satisfaction=s}function jp(e){return e.wavePhase===`done`&&e.potatoesPending===0&&e.potatoesServed+e.potatoesStolen>=e.potatoesSpawned}function Mp(e){let t=e.wavePhase===`done`?e.waveIndex+1:e.waveIndex;for(;e.waveSpawnTotals.length<t&&e.potatoesPending===0;)e.waveSpawnTotals.push(e.potatoesSpawned);let n=e.potatoesServed+e.potatoesStolen;for(;e.wavesPaid<e.waveSpawnTotals.length&&n>=(e.waveSpawnTotals[e.wavesPaid]??1/0);){let t=$.waveEndBonusCoins;Tp(e,{amount:t[Math.min(e.wavesPaid,t.length-1)]??0,reason:`Wave ${e.wavesPaid+1} cleared!`,...Dp(e)}),e.wavesPaid++}}function Np(e){return e.satisfaction<=0?e.status=W.Lost:jp(e)&&(e.status=W.Won),e.status}function Pp(e){if(e.status!==W.Playing)return;e.potatoesStolen+=1;let t=Math.min(pc.max,Math.max(0,e.satisfaction+vc.stolenSatisfaction));e.lastSteal={prestigeDelta:wp(e,{kind:`stolen`}),atMs:e.elapsedMs,satisfactionDelta:t-e.satisfaction},e.satisfaction=t,Mp(e),Np(e)}function Fp(e,t){let n=Op(t.processing);if(e.status!==W.Playing)return n;let r=n===md.Perfect,i=t.quality/100,a=r?Math.round(mc.perfect.score*t.value*i):mc[n].score,o=r?Math.round(Oc.servingCoins.perfect*t.value*i):Oc.servingCoins[n],s=wp(e,r?{kind:`perfect`,quality:t.quality}:{kind:n===md.Raw?`raw`:`incomplete`}),c=r?kp(n,t.processing):kp(n,t.processing)*(t.penaltyMultiplier??1);e.potatoesServed+=1,e.servingCounts[n]+=1,e.scoreBySlot[t.ownerSlot]=(e.scoreBySlot[t.ownerSlot]??0)+a,r&&(e.perfectBySlot[t.ownerSlot]=(e.perfectBySlot[t.ownerSlot]??0)+1),Tp(e,{amount:o,reason:r?Ep(t):`Eaten anyway`,...Dp(e)});let l=Math.min(pc.max,Math.max(0,e.satisfaction+c)),u=l-e.satisfaction;e.satisfaction=l,e.lastServing={result:n,servedAtMs:e.elapsedMs,scoreDelta:a,satisfactionDelta:u,progress:ep(t.processing),prestigeDelta:s},Mp(e);let d=Np(e);return r&&d===W.Playing&&Ap(e,t),n}function Ip(e){return Mc[e%Mc.length]??`#ffffff`}function Lp(e){return Math.max(1,Object.keys(e.slotNames).length)}function Rp(e){let t=Object.keys(e.slotNames).length>0,n=Object.entries(e.scoreBySlot).filter(([n])=>!t||Number(n)in e.slotNames).map(([t,n])=>{let r=Number(t);return{slot:r,name:e.slotNames[r]??`Player ${r+1}`,color:Ip(r),points:n,perfectServings:e.perfectBySlot[r]??0}}).sort((e,t)=>t.points-e.points||e.slot-t.slot),r=n[0]?.points??0;return n.map(e=>({...e,crowned:r>0&&e.points===r}))}function zp({elapsedMs:e,potatoId:t}){return(e+t*977%rp.blinkPeriodMs)%rp.blinkPeriodMs<rp.blinkMs}function Bp({elapsedMs:e,potatoId:t}){let n=e/rp.steamPeriodMs+t*.29;return n-Math.floor(n)}function Vp({elapsedMs:e,potatoId:t,radius:n,lastHitAtMs:r}){let i=e/rp.bobPeriodMs+t*.37,a=Ru(i),o=i-Math.floor(i),s=-Math.cos(o*Math.PI*2)*.5-.5,c=a.scaleX,l=a.scaleY,u=e-r;if(r>=0&&u>=0&&u<rp.hitSquashMs){let e=1-rp.hitSquash*Math.sin(u/rp.hitSquashMs*Math.PI);l*=e,c/=e}let d=Lu(e,t),f=s*n*Mu.hop,p=-(n*Math.sin(d))/c,m=n-n*Math.cos(d)/l;return{rotation:d,scaleX:c,scaleY:l,offsetY:f,pivotX:p,pivotY:m-f}}var Hp=function(e){return e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e.King=`king`,e}({}),Up=[`small`,`medium`,`large`];function Wp(e,t){let n=t;for(let t of Up)if(n-=e[t],n<0&&e[t]>0)return t;return Up.findLast(t=>e[t]>0)??`medium`}var Gp={width:40,height:7},Kp=14,qp={outline:!1,highlight:!1};function Jp({rx:e,ry:t,lumpiness:n,bumps:r,seed:i}){let a=[];for(let o=0;o<40;o++){let s=o/40*Math.PI*2,c=1+n*Math.sin(r*s+i);a.push([Math.cos(s)*e*c,Math.sin(s)*t*c])}return Nu(a)}function Yp({points:e,x:t,y:n,rotation:r=0}){return e.map(([e,i])=>[t+e*Math.cos(r)-i*Math.sin(r),n+e*Math.sin(r)+i*Math.cos(r)])}function Xp({x:e,y:t,rx:n,ry:r,rotation:i}){let a=[];for(let e=0;e<20;e++){let t=e/20*Math.PI*2;a.push([Math.cos(t)*n,Math.sin(t)*r])}return Nu(Yp({points:a,x:e,y:t,rotation:i}))}function Zp(e){return t=>{e.forEach(([e,n],r)=>{r===0?t.moveTo(e,n):t.lineTo(e,n)})}}function Qp({x:e,y:t,radius:n,from:r,to:i}){return a=>{a.moveTo(e+Math.cos(r)*n,t+Math.sin(r)*n),a.arc(e,t,n,r,i)}}function $p(e){return t=>{for(let[n,r,i]of e)t.circle(n,r,i)}}function em(e){return $p([[-.45*e,0,.8*e],[.45*e,0,.8*e],[0,-.35*e,.8*e],[0,.3*e,.7*e]])}function tm({x:e,y:t,radius:n}){return B({x:e,y:t,rx:n,ry:n})}function nm({graphics:e,x:t,y:n,rx:r,ry:i,rotation:a=-.5,strength:o=1}){H(e,{path:Xp({x:t,y:n,rx:r,ry:i,rotation:a}),fill:`#ffffff`,alpha:Mu.shine*o,...qp})}function rm({graphics:e,processing:t,radius:n,toppings:r,quality:i=100,meter:a=Gp,crown:o=!1,seed:s=0}){let c=ep(t);return e.clear(),c>0&&c<1&&(im({graphics:e,radius:n,meter:a,progress:c}),ym({graphics:e,processing:t,radius:n,meterWidth:a.width})),c>=.5?(pm({graphics:e,radius:n,perfect:c>=1,cooked:t.cooked,variety:t.variety??L.Russet}),Sm({graphics:e,radius:n,quality:i,blob:!0,seed:s}),mm({graphics:e,radius:n,mood:c>=1?`happy`:`dazed`})):(fm({graphics:e,radius:n,processing:t,seed:s,king:o}),Sm({graphics:e,radius:n,quality:i,blob:!1,seed:s}),mm({graphics:e,radius:n,mood:o?`angry`:`calm`})),bm(e,n,r),o&&vm(e,n),e}function im({graphics:e,radius:t,meter:n,progress:r}){let i=-t-Kp;H(e,{path:V({x:-n.width/2,y:i,width:n.width,height:n.height,radius:n.height/2}),fill:z.walnut,outlineScale:.5,highlight:!1}),H(e,{path:V({x:-n.width/2,y:i,width:Math.max(n.height,n.width*r),height:n.height,radius:n.height/2}),fill:z.meadow,outline:!1})}var am=[[-.55,-.1],[.45,.3],[.2,-.5],[-.1,.45]],om=[[-.7,-.1],[.6,.3],[.3,-.55],[-.2,.55],[.75,-.25],[-.4,.15]],sm={[L.Red]:{skin:`#d9695a`,cookedSkin:`#ecb0a0`,spot:`#a8402f`,stretch:.94,squash:1,lumpiness:.04,bumps:5,hatch:!1,bumpy:!1},[L.Russet]:{skin:z.toffee,cookedSkin:z.wheat,spot:z.caramel,stretch:1,squash:1,lumpiness:.05,bumps:5,hatch:!1,bumpy:!1},[L.Yukon]:{skin:`#e6b84a`,cookedSkin:`#f7e29a`,spot:`#b98a2a`,stretch:1,squash:1,lumpiness:.04,bumps:4,hatch:!1,bumpy:!1},[L.ToughSkinned]:{skin:`#8a5a38`,cookedSkin:`#c9a77a`,spot:z.walnut,stretch:1,squash:1,lumpiness:.06,bumps:6,hatch:!0,bumpy:!1},[L.Sweet]:{skin:`#e8883a`,cookedSkin:`#f5c58a`,spot:`#b8581f`,stretch:1.22,squash:.8,lumpiness:.03,bumps:3,hatch:!1,bumpy:!1},[L.Yam]:{skin:`#6b4558`,cookedSkin:`#b99aa0`,spot:`#3f2634`,stretch:1.1,squash:.95,lumpiness:.09,bumps:8,hatch:!1,bumpy:!0}},cm={[L.Sweet]:{perfect:`#ffc58a`,cooked:`#f0a860`,raw:`#e0914f`},[L.Yam]:{perfect:`#f2a65c`,cooked:`#e08f4a`,raw:`#c97a3f`}};function lm({graphics:e,rx:t,ry:n,color:r}){for(let[i,a]of[[-.55,.4],[.1,.55],[.6,.2],[-.15,-.62],[.55,-.45]]){let o=i*t,s=a*n;for(let t of[-2,0,2])U(e,{path:Zp([[o-3+t,s+4],[o+3+t,s-4]]),color:r,width:1.4,alpha:.8})}}function um({graphics:e,rx:t,ry:n,color:r}){for(let[i,a,o]of[[-.6,.1,.12],[-.25,.55,.1],[.3,.5,.13],[.65,-.1,.1],[.25,-.6,.12],[-.4,-.5,.09]])H(e,{path:tm({x:i*t,y:a*n,radius:Math.min(t,n)*o}),fill:r,alpha:.85,...qp})}function dm({graphics:e,radius:t,rx:n,ry:r}){for(let[i,a]of[[-.7,-.2],[.62,.45],[.05,-.72]]){let o=i*n,s=a*r;H(e,{path:tm({x:o,y:s,radius:Math.max(2,t*.13)}),fill:z.bark,...qp}),H(e,{path:tm({x:o-t*.03,y:s-t*.03,radius:Math.max(.8,t*.04)}),fill:z.sand,...qp})}}function fm({graphics:e,radius:t,processing:n,seed:r,king:i}){let a=n.cooked,o=n.variety??L.Russet,s=i?void 0:sm[o],c=t*(i?1.25:1.2)*(s?.stretch??1),l=t*(i?.95:.9)*(s?.squash??1);if(H(e,{path:Jp({rx:c,ry:l,lumpiness:a?.03:s?.lumpiness??.05,bumps:a?4:s?.bumps??5,seed:r}),fill:i?z.caramel:a?s?.cookedSkin??z.wheat:s?.skin??z.toffee}),a){nm({graphics:e,x:-t*.4,y:-t*.4,rx:t*.38,ry:t*.15,strength:1.1});for(let[n,r]of[[-.5,.35],[.4,.2]])H(e,{path:tm({x:n*t,y:r*t,radius:t*.07}),fill:z.sand,alpha:.7,...qp})}else{nm({graphics:e,x:-t*.4,y:-t*.4,rx:t*.35,ry:t*.14});for(let[n,r]of i?om:am)H(e,{path:tm({x:n*t,y:r*t,radius:Math.max(1.3,t*.06)}),fill:s?.spot??z.caramel,...qp})}if(s?.hatch&&lm({graphics:e,rx:c,ry:l,color:s.spot}),s?.bumpy&&um({graphics:e,rx:c,ry:l,color:s.spot}),n.hasEyes&&dm({graphics:e,radius:t,rx:c,ry:l}),n.cut)for(let n of[-.4,.4]){let r=l*.92*Math.sqrt(Math.max(0,1-(n*t/c)**2));U(e,{path:Zp([[n*t,-r],[n*t,r]]),color:z.oak,width:Math.max(2.5,t*.14)}),U(e,{path:Zp([[n*t+t*.12,-r*.95],[n*t+t*.12,r*.95]]),color:z.sand,width:Math.max(1,t*.05)})}}function pm({graphics:e,radius:t,perfect:n,cooked:r,variety:i}){let a=cm[i],o=a?.perfect??z.cream;if(n){H(e,{path:em(t),fill:o}),H(e,{path:Nu([[-t*.18,-t*.78],[0,-t*1.18],[t*.2,-t*.78]]),fill:o,outlineScale:.9}),H(e,{path:B({x:0,y:-t*.8,rx:t*.3,ry:t*.14}),fill:o,...qp}),nm({graphics:e,x:-t*.35,y:-t*.35,rx:t*.4,ry:t*.17,rotation:-.4,strength:.95}),nm({graphics:e,x:t*.1,y:-t*.3,rx:t*.07,ry:t*.07,rotation:0,strength:1.2}),U(e,{path:Qp({x:0,y:-t*.62,radius:t*.2,from:.3,to:Math.PI-.3}),color:z.sand,width:Math.max(1,t*.05),alpha:.6});return}if(H(e,{path:em(t),fill:r?a?.cooked??z.wheat:a?.raw??z.sand}),!r)for(let[n,r,i]of[[-.6,-.2,.5],[.15,-.55,-.3],[.55,.2,1],[-.2,.35,0]])H(e,{path:Xp({x:n*t,y:r*t,rx:t*.3,ry:t*.2,rotation:i}),fill:z.toffee,outlineScale:.55});U(e,{path(e){e.moveTo(-t*.6,t*.15),e.quadraticCurveTo(-t*.3,0,0,t*.15),e.quadraticCurveTo(t*.3,t*.3,t*.6,t*.1)},color:z.caramel,width:Math.max(1.2,t*.06),alpha:.5})}function mm({graphics:e,radius:t,mood:n}){let r=t*.3,i=-t*.05;for(let a of[-1,1])n===`happy`?U(e,{path:Qp({x:a*r,y:i+t*.02,radius:t*.09,from:Math.PI*1.1,to:Math.PI*1.9}),color:z.bark,width:t*.07}):H(e,{path:tm({x:a*r,y:i,radius:t*.075}),fill:z.bark,...qp}),n!==`angry`&&H(e,{path:tm({x:a*t*.5,y:i+t*.2,radius:t*.12}),fill:z.pumpkin,alpha:.55,...qp});(n===`happy`||n===`calm`)&&U(e,{path:Qp({x:0,y:i+t*.12,radius:t*.1,from:.2,to:Math.PI-.2}),color:z.bark,width:t*.05})}function hm(e){let t=ep(e);return{steam:t<.5&&e.cooked,blink:t<1}}function gm(e,t){for(let n of[-1,1])U(e,{path(e){e.moveTo(n*t*.3-t*.09,-t*.05),e.lineTo(n*t*.3+t*.09,-t*.05)},color:z.bark,width:t*.16});return e}function _m(e,t){for(let n=0;n<3;n++){let r=n*.3,i=t*.16*(1+r);H(e,{path:tm({x:Math.sin(r*6+n*2)*t*.2+(n-1)*t*.4,y:-t*.95-r*t*1.1,radius:i}),fill:z.cream,alpha:(1-r)*.85,...qp})}return e}function vm(e,t){let n={x:0,y:-t*.82,rotation:.12};function r(e){return Yp({points:e.map(([e,n])=>[e*t,n*t]),...n})}H(e,{path:Nu(r([[-.5,.12],[-.58,-.55],[-.27,-.25],[0,-.7],[.27,-.25],[.58,-.55],[.5,.12]])),fill:z.butter,outlineScale:.85}),H(e,{path:Nu(r([[-.5,-.02],[.5,-.02],[.5,.14],[-.5,.14]])),fill:z.caramel,outlineScale:.6});for(let[n,i]of r([[-.58,-.55],[0,-.7],[.58,-.55]]))H(e,{path:tm({x:n,y:i,radius:t*.07}),fill:z.tomato,outlineScale:.5})}function ym({graphics:e,processing:t,radius:n,meterWidth:r}){let i=wc.iconSizePx,a=-n-Kp-i-3,o=-r/2;t.cut&&(U(e,{path:Zp([[o+1,a+i-1],[o+i-1,a+1]]),color:z.stone,width:4,outline:!0}),U(e,{path:Zp([[o+2,a+i-3],[o+i-3,a+2]]),color:z.cream,width:1.5}),o+=i+4),t.cooked&&(H(e,{path:Nu([[o+i/2,a],[o+i*.2,a+i*.62],[o+i*.8,a+i*.62]]),fill:z.sky,outlineScale:.6}),H(e,{path:tm({x:o+i/2,y:a+i*.68,radius:i*.32}),fill:z.sky,outlineScale:.6}))}function bm(e,t,n){let r=t;if(n[Q.Gravy]&&(H(e,{path(e){e.ellipse(0,-r*.12,r*.72,r*.36),e.circle(-r*.5,r*.12,r*.14),e.circle(r*.3,r*.2,r*.18),e.circle(r*.62,0,r*.12)},fill:z.oak,outlineScale:.6}),nm({graphics:e,x:-r*.25,y:-r*.24,rx:r*.22,ry:r*.07,rotation:-.2,strength:.8}),H(e,{path:B({x:r*.15,y:-r*.08,rx:r*.2,ry:r*.07}),fill:z.caramel,alpha:.5,...qp})),n[Q.Cabbage])for(let[t,n,i]of[[-.45,.18,-.5],[.38,.28,.4]]){H(e,{path:Xp({x:t*r,y:n*r,rx:r*.34,ry:r*.2,rotation:i}),fill:z.meadow,outlineScale:.6});for(let[a,o,s,c,l]of[[-.28,0,.26,0,.05],[-.08,0,.04,-.1,.035],[-.08,0,.04,.1,.035]])U(e,{path:Zp(Yp({points:[[a*r,o*r],[s*r,c*r]],x:t*r,y:n*r,rotation:i})),color:z.moss,width:Math.max(1,r*l)})}if(n[Q.Scallions]){for(let[t,n,i]of[[-.3,-.55,-.6],[0,-.62,0],[.3,-.55,.6],[.1,-.35,.9]]){let a=Zp(Yp({points:[[0,0],[0,-r*.3]],x:t*r,y:n*r,rotation:i}));U(e,{path:a,color:z.moss,width:r*.16,outline:!0}),U(e,{path:a,color:z.meadow,width:r*.09})}for(let[t,n]of[[-.55,-.2],[.55,-.15],[0,-.15]])H(e,{path:tm({x:t*r,y:n*r,radius:r*.09}),fill:z.meadow,outlineScale:.5}),H(e,{path:tm({x:t*r,y:n*r,radius:r*.04}),fill:z.cream,...qp})}n[Q.Butter]&&(H(e,{path:V({x:-r*.3,y:-r*.55,width:r*.6,height:r*.44,radius:r*.1}),fill:z.toffee,outlineScale:.7}),H(e,{path:V({x:-r*.3,y:-r*.62,width:r*.6,height:r*.36,radius:r*.1}),fill:z.butter,outlineScale:.7}),nm({graphics:e,x:-r*.12,y:-r*.5,rx:r*.12,ry:r*.05,rotation:0,strength:.9}),H(e,{path:B({x:r*.1,y:-r*.08,rx:r*.14,ry:r*.05}),fill:z.butter,alpha:.6,...qp}))}function xm(e){return Math.round(e/qd.rubberyStep)*qd.rubberyStep}function Sm({graphics:e,radius:t,quality:n,blob:r,seed:i}){let a=(1-xm(n)/100)*qd.rubberyMaxAlpha;a<=0||H(e,{path:r?em(t):Jp({rx:t*1.2,ry:t*.9,lumpiness:.05,bumps:5,seed:i}),fill:z.sage,alpha:a,...qp})}function Cm({processing:e,toppings:t,quality:n,radius:r,crown:i}){let a=e.mashHp<=0;return[e.cut,e.cooked,a?`done`:Math.round(ep(e)*20),JSON.stringify(t),xm(n),r,i,e.variety??L.Russet,e.hasEyes??!1].join(`|`)}var wm=1e3;function Tm({progress:e,radius:t}){let n=Math.min(1,Math.max(0,e));return{lift:-Math.sin(n*Math.PI)*t*rp.serveHopHeight,scale:1-.4*n,alpha:n<.6?1:1-(n-.6)/.4}}function Em({parent:e,from:t,radius:n,processing:r,toppings:i,quality:a,seed:o}){if(typeof requestAnimationFrame!=`function`)return;let s=rm({graphics:new M,processing:r,radius:n,toppings:i,quality:a,seed:o});s.zIndex=wm,e.addChild(s);let c=performance.now();function l(e){let r=(e-c)/rp.serveHopMs;if(r>=1||s.destroyed||!s.parent){s.destroyed||s.destroy();return}let i=Tm({progress:r,radius:n});s.position.set(t.x,t.y+i.lift),s.scale.set(i.scale),s.alpha=i.alpha,requestAnimationFrame(l)}s.position.set(t.x,t.y),requestAnimationFrame(l)}var Dm=`chute-shadow`,Om=class extends Gf({key:`PotatoEntity`,paramsShape:En(Cs,t({pathId:``,distancePx:0,laneOffsetPx:0,dropInMs:0,size:Le(Hp),variety:Le(L),hasEyes:!1,cut:!1,cooked:!1,mashHp:0,maxMashHp:1,served:!1,carriedBySeagull:!1,quality:100,lastSwipedAtMs:-1,potatoId:0,butter:!1,scallions:!1,cabbage:!1,gravy:!1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){drawnKey=``;steam;eyelids;hitText;createView(){this.drawnKey=this.getLookKey();let e=this.getRadius(),t=rm({graphics:new M,processing:this.getProcessing(),radius:e,toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===Hp.King,seed:this.params.potatoId});if(Iu(t,{width:e*2.4,height:e*.9,offsetY:e*.8}),Lp(this.state.runState)>1){let n=Yu(this.state.level,this.params.pathId),r=new M;r.ellipse(0,e*.8,e*1.1,e*.4).fill({color:Ip(n.ownerSlot)}),t.addChildAt(r,0)}let n=new M({label:Dm});return n.ellipse(0,e*.5,e*1.1,e*.5).fill({color:`#000000`}),n.visible=this.params.dropInMs>0,t.addChildAt(n,0),this.params.dropInMs>0&&this.drawFalling(t),{hitbox:new mo({x:0,y:0},this.getRadius()),view:t}}recordHit({towerType:e,tower:t,minIntervalMs:n=0}){let r=this.state.runState.elapsedMs;if(this.params.lastHitAtMs>=0&&r-this.params.lastHitAtMs<n)return;let i=this.getProcessing();this.params.lastHitDamage=Math.round(Qf(i,e,t)),this.params.lastHitMultiplier=Zf(i,e),this.params.lastHitAtMs=r,this.params.lastHitTowerType=e}updateHitNumber(){let e=this.state.runState.elapsedMs-this.params.lastHitAtMs;if(this.params.lastHitAtMs<0||e<0||e>=wc.hitNumberMs){this.hitText&&(this.hitText.visible=!1);return}let t=wc.tiers.find(e=>this.params.lastHitMultiplier>=e.minMultiplier)??wc.tiers[wc.tiers.length-1];if(!t)return;let n=this.hitText??new es({text:``,style:{fill:`#ffffff`,fontSize:20,fontWeight:`bold`,stroke:{color:`#000000`,width:4}}});this.hitText||(n.anchor.set(.5),this.hitText=n,this.view.addChild(n));let r=e/wc.hitNumberMs;n.visible=!0,n.text=`-${this.params.lastHitDamage}${t.suffix}`,n.style.fill=t.color,n.style.fontSize=t.fontSize,n.alpha=1-r,n.position.set(0,-this.getRadius()-40-wc.hitNumberRisePx*r),n.scale.set(t.pop?1+.5*Math.max(0,1-r*5):1)}drawFalling(e){let{dropInMs:t}=this.params,n=op({dropInMs:t,dropMs:gc.dropMs,startScale:gc.startScale}),r=e.getChildByLabel(Dm);e.scale.set(n),r&&(r.scale.set(1/n),r.visible=t>0,r.alpha=.6*(1-(n-1)/(gc.startScale-1)))}getRadius(){return uc[this.params.size].radius}getProcessing(){let{cut:e,cooked:t,mashHp:n,maxMashHp:r,variety:i,hasEyes:a}=this.params;return{cut:e,cooked:t,mashHp:n,maxMashHp:r,variety:i,hasEyes:a}}getToppings(){return fp(this.params)}getLookKey(){return Cm({processing:this.getProcessing(),toppings:this.getToppings(),quality:this.params.quality,radius:this.getRadius(),crown:this.params.size===Hp.King})}redrawIfChanged(){let e=this.getLookKey();e!==this.drawnKey&&(this.drawnKey=e,rm({graphics:D.instanceOf(this.view,M),processing:this.getProcessing(),radius:this.getRadius(),toppings:this.getToppings(),quality:this.params.quality,meter:this.getMeter(),crown:this.params.size===Hp.King,seed:this.params.potatoId}))}getMeter(){return this.params.size===Hp.King?tp.meter:Gp}update({msSinceLastExecute:e}){if(this.updateHitNumber(),this.params.served||this.params.carriedBySeagull)return;if(this.params.dropInMs>0){this.params.dropInMs=ap({dropInMs:this.params.dropInMs,msSinceLastExecute:e}),this.drawFalling(this.view);return}let t=Yu(this.state.level,this.params.pathId);this.params.distancePx=Math.min(this.params.distancePx+this.state.runState.beltSpeedPxPerMs*e,Uu(t)),this.moveToDistance(),this.redrawIfChanged(),this.applyMotion(),this.params.distancePx>=Uu(t)&&this.serveAtRestaurant()}applyMotion(){let e=this.getRadius(),t=Vp({elapsedMs:this.state.runState.elapsedMs,potatoId:this.params.potatoId,radius:e,lastHitAtMs:this.params.lastHitAtMs});this.view.rotation=t.rotation,this.view.scale.set(t.scaleX,t.scaleY),this.view.pivot.set(t.pivotX,t.pivotY),this.updateOverlays()}updateOverlays(){let e=hm(this.getProcessing()),t=this.getRadius(),n={elapsedMs:this.state.runState.elapsedMs,potatoId:this.params.potatoId};if(e.steam){this.steam||(this.steam=_m(new M,t),this.view.addChild(this.steam));let e=Bp(n);this.steam.visible=!0,this.steam.alpha=Math.sin(e*Math.PI),this.steam.position.set(Math.sin(e*6)*t*.08,-e*t*rp.steamRise)}else this.steam&&(this.steam.visible=!1);e.blink&&zp(n)?(this.eyelids||(this.eyelids=gm(new M,t),this.view.addChild(this.eyelids)),this.eyelids.visible=!0):this.eyelids&&(this.eyelids.visible=!1)}moveToDistance(){let e=Gu({path:Yu(this.state.level,this.params.pathId),distancePx:this.params.distancePx,offsetPx:this.params.laneOffsetPx});this.params.x=e.x,this.params.y=e.y,this.view.zIndex=this.params.distancePx*_c.drawOrderPerPx}spawnServeHop(){let e=this.view.parent;e&&Em({parent:e,from:{x:this.view.x,y:this.view.y},radius:this.getRadius(),processing:this.getProcessing(),toppings:this.getToppings(),quality:this.params.quality,seed:this.params.potatoId})}serveAtRestaurant(){let e=Yu(this.state.level,this.params.pathId);Fp(this.state.runState,{processing:this.getProcessing(),ownerSlot:e.ownerSlot,value:uc[this.params.size].value,toppings:this.getToppings(),quality:this.params.quality,penaltyMultiplier:this.params.size===Hp.King?tp.penaltyMultiplier:1}),this.params.served=!0,this.spawnServeHop(),this.destroy()}},km=function(e){return e.Masher=`masher`,e.Hammer=`hammer`,e.Water=`water`,e.Cricket=`cricket`,e}({}),Am=Math.PI*2;function jm(e,t,n){e.save(),e.scaleTransform(t.scaleX??1,t.scaleY??1),e.rotateTransform(t.rotation??0),e.translateTransform(t.x,t.y),n(),e.restore()}function Mm(e,t,n,r=.7){H(e,{path:V(n),fill:t,outlineScale:r})}function Nm(e){Mm(e,z.caramel,{x:-4,y:-3,width:26,height:6,radius:3}),Mm(e,z.stone,{x:-14,y:-9,width:10,height:18,radius:3});for(let t of[-4,4])H(e,{path:B({x:-9,y:t,rx:1.6,ry:1.6}),fill:z.slate,outline:!1,highlight:!1})}function Pm(e){Mm(e,z.caramel,{x:-6,y:-3,width:30,height:6,radius:3}),Mm(e,z.slate,{x:-16,y:-10,width:14,height:20,radius:3},.8);for(let t of[-6,0,6])H(e,{path:B({x:-14,y:t,rx:1.4,ry:1.4}),fill:z.stone,outline:!1,highlight:!1})}function Fm(e,t){let n=1+Math.sin(t*40)*.08;H(e,{path:B({x:0,y:0,rx:8*n,ry:8/n}),fill:z.sky,outlineScale:.7}),H(e,{path:B({x:11,y:-2,rx:3,ry:2.4}),fill:z.sky,outlineScale:.5})}function Im(e,{kind:t,x:n,y:r,progress:i,directionX:a,timeSec:o}){let s=xc.scale,c=a<0?-1:1;if(t===km.Cricket){let t=i*3%1;jm(e,{x:n,y:r,scaleX:c*s,scaleY:s},()=>{Df(e,{timeSec:o,squash:1-.15*Math.sin(t*Math.PI),tilt:-Math.cos(t*Math.PI)*.5})})}else t===km.Water?jm(e,{x:n,y:r,scaleX:s,scaleY:s},()=>Fm(e,o)):jm(e,{x:n,y:r,rotation:i*xc.spinTurns*Am,scaleX:s,scaleY:s},()=>t===km.Hammer?Pm(e):Nm(e))}function Lm(e,{kind:t,x:n,y:r,progress:i}){let a=t===km.Water?z.sky:z.cream,o=6+i*12;U(e,{path(e){e.circle(n,r,o)},color:a,width:3*(1-i)+1,alpha:.9*(1-i)});for(let t of[-1,1])H(e,{path:B({x:n+t*o*.9,y:r-i*6,rx:2.2*(1-i),ry:2.2*(1-i)}),fill:a,outline:!1,highlight:!1,alpha:1-i})}function Rm(e){return e===km.Cricket?xc.cricketFlightMs:xc.flightMs}function zm({projectile:e,elapsedMs:t}){let{from:n,to:r,kind:i,startMs:a}=e,o=t-a;if(o<0)return{phase:`waiting`};let s=Rm(i);if(o<s){let e=o/s,t=Math.hypot(r.x-n.x,r.y-n.y),a=i===km.Cricket?xc.cricketArcPx:Math.min(xc.arcMaxPx,Math.max(xc.arcMinPx,t*xc.arcFraction));return{phase:`flight`,progress:e,x:n.x+(r.x-n.x)*e,y:n.y+(r.y-n.y)*e-a*4*e*(1-e)}}return i!==km.Cricket&&o<s+xc.puffMs?{phase:`puff`,progress:(o-s)/xc.puffMs,x:r.x,y:r.y}:{phase:`done`}}var Bm=[];function Vm(e){for(Bm.push({kind:e.kind,from:{...e.from},to:{...e.to},startMs:e.startMs});Bm.length>xc.maxLive;)Bm.shift()}var Hm,Um=!1,Wm=Xe({modName:`projectile-layer`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage;if(!t||!e.runState)return;(!Hm||Hm.destroyed)&&(Hm=new M,Hm.zIndex=900,t.sortableChildren=!0,t.addChild(Hm));let{elapsedMs:n}=e.runState;if(!(Bm.length===0&&Um)){Hm.clear(),Um=Bm.length===0;for(let e=Bm.length-1;e>=0;e--){let t=Bm[e];if(!t)continue;let r=zm({projectile:t,elapsedMs:n});r.phase===`done`||r.phase===`waiting`?Bm.splice(e,1):r.phase===`flight`?Im(Hm,{kind:t.kind,x:r.x,y:r.y,progress:r.progress,directionX:t.to.x-t.from.x,timeSec:n/1e3}):Lm(Hm,{kind:t.kind,x:r.x,y:r.y,progress:r.progress})}}}}),Gm={cellPx:40,beltCellCost:8,hopSpeedPxPerMs:.03,repathMs:500,waypointReachedPx:2,gullRadiusPx:16,chuteBlockRadiusPx:36,hopCycleMs:600,hopHeightPx:12,hopSquash:.15};function Km({level:e,point:t,beltSpeedPxPerMs:n,msSinceLastExecute:r}){for(let i of e.paths){let e=Ju(i,t);if(e.distance>i.widthPx/2)continue;if(e.alongPx>=Uu(i))return{onBelt:!0,dx:0,dy:0};let a=Ku(i,e.alongPx),o=n*r;return{onBelt:!0,dx:a.x*o,dy:a.y*o}}return{onBelt:!1,dx:0,dy:0}}function qm({level:e,towers:t,cellPx:n=Gm.cellPx,gullRadiusPx:r=Gm.gullRadiusPx,towerRadiusPx:i=yc.radius}){let a=Math.ceil(O.width/n),o=Math.ceil(O.height/n),s=new Uint8Array(a*o),c=new Uint8Array(a*o),{restaurant:l}=e,u=l.sizePx/2+r,d=e.paths.flatMap(e=>(e.chutes??[]).map(t=>Wu(e,t.distancePx)));for(let f=0;f<o;f++)for(let o=0;o<a;o++){let p=(o+.5)*n,m=(f+.5)*n,h=f*a+o;e.paths.some(e=>qu(e,{x:p,y:m})<=e.widthPx/2)&&(c[h]=1),(Math.abs(p-l.x)<u&&Math.abs(m-l.y)<u||d.some(e=>Math.hypot(e.x-p,e.y-m)<Gm.chuteBlockRadiusPx)||t.some(e=>Math.hypot(e.x-p,e.y-m)<i+r))&&(s[h]=1)}return{cols:a,rows:o,cellPx:n,blocked:s,belt:c}}function Jm({grid:e,point:t}){return{col:Math.min(e.cols-1,Math.max(0,Math.floor(t.x/e.cellPx))),row:Math.min(e.rows-1,Math.max(0,Math.floor(t.y/e.cellPx)))}}function Ym({grid:e,cell:t}){return{x:(t.col+.5)*e.cellPx,y:(t.row+.5)*e.cellPx}}function Xm({grid:e,cell:t}){let n=t.col===0||t.row===0||t.col===e.cols-1||t.row===e.rows-1,r=t.row*e.cols+t.col;return n&&e.blocked[r]===0&&e.belt[r]===0}function Zm({grid:e,cell:t}){return Math.min(t.col,t.row,e.cols-1-t.col,e.rows-1-t.row)}var Qm;function $m({level:e,towers:t}){if(Qm?.level===e&&Qm.xs.length===t.length&&t.every((e,t)=>e.x===Qm?.xs[t]&&e.y===Qm.ys[t]))return Qm.grid;let n=t.map(e=>`${e.x},${e.y}`).sort().join(`;`);return(Qm?.level!==e||Qm.key!==n)&&(Qm={level:e,key:n,grid:qm({level:e,towers:t}),xs:[],ys:[]}),Qm.xs=t.map(e=>e.x),Qm.ys=t.map(e=>e.y),Qm.grid}function eh(e){return Qm?.level===e?Qm.grid:$m({level:e,towers:[]})}var th=[{dc:0,dr:-1},{dc:1,dr:0},{dc:0,dr:1},{dc:-1,dr:0},{dc:1,dr:-1},{dc:1,dr:1},{dc:-1,dr:1},{dc:-1,dr:-1}];function nh({from:e,to:t}){let n=Math.abs(e.col-t.col),r=Math.abs(e.row-t.row);return Math.max(n,r)+(Math.SQRT2-1)*Math.min(n,r)}var rh=class{items=[];seq=0;less({a:e,b:t}){let n=this.items[e],r=this.items[t];return!n||!r?!1:n.f<r.f||n.f===r.f&&n.seq<r.seq}swap({a:e,b:t}){let n=this.items[e],r=this.items[t];n&&r&&(this.items[e]=r,this.items[t]=n)}push({index:e,f:t}){this.items.push({f:t,seq:this.seq++,index:e});let n=this.items.length-1;for(;n>0;){let e=n-1>>1;if(!this.less({a:n,b:e}))break;this.swap({a:n,b:e}),n=e}}pop(){let e=this.items[0],t=this.items.pop();if(e&&t){if(this.items.length>0){this.items[0]=t;let e=0;for(;;){let t=e*2+1,n=t+1,r=e;if(t<this.items.length&&this.less({a:t,b:r})&&(r=t),n<this.items.length&&this.less({a:n,b:r})&&(r=n),r===e)break;this.swap({a:e,b:r}),e=r}}return e.index}}};function ih({grid:e,start:t,isGoal:n,heuristic:r,beltCellCost:i=Gm.beltCellCost}){let{cols:a,rows:o}=e,s=t.row*a+t.col,c=new Float64Array(a*o).fill(1/0),l=new Int32Array(a*o).fill(-1),u=new Uint8Array(a*o),d=new rh;c[s]=0,d.push({index:s,f:r(t)});function f({col:t,row:n}){return e.blocked[n*a+t]===1}for(let t=d.pop();t!=null;t=d.pop()){if(u[t])continue;u[t]=1;let p=t%a,m=Math.floor(t/a);if(n({col:p,row:m})){let e=[];for(let n=t;n!==s;n=l[n]??s)e.push({col:n%a,row:Math.floor(n/a)});return e.reverse()}for(let{dc:s,dr:h}of th){let g=p+s,_=m+h;if(g<0||_<0||g>=a||_>=o)continue;let v=_*a+g,y={col:g,row:_};if(u[v]||f({col:g,row:_})&&!n(y))continue;let b=s!==0&&h!==0;if(b&&(f({col:p+s,row:m})||f({col:p,row:m+h})))continue;let x=(e.belt[v]?i:1)*(b?Math.SQRT2:1),S=(c[t]??1/0)+x;S<(c[v]??1/0)&&(c[v]=S,l[v]=t,d.push({index:v,f:S+r(y)}))}}}var ah=40;function oh({rollEdge:e,rollAlong:t}){return e<1/3?{x:t*O.width,y:-40}:e<2/3?{x:O.width+ah,y:t*O.height}:{x:t*O.width,y:O.height+ah}}function sh(e){let t=[{x:0,y:e.y},{x:O.width,y:e.y},{x:e.x,y:0},{x:e.x,y:O.height}],n=t[0]??e,r=1/0;for(let i of t){let t=Math.hypot(i.x-e.x,i.y-e.y);t<r&&(n=i,r=t)}return{x:n.x,y:n.y}}function ch({from:e,to:t,stepPx:n}){let r=t.x-e.x,i=t.y-e.y,a=Math.hypot(r,i);return a<=n||a===0?{x:t.x,y:t.y}:{x:e.x+r/a*n,y:e.y+i/a*n}}var lh=13,uh=11,dh=7,fh=36,ph={flying:{width:64,height:18,offsetY:44},walking:{width:56,height:14,offsetY:24}};function mh({extend:e,side:t}){function n(n){return t*n*e}return e=>{e.moveTo(9,t*3).bezierCurveTo(9,n(22),0,n(34),-9,n(38)).lineTo(-15,n(33)).quadraticCurveTo(-14,n(26),-21,n(26)).quadraticCurveTo(-17,n(19),-24,n(17)).quadraticCurveTo(-18,n(10),-19,t*4).closePath()}}function hh({extend:e,side:t}){function n(n){return t*n*e}return e=>{e.moveTo(-1,n(31)).lineTo(-9,n(38)).lineTo(-15,n(33)).quadraticCurveTo(-14,n(26),-21,n(26)).lineTo(-8,n(26)).closePath()}}function gh({fromX:e,fromY:t,toX:n,toY:r}){return i=>{i.moveTo(e,t).lineTo(n,r)}}function _h(e,{x:t,y:n}){H(e,{path:B({x:t,y:n,rx:5,ry:2}),fill:`#ffffff`,alpha:.5,outline:!1,highlight:!1})}var vh={approach:`approach`,escape:`escape`},yh=class e extends Gf({key:`SeagullEntity`,paramsShape:En(Cs,t({flying:!1,hp:0,phase:``,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1,onBelt:!1})),paramsMap:{view:{x:!0,y:!0}}}){flipper;art;shadow;hpBar;lastSeenCarryingId=0;lastSeenX;drawnHp=NaN;facing=1;route;routeKey=``;msSinceRepath=0;wasOnBelt=!1;createView(){let e=new mt,t=new mt,n=this.params.flying?ph.flying:ph.walking,r=Iu(e,n);r.pivot.y=n.offsetY,r.y=n.offsetY;let i=new M;t.addChild(i),e.addChild(t);let a=new M;return e.addChild(a),this.flipper=t,this.art=i,this.shadow=r,this.hpBar=a,{view:e}}drawGull(){let e=D.isDefined(this.art),{flying:t,fed:n,carryingPotatoId:r}=this.params,i=this.state.runState.elapsedMs/1e3,a=i*(t?uh:dh),o=t?.25+.75*Math.abs(Math.sin(a)):0,s=t?-Math.sin(a)*2.5:-Math.abs(Math.sin(a))*2.5,c=t?Math.sin(a)*.03:Math.sin(a)*.12,l=z.pumpkin;if(e.clear(),r!==0){for(let t of[-4,5])U(e,{path:gh({fromX:t,fromY:8,toX:t*.8+4,toY:20}),color:l,width:2.6,outline:!0});U(e,{path:gh({fromX:0,fromY:12,toX:0,toY:28}),color:l,width:2.4,outline:!0})}else if(t)U(e,{path:gh({fromX:-4,fromY:9,toX:-9,toY:14}),color:l,width:2.4,outline:!0}),U(e,{path:gh({fromX:4,fromY:9,toX:-4,toY:15}),color:l,width:2.4,outline:!0});else for(let[t,n]of[[0,-5],[1,5]]){let r=Math.sin(a+t*Math.PI)*4,i=Math.max(0,Math.cos(a+t*Math.PI))*3,o=n+r*.5;U(e,{path:gh({fromX:n,fromY:7,toX:o,toY:19-i}),color:l,width:3,outline:!0}),H(e,{path:Nu([[o-1,19-i],[o+9,20-i],[o-2,22-i]]),fill:l,outlineScale:.5})}if(t)for(let t of[-1,1]){let n=Math.max(.1,o);H(e,{path:mh({extend:n,side:t}),fill:z.sage,outlineScale:.8}),H(e,{path:hh({extend:n,side:t}),fill:z.walnut,outline:!1,highlight:!1})}return H(e,{path:Nu([[-16,-5],[-33,-3],[-34,3],[-16,6]]),fill:z.sage,outlineScale:.8}),H(e,{path:V({x:-34,y:-3,width:4,height:6,radius:1}),fill:z.walnut,outline:!1,highlight:!1}),H(e,{path:B({x:0,y:0,rx:22,ry:lh}),fill:z.cream}),H(e,{path:B({x:14,y:-5,rx:9,ry:9}),fill:z.cream}),H(e,{path:B({x:6,y:-1,rx:14,ry:10}),fill:z.cream,outline:!1,highlight:!1}),_h(e,{x:-4,y:-7}),t||(H(e,{path(e){e.moveTo(8,-3).bezierCurveTo(0,-9,-14,-8,-27,-2).lineTo(-19,5).bezierCurveTo(-8,8,2,6,8,-3).closePath()},fill:z.sage,outlineScale:.9}),H(e,{path:Nu([[-27,-2],[-19,5],[-14,1],[-20,-3]]),fill:z.walnut,outline:!1,highlight:!1})),H(e,{path:Nu([[21,-8],[34,-4],[21,-1]]),fill:z.pumpkin,outlineScale:.85}),H(e,{path:B({x:27,y:-3.2,rx:1.3,ry:1.3}),fill:z.tomato,outline:!1,highlight:!1}),i%3.1<.1?U(e,{path:gh({fromX:14,fromY:-8,toX:19,toY:-8}),color:z.bark,width:1.5}):(H(e,{path:B({x:17,y:-8,rx:2.5,ry:2.5}),fill:z.bark,outline:!1,highlight:!1}),H(e,{path:B({x:17.8,y:-8.8,rx:.9,ry:.9}),fill:`#ffffff`,outline:!1,highlight:!1})),n&&(U(e,{path:gh({fromX:36,fromY:-3,toX:40,toY:0}),color:z.pine,width:1.2}),H(e,{path:B({x:36,y:-3,rx:5,ry:2.5}),fill:z.moss,outlineScale:.5})),{bob:s,rotation:c,phase:a,flapAmount:o}}findPotato(e){if(e!==0){for(let t of this.state.entityStore.getEntities(Om))if(t.params.potatoId===e)return t}}pickNewTarget(){let t=new Set;for(let n of this.state.entityStore.getEntities(e))n!==this&&n.params.phase===vh.approach&&t.add(n.params.targetPotatoId);let n;for(let e of this.state.entityStore.getEntities(Om))e.params.served||e.params.carriedBySeagull||t.has(e.params.potatoId)||e.params.dropInMs>0||e.params.size===Hp.King||(!n||e.params.distancePx>n.params.distancePx)&&(n=e);return n}startEscape(){let e=sh(this.params);this.params.phase=vh.escape,this.params.escapeX=e.x,this.params.escapeY=e.y}takeHit(e){if(this.params.hp<=0||(this.params.hp-=e,this.params.hp>0))return;let t=this.findPotato(this.params.carryingPotatoId);t&&(t.params.carriedBySeagull=!1,t.view.pivot.set(0,0)),Tp(this.state.runState,{amount:vc.bountyCoins,reason:`Seagull bonk`,x:this.params.x,y:this.params.y}),this.destroy()}feedCricket(){if(this.params.hp<=0||this.params.fed)return;let e=this.findPotato(this.params.carryingPotatoId);e&&(e.params.carriedBySeagull=!1,e.view.pivot.set(0,0)),this.params.fed=!0,this.params.carryingPotatoId=0,this.params.targetPotatoId=0,this.startEscape(),Tp(this.state.runState,{amount:vc.bountyCoins,reason:`Seagull fed`,x:this.params.x,y:this.params.y})}moveToward({goal:e,msSinceLastExecute:t,routeKey:n}){if(this.params.flying)return ch({from:this.params,to:e,stepPx:vc.flySpeedPxPerMs*t});let r=Km({level:this.state.level,point:this.params,beltSpeedPxPerMs:this.state.runState.beltSpeedPxPerMs,msSinceLastExecute:t});for(this.params.onBelt=r.onBelt,this.msSinceRepath+=t,(!this.route||this.routeKey!==n||this.wasOnBelt&&!r.onBelt||this.msSinceRepath>=Gm.repathMs)&&(this.route=this.computeRoute(e),this.routeKey=n,this.msSinceRepath=0),this.wasOnBelt=r.onBelt;this.route.length>0&&Math.hypot((this.route[0]?.x??0)-this.params.x,(this.route[0]?.y??0)-this.params.y)<=Gm.waypointReachedPx;)this.route.shift();let i=this.route[0]??e,a=r.onBelt?Gm.hopSpeedPxPerMs:vc.walkSpeedPxPerMs,o=ch({from:this.params,to:i,stepPx:a*t});return{x:o.x+r.dx,y:o.y+r.dy}}computeRoute(e){let t=eh(this.state.level),n=Jm({grid:t,point:this.params}),r=this.params.phase===vh.escape,i=Jm({grid:t,point:e}),a=ih(r?{grid:t,start:n,isGoal(e){return Xm({grid:t,cell:e})},heuristic(e){return Zm({grid:t,cell:e})}}:{grid:t,start:n,isGoal(e){return e.col===i.col&&e.row===i.row},heuristic(e){return nh({from:e,to:i})}});if(!a)return[];let o=a.map(e=>Ym({grid:t,cell:e}));if(r){let e=o.at(-1);if(e){let t=sh(e);this.params.escapeX=t.x,this.params.escapeY=t.y}return o}return o.pop(),o}update({msSinceLastExecute:e}){if(this.params.hp<=0)return;if(this.params.phase===vh.approach){let t=this.findPotato(this.params.targetPotatoId);if((!t||t.params.served||t.params.carriedBySeagull||t.params.dropInMs>0)&&(t=this.pickNewTarget(),this.params.targetPotatoId=t?.params.potatoId??0),!t){this.startEscape();return}let n=this.moveToward({goal:t.params,msSinceLastExecute:e,routeKey:`${this.params.phase}:${this.params.targetPotatoId}`});this.params.x=n.x,this.params.y=n.y,Math.hypot(t.params.x-n.x,t.params.y-n.y)<=vc.grabRadiusPx&&(t.params.carriedBySeagull=!0,this.params.carryingPotatoId=t.params.potatoId,this.startEscape());return}let t=this.moveToward({goal:{x:this.params.escapeX,y:this.params.escapeY},msSinceLastExecute:e,routeKey:this.params.phase});this.params.x=t.x,this.params.y=t.y;let n=this.findPotato(this.params.carryingPotatoId);n&&(n.params.x=t.x,n.params.y=t.y),t.x===this.params.escapeX&&t.y===this.params.escapeY&&(n&&(n.destroy(),Pp(this.state.runState)),this.destroy())}render(){let{flipper:e,hpBar:t,shadow:n}=this;if(!e||!t||!n)return;let{x:r,carryingPotatoId:i,flying:a,hp:o}=this.params;i!==0&&this.lastSeenCarryingId===0&&this.state.runState.status===W.Playing&&Qc(Vc.Squawk),this.lastSeenCarryingId=i,this.lastSeenX!=null&&r!==this.lastSeenX&&(this.facing=r>this.lastSeenX?1:-1),this.lastSeenX=r;let{bob:s,rotation:c,phase:l,flapAmount:u}=this.drawGull(),d=this.params.onBelt?Math.abs(Math.sin(this.state.runState.elapsedMs/Gm.hopCycleMs*Math.PI)):0;e.scale.set(this.facing*(1+Gm.hopSquash*(.5-d)),this.params.onBelt?1-Gm.hopSquash*(.5-d):1),e.y=s-d*Gm.hopHeightPx,e.rotation=c,a&&(n.scale.set(1+.2*u),n.alpha=.75-.25*u);let f=this.findPotato(i);f&&f.view.pivot.set(-(this.facing*2+Math.sin(l*.5)*4),-(e.y+fh)),this.drawnHp!==o&&(this.drawnHp=o,t.clear(),o<vc.hp)&&(t.rect(-20,-39,40,6).fill({color:`rgba(0,0,0,0.6)`}),t.rect(-20,-39,40*Math.max(0,o)/vc.hp,6).fill({color:`#e53935`}))}};function bh(e){return!e.served&&!e.carriedBySeagull&&e.dropInMs<=0&&e.mashHp>0}function xh(e,t){let n=t.map((e,t)=>({candidate:e,index:t})).filter(({candidate:t})=>Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0),r=e.appliesEffect,i=r?n.filter(({candidate:e})=>!e.processing[r]):[],a=i.length>0?i:n,o=-1,s=-1/0;for(let{candidate:e,index:t}of a)e.distancePx>s&&(o=t,s=e.distancePx);return o}function Sh(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&t.processing.mashHp>0&&n.push(r)}),n}function Ch(e,t){let n=[];return t.forEach((t,r)=>{Math.hypot(t.x-e.x,t.y-e.y)<=e.rangePx&&n.push(r)}),n}function wh(e,t){let n=-1,r=!1,i=1/0;for(let a of Ch(e,t)){let o=t[a];if(!o)continue;let s=Math.hypot(o.x-e.x,o.y-e.y);(n<0||o.carrying&&!r||o.carrying===r&&s<i)&&(n=a,r=o.carrying,i=s)}return n}function Th(e,t){let n=e.rangePx+1e-6;return Math.abs(t.x-e.x)<=n&&Math.abs(t.y-e.y)<=n}function Eh(e,t){let n=t.map((e,t)=>({gull:e,index:t})).filter(({gull:e})=>!e.fed&&e.hp>0);return n[wh(e,n.map(({gull:e})=>e))]?.index??-1}function Dh(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=af(e.params.towerType,e.params.level,e.params.wear),r=[...e.state.entityStore.getEntities(yh)],i=r[Eh({x:e.params.x,y:e.params.y,rangePx:n.rangePx},r.map(e=>({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0,fed:e.params.fed,hp:e.params.hp})))];i&&(i.feedCricket(),e.params.wear=Qd({wear:e.params.wear,amount:$d(e.params.towerType)}),e.params.cooldownRemainingMs=n.cooldownMs,e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=i.params.x,e.params.lastTargetY=i.params.y)}var Oh={rotationMs:5e3,pushBackPx:120,debounceMs:600,armHalfWidthPx:8};function kh(e){return(e.elapsedMs-e.builtAtMs)/Oh.rotationMs*Math.PI*2}function Ah({center:e,angle:t,lengthPx:n}){return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function jh({point:e,a:t,b:n}){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a===0?0:Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a));return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}function Mh({potato:e,potatoRadius:t,armStart:n,armEnd:r,lastSwipedAtMs:i,elapsedMs:a}){let o=jh({point:e,a:n,b:r})<=Oh.armHalfWidthPx+t,s=i>=0&&a-i<Oh.debounceMs;return o&&!s}function Nh(e,t){e.params.wear=Qd({wear:e.params.wear,amount:ef(e.params.towerType)*t/1e3});let{elapsedMs:n}=e.state.runState,r={x:e.params.x,y:e.params.y},i=Ah({center:r,angle:kh({elapsedMs:n,builtAtMs:e.params.builtAtMs}),lengthPx:af(e.params.towerType,e.params.level).rangePx});for(let t of e.state.entityStore.getEntities(Om)){let{params:a}=t;if(!bh(a)||a.size===Hp.King||!Mh({potato:a,potatoRadius:uc[a.size].radius,armStart:r,armEnd:i,lastSwipedAtMs:a.lastSwipedAtMs,elapsedMs:n}))continue;a.distancePx=Math.max(0,a.distancePx-Oh.pushBackPx*Xd(e.params.wear));let o=Gu({path:Yu(e.state.level,a.pathId),distancePx:a.distancePx,offsetPx:a.laneOffsetPx});a.x=o.x,a.y=o.y,a.lastSwipedAtMs=n,e.params.lastProcessedAtMs=n}}function Ph({origin:e,angleDeg:t,lengthPx:n}){let r=t*Math.PI/180;return{start:{x:e.x,y:e.y},end:{x:e.x+Math.cos(r)*n,y:e.y+Math.sin(r)*n}}}function Fh(e,t){let n;for(let r of e.paths){let e=Ju(r,t);(!n||e.distance<n.distance)&&(n={distance:e.distance,target:Wu(r,e.alongPx)})}return!n||n.distance===0?0:Math.atan2(n.target.y-t.y,n.target.x-t.x)*180/Math.PI}function Ih({point:e,radius:t,segment:n}){return jh({point:e,a:n.start,b:n.end})<=lc.lineHalfWidthPx+t}function Lh(e,t){if(e.params.cooldownRemainingMs=Math.max(0,e.params.cooldownRemainingMs-t),e.params.cooldownRemainingMs>0)return;let n=af(e.params.towerType,e.params.level,e.params.wear),r=Ph({origin:{x:e.params.x,y:e.params.y},angleDeg:e.params.angleDeg,lengthPx:n.rangePx}),i=!1;for(let t of e.state.entityStore.getEntities(Om)){if(!bh(t.params)||!Ih({point:t.params,radius:uc[t.params.size].radius,segment:r}))continue;i=!0,t.recordHit({towerType:e.params.towerType,tower:e.params});let n=t.getProcessing();$f(n,e.params.towerType,e.params),t.params.cut=n.cut,t.params.cooked=n.cooked,t.params.mashHp=n.mashHp}for(let t of e.state.entityStore.getEntities(yh))t.params.hp>0&&!t.params.fed&&Ih({point:t.params,radius:0,segment:r})&&(i=!0,t.takeHit(n.damage));e.params.cooldownRemainingMs=n.cooldownMs,i&&(e.params.wear=Qd({wear:e.params.wear,amount:$d(e.params.towerType)}),e.params.lastProcessedAtMs=e.state.runState.elapsedMs,e.params.lastTargetX=r.end.x,e.params.lastTargetY=r.end.y)}function Rh({origin:e,aimAt:t,point:n,lengthPx:r,halfAngleDeg:i}){let a=n.x-e.x,o=n.y-e.y,s=Math.hypot(a,o);if(s>r)return!1;if(s===0)return!0;let c=Math.atan2(t.y-e.y,t.x-e.x),l=Math.atan2(o,a)-c;return l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)<=i*Math.PI/180+1e-9}function zh(e,t){let{rangePx:n}=af(e.params.towerType,e.params.level),r=rf(e.params.level)*Xd(e.params.wear),i={x:e.params.x,y:e.params.y},a=[];for(let t of e.state.entityStore.getEntities(Om))bh(t.params)&&a.push(t);let o;for(let e of a)Math.hypot(e.params.x-i.x,e.params.y-i.y)<=n&&(!o||e.params.distancePx>o.params.distancePx)&&(o=e);if(!o)return;let s={x:o.params.x,y:o.params.y},c=t/1e3;e.params.wear=Qd({wear:e.params.wear,amount:ef(e.params.towerType)*c});for(let t of a)Rh({origin:i,aimAt:s,point:t.params,lengthPx:n,halfAngleDeg:qd.microwaveConeHalfAngleDeg})&&(t.recordHit({towerType:e.params.towerType,tower:e.params,minIntervalMs:wc.continuousHitIntervalMs}),t.params.mashHp=Math.max(0,t.params.mashHp-qd.microwaveDamagePerSecond*r*c),t.params.quality=Math.max(0,t.params.quality-qd.microwaveQualityPerSecond*c));e.params.lastTargetX=s.x,e.params.lastTargetY=s.y,e.params.lastProcessedAtMs=e.state.runState.elapsedMs}function Bh({level:e,towers:t,point:n,slot:r=0}){let i=yc.radius;if(n.x<i||n.x>O.width-i||n.y<i||n.y>O.height-i)return{valid:!1,reason:`Out of bounds`};if(e.paths.some(e=>qu(e,n)<e.widthPx/2+i))return{valid:!1,reason:`Too close to the path`};if(new Set(e.paths.map(e=>e.ownerSlot)).size>1&&!e.paths.some(e=>e.ownerSlot===r&&qu(e,n)<=yc.buildRadiusNearOwnPathPx))return{valid:!1,reason:`Too far from your path`};let{restaurant:a}=e,o=a.sizePx/2+i;return Math.abs(n.x-a.x)<o&&Math.abs(n.y-a.y)<o?{valid:!1,reason:`On the restaurant`}:t.some(e=>Math.hypot(e.x-n.x,e.y-n.y)<2*i)?{valid:!1,reason:`Too close to another tower`}:{valid:!0}}function Vh(e,t){return e>=Oc.towerCost[t]}function Hh({tower:e,pointerWorld:t,selectedTowerType:n,selectedTowerId:r}){return r!=null&&r===e.towerId||n===e.towerType||!!t&&Math.hypot(t.x-e.x,t.y-e.y)<=yc.radius}var Uh={[q.Knife]:Vc.Chop,[q.Boiler]:Vc.Boil,[q.Masher]:Vc.Squish,[q.Microwave]:Vc.Boil,[q.CricketTrap]:Vc.Build,[q.Swiper]:Vc.Chop,[q.Laser]:Vc.Chop},Wh=5,Gh=16,Kh=8,qh=44,Jh=6,Yh=class extends Gf({key:`TowerEntity`,paramsShape:En(Cs,t({towerType:Le(q),towerId:0,level:1,builtAtMs:0,ownerSlot:0,cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:0,wear:0})),paramsMap:{hitbox:{x:!0,y:!0},view:{x:!0,y:!0}}}){rangeView;body;baseView;drawnPose;drawnWear=-1;pips;selection;wearBar;cracks;wrench;padlock;drawnLocked=!1;drawnLevel=0;lastSeenProcessedAtMs;createView(){let e=new mt;if(Lp(this.state.runState)>1){let t=new M;t.circle(0,0,yc.radius+6).stroke({color:Ip(this.params.ownerSlot),width:6}),e.addChild(t)}let t=new M;e.addChild(t);let n=new M;Nf(n,this.params.towerType),n.visible=Mf(this.params.towerType),e.addChild(n);let r=new M;e.addChild(r);let i=new M;e.addChild(i);let a=new M;e.addChild(a);let o=new M;e.addChild(o);let s=new M,c=yc.radius;return s.moveTo(-c*.6,-c*.7).lineTo(-c*.1,-c*.1).lineTo(-c*.3,c*.2).lineTo(c*.2,c*.8).moveTo(c*.7,-c*.5).lineTo(c*.2,-c*.05).lineTo(c*.5,c*.4).stroke({color:z.bark,width:3,cap:`round`,join:`round`}),s.visible=!1,e.addChild(s),this.rangeView=t,this.body=r,this.baseView=n,this.drawnPose=void 0,this.drawnWear=-1,this.pips=a,this.wearBar=o,this.cracks=s,this.wrench=void 0,this.selection=i,this.drawnLevel=0,{view:e}}update({msSinceLastExecute:e}){let{behavior:t}=J[this.params.towerType];if(!vp(this.params.towerType,hp(this.state.runState.prestigePoints)))return;if(t===`gull-trap`){Dh(this,e);return}if(t===`cone`){zh(this,e);return}if(t===`swipe`){Nh(this,e);return}if(t===`line`){Lh(this,e);return}if(this.params.cooldownRemainingMs=Math.max(0,this.params.cooldownRemainingMs-e),this.params.cooldownRemainingMs>0)return;let n=J[this.params.towerType],r=af(this.params.towerType,this.params.level,this.params.wear),i={x:this.params.x,y:this.params.y,rangePx:r.rangePx},a=[],o=[];for(let e of this.state.entityStore.getEntities(yh))e.params.hp>0&&!e.params.fed&&Th(i,e.params)&&(a.push(e),o.push({x:e.params.x,y:e.params.y,carrying:e.params.carryingPotatoId!==0}));let s=(n.areaOfEffect?Ch(i,o):[wh(i,o)].filter(e=>e>=0)).flatMap(e=>a[e]??[]);if(!n.areaOfEffect&&s[0]){let e=s[0];this.params.lastTargetX=e.params.x,this.params.lastTargetY=e.params.y,e.takeHit(r.damage),this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs;return}let c=[],l=[];for(let e of this.state.entityStore.getEntities(Om))bh(e.params)&&Th(i,e.params)&&(c.push(e),l.push({x:e.params.x,y:e.params.y,distancePx:e.params.distancePx,processing:e.getProcessing()}));if(n.areaOfEffect){let e=Sh({x:this.params.x,y:this.params.y,rangePx:r.rangePx},l);if(e.length===0&&s.length===0)return;for(let e of s)e.takeHit(r.damage);for(let t of e){let e=c[t];if(!e)continue;e.recordHit({towerType:this.params.towerType,tower:this.params});let n=e.getProcessing();$f(n,this.params.towerType,this.params),e.params.cut=n.cut,e.params.cooked=n.cooked,e.params.mashHp=n.mashHp}this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs;let t=[...e.flatMap(e=>c[e]??[]),...s],n=Math.max(1,t.length);this.params.lastTargetX=t.reduce((e,t)=>e+t.params.x,0)/n,this.params.lastTargetY=t.reduce((e,t)=>e+t.params.y,0)/n;return}let u=c[xh({x:this.params.x,y:this.params.y,rangePx:r.rangePx,appliesEffect:n.appliesEffect},l)];if(!u)return;u.recordHit({towerType:this.params.towerType,tower:this.params});let d=u.getProcessing();$f(d,this.params.towerType,this.params),u.params.cut=d.cut,u.params.cooked=d.cooked,u.params.mashHp=d.mashHp,this.wearFromUse(),this.params.cooldownRemainingMs=r.cooldownMs,this.params.lastProcessedAtMs=this.state.runState.elapsedMs,this.params.lastTargetX=u.params.x,this.params.lastTargetY=u.params.y}wearFromUse(){this.params.wear=Qd({wear:this.params.wear,amount:$d(this.params.towerType)})}renderLock(){let{body:e}=this,t=!vp(this.params.towerType,hp(this.state.runState.prestigePoints));if(t===this.drawnLocked)return;this.drawnLocked=t;let n=t?7829367:16777215;if(e&&(e.tint=n),this.baseView&&(this.baseView.tint=n),t&&!this.padlock){let e=new es({text:`🔒`,style:{fontSize:26}});e.anchor.set(.5),e.y=-yc.radius-14,this.view.addChild(e),this.padlock=e}this.padlock&&(this.padlock.visible=t)}renderWear(){let{wearBar:e,cracks:t,body:n}=this;if(!e||!t||!n)return;let{wear:r}=this.params,i=r>=Yd.maxWear,a=yc.radius;if(this.drawnWear!==r&&(this.drawnWear=r,this.drawWearBar()),t.visible=i,n.alpha=i?.75:1,this.baseView&&(this.baseView.alpha=n.alpha),i){let e=this.getWrench();e.visible=!0,e.y=-a-22+Math.sin(this.state.runState.elapsedMs/200)*5}else this.wrench&&(this.wrench.visible=!1)}getWrench(){if(!this.wrench){let e=new es({text:`🔧`,style:{fontSize:28}});e.anchor.set(.5),this.view.addChild(e),this.wrench=e}return this.wrench}drawWearBar(){let{wearBar:e}=this;if(!e)return;let{wear:t}=this.params,n=yc.radius;if(e.clear(),t>0){let r=n+Kh+14+Wh+6,i=t/Yd.maxWear;H(e,{path:V({x:-22,y:r,width:qh,height:Jh,radius:Jh/2}),fill:z.walnut,highlight:!1,outlineScale:.6}),H(e,{path:V({x:-22,y:r,width:Math.max(Jh,qh*i),height:Jh,radius:Jh/2}),fill:i<.5?z.meadow:i<.85?z.butter:z.tomato,outline:!1})}}drawLevelParts(){let{rangeView:e,pips:t,selection:n}=this;if(!e||!t||!n)return;let{towerType:r,level:i}=this.params,a=J[r],{rangePx:o}=af(r,i);if(this.drawnLevel=i,a.behavior===`line`){let t=Ph({origin:{x:0,y:0},angleDeg:this.params.angleDeg,lengthPx:o});e.clear().moveTo(t.start.x,t.start.y).lineTo(t.end.x,t.end.y).stroke({color:r===q.Laser?lc.laserColor:lc.lineColor,alpha:lc.lineAlpha,width:lc.lineWidthPx,cap:`round`})}else e.clear().circle(0,0,o).fill({color:a.color,alpha:.1}).stroke({color:z.cream,alpha:.45,width:3});t.clear();for(let e=0;e<i;e++)H(t,{path:B({x:(e-(i-1)/2)*Gh,y:yc.radius+Kh+14,rx:Wh,ry:Wh}),fill:z.butter,outlineScale:.6});U(n.clear(),{path(e){e.circle(0,0,yc.radius+Kh)},color:z.cream,width:4,outline:!0})}throwProjectile(){let{towerType:e,level:t,x:n,y:r,lastTargetX:i,lastTargetY:a,lastProcessedAtMs:o}=this.params,s;e===q.Masher?s=t>=xc.hammerLevel?km.Hammer:km.Masher:e===q.Boiler?s=km.Water:e===q.CricketTrap&&(s=km.Cricket),s&&Vm({kind:s,from:{x:n,y:r},to:{x:i,y:a},startMs:o})}render(){let{body:e,rangeView:t}=this;if(!e||!t)return;this.drawnLevel!==this.params.level&&this.drawLevelParts(),t.visible=J[this.params.towerType].behavior===`line`||Hh({tower:this.params,pointerWorld:this.state.ui.pointerWorld,selectedTowerType:this.state.ui.selectedTowerType,selectedTowerId:this.state.ui.selectedTowerId}),this.renderWear(),this.renderLock(),this.selection&&(this.selection.visible=this.state.ui.selectedTowerId===this.params.towerId);let{lastProcessedAtMs:n,lastTargetX:r,lastTargetY:i,x:a,y:o,towerType:s}=this.params,{elapsedMs:c}=this.state.runState;this.lastSeenProcessedAtMs!=null&&n!==this.lastSeenProcessedAtMs&&n>=0&&this.state.runState.status===W.Playing&&(Qc(Uh[s]),this.throwProjectile()),this.lastSeenProcessedAtMs=n;let l=bc.activeRedrawMs,u=Math.floor((c-n)/l)*l,d=bc.attackMs[s],f=n>=0&&u>=0&&u<d?u/d:-1,p=f<0&&J[s].behavior!==`swipe`?Math.floor(c/bc.idleRedrawMs)*bc.idleRedrawMs:Math.floor(c/l)*l,m=Ph({origin:{x:a,y:o},angleDeg:this.params.angleDeg,lengthPx:af(s,this.params.level).rangePx}).end,h=J[s].behavior===`line`,g={x:(h?m.x:r)-a,y:(h?m.y:i)-o},_={towerType:s,attack:f,timeSec:p/1e3,aimX:g.x,aimY:g.y,rangePx:af(s,this.params.level).rangePx,swiperAngle:kh({elapsedMs:Math.floor(c/l)*l,builtAtMs:this.params.builtAtMs}),skipBase:!0},v=this.drawnPose;v&&v.attack===_.attack&&v.timeSec===_.timeSec&&v.aimX===_.aimX&&v.aimY===_.aimY&&v.rangePx===_.rangePx&&v.swiperAngle===_.swiperAngle||(this.drawnPose=_,Ff(e,_))}};function Xh({accumulator:e,speed:t}){let n=e+t,r=Math.floor(n);return{steps:r,accumulator:n-r}}function Zh(e){return _d(e)?1:e.speed}function Qh(e){return jc.speeds.includes(e)}function $h(e){let t=jc.speeds.indexOf(e);return jc.speeds[(t+1)%jc.speeds.length]??jc.speeds[0]}function eg(e){return`${e}x`}function tg(e){return!_d(e.runState)||gd(e.runState,e.multiplayerP2pLockStep?.multiplayerController.getClientId())===0}var ng=new WeakMap;function rg(e){let t=ng.get(e);if(t)return t;let n={selectTowerType(t){(!t||gp(t,hp(e.runState?.prestigePoints??0)))&&e.ui&&(e.ui.selectedTowerType=t,e.ui.selectedTowerId=void 0,e.ui.selectedTopping=void 0)},selectTopping(t){e.ui&&(e.ui.selectedTopping=t,e.ui.selectedTowerType=void 0,e.ui.selectedTowerId=void 0)},selectTower(t){e.ui&&(e.ui.selectedTowerId=t,e.ui.selectedTowerType=void 0,e.ui.selectedTopping=void 0)},upgradeTower(t){K(e,{type:G.UpgradeTower,towerId:t})},serviceTower(t){K(e,{type:G.ServiceTower,towerId:t})},sellTower(t){K(e,{type:G.SellTower,towerId:t}),e.ui&&(e.ui.selectedTowerId=void 0)},beginRun(){K(e,{type:G.BeginRun})},togglePause(){K(e,{type:G.TogglePause})},cycleSpeed(){_d(e.runState)||K(e,{type:G.SetSpeed,speed:$h(e.runState?.speed??1)})},speedUntilIncome(){_d(e.runState)||((e.runState?.speed??1)===1&&K(e,{type:G.SetSpeed,speed:jc.untilIncomeSpeed}),K(e,{type:G.ArmSpeedReset}))},setVolume:Bc,startSingleplayer(){Rd(e)},openRooms(){zd(e)},closeRooms(){Bd(e)},createRoom(t,n){Ud(e,{name:t,password:n})},joinRoom(t,n){Wd(e,t,n)},leaveRoom(){Gd(e)},selectLevel(t){tg(e)&&(Vu(ud(t),1)&&pd(t),K(e,{type:G.StartRun,seed:nn(),ready:!0,levelId:t,mode:e.runState?.mode}))},selectMode(t){tg(e)&&K(e,{type:G.StartRun,seed:nn(),ready:!0,levelId:e.runState?.levelId??ld.levelId,mode:t})},goToMainMenu(){K(e,{type:G.StartRun,seed:nn(),ready:!0,levelId:e.runState?.levelId??ld.levelId,mode:e.runState?.mode})},restartRun(){tg(e)&&K(e,{type:G.StartRun,seed:nn(),levelId:e.runState?.levelId??ld.levelId,mode:e.runState?.mode})}};return ng.set(e,n),n}var ig={potatoBase:8,potatoPerWave:3,spawnIntervalBaseMs:3500,spawnIntervalPerWaveMs:180,spawnIntervalMinMs:700,speedBase:.07,speedPerWave:.004,speedMax:.14,largeWeightPerWave:.05,largeWeightMax:.7,smallWeightStart:.5,smallWeightPerWave:.05,toughFromWave:2,toughSharePerWave:.07,toughShareMax:.85,softMix:{red:.25,russet:.45,yukon:.3},toughMix:{toughSkinned:.4,sweet:.3,yam:.3},eyesChancePerWave:.03,eyesChanceMax:.4,wavesPerSeagull:2,chuteSharePerWave:.05,chuteShareMax:.35,clumpChancePerWave:.04,clumpChanceMax:.4,wavesPerClumpExtra:3,clumpMaxExtraMax:5,extraSpawnsPerWave:.015,extraSpawnsMax:.15,bossEveryWaves:5,orders:{wavesPerOpenOrder:3,maxOpenBase:1,maxOpenMax:4,intervalBaseMs:12e3,intervalPerWaveMs:500,intervalMinMs:5e3,lifetimeBaseMs:35e3,lifetimePerWaveMs:1e3,lifetimeMinMs:18e3,allDishesFromWave:3}},ag={storageKey:`colcannon-fodder-records`,hallSize:5};function og(e,t,n){return`${e}|${t}|${n}`}function sg(){return{bestScore:0,bestStars:0,wins:0,champs:0,bestWaves:0}}function cg(){return{levels:{},coop:{},hall:[]}}function lg(e,t,n){return e.levels[t]?.[n]??sg()}function ug(e,t){let n=t.playerCount??1;return n>1?e.coop[og(t.levelId,t.mode,n)]??sg():lg(e,t.levelId,t.mode)}function dg(e){return typeof e==`number`&&Number.isFinite(e)&&e>0?e:0}function fg(e){return typeof e==`object`&&e?e:{}}function pg(e){let t=fg(e);return{bestScore:dg(t.bestScore),bestStars:dg(t.bestStars),wins:dg(t.wins),champs:dg(t.champs),bestWaves:dg(t.bestWaves)}}function mg(e){let t=fg(e),n=t.mode;if(!(typeof t.levelId!=`string`||n!==`campaign`&&n!==`endless`))return{levelId:t.levelId,mode:n,score:dg(t.score),stars:dg(t.stars),dateMs:dg(t.dateMs)}}function hg(e){let t=cg();if(!e)return t;try{let n=fg(JSON.parse(e));for(let[e,r]of Object.entries(fg(n.levels))){let n=fg(r);t.levels[e]={campaign:pg(n.campaign),endless:pg(n.endless)}}for(let[e,r]of Object.entries(fg(n.coop)))t.coop[e]=pg(r);Array.isArray(n.hall)&&(t.hall=n.hall.map(mg).filter(e=>!!e).slice(0,ag.hallSize))}catch{return cg()}return t}function gg(e,t){let n=ug(e,t);return t.score>n.bestScore||t.stars>n.bestStars||t.mode===`endless`&&t.wavesReached>n.bestWaves}function _g(e){return e.won&&e.stars>=qd.mashChampStars}function vg(e,t){let n=t.playerCount??1,r=ug(e,t),i={bestScore:Math.max(r.bestScore,t.score),bestStars:Math.max(r.bestStars,t.stars),wins:r.wins+ +!!t.won,champs:r.champs+ +!!_g(t),bestWaves:Math.max(r.bestWaves,t.wavesReached)};if(n>1)return{...e,coop:{...e.coop,[og(t.levelId,t.mode,n)]:i}};let a=e.levels[t.levelId],o=[...e.hall];return t.score>0&&o.push({levelId:t.levelId,mode:t.mode,score:t.score,stars:t.stars,dateMs:t.dateMs}),o.sort((e,t)=>t.score-e.score||t.stars-e.stars||e.dateMs-t.dateMs),{levels:{...e.levels,[t.levelId]:{campaign:a?.campaign??sg(),endless:a?.endless??sg(),[t.mode]:i}},coop:e.coop,hall:o.slice(0,ag.hallSize)}}function yg(e){for(let t of sd)try{let n=Number(globalThis.localStorage.getItem(`colcannon-fodder-endless-best:${t.levelId}`)??0);if(Number.isFinite(n)&&n>0){let r=e.levels[t.levelId]??{campaign:sg(),endless:sg()};r.endless.bestWaves=Math.max(r.endless.bestWaves,n),e.levels[t.levelId]=r}}catch{return}}var bg;function xg(){if(!bg){try{bg=hg(globalThis.localStorage.getItem(ag.storageKey))}catch{bg=cg()}yg(bg)}return bg}var Sg=new WeakMap;function Cg(e,t){if(e.status!==W.Won&&e.status!==W.Lost)return;let n=Sg.get(e);if(n!=null)return n;let r={levelId:e.levelId,mode:e.mode,won:e.status===W.Won,dateMs:Date.now(),...t},i=xg(),a=gg(i,r);bg=vg(i,r),Sg.set(e,a);try{globalThis.localStorage.setItem(ag.storageKey,JSON.stringify(bg))}catch{}return a}function wg(e){let t=ig,n=Math.min(t.toughShareMax,Math.max(0,t.toughSharePerWave*(e-t.toughFromWave))),r=1-n;return cc({[L.Red]:r*t.softMix.red,[L.Russet]:r*t.softMix.russet,[L.Yukon]:r*t.softMix.yukon,[L.ToughSkinned]:n*t.toughMix.toughSkinned,[L.Sweet]:n*t.toughMix.sweet,[L.Yam]:n*t.toughMix.yam})}function Tg(e){let t=ig,n=Math.min(t.largeWeightMax,t.largeWeightPerWave*e),r=Math.max(0,t.smallWeightStart-t.smallWeightPerWave*e);return{potatoCount:t.potatoBase+t.potatoPerWave*e,hpMultiplier:1,spawnIntervalMs:Math.max(t.spawnIntervalMinMs,t.spawnIntervalBaseMs-t.spawnIntervalPerWaveMs*e),speedPxPerMs:Math.min(t.speedMax,t.speedBase+t.speedPerWave*e),sizeWeights:{small:r,medium:Math.max(0,1-n-r),large:n},varietyWeights:wg(e),eyesChance:Math.min(t.eyesChanceMax,t.eyesChancePerWave*e),seagullCount:Math.floor(e/t.wavesPerSeagull),chuteShare:Math.min(t.chuteShareMax,t.chuteSharePerWave*e),clumpChance:Math.min(t.clumpChanceMax,t.clumpChancePerWave*e),clumpMaxExtra:Math.min(t.clumpMaxExtraMax,Math.floor(e/t.wavesPerClumpExtra)),extraSpawnsPerSecond:Math.min(t.extraSpawnsMax,t.extraSpawnsPerWave*e),bossCount:+(e%t.bossEveryWaves===0),bossHp:np(Math.max(0,e/t.bossEveryWaves-1)),orders:{maxOpen:Math.min(t.orders.maxOpenMax,t.orders.maxOpenBase+Math.floor(e/t.orders.wavesPerOpenOrder)),intervalMs:Math.max(t.orders.intervalMinMs,t.orders.intervalBaseMs-t.orders.intervalPerWaveMs*e),lifetimeMs:Math.max(t.orders.lifetimeMinMs,t.orders.lifetimeBaseMs-t.orders.lifetimePerWaveMs*e),dishes:e>=t.orders.allDishesFromWave?Object.values(lp):Ac.byWave[e-1]?.dishes??Object.values(lp)}}}function Eg(e,t){if(e.mode===`endless`)return Tg(t+1);let n=hc.waves[t];if(!n)return;let r=Ac.byWave[t]??Ac.byWave[Ac.byWave.length-1];return{...n,bossHp:np(0),orders:r??Tg(t+1).orders}}function Dg(e){return e.wavePhase===`spawning`?e.waveIndex+1:e.waveIndex}function Og(e,t){let n=e.ui?.selectedTowerId;if(n!=null&&e.entityStore)for(let r of e.entityStore.getEntities(Yh)){let{towerId:e,towerType:i,level:a,wear:o}=r.params;if(e===n)return{towerId:e,towerType:i,level:a,upgradeNeedsStars:a<Jd.maxLevel&&t<yp(a+1)?yp(a+1):void 0,upgradeCost:a<Jd.maxLevel?of(i,a+1):void 0,sellValue:sf(i,a),wear:Math.round(o),serviceCost:Zd(i),stats:af(i,a,o)}}}function kg(e){let t=e.runState??yd(),n=t.lastServing,r=t.lastOrderEvent,i=t.lastSteal,a=e.ui?.session??Od({enabled:!1,search:``}),o=e.multiplayerP2pLockStep?.multiplayerController.getClientId(),s=Object.values(t.scoreBySlot).reduce((e,t)=>e+t,0),c=hp(t.prestigePoints),l=t.prestigeNotice,u=l&&t.elapsedMs-l.atMs<$.noticeMs?l:void 0,d=Lp(t),f=Cg(t,{score:s,stars:c,wavesReached:Dg(t),playerCount:d});return{status:t.status,levelId:t.levelId,mode:t.mode,isBossWave:(Eg(t,t.waveIndex)?.bossCount??0)>0,wavesReached:Dg(t),records:xg(),newBest:f??!1,paused:t.paused,pausedByName:t.paused&&t.pausedBySlot!=null&&_d(t)?t.slotNames[t.pausedBySlot]??`Player ${t.pausedBySlot+1}`:void 0,isCoop:_d(t),lobbyPlayers:Object.keys(t.slotNames).map(Number).sort((e,t)=>e-t).map(e=>({slot:e,name:t.slotNames[e]??`Player ${e+1}`,color:Ip(e),connected:t.connected[e]!==!1,isYou:!!o&&t.slotByClientId[o]===e})),isSpectator:!!e.ui?.session.roomName&&Object.keys(t.slotByClientId).length>0&&!!o&&!(o in t.slotByClientId),session:{...a,rooms:a.rooms?.map(e=>({...e}))},isHost:gd(t,o)===0,simSpeedPercent:void 0,speed:t.speed,resetSpeedOnIncome:t.resetSpeedOnIncome,satisfaction:t.satisfaction,maxSatisfaction:pc.max,coins:t.coins,coinsEarned:t.coinsEarned,coinPopups:t.coinEvents.filter(e=>t.elapsedMs-e.atMs<Tc.coinPopupMs).map(e=>({id:e.id,amount:e.amount,reason:e.reason,x:e.x,y:e.y,staggerPx:e.id%Tc.coinPopupStaggerSlots*Tc.coinPopupStaggerPx})),totalScore:s,playerCount:d,contributions:Rp(t),potatoesServed:t.potatoesServed,waveNumber:t.waveIndex+1,waveCount:t.mode===`endless`?0:hc.waves.length,wavePhase:t.wavePhase,breakSecondsLeft:t.wavePhase===`break`?Math.ceil(t.breakRemainingMs/1e3):0,servingCounts:{...t.servingCounts},servingPopup:n&&t.elapsedMs-n.servedAtMs<Tc.servingPopupMs?{result:n.result,id:t.potatoesServed,scoreDelta:n.scoreDelta,satisfactionDelta:n.satisfactionDelta,prestigeDelta:n.prestigeDelta,progress:n.progress}:void 0,stealPopup:i&&t.elapsedMs-i.atMs<Tc.servingPopupMs?{satisfactionDelta:i.satisfactionDelta,prestigeDelta:i.prestigeDelta,id:i.atMs}:void 0,potatoesStolen:t.potatoesStolen,towerIconsReady:Uf(),selectedTowerType:e.ui?.selectedTowerType,selectedTopping:e.ui?.selectedTopping,selectedTower:Og(e,c),orders:t.orders.map(e=>{let n=Math.max(1,e.expiresAtMs-e.createdAtMs),r=Math.max(0,e.expiresAtMs-t.elapsedMs);return{orderId:e.orderId,dish:e.dish,secondsLeft:Math.ceil(r/1e3),fractionLeft:Math.min(1,Math.round(r/n*20)/20)}}),orderPopup:r&&t.elapsedMs-r.atMs<Tc.servingPopupMs?{kind:r.kind,dish:r.dish,scoreDelta:r.scoreDelta,satisfactionDelta:r.satisfactionDelta,prestigeDelta:r.prestigeDelta,id:r.atMs}:void 0,bossBanner:t.lastBossSpawnAtMs>=0&&t.elapsedMs-t.lastBossSpawnAtMs<tp.bannerMs?{id:t.lastBossSpawnAtMs}:void 0,prestigeStars:c,prestigePoints:Math.round(t.prestigePoints*10)/10,unlockProgress:Sp(t.prestigePoints),unlockedTowers:Object.values(q).filter(e=>gp(e,c)),prestigeBanner:u?{id:u.id,text:u.kind===`unlocked`?`🔓 ${u.towerTypes.map(e=>J[e].label).join(`, `)} unlocked!`:`🔒 ${u.towerTypes.map(e=>J[e].label).join(`, `)} locked: prestige too low`}:void 0,glowTowers:u?.kind===`unlocked`?u.towerTypes:[],tutorialHint:t.status===`playing`&&t.waveIndex===0&&c===0&&t.elapsedMs<$.tutorialHintMs&&t.levelId===sd[0]?.levelId?$.tutorialHint:void 0,muted:qc(),volumes:{...zc()}}}var Ag=`'Fredoka', sans-serif`,jg=l(Object.entries(z).map(([e,t])=>`--hud-${e}: ${t};`).join(`
`)),Mg=A`
    background: var(--hud-cream);
    border: 4px solid var(--hud-bark);
    border-radius: 18px;
    box-shadow: 0 5px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
`,Ng=A`
    background: var(--hud-wheat);
    border: 4px solid var(--hud-bark);
    border-radius: 14px;
    box-shadow: 0 4px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
`,Pg=A`
    background: var(--hud-butter);
    border-color: var(--hud-pumpkin);
`,Fg=A`
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
`,Ig=A`
    background: rgba(43, 26, 18, 0.6);
`,Lg=A`
    -webkit-text-stroke: 6px var(--hud-bark);
    font-weight: 700;
    paint-order: stroke fill;
`,Rg=Ae()({tagName:`hud-boss-banner`,styles:A`
        :host {
            display: block;
        }

        .banner {
            ${Lg}
            color: var(--hud-butter);
            font-size: 64px;
            left: 0;
            position: absolute;
            right: 0;
            text-align: center;
            top: 100px;
        }
    `,render({inputs:e}){return e.snapshot.bossBanner?E`
            <div class="banner">👑 The Russet King approaches!</div>
        `:E`
                ${j}
            `}}),zg=`display: inline-block; height: 1em; vertical-align: -0.16em; width: 1em;`;function Bg({outer:e,inner:t}){let n=[];for(let r=0;r<10;r++){let i=-Math.PI/2+r*Math.PI/5,a=r%2?t:e;n.push(`${(Math.cos(i)*a).toFixed(2)},${(Math.sin(i)*a).toFixed(2)}`)}return n.join(` `)}var Vg=Bg({outer:26,inner:12});function Hg(){return E`
        <svg style=${zg} viewBox="-26 -26 52 52">
            ${de`
                <circle r="22" fill="${z.butter}" stroke="${z.bark}" stroke-width="4" />
                <circle r="16" fill="none" stroke="${z.caramel}" stroke-width="2.5" />
                <text y="1" font-size="22" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${z.caramel}" font-family="Fredoka, sans-serif">C</text>
                <ellipse cx="-8" cy="-9" rx="6" ry="2.6" fill="#fff" fill-opacity="0.55" transform="rotate(-40 -8 -9)" />
            `}
        </svg>
    `}function Ug(e=1){let t=`star-left-half`,n=z.butter,r=z.sand;return E`
        <svg style=${zg} viewBox="-30 -30 60 60">
            ${de`
                <defs>
                    <clipPath id="${t}"><rect x="-30" y="-30" width="30" height="60" /></clipPath>
                </defs>
                <polygon points="${Vg}" fill="${e>=1?n:r}" stroke="${z.bark}" stroke-width="4.5" stroke-linejoin="round" />
                ${e>0&&e<1?de`<polygon points="${Vg}" fill="${n}" clip-path="url(#${t})" />`:``}
                ${e>0?de`<ellipse cx="-7" cy="-9" rx="5" ry="2" fill="#fff" fill-opacity="0.6" transform="rotate(-45 -7 -9)" />`:``}
            `}
        </svg>
    `}function Wg(e){return E`
        <span style="white-space: nowrap;">
            ${Array.from({length:qd.maxStars},(t,n)=>Ug(Math.max(0,Math.min(1,Math.floor((e-n)*2)/2))))}
        </span>
    `}function Gg(){return E`
        <svg style=${zg} viewBox="-40 -40 80 80">
            ${de`
                <g transform="rotate(-45) translate(0 2)">
                    <rect x="-5.5" y="-8" width="11" height="44" rx="5.5" fill="${z.slate}" stroke="${z.bark}" stroke-width="3.5" />
                    <path d="M5 -15 L5 -33 A13 13 0 1 1 -5 -33 L-5 -15 Z" fill="${z.sage}" stroke="${z.bark}" stroke-width="3.5" stroke-linejoin="round" />
                    <ellipse cx="-8" cy="-24" rx="2.5" ry="6" fill="#fff" fill-opacity="0.6" />
                </g>
            `}
        </svg>
    `}var Kg=Ae()({tagName:`hud-coin-popups`,styles:A`
        :host {
            display: block;
        }

        .popup {
            animation: float-up ${Tc.coinPopupMs}ms ease-out forwards;
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
                margin-top: -${Tc.coinPopupRisePx}px;
                opacity: 0;
            }
        }
    `,render({inputs:e}){return E`
            ${e.snapshot.coinPopups.map(e=>cr(e.id,E`
                        <div
                            class="popup"
                            style="left: ${e.x}px; top: ${e.y-Tc.coinPopupOffsetPx-e.staggerPx}px"
                        >
                            <div
                                class="amount ${e.amount>0?``:e.amount<0?`spent`:`zero`}"
                            >
                                ${e.amount>0?`+`:``}${Hg()} ${e.amount}
                            </div>
                            <div class="reason">${e.reason}</div>
                        </div>
                    `))}
        `}}),qg=1,Jg=[{towerType:q.Knife,verb:`cut`},{towerType:q.Boiler,verb:`splash & soften`},{towerType:q.Masher,verb:`mash`}],Yg=`Combo: the Knife cuts (×1.5), the Pot softens (Mashers hit ×2), then the Masher smashes (×3)`,Xg={width:192,height:108};function Zg(e){let t=Xg.width/O.width,n=e.restaurant.sizePx*t;return E`
        <svg
            class="preview"
            width=${Xg.width}
            height=${Xg.height}
            viewBox="0 0 ${Xg.width} ${Xg.height}"
        >
            ${de`<rect width="${Xg.width}" height="${Xg.height}" fill="#7f9040" />`}
            ${e.paths.map(e=>{let n=e.waypoints.map(e=>`${e.x*t},${e.y*t}`).join(` `);return de`
                    <polyline
                        points="${n}"
                        fill="none"
                        stroke="#cfc6b0"
                        stroke-width="${e.widthPx*t}"
                        stroke-linejoin="round"
                    />
                    ${(e.chutes??[]).map(n=>{let r=Wu(e,n.distancePx);return de`<circle cx="${r.x*t}" cy="${r.y*t}" r="6" fill="#e07b3f" stroke="#2b1a12" stroke-width="1.5" />`})}
                `})}
            ${de`<rect
                x="${(e.restaurant.x-e.restaurant.sizePx/2)*t}"
                y="${(e.restaurant.y-e.restaurant.sizePx/2)*t}"
                width="${n}"
                height="${n}"
                fill="#b8472f"
                stroke="#2b1a12"
                stroke-width="2"
            />`}
        </svg>
    `}function Qg(e,t){let n=lg(e.records,t,e.mode);return n.bestScore?E`
        <span class="record">
            Best ${n.bestScore.toLocaleString(`en-US`)} · ${n.bestStars} ★ · 🏆
            ${n.champs}
        </span>
    `:E`
            <span class="record">No record yet</span>
        `}function $g(e){return e.records.hall.length?E`
        <div class="hall">
            <div class="hall-title">Hall of Mash Champs</div>
            <div class="hall-list">
                ${e.records.hall.map((e,t)=>E`
                        <div class="hall-entry">
                            <div>
                                ${t+1}. ${ud(e.levelId).name} ·
                                ${e.mode===`campaign`?`Campaign`:`Endless`}
                            </div>
                            <div>
                                ${e.score.toLocaleString(`en-US`)} · ${Wg(e.stars)} ·
                                ${sr(nr(e.dateMs),`MMM d`)}
                            </div>
                        </div>
                    `)}
            </div>
        </div>
    `:j}var e_=[Yg,`Every tower mashes. The Knife cuts a short line straight across the belt. The late-game Laser is the aimable long line: aim it when you build it (scroll or [ ]) and it chops everything on that line, fast. Pots soften everything in range, so Mashers hit twice as hard.`,`Potato varieties: ${Xf.join(` `)}`,`Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.`,`Potatoes are judged the instant they arrive, so get them done done done first. Fully mashed ones make customers happy; the closer to done, the less they complain. Raw ones make them furious.`,`Seagulls swoop in to steal potatoes. Your towers can knock them out.`,`You start at zero stars with only the Knife. Serve quality mash to earn prestige: stars unlock new towers and upgrades. Poor potatoes (rubbery Microwave mash, raw or half-mashed ones, stolen ones, missed orders) cost stars, and towers lock again if you slip.`,`The Microwave is fast and cheap, but rubbery potatoes cost you prestige.`,`Towers wear out with use. Click one and press S to service it.`,`Keep satisfaction above zero through every wave to become the Mash Champ.`],t_=`1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause · F fast-forward speed · G fast-forward until the next income (volume sliders are in the pause menu) · R to restart after a run`,n_=Ae()({tagName:`hud-title`,styles:A`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${Ig}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${Mg}
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
            ${Ng}
            font-size: 28px;
            font-weight: 700;
            padding: 8px 32px;
        }

        .mode.selected {
            ${Pg}
        }

        .level-card {
            ${Ng}
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            font-weight: 400;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-card.selected {
            ${Pg}
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
            ${Fg}
        }
    `,render({inputs:e}){return e.snapshot.status!==W.Ready||e.snapshot.session.roomName?E`
                ${j}
            `:E`
            <div class="layer">
                <div class="panel">
                    <div class="title">Colcannon Fodder</div>
                    <div class="tagline">A mashed potato tower defense</div>
                    <div class="recipe">
                        ${Jg.map((e,t)=>{let n=J[e.towerType];return E`
                                ${t>0?E`
                                          <span>→</span>
                                      `:j}
                                <span class="chip">
                                    <span class="swatch" style="background: ${n.color}"></span>
                                    ${n.label}: ${e.verb}
                                </span>
                            `})}
                    </div>
                    <div class="rules">
                        ${e_.map(e=>E`
                                <div>${e}</div>
                            `)}
                    </div>
                    <div class="controls">${t_}</div>
                    <div class="modes">
                        ${[`campaign`,`endless`].map(t=>E`
                                <button
                                    ?disabled=${!e.snapshot.isHost}
                                    class="mode ${t===e.snapshot.mode?`selected`:``}"
                                    @click=${()=>{e.actions.selectMode(t)}}
                                >
                                    ${t===`campaign`?`Campaign`:`Endless`}
                                </button>
                            `)}
                    </div>
                    <div class="levels">
                        ${cd(qg).map(t=>E`
                                <button
                                    ?disabled=${!e.snapshot.isHost}
                                    class="level-card ${t.levelId===e.snapshot.levelId?`selected`:``}"
                                    @click=${()=>{e.actions.selectLevel(t.levelId)}}
                                >
                                    <span class="level-name">${t.name}</span>
                                    <span class="level-description">${t.description}</span>
                                    ${Qg(e.snapshot,t.levelId)}
                                    ${Zg(t)}
                                </button>
                            `)}
                    </div>
                    ${$g(e.snapshot)}
                    <button
                        class="start"
                        @click=${()=>{e.actions.beginRun()}}
                    >
                        Start cooking (Space)
                    </button>
                </div>
            </div>
        `}}),r_=Ae()({tagName:`hud-lobby`,styles:A`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${Ig}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${Mg}
            border-radius: 28px;
            border-width: 6px;
            padding: 20px 48px 28px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 56px;
            font-weight: 700;
        }

        .section {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
            margin: 12px 0 8px;
        }

        .players {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .player {
            align-items: center;
            border: 4px solid var(--hud-bark);
            border-radius: 14px;
            display: flex;
            font-size: 30px;
            gap: 14px;
            padding: 6px 20px;
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 34px;
            width: 34px;
        }

        .status {
            font-size: 22px;
            opacity: 0.8;
        }

        .modes,
        .levels {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 12px;
        }

        .mode {
            ${Ng}
            font-size: 28px;
            padding: 6px 28px;
        }

        .mode.selected,
        .level-card.selected {
            ${Pg}
        }

        .level-card {
            ${Ng}
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            font-weight: 400;
            gap: 8px;
            padding: 12px;
            width: 340px;
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

        .hint {
            font-size: 26px;
            margin: 8px 0 12px;
        }

        button:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .start {
            ${Fg}
        }
    `,render({inputs:e}){let{snapshot:t,actions:n}=e;if(t.status!==W.Ready||!t.session.roomName)return E`
                ${j}
            `;let r=Vu(ud(t.levelId),t.playerCount),i=cd(t.playerCount),a=t.playerCount===1?`player`:`players`,o;return o=t.isHost?i.length?r?`Everyone here will cook together.`:`Pick a map for ${t.playerCount} ${a} to start.`:`No map supports ${t.playerCount} ${a}.`:r?`Waiting for the host to start...`:`Waiting for the host to pick a map...`,E`
            <div class="layer">
                <div class="panel">
                    <div class="title">${t.session.roomName}</div>
                    <div class="section">Cooks in the kitchen</div>
                    <div class="players">
                        ${t.lobbyPlayers.map(e=>E`
                                <div class="player">
                                    <span class="swatch" style="background: ${e.color}"></span>
                                    <span>${e.name}${e.isYou?` (you)`:``}</span>
                                    <span class="status">
                                        ${e.slot===0?`Host`:`Ready`}
                                    </span>
                                </div>
                            `)}
                    </div>
                    <div class="section">
                        ${t.isHost?`Pick a map`:`Map chosen by the host`}
                    </div>
                    <div class="modes">
                        ${[`campaign`,`endless`].map(e=>E`
                                <button
                                    ?disabled=${!t.isHost}
                                    class="mode ${e===t.mode?`selected`:``}"
                                    @click=${()=>{n.selectMode(e)}}
                                >
                                    ${e===`campaign`?`Campaign`:`Endless`}
                                </button>
                            `)}
                    </div>
                    <div class="levels">
                        ${i.map(e=>E`
                                <button
                                    ?disabled=${!t.isHost}
                                    class="level-card ${e.levelId===t.levelId?`selected`:``}"
                                    @click=${()=>{n.selectLevel(e.levelId)}}
                                >
                                    <span class="level-name">${e.name}</span>
                                    <span class="level-description">${e.description}</span>
                                    ${Qg(t,e.levelId)}
                                    ${Zg(e)}
                                </button>
                            `)}
                    </div>
                    <div class="hint">${o}</div>
                    <button
                        class="start"
                        ?disabled=${!t.isHost||!r}
                        @click=${()=>{n.beginRun()}}
                    >
                        Start cooking
                    </button>
                </div>
            </div>
        `}}),i_=Ae()({tagName:`hud-mute`,styles:A`
        :host {
            display: block;
        }

        .icon {
            ${Mg}
            border-radius: 14px;
            font-size: 40px;
            line-height: 1;
            padding: 6px 10px;
            position: absolute;
            right: 344px;
            top: 16px;
        }
    `,render({inputs:e}){return e.snapshot.muted?E`
            <div class="icon">🔇</div>
        `:E`
                ${j}
            `}});function a_(e){let t=Math.floor(e);return e-t>=.5?`${`★`.repeat(t)}½${t?``:`★`}`:`★`.repeat(t)}var o_=Ae()({tagName:`hud-tower-toolbar`,styles:A`
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
            ${Mg}
            border-radius: 14px;
            font-size: 26px;
            font-weight: 500;
            padding: 4px 22px;
            white-space: nowrap;
        }

        .row {
            display: flex;
            gap: 8px;
        }

        button {
            ${Ng}
            border-radius: 16px;
            height: 110px;
            width: 176px;
        }

        button.selected {
            ${Pg}
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 4px;
            justify-content: center;
        }

        .icon {
            flex-shrink: 0;
            height: 36px;
            margin: 0;
            width: 36px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 21px;
            font-weight: 700;
            white-space: nowrap;
        }

        button.locked {
            cursor: default;
            filter: grayscale(1);
            opacity: 0.55;
        }

        .unlock-text {
            font-size: 20px;
            font-weight: 700;
            white-space: nowrap;
        }

        button.glow {
            animation: unlock-glow 0.8s ease-in-out infinite alternate;
        }

        @keyframes unlock-glow {
            from {
                box-shadow: 0 0 6px 2px #ffe27a;
            }
            to {
                box-shadow: 0 0 22px 8px #ffe27a;
            }
        }

        .banner {
            ${Mg}
            border-radius: 14px;
            font-size: 34px;
            font-weight: 700;
            padding: 6px 26px;
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
    `,render({inputs:e}){let t=e.snapshot.selectedTowerType,n=e.snapshot.selectedTopping,r=n?`Click a potato to add ${sp[n].label}. Right click or Esc to cancel.`:t?t===q.Laser?`Scroll or [ ] to aim the beam. Click beside the belt to build it.`:t===q.Knife?`The Knife cuts straight across the belt. Click beside the belt to build it.`:`Click beside the path to build a ${J[t].label}. Right click or Esc to cancel.`:Yg,i=e.snapshot.prestigeBanner;return E`
            ${i?cr(i.id,E`
                          <div class="banner">${i.text}</div>
                      `):j}
            <div class="hint">${r}</div>
            <div class="row">
                ${Object.values(q).map(n=>{let r=J[n],i=!e.snapshot.unlockedTowers.includes(n);return E`
                        <button
                            class=${[n===t?`selected`:``,i?`locked`:``,e.snapshot.glowTowers.includes(n)?`glow`:``,Vh(e.snapshot.coins,n)?``:`unaffordable`].join(` `)}
                            ${Be(`click`,()=>{i||e.actions.selectTowerType(n===t?void 0:n)})}
                        >
                            <div class="content">
                                ${i?j:E`
                                          <img class="icon" src=${Hf(n)??``} />
                                      `}
                                <div class="text">
                                    <span class="label">
                                        ${i?`🔒 `:``}${r.label}
                                    </span>
                                    ${i?E`
                                              <span class="unlock-text">
                                                  Unlocks at
                                                  ${a_(_p(n))}
                                              </span>
                                          `:E`
                                              <span class="hotkey">[${r.hotkey}]</span>
                                              <span class="cost">
                                                  ${Hg()}
                                                  ${Oc.towerCost[n]}
                                              </span>
                                          `}
                                </div>
                            </div>
                        </button>
                    `})}
            </div>
        `}});function s_(e){return e?`  ★ ${e>0?`+`:``}${Math.round(e*10)/10}`:``}var c_={[md.Perfect]:{getText(e){return`Perfect mash! +${e.scoreDelta}${s_(e.prestigeDelta)}`},color:`#c4e07a`},[md.Incomplete]:{getText(e){return`${e.progress>=.75?`Almost mashed`:e.progress>=.4?`Half-mashed`:`Barely touched`}... ${e.satisfactionDelta}${s_(e.prestigeDelta)}`},color:`#f6cf6a`},[md.Raw]:{getText(e){return`RAW POTATO! ${e.satisfactionDelta}${s_(e.prestigeDelta)}`},color:`#ff8f73`}};function l_(e){return e>.6?z.grass:e>.3?z.butter:z.tomato}var u_=Ae()({tagName:`hud-stats`,styles:A`
        :host {
            display: block;
            left: 72px;
            position: absolute;
            top: 16px;
        }

        .panel {
            ${Mg}
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

        .points {
            font-size: 22px;
            opacity: 0.7;
        }

        .unlock-bar {
            background: var(--hud-sand);
            border-radius: 4px;
            height: 8px;
            overflow: hidden;
            width: 330px;
        }

        .unlock-fill {
            background: var(--hud-pumpkin);
            height: 100%;
        }

        .hint {
            ${Lg}
            color: var(--hud-cream);
            font-size: 36px;
            left: 888px;
            position: absolute;
            top: 800px;
            transform: translateX(-50%);
            white-space: nowrap;
        }

        .players {
            border-top: 3px solid var(--hud-sand);
            display: flex;
            flex-direction: column;
            font-size: 26px;
            gap: 2px;
            margin-top: 4px;
            padding-top: 6px;
        }

        .player {
            align-items: center;
            border-left: 10px solid var(--slot-color);
            display: flex;
            gap: 12px;
            padding-left: 10px;
        }

        .player .name {
            flex: 1;
            font-weight: 600;
        }

        .wave {
            font-size: 30px;
            font-weight: 700;
        }

        /* The host is at (72, 16), so these offsets put the banner's center at world (960, 200). */
        .banner {
            ${Lg}
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
            ${Lg}
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
    `,render({inputs:e}){let t=e.snapshot,n=t.satisfaction/t.maxSatisfaction,r=t.servingPopup,i=r&&c_[r.result];return E`
            <div class="panel">
                <div class="title">Colcannon Fodder</div>
                <div class="score">Score ${t.totalScore.toLocaleString(`en-US`)}</div>
                <div class="coins">${Hg()} ${t.coins}</div>
                <div class="label">Customer satisfaction</div>
                <div class="bar-row">
                    <div class="bar">
                        <div
                            class="bar-fill"
                            style="width: ${Math.max(0,Math.min(1,n))*100}%; background: ${l_(n)}"
                        ></div>
                    </div>
                    <span>${t.satisfaction} / ${t.maxSatisfaction}</span>
                </div>
                ${t.playerCount>1?E`
                          <div class="players">
                              ${t.contributions.map(e=>E`
                                      <div class="player" style="--slot-color: ${e.color}">
                                          <span class="name">${e.name}</span>
                                          <span>${e.points.toLocaleString(`en-US`)}</span>
                                      </div>
                                  `)}
                          </div>
                      `:j}
                <div class="prestige">
                    Prestige ${Wg(t.prestigeStars)}
                    <span class="points">${t.prestigePoints}</span>
                </div>
                ${t.unlockProgress?E`
                          <div
                              class="unlock-bar"
                              title="Progress to ${a_(t.unlockProgress.nextStars)}"
                          >
                              <div
                                  class="unlock-fill"
                                  style="width: ${t.unlockProgress.fraction*100}%"
                              ></div>
                          </div>
                      `:j}
                <div class="wave">
                    Wave
                    ${t.waveNumber}${t.mode===`endless`?``:` / ${t.waveCount}`}${t.isBossWave?` 👑`:``}
                </div>
                <div class="label">Potatoes served ${t.potatoesServed}</div>
            </div>
            ${t.wavePhase===`break`&&t.status!==W.Ready?E`
                      <div class="banner">
                          ${t.waveNumber===1?`Get ready! Wave 1 in`:`Wave ${t.waveNumber} incoming in`}
                          ${t.breakSecondsLeft}...
                      </div>
                  `:j}
            ${t.tutorialHint?E`
                      <div class="hint">${t.tutorialHint}</div>
                  `:j}
            ${t.stealPopup?cr(t.stealPopup.id,E`
                          <div class="popup" style="color: #ff8f73">
                              A seagull stole a potato!
                              ${t.stealPopup.satisfactionDelta}${s_(t.stealPopup.prestigeDelta)}
                          </div>
                      `):j}
            ${r&&i?cr(r.id,E`
                          <div class="popup" style="color: ${i.color}">
                              ${i.getText(r)}
                          </div>
                      `):j}
        `}}),d_=.3,f_=Ae()({tagName:`hud-orders`,styles:A`
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
            ${Mg}
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
            ${Lg}
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
    `,render({inputs:e}){let{orders:t,orderPopup:n}=e.snapshot;return E`
            <div class="title">ORDERS</div>
            ${t.map(e=>{let t=up[e.dish];return E`
                    <div class="ticket">
                        <div class="dish">${t.label}</div>
                        <div class="recipe">
                            ${t.toppings.map(e=>{let t=sp[e];return E`
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
                                style="width: ${e.fractionLeft*100}%; background: ${e.fractionLeft<d_?z.tomato:z.grass}"
                            ></div>
                        </div>
                    </div>
                `})}
            ${n?cr(n.id,E`
                          <div
                              class="popup"
                              style="color: ${n.kind===`fulfilled`?`#c4e07a`:`#ff8f73`}"
                          >
                              ${n.kind===`fulfilled`?`${up[n.dish].label} served! +${n.scoreDelta}${s_(n.prestigeDelta)}`:`${up[n.dish].label} order expired! ${n.satisfactionDelta}${s_(n.prestigeDelta)}`}
                          </div>
                      `):j}
        `}});function p_(){let e=Object.entries(uc).map(([e,t])=>`${e} ×${t.value}`).join(`, `);return[`Perfect mash: ${Oc.servingCoins.perfect} coins × size (${e})`,`Quality scales the pay`,`Wave cleared: bonus coins (wave 1: ${$.waveEndBonusCoins[0]})`,`Prestige: great mash earns stars that unlock towers and upgrades; poor potatoes cost stars`,`Filled order: +${Ac.fulfilled.coins} coins × size`,`Eaten anyway: ${Oc.servingCoins.incomplete} coins`,`Seagull knocked out or fed: ${vc.bountyCoins} coins`,`Towers wear out with use. Click one and press S to service it.`,`Selling a tower refunds ${Math.round(Jd.sellRefund*100)}%`]}var m_=Ae()({tagName:`hud-pause`,styles:A`
        [hidden] {
            display: none !important;
        }

        :host {
            display: block;
        }

        .pause-button {
            ${Ng}
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
            ${Ng}
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
            ${Pg}
        }

        .layer {
            align-items: center;
            ${Ig}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            z-index: 1;
        }

        .panel {
            ${Mg}
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
            ${Fg}
            padding: 8px 40px;
        }

        .buttons button.secondary {
            background: var(--hud-wheat);
        }

        .volume input {
            accent-color: var(--hud-pumpkin);
        }
    `,render({inputs:e}){let t=e.snapshot;return t.status===W.Playing?E`
            ${t.paused?E`
                      <div class="layer">
                          <div class="panel">
                              <div class="title">
                                  Paused${t.pausedByName?` by ${t.pausedByName}`:``}
                              </div>
                              <div class="rules">
                                  ${e_.map(e=>E`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="earn-title">How you earn ${Hg()}</div>
                              <div class="earn">
                                  ${p_().map(e=>E`
                                          <div>${e}</div>
                                      `)}
                              </div>
                              <div class="controls">${t_}</div>
                              ${[[`music`,`Music`],[`effects`,`Sound effects`]].map(([n,r])=>{let i=Math.round(t.volumes[n]*100);return E`
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
                                      ?hidden=${!t.isHost}
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
                  `:j}
            <button
                class="pause-button"
                @click=${()=>{e.actions.togglePause()}}
            >
                ⏸
            </button>
            <button
                class="speed-button"
                ?hidden=${t.isCoop}
                style="left: 1004px; width: 150px;"
                title="Fast-forward (F)"
                @click=${()=>{e.actions.cycleSpeed()}}
            >
                ⏩ ${eg(t.speed)}
            </button>
            <button
                ?hidden=${t.isCoop}
                class=${`speed-button`+(t.resetSpeedOnIncome?` armed`:``)}
                style="left: 1170px; width: 190px;"
                title="Fast-forward until the next income (G)"
                @click=${()=>{e.actions.speedUntilIncome()}}
            >
                ⏩ until ${Hg()}
            </button>
        `:E`
                ${j}
            `}}),h_=Ae()({tagName:`hud-run-over`,styles:A`
        [hidden] {
            display: none !important;
        }

        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${Ig}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${Mg}
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

        .contributors {
            display: flex;
            flex-direction: column;
            font-size: 30px;
            gap: 8px;
            margin-bottom: 28px;
        }

        .contributor {
            align-items: center;
            border-left: 14px solid var(--slot-color);
            display: flex;
            gap: 16px;
            padding: 4px 16px;
            text-align: left;
        }

        .contributor .name {
            flex: 1;
            font-weight: 700;
        }

        .contributor.crowned {
            background: var(--hud-butter);
            border-radius: 14px;
        }

        .contributor .champ {
            color: var(--hud-pumpkin);
            font-weight: 700;
        }

        button {
            ${Fg}
        }

        button.secondary {
            background: var(--hud-wheat);
            margin-left: 32px;
        }
    `,render({inputs:e}){let t=e.snapshot;if(t.status===W.Playing||t.status===W.Ready)return E`
                ${j}
            `;let n=t.mode===`endless`,r=t.status===W.Won,i=r&&t.prestigeStars>=qd.mashChampStars,a=r&&!i,o=ug(t.records,{levelId:t.levelId,mode:t.mode,playerCount:t.playerCount});return E`
            <div class="layer">
                <div class="panel">
                    ${i?E`
                              <div class="trophy">🏆</div>
                          `:j}
                    <div
                        class="title"
                        style="color: ${i?`var(--hud-caramel)`:a?`var(--hud-pumpkin)`:`var(--hud-tomato)`}; ${a?`font-size: 64px`:``}"
                    >
                        ${i?`MASH CHAMP!`:a?`Survived!`:`Restaurant Closed`}
                    </div>
                    <div class="subtitle">
                        ${n?`The restaurant closed after ${t.wavesReached} waves`:i?`Every customer went home full.`:a?`...but the critics found it a little rubbery.`:`The customers have had enough of your potatoes.`}
                    </div>
                    ${t.newBest?E`
                              <div class="new-best">New best!</div>
                          `:j}
                    <div class="stars">Prestige ${Wg(t.prestigeStars)}</div>
                    ${t.playerCount>1?E`
                              <div class="contributors">
                                  ${t.contributions.map(e=>E`
                                          <div
                                              class="contributor ${e.crowned?`crowned`:``}"
                                              style="--slot-color: ${e.color}"
                                          >
                                              <span class="name">
                                                  ${e.crowned?`🏆 `:``}${e.name}
                                              </span>
                                              ${e.crowned?E`
                                                        <span class="champ">Mash Champ</span>
                                                    `:j}
                                              <span>
                                                  ${e.points.toLocaleString(`en-US`)} pts ·
                                                  ${e.perfectServings} perfect
                                              </span>
                                          </div>
                                      `)}
                              </div>
                          `:j}
                    <div class="summary">
                        <div>Score ${t.totalScore.toLocaleString(`en-US`)}</div>
                        <div>Coins earned ${t.coinsEarned}</div>
                        <div>Perfect mashes ${t.servingCounts[md.Perfect]}</div>
                        <div>
                            Not fully mashed ${t.servingCounts[md.Incomplete]}
                        </div>
                        <div>Raw ${t.servingCounts[md.Raw]}</div>
                        <div>Stolen by seagulls ${t.potatoesStolen}</div>
                    </div>
                    <div class="bests">
                        Best score ${o.bestScore.toLocaleString(`en-US`)} · Best prestige
                        ${Wg(o.bestStars)}${n?` · Best ${o.bestWaves} waves`:` · 🏆 ${o.champs}`}
                    </div>
                    <button
                        ?hidden=${!t.isHost}
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
        `}}),g_=Ae()({tagName:`hud-session`,state(){return{roomName:``,password:``}},styles:A`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${Ig}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            z-index: 2;
        }

        .panel {
            ${Mg}
            border-radius: 28px;
            border-width: 6px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 32px 48px 40px;
            text-align: center;
            width: 1100px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 64px;
            font-weight: 700;
        }

        .tagline {
            font-size: 30px;
            opacity: 0.8;
        }

        .menu-buttons {
            display: flex;
            gap: 32px;
            justify-content: center;
        }

        button {
            ${Ng}
            font-size: 32px;
            padding: 8px 32px;
        }

        button.primary {
            ${Fg}
        }

        button:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .error {
            background: var(--hud-butter);
            border: 4px solid var(--hud-pumpkin);
            border-radius: 14px;
            font-size: 24px;
            line-height: 1.3;
            padding: 8px 16px;
        }

        .busy,
        .empty {
            font-size: 28px;
            opacity: 0.8;
        }

        .create {
            align-items: center;
            display: flex;
            gap: 16px;
            justify-content: center;
        }

        input {
            background: white;
            border: 4px solid var(--hud-bark);
            border-radius: 12px;
            box-sizing: border-box;
            color: var(--hud-walnut);
            font-family: inherit;
            font-size: 28px;
            padding: 8px 14px;
            width: 300px;
        }

        .rooms {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 400px;
            overflow-y: auto;
        }

        .room {
            align-items: center;
            border: 4px solid var(--hud-bark);
            border-radius: 14px;
            display: flex;
            font-size: 30px;
            gap: 16px;
            padding: 8px 16px;
        }

        .room-name {
            flex-grow: 1;
            text-align: left;
        }

        .leave {
            bottom: 16px;
            left: 16px;
            pointer-events: auto;
            position: absolute;
        }

        .leave button {
            font-size: 24px;
            padding: 6px 20px;
        }

        .leave-room-name {
            ${Mg}
            font-size: 22px;
            margin-bottom: 8px;
            padding: 4px 12px;
        }
    `,render({inputs:e,state:t,updateState:n}){let{session:r}=e.snapshot,i=!!r.busy;if(r.screen===Td.Playing)return r.roomName?E`
                <div class="leave">
                    <div class="leave-room-name">
                        Room: ${r.roomName}
                        ${e.snapshot.isSpectator?`(spectating: no free kitchen)`:``}
                    </div>
                    <button
                        @click=${()=>{e.actions.leaveRoom()}}
                    >
                        Leave room
                    </button>
                </div>
            `:j;let a=r.error?E`
                  <div class="error">${r.error}</div>
              `:j;if(r.screen===Td.Menu)return E`
                <div class="layer">
                    <div class="panel">
                        <div class="title">Colcannon Fodder</div>
                        <div class="tagline">A mashed potato tower defense</div>
                        ${a}
                        <div class="menu-buttons">
                            <button
                                class="primary"
                                @click=${()=>{e.actions.startSingleplayer()}}
                            >
                                Singleplayer
                            </button>
                            <button
                                class="primary"
                                @click=${()=>{e.actions.openRooms()}}
                            >
                                Co-op
                            </button>
                        </div>
                    </div>
                </div>
            `;let o=r.rooms?.length?E`
                  <div class="rooms">
                      ${r.rooms.map(n=>E`
                              <div class="room">
                                  <span class="room-name">
                                      ${n.roomName} (${n.clientCount}
                                      ${n.clientCount===1?`player`:`players`})
                                  </span>
                                  ${n.hasRoomPassword?E`
                                            <span title="Needs the password below">🔒</span>
                                        `:j}
                                  <button
                                      ?disabled=${i}
                                      @click=${()=>{e.actions.joinRoom(n,t.password)}}
                                  >
                                      Join
                                  </button>
                              </div>
                          `)}
                  </div>
              `:E`
                  <div class="empty">
                      ${r.rooms?`No rooms yet. Create one!`:`Loading rooms...`}
                  </div>
              `;return E`
            <div class="layer">
                <div class="panel">
                    <div class="title">Co-op rooms</div>
                    ${a}
                    ${r.busy?E`
                              <div class="busy">${r.busy}</div>
                          `:j}
                    <div class="create">
                        <input
                            type="text"
                            placeholder="Room name"
                            maxlength=${Au.maxNameLength}
                            .value=${t.roomName}
                            @input=${e=>{n({roomName:e.target.value})}}
                        />
                        <input
                            type="password"
                            placeholder="Password (optional)"
                            .value=${t.password}
                            @input=${e=>{n({password:e.target.value})}}
                        />
                        <button
                            class="primary create-button"
                            ?disabled=${i}
                            @click=${()=>{e.actions.createRoom(t.roomName,t.password)}}
                        >
                            Create room
                        </button>
                    </div>
                    ${o}
                    <div class="menu-buttons">
                        <button
                            class="back-button"
                            ?disabled=${i}
                            @click=${()=>{e.actions.closeRooms()}}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        `}}),__=Ae()({tagName:`hud-sim-speed`,styles:A`
        :host {
            display: block;
        }

        .badge {
            ${Mg}
            border-radius: 14px;
            font-size: 30px;
            padding: 6px 14px;
            position: absolute;
            right: 344px;
            top: 90px;
        }
    `,render({inputs:e}){return e.snapshot.simSpeedPercent==null?E`
                ${j}
            `:E`
            <div class="badge">Sim speed ${e.snapshot.simSpeedPercent}%</div>
        `}}),v_=Ae()({tagName:`hud-topping-bar`,styles:A`
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
            ${Mg}
            border-radius: 14px;
            font-size: 24px;
            font-weight: 700;
            padding: 2px 0;
            text-align: center;
        }

        button {
            ${Ng}
            border-radius: 16px;
            height: 90px;
            width: 200px;
        }

        button.selected {
            ${Pg}
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
    `,render({inputs:e}){let t=e.snapshot.selectedTopping;return E`
            <div class="title">TOPPINGS</div>
            ${Object.values(Q).map(n=>{let r=sp[n];return E`
                    <button
                        class=${n===t?`selected`:``}
                        ${Be(`click`,()=>{e.actions.selectTopping(n===t?void 0:n)})}
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
        `}});function y_(e){return e<40?z.grass:e<70?z.butter:z.tomato}var b_=Ae()({tagName:`hud-tower-panel`,styles:A`
        :host {
            display: block;
            left: 24px;
            bottom: 150px;
            pointer-events: auto;
            position: absolute;
            width: 360px;
        }

        .panel {
            ${Mg}
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
            ${Ng}
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
    `,render({inputs:e}){let t=e.snapshot.selectedTower;if(!t)return j;let n=J[t.towerType],{actions:r,snapshot:i}=e,a=t.upgradeNeedsStars!=null,o=t.upgradeCost!=null&&!a&&i.coins>=t.upgradeCost,s=n.behavior!==`gull-trap`&&n.behavior!==`swipe`;return E`
            <div class="panel">
                <div class="name">${n.label}</div>
                <div class="level">Level ${t.level} / ${Jd.maxLevel}</div>
                ${s?E`
                          <div class="stat">Damage: ${t.stats.damage}</div>
                      `:j}
                <div class="stat">Range: ${t.stats.rangePx}</div>
                <div class="stat">Reload: ${(t.stats.cooldownMs/1e3).toFixed(2)}s</div>
                <div class="stat">Wear: ${t.wear}%</div>
                <div class="wear-track">
                    <div
                        class="wear-fill"
                        style="width: ${t.wear}%; background: ${y_(t.wear)}"
                    ></div>
                </div>
                <button
                    class="service"
                    ?disabled=${t.wear<=0||i.coins<t.serviceCost}
                    ${Be(`click`,()=>{r.serviceTower(t.towerId)})}
                >
                    ${Gg()} ${tf(t.towerType)} (S) ${Hg()}
                    ${t.serviceCost}
                </button>
                <button
                    class="upgrade"
                    ?disabled=${!o}
                    ${Be(`click`,()=>{r.upgradeTower(t.towerId)})}
                >
                    ${t.upgradeNeedsStars==null?E`
                              Upgrade (U) ${Hg()} ${t.upgradeCost??`MAX`}
                          `:E`
                              Needs ${a_(t.upgradeNeedsStars)}
                          `}
                </button>
                <button
                    class="sell"
                    ${Be(`click`,()=>{r.sellTower(t.towerId)})}
                >
                    Sell (X) ${Hg()} ${t.sellValue}
                </button>
            </div>
        `}}),x_=Ae()({tagName:`game-hud`,styles:A`
        :host {
            ${jg}
            color: var(--hud-walnut);
            display: block;
            font-family: ${l(Ag)};
            inset: 0;
            pointer-events: none;
            position: absolute;
        }
    `,render({inputs:e}){return E`
            <${u_.assign({snapshot:e.snapshot})}></${u_}>
            <${o_.assign({snapshot:e.snapshot,actions:e.actions})}></${o_}>
            <${b_.assign({snapshot:e.snapshot,actions:e.actions})}></${b_}>
            <${v_.assign({snapshot:e.snapshot,actions:e.actions})}></${v_}>
            <${f_.assign({snapshot:e.snapshot})}></${f_}>
            <${Kg.assign({snapshot:e.snapshot})}></${Kg}>
            <${__.assign({snapshot:e.snapshot})}></${__}>
            <${i_.assign({snapshot:e.snapshot})}></${i_}>
            <${m_.assign({snapshot:e.snapshot,actions:e.actions})}></${m_}>
            <${Rg.assign({snapshot:e.snapshot})}></${Rg}>
            <${h_.assign({snapshot:e.snapshot,actions:e.actions})}></${h_}>
            <${n_.assign({snapshot:e.snapshot,actions:e.actions})}></${n_}>
            <${r_.assign({snapshot:e.snapshot,actions:e.actions})}></${r_}>
            <${g_.assign({snapshot:e.snapshot,actions:e.actions})}></${g_}>
        `}});function S_(e=Nc.simSpeedWindowMs){let t=[];return{sample({elapsedMs:n,nowMs:r,running:i}){let a=t[t.length-1];if((!i||a&&n<a.elapsedMs)&&(t=[]),!i)return;t.push({elapsedMs:n,nowMs:r}),t=t.filter(t=>r-t.nowMs<=e);let o=t[0];if(!(!o||r-o.nowMs<e/4))return(n-o.elapsedMs)/(r-o.nowMs)}}}var C_={[md.Perfect]:Vc.ServePerfect,[md.Incomplete]:Vc.ServeBad,[md.Raw]:Vc.ServeRaw},w_,T_,E_=!1,D_,O_=-1,k_=S_();function A_(e){let t=e.runState;if(!t)return;let n=t.lastServing,r=e.entityStore?e.entityStore.getEntities(Yh).size:0,i=t.status===W.Playing;i&&n&&n.servedAtMs!==w_&&Qc(C_[n.result]),i&&T_!=null&&r>T_&&Qc(Vc.Build),i&&t.lastSteal&&t.lastSteal.atMs!==D_&&Qc(Vc.ServeRaw),i&&t.lastBossSpawnAtMs>=0&&t.lastBossSpawnAtMs!==O_&&Qc(Vc.BossArrives),O_=t.lastBossSpawnAtMs,D_=t.lastSteal?.atMs,w_=n?.servedAtMs,T_=r}var j_=Xe({modName:`hud`,execute({state:e}){let t=e.ui?.session.screen===Td.Playing;if(t&&e.runState&&(e.runState.status===W.Won||e.runState.status===W.Lost)&&e.ui&&(e.ui.keys.includes(`r`)||e.ui.keys.includes(`R`))&&kg(e).isHost&&rg(e).restartRun(),t&&e.runState?.status===W.Playing&&e.ui){let t=e.ui.keys.some(e=>e===`p`||e===`P`),n=e.ui.keys.includes(`Escape`)&&!E_;(t||n)&&rg(e).togglePause(),!_d(e.runState)&&e.ui.keys.some(e=>e===`f`||e===`F`)&&rg(e).cycleSpeed(),!_d(e.runState)&&e.ui.keys.some(e=>e===`g`||e===`G`)&&rg(e).speedUntilIncome()}E_=!!(e.ui?.selectedTowerType||e.ui?.selectedTopping||e.ui?.selectedTowerId!=null),t&&e.runState?.status===W.Ready&&e.ui?.keys.includes(` `)&&rg(e).beginRun(),(e.ui?.keys.includes(`m`)||e.ui?.keys.includes(`M`))&&Jc(!qc()),A_(e);let n=e.pixi?.pixiApplication?.renderer;n&&Wf(n);let r=zc();e.audioChannelVolume?.channels?.[tc.Music]!==r.music&&(e.audioChannelVolume={channels:{[tc.Music]:r.music,[tc.Effects]:r.effects},master:1});let i=kg(e),a=k_.sample({elapsedMs:e.runState?.elapsedMs??0,nowMs:performance.now(),running:e.runState?.status===W.Playing&&!e.runState.paused});return a!=null&&i.isCoop&&i.isHost&&(i.simSpeedPercent=Math.round(a*20)*5),E`
            <${x_.assign({snapshot:i,actions:rg(e)})}></${x_}>
        `}});function M_(e,t){let n=e.pixi?.canvas;if(n&&e.virtualViewport)return Ks({canvasBounds:n.getBoundingClientRect(),clientPoint:{x:t.clientX,y:t.clientY},virtualViewport:e.virtualViewport})}var N_={clicks:[],keys:[],wheelSteps:0},P_=Xe({modName:`input`,execute({state:e}){if(!e.ui)return;e.ui.clicks=N_.clicks,e.ui.keys=N_.keys,N_.clicks=[],e.ui.wheelSteps=N_.wheelSteps,N_.keys=[],N_.wheelSteps=0;let t=e.pixi?.canvas;if(e.inputListenersAttached||!t)return;e.inputListenersAttached=!0;let n=e.ui;t.addEventListener(`pointermove`,t=>{n.pointerWorld=M_(e,t)}),t.addEventListener(`pointerleave`,()=>{n.pointerWorld=void 0}),t.addEventListener(`pointerdown`,t=>{if(t.button!==0&&t.button!==2)return;let n=M_(e,t);n&&N_.clicks.push({...n,button:t.button===0?`left`:`right`})}),t.addEventListener(`contextmenu`,e=>{e.preventDefault()}),t.addEventListener(`wheel`,e=>{e.preventDefault(),N_.wheelSteps+=Math.sign(e.deltaY)},{passive:!1}),globalThis.addEventListener(`keydown`,e=>{e.composedPath()[0]instanceof HTMLInputElement||e.repeat||N_.keys.push(e.key)})}}),F_,I_=14,L_=Xe({modName:`topping-input`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(t&&n&&e.entityStore&&e.runState){if((!F_||F_.destroyed)&&(F_=new M,F_.zIndex=1e3,t.sortableChildren=!0,t.addChild(F_)),F_.clear(),e.runState.status!==W.Playing||e.runState.paused){n.selectedTopping=void 0;return}for(let e of n.keys){if(e===`Escape`){n.selectedTopping=void 0;continue}let t=Object.values(Q).find(t=>sp[t].hotkey===e.toLowerCase());t&&(n.selectedTopping=n.selectedTopping===t?void 0:t,n.selectedTopping&&(n.selectedTowerType=void 0))}for(let t of n.clicks){if(t.button===`right`){n.selectedTopping=void 0;continue}if(!n.selectedTopping)continue;let r,i=1/0;for(let n of e.entityStore.getEntities(Om)){if(n.params.dropInMs>0)continue;let e=Math.hypot(n.params.x-t.x,n.params.y-t.y);e<=uc[n.params.size].radius+Ec.clickSlopPx&&e<i&&(r=n,i=e)}r&&!r.params.served&&K(e,{type:G.ApplyTopping,potatoId:r.params.potatoId,topping:n.selectedTopping})}n.selectedTopping&&n.pointerWorld&&F_.circle(n.pointerWorld.x,n.pointerWorld.y,I_).fill({color:sp[n.selectedTopping].color}).stroke({color:`#ffffff`,width:3})}}});function R_(e){return(e%360+360)%360}var z_,B_,V_,H_=Xe({modName:`tower-placement`,execute({state:e}){let t=e.pixi?.pixiApplication?.stage,{ui:n}=e;if(!t||!n||!e.entityStore||!e.level||!e.runState)return;if((!z_||z_.destroyed)&&(z_=new M,z_.zIndex=1e3,t.sortableChildren=!0,t.addChild(z_)),(!B_||B_.destroyed)&&(B_=new M,B_.zIndex=1e3,B_.alpha=.5,t.addChild(B_)),(!V_||V_.destroyed)&&(V_=new es({text:``,style:{fill:`#ffffff`,fontSize:24,stroke:{color:`#000000`,width:4}}}),V_.anchor.set(.5,0),V_.zIndex=1e3,t.addChild(V_)),z_.clear(),V_.visible=!1,B_.visible=!1,e.runState.status!==W.Playing||e.runState.paused){n.selectedTowerType=void 0,n.selectedTowerId=void 0,z_.visible=!1;return}z_.visible=!0;let r=hp(e.runState.prestigePoints);n.selectedTowerType&&!gp(n.selectedTowerType,r)&&(n.selectedTowerType=void 0);for(let t of n.keys){if(t===`Escape`){n.selectedTowerType=void 0,n.selectedTowerId=void 0;continue}if(n.selectedTowerId!=null&&(t===`u`||t===`U`)){K(e,{type:G.UpgradeTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`s`||t===`S`)){K(e,{type:G.ServiceTower,towerId:n.selectedTowerId});continue}if(n.selectedTowerId!=null&&(t===`x`||t===`X`)){K(e,{type:G.SellTower,towerId:n.selectedTowerId}),n.selectedTowerId=void 0;continue}if(n.selectedTowerType===q.Laser&&(t===`[`||t===`]`)){n.placementAngleDeg=R_(n.placementAngleDeg+(t===`]`?1:-1)*lc.rotateStepDeg);continue}let i=Object.values(q).find(e=>J[e].hotkey===t);i&&gp(i,r)&&(n.selectedTowerType=n.selectedTowerType===i?void 0:i,n.selectedTowerType&&(n.selectedTopping=void 0))}n.selectedTowerType===q.Laser&&n.wheelSteps!==0&&(n.placementAngleDeg=R_(n.placementAngleDeg+n.wheelSteps*lc.rotateStepDeg));let i=gd(e.runState,e.multiplayerP2pLockStep?.multiplayerController.getClientId()),a=[...e.entityStore.getEntities(Yh)].map(e=>({x:e.params.x,y:e.params.y,towerId:e.params.towerId}));(n.selectedTowerType||n.selectedTopping||!a.some(e=>e.towerId===n.selectedTowerId))&&(n.selectedTowerId=void 0);for(let t of n.clicks)if(t.button===`right`)n.selectedTowerType=void 0,n.selectedTowerId=void 0;else if(!n.selectedTowerType&&!n.selectedTopping)n.selectedTowerId=a.find(e=>Math.hypot(e.x-t.x,e.y-t.y)<=yc.radius)?.towerId;else if(n.selectedTowerType&&!n.selectedTopping){let r=Math.round(t.x),o=Math.round(t.y);Vh(e.runState.coins,n.selectedTowerType)&&Bh({level:e.level,towers:a,slot:i,point:{x:r,y:o}}).valid&&K(e,{type:G.PlaceTower,towerType:n.selectedTowerType,x:r,y:o,angleDeg:n.placementAngleDeg})}if(!n.selectedTowerType||!n.pointerWorld)return;let{x:o,y:s}=n.pointerWorld,c=Bh({level:e.level,towers:a,slot:i,point:{x:o,y:s}}),l=Vh(e.runState.coins,n.selectedTowerType),u=c.valid&&l;(!c.valid||!l)&&(V_.text=c.valid?`Not enough coins`:c.reason,V_.position.set(o,s+yc.radius+8),V_.visible=!0);let{rangePx:d}=af(n.selectedTowerType,1);if(J[n.selectedTowerType].behavior===`line`){let t=n.selectedTowerType===q.Laser,r=Ph({origin:{x:o,y:s},angleDeg:t?n.placementAngleDeg:Fh(e.level,{x:o,y:s}),lengthPx:d});z_.moveTo(r.start.x,r.start.y).lineTo(r.end.x,r.end.y).stroke({color:t?lc.laserColor:lc.lineColor,alpha:.6,width:lc.lineWidthPx})}else z_.circle(o,s,d).stroke({color:`#ffffff`,alpha:.5,width:3});B_.visible=!0,B_.position.set(o,s),Ff(B_,{towerType:n.selectedTowerType,attack:-1,timeSec:e.runState.elapsedMs/1e3,aimX:0,aimY:0,rangePx:d,swiperAngle:0}),z_.circle(o,s,yc.radius).stroke({color:u?z.meadow:z.tomato,width:5})}}),U_=220,W_=8;function G_({text:e,fontSize:t,fill:n}){let r=new es({text:e,style:{fill:n,fontSize:t,fontFamily:Mu.fontFamily,fontWeight:Mu.fontWeight,stroke:{color:z.bark,width:t/6,join:`round`}}});return r.anchor.set(.5),r}function K_(e){let t=new mt,n=new M;t.position.set(e.x,e.y),t.scale.set(e.sizePx/U_),Iu(t,{width:250,height:40,offsetY:104}),H(n,{path:V({x:-104,y:-60,width:208,height:164,radius:6}),fill:z.cream}),H(n,{path:V({x:-104,y:88,width:208,height:16,radius:4}),fill:z.caramel,outlineScale:.8}),H(n,{path:V({x:-92,y:-16,width:118,height:62,radius:6}),fill:z.walnut,outlineScale:.9}),H(n,{path:B({x:-33,y:34,rx:22,ry:6}),fill:z.stone,outlineScale:.6}),H(n,{path:B({x:-33,y:27,rx:13,ry:9}),fill:z.cream,outlineScale:.7}),H(n,{path:V({x:-98,y:-20,width:6,height:70,radius:2}),fill:z.pine,outlineScale:.7}),H(n,{path:V({x:26,y:-20,width:6,height:70,radius:2}),fill:z.pine,outlineScale:.7}),H(n,{path:V({x:-106,y:44,width:142,height:14,radius:4}),fill:z.toffee}),H(n,{path:V({x:50,y:2,width:46,height:86,radius:16}),fill:z.oak}),H(n,{path:V({x:58,y:12,width:30,height:34,radius:10}),fill:z.caramel,outlineScale:.6}),H(n,{path:B({x:88,y:56,rx:3.5,ry:3.5}),fill:z.butter,outlineScale:.5,highlight:!1});let r=208/W_;for(let e=0;e<W_;e++){let t=-104+e*r;H(n,{path(e){e.moveTo(t,-62).lineTo(t+r,-62).lineTo(t+r,-42).arc(t+r/2,-42,r/2,0,Math.PI).closePath()},fill:e%2?z.cream:z.tomato,outlineScale:.9})}return H(n,{path:V({x:-114,y:-84,width:228,height:26,radius:6}),fill:z.tomato}),H(n,{path:Nu([[-114,-84],[-96,-100],[96,-100],[114,-84]]),fill:z.walnut}),U(n,{path(e){e.moveTo(-40,8).bezierCurveTo(-36,-2,-30,2,-33,-10)},color:z.cream,width:3,alpha:.5}),t.addChild(n),t}function q_(e){let t=new mt,n=new M,r=-58*(e.sizePx/U_);t.position.set(e.x,e.y),Iu(t,{width:261,height:20,offsetY:r+6}),H(n,{path:V({x:-145,y:r-52-4,width:290,height:52,radius:10}),fill:z.oak}),H(n,{path:V({x:-137,y:r-52+4,width:274,height:36,radius:6}),fill:z.walnut,outlineScale:.5,highlight:!1}),t.addChild(n);let i=G_({text:`RESTAURANT`,fontSize:40,fill:z.cream});return i.position.set(0,r-26-4),t.addChild(i),t}var J_={grass:z.grass,grassTuft:ju.grassDark,grassTuftLight:z.meadow,beltRail:z.oak,beltRailDark:z.walnut,belt:z.stone,beltStripe:ju.beltStripe,outline:z.bark},Y_=[z.cream,z.butter,z.tomato,z.pumpkin];function X_(e){let t=2166136261;for(let n of e)t=Math.imul(t^Number(n.codePointAt(0)),16777619);return t>>>0}function Z_(e){let t=e%2147483646+1;return()=>(t=t*16807%2147483647,(t-1)/2147483646)}function Q_(e,t){let n=Z_(X_(t)),{tuftCount:r,flowerCount:i}=fc;for(let t=0;t<r;t++){let t=n()*O.width,r=n()*O.height,i=n()<.65?J_.grassTuft:J_.grassTuftLight;e.moveTo(t,r).lineTo(t-5,r-15).moveTo(t,r).lineTo(t+2,r-18).moveTo(t,r).lineTo(t+8,r-13).stroke({color:i,width:3.5,cap:`round`,join:`round`})}for(let t=0;t<i;t++){let t=n()*O.width,r=n()*O.height,i=Y_[Math.floor(n()*Y_.length)]??Y_[0];e.moveTo(t,r).lineTo(t,r+12).stroke({color:z.moss,width:3,cap:`round`});for(let n=0;n<5;n++){let a=n/5*Math.PI*2;e.circle(t+Math.cos(a)*6,r+Math.sin(a)*6,4.5).fill({color:i})}e.circle(t,r,4).fill({color:z.butter}),e.circle(t,r,4).stroke({color:z.bark,width:1.2})}}function $_({ground:e,path:t,color:n,width:r}){let[i,...a]=t.waypoints;i&&(e.moveTo(i.x,i.y),a.forEach(t=>e.lineTo(t.x,t.y)),e.stroke({color:n,width:r,cap:`round`,join:`round`}))}function ev(e,t,n){let r=Mu.outlineWidth*2,i=[{color:`rgba(43,26,18,0.3)`,extraWidth:14+r,shadow:!0},{color:J_.outline,extraWidth:14+r},{color:J_.beltRail,extraWidth:14},{color:J_.beltRailDark,extraWidth:4},{color:J_.outline,extraWidth:1},{color:J_.belt,extraWidth:-2}];for(let r of i)for(let i of t)$_({ground:e,path:r.shadow?{...i,waypoints:i.waypoints.map(e=>({x:e.x,y:e.y+Mu.shadow.offsetY}))}:i,color:n&&r.color===J_.beltRail?Bu(i.ownerSlot):r.color,width:i.widthPx+r.extraWidth})}function tv(e,t,n=z.caramel){let r=t.waypoints[0];if(!r)return;let i=t.widthPx*.62,a=new M,o=new mt;o.position.set(r.x,r.y),Iu(o,{width:90,height:20,offsetY:i+4,offsetX:20}),H(a,{path:V({x:-34,y:-i-10,width:92,height:i*2+20,radius:8}),fill:z.walnut}),H(a,{path:V({x:-24,y:-i,width:72,height:i*2,radius:5}),fill:n,outlineScale:.7});for(let e of[[-24,-i,48,i],[-24,i,48,-i]])a.moveTo(e[0],e[1]).lineTo(e[2],e[3]).stroke({color:z.walnut,width:7,cap:`round`});a.moveTo(12,-i).lineTo(12,i).stroke({color:z.bark,width:2.5}),H(a,{path:B({x:38,y:0,rx:4,ry:4}),fill:z.butter,outlineScale:.5,highlight:!1}),o.addChild(a),e.addChild(o);let s=G_({text:`POTATOES`,fontSize:24,fill:z.cream});s.anchor.set(0,1),s.position.set(r.x+8,r.y-t.widthPx/2-18),e.addChild(s)}function nv(e,t){let n=t.waypoints.at(-1);if(!n)return;let r=new M;H(r,{path:B({x:n.x,y:n.y,rx:16,ry:16}),fill:Bu(t.ownerSlot),outlineScale:.8}),e.addChild(r)}var rv=class extends Gf({key:`LevelEntity`}){createView(){let{level:e}=this.state,t=new mt({zIndex:-1}),n=new M().rect(0,0,O.width,O.height).fill({color:J_.grass});Q_(n,e.levelId);let r=new Set(e.paths.map(e=>e.ownerSlot)).size>1;return ev(n,e.paths,r),t.addChild(n),e.paths.forEach(e=>{tv(t,e,r?Bu(e.ownerSlot):void 0)}),t.addChild(K_(e.restaurant)),r&&e.paths.forEach(e=>nv(t,e)),{view:t}}update(){}},iv=class extends Gf({key:`BeltEntity`}){stripePools;createView(){return{view:new mt({zIndex:-.5})}}update(){}createStripePools(e){let t=dc.stripeSpacingPx;return this.state.level.paths.map(n=>{let r=(n.widthPx-16)/2,i=new Ut().moveTo(-r,0).lineTo(r,0).stroke({color:J_.beltStripe,width:5,cap:`round`}),a=Math.floor(Uu(n)/t)+1,o=[];for(let t=0;t<a;t++){let t=new M(i);t.visible=!1,e.addChild(t),o.push(t)}return o})}render(){let{level:e,runState:t}=this.state,n=D.instanceOf(this.view,mt),r=dc.stripeSpacingPx,i=t.elapsedMs*t.beltSpeedPxPerMs%r,a=this.stripePools??=this.createStripePools(n);e.paths.forEach((e,t)=>{let n=a[t]??[],o=Uu(e),s=0;for(let t=i;t<=o;t+=r){let r=n[s];if(!r)break;let i=Wu(e,t),a=Ku(e,t);r.position.set(i.x,i.y),r.rotation=Math.atan2(a.x,-a.y),r.visible=!0,s++}for(let e=s;e<n.length;e++){let t=n[e];t&&(t.visible=!1)}})}},av=class extends Gf({key:`ChuteEntity`,paramsShape:En(Cs,t({pathId:``,distancePx:0,active:!1})),paramsMap:{view:{x:!0,y:!0}}}){drawnActive;createView(){let e=new M({zIndex:5});return this.drawHopper(e,this.params.active),{view:e}}drawHopper(e,t){this.drawnActive=t,e.clear();let n=t?z.pumpkin:z.toffee;t&&e.ellipse(0,-40,84,64).fill({color:z.pumpkin,alpha:.28}),H(e,{path:Nu([[-60,-80],[60,-80],[34,-10],[-34,-10]]),fill:n});for(let t of[-20,20])e.moveTo(t*2.2,-80).lineTo(t*1.3,-10).stroke({color:z.walnut,width:3,cap:`round`});H(e,{path:V({x:-36,y:-10,width:72,height:14,radius:4}),fill:z.walnut,outlineScale:.9}),H(e,{path:V({x:-68,y:-92,width:136,height:16,radius:6}),fill:z.oak})}update(){let e=!1;for(let t of this.state.entityStore.getEntities(Om))if(t.params.dropInMs>0&&t.params.pathId===this.params.pathId&&t.params.distancePx===this.params.distancePx){e=!0;break}this.params.active=e,this.drawnActive!==e&&this.drawHopper(D.instanceOf(this.view,M),e)}},ov=class extends Gf({key:`RestaurantSignEntity`}){createView(){let e=q_(this.state.level.restaurant);return e.zIndex=4,{view:e}}update(){}};function sv({configuredMs:e,pathLengthPx:t,beltSpeedPxPerMs:n}){let r=n>0?t/n:0;return Math.max(e,r*Ac.travelTimeMultiplier)}function cv({runState:e,msElapsed:t,roll:n,longestPathLengthPx:r}){if(e.status!==W.Playing)return;let i=e.orders.filter(t=>t.expiresAtMs<=e.elapsedMs);e.orders=e.orders.filter(t=>t.expiresAtMs>e.elapsedMs);for(let t of i){let n=Math.min(pc.max,Math.max(0,e.satisfaction+Ac.expiredSatisfaction));e.lastOrderEvent={kind:`expired`,dish:t.dish,atMs:e.elapsedMs,scoreDelta:0,prestigeDelta:wp(e,{kind:`order-expired`}),satisfactionDelta:n-e.satisfaction},e.satisfaction=n,e.satisfaction<=0&&(e.status=W.Lost)}if(e.wavePhase!==`spawning`)return;let a=D.isDefined(Eg(e,e.waveIndex)??Eg(e,hc.waves.length-1)).orders;for(e.msUntilNextOrder-=t;e.msUntilNextOrder<=0;){if(e.orders.length<a.maxOpen){let t=D.isDefined(a.dishes[Math.floor(n()*a.dishes.length)]),i=D.isDefined(Object.values(lp).find(e=>e===t));e.orders.push({orderId:e.nextOrderId++,dish:i,createdAtMs:e.elapsedMs,expiresAtMs:e.elapsedMs+sv({configuredMs:a.lifetimeMs,pathLengthPx:r,beltSpeedPxPerMs:e.beltSpeedPxPerMs})})}e.msUntilNextOrder+=a.intervalMs}}var lv=class extends Jf({key:`OrderBoardEntity`,paramsShape:t({})}){update({msSinceLastExecute:e}){let t=Math.max(0,...this.state.level.paths.map(e=>Uu(e)));cv({runState:this.state.runState,msElapsed:e,roll:()=>this.state.seededRandom.next(),longestPathLengthPx:t})}},uv={clumpGapMs:220};function dv(e){return Math.max(0,e.beltWidthPx/2-e.potatoRadius-_c.edgeMarginPx)}function fv(e){return(e.roll*2-1)*e.maxOffset}function pv({wave:e,chanceRoll:t,sizeRoll:n}){return t>=e.clumpChance?0:1+Math.floor(n*e.clumpMaxExtra)}function mv({wave:e,msElapsed:t,roll:n}){return n<e.extraSpawnsPerSecond*t/1e3}function hv(e){return e.potatoCount*e.spawnIntervalMs/(e.seagullCount+1)}function gv(e,t,n){let r=[];if(e.wavePhase===`break`){if(e.breakRemainingMs-=n,e.breakRemainingMs<=0){e.wavePhase=`spawning`,e.spawnedInWave=0;let n=Eg(e,e.waveIndex);e.seagullsSpawnedInWave=0,n&&(e.beltSpeedPxPerMs=n.speedPxPerMs,e.msUntilNextSeagull=hv(n)),t.msUntilNextSpawn=0,e.msUntilNextOrder=Ac.firstOrderDelayMs}return r}if(e.wavePhase===`done`)return r;{let i=Eg(e,e.waveIndex);if(!i)return e.wavePhase=`done`,r;for(t.msUntilNextSpawn-=n;t.msUntilNextSpawn<=0&&e.wavePhase===`spawning`;)r.push({sizeWeights:i.sizeWeights,varietyWeights:i.varietyWeights,eyesChance:i.eyesChance,bossCount:e.spawnedInWave===Math.floor(i.potatoCount/2)?i.bossCount:0,bossHp:i.bossHp,chuteShare:i.chuteShare,hpMultiplier:i.hpMultiplier}),e.spawnedInWave++,t.msUntilNextSpawn+=i.spawnIntervalMs,e.spawnedInWave>=i.potatoCount&&(e.mode===`campaign`&&e.waveIndex>=hc.waves.length-1?e.wavePhase=`done`:(e.waveIndex++,e.wavePhase=`break`,e.breakRemainingMs=hc.breakMs));return r}}var _v=class extends Jf({key:`PotatoSpawnerEntity`,paramsShape:t({msUntilNextSpawn:0,pendingClumpSpawns:0,msUntilClumpSpawn:0,clumpWaveIndex:0,clumpPathId:``,clumpLaneCount:0,clumpLaneIndex:0})}){async update({msSinceLastExecute:e}){let{runState:t,level:n}=this.state;$m({level:n,towers:[...this.state.entityStore.getEntities(Yh)].map(e=>({x:e.params.x,y:e.params.y}))});let r=t.waveIndex,i=t.wavePhase===`spawning`?Eg(t,r):void 0,a=gv(t,this.params,e);for(let e of a){let a=Xu(n,this.pickRoll(n));for(let t of a){await this.spawnPotato(t,e);for(let n=0;n<e.bossCount;n++)await this.spawnBoss(t,e.bossHp)}if(e.bossCount>0&&(t.lastBossSpawnAtMs=t.elapsedMs),i&&i.clumpChance>0){let e=pv({wave:i,chanceRoll:this.state.seededRandom.next(),sizeRoll:this.state.seededRandom.next()});e>0&&(this.params.pendingClumpSpawns===0&&(this.params.msUntilClumpSpawn=uv.clumpGapMs),this.params.pendingClumpSpawns===0&&(this.params.clumpLaneCount=0,this.params.clumpLaneIndex=0),this.params.clumpLaneCount+=e,this.params.pendingClumpSpawns+=e,this.params.clumpWaveIndex=r,this.params.clumpPathId=n.spawnMode===`pick-one`?a[0]?.pathId??``:``,t.potatoesPending+=e*a.length)}}if(i&&i.extraSpawnsPerSecond>0&&mv({wave:i,msElapsed:e,roll:this.state.seededRandom.next()}))for(let e of Xu(n,this.pickRoll(n)))await this.spawnPotato(e,i);await this.releaseClumpSpawns(e),await this.spawnSeagulls(e)}pickRoll(e){return e.spawnMode===`pick-one`?this.state.seededRandom.next():0}async releaseClumpSpawns(e){let{runState:t,level:n}=this.state,r=Eg(t,this.params.clumpWaveIndex);if(!(this.params.pendingClumpSpawns<=0||!r))for(this.params.msUntilClumpSpawn-=e;this.params.msUntilClumpSpawn<=0&&this.params.pendingClumpSpawns>0;){let e=this.params.clumpPathId?n.paths.filter(e=>e.pathId===this.params.clumpPathId):n.paths,i=(this.params.clumpLaneIndex+.5)/this.params.clumpLaneCount;for(let t of e)await this.spawnPotato(t,r,i);this.params.clumpLaneIndex++,this.params.pendingClumpSpawns--,t.potatoesPending-=e.length,this.params.msUntilClumpSpawn+=uv.clumpGapMs}}async spawnPotato(e,t,n){let{runState:r}=this.state;if(!e.waypoints[0])return;let i=Wp(t.sizeWeights,this.state.seededRandom.next()),a=sc(t.varietyWeights,this.state.seededRandom.next()),o=this.state.seededRandom.next()<t.eyesChance,s=Math.round(uc[i].mashHp*t.hpMultiplier*Yf.varieties[a].hpMultiplier),c=e.chutes?.length?ip({chutes:e.chutes,chuteShare:t.chuteShare,roll:this.state.seededRandom.next()}):void 0,l=c?.distancePx??0,u=this.state.seededRandom.next(),d=fv({roll:n??u,maxOffset:dv({beltWidthPx:e.widthPx,potatoRadius:uc[i].radius})}),f=Gu({path:e,distancePx:l,offsetPx:d});await this.addEntity(Om,{x:f.x,y:f.y,pathId:e.pathId,distancePx:l,laneOffsetPx:d,dropInMs:c?gc.dropMs:0,size:i,variety:a,hasEyes:o,cut:!1,cooked:!1,mashHp:s,maxMashHp:s,served:!1,carriedBySeagull:!1,quality:100,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,potatoId:r.nextPotatoId,...cp()}),r.nextPotatoId++,r.potatoesSpawned++}async spawnBoss(e,t){let{runState:n}=this.state,r=e.waypoints[0];r&&(await this.addEntity(Om,{x:r.x,y:r.y,pathId:e.pathId,distancePx:0,laneOffsetPx:0,dropInMs:0,size:Hp.King,variety:L.Russet,hasEyes:!1,cut:!1,cooked:!1,mashHp:t,maxMashHp:t,served:!1,carriedBySeagull:!1,quality:100,lastSwipedAtMs:-1,lastHitDamage:0,lastHitMultiplier:1,lastHitAtMs:-1,lastHitTowerType:``,potatoId:n.nextPotatoId,...cp()}),n.nextPotatoId++,n.potatoesSpawned++)}async spawnSeagulls(e){let{runState:t}=this.state,n=Eg(t,t.waveIndex);if(t.wavePhase!==`spawning`||!n||(t.msUntilNextSeagull-=e,t.msUntilNextSeagull>0||t.seagullsSpawnedInWave>=n.seagullCount))return;let r=oh({rollEdge:this.state.seededRandom.next(),rollAlong:this.state.seededRandom.next()});await this.addEntity(yh,{x:r.x,y:r.y,flying:this.state.seededRandom.next()<vc.flyChance,hp:vc.hp,phase:vh.approach,targetPotatoId:0,carryingPotatoId:0,escapeX:0,escapeY:0,fed:!1,onBelt:!1}),t.seagullsSpawnedInWave++,t.msUntilNextSeagull=hv(n)}},vv=[rv,iv,ov,av,Om,_v,lv,Yh,yh],yv;(function(e){e.Actions=`actions`,e.Frame=`frame`,e.StateSyncRequest=`state-sync-request`})(yv||={});var bv=class extends m()(`multiplayer-controller-frame`){constructor(e){super(e)}},xv=class extends m()(`multiplayer-controller-desync`){},Sv=class extends m()(`multiplayer-controller-state-sync`){},Cv={milliseconds:10},wv=class e extends ku{params;currentFps=0;static events={MultiplayerControllerDesyncEvent:xv,MultiplayerControllerFrameEvent:bv,MultiplayerControllerStateSyncEvent:Sv};events=e.events;frameCount=0;clientsResponded={};frameActions=[];timeoutId;frameTickReady=!0;frameMs;producedFrameCount=0;desyncCheckFrameInterval;latestCheckFrameEvent;nextFrameStateHash;localStateHash;stateSyncRequestClientIds=[];stateSyncFrameClientIds=[];awaitingStateSync=!1;joiningRoom=!1;lastFpsCalculation={timestamp:0,frameCount:0};stateSyncFrameCount;constructor(e){super(e),this.params=e;let t=e.frameDuration||Cv;this.frameMs=$e(t,{milliseconds:!0}).milliseconds,this.desyncCheckFrameInterval=e.desyncCheckInterval&&this.frameMs?Math.max(1,Math.round($e(e.desyncCheckInterval,{milliseconds:!0}).milliseconds/this.frameMs)):void 0}shouldAcceptConnection(e){return this.params.acceptConnection?.(e,this)??!0}startSingleplayer(){if(this.currentConnection)throw Error(`Cannot start singleplayer with a connection already present.`);this.debugLog(`starting singleplayer connection`),this.resetStateSync(),this.setFrameCount(0),this.singleplayer=!0,this.finishFrame(),this.dispatch(new Du({detail:{...Cu,api:Su.Connected}})),this.debugLog(`singleplayer connection ready with client ${this.getClientId()||`unknown`}`)}runFrame(e){this.debugLog(`runFrame called with ${e?.length||0} actions`),e&&this.act(e),this.isHost()&&(this.frameTickReady=!0,this.maybeFinishFrame())}getFps(){return this.currentFps}act(e){if(!this.currentConnection||!this.currentConnection.isConnected())throw Error(`Cannot perform action: not connected to a room.`);let t=be(e);this.debugLog(`act called with ${t.length} actions`),this.frameActions=[...this.frameActions,...t.map(e=>({sourceClientId:this.clientId,packet:e}))]}countAppliedFrame(){return this.setFrameCount(this.frameCount+1),this.frameCount}reportStateHash({frameEvent:e,stateHash:t}){this.awaitingStateSync||(this.isHost()?e===this.latestCheckFrameEvent&&(this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=t):this.localStateHash=t)}checkStateHash(e){if(this.awaitingStateSync||e.detail.hostStateHash==null||this.localStateHash==null||e.detail.hostStateHash===this.localStateHash)return;let t={hostStateHash:e.detail.hostStateHash,localStateHash:this.localStateHash};T.warning(`[multiplayer] Desync detected: local state hash ${t.localStateHash} does not match host state hash ${t.hostStateHash}.`),this.dispatch(new xv({detail:t})),this.params.resyncOnDesync&&this.requestStateSync()}requestStateSync(){!this.params.enableStateSync||this.isHost()||this.awaitingStateSync||(this.debugLog(`requesting state sync from host`),this.awaitingStateSync=!0,this.localStateHash=void 0,this.roomConnection?.sendMessage({type:yv.StateSyncRequest}))}finishStateSync(){this.awaitingStateSync=!1,this.localStateHash=void 0,this.setFrameCount(this.stateSyncFrameCount??0),this.stateSyncFrameCount=void 0}sendStateSync(e){let t=this.getConnectedClientIds();this.stateSyncFrameClientIds.filter(e=>t.includes(e)).forEach(t=>{this.debugLog(`sending state sync to ${t}`),this.roomConnection?.sendToOnlyOneClient(t,{type:yv.Frame,packets:[],isSynchronizationFrame:!0,stateSync:e,frameCount:this.frameCount})}),this.stateSyncFrameClientIds=[],this.maybeFinishFrame()}destroy(){globalThis.clearTimeout(this.timeoutId),super.destroy()}async joinOrCreateRoom(e,t={}){let n=this.roomConnection,r=this.singleplayer;this.debugLog(`joining or creating room '${e.roomName}' (${e.roomId})`),this.joiningRoom=!0;try{let i=await this.joinRoom({previousRoomConnection:n,room:e,timeoutOptions:t});this.resetDesyncCheck(),this.resetStateSync(),n?(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.frameActions=[],this.frameTickReady=!0):r&&(globalThis.clearTimeout(this.timeoutId),this.frameTickReady=!0),this.singleplayer=!1,this.setFrameCount(0),this.awaitingStateSync=!!this.params.enableStateSync&&!i.isHost(),this.attachMultiplayerRoomConnection(i),this.debugLog(`attached p2p-lock-step connection; client=${this.getClientId()||`unknown`} host=${this.isHost()} connected=${this.isConnected()}`)}finally{this.joiningRoom=!1}}async joinRoom({previousRoomConnection:e,room:t,timeoutOptions:n}){try{if(await this.roomController.joinOrCreateRoom(t,n),this.debugLog(`room controller joined room '${t.roomName}' (${t.roomId}); client=${this.roomController.getClientId()||`unknown`} host=${this.roomController.isHost()}`),!this.roomController.currentConnection)throw Error(`Cannot start p2p-lock-step multiplayer: room connection is missing.`);return this.roomController.currentConnection}catch(t){throw this.debugLog(`join room failed: ${String(t)}`),this.roomConnection=e,t}}leaveRoom(){this.currentConnection&&(globalThis.clearTimeout(this.timeoutId),this.resetStateSync()),super.leaveRoom()}handleClientStatus(e){`newMember`in e?this.syncNewMember(e.newMember):`newHost`in e&&this.handleNewHost(e.newHost)}attachMultiplayerRoomConnection(e){this.debugLog(`attached room connection; client=${e.clientId} host=${e.isHost()} connected=${e.isConnected()} connectedClients=${e.getConnectedClientIds().length} allClients=${e.getAllClientIds().length}`),this.roomConnection=e,e.isHost()?this.finishFrame():(this.debugLog(`attached as member; sending initial readiness actions to host`),e.sendMessage({actions:[],sourceClientId:this.clientId,type:yv.Actions}))}handleNewHost(e){!this.joiningRoom&&e===this.localClientId&&this.roomConnection&&this.roomConnection.isHost()&&(globalThis.clearTimeout(this.timeoutId),this.clientsResponded={},this.resetDesyncCheck(),this.resetStateSync(),this.frameTickReady=!0,this.finishFrame())}syncNewMember(e){this.debugLog(`syncNewMember called for ${e}; host=${this.isHost()}`),this.params.enableStateSync?this.queueStateSync(e):this.roomConnection&&this.isHost()&&this.roomConnection.sendToOnlyOneClient(e,{type:yv.Frame,packets:[],isSynchronizationFrame:!0})}messageHandlers={[yv.Actions]:{isForHost:!0,handle:({message:e,sourceClientId:t})=>{this.debugLog(`host received ${e.actions.length} actions from ${t}`),this.clientsResponded={...this.clientsResponded,[t]:!0},this.frameActions=[...this.frameActions,...e.actions.map(e=>({sourceClientId:t,packet:e}))],this.maybeFinishFrame()}},[yv.Frame]:{isForHost:!1,handle:({message:e})=>{this.debugLog(`member received frame with ${e.packets.length} actions; sending ${this.frameActions.length} local actions back to host`);let t=this.frameActions;this.frameActions=[],this.roomConnection?.sendMessage({actions:t.map(({packet:e})=>e),sourceClientId:this.clientId,type:yv.Actions}),e.stateSync===void 0?e.isSynchronizationFrame||(this.calculateFps(),this.dispatch(new bv({detail:{packets:e.packets,hostStateHash:e.stateHash,shouldReportNextFrameHash:e.shouldReportNextFrameHash}}))):(this.stateSyncFrameCount=e.frameCount,this.dispatch(new Sv({detail:{stateSync:e.stateSync}})))}},[yv.StateSyncRequest]:{isForHost:!0,handle:({sourceClientId:e})=>{this.queueStateSync(e)}}};handleReceivedMessage(e,t){if(this.debugLog(`received lock-step message from ${e}: type=${t.type} host=${this.isHost()}`),!this.roomConnection){this.debugLog(`ignored message because no room connection is attached`);return}let n=t.type;this.messageHandlers[n].isForHost===this.isHost()&&this.messageHandlers[n].handle({message:t,sourceClientId:e})}queueStateSync(e){!this.isHost()||this.stateSyncRequestClientIds.includes(e)||this.stateSyncFrameClientIds.includes(e)||(this.debugLog(`queueing state sync for ${e}`),this.stateSyncRequestClientIds=[...this.stateSyncRequestClientIds,e])}resetStateSync(){this.stateSyncRequestClientIds=[],this.stateSyncFrameClientIds=[],this.stateSyncFrameCount=void 0,this.awaitingStateSync=!1}setFrameCount(e){h(this).frameCount=e}resetDesyncCheck(){this.latestCheckFrameEvent=void 0,this.nextFrameStateHash=void 0,this.localStateHash=void 0}calculateFps(){let e=Date.now(),t=Date.now()-this.lastFpsCalculation.timestamp;t>1e3?(h(this).currentFps=this.lastFpsCalculation.frameCount/(t/1e3),this.lastFpsCalculation={frameCount:0,timestamp:e}):this.lastFpsCalculation={...this.lastFpsCalculation,frameCount:this.lastFpsCalculation.frameCount+1}}finishFrame(){let e=this.frameActions,t=this.nextFrameStateHash;this.frameActions=[],this.nextFrameStateHash=void 0,this.producedFrameCount++;let n=!!this.desyncCheckFrameInterval&&!(this.producedFrameCount%this.desyncCheckFrameInterval)&&this.getAllClientIds().length>1,r=!!this.stateSyncRequestClientIds.length;this.stateSyncFrameClientIds=[...this.stateSyncFrameClientIds,...this.stateSyncRequestClientIds],this.stateSyncRequestClientIds=[],this.roomConnection?.sendMessage({type:yv.Frame,packets:e,...n&&{shouldReportNextFrameHash:n},...t!=null&&{stateHash:t}});let i=new bv({detail:{packets:e,shouldReportNextFrameHash:n,...r&&{shouldSendStateSync:r}}});n&&(this.latestCheckFrameEvent=i),this.dispatch(i),this.frameTickReady=!1,this.calculateFps(),this.frameMs&&(this.timeoutId=globalThis.setTimeout(()=>{this.frameTickReady=!0,this.maybeFinishFrame()},this.frameMs))}maybeFinishFrame(){if(!this.isHost()){this.debugLog(`maybeFinishFrame skipped because this client is not host`);return}let e=this.singleplayer||this.roomConnection?.getConnectedClientIds().every(e=>this.clientsResponded[e]);if(!this.frameTickReady||!e||this.stateSyncFrameClientIds.length){this.debugLog(`maybeFinishFrame waiting: frameTickReady=${this.frameTickReady} clientsReady=${!!e} stateSyncs=${this.stateSyncFrameClientIds.length}`);return}this.finishFrame()}};function Tv(e={}){let t=!!(e.handlePacket||e.runFrameUpdate||e.desyncCheck||e.stateSync);return Xe({modName:`antha-multiplayer-p2p-lock-step`,trigger:t||e.handleClientStatus?{event:[...t?[bv]:[],...e.stateSync?[Sv]:[],...e.handleClientStatus?[Eu]:[]],executeImmediately:!0}:void 0,cleanup({state:e}){T.if(!!e.multiplayerP2pLockStep?.multiplayerController.debugMultiplayer).faint(`[multiplayer] cleaning up p2p-lock-step mod`),e.multiplayerP2pLockStep?.multiplayerController.destroy()},async execute(n){let{engine:r,state:i}=n;i.multiplayerP2pLockStep||(i.multiplayerP2pLockStep={multiplayerController:new wv({gameId:e.gameId||`antha`,acceptConnection:e.acceptConnection,debugMultiplayer:e.debugMultiplayer,desyncCheckInterval:e.desyncCheck?.interval,enableStateSync:!!e.stateSync,frameDuration:e.frameDuration,resyncOnDesync:e.stateSync?.resyncOnDesync}),connectionState:Cu},i.multiplayerP2pLockStep.multiplayerController.listen(Du,({detail:e})=>{i.multiplayerP2pLockStep&&(T.if(i.multiplayerP2pLockStep.multiplayerController.debugMultiplayer).faint(`[multiplayer] mod connection state updated: api=${String(e.api)} room=${String(e.room)}`),i.multiplayerP2pLockStep.connectionState=e)}),i.multiplayerP2pLockStep.multiplayerController.listenToAll(e=>{r.dispatch(e)})),n.executionTrigger.type===Se.Event&&await oe(n.executionTrigger.events,async r=>{if(i.multiplayerP2pLockStep?.multiplayerController){if(r instanceof Eu){await e.handleClientStatus?.({event:r,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});return}if(r instanceof Sv){await e.stateSync?.loadStateSync({stateSync:r.detail.stateSync,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i}),i.multiplayerP2pLockStep.multiplayerController.finishStateSync();return}if(r instanceof bv&&t&&!i.multiplayerP2pLockStep.multiplayerController.awaitingStateSync){i.multiplayerP2pLockStep.multiplayerController.checkStateHash(r);let t=i.multiplayerP2pLockStep.multiplayerController.countAppliedFrame();if(e.handlePacket)for(let t of r.detail.packets)await e.handlePacket({packet:t,multiplayerController:i.multiplayerP2pLockStep.multiplayerController,state:i});await e.runFrameUpdate?.({...n,currentTick:t,executionTrigger:{events:[r],type:Se.Event},msSinceLastExecute:i.multiplayerP2pLockStep.multiplayerController.frameMs,multiplayerFrameEvent:r,ticksSinceLastExecute:1}),r.detail.shouldReportNextFrameHash&&i.multiplayerP2pLockStep.multiplayerController.reportStateHash({frameEvent:r,stateHash:await e.desyncCheck?.createStateHash({state:i})}),r.detail.shouldSendStateSync&&e.stateSync&&i.multiplayerP2pLockStep.multiplayerController.sendStateSync(await e.stateSync.createStateSync({state:i}))}}})}})}function Ev(e,t){if(!(t in e.slotByClientId))return;let n=Object.entries(e.slotByClientId).filter(([e])=>e!==t).sort(([,e],[,t])=>e-t),r={...e.slotNames};e.slotByClientId={},e.slotNames={},e.connected={},n.forEach(([t,n],i)=>{e.slotByClientId[t]=i,e.slotNames[i]=r[n]??`Player ${i+1}`,e.connected[i]=!0})}function Dv(e,t){return gd(e.runState,t)}function Ov(e,t,n){let r=e.runState?.slotByClientId??{};return n!==G.JoinRun&&!(n===G.StartRun&&!_d(e.runState))&&Object.keys(r).length>0&&(t==null||!(t in r))}function kv(e){return`Player ${e+1}`}function Av(e){e.runState&&(e.level=ud(e.runState.levelId))}var jv={async[G.StartRun]({detail:e,state:t}){if(!t.entityStore)throw Error(`Cannot start run: no entity store exists.`);if(_d(t.runState)&&Dv(t,e.sourceClientId)!==0)return;t.entityStore.destroyAllEntities();let n=ud(e.packet.levelId);t.level=n,t.seededRandom=_n.fromSeed(e.packet.seed);let r=t.runState;if(t.runState=yd(n.levelId,e.packet.mode),r){t.runState.slotByClientId={...r.slotByClientId},t.runState.slotNames={...r.slotNames},t.runState.connected={...r.connected};for(let e of Object.keys(r.slotNames))t.runState.scoreBySlot[Number(e)]??=0}t.runState.slotByClientId[e.sourceClientId]=0,t.runState.slotNames[0]=kv(0),t.runState.connected[0]=!0,e.packet.ready&&(t.runState.status=W.Ready),await t.entityStore.addEntity(rv),await t.entityStore.addEntity(iv),await t.entityStore.addEntity(ov);for(let e of n.paths)for(let n of e.chutes??[])await t.entityStore.addEntity(av,{...Wu(e,n.distancePx),pathId:e.pathId,distancePx:n.distancePx,active:!1});await t.entityStore.addEntity(_v,{msUntilNextSpawn:0,pendingClumpSpawns:0,msUntilClumpSpawn:0,clumpWaveIndex:0,clumpPathId:``,clumpLaneCount:0,clumpLaneIndex:0}),await t.entityStore.addEntity(lv,{})},[G.BeginRun]({detail:e,state:t}){let{runState:n}=t;n?.status!==W.Ready||Object.keys(n.slotByClientId).length>0&&(Dv(t,e.sourceClientId)!==0||!Vu(ud(n.levelId),Lp(n)))||(n.status=W.Playing)},async[G.PlaceTower]({detail:e,state:t}){let{packet:n}=e;if(!t.entityStore||!t.level||t.runState?.status!==W.Playing||t.runState.paused)return;let r=Dv(t,e.sourceClientId),i=[...t.entityStore.getEntities(Yh)].map(e=>({x:e.params.x,y:e.params.y}));gp(n.towerType,hp(t.runState.prestigePoints))&&Vh(t.runState.coins,n.towerType)&&Bh({level:t.level,towers:i,slot:r,point:{x:n.x,y:n.y}}).valid&&(t.runState.coins-=Oc.towerCost[n.towerType],await t.entityStore.addEntity(Yh,{x:n.x,y:n.y,towerType:n.towerType,towerId:t.runState.nextTowerId,level:1,builtAtMs:t.runState.elapsedMs,ownerSlot:r,cooldownRemainingMs:0,lastProcessedAtMs:-1,lastTargetX:0,lastTargetY:0,angleDeg:n.towerType===q.Knife?Fh(t.level,n):n.angleDeg??0,wear:0}),t.runState.nextTowerId++)},[G.JoinRun]({detail:e,state:t}){let{runState:n}=t;if(!n)return;let r=n.slotByClientId[e.sourceClientId];if(r!=null){n.connected[r]=!0;return}let i=new Set(Object.values(n.slotByClientId)),a=new Set((t.level??ud(n.levelId)).paths.map(e=>e.ownerSlot)).size,o=[...i].filter(e=>n.connected[e]===!1).sort((e,t)=>e-t)[0];if(o==null){for(o=0;i.has(o);)o++;if(n.status!==W.Ready&&o>=a)return}else for(let[e,t]of Object.entries(n.slotByClientId))t===o&&delete n.slotByClientId[e];n.slotByClientId[e.sourceClientId]=o,n.slotNames[o]=e.packet.name||kv(o),n.connected[o]=!0,n.scoreBySlot[o]??=0,_d(n)&&(n.speed=1,n.resetSpeedOnIncome=!1)},[G.LeaveRun]({detail:e,state:t}){let n=t.runState?.slotByClientId[e.packet.clientId];t.runState&&n!=null&&(t.runState.status===W.Ready?Ev(t.runState,e.packet.clientId):t.runState.connected[n]=!1)},[G.UpgradeTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(Yh)){if(n.params.towerId!==e.packet.towerId)continue;if(n.params.level>=Jd.maxLevel)return;let r=of(n.params.towerType,n.params.level+1);t.runState.coins>=r&&bp({towerType:n.params.towerType,toLevel:n.params.level+1,stars:hp(t.runState.prestigePoints)})&&(t.runState.coins-=r,n.params.level++);return}},[G.SellTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused){for(let n of t.entityStore.getEntities(Yh))if(n.params.towerId===e.packet.towerId){Tp(t.runState,{amount:sf(n.params.towerType,n.params.level),reason:`Sold ${J[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.destroy(),n.params.towerId=0;return}}},[G.ServiceTower]({detail:e,state:t}){if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused)for(let n of t.entityStore.getEntities(Yh)){if(n.params.towerId!==e.packet.towerId)continue;let r=Zd(n.params.towerType);n.params.wear>0&&t.runState.coins>=r&&(Tp(t.runState,{amount:-r,reason:`Serviced ${J[n.params.towerType].label}`,x:n.params.x,y:n.params.y}),n.params.wear=0);return}},[G.TogglePause]({detail:e,state:t}){if(t.runState?.status!==W.Playing)return;let n=Dv(t,e.sourceClientId);t.runState.paused?(n===t.runState.pausedBySlot||n===0)&&(t.runState.paused=!1,t.runState.pausedBySlot=void 0):(t.runState.paused=!0,t.runState.pausedBySlot=n)},[G.SetSpeed]({detail:e,state:t}){t.runState?.status===W.Playing&&!_d(t.runState)&&Qh(e.packet.speed)&&(t.runState.speed=e.packet.speed)},[G.ArmSpeedReset]({state:e}){e.runState?.status===W.Playing&&!_d(e.runState)&&(e.runState.resetSpeedOnIncome=!0)},[G.ApplyTopping]({detail:e,state:t}){let{packet:n}=e;if(t.entityStore&&t.runState?.status===W.Playing&&!t.runState.paused){for(let e of t.entityStore.getEntities(Om))if(e.params.potatoId===n.potatoId){!e.params.carriedBySeagull&&e.params.dropInMs<=0&&mp(e.params,n.topping)&&(e.params[n.topping]=!0);return}}}};function Mv({state:e}){if(e.entityStore&&e.seededRandom&&e.runState)return Li([e.entityStore.hashEntities(),e.seededRandom.exportState(),JSON.parse(JSON.stringify(e.runState))])}function Nv({state:e}){if(!e.entityStore||!e.seededRandom||!e.runState)throw Error(`Cannot create state sync: game state is incomplete.`);return{entities:e.entityStore.createSnapshot(),randomState:e.seededRandom.exportState(),runState:e.runState}}async function Pv({state:e,stateSync:t}){if(!e.entityStore)throw Error(`Cannot load state sync: no entity store exists.`);e.seededRandom=_n.fromState(t.randomState),e.runState=t.runState,Av(e),e.entityStore.destroyAllEntities(),e.entityStore.registerEntities({entities:vv}),await e.entityStore.loadSnapshot(t.entities)}async function Fv(e){let{state:t}=e;if(t.runState?.status!==W.Playing||t.runState.paused)return;let{steps:n,accumulator:r}=Xh({accumulator:t.runState.speedAccumulator,speed:Zh(t.runState)});t.runState.speedAccumulator=r;for(let r=0;r<n&&t.runState.status===W.Playing;r++)t.runState.elapsedMs+=e.msSinceLastExecute,await t.entityStore?.updateAllEntities(e),Mp(t.runState)}var Iv=Tv({gameId:wd(globalThis.location.origin)??Au.gameId,frameDuration:{milliseconds:Nc.frameMs},desyncCheck:{interval:{seconds:1},createStateHash:Mv},stateSync:{createStateSync:Nv,loadStateSync:Pv,resyncOnDesync:!0},async handlePacket({packet:e,state:t}){if(!Ov(t,e.sourceClientId,e.packet.type))try{await jv[e.packet.type]({detail:e,state:t})}catch(t){T.error(S(t,`Failed to handle '${e.packet.type}' command.`))}},handleClientStatus({event:e,multiplayerController:t,state:n}){if(e.detail.lostHost!=null){Kd(n);return}t.isHost()&&`lostMember`in e.detail&&t.act({type:G.LeaveRun,clientId:e.detail.lostMember})},runFrameUpdate:Fv}),Lv=Xe({modName:`game-update`,execute({state:e}){!e.hasStartedInitialGame&&e.multiplayerP2pLockStep&&e.entityStore&&e.pixi?.pixiApplication?.screen&&(e.hasStartedInitialGame=!0,Sd===bd.Dev&&(globalThis.gameState=e),e.ui?.session.screen===Td.Playing&&Rd(e))}});async function Rv({assetLoader:e,engine:t,loadSession:n,state:r}){t.currentMods.push(ec({virtualHeight:O.height,virtualWidth:O.width}));let i=new ki;return r.audioPlayer=i,await Hs({assetLoader:e,audio:{assetName:`Game audio`,audioPlayer:i,files:ac,serial:!0},entities:vv},{doNotUnload:!0,loadSession:n}),r.currentBackgroundAudio=ic[nc.GameMusic],r.level=ld,r.runState=yd(),r.seededRandom=_n.fromSeed(nn()),r.ui={selectedTowerType:void 0,selectedTopping:void 0,selectedTowerId:void 0,pointerWorld:void 0,clicks:[],keys:[],wheelSteps:0,placementAngleDeg:0,session:Od()},{mods:[Gs({extraCanvasWrapperStyles:A`
                    z-index: 0;
                `,pixiOptions:{background:`black`,...qs()}}),...Sd===bd.Dev?[Us({debugFps:!0})]:[],Ni(),P_,qf,Iv,Lv,H_,Wm,L_,j_,Pi()]}}export{Rv as bootstrapGame};