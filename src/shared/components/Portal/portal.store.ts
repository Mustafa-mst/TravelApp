import { useSyncExternalStore, type ReactNode } from "react";

export const DEFAULT_PORTAL_HOST = "default";

type PortalMap = Map<string, ReactNode>;

/**
 * Where each host sits in window coordinates. Needed because `measureInWindow`
 * is relative to the React root, while a host may be offset from it — on iOS
 * `FullWindowOverlay` is a separate window anchored above the root. Consumers
 * subtract this to convert an anchor into host space.
 */
const hostOrigins = new Map<string, { x: number; y: number }>();

export function setHostOrigin(
  hostName: string,
  origin: { x: number; y: number },
) {
  hostOrigins.set(hostName, origin);
}

export function getHostOrigin(hostName: string) {
  return hostOrigins.get(hostName) ?? { x: 0, y: 0 };
}

const hosts = new Map<string, PortalMap>([[DEFAULT_PORTAL_HOST, new Map()]]);
const listeners = new Set<() => void>();

// Swapped wholesale on every write so useSyncExternalStore sees a new
// reference; mutating the Map in place would not re-render.
let snapshot: Map<string, PortalMap> = hosts;

function emit() {
  snapshot = new Map(hosts);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

/** Records the node without notifying; call during render. */
export function writePortal(hostName: string, name: string, node: ReactNode) {
  const host = hosts.get(hostName) ?? new Map<string, ReactNode>();
  if (host.get(name) === node) {
    return false;
  }
  host.set(name, node);
  hosts.set(hostName, host);
  return true;
}

/** Publishes pending writes; call from an effect, never during render. */
export function flushPortal() {
  emit();
}

export function unmountPortal(hostName: string, name: string) {
  const host = hosts.get(hostName);
  if (!host?.delete(name)) {
    return;
  }
  emit();
}

export function usePortalNodes(hostName: string): ReactNode[] {
  const map = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const host = map.get(hostName);
  return host ? Array.from(host.values()) : [];
}
