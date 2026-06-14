/* ====================================================
   Electron Orbit Quest – script.js
   สร้างโดย: คุณครูสุพักตร์ศิริ พืชสิงห์
   โรงเรียนโพธิ์ศรีสว่างวิทยา
   รองรับ: HTML + CSS + JS เท่านั้น (GitHub Pages)
==================================================== */

'use strict';

/* ── ฐานข้อมูลธาตุ H–Ca ──────────────────────── */
const ELEMENTS = {
  H:  { z:1,  sym:'H',  nameTH:'ไฮโดรเจน',   e:1,  shell:[1],        orbital:'1s¹',                           valence:1, period:1, group:1,  commonIon:'H⁺',  ionCharge:1,  ionE:0,  ionShell:[],      atomicR:53,  ionR:0   },
  He: { z:2,  sym:'He', nameTH:'ฮีเลียม',     e:2,  shell:[2],        orbital:'1s²',                           valence:2, period:1, group:18, commonIon:'—',   ionCharge:0,  ionE:2,  ionShell:[2],     atomicR:31,  ionR:null},
  Li: { z:3,  sym:'Li', nameTH:'ลิเทียม',     e:3,  shell:[2,1],      orbital:'1s² 2s¹',                       valence:1, period:2, group:1,  commonIon:'Li⁺', ionCharge:1,  ionE:2,  ionShell:[2],     atomicR:167, ionR:76  },
  Be: { z:4,  sym:'Be', nameTH:'เบริลเลียม',  e:4,  shell:[2,2],      orbital:'1s² 2s²',                       valence:2, period:2, group:2,  commonIon:'Be²⁺',ionCharge:2,  ionE:2,  ionShell:[2],     atomicR:112, ionR:45  },
  B:  { z:5,  sym:'B',  nameTH:'โบรอน',       e:5,  shell:[2,3],      orbital:'1s² 2s² 2p¹',                   valence:3, period:2, group:13, commonIon:'B³⁺', ionCharge:3,  ionE:2,  ionShell:[2],     atomicR:87,  ionR:27  },
  C:  { z:6,  sym:'C',  nameTH:'คาร์บอน',     e:6,  shell:[2,4],      orbital:'1s² 2s² 2p²',                   valence:4, period:2, group:14, commonIon:'—',   ionCharge:0,  ionE:6,  ionShell:[2,4],   atomicR:77,  ionR:null},
  N:  { z:7,  sym:'N',  nameTH:'ไนโตรเจน',   e:7,  shell:[2,5],      orbital:'1s² 2s² 2p³',                   valence:5, period:2, group:15, commonIon:'N³⁻', ionCharge:-3, ionE:10, ionShell:[2,8],   atomicR:75,  ionR:146 },
  O:  { z:8,  sym:'O',  nameTH:'ออกซิเจน',   e:8,  shell:[2,6],      orbital:'1s² 2s² 2p⁴',                   valence:6, period:2, group:16, commonIon:'O²⁻', ionCharge:-2, ionE:10, ionShell:[2,8],   atomicR:73,  ionR:140 },
  F:  { z:9,  sym:'F',  nameTH:'ฟลูออรีน',   e:9,  shell:[2,7],      orbital:'1s² 2s² 2p⁵',                   valence:7, period:2, group:17, commonIon:'F⁻',  ionCharge:-1, ionE:10, ionShell:[2,8],   atomicR:64,  ionR:133 },
  Ne: { z:10, sym:'Ne', nameTH:'นีออน',       e:10, shell:[2,8],      orbital:'1s² 2s² 2p⁶',                   valence:8, period:2, group:18, commonIon:'—',   ionCharge:0,  ionE:10, ionShell:[2,8],   atomicR:58,  ionR:null},
  Na: { z:11, sym:'Na', nameTH:'โซเดียม',     e:11, shell:[2,8,1],    orbital:'1s² 2s² 2p⁶ 3s¹',               valence:1, period:3, group:1,  commonIon:'Na⁺', ionCharge:1,  ionE:10, ionShell:[2,8],   atomicR:186, ionR:102 },
  Mg: { z:12, sym:'Mg', nameTH:'แมกนีเซียม',  e:12, shell:[2,8,2],    orbital:'1s² 2s² 2p⁶ 3s²',               valence:2, period:3, group:2,  commonIon:'Mg²⁺',ionCharge:2,  ionE:10, ionShell:[2,8],   atomicR:160, ionR:72  },
  Al: { z:13, sym:'Al', nameTH:'อะลูมิเนียม', e:13, shell:[2,8,3],    orbital:'1s² 2s² 2p⁶ 3s² 3p¹',           valence:3, period:3, group:13, commonIon:'Al³⁺',ionCharge:3,  ionE:10, ionShell:[2,8],   atomicR:143, ionR:53  },
  Si: { z:14, sym:'Si', nameTH:'ซิลิคอน',    e:14, shell:[2,8,4],    orbital:'1s² 2s² 2p⁶ 3s² 3p²',           valence:4, period:3, group:14, commonIon:'Si⁴⁺',ionCharge:4,  ionE:10, ionShell:[2,8],   atomicR:117, ionR:42  },
  P:  { z:15, sym:'P',  nameTH:'ฟอสฟอรัส',  e:15, shell:[2,8,5],    orbital:'1s² 2s² 2p⁶ 3s² 3p³',           valence:5, period:3, group:15, commonIon:'P³⁻', ionCharge:-3, ionE:18, ionShell:[2,8,8], atomicR:110, ionR:212 },
  S:  { z:16, sym:'S',  nameTH:'กำมะถัน',    e:16, shell:[2,8,6],    orbital:'1s² 2s² 2p⁶ 3s² 3p⁴',           valence:6, period:3, group:16, commonIon:'S²⁻', ionCharge:-2, ionE:18, ionShell:[2,8,8], atomicR:104, ionR:184 },
  Cl: { z:17, sym:'Cl', nameTH:'คลอรีน',     e:17, shell:[2,8,7],    orbital:'1s² 2s² 2p⁶ 3s² 3p⁵',           valence:7, period:3, group:17, commonIon:'Cl⁻', ionCharge:-1, ionE:18, ionShell:[2,8,8], atomicR:99,  ionR:181 },
  Ar: { z:18, sym:'Ar', nameTH:'อาร์กอน',    e:18, shell:[2,8,8],    orbital:'1s² 2s² 2p⁶ 3s² 3p⁶',           valence:8, period:3, group:18, commonIon:'—',   ionCharge:0,  ionE:18, ionShell:[2,8,8], atomicR:88,  ionR:null},
  K:  { z:19, sym:'K',  nameTH:'โพแทสเซียม', e:19, shell:[2,8,8,1],  orbital:'1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',       valence:1, period:4, group:1,  commonIon:'K⁺',  ionCharge:1,  ionE:18, ionShell:[2,8,8], atomicR:227, ionR:138 },
  Ca: { z:20, sym:'Ca', nameTH:'แคลเซียม',   e:20, shell:[2,8,8,2],  orbital:'1s² 2s² 2p⁶ 3s² 3p⁶ 4s²',       valence:2, period:4, group:2,  commonIon:'Ca²⁺',ionCharge:2,  ionE:18, ionShell:[2,8,8], atomicR:197, ionR:100 },
};

/* ── บทเรียน Mini Lesson ──────────────────────── */
const LESSONS = [
  {
    id: 1,
    title: 'บทที่ 1 – เลขอะตอมและจำนวนอิเล็กตรอน',
    html: `
      <h3>📌 เลขอะตอม คืออะไร?</h3>
      <p>เลขอะตอม (Atomic Number) คือ <strong>จำนวนโปรตอน</strong> ในนิวเคลียสของอะตอม</p>
      <p>สำหรับ<strong>อะตอมที่เป็นกลางทางไฟฟ้า</strong>: จำนวนโปรตอน = จำนวนอิเล็กตรอน</p>
      <div class="example-block">
        H   → เลขอะตอม 1  → มีอิเล็กตรอน 1 ตัว<br>
        O   → เลขอะตอม 8  → มีอิเล็กตรอน 8 ตัว<br>
        Na  → เลขอะตอม 11 → มีอิเล็กตรอน 11 ตัว<br>
        Ca  → เลขอะตอม 20 → มีอิเล็กตรอน 20 ตัว
      </div>
      <h3>🔑 กฎสำคัญ</h3>
      <p>อะตอมเป็นกลาง → <strong>จำนวนอิเล็กตรอน = เลขอะตอม</strong></p>
      <table><thead><tr><th>ธาตุ</th><th>สัญลักษณ์</th><th>เลขอะตอม</th><th>จำนวน e⁻</th></tr></thead>
      <tbody>
        <tr><td>ไฮโดรเจน</td><td>H</td><td>1</td><td>1</td></tr>
        <tr><td>คาร์บอน</td><td>C</td><td>6</td><td>6</td></tr>
        <tr><td>โซเดียม</td><td>Na</td><td>11</td><td>11</td></tr>
        <tr><td>คลอรีน</td><td>Cl</td><td>17</td><td>17</td></tr>
        <tr><td>แคลเซียม</td><td>Ca</td><td>20</td><td>20</td></tr>
      </tbody></table>
    `
  },
  {
    id: 2,
    title: 'บทที่ 2 – การจัดเรียงแบบเชลล์',
    html: `
      <h3>🔵 ระดับพลังงาน (เชลล์)</h3>
      <p>อิเล็กตรอนอยู่ในระดับพลังงานหรือ <strong>เชลล์</strong> รอบนิวเคลียส</p>
      <table><thead><tr><th>เชลล์</th><th>ชื่อ</th><th>จุได้สูงสุด</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>K</td><td>2</td></tr>
        <tr><td>2</td><td>L</td><td>8</td></tr>
        <tr><td>3</td><td>M</td><td>18 (แต่ในธาตุ 1–20 ใช้แค่ 8)</td></tr>
        <tr><td>4</td><td>N</td><td>32</td></tr>
      </tbody></table>
      <h3>📝 ตัวอย่างการจัดเรียง</h3>
      <div class="example-block">
        Li (3e⁻)  = 2, 1<br>
        C  (6e⁻)  = 2, 4<br>
        O  (8e⁻)  = 2, 6<br>
        Na (11e⁻) = 2, 8, 1<br>
        Mg (12e⁻) = 2, 8, 2<br>
        Cl (17e⁻) = 2, 8, 7<br>
        Ca (20e⁻) = 2, 8, 8, 2
      </div>
      <h3>💡 เทคนิค</h3>
      <p>เติม K ก่อน (ได้ 2) → เติม L ต่อ (ได้ 8) → เติม M ต่อ (ได้ 8 ก่อนในธาตุแถวแรก) → เติม N ต่อ</p>
    `
  },
  {
    id: 3,
    title: 'บทที่ 3 – หลัก Aufbau',
    html: `
      <h3>⬆️ หลัก Aufbau คืออะไร?</h3>
      <p>การเติมอิเล็กตรอนต้องเติม<strong>จากระดับพลังงานต่ำไปสูง</strong> ตามลำดับ Aufbau</p>
      <h3>📊 ลำดับการเติม</h3>
      <div class="aufbau-diagram">
        <div class="aufbau-row"><span class="n-level">1</span><span class="sub sub-s">1s</span></div>
        <div class="aufbau-row"><span class="n-level">2</span><span class="sub sub-s">2s</span><span class="sub sub-p">2p</span></div>
        <div class="aufbau-row"><span class="n-level">3</span><span class="sub sub-s">3s</span><span class="sub sub-p">3p</span></div>
        <div class="aufbau-row"><span class="n-level">4</span><span class="sub sub-s">4s</span><span class="sub sub-d">3d</span><span class="sub sub-p">4p</span></div>
      </div>
      <p>⚠️ <strong>4s เติมก่อน 3d</strong> เพราะ 4s มีพลังงานต่ำกว่า 3d</p>
      <div class="example-block">
        ลำดับ: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p
      </div>
    `
  },
  {
    id: 4,
    title: 'บทที่ 4 – ซับเชลล์ s p d f',
    html: `
      <h3>🔬 ซับเชลล์คืออะไร?</h3>
      <p>แต่ละเชลล์แบ่งออกเป็น <strong>ซับเชลล์</strong> ซึ่งมีความจุแตกต่างกัน</p>
      <table><thead><tr><th>ซับเชลล์</th><th>จุได้สูงสุด</th><th>สี</th></tr></thead>
      <tbody>
        <tr><td>s</td><td>2</td><td>น้ำเงิน</td></tr>
        <tr><td>p</td><td>6</td><td>เขียว</td></tr>
        <tr><td>d</td><td>10</td><td>เหลือง</td></tr>
        <tr><td>f</td><td>14</td><td>แดง</td></tr>
      </tbody></table>
      <h3>📝 ตัวอย่างการจัดเรียง</h3>
      <div class="example-block">
        H  = 1s¹<br>
        He = 1s²<br>
        Li = 1s² 2s¹<br>
        C  = 1s² 2s² 2p²<br>
        O  = 1s² 2s² 2p⁴<br>
        Na = 1s² 2s² 2p⁶ 3s¹<br>
        Cl = 1s² 2s² 2p⁶ 3s² 3p⁵<br>
        Ca = 1s² 2s² 2p⁶ 3s² 3p⁶ 4s²
      </div>
      <h3>💡 การนับจำนวนอิเล็กตรอน</h3>
      <p>รวมตัวเลขยกกำลัง เช่น 1s² 2s² 2p⁶ 3s¹ = 2+2+6+1 = <strong>11 e⁻ = Na</strong></p>
    `
  },
  {
    id: 5,
    title: 'บทที่ 5 – เวเลนซ์อิเล็กตรอน',
    html: `
      <h3>⚡ เวเลนซ์อิเล็กตรอนคืออะไร?</h3>
      <p>เวเลนซ์อิเล็กตรอน (Valence Electron) คือ <strong>อิเล็กตรอนในเชลล์ชั้นนอกสุด</strong></p>
      <p>เวเลนซ์อิเล็กตรอนบ่งบอกถึง<strong>สมบัติทางเคมี</strong>และการเกิดพันธะ</p>
      <table><thead><tr><th>ธาตุ</th><th>การจัดเรียงเชลล์</th><th>เชลล์นอกสุด</th><th>เวเลนซ์ e⁻</th></tr></thead>
      <tbody>
        <tr><td>Na</td><td>2, 8, 1</td><td>M (1)</td><td>1</td></tr>
        <tr><td>Mg</td><td>2, 8, 2</td><td>M (2)</td><td>2</td></tr>
        <tr><td>Al</td><td>2, 8, 3</td><td>M (3)</td><td>3</td></tr>
        <tr><td>S</td><td>2, 8, 6</td><td>M (6)</td><td>6</td></tr>
        <tr><td>Cl</td><td>2, 8, 7</td><td>M (7)</td><td>7</td></tr>
        <tr><td>Ar</td><td>2, 8, 8</td><td>M (8)</td><td>8</td></tr>
      </tbody></table>
      <h3>💡 เทคนิค</h3>
      <p>ดูเฉพาะ<strong>เลขตัวสุดท้าย</strong>ในการจัดเรียงแบบเชลล์</p>
    `
  },
  {
    id: 6,
    title: 'บทที่ 6 – ไอออน (Ion)',
    html: `
      <h3>⚡ ไอออนคืออะไร?</h3>
      <p>ไอออน คือ อะตอมที่ <strong>รับหรือเสียอิเล็กตรอน</strong> ทำให้มีประจุไฟฟ้า</p>
      <h3>🔴 แคตไอออน (Cation) – ประจุบวก</h3>
      <p>เกิดจาก<strong>เสียอิเล็กตรอน</strong> → มีประจุบวก → ขนาด<strong>เล็กกว่า</strong>อะตอมเดิม</p>
      <div class="example-block">
        Na → Na⁺ + e⁻<br>
        Na มี 11 e⁻ (2,8,1) → Na⁺ มี 10 e⁻ (2,8)<br><br>
        Mg → Mg²⁺ + 2e⁻<br>
        Mg มี 12 e⁻ (2,8,2) → Mg²⁺ มี 10 e⁻ (2,8)
      </div>
      <h3>🔵 แอนไอออน (Anion) – ประจุลบ</h3>
      <p>เกิดจาก<strong>รับอิเล็กตรอน</strong> → มีประจุลบ → ขนาด<strong>ใหญ่กว่า</strong>อะตอมเดิม</p>
      <div class="example-block">
        Cl + e⁻ → Cl⁻<br>
        Cl มี 17 e⁻ (2,8,7) → Cl⁻ มี 18 e⁻ (2,8,8)<br><br>
        O + 2e⁻ → O²⁻<br>
        O มี 8 e⁻ (2,6) → O²⁻ มี 10 e⁻ (2,8)
      </div>
    `
  },
  {
    id: 7,
    title: 'บทที่ 7 – ขนาดอะตอม (Atomic Radius)',
    html: `
      <h3>📏 แนวโน้มขนาดอะตอมในตารางธาตุ</h3>
      <h3>→ ตามคาบ (ซ้ายไปขวา)</h3>
      <p>ขนาดอะตอม<strong>ลดลง</strong> เพราะโปรตอนเพิ่มขึ้น ดึงอิเล็กตรอนแน่นขึ้น</p>
      <div class="example-block">
        Na > Mg > Al > Si > P > S > Cl > Ar
        (ขนาดลดลงจากซ้ายไปขวา)
      </div>
      <h3>↓ ตามหมู่ (บนลงล่าง)</h3>
      <p>ขนาดอะตอม<strong>เพิ่มขึ้น</strong> เพราะมีเชลล์เพิ่มขึ้น อิเล็กตรอนชั้นนอกอยู่ไกลขึ้น</p>
      <div class="example-block">
        Li < Na < K
        (ขนาดเพิ่มขึ้นจากบนลงล่าง)
      </div>
      <h3>💡 สรุป</h3>
      <table><thead><tr><th>ทิศทาง</th><th>แนวโน้ม</th><th>เหตุผล</th></tr></thead>
      <tbody>
        <tr><td>ซ้าย → ขวา (คาบ)</td><td>⬇️ ลดลง</td><td>โปรตอนมากขึ้น</td></tr>
        <tr><td>บน → ล่าง (หมู่)</td><td>⬆️ เพิ่มขึ้น</td><td>เชลล์มากขึ้น</td></tr>
      </tbody></table>
    `
  },
  {
    id: 8,
    title: 'บทที่ 8 – ขนาดไอออน (Ionic Radius)',
    html: `
      <h3>🔍 ขนาดไอออนเทียบกับอะตอม</h3>
      <table><thead><tr><th>ประเภท</th><th>ขนาด</th><th>เหตุผล</th></tr></thead>
      <tbody>
        <tr><td>แคตไอออน (เสีย e⁻)</td><td>เล็กกว่าอะตอม</td><td>e⁻ ลดลง แรงดึงมากขึ้น</td></tr>
        <tr><td>แอนไอออน (รับ e⁻)</td><td>ใหญ่กว่าอะตอม</td><td>e⁻ เพิ่ม แรงผลักมากขึ้น</td></tr>
      </tbody></table>
      <div class="example-block">
        Na⁺ < Na      (แคตไอออนเล็กกว่า)<br>
        Mg²⁺ < Mg     (แคตไอออนเล็กกว่า)<br>
        Cl⁻ > Cl       (แอนไอออนใหญ่กว่า)<br>
        O²⁻ > O        (แอนไอออนใหญ่กว่า)
      </div>
      <h3>⚖️ ไอโซอิเล็กโทรนิก (จำนวน e⁻ เท่ากัน)</h3>
      <p>ถ้าไอออนมีจำนวนอิเล็กตรอนเท่ากัน <strong>โปรตอนมากกว่า = ขนาดเล็กกว่า</strong></p>
      <div class="example-block">
        ชุดที่มี 10 e⁻ ทั้งหมด:<br>
        O²⁻ (Z=8) > F⁻ (Z=9) > Na⁺ (Z=11) > Mg²⁺ (Z=12) > Al³⁺ (Z=13)
      </div>
    `
  }
];

/* ── คลังข้อสอบ questionBank ─────────────────── */
const questionBank = [
  // ── หมวด 1: neutralAtomElectron ──
  { id:'q01', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'Na มีเลขอะตอม 11 มีอิเล็กตรอนกี่ตัว?',
    options:['9','10','11','12'], answer:'11',
    explanation:'อะตอมที่เป็นกลาง มีจำนวนอิเล็กตรอน = เลขอะตอม ดังนั้น Na มีอิเล็กตรอน 11 ตัว',
    hint:'อะตอมเป็นกลาง: จำนวน e⁻ = เลขอะตอม',
    visualType:'atomModel', visualData:'Na' },
  { id:'q02', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'O มีเลขอะตอม 8 มีอิเล็กตรอนกี่ตัว?',
    options:['6','7','8','9'], answer:'8',
    explanation:'O มีเลขอะตอม 8 ดังนั้นมีอิเล็กตรอน 8 ตัว',
    hint:'อะตอมเป็นกลาง: จำนวน e⁻ = เลขอะตอม',
    visualType:'atomModel', visualData:'O' },
  { id:'q03', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'Ca มีเลขอะตอม 20 มีอิเล็กตรอนกี่ตัว?',
    options:['18','19','20','21'], answer:'20',
    explanation:'Ca มีเลขอะตอม 20 ดังนั้นมีอิเล็กตรอน 20 ตัว',
    hint:'อะตอมเป็นกลาง: จำนวน e⁻ = เลขอะตอม',
    visualType:'atomModel', visualData:'Ca' },
  { id:'q04', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'Cl มีเลขอะตอม 17 มีอิเล็กตรอนกี่ตัว?',
    options:['15','16','17','18'], answer:'17',
    explanation:'Cl มีเลขอะตอม 17 ดังนั้นมีอิเล็กตรอน 17 ตัว',
    hint:'อะตอมเป็นกลาง: จำนวน e⁻ = เลขอะตอม',
    visualType:'atomModel', visualData:'Cl' },
  { id:'q05', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'Mg มีเลขอะตอม 12 มีอิเล็กตรอนกี่ตัว?',
    options:['10','11','12','13'], answer:'12',
    explanation:'Mg มีเลขอะตอม 12 ดังนั้นมีอิเล็กตรอน 12 ตัว',
    hint:'อะตอมเป็นกลาง: จำนวน e⁻ = เลขอะตอม',
    visualType:'atomModel', visualData:'Mg' },
  { id:'q06', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'ธาตุใดมีอิเล็กตรอน 16 ตัว?',
    options:['P','S','Cl','Ar'], answer:'S',
    explanation:'S (กำมะถัน) มีเลขอะตอม 16 จึงมีอิเล็กตรอน 16 ตัว',
    hint:'หาธาตุที่มีเลขอะตอม = 16',
    visualType:'atomModel', visualData:'S' },
  { id:'q07', level:1, topic:'neutralAtomElectron', type:'mcq',
    question:'ธาตุใดมีอิเล็กตรอน 19 ตัว?',
    options:['Ar','K','Ca','Sc'], answer:'K',
    explanation:'K (โพแทสเซียม) มีเลขอะตอม 19 จึงมีอิเล็กตรอน 19 ตัว',
    hint:'หาธาตุที่มีเลขอะตอม = 19',
    visualType:'atomModel', visualData:'K' },

  // ── หมวด 2: shellConfiguration ──
  { id:'q08', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ Li (3 e⁻) แบบเชลล์',
    answer:[2,1], element:'Li',
    explanation:'Li มี 3 e⁻: เชลล์ K รับได้ 2 → เหลือ 1 ไปเชลล์ L → 2,1',
    hint:'เติม K ก่อน (ได้ 2) แล้วที่เหลือไปเชลล์ L',
    visualType:'shellModel', visualData:'Li' },
  { id:'q09', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ C (6 e⁻) แบบเชลล์',
    answer:[2,4], element:'C',
    explanation:'C มี 6 e⁻: K=2, L=4 → 2,4',
    hint:'เติม K ก่อน (ได้ 2) แล้วที่เหลือไปเชลล์ L',
    visualType:'shellModel', visualData:'C' },
  { id:'q10', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ Na (11 e⁻) แบบเชลล์',
    answer:[2,8,1], element:'Na',
    explanation:'Na มี 11 e⁻: K=2, L=8, M=1 → 2,8,1',
    hint:'K=2, L=8 (เต็มแล้ว) เหลือ 1 ไป M',
    visualType:'shellModel', visualData:'Na' },
  { id:'q11', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ Mg (12 e⁻) แบบเชลล์',
    answer:[2,8,2], element:'Mg',
    explanation:'Mg มี 12 e⁻: K=2, L=8, M=2 → 2,8,2',
    hint:'K=2, L=8, เหลือ 2 ไป M',
    visualType:'shellModel', visualData:'Mg' },
  { id:'q12', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ Cl (17 e⁻) แบบเชลล์',
    answer:[2,8,7], element:'Cl',
    explanation:'Cl มี 17 e⁻: K=2, L=8, M=7 → 2,8,7',
    hint:'K=2, L=8, เหลือ 7 ไป M',
    visualType:'shellModel', visualData:'Cl' },
  { id:'q13', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ Ca (20 e⁻) แบบเชลล์',
    answer:[2,8,8,2], element:'Ca',
    explanation:'Ca มี 20 e⁻: K=2, L=8, M=8, N=2 → 2,8,8,2',
    hint:'K=2, L=8, M=8, เหลือ 2 ไป N',
    visualType:'shellModel', visualData:'Ca' },
  { id:'q14', level:2, topic:'shellConfiguration', type:'shellBuilder',
    question:'จัดเรียงอิเล็กตรอนของ K (19 e⁻) แบบเชลล์',
    answer:[2,8,8,1], element:'K',
    explanation:'K มี 19 e⁻: K=2, L=8, M=8, N=1 → 2,8,8,1',
    hint:'K=2, L=8, M=8, เหลือ 1 ไป N',
    visualType:'shellModel', visualData:'K' },

  // ── หมวด 3: aufbauOrder ──
  { id:'q15', level:3, topic:'aufbauOrder', type:'aufbau',
    question:'เรียงลำดับการเติมอิเล็กตรอนแบบ Aufbau',
    answer:['1s','2s','2p','3s','3p','4s','3d','4p'],
    pool:['1s','2s','2p','3s','3p','4s','3d','4p'],
    explanation:'ลำดับ Aufbau: 1s→2s→2p→3s→3p→4s→3d→4p โดย 4s มีพลังงานต่ำกว่า 3d',
    hint:'จำไว้ว่า 4s เติมก่อน 3d',
    visualType:'aufbauDiagram' },
  { id:'q16', level:3, topic:'aufbauOrder', type:'mcq',
    question:'ในลำดับ Aufbau ซับเชลล์ใดเติมก่อน 3d?',
    options:['3p','4s','4p','3s'], answer:'4s',
    explanation:'4s มีพลังงานต่ำกว่า 3d จึงเติมก่อน',
    hint:'ลำดับ: ...3p → 4s → 3d...',
    visualType:'aufbauDiagram' },
  { id:'q17', level:3, topic:'aufbauOrder', type:'mcq',
    question:'ซับเชลล์ใดเป็นลำดับที่ 5 ในลำดับ Aufbau?',
    options:['3s','3p','4s','2p'], answer:'3p',
    explanation:'ลำดับ Aufbau: 1s(1), 2s(2), 2p(3), 3s(4), 3p(5), 4s(6), ...',
    hint:'1s→2s→2p→3s→3p→...',
    visualType:'aufbauDiagram' },
  { id:'q18', level:3, topic:'aufbauOrder', type:'mcq',
    question:'ซับเชลล์ 2p จุอิเล็กตรอนได้สูงสุดกี่ตัว?',
    options:['2','4','6','8'], answer:'6',
    explanation:'ซับเชลล์ p จุได้ 6 อิเล็กตรอน (orbital 3 วง × 2 e⁻)',
    hint:'ซับเชลล์ p จุได้ 6',
    visualType:'subshellCard' },
  { id:'q19', level:3, topic:'aufbauOrder', type:'mcq',
    question:'ซับเชลล์ 3d จุอิเล็กตรอนได้สูงสุดกี่ตัว?',
    options:['6','8','10','14'], answer:'10',
    explanation:'ซับเชลล์ d จุได้ 10 อิเล็กตรอน (orbital 5 วง × 2 e⁻)',
    hint:'ซับเชลล์ d จุได้ 10',
    visualType:'subshellCard' },

  // ── หมวด 4: orbitalConfiguration ──
  { id:'q20', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ Li (3 e⁻)',
    answer:'1s²2s¹', answerAlt:['1s² 2s¹','1s22s1'],
    pool:['1s²','2s¹','2s²','2p¹','2p²'], element:'Li',
    explanation:'Li มี 3 e⁻: 1s² (2) + 2s¹ (1) = 3',
    hint:'เริ่มจาก 1s ก่อน แล้วไป 2s',
    visualType:'atomModel', visualData:'Li' },
  { id:'q21', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ C (6 e⁻)',
    answer:'1s²2s²2p²', answerAlt:['1s² 2s² 2p²','1s22s22p2'],
    pool:['1s²','2s²','2p²','2p⁴','2p⁶'], element:'C',
    explanation:'C มี 6 e⁻: 1s² (2) + 2s² (2) + 2p² (2) = 6',
    hint:'1s ได้ 2, 2s ได้ 2, เหลือ 2 ไป 2p',
    visualType:'atomModel', visualData:'C' },
  { id:'q22', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ O (8 e⁻)',
    answer:'1s²2s²2p⁴', answerAlt:['1s² 2s² 2p⁴','1s22s22p4'],
    pool:['1s²','2s²','2p²','2p⁴','2p⁶'], element:'O',
    explanation:'O มี 8 e⁻: 1s² (2) + 2s² (2) + 2p⁴ (4) = 8',
    hint:'1s ได้ 2, 2s ได้ 2, เหลือ 4 ไป 2p',
    visualType:'atomModel', visualData:'O' },
  { id:'q23', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ Na (11 e⁻)',
    answer:'1s²2s²2p⁶3s¹', answerAlt:['1s² 2s² 2p⁶ 3s¹','1s22s22p63s1'],
    pool:['1s²','2s²','2p⁶','3s¹','3s²','3p¹'], element:'Na',
    explanation:'Na มี 11 e⁻: 1s²(2)+2s²(2)+2p⁶(6)+3s¹(1)=11',
    hint:'หลังจาก 2p เต็ม (6) ต่อด้วย 3s',
    visualType:'atomModel', visualData:'Na' },
  { id:'q24', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ Cl (17 e⁻)',
    answer:'1s²2s²2p⁶3s²3p⁵', answerAlt:['1s² 2s² 2p⁶ 3s² 3p⁵','1s22s22p63s23p5'],
    pool:['1s²','2s²','2p⁶','3s²','3p⁵','3p⁶','4s¹'], element:'Cl',
    explanation:'Cl มี 17 e⁻: 1s²(2)+2s²(2)+2p⁶(6)+3s²(2)+3p⁵(5)=17',
    hint:'หลังจาก 3s เต็ม ต่อด้วย 3p',
    visualType:'atomModel', visualData:'Cl' },
  { id:'q25', level:4, topic:'orbitalConfiguration', type:'orbital',
    question:'เขียนการจัดเรียงอิเล็กตรอนแบบหลักของ Ca (20 e⁻)',
    answer:'1s²2s²2p⁶3s²3p⁶4s²', answerAlt:['1s² 2s² 2p⁶ 3s² 3p⁶ 4s²','1s22s22p63s23p64s2'],
    pool:['1s²','2s²','2p⁶','3s²','3p⁶','4s²','3d¹'], element:'Ca',
    explanation:'Ca มี 20 e⁻: 1s²(2)+2s²(2)+2p⁶(6)+3s²(2)+3p⁶(6)+4s²(2)=20',
    hint:'หลังจาก 3p เต็ม ต่อด้วย 4s (ไม่ใช่ 3d)',
    visualType:'atomModel', visualData:'Ca' },
  { id:'q26', level:4, topic:'orbitalConfiguration', type:'mcq',
    question:'1s² 2s² 2p⁶ 3s¹ คือการจัดเรียงของธาตุใด?',
    options:['Mg','Na','Ne','Al'], answer:'Na',
    explanation:'รวม e⁻: 2+2+6+1=11 = เลขอะตอม Na',
    hint:'รวมตัวเลขยกกำลังทั้งหมด',
    visualType:'atomModel', visualData:'Na' },
  { id:'q27', level:4, topic:'orbitalConfiguration', type:'mcq',
    question:'1s² 2s² 2p⁶ 3s² 3p⁵ คือการจัดเรียงของธาตุใด?',
    options:['S','Cl','Ar','P'], answer:'Cl',
    explanation:'รวม e⁻: 2+2+6+2+5=17 = เลขอะตอม Cl',
    hint:'รวมตัวเลขยกกำลังทั้งหมด',
    visualType:'atomModel', visualData:'Cl' },

  // ── หมวด 5: valenceElectron ──
  { id:'q28', level:5, topic:'valenceElectron', type:'mcq',
    question:'Na มีการจัดเรียงเชลล์ 2,8,1 มีเวเลนซ์อิเล็กตรอนกี่ตัว?',
    options:['1','2','8','11'], answer:'1',
    explanation:'เวเลนซ์อิเล็กตรอน = อิเล็กตรอนในเชลล์นอกสุด = 1',
    hint:'ดูเฉพาะตัวเลขสุดท้ายในการจัดเรียงเชลล์',
    visualType:'shellModel', visualData:'Na' },
  { id:'q29', level:5, topic:'valenceElectron', type:'mcq',
    question:'Mg มีการจัดเรียงเชลล์ 2,8,2 มีเวเลนซ์อิเล็กตรอนกี่ตัว?',
    options:['2','8','10','12'], answer:'2',
    explanation:'เวเลนซ์อิเล็กตรอน = เชลล์นอกสุด M มี 2',
    hint:'ดูเฉพาะตัวเลขสุดท้ายในการจัดเรียงเชลล์',
    visualType:'shellModel', visualData:'Mg' },
  { id:'q30', level:5, topic:'valenceElectron', type:'mcq',
    question:'Cl มีการจัดเรียงเชลล์ 2,8,7 มีเวเลนซ์อิเล็กตรอนกี่ตัว?',
    options:['2','7','8','17'], answer:'7',
    explanation:'เวเลนซ์อิเล็กตรอน = เชลล์นอกสุด M มี 7',
    hint:'ดูเฉพาะตัวเลขสุดท้ายในการจัดเรียงเชลล์',
    visualType:'shellModel', visualData:'Cl' },
  { id:'q31', level:5, topic:'valenceElectron', type:'mcq',
    question:'Ar มีการจัดเรียงเชลล์ 2,8,8 มีเวเลนซ์อิเล็กตรอนกี่ตัว?',
    options:['2','6','8','18'], answer:'8',
    explanation:'เวเลนซ์อิเล็กตรอน = เชลล์นอกสุด M มี 8 (แก๊สมีตระกูล)',
    hint:'ดูเฉพาะตัวเลขสุดท้ายในการจัดเรียงเชลล์',
    visualType:'shellModel', visualData:'Ar' },
  { id:'q32', level:5, topic:'valenceElectron', type:'mcq',
    question:'S มีการจัดเรียงเชลล์ 2,8,6 มีเวเลนซ์อิเล็กตรอนกี่ตัว?',
    options:['2','6','8','16'], answer:'6',
    explanation:'เวเลนซ์อิเล็กตรอน = เชลล์นอกสุด M มี 6',
    hint:'ดูเฉพาะตัวเลขสุดท้ายในการจัดเรียงเชลล์',
    visualType:'shellModel', visualData:'S' },
  { id:'q33', level:5, topic:'valenceElectron', type:'mcq',
    question:'ธาตุใดมีเวเลนซ์อิเล็กตรอน 7 ตัว?',
    options:['Na','Mg','Cl','Ca'], answer:'Cl',
    explanation:'Cl มีการจัดเรียง 2,8,7 → เวเลนซ์ = 7',
    hint:'เวเลนซ์ 7 หมายความว่าเชลล์นอกสุดมี 7 e⁻',
    visualType:'shellModel', visualData:'Cl' },

  // ── หมวด 6: ionFormation ──
  { id:'q34', level:8, topic:'ionFormation', type:'mcq',
    question:'Na จะกลายเป็น Na⁺ ต้องรับหรือเสียอิเล็กตรอนกี่ตัว?',
    options:['รับ 1','รับ 2','เสีย 1','เสีย 2'], answer:'เสีย 1',
    explanation:'Na (2,8,1) เสีย e⁻ 1 ตัว → Na⁺ (2,8) มีประจุ +1',
    hint:'โลหะหมู่ 1 มักเสีย e⁻ 1 ตัว',
    visualType:'ionModel', visualData:'Na' },
  { id:'q35', level:8, topic:'ionFormation', type:'mcq',
    question:'Mg จะกลายเป็น Mg²⁺ ต้องรับหรือเสียอิเล็กตรอนกี่ตัว?',
    options:['รับ 1','รับ 2','เสีย 1','เสีย 2'], answer:'เสีย 2',
    explanation:'Mg (2,8,2) เสีย e⁻ 2 ตัว → Mg²⁺ (2,8) มีประจุ +2',
    hint:'โลหะหมู่ 2 มักเสีย e⁻ 2 ตัว',
    visualType:'ionModel', visualData:'Mg' },
  { id:'q36', level:8, topic:'ionFormation', type:'mcq',
    question:'O จะกลายเป็น O²⁻ ต้องรับหรือเสียอิเล็กตรอนกี่ตัว?',
    options:['รับ 1','รับ 2','เสีย 1','เสีย 2'], answer:'รับ 2',
    explanation:'O (2,6) รับ e⁻ 2 ตัว → O²⁻ (2,8) มีประจุ -2',
    hint:'อโลหะหมู่ 16 มักรับ e⁻ 2 ตัว',
    visualType:'ionModel', visualData:'O' },
  { id:'q37', level:8, topic:'ionFormation', type:'mcq',
    question:'Cl จะกลายเป็น Cl⁻ ต้องรับหรือเสียอิเล็กตรอนกี่ตัว?',
    options:['รับ 1','รับ 2','เสีย 1','เสีย 2'], answer:'รับ 1',
    explanation:'Cl (2,8,7) รับ e⁻ 1 ตัว → Cl⁻ (2,8,8) มีประจุ -1',
    hint:'อโลหะหมู่ 17 มักรับ e⁻ 1 ตัว',
    visualType:'ionModel', visualData:'Cl' },
  { id:'q38', level:8, topic:'ionFormation', type:'mcq',
    question:'Al จะกลายเป็น Al³⁺ ต้องรับหรือเสียอิเล็กตรอนกี่ตัว?',
    options:['รับ 3','เสีย 1','เสีย 2','เสีย 3'], answer:'เสีย 3',
    explanation:'Al (2,8,3) เสีย e⁻ 3 ตัว → Al³⁺ (2,8) มีประจุ +3',
    hint:'โลหะหมู่ 13 มักเสีย e⁻ 3 ตัว',
    visualType:'ionModel', visualData:'Al' },
  { id:'q39', level:8, topic:'cationAnion', type:'mcq',
    question:'ไอออนชนิดใดที่เกิดจากการเสียอิเล็กตรอน?',
    options:['แอนไอออน','แคตไอออน','ไอออนลบ','ไอออนเป็นกลาง'], answer:'แคตไอออน',
    explanation:'แคตไอออน (Cation) เกิดจากเสียอิเล็กตรอน มีประจุบวก',
    hint:'Cat(ion) → ประจุบวก (+)',
    visualType:'ionType' },
  { id:'q40', level:8, topic:'cationAnion', type:'mcq',
    question:'Na⁺ มีจำนวนอิเล็กตรอนกี่ตัว?',
    options:['9','10','11','12'], answer:'10',
    explanation:'Na มี 11 e⁻ เสีย 1 ตัว → Na⁺ มี 10 e⁻ การจัดเรียง 2,8',
    hint:'Na ปกติมี 11 e⁻ เสีย 1 ตัว',
    visualType:'ionModel', visualData:'Na' },
  { id:'q41', level:8, topic:'cationAnion', type:'mcq',
    question:'Cl⁻ มีจำนวนอิเล็กตรอนกี่ตัว?',
    options:['16','17','18','19'], answer:'18',
    explanation:'Cl มี 17 e⁻ รับ 1 ตัว → Cl⁻ มี 18 e⁻ การจัดเรียง 2,8,8',
    hint:'Cl ปกติมี 17 e⁻ รับ 1 ตัว',
    visualType:'ionModel', visualData:'Cl' },

  // ── หมวด 7: atomicRadiusTrend ──
  { id:'q42', level:9, topic:'atomicRadiusTrend', type:'mcq',
    question:'ในคาบเดียวกัน เมื่อเลขอะตอมเพิ่มขึ้น (ซ้าย→ขวา) ขนาดอะตอมเป็นอย่างไร?',
    options:['เพิ่มขึ้น','ลดลง','ไม่เปลี่ยน','เพิ่มแล้วลด'], answer:'ลดลง',
    explanation:'ในคาบเดียวกัน โปรตอนเพิ่ม แรงดึงนิวเคลียส-อิเล็กตรอนมากขึ้น ขนาดจึงลดลง',
    hint:'โปรตอนมาก = ดึงอิเล็กตรอนแน่น = ขนาดเล็ก',
    visualType:'atomicRadiusChart', visualData:['Na','Mg','Al','Si','P','S','Cl','Ar'] },
  { id:'q43', level:9, topic:'atomicRadiusTrend', type:'mcq',
    question:'ในหมู่เดียวกัน เมื่อเลขอะตอมเพิ่มขึ้น (บน→ล่าง) ขนาดอะตอมเป็นอย่างไร?',
    options:['เพิ่มขึ้น','ลดลง','ไม่เปลี่ยน','ลดแล้วเพิ่ม'], answer:'เพิ่มขึ้น',
    explanation:'ในหมู่เดียวกัน จำนวนเชลล์เพิ่ม อิเล็กตรอนชั้นนอกอยู่ไกลขึ้น ขนาดจึงใหญ่ขึ้น',
    hint:'เชลล์มาก = ขนาดใหญ่',
    visualType:'atomicRadiusChart', visualData:['Li','Na','K'] },
  { id:'q44', level:9, topic:'atomicRadiusTrend', type:'ordering',
    question:'เรียงธาตุจากขนาดอะตอมใหญ่ไปเล็ก: Na, Mg, Al, Cl',
    pool:['Na','Mg','Al','Cl'],
    answer:['Na','Mg','Al','Cl'],
    explanation:'ในคาบ 3 จากซ้ายไปขวา: Na > Mg > Al > Cl',
    hint:'ในคาบเดียวกัน ซ้ายสุดใหญ่สุด',
    visualType:'atomicRadiusChart', visualData:['Na','Mg','Al','Cl'] },
  { id:'q45', level:9, topic:'atomicRadiusTrend', type:'mcq',
    question:'ธาตุใดมีขนาดอะตอมใหญ่กว่า Na หรือ Cl?',
    options:['Cl','Na','เท่ากัน','ขึ้นกับอุณหภูมิ'], answer:'Na',
    explanation:'Na อยู่ซ้ายกว่า Cl ในคาบ 3 จึงมีขนาดใหญ่กว่า',
    hint:'ในคาบเดียวกัน ด้านซ้ายใหญ่กว่า',
    visualType:'atomicRadiusChart', visualData:['Na','Cl'] },
  { id:'q46', level:9, topic:'atomicRadiusTrend', type:'mcq',
    question:'ธาตุใดมีขนาดอะตอมใหญ่ที่สุดในบรรดา Li, Na, K?',
    options:['Li','Na','K','เท่ากัน'], answer:'K',
    explanation:'ลงมาในหมู่ 1: Li < Na < K เพราะจำนวนเชลล์เพิ่มขึ้น',
    hint:'ในหมู่เดียวกัน ลงมาล่างขนาดใหญ่ขึ้น',
    visualType:'atomicRadiusChart', visualData:['Li','Na','K'] },

  // ── หมวด 8: ionicRadiusTrend ──
  { id:'q47', level:10, topic:'ionicRadiusTrend', type:'mcq',
    question:'Na กับ Na⁺ ตัวใดมีขนาดใหญ่กว่า?',
    options:['Na','Na⁺','เท่ากัน','ขึ้นอยู่กับสภาวะ'], answer:'Na',
    explanation:'Na⁺ เสีย e⁻ 1 ตัว เหลือ 2 เชลล์ (2,8) จึงเล็กกว่า Na ที่มี 3 เชลล์',
    hint:'แคตไอออนเล็กกว่าอะตอมเดิม',
    visualType:'ionicRadiusCompare', visualData:['Na','Na+'] },
  { id:'q48', level:10, topic:'ionicRadiusTrend', type:'mcq',
    question:'Cl กับ Cl⁻ ตัวใดมีขนาดใหญ่กว่า?',
    options:['Cl','Cl⁻','เท่ากัน','ขึ้นอยู่กับสภาวะ'], answer:'Cl⁻',
    explanation:'Cl⁻ รับ e⁻ เพิ่ม แรงผลักระหว่าง e⁻ มากขึ้น จึงใหญ่กว่า Cl',
    hint:'แอนไอออนใหญ่กว่าอะตอมเดิม',
    visualType:'ionicRadiusCompare', visualData:['Cl','Cl-'] },
  { id:'q49', level:10, topic:'ionicRadiusTrend', type:'mcq',
    question:'Mg กับ Mg²⁺ ตัวใดมีขนาดเล็กกว่า?',
    options:['Mg','Mg²⁺','เท่ากัน','ขึ้นอยู่กับสภาวะ'], answer:'Mg²⁺',
    explanation:'Mg²⁺ เสีย e⁻ 2 ตัว เหลือ 2 เชลล์ (2,8) จึงเล็กกว่า Mg',
    hint:'แคตไอออนเล็กกว่าอะตอมเดิม',
    visualType:'ionicRadiusCompare', visualData:['Mg','Mg2+'] },
  { id:'q50', level:10, topic:'isoelectronicIonSize', type:'ordering',
    question:'เรียงไอออนต่อไปนี้จากขนาดใหญ่ไปเล็ก (ทุกตัวมี 10 e⁻): O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺',
    pool:['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺'],
    answer:['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺'],
    explanation:'ทุกตัวมี 10 e⁻ แต่โปรตอนต่างกัน: Z(O)=8, Z(F)=9, Z(Na)=11, Z(Mg)=12, Z(Al)=13 → โปรตอนมาก = ขนาดเล็ก',
    hint:'ชุดนี้มี e⁻ เท่ากัน โปรตอนมากกว่า = ขนาดเล็กกว่า',
    visualType:'isoelectronicChart', visualData:['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺'] },
  { id:'q51', level:10, topic:'isoelectronicIonSize', type:'mcq',
    question:'ในบรรดา O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ ที่มี 10 e⁻ เหมือนกัน ไอออนใดมีขนาดเล็กที่สุด?',
    options:['O²⁻','F⁻','Na⁺','Al³⁺'], answer:'Al³⁺',
    explanation:'Al มีโปรตอนมากที่สุด (Z=13) ในกลุ่มที่มี 10 e⁻ เหมือนกัน จึงดึงอิเล็กตรอนแน่นที่สุด มีขนาดเล็กที่สุด',
    hint:'ไอโซอิเล็กโทรนิก: โปรตอนมาก = ขนาดเล็ก',
    visualType:'isoelectronicChart', visualData:['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺'] },
  { id:'q52', level:10, topic:'ionicRadiusTrend', type:'mcq',
    question:'O²⁻ มีจำนวนอิเล็กตรอนกี่ตัว?',
    options:['6','8','10','12'], answer:'10',
    explanation:'O มี 8 e⁻ รับ 2 ตัว → O²⁻ มี 10 e⁻ การจัดเรียง 2,8',
    hint:'O มี 8 e⁻ รับ 2 เพิ่ม',
    visualType:'ionModel', visualData:'O' },

  // ── ข้อสอบ Match Mission (level 6) ──
  { id:'q53', level:6, topic:'matchMission', type:'mcq',
    question:'Na มีการจัดเรียงแบบเชลล์อย่างไร?',
    options:['2,8','2,8,1','2,8,2','2,8,7'], answer:'2,8,1',
    explanation:'Na มี 11 e⁻: K=2, L=8, M=1',
    hint:'Na มีเลขอะตอม 11',
    visualType:'shellModel', visualData:'Na' },
  { id:'q54', level:6, topic:'matchMission', type:'mcq',
    question:'Cl มีการจัดเรียงแบบหลักอย่างไร?',
    options:['1s² 2s² 2p⁶ 3s² 3p⁵','1s² 2s² 2p⁶ 3s² 3p⁶','1s² 2s² 2p⁶ 3s¹','1s² 2s² 2p⁶ 3s² 3p⁴'], answer:'1s² 2s² 2p⁶ 3s² 3p⁵',
    explanation:'Cl มี 17 e⁻: 1s²(2)+2s²(2)+2p⁶(6)+3s²(2)+3p⁵(5)=17',
    hint:'Cl มีเลขอะตอม 17',
    visualType:'atomModel', visualData:'Cl' },
  { id:'q55', level:6, topic:'matchMission', type:'mcq',
    question:'การจัดเรียง 2,8,8,2 คือธาตุใด?',
    options:['K','Ca','Ar','Mg'], answer:'Ca',
    explanation:'2+8+8+2 = 20 e⁻ = เลขอะตอม 20 = Ca',
    hint:'รวมตัวเลขทั้งหมด',
    visualType:'shellModel', visualData:'Ca' },
  { id:'q56', level:6, topic:'matchMission', type:'mcq',
    question:'1s² 2s² 2p⁶ 3s² 3p⁶ 4s² คือธาตุใด?',
    options:['K','Ca','Ar','Mg'], answer:'Ca',
    explanation:'รวม e⁻: 2+2+6+2+6+2=20 = Ca',
    hint:'รวมตัวเลขยกกำลังทั้งหมด',
    visualType:'atomModel', visualData:'Ca' },
];

/* ── การกำหนดด่านเกม ──────────────────────────── */
const LEVELS_CONFIG = [
  { id:1, name:'Atomic ID', lessonId:1, questionIds:['q01','q02','q03','q04','q05','q06','q07'], maxScore:70 },
  { id:2, name:'Shell Builder Lab', lessonId:2, questionIds:['q08','q09','q10','q11','q12','q13','q14'], maxScore:70 },
  { id:3, name:'Aufbau Energy Path', lessonId:3, questionIds:['q15','q16','q17','q18','q19'], maxScore:50 },
  { id:4, name:'Orbital Code Builder', lessonId:4, questionIds:['q20','q21','q22','q23','q24','q25','q26','q27'], maxScore:80 },
  { id:5, name:'Valence Scanner', lessonId:5, questionIds:['q28','q29','q30','q31','q32','q33'], maxScore:60 },
  { id:6, name:'Match Mission', lessonId:null, questionIds:['q53','q54','q55','q56'], maxScore:40 },
  { id:7, name:'Final Boss (30 ข้อ)', lessonId:null, questionIds:null, isBoss:true, maxScore:300 },
  { id:8, name:'Ion Transformer Lab', lessonId:6, questionIds:['q34','q35','q36','q37','q38','q39','q40','q41'], maxScore:80 },
  { id:9, name:'Atomic Size Explorer', lessonId:7, questionIds:['q42','q43','q44','q45','q46'], maxScore:50 },
  { id:10, name:'Ionic Size Challenge', lessonId:8, questionIds:['q47','q48','q49','q50','q51','q52'], maxScore:60 },
];

/* ── State ────────────────────────────────────── */
const state = {
  student: { name:'', class:'', no:'' },
  currentLevel: 1,
  currentQIndex: 0,
  currentQuestions: [],
  hearts: 3,
  levelScores: {},  // { 1: { score:xx, max:xx }, ... }
  hintUsed: false,
  answered: false,
  selectedAnswer: null,
  shellCounts: { K:0, L:0, M:0, N:0 },
  aufbauSelected: [],
  orbitalPlaced: [],
};

/* ── Helper ───────────────────────────────────── */
const $ = id => document.getElementById(id);
const shuffle = arr => [...arr].sort(() => Math.random() - .5);
const superscript = s => s.replace(/(\d+)/g, n => n.split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''));
const normalizeOrbital = s => s.replace(/\s+/g,'').replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, c=>'01234567890'['⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)]);

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ── SVG / Visual Renderers ─────────────────────
   renderAtomModel, renderShellModel, etc.
────────────────────────────────────────────────── */
function renderAtomModel(sym) {
  const el = ELEMENTS[sym];
  if (!el) return '';
  const shell = el.shell;
  const shells = ['K','L','M','N'];
  const radii = [40, 75, 110, 145];
  const cx = 170, cy = 170, size = 340;
  let dots = '';
  shell.forEach((count, si) => {
    const r = radii[si];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI - Math.PI/2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#38bdf8" filter="url(#glow)"/>`;
    }
  });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="atom-model-svg">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${shell.map((_,si)=>`<circle cx="${cx}" cy="${cy}" r="${radii[si]}" fill="none" stroke="rgba(79,142,247,.4)" stroke-width="1.5"/>
      <text x="${cx+radii[si]+5}" y="${cy+4}" font-size="11" fill="#4f8ef7" font-weight="bold">${shells[si]}</text>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="22" fill="url(#nuc)" filter="url(#glow)"/>
    <defs><radialGradient id="nuc" cx="40%" cy="40%"><stop offset="0%" stop-color="#fde68a"/><stop offset="100%" stop-color="#f59e0b"/></radialGradient></defs>
    <text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="bold" fill="white">${sym}</text>
    <text x="${cx}" y="${cy+14}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="white">Z=${el.z}</text>
    ${dots}
  </svg>`;
}

function renderShellModel(shellArr, sym) {
  const shells = ['K','L','M','N'];
  const radii = [40, 75, 110, 145];
  const cx = 170, cy = 170, size = 340;
  let dots = '';
  shellArr.forEach((count, si) => {
    const r = radii[si];
    for (let i = 0; i < count; i++) {
      const angle = (i / Math.max(count,1)) * 2 * Math.PI - Math.PI/2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#38bdf8" filter="url(#glow2)"/>`;
    }
  });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="atom-model-svg">
    <defs>
      <filter id="glow2"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="nuc2" cx="40%" cy="40%"><stop offset="0%" stop-color="#fde68a"/><stop offset="100%" stop-color="#f59e0b"/></radialGradient>
    </defs>
    ${shellArr.map((_,si)=>`<circle cx="${cx}" cy="${cy}" r="${radii[si]}" fill="none" stroke="rgba(79,142,247,.4)" stroke-width="1.5"/>
      <text x="${cx+radii[si]+5}" y="${cy+4}" font-size="11" fill="#4f8ef7" font-weight="bold">${shells[si]}</text>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="22" fill="url(#nuc2)" filter="url(#glow2)"/>
    <text x="${cx}" y="${cy+4}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="bold" fill="white">${sym||'?'}</text>
    ${dots}
  </svg>`;
}

function renderIonModel(sym, isIon) {
  const el = ELEMENTS[sym];
  if (!el) return '';
  const shellArr = isIon ? el.ionShell : el.shell;
  return renderShellModel(shellArr, isIon ? el.commonIon : sym);
}

function renderAtomicRadiusComparison(syms) {
  // ขนาดสัมพัทธ์ (scaled)
  const maxR = Math.max(...syms.map(s => ELEMENTS[s]?.atomicR || 50));
  const W = 300, H = 160;
  const items = syms.map((s,i) => {
    const el = ELEMENTS[s];
    const r = Math.round(((el?.atomicR||50)/maxR)*55) + 10;
    const x = 30 + i * (W-40)/(syms.length-1||1);
    return { s, r, x, el };
  });
  const circles = items.map(({s,r,x,el})=>`
    <circle cx="${x}" cy="${H/2}" r="${r}" fill="rgba(79,142,247,.2)" stroke="#4f8ef7" stroke-width="2"/>
    <text x="${x}" y="${H/2+1}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="bold" fill="#e2e8f0">${s}</text>
    <text x="${x}" y="${H-12}" text-anchor="middle" font-size="10" fill="#94a3b8">${el?.nameTH||''}</text>
  `).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" class="atom-model-svg">${circles}</svg>`;
}

function renderIonicRadiusCompare(pair) {
  // pair: ['Na','Na+'] หรือ ['Cl','Cl-']
  const sym1 = pair[0];
  const sym2 = pair[1];
  const el = ELEMENTS[sym1];
  if (!el) return '';
  const r1 = 55, r2 = el.ionCharge > 0 ? 38 : 68;
  const label2 = el.commonIon;
  const W = 260, H = 140;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" class="atom-model-svg">
    <circle cx="65" cy="${H/2}" r="${r1}" fill="rgba(79,142,247,.18)" stroke="#4f8ef7" stroke-width="2"/>
    <text x="65" y="${H/2}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="bold" fill="#e2e8f0">${sym1}</text>
    <circle cx="195" cy="${H/2}" r="${r2}" fill="${el.ionCharge>0?'rgba(239,68,68,.18)':'rgba(34,197,94,.18)'}" stroke="${el.ionCharge>0?'#ef4444':'#22c55e'}" stroke-width="2"/>
    <text x="195" y="${H/2}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="bold" fill="#e2e8f0">${label2}</text>
  </svg>`;
}

function renderIsoelectronicChart(ions) {
  // ions: ['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺']
  const sizes = { 'O²⁻':65,'F⁻':55,'Na⁺':40,'Mg²⁺':30,'Al³⁺':22 };
  const W = 330, H = 160;
  const n = ions.length;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" class="atom-model-svg">
    ${ions.map((ion,i)=>{
      const r = sizes[ion]||30;
      const x = 30 + i*(W-40)/(n-1);
      const color = r > 45 ? '#22c55e' : r > 35 ? '#4f8ef7' : '#ef4444';
      return `<circle cx="${x}" cy="${H/2}" r="${r}" fill="${color}22" stroke="${color}" stroke-width="2"/>
        <text x="${x}" y="${H/2+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="bold" fill="#e2e8f0">${ion}</text>`;
    }).join('')}
  </svg>`;
}

/* ── Build Visual for Feedback ──────────────────── */
function buildVisual(q) {
  if (!q.visualType) return '';
  switch(q.visualType) {
    case 'atomModel': return q.visualData ? renderAtomModel(q.visualData) : '';
    case 'shellModel': return q.visualData ? renderAtomModel(q.visualData) : '';
    case 'ionModel': {
      const sym = q.visualData;
      const el = ELEMENTS[sym];
      if (!el) return '';
      return `<div class="ion-transform-wrap">
        ${renderShellModel(el.shell, sym)}
        <div class="ion-arrow">→</div>
        ${renderShellModel(el.ionShell, el.commonIon)}
      </div>`;
    }
    case 'atomicRadiusChart':
      return q.visualData ? renderAtomicRadiusComparison(q.visualData) : '';
    case 'ionicRadiusCompare':
      return q.visualData ? renderIonicRadiusCompare(q.visualData) : '';
    case 'isoelectronicChart':
      return q.visualData ? renderIsoelectronicChart(q.visualData) : '';
    case 'aufbauDiagram':
      return `<div class="aufbau-diagram">
        <div class="aufbau-row"><span class="n-level">1</span><span class="sub sub-s">1s (จุได้ 2)</span></div>
        <div class="aufbau-row"><span class="n-level">2</span><span class="sub sub-s">2s</span><span class="sub sub-p">2p (จุได้ 6)</span></div>
        <div class="aufbau-row"><span class="n-level">3</span><span class="sub sub-s">3s</span><span class="sub sub-p">3p</span></div>
        <div class="aufbau-row"><span class="n-level">4</span><span class="sub sub-s">4s ← เติมก่อน 3d!</span><span class="sub sub-d">3d</span></div>
      </div>`;
    default: return '';
  }
}

/* ── LocalStorage ────────────────────────────────*/
const LS_KEY = 'electronOrbitQuest_scores';
function loadScores() { try { return JSON.parse(localStorage.getItem(LS_KEY))||[]; } catch{ return []; } }
function saveScore(record) {
  const arr = loadScores();
  arr.push(record);
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}
function clearAllScores() { localStorage.removeItem(LS_KEY); }

/* ── Page Navigation ─────────────────────────────*/
function goHome() {
  state.currentLevel = 1;
  state.levelScores = {};
  showPage('page-landing');
}

/* ── Validate student form ───────────────────────*/
function validateStudent() {
  const name = $('inp-name').value.trim();
  const cls  = $('inp-class').value.trim();
  const no   = $('inp-no').value.trim();
  if (!name || !cls || !no) {
    alert('กรุณากรอกชื่อ ชั้น และเลขที่ให้ครบถ้วน');
    return false;
  }
  state.student = { name, class: cls, no };
  return true;
}

/* ── Start Learning Flow ────────────────────────*/
function startLearnFlow(levelId) {
  state.currentLevel = levelId;
  const cfg = LEVELS_CONFIG.find(l => l.id === levelId);
  if (!cfg) return;
  if (cfg.lessonId) {
    showLesson(cfg.lessonId, () => startLevelGame(levelId));
  } else {
    startLevelGame(levelId);
  }
}

function showLesson(lessonId, onStart) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) { onStart && onStart(); return; }
  $('lesson-title').textContent = lesson.title;
  $('lesson-body').innerHTML = lesson.html;
  showPage('page-lesson');
  $('btn-lesson-start').onclick = () => { onStart && onStart(); };
  $('btn-lesson-example').onclick = () => onStart && onStart();
  $('btn-lesson-back').onclick = () => showPage('page-landing');
}

/* ── Start Level Game ───────────────────────────*/
function startLevelGame(levelId) {
  const cfg = LEVELS_CONFIG.find(l => l.id === levelId);
  if (!cfg) return;
  state.currentLevel = levelId;
  state.hearts = 3;
  state.currentQIndex = 0;
  state.levelScores[levelId] = state.levelScores[levelId] || { score:0, max:cfg.maxScore };

  // ถ้าเป็น Final Boss สุ่ม 30 ข้อ
  if (cfg.isBoss) {
    const pool = [...questionBank];
    state.currentQuestions = shuffle(pool).slice(0, 30);
    state.levelScores[levelId].max = 300;
  } else {
    state.currentQuestions = cfg.questionIds.map(id => questionBank.find(q => q.id === id)).filter(Boolean);
    state.levelScores[levelId].max = cfg.maxScore;
  }
  state.levelScores[levelId].score = 0;

  $('hud-level').textContent = levelId;
  updateHUD();
  showPage('page-game');
  renderQuestion();
}

/* ── HUD Update ─────────────────────────────────*/
function updateHUD() {
  $('hud-hearts').textContent = '❤️'.repeat(state.hearts) + '🖤'.repeat(3-state.hearts);
  const score = state.levelScores[state.currentLevel]?.score || 0;
  $('hud-score').textContent = score;
  const total = state.currentQuestions.length;
  const done = state.currentQIndex;
  $('progress-bar').style.width = total ? `${(done/total)*100}%` : '0%';
  $('progress-text').textContent = `${done} / ${total}`;
}

/* ── Render Question ─────────────────────────────*/
function renderQuestion() {
  const q = state.currentQuestions[state.currentQIndex];
  if (!q) { finishLevel(); return; }

  state.answered = false;
  state.hintUsed = false;
  state.selectedAnswer = null;

  $('btn-check').style.display = '';
  $('btn-next').style.display = 'none';
  updateHUD();

  const area = $('game-area');
  const el = q.element ? ELEMENTS[q.element] : (q.visualData && ELEMENTS[q.visualData] ? ELEMENTS[q.visualData] : null);

  let cardHTML = '';
  if (el) {
    cardHTML = `<div class="q-element-card">
      <span class="elem-num">Z = ${el.z}</span>
      <span class="elem-sym">${el.sym}</span>
      <span class="elem-name">${el.nameTH}</span>
    </div>`;
  }

  let inputHTML = '';
  switch(q.type) {
    case 'mcq':
      inputHTML = buildMCQ(q);
      break;
    case 'shellBuilder':
      inputHTML = buildShellBuilder(q);
      break;
    case 'aufbau':
      inputHTML = buildAufbau(q);
      break;
    case 'orbital':
      inputHTML = buildOrbital(q);
      break;
    case 'ordering':
      inputHTML = buildOrdering(q);
      break;
    default:
      inputHTML = buildMCQ(q);
  }

  area.innerHTML = `
    ${cardHTML}
    <p class="q-question">${q.question}</p>
    ${inputHTML}
  `;

  // re-attach listeners
  attachQuestionListeners(q);
}

/* ── Build MCQ ───────────────────────────────────*/
function buildMCQ(q) {
  const opts = shuffle(q.options);
  return `<div class="mcq-options" id="mcq-opts">
    ${opts.map(o=>`<button class="mcq-option" data-val="${o}">${o}</button>`).join('')}
  </div>`;
}

/* ── Build Shell Builder ─────────────────────────*/
function buildShellBuilder(q) {
  const shells = ['K','L','M','N'];
  state.shellCounts = { K:0, L:0, M:0, N:0 };
  const totalE = q.answer.reduce((a,b)=>a+b,0);
  return `
    <p style="font-size:.82rem;color:var(--text3);margin-bottom:6px;">รวมทั้งหมด ${totalE} อิเล็กตรอน</p>
    <div class="shell-builder">
      <div class="shell-visual" id="shell-visual">${buildShellSVG()}</div>
      <div class="shell-controls">
        ${shells.map(s=>`<div class="shell-ctrl-box">
          <span class="shell-ctrl-label">${s}</span>
          <span class="shell-ctrl-count" id="sc-${s}">0</span>
          <div class="shell-ctrl-btns">
            <button onclick="changeShell('${s}',-1)">−</button>
            <button onclick="changeShell('${s}',1)">+</button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
}

function buildShellSVG() {
  const sc = state.shellCounts;
  const rings = [
    {name:'K',r:35,max:2,cnt:sc.K},
    {name:'L',r:65,max:8,cnt:sc.L},
    {name:'M',r:95,max:8,cnt:sc.M},
    {name:'N',r:118,max:8,cnt:sc.N},
  ];
  const cx=120,cy=120,size=240;
  let dots='';
  rings.forEach(ring=>{
    for(let i=0;i<ring.cnt;i++){
      const angle=(i/Math.max(ring.cnt,1))*2*Math.PI-Math.PI/2;
      const x=cx+ring.r*Math.cos(angle);
      const y=cy+ring.r*Math.sin(angle);
      dots+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#38bdf8" opacity=".9"/>`;
    }
  });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs><radialGradient id="n3" cx="40%" cy="40%"><stop offset="0%" stop-color="#fde68a"/><stop offset="100%" stop-color="#f59e0b"/></radialGradient></defs>
    ${rings.map(r=>`<circle cx="${cx}" cy="${cy}" r="${r.r}" fill="none" stroke="rgba(79,142,247,.35)" stroke-width="1.5"/>
      <text x="${cx+r.r+3}" y="${cy+3}" font-size="9" fill="#4f8ef7">${r.name}</text>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="18" fill="url(#n3)"/>
    ${dots}
  </svg>`;
}

window.changeShell = function(shell, delta) {
  const maxes = {K:2,L:8,M:8,N:8};
  const s = state.shellCounts;
  s[shell] = Math.max(0, Math.min(maxes[shell], s[shell]+delta));
  $(`sc-${shell}`).textContent = s[shell];
  const sv = $('shell-visual');
  if(sv) sv.innerHTML = buildShellSVG();
};

/* ── Build Aufbau ────────────────────────────────*/
function buildAufbau(q) {
  state.aufbauSelected = [];
  const shuffledPool = shuffle(q.pool);
  return `
    <p style="font-size:.82rem;color:var(--text3)">คลิกเพื่อเลือกซับเชลล์ตามลำดับพลังงานจากต่ำไปสูง</p>
    <div class="aufbau-sequence" id="aufbau-seq"><span style="color:var(--text3);font-size:.8rem">เลือกซับเชลล์ที่นี่...</span></div>
    <div class="aufbau-cards" id="aufbau-pool">
      ${shuffledPool.map(c=>`<div class="aufbau-card" data-sub="${c}">${c}</div>`).join('')}
    </div>`;
}

/* ── Build Orbital ───────────────────────────────*/
function buildOrbital(q) {
  state.orbitalPlaced = [];
  const shuffledPool = shuffle(q.pool);
  return `
    <p style="font-size:.82rem;color:var(--text3)">ลากหรือคลิกการ์ดซับเชลล์มาเรียงในกล่องคำตอบ</p>
    <div class="orbital-answer-zone" id="orbital-zone">
      <span style="color:var(--text3);font-size:.8rem">วางการ์ดที่นี่...</span>
    </div>
    <div class="orbital-card-pool" id="orbital-pool">
      ${shuffledPool.map(c=>`<div class="orbital-card" draggable="true" data-card="${c}">${c}</div>`).join('')}
    </div>
    <p style="font-size:.78rem;color:var(--text3);margin-top:6px">หรือพิมพ์คำตอบ: <input id="orbital-text-inp" class="mono" style="background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:5px 8px;color:var(--text);font-size:.9rem;width:200px" placeholder="เช่น 1s²2s¹"/></p>`;
}

/* ── Build Ordering ─────────────────────────────*/
function buildOrdering(q) {
  state.orderingAnswer = [];
  const shuffledPool = shuffle(q.pool);
  return `
    <p style="font-size:.82rem;color:var(--text3)">คลิกเพื่อเรียงลำดับ (คลิกซ้ำเพื่อเอาออก)</p>
    <div class="ordering-pool" id="order-pool">
      ${shuffledPool.map(c=>`<div class="ordering-chip" data-item="${c}">${c}</div>`).join('')}
    </div>
    <p style="font-size:.75rem;color:var(--text3);margin:4px 0;">คำตอบของคุณ:</p>
    <div class="ordering-answer" id="order-answer"></div>`;
}

/* ── Attach Listeners ───────────────────────────*/
function attachQuestionListeners(q) {
  if (q.type === 'mcq') {
    document.querySelectorAll('.mcq-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.answered) return;
        document.querySelectorAll('.mcq-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedAnswer = btn.dataset.val;
      });
    });
  }
  if (q.type === 'aufbau') {
    document.querySelectorAll('.aufbau-card').forEach(card => {
      card.addEventListener('click', () => {
        if (state.answered || card.classList.contains('selected')) return;
        state.aufbauSelected.push(card.dataset.sub);
        card.classList.add('selected');
        const seq = $('aufbau-seq');
        seq.innerHTML = state.aufbauSelected.map(s=>`<span class="aufbau-seq-item">${s}</span>`).join('');
        state.selectedAnswer = state.aufbauSelected;
      });
    });
  }
  if (q.type === 'orbital') {
    // Drag & Drop
    document.querySelectorAll('.orbital-card').forEach(card => {
      card.addEventListener('click', () => {
        if (state.answered || card.classList.contains('used')) return;
        state.orbitalPlaced.push(card.dataset.card);
        card.classList.add('used');
        updateOrbitalZone();
      });
      card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', card.dataset.card);
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    const zone = $('orbital-zone');
    if (zone) {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const val = e.dataTransfer.getData('text');
        const card = document.querySelector(`.orbital-card[data-card="${val}"]`);
        if (card && !card.classList.contains('used') && !state.answered) {
          state.orbitalPlaced.push(val);
          card.classList.add('used');
          updateOrbitalZone();
        }
      });
    }
  }
  if (q.type === 'ordering') {
    document.querySelectorAll('#order-pool .ordering-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (state.answered) return;
        const item = chip.dataset.item;
        if (chip.classList.contains('in-answer')) {
          state.orderingAnswer = state.orderingAnswer.filter(i => i !== item);
          chip.classList.remove('in-answer');
        } else {
          state.orderingAnswer.push(item);
          chip.classList.add('in-answer');
        }
        updateOrderingAnswer();
        state.selectedAnswer = state.orderingAnswer;
      });
    });
  }
}

function updateOrbitalZone() {
  const zone = $('orbital-zone');
  if (!zone) return;
  if (state.orbitalPlaced.length === 0) {
    zone.innerHTML = `<span style="color:var(--text3);font-size:.8rem">วางการ์ดที่นี่...</span>`;
  } else {
    zone.innerHTML = state.orbitalPlaced.map((c,i)=>`<span class="orbital-placed" onclick="removeOrbital(${i})">${c}</span>`).join('');
  }
  state.selectedAnswer = state.orbitalPlaced;
}

window.removeOrbital = function(idx) {
  if (state.answered) return;
  const removed = state.orbitalPlaced.splice(idx, 1)[0];
  // re-enable card
  const card = document.querySelector(`.orbital-card[data-card="${removed}"]`);
  if (card) card.classList.remove('used');
  updateOrbitalZone();
};

function updateOrderingAnswer() {
  const zone = $('order-answer');
  if (!zone) return;
  if (state.orderingAnswer.length === 0) {
    zone.innerHTML = '';
  } else {
    zone.innerHTML = state.orderingAnswer.map(i=>`<span class="ordering-chip in-answer">${i}</span>`).join('');
  }
}

/* ── Check Answer ────────────────────────────────*/
function checkAnswer() {
  if (state.answered) return;
  const q = state.currentQuestions[state.currentQIndex];
  let isCorrect = false;
  let userAns = '';

  switch(q.type) {
    case 'mcq':
      userAns = state.selectedAnswer || '';
      if (!userAns) { alert('กรุณาเลือกคำตอบก่อน'); return; }
      isCorrect = userAns === q.answer;
      break;
    case 'shellBuilder': {
      const sc = state.shellCounts;
      const arr = [sc.K, sc.L, sc.M, sc.N].slice(0, q.answer.length);
      // trim trailing zeros
      while(arr.length > 1 && arr[arr.length-1]===0) arr.pop();
      isCorrect = arr.length===q.answer.length && arr.every((v,i)=>v===q.answer[i]);
      userAns = arr.join(',');
      break;
    }
    case 'aufbau': {
      const sel = state.aufbauSelected;
      isCorrect = JSON.stringify(sel)===JSON.stringify(q.answer);
      userAns = sel.join('→');
      break;
    }
    case 'orbital': {
      // ตรวจจากการ์ดที่วาง หรือ textbox
      const textInp = $('orbital-text-inp');
      let typed = textInp ? textInp.value.trim() : '';
      const placed = state.orbitalPlaced.join('');
      // normalize
      const normalize = s => normalizeOrbital(s.replace(/\s+/g,''));
      const normAns = normalize(q.answer);
      const normPlaced = normalize(placed);
      const normTyped = normalize(typed);
      isCorrect = (normPlaced === normAns) || (normTyped === normAns) ||
        (q.answerAlt && q.answerAlt.some(a => normalize(a) === normPlaced || normalize(a) === normTyped));
      userAns = placed || typed;
      break;
    }
    case 'ordering': {
      const sel = state.orderingAnswer || [];
      if (sel.length !== q.answer.length) { alert('กรุณาเรียงลำดับให้ครบทุกตัวก่อน'); return; }
      isCorrect = JSON.stringify(sel) === JSON.stringify(q.answer);
      userAns = sel.join(' > ');
      break;
    }
  }

  state.answered = true;
  const pts = isCorrect ? (state.hintUsed ? 8 : 10) : 0;
  if (isCorrect) {
    state.levelScores[state.currentLevel].score += pts;
  } else {
    state.hearts--;
    updateHUD();
    if (state.hearts <= 0) {
      setTimeout(() => $('gameover-popup').classList.remove('hidden'), 400);
      return;
    }
  }

  // Highlight MCQ options
  if (q.type === 'mcq') {
    document.querySelectorAll('.mcq-option').forEach(btn => {
      if (btn.dataset.val === q.answer) btn.classList.add('correct');
      else if (btn.dataset.val === userAns) btn.classList.add('wrong');
    });
  }

  $('btn-check').style.display = 'none';
  $('btn-next').style.display = '';
  showFeedback(q, isCorrect, pts);
  updateHUD();
}

/* ── Show Feedback Popup ─────────────────────────*/
function showFeedback(q, isCorrect, pts) {
  const popup = $('feedback-popup');
  $('feedback-icon').textContent = isCorrect ? '🎉' : '💡';
  const msgEl = $('feedback-msg');
  msgEl.className = 'feedback-msg ' + (isCorrect ? 'correct' : 'wrong');
  msgEl.textContent = isCorrect
    ? `ถูกต้อง! +${pts} คะแนน`
    : `ไม่ถูกต้อง คำตอบคือ: ${q.answer}`;
  $('feedback-visual').innerHTML = buildVisual(q);
  $('feedback-exp').innerHTML = `<strong>คำอธิบาย:</strong> ${q.explanation}`;
  popup.classList.remove('hidden');
}

$('btn-feedback-ok').addEventListener('click', () => {
  $('feedback-popup').classList.add('hidden');
  nextQuestion();
});

function nextQuestion() {
  state.currentQIndex++;
  if (state.currentQIndex >= state.currentQuestions.length) {
    finishLevel();
  } else {
    renderQuestion();
  }
}

/* ── Finish Level ────────────────────────────────*/
function finishLevel() {
  const levelId = state.currentLevel;
  const sc = state.levelScores[levelId];
  const pct = sc.max > 0 ? Math.round((sc.score/sc.max)*100) : 0;

  $('result-score-val').textContent = sc.score;
  $('result-score-max').textContent = `/ ${sc.max}`;
  const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 75 ? '⭐⭐' : pct >= 60 ? '⭐' : '';
  $('result-stars').textContent = stars;
  const cfg = LEVELS_CONFIG.find(l=>l.id===levelId);
  $('result-title').textContent = `ผ่านด่าน ${cfg?.name||levelId}!`;
  const msg = pct >= 90 ? 'ยอดเยี่ยมมาก! คุณเป็น Electron Master!' : pct >= 75 ? 'เก่งมาก!' : pct >= 60 ? 'ผ่านแล้ว! ลองทบทวนเพิ่มเติมนะ' : 'ยังต้องฝึกอีกนิด ลองอ่านบทเรียนอีกครั้ง';
  $('result-msg').textContent = msg;

  const nextId = levelId + 1;
  const hasNext = LEVELS_CONFIG.find(l=>l.id===nextId);
  $('btn-next-level').style.display = hasNext ? '' : 'none';
  if (!hasNext) {
    // จบทุกด่านแล้ว → Certificate
    $('btn-next-level').style.display = '';
    $('btn-next-level').textContent = '🏆 ดูใบประกาศ';
    $('btn-next-level').onclick = () => showCertificate();
  } else {
    $('btn-next-level').textContent = `➡️ ด่านถัดไป (${nextId})`;
    $('btn-next-level').onclick = () => startLearnFlow(nextId);
  }

  showPage('page-level-result');
}

/* ── Certificate ─────────────────────────────────*/
function showCertificate() {
  const st = state.student;
  $('cert-name').textContent = st.name || 'นักเรียน';
  $('cert-class').textContent = st.class || '—';
  $('cert-no').textContent = st.no || '—';
  $('cert-date').textContent = new Date().toLocaleDateString('th-TH', {year:'numeric',month:'long',day:'numeric'});

  let total=0, max=0;
  LEVELS_CONFIG.forEach(cfg => {
    const sc = state.levelScores[cfg.id];
    if (sc) { total += sc.score; max += sc.max; }
  });
  $('cert-total-score').textContent = total;
  $('cert-total-max').textContent = `/ ${max}`;
  const pct = max>0 ? Math.round((total/max)*100) : 0;
  let rank = pct>=90?'⭐ Electron Master':pct>=75?'⭐ Atomic Explorer':pct>=60?'⭐ Orbit Trainee':'🔄 Try Again Hero';
  $('cert-rank').textContent = rank;

  // breakdown
  const bd = $('cert-breakdown');
  bd.innerHTML = LEVELS_CONFIG.map(cfg=>{
    const sc = state.levelScores[cfg.id];
    if(!sc) return '';
    const p = sc.max>0?Math.round((sc.score/sc.max)*100):0;
    return `<div class="cert-bd-item"><span class="bd-label">ด่าน ${cfg.id}: ${cfg.name}</span><br><span class="bd-val">${sc.score}/${sc.max} (${p}%)</span></div>`;
  }).join('');

  showPage('page-cert');
}

/* ── Save & Download ─────────────────────────────*/
function buildRecord() {
  let total=0, max=0;
  LEVELS_CONFIG.forEach(cfg => {
    const sc = state.levelScores[cfg.id];
    if(sc){ total+=sc.score; max+=sc.max; }
  });
  const pct = max>0?Math.round((total/max)*100):0;
  const rank = pct>=90?'Electron Master':pct>=75?'Atomic Explorer':pct>=60?'Orbit Trainee':'Try Again Hero';
  return {
    date: new Date().toLocaleString('th-TH'),
    name: state.student.name,
    class: state.student.class,
    no: state.student.no,
    total, max, pct, rank,
    levels: JSON.stringify(state.levelScores),
  };
}

$('btn-save-result').addEventListener('click', () => {
  saveScore(buildRecord());
  alert('บันทึกผลเรียบร้อย!');
});

$('btn-dl-csv').addEventListener('click', () => {
  const r = buildRecord();
  const rows = [
    ['วันที่','ชื่อ','ชั้น','เลขที่','คะแนนรวม','คะแนนเต็ม','%','ระดับ'],
    [r.date, r.name, r.class, r.no, r.total, r.max, r.pct+'%', r.rank]
  ];
  downloadCSV('ผลการเรียน.csv', rows);
});

function downloadCSV(filename, rows) {
  const bom = '\uFEFF';
  const csv = bom + rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ── Admin ───────────────────────────────────────*/
$('btn-admin-open').addEventListener('click', () => {
  $('inp-admin-pw').value = '';
  $('admin-login-err').classList.add('hidden');
  $('modal-admin-login').classList.remove('hidden');
});
$('btn-admin-cancel').addEventListener('click', () => $('modal-admin-login').classList.add('hidden'));
$('btn-admin-login').addEventListener('click', () => {
  if ($('inp-admin-pw').value === 'teacher2569') {
    $('modal-admin-login').classList.add('hidden');
    loadAdminDash();
    showPage('page-admin');
  } else {
    $('admin-login-err').classList.remove('hidden');
  }
});
$('inp-admin-pw').addEventListener('keydown', e => { if(e.key==='Enter') $('btn-admin-login').click(); });

function loadAdminDash() {
  const scores = loadScores();
  $('stat-count').textContent = scores.length;
  if (scores.length === 0) {
    $('stat-avg').textContent = '—';
    $('stat-max').textContent = '—';
    $('stat-min').textContent = '—';
    $('admin-tbody').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text3)">ยังไม่มีข้อมูล</td></tr>';
    return;
  }
  const pcts = scores.map(s=>s.pct||0);
  $('stat-avg').textContent = Math.round(pcts.reduce((a,b)=>a+b,0)/pcts.length);
  $('stat-max').textContent = Math.max(...pcts);
  $('stat-min').textContent = Math.min(...pcts);
  $('admin-tbody').innerHTML = scores.map(s=>`<tr>
    <td>${s.name}</td><td>${s.class}</td><td>${s.no}</td>
    <td>${s.total}/${s.max}</td><td>${s.pct}%</td><td>${s.rank}</td><td>${s.date}</td>
  </tr>`).join('');
}

$('btn-admin-back').addEventListener('click', () => showPage('page-landing'));
$('btn-admin-dl').addEventListener('click', () => {
  const scores = loadScores();
  const rows = [['วันที่','ชื่อ','ชั้น','เลขที่','คะแนน','%','ระดับ'],
    ...scores.map(s=>[s.date,s.name,s.class,s.no,`${s.total}/${s.max}`,s.pct+'%',s.rank])];
  downloadCSV('คะแนนนักเรียนทั้งหมด.csv', rows);
});
$('btn-admin-clear').addEventListener('click', () => {
  if (confirm('ต้องการล้างข้อมูลนักเรียนทั้งหมดในเครื่องนี้ใช่หรือไม่?\n(ไม่สามารถกู้คืนได้)')) {
    if (confirm('ยืนยันอีกครั้ง: ล้างข้อมูลทั้งหมด?')) {
      clearAllScores();
      loadAdminDash();
      alert('ล้างข้อมูลแล้ว');
    }
  }
});

/* ── Landing buttons ────────────────────────────*/
$('btn-start-learn').addEventListener('click', () => {
  if (!validateStudent()) return;
  startLearnFlow(1);
});
$('btn-start-quiz').addEventListener('click', () => {
  if (!validateStudent()) return;
  startLevelGame(7); // Final Boss เลย
});
$('btn-guide').addEventListener('click', () => showPage('page-guide'));
$('btn-guide-back').addEventListener('click', () => showPage('page-landing'));
$('btn-guide-close').addEventListener('click', () => showPage('page-landing'));

/* ── Game Controls ───────────────────────────────*/
$('btn-check').addEventListener('click', checkAnswer);
$('btn-next').addEventListener('click', () => {
  $('feedback-popup').classList.add('hidden');
  nextQuestion();
});
$('btn-hint').addEventListener('click', () => {
  const q = state.currentQuestions[state.currentQIndex];
  if (!q || state.answered) return;
  state.hintUsed = true;
  $('modal-hint-text').textContent = q.hint || 'ไม่มีคำใบ้สำหรับข้อนี้';
  $('modal-hint').classList.remove('hidden');
});
$('btn-hint-close').addEventListener('click', () => $('modal-hint').classList.add('hidden'));
$('btn-review-lesson').addEventListener('click', () => {
  const cfg = LEVELS_CONFIG.find(l=>l.id===state.currentLevel);
  if (cfg?.lessonId) showLesson(cfg.lessonId, () => {
    showPage('page-game');
    renderQuestion();
  });
  else alert('ไม่มีบทเรียนสำหรับด่านนี้');
});
$('btn-restart-level').addEventListener('click', () => {
  if (confirm('เริ่มด่านนี้ใหม่?')) startLevelGame(state.currentLevel);
});

/* ── Game Over ───────────────────────────────────*/
$('btn-go-retry').addEventListener('click', () => {
  $('gameover-popup').classList.add('hidden');
  startLevelGame(state.currentLevel);
});

/* ── Level Result ────────────────────────────────*/
$('btn-retry-level').addEventListener('click', () => startLevelGame(state.currentLevel));
$('btn-back-home').addEventListener('click', () => goHome());

/* ── Cert buttons ────────────────────────────────*/
$('btn-cert-home').addEventListener('click', () => goHome());

/* ── Keyboard support ───────────────────────────*/
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !$('feedback-popup').classList.contains('hidden')) {
    $('btn-feedback-ok').click();
  }
});

/* ── Init ────────────────────────────────────────*/
(function init() {
  showPage('page-landing');
  // Load saved student name if any
  const lastStudent = localStorage.getItem('electronOrbitQuest_student');
  if (lastStudent) {
    try {
      const s = JSON.parse(lastStudent);
      $('inp-name').value = s.name || '';
      $('inp-class').value = s.class || '';
      $('inp-no').value = s.no || '';
    } catch(_) {}
  }
  // Save student on input
  ['inp-name','inp-class','inp-no'].forEach(id => {
    $(id).addEventListener('input', () => {
      localStorage.setItem('electronOrbitQuest_student', JSON.stringify({
        name: $('inp-name').value,
        class: $('inp-class').value,
        no: $('inp-no').value,
      }));
    });
  });
})();
