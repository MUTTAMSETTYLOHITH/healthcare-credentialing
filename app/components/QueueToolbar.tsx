"use client";
import React from "react";
import { Space, Input, Select, Button } from "antd";
import { SearchOutlined, PlusOutlined, CheckOutlined, FlagOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
type Status = "Pending" | "Verified" | "Flagged" | "All";
export default function QueueToolbar(props:{ q:string; onQ:(s:string)=>void; status:Status; onStatus:(s:Status)=>void; selectedLen:number; onAdd:()=>void; onBulk:(a:"verify"|"flag"|"delete")=>void; onExport:()=>void; }){
  const { q, onQ, status, onStatus, selectedLen, onAdd, onBulk, onExport } = props;
  return (<Space wrap>
    <Input allowClear prefix={<SearchOutlined />} placeholder="Search name, ID, dept…" value={q} onChange={(e)=>onQ(e.target.value)} style={{width:220}} size="middle" />
    <Select value={status} onChange={(v)=>onStatus(v as Status)} style={{width:160}} options={[
      {value:"All",label:"All statuses"},{value:"Pending",label:"Pending"},{value:"Verified",label:"Verified"},{value:"Flagged",label:"Flagged"}
    ]} size="middle" />
    <Button icon={<PlusOutlined/>} type="primary" onClick={onAdd}>Add</Button>
    <Button icon={<CheckOutlined/>} onClick={()=>onBulk("verify")} disabled={selectedLen===0}>Bulk Verify</Button>
    <Button icon={<FlagOutlined/>} onClick={()=>onBulk("flag")} disabled={selectedLen===0}>Bulk Flag</Button>
    <Button icon={<DeleteOutlined/>} danger onClick={()=>onBulk("delete")} disabled={selectedLen===0}>Bulk Delete</Button>
    <Button icon={<DownloadOutlined/>} onClick={onExport}>Export CSV</Button>
  </Space>);
}


