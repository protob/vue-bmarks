import { shallowMount } from "@vue/test-utils";
import PrtItemsListing from "./PrtItemsListing.vue";

describe("PrtItemsListing.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtItemsListing);
    expect(component.contains(".prt-items-listing")).toBe(true);
  });
});

