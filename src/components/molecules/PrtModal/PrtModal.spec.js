import { shallowMount } from "@vue/test-utils";
import PrtModal from "./PrtModal.vue";

describe("PrtModal.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtModal);
    expect(component.contains(".prt-modal")).toBe(true);
  });
});

