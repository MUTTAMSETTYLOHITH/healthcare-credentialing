"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Typography,
  Row,
  Col,
  Card,
  Statistic,
  Badge,
  Space,
  Table,
  Tabs,
  Tag,
  Drawer,
  Descriptions,
  Button,
  App,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  ClockCircleTwoTone,
  ArrowRightOutlined,
  DeleteOutlined,
  FlagOutlined,
  CheckOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProviders } from "../lib/useProviders";

// client-only toolbar (fixes hydration mismatch)
const QueueToolbarNoSSR = dynamic(
  () => import("../components/QueueToolbar"),
  { ssr: false }
);

const { Text } = Typography;

type Status = "Pending" | "Verified" | "Flagged";
type Provider = { id: number; name: string; dept: string; status: Status };

const StatusTag = ({ s }: { s: Status }) =>
  s === "Verified" ? (
    <Tag color="green" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
      Verified
    </Tag>
  ) : s === "Flagged" ? (
    <Tag color="orange" icon={<ExclamationCircleTwoTone twoToneColor="#faad14" />}>
      Flagged
    </Tag>
  ) : (
    <Tag color="blue" icon={<ClockCircleTwoTone twoToneColor="#1677ff" />}>
      Pending
    </Tag>
  );

export default function DashboardContent() {
  const { message, modal } = App.useApp();
  const { rows, isLoading, mutate } = useProviders();

  // Search/filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");

  // Selection for bulk ops
  const [selected, setSelected] = useState<number[]>([]);

  // Drawer & Edit
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [current, setCurrent] = useState<Provider | null>(null);

  const filtered = useMemo(() => {
    let r = [...rows];
    if (q) {
      const needle = q.toLowerCase();
      r = r.filter(
        (x) =>
          x.name.toLowerCase().includes(needle) ||
          x.dept.toLowerCase().includes(needle) ||
          String(x.id).includes(needle)
      );
    }
    if (status !== "All") r = r.filter((x) => x.status === status);
    return r;
  }, [rows, q, status]);

  // API helpers
  const verify = async (id: number) => {
    await fetch(`/api/providers/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "Verified" }),
    });
    message.success("Verified");
    mutate();
  };

  const flag = async (id: number) => {
    await fetch(`/api/providers/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "Flagged" }),
    });
    message.info("Flagged");
    mutate();
  };

  const remove = async (id: number) => {
    await fetch(`/api/providers/${id}`, { method: "DELETE" });
    message.success("Deleted");
    mutate();
  };

  const add = async () => {
    let name = "";
    let dept = "";
    await modal.confirm({
      title: "New Provider",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <input
            className="ant-input"
            placeholder="Full name"
            onChange={(e: any) => (name = e.target.value)}
          />
          <input
            className="ant-input"
            placeholder="Department"
            onChange={(e: any) => (dept = e.target.value)}
          />
        </Space>
      ),
      okText: "Create",
      onOk: async () => {
        if (!name || !dept) {
          message.error("Name & Department required");
          return Promise.reject();
        }
        await fetch(`/api/providers`, {
          method: "POST",
          body: JSON.stringify({ name, dept, status: "Pending" }),
        });
        message.success("Provider added");
        mutate();
      },
    });
  };

  const edit = async (rec: Provider) => {
    let name = rec.name,
      dept = rec.dept,
      s = rec.status as Status;
    await modal.confirm({
      title: `Edit ${rec.name}`,
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <input
            className="ant-input"
            defaultValue={name}
            onChange={(e: any) => (name = e.target.value)}
          />
          <input
            className="ant-input"
            defaultValue={dept}
            onChange={(e: any) => (dept = e.target.value)}
          />
          <select
            className="ant-input"
            defaultValue={s}
            onChange={(e: any) => (s = e.target.value as Status)}
          >
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Flagged">Flagged</option>
          </select>
        </Space>
      ),
      okText: "Save",
      onOk: async () => {
        await fetch(`/api/providers/${rec.id}`, {
          method: "PATCH",
          body: JSON.stringify({ name, dept, status: s }),
        });
        message.success("Updated");
        mutate();
      },
    });
  };

  // Bulk ops
  const bulk = async (action: "verify" | "delete" | "flag") => {
    if (selected.length === 0) return;
    await fetch(`/api/providers`, {
      method: "PUT",
      body: JSON.stringify({ action, ids: selected }),
    });
    message.success(
      `${action === "delete" ? "Deleted" : action === "verify" ? "Verified" : "Flagged"} ${selected.length} record(s)`
    );
    setSelected([]);
    mutate();
  };

  // CSV export
  const exportCsv = () => {
    const headers = ["ID", "Name", "Department", "Status"];
    const lines = [headers, ...filtered.map((r) => [r.id, r.name, r.dept, r.status])];
    const csv = lines
      .map((line) => line.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "providers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: any[] = [
    { title: "ID", dataIndex: "id", key: "id", width: 100, render: (v: number) => <Text code>{v}</Text> },
    { title: "Name", dataIndex: "name", key: "name", render: (v: string) => <Text strong>{v}</Text> },
    { title: "Department", dataIndex: "dept", key: "dept" },
    { title: "Status", dataIndex: "status", key: "status", render: (s: Status) => <StatusTag s={s} /> },
    {
      title: "Action",
      key: "action",
      width: 320,
      render: (_: any, rec: Provider) => (
        <Space wrap>
          {rec.status !== "Verified" && (
            <Button size="small" icon={<CheckOutlined />} type="primary" onClick={() => verify(rec.id)}>
              Verify
            </Button>
          )}
          {rec.status !== "Flagged" && (
            <Button size="small" icon={<FlagOutlined />} onClick={() => flag(rec.id)}>
              Flag
            </Button>
          )}
          <Button size="small" icon={<EditOutlined />} onClick={() => edit(rec)}>
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => remove(rec.id)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            size="small"
            icon={<ArrowRightOutlined />}
            onClick={() => {
              setCurrent(rec);
              setDrawerOpen(true);
            }}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* KPI Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card className="card-soft kpi">
            <Statistic title="System Uptime" value="99.99%" valueStyle={{ color: "#1677ff" }} />
            <Text type="secondary">+0.02% MoM</Text>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="card-soft kpi">
            <Statistic title="Manual Checks" value="72%" valueStyle={{ color: "#1677ff" }} />
            <Text type="secondary">-3% MoM</Text>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="card-soft kpi">
            <Statistic title="Providers Onboarded" value="12,480" />
            <Badge status="processing" text="Kafka pipelines active" />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="card-soft kpi">
            <Statistic title="Avg. Verification SLA" value="3.1 h" />
            <Text type="secondary">Target ≤ 4 h</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} xl={16}>
          {/* Verification Queue (aligned + hydration-safe toolbar) */}
          <Card
            title="Verification Queue"
            className="card-soft card-tight"
            extra={
              <QueueToolbarNoSSR
                q={q}
                onQ={setQ}
                status={status as any}
                onStatus={(v) => setStatus(v as any)}
                selectedLen={selected.length}
                onAdd={add}
                onBulk={bulk}
                onExport={exportCsv}
              />
            }
          >
            {/* Clip table so header/rows/borders align flush */}
            <div className="table-clip">
              <Table
                size="middle"
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={filtered}
                rowSelection={{
                  selectedRowKeys: selected,
                  onChange: (keys) => setSelected(keys as number[]),
                }}
                pagination={{ pageSize: 5, showSizeChanger: false }}
                sticky={{ offsetHeader: 0 }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card className="card-soft">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Analytics",
                  children: (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Card size="small" className="card-soft">
                        <Statistic title="Pass Rate" value="98.6%" />
                      </Card>
                      <Card size="small" className="card-soft">
                        <Statistic title="Verifications / Day" value={1284} />
                      </Card>
                      <Card size="small" className="card-soft">
                        <Statistic title="Avg. Docs per Provider" value={6.2} />
                      </Card>
                    </Space>
                  ),
                },
                {
                  key: "2",
                  label: "Compliance",
                  children: (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Card size="small" className="card-soft">
                        <Tag color="orange">Warn</Tag> DEA license expiring in 12 days (Dr. Bob Johnson)
                      </Card>
                      <Card size="small" className="card-soft">
                        <Tag color="green">OK</Tag> OIG exclusion list re-check completed (FL providers)
                      </Card>
                      <Card size="small" className="card-soft">
                        <Tag color="red">Flag</Tag> Malpractice policy missing (Dr. Chen Liu)
                      </Card>
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Drawer title="Provider Details" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={420}>
        {current ? (
          <Descriptions
            size="small"
            column={1}
            items={[
              { key: "id", label: "ID", children: <Text code>{current.id}</Text> },
              { key: "name", label: "Name", children: current.name },
              { key: "dept", label: "Department", children: current.dept },
              { key: "status", label: "Status", children: <StatusTag s={current.status} /> },
              { key: "lic", label: "Medical License", children: <Badge status="success" text="Valid" /> },
              { key: "dea", label: "DEA", children: <Badge status="warning" text="Renew in 30d" /> },
              { key: "oig", label: "OIG Exclusion", children: <Badge status="success" text="Clear" /> },
              { key: "mal", label: "Malpractice", children: <Badge status="error" text="Missing" /> },
            ]}
          />
        ) : (
          <Text type="secondary">No provider selected.</Text>
        )}
      </Drawer>
    </>
  );
}
