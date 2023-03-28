import type { FC } from 'react';
import { PropsWithChildren } from 'react';
import { useEagerConnect } from "@/utils/metamask";

const EagerConnectGuard: FC<PropsWithChildren> = ({ children }) => {
  const tried = useEagerConnect();
  return <>{tried ? children : null}</>;
};

export default EagerConnectGuard;
