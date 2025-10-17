"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, Typography } from "antd";
import { HomeOutlined, TeamOutlined, AuditOutlined, BarChartOutlined, SettingOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Text } = Typography;

const items = [
  { key: "/", label: "Dashboard", icon: <HomeOutlined /> },
  { key: "/providers", label: "Providers", icon: <TeamOutlined /> },
  { key: "/verifications", label: "Verifications", icon: <AuditOutlined /> },
  { key: "/analytics", label: "Analytics", icon: <BarChartOutlined /> },
  { key: "/settings", label: "Settings", icon: <SettingOutlined /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const selected = items.find(i => pathname === i.key || (i.key !== "/" && pathname.startsWith(i.key)))?.key ?? "/";

  return (
    <Sider
      width={384}
      theme="dark"
      style={{
        position: "sticky",
        top: 0,
        height: "100dvh",
        // keep the sidebar below popovers, above main background
        zIndex: 5,
        background: "linear-gradient(180deg,#0b1840,#0b1430)",
        // avoid accidental extra width
        boxSizing: "border-box",
      }}
      className="w-[24rem]"
    >
      <div style={{ padding: "18px 16px 12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", fontSize: 22, fontWeight: 700 }}>
          <span role="img" aria-label="logo">🩺</span> HealthCred
        </div>
        <Text style={{ color: "rgba(255,255,255,.6)", fontSize: 12 }}>Enterprise Credentialing Console</Text>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selected]}
        items={items.map(i => ({
          key: i.key,
          icon: i.icon,
          label: <Link href={i.key} className="block text-[15px]">{i.label}</Link>,
        }))}
        style={{ padding: 12, background: "transparent" }}
      />

      <div style={{ marginTop: "auto", padding: 16, color: "rgba(255,255,255,.6)", fontSize: 12, borderTop: "1px solid rgba(255,255,255,.12)" }}>
        v3.2 • Secure Cloud • Audit On
      </div>
    </Sider>
  );
}


