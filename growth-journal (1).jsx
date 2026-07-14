import { useState } from "react";

const C = {
  bg:"#EEF6E8", card:"#FFFFFF", text:"#1E3320", sub:"#5A7060",
  border:"#C8DEC0", green:"#4A9B5F", amber:"#F5B942",
  red:"#E8756A", purple:"#9C6FE4", blue:"#3B82F6",
};

// ── 과목별 기준 + 단계별 예시 ────────────────
const SUBJECTS = [
  { id:"reading", icon:"📖", title:"독서감상문", color:"#4A9B5F", fruit:"🍎",
    topicLabel:"읽은 책 제목", topicPh:"예: 헨젤과 그레텔",
    criteria:[
      {id:"c1",icon:"❓",label:"읽은 까닭",    desc:"이 책을 왜 읽었는지 드러났나요?",
        examples:{"○":"'도서관에서 표지를 보고 궁금해서 읽었다'처럼 읽게 된 이유가 명확하게 드러남",
                  "△":"'재미있어 보여서 읽었다'처럼 까닭은 썼지만 구체적이지 않음",
                  "✕":"읽은 까닭을 아예 쓰지 않았거나 한 단어만 씀"}},
      {id:"c2",icon:"📝",label:"내용 간추리기",desc:"이야기 흐름이 잘 정리됐나요?",
        examples:{"○":"'그래서', '하지만' 같은 접속사를 사용하여 흐름이 자연스럽게 이어짐",
                  "△":"책의 내용은 담겨 있지만 접속사 없이 사건을 나열함",
                  "✕":"책 내용과 전혀 다른 이야기를 쓰거나 내용이 거의 없음"}},
      {id:"c3",icon:"💭",label:"생각·느낌",    desc:"내 생각과 이유가 자세한가요?",
        examples:{"○":"'나는 ~라고 생각한다. 왜냐하면 ~하기 때문이다'처럼 생각과 이유가 함께 드러남",
                  "△":"'재미있었다', '슬펐다'처럼 감정 단어만 쓰고 이유가 없음",
                  "✕":"생각이나 느낌을 전혀 쓰지 않음"}},
      {id:"c4",icon:"📚",label:"책의 제목",    desc:"책 이름을 빠트리지 않았나요?",
        examples:{"○":"제목을 정확하게 씀 (예: 「헨젤과 그레텔」을 읽고)",
                  "△":"",
                  "✕":"책 제목을 전혀 쓰지 않고 바로 내용을 시작함"}},
    ]},
  { id:"present", icon:"🎤", title:"발표하기", color:"#5B8DEF", fruit:"🍊",
    topicLabel:"발표 주제", topicPh:"예: 우리 반 소개",
    criteria:[
      {id:"c1",icon:"🔊",label:"목소리 크기",desc:"친구들이 잘 들릴 만큼 크게 말했나요?",
        examples:{"○":"교실 뒤에 앉은 친구도 잘 들릴 만큼 크고 또렷하게 말함",
                  "△":"가끔 목소리가 작아지지만 대부분 들림",
                  "✕":"목소리가 너무 작아서 앞에 앉은 친구도 듣기 어려움"}},
      {id:"c2",icon:"👀",label:"눈 맞춤",    desc:"듣는 사람을 바라보며 발표했나요?",
        examples:{"○":"발표 내내 듣는 친구들을 바라보며 자신감 있게 말함",
                  "△":"가끔 종이나 칠판을 보지만 바라보려 노력함",
                  "✕":"발표 내내 종이나 칠판만 보고 듣는 사람을 거의 보지 않음"}},
      {id:"c3",icon:"📋",label:"내용 준비",  desc:"발표할 내용을 잘 준비했나요?",
        examples:{"○":"발표 내용이 처음-중간-끝으로 체계적으로 정리되어 있음",
                  "△":"내용은 있지만 순서가 뒤섞이거나 빠진 부분이 있음",
                  "✕":"준비가 부족하여 말하다 멈추거나 내용이 거의 없음"}},
      {id:"c4",icon:"⏱",label:"속도와 쉼",  desc:"너무 빠르거나 느리지 않게 말했나요?",
        examples:{"○":"적당한 속도로 말하고 중요한 부분에서 잠깐 멈추어 강조함",
                  "△":"조금 빠르거나 느리지만 대체로 알아들을 수 있음",
                  "✕":"너무 빠르거나 너무 느려서 내용을 따라가기 어려움"}},
    ]},
  { id:"experience", icon:"✏️", title:"경험을 나타내는 글", color:"#9C6FE4", fruit:"🌸",
    topicLabel:"경험 또는 시 제목", topicPh:"예: 운동회 날",
    criteria:[
      {id:"c1",icon:"🎨",label:"감각적 표현",
        desc:"내 글에 보고, 듣고, 냄새 맡고, 맛보고, 느낀 것을 표현한 문장이 있나요?",
        examples:{
          "○":"감각적 표현이 2개 이상 있고 장면에 어울려요. 예) \"파도가 발에 닿을 때 차갑고 간지러웠다. 짭짤한 바다 냄새가 코끝에 스쳤다.\"",
          "△":"감각적 표현이 1개이거나 장면과 잘 안 어울려요. 예) \"파도 소리가 들렸다.\"",
          "✕":"감각적 표현 없이 느낌만 썼어요. 예) \"바다가 예뻤다. 정말 좋았다.\""}},
      {id:"c2",icon:"💝",label:"생각이나 감정",
        desc:"그 경험에서 내가 어떻게 느꼈는지, 무슨 생각을 했는지 쓰여 있나요?",
        examples:{
          "○":"느낌·생각이 구체적이고 왜 그랬는지도 나와요. 예) \"친구가 내 편을 들어줬을 때 혼자가 아닌 것 같아서 마음이 따뜻했다.\"",
          "△":"느낌·생각은 있지만 한 단어로만 끝나요. 예) \"기분이 좋았다.\"",
          "✕":"느낌·생각 없이 일어난 일만 나열했어요. 예) \"밥을 먹고 친구랑 놀았다.\""}},
      {id:"c3",icon:"📌",label:"경험의 구체성",
        desc:"읽는 사람도 장면을 떠올릴 수 있을 만큼 구체적으로 썼나요?",
        examples:{
          "○":"언제·어디서·무슨 일인지 장면이 선명해요. 예) \"토요일 오후 한강 공원에서 친구랑 자전거를 탔는데, 언덕에서 페달을 밟을 때마다 다리가 후들거렸다.\"",
          "△":"상황은 있지만 뭉뚱그려져 장면이 잘 안 그려져요. 예) \"친구랑 공원에서 놀았다.\"",
          "✕":"무슨 일인지 거의 알 수 없어요. 예) \"어제 재밌었다.\""}},
    ]},
];

const REFLECT = [
  {id:"r1",icon:"🔍",label:"기준으로 평가했나요?", desc:"느낌이 아닌 기준으로 판단했나요?",       isReflect:true,
    examples:{"○":"각 기준을 하나씩 보며 내 글과 비교해서 판단함","△":"일부만 기준을 보고 나머지는 느낌으로 판단함","✕":"기준을 보지 않고 전체 느낌으로만 판단함"}},
  {id:"r2",icon:"💬",label:"솔직하게 평가했나요?", desc:"잘 쓴 척하지 않고 있는 그대로 봤나요?",  isReflect:true,
    examples:{"○":"부족한 부분도 솔직하게 인정하고 표시함","△":"대체로 솔직하지만 일부는 좋게만 봄","✕":"실제보다 잘 준 것 같음"}},
  {id:"r3",icon:"🌱",label:"고칠 점을 찾았나요?",  desc:"다음엔 무엇을 더 잘할 수 있는지 알았나요?", isReflect:true,
    examples:{"○":"다음에 고칠 점을 구체적으로 한 가지 이상 찾음","△":"고칠 점을 막연하게만 느낌","✕":"고칠 점을 찾지 못함"}},
];

const MARK = {
  "○":{sel:"#4A9B5F", bg:"#F0FAF3", fg:"#4A9B5F", w:"매우 잘함"},
  "△":{sel:"#F5B942", bg:"#FFFBF0", fg:"#B07B00", w:"잘함"},
  "✕":{sel:"#E8756A", bg:"#FDF2F1", fg:"#E8756A", w:"보통"},
};

const GROW = ["평가를 시작해요!","새싹이 돋았어요 🌿","나무가 자라요 🌳","거의 다 왔어요 🎋","열매가 열렸어요! 🍎"];
function gStage(i,t){ if(!t)return 0; const r=i/t; return r===0?0:r<=.25?1:r<=.5?2:r<=.75?3:4; }

const PIN = "0987";
const MIN_REASON = 8; // 이유 최소 글자 수

// ── Supabase 공용 저장소 ─────────────────────
const SB_URL = "https://rgegksuqmcyrcrbtdmbw.supabase.co";
const SB_KEY = "sb_publishable_uqP7ZpJxNn4bT07pGXthMA_PpMbmbRA";
const sbHeaders = { "apikey":SB_KEY, "Authorization":"Bearer "+SB_KEY, "Content-Type":"application/json" };

async function sbGet(id){
  try{
    const r=await fetch(SB_URL+"/rest/v1/app_data?id=eq."+encodeURIComponent(id)+"&select=data",{headers:sbHeaders});
    if(!r.ok) return null;
    const rows=await r.json();
    return rows.length?rows[0].data:null;
  }catch(e){console.error(e);return null;}
}
async function sbSet(id,data){
  try{
    const r=await fetch(SB_URL+"/rest/v1/app_data?on_conflict=id",
      {method:"POST",headers:{...sbHeaders,"Prefer":"resolution=merge-duplicates"},
       body:JSON.stringify({id,data,updated_at:new Date().toISOString()})});
    return r.ok;
  }catch(e){console.error(e);return false;}
}
async function sbList(prefix){
  try{
    const r=await fetch(SB_URL+"/rest/v1/app_data?id=like."+encodeURIComponent(prefix+"%")+"&select=data",{headers:sbHeaders});
    if(!r.ok) return [];
    const rows=await r.json();
    return rows.map(x=>x.data).filter(Boolean);
  }catch(e){console.error(e);return [];}
}

const cKey = cn => "gj_c_" + cn.replace(/\s/g,"_");
const sKey = (cn,n) => "gj_s_" + cn.replace(/\s/g,"_") + "_" + n.replace(/\s/g,"_");

async function ldClass(cn){ return await sbGet(cKey(cn)); }
async function svClass(d){ return await sbSet(cKey(d.className), d); }
async function ldStudent(cn,n){ return await sbGet(sKey(cn,n)); }
async function svStudent(d){ return await sbSet(sKey(d.className,d.name), d); }
async function loadAllStudents(cn){
  return await sbList("gj_s_" + cn.replace(/\s/g,"_") + "_");
}

// ── 나무·열매 SVG ────────────────────────────
const SPOTS=[
  {x:100,y:44},{x:72,y:58},{x:130,y:56},
  {x:56,y:78},{x:144,y:76},{x:96,y:82},{x:118,y:74},
  {x:68,y:100},{x:132,y:98},{x:100,y:108},
  {x:54,y:118},{x:146,y:116},{x:100,y:126},
];
function FruitTree({ fruits=[], size=200 }){
  return (
    <svg viewBox="0 0 200 210" width={size} height={size} style={{display:"block",margin:"0 auto"}}>
      <ellipse cx="100" cy="200" rx="48" ry="10" fill="rgba(0,0,0,0.07)"/>
      <rect x="88" y="138" width="24" height="52" rx="7" fill="#8B5E3C"/>
      <rect x="92" y="138" width="8"  height="52" rx="4" fill="#A07040" opacity="0.45"/>
      <circle cx="100" cy="88" r="68" fill="#2D6B3E"/>
      <circle cx="70"  cy="75" r="48" fill="#3D7A45"/>
      <circle cx="130" cy="72" r="45" fill="#3D7A45"/>
      <circle cx="100" cy="58" r="42" fill="#4A9B5F"/>
      <circle cx="82"  cy="52" r="22" fill="#5EBF7A" opacity="0.4"/>
      {SPOTS.map((p,i) => i >= fruits.length ? (
        <circle key={"e"+i} cx={p.x} cy={p.y} r="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      ) : null)}
      {fruits.slice(0,SPOTS.length).map((f,i) => {
        const p=SPOTS[i];
        return (
          <g key={"f"+i}>
            {f.shining && (
              <g>
                <circle cx={p.x} cy={p.y} r="22" fill="rgba(255,255,220,0.7)"/>
                <circle cx={p.x} cy={p.y} r="16" fill="rgba(255,255,255,0.5)"/>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
                  <line key={a}
                    x1={p.x+13*Math.cos(a*Math.PI/180)} y1={p.y+13*Math.sin(a*Math.PI/180)}
                    x2={p.x+24*Math.cos(a*Math.PI/180)} y2={p.y+24*Math.sin(a*Math.PI/180)}
                    stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                ))}
              </g>
            )}
            <text x={p.x} y={p.y+7} fontSize="18" textAnchor="middle">{f.fruit}</text>
            {f.shining && <text x={p.x+13} y={p.y-11} fontSize="8" textAnchor="middle">✨</text>}
          </g>
        );
      })}
      {fruits.length > SPOTS.length && (
        <text x="100" y="178" fontSize="10" textAnchor="middle" fill="#5A7060">+{fruits.length-SPOTS.length}개 더</text>
      )}
    </svg>
  );
}
function GrowTree({ step, total }){
  const s=gStage(step,total);
  return (
    <svg viewBox="0 0 120 110" width={120} height={110} style={{display:"block",margin:"0 auto"}}>
      <ellipse cx="60" cy="100" rx="38" ry="9" fill="rgba(0,0,0,0.07)"/>
      <rect x="55" y={110-s*10-30} width="10" height={s*10+30} rx="5" fill="#8B5E3C"/>
      {s>=1 && <circle cx="60" cy={85-s*8} r={12+s*8} fill="#2D6B3E"/>}
      {s>=2 && <circle cx="45" cy={78-s*6} r={8+s*6}  fill="#3D7A45"/>}
      {s>=2 && <circle cx="75" cy={76-s*6} r={7+s*6}  fill="#3D7A45"/>}
      {s>=3 && <circle cx="60" cy={62-s*5} r={10+s*4} fill="#4A9B5F"/>}
      {s>=4 && <text x="60" y={73-s*5} fontSize="16" textAnchor="middle">🍎</text>}
    </svg>
  );
}
function BigFruit({ fruit }){
  const rays=[0,30,60,90,120,150,180,210,240,270,300,330];
  return (
    <div style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",width:140,height:140}}>
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(255,255,200,0.95) 0%,rgba(255,255,255,0.7) 40%,transparent 70%)"}}/>
      {rays.map(a=>(
        <div key={a} style={{position:"absolute",width:2,height:22,background:"rgba(255,255,200,0.9)",
          borderRadius:2,top:"50%",left:"50%",transformOrigin:"50% 100%",
          transform:"translate(-50%,-100%) rotate("+a+"deg) translateY(-34px)"}}/>
      ))}
      <div style={{fontSize:72,lineHeight:1,position:"relative",zIndex:1,
        filter:"drop-shadow(0 0 10px rgba(255,255,150,0.9))"}}>{fruit}</div>
      {[[2,null,8,null],[4,null,null,10],[null,8,null,10],[null,10,4,null]].map(([t,r,b,l],i)=>(
        <div key={i} style={{position:"absolute",fontSize:13,zIndex:2,
          ...(t!=null?{top:t}:{}),...(r!=null?{right:r}:{}),
          ...(b!=null?{bottom:b}:{}),...(l!=null?{left:l}:{})}}>✨</div>
      ))}
    </div>
  );
}

function Card({ children, style={} }){
  return <div style={{background:"#fff",borderRadius:20,padding:"16px 18px",
    boxShadow:"0 2px 12px rgba(0,0,0,0.06)",...style}}>{children}</div>;
}
function PBtn({ children, onClick, color="#4A9B5F", disabled=false, small=false }){
  return <button onClick={onClick} disabled={disabled} style={{
    width:small?"auto":"100%",padding:small?"8px 18px":"14px",
    borderRadius:small?10:16,border:"none",
    background:disabled?"#C8DEC0":color,color:"#fff",fontWeight:700,fontSize:small?13:16,
    cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",
    boxShadow:disabled?"none":"0 3px 14px rgba(0,0,0,0.15)",transition:"all .2s"}}>{children}</button>;
}
function Ghost({ children, onClick }){
  return <button onClick={onClick} style={{width:"100%",padding:"10px",borderRadius:12,
    border:"none",background:"none",color:"#5A7060",fontSize:13,
    cursor:"pointer",fontFamily:"inherit",marginTop:4}}>{children}</button>;
}
function Divider(){ return <div style={{height:1,background:"#C8DEC0",margin:"12px 0"}}/>; }

export default function App(){
  const [screen,  setScreen]  = useState("classLogin");
  const [classIn, setClassIn] = useState("");
  const [classD,  setClassD]  = useState(null);
  const [userD,   setUserD]   = useState(null);
  const [addName, setAddName] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy,    setBusy]    = useState(false);
  const [subj,    setSubj]    = useState(null);
  const [topic,   setTopic]   = useState("");
  const [crit,    setCrit]    = useState([]);
  const [idx,     setIdx]     = useState(0);
  const [marks,   setMarks]   = useState({});
  const [memo,    setMemo]    = useState("");
  const [isRe,    setIsRe]    = useState(false);
  const [curId,   setCurId]   = useState(null);
  const [origMks, setOrigMks] = useState({});
  const [reflect, setReflect] = useState("");
  const [showEx,  setShowEx]  = useState(false);
  // 교사
  const [pin,     setPin]     = useState("");
  const [pinErr,  setPinErr]  = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [openStudent, setOpenStudent] = useState(null);

  const assessments = userD ? (userD.assessments || []) : [];
  const fruits = assessments.map(a => ({ fruit:a.fruit, shining:!!a.revised }));
  const cur = crit[idx];

  const wrap={minHeight:"100vh",background:C.bg,
    fontFamily:"'Noto Sans KR',Apple SD Gothic Neo,sans-serif",
    display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 16px 36px"};
  const mw={width:"100%",maxWidth:380};

  // ── 반 로그인 ──────────────────────────────
  if(screen==="classLogin") return (
    <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:72}}>🌳</div>
        <div style={{fontSize:26,fontWeight:800,color:C.text,marginTop:6}}>나의 성장 나무</div>
        <div style={{fontSize:13,color:C.sub,marginTop:6,lineHeight:1.6}}>
          자기평가를 할 때마다<br/>나무에 열매가 열려요
        </div>
      </div>
      <Card>
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>우리 반 이름을 입력해요</div>
        <input value={classIn} onChange={e=>setClassIn(e.target.value)}
          placeholder="예: 사랑둥이반, 4학년 2반"
          style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1.5px solid "+C.border,
            fontSize:15,color:C.text,background:C.bg,outline:"none",
            fontFamily:"inherit",boxSizing:"border-box",marginBottom:12}}/>
        <div style={{display:"flex",gap:8}}>
          <PBtn onClick={async()=>{
            if(!classIn.trim()) return;
            setBusy(true);
            let d=await ldClass(classIn.trim());
            if(!d){d={className:classIn.trim(),students:[]};await svClass(d);}
            setBusy(false);setClassD(d);setScreen("studentList");
          }} color={C.green} disabled={!classIn.trim()||busy}>
            {busy?"불러오는 중...":"학생 모드 🌿"}
          </PBtn>
          <PBtn onClick={async()=>{
            if(!classIn.trim()) return;
            setBusy(true);
            let d=await ldClass(classIn.trim());
            if(!d){d={className:classIn.trim(),students:[]};await svClass(d);}
            setBusy(false);setClassD(d);setPin("");setPinErr(false);setScreen("teacherPin");
          }} color={C.blue} disabled={!classIn.trim()||busy}>교사 모드</PBtn>
        </div>
      </Card>
    </div></div>
  );

  // ── 교사 PIN ───────────────────────────────
  if(screen==="teacherPin") return (
    <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:48}}>🔐</div>
        <div style={{fontSize:18,fontWeight:800,color:C.text,marginTop:6}}>교사 인증</div>
      </div>
      <Card>
        <input value={pin} onChange={e=>setPin(e.target.value)} type="password"
          onKeyDown={async(e)=>{
            if(e.key!=="Enter") return;
            if(pin===PIN){setBusy(true);setAllStudents(await loadAllStudents(classD.className));setBusy(false);setScreen("teacherMain");}
            else setPinErr(true);
          }}
          placeholder="PIN 입력"
          style={{width:"100%",padding:"12px 14px",borderRadius:12,
            border:"1.5px solid "+(pinErr?C.red:C.border),fontSize:18,color:C.text,
            background:C.bg,outline:"none",fontFamily:"inherit",
            boxSizing:"border-box",marginBottom:8,textAlign:"center",letterSpacing:8}}/>
        {pinErr&&<div style={{color:C.red,fontSize:12,textAlign:"center",marginBottom:8}}>PIN이 틀렸어요</div>}
        <PBtn onClick={async()=>{
          if(pin===PIN){setBusy(true);setAllStudents(await loadAllStudents(classD.className));setBusy(false);setScreen("teacherMain");}
          else setPinErr(true);
        }} color={C.blue} disabled={!pin||busy}>{busy?"불러오는 중...":"확인"}</PBtn>
        <Ghost onClick={()=>setScreen("classLogin")}>← 돌아가기</Ghost>
      </Card>
    </div></div>
  );

  // ── 교사 메인 (전체 학생 답변 열람) ─────────
  if(screen==="teacherMain"){
    const totalAssess = allStudents.reduce((s,st)=>s+(st.assessments||[]).length,0);
    return (
      <div style={wrap}><div style={mw}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <div style={{fontSize:11,color:C.sub}}>{classD.className} · 교사 모드</div>
            <div style={{fontSize:20,fontWeight:800,color:C.text}}>학생 자기평가 기록</div>
          </div>
          <button onClick={()=>setScreen("classLogin")} style={{background:"none",
            border:"1px solid "+C.border,borderRadius:10,padding:"6px 12px",
            color:C.sub,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>나가기</button>
        </div>

        <Card style={{marginBottom:10,textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:24}}>
            <div><div style={{fontSize:24,fontWeight:800,color:C.green}}>{allStudents.length}</div>
              <div style={{fontSize:11,color:C.sub}}>학생 수</div></div>
            <div style={{width:1,background:C.border}}/>
            <div><div style={{fontSize:24,fontWeight:800,color:C.text}}>{totalAssess}</div>
              <div style={{fontSize:11,color:C.sub}}>전체 자기평가</div></div>
          </div>
          <div style={{marginTop:10}}>
            <PBtn onClick={async()=>{setBusy(true);setAllStudents(await loadAllStudents(classD.className));setBusy(false);}}
              small color={C.blue}>{busy?"불러오는 중...":"🔄 새로고침"}</PBtn>
          </div>
        </Card>

        {allStudents.length===0?(
          <div style={{textAlign:"center",padding:"20px 0",color:C.sub,fontSize:13}}>
            아직 자기평가한 학생이 없어요
          </div>
        ):(
          allStudents.map(st=>{
            const list=st.assessments||[];
            const isOpen=openStudent===st.name;
            return(
              <Card key={st.name} style={{marginBottom:10}}>
                <button onClick={()=>setOpenStudent(isOpen?null:st.name)}
                  style={{width:"100%",background:"none",border:"none",cursor:"pointer",
                    fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,padding:0}}>
                  <div style={{width:34,height:34,borderRadius:10,background:C.green+"22",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🙋</div>
                  <div style={{flex:1,textAlign:"left"}}>
                    <div style={{fontSize:15,fontWeight:700,color:C.text}}>{st.name}</div>
                    <div style={{fontSize:12,color:C.sub}}>자기평가 {list.length}회
                      {list.filter(a=>a.revised).length>0?" · 재평가 "+list.filter(a=>a.revised).length+"회":""}</div>
                  </div>
                  <span style={{fontSize:13,color:C.sub}}>{isOpen?"▲":"▼"}</span>
                </button>

                {isOpen&&(
                  <div style={{marginTop:12}}>
                    {list.length===0?(
                      <div style={{fontSize:13,color:C.sub,textAlign:"center",padding:"8px 0"}}>기록 없음</div>
                    ):list.map(a=>(
                      <div key={a.id} style={{marginBottom:14,paddingBottom:12,borderBottom:"1px solid "+C.border}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                          <span style={{fontSize:18}}>{a.fruit}</span>
                          <span style={{fontSize:13,fontWeight:700,color:C.text}}>{a.subjectTitle}</span>
                          {a.topic&&<span style={{fontSize:12,color:C.sub}}>· 『{a.topic}』</span>}
                          {a.revised&&<span style={{marginLeft:"auto",fontSize:10,color:C.purple,
                            background:C.purple+"18",padding:"2px 8px",borderRadius:20}}>✨ 재평가</span>}
                        </div>
                        {(SUBJECTS.find(s=>s.id===a.subjectId)?.criteria||[]).concat(REFLECT).map(c=>{
                          const mo=a.marks?.[c.id];
                          if(!mo) return null;
                          const m=typeof mo==="string"?mo:mo.mark;
                          const reason=typeof mo==="string"?"":mo.reason;
                          if(!m) return null;
                          const col=m==="○"?C.green:m==="△"?C.amber:C.red;
                          const lbl=m==="○"?"매우 잘함":m==="△"?"잘함":"보통";
                          return(
                            <div key={c.id} style={{padding:"3px 0"}}>
                              <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                                <span>{c.icon}</span>
                                <span style={{flex:1,color:C.text}}>{c.label}</span>
                                <span style={{fontWeight:700,color:col}}>{lbl}</span>
                              </div>
                              {reason&&<div style={{fontSize:11,color:C.sub,background:C.bg,
                                borderRadius:6,padding:"4px 8px",marginTop:3,lineHeight:1.4}}>{reason}</div>}
                            </div>
                          );
                        })}
                        {a.memo&&(
                          <div style={{fontSize:12,color:C.sub,background:C.bg,borderRadius:8,
                            padding:"6px 10px",marginTop:6,lineHeight:1.5}}>
                            📝 다음 다짐: {a.memo}
                          </div>
                        )}
                        {a.revised?.reflection&&(
                          <div style={{fontSize:12,color:C.purple,background:C.purple+"10",borderRadius:8,
                            padding:"6px 10px",marginTop:6,lineHeight:1.5}}>
                            ✨ 재평가 후기: {a.revised.reflection}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div></div>
    );
  }

  // ── 학생 이름 선택 ─────────────────────────
  if(screen==="studentList") return (
    <div style={wrap}><div style={mw}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:C.sub}}>{classD.className}</div>
        <div style={{fontSize:22,fontWeight:800,color:C.text}}>내 이름을 찾아요 👋</div>
      </div>
      <Card style={{marginBottom:10}}>
        {classD.students.length===0?(
          <div style={{textAlign:"center",padding:"20px 0",color:C.sub,fontSize:13}}>
            아직 이름이 없어요.<br/>아래에서 내 이름을 추가해요!
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {classD.students.map(n=>(
              <button key={n} onClick={async()=>{
                setBusy(true);
                let d=await ldStudent(classD.className,n);
                if(!d){d={name:n,className:classD.className,assessments:[]};await svStudent(d);}
                setBusy(false);setUserD(d);setScreen("dashboard");
              }} disabled={busy}
                style={{padding:"12px 16px",borderRadius:12,border:"1.5px solid "+C.border,
                  background:C.bg,color:C.text,fontWeight:600,fontSize:15,
                  cursor:"pointer",textAlign:"left",fontFamily:"inherit",
                  display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>🙋</span>{n}
              </button>
            ))}
          </div>
        )}
      </Card>
      <Card style={{marginBottom:8}}>
        {addName?(
          <div>
            <input value={newName} onChange={e=>setNewName(e.target.value)}
              placeholder="이름을 입력하세요"
              style={{width:"100%",padding:"12px 14px",borderRadius:12,
                border:"1.5px solid "+C.border,fontSize:15,color:C.text,
                background:C.bg,outline:"none",fontFamily:"inherit",
                boxSizing:"border-box",marginBottom:10}}/>
            <div style={{display:"flex",gap:8}}>
              <PBtn onClick={async()=>{
                if(!newName.trim()||classD.students.includes(newName.trim())) return;
                const u={...classD,students:[...classD.students,newName.trim()]};
                setBusy(true);await svClass(u);setBusy(false);
                setClassD(u);setAddName(false);setNewName("");
              }} disabled={!newName.trim()||busy}>추가하기</PBtn>
              <button onClick={()=>{setAddName(false);setNewName("");}}
                style={{flex:1,padding:"14px",borderRadius:16,border:"1.5px solid "+C.border,
                  background:"#fff",color:C.sub,fontWeight:600,fontSize:15,
                  cursor:"pointer",fontFamily:"inherit"}}>취소</button>
            </div>
          </div>
        ):(
          <button onClick={()=>setAddName(true)}
            style={{width:"100%",padding:"12px",borderRadius:12,
              border:"2px dashed "+C.border,background:"none",
              color:C.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
            + 내 이름 추가하기
          </button>
        )}
      </Card>
      <Ghost onClick={()=>setScreen("classLogin")}>← 다른 반 선택</Ghost>
    </div></div>
  );

  // ── 대시보드 ───────────────────────────────
  if(screen==="dashboard") return (
    <div style={wrap}><div style={mw}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div>
          <div style={{fontSize:12,color:C.sub}}>{classD?classD.className:""} · {userD?userD.name:""}</div>
          <div style={{fontSize:22,fontWeight:800,color:C.text}}>나의 성장 나무 🌳</div>
        </div>
        <button onClick={()=>setScreen("studentList")}
          style={{background:"none",border:"1px solid "+C.border,borderRadius:10,
            padding:"6px 12px",color:C.sub,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
          다른 친구
        </button>
      </div>
      <Card style={{marginBottom:12,textAlign:"center",background:"linear-gradient(160deg,#EEF6E8,#F5F9F0)"}}>
        <div style={{fontSize:12,color:C.sub,marginBottom:6}}>평가할 때마다 열매가 열려요 · 재평가하면 빛나요 ✨</div>
        <FruitTree fruits={fruits} size={180}/>
        <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12}}>
          {[{n:assessments.length,label:"총 평가",col:C.text},
            {n:fruits.length,label:"모은 열매",col:C.green},
            {n:fruits.filter(f=>f.shining).length,label:"빛나는 열매",col:C.purple}].map((s,i)=>(
            <div key={i} style={{textAlign:"center",flex:1}}>
              <div style={{fontSize:22,fontWeight:800,color:s.col}}>{s.n}</div>
              <div style={{fontSize:10,color:C.sub}}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
      {assessments.length>0&&(
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}>평가 기록</div>
          {assessments.slice().reverse().map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,
              padding:"8px 0",borderBottom:"1px solid "+C.border}}>
              <div style={{fontSize:24,position:"relative"}}>{a.fruit}
                {a.revised&&<span style={{position:"absolute",top:-4,right:-6,fontSize:10}}>✨</span>}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>{a.subjectTitle}</div>
                <div style={{fontSize:12,color:C.sub}}>
                  {a.topic?"『"+a.topic+"』 · ":""}{a.date}
                  {a.revised&&<span style={{color:C.purple,marginLeft:4}}>재평가 완료</span>}
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
      {assessments.length===0&&(
        <div style={{textAlign:"center",padding:"16px 0",color:C.sub,fontSize:13}}>
          아직 평가 기록이 없어요 🌱<br/>첫 자기평가를 시작해볼까요?
        </div>
      )}
      <PBtn onClick={()=>setScreen("library")}>+ 새 자기평가 시작하기</PBtn>
    </div></div>
  );

  // ── 분야 선택 ──────────────────────────────
  if(screen==="library") return (
    <div style={wrap}><div style={mw}>
      <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",
        color:C.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit",padding:"4px 0",marginBottom:14}}>← 돌아가기</button>
      <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>어떤 자기평가를 할까요?</div>
      <div style={{fontSize:13,color:C.sub,marginBottom:18}}>평가를 마치면 나무에 열매가 열려요</div>
      {SUBJECTS.map(s=>(
        <button key={s.id} onClick={()=>{
          setSubj(s);setTopic("");setMarks({});setIdx(0);setMemo("");
          setIsRe(false);setCurId(null);setOrigMks({});setReflect("");setShowEx(false);
          setScreen("topic");
        }} style={{width:"100%",background:"#fff",borderRadius:18,padding:"16px 18px",
          marginBottom:10,border:"1.5px solid "+s.color+"44",cursor:"pointer",
          textAlign:"left",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",fontFamily:"inherit"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:14,background:s.color+"20",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{s.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:700,color:C.text}}>{s.title}</div>
              <div style={{fontSize:12,color:C.sub,marginTop:2}}>기준 {s.criteria.length+REFLECT.length}개 · 예시 포함 · 열매 {s.fruit}</div>
            </div>
            <div style={{fontSize:32}}>{s.fruit}</div>
          </div>
        </button>
      ))}
    </div></div>
  );

  // ── 주제 입력 ──────────────────────────────
  if(screen==="topic") return (
    <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>{subj?subj.icon:""}</div>
        <div style={{fontSize:20,fontWeight:800,color:C.text,marginTop:6}}>{subj?subj.title:""}</div>
        <div style={{fontSize:13,color:C.sub,marginTop:4}}>{subj?subj.topicLabel:""}을 입력해요</div>
      </div>
      <Card>
        <input value={topic} onChange={e=>setTopic(e.target.value)}
          placeholder={subj?subj.topicPh:""}
          style={{width:"100%",padding:"12px 14px",borderRadius:12,
            border:"1.5px solid "+C.border,fontSize:15,color:C.text,
            background:C.bg,outline:"none",fontFamily:"inherit",
            boxSizing:"border-box",marginBottom:12}}/>
        <PBtn onClick={()=>{setCrit([...subj.criteria,...REFLECT]);setIdx(0);setShowEx(false);setScreen("assess");}}
          color={subj?subj.color:C.green}>평가 시작하기 →</PBtn>
        <Ghost onClick={()=>{setTopic("");setCrit([...subj.criteria,...REFLECT]);setIdx(0);setShowEx(false);setScreen("assess");}}>건너뛰기 →</Ghost>
      </Card>
    </div></div>
  );

  // ── 평가 화면 (예시 포함) ──────────────────
  if(screen==="assess"&&cur){
    const cm=marks[cur.id]||{mark:"",reason:""};
    const done=cm.mark&&(cm.reason||"").trim().length>=MIN_REASON;
    const pct=(idx/crit.length)*100;
    const stage=gStage(idx,crit.length);
    return (
      <div style={wrap}><div style={mw}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}>
          <span style={{color:cur.isReflect?C.purple:(subj?subj.color:C.green),fontWeight:600}}>
            {cur.isReflect?"🪞 나를 돌아봐요":(subj?subj.icon+" "+subj.title:"")}{isRe?" (재평가)":""}
          </span>
          <span>{idx+1} / {crit.length}</span>
        </div>
        <div style={{height:7,background:C.border,borderRadius:99,marginBottom:12,overflow:"hidden"}}>
          <div style={{height:"100%",background:cur.isReflect?C.purple:(subj?subj.color:C.green),
            borderRadius:99,width:pct+"%",transition:"width .4s ease"}}/>
        </div>
        <Card style={{textAlign:"center",marginBottom:12,padding:"12px 16px"}}>
          <div style={{fontSize:11,color:C.sub,marginBottom:4}}>
            {isRe?"고쳐보고 다시 평가해요 🌟":"○ △ ✕ 어느 것을 눌러도 나무가 자라요!"}
          </div>
          <GrowTree step={idx} total={crit.length}/>
          <div style={{fontSize:14,fontWeight:700,color:C.green,marginTop:4}}>{GROW[stage]}</div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:34,textAlign:"center",marginBottom:6}}>{cur.icon}</div>
          <div style={{fontSize:20,fontWeight:800,color:C.text,textAlign:"center",marginBottom:4}}>{cur.label}</div>
          <div style={{fontSize:13,color:C.sub,textAlign:"center",lineHeight:1.6,marginBottom:14}}>{cur.desc}</div>

          {/* 예시 기준표 (루브릭) */}
          {cur.examples&&(
            <div style={{borderRadius:12,overflow:"hidden",marginBottom:16,border:"1.5px solid "+C.border}}>
              <button onClick={()=>setShowEx(p=>!p)}
                style={{width:"100%",padding:"10px 14px",background:"#F6FAF3",border:"none",
                  cursor:"pointer",fontFamily:"inherit",display:"flex",
                  justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:C.text}}>📌 평가 기준(루브릭) 예시 보기</span>
                <span style={{fontSize:12,color:C.sub}}>{showEx?"▲ 접기":"▼ 펼치기"}</span>
              </button>
              {showEx&&(
                <div style={{padding:"0 14px 12px"}}>
                  {["○","△","✕"].map(m=>{
                    const ex=cur.examples?.[m];
                    if(!ex) return null;
                    const cfg=MARK[m];
                    return(
                      <div key={m} style={{display:"flex",gap:8,alignItems:"flex-start",
                        padding:"8px 0",borderBottom:"1px solid "+C.border}}>
                        <div style={{fontSize:18,fontWeight:700,color:cfg.sel,
                          flexShrink:0,width:20,textAlign:"center"}}>{m}</div>
                        <div>
                          <div style={{fontSize:11,fontWeight:700,color:cfg.sel,marginBottom:2}}>{cfg.w}</div>
                          <div style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{ex}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div style={{display:"flex",gap:10,marginBottom:16}}>
            {["○","△","✕"].map(m=>{
              const cm=marks[cur.id]||{mark:"",reason:""};
              const sel=cm.mark===m;
              const cfg=MARK[m];
              return(
                <button key={m} onClick={()=>setMarks(p=>({...p,[cur.id]:{...cm,mark:m}}))}
                  style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                    padding:"14px 6px",borderRadius:16,cursor:"pointer",fontFamily:"inherit",
                    border:"2px solid "+(sel?cfg.sel:C.border),
                    background:sel?cfg.sel:cfg.bg,color:sel?"#fff":cfg.fg,
                    transform:sel?"scale(1.07)":"scale(1)",transition:"all .18s"}}>
                  <span style={{fontSize:28,fontWeight:700,lineHeight:1}}>{m}</span>
                  <span style={{fontSize:11,fontWeight:600}}>{cfg.w}</span>
                </button>
              );
            })}
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>
              📝 그렇게 생각한 이유 (필수) — 내 글에서 찾아 적어요
            </div>
            <textarea rows={2} value={(marks[cur.id]||{}).reason||""}
              onChange={e=>{const cm=marks[cur.id]||{mark:"",reason:""};
                setMarks(p=>({...p,[cur.id]:{...cm,reason:e.target.value}}));}}
              placeholder="예: 파도가 차가웠다는 감각 표현을 두 번째 줄에 썼어요."
              style={{width:"100%",padding:"10px 12px",borderRadius:12,
                border:"1.5px solid "+(((marks[cur.id]||{}).reason||"").trim().length>=MIN_REASON?C.green:C.border),
                fontSize:13,color:C.text,background:C.bg,outline:"none",resize:"none",
                fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.6}}/>
            <div style={{fontSize:11,marginTop:4,textAlign:"right",
              color:((marks[cur.id]||{}).reason||"").trim().length>=MIN_REASON?C.green:C.sub}}>
              {((marks[cur.id]||{}).reason||"").trim().length}자 / 최소 {MIN_REASON}자 이상
            </div>
          </div>
        </Card>
        <div style={{display:"flex",gap:10}}>
          {idx>0&&(
            <button onClick={()=>{setIdx(p=>p-1);setShowEx(false);}}
              style={{flex:1,padding:"13px",borderRadius:14,border:"1.5px solid "+C.border,
                background:"#fff",color:C.sub,fontWeight:600,fontSize:14,
                cursor:"pointer",fontFamily:"inherit"}}>← 이전</button>
          )}
          <button onClick={()=>{
              if(!done) return;
              if(idx<crit.length-1){setIdx(p=>p+1);setShowEx(false);}
              else if(isRe){setScreen("reviseReflect");}
              else{setScreen("memo");}
            }}
            style={{flex:2,padding:"13px",borderRadius:14,border:"none",
              background:done?(subj?subj.color:C.green):C.border,
              color:"#fff",fontWeight:700,fontSize:15,
              cursor:done?"pointer":"not-allowed",fontFamily:"inherit",transition:"background .2s"}}>
            {!cm.mark?"기호를 먼저 골라요":
              (cm.reason||"").trim().length<MIN_REASON?"이유를 더 적어요":
              idx<crit.length-1?"다음 →":isRe?"후기 쓰기 →":"완료! 열매 받기 "+(subj?subj.fruit:"")}
          </button>
        </div>
      </div></div>
    );
  }

  // ── 메모 ───────────────────────────────────
  if(screen==="memo") return (
    <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>✍️</div>
        <div style={{fontSize:18,fontWeight:800,color:C.text,marginTop:6}}>다음을 위한 한마디</div>
        <div style={{fontSize:13,color:C.sub,marginTop:4}}>다음엔 무엇을 가장 먼저 챙길 건가요?</div>
      </div>
      <Card>
        <textarea rows={4} value={memo} onChange={e=>setMemo(e.target.value)}
          placeholder="다음에 가장 먼저 챙길 것을 적어 봐요..."
          style={{width:"100%",padding:"12px",borderRadius:12,border:"1.5px solid "+C.border,
            fontSize:14,color:C.text,background:C.bg,outline:"none",resize:"none",
            fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.6,marginBottom:12}}/>
        <PBtn onClick={async()=>{
          const e={id:Date.now().toString(),subjectId:subj.id,subjectTitle:subj.title,
            subjectIcon:subj.icon,subjectColor:subj.color,fruit:subj.fruit,topic,
            date:new Date().toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"}),
            marks,total:crit.length,memo,revised:null};
          const nd={...userD,assessments:[...assessments,e]};
          setBusy(true);await svStudent(nd);setBusy(false);
          setUserD(nd);setCurId(e.id);setScreen("result");
        }} color={subj?subj.color:C.green} disabled={busy}>
          {busy?"저장 중...":"저장하고 열매 받기 "+(subj?subj.fruit:"")}
        </PBtn>
        <Ghost onClick={async()=>{
          const e={id:Date.now().toString(),subjectId:subj.id,subjectTitle:subj.title,
            subjectIcon:subj.icon,subjectColor:subj.color,fruit:subj.fruit,topic,
            date:new Date().toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"}),
            marks,total:crit.length,memo:"",revised:null};
          const nd={...userD,assessments:[...assessments,e]};
          setBusy(true);await svStudent(nd);setBusy(false);
          setUserD(nd);setCurId(e.id);setScreen("result");
        }}>건너뛰고 저장</Ghost>
      </Card>
    </div></div>
  );

  // ── 결과 ───────────────────────────────────
  if(screen==="result"){
    const last=assessments[assessments.length-1];
    if(!last) return null;
    const showRevise=crit.filter(c=>!c.isReflect).some(c=>{const mm=(marks[c.id]||{}).mark;return mm==="△"||mm==="✕";});
    return (
      <div style={wrap}><div style={mw}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:80,lineHeight:1}}>{last.fruit}</div>
          <div style={{fontSize:20,fontWeight:800,color:C.green,marginTop:8}}>열매 1개가 나무에 열렸어요!</div>
          <div style={{fontSize:12,color:C.sub,marginTop:4}}>
            {last.subjectIcon} {last.subjectTitle}{last.topic?" · 『"+last.topic+"』":""} · {last.date}
          </div>
        </div>
        <Card style={{textAlign:"center",marginBottom:12,background:"linear-gradient(160deg,#EEF6E8,#F5F9F0)"}}>
          <FruitTree fruits={fruits} size={160}/>
          <div style={{fontSize:13,fontWeight:700,color:C.green,marginTop:8}}>나무에 열매 {fruits.length}개!</div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}>기준별 결과</div>
          {crit.map(c=>{
            const mo=last.marks[c.id]||{};
            const m=mo.mark;
            const col=m==="○"?C.green:m==="△"?C.amber:C.red;
            const lbl=m==="○"?"매우 잘함":m==="△"?"잘함":m==="✕"?"보통":"—";
            return(
              <div key={c.id} style={{padding:"8px 0",borderBottom:"1px solid "+C.border}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:16}}>{c.icon}</span>
                  <span style={{flex:1,fontSize:13,color:C.text}}>{c.label}</span>
                  {c.isReflect&&<span style={{fontSize:10,color:C.purple,
                    background:"rgba(156,111,228,0.1)",padding:"2px 6px",borderRadius:6}}>성찰</span>}
                  <span style={{fontSize:14,fontWeight:700,color:col}}>{lbl}</span>
                </div>
                {mo.reason&&<div style={{fontSize:12,color:C.sub,background:C.bg,
                  borderRadius:8,padding:"5px 10px",marginTop:5,lineHeight:1.5}}>{mo.reason}</div>}
              </div>
            );
          })}
        </Card>
        {showRevise&&(
          <Card style={{marginBottom:12,
            background:"linear-gradient(135deg,rgba(156,111,228,0.07),rgba(245,185,66,0.07))",
            border:"1.5px solid rgba(156,111,228,0.2)"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.purple,marginBottom:6}}>✨ 고쳐보고 재평가하면 열매가 빛나요!</div>
            <div style={{fontSize:12,color:C.sub,marginBottom:12,lineHeight:1.6}}>
              잘함이나 보통인 부분을 직접 고쳐보고<br/>다시 평가하면 열매가 반짝반짝 빛나요 🌟
            </div>
            <PBtn onClick={()=>{setOrigMks({...marks});setScreen("revisePrompt");}} color={C.purple}>고쳐보고 재평가하기 ✨</PBtn>
          </Card>
        )}
        <PBtn onClick={()=>setScreen("dashboard")}>🌳 내 나무 보러 가기</PBtn>
      </div></div>
    );
  }

  // ── 고쳐보기 안내 ──────────────────────────
  if(screen==="revisePrompt"){
    const weak=crit.filter(c=>{if(c.isReflect)return false;const mm=(origMks[c.id]||{}).mark;return mm==="△"||mm==="✕";});
    return (
      <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:64}}>📝</div>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginTop:6}}>고쳐보기 시간!</div>
          <div style={{fontSize:13,color:C.sub,marginTop:6,lineHeight:1.8}}>
            아래 기준들을 지금 직접 고쳐봐요.<br/>다 고쳤으면 재평가를 시작해요!
          </div>
        </div>
        <Card style={{marginBottom:12,background:"#FFF9E6",border:"1.5px solid rgba(245,185,66,0.4)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#B07B00",marginBottom:8}}>고쳐볼 기준</div>
          {weak.map(c=>(
            <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,
              padding:"6px 0",borderBottom:"1px solid rgba(245,185,66,0.25)"}}>
              <span style={{fontSize:14}}>{c.icon}</span>
              <span style={{fontSize:13,color:C.text,flex:1}}>{c.label}</span>
              <span style={{fontSize:14,fontWeight:700,color:(origMks[c.id]||{}).mark==="△"?C.amber:C.red}}>
                {(origMks[c.id]||{}).mark==="△"?"잘함":"보통"}
              </span>
            </div>
          ))}
        </Card>
        <PBtn onClick={()=>{setIsRe(true);setMarks({});setIdx(0);setShowEx(false);setScreen("assess");}} color={C.purple}>
          다 고쳤어요! 재평가 시작 →
        </PBtn>
        <Ghost onClick={()=>setScreen("dashboard")}>나중에 할래요</Ghost>
      </div></div>
    );
  }

  // ── 재평가 후기 ────────────────────────────
  if(screen==="reviseReflect") return (
    <div style={{...wrap,justifyContent:"center"}}><div style={mw}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>🌟</div>
        <div style={{fontSize:18,fontWeight:800,color:C.text,marginTop:6}}>재평가 후기 쓰기</div>
        <div style={{fontSize:13,color:C.sub,marginTop:4,lineHeight:1.6}}>
          고쳐보고 다시 평가하면서<br/>무엇을 느꼈나요? 솔직하게 써봐요.
        </div>
      </div>
      <Card>
        <textarea rows={5} value={reflect} onChange={e=>setReflect(e.target.value)}
          placeholder="고쳐보니까 어떤 점이 달라졌나요? 처음 평가와 무엇이 달라졌나요?"
          style={{width:"100%",padding:"12px",borderRadius:12,border:"1.5px solid "+C.border,
            fontSize:14,color:C.text,background:C.bg,outline:"none",resize:"none",
            fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.6,marginBottom:12}}/>
        <PBtn onClick={async()=>{
          const upd=assessments.map(a=>a.id!==curId?a:{...a,
            revised:{marks,reflection:reflect,date:new Date().toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"})}});
          const nd={...userD,assessments:upd};
          setBusy(true);await svStudent(nd);setBusy(false);
          setUserD(nd);setIsRe(false);setScreen("shineResult");
        }} color={C.purple} disabled={!reflect.trim()||busy}>
          {busy?"저장 중...":"후기 저장하고 열매 빛내기 ✨"}
        </PBtn>
        <Ghost onClick={async()=>{
          const upd=assessments.map(a=>a.id!==curId?a:{...a,
            revised:{marks,reflection:"",date:new Date().toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"})}});
          const nd={...userD,assessments:upd};
          setBusy(true);await svStudent(nd);setBusy(false);
          setUserD(nd);setIsRe(false);setScreen("shineResult");
        }}>건너뛰고 저장</Ghost>
      </Card>
    </div></div>
  );

  // ── 빛나는 열매 ────────────────────────────
  if(screen==="shineResult"){
    const updA=userD?userD.assessments.find(a=>a.id===curId):null;
    if(!updA) return null;
    const allF=userD.assessments.map(a=>({fruit:a.fruit,shining:!!a.revised}));
    return (
      <div style={wrap}><div style={mw}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <BigFruit fruit={updA.fruit}/>
          <div style={{fontSize:22,fontWeight:800,color:C.purple,marginTop:16}}>열매가 빛나기 시작했어요! ✨</div>
          <div style={{fontSize:13,color:C.sub,marginTop:6,lineHeight:1.6}}>
            고쳐보고 다시 평가한 노력으로<br/>열매가 반짝반짝 빛나요!
          </div>
        </div>
        <Card style={{textAlign:"center",marginBottom:12,
          background:"linear-gradient(160deg,rgba(156,111,228,0.07),#EEF6E8)"}}>
          <FruitTree fruits={allF} size={160}/>
          <div style={{fontSize:13,fontWeight:700,color:C.purple,marginTop:8}}>빛나는 열매 {allF.filter(f=>f.shining).length}개 🌟</div>
        </Card>
        {updA.revised&&updA.revised.reflection&&(
          <Card style={{marginBottom:12,background:"#F9F5FF",border:"1.5px solid rgba(156,111,228,0.2)"}}>
            <div style={{fontSize:12,color:C.purple,fontWeight:600,marginBottom:6}}>내 재평가 후기</div>
            <div style={{fontSize:13,color:C.text,lineHeight:1.7}}>{updA.revised.reflection}</div>
          </Card>
        )}
        <PBtn onClick={()=>setScreen("dashboard")} color={C.purple}>🌳 내 나무 보러 가기</PBtn>
      </div></div>
    );
  }

  return null;
}
