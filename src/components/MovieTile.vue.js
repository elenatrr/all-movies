import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'MovieTile',
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        const goToDetails = () => {
            router.push({ name: 'MovieDetails', params: { id: props.movie.id } });
        };
        return { goToDetails };
    }
});
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.movie) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.goToDetails) }, ...{ class: ("max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform mx-auto") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative h-80") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("absolute top-2 right-2 bg-white opacity-90 p-1 rounded-lg min-w-8 text-center") }, });
        (__VLS_ctx.movie.vote_average.toFixed(1));
        // @ts-ignore
        [movie, movie, goToDetails,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ class: ("w-full h-full object-cover object-bottom shadow-md") }, src: ((`https://image.tmdb.org/t/p/w500/${__VLS_ctx.movie.poster_path}`)), alt: ((__VLS_ctx.movie.original_title)), });
        // @ts-ignore
        [movie, movie,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("px-3 py-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("font-bold text-lg mb-1") }, });
        (__VLS_ctx.movie.title);
        // @ts-ignore
        [movie,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-700") }, });
        (__VLS_ctx.movie.overview.substring(0, 70));
        // @ts-ignore
        [movie,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['max-w-sm'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['overflow-hidden'];
        __VLS_styleScopedClasses['shadow-lg'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hover:scale-105'];
        __VLS_styleScopedClasses['transition-transform'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['h-80'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['top-2'];
        __VLS_styleScopedClasses['right-2'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['opacity-90'];
        __VLS_styleScopedClasses['p-1'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['min-w-8'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['h-full'];
        __VLS_styleScopedClasses['object-cover'];
        __VLS_styleScopedClasses['object-bottom'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['text-gray-700'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'MovieTile';
    let __VLS_internalComponent;
}
//# sourceMappingURL=MovieTile.vue.js.map