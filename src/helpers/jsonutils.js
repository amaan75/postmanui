const validJson = (text) => {
    if (text === undefined || text === null) {
        return {};
    }
    console.log(text);
    let result = {};
    try {
        result = JSON.parse(text);
    } catch (error) {
        console.log("invalid json was passed", error)
    }
    return result;
}

const stringifiedJS = (object) => {
    if (object === undefined || object === null) {
        return JSON.stringify({}, null, 2) || "{}";
    }
    return JSON.stringify(object, null, 2) || "{}";
}
export { validJson, stringifiedJS }