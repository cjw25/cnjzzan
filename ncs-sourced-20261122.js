/* NCS 모듈 원본 연계 시험: V4의 임의 312문항은 출제하지 않음.
   기존 40+20 문항은 NCS 모듈별 출처를 갖춘 후보만 사용.
   추가 용어는 사용자 업로드 7개 NCS PDF의 본문과 표시된 페이지에서 확인함.
   정보시스템 진단 사진 교재는 16v1이므로 출처에 구버전을 명시함.
*/
(function(){
"use strict";
const proven=[{"id":1,"topic":"SW개발 보안 구축","page":16,"term":"자산(Asset)","definition":"조직 또는 기관이 보유하는 정보화 자산과 데이터","wrong":["위협원","위협","취약점"],"source":"LM2001020611_19v5"},{"id":2,"topic":"SW개발 보안 구축","page":16,"term":"위협원(Threat agents)","definition":"자산에 피해를 줄 수 있는 내·외부 공격 위험 주체","wrong":["자산","위협","위험"],"source":"LM2001020611_19v5"},{"id":3,"topic":"SW개발 보안 구축","page":16,"term":"위협(Threat)","definition":"자산에 피해를 주는 위협원의 공격 행동","wrong":["자산","위협원","취약점"],"source":"LM2001020611_19v5"},{"id":4,"topic":"시스템 보안 구축","page":16,"term":"패스워드 인증","definition":"입력된 사용자 ID와 패스워드를 등록된 정보와 대조하여 접속 허용 여부를 판단","wrong":["로그 분석","네트워크 분리","백업"],"source":"LM2001020613_19v5"},{"id":5,"topic":"시스템 보안 구축","page":17,"term":"로그 관리","definition":"시스템에 영향을 미치는 사항을 기록하여 문제 해결과 예방 활동에 활용","wrong":["권한 부여","서비스 제거","망분리"],"source":"LM2001020613_19v5"},{"id":6,"topic":"시스템 보안 구축","page":17,"term":"취약점(Vulnerability)","definition":"공격자가 시스템의 정보보안을 낮추는 데 사용할 수 있는 약점","wrong":["가용성","정상 탐지","인증 정보"],"source":"LM2001020613_19v5"},{"id":7,"topic":"NW보안 구축","page":36,"term":"물리적 망분리","definition":"별도 PC와 회선을 사용하여 내부망과 외부망을 분리","wrong":["논리적 망분리","가상사설망","패킷 필터링"],"source":"LM2001020614_19v5"},{"id":8,"topic":"NW보안 구축","page":36,"term":"논리적 망분리","definition":"가상화 기술 등을 이용해 한 대의 PC에서 내부망과 외부망을 분리","wrong":["물리적 망분리","방화벽 정책","백업"],"source":"LM2001020614_19v5"},{"id":9,"topic":"NW보안 구축","page":31,"term":"네트워크 접속 제한","definition":"IP 주소 등으로 시스템 접속 권한을 제한하여 비인가 접근을 막는 보안 요구사항","wrong":["로그 삭제","권한 무제한 부여","보안 설정 해제"],"source":"LM2001020614_19v5"},{"id":10,"topic":"네트워크 보안 운영","page":26,"term":"MAN","definition":"LAN보다 크고 WAN보다 작은 도시 규모의 통신망","wrong":["LAN","WAN","PAN"],"source":"LM2001060108_19v3"},{"id":11,"topic":"네트워크 보안 운영","page":26,"term":"WAN","definition":"국가나 대륙 등 넓은 지역을 연결하는 광역 통신망","wrong":["LAN","MAN","PAN"],"source":"LM2001060108_19v3"},{"id":12,"topic":"네트워크 보안 운영","page":36,"term":"스크리닝 라우터","definition":"송수신지 주소, 프로토콜, 포트 등을 분석해 패킷 통과를 허가하거나 거절하는 라우터","wrong":["웹 애플리케이션 방화벽","인증 서버","백업 서버"],"source":"LM2001060108_19v3"},{"id":13,"topic":"애플리케이션 보안 운영","page":17,"term":"보안 요구사항 정의서","definition":"애플리케이션 구조와 보안 솔루션 현황을 파악하고 보안 요구사항을 정리한 문서","wrong":["침해사고 보고서","로그 삭제 내역","패치 설치 파일"],"source":"LM2001060109_19v3"},{"id":14,"topic":"애플리케이션 보안 운영","page":36,"term":"보안 설정 변경","definition":"알려진 취약점의 개선을 위해 적용할 수 있는 보안 조치 방법","wrong":["취약점 방치","로그 비활성화","무조건적 접근 허용"],"source":"LM2001060109_19v3"},{"id":15,"topic":"애플리케이션 보안 운영","page":36,"term":"보안 패치 적용","definition":"알려진 취약점의 개선을 위해 업데이트를 적용하는 조치","wrong":["계정 공유","기록 삭제","접근 통제 해제"],"source":"LM2001060109_19v3"},{"id":16,"topic":"시스템 보안 운영","page":26,"term":"예방 대응","definition":"보안 위협과 위험을 사전에 예방하기 위한 대응 활동","wrong":["사후 보고만 수행","로그 무조건 삭제","관리자 계정 공유"],"source":"LM2001060110_19v3"},{"id":17,"topic":"시스템 보안 운영","page":26,"term":"탐지 대응","definition":"보안 사고 탐지를 위한 활동 지표와 사전 대응 매뉴얼에 따라 조치","wrong":["예산 편성만 수행","백업 삭제","접근 통제 해제"],"source":"LM2001060110_19v3"},{"id":18,"topic":"시스템 보안 운영","page":41,"term":"시스템 보안 진단 절차","definition":"대상 식별, 인벤토리 스캐닝, 취약점 점검, 상세 점검, 보고서 작성의 순서","wrong":["백업, 복원, 폐기","설계, 구매, 폐기","계정 생성, 삭제만 수행"],"source":"LM2001060110_19v3"},{"id":19,"topic":"보안로그 분석","page":16,"term":"침해대응 절차","definition":"보안사고 발생 시 대응하는 일련의 과정과 수행 행동","wrong":["망분리 구축 절차","일반 개발 배포 절차","자산 구매 절차"],"source":"LM2001060307"},{"id":20,"topic":"보안로그 분석","page":26,"term":"정탐","definition":"보안사고를 정해진 규칙에 따라 정상적으로 탐지하고 분석 결과를 올바르게 판정한 경우","wrong":["오탐","미탐","로그 손실"],"source":"LM2001060307"}];
const extraSecond=[["랜섬웨어","사용자 동의 없이 파일을 암호화하고 복호화 대가를 요구하는 악성 프로그램은?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 악성 프로그램의 유형",19],["웜","다른 파일에 기생하지 않고 독자적으로 자신을 복제하여 빠르게 퍼지는 악성코드는?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 악성 프로그램의 유형",19],["키로거","사용자가 누르는 키보드 입력 정보를 수집해 공격자에게 전달하는 악성 프로그램은?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 악성 프로그램의 유형",19],["C&C 서버","악성코드에 감염된 좀비 PC들을 관리하고 DDoS 명령 등을 내리는 제어 서버는?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 악성 프로그램의 유형",19],["포트 스캐닝","대상 서버의 열린 서비스 포트에 접속을 시도하면서 공격할 수 있는 포트를 찾아내는 사전 탐색 기법은?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 네트워크 공격 기법",18],["CSRF","인증된 사용자가 모르는 사이에 사용자의 세션 정보를 이용해 의도하지 않은 요청을 보내도록 하는 공격은?","애플리케이션 보안 운영","LM2001060109_19v3 애플리케이션 보안 운영 · 공격 유형",23],["DMZ","외부에 공개할 서버를 내부 네트워크와 분리하여 배치하는 완충 네트워크 구역은?","네트워크 보안 운영","LM2001060108_19v3 네트워크 보안 운영 · 공개 서버 네트워크 분리",29],["Nmap","네트워크의 포트 상태와 시스템을 탐색·점검할 때 사용하는 도구는?","시스템 보안 구축","LM2001020613_19v5 시스템 보안 구축 · 보안 구현 도구",51],["ESM","여러 보안시스템에서 발생한 로그와 이벤트를 통합하여 보안관제를 지원하는 솔루션은?","NW보안 구축","LM2001020614_19v5 NW보안 구축 · 통합 보안 관제 솔루션",38],["침입방지시스템(IPS)","네트워크로 들어오는 패킷에서 악의적인 패킷을 탐지하고 제어하는 보안 장비·소프트웨어는?","애플리케이션 보안 운영","LM2001060109_19v3 애플리케이션 보안 운영 · 보안 솔루션 종류",31]];
const circ=['①','②','③','④'];
const memoKey="v1-ncs-source-papers-20261122";
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
function choiceTerm(q){const p=(q.choices||[]).find(x=>String(x).startsWith(q.answer));return p?String(p).replace(/^[①②③④] */,''):''}
function mkFirst(v){
 const raw=shuffle([v.term,...v.wrong].map(x=>String(x))).slice(0,4);
 const idx=raw.indexOf(v.term);
 return {id:1000+v.id,type:"4지택일",stem:v.definition+" — 이 설명에 해당하는 NCS 학습모듈 용어는?",
  topic:v.topic,sub:v.topic,crit:"NCS",code:"NCS-"+v.id,level:"중하",focus:"term",
  answer:circ[idx],choices:raw.map((s,i)=>circ[i]+" "+s),pairs:null,match:null,accept:[],
  why:"모듈에 실린 개념 '"+v.term+"'의 설명을 바탕으로 출제했습니다.",
  wrong:"보기의 다른 용어와 차이를 비교하세요.",memo:v.term+" — "+v.definition,
  ncsSource:{module:v.source+" · "+v.topic,page:v.page,origin:"첨부 NCS 학습모듈 본문에 연결된 연습문제 · 공식 기출문제 아님"}};
}
function mkSecond(v,i){
 const [term,stem,topic,module,page]=v;const idx=D.bank.indexOf(term);
 if(idx<0)throw new Error("2차 통합 보기 누락: "+term);
 return {id:201+i,type:"보기 선택",stem,topic,sub:topic,crit:"NCS",code:"NCS-II-"+(201+i),
  answer:term,answerIndex:idx+1,choices:null,pairs:null,match:null,level:"중하",focus:"term",accept:[],
  why:"NCS 학습모듈에 기재된 '"+term+"'의 기능·의미를 구별하는 문항입니다.",
  wrong:"비슷한 용어 및 기능과 비교하세요.",memo:term+" = "+stem.replace(/는\?$/,''),
  ncsSource:{module,page,origin:"첨부 NCS PDF 본문 확인 · 관련 개념을 재구성한 연습문제 · 공식 기출문제 아님"}};
}
const verifiedFirst=proven.map(mkFirst);
const verifiedSecond=extraSecond.map(mkSecond);
function choose(pool,count,stage){
 const ids=new Set();
 const seen=new Set();
 const priority=shuffle(pool).map(q=>({q,score:0}));
 const past=JSON.parse(localStorage.getItem(memoKey+"-"+stage)||"[]");
 for(const p of priority){
  const term=stage===1?choiceTerm(p.q):p.q.answer;
  if(past.includes(p.q.id))p.score+=4;
  if(selectedTopic!=="전체"&&p.q.topic!==selectedTopic)p.score+=2;
  if(selectedDifficulty!=="전체"&&p.q.level!==selectedDifficulty)p.score+=1;
  if(wrongPriority){
   const miss=Object.values(wrong||{}).some(v=>v?.id===p.q.id||v?.q?.id===p.q.id);
   if(!miss)p.score+=2;
  }
  p.term=term.toLowerCase().replace(/[^가-힣a-z0-9]/g,"");
 }
 priority.sort((a,b)=>a.score-b.score);
 let chosen=[];
 for(const {q,term} of priority){
  if(ids.has(q.id)||seen.has(term))continue;
  chosen.push(q);ids.add(q.id);seen.add(term);
  if(chosen.length===count)break;
 }
 if(chosen.length<count)for(const {q} of priority){if(!ids.has(q.id)){chosen.push(q);ids.add(q.id);if(chosen.length===count)break}}
 if(chosen.length!==count)throw Error("출처 연결 문항 부족: "+stage+"차 "+chosen.length+"/"+count);
 localStorage.setItem(memoKey+"-"+stage,JSON.stringify(chosen.map(q=>q.id)));
 return chosen;
}
buildPaper=function(stage){
 const qs=stage===1
  ? [...choose([...D.first.filter(q=>q.type==="4지택일"),...verifiedFirst],20,stage),
      ...D.first.filter(q=>q.type!=="4지택일")]
  : choose([...D.second,...verifiedSecond],20,stage);
 // 보기 순서만 변경한 문항을 새 문항으로 계산하지 않습니다.
 return shuffle(qs);
};
const originalStart=start;
start=function(){
 if(appState?.paper?.some(q=>q.sourceId || q.id>=100 && q.id<200)){
  appState=null;save();
 }
 return originalStart();
};
const originalHome=home;
home=function(){
 return originalHome().replace(/기존 문제와 신규 기본개념 문제를 섞어 출제하며[\s\S]*?관련 학습내용과 수행준거를 문항마다 표시합니다\./,
 "사용자가 제공한 NCS 학습모듈 7개 PDF와 정보시스템 진단 사진 교재의 학습내용을 근거로 출제합니다. 312개 미검증 자동생성 문항은 실전에서 제외했습니다. 1차 객관식은 NCS 출처가 연결된 후보 중 선택하며, 2차는 실제 본문에 있는 용어로만 통합 보기를 구성합니다. 문항마다 자료명과 근거 페이지를 가능한 범위에서 표시합니다. 일부 구버전 자료 및 출처 검토 중인 문항이 있으므로 공식 기출·원문 전수 검증이라고 표시하지 않습니다.")
 .replace(/실전형 구성으로 <b>핵심 용어·정의 30%, 개념 비교 40%, 짧은 상황형 30%<\/b>로 문제은행을 다시 구성했습니다\./,
 "모듈에서 확인한 용어·정의와 구별 문제를 중심으로 구성했습니다.")
 .replace(/기존 90개 중 의미 있는 문제|104개 핵심개념|312개 서로 다른 질문|104개 개념별로/g,
 "NCS 본문 출처가 연결된 문항");
};
console.info("NCS sourced question selection active: 1차 40 / 2차 20. V4 312-item bank disabled.");
render();
})();