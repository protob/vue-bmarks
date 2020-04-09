import { shallowMount } from "@vue/test-utils";
import PrtSidebarHeading from "./PrtSidebarHeading.vue";

describe("PrtSidebarHeading.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtSidebarHeading);
    expect(component.contains(".prt-sidebar-heading")).toBe(true);
  });
});

