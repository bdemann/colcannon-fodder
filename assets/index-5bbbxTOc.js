const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/load-game-BKtQHUGg.js","assets/game-world-xbSkHmBy.js","assets/rolldown-runtime-hePW80VL.js","assets/Geometry-IpHxCVTc.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/CanvasRenderer-bnA_Jfob.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js"])))=>i.map(i=>d[i]);
import{A as e,B as t,E as n,G as r,H as i,O as a,Ot as o,S as s,T as c,X as l,Z as u,_ as d,at as f,b as p,bt as m,c as h,d as g,f as _,g as v,h as y,i as b,it as x,j as S,k as ee,l as C,lt as w,n as T,nt as E,o as D,p as O,q as k,s as A,t as j,tt as M,u as N,v as P,x as F,y as I}from"./game-world-xbSkHmBy.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function L(e,t){return te(e,t)}var te=s(class extends F{element;lastListenerMetaData;isPartDisconnected=!1;constructor(e){super(e),this.element=y(e,`listen`)}resetListener(e){this.removeCurrentListener(),this.lastListenerMetaData=e,this.isConnected&&this.addCurrentListener()}addCurrentListener(){this.lastListenerMetaData&&this.element.addEventListener(this.lastListenerMetaData.eventType,this.lastListenerMetaData.listener)}removeCurrentListener(){this.lastListenerMetaData&&this.element.removeEventListener(this.lastListenerMetaData.eventType,this.lastListenerMetaData.listener)}isMidDispatchDisconnect(e){return!this.element.isConnected&&e.composedPath().some(e=>e instanceof Node&&e.isConnected)}createListenerMetaData(e,t){return{eventType:e,callback:t,listener:e=>{if(!this.isPartDisconnected||this.isMidDispatchDisconnect(e))return this.lastListenerMetaData?.callback(e)}}}render(e,t){let r=typeof e==`string`?e:e.type;if(typeof r!=`string`)throw TypeError(`Cannot listen to an event with a name that is not a string. Given event name: '${String(r)}'`);return this.lastListenerMetaData&&this.lastListenerMetaData.eventType===r?this.lastListenerMetaData.callback=t:this.resetListener(this.createListenerMetaData(r,t)),n}disconnected(){this.isPartDisconnected=!0}reconnected(){this.isPartDisconnected=!1,this.addCurrentListener()}}),R=P`
    /* iOS Safari */
    -webkit-touch-callout: none;
    /* Safari */
    -webkit-user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    user-select: none;
`,z=class extends o()(`local-storage-client-all-values-event`){},B=class{shapes;options;listenTarget=new x;keyEvents;get AllValuesType(){throw Error(`Cannot use AllValuesType as a runtime value. It is a type only.`)}get ValueType(){throw Error(`Cannot use ValueType as a runtime value. It is a type only.`)}constructor(e,t={}){this.shapes=e,this.options=t,this.storeName=t.storeName||`local-storage-client`,this.keyEvents=i(e,e=>class extends o()(`local-storage-client-${String(e)}-event`){}),this.get=i(this.shapes,e=>(t={})=>this.getAllValues(t)[e]),this.listen=i(this.shapes,e=>t=>this.listenTarget.listen(this.keyEvents[e],async e=>{await t(e.detail)})),this.set=i(this.shapes,e=>t=>{a(t,this.shapes[e],{allowExtraKeys:!0},`LocalStorageClient: Invalid value for key '${String(e)}'.`);let n=this.getAllValues();return n[e]=t,globalThis.localStorage.setItem(this.storeName,JSON.stringify(n)),this.listenTarget.dispatch(new z({detail:n})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:t})),t}),this.delete=i(this.shapes,e=>()=>{let t=this.getAllValues();delete t[e],globalThis.localStorage.setItem(this.storeName,JSON.stringify(t)),this.listenTarget.dispatch(new z({detail:t})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:void 0}))})}storeName;getAllValues({throwErrorOnFailure:e=!1}={}){return u(()=>{let t=JSON.parse(globalThis.localStorage.getItem(this.storeName)||`{}`);return k(t,(t,n)=>{let r=this.shapes[t];if(r){if(e)a(n,r,{allowExtraKeys:!0});else if(!ee(n,r,{allowExtraKeys:!0}))return;return{key:t,value:n}}})},{handleError:t=>{if(e)throw m(t,`LocalStorageClient: store '${this.storeName}' is corrupt and cannot be loaded.`);return{}}})}listenToAllValues(e){return this.listenTarget.listen(z,async t=>{await e(t.detail)})}listen;get;set;delete;clear(){globalThis.localStorage.removeItem(this.storeName)}destroy(){this.listenTarget.destroy()}};function V(e){return[t(e.prefix),`theme-vir-style`].join(`-`)}function H(e,t,n){let r=M(f(e.colors).flatMap(e=>[U({layerKey:`background`,themeColor:e,themeOverride:t}),U({layerKey:`foreground`,themeColor:e,themeOverride:t})]));return I(r,V(e),n)}function U({layerKey:e,themeOverride:t,themeColor:n}){let r=String(n[e].name);return[r,t?.overrides[r]||n[e].default]}var W;(function(e){e.Light=`light`,e.Dark=`dark`,e.Auto=`auto`})(W||={});var G=({useDarkTheme:e})=>{H(N,e?g:void 0)},K=`(prefers-color-scheme: dark)`,q={selectedTheme:S({theme:e(W)})},J=class{applyThemeCallback=G;localStorageClient;removeThemePreferenceListener=E(globalThis.matchMedia(K),`change`,e=>{w.instanceOf(e,MediaQueryListEvent),this.currentTheme===W.Auto&&this.applyThemeCallback({useDarkTheme:e.matches})});constructor(e={}){e.applyTheme&&(this.applyThemeCallback=e.applyTheme),this.localStorageClient=new B(q,{storeName:e.storeName||`vira-theme`}),this.applySelection(this.currentTheme)}get currentTheme(){return this.localStorageClient.get.selectedTheme()?.theme||W.Auto}setSelectedTheme(e){this.applySelection(e),this.localStorageClient.set.selectedTheme({theme:e})}destroy(){this.removeThemePreferenceListener(),this.localStorageClient.destroy()}applySelection(e){let t=e===W.Dark||e===W.Auto&&globalThis.matchMedia(K).matches;this.applyThemeCallback({useDarkTheme:t})}},Y=1e3;function X({hostElement:e,loadingScreenElement:t,options:n,screenSize:r}){let i=e.style.zoom?void 0:C({screenSize:r,virtualHeight:n.virtualHeight,virtualWidth:n.virtualWidth})?.scale;i==null?t.style.removeProperty(`zoom`):t.style.zoom=String(i)}var Z=v()({tagName:`antha-asset-loading-screen`,state(){return{resizeObserver:void 0}},cssVars:{"antha-asset-loading-screen-fade-ms":r({value:Y,suffix:`ms`})},hostClasses:{"antha-asset-loading-screen-completed"({inputs:e}){return e.completed}},init({host:e,inputs:t,updateState:n}){let{resizeObserver:r}=O(t.hostElement,({contentRect:n})=>{X({hostElement:t.hostElement,loadingScreenElement:e,options:t.options,screenSize:n})});n({resizeObserver:r})},cleanup({state:e}){e.resizeObserver?.disconnect()},styles({cssVars:e,hostClasses:t}){return P`
            :host {
                position: fixed;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: black;
                color: white;
                z-index: 9999;
                gap: 24px;
                opacity: 1;
                transition: opacity ${e[`antha-asset-loading-screen-fade-ms`].value} ease-in;
            }

            .loading-text {
                font-size: 24px;
                position: relative;
            }

            .dots {
                font-family: monospace;
                position: absolute;
                left: 100%;
                bottom: 0;
            }

            .progress-track {
                width: 300px;
                height: 1em;
                overflow: hidden;
                border: 4px solid white;
            }

            .current-resource-name {
                font-size: 14px;
                opacity: 0.7;
            }

            .progress-fill {
                height: 100%;
                background-color: white;
                transition: width ${200}ms ease-in;
            }

            ${t[`antha-asset-loading-screen-completed`].selector} {
                opacity: 0;
            }
        `},render({host:e,inputs:t,cssVars:n}){p({forCssVar:n[`antha-asset-loading-screen-fade-ms`],onElement:e,toValue:r({value:t.loadingScreenFadeMs,suffix:`ms`})});let i=t.dotCount%4,a=`.`.repeat(i)+`\xA0`.repeat(3-i);return _`
            <span class="loading-text">
                Loading
                <span class="dots">${a}</span>
            </span>
            <div>
                <span class="current-resource-name">
                    ${t.currentResourceName||_`
                        &nbsp;
                    `}
                </span>
                <div class="progress-track">
                    <div
                        class="progress-fill"
                        style=${P`
                            width: ${t.progressPercent}%;
                        `}
                    ></div>
                </div>
            </div>
        `}}),Q=`antha-asset`;function ne(e={}){let t=e.loadingScreenFadeMs??1e3;return A({modName:Q,async cleanup({state:e}){await e.assetLoader?.destroy()},execute({hostElement:n,state:r,engine:i}){if(r.assetLoader||=new T({logger:i.log}),r.assetLoader.advanceLoadState({currentTick:i.currentTick,engineTime:i.engineTime}),e.hideLoadingScreen)return;let a=r.assetLoader.loadState;if(a&&(a.completedAt==null||i.engineTime<=a.completedAt+t)){let r=a.total>0?a.current/a.total*100:0;return _`
                    <${Z.assign({hostElement:n,options:e,progressPercent:r,dotCount:Math.floor(i.engineTime/500)%4,completed:a.completedAt!=null,currentResourceName:a.currentResourceName,loadingScreenFadeMs:t})}></${Z}>
                `}}})}function re(){return function(e){return A({modName:`antha-bootstrap`,execute({engine:t,state:n}){let r=n.assetLoader;if(!r||n.hasStartedBootstrap)return D;n.hasStartedBootstrap=!0;let i=r.createLoadSession();return i.reportProgress({current:0,currentResourceName:e.assetName||`Game code`,total:0}),Promise.resolve().then(()=>e.loadModule()).then(async a=>{let o=await e.bootstrap({assetLoader:r,engine:t,loadSession:i,module:a,state:n});t.currentMods.push(...o.mods),i.complete()}).catch(e=>{i.complete(),t.log.error(m(e,`Failed to bootstrap game.`))}),D}})}}var $=v()({tagName:`vir-game`,events:{loadingScreenRendered:d()},styles:P`
        :host {
            background: black;
            display: block;
            height: 100%;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        ${h} {
            display: block;
            height: 100%;
            padding: 0;
            position: relative;
            width: 100%;
        }
    `,state(){return{engine:new b({mods:[ne({loadingScreenFadeMs:500,virtualHeight:j.height,virtualWidth:j.width}),re()({assetName:`Game code`,async loadModule(){return await l(()=>import(`./load-game-BKtQHUGg.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))},bootstrap({assetLoader:e,engine:t,loadSession:n,module:r,state:i}){return r.bootstrapGame({assetLoader:e,engine:t,loadSession:n,state:i})}})]}),cleanup:void 0}},init({dispatch:e,events:t,state:n,updateState:r}){let i=n.engine.observable.listen(!1,()=>{i(),e(new t.loadingScreenRendered({detail:void 0}))});r({cleanup:i})},cleanup({state:e}){e.cleanup?.()},render({state:e}){return _`
            <${h.assign({engine:e.engine})}></${h}>
        `}});v()({tagName:`vir-app`,styles:P`
        :host {
            color: ${N.colors[`theme-default`].foreground.value};
            display: block;
            font-family: sans-serif;
            height: 100%;
            width: 100%;
            ${R}
        }
    `,state(){let e=new J;return e.setSelectedTheme(W.Dark),{hasRenderedGameLoadingScreen:!1,themeClient:e}},cleanup({state:e}){e.themeClient.destroy()},render({state:e,updateState:t}){return _`
            <${$}
                ${L($.events.loadingScreenRendered,()=>{t({hasRenderedGameLoadingScreen:!0})})}
            ></${$}>
            ${e.hasRenderedGameLoadingScreen?c:_`
                      <slot></slot>
                  `}
        `}});