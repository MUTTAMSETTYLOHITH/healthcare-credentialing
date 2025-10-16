import type { Metadata } from "next";
import "./globals.css";

import "antd/dist/reset.css";
import { ConfigProvider, theme } from "antd";

export const metadata: Metadata = {
  title: "HealthCred | Healthcare Credentialing Automation",
  description:
    "Executive-grade console for clinician onboarding, verification, and compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
            token: {
              colorPrimary: "#134ca8",
              borderRadius: 10,
              colorBgLayout: "#f6f8fb",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}


