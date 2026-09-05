/* CityAI — served from the backend, calls /chat and /lead live.
   Paste this ONE script tag into Carrd (Embed, Type: Code, Style: Hidden or Default):
     <script src="https://cityai-backend-production.up.railway.app/widget.js"></script>
   Replaces the three-block EMBED-A/B/C static version. */
(function(){
"use strict";
if(window.__caiLive) return; window.__caiLive = true;

var BACKEND = (function(){
  var s = document.currentScript;
  try { return new URL(s.src).origin; } catch(e) { return ""; }
})();
var CAI_AVATAR = BACKEND + "/avatar.gif";
var TG = "https://t.me/cityshopspagebot";
var WA = "https://wa.me/971503602149";
var SITE = "https://citysearchpage.in";

var css = ""+
/* :where(*) keeps this reset at zero specificity so it can never out-rank the
   real component rules below (a bare "#cai-panel *" is an ID-level selector
   and was silently beating every .cai-chip/.cai-b/etc. padding declaration —
   that's why chip padding kept computing to 0px no matter what we set it to). */
"#cai-panel{box-sizing:border-box;margin:0;padding:0}"+
"#cai-panel :where(*){box-sizing:border-box;margin:0;padding:0}"+
"#cai-panel{font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"+
"width:100%;max-width:940px;margin:0 auto;height:560px;background:#17171B;border:1px solid #2A2A31;"+
"border-radius:20px;display:flex;flex-direction:column;overflow:hidden;text-align:left;"+
"box-shadow:0 18px 60px rgba(0,0,0,.55)}"+
"@media(max-width:700px){#cai-panel{height:74vh;min-height:460px;border-radius:16px}}"+
".cai-hd{display:flex;align-items:center;gap:16px;padding:20px 22px;flex-shrink:0;"+
"background:#1C1C22;border-bottom:1px solid #2A2A31}"+
".cai-av{width:110px;height:110px;border-radius:20px;background:#FFD900;color:#000;"+
"display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"+
"font-family:Sora,sans-serif;font-weight:700;font-size:15px}"+
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
    {t:"👉 I own a shop", fn:function(){ seg="Shop owner"; send("I own a shop and want to know more."); }},
    {t:"👉 I run a brand or chain", fn:function(){ seg="Brand / Chain"; send("I run a brand or multi-branch chain."); }},
    {t:"👉 I'm just looking", fn:function(){ seg="Just exploring"; send("I'm just browsing for now."); }}
  ]);
}, 500);
})();
