import { shallowMount } from "@vue/test-utils";
import PrtItemCatHeading from "./PrtItemCatHeading.vue";

describe("PrtItemCatHeading.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtItemCatHeading);
    expect(component.contains(".prt-item-cat-heading")).toBe(true);
  });
});

