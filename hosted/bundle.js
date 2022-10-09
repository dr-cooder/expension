(()=>{var e={867:e=>{let n,t,o=!1;const a=e=>{const n={};return n.x=e.pageX-e.target.offsetLeft,n.y=e.pageY-e.target.offsetTop,n},i=e=>{o=!0;const{x:n,y:i}=a(e);t.beginPath(),t.moveTo(n,i),t.lineTo(n,i),t.stroke()},r=e=>{if(!o)return;const{x:n,y:i}=a(e);t.lineTo(n,i),t.stroke()},s=()=>{o=!1,t.closePath()},c=()=>{o=!1,t.closePath()};e.exports={init:()=>(n=document.querySelector("#drawingBoard"),!!(n.getContext&&n.getContext("2d")&&n.toDataURL&&n.toDataURL())&&(t=n.getContext("2d"),n.onmousedown=i,n.onmousemove=r,n.onmouseup=s,n.onmouseout=c,t.lineWidth=3,t.strokeStyle="black",t.lineCap="round",t.lineJoin="round",!0)),toDataURL:()=>n.toDataURL(),drawImage:async e=>{const n=await(e=>new Promise(((n,t)=>{const o=new Image;o.crossOrigin="Anonymous",o.src=e,o.onload=()=>{n(o)},o.onerror=e=>{t(e)}})))(e);t.drawImage(n,0,0)},clear:()=>{const e=t.fillStyle;t.fillStyle="white",t.fillRect(0,0,n.width,n.height),t.fillStyle=e}}},454:e=>{const n="ABCDEFGHIJKLMNOPQRSTUVWXYZ",t=n.length;e.exports={makeNewCode:e=>{let o;do{o="";for(let e=0;e<3;e++)o+=n[Math.floor(Math.random()*t)]}while(e&&e[o]);return o},validateCode:(e,t,o)=>{if(!e)return{message:"No game code specified.",id:"noGameCode"};const a=e.length;for(let t=0;t<a;t++){const o=e[t];if(!n.includes(o))return{message:"Invalid game code character(s).",id:"invalidGameCodeChars"}}if(3!==a)return{message:"Invalid game code length.",id:"invalidGameCodeLength"};if(t){if(!t[e])return{message:"No game with this code has been created.",id:"noGameWithCode"};if(o&&0!==t[e].state)return{message:"That game is already in progress.",id:"gameAlreadyInProgress"}}return null}}}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}(()=>{const e=t(454),n=t(867);let o={},a={};const i=(e,n)=>{const t=n||(e=>e),o={};for(let n=0;n<e.length;n++){const a=e[n];o[a]=document.querySelector(`#${t(a)}`)}return o},r=e=>{o[e]&&Object.keys(o).forEach((n=>{o[n].classList.toggle("activeScreen",n===e)}))},s=async e=>{try{return await e.json()}catch(e){return}},c=async(e,n)=>{const t=await fetch(`/getGame?code=${e}`,{method:"get",headers:{Accept:"application/json"}}),o=await s(t)||{};return o&&200===t.status&&o.state===n?o:new Promise((t=>{setTimeout((()=>t(c(e,n))),1e3)}))},l=async(e,t,o,i)=>{a.finalScribble.classList.remove("finalDrawingActive"),a.finalExpension.classList.add("finalDrawingActive"),a.finalScribbleOrExpension.checked=!0,a.playAgainCheckbox.checked=!1,a.whyAmIWaiting.innerHTML="Waiting for the other player to make a scribble...",a.whatAmIDrawing.innerHTML="Make a scribble!",n.clear();const s=o===i;a.submitDrawingButton.onclick=async()=>{const o=n.toDataURL();await fetch(`/submitDrawing?code=${e}&round=${t}&which=${s?"scribble":"expension"}`,{method:"post",headers:{Accept:"application/json","Content-Type":"image/png"},body:o}),s&&(a.whyAmIWaiting.innerHTML="Waiting for the other player to make an exPENsion of your scribble...",r("waiting"),await c(e,3));const d=`/getDrawing?code=${e}&round=${t}&which=scribble`,m=`/getDrawing?code=${e}&round=${t}&which=expension`;a.finalScribble.src=d,a.finalExpension.src=m,a.saveDrawingsButton.onclick=()=>{(e=>{const n=t=>{if(t>=e.length)return;const o=e[t],a=document.createElement("a");a.href=o.url,a.target="_parent","download"in a&&(a.download=o.filename),(document.body||document.documentElement).appendChild(a),a.click(),a.remove(),setTimeout((()=>n(t+1)),500)};n(0)})([{url:d,filename:`expensiongame_${e}_1`},{url:m,filename:`expensiongame_${e}_2`}])},r("done");const u=await c(e,1);l(e,u.round,u.player1Scribbles,i)},a.playAgainCheckbox.onclick=n=>{fetch(`/readyForNextRound?code=${e}&ready=${n.target.checked?"yes":"no"}&player=${i?"player1":"player2"}`,{method:"post",headers:{Accept:"application/json"}})},r(s?"drawing":"waiting"),s||(await c(e,2),await n.drawImage(`/getDrawing?code=${e}&round=${t}&which=scribble`),a.whatAmIDrawing.innerHTML="It's exPENsion time! Turn this scribble into a coherent drawing!",r("drawing"))};window.onload=()=>{o=i(["start","displayCode","inputCode","waiting","drawing","done","noCanvas"],(e=>`${e}Screen`)),a=i(["newGameButton","newGameError","joinGameButton","codeDisplay","codeInput","submitJoinCodeButton","joinError","whyAmIWaiting","whatAmIDrawing","submitDrawingButton","finalScribble","finalExpension","finalScribbleOrExpension","saveDrawingsButton","playAgainCheckbox"]),n.init()||r("noCanvas");const t=async()=>{a.newGameButton.disabled=!0;const e=await fetch("/newGame",{method:"post",headers:{Accept:"application/json"}}),n=await s(e);if(n){if(201===e.status){const{code:e}=n;a.codeDisplay.innerHTML=e,r("displayCode");const{player1Scribbles:t}=await c(e,1);l(e,0,t,!0)}else a.newGameError.innerHTML=n.message;a.newGameButton.disabled=!1}else t()};a.newGameButton.onclick=t,a.joinGameButton.onclick=()=>r("inputCode");const d=async()=>{a.submitJoinCodeButton.disabled=!0,a.codeInput.disabled=!0;const n=a.codeInput.value.toUpperCase(),t=e.validateCode(n);if(t)return a.submitJoinCodeButton.disabled=!1,a.codeInput.disabled=!1,void(a.joinError.innerHTML=t.message);const o=await fetch(`/joinGame?code=${n}`,{method:"post",headers:{Accept:"application/json"}}),i=await s(o);if(i)if(200===o.status){const{player1Scribbles:e}=i;l(n,0,e,!1)}else a.submitJoinCodeButton.disabled=!1,a.codeInput.disabled=!1,a.joinError.innerHTML=i.message;else d()};a.submitJoinCodeButton.onclick=d,a.codeInput.onkeypress=e=>{"Enter"===(e.code||e.key)&&d()},a.finalScribbleOrExpension.onclick=e=>{const n=e.target.checked;a.finalScribble.classList[n?"remove":"add"]("finalDrawingActive"),a.finalExpension.classList[n?"add":"remove"]("finalDrawingActive")}}})()})();