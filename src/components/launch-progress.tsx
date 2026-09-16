import { countConfirmedLaunchRegistrations } from '../lib/launch-registration';
import type { Locale } from '../lib/locale';

export const firstRoomTarget = 50;

const copy = {
  en: {
    label: (shown: number) =>
      `${shown} of ${firstRoomTarget} people on the first list`,
    status: ` of ${firstRoomTarget} on the first list. The first room opens at ${firstRoomTarget}.`,
  },
  fr: {
    label: (shown: number) =>
      `${shown} personnes sur ${firstRoomTarget} sur la première liste française`,
    status: ` sur ${firstRoomTarget} sur la liste française. La première salle ouvre à ${firstRoomTarget}.`,
  },
};

// Each market fills its own first room, so each has its own counter.
export function LaunchProgress({ market }: { market: Locale }) {
  const confirmed = countConfirmedLaunchRegistrations(market);
  const shown = Math.min(confirmed, firstRoomTarget);
  const t = copy[market];

  return (
    <p className="launch-progress">
      <progress value={shown} max={firstRoomTarget} aria-label={t.label(shown)} />
      <span>
        <b>{shown}</b>
        {t.status}
      </span>
    </p>
  );
}
