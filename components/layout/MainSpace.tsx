import { FC, CSSProperties, PropsWithChildren } from "react";
import { Space } from "antd";

const mainSpaceStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  margin: 0,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  minWidth: '280px',
}

const MainSpace: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Space style={mainSpaceStyle}>
      {children}
    </Space>
  )
}

export default MainSpace;