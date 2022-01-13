import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';

import { sectionService } from '../../services/SectionService';
import { setSections } from '../actions/SectionActions';

export function* fetchSections() {
  try {
    yield put(setLoader(true));
    const sections = yield call(sectionService.getSections);

    const filteredSections = [];

    sections.data.results.forEach(section => {
      const filteredSectionItems = section.items.filter(
        item => item.resourcetype !== 'Sleep' && item.resourcetype !== 'Meditation'
      );
      section.items = filteredSectionItems;
      filteredSections.push(section);
    });

    yield put(setSections(filteredSections));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setLoader(false));
  }
}
