import { dedent } from 'ts-dedent';
import type { Comparator, StorySortParameter, StorySortParameterV7 } from '@storybook/addons';
import { storySort } from './storySort';
import type { StoryIndexEntry, IndexEntry, Path, IndexEntryV6 } from './types';

const sortStoriesCommon = (
  stories: IndexEntry[],
  storySortParameter: StorySortParameterV7,
  fileNameOrder: Path[]
) => {
  if (storySortParameter) {
    let sortFn: Comparator<IndexEntry>;
    if (typeof storySortParameter === 'function') {
      sortFn = storySortParameter;
    } else {
      sortFn = storySort(storySortParameter);
    }
    stories.sort(sortFn as (a: IndexEntry, b: IndexEntry) => number);
  } else {
    stories.sort(
      (s1, s2) => fileNameOrder.indexOf(s1.importPath) - fileNameOrder.indexOf(s2.importPath)
    );
  }
  return stories;
};

export const sortStoriesV7 = (
  stories: IndexEntry[],
  storySortParameter: StorySortParameterV7,
  fileNameOrder: Path[]
) => {
  try {
    return sortStoriesCommon(stories, storySortParameter, fileNameOrder);
  } catch (err) {
    throw new Error(dedent`
    Error sorting stories with sort parameter ${storySortParameter}:

    > ${(err as Error).message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
};

const toIndexEntry = (story: any): StoryIndexEntry => {
  const { id, title, name, parameters, type } = story;
  return { id, title, name, importPath: parameters.fileName, type };
};

export const sortStoriesV6 = (
  stories: IndexEntryV6[],
  storySortParameter: StorySortParameter,
  fileNameOrder: Path[]
) => {
  if (storySortParameter && typeof storySortParameter === 'function') {
    stories.sort(storySortParameter as (a: IndexEntryV6, b: IndexEntryV6) => number);
    return stories.map((s) => toIndexEntry(s[1]));
  }

  const storiesV7 = stories.map((s) => toIndexEntry(s[1]));
  return sortStoriesCommon(storiesV7, storySortParameter as StorySortParameterV7, fileNameOrder);
};
