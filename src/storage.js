/* IndexedDB single-state local repository — never sends data to a server. */
const DATABASE='supercare-local-v1';
const STORE='app';
function openDB(){return new Promise((resolve,reject)=>{
  const req=indexedDB.open(DATABASE,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE)};
  req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
});}
export async function loadState(){const db=await openDB();return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readonly'),req=tx.objectStore(STORE).get('state');
  req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);
  tx.oncomplete=()=>db.close();tx.onerror=()=>reject(tx.error);
});}
export async function saveState(state){const db=await openDB();return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(structuredClone(state),'state');
  tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)};
});}
export async function clearState(){const db=await openDB();return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).clear();
  tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)};
});}
export async function compressPhoto(file){
  if(!file.type.startsWith('image/'))throw new Error('只能添加图片');
  if(file.size>10*1024*1024)throw new Error('单张照片不得超过 10MB');
  const bmp=await createImageBitmap(file);const ratio=Math.min(1,1100/Math.max(bmp.width,bmp.height));
  const canvas=document.createElement('canvas');canvas.width=Math.round(bmp.width*ratio);canvas.height=Math.round(bmp.height*ratio);
  canvas.getContext('2d').drawImage(bmp,0,0,canvas.width,canvas.height);bmp.close?.();
  return canvas.toDataURL('image/jpeg',0.72);
}