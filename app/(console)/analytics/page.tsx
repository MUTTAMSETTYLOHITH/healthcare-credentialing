"use client";

import React from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const { Title, Text } = Typography;

/** Stable mock data (prevents hydration drift) */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const throughput = days.map((d, i) => ({
  day: d,
  verifications: [1120, 1240, 1180, 1310, 1280, 970, 1360][i],
}));
const compliance = [
  { dept: "Cardio", License: 99, DEA: 96, Malpractice: 91, OIG: 99 },
  { dept: "Ortho",  License: 98, DEA: 95, Malpractice: 87, OIG: 99 },
  { dept: "Peds",   License: 98, DEA: 94, Malpractice: 86, OIG: 99 },
  { dept: "Onco",   License: 99, DEA: 97, Malpractice: 89, OIG: 99 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <Title level={3}>Analytics</Title>

      {/* KPI row */}
      <Row gutter={[16, 16]} className="mt-2">
        <Col xs={24} md={6}>
          <Card variant="filled" className="card-soft kpi">
            <Statistic title="Pass Rate" value="98.6%" />
            <Text type="secondary">+0.4% WoW</Text>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card variant="filled" className="card-soft kpi">
            <Statistic title="Verifications / Day" value={1284} />
            <Text type="secondary">peak Thu</Text>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card variant="filled" className="card-soft kpi">
            <Statistic title="Avg. Docs per Provider" value={6.2} />
            <Text type="secondary">target &lt;= 7</Text>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card variant="filled" className="card-soft kpi">
            <Statistic title="SLA &lt;= 4h Compliance" value="94.2%" />
            <Text type="secondary">-0.3% WoW</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-2">
        {/* Throughput line/area */}
        <Col xs={24} md={14}>
          <Card title="Verification Throughput (last 7 days)" variant="filled" className="card-soft">
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughput} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="fillV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1677ff" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#1677ff" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v) => [v as number, "Verifications"]} />
                  <Area type="monotone" dataKey="verifications" stroke="#1677ff" fill="url(#fillV)" strokeWidth={2} />
                  <Line type="monotone" dataKey="verifications" stroke="#0b1a33" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Compliance stacked bars */}
        <Col xs={24} md={10}>
          <Card title="Compliance Mix by Department" variant="filled" className="card-soft">
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compliance} margin={{ top: 10, right: 10, bottom: 0, left: -15 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="dept" tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v) => [`${v}%`, "Rate"]} />
                  <Legend />
                  <Bar dataKey="License"     stackId="a" fill="#2a6bff" />
                  <Bar dataKey="DEA"         stackId="a" fill="#52c41a" />
                  <Bar dataKey="Malpractice" stackId="a" fill="#faad14" />
                  <Bar dataKey="OIG"         stackId="a" fill="#13c2c2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
