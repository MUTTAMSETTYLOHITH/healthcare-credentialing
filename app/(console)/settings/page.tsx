"use client";
import React, { useEffect, useState } from "react";
import { Card, Switch, Typography, Space, Divider, Button, message } from "antd";
const { Title, Text } = Typography;

type S = {
  oidcAzure: boolean;
  sslAutoRotate: boolean;
  kafkaPipelines: boolean;
  multiAZ: boolean;
};

const key = "__hc_settings__";

export default function SettingsPage(){
  const [s, setS] = useState<S>({ oidcAzure:true, sslAutoRotate:true, kafkaPipelines:true, multiAZ:true });

  useEffect(()=>{
    const raw = localStorage.getItem(key);
    if (raw) setS(JSON.parse(raw));
  },[]);
  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(s));
  },[s]);

  const save = ()=> message.success("Settings saved");

  return (
    <div className="p-6">
      <Title level={3}>Settings</Title>
      <Card className="mt-3" title="Security & Platform">
        <Space direction="vertical" size="large" style={{width:"100%"}}>
          <div className="flex items-center justify-between">
            <div><strong>Azure AD (OIDC)</strong><div><Text type="secondary">Single sign-on via OIDC</Text></div></div>
            <Switch checked={s.oidcAzure} onChange={v=>setS({...s, oidcAzure:v})}/>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div><strong>SSL Auto-rotation</strong><div><Text type="secondary">Rotate certs every 60 days</Text></div></div>
            <Switch checked={s.sslAutoRotate} onChange={v=>setS({...s, sslAutoRotate:v})}/>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div><strong>Kafka Pipelines</strong><div><Text type="secondary">Enable event-driven checks</Text></div></div>
            <Switch checked={s.kafkaPipelines} onChange={v=>setS({...s, kafkaPipelines:v})}/>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div><strong>Multi-AZ EKS</strong><div><Text type="secondary">High availability control plane</Text></div></div>
            <Switch checked={s.multiAZ} onChange={v=>setS({...s, multiAZ:v})}/>
          </div>

          <div className="text-right">
            <Button type="primary" onClick={save}>Save</Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}





