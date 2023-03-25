import { FC, CSSProperties, useState, useCallback, useEffect } from "react";
import { Typography, Button, Space, Col, Row } from "antd";
import { WalletOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image'
import MetamaskConnect from "@/components/Wallet/MetamaskConnect";

const { Title } = Typography;

const SURVEY_SAMPLE = {
  title: "Sample Survey",
  image: "https://48tools.com/wp-content/uploads/2015/09/shortlink.png",
  questions: [
    {
      text: "Question1",
      image: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      lifetimeSeconds: 10,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    },
    {
      text: "Question2",
      image: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    },
    {
      text: "Pregunta 2",
      image: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    }
  ]
}

const mainSpaceStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  margin: 0,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  minWidth: '280px',
}

const Home: FC = () => {
  return (
    <Space style={mainSpaceStyle}>
      <MetamaskConnect />
    </Space>
  );
};

export default Home;