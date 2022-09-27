const basePath = process.env.BASEPATH;

const API = {};

API.getAllDecks = async () => {
    return await fetch(
        basePath,
        {
            method: "GET",
            headers: { 'Accept': 'application/json', },
        })
        .then(res => res?.ok ? res : Promise.reject(res))
        .then(res => res.json());
};

API.getDecksByParameter = async (parameter, value) => {
    const list = await API.getAllDecks();

    // TODO: Fuzzy returns
    return list.filter(item => item[parameter] === value);
};

API.getDecksBySet = async (set) => {
    return await API.getDecksByParameter('set', set);
};

API.getDecksByName = async (name) => {
    return await API.getDecksByParameter('name', name);
};

API.getDecksByUploader = async (uploader) => {
    return await API.getDecksByParameter('uploader', uploader);
};

API.postDeck = async (set, name, file, uploader, description = null) => {
    const packet = {
        id: set + name + uploader,
        set: set,
        name: name,
        file: file,
        uploader: uploader,
        description: description
    };

    return await fetch(
        basePath,
        {
            method: "POST",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify(packet),
        })
};

module.exports = API;
