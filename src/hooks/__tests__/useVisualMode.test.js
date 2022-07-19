import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "../useVisualMode";

describe.skip('useVisualMode Tests', () => {
  const FIRST = "FIRST";
  test("useVisualMode should initialize with default value", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    expect(result.current.mode).toBe(FIRST);
  });

  const SECOND = "SECOND";
  test("useVisualMode should transition to another mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  });

  const THIRD = "THIRD";
  test("useVisualMode should return to previous mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  test("useVisualMode should not return to previous mode if already at initial", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  test("useVisualMode should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    act(() => result.current.transition(THIRD, true));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });
})

