import { groupByProfileId } from './group-by-profile-id';

describe('groupByProfileId', () => {
  it('returns rows in the same order as the requested profile ids', () => {
    const rows = [
      { profileId: 'b', name: 'second' },
      { profileId: 'a', name: 'first' },
      { profileId: 'a', name: 'first-again' },
    ];

    expect(groupByProfileId(['a', 'missing', 'b'], rows)).toEqual([
      [
        { profileId: 'a', name: 'first' },
        { profileId: 'a', name: 'first-again' },
      ],
      [],
      [{ profileId: 'b', name: 'second' }],
    ]);
  });
});
