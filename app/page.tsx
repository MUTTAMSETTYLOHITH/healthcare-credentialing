export default function Page() {
  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0b1430"}}>
      <div style={{background:"#fff",borderRadius:16,padding:"32px 40px",maxWidth:720}}>
        <h1 style={{margin:0}}>🏥 HealthCred — Healthcare Credentialing Automation</h1>
        <p style={{margin:"12px 0 24px", color:"#5b6b83"}}>
          Cloud-native demo • Event-driven microservices • OIDC mock • Kafka pipelines • EKS-ready
        </p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="/verifications" style={{padding:"10px 14px",borderRadius:10,background:"#134ca8",color:"#fff",textDecoration:"none",fontWeight:600}}>Open Console</a>
          <a href="/analytics" style={{padding:"10px 14px",borderRadius:10,background:"#0b1a33",color:"#fff",textDecoration:"none"}}>Analytics</a>
          <a href="/login" style={{padding:"10px 14px",borderRadius:10,background:"#e5e7eb",color:"#0b1a33",textDecoration:"none"}}>Login</a>
        </div>
      </div>
    </main>
  );
}
