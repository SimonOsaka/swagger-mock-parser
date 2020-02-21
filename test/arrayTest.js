var test = require('ava');
var Parser = require('../dist/Parser');
const pet = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "name",
            "photoUrls"
        ],
        "properties": {
            "id": {
                "type": "integer",
                "format": "int64"
            },
            "category": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int64"
                    },
                    "name": {
                        "type": "string"
                    }
                },
                "xml": {
                    "name": "Category"
                }
            },
            "name": {
                "type": "string",
                "example": "doggie"
            },
            "photoUrls": {
                "type": "array",
                "xml": {
                    "name": "photoUrl",
                    "wrapped": true
                },
                "items": {
                    "type": "string"
                }
            },
            "tags": {
                "type": "array",
                "xml": {
                    "name": "tag",
                    "wrapped": true
                },
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64"
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "xml": {
                        "name": "Tag"
                    }
                }
            },
            "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                    "available",
                    "pending",
                    "sold"
                ]
            }
        },
        "xml": {
            "name": "Pet"
        }
    }
};
test('fixed Array', t => {
    let parser = new Parser({ fixedArray: true });
    let res = parser.parse(pet);
    console.log('fixed Array', JSON.stringify(res, null, 2));
    t.is(Array.isArray(res) && res.length === 1, true);
});
test('default random Array', t => {
    let parser = new Parser();
    let res = parser.parse(pet);
    console.log('default random Array', JSON.stringify(res, null, 2));
    t.is(Array.isArray(res), true);
});      