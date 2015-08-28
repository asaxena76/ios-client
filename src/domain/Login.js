var t = require("tcomb-form-native");

module.exports = t.struct({
    mailAddress: t.Str,
    password: t.Str
});
