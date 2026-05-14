import { useState, useRef, useEffect } from "react";

// ─── RESPONSIVE ─────────────────────────────────────────────
const useIsMobile = (bp = 768) => {
  const [m, setM] = useState(() => window.innerWidth <= bp);
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return m;
};

// ─── THEME ──────────────────────────────────────────────────
const T = {
  bg: "#0A0A0F",
  card: "#151519",
  cardLight: "#1C1C22",
  border: "rgba(255,255,255,0.06)",
  accent: "#215FF6",       // warm amber
  accentGrad: "linear-gradient(135deg, #215FF6, #1846B9)",
  accentSoft: "rgba(33,93,246,0.12)",
  purple: "#7C5CFC",
  text: "#F0F0F2",
  textSec: "#A0A0B0",
  textMuted: "#555568",
  heart: "#FF4D6A",
  green: "#22C55E",
  shadow: "0 4px 20px rgba(0,0,0,0.5)",
  ring: "linear-gradient(135deg, #215FF6, #1846B9, #0A2D7A)",
};

// ─── USERS ──────────────────────────────────────────────────
const USERS = [
  { id: "u1", name: "Mello", handle: "@mello", avatar: "M", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #215FF6, #1846B9)", bio: "Building the future with code. Full-stack dev & creative technologist.", followers: 2847, following: 412, posts: 126, views: "234K", likes: "89K", verified: true },
  { id: "u2", name: "Budiarti Rohman", handle: "@budiartirhm", avatar: "B", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #215FF6, #0A2D7A)", bio: "Entrepreneur | Investor | Visionary\n@budiartidesign - Building the future\nVisit us budiartigroup.com", followers: 1200000, following: 868, posts: 2685, views: "868K", likes: "234K", verified: true },
  { id: "u3", name: "Michael Torres", handle: "@michaelt", avatar: "M", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #3B82F6, #6366F1)", bio: "Photographer & visual storyteller. Finding beauty in chaos.", followers: 45200, following: 312, posts: 890, views: "1.2M", likes: "456K", verified: true },
  { id: "u4", name: "Cornelia", handle: "@cornelia_a", avatar: "C", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #EC4899, #A855F7)", bio: "Travel creator. 40+ countries explored.", followers: 89000, following: 234, posts: 567, views: "2.1M", likes: "780K", verified: false },
  { id: "u5", name: "Kim_20", handle: "@kim_20", avatar: "K", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #F59E0B, #EF4444)", bio: "Fashion & street culture.", followers: 32000, following: 188, posts: 345, views: "560K", likes: "120K", verified: false },
  { id: "u6", name: "Angela", handle: "@angela.r", avatar: "A", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", gradient: "linear-gradient(135deg, #10B981, #059669)", bio: "Creative director. Visual storytelling.", followers: 67000, following: 402, posts: 789, views: "1.5M", likes: "340K", verified: true },
];
const ME = USERS[0];

// ─── PHOTOS ─────────────────────────────────────────────────
const PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",  // 0 mountain
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1000&fit=crop",  // 1 beach
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop",  // 2 forest
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1000&fit=crop",  // 3 road trip
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1000&fit=crop",  // 4 mountain peak
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=1000&fit=crop",  // 5 aerial forest
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop",  // 6 concert
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=1000&fit=crop",    // 7 urban city
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1000&fit=crop",  // 8 mountain stars
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=1000&fit=crop",  // 9 cliff ocean
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=1000&fit=crop",    // 10 pool hotel
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=1000&fit=crop",  // 11 green hills
];

const POSTS = [
  { id: "p1", userId: "u3", imgIdx: 0, caption: "Standing on top of the world. The silence up here speaks volumes.", likes: 25000, comments: 4568, saves: 680, time: "2h", liked: false },
  { id: "p2", userId: "u4", imgIdx: 3, caption: "Road less traveled. Every mile is a new story waiting to unfold.", likes: 18400, comments: 2340, saves: 420, time: "4h", liked: true },
  { id: "p3", userId: "u5", imgIdx: 7, caption: "City lights and late nights. The urban jungle never disappoints.", likes: 12800, comments: 1890, saves: 310, time: "6h", liked: false },
  { id: "p4", userId: "u6", imgIdx: 1, caption: "Salt water therapy. The ocean heals everything.", likes: 34200, comments: 5670, saves: 890, time: "8h", liked: true },
  { id: "p5", userId: "u2", imgIdx: 8, caption: "Under a billion stars. Camping in the mountains hits different.", likes: 45600, comments: 7800, saves: 1200, time: "12h", liked: false },
];

const STORIES = [
  { userId: "u1", label: "Add Story", isAdd: true },
  { userId: "u4", label: "Cornelia" },
  { userId: "u5", label: "Kim_20" },
  { userId: "u6", label: "Angela" },
  { userId: "u2", label: "Budiarti" },
  { userId: "u3", label: "Michael" },
];

const DISCOVER_IMAGES = [
  { idx: 4, tall: true, views: "24K" },
  { idx: 7, tall: false, views: "18K" },
  { idx: 1, tall: false, views: "32K" },
  { idx: 9, tall: true, views: "45K" },
  { idx: 6, tall: false, views: "12K" },
  { idx: 3, tall: true, views: "8.9K" },
  { idx: 5, tall: false, views: "56K" },
  { idx: 8, tall: false, views: "21K" },
  { idx: 10, tall: true, views: "15K" },
  { idx: 2, tall: false, views: "67K" },
  { idx: 11, tall: false, views: "9.2K" },
  { idx: 0, tall: true, views: "38K" },
];

const CONVERSATIONS = [
  { id: "c1", userId: "u2", lastMessage: "That editorial was incredible!", time: "5m", unread: 3 },
  { id: "c2", userId: "u3", lastMessage: "New shoot location found", time: "1h", unread: 0 },
  { id: "c3", userId: "u4", lastMessage: "Collab on the next piece?", time: "3h", unread: 1 },
  { id: "c4", userId: "u5", lastMessage: "The code review is done", time: "1d", unread: 0 },
  { id: "c5", userId: "u6", lastMessage: "Render is looking amazing", time: "2d", unread: 0 },
];
const MESSAGES_DATA = {
  c1: [
    { id: "m1", from: "u2", text: "That latest editorial was incredible", time: "10:30 AM" },
    { id: "m2", from: "u1", text: "Thanks! Took ages to get the lighting right", time: "10:32 AM" },
    { id: "m3", from: "u2", text: "It shows. The mood is perfect.", time: "10:33 AM" },
    { id: "m4", from: "u1", text: "Thinking of doing a series", time: "10:35 AM" },
    { id: "m5", from: "u2", text: "Count me in. Let's plan it out.", time: "10:36 AM" },
  ],
};

// ─── STYLES ─────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body, #root { height:100%; width:100%; }
    body { background:${T.bg}; font-family:'Inter',-apple-system,sans-serif; color:${T.text}; overflow:hidden; -webkit-text-size-adjust:100%; }
    @keyframes fade-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
    @keyframes heart-pop { 0%{transform:scale(0);opacity:1} 50%{transform:scale(1.3);opacity:1} 100%{transform:scale(0);opacity:0} }
    @keyframes heart-btn { 0%{transform:scale(1)} 50%{transform:scale(1.25)} 100%{transform:scale(1)} }
    ::-webkit-scrollbar{width:0;height:0}
    textarea,input{font-family:'Inter',sans-serif}
    input::placeholder{color:${T.textMuted}}
  `}</style>
);

// ─── ICONS ──────────────────────────────────────────────────
const Ic = ({ d, size = 22, stroke = "currentColor", fill = "none", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const I = {
  home: p=><Ic {...p} d={["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"]} />,
  search: p=><Ic {...p} d={["M11 3a8 8 0 100 16 8 8 0 000-16z","M21 21l-4.35-4.35"]} />,
  compass: p=><Ic {...p} d={["M12 2a10 10 0 100 20 10 10 0 000-20z","M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"]} />,
  message: p=><Ic {...p} d={["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"]} />,
  heart: p=><Ic {...p} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  comment: p=><Ic {...p} d={["M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"]} />,
  send: p=><Ic {...p} d={["M22 2L11 13","M22 2l-7 20-4-9-9-4z"]} />,
  bookmark: p=><Ic {...p} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />,
  plus: p=><Ic {...p} d={["M12 5v14","M5 12h14"]} />,
  grid: p=><Ic {...p} d={["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"]} />,
  play: p=><Ic {...p} d="M5 3l14 9-14 9V3z" />,
  user: p=><Ic {...p} d={["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 3a4 4 0 100 8 4 4 0 000-8z"]} />,
  bell: p=><Ic {...p} d={["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"]} />,
  back: p=><Ic {...p} d={["M19 12H5","M12 19l-7-7 7-7"]} />,
  more: p=><Ic {...p} d={["M12 13a1 1 0 100-2 1 1 0 000 2z","M19 13a1 1 0 100-2 1 1 0 000 2z","M5 13a1 1 0 100-2 1 1 0 000 2z"]} sw={2} />,
  settings: p=><Ic {...p} d={["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"]} />,
  link: p=><Ic {...p} d={["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71","M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"]} />,
  eye: p=><Ic {...p} d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 100 6 3 3 0 000-6z"]} />,
  check: p=><Ic {...p} d={["M20 6L9 17l-5-5"]} />,
  film: p=><Ic {...p} d={["M7 2v20","M17 2v20","M2 12h20","M2 7h5","M2 17h5","M17 7h5","M17 17h5","M2 2h20v20H2z"]} />,
  tag: p=><Ic {...p} d={["M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z","M7 7h.01"]} />,
  shop: p=><Ic {...p} d={["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"]} />,
};

const fmt = n => { if(n>=1e6) return (n/1e6).toFixed(1).replace(".0","")+"M"; if(n>=1e3) return (n/1e3).toFixed(1).replace(".0","")+"K"; return n; };

// ─── AVATAR ─────────────────────────────────────────────────
const Avatar = ({ user, size = 32, ring = false, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div onClick={onClick} style={{ position:"relative", flexShrink:0, cursor: onClick?"pointer":"default" }}>
      {ring && <div style={{ position:"absolute", inset:-3, borderRadius:"50%", background:T.ring, padding:2 }}><div style={{ width:"100%",height:"100%",borderRadius:"50%",background:T.bg }} /></div>}
      <div style={{ width:size, height:size, borderRadius:"50%", background:user.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.38, fontWeight:700, color:"#fff", position:"relative", zIndex:1, overflow:"hidden" }}>
        {user.photo ? (
          <>
            {!imgLoaded && user.avatar}
            <img src={user.photo} alt="" loading="lazy" onLoad={()=>setImgLoaded(true)} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:imgLoaded?1:0, transition:"opacity 0.3s" }} />
          </>
        ) : user.avatar}
      </div>
    </div>
  );
};

// ─── PHOTO ──────────────────────────────────────────────────
const Photo = ({ idx, aspect="1/1", radius=16, children, style:s={} }) => {
  const [ld, setLd] = useState(false);
  return (
    <div style={{ width:"100%", aspectRatio:aspect, borderRadius:radius, background:T.card, position:"relative", overflow:"hidden", ...s }}>
      <img src={PHOTOS[idx%PHOTOS.length]} alt="" loading="lazy" onLoad={()=>setLd(true)} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:ld?1:0, transition:"opacity 0.4s" }} />
      {children}
    </div>
  );
};

// ─── VERIFIED BADGE ─────────────────────────────────────────
const Verified = ({ size = 14 }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:T.accent, display:"inline-flex", alignItems:"center", justifyContent:"center", marginLeft:4, flexShrink:0 }}>
    <I.check size={size*0.65} stroke="#fff" sw={3} />
  </div>
);

// ═══════════════════════════════════════════════════════════
// STORIES ROW
// ═══════════════════════════════════════════════════════════
const StoriesRow = () => (
  <div style={{ display:"flex", gap:14, padding:"14px 16px", overflowX:"auto" }}>
    {STORIES.map((s,i) => {
      const u = USERS.find(x=>x.id===s.userId);
      return (
        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, minWidth:60, cursor:"pointer" }}>
          <div style={{ position:"relative" }}>
            {s.isAdd ? (
              <div style={{ width:52, height:52, borderRadius:"50%", border:`2px dashed ${T.textMuted}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:u.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:700, color:"#fff", overflow:"hidden", position:"relative" }}>
                  {u.photo ? <img src={u.photo} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} /> : u.avatar}
                </div>
                <div style={{ position:"absolute", bottom:-2, right:-2, width:18, height:18, borderRadius:"50%", background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.bg}`, zIndex:2 }}>
                  <I.plus size={10} stroke="#fff" sw={3} />
                </div>
              </div>
            ) : (
              <Avatar user={u} size={52} ring />
            )}
          </div>
          <span style={{ fontSize:10, color:T.textSec, maxWidth:56, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.label}</span>
        </div>
      );
    })}
  </div>
);

// ═══════════════════════════════════════════════════════════
// FEED PAGE — All-overlay card posts (like reference)
// ═══════════════════════════════════════════════════════════
const FeedPage = ({ isMobile, goToProfile }) => {
  const [posts, setPosts] = useState(POSTS);
  const [heartAnim, setHeartAnim] = useState(null);

  const toggleLike = id => setPosts(p=>p.map(x=>x.id===id?{...x,liked:!x.liked,likes:x.liked?x.likes-1:x.likes+1}:x));
  const dblLike = id => { setPosts(p=>p.map(x=>x.id===id?{...x,liked:true,likes:x.liked?x.likes:x.likes+1}:x)); setHeartAnim(id); setTimeout(()=>setHeartAnim(null),800); };

  return (
    <div style={{ paddingBottom:20 }}>
      <StoriesRow />
      <div style={{ display:"flex", flexDirection:"column", gap:16, padding:"0 14px" }}>
        {posts.map((post,i) => {
          const author = USERS.find(u=>u.id===post.userId);
          return (
            <div key={post.id} onDoubleClick={()=>dblLike(post.id)} style={{
              borderRadius:24, overflow:"hidden", position:"relative", cursor:"pointer",
              animation:`fade-in 0.3s ease ${i*0.06}s both`,
            }}>
              <Photo idx={post.imgIdx} aspect={isMobile?"4/5":"3/4"} radius={0}>
                {/* Full overlay gradients — top and bottom */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%)" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 55%)" }} />

                {/* ── User info: TOP LEFT ── */}
                <div style={{ position:"absolute", top:0, left:0, right:0, padding:16, display:"flex", alignItems:"center", gap:10 }}>
                  <div onClick={(e)=>{e.stopPropagation(); goToProfile(author.id);}} style={{
                    width:36, height:36, borderRadius:"50%",
                    border:"2px solid rgba(255,255,255,0.3)",
                    background:author.gradient,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", flexShrink:0,
                    overflow:"hidden", position:"relative",
                  }}>
                    {author.photo ? <img src={author.photo} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} /> : author.avatar}
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ fontWeight:700, color:"#fff", fontSize:13 }}>{author.name}</span>
                      {author.verified && <Verified size={13} />}
                    </div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{post.time} ago</div>
                  </div>
                </div>

                {/* ── Caption + Actions: BOTTOM ── */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:16 }}>
                  {/* Caption */}
                  <div style={{
                    fontSize:13, color:"rgba(255,255,255,0.9)", lineHeight:1.55,
                    marginBottom:14,
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
                  }}>
                    "{post.caption}"
                  </div>

                  {/* Action bar — overlaid on image */}
                  <div style={{ display:"flex", alignItems:"center", gap:0 }}>
                    <button onClick={(e)=>{e.stopPropagation(); toggleLike(post.id);}} style={{
                      display:"flex", alignItems:"center", gap:5, padding:"6px 12px 6px 0",
                      background:"none", border:"none",
                      color: post.liked ? T.heart : "#fff",
                      cursor:"pointer", fontSize:12.5, fontWeight:600, fontFamily:"'Inter',sans-serif",
                      animation: post.liked ? "heart-btn 0.3s" : "none",
                    }}>
                      <I.heart size={19} fill={post.liked?T.heart:"#fff"} stroke={post.liked?T.heart:"#fff"} />
                      {fmt(post.likes)}
                    </button>
                    <button style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:12.5, fontWeight:500, fontFamily:"'Inter',sans-serif" }}>
                      <I.comment size={19} fill="#fff" stroke="#fff" />
                      {fmt(post.comments)}
                    </button>
                    <button style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:12.5, fontWeight:500, fontFamily:"'Inter',sans-serif" }}>
                      <I.bookmark size={19} fill="#fff" stroke="#fff" />
                      {fmt(post.saves)}
                    </button>
                  </div>
                </div>

                {/* Heart double-tap animation */}
                {heartAnim===post.id && (
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
                    <div style={{ animation:"heart-pop 0.8s ease forwards" }}><I.heart size={72} fill="#fff" stroke="none" /></div>
                  </div>
                )}
              </Photo>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// DISCOVER PAGE — Masonry grid
// ═══════════════════════════════════════════════════════════
const DiscoverPage = ({ isMobile }) => {
  const [tab, setTab] = useState("Popular");
  const tabs = ["Popular","Latest","Sports","Traveling","News"];

  // Split into 2 columns for masonry
  const col1 = DISCOVER_IMAGES.filter((_,i)=>i%2===0);
  const col2 = DISCOVER_IMAGES.filter((_,i)=>i%2===1);

  return (
    <div style={{ padding: isMobile?"0":"0" }}>
      <div style={{ padding:"16px 16px 6px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
          <div>
            <h1 style={{ fontSize:24, fontWeight:900, color:T.text }}>Discover</h1>
            <div style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>Find your favorite content</div>
          </div>
          <button style={{ width:40, height:40, borderRadius:12, background:T.card, border:`1px solid ${T.border}`, color:T.textSec, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <I.search size={18} />
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display:"flex", gap:6, padding:"8px 16px 14px", overflowX:"auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{
            padding:"7px 16px", borderRadius:20, border:"none",
            background: tab===t ? T.accent : T.card,
            color: tab===t ? "#FFF" : T.textSec,
            fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap",
            transition:"all 0.15s",
          }}>{t}</button>
        ))}
      </div>
      {/* Masonry grid */}
      <div style={{ display:"flex", gap:8, padding:"0 14px" }}>
        {[col1, col2].map((col,ci) => (
          <div key={ci} style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
            {col.map((img,i) => (
              <div key={i} style={{ position:"relative", cursor:"pointer" }}>
                <Photo idx={img.idx} aspect={img.tall?"3/4":"1/1"} radius={16}>
                  <div style={{ position:"absolute", bottom:8, left:8, display:"flex", alignItems:"center", gap:4, background:"rgba(0,0,0,0.5)", borderRadius:8, padding:"3px 8px", backdropFilter:"blur(4px)" }}>
                    <I.eye size={12} stroke="#fff" />
                    <span style={{ fontSize:10, color:"#fff", fontWeight:600 }}>{img.views}</span>
                  </div>
                </Photo>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Recommended section */}
      <div style={{ padding:"24px 16px 0" }}>
        <h3 style={{ fontSize:16, fontWeight:800, color:T.text, marginBottom:14 }}>Recommended For You</h3>
        {USERS.slice(2,4).map(user => (
          <div key={user.id} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <Avatar user={user} size={40} ring />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center" }}>
                <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{user.name}</span>
                {user.verified && <Verified size={12} />}
                <span style={{ fontSize:11, color:T.textMuted, marginLeft:6 }}>4 hour ago</span>
              </div>
              <div style={{ fontSize:11, color:T.textMuted }}>{user.handle}</div>
            </div>
            <button style={{ background:"none", border:"none", color:T.textMuted, cursor:"pointer" }}><I.more size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// ACTIVITY
// ═══════════════════════════════════════════════════════════
const ActivityPage = () => {
  const notifs = [
    { user:USERS[1], action:"liked your photo.", time:"2h", imgIdx:0 },
    { user:USERS[2], action:"started following you.", time:"5h", imgIdx:null },
    { user:USERS[3], action:'commented: "Stunning!"', time:"8h", imgIdx:2 },
    { user:USERS[4], action:"saved your post.", time:"1d", imgIdx:3 },
    { user:USERS[5], action:"liked your photo.", time:"2d", imgIdx:8 },
  ];
  return (
    <div style={{ padding:"16px" }}>
      <h2 style={{ fontSize:20, fontWeight:900, marginBottom:16 }}>Activity</h2>
      {notifs.map((n,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", animation:`fade-in 0.2s ease ${i*0.04}s both` }}>
          <Avatar user={n.user} size={44} ring />
          <div style={{ flex:1, fontSize:13, lineHeight:1.5 }}>
            <span style={{ fontWeight:700 }}>{n.user.name}</span>{n.user.verified && <Verified size={11} />}{" "}
            <span style={{ color:T.textSec }}>{n.action}</span>
            <span style={{ color:T.textMuted, marginLeft:4 }}>{n.time}</span>
          </div>
          {n.imgIdx!=null ? (
            <div style={{ width:44, height:44, borderRadius:10, overflow:"hidden", flexShrink:0 }}><Photo idx={n.imgIdx} radius={0} /></div>
          ) : (
            <button style={{ padding:"6px 16px", borderRadius:10, background:T.accentGrad, border:"none", color:"#FFF", fontSize:12, fontWeight:700, cursor:"pointer" }}>Follow</button>
          )}
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// MESSAGES
// ═══════════════════════════════════════════════════════════
const MessagesPage = ({ isMobile }) => {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(MESSAGES_DATA);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,active]);
  const send = () => { if(!input.trim()||!active) return; setMsgs(p=>({...p,[active]:[...(p[active]||[]),{id:`m${Date.now()}`,from:"u1",text:input.trim(),time:"Now"}]})); setInput(""); };
  const c = active?CONVERSATIONS.find(x=>x.id===active):null;
  const cU = c?USERS.find(u=>u.id===c.userId):null;
  const cM = active?(msgs[active]||[]):[];
  const showL = isMobile?!active:true, showC = isMobile?!!active:!!active;

  return (
    <div style={{ display:"flex", height:"100%" }}>
      {showL && (
        <div style={{ width:isMobile?"100%":(active?280:"100%"), borderRight:isMobile?"none":`1px solid ${T.border}`, display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"16px", borderBottom:`1px solid ${T.border}` }}><h2 style={{ fontSize:20, fontWeight:900 }}>Messages</h2></div>
          <div style={{ flex:1, overflowY:"auto" }}>
            {CONVERSATIONS.map(cv=>{const u=USERS.find(x=>x.id===cv.userId); return (
              <div key={cv.id} onClick={()=>setActive(cv.id)} style={{ padding:"12px 16px", display:"flex", gap:12, alignItems:"center", cursor:"pointer", background:active===cv.id?T.accentSoft:"transparent" }}>
                <Avatar user={u} size={46} ring />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:cv.unread?700:500, color:T.text, fontSize:14 }}>{u.name}</div>
                  <div style={{ fontSize:12, color:cv.unread?T.textSec:T.textMuted, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{cv.lastMessage} · {cv.time}</div>
                </div>
                {cv.unread>0 && <div style={{ width:8, height:8, borderRadius:"50%", background:T.accent }} />}
              </div>
            );})}
          </div>
        </div>
      )}
      {showC && cU && (
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"10px 16px", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${T.border}` }}>
            <button onClick={()=>setActive(null)} style={{ background:"none", border:"none", color:T.text, cursor:"pointer" }}><I.back size={22} /></button>
            <Avatar user={cU} size={32} ring />
            <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14 }}>{cU.name}</div><div style={{ fontSize:11, color:T.green }}>Active now</div></div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"16px 12px", display:"flex", flexDirection:"column", gap:6 }}>
            {cM.map(m=>{const me=m.from==="u1"; return (
              <div key={m.id} style={{ display:"flex", justifyContent:me?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"75%", padding:"10px 14px", borderRadius:me?"16px 16px 4px 16px":"16px 16px 16px 4px", background:me?T.accentGrad:T.card, border:me?"none":`1px solid ${T.border}`, color:me?"#FFF":T.text, fontSize:14, lineHeight:1.5, fontWeight:me?600:400 }}>{m.text}</div>
              </div>
            );})}
            <div ref={endRef} />
          </div>
          <div style={{ padding:"10px 12px", borderTop:`1px solid ${T.border}`, display:"flex", gap:10, alignItems:"center", paddingBottom:isMobile?"calc(10px + env(safe-area-inset-bottom,0px))":"10px" }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Message..." style={{ flex:1, padding:"10px 16px", borderRadius:14, border:`1px solid ${T.border}`, background:T.card, color:T.text, fontSize:14, outline:"none" }} />
            {input.trim() && <button onClick={send} style={{ background:"none", border:"none", color:T.accent, fontWeight:700, fontSize:14, cursor:"pointer" }}>Send</button>}
          </div>
        </div>
      )}
      {!active && !isMobile && (
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
          <I.send size={48} stroke={T.textMuted} /><div style={{ fontSize:16, fontWeight:600 }}>Your Messages</div><div style={{ fontSize:13, color:T.textMuted }}>Start a conversation</div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// PROFILE — Matching reference design
// ═══════════════════════════════════════════════════════════
const ProfilePage = ({ userId="u1", onBack, isMobile }) => {
  const user = USERS.find(u=>u.id===userId)||ME;
  const isOwn = userId==="u1";
  const [tab, setTab] = useState("photos");
  const imgs = Array.from({length:12},(_,i)=>(i*3+USERS.indexOf(user))%12);

  return (
    <div>
      {/* ── Warm cover header area ── */}
      <div style={{
        background: `linear-gradient(to bottom, ${user.gradient.includes("#215FF6") ? "rgba(20,55,180,0.25)" : "rgba(10,30,90,0.2)"} 0%, ${T.bg} 100%)`,
        paddingBottom: 0,
      }}>
        {/* Top nav row */}
        <div style={{ padding:"12px 16px 0", display:"flex", alignItems:"center" }}>
          {!isOwn && <button onClick={onBack} style={{ background:"none", border:"none", color:T.text, cursor:"pointer", marginRight:8 }}><I.back size={22} /></button>}
          <div style={{ flex:1 }} />
          <button style={{ background:"none", border:"none", color:T.textSec, cursor:"pointer", padding:4 }}><I.settings size={20} /></button>
          <button style={{ background:"none", border:"none", color:T.textSec, cursor:"pointer", padding:4, marginLeft:4 }}><I.more size={20} /></button>
        </div>

        {/* Avatar + name centered */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 16px 20px" }}>
          <div style={{
            width:86, height:86, borderRadius:"50%",
            background:T.ring, padding:3,
            boxShadow:"0 0 24px rgba(33,93,246,0.2)",
          }}>
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:T.bg, padding:2 }}>
              <div style={{
                width:"100%", height:"100%", borderRadius:"50%",
                background:user.gradient,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:32, fontWeight:800, color:"#fff",
                overflow:"hidden", position:"relative",
              }}>
                {user.photo ? <img src={user.photo} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} /> : user.avatar}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", marginTop:12 }}>
            <span style={{ fontSize:18, fontWeight:800 }}>{user.name}</span>
            {user.verified && <Verified size={16} />}
          </div>
          <div style={{ fontSize:12, color:T.textMuted, marginTop:3 }}>{user.handle}</div>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:10, marginTop:14 }}>
            {isOwn ? (
              <button style={{ padding:"8px 32px", borderRadius:10, background:T.card, border:`1px solid ${T.border}`, color:T.text, fontSize:13, fontWeight:700, cursor:"pointer" }}>Edit Profile</button>
            ) : (
              <>
                <button style={{ padding:"8px 22px", borderRadius:10, background:T.accentGrad, border:"none", color:"#FFF", fontSize:12, fontWeight:700, cursor:"pointer" }}>Following</button>
                <button style={{ padding:"8px 22px", borderRadius:10, background:T.card, border:`1px solid ${T.border}`, color:T.text, fontSize:12, fontWeight:700, cursor:"pointer" }}>Message</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display:"flex", margin:"0 14px", padding:"14px 0",
        borderRadius:16, background:T.card,
        border:`1px solid ${T.border}`,
      }}>
        {[
          { v:fmt(user.posts), l:"Post" },
          { v:fmt(user.followers), l:"Followers" },
          { v:user.views, l:"Views" },
          { v:user.likes, l:"Likes" },
        ].map((s,i) => (
          <div key={i} style={{ flex:1, textAlign:"center", borderRight:i<3?`1px solid ${T.border}`:"none" }}>
            <div style={{ fontWeight:800, color:T.text, fontSize:15 }}>{s.v}</div>
            <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Bio ── */}
      <div style={{ padding:"14px 18px", fontSize:13, color:T.textSec, lineHeight:1.7 }}>
        <div style={{ whiteSpace:"pre-line" }}>{user.bio}</div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ display:"flex", margin:"0 14px", borderRadius:14, background:T.card, border:`1px solid ${T.border}`, overflow:"hidden" }}>
        {[
          {id:"photos",icon:I.grid,label:"Photos"},
          {id:"subscription",icon:I.heart,label:"Subs"},
          {id:"reels",icon:I.film,label:"Reels"},
          {id:"product",icon:I.shop,label:"Product"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:"10px 0 8px", border:"none",
            background:tab===t.id?T.accentSoft:"transparent",
            cursor:"pointer",
            color:tab===t.id?T.accent:T.textMuted,
            borderBottom:tab===t.id?`2px solid ${T.accent}`:"2px solid transparent",
            display:"flex", flexDirection:"column", alignItems:"center", gap:3,
            fontSize:9.5, fontWeight:600, fontFamily:"'Inter',sans-serif",
          }}>
            <t.icon size={18} sw={tab===t.id?2.2:1.8} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Photo grid ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6, padding:"12px 14px 20px" }}>
        {imgs.map((idx,i)=>(
          <div key={i} style={{ borderRadius:14, overflow:"hidden", cursor:"pointer" }}>
            <Photo idx={idx} radius={0} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// BOTTOM TAB BAR — floating frosted glass pill
// ═══════════════════════════════════════════════════════════
const TabBar = ({ page, setPage, goToProfile }) => (
  <div style={{
    position:"absolute", bottom:0, left:0, right:0,
    display:"flex", justifyContent:"center",
    paddingBottom:"calc(10px + env(safe-area-inset-bottom, 0px))",
    pointerEvents:"none",
  }}>
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-evenly",
      width:"85%", maxWidth:340,
      height:56, borderRadius:28,
      background:"rgba(30,30,40,0.65)",
      backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
      border:"1px solid rgba(255,255,255,0.08)",
      boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
      pointerEvents:"auto",
    }}>
      {[
        { id:"feed", icon:I.home },
        { id:"discover", icon:I.search },
        { id:"create", icon:I.plus },
        { id:"activity", icon:I.bell },
        { id:"profile", icon:I.user },
      ].map(tab=>{
        if(tab.id==="create") return (
          <button key="create" style={{
            width:44, height:44, borderRadius:"50%",
            background:"#fff", border:"none",
            color:"#000", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 12px rgba(255,255,255,0.2)",
          }}>
            <I.plus size={22} stroke="#000" sw={2.5} />
          </button>
        );
        if(tab.id==="profile") return (
          <button key="profile" onClick={()=>goToProfile("u1")} style={{
            background:"none", border:"none", cursor:"pointer", padding:6,
          }}>
            <I.user size={24} stroke={page==="profile"?"#fff":"rgba(255,255,255,0.45)"} sw={page==="profile"?2.2:1.8} />
          </button>
        );
        const a=page===tab.id;
        return (
          <button key={tab.id} onClick={()=>setPage(tab.id)} style={{
            background:"none", border:"none",
            color:a?"#fff":"rgba(255,255,255,0.45)",
            cursor:"pointer", padding:6,
          }}>
            <tab.icon size={24} sw={a?2.2:1.8} />
          </button>
        );
      })}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// DESKTOP SIDEBAR
// ═══════════════════════════════════════════════════════════
const DesktopSidebar = ({ page, setPage, goToProfile }) => (
  <div style={{
    width:220, background:T.card, borderRight:`1px solid ${T.border}`,
    display:"flex", flexDirection:"column", padding:"20px 12px", flexShrink:0,
  }}>
    {/* User */}
    <div onClick={()=>goToProfile("u1")} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"0 0 20px", cursor:"pointer", borderBottom:`1px solid ${T.border}`, marginBottom:10 }}>
      <div style={{ width:56, height:56, borderRadius:"50%", background:T.ring, padding:2, boxShadow:"0 0 20px rgba(33,93,246,0.25)" }}>
        <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:T.card, padding:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:ME.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:"#fff", overflow:"hidden", position:"relative" }}>
            {ME.photo ? <img src={ME.photo} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} /> : ME.avatar}
          </div>
        </div>
      </div>
      <div style={{ fontSize:14, fontWeight:700, marginTop:10 }}>{ME.name}</div>
      <div style={{ fontSize:11, color:T.textMuted }}>{ME.handle}</div>
    </div>

    <nav style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }}>
      {[
        {id:"feed",icon:I.home,label:"Feed"},
        {id:"discover",icon:I.compass,label:"Discover"},
        {id:"messages",icon:I.message,label:"Messages",badge:3},
        {id:"activity",icon:I.bell,label:"Activity"},
        {id:"profile",icon:I.user,label:"Profile"},
      ].map(item=>{
        const a = page===item.id||(item.id==="profile"&&page==="profile");
        return (
          <button key={item.id} onClick={()=>item.id==="profile"?goToProfile("u1"):setPage(item.id)} style={{
            display:"flex", alignItems:"center", gap:11, padding:"10px 12px",
            borderRadius:12, border:"none",
            background:a?T.accentSoft:"transparent",
            color:a?T.accent:T.textSec,
            fontSize:13, fontWeight:a?700:500,
            fontFamily:"'Inter',sans-serif",
            cursor:"pointer", textAlign:"left",
          }}>
            <item.icon size={18} sw={a?2.2:1.8} />
            {item.label}
            {item.badge>0 && <div style={{ marginLeft:"auto", minWidth:16, height:16, borderRadius:8, background:T.heart, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", padding:"0 4px" }}>{item.badge}</div>}
          </button>
        );
      })}
    </nav>

    <button style={{
      display:"flex", alignItems:"center", justifyContent:"center", gap:7,
      padding:"10px 0", borderRadius:12, border:"none",
      background:T.accentGrad, color:"#FFF",
      fontSize:13, fontWeight:700, cursor:"pointer",
      boxShadow:"0 4px 16px rgba(33,93,246,0.3)",
      fontFamily:"'Inter',sans-serif", margin:"8px 0 12px",
    }}>
      <I.plus size={16} /> New Post
    </button>
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN SHELL
// ═══════════════════════════════════════════════════════════
export default function App() {
  const isMobile = useIsMobile();
  const [page, setPage] = useState("feed");
  const [pUser, setPUser] = useState("u1");
  const goToProfile = id=>{ setPUser(id); setPage("profile"); };

  return (
    <div style={{ width:"100vw", height:"100vh", display:"flex", flexDirection:isMobile?"column":"row", background:T.bg, overflow:"hidden", position:"relative" }}>
      <GlobalStyles />

      {/* Desktop sidebar */}
      {!isMobile && <DesktopSidebar page={page} setPage={setPage} goToProfile={goToProfile} />}

      {/* Mobile top bar for feed */}
      {isMobile && page==="feed" && (
        <div style={{ height:50, padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <Avatar user={ME} size={32} ring onClick={()=>goToProfile("u1")} />
          <span style={{ fontSize:17, fontWeight:800 }}>Electric Editorial</span>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{ background:"none", border:"none", color:T.text, cursor:"pointer" }}><I.bell size={22} /></button>
            <button onClick={()=>setPage("messages")} style={{ background:"none", border:"none", color:T.text, cursor:"pointer" }}><I.message size={22} /></button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", display:"flex", justifyContent:"center" }}>
        <div style={{
          width:isMobile?"100%":(page==="discover"?"100%":520),
          maxWidth:isMobile?"100%":(page==="discover"?880:520),
          paddingTop:!isMobile?12:0,
          paddingBottom:isMobile?80:0,
        }}>
          {page==="feed" && <FeedPage isMobile={isMobile} goToProfile={goToProfile} />}
          {page==="discover" && <DiscoverPage isMobile={isMobile} />}
          {page==="messages" && <MessagesPage isMobile={isMobile} />}
          {page==="activity" && <ActivityPage />}
          {page==="profile" && <ProfilePage userId={pUser} onBack={()=>setPage("feed")} isMobile={isMobile} />}
        </div>
      </div>

      {/* Desktop right sidebar */}
      {!isMobile && page==="feed" && (
        <div style={{ width:260, padding:"16px 12px", flexShrink:0, borderLeft:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>
          <h3 style={{ fontSize:14, fontWeight:800, padding:"0 4px" }}>Suggested</h3>
          {USERS.slice(1,6).map(user=>(
            <div key={user.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"4px" }}>
              <Avatar user={user} size={38} ring onClick={()=>goToProfile(user.id)} />
              <div style={{ flex:1, minWidth:0, cursor:"pointer" }} onClick={()=>goToProfile(user.id)}>
                <div style={{ display:"flex", alignItems:"center" }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:T.text }}>{user.name}</span>
                  {user.verified && <Verified size={11} />}
                </div>
                <div style={{ fontSize:11, color:T.textMuted }}>{user.handle}</div>
              </div>
              <button style={{ background:"none", border:"none", color:T.accent, fontSize:11, fontWeight:700, cursor:"pointer" }}>Follow</button>
            </div>
          ))}
          <h3 style={{ fontSize:14, fontWeight:800, padding:"12px 4px 0" }}>Trending</h3>
          {[{idx:0,title:"Mountain Vibes",views:"24K"},{idx:6,title:"Concert Night",views:"56K"},{idx:9,title:"Cliff Views",views:"38K"}].map((item,i)=>(
            <div key={i} style={{ borderRadius:14, overflow:"hidden", background:T.card, cursor:"pointer" }}>
              <Photo idx={item.idx} aspect="16/9" radius={0}>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 10px", background:"linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{item.title}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", gap:3, marginTop:2 }}><I.eye size={10} stroke="#fff" />{item.views} views</div>
                </div>
              </Photo>
            </div>
          ))}
          <div style={{ fontSize:10, color:T.textMuted, marginTop:"auto", padding:"0 4px", lineHeight:1.8 }}>About · Help · Terms<br/>&copy; 2026 Electric Editorial</div>
        </div>
      )}

      {/* Mobile tab bar */}
      {isMobile && <TabBar page={page} setPage={setPage} goToProfile={goToProfile} />}
    </div>
  );
}
