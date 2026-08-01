import posthog from "posthog-js";

// Thin typed wrapper around posthog.capture so every call site uses the
// exact event names/props from the spec instead of hand-typed strings.

export function identifyParticipant(tripId: string, participantId: string) {
  posthog.identify(`${tripId}:${participantId}`);
}

export function trackTripCreated(props: { hasCommonLocation: boolean }) {
  posthog.capture("trip_created", { has_common_location: props.hasCommonLocation });
}

export function trackTripLinkCopied() {
  posthog.capture("trip_link_copied");
}

export function trackParticipantJoined(props: {
  tripId: string;
  participantCount: number;
}) {
  posthog.capture("participant_joined", {
    trip_id: props.tripId,
    participant_count: props.participantCount,
  });
}

export function trackOptionContributed(props: {
  tripId: string;
  optionCount: number;
  vibe: string;
  hasUrl: boolean;
  ogPrefillSuccess: boolean;
}) {
  posthog.capture("option_contributed", {
    trip_id: props.tripId,
    option_count: props.optionCount,
    vibe: props.vibe,
    has_url: props.hasUrl,
    og_prefill_success: props.ogPrefillSuccess,
  });
}

export function trackVotingUnlocked(props: {
  tripId: string;
  hoursSinceTripCreated: number;
}) {
  posthog.capture("voting_unlocked", {
    trip_id: props.tripId,
    hours_since_trip_created: props.hoursSinceTripCreated,
  });
}

export function trackVoteCast(props: {
  vibe: string;
  value: "yes" | "no";
  voteMethod: "swipe" | "button";
}) {
  posthog.capture("vote_cast", {
    vibe: props.vibe,
    value: props.value,
    vote_method: props.voteMethod,
  });
}

export function trackVotingCompleted(props: { tripId: string }) {
  posthog.capture("voting_completed", { trip_id: props.tripId });
}

export function trackResultsViewed(props: {
  tripId: string;
  leaderYesRatio: number;
}) {
  posthog.capture("results_viewed", {
    trip_id: props.tripId,
    leader_yes_ratio: props.leaderYesRatio,
  });
}

export function trackOptedOut(props: {
  hasExcuse: boolean;
  excuseLength: number;
}) {
  posthog.capture("opted_out", {
    has_excuse: props.hasExcuse,
    excuse_length: props.excuseLength,
  });
}
