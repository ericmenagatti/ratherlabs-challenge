import type { FC } from 'react';
import { PropsWithChildren } from 'react';
import { useEagerConnect } from "@/utils/metamask";

const EagerConnectGuard: FC<PropsWithChildren> = ({ children }) => {
  useEagerConnect();
  return <>{children}</>;
};

export default EagerConnectGuard;
