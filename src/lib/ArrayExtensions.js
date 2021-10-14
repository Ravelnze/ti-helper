/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

Array.prototype.exclude = function (existing) {
    return this.filter((t) => !existing.map((e) => e.id).includes(t.id));
};

Array.prototype.excludeSingle = function (existing) {
    return this.filter(
        (t) => !existing.map((e) => e.id).includes(t.id) || t.multiple
    );
};
