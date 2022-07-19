const _routerJump = function ([_this, routeName, queryParams = undefined]) {
    if (_this.$route.name != routeName) {
        if (queryParams) {
            _this.$router.push({
                name: routeName,
                query: queryParams,
            });
        } else {
            _this.$router.push({
                name: routeName,
            });
        }
    } else {
        if (_this.$route.query != queryParams) {
            _this.$router.push({
                name: routeName,
                query: queryParams,
            });
        }
    }
}

export {
    _routerJump
}