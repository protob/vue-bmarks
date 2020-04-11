import { shallowMount } from "@vue/test-utils";
import PrtModalConfirm from "./PrtModalConfirm.vue";

describe("PrtModalConfirm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtModalConfirm);
    expect(component.contains(".prt-modal-confirm")).toBe(true);
  });
});

