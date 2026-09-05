/* CityAI — served from the backend, calls /chat and /lead live.
   Paste this ONE script tag into Carrd (Embed, Type: Code, Style: Hidden or Default):
     <script src="https://cityai-backend-production.up.railway.app/widget.js"></script>
   Replaces the three-block EMBED-A/B/C static version. */
(function(){
"use strict";
if(window.__caiLive) return; window.__caiLive = true;

var CAI_AVATAR = "data:image/png;base64,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";
var BACKEND = (function(){
  var s = document.currentScript;
  try { return new URL(s.src).origin; } catch(e) { return ""; }
})();
var TG = "https://t.me/cityshopspagebot";
var WA = "https://wa.me/971503602149";
var SITE = "https://citysearchpage.in";

var css = ""+
"#cai-panel,#cai-panel *{box-sizing:border-box;margin:0;padding:0}"+
"#cai-panel{font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"+
"width:100%;max-width:940px;margin:0 auto;height:560px;background:#17171B;border:1px solid #2A2A31;"+
"border-radius:20px;display:flex;flex-direction:column;overflow:hidden;text-align:left;"+
"box-shadow:0 18px 60px rgba(0,0,0,.55)}"+
"@media(max-width:700px){#cai-panel{height:74vh;min-height:460px;border-radius:16px}}"+
".cai-hd{display:flex;align-items:center;gap:12px;padding:16px 20px;flex-shrink:0;"+
"background:#1C1C22;border-bottom:1px solid #2A2A31}"+
".cai-av{width:40px;height:40px;border-radius:12px;background:#FFD900;color:#000;"+
"display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"+
"font-family:Sora,sans-serif;font-weight:700;font-size:13px}"+
".cai-av img{width:100%;height:100%;object-fit:cover}"+
".cai-hd h4{font-family:Sora,sans-serif;font-size:15px;font-weight:600;color:#fff}"+
".cai-hd p{font-size:9.5px;color:#8A8A98;margin-top:3px;text-transform:uppercase;letter-spacing:2px}"+
".cai-dot{width:6px;height:6px;border-radius:50%;background:#3DDC84;display:inline-block;margin-right:6px}"+
".cai-log{flex:1;overflow-y:auto;padding:20px 20px 8px;background:#17171B;display:flex;flex-direction:column;gap:12px}"+
".cai-log::-webkit-scrollbar{width:6px}.cai-log::-webkit-scrollbar-thumb{background:#33333C;border-radius:3px}"+
".cai-r{display:flex;max-width:78%}.cai-r.cai-me{align-self:flex-end}.cai-r.cai-bot{align-self:flex-start}"+
".cai-b{padding:12px 16px;border-radius:16px;font-size:14.5px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word}"+
".cai-bot .cai-b{background:#232329;color:#E8E8EF;border-bottom-left-radius:5px}"+
".cai-me .cai-b{background:#FFD900;color:#111;border-bottom-right-radius:5px;font-weight:500}"+
".cai-b b{font-weight:600;color:#fff}.cai-me .cai-b b{color:#000}"+
"@media(max-width:700px){.cai-r{max-width:88%}.cai-b{font-size:14px;padding:11px 14px}}"+
".cai-typ{display:flex;gap:5px;padding:16px}.cai-typ i{width:6px;height:6px;border-radius:50%;background:#6A6A78;animation:caiB 1.3s infinite}"+
".cai-typ i:nth-child(2){animation-delay:.16s}.cai-typ i:nth-child(3){animation-delay:.32s}"+
"@keyframes caiB{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}"+
".cai-chips{display:flex;flex-wrap:wrap;gap:8px;padding:6px 20px 14px;flex-shrink:0;background:#17171B}"+
".cai-chip{background:rgba(255,217,0,.08);border:1.5px solid #FFD900;color:#FFD900;font:inherit;"+
"font-size:13.5px;font-weight:600;padding:10px 20px 10px 22px;border-radius:40px;cursor:pointer;"+
"transition:.15s;box-shadow:0 0 0 0 rgba(255,217,0,0);white-space:nowrap;letter-spacing:.1px}"+
".cai-chip:hover{background:#FFD900;border-color:#FFD900;color:#000;"+
"box-shadow:0 2px 12px rgba(255,217,0,.35)}"+
".cai-chip.cai-go{background:#FFD900;border-color:#FFD900;color:#000;font-weight:700}"+
".cai-chip.cai-go:hover{background:#FFE43D}"+
".cai-form{background:#1E1E24;border:1px solid #2E2E37;border-radius:16px;padding:18px;align-self:stretch}"+
".cai-form h5{font-family:Sora,sans-serif;font-size:14px;font-weight:600;color:#fff;margin-bottom:5px}"+
".cai-form .cai-sub{font-size:12px;color:#8A8A98;margin-bottom:14px;line-height:1.55}"+
".cai-form label{display:block;font-size:10.5px;font-weight:600;color:#A8A8B8;margin:11px 0 5px;"+
"letter-spacing:.6px;text-transform:uppercase}"+
".cai-form input,.cai-form select{width:100%;padding:11px 13px;border:1px solid #33333E;border-radius:10px;"+
"font:inherit;font-size:14px;color:#fff;background:#17171B;outline:0}"+
".cai-form input:focus,.cai-form select:focus{border-color:#FFD900}"+
".cai-sb{width:100%;margin-top:16px;background:#FFD900;color:#000;border:0;padding:13px;border-radius:40px;"+
"font:inherit;font-size:14px;font-weight:600;cursor:pointer}"+
".cai-sb:hover{background:#FFE43D}.cai-sb:disabled{background:#33333E;color:#8A8A98}"+
".cai-er{color:#FF6B6B;font-size:12px;margin-top:10px;display:none}"+
".cai-cmp{display:flex;gap:10px;padding:16px 20px;border-top:1px solid #2A2A31;background:#1C1C22;"+
"flex-shrink:0;align-items:center}"+
".cai-cmp input{flex:1;height:52px;padding:0 20px;border:1px solid #33333E;border-radius:40px;font:inherit;"+
"font-size:15.5px;line-height:52px;outline:0;color:#fff;background:#17171B;min-width:0}"+
".cai-cmp input:focus{border-color:#FFD900}"+
".cai-snd{width:52px;height:52px;border-radius:50%;background:#FFD900;color:#000;border:0;cursor:pointer;"+
"flex-shrink:0;font-size:19px;font-weight:700}"+
".cai-snd:hover{background:#FFE43D}"+
".cai-ft{text-align:center;font-size:9px;color:#5A5A68;padding:0 16px 12px;background:#1C1C22;flex-shrink:0}";

var styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

function findMount(){
  return document.getElementById("cai-mount") || document.currentScript.parentElement;
}
var mount = findMount();
mount.insertAdjacentHTML("beforeend",
  '<div id="cai-panel" role="region" aria-label="CityAI assistant">'+
    '<div class="cai-hd"><div class="cai-av" id="cai-av"><img id="cai-av-img" src="'+CAI_AVATAR+'" alt="CityAI"></div><div><h4>CityAI</h4>'+
    '<p><span class="cai-dot"></span>Online now</p></div></div>'+
    '<div class="cai-log" id="cai-log"></div>'+
    '<div class="cai-chips" id="cai-chips"></div>'+
    '<div class="cai-cmp"><input id="cai-inp" placeholder="Type your question…" autocomplete="off">'+
    '<button class="cai-snd" id="cai-snd" aria-label="Send">&rarr;</button></div>'+
    '<div class="cai-ft">Citysearchpage Limited &middot; Licence MC 14060</div>'+
  '</div>');

var avImg = document.getElementById("cai-av-img");
if (avImg) { avImg.onerror = function(){ var box = document.getElementById("cai-av"); if (box) box.textContent = "CA"; }; }
var log = document.getElementById("cai-log"), chips = document.getElementById("cai-chips"),
    inp = document.getElementById("cai-inp"), snd = document.getElementById("cai-snd");
var history = [];   // {role, content} sent to /chat
var seg = null;

function sc(){ setTimeout(function(){ log.scrollTop = log.scrollHeight; }, 20); }
function me(t){ var r=document.createElement("div"); r.className="cai-r cai-me";
  var b=document.createElement("div"); b.className="cai-b"; b.textContent=t;
  r.appendChild(b); log.appendChild(r); sc(); }
function bot(h){ var r=document.createElement("div"); r.className="cai-r cai-bot";
  r.innerHTML='<div class="cai-b">'+h+"</div>"; log.appendChild(r); sc(); }
function typing(){ var r=document.createElement("div"); r.className="cai-r cai-bot";
  r.innerHTML='<div class="cai-b cai-typ"><i></i><i></i><i></i></div>'; log.appendChild(r); sc(); return r; }
function setChips(list){ chips.innerHTML="";
  list.forEach(function(c){ var b=document.createElement("button"); b.type="button";
    b.className="cai-chip"+(c.go?" cai-go":""); b.textContent=c.t;
    b.onclick=function(){ if(c.url){ window.open(c.url,"_blank","noopener"); return; }
      if(c.text){ send(c.text); return; } if(c.fn) c.fn(); };
    chips.appendChild(b); }); }

function escapeHtml(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function mdLite(s){
  s = escapeHtml(s);
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  return s;
}

async function callChat(){
  var t = typing();
  try {
    var r = await fetch(BACKEND + "/chat", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ messages: history })
    });
    var data = await r.json();
    t.remove();
    if(!r.ok){ bot("Sorry, something went wrong on our side. Please try WhatsApp instead."); afterError(); return; }
    var reply = data.reply || "…";
    history.push({role:"assistant", content: reply});
    bot(mdLite(reply));
    if(data.lead_capture){ setTimeout(form, 400); }
    else { offerChips(); }
  } catch(e){
    t.remove();
    bot("Connection hiccup — please try again, or message us on WhatsApp.");
    afterError();
  }
}
function afterError(){
  setChips([{t:"Message on WhatsApp", go:1, url:WA}]);
}
function offerChips(){
  setChips([
    {t:"What does it cost?", text:"What does it cost?"},
    {t:"How does it work?", text:"How does it work?"},
    {t: seg==="Brand / Chain" ? "Talk to someone" : "Get started free", go:1,
      fn: function(){ seg==="Brand / Chain" ? window.open(WA,"_blank","noopener") : window.open(TG,"_blank","noopener"); }},
    {t:"Leave my details", fn: form}
  ]);
}

function form(){
  chips.innerHTML="";
  var d=document.createElement("div"); d.className="cai-form";
  d.innerHTML='<h5>Let\'s get you set up</h5>'+
   '<div class="cai-sub">We\'ll reach out personally. No spam, and your details are never shared.</div>'+
   '<label>Your name</label><input id="cai-n" placeholder="Full name">'+
   '<label>Shop / brand name</label><input id="cai-s" placeholder="Business name">'+
   '<label>Phone / WhatsApp</label><input id="cai-p" placeholder="e.g. +91 98765 43210" inputmode="tel">'+
   '<label>Email <span style="color:#94A3B8;font-weight:400">(optional)</span></label>'+
   '<input id="cai-e" placeholder="Only if you prefer email" inputmode="email">'+
   '<label>City</label><input id="cai-c" placeholder="e.g. Ahmedabad">'+
   '<label>You are a</label><select id="cai-g"><option>Shop owner</option>'+
   '<option>Brand / Chain</option><option>Wholesaler</option><option>Just exploring</option></select>'+
   '<label>How soon do you want to start?</label><select id="cai-t2">'+
   '<option>Right away</option><option>Within a month</option>'+
   '<option>In 2-3 months</option><option>Just researching</option></select>'+
   '<button class="cai-sb" id="cai-go" type="button">Send my details</button>'+
   '<div class="cai-er" id="cai-er">Please add your name and a phone number.</div>';
  log.appendChild(d); sc();
  if(seg) d.querySelector("#cai-g").value = (seg==="Brand / Chain") ? "Brand / Chain" : "Shop owner";
  d.querySelector("#cai-go").onclick = function(){ submitLead(d); };
}

async function submitLead(d){
  var v = function(id){ var e=d.querySelector(id); return e?e.value.trim():""; };
  var name=v("#cai-n"), phone=v("#cai-p");
  if(!name||!phone){ d.querySelector("#cai-er").style.display="block"; return; }
  var rec = { name:name, shop:v("#cai-s"), phone:phone, email:v("#cai-e"), city:v("#cai-c"),
    segment:d.querySelector("#cai-g").value, timeline:d.querySelector("#cai-t2").value,
    topics:"chat", source:"CityAI", page:(location&&location.href)||"" };
  var g=d.querySelector("#cai-go"); g.disabled=true; g.textContent="Sending...";
  try {
    var r = await fetch(BACKEND + "/lead", { method:"POST",
      headers:{"Content-Type":"application/json"}, body: JSON.stringify(rec) });
    var data = await r.json();
    d.remove(); me("Sent my details");
    if(data.success){
      bot("Got it, <b>"+escapeHtml(name.split(" ")[0])+"</b> — thank you. Someone from Citysearchpage will reach out on "+escapeHtml(phone)+".");
    } else {
      bot("Thanks — we had a small hiccup saving that. Please also message us on WhatsApp so we don't miss you.");
    }
    setChips([
      {t: rec.segment==="Brand / Chain" ? "Message on WhatsApp" : "Create my shop now", go:1,
       url: rec.segment==="Brand / Chain" ? WA : TG},
      {t:"Browse the marketplace", url: SITE}
    ]);
  } catch(e){
    d.remove(); me("Sent my details");
    bot("Connection hiccup saving that — please message us directly on WhatsApp.");
    setChips([{t:"Message on WhatsApp", go:1, url:WA}]);
  }
}

async function send(preset){
  var t = (typeof preset === "string") ? preset : inp.value.trim();
  if(!t) return;
  if(typeof preset !== "string") inp.value = "";
  me(t); chips.innerHTML="";
  history.push({role:"user", content:t});
  callChat();
}
snd.onclick = function(){ send(); };
inp.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.keyCode===13) send(); });

/* opening turn — static greeting client-side, then real turns go to /chat */
bot("Hello 👋 I'm <b>CityAI</b>, from Citysearchpage.\n\nWe help local shops get found by people searching for what they sell — right now, in their city.");
setTimeout(function(){
  bot("So I point you the right way — which of these is you?");
  setChips([
    {t:"I own a shop", fn:function(){ seg="Shop owner"; send("I own a shop and want to know more."); }},
    {t:"I run a brand or chain", fn:function(){ seg="Brand / Chain"; send("I run a brand or multi-branch chain."); }},
    {t:"I'm just looking", fn:function(){ seg="Just exploring"; send("I'm just browsing for now."); }}
  ]);
}, 500);
})();
