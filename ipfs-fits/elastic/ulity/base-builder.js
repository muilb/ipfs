/**
 * Created by lebamui on 23/11/2017.
 */
class BaseBuilder {
    constructor() {
        this.query = {};
        this.aggs = {};
        // match All
        this.matchAll = {
            match_all: {}
        };
        this.isMatchAll = false;
        this.geoBuilder = require('./geo-builder');
    };
    _match_all() {
        return {
            match_all: {}
        }
    };
    _match(match) {
        var m = match || {};
        return {
            match: m
        }
    };

    _term(term) {
        var t = term || {};
        return {
            term: t
        }
    };

    _prefix(prefix) {
        var p = prefix || {};
        return {
            prefix: p
        }
    };

    _range(range) {
        var r = range || {}
        return {
            range: r
        }
    };

    _getQueries(queries, obj) {
        switch (queries) {
            case 'match_all':
                return this._match_all();
                break;
            case 'match':
                return this._match(obj);
                break;
            case 'term':
                return this._term(obj);
                break;
            case 'prefix':
                return this._prefix(obj);
                break;
            case 'range':
                return this._range(obj);
                break;
            default:
                return this._match(obj);
        }
    }

    _setIfHavaQuery(qr) {
        if (qr) {
            this.query = qr;
        }
    };

    getQueriesObject(queries, obj) {
        var result = {};
        result[queries] = obj;

        return result;
    }
    getQuery() {
        if (this.isMatchAll) {
            return this.matchAll;
        } else {
            return this.query;
        }
    }
}

module.exports = BaseBuilder;