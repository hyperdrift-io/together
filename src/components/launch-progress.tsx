import { countLaunchRegistrations } from '../lib/launch-registration';
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
  const registered = countLaunchRegistrations(market);
  const filled = Math.min(registered, firstRoomTarget);
  const t = copy[market];

  return (
    <p className="launch-progress">
      <progress
        value={filled}
        max={firstRoomTarget}
        aria-label={t.label(registered)}
      />
      <span>
        <b>{registered}</b>
        {t.status}
      </span>
    </p>
  );
}
