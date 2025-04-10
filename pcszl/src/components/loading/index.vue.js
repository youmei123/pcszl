import { ref, watch } from "vue";
import ShrinkRect from "./loaders/shrink-rect.vue";
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    translateY: {
        type: Number,
        default: 150,
    },
    text: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "#333",
    },
    textColor: {
        type: String,
        default: "#333",
    },
    isFullScreen: {
        type: Boolean,
        default: false,
    },
    backgroundColor: {
        type: String,
        default: "rgba(255, 255, 255, .9)",
    },
    size: {
        type: Number,
        default: 40,
    },
});
const isActive = ref(props.active);
watch(() => props.active, (value) => {
    isActive.value = value;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mask" },
    ...{ class: ({ 'full-screen': __VLS_ctx.isFullScreen }) },
    ...{ style: ({ backgroundColor: __VLS_ctx.backgroundColor }) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isActive) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "spinner" },
    ...{ style: ({ transform: `translate(-50%, -${__VLS_ctx.translateY}%)` }) },
});
var __VLS_0 = {};
/** @type {[typeof ShrinkRect, ]} */ ;
// @ts-ignore
const __VLS_2 = __VLS_asFunctionalComponent(ShrinkRect, new ShrinkRect({
    color: (__VLS_ctx.color),
    size: (__VLS_ctx.size),
}));
const __VLS_3 = __VLS_2({
    color: (__VLS_ctx.color),
    size: (__VLS_ctx.size),
}, ...__VLS_functionalComponentArgsRest(__VLS_2));
if (__VLS_ctx.text.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: ({ color: __VLS_ctx.textColor }) },
    });
    (__VLS_ctx.text);
}
/** @type {__VLS_StyleScopedClasses['mask']} */ ;
/** @type {__VLS_StyleScopedClasses['full-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ShrinkRect: ShrinkRect,
            isActive: isActive,
        };
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        translateY: {
            type: Number,
            default: 150,
        },
        text: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "#333",
        },
        textColor: {
            type: String,
            default: "#333",
        },
        isFullScreen: {
            type: Boolean,
            default: false,
        },
        backgroundColor: {
            type: String,
            default: "rgba(255, 255, 255, .9)",
        },
        size: {
            type: Number,
            default: 40,
        },
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        translateY: {
            type: Number,
            default: 150,
        },
        text: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "#333",
        },
        textColor: {
            type: String,
            default: "#333",
        },
        isFullScreen: {
            type: Boolean,
            default: false,
        },
        backgroundColor: {
            type: String,
            default: "rgba(255, 255, 255, .9)",
        },
        size: {
            type: Number,
            default: 40,
        },
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
