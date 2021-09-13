Array.prototype.exclude = function (existing) {
    return this.filter((t) => !existing.map((e) => e.id).includes(t.id));
};
