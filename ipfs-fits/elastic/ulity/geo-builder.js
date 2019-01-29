/**
 * Created by lebamui on 28/11/2017.
 */
class GeoBuilder {
    constructor() {
        this.geoQuery = {}
    }
    _get_geo_query() {
        return {
            queries: this.queries,
            geo: this.geoQuery
        }
    }
    geo_distance(field, point, distance, type) {
        this.queries = 'geo_distance';
        this.geoQuery = {};
        this.geoQuery['distance'] = distance;
        this.geoQuery[field] = point;
        // add some options for distance query
        // distance type
        this.geoQuery['distance_type'] = type;
        // validation_method

        return this._get_geo_query();
    }
    geo_bounding_box(field, top_left_point, bottom_right_point, type) {
        this.queries = 'geo_bounding_box';
        this.geoQuery = {};
        this.geoQuery[field] = {};
        this.geoQuery[field].top_left = top_left_point;
        this.geoQuery[field].bottom_right = bottom_right_point;
        // add some options for distance query
        // distance type
        this.geoQuery['type'] = type;
        // validation_method

        return this._get_geo_query();
    }
    geo_polygon(field, points) {
        this.queries = 'geo_polygon';
        this.geoQuery = {};
        this.geoQuery[field] = {
            "points": points
        };

        return this._get_geo_query();
    }
}

module.exports = new GeoBuilder();