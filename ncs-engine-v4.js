/* V4: non-repeating concept-based exam generation. All 312 stems are original practice, not NCS-text verified. */
(function(){
'use strict';
var concepts=window.SECURITY_V1_CONCEPTS || [];
var RECENT_V4='security-v1-papers-v4';
if(concepts.length!==104 || new Set(concepts.map(function(c){return c.term;})).size!==104){
 console.error('V4 question bank failed validation');
 return;
}
function shuffled(items){
 var a=items.slice();
 for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var v=a[i];a[i]=a[j];a[j]=v;}
 return a;
}
function attempts(){
 try{return JSON.parse(localStorage.getItem(RECENT_V4))||{first:[],second:[]};}
 catch(e){return {first:[],second:[]};}
}
function cleanTerm(s){return String(s||'').replace(/\s+/g,' ').trim();}
function targetWords(c,kind){
 if(kind==='term')return '다음 설명에 해당하는 보안 용어 또는 활동은? '+c.definition;
 if(kind==='contrast')return '유사한 개념인 ['+c.confuser+']과 구별할 때, 다음 설명에 가장 알맞은 것은? '+c.contrast;
 return '다음 상황에서 가장 적절한 보안 용어 또는 조치는? '+c.scenario;
}
function makeBase(c,kind,type){
 var match=concepts.find(function(x){return x.term===c.confuser;});
 var level=kind==='term'?'중하':kind==='contrast'?'중하':'중';
 var alias=[];
 var matchAbbr=c.term.match(/\(([^)]+)\)/);
 if(matchAbbr)alias.push(matchAbbr[1]);
 var shortAliases={'접근통제목록(ACL)':['ACL','접근제어목록'],'콘텐츠 보안 정책(CSP)':['CSP'],'상관 분석':['상관분석'],
  '쿠키 HttpOnly 속성':['HttpOnly'],'쿠키 Secure 속성':['Secure'],'SameSite 쿠키':['SameSite'],'다중요소 인증':['MFA'],
  'SQL 매개변수화':['파라미터 바인딩','Prepared Statement','준비된 문'],'네트워크 분리':['망분리'],
  '정적 분석':['정적 분석 도구'],'동적 분석':['동적 분석 도구'],'오탐':['False Positive','FP'],'미탐':['False Negative','FN']};
 alias=alias.concat(shortAliases[c.term]||[]);
 var status='NCS 원문 문장별 검증 미완료 · 자체 제작 연습문항';
 return {id:0,sourceId:c.id+':'+kind+':'+type,conceptId:c.id,type:type,
  stem:targetWords(c,kind),topic:c.topic,sub:'기본개념 · 용어 구별 · 상황 적용 연습',
  crit:'원문 수행준거 대조 미완료',code:'연습',
  answer:c.term,choices:null,pairs:null,match:null,why:c.definition,
  wrong:match?'혼동 주의: '+c.confuser+' — '+match.definition:'혼동 주의: '+c.confuser,
  memo:c.term+' : '+c.definition,level:level,accept:alias,
  ncsSource:{module:c.topic+' (영역별 자체 제작)',page:null,origin:status},
  focus:kind,practiceFocus:kind};
}
function createMultiple(c,kind){
 var q=makeBase(c,kind,'4지택일');
 var distractors=shuffled(concepts.filter(function(x){return x.topic===c.topic&&x.id!==c.id&&x.term!==c.confuser;}));
 var terms=shuffled([c.term,c.confuser,distractors[0].term,distractors[1].term]);
 var labels=['①','②','③','④'];
 q.choices=terms.map(function(v,i){return labels[i]+' '+v;});
 q.answer=labels[terms.indexOf(c.term)];
 return q;
}
function createTrueFalse(c,kind){
 var q=makeBase(c,kind,'진위형');
 var isTrue=Math.random()<0.5;
 if(kind==='scenario')q.stem=c.scenario+' 이 상황의 적절한 대책을 ['+(isTrue?c.term:c.confuser)+']이라고 판단하였다. 이 판단은 옳은가?';
 else q.stem='다음 용어와 설명의 연결은 올바른가? ['+(isTrue?c.term:c.confuser)+'] — '+(kind==='contrast'?c.contrast:c.definition);
 q.answer=isTrue?'① O':'② X';
 q.choices=['① O','② X'];
 return q;
}
function createMatch(c,kind){
 var q=makeBase(c,kind,'연결형');
 var others=shuffled(concepts.filter(function(x){return x.topic===c.topic&&x.id!==c.id&&x.term!==c.confuser;}));
 var subset=shuffled([c,others[0],others[1]]);
 var descName=kind==='term'?'definition':kind==='contrast'?'contrast':'scenario';
 var descs=shuffled(subset.map(function(x){return {id:x.id,text:x[descName]};}));
 var symbols=['㉠','㉡','㉢'];
 q.stem=kind==='scenario'?'다음 세 가지 상황을 각각의 보안 용어와 연결하시오.':kind==='contrast'?'비슷한 개념을 구별하여 용어와 설명을 연결하시오.':'용어와 가장 알맞은 설명을 연결하시오.';
 q.pairs=[subset.map(function(x){return x.term;}),descs.map(function(x,i){return symbols[i]+' '+x.text;})];
 q.match=subset.map(function(x){return symbols[descs.findIndex(function(y){return y.id===x.id;})];});
 q.answer=q.match.map(function(v,i){return String(i+1)+'-'+v;}).join(' / ');
 return q;
}
function createShort(c,kind){
 return makeBase(c,kind,'단답형');
}
function createBankChoice(c,kind){
 return makeBase(c,kind,'보기 선택');
}
var oldBuildPaper=buildPaper;
buildPaper=function(stage){
 var plans=stage===1?[
  {type:'4지택일',mix:{term:6,contrast:8,scenario:6}},
  {type:'진위형',mix:{term:2,contrast:1,scenario:2}},
  {type:'연결형',mix:{term:1,contrast:2,scenario:2}},
  {type:'단답형',mix:{term:3,contrast:5,scenario:2}}
 ]:[{type:'보기 선택',mix:{term:6,contrast:8,scenario:6}}];
 var recent=attempts();
 var key=stage===1?'first':'second';
 var past=(recent[key]||[]).slice(-3);
 var missed=new Set(Object.values(wrong).filter(function(w){return w.stage===stage&&w.q&&w.q.conceptId;}).map(function(w){return w.q.conceptId;}));
 var taken=new Set(), spread={};
 var candidates=concepts.filter(function(c){return selectedTopic==='전체'||c.topic===selectedTopic;});
 if(candidates.length<(stage===1?40:20))candidates=concepts;
 function select(){
  return candidates.filter(function(c){return !taken.has(c.id);}).map(function(c){
   var cost=0;
   past.forEach(function(p,i){if(p.includes(c.id))cost+=20+(i*12);});
   cost+=(spread[c.topic]||0)*1.5;
   if(selectedTopic!=='전체'&&c.topic===selectedTopic)cost-=45;
   if(wrongPriority&&missed.has(c.id))cost-=35;
   return {c:c,cost:cost+Math.random()*3};
  }).sort(function(a,b){return a.cost-b.cost;})[0].c;
 }
 var paper=[];
 plans.forEach(function(group){
  ['term','contrast','scenario'].forEach(function(kind){
   for(var i=0;i<group.mix[kind];i++){
    var c=select();
    taken.add(c.id);
    spread[c.topic]=(spread[c.topic]||0)+1;
    var q=group.type==='4지택일'?createMultiple(c,kind):
     group.type==='진위형'?createTrueFalse(c,kind):
     group.type==='연결형'?createMatch(c,kind):
     group.type==='단답형'?createShort(c,kind):createBankChoice(c,kind);
    paper.push(q);
   }
  });
 });
 var order=stage===1?['4지택일','진위형','연결형','단답형']:['보기 선택'];
 paper=order.flatMap(function(type){return shuffled(paper.filter(function(q){return q.type===type;}));});
 if(stage===2){
  var answers=paper.map(function(q){return q.answer;});
  var other=shuffled(concepts.map(function(c){return c.term;}).filter(function(x){return !answers.includes(x);}));
  var wholeBank=shuffled(answers.concat(other.slice(0,19)));
  if(wholeBank.length!==39||new Set(wholeBank).size!==39)throw new Error('2차 통합보기 39개 구성 실패');
  paper.forEach(function(q){q.answerIndex=wholeBank.indexOf(q.answer)+1;q.bank=wholeBank;});
 }
 paper.forEach(function(q,i){q.id=i+1;});
 var cnt=paper.reduce(function(x,q){x[q.focus]=(x[q.focus]||0)+1;return x;},{});
 var required=stage===1?{term:12,contrast:16,scenario:12}:{term:6,contrast:8,scenario:6};
 if(paper.length!==(stage===1?40:20)||Object.keys(required).some(function(x){return cnt[x]!==required[x];}))throw new Error('V4 paper size/mix validation failed');
 (recent[key]||(recent[key]=[])).push(Array.from(taken));
 recent[key]=recent[key].slice(-10);
 localStorage.setItem(RECENT_V4,JSON.stringify(recent));
 return paper;
};
function activeTermList(q){return q.bank||D.bank;}
bankButtons=function(q,a,filter){
 var termBank=activeTermList(q);
 filter=filter||'';
 return termBank.map(function(v,i){return {v:v,n:i+1};}).filter(function(x){
  return (String(x.n)+' '+x.v).toLowerCase().includes(String(filter).trim().toLowerCase());
 }).map(function(x){
  return '<button type="button" class="bank-option '+(Number(a)===x.n?'chosen':'')+'" onclick="choose('+x.n+')"><b>'+
   String(x.n).padStart(2,'0')+'</b> '+esc(x.v)+'</button>';
 }).join('')||'<div class="q-hint">검색 결과가 없습니다.</div>';
};
questionWidget=function(q){
 var a=answer(q);
 if(q.type==='보기 선택'){
  var terms=activeTermList(q);
  return '<div class="q-hint">아래 통합 보기에서 정답 번호를 하나 선택하세요.</div>'+
   '<details class="bank-card" id="bankdetails" '+(!a?'open':'')+'><summary>통합 보기 '+terms.length+'개 펼치기 ▾</summary>'+
   '<div class="bank-body"><input class="bank-search" id="banksearch" type="search" placeholder="보기 번호 또는 용어 검색" oninput="filterBank(this.value)" aria-label="통합 보기 검색">'+
   '<div class="bank-grid" id="bank-options">'+bankButtons(q,a)+'</div></div></details>'+
   (a?'<div class="selected-bank"><div><b>선택: '+a+'번</b><br>'+esc(terms[Number(a)-1])+
   '</div><button onclick="choose(\x27\x27)">선택 해제</button></div>':'');
 }
 if(q.type==='4지택일'||q.type==='진위형')return '<div class="choice-list">'+q.choices.map(function(c){
  return '<button type="button" class="choice '+(a===c?'selected':'')+'" onclick="choose('+JSON.stringify(c).replace(/"/g,'&quot;')+')"><span class="bullet">'+c.slice(0,1)+'</span><span>'+esc(c.slice(2))+'</span></button>';
 }).join('')+'</div>';
 if(q.type==='연결형')return '<div class="q-hint">세 가지 연결을 모두 맞혀야 정답으로 처리합니다.</div><div>'+
  q.pairs[0].map(function(v,i){
   return '<label class="match-row"><span>'+esc(v)+'</span><select onchange="matchPick('+i+',this.value)"><option value="">답 선택</option>'+
   q.pairs[1].map(function(x,j){
    var symbol=['㉠','㉡','㉢'][j];
    return '<option value="'+symbol+'" '+(Array.isArray(a)&&a[i]===symbol?'selected':'')+'>'+symbol+' 선택</option>';
   }).join('')+'</select></label>';
  }).join('')+'</div><div class="match-bank">'+q.pairs[1].map(function(v){return '<div>'+esc(v)+'</div>';}).join('')+'</div>';
 if(q.type==='단답형')return '<label class="q-hint" for="shortanswer">정확한 용어·약어를 입력하세요. 인정 동의어는 채점에 반영합니다.</label>'+
  '<input autocomplete="off" autocorrect="off" class="input-answer" id="shortanswer" aria-label="단답형 답안 입력" type="text" placeholder="용어를 입력" value="'+esc(a||'')+'">';
 return '';
};
displayAnswer=function(q,a){
 if(a===undefined||a===null||a===''||(Array.isArray(a)&&a.every(function(x){return !x;})))return '미응답';
 if(q.type==='연결형')return a.map(function(v,i){return ['①','②','③'][i]+'-'+(v||'?');}).join(', ');
 if(q.type==='보기 선택')return a+'번 · '+(activeTermList(q)[Number(a)-1]||'미선택');
 return String(a);
};
function makeStart(){
 var ongoing=appState&&!appState.finished;
 if(ongoing&&appState.stage===selectedStage&&appState.mode===selectedMode){
  current=appState.current||0;go('exam');return;
 }
 startFresh();
}
window.startFresh=function(){
 if(appState&&!appState.finished&&Object.keys(appState.answers||{}).length&&
  !confirm('지금까지 작성한 진행 중 답안은 지워집니다. 새 문제로 다시 시작할까요?'))return;
 try{
  var paper=buildPaper(selectedStage);
  appState={stage:selectedStage,mode:selectedMode,started:Date.now(),answers:{},current:0,
   finished:false,paperDay:koreaDay(),paper:paper,engineVersion:4};
  current=0;showSolution=false;save();go('exam');
 }catch(e){console.error(e);toast('새 시험지 생성 오류: '+e.message);}
};
start=makeStart;
var originalSetupPage=setupPage;
setupPage=function(){
 var html=originalSetupPage();
 html=html.replace(/<label>난이도 <select[\s\S]*?<\/select><\/label>/,'<div><b>난이도:</b> 중하~중 중심 (실전 출제 비율 고정)</div>');
 html=html.replace('1차 단답·연결형 20문항은 형식 유지를 위해 고정됩니다.','1차 객관식·진위형·연결형·단답형도 매회 새 문제로 구성됩니다.');
 html=html.replace('하~중하','중하~중');
 html=html.replace('</button><div class="notice">진행 답안은 현재 기기의 브라우저에 자동 저장됩니다.',
  '</button>'+(appState&&!appState.finished?'<button class="btn outline full" style="margin-top:10px" onclick="startFresh()">새 문제로 다시 시작하기</button>':'')+
  '<div class="notice">진행 답안은 현재 기기의 브라우저에 자동 저장됩니다.');
 return html;
};
var originalHome=home;
home=function(){
 var html=originalHome();
 html=html.replace('기존 문제와 신규 기본개념 문제를 섞어 출제하며 한국시간 날짜별로 시험지 구성을 바꾸고 최근 출제 문항을 우선 제외합니다. 실전 출제는 기존 90개 중 의미 있는 문제를 선별하며, 210개 단순 보기 변형은 새 문제로 계산하거나 출제하지 않습니다. 저장된 변형 항목은 별도로 남아 있습니다. 변형은 독립적인 신규 개념이 아니며 NCS 원문 미검증입니다. 실전 타이머·자동채점·오답복습에 적용했습니다. 관련 학습내용과 수행준거를 문항마다 표시합니다.',
  '104개의 개념별로 정의형·유사 개념 구별형·짧은 상황 적용형 질문을 직접 작성했습니다. 총 312개의 서로 다른 질문 문구를 사용하며 보기만 바꾼 항목을 새 문제로 세지 않습니다. 매회 새 시험지를 생성하고 최근 출제 개념을 우선 제외합니다. NCS 학습모듈 원문과 문장별 대조는 아직 완료되지 않은 자체 제작 문제입니다.');
 html=html.replace('문제 항목 300개','104개 핵심개념 · 312개 질문');
 html=html.replace('기존 90개 중 의미 있는 문제','104개 핵심개념');
 return html;
};
var originalFinish=finish;
finish=function(auto){
 if(!appState||appState.finished)return;
 var stage=appState.stage,qs=questions(stage),count=qs.filter(filled).length;
 if(!auto&&!confirm('답변 '+count+'/'+qs.length+'문항입니다. 지금 제출하여 채점하시겠습니까?'))return;
 var r=getResult(stage,appState.answers);
 var record={stage:stage,mode:appState.mode,finished:Date.now(),score:r.total,correct:r.correct,answered:r.answered,
  answers:structuredClone(appState.answers),paper:structuredClone(qs),overrides:{},id:Date.now().toString()};
 r.items.forEach(function(it){
  var key=stage+'-'+(it.q.sourceId||it.q.id);
  if(!it.ok)wrong[key]={stage:stage,id:it.q.id,mine:it.a,q:it.q,when:Date.now()};
  else delete wrong[key];
 });
 localStorage.setItem(WRONG_KEY,JSON.stringify(wrong));
 history.unshift(record);history=history.slice(0,30);
 localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 appState=null;save();result=record;go('result');
 toast(auto?'시간 종료로 자동 제출했습니다.':'채점이 완료되었습니다.');
};
override=function(id){
 if(!result)return;
 var q=(result.paper||[]).find(function(x){return x.id===id;});
 if(!q||q.type!=='단답형')return;
 if(!result.overrides)result.overrides={};
 result.overrides[id]=true;
 var item=history.find(function(x){return x.id===result.id;});
 if(item){
  item.overrides=Object.assign({},result.overrides);
  var r=getResult(result.stage,result.answers,result.overrides);
  item.score=r.total;item.correct=r.correct;
  localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 }
 delete wrong[result.stage+'-'+(q.sourceId||q.id)];
 localStorage.setItem(WRONG_KEY,JSON.stringify(wrong));
 toast('해당 단답형을 정답으로 인정했습니다.');render();
};
var originalExamPage=examPage;
examPage=function(){
 var html=originalExamPage();
 return html.replace('NCS 하~중하 실전 모의고사','NCS 연계 중하~중 예상 모의고사');
};
console.info('V4 exam engine activated: 104 concepts, 312 prompts, fresh papers with recent exclusion.');
render();
})();
