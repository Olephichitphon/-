import React from 'react';

const partners = [
  { name: 'กรุงเทพประกันภัย',   file: 'bangkok-insurance.png' },
  { name: 'ไทยวิวัฒน์ประกันภัย', file: 'thai-viwat.png' },
  { name: 'MSIG ประกันภัย',       file: 'msig.png' },
  { name: 'Tokio Marine',          file: 'tokio-marine.png' },
  { name: 'ทิพยประกันภัย',       file: 'dhipaya.png' },
  { name: 'เมืองไทยประกันภัย',   file: 'muang-thai.png' },
  { name: 'วิริยะประกันภัย',     file: 'viriyah.png' },
  { name: 'เทเวศประกันภัย',      file: 'deves.png' },
  { name: 'AXA ประกันภัย',        file: 'axa.png' },
  { name: 'ไทยไพบูลย์ประกันภัย', file: 'thai-paiboon.png' },
  { name: 'Allianz Ayudhya',       file: 'allianz-ayudhya.png' },
  { name: 'AIGi Bangkok Insurance',file: 'aigi-bangkok.png' },
  { name: 'SOMPO ประกันภัย',      file: 'sompo.png' },
  { name: 'TSI ประกันภัย',        file: 'tsi.png' },
  { name: 'อินทรประกันภัย',      file: 'indara.png' },
  { name: 'นวกิจประกันภัย',      file: 'navakij.png' },
  { name: 'ฟอลคอนประกันภัย',     file: 'falcon.png' },
  { name: 'KPI ประกันภัย',        file: 'kpi.png' },
  { name: 'ERGO ประกันภัย',       file: 'ergo.png' },
  { name: 'iCare ประกันภัย',      file: 'icare.png' },
  { name: 'BUI ประกันภัย',        file: 'bui.png' },
  { name: 'AIG ประกันภัย',        file: 'aig.png' },
  { name: 'รู้ใจ ประกันภัย',     file: 'roojai.png' },
];

// ซ้ำรายการเพื่อให้วิ่งต่อเนื่อง
const doubled = [...partners, ...partners];

export default function LogoMarquee() {
  return (
    <section className="logo-marquee-section" style={{ border: 'none', borderTop: 'none', borderBottom: 'none', boxShadow: 'none' }}>
      <style>{`
        .logo-marquee-section {
          background: #fff;
          padding: 36px 0 28px;
          overflow: hidden;
          position: relative;
          margin-top: -3px;
          z-index: 10;
        }

        .logo-marquee-label {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .logo-marquee-track-wrap {
          position: relative;
          overflow: hidden;
        }

        /* fade edges */
        .logo-marquee-track-wrap::before,
        .logo-marquee-track-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .logo-marquee-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #fff 0%, transparent 100%);
        }
        .logo-marquee-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #fff 0%, transparent 100%);
        }

        .logo-marquee-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: marquee-scroll 50s linear infinite;
        }

        .logo-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 56px;
          padding: 0 8px;
          opacity: 1;
          transition: transform 0.2s ease;
        }

        .logo-item:hover {
          transform: scale(1.05);
        }

        .logo-item img {
          height: 46px;
          width: auto;
          max-width: 120px;
          object-fit: contain;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }
      `}</style>

      <p className="logo-marquee-label">พันธมิตรประกันภัยชั้นนำ</p>

      <div className="logo-marquee-track-wrap">
        <div className="logo-marquee-track">
          {doubled.map((p, i) => (
            <div className="logo-item" key={i} title={p.name}>
              <img
                src={`/assets/logos/insurance/individual/${p.file}?v=11`}
                alt={p.name}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
