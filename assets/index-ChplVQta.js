const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/load-game-RGPZcRCs.js","assets/game-world-CJt24hSf.js","assets/rolldown-runtime-hePW80VL.js","assets/Geometry-IpHxCVTc.js","assets/getPo2TextureFromSource-BZjp2c1c.js","assets/canvasUtils-BVGwBBBn.js","assets/CanvasRenderer-bnA_Jfob.js","assets/RenderTargetSystem-Dmqog6ll.js","assets/getTextureBatchBindGroup-ClDkMdT3.js"])))=>i.map(i=>d[i]);
import{A as e,D as t,Dt as n,K as r,O as i,V as a,W as o,X as s,Y as c,_ as l,b as u,c as d,ct as f,d as p,et as m,f as h,g,i as _,it as v,k as y,l as b,m as x,n as S,o as C,p as w,rt as T,s as E,t as D,tt as O,u as k,v as A,w as j,y as M,yt as N,z as P}from"./game-world-CJt24hSf.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var F=A`
    /* iOS Safari */
    -webkit-touch-callout: none;
    /* Safari */
    -webkit-user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    user-select: none;
`,I=class extends n()(`local-storage-client-all-values-event`){},L=class{shapes;options;listenTarget=new T;keyEvents;get AllValuesType(){throw Error(`Cannot use AllValuesType as a runtime value. It is a type only.`)}get ValueType(){throw Error(`Cannot use ValueType as a runtime value. It is a type only.`)}constructor(e,r={}){this.shapes=e,this.options=r,this.storeName=r.storeName||`local-storage-client`,this.keyEvents=a(e,e=>class extends n()(`local-storage-client-${String(e)}-event`){}),this.get=a(this.shapes,e=>(t={})=>this.getAllValues(t)[e]),this.listen=a(this.shapes,e=>t=>this.listenTarget.listen(this.keyEvents[e],async e=>{await t(e.detail)})),this.set=a(this.shapes,e=>n=>{t(n,this.shapes[e],{allowExtraKeys:!0},`LocalStorageClient: Invalid value for key '${String(e)}'.`);let r=this.getAllValues();return r[e]=n,globalThis.localStorage.setItem(this.storeName,JSON.stringify(r)),this.listenTarget.dispatch(new I({detail:r})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:n})),n}),this.delete=a(this.shapes,e=>()=>{let t=this.getAllValues();delete t[e],globalThis.localStorage.setItem(this.storeName,JSON.stringify(t)),this.listenTarget.dispatch(new I({detail:t})),this.listenTarget.dispatch(new this.keyEvents[e]({detail:void 0}))})}storeName;getAllValues({throwErrorOnFailure:e=!1}={}){return s(()=>{let n=JSON.parse(globalThis.localStorage.getItem(this.storeName)||`{}`);return r(n,(n,r)=>{let a=this.shapes[n];if(a){if(e)t(r,a,{allowExtraKeys:!0});else if(!i(r,a,{allowExtraKeys:!0}))return;return{key:n,value:r}}})},{handleError:t=>{if(e)throw N(t,`LocalStorageClient: store '${this.storeName}' is corrupt and cannot be loaded.`);return{}}})}listenToAllValues(e){return this.listenTarget.listen(I,async t=>{await e(t.detail)})}listen;get;set;delete;clear(){globalThis.localStorage.removeItem(this.storeName)}destroy(){this.listenTarget.destroy()}};function R(e){return[P(e.prefix),`theme-vir-style`].join(`-`)}function z(e,t,n){let r=m(v(e.colors).flatMap(e=>[B({layerKey:`background`,themeColor:e,themeOverride:t}),B({layerKey:`foreground`,themeColor:e,themeOverride:t})]));return M(r,R(e),n)}function B({layerKey:e,themeOverride:t,themeColor:n}){let r=String(n[e].name);return[r,t?.overrides[r]||n[e].default]}var V;(function(e){e.Light=`light`,e.Dark=`dark`,e.Auto=`auto`})(V||={});var H=({useDarkTheme:e})=>{z(k,e?p:void 0)},U=`(prefers-color-scheme: dark)`,W={selectedTheme:e({theme:y(V)})},G=class{applyThemeCallback=H;localStorageClient;removeThemePreferenceListener=O(globalThis.matchMedia(U),`change`,e=>{f.instanceOf(e,MediaQueryListEvent),this.currentTheme===V.Auto&&this.applyThemeCallback({useDarkTheme:e.matches})});constructor(e={}){e.applyTheme&&(this.applyThemeCallback=e.applyTheme),this.localStorageClient=new L(W,{storeName:e.storeName||`vira-theme`}),this.applySelection(this.currentTheme)}get currentTheme(){return this.localStorageClient.get.selectedTheme()?.theme||V.Auto}setSelectedTheme(e){this.applySelection(e),this.localStorageClient.set.selectedTheme({theme:e})}destroy(){this.removeThemePreferenceListener(),this.localStorageClient.destroy()}applySelection(e){let t=e===V.Dark||e===V.Auto&&globalThis.matchMedia(U).matches;this.applyThemeCallback({useDarkTheme:t})}},K=1e3;function q({hostElement:e,loadingScreenElement:t,options:n,screenSize:r}){let i=e.style.zoom?void 0:b({screenSize:r,virtualHeight:n.virtualHeight,virtualWidth:n.virtualWidth})?.scale;i==null?t.style.removeProperty(`zoom`):t.style.zoom=String(i)}var J=g()({tagName:`antha-asset-loading-screen`,state(){return{resizeObserver:void 0}},cssVars:{"antha-asset-loading-screen-fade-ms":o({value:K,suffix:`ms`})},hostClasses:{"antha-asset-loading-screen-completed"({inputs:e}){return e.completed}},init({host:e,inputs:t,updateState:n}){let{resizeObserver:r}=w(t.hostElement,({contentRect:n})=>{q({hostElement:t.hostElement,loadingScreenElement:e,options:t.options,screenSize:n})});n({resizeObserver:r})},cleanup({state:e}){e.resizeObserver?.disconnect()},styles({cssVars:e,hostClasses:t}){return A`
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
        `},render({host:e,inputs:t,cssVars:n}){u({forCssVar:n[`antha-asset-loading-screen-fade-ms`],onElement:e,toValue:o({value:t.loadingScreenFadeMs,suffix:`ms`})});let r=t.dotCount%4,i=`.`.repeat(r)+`\xA0`.repeat(3-r);return h`
            <span class="loading-text">
                Loading
                <span class="dots">${i}</span>
            </span>
            <div>
                <span class="current-resource-name">
                    ${t.currentResourceName||h`
                        &nbsp;
                    `}
                </span>
                <div class="progress-track">
                    <div
                        class="progress-fill"
                        style=${A`
                            width: ${t.progressPercent}%;
                        `}
                    ></div>
                </div>
            </div>
        `}}),Y=`antha-asset`;function X(e={}){let t=e.loadingScreenFadeMs??1e3;return E({modName:Y,async cleanup({state:e}){await e.assetLoader?.destroy()},execute({hostElement:n,state:r,engine:i}){if(r.assetLoader||=new S({logger:i.log}),r.assetLoader.advanceLoadState({currentTick:i.currentTick,engineTime:i.engineTime}),e.hideLoadingScreen)return;let a=r.assetLoader.loadState;if(a&&(a.completedAt==null||i.engineTime<=a.completedAt+t)){let r=a.total>0?a.current/a.total*100:0;return h`
                    <${J.assign({hostElement:n,options:e,progressPercent:r,dotCount:Math.floor(i.engineTime/500)%4,completed:a.completedAt!=null,currentResourceName:a.currentResourceName,loadingScreenFadeMs:t})}></${J}>
                `}}})}function Z(){return function(e){return E({modName:`antha-bootstrap`,execute({engine:t,state:n}){let r=n.assetLoader;if(!r||n.hasStartedBootstrap)return C;n.hasStartedBootstrap=!0;let i=r.createLoadSession();return i.reportProgress({current:0,currentResourceName:e.assetName||`Game code`,total:0}),Promise.resolve().then(()=>e.loadModule()).then(async a=>{let o=await e.bootstrap({assetLoader:r,engine:t,loadSession:i,module:a,state:n});t.currentMods.push(...o.mods),i.complete()}).catch(e=>{i.complete(),t.log.error(N(e,`Failed to bootstrap game.`))}),C}})}}var Q=g()({tagName:`vir-game`,events:{loadingScreenRendered:l()},styles:A`
        :host {
            background: black;
            display: block;
            height: 100%;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        ${d} {
            display: block;
            height: 100%;
            padding: 0;
            position: relative;
            width: 100%;
        }
    `,state(){return{engine:new _({mods:[X({loadingScreenFadeMs:500,virtualHeight:D.height,virtualWidth:D.width}),Z()({assetName:`Game code`,async loadModule(){return await c(()=>import(`./load-game-RGPZcRCs.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))},bootstrap({assetLoader:e,engine:t,loadSession:n,module:r,state:i}){return r.bootstrapGame({assetLoader:e,engine:t,loadSession:n,state:i})}})]}),cleanup:void 0}},init({dispatch:e,events:t,state:n,updateState:r}){let i=n.engine.observable.listen(!1,()=>{i(),e(new t.loadingScreenRendered({detail:void 0}))});r({cleanup:i})},cleanup({state:e}){e.cleanup?.()},render({state:e}){return h`
            <${d.assign({engine:e.engine})}></${d}>
        `}});g()({tagName:`vir-app`,styles:A`
        :host {
            color: ${k.colors[`theme-default`].foreground.value};
            display: block;
            font-family: sans-serif;
            height: 100%;
            width: 100%;
            ${F}
        }
    `,state(){let e=new G;return e.setSelectedTheme(V.Dark),{hasRenderedGameLoadingScreen:!1,themeClient:e}},cleanup({state:e}){e.themeClient.destroy()},render({state:e,updateState:t}){return h`
            <${Q}
                ${x(Q.events.loadingScreenRendered,()=>{t({hasRenderedGameLoadingScreen:!0})})}
            ></${Q}>
            ${e.hasRenderedGameLoadingScreen?j:h`
                      <slot></slot>
                  `}
        `}});