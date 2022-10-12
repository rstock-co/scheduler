import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    const result = reducer({}, { type: null });
    expect(result).toEqual("tried to reduce with unsupported action type");
  });
});
