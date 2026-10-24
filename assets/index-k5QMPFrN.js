const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/load-game-C3V_7wKb.js","assets/game-world-DqpF5MyS.js","assets/rolldown-runtime-hePW80VL.js","assets/Geometry-IpHxCVTc.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/CanvasRenderer-bnA_Jfob.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js"])))=>i.map(i=>d[i]);
import{A as e,D as t,Gt as n,K as r,Lt as i,O as a,V as o,W as s,X as c,Y as l,_ as u,b as d,c as f,ct as p,d as m,et as h,f as g,g as _,i as v,it as y,k as b,l as x,m as S,n as C,o as w,p as T,rt as E,s as D,t as O,tt as k,u as A,v as j,w as M,y as N,z as P}from"./game-world-DqpF5MyS.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var F=j`
    /* iOS Safari */
    -webkit-touch-callout: none;
    /* Safari */
    -webkit-user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    user-select: none;
`,I=class extends n()(`local-storage-client-all-values-event`){},L=class{shapes;options;listenTarget=new E;keyEvents;get AllValuesType(){throw Error(`Cannot use AllValuesType as a runtime value. It is a type only.`)}get ValueType(){throw Error(`Cannot use ValueType as a runtime value. It is a type only.`)}constructor(e,r={}){this.shapes=e,this.options=r,this.storeName=r.storeName||`local-storage-client`,this.keyEvents=o(e,e=>class extends n()(`local-storage-client-${String(e)}-event`){}),this.get=o(this.shapes,e=>(t={})=>this.getAllValues(t)[e]),this.listen=o(this.shapes,e=>t=>this.listenTarget.listen(this.keyEvents[e],async e=>{await t(e.detail)})),this.set=o(this.shapes,e=>n=>{t(n,this.shapes[e],{allowExtraKeys:!0},`LocalStorageClient: Invalid value for key '${String(e)}'.`);let r=this.getAllValues();return r[e]=n,globalThis.localStorage.setItem(this.storeName,JSON.stringify(r)),this.listenTarget.dispatch(new I({detail:r})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:n})),n}),this.delete=o(this.shapes,e=>()=>{let t=this.getAllValues();delete t[e],globalThis.localStorage.setItem(this.storeName,JSON.stringify(t)),this.listenTarget.dispatch(new I({detail:t})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:void 0}))})}storeName;getAllValues({throwErrorOnFailure:e=!1}={}){return c(()=>{let n=JSON.parse(globalThis.localStorage.getItem(this.storeName)||`{}`);return r(n,(n,r)=>{let i=this.shapes[n];if(i){if(e)t(r,i,{allowExtraKeys:!0});else if(!a(r,i,{allowExtraKeys:!0}))return;return{key:n,value:r}}})},{handleError:t=>{if(e)throw i(t,`LocalStorageClient: store '${this.storeName}' is corrupt and cannot be loaded.`);return{}}})}listenToAllValues(e){return this.listenTarget.listen(I,async t=>{await e(t.detail)})}listen;get;set;delete;clear(){globalThis.localStorage.removeItem(this.storeName)}destroy(){this.listenTarget.destroy()}};function R(e){return[P(e.prefix),`theme-vir-style`].join(`-`)}function z(e,t,n){let r=h(y(e.colors).flatMap(e=>[B({layerKey:`background`,themeColor:e,themeOverride:t}),B({layerKey:`foreground`,themeColor:e,themeOverride:t})]));return N(r,R(e),n)}function B({layerKey:e,themeOverride:t,themeColor:n}){let r=String(n[e].name);return[r,t?.overrides[r]||n[e].default]}var V;(function(e){e.Light=`light`,e.Dark=`dark`,e.Auto=`auto`})(V||={});var H=({useDarkTheme:e})=>{z(A,e?m:void 0)},U=`(prefers-color-scheme: dark)`,W={selectedTheme:e({theme:b(V)})},G=class{applyThemeCallback=H;localStorageClient;removeThemePreferenceListener=k(globalThis.matchMedia(U),`change`,e=>{p.instanceOf(e,MediaQueryListEvent),this.currentTheme===V.Auto&&this.applyThemeCallback({useDarkTheme:e.matches})});constructor(e={}){e.applyTheme&&(this.applyThemeCallback=e.applyTheme),this.localStorageClient=new L(W,{storeName:e.storeName||`vira-theme`}),this.applySelection(this.currentTheme)}get currentTheme(){return this.localStorageClient.get.selectedTheme()?.theme||V.Auto}setSelectedTheme(e){this.applySelection(e),this.localStorageClient.set.selectedTheme({theme:e})}destroy(){this.removeThemePreferenceListener(),this.localStorageClient.destroy()}applySelection(e){let t=e===V.Dark||e===V.Auto&&globalThis.matchMedia(U).matches;this.applyThemeCallback({useDarkTheme:t})}},K=1e3;function q({hostElement:e,loadingScreenElement:t,options:n,screenSize:r}){let i=e.style.zoom?void 0:x({screenSize:r,virtualHeight:n.virtualHeight,virtualWidth:n.virtualWidth})?.scale;i==null?t.style.removeProperty(`zoom`):t.style.zoom=String(i)}var J=_()({tagName:`antha-asset-loading-screen`,state(){return{resizeObserver:void 0}},cssVars:{"antha-asset-loading-screen-fade-ms":s({value:K,suffix:`ms`})},hostClasses:{"antha-asset-loading-screen-completed"({inputs:e}){return e.completed}},init({host:e,inputs:t,updateState:n}){let{resizeObserver:r}=T(t.hostElement,({contentRect:n})=>{q({hostElement:t.hostElement,loadingScreenElement:e,options:t.options,screenSize:n})});n({resizeObserver:r})},cleanup({state:e}){e.resizeObserver?.disconnect()},styles({cssVars:e,hostClasses:t}){return j`
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
        `},render({host:e,inputs:t,cssVars:n}){d({forCssVar:n[`antha-asset-loading-screen-fade-ms`],onElement:e,toValue:s({value:t.loadingScreenFadeMs,suffix:`ms`})});let r=t.dotCount%4,i=`.`.repeat(r)+`\xA0`.repeat(3-r);return g`
            <span class="loading-text">
                Loading
                <span class="dots">${i}</span>
            </span>
            <div>
                <span class="current-resource-name">
                    ${t.currentResourceName||g`
                        &nbsp;
                    `}
                </span>
                <div class="progress-track">
                    <div
                        class="progress-fill"
                        style=${j`
                            width: ${t.progressPercent}%;
                        `}
                    ></div>
                </div>
            </div>
        `}}),Y=`antha-asset`;function X(e={}){let t=e.loadingScreenFadeMs??1e3;return D({modName:Y,async cleanup({state:e}){await e.assetLoader?.destroy()},execute({hostElement:n,state:r,engine:i}){if(r.assetLoader||=new C({logger:i.log}),r.assetLoader.advanceLoadState({currentTick:i.currentTick,engineTime:i.engineTime}),e.hideLoadingScreen)return;let a=r.assetLoader.loadState;if(a&&(a.completedAt==null||i.engineTime<=a.completedAt+t)){let r=a.total>0?a.current/a.total*100:0;return g`
                    <${J.assign({hostElement:n,options:e,progressPercent:r,dotCount:Math.floor(i.engineTime/500)%4,completed:a.completedAt!=null,currentResourceName:a.currentResourceName,loadingScreenFadeMs:t})}></${J}>
                `}}})}function Z(){return function(e){return D({modName:`antha-bootstrap`,execute({engine:t,state:n}){let r=n.assetLoader;if(!r||n.hasStartedBootstrap)return w;n.hasStartedBootstrap=!0;let a=r.createLoadSession();return a.reportProgress({current:0,currentResourceName:e.assetName||`Game code`,total:0}),Promise.resolve().then(()=>e.loadModule()).then(async i=>{let o=await e.bootstrap({assetLoader:r,engine:t,loadSession:a,module:i,state:n});t.currentMods.push(...o.mods),a.complete()}).catch(e=>{a.complete(),t.log.error(i(e,`Failed to bootstrap game.`))}),w}})}}var Q=_()({tagName:`vir-game`,events:{loadingScreenRendered:u()},styles:j`
        :host {
            background: black;
            display: block;
            height: 100%;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        ${f} {
            display: block;
            height: 100%;
            padding: 0;
            position: relative;
            width: 100%;
        }
    `,state(){return{engine:new v({mods:[X({loadingScreenFadeMs:500,virtualHeight:O.height,virtualWidth:O.width}),Z()({assetName:`Game code`,async loadModule(){return await l(()=>import(`./load-game-C3V_7wKb.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))},bootstrap({assetLoader:e,engine:t,loadSession:n,module:r,state:i}){return r.bootstrapGame({assetLoader:e,engine:t,loadSession:n,state:i})}})]}),cleanup:void 0}},init({dispatch:e,events:t,state:n,updateState:r}){let i=n.engine.observable.listen(!1,()=>{i(),e(new t.loadingScreenRendered({detail:void 0}))});r({cleanup:i})},cleanup({state:e}){e.cleanup?.()},render({state:e}){return g`
            <${f.assign({engine:e.engine})}></${f}>
        `}});_()({tagName:`vir-app`,styles:j`
        :host {
            color: ${A.colors[`theme-default`].foreground.value};
            display: block;
            font-family: sans-serif;
            height: 100%;
            width: 100%;
            ${F}
        }
    `,state(){let e=new G;return e.setSelectedTheme(V.Dark),{hasRenderedGameLoadingScreen:!1,themeClient:e}},cleanup({state:e}){e.themeClient.destroy()},render({state:e,updateState:t}){return g`
            <${Q}
                ${S(Q.events.loadingScreenRendered,()=>{t({hasRenderedGameLoadingScreen:!0})})}
            ></${Q}>
            ${e.hasRenderedGameLoadingScreen?M:g`
                      <slot></slot>
                  `}
        `}});