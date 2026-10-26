export const esc = (v='')=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const todayISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const nowLocal=()=>{const d=new Date();const z=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;};
export const dateKey=(iso)=>String(iso||'').slice(0,10);
export const dateTime=iso=>{const d=new Date(iso);return Number.isFinite(d.valueOf())?new Intl.DateTimeFormat('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(d):String(iso||'');};
export const clock=iso=>{const d=new Date(iso);return Number.isFinite(d.valueOf())?new Intl.DateTimeFormat('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false}).format(d):''};
export const ageLabel=p=>[p?.age?`${p.age}岁`:null,p?.gender,p?.selfCare].filter(Boolean).join(' · ') ||'尚未完善档案';
export function downloadText(name,content,type='text/plain;charset=utf-8'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
export function validateImport(value){
  if(!value || !Array.isArray(value.patients)||!Array.isArray(value.records))throw new Error('文件不是超级护工数据备份');
  if(value.patients.length>500||value.records.length>20000)throw new Error('备份数据量超出限制');
  return {version:1,patients:value.patients.filter(x=>x&&typeof x.id==='string'&&typeof x.name==='string').map(x=>({...x,name:String(x.name).slice(0,80)})),records:value.records.filter(x=>x&&typeof x.id==='string'&&typeof x.patientId==='string'&&typeof x.type==='string').map(x=>({...x,photos:Array.isArray(x.photos)?x.photos.filter(p=>typeof p==='string'&&/^data:image\/(jpeg|png|webp);base64,/.test(p)).slice(0,3):[],history:Array.isArray(x.history)?x.history.slice(-30):[]})),activePatientId:value.activePatientId||null,role:value.role==='家属'?'家属':'护工'};
}