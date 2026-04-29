'use client';
import { useState, useEffect, useRef } from 'react';

const members = [
  {
    id: 0, nameKo: '우리', nameEn: 'WOORI', pos: '리더 · 메인래퍼',
    material: 'WOOD', matKo: '나무', symbol: '나무 = 기억',
    bg: '#2a1f14', color: '#c9a87a',
    trait: '안경을 쓰고 항상 책을 들고 있다. 말이 적지만 한 마디 한 마디가 무겁다. 팀의 철학적 방향을 잡는 지성파 리더.',
    trivia: '나무의 나이테처럼 모든 경험이 몸에 새겨진다고 믿음. 쉬는 날엔 혼자 목공소 견학.',
    keywords: ['지성파', '인문학', '묵직함', '리더십', '서재'],
  },
  {
    id: 1, nameKo: '건', nameEn: 'GEON', pos: '메인댄서',
    material: 'METAL', matKo: '금속', symbol: '금속 = 의지',
    bg: '#141c24', color: '#8ab0c9',
    trait: '차와 바이크를 좋아한다. 기계 구조에 대한 이해가 깊어 무대 메커니즘도 직접 분석.',
    trivia: '연습실에 미니 공구함 보유. 키링 디자인은 본인이 직접 CAD 스케치 참여.',
    keywords: ['정밀함', '기계공학', '단단함', '퍼포먼스', '속도'],
  },
  {
    id: 2, nameKo: '하루', nameEn: 'HARU', pos: '메인보컬',
    material: 'GLASS', matKo: '유리', symbol: '유리 = 투명성',
    bg: '#0d1e26', color: '#7abcca',
    trait: '공예를 좋아하고 유리 공방을 자주 찾는다. 감정이 유리처럼 투명하게 드러나는 타입.',
    trivia: '선글라스 컬렉터. 황금시간대에 산책 필수.',
    keywords: ['투명함', '섬세함', '보컬', '빛', '감성'],
  },
  {
    id: 3, nameKo: '솔', nameEn: 'SOL', pos: '메인래퍼',
    material: 'CERAMIC', matKo: '도자', symbol: '도자 = 시간',
    bg: '#1e1208', color: '#c99e70',
    trait: '평소엔 멘헤라 기질. 래핑 시작하면 눈빛이 완전히 달라진다. 공구에 집착적 애착.',
    trivia: '공구 100개 이상 보유. 도자기 굽는 영상 ASMR이 팬들 사이 인기.',
    keywords: ['이중성', '집착', '도구', '변화', '불꽃'],
  },
  {
    id: 4, nameKo: '리엘', nameEn: 'RIEL', pos: '막내 · 서브댄서',
    material: 'TEXTILE', matKo: '섬유', symbol: '섬유 = 연결',
    bg: '#160e20', color: '#a888c9',
    trait: '팀 내 가장 귀엽고 막내다운 외모. 재봉과 섬유 공예에 대한 전문성은 팀 최고.',
    trivia: '재봉틀 3대 보유. 자수로 팬 편지 답장.',
    keywords: ['연결', '귀여움', '섬세한손길', '직물', '따뜻함'],
  },
];

const collections = [
  { num: 'COLLECTION 01', name: 'FIRST CONTACT', ko: '첫 번째 접촉', desc: '미지의 문명에서 발견된 5개의 유물.', date: '1ST MINI · 2025.04', bg: '#1c1510' },
  { num: 'COLLECTION 02', name: 'DOMESTIC ALIENS', ko: '일상의 외계인', desc: '유물이 일상에 침투한다.', date: '2ND MINI · 2025.10', bg: '#0f1820' },
  { num: 'COLLECTION 03', name: 'GRAVITY OBJECTS', ko: '중력 오브제', desc: '중력이 다른 행성의 공예.', date: '1ST FULL · 2026', bg: '#141a0f' },
];

// ── 균열 캔버스 컴포넌트 ──────────────────────────────────────────
function CrackCanvas({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let cracks: { segs: { x1:number;y1:number;x2:number;y2:number }[]; life: number; decay: number }[] = [];

    let W = 0;
    let H = 0;
    let split = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      split = W * 0.55;
    }
    resize();
    window.addEventListener('resize', resize);

    function makeCrack(sx: number, sy: number, angle: number, depth: number) {
      const segs: { x1:number;y1:number;x2:number;y2:number }[] = [];
      let x = sx, y = sy, a = angle;
      for (let i = 0; i < depth; i++) {
        a += (Math.random() - 0.5) * 0.7;
        const len = 10 + Math.random() * 22;
        const nx = x + Math.cos(a) * len;
        const ny = y + Math.sin(a) * len;
        segs.push({ x1: x, y1: y, x2: nx, y2: ny });
        x = nx; y = ny;
        if (Math.random() < 0.35 && i < depth - 2) {
          const ba = a + (Math.random() - 0.5) * 1.4;
          const bl = 6 + Math.random() * 14;
          segs.push({ x1: x, y1: y, x2: x + Math.cos(ba) * bl, y2: y + Math.sin(ba) * bl });
        }
      }
      return segs;
    }

    function spawnCrack() {
      if (!canvas) return;
      const W = canvas.width;
      const H = canvas.height;
      const sx = Math.random() * W * 0.9;
      const sy = Math.random() * H;
      const segs = makeCrack(sx, sy, Math.random() * Math.PI * 2, 7 + Math.floor(Math.random() * 9));
      cracks.push({ segs, life: 1.0, decay: 0.0025 + Math.random() * 0.004 });
      if (cracks.length > 16) cracks.shift();
    }

    spawnCrack(); spawnCrack(); spawnCrack(); spawnCrack();
    const spawnTimer = setInterval(spawnCrack, 1000);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      cracks.forEach(crack => {
        crack.life -= crack.decay;
        if (crack.life < 0) return;
        crack.segs.forEach((seg, i) => {
          const progress = crack.life > 0.85 ? (1 - crack.life) * 6.7 : 1;
          if (i / crack.segs.length > progress) return;
          const midX = (seg.x1 + seg.x2) / 2;
          const isGlitch = midX > split;
          ctx.globalAlpha = crack.life * (isGlitch ? 0.75 : 0.55);
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          if (isGlitch) {
            const r = Math.random() < 0.5;
            ctx.strokeStyle = r ? '#ff003c' : '#00ffcc';
            ctx.lineWidth = 0.9;
            ctx.shadowColor = r ? '#ff003c' : '#00ffcc';
            ctx.shadowBlur = 5;
          } else {
            ctx.strokeStyle = 'rgba(120,100,70,0.85)';
            ctx.lineWidth = 0.7;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  );
}

// ── 대리석 SVG 텍스처 ──────────────────────────────────────────────
function MarbleTexture() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} preserveAspectRatio="none">
      <filter id="mf">
        <feTurbulence type="fractalNoise" baseFrequency="0.013 0.007" numOctaves="5" seed="4" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#mf)" fill="#5a4e40" />
      <path d="M0,80 Q150,40 280,130 Q380,200 520,70 Q600,20 680,110" stroke="#7a6a58" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M60,180 Q200,110 320,190 Q440,270 580,150" stroke="#6a5a48" strokeWidth="0.6" fill="none" opacity="0.35" />
      <path d="M100,30 Q240,90 360,50 Q480,10 620,90" stroke="#9a8a78" strokeWidth="0.7" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main style={{ background: '#e8e2d9', minHeight: '100vh', color: '#2a1f14', fontFamily: "'DM Sans', 'Space Grotesk', sans-serif", overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: `0.5px solid ${scrolled ? '#8c7c6a44' : 'transparent'}`,
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(232,226,217,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '0.3em', color: '#2a1f14' }}>RELIC</div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#8c7c6a', marginTop: 2 }}>FUTURE RELICS FOR EVERYDAY LIFE</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: 12, color: '#6b5a48', letterSpacing: '0.12em' }}>
          {['CONCEPT', 'MEMBERS', 'COLLECTION', 'UNIVERSE'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2a1f14')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b5a48')}>{n}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* 왼쪽 대리석 */}
        <div style={{ position: 'absolute', inset: 0, background: '#e8e2d9' }}>
          <MarbleTexture />
        </div>

        {/* 오른쪽 블랙 */}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '45%', background: '#0c0a08' }} />

        {/* 경계선 */}
        <div style={{
          position: 'absolute', left: '55%', top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(180deg,transparent,#c9a87a,#ff003c,#c9a87a,transparent)',
          zIndex: 3, opacity: 0.9,
        }} />

        {/* 균열 캔버스 */}
        <CrackCanvas style={{ zIndex: 2 }} />

        {/* 콘텐츠 */}
        <div style={{ position: 'relative', zIndex: 4, width: '100%', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>

          {/* 왼쪽 텍스트 (대리석) */}
          <div style={{ flex: 1, paddingLeft: '4vw' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.5em', color: '#8c7c6a', marginBottom: '1.2rem' }}>— ONE LABEL · 2025 DEBUT —</div>
            <div style={{ fontSize: 'clamp(72px,10vw,130px)', fontWeight: 400, color: '#2a1f14', letterSpacing: '0.12em', lineHeight: 1 }}>RE</div>
            <div style={{ fontSize: 13, letterSpacing: '0.3em', color: '#8c7c6a', marginTop: '1rem' }}>FIRST CONTACT</div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['WOOD', 'METAL', 'GLASS', 'CERAMIC', 'TEXTILE'].map(t => (
                <span key={t} style={{ fontSize: 10, padding: '4px 12px', border: '0.5px solid #8c7c6a66', borderRadius: 1, color: '#6b5a48', letterSpacing: '0.15em' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 오른쪽 텍스트 (글리치) */}
          <div style={{ flex: 1, paddingRight: '4vw', textAlign: 'right' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.4em', color: '#c9a87a44', fontFamily: 'monospace', marginBottom: '1.2rem' }}>ERR_404 · SIGNAL_LOST</div>
            <div style={{
              fontSize: 'clamp(72px,10vw,130px)', fontWeight: 700, color: '#f5f0e8',
              letterSpacing: '0.08em', lineHeight: 1, fontFamily: 'monospace',
              textShadow: '3px 0 #ff003c99, -3px 0 #00ffcc55',
            }}>LIC</div>
            <div style={{ fontSize: 13, letterSpacing: '0.25em', color: '#c9a87a66', fontFamily: 'monospace', marginTop: '1rem' }}>공예돌 · 5인조</div>
            <div style={{ marginTop: '2rem' }}>
              <span style={{ fontSize: 10, padding: '5px 16px', border: '0.5px solid #c9a87a44', borderRadius: 1, color: '#c9a87a88', fontFamily: 'monospace', letterSpacing: '0.15em' }}>SPECIMEN_001 · CLASSIFIED</span>
            </div>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 4, fontSize: 10, letterSpacing: '0.3em', color: '#8c7c6a', fontFamily: 'monospace' }}>
          SCROLL ↓
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section id="concept" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* 왼쪽 절반 대리석, 오른쪽 다크 */}
        <div style={{ position: 'absolute', inset: 0, background: '#e0d9ce' }}><MarbleTexture /></div>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: '#110f0d' }} />
        <CrackCanvas style={{ zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.35em', color: '#8c7c6a', marginBottom: '1.2rem' }}>BRAND CONCEPT</div>
          <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: '1rem', letterSpacing: '0.05em', color: '#2a1f14' }}>미래의 유물을 지금 만든다</h2>
          <p style={{ fontSize: 14, color: '#5a4a3a', lineHeight: 2, maxWidth: 560, marginBottom: '3rem' }}>
            과거의 도자기, 목공예, 금속공예는 모두 그 시대의 생활용품이었다.<br />
            시간이 지나 그것들은 "전통"이 되었다.<br />
            RELIC의 질문 — 그렇다면 지금 우리의 생활용품은?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 1 }}>
            {[
              { num: '01', title: '전통은 만들어지는 것', desc: '보존이 아닌 창조.' },
              { num: '02', title: '쓰임이 있는 예술', desc: '전시장이 아닌 일상으로.' },
              { num: '03', title: 'AI × 공예', desc: 'AI는 전통 생성 엔진이다.' },
              { num: '04', title: '가상 작가 시스템', desc: '작가는 없다. 작품은 있다.' },
            ].map(c => (
              <div key={c.num} style={{ padding: '1.5rem', background: 'rgba(232,226,217,0.7)', border: '0.5px solid #8c7c6a33', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#c9a87a', marginBottom: '0.6rem', fontFamily: 'monospace' }}>{c.num}</div>
                <div style={{ fontSize: 13, fontWeight: 400, marginBottom: '0.4rem' }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#6b5a48', lineHeight: 1.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERS ── */}
      <section id="members" style={{ position: 'relative', background: '#0c0a08', overflow: 'hidden' }}>
        <CrackCanvas />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.35em', color: '#6b5a48', marginBottom: '0.5rem', fontFamily: 'monospace' }}>MEMBERS</div>
          <div style={{ fontSize: 11, color: '#4a3a2a', letterSpacing: '0.1em', marginBottom: '2rem' }}>5 MATERIALS · 5 WAVELENGTHS</div>

          {/* 멤버 카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, marginBottom: 10 }}>
            {members.map(m => (
              <div key={m.id}
                onClick={() => setSelected(selected === m.id ? null : m.id)}
                style={{
                  border: selected === m.id ? `1px solid ${m.color}` : '0.5px solid #2a2520',
                  borderRadius: 2, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s',
                }}>
                <div style={{ background: m.bg, aspectRatio: '2/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, padding: '2px 6px', border: `0.5px solid ${m.color}44`, color: m.color, letterSpacing: '0.08em', fontFamily: 'monospace' }}>{m.material}</div>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', border: `1px solid ${m.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: m.color }}>{m.nameEn.slice(0, 2)}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{m.pos}</div>
                </div>
                <div style={{ padding: '0.6rem 0.7rem', background: '#110f0d' }}>
                  <div style={{ fontSize: 13, color: '#f0ede8' }}>{m.nameKo}</div>
                  <div style={{ fontSize: 10, color: '#4a3a2a', letterSpacing: '0.12em', marginTop: 2, fontFamily: 'monospace' }}>{m.nameEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 멤버 상세 */}
          {selected !== null && (() => {
            const m = members[selected];
            return (
              <div style={{ border: '0.5px solid #2a2520', borderRadius: 2, background: '#110f0d', display: 'grid', gridTemplateColumns: '1fr 1.8fr', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderRight: '0.5px solid #2a2520' }}>
                  <div style={{ fontSize: 26, fontWeight: 400, color: m.color, marginBottom: 3 }}>{m.nameKo}</div>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#4a3a2a', fontFamily: 'monospace', marginBottom: '1rem' }}>{m.nameEn}</div>
                  <div style={{ fontSize: 12, color: '#6b5a48', marginBottom: '0.3rem' }}>{m.pos}</div>
                  <div style={{ marginTop: '1rem', padding: '4px 12px', border: `0.5px solid ${m.color}55`, display: 'inline-block', fontSize: 11, color: m.color, letterSpacing: '0.1em', fontFamily: 'monospace' }}>{m.material} · {m.matKo}</div>
                  <div style={{ marginTop: '0.8rem', fontSize: 11, color: '#3a3028', fontStyle: 'italic' }}>"{m.symbol}"</div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#4a3a2a', fontFamily: 'monospace', marginBottom: '0.5rem' }}>CHARACTER</div>
                    <div style={{ fontSize: 13, color: '#8c8680', lineHeight: 1.8 }}>{m.trait}</div>
                  </div>
                  <div style={{ padding: '0.8rem', background: '#0c0a08', border: '0.5px solid #2a2520', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#4a3a2a', fontFamily: 'monospace', marginBottom: '0.4rem' }}>TRIVIA</div>
                    <div style={{ fontSize: 12, color: '#6b5a48', lineHeight: 1.7 }}>{m.trivia}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {m.keywords.map(k => (
                      <span key={k} style={{ fontSize: 10, padding: '3px 9px', border: '0.5px solid #2a2520', color: '#4a3a2a', fontFamily: 'monospace' }}>{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section id="collection" style={{ position: 'relative', background: '#ede8e0', overflow: 'hidden' }}>
        <MarbleTexture />
        <CrackCanvas style={{ zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.35em', color: '#8c7c6a', marginBottom: '2rem' }}>COLLECTION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
            {collections.map(c => (
              <div key={c.num} style={{ border: '0.5px solid #8c7c6a44', borderRadius: 2, overflow: 'hidden', background: 'rgba(232,226,217,0.6)', backdropFilter: 'blur(4px)' }}>
                <div style={{ background: c.bg, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>{c.num}</div>
                  <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontFamily: 'Georgia,serif' }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{c.ko}</div>
                </div>
                <div style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#6b5a48', lineHeight: 1.6, marginBottom: 8 }}>{c.desc}</div>
                  <div style={{ fontSize: 10, color: '#8c7c6a', letterSpacing: '0.1em', fontFamily: 'monospace' }}>{c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIVERSE ── */}
      <section id="universe" style={{ position: 'relative', background: '#0c0a08', overflow: 'hidden' }}>
        <CrackCanvas />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.35em', color: '#6b5a48', fontFamily: 'monospace', marginBottom: '2rem' }}>UNIVERSE</div>
          {[
            { chap: 'CHAPTER 00', title: '발견 — Discovery', text: '2025년, 정체불명의 좌표에서 5개의 오브제가 동시에 출현한다. 각 오브제는 같은 문명의 흔적을 가진다.' },
            { chap: 'CHAPTER 01', title: '첫 번째 접촉 — First Contact', text: '나무는 기억, 금속은 의지, 유리는 투명성, 도자는 시간, 섬유는 연결. 5인이 같은 문명 출신임을 깨닫는다.' },
            { chap: 'CHAPTER 02', title: '일상의 침투 — Domestic Aliens', text: '유물들이 현대 일상에 스며든다. 팬덤 ARCHIVE는 이 기억의 수집자다.' },
            { chap: 'CHAPTER 03', title: '중력 오브제 — Gravity Objects', text: '이 문명은 미래에서 왔다. 5인은 미래에서 현재로 유물을 역방향 전송한 존재들이다.' },
          ].map((w, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', borderTop: '0.5px solid #2a2520', padding: '1.5rem 0' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', color: '#3a3028', fontFamily: 'monospace', paddingTop: 2 }}>{w.chap}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 400, marginBottom: '0.5rem', color: '#f0ede8' }}>{w.title}</div>
                <div style={{ fontSize: 13, color: '#6b5a48', lineHeight: 1.9 }}>{w.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FANDOM ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#e0d9ce' }}>
        <MarbleTexture />
        <CrackCanvas style={{ zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ padding: '2rem', border: '0.5px solid #8c7c6a55', background: 'rgba(232,226,217,0.5)', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#8c7c6a', marginBottom: '0.8rem' }}>FANDOM</div>
            <div style={{ fontSize: 20, marginBottom: '0.6rem', color: '#2a1f14' }}>ARCHIVE — 아카이브</div>
            <div style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 2 }}>
              문명의 기억을 수집하고 보존하는 자들.<br />
              RELIC이 만드는 유물을 세상에 기록하는 존재.<br />
              팬덤 색상 <span style={{ color: '#c9a87a' }}>파치먼트 베이지</span> × 인크 블랙
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', padding: '1.5rem 2rem', borderTop: '0.5px solid #2a2520', background: '#0c0a08', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#3a3028', letterSpacing: '0.08em', flexWrap: 'wrap', gap: '0.5rem', fontFamily: 'monospace' }}>
        <div>© 2025 RELIC · ONE LABEL · JYP ENTERTAINMENT</div>
        <div>PORTFOLIO — ONE LABEL PRODUCTION</div>
      </footer>

    </main>
  );
}