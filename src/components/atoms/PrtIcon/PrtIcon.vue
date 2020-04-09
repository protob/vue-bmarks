<script src="./PrtIcon.js"></script>

>
<template>
  <div
    ref="icon"
    :class="['prt-icon', iconColorClass, iconSizeClass]"
    :style="iconCustomStyle"
    v-on="$listeners"
  >
    <slot v-bind="{ viewBox, iconPaths, icon }">
      <svg
        class="prt-icon-path"
        :viewBox="iconViewBox"
        preserveAspectRatio="none"
      >
        <path
          v-for="(path, index) in iconPaths"
          :key="index"
          :d="path"
          style="height: 100%;"
        />
      </svg>
    </slot>
  </div>
</template>
<script>
import icons from '@/assets/icons/icons'

import { iconColorsValues as PRT_COLORS } from '@/assets/shared/variables/colors'
import { sizesValues as SF_SIZES } from '@/assets/shared/variables/sizes'
const SF_ICONS = Object.keys(icons)
export default {
  name: 'SfIcon',
  props: {
    /**
     * It can be single SVG path (string) or array of SVG paths or icon name
     * from our icons list (such as 'added_to_cart`)
     */
    icon: {
      type: [String, Array],
      default: ''
    },
    /**
     * It can be our standard sizes, or `12px` or `1.2rem` or nothing.
     * Standard sizes: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xl3`, `xl4`.
     */
    size: {
      type: String,
      default: ''
    },
    /**

     * It can be according to our standard colors, or legitimate CSS color such as `#fff`, `rgb(255,255,255)`), and `lightgray` or nothing.
     * Standard colors: `white`, `black`, `green-primary`, `green-secondary`,  `accent`.
     */
    color: {
      type: String,
      default: ''
    },
    /**
     * Custom viewBox size of the icon
     * It should be according to the standard `"min-x min-y width height"`.
     * By default it will be `0 0 24 24`. If you use our icons, you don't need to pass this prop at all.
     * Recommedations: try to get your SVG designed with our default viewBox value and reduce the number of props passed to the component.
     */
    viewBox: {
      type: String,
      default: '0 0 24 24'
    }
  },
  computed: {
    isPRTColors() {
      return PRT_COLORS.includes(this.color.trim())
    },
    isSFSizes() {
      const size = this.size.trim()
      return SF_SIZES.includes(size)
    },
    iconColorClass() {
      return this.isPRTColors ? `color-${this.color.trim()}` : ''
    },
    iconSizeClass() {
      return this.isSFSizes ? `size-${this.size.trim()}` : ''
    },
    iconCustomStyle() {
      return {
        '--icon-color': !this.isPRTColors ? this.color : '',
        '--icon-size': !this.isSFSizes ? this.size : ''
      }
    },
    isSFIcons() {
      return SF_ICONS.includes(this.icon.trim())
    },
    iconViewBox() {
      return this.isSFIcons
        ? icons[this.icon].viewBox || this.viewBox
        : this.viewBox
    },
    iconPaths() {
      if (this.isSFIcons) {
        return icons[this.icon].paths
      } else {
        return Array.isArray(this.icon) ? this.icon : [this.icon]
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/helpers';
.prt-icon {
  display: flex;
  box-sizing: border-box;
  width: var(--icon-width, var(--icon-size, #{map-get($sizes, 'sm')}));
  height: var(--icon-height, var(--icon-size, #{map-get($sizes, 'sm')}));
  background: transparent;
  fill: var(--icon-color, #{map-get($icon-colors, 'white')});

  outline: 0;
  svg,
  img {
    width: inherit;
    height: inherit;
  }

  @each $palette, $color in $icon-colors {
    &.color-#{$palette} {
      --icon-color: #{$color};
    }
  }
  @each $profile, $size in $sizes {
    &.size-#{$profile} {
      --icon-size: #{$size};
    }
  }
}
</style>
