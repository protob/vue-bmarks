import { shallowMount } from "@vue/test-utils";
import PrtSidebarItem from "./PrtSidebarItem.vue";

describe("PrtSidebarItem.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtSidebarItem);
    expect(component.contains(".prt-sidebar-item")).toBe(true);
  });
});

