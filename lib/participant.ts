// Participants have no accounts -- just a name typed once per trip and
// remembered in localStorage so re-opening the share link doesn't ask again.

export type StoredParticipant = {
  id: string;
  displayName: string;
};

function storageKey(tripId: string) {
  return `vylet:participant:${tripId}`;
}

export function getStoredParticipant(tripId: string): StoredParticipant | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(storageKey(tripId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredParticipant;
  } catch {
    return null;
  }
}

export function storeParticipant(tripId: string, participant: StoredParticipant) {
  window.localStorage.setItem(storageKey(tripId), JSON.stringify(participant));
}
