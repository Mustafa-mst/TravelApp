import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CountrySearchResult } from "../types";

const STORAGE_KEY = "search.history.v3";
// v2 entries predate the region/subregion fields the row now renders.
const LEGACY_STORAGE_KEYS = ["search.history", "search.history.v2"];
const MAX_ENTRIES = 8;

const isEntry = (value: unknown): value is CountrySearchResult =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as CountrySearchResult).id === "string" &&
  typeof (value as CountrySearchResult).cca2 === "string" &&
  "region" in value &&
  "subregion" in value;

export function useSearchHistory() {
  const [history, setHistory] = useState<CountrySearchResult[]>([]);

  useEffect(() => {
    let active = true;

    AsyncStorage.multiRemove(LEGACY_STORAGE_KEYS).catch(() => {});

    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active || !stored) {
          return;
        }

        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setHistory(parsed.filter(isEntry));
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback((next: CountrySearchResult[]) => {
    setHistory(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const addEntry = useCallback((entry: CountrySearchResult) => {
    if (!entry.cca2) {
      return;
    }

    setHistory((current) => {
      const deduped = current.filter((item) => item.cca2 !== entry.cca2);
      const next = [entry, ...deduped].slice(0, MAX_ENTRIES);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});

      return next;
    });
  }, []);

  const removeEntry = useCallback(
    (cca2: string) => {
      persist(history.filter((item) => item.cca2 !== cca2));
    },
    [history, persist],
  );

  return { history, addEntry, removeEntry };
}
