// script.js - static functionality only
const videoIds = [
  "dQw4w9WgXcQ","kXYiU_JCYtU","3JZ_D3ELwOQ","lY2yjAdbvdQ",
  "IcrbM1l_BoI","fLexgOxsZu0","5qap5aO4i9A"
];

function setYt(id){ document.getElementById('ytFrame').src = 'https://www.youtube.com/embed/'+id; }

document.getElementById('randBtn').addEventListener('click', ()=>{
  const id = videoIds[Math.floor(Math.random()*videoIds.length)];
  setYt(id);
});

const playlist = document.getElementById('playlist');
videoIds.forEach(id=>{
  const opt = document.createElement('option'); opt.value=id; opt.textContent = id; playlist.appendChild(opt);
});
playlist.addEventListener('change', ()=> setYt(playlist.value));

document.getElementById('ytSearchBtn').addEventListener('click', ()=>{
  const q = document.getElementById('ytQuery').value.trim();
  if(!q){ alert('Masukkan kata pencarian'); return; }
  window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q),'_blank');
});

// embed handler
document.getElementById('showEmbed').addEventListener('click', ()=>{
  const v = document.getElementById('embedInput').value.trim();
  if(!v){ alert('Masukkan URL atau embed code'); return; }
  // if it's likely an iframe html, insert raw; otherwise try to create embed iframe
  if(v.startsWith('<iframe') || v.includes('instagram') || v.includes('<blockquote')) {
    document.getElementById('embedOut').innerHTML = v;
    return;
  }
  // tiktok url -> try embed wrapper
  if(v.includes('tiktok.com')) {
    const iframe = '<iframe src="'+v+'" style="width:100%;height:500px;border:0;"></iframe>';
    document.getElementById('embedOut').innerHTML = iframe;
    return;
  }
  // instagram url -> open in new tab as fallback
  if(v.includes('instagram.com')) {
    window.open(v,'_blank');
    return;
  }
  // otherwise show as link
  document.getElementById('embedOut').innerHTML = '<a href="'+v+'" target="_blank">'+v+'</a>';
});

// AI demo offline
document.getElementById('aiBtn').addEventListener('click', ()=>{
  const m = document.getElementById('aiInput').value.trim();
  if(!m){ document.getElementById('aiOut').innerText = 'Silakan tulis pertanyaan.'; return; }
  // simple canned responses for demo
  const low = m.toLowerCase();
  if(low.includes('lagu')||low.includes('musik')) return document.getElementById('aiOut').innerText = 'Coba dengarkan playlist random di atas!';
  if(low.includes('siapa')||low.includes('siapakah')) return document.getElementById('aiOut').innerText = 'Dewa Inspirasi — sumber ide dan hiburan.';
  document.getElementById('aiOut').innerText = 'Demo AI: ' + m;
});
