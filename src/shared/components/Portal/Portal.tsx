import { useEffect, useId, type ReactNode } from "react";

import {
  DEFAULT_PORTAL_HOST,
  flushPortal,
  unmountPortal,
  writePortal,
} from "./portal.store";

type PortalProps = {
  children: ReactNode;
  hostName?: string;
};

export function Portal({
  children,
  hostName = DEFAULT_PORTAL_HOST,
}: PortalProps) {
  const name = useId();

  // Recorded during render so the host never paints a frame behind, but
  // published from an effect — notifying subscribers mid-render is illegal.
  const changed = writePortal(hostName, name, children);

  useEffect(() => {
    if (changed) {
      flushPortal();
    }
  });

  useEffect(
    () => () => {
      unmountPortal(hostName, name);
    },
    [hostName, name],
  );

  return null;
}
