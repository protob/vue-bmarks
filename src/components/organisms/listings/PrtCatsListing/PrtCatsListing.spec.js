import { shallowMount } from "@vue/test-utils";
import PrtCatsListing from "./PrtCatsListing.vue";

describe("PrtCatsListing.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtCatsListing);
    expect(component.contains(".prt-cats-listing")).toBe(true);
  });
});

