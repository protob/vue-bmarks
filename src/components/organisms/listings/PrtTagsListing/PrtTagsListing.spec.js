import { shallowMount } from "@vue/test-utils";
import PrtTagsListing from "./PrtTagsListing.vue";

describe("PrtTagsListing.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTagsListing);
    expect(component.contains(".prt-tags-listing")).toBe(true);
  });
});

