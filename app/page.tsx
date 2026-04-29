'use client';
import { useState, useEffect, useRef } from 'react';

type Member = {
  id: number; nameKo: string; nameEn: string; pos: string;
  material: string; matKo: string; symbol: string;
  bg: string; color: string; img: string; imgDetail: string;
  trait: string; trivia: string; keywords: string[];
};

const members: Member[] = [
  {
    id: 0, nameKo: '우리', nameEn: 'WOORI', pos: '리더 · 서브보컬',
    material: 'WOOD', matKo: '나무', symbol: '나무 = 기억',
    bg: '#40282C', color: '#c9a87a',
    img: '/members/woori_01.jpg', imgDetail: '/members/woori.jpg',
    trait: '안경쓴 모습이 종종 포착된다. 말이 적지만 한 마디 한 마디가 무겁다. 팀의 철학적 방향을 잡는 지성파 리더.',
    trivia: '나무의 나이테처럼 모든 경험이 몸에 새겨진다고 믿음. 쉬는 날엔 혼자 독서와 목공소를 간다.',
    keywords: ['지성파', '인문학', '묵직함', '리더십', '서재'],
  },
  {
    id: 1, nameKo: '건', nameEn: 'GEON', pos: '메인댄서',
    material: 'METAL', matKo: '금속', symbol: '금속 = 의지',
    bg: '#141c24', color: '#8ab0c9',
    img: '/members/geon_01.jpg', imgDetail: '/members/geon.jpg',
    trait: '차와 바이크를 좋아한다. 기계 구조에 대한 이해가 깊어 무대 메커니즘도 직접 분석하는 것을 좋아한다.',
    trivia: '연습실에 미니 공구함 보유. 키링 디자인은 본인이 직접 CAD 스케치 참여.',
    keywords: ['정밀함', '기계공학', '단단함', '퍼포먼스', '속도'],
  },
  {
    id: 2, nameKo: '하루', nameEn: 'HARU', pos: '메인보컬',
    material: 'GLASS', matKo: '유리', symbol: '유리 = 투명성',
    bg: '#0d1e26', color: '#7abcca',
    img: '/members/haru_01.jpg', imgDetail: '/members/haru.jpg',
    trait: '섬세하고 투명한 것을 좋아하여 유리 공방을 자주 찾는다. 감정이 유리처럼 투명하게 드러나는 타입.',
    trivia: '선글라스 컬렉터. 의외로 황금시간대 산책을 즐김.',
    keywords: ['투명함', '섬세함', '보컬', '빛', '감성'],
  },
  {
    id: 3, nameKo: '솔', nameEn: 'SOL', pos: '메인래퍼',
    material: 'CERAMIC', matKo: '도자', symbol: '도자 = 시간',
    bg: '#1e1208', color: '#c99e70',
    img: '/members/sol_01.jpg', imgDetail: '/members/sol.jpg',
    trait: '평소엔 기운이 없어 보임. 래핑 시작하면 눈빛이 완전히 달라진다. 도자기에 집착적 애착.',
    trivia: '도자기 100개 이상 보유. 물레로 도자기를 만드는 영상이 팬들 사이 인기.',
    keywords: ['이중성', '집착', '도구', '변화', '불꽃'],
  },
  {
    id: 4, nameKo: '리엘', nameEn: 'RIEL', pos: '막내 · 서브댄서',
    material: 'TEXTILE', matKo: '섬유', symbol: '섬유 = 연결',
    bg: '#160e20', color: '#a888c9',
    img: '/members/riel_01.jpg', imgDetail: '/members/riel.jpg',
    trait: '팀 내 가장 귀엽고 막내다운 외모. 섬유로 된 것들을 손으로 직접 만드는 것과 섬유 공예에 관심이 많다.',
    trivia: '재봉틀 3대 보유. 자수로 팬 편지 답장.',
    keywords: ['연결', '귀여움', '섬세한손길', '직물', '따뜻함'],
  },
];

const collections = [
  { num: 'COLLECTION 01', name: 'VOID PROTOCOL', ko: '무효 규약',
    desc: '5인이 처음으로 세상에 신호를 보낸다. RELIC의 시작.',
    date: '1ST MINI · 2026.04', bg: '#1c1510',
    img: '/albums/album_1.jpg', audio: '/audio/album_1.mp3' },
  { num: 'COLLECTION 02', name: 'ERRR : 侵', ko: '오류 · 침범',
    desc: '오류처럼 침투하는 에너지. 두 번째 챕터의 개막.',
    date: '2ND MINI · 2026.10', bg: '#0f1820',
    img: '/albums/album_2.jpg', audio: '/audio/album_2.mp3' },
  { num: 'COLLECTION 03', name: 'SPECIMEN∞', ko: '영원한 표본',
    desc: '분류 불가능한 존재로의 진화. RELIC의 완성.',
    date: '1ST FULL · 2027', bg: '#141a0f',
    img: '/albums/album_3.jpg', audio: '/audio/album_3.mp3' },
];

// ── 균열 캔버스 ───────────────────────────────────────────────────
function CrackCanvas({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let cracks: { segs: { x1:number;y1:number;x2:number;y2:number }[]; life:number; decay:number }[] = [];
    let W = 0, H = 0, split = 0;
    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      split = W * 0.55;
    }
    resize();
    window.addEventListener('resize', resize);
    function makeCrack(sx:number,sy:number,angle:number,depth:number) {
      const segs: {x1:number;y1:number;x2:number;y2:number}[] = [];
      let x=sx,y=sy,a=angle;
      for(let i=0;i<depth;i++){
        a+=(Math.random()-0.5)*0.7;
        const len=10+Math.random()*22;
        const nx=x+Math.cos(a)*len, ny=y+Math.sin(a)*len;
        segs.push({x1:x,y1:y,x2:nx,y2:ny});
        x=nx;y=ny;
        if(Math.random()<0.35&&i<depth-2){
          const ba=a+(Math.random()-0.5)*1.4,bl=6+Math.random()*14;
          segs.push({x1:x,y1:y,x2:x+Math.cos(ba)*bl,y2:y+Math.sin(ba)*bl});
        }
      }
      return segs;
    }
    function spawnCrack() {
      if(!canvas)return;
      const sx=Math.random()*canvas.width*0.9, sy=Math.random()*canvas.height;
      cracks.push({segs:makeCrack(sx,sy,Math.random()*Math.PI*2,7+Math.floor(Math.random()*9)),life:1.0,decay:0.0025+Math.random()*0.004});
      if(cracks.length>16)cracks.shift();
    }
    spawnCrack();spawnCrack();spawnCrack();spawnCrack();
    const spawnTimer=setInterval(spawnCrack,1000);
    function draw() {
      if(!ctx||!canvas)return;
      ctx.clearRect(0,0,W,H);
      cracks.forEach(crack=>{
        crack.life-=crack.decay;
        if(crack.life<0)return;
        crack.segs.forEach((seg,i)=>{
          const progress=crack.life>0.85?(1-crack.life)*6.7:1;
          if(i/crack.segs.length>progress)return;
          const midX=(seg.x1+seg.x2)/2;
          const isGlitch=midX>split;
          ctx.globalAlpha=crack.life*(isGlitch?0.75:0.55);
          ctx.beginPath();ctx.moveTo(seg.x1,seg.y1);ctx.lineTo(seg.x2,seg.y2);
          if(isGlitch){
            const r=Math.random()<0.5;
            ctx.strokeStyle=r?'#593F3F':'#858C74';
            ctx.lineWidth=0.9;ctx.shadowColor=r?'#593F3F':'#858C74';ctx.shadowBlur=5;
          }else{ctx.strokeStyle='rgba(120,100,70,0.85)';ctx.lineWidth=0.7;ctx.shadowBlur=0;}
          ctx.stroke();ctx.shadowBlur=0;
        });
      });
      ctx.globalAlpha=1;
      animId=requestAnimationFrame(draw);
    }
    draw();
    return()=>{cancelAnimationFrame(animId);clearInterval(spawnTimer);window.removeEventListener('resize',resize);};
  },[]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'absolute',
        inset:0,
        width:'100%',
        height:'100%',
        pointerEvents:'none',
        touchAction:'none',
        zIndex:0,
        ...style
      }}
    />
  );
}

// ── 대리석 텍스처 ─────────────────────────────────────────────────
function MarbleTexture() {
  return (
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.18}} preserveAspectRatio="none">
      <filter id="mf"><feTurbulence type="fractalNoise" baseFrequency="0.013 0.007" numOctaves="5" seed="4"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#mf)" fill="#5a4e40"/>
      <path d="M0,80 Q150,40 280,130 Q380,200 520,70 Q600,20 680,110" stroke="#7a6a58" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M60,180 Q200,110 320,190 Q440,270 580,150" stroke="#6a5a48" strokeWidth="0.6" fill="none" opacity="0.35"/>
    </svg>
  );
}

// ── 그룹 슬라이더 ─────────────────────────────────────────────────
function GroupSlider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const total = 3;
  const images = ['/group/group_02.jpg','/group/group_03.jpg','/group/group_01.jpg'];
  useEffect(()=>{
    if(isDragging)return;
    const t=setInterval(()=>setCurrent(p=>(p+1)%total),4000);
    return()=>clearInterval(t);
  },[isDragging]);
  function onMouseDown(e:React.MouseEvent){setIsDragging(true);setStartX(e.clientX);setDragOffset(0);}
  function onMouseMove(e:React.MouseEvent){if(!isDragging)return;setDragOffset(e.clientX-startX);}
  function onMouseUp(){if(!isDragging)return;if(dragOffset<-60)setCurrent(p=>(p+1)%total);if(dragOffset>60)setCurrent(p=>(p-1+total)%total);setIsDragging(false);setDragOffset(0);}
  function onTouchStart(e:React.TouchEvent){setIsDragging(true);setStartX(e.touches[0].clientX);setDragOffset(0);}
  function onTouchMove(e:React.TouchEvent){if(!isDragging)return;setDragOffset(e.touches[0].clientX-startX);}
  function onTouchEnd(){if(!isDragging)return;if(dragOffset<-60)setCurrent(p=>(p+1)%total);if(dragOffset>60)setCurrent(p=>(p-1+total)%total);setIsDragging(false);setDragOffset(0);}
  return (
    <div style={{position:'relative',width:'100%',aspectRatio:'16/9',cursor:isDragging?'grabbing':'grab',userSelect:'none'}}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div style={{display:'flex',width:'100%',height:'100%',transform:`translateX(calc(${-current*100}% + ${dragOffset}px))`,transition:isDragging?'none':'transform 0.7s cubic-bezier(0.4,0,0.2,1)'}}>
        {images.map((src,i)=>(
          <div key={i} style={{minWidth:'100%',height:'100%',position:'relative',overflow:'hidden'}}>
            <img src={src} alt={`RELIC group ${i+1}`} draggable={false} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block',filter:'brightness(0.82)',pointerEvents:'none'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#1a0e1044 0%,transparent 30%,transparent 70%,#1a0e10 100%)',pointerEvents:'none'}}/>
          </div>
        ))}
      </div>
      <div style={{position:'absolute',bottom:'1.2rem',left:'50%',transform:'translateX(-50%)',display:'flex',gap:8,zIndex:10}}>
        {images.map((_,i)=>(
          <div key={i} onClick={()=>setCurrent(i)} style={{width:i===current?24:6,height:6,borderRadius:3,background:i===current?'#D9CCC1':'#D9CCC144',cursor:'pointer',transition:'all 0.3s ease'}}/>
        ))}
      </div>
      <div onClick={()=>setCurrent(p=>(p-1+total)%total)} style={{position:'absolute',left:'1rem',top:'50%',transform:'translateY(-50%)',width:36,height:36,border:'0.5px solid #D9CCC144',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:10,background:'rgba(26,14,16,0.4)'}}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="#D9CCC1" strokeWidth="1" strokeLinecap="round"/></svg>
      </div>
      <div onClick={()=>setCurrent(p=>(p+1)%total)} style={{position:'absolute',right:'1rem',top:'50%',transform:'translateY(-50%)',width:36,height:36,border:'0.5px solid #D9CCC144',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:10,background:'rgba(26,14,16,0.4)'}}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="#D9CCC1" strokeWidth="1" strokeLinecap="round"/></svg>
      </div>
      <div style={{position:'absolute',bottom:'1.2rem',right:'1rem',fontSize:10,letterSpacing:'0.2em',color:'#D9CCC166',fontFamily:'monospace',zIndex:10}}>
        {String(current+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </div>
    </div>
  );
}

// ── 앨범 로우 ─────────────────────────────────────────────────────
function AlbumRow({c,idx}:{c:{num:string;name:string;ko:string;desc:string;date:string;bg:string;img:string;audio:string};idx:number}) {
  const audioRef=useRef<HTMLAudioElement>(null);
  const [playing,setPlaying]=useState(false);
  const [progress,setProgress]=useState(0);
  const [duration,setDuration]=useState(0);
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768);
    check();window.addEventListener('resize',check);return()=>window.removeEventListener('resize',check);
  },[]);
  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      const playPromise = a.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => {
            // 모바일 자동재생 차단 시 사용자 제스처로 재시도
            a.load();
            a.play().then(() => setPlaying(true)).catch(() => {});
          });
      }
    }
  }
  function onTimeUpdate(){const a=audioRef.current;if(!a)return;setProgress((a.currentTime/a.duration)*100);}
  function onLoadedMetadata(){const a=audioRef.current;if(!a)return;setDuration(a.duration);}
  function onEnded(){setPlaying(false);setProgress(0);}
  function seekTo(e:React.MouseEvent<HTMLDivElement>){const a=audioRef.current;if(!a)return;const rect=e.currentTarget.getBoundingClientRect();const ratio=(e.clientX-rect.left)/rect.width;a.currentTime=ratio*a.duration;setProgress(ratio*100);}
  function formatTime(sec:number){if(!sec||isNaN(sec))return'0:00';return`${Math.floor(sec/60)}:${Math.floor(sec%60).toString().padStart(2,'0')}`;}
  const isEven=idx%2===0;
  return (
    <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':isEven?'340px 1fr':'1fr 340px',gap:isMobile?24:40,alignItems:'center'}}>
      <div style={{order:isMobile?0:isEven?0:1}}>
        <div style={{aspectRatio:'1/1',overflow:'hidden',border:'0.5px solid #BFA39966',position:'relative'}}>
          <img src={c.img} alt={c.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.6s ease'}}
            onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')}
            onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}/>
          <div style={{position:'absolute',top:12,left:12,fontSize:9,letterSpacing:'0.2em',color:'rgba(255,255,255,0.5)',fontFamily:'monospace',background:'rgba(0,0,0,0.3)',padding:'2px 8px'}}>{c.num}</div>
        </div>
      </div>
      <div style={{order:isMobile?1:isEven?1:0}}>
        <div style={{fontSize:10,letterSpacing:'0.25em',color:'#8a7060',fontFamily:'monospace',marginBottom:'0.6rem'}}>{c.date}</div>
        <div style={{fontSize:isMobile?24:32,fontWeight:400,color:'#1a0e10',letterSpacing:'0.05em',lineHeight:1.1,marginBottom:'0.4rem'}}>{c.name}</div>
        <div style={{fontSize:12,color:'#8a7060',letterSpacing:'0.15em',marginBottom:'1rem'}}>{c.ko}</div>
        <div style={{width:40,height:'0.5px',background:'#BFA399',marginBottom:'1.2rem'}}/>
        <div style={{fontSize:13,color:'#5a4a3a',lineHeight:1.9,marginBottom:'2rem'}}>{c.desc}</div>
        <div style={{background:'rgba(64,40,44,0.08)',border:'0.5px solid #BFA39966',padding:'1.2rem 1.4rem'}}>
          <audio ref={audioRef} src={c.audio} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={onEnded}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.8rem'}}>
            <div>
              <div style={{fontSize:12,fontWeight:500,color:'#1a0e10',letterSpacing:'0.05em'}}>{c.name}</div>
              <div style={{fontSize:10,color:'#8a7060',letterSpacing:'0.1em',fontFamily:'monospace',marginTop:2}}>TITLE TRACK</div>
            </div>
            <button
              onClick={togglePlay}
              style={{
                width:42, height:42, borderRadius:'50%',
                border:'0.5px solid #40282C',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', flexShrink:0,
                background: playing ? '#40282C' : 'transparent',
                transition:'background 0.2s',
                WebkitTapHighlightColor:'transparent',
                touchAction:'manipulation',
              }}>
              {playing
                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="3.5" height="10" fill="#D9CCC1"/><rect x="8.5" y="2" width="3.5" height="10" fill="#D9CCC1"/></svg>
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2L12 7L3 12V2Z" fill="#40282C"/></svg>}
            </button>
          </div>
          <div onClick={seekTo} style={{width:'100%',height:2,background:'#BFA39944',cursor:'pointer',position:'relative',marginBottom:'0.5rem'}}>
            <div style={{width:`${progress}%`,height:'100%',background:'#40282C',transition:'width 0.1s linear'}}/>
            <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',left:`${progress}%`,width:8,height:8,borderRadius:'50%',background:'#40282C',marginLeft:-4}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#8a7060',fontFamily:'monospace'}}>
            <span>{formatTime(audioRef.current?.currentTime||0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selected,setSelected]=useState<number|null>(null);
  const [scrolled,setScrolled]=useState(false);
  const [isMobile,setIsMobile]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40);
    const onResize=()=>setIsMobile(window.innerWidth<768);
    onResize();
    window.addEventListener('scroll',onScroll);
    window.addEventListener('resize',onResize);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onResize);};
  },[]);

  return (
    <main style={{background:'#D9CCC1',minHeight:'100vh',color:'#40282C',fontFamily:"'DM Sans','Space Grotesk',sans-serif",overflowX:'hidden'}}>

      {/* ── NAV ── */}
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.5rem',borderBottom:'0.5px solid #BFA39944',position:'sticky',top:0,zIndex:100,background:scrolled?'rgba(217,204,193,0.95)':'rgba(217,204,193,0.6)',backdropFilter:'blur(12px)',transition:'all 0.4s ease'}}>
        <div>
          <div style={{fontSize:18,fontWeight:400,letterSpacing:'0.3em',color:'#40282C'}}>RELIC</div>
          <div style={{fontSize:8,letterSpacing:'0.15em',color:'#9f898c',marginTop:2}}>5-MEMBER BOY GROUP · ONE LABEL · 2026</div>
        </div>

        {/* 데스크탑 메뉴 */}
        {!isMobile && (
          <div style={{display:'flex',gap:'1.5rem',fontSize:12,color:'#BFA399',letterSpacing:'0.12em'}}>
            {['CONCEPT','MEMBERS','COLLECTION','UNIVERSE'].map(n=>(
              <a key={n} href={`#${n.toLowerCase()}`} style={{color:'inherit',textDecoration:'none'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#40282C')}
                onMouseLeave={e=>(e.currentTarget.style.color='#BFA399')}>{n}</a>
            ))}
          </div>
        )}

        {/* 모바일 햄버거 */}
        {isMobile && (
          <div onClick={()=>setMenuOpen(!menuOpen)} style={{cursor:'pointer',display:'flex',flexDirection:'column',gap:5,padding:'4px'}}>
            <div style={{width:22,height:1,background:'#40282C',transition:'all 0.3s',transform:menuOpen?'rotate(45deg) translate(4px,4px)':'none'}}/>
            <div style={{width:22,height:1,background:'#40282C',transition:'all 0.3s',opacity:menuOpen?0:1}}/>
            <div style={{width:22,height:1,background:'#40282C',transition:'all 0.3s',transform:menuOpen?'rotate(-45deg) translate(4px,-4px)':'none'}}/>
          </div>
        )}
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobile && menuOpen && (
        <div style={{position:'fixed',top:60,left:0,right:0,background:'rgba(217,204,193,0.98)',backdropFilter:'blur(12px)',zIndex:99,borderBottom:'0.5px solid #BFA39944',padding:'1rem 0'}}>
          {['CONCEPT','MEMBERS','COLLECTION','UNIVERSE'].map(n=>(
            <a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenuOpen(false)}
              style={{display:'block',padding:'0.8rem 1.5rem',fontSize:13,color:'#40282C',textDecoration:'none',letterSpacing:'0.15em',borderBottom:'0.5px solid #BFA39922'}}>{n}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'#D9CCC1'}}><MarbleTexture/></div>
        <div style={{position:'absolute',top:0,right:0,bottom:0,width:isMobile?'40%':'45%',background:'#40282C'}}/>
        <div style={{position:'absolute',left:isMobile?'60%':'55%',top:0,bottom:0,width:2,background:'linear-gradient(180deg,transparent,#858C74,#593F3F,#858C74,transparent)',zIndex:3,opacity:0.9}}/>
        {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}

        <div style={{position:'relative',zIndex:4,width:'100%',display:'flex',alignItems:'center',padding:isMobile?'0 1rem':'0 2rem'}}>
          {/* 왼쪽 */}
          <div style={{flex:1,paddingLeft:isMobile?'1rem':'4vw'}}>
            <div style={{fontSize:isMobile?9:11,letterSpacing:'0.4em',color:'#40282C',marginBottom:'1rem'}}>— 5인조 남성 그룹 · 2026 —</div>
            <div style={{fontSize:isMobile?'clamp(48px,14vw,72px)':'clamp(72px,10vw,130px)',fontWeight:400,color:'#40282C',letterSpacing:'0.12em',lineHeight:1}}>RE</div>
            <div style={{fontSize:isMobile?10:13,letterSpacing:'0.3em',color:'#9f898c',marginTop:'0.8rem'}}>FIRST CONTACT</div>
            <div style={{marginTop:'1.5rem',display:'flex',gap:6,flexWrap:'wrap'}}>
              {['우리','건','하루','솔','리엘'].map(t=>(
                <span key={t} style={{fontSize:9,padding:'3px 10px',border:'0.5px solid #9f898c',borderRadius:1,color:'#9f898c',letterSpacing:'0.1em'}}>{t}</span>
              ))}
            </div>
          </div>

          {/* 오른쪽 */}
          <div style={{flex:1,paddingRight:isMobile?'1rem':'4vw',textAlign:'right'}}>
            <div style={{fontSize:isMobile?8:11,letterSpacing:'0.3em',color:'#c9a87a44',fontFamily:'monospace',marginBottom:'1rem'}}>ERR_404 · SIGNAL_LOST</div>
            <div style={{fontSize:isMobile?'clamp(48px,14vw,72px)':'clamp(72px,10vw,130px)',fontWeight:700,color:'#D9CCC1',letterSpacing:'0.08em',lineHeight:1,fontFamily:'monospace',textShadow:'3px 0 #593F3F99,-3px 0 #858C7455'}}>LIC</div>
            <div style={{fontSize:isMobile?9:13,letterSpacing:'0.2em',color:'#c9a87a66',fontFamily:'monospace',marginTop:'0.8rem'}}>ONE LABEL · DEBUT 2026</div>
            {!isMobile && (
              <div style={{marginTop:'2rem'}}>
                <span style={{fontSize:10,padding:'5px 16px',border:'0.5px solid #c9a87a44',borderRadius:1,color:'#c9a87a88',fontFamily:'monospace',letterSpacing:'0.15em'}}>VOID PROTOCOL · OUT NOW</span>
              </div>
            )}
          </div>
        </div>

        <div style={{position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',zIndex:4,fontSize:10,letterSpacing:'0.3em',color:'#BFA399',fontFamily:'monospace'}}>SCROLL ↓</div>
      </section>

      {/* ── GROUP SLIDER ── */}
      <section style={{position:'relative',overflow:'hidden',background:'#1a0e10'}}>
        <GroupSlider/>
      </section>

      {/* ── CONCEPT ── */}
      <section id="concept" style={{position:'relative',overflow:'hidden',background:'#2e1a1d'}}>
      {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}
        <div style={{position:'relative',zIndex:2,maxWidth:900,margin:'0 auto',padding:isMobile?'3rem 1.2rem':'5rem 2rem'}}>
          <div style={{fontSize:10,letterSpacing:'0.35em',color:'#BFA399',marginBottom:'1.2rem'}}>ABOUT</div>
          <h2 style={{fontSize:isMobile?22:28,fontWeight:400,marginBottom:'1rem',letterSpacing:'0.05em',color:'#D9CCC1'}}>다섯 개의 파장, 하나의 신호</h2>
          <p style={{fontSize:13,color:'#BFA399',lineHeight:2,maxWidth:560,marginBottom:'3rem'}}>
            RELIC은 ONE Label 소속 5인조 남성 그룹이다.<br/>
            우리, 건, 하루, 솔, 리엘 —<br/>
            5명은 각자의 언어로 지금 이 시대를 기록한다.
          </p>
          <div style={{display:'grid',gridTemplateColumns:isMobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:1}}>
            {[{num:'01',title:'퍼포먼스',desc:'무대 위에서 완성되는 5개의 파장.'},{num:'02',title:'세계관',desc:'미래 문명이 남긴 유물의 발견자들.'},{num:'03',title:'음악',desc:'장르를 해체하고 재조립한다.'},{num:'04',title:'아이덴티티',desc:'5가지 소재, 하나의 그룹.'}].map(c=>(
              <div key={c.num} style={{padding:'1.2rem',background:'rgba(232,226,217,0.7)',border:'0.5px solid #593F3F66'}}>
                <div style={{fontSize:10,letterSpacing:'0.2em',color:'#40282C',marginBottom:'0.5rem',fontFamily:'monospace'}}>{c.num}</div>
                <div style={{fontSize:13,fontWeight:400,marginBottom:'0.3rem'}}>{c.title}</div>
                <div style={{fontSize:12,color:'#7b6b6e',lineHeight:1.7}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERS ── */}
      <section id="members" style={{position:'relative',background:'#40282C',overflow:'hidden'}}>
        {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}
        <div style={{position:'relative',zIndex:10,maxWidth:960,margin:'0 auto',padding:isMobile?'3rem 1.2rem':'5rem 2rem'}}>
          <div style={{fontSize:10,letterSpacing:'0.35em',color:'#BFA399',marginBottom:'0.5rem',fontFamily:'monospace'}}>MEMBERS</div>
          <div style={{fontSize:11,color:'#BFA399',letterSpacing:'0.1em',marginBottom:'2rem'}}>WOORI · GEON · HARU · SOL · RIEL</div>

          {/* 멤버 카드 — 모바일 2열 / 데스크탑 5열 */}
          <div style={{display:'grid',gridTemplateColumns:isMobile?'repeat(2,1fr)':'repeat(5,1fr)',gap:6,marginBottom:10}}>
            {members.map(m=>(
              <div key={m.id}
              onClick={() => setSelected(selected===m.id ? null : m.id)}
              style={{
                border: selected===m.id ? `1px solid ${m.color}` : '0.5px solid #593F3F44',
                borderRadius:2, overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s',
                position:'relative', zIndex:10,
                touchAction:'manipulation',
                WebkitTapHighlightColor:'transparent',
              }}>
                <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden',background:m.bg}}>
                  <img src={m.img} alt={m.nameKo} draggable={false}
                    style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block',filter:'brightness(0.88)',transition:'transform 0.4s ease,filter 0.4s ease'}}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.88)';
                    }}
                    onTouchStart={e => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)';
                    }}
                    onTouchEnd={e => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.88)';
                    }}/>
                  <div style={{position:'absolute',top:6,right:6,fontSize:8,padding:'2px 5px',border:`0.5px solid ${m.color}88`,color:m.color,letterSpacing:'0.06em',fontFamily:'monospace',background:'rgba(0,0,0,0.3)'}}>{m.material}</div>
                  <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem 0.6rem 0.5rem',background:'linear-gradient(transparent,rgba(0,0,0,0.5))'}}>
                    <div style={{fontSize:8,color:'rgba(255,255,255,0.5)',letterSpacing:'0.04em'}}>{m.pos}</div>
                  </div>
                </div>
                <div style={{padding:'0.5rem 0.6rem',background:'#2e1a1d'}}>
                  <div style={{fontSize:12,color:'#f0ede8'}}>{m.nameKo}</div>
                  <div style={{fontSize:9,color:'#BFA399',letterSpacing:'0.1em',marginTop:2,fontFamily:'monospace'}}>{m.nameEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 멤버 상세 — 모바일 1열 / 데스크탑 3열 */}
          {selected!==null&&(()=>{
            const m=members[selected];
            return (
              <div style={{border:'0.5px solid #593F3F44',borderRadius:2,background:'#2e1a1d',display:'grid',gridTemplateColumns:isMobile?'1fr':isMobile?'1fr':'280px 1fr 1.6fr',overflow:'hidden'}}>
                {/* 사진 */}
                <div style={{position:'relative',overflow:'hidden',minHeight:isMobile?240:0}}>
                  <img src={m.imgDetail} alt={m.nameKo} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block',filter:'brightness(0.85)'}}/>
                  <div style={{position:'absolute',inset:0,background:isMobile?'linear-gradient(transparent 50%,#2e1a1d)':'linear-gradient(to right,transparent 60%,#2e1a1d)'}}/>
                  <div style={{position:'absolute',bottom:'1rem',left:'1rem'}}>
                    <div style={{fontSize:20,fontWeight:500,color:'#f5f0ea',letterSpacing:'0.05em'}}>{m.nameKo}</div>
                    <div style={{fontSize:10,color:m.color,letterSpacing:'0.2em',fontFamily:'monospace',marginTop:2}}>{m.nameEn}</div>
                  </div>
                </div>
                {/* 기본 정보 */}
                <div style={{
                  padding:'1.5rem',
                  borderRight:isMobile?'none':'0.5px solid #593F3F44',
                  borderBottom:isMobile?'0.5px solid #593F3F44':'none',
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  gap:'1rem',
                }}>
                  <div>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.4rem'}}>POSITION</div>
                    <div style={{fontSize:13,color:'#BFA399'}}>{m.pos}</div>
                  </div>
                  <div>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.4rem'}}>MATERIAL</div>
                    <div style={{padding:'4px 10px',border:`0.5px solid ${m.color}55`,display:'inline-block',fontSize:11,color:m.color,letterSpacing:'0.1em',fontFamily:'monospace'}}>{m.material} · {m.matKo}</div>
                  </div>
                  <div>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.4rem'}}>SYMBOL</div>
                    <div style={{fontSize:12,color:'#593F3F88',fontStyle:'italic'}}>"{m.symbol}"</div>
                  </div>
                  <div>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.6rem'}}>KEYWORDS</div>
                    <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                      {m.keywords.map(k=>(
                        <span key={k} style={{fontSize:10,padding:'3px 8px',border:'0.5px solid #593F3F44',color:'#BFA399',fontFamily:'monospace'}}>{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 설명 */}
                <div style={{
                  padding:'1.5rem',
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  gap:'1.2rem',
                }}>
                  <div>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.5rem'}}>PERSONALITY</div>
                    <div style={{fontSize:13,color:'#8c8680',lineHeight:1.8}}>{m.trait}</div>
                  </div>
                  <div style={{padding:'1rem',background:'#40282C',border:'0.5px solid #593F3F44'}}>
                    <div style={{fontSize:10,letterSpacing:'0.15em',color:'#BFA39966',fontFamily:'monospace',marginBottom:'0.4rem'}}>TRIVIA</div>
                    <div style={{fontSize:12,color:'#BFA399',lineHeight:1.7}}>{m.trivia}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section id="collection" style={{position:'relative',background:'#D9CCC1',overflow:'hidden'}}>
        <MarbleTexture/>
        {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}
        <div style={{position:'relative',zIndex:2,maxWidth:960,margin:'0 auto',padding:isMobile?'3rem 1.2rem':'5rem 2rem'}}>
          <div style={{fontSize:10,letterSpacing:'0.35em',color:'#8a7060',marginBottom:'0.4rem'}}>COLLECTION</div>
          <div style={{fontSize:11,color:'#8a7060',letterSpacing:'0.1em',marginBottom:'3rem'}}>DISCOGRAPHY — 3 RELEASES</div>
          <div style={{display:'flex',flexDirection:'column',gap:isMobile?32:48}}>
            {collections.map((c,idx)=><AlbumRow key={c.num} c={c} idx={idx}/>)}
          </div>
        </div>
      </section>

      {/* ── UNIVERSE ── */}
      <section id="universe" style={{position:'relative',background:'#40282C',overflow:'hidden'}}>
      {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}
        <div style={{position:'relative',zIndex:2,maxWidth:900,margin:'0 auto',padding:isMobile?'3rem 1.2rem':'5rem 2rem'}}>
          <div style={{fontSize:10,letterSpacing:'0.35em',color:'#BFA399',fontFamily:'monospace',marginBottom:'2rem'}}>UNIVERSE</div>
          {[
            {chap:'CHAPTER 00',title:'발견 — Discovery',text:'2026년, RELIC이 세상에 신호를 보낸다. 5개의 좌표, 5명의 아티스트. 이것이 첫 번째 접촉이다.'},
            {chap:'CHAPTER 01',title:'VOID PROTOCOL',text:'존재가 무효화되기 직전의 순간. RELIC의 데뷔 미니앨범. 5인이 처음으로 하나의 소리를 낸다.'},
            {chap:'CHAPTER 02',title:'ERRR : 侵',text:'오류처럼 일상에 침투한다. 두 번째 미니앨범. 팬덤 ARCHIVE와 함께 현실의 경계를 허문다.'},
            {chap:'CHAPTER 03',title:'SPECIMEN∞',text:'분류 불가능한 존재로 진화한다. 첫 번째 정규앨범. RELIC의 세계가 완성된다.'},
          ].map((w,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:isMobile?'80px 1fr':'130px 1fr',borderTop:'0.5px solid #755d61',padding:'1.2rem 0'}}>
              <div style={{fontSize:isMobile?9:11,letterSpacing:'0. 1em',color:'#755d61',fontFamily:'monospace',paddingTop:2}}>{w.chap}</div>
              <div>
                <div style={{fontSize:isMobile?13:15,fontWeight:400,marginBottom:'0.4rem',color:'#D9CCC1'}}>{w.title}</div>
                <div style={{fontSize:12,color:'#BFA399',lineHeight:1.9}}>{w.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FANDOM ── */}
      <section style={{position:'relative',overflow:'hidden',background:'#D9CCC1'}}>
        <MarbleTexture/>
        {!isMobile && <CrackCanvas style={{zIndex:0, pointerEvents:'none'}}/>}
        <div style={{position:'relative',zIndex:2,maxWidth:900,margin:'0 auto',padding:isMobile?'3rem 1.2rem':'5rem 2rem'}}>
          <div style={{padding:'2rem',border:'0.5px solid #BFA399',background:'rgba(232,226,217,0.5)',backdropFilter:'blur(8px)'}}>
            <div style={{fontSize:10,letterSpacing:'0.3em',color:'#BFA399',marginBottom:'0.8rem'}}>FANDOM</div>
            <div style={{fontSize:isMobile?16:20,marginBottom:'0.6rem',color:'#40282C'}}>ARCHIVE — 아카이브</div>
            <div style={{fontSize:13,color:'#5a4a3a',lineHeight:2}}>
              RELIC의 모든 순간을 수집하고 기록하는 자들.<br/>
              그들이 있기에 RELIC의 세계는 완성된다.<br/>
              <span style={{color:'#bba08f',letterSpacing:'0.1em'}}>WELCOME TO THE ARCHIVE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{position:'relative',padding:'1.5rem',borderTop:'0.5px solid #593F3F44',background:'#40282C',display:'flex',flexDirection:isMobile?'column':'row',justifyContent:'space-between',fontSize:10,color:'#755d61',letterSpacing:'0.08em',gap:'0.4rem',fontFamily:'monospace'}}>
        <div>© 2025 RELIC · ONE LABEL · JYP ENTERTAINMENT</div>
        <div>PORTFOLIO — ONE LABEL PRODUCTION</div>
      </footer>

    </main>
  );
}