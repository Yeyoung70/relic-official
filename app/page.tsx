'use client';
import { useState } from 'react';
import Link from 'next/link';

const members = [
  {
    id: 0, nameKo: '우리', nameEn: 'WOORI', pos: '리더 · 메인래퍼',
    material: 'WOOD', matKo: '나무', symbol: '나무 = 기억',
    bg: '#2a1f14', color: '#c9a87a',
    trait: '안경을 쓰고 항상 책을 들고 있다. 말이 적지만 한 마디 한 마디가 무겁다. 팀의 철학적 방향을 잡는 지성파 리더. 인문학 지식이 방대해 인터뷰마다 알쓸신잡 수준의 잡학 투하.',
    trivia: '나무의 나이테처럼 모든 경험이 몸에 새겨진다고 믿음. 멤버들 생일을 책 추천으로 축하. 쉬는 날엔 혼자 목공소 견학.',
    keywords: ['지성파', '인문학', '묵직함', '리더십', '서재'],
  },
  {
    id: 1, nameKo: '건', nameEn: 'GEON', pos: '메인댄서',
    material: 'METAL', matKo: '금속', symbol: '금속 = 의지',
    bg: '#141c24', color: '#8ab0c9',
    trait: '차와 바이크를 좋아한다. 기계 구조에 대한 이해가 깊어 무대 메커니즘도 직접 분석. 단단하고 정밀한 성격.',
    trivia: '연습실에 미니 공구함 보유. 바이크 부품 직접 교체. 키링 디자인은 본인이 직접 CAD 스케치 참여.',
    keywords: ['정밀함', '기계공학', '단단함', '퍼포먼스', '속도'],
  },
  {
    id: 2, nameKo: '하루', nameEn: 'HARU', pos: '메인보컬',
    material: 'GLASS', matKo: '유리', symbol: '유리 = 투명성',
    bg: '#0d1e26', color: '#7abcca',
    trait: '공예를 좋아하고 유리 공방을 자주 찾는다. 감정이 유리처럼 투명하게 드러나는 타입. 보컬 표현력이 극도로 섬세.',
    trivia: '선글라스 컬렉터. 빛이 유리를 통과하는 순간을 좋아해 황금시간대에 산책 필수.',
    keywords: ['투명함', '섬세함', '보컬', '빛', '감성'],
  },
  {
    id: 3, nameKo: '솔', nameEn: 'SOL', pos: '메인래퍼',
    material: 'CERAMIC', matKo: '도자', symbol: '도자 = 시간',
    bg: '#1e1208', color: '#c99e70',
    trait: '평소엔 멘헤라 기질이 있어 감정 기복이 있지만 래핑 시작하면 눈빛이 완전히 달라진다. 공구와 도구에 집착적으로 애착.',
    trivia: '작업실에 공구 100개 이상 보유 및 정리광. 래퍼지만 도자기 굽는 영상 ASMR이 팬들 사이 인기.',
    keywords: ['이중성', '집착', '도구', '변화', '불꽃'],
  },
  {
    id: 4, nameKo: '리엘', nameEn: 'RIEL', pos: '막내 · 서브댄서',
    material: 'TEXTILE', matKo: '섬유', symbol: '섬유 = 연결',
    bg: '#160e20', color: '#a888c9',
    trait: '팀 내 가장 귀엽고 막내다운 외모. 하지만 재봉과 섬유 공예에 대한 전문성은 팀 최고 수준.',
    trivia: '재봉틀 3대 보유. 멤버들 옷 직접 수선. 자수로 팬 편지 답장하는 습관.',
    keywords: ['연결', '귀여움', '섬세한손길', '직물', '따뜻함'],
  },
];

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main style={{ background: '#0c0a08', minHeight: '100vh', color: '#f0ede8', fontFamily: 'system-ui, sans-serif' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 2rem', borderBottom: '0.5px solid #2a2520', position: 'sticky', top: 0, background: '#0c0a08', zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.3em' }}>RELIC</div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#6b635a', marginTop: 2 }}>FUTURE RELICS FOR EVERYDAY LIFE</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: 12, color: '#8c8680', letterSpacing: '0.1em' }}>
          <a href="#concept" style={{ color: 'inherit', textDecoration: 'none' }}>CONCEPT</a>
          <a href="#members" style={{ color: 'inherit', textDecoration: 'none' }}>MEMBERS</a>
          <a href="#collection" style={{ color: 'inherit', textDecoration: 'none' }}>COLLECTION</a>
          <a href="#universe" style={{ color: 'inherit', textDecoration: 'none' }}>UNIVERSE</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '8rem 2rem 6rem', textAlign: 'center', borderBottom: '0.5px solid #2a2520' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.35em', color: '#6b635a', marginBottom: '2rem' }}>ONE LABEL · 2025 DEBUT · 공예돌</div>
        <h1 style={{ fontSize: 'clamp(64px, 12vw, 120px)', fontWeight: 500, letterSpacing: '0.2em', lineHeight: 1, margin: '0 0 0.3rem' }}>RELIC</h1>
        <div style={{ fontSize: 13, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '2rem' }}>레릭</div>
        <div style={{ width: 40, height: '0.5px', background: '#3a3530', margin: '0 auto 2rem' }} />
        <p style={{ fontSize: 15, color: '#8c8680', lineHeight: 1.9, maxWidth: 480, margin: '0 auto 2.5rem' }}>
          우리는 공예를 판매하지 않는다.<br />우리는 미래의 전통을 만든다.<br />5인의 아티스트, 5가지 소재, 하나의 문명.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['WOOD', 'METAL', 'GLASS', 'CERAMIC', 'TEXTILE'].map(t => (
            <span key={t} style={{ fontSize: 11, padding: '4px 14px', border: '0.5px solid #2a2520', borderRadius: 2, color: '#6b635a', letterSpacing: '0.1em' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* CONCEPT */}
      <section id="concept" style={{ padding: '4rem 2rem', borderBottom: '0.5px solid #2a2520', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '1.5rem' }}>BRAND CONCEPT</div>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: '1rem', letterSpacing: '0.05em' }}>미래의 유물을 지금 만든다</h2>
        <p style={{ fontSize: 14, color: '#8c8680', lineHeight: 1.9, maxWidth: 600, marginBottom: '2rem' }}>
          과거의 도자기, 목공예, 금속공예는 모두 그 시대의 생활용품이었다. 시간이 지나 그것들은 "전통"이 되었다. RELIC의 질문 — 그렇다면 지금 우리의 생활용품은? 5명의 아티스트는 각자의 소재를 신체로, 무대를 작업장으로 삼아 현재를 미래의 유물로 만든다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          {[
            { num: '01', title: '전통은 만들어지는 것', desc: '보존이 아닌 창조. 지금의 행위가 미래의 전통이 된다.' },
            { num: '02', title: '쓰임이 있는 예술', desc: '전시장이 아닌 일상으로. 모든 작품은 사용 가능한 오브제다.' },
            { num: '03', title: 'AI × 공예', desc: '3D 모델링과 디지털 제작. AI는 전통 생성 엔진이다.' },
            { num: '04', title: '가상 작가 시스템', desc: '작가는 존재하지 않는다. 하지만 작품은 존재한다.' },
          ].map(c => (
            <div key={c.num} style={{ padding: '1.2rem', border: '0.5px solid #2a2520', borderRadius: 4, background: '#110f0d' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#6b635a', marginBottom: '0.5rem' }}>{c.num}</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ fontSize: 12, color: '#6b635a', lineHeight: 1.7 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" style={{ padding: '4rem 2rem', borderBottom: '0.5px solid #2a2520' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '1.5rem' }}>MEMBERS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 12 }}>
            {members.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(selected === m.id ? null : m.id)}
                style={{
                  border: selected === m.id ? `1px solid ${m.color}` : '0.5px solid #2a2520',
                  borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ background: m.bg, aspectRatio: '2/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, padding: '2px 6px', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 2, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{m.material}</div>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', border: `1px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 500, color: m.color }}>{m.nameEn.slice(0,2)}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{m.pos}</div>
                </div>
                <div style={{ padding: '0.7rem' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{m.nameKo}</div>
                  <div style={{ fontSize: 10, color: '#6b635a', letterSpacing: '0.12em', marginTop: 2 }}>{m.nameEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 멤버 상세 */}
          {selected !== null && (() => {
            const m = members[selected];
            return (
              <div style={{ border: '0.5px solid #2a2520', borderRadius: 4, background: '#110f0d', display: 'grid', gridTemplateColumns: '1fr 1.6fr', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderRight: '0.5px solid #2a2520' }}>
                  <div style={{ fontSize: 24, fontWeight: 500, color: m.color, marginBottom: 3 }}>{m.nameKo}</div>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#6b635a', marginBottom: '1rem' }}>{m.nameEn}</div>
                  <div style={{ fontSize: 12, color: '#8c8680', marginBottom: '0.3rem' }}>{m.pos}</div>
                  <div style={{ display: 'inline-block', marginTop: '0.8rem', padding: '4px 12px', border: `0.5px solid ${m.color}60`, borderRadius: 2, fontSize: 11, color: m.color, letterSpacing: '0.1em' }}>{m.material} · {m.matKo}</div>
                  <div style={{ marginTop: '0.8rem', fontSize: 11, color: '#6b635a', fontStyle: 'italic' }}>"{m.symbol}"</div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#6b635a', marginBottom: '0.4rem' }}>CHARACTER</div>
                    <div style={{ fontSize: 12, color: '#8c8680', lineHeight: 1.8 }}>{m.trait}</div>
                  </div>
                  <div style={{ padding: '0.8rem', background: '#0c0a08', borderRadius: 4, border: '0.5px solid #2a2520', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#6b635a', marginBottom: '0.4rem' }}>TRIVIA</div>
                    <div style={{ fontSize: 12, color: '#8c8680', lineHeight: 1.7 }}>{m.trivia}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {m.keywords.map(k => (
                      <span key={k} style={{ fontSize: 10, padding: '3px 9px', border: '0.5px solid #2a2520', borderRadius: 2, color: '#6b635a' }}>{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" style={{ padding: '4rem 2rem', borderBottom: '0.5px solid #2a2520' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '1.5rem' }}>COLLECTION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { num: 'COLLECTION 01', name: 'FIRST CONTACT', ko: '첫 번째 접촉', bg: '#1c1510', desc: '미지의 문명에서 발견된 5개의 유물.', date: '1ST MINI · 2025.04' },
              { num: 'COLLECTION 02', name: 'DOMESTIC ALIENS', ko: '일상의 외계인', bg: '#0f1820', desc: '유물이 일상에 침투한다.', date: '2ND MINI · 2025.10' },
              { num: 'COLLECTION 03', name: 'GRAVITY OBJECTS', ko: '중력 오브제', bg: '#141a0f', desc: '중력이 다른 행성의 공예.', date: '1ST FULL · 2026' },
            ].map(c => (
              <div key={c.num} style={{ border: '0.5px solid #2a2520', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ background: c.bg, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>{c.num}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>{c.name}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>{c.ko}</div>
                </div>
                <div style={{ padding: '0.8rem 1rem' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#6b635a', lineHeight: 1.6, marginBottom: 8 }}>{c.desc}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', color: '#4a4540' }}>{c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSE */}
      <section id="universe" style={{ padding: '4rem 2rem', borderBottom: '0.5px solid #2a2520' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '1.5rem' }}>UNIVERSE</div>
          {[
            { chap: 'CHAPTER 00', title: '발견 — Discovery', text: '2025년, 정체불명의 좌표에서 5개의 오브제가 동시에 출현한다. 각 오브제는 서로 다른 소재로 제작되었지만, 같은 문명의 흔적을 가진다.' },
            { chap: 'CHAPTER 01', title: '첫 번째 접촉 — First Contact', text: '5인은 자신들이 같은 문명 출신임을 깨닫는다. 나무는 기억, 금속은 의지, 유리는 투명성, 도자는 시간, 섬유는 연결.' },
            { chap: 'CHAPTER 02', title: '일상의 침투 — Domestic Aliens', text: '유물들이 현대 일상에 스며든다. 키링, 문진, 식기, 머들러, 북마크 — 팬덤 ARCHIVE는 이 기억의 수집자다.' },
            { chap: 'CHAPTER 03', title: '중력 오브제 — Gravity Objects', text: '문명의 진실이 드러난다. 이 문명은 미래에서 왔다. 5인은 미래에서 현재로 유물을 역방향 전송한 존재들이다.' },
          ].map((w, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderTop: '0.5px solid #2a2520', padding: '1.2rem 0' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', color: '#4a4540', paddingTop: 2 }}>{w.chap}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: '0.4rem' }}>{w.title}</div>
                <div style={{ fontSize: 12, color: '#6b635a', lineHeight: 1.8 }}>{w.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FANDOM */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem', border: '0.5px solid #2a2520', borderRadius: 4, background: '#110f0d' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#6b635a', marginBottom: '0.8rem' }}>FANDOM</div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: '0.5rem' }}>ARCHIVE — 아카이브</div>
          <div style={{ fontSize: 13, color: '#6b635a', lineHeight: 1.9 }}>
            문명의 기억을 수집하고 보존하는 자들. RELIC이 만드는 유물을 세상에 기록하는 존재.<br />
            팬덤 색상 <span style={{ color: '#c9a84c' }}>파치먼트 베이지</span> × 인크 블랙
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '1.5rem 2rem', borderTop: '0.5px solid #2a2520', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4a4540', letterSpacing: '0.08em', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>© 2025 RELIC · ONE LABEL · JYP ENTERTAINMENT</div>
        <div>PORTFOLIO — ONE LABEL PRODUCTION</div>
      </footer>

    </main>
  );
}