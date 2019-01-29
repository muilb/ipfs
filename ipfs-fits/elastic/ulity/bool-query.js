/**
 * Created by lebamui on 23/11/2017.
 */
var BaseBuilder = require('./base-builder');

class BoolQueryBuilder extends BaseBuilder {
    constructor() {
        super();
        this.query.bool = {};
    }
    // _must(must) {
    //     var m = must || [];
    //     return {
    //         match: m
    //     }
    // };
    _checkEmpty(occur) {
        if(!this.query.bool[occur]) {
            this.query.bool[occur] = [];
        }
    };
    _addOccur(occur, queries, objs) {
        var self = this;
        if(objs.isArray) {
            objs.forEach(function (obj) {
                this.query.bool[occur].push(self._getQueries(queries, obj));
            });
        } else {
            this.query.bool[occur].push(self._getQueries(queries, objs));
        }
    };
    _addOccurNotUseDefault(occur, queries, objs) {
        var self = this;
        if(objs.isArray) {
            objs.forEach(function (obj) {
                this.query.bool[occur].push(self.getQueriesObject(queries, obj));
            });
        } else {
            this.query.bool[occur].push(self.getQueriesObject(queries, objs));
        }
    };
    addMusts(queries, musts) {
        this._checkEmpty('must');
        this._addOccur('must', queries, musts);
    };
    addShoulds(queries, shoulds) {
        this._checkEmpty('should');
        this._addOccur('should', queries, shoulds);
    };
    addFilters(queries, filters) {
        this._checkEmpty('filter');
        this._addOccurNotUseDefault('filter', queries, filters);
    };
    addMustNots(queries, must_nots) {
        this._checkEmpty('must_not');
        this._addOccur('must_not', queries, must_nots);
    };
}

module.exports = BoolQueryBuilder;