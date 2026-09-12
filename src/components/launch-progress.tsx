import { countConfirmedLaunchRegistrations } from '../lib/launch-registration';

export const firstRoomTarget = 50;

export function LaunchProgress() {
  const confirmed = countConfirmedLaunchRegistrations();
  const shown = Math.min(confirmed, firstRoomTarget);

  return (
    <p className="launch-progress">
      <progress
        value={shown}
        max={firstRoomTarget}
        aria-label={`${shown} of ${firstRoomTarget} people on the first list`}
      />
      <span>
        <b>{shown}</b>
        {` of ${firstRoomTarget} on the first list. The next room opens at ${firstRoomTarget}.`}
      </span>
    </p>
  );
}
