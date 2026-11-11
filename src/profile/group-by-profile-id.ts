export function groupByProfileId<T extends { profileId: string }>(
  profileIds: readonly string[],
  rows: readonly T[],
): T[][] {
  const grouped = new Map<string, T[]>();

  for (const row of rows) {
    const bucket = grouped.get(row.profileId);
    if (bucket) {
      bucket.push(row);
    } else {
      grouped.set(row.profileId, [row]);
    }
  }

  return profileIds.map((profileId) => grouped.get(profileId) ?? []);
}
