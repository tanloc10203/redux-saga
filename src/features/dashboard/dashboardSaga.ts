import { dashboardActions, RankingByCity } from './dashboardSlice';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { City, ListResponses, Student } from 'models';
import studentApi from 'api/student';
import cityApi from 'api/cityApi';

function* fetchStatistics() {
  // * ==> Return list response student from call 4 api (parallel run: chạy song song)
  const responseList: Array<ListResponses<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  // * GET ARRAY NUMBER TOTAL ROWS.
  const statisticsList = responseList.map((x) => x.pagination._totalRows);

  // * GET ITEM FROM ARRAY TOTAL ROWS
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

  // * Dispatch action
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponses<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponses<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  // * Fetch city list.
  const { data: cityList }: ListResponses<City> = yield call(cityApi.getAll);

  // * Fetch ranking per city.
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
      city: x.code,
    })
  );

  const responseList: Array<ListResponses<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    rankingList: x.data,
  }));

  // * Update state.
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDataDashboard() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log('Failed to fetch data dashboard', error.message);
      yield put(dashboardActions.fetchDataFailed());
    } else {
      console.log('Unexpected error', error);
    }
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDataDashboard);
}
