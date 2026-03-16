(function(){const y=document.createElement("link").relList;if(y&&y.supports&&y.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))M(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const C of d.addedNodes)C.tagName==="LINK"&&C.rel==="modulepreload"&&M(C)}).observe(document,{childList:!0,subtree:!0});function v(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function M(s){if(s.ep)return;s.ep=!0;const d=v(s);fetch(s.href,d)}})();document.addEventListener("DOMContentLoaded",()=>{const P={padrao:{22:[176e3,178640,181319.6,184039.39,186799.98,189601.98,192446.01,195332.7,198262.7,201236.64,204255.19,207319.01,210428.8],48:[384e3,389760,395606.4,401540.58,407563.6,413677.06,419882.21,426180.45,432573.15,439061.75,445647.68,452332.39,459117.38],59:[472e3,479080,486266.2,493560.19,500963.6,508478.05,516105.22,523846.8,531704.5,539680.07,547775.27,555991.9,564331.78],80:[64e4,649600,659344,669234.16,679272.67,689461.76,699803.69,710300.74,720955.26,731769.58,742746.13,753887.32,765195.63]},investidor:{22:[148e3,149145,147322.18,149552.01,151774.99,154051.61,156382.39,158707.82,161088.44,163504.77,165957.34,168446.7,170973.4],48:[312e3,316680,321430.2,326251.66,331145.43,336112.61,341154.3,346271.61,351465.69,356737.67,362088.74,367520.07,373032.87],59:[383500,389252.5,395091.29,401017.66,407032.92,413138.42,419335.49,425625.52,432009.91,438490.06,445067.41,451743.42,458519.57],80:[52e4,527800,535717,543752.78,551909.05,560187.68,568590.5,577119.35,585776.15,594592.79,603481.23,612503.45,621721.45]}},y=3e4,v=.008,M=.00873,s=.198,d={22:{padrao:1850,mobiliado:2640,decorado:3025},48:{padrao:2900,mobiliado:4125,decorado:4730},59:{padrao:3600,mobiliado:5115,decorado:5830},80:{padrao:4800,mobiliado:6820,decorado:7810}},C={22:300,48:550,59:700,80:950},z={22:{daily:220,occupancy:.65},48:{daily:350,occupancy:.6},59:{daily:440,occupancy:.6},80:{daily:600,occupancy:.55}},R=document.getElementById("garage"),D=document.getElementById("totalPrice"),H=document.getElementById("padrao-details"),N=document.getElementById("investidor-details");let O=0,p=0;function j(){document.querySelectorAll(".btn-group").forEach(t=>{t.addEventListener("click",o=>{const e=o.target.closest("button");e&&(Array.from(t.children).forEach(n=>n.classList.remove("active")),e.classList.add("active"),t.id==="obra-term-group"?k():T())})}),R.addEventListener("change",T)}function K(){["padrao-financiamento","investidor-financiamento"].forEach(t=>{const o=document.getElementById(t);o.addEventListener("click",e=>{const n=e.target.closest("tr");if(!(!n||n.parentNode.tagName==="THEAD")&&(Array.from(o.querySelectorAll("tbody tr")).forEach(r=>r.classList.remove("active-row")),n.classList.add("active-row"),t==="padrao-financiamento")){const r=n.cells[1].textContent;p=parseFloat(r.replace(/[^\d,-]/g,"").replace(",",".")),T()}})})}function U(){const t=document.getElementById("floor-group");t.innerHTML="";for(let o=1;o<=13;o++){const e=document.createElement("button");e.dataset.value=o-1,e.textContent=`${o}º`,e.className="p-2 text-sm rounded-md",o===1&&e.classList.add("active"),t.appendChild(e)}}function a(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function $(t,o,e){if(t<=0)return 0;if(e<=0)return t/o;const n=e,r=o,c=n*Math.pow(1+n,r),i=Math.pow(1+n,r)-1;return t*(c/i)}function k(){const t=parseInt(document.querySelector("#obra-term-group .active").dataset.term,10),o=$(O,t,v);document.getElementById("obra-installment-display").textContent=`${t}x de ${a(o)}`}function G(t,o,e,n,r){var B;const c=n.charAt(0).toUpperCase()+n.slice(1),i=((B=d[t])==null?void 0:B[n])||0,f=(i-r)*12/o*100,u=z[t]||{daily:0,occupancy:0},b=u.daily*30*u.occupancy;let h="";if(e){const m=p+r,l=m-i;h=`
            <div class="mt-8 pt-6 border-t">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">Análise de Viabilidade: Aluguel vs. Custo Mensal</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                     <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-500">Parcela Financiamento</p>
                        <p class="text-lg font-bold text-gray-800">${a(p)}</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-500">Condomínio (Est.)</p>
                        <p class="text-lg font-bold text-gray-800">${a(r)}</p>
                    </div>
                     <div class="bg-indigo-100 p-3 rounded-lg">
                        <p class="text-sm text-indigo-800">Custo Mensal Total</p>
                        <p class="text-lg font-bold text-indigo-800">${a(m)}</p>
                    </div>
                </div>
                <div class="text-center mt-4 p-3 rounded-lg ${l>0?"bg-amber-100":"bg-emerald-100"}">
                    <p class="font-semibold ${l>0?"text-amber-800":"text-emerald-800"}">
                        ${l>0?`Faltam ${a(l)} para o aluguel (${a(i)}) cobrir seu custo mensal.`:`O aluguel (${a(i)}) já cobre seu custo mensal com folga de ${a(Math.abs(l))}!`}
                    </p>
                </div>
            </div>`}return`
        <div class="border-t pt-8 mt-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">Análise de Rentabilidade Pós-Entrega (Aluguel)</h3>
            <div class="text-center bg-gray-50 p-2 rounded-lg mb-4">
                <p class="text-sm text-gray-600">Estimativa de Condomínio: <span class="font-bold">${a(r)}/mês</span></p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-lg font-semibold text-gray-700 mb-3 text-center">Locação Tradicional (${c})</h4>
                    <div class="text-center">
                        <div class="bg-gray-50 p-4 rounded-lg mb-2">
                            <div class="text-sm text-gray-500">Aluguel Bruto Estimado</div>
                            <div class="text-lg font-bold text-gray-800">${a(i)}</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-sm text-blue-800">Rentabilidade Anual (Líquida)</div>
                            <div class="text-lg font-bold text-blue-800">${f.toFixed(2)}% a.a.</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-gray-700 mb-3 text-center">Locação Curta Duração (Airbnb)</h4>
                     <div class="text-center bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-500">Diária Média: ${a(u.daily)}</p>
                        <p class="text-sm text-gray-500 mb-2">Ocupação Estimada: ${(u.occupancy*100).toFixed(0)}%</p>
                        <div class="text-sm text-gray-500">Renda Mensal Bruta Estimada</div>
                        <p class="text-lg font-bold text-gray-800">${a(b)}</p>
                    </div>
                </div>
            </div>
        </div>
        ${h}
        `}function Y(t){const o=document.querySelector("#priceType-group .active").dataset.value,e=document.querySelector("#area-group .active").dataset.value,n=parseInt(document.querySelector("#floor-group .active").dataset.value,10),r=R.checked,c=document.querySelector("#finish-group .active"),i=(c==null?void 0:c.dataset.value)||"padrao",x=C[e]||0,f=P.padrao[e][n],u=parseFloat((c==null?void 0:c.dataset.pricePerSqm)||0),b=parseFloat(e),h=u*b,m=f*(1+s)+(r?y:0)+h;if(o==="padrao"){H.classList.remove("hidden"),N.classList.add("hidden");const l=t*.05,E=t*.15,A=t*.15,g=t*.65;O=E,document.getElementById("padrao-sinal").textContent=a(l),document.getElementById("padrao-obra").textContent=a(E),document.getElementById("padrao-chaves").textContent=a(A),document.getElementById("padrao-saldo").textContent=a(g),k();const q=[60,90,120,150,180,200,240],w=document.getElementById("padrao-financiamento");let S='<thead class="bg-gray-50"><tr class="text-xs font-medium text-gray-500 uppercase tracking-wider"><th class="px-3 py-2">Prazo</th><th class="px-3 py-2 text-indigo-600">Nossa Parcela</th><th class="px-3 py-2 text-pink-600">Média Bancos</th></tr></thead><tbody>';const I=document.querySelector("#padrao-financiamento .active-row");q.forEach((L,J)=>{const V=$(g,L,v),Q=$(g,L,M);let F=!1;if(!I&&J===0)p=V,F=!0;else if(I){const W=I.cells[0].textContent,X=parseInt(W.replace(/\D/g,""));L===X&&(F=!0)}S+=`<tr class="border-t ${F?"active-row":""}"><td class="px-3 py-2 text-sm">${L} meses</td><td class="px-3 py-2 text-sm font-semibold text-indigo-600">${a(V)}</td><td class="px-3 py-2 text-sm text-gray-500">${a(Q)}</td></tr>`}),w.innerHTML=S+"</tbody>",document.getElementById("padrao-rental-analysis").innerHTML=G(e,m,!0,i,x)}else{H.classList.add("hidden"),N.classList.remove("hidden"),p=0;const l=[12,18,24,36,48],E=document.getElementById("investidor-financiamento");let A='<thead class="bg-gray-50"><tr class="text-xs font-medium text-gray-500 uppercase tracking-wider"><th class="px-4 py-2">Prazo</th><th class="px-4 py-2">Parcela</th></tr></thead><tbody>';l.forEach(I=>{const L=$(t,I,v);A+=`<tr class="border-t"><td class="px-4 py-2">${I} meses</td><td class="px-4 py-2">${a(L)}</td></tr>`}),E.innerHTML=A+"</tbody>";const g=t,q=m-g,w=q/g*100;document.getElementById("investidor-compra").textContent=a(g),document.getElementById("investidor-entrega").textContent=a(m),document.getElementById("investidor-lucro").textContent=a(q),document.getElementById("investidor-rentabilidade").textContent=`${w.toFixed(2)}%`;const S=document.getElementById("investor-rental-analysis");S.innerHTML=G(e,m,!1,i,x)}}function T(){var x,f,u,b;const t=(x=document.querySelector("#priceType-group .active"))==null?void 0:x.dataset.value,o=document.querySelector("#area-group .active"),e=o==null?void 0:o.dataset.value,n=parseInt((f=document.querySelector("#floor-group .active"))==null?void 0:f.dataset.value,10),r=R.checked,c=document.querySelector("#finish-group .active"),i=parseFloat((c==null?void 0:c.dataset.pricePerSqm)||0);if(t&&e&&!isNaN(n)&&((b=(u=P[t])==null?void 0:u[e])==null?void 0:b[n])!==void 0){let h=P[t][e][n];const B=parseFloat(e),m=i*B;let l=h+(r?y:0)+m;if(t==="padrao"&&p===0){const E=l*.65;p=$(E,60,v)}D.textContent=a(l),Y(l)}else D.textContent="Selecione as opções"}U(),j(),K(),T()});
