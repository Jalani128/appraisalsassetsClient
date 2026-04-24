export const LOCATION_OPTIONS = [
  { value: "downtown_dubai", label: "Downtown Dubai" },
  { value: "dubai_marina", label: "Dubai Marina" },
  { value: "bussiness_bay", label: "Business Bay" },
  { value: "jvc", label: "JVC" },
  { value: "palm_jumeirah", label: "Palm Jumeirah" },
  { value: "dubai_hills", label: "Dubai Hills" },
  { value: "arabian_ranches", label: "Arabian Ranches" },
  { value: "emaar_beachfront", label: "Emaar Beachfront" },
  { value: "blue_waters", label: "Bluewaters" },
  { value: "city_walks", label: "City Walk" },
] as const;

export const LOCATION_LABELS: Record<string, string> = LOCATION_OPTIONS.reduce(
  (acc, item) => {
    acc[item.value] = item.label;
    return acc;
  },
  {} as Record<string, string>,
);
