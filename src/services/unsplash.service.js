const ACCESS_KEY = "VQ5-cMIa38vEVJijaVNDF65SIqrbzDSWH_xdfWqtJ24";


export const unsplashService = {
    getImgs
}

async function getImgs(search) {
    // console.log(search);
    // const DOWNLOAD_URL = `https://api.unsplash.com/search/photos?query=${search}&client_id=${ACCESS_KEY}`;
    const DOWNLOAD_URL = `https://api.unsplash.com/search/photos?query=${search}&client_id=VQ5-cMIa38vEVJijaVNDF65SIqrbzDSWH_xdfWqtJ24`
    let res = await (fetch(DOWNLOAD_URL, {
        method: 'GET'
    }))

    return res.json();
}