import { Fragment } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

import {
  DEFAULT_PORTAL_HOST,
  setHostOrigin,
  usePortalNodes,
} from "./portal.store";

type PortalHostProps = {
  name?: string;
};

// On iOS this renders into a separate native window, so portalled content
// sits above native modals and the keyboard. Android has no equivalent.
function OverlayWindow({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== "ios") {
    return <>{children}</>;
  }

  return <FullWindowOverlay>{children}</FullWindowOverlay>;
}

export function PortalHost({ name = DEFAULT_PORTAL_HOST }: PortalHostProps) {
  const nodes = usePortalNodes(name);

  // Mounted even while empty, so its origin is measured before the first
  // trigger is. Returning null here would leave the first menu of the session
  // positioning against an unknown origin, one frame too early.
  return (
    <OverlayWindow>
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
        collapsable={false}
        onLayout={({ target }) =>
          target?.measureInWindow((x, y) => setHostOrigin(name, { x, y }))
        }
      >
        {nodes.map((node, index) => (
          <Fragment key={index}>{node}</Fragment>
        ))}
      </View>
    </OverlayWindow>
  );
}
