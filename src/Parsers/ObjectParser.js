import Chance from 'chance';
const chance = new Chance();

export default class ObjectParser {
    constructor(parser) {
        this.cache = [];
        this.parser = parser;
    }
    canParse(node) {
        return !!node.properties || node.type === 'object';
    }

    parse(node) {
        return this.generateObject(node);
    }

    generateObject(node) {
        var ret = {};
        var schema = Object.assign({}, node);
        schema = schema.properties;
        this.cache.push(schema);
        // if is not swagger object type return null object
        if (schema) {
            for (var k in schema) {
                // 修改：2020-02-21，hasCircular在array情况下，会发生array的第一个内容是完整，但第二个内容只有一个id的情况
                var hasCircular = this.cache.filter(function (cacheObj) {
                    return k == cacheObj;
                 }).length > 1;
                // detect and break circular references in schema
                if (hasCircular) {
                    schema[k] = JSON.parse(JSON.stringify(schema[k]));
                    ret[k] = this.parser.parse(schema[k]);
                    hasCircular = false;
                    this.cache.pop();
                    break;
                }
                if(this.parser.options && this.parser.options.useObjectKey){
                    schema[k]._objectKey = k;
                }
                ret[k] = this.parser.parse(schema[k]);
            }
        }
        return ret;
    }
}