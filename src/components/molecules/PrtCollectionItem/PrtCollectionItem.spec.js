import { shallowMount } from "@vue/test-utils";
import PrtCollectionItem from "./PrtCollectionItem.vue";

describe("PrtCollectionItem.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtCollectionItem);
    expect(component.contains(".prt-collection-item")).toBe(true);
  });
});

