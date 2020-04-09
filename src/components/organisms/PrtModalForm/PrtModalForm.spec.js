import { shallowMount } from "@vue/test-utils";
import PrtModalForm from "./PrtModalForm.vue";

describe("PrtModalForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtModalForm);
    expect(component.contains(".prt-modal-form")).toBe(true);
  });
});

