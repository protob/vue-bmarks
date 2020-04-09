import { shallowMount } from "@vue/test-utils";
import PrtLoginToolbar from "./PrtLoginToolbar.vue";

describe("PrtLoginToolbar.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtLoginToolbar);
    expect(component.contains(".prt-login-toolbar")).toBe(true);
  });
});

