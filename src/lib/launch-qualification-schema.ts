export const placeTypeOptions = [
  { value: 'social_event', label: 'A social event' },
  { value: 'gig', label: 'A gig' },
  { value: 'bar_cafe', label: 'A bar or café' },
  { value: 'class_club', label: 'A class or club' },
] as const;

export const londonAreaOptions = [
  { value: 'central', label: 'Central London' },
  { value: 'north', label: 'North London' },
  { value: 'east', label: 'East London' },
  { value: 'south', label: 'South London' },
  { value: 'west', label: 'West London' },
  { value: 'outside_london', label: 'Outside London' },
] as const;

export const adultEligibilityOptions = [
  { value: 'yes', label: 'Yes — I’m 18 or over' },
  { value: 'no', label: 'No' },
] as const;

export type PlaceType = (typeof placeTypeOptions)[number]['value'];
export type LondonArea = (typeof londonAreaOptions)[number]['value'];
export type AdultEligibility =
  (typeof adultEligibilityOptions)[number]['value'];

export type LaunchQualificationInput = {
  placeType: PlaceType;
  londonArea: LondonArea;
  adultEligibility: AdultEligibility;
};

function includesValue<T extends string>(
  options: ReadonlyArray<{ value: T }>,
  value: unknown,
): value is T {
  return (
    typeof value === 'string' &&
    options.some((option) => option.value === value)
  );
}

export function isLaunchQualificationInput(
  value: unknown,
): value is LaunchQualificationInput {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const input = value as Record<string, unknown>;

  return (
    includesValue(placeTypeOptions, input.placeType) &&
    includesValue(londonAreaOptions, input.londonArea) &&
    includesValue(adultEligibilityOptions, input.adultEligibility)
  );
}

export function qualificationLabel<
  T extends string,
>(
  options: ReadonlyArray<{ value: T; label: string }>,
  value: T | null,
) {
  return options.find((option) => option.value === value)?.label ?? '—';
}
