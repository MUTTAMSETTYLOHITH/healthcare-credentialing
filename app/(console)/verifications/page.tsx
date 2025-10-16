"use client";
import React, { useMemo, useState } from "react";
import { useProviders } from "../../lib/useProviders";
import { Card, Table, Space, Button, Upload, message, Typography, Tag } from "antd";
import { UploadOutlined, ReloadOutlined, CheckOutlined, FlagOutlined } from "@ant-design/icons";

type Status = "Pending" | "Verified" | "Flagged";
type Provider = { id:number; name:string; dept:string; status:Status };
const { Title, Text } = Typography;

export default function VerificationsPage(){
  const { rows, mutate, isLoading } = useProviders();
  const [spinning, setSpinning] = useState<number | null>(null);

  const queue = useMemo(()=> rows.filter(r => r.status !== "Verified"), [rows]);

  const runChecks = async (rec: Provider) => {
    setSpinning(rec.id);
    // Simulate async â€œbackground checksâ€ (OIG, DEA, Board)
    await new Promise(r => setTimeout(r, 900));
    // 70% pass, 30% flag
    const next: Status = Math.random() < 0.7 ? "Verified" : "Flagged";
    await fetch(`/api/providers/${rec.id}`, { method:"PATCH", body: JSON.stringify({ status: next })});
    message.success(next === "Verified" ? "All checks passed" : "Issues found (Flagged)");
    setSpinning(null);
    mutate();
  };

  const columns = [
    { title:"ID", dataIndex:"id", key:"id", width:100, render:(v:number)=><Text code>{v}</Text> },
    { title:"Name", dataIndex:"name", key:"name" },
    { title:"Dept", dataIndex:"dept", key:"dept" },
    { title:"Status", dataIndex:"status", key:"status", render:(s:Status)=>(
      s==="Pending" ? <Tag color="blue">Pending</Tag> : <Tag color="orange">Flagged</Tag>
    )},
    { title:"Documents", key:"docs", render:(_:any, rec:Provider)=>(
      <Upload
        multiple
        accept=".pdf,.png,.jpg,.jpeg"
        customRequest={async ({onSuccess}) => { setTimeout(()=>{onSuccess && onSuccess("ok");}, 400); }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined/>}>Upload</Button>
      </Upload>
    )},
    { title:"Action", key:"action", render: (_:any, rec:Provider)=>(
      <Space>
        <Button loading={spinning===rec.id} icon={<ReloadOutlined/>} onClick={()=>runChecks(rec)}>Re-run checks</Button>
        <Button icon={<CheckOutlined/>} type="primary" onClick={()=>fetch(`/api/providers/${rec.id}`,{method:"PATCH",body:JSON.stringify({status:"Verified"})}).then(()=>mutate())}>Mark Verified</Button>
        <Button icon={<FlagOutlined/>} onClick={()=>fetch(`/api/providers/${rec.id}`,{method:"PATCH",body:JSON.stringify({status:"Flagged"})}).then(()=>mutate())}>Flag</Button>
      </Space>
    )},
  ];

  return (
    <div className="p-6">
      <Title level={3}>Verifications</Title>
      <Card className="mt-3" title="Pending / Flagged Queue">
        <Table rowKey="id" loading={isLoading} columns={columns as any} dataSource={queue} pagination={{pageSize:8}} />
      </Card>
    </div>
  );
}





