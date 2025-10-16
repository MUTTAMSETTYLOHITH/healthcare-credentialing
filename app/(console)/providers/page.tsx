"use client";
import React, { useMemo, useState } from "react";
import { useProviders } from "../../lib/useProviders";
import {
  Card, Input, Select, Space, Button, Table, Tag, Typography, App, Popconfirm, Badge, Drawer, Descriptions
} from "antd";
import {
  SearchOutlined, PlusOutlined, CheckOutlined, FlagOutlined,
  DeleteOutlined, ArrowRightOutlined, EditOutlined, DownloadOutlined
} from "@ant-design/icons";

type Status = "Pending" | "Verified" | "Flagged";
type Provider = { id: number; name: string; dept: string; status: Status };
const { Text, Title } = Typography;

const STag = ({ s }: { s: Status }) =>
  s === "Verified" ? <Tag color="green">Verified</Tag> :
  s === "Flagged" ? <Tag color="orange">Flagged</Tag> :
  <Tag color="blue">Pending</Tag>;

export default function ProvidersPage(){
  const { rows, isLoading, mutate } = useProviders();
  const { message, modal } = App.useApp();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [current, setCurrent] = useState<Provider | null>(null);

  const filtered = useMemo(() => {
    let r = [...rows];
    if (q) r = r.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.dept.toLowerCase().includes(q.toLowerCase()) || String(x.id).includes(q));
    if (status !== "All") r = r.filter(x => x.status === status);
    return r;
  }, [rows, q, status]);

  const add = async () => {
    let name = "", dept = "";
    await modal.confirm({
      title: "Add Provider",
      content: <Space direction="vertical" style={{width:"100%"}}>
        <Input placeholder="Full name" onChange={e=>name=e.target.value}/>
        <Input placeholder="Department" onChange={e=>dept=e.target.value}/>
      </Space>,
      okText: "Create",
      onOk: async () => {
        if (!name || !dept) { message.error("Name & Department required"); return Promise.reject(); }
        await fetch("/api/providers", { method:"POST", body: JSON.stringify({ name, dept, status:"Pending" })});
        message.success("Provider added");
        mutate();
      }
    });
  };
  const edit = async (rec: Provider) => {
    let name = rec.name, dept = rec.dept, status = rec.status;
    await modal.confirm({
      title: `Edit ${rec.name}`,
      content: <Space direction="vertical" style={{width:"100%"}}>
        <Input defaultValue={name} onChange={e=>name=e.target.value}/>
        <Input defaultValue={dept} onChange={e=>dept=e.target.value}/>
        <Select defaultValue={status} onChange={(v)=>status=v as Status} options={[
          {value:"Pending",label:"Pending"},{value:"Verified",label:"Verified"},{value:"Flagged",label:"Flagged"}
        ]}/>
      </Space>,
      onOk: async () => {
        await fetch(`/api/providers/${rec.id}`, { method:"PATCH", body: JSON.stringify({ name, dept, status })});
        message.success("Updated"); mutate();
      }
    });
  };
  const act = async (id:number, patch: Partial<Provider>)=>{
    await fetch(`/api/providers/${id}`, { method:"PATCH", body: JSON.stringify(patch)});
    mutate();
  };
  const del = async (id:number)=>{
    await fetch(`/api/providers/${id}`, { method:"DELETE" }); mutate();
  };
  const bulk = async (action:"verify"|"flag"|"delete")=>{
    if (!selected.length) return;
    await fetch("/api/providers", { method:"PUT", body: JSON.stringify({ action, ids: selected })});
    setSelected([]); mutate();
  };
  const exportCsv = ()=>{
    const headers = ["ID","Name","Department","Status"];
    const rowsOut = [headers, ...filtered.map(r=>[r.id,r.name,r.dept,r.status])];
    const csv = rowsOut.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url; a.download="providers.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const cols = [
    { title:"ID", dataIndex:"id", key:"id", width:100, render:(v:number)=><Text code>{v}</Text> },
    { title:"Name", dataIndex:"name", key:"name", render:(v:string)=><Text strong>{v}</Text> },
    { title:"Department", dataIndex:"dept", key:"dept" },
    { title:"Status", dataIndex:"status", key:"status", render:(s:Status)=><STag s={s}/> },
    { title:"Action", key:"action", render: (_:any, rec:Provider)=>(
        <Space wrap>
          {rec.status!=="Verified" && <Button size="small" type="primary" icon={<CheckOutlined/>} onClick={()=>act(rec.id,{status:"Verified"})}>Verify</Button>}
          {rec.status!=="Flagged" && <Button size="small" icon={<FlagOutlined/>} onClick={()=>act(rec.id,{status:"Flagged"})}>Flag</Button>}
          <Button size="small" icon={<EditOutlined/>} onClick={()=>edit(rec)}>Edit</Button>
          <Popconfirm title="Delete?" onConfirm={()=>del(rec.id)}>
            <Button size="small" danger icon={<DeleteOutlined/>}>Delete</Button>
          </Popconfirm>
          <Button size="small" icon={<ArrowRightOutlined/>} onClick={()=>{ setCurrent(rec); setDrawerOpen(true); }}>Details</Button>
        </Space>
    )}
  ];

  return (
    <div className="p-6">
      <Title level={3}>Providers</Title>
      <Card
        className="mt-3"
        extra={<Space wrap>
          <Input allowClear prefix={<SearchOutlined/>} placeholder="Search name, ID, deptâ€¦" style={{width:240}} onChange={e=>setQ(e.target.value)} />
          <Select value={status} onChange={v=>setStatus(v)} style={{width:160}} options={[
            {value:"All",label:"All statuses"},{value:"Pending",label:"Pending"},
            {value:"Verified",label:"Verified"},{value:"Flagged",label:"Flagged"}
          ]}/>
          <Button type="primary" icon={<PlusOutlined/>} onClick={add}>Add</Button>
          <Button icon={<CheckOutlined/>} disabled={!selected.length} onClick={()=>bulk("verify")}>Bulk Verify</Button>
          <Button icon={<FlagOutlined/>} disabled={!selected.length} onClick={()=>bulk("flag")}>Bulk Flag</Button>
          <Button danger icon={<DeleteOutlined/>} disabled={!selected.length} onClick={()=>bulk("delete")}>Bulk Delete</Button>
          <Button icon={<DownloadOutlined/>} onClick={exportCsv}>Export CSV</Button>
        </Space>}
      >
        <Table
          size="middle"
          rowKey="id"
          loading={isLoading}
          columns={cols as any}
          dataSource={filtered}
          rowSelection={{ selectedRowKeys:selected, onChange:(k)=>setSelected(k as number[]) }}
          pagination={{ pageSize:8 }}
        />
      </Card>

      <Drawer title="Provider Details" open={drawerOpen} onClose={()=>setDrawerOpen(false)} width={420}>
        {current ? (
          <Descriptions size="small" column={1}
            items={[
              { key:"id", label:"ID", children:<Text code>{current.id}</Text> },
              { key:"name", label:"Name", children: current.name },
              { key:"dept", label:"Department", children: current.dept },
              { key:"status", label:"Status", children:<STag s={current.status}/> },
              { key:"lic", label:"Medical License", children:<Badge status="success" text="Valid" /> },
              { key:"dea", label:"DEA", children:<Badge status="warning" text="Renew in 30d" /> },
              { key:"oig", label:"OIG Exclusion", children:<Badge status="success" text="Clear" /> },
              { key:"mal", label:"Malpractice", children:<Badge status="error" text="Missing" /> },
            ]}
          />
        ) : <Text type="secondary">No provider selected.</Text>}
      </Drawer>
    </div>
  );
}





