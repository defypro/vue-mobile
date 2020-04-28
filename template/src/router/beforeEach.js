
const beforeEach = ((to, from, next) => {
    document.title = to.meta.title || '';
    next();
});
export default beforeEach
